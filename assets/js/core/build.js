/* Build model, legality rules, and the Armor 3.0 stat engine.

   Every number the app shows comes out of computeStats(). It returns not just
   totals but the full attribution -- which piece, mod or fragment contributed
   what -- so the stat panel can show its working instead of asking to be
   trusted. */
(function (D2) {
  'use strict';
  var G = D2.game, S = D2.data, U = D2.util;
  var B = D2.build = {};

  /* ============================ MODEL ============================ */

  function emptyWeaponSlot() {
    return {
      weaponId: null,
      perks: { barrel: null, magazine: null, trait1: null, trait2: null, origin: null, masterwork: null, mod: null },
      catalyst: false
    };
  }

  function emptyArmorPiece(slotId) {
    return {
      slot: slotId,
      exoticId: null,
      // archetype mode
      archetype: null,
      tier: 5,
      secondary: null,
      masterworked: false,
      // manual mode
      manual: false,
      manualStats: G.emptyStats(),
      // shared
      artifice: false,
      set: '',
      mods: [null, null, null],
      artificeMod: null,
      // exotic class item only
      spirit1: null,
      spirit2: null
    };
  }

  B.create = function (partial) {
    var b = {
      id: U.uid('build'),
      name: 'Untitled Build',
      tags: [],
      classId: null,
      element: null,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      subclass: {
        superId: null, classAbilityId: null, movementId: null,
        meleeId: null, grenadeId: null,
        aspects: [null, null],
        fragments: [],
        fragmentStats: {}
      },
      weapons: { kinetic: emptyWeaponSlot(), energy: emptyWeaponSlot(), power: emptyWeaponSlot() },
      armor: {},
      artifact: []
    };
    G.armorSlots.forEach(function (s) { b.armor[s.id] = emptyArmorPiece(s.id); });
    if (partial) B.merge(b, partial);
    return b;
  };

  // Shallow-but-deep-enough merge that tolerates builds saved by older versions.
  B.merge = function (target, src) {
    Object.keys(src || {}).forEach(function (k) {
      var v = src[k];
      if (v && typeof v === 'object' && !Array.isArray(v) && target[k] && typeof target[k] === 'object' && !Array.isArray(target[k])) {
        B.merge(target[k], v);
      } else {
        target[k] = v;
      }
    });
    return target;
  };

  // Rebuild a stored build against the current model so new fields appear.
  B.hydrate = function (stored) {
    var fresh = B.create();
    var out = B.merge(fresh, stored || {});
    G.armorSlots.forEach(function (s) {
      if (!out.armor[s.id]) out.armor[s.id] = emptyArmorPiece(s.id);
      var p = out.armor[s.id];
      if (!Array.isArray(p.mods)) p.mods = [null, null, null];
      while (p.mods.length < S.MOD_SOCKETS) p.mods.push(null);
      if (!p.manualStats) p.manualStats = G.emptyStats();
    });
    ['kinetic', 'energy', 'power'].forEach(function (sl) {
      if (!out.weapons[sl]) out.weapons[sl] = emptyWeaponSlot();
    });
    if (!Array.isArray(out.subclass.fragments)) out.subclass.fragments = [];
    if (!Array.isArray(out.subclass.aspects)) out.subclass.aspects = [null, null];
    return out;
  };

  B.emptyWeaponSlot = emptyWeaponSlot;
  B.emptyArmorPiece = emptyArmorPiece;

  /* ======================== SUBCLASS POOLS ======================== */

  function matches(item, classId, element) {
    if (item.classId && item.classId !== classId) return false;
    if (item.element && item.element !== element) return false;
    if (item.only && item.only.indexOf(classId) === -1) return false;
    if (item.elements && item.elements !== '*' && item.elements.indexOf(element) === -1) return false;
    return true;
  }

  B.path = function (classId, element) {
    for (var i = 0; i < S.paths.length; i++) {
      if (S.paths[i].classId === classId && S.paths[i].element === element) return S.paths[i];
    }
    return null;
  };

  function byIds(list, ids) {
    var index = {};
    list.forEach(function (x) { index[x.id] = x; });
    return ids.map(function (id) { return index[id]; }).filter(Boolean);
  }

  // Prismatic paths name their own curated pools; everything else filters.
  B.pools = function (classId, element) {
    if (!classId || !element) {
      return { supers: [], melees: [], grenades: [], classAbilities: [], movements: [], aspects: [], fragments: [] };
    }
    var path = B.path(classId, element) || {};
    return {
      supers: path.supers ? byIds(S.supers, path.supers)
        : S.supers.filter(function (x) { return matches(x, classId, element); }),
      melees: path.melees ? byIds(S.melees, path.melees)
        : S.melees.filter(function (x) { return matches(x, classId, element); }),
      grenades: path.grenades ? byIds(S.grenades, path.grenades)
        : S.grenades.filter(function (x) { return matches(x, classId, element); }),
      classAbilities: S.classAbilities.filter(function (x) { return matches(x, classId, element); }),
      movements: S.movements.filter(function (x) { return matches(x, classId, element); }),
      aspects: S.aspects.filter(function (x) { return x.classId === classId && x.element === element; }),
      fragments: S.fragments.filter(function (x) { return x.element === element; })
    };
  };

  // How many Fragment slots the chosen Aspects unlock.
  B.fragmentCapacity = function (build) {
    var overrides = D2.settings.get('aspectSlots') || {};
    return (build.subclass.aspects || []).reduce(function (n, id) {
      if (!id) return n;
      var asp = S.aspects.filter(function (a) { return a.id === id; })[0];
      if (!asp) return n;
      var slots = overrides[id] != null ? overrides[id] : asp.slots;
      return n + (slots || 0);
    }, 0);
  };

  /* Drop Fragments that no longer have a slot to sit in. Any edit that can
     reduce Aspect count runs this so the app never authors an illegal build --
     validate() stays the safety net, not the first line of defence.
     Returns how many were removed. */
  B.trimFragments = function (build) {
    var cap = B.fragmentCapacity(build);
    var frags = build.subclass.fragments || [];
    if (frags.length <= cap) return 0;
    var removed = frags.length - cap;
    build.subclass.fragments = frags.slice(0, cap);
    return removed;
  };

  /* ========================== STAT ENGINE ========================== */

  /* One armor piece's stat contribution, and where it came from. */
  B.pieceStats = function (piece) {
    var out = G.emptyStats();
    var sources = [];
    if (!piece) return { stats: out, sources: sources };

    if (piece.manual) {
      G.statIds.forEach(function (id) { out[id] = Number(piece.manualStats[id]) || 0; });
      sources.push({ label: 'Manual entry', stats: U.clone(out) });
    } else if (piece.archetype) {
      var arch = G.archetypeById[piece.archetype];
      var row = D2.settings.tierRow(piece.tier);
      if (arch && row) {
        var contrib = G.emptyStats();
        contrib[arch.primary] += row.primary;
        contrib[arch.tertiary] += row.tertiary;
        var sec = piece.secondary;
        // The secondary must be a real stat that is not already primary/tertiary.
        if (sec && sec !== arch.primary && sec !== arch.tertiary) contrib[sec] += row.secondary;
        G.statIds.forEach(function (id) { out[id] += contrib[id]; });
        sources.push({ label: arch.name + ' T' + piece.tier, stats: contrib });
      }
      if (piece.masterworked) {
        var mw = G.emptyStats();
        var bonus = D2.settings.get('masterworkBonus');
        var target = arch ? arch.primary : 'weapons';
        mw[target] = bonus;
        out[target] += bonus;
        sources.push({ label: 'Masterwork', stats: mw });
      }
    }

    // Mods
    (piece.mods || []).forEach(function (modId) {
      var mod = modId && S.modById[modId];
      if (!mod || !mod.stats) return;
      var s = G.emptyStats();
      G.statIds.forEach(function (id) {
        var v = mod.stats[id] || 0;
        s[id] = v; out[id] += v;
      });
      sources.push({ label: mod.name, stats: s });
    });

    if (piece.artifice && piece.artificeMod) {
      var am = S.modById[piece.artificeMod];
      if (am && am.stats) {
        var as = G.emptyStats();
        G.statIds.forEach(function (id) {
          var v = am.stats[id] || 0;
          as[id] = v; out[id] += v;
        });
        sources.push({ label: am.name, stats: as });
      }
    }

    return { stats: out, sources: sources };
  };

  B.pieceEnergy = function (piece) {
    if (!piece) return 0;
    return (piece.mods || []).reduce(function (n, id) {
      var mod = id && S.modById[id];
      return n + (mod ? mod.cost : 0);
    }, 0);
  };

  /* Whole-build stats with full attribution. */
  B.computeStats = function (build) {
    var totals = G.emptyStats();
    var breakdown = {};
    G.statIds.forEach(function (id) { breakdown[id] = []; });

    function add(label, group, stats) {
      G.statIds.forEach(function (id) {
        var v = stats[id] || 0;
        if (!v) return;
        totals[id] += v;
        breakdown[id].push({ label: label, group: group, value: v });
      });
    }

    G.armorSlots.forEach(function (slot) {
      var piece = build.armor[slot.id];
      var res = B.pieceStats(piece);
      var name = G.armorSlotById[slot.id].name;
      res.sources.forEach(function (src) {
        // The group is the slot id, so a reader of the breakdown gets the
        // piece's own mark beside the row rather than one catch-all icon.
        add(name + ' — ' + src.label, slot.id, src.stats);
      });
    });

    // Fragment modifiers. Shipped empty; the user or manifest sync fills them.
    (build.subclass.fragments || []).forEach(function (fid) {
      var frag = S.fragments.filter(function (f) { return f.id === fid; })[0];
      if (!frag) return;
      var custom = (build.subclass.fragmentStats || {})[fid] || frag.stats || {};
      add(frag.name, 'fragment', custom);
    });

    var clamped = {}, overflow = {};
    G.statIds.forEach(function (id) {
      var raw = totals[id];
      clamped[id] = U.clamp(raw, 0, G.STAT_MAX);
      overflow[id] = raw - clamped[id];
    });

    return { total: clamped, raw: totals, overflow: overflow, breakdown: breakdown };
  };

  /* Where a stat value sits: tier, distance to the next 10-point step, and
     distance to the 100 pivot / 200 cap. */
  B.statContext = function (value) {
    var v = U.clamp(value, 0, G.STAT_MAX);
    var rem = v % 10;
    return {
      value: v,
      tier: Math.floor(v / 10),
      // Points needed to reach the next 10-point step. At a step already, the
      // next one is a full 10 away; at the cap there is nowhere left to go.
      toNextTen: v >= G.STAT_MAX ? 0 : (rem === 0 ? 10 : 10 - rem),
      toPivot: v < G.STAT_PIVOT ? G.STAT_PIVOT - v : 0,
      toMax: G.STAT_MAX - v,
      band: v < G.STAT_PIVOT ? 'under' : 'over'
    };
  };

  /* ========================== LEGALITY ========================== */

  B.validate = function (build) {
    var issues = [];

    function issue(level, where, text) { issues.push({ level: level, where: where, text: text }); }

    if (!build.classId) issue('todo', 'identity', 'Pick a Guardian class.');
    if (!build.element) issue('todo', 'identity', 'Pick a subclass element.');

    if (build.classId && build.element) {
      var sc = build.subclass;
      if (!sc.superId) issue('todo', 'subclass', 'No Super selected.');
      if (!sc.grenadeId) issue('todo', 'subclass', 'No grenade selected.');
      if (!sc.meleeId) issue('todo', 'subclass', 'No melee selected.');
      if (!sc.classAbilityId) issue('todo', 'subclass', 'No class ability selected.');
      if (!sc.movementId) issue('todo', 'subclass', 'No movement mode selected.');

      var filledAspects = (sc.aspects || []).filter(Boolean);
      if (filledAspects.length < S.MAX_ASPECTS) {
        issue('todo', 'subclass', filledAspects.length + ' of ' + S.MAX_ASPECTS + ' Aspects equipped.');
      }
      if (filledAspects.length !== new Set(filledAspects).size) {
        issue('error', 'subclass', 'The same Aspect is equipped twice.');
      }
      var cap = B.fragmentCapacity(build);
      if ((sc.fragments || []).length > cap) {
        issue('error', 'subclass', 'Too many Fragments: ' + sc.fragments.length + ' equipped, ' + cap + ' slots available.');
      }

      // A build saved under a different class or element, or before a data
      // update, can carry a choice this subclass cannot equip. Say so plainly.
      var pools = B.pools(build.classId, build.element);
      [
        ['superId', pools.supers, 'Super'],
        ['grenadeId', pools.grenades, 'Grenade'],
        ['meleeId', pools.melees, 'Melee'],
        ['classAbilityId', pools.classAbilities, 'Class ability'],
        ['movementId', pools.movements, 'Movement mode']
      ].forEach(function (row) {
        var id = sc[row[0]];
        if (!id) return;
        if (!row[1].some(function (x) { return x.id === id; })) {
          issue('error', 'subclass', row[2] + ' is not available on this subclass. Pick another.');
        }
      });
      (sc.aspects || []).filter(Boolean).forEach(function (id) {
        if (!pools.aspects.some(function (x) { return x.id === id; })) {
          issue('error', 'subclass', 'An equipped Aspect does not belong to this subclass.');
        }
      });
      (sc.fragments || []).forEach(function (id) {
        if (!pools.fragments.some(function (x) { return x.id === id; })) {
          issue('error', 'subclass', 'An equipped Fragment does not belong to this element.');
        }
      });
    }

    // One Exotic weapon.
    var exoticWeapons = [];
    ['kinetic', 'energy', 'power'].forEach(function (sl) {
      var wid = build.weapons[sl].weaponId;
      var wpn = wid && S.weaponById[wid];
      if (wpn && wpn.rarity === 'exotic') exoticWeapons.push(wpn.name);
      if (wpn && S.slotsForWeapon(wpn).indexOf(sl) === -1) {
        issue('error', 'weapons', wpn.name + ' cannot go in the ' + sl + ' slot.');
      }
      if (wpn && wpn.classId && wpn.classId !== build.classId) {
        issue('error', 'weapons', wpn.name + ' is ' + G.classById[wpn.classId].name + '-only.');
      }
      if (!wid) issue('todo', 'weapons', 'Empty ' + sl + ' slot.');
    });
    if (exoticWeapons.length > 1) {
      issue('error', 'weapons', 'Two Exotic weapons equipped: ' + exoticWeapons.join(' and ') + '. Only one is allowed.');
    }

    // One Exotic armor piece.
    var exoticArmor = [];
    G.armorSlots.forEach(function (slot) {
      var piece = build.armor[slot.id];
      if (piece.exoticId) {
        var ex = S.exoticArmorById[piece.exoticId];
        if (ex) {
          exoticArmor.push(ex.name);
          if (ex.classId !== build.classId && build.classId) {
            issue('error', 'armor', ex.name + ' is ' + G.classById[ex.classId].name + '-only.');
          }
        }
      }
      var energy = B.pieceEnergy(piece);
      if (energy > G.ARMOR_ENERGY) {
        issue('error', 'armor', G.armorSlotById[slot.id].name + ' mods cost ' + energy + ' energy, over the ' + G.ARMOR_ENERGY + ' available.');
      }
      if (!piece.exoticId && !piece.archetype && !piece.manual) {
        issue('todo', 'armor', G.armorSlotById[slot.id].name + ' has no archetype set.');
      }
    });
    if (exoticArmor.length > 1) {
      issue('error', 'armor', 'Two Exotic armor pieces equipped: ' + exoticArmor.join(' and ') + '. Only one is allowed.');
    }

    return issues;
  };

  /* Section completion, for the dossier spine. */
  B.completion = function (build) {
    var sc = build.subclass;
    var weaponsFilled = ['kinetic', 'energy', 'power'].filter(function (s) { return build.weapons[s].weaponId; }).length;
    var armorFilled = G.armorSlots.filter(function (s) {
      var p = build.armor[s.id];
      return p.exoticId || p.archetype || p.manual;
    }).length;
    var abilityFilled = ['superId', 'grenadeId', 'meleeId', 'classAbilityId', 'movementId']
      .filter(function (k) { return sc[k]; }).length;

    return {
      identity: { done: (build.classId ? 1 : 0) + (build.element ? 1 : 0), total: 2 },
      subclass: {
        done: abilityFilled + (sc.aspects || []).filter(Boolean).length,
        total: 5 + S.MAX_ASPECTS
      },
      weapons: { done: weaponsFilled, total: 3 },
      armor:   { done: armorFilled, total: G.armorSlots.length }
    };
  };
})(window.D2);
