/* The dossier: one continuous record you scroll, top to bottom, in the order a
   Guardian actually thinks. Identity, subclass, armament, armor. */
(function (D2) {
  'use strict';
  var G = D2.game, S = D2.data, B = D2.build, U = D2.util, el = U.el;

  var Builder = D2.builder = {};
  var refs = {};

  function state() { return D2.state.build; }
  function elc(id) { return (G.elementById[id] || {}).color || 'var(--bone-300)'; }
  function rarc(id) { return (G.rarityById[id] || {}).color || 'var(--bone-300)'; }

  function update(fn, opts) { D2.state.update(fn, opts); }

  /* ---------- shared bits ---------- */

  function ammoChip(ammoId) {
    var am = G.ammoById[ammoId];
    if (!am) return null;
    return el('span', { class: 'chip chip--ammo', style: { '--am': am.color } }, [
      el('span', { class: 'ico', html: D2.icon('ammo' + am.name, { size: 11 }) }),
      el('span', { text: am.name })
    ]);
  }

  /* The weapon's own silhouette where we have one, its damage type otherwise. */
  function weaponGlyph(wpn) {
    if (wpn.type && D2.hasIcon(wpn.type)) return wpn.type;
    return wpn.element || 'kinetic';
  }

  function elementChip(id) {
    var e = G.elementById[id];
    if (!e) return null;
    return el('span', { class: 'chip chip--el', style: { '--elc': e.color }, text: e.name });
  }

  function rarityChip(id) {
    var r = G.rarityById[id];
    if (!r) return null;
    return el('span', { class: 'chip chip--rar', style: { '--rar': r.color }, text: r.name });
  }

  /* ==================== IDENTITY BAND ==================== */

  function renderIdentity() {
    var b = state();
    var host = refs.identity;
    U.clear(host);

    var classPick = el('div', { class: 'classpick', role: 'group', 'aria-label': 'Guardian class' },
      G.classes.map(function (c) {
        return el('button', {
          class: 'classpick__btn' + (b.classId === c.id ? ' is-on' : ''),
          type: 'button',
          'aria-pressed': b.classId === c.id ? 'true' : 'false',
          'aria-label': c.name + ' — ' + c.tagline,
          title: c.tagline,
          onclick: function () { setClass(c.id); }
        }, [
          el('span', { class: 'facet facet--lg' }, [
            el('span', { class: 'ico', html: D2.icon(c.id, { size: 24 }) })
          ]),
          el('span', { class: 'classpick__name', text: c.name })
        ]);
      }));

    var elRow = el('div', { class: 'elrow', role: 'group', 'aria-label': 'Subclass element' },
      G.subclassElements.map(function (id) {
        var e = G.elementById[id];
        var path = b.classId ? B.path(b.classId, id) : null;
        return el('button', {
          class: 'elbtn' + (b.element === id ? ' is-on' : ''),
          type: 'button',
          style: { '--elc': e.color },
          disabled: !b.classId,
          'aria-pressed': b.element === id ? 'true' : 'false',
          onclick: function () { setElement(id); },
          title: path ? path.name : e.name
        }, [
          el('span', { class: 'facet' }, [
            el('span', { class: 'ico', html: D2.icon(id, { size: 14 }) })
          ]),
          el('span', { text: path ? path.name : e.name })
        ]);
      }));

    var sup = b.subclass.superId && S.supers.filter(function (s) { return s.id === b.subclass.superId; })[0];
    var pathName = (b.classId && b.element) ? (B.path(b.classId, b.element) || {}).name : null;

    var superLine = el('div', { class: 'band__super' }, [
      el('button', {
        class: 'band__supername' + (sup ? '' : ' is-empty'),
        type: 'button',
        disabled: !b.classId || !b.element,
        onclick: pickSuper,
        title: sup ? 'Change Super' : 'Choose a Super'
      }, sup ? sup.name : (b.classId && b.element ? 'Choose a Super' : 'Pick a class and element')),
      sup ? el('span', { class: 'chip chip--plain', text: sup.kind === 'roaming' ? 'Roaming' : 'One-shot' }) : null
    ]);

    host.appendChild(el('div', { class: 'band' }, [
      el('div', { class: 'band__inner' }, [
        classPick,
        elRow,
        el('div', { class: 'band__col stack' }, [
          superLine,
          pathName
            ? el('div', { class: 'lbl mt2', text: G.classById[b.classId].name + ' · ' + pathName })
            : el('div', { class: 'lbl mt2 dimmer', text: 'No subclass selected' })
        ]),
        exoticDigest(b)
      ])
    ]));
  }

  /* The two Exotics define a build more than anything else, and they sit far
     apart in the scroll. Keep them visible here. */
  function exoticDigest(b) {
    var wEx = null, wSlot = null;
    ['kinetic', 'energy', 'power'].forEach(function (sl) {
      var w = b.weapons[sl].weaponId && S.weaponById[b.weapons[sl].weaponId];
      if (w && w.rarity === 'exotic') { wEx = w; wSlot = sl; }
    });
    var aEx = null, aSlot = null;
    G.armorSlots.forEach(function (s) {
      var id = b.armor[s.id].exoticId;
      if (id && S.exoticArmorById[id]) { aEx = S.exoticArmorById[id]; aSlot = s.id; }
    });

    function plate(kind, item, glyph, onClick) {
      return el('button', {
        class: 'digest',
        type: 'button',
        title: item ? item.name : 'Choose an Exotic ' + kind,
        onclick: onClick
      }, [
        el('span', {
          class: 'digest__icon' + (item ? '' : ' hatch'),
          style: item ? { color: 'var(--rar-exotic)' } : null,
          html: D2.icon(glyph, { size: 20 })
        }),
        el('span', { class: 'stack', style: { 'min-width': '0' } }, [
          el('span', { class: 'lbl lbl--micro', text: 'Exotic ' + kind }),
          el('span', {
            class: 'digest__name truncate' + (item ? '' : ' is-empty'),
            text: item ? item.name : 'None'
          })
        ])
      ]);
    }

    return el('div', { class: 'digest-col' }, [
      plate('weapon', wEx, wEx ? weaponGlyph(wEx) : 'slot', function () {
        pickWeapon(wSlot || 'kinetic');
      }),
      plate('armor', aEx, D2.armorSlotIcon(aSlot || 'chest', b.classId), function () {
        pickExoticArmor(aSlot || 'chest');
      })
    ]);
  }

  function setClass(classId) {
    update(function (b) {
      if (b.classId === classId) return;
      b.classId = classId;
      // Class-specific choices no longer apply.
      b.subclass.superId = null;
      b.subclass.meleeId = null;
      b.subclass.classAbilityId = null;
      b.subclass.movementId = null;
      b.subclass.aspects = [null, null];
      // Most grenades are class-agnostic, but a few are not (Tripmine is
      // Hunter-only), so keep it only if the new class can actually equip it.
      if (b.element) {
        var pool = B.pools(classId, b.element);
        if (!pool.grenades.some(function (g) { return g.id === b.subclass.grenadeId; })) {
          b.subclass.grenadeId = null;
        }
      }
      // Aspects are gone, so the Fragment slots they granted are too.
      var dropped = B.trimFragments(b);
      if (dropped) {
        D2.bus.emit('toast', {
          kind: 'warn',
          text: dropped + (dropped === 1 ? ' Fragment was' : ' Fragments were') + ' removed — its Aspect slots went with the class change.'
        });
      }
      G.armorSlots.forEach(function (s) { b.armor[s.id].exoticId = null; });
      ['kinetic', 'energy', 'power'].forEach(function (sl) {
        var wid = b.weapons[sl].weaponId;
        var wpn = wid && S.weaponById[wid];
        if (wpn && wpn.classId && wpn.classId !== classId) b.weapons[sl] = B.emptyWeaponSlot();
      });
    });
  }

  function setElement(elementId) {
    var b = state();
    if (b.element === elementId) return;
    update(function (bb) {
      bb.element = elementId;
      bb.subclass.superId = null;
      bb.subclass.meleeId = null;
      bb.subclass.grenadeId = null;
      bb.subclass.aspects = [null, null];
      bb.subclass.fragments = [];
      // Class ability / movement survive if they are still legal.
      var pools = B.pools(bb.classId, elementId);
      function keep(list, id) { return list.some(function (x) { return x.id === id; }) ? id : null; }
      bb.subclass.classAbilityId = keep(pools.classAbilities, bb.subclass.classAbilityId);
      bb.subclass.movementId = keep(pools.movements, bb.subclass.movementId);
    });
    D2.shell.fireSweep();
  }

  function pickSuper() {
    var b = state();
    var pools = B.pools(b.classId, b.element);
    D2.picker.open({
      title: 'Super',
      subtitle: (B.path(b.classId, b.element) || {}).name,
      selectedId: b.subclass.superId,
      allowClear: true,
      items: pools.supers.map(function (s) {
        return {
          id: s.id, name: s.name, desc: s.desc, glyph: 'super',
          meta: [{ text: s.kind === 'roaming' ? 'Roaming' : 'One-shot', cls: 'chip--plain' }]
        };
      }),
      onPick: function (item) {
        update(function (bb) { bb.subclass.superId = item ? item.id : null; });
      }
    });
  }

  /* ==================== SUBCLASS ==================== */

  function abilityPick(key, label, poolKey, glyph) {
    var b = state();
    var pools = B.pools(b.classId, b.element);
    var list = pools[poolKey] || [];
    var current = list.filter(function (x) { return x.id === b.subclass[key]; })[0];

    return el('button', {
      class: 'pick',
      type: 'button',
      disabled: !b.classId || !b.element,
      onclick: function () {
        D2.picker.open({
          title: label,
          selectedId: b.subclass[key],
          allowClear: true,
          items: list.map(function (x) {
            return { id: x.id, name: x.name, desc: x.desc, glyph: glyph };
          }),
          onPick: function (item) {
            update(function (bb) { bb.subclass[key] = item ? item.id : null; });
          }
        });
      }
    }, [
      el('span', { class: 'pick__glyph facet facet--md' }, [
        el('span', { class: 'ico', html: D2.icon(glyph, { size: 18 }) })
      ]),
      el('span', { class: 'stack', style: { 'min-width': '0' } }, [
        el('span', { class: 'pick__k', text: label }),
        el('span', { class: 'pick__v' + (current ? '' : ' is-empty'), text: current ? current.name : 'Empty' })
      ])
    ]);
  }

  function renderSubclass() {
    var b = state();
    var host = refs.subclass;
    U.clear(host);

    if (!b.classId || !b.element) {
      host.appendChild(el('div', { class: 'empty hatch' }, [
        el('div', { class: 'empty__title', text: 'No subclass yet' }),
        el('p', { class: 'empty__body', text: 'Choose a class and an element above and every Super, ability, Aspect and Fragment for that subclass appears here.' })
      ]));
      return;
    }

    var pools = B.pools(b.classId, b.element);
    var cls = G.classById[b.classId];

    host.appendChild(el('div', { class: 'grid grid--abil' }, [
      abilityPick('grenadeId', 'Grenade', 'grenades', 'grenade'),
      abilityPick('meleeId', 'Melee', 'melees', 'melee'),
      abilityPick('classAbilityId', cls.classAbilityLabel, 'classAbilities', D2.classAbilityIcon(b.classId)),
      abilityPick('movementId', cls.movementLabel, 'movements', D2.movementIcon(b.classId))
    ]));

    /* --- Aspects --- */
    var chosen = b.subclass.aspects || [];
    var aspectHead = el('div', { class: 'section__head mt4' }, [
      el('h3', { class: 'section__title', style: { 'font-size': 'var(--fs-md)' }, text: 'Aspects' })
    ]);
    if (D2.level.show('aspectSlots')) {
      aspectHead.appendChild(el('button', {
        class: 'btn btn--sm btn--ghost section__count',
        type: 'button',
        title: 'Correct how many Fragment slots each Aspect grants',
        html: D2.icon('edit', { size: 13 }) + '<span>Slot counts</span>',
        onclick: function () { openAspectSlots(pools.aspects); }
      }));
    }
    aspectHead.appendChild(el('span', {
      class: 'lbl' + (D2.level.show('aspectSlots') ? '' : ' section__count'),
      text: chosen.filter(Boolean).length + ' / ' + S.MAX_ASPECTS
    }));
    host.appendChild(aspectHead);
    if (D2.level.show('glossary')) host.appendChild(define('Aspects', 'aspect'));

    host.appendChild(el('div', { class: 'opts opts--2' },
      pools.aspects.map(function (asp) {
        var idx = chosen.indexOf(asp.id);
        var isOn = idx !== -1;
        var full = chosen.filter(Boolean).length >= S.MAX_ASPECTS;
        var slots = D2.settings.get('aspectSlots')[asp.id];
        if (slots == null) slots = asp.slots;
        return el('button', {
          class: 'opt' + (isOn ? ' is-on' : ''),
          type: 'button',
          disabled: !isOn && full,
          title: (!isOn && full) ? 'Both Aspect slots are full. Remove one first.' : asp.desc,
          'aria-label': asp.name + ((!isOn && full) ? ' — unavailable. Both Aspect slots are full.' : ''),
          'aria-pressed': isOn ? 'true' : 'false',
          onclick: function () { toggleAspect(asp.id); }
        }, [
          el('span', { class: 'opt__glyph ico', html: D2.icon('aspect', { size: 18 }) }),
          el('span', { class: 'stack', style: { 'min-width': '0' } }, [
            el('span', { class: 'row-x gap2' }, [
              el('span', { class: 'opt__name', text: asp.name }),
              el('span', { class: 'chip opt__slots push', text: slots + ' frag' })
            ]),
            el('span', { class: 'opt__desc', text: asp.desc })
          ])
        ]);
      })));

    /* --- Fragments --- */
    var cap = B.fragmentCapacity(b);
    var frags = b.subclass.fragments || [];
    host.appendChild(el('div', { class: 'section__head mt4' }, [
      el('h3', { class: 'section__title', style: { 'font-size': 'var(--fs-md)' }, text: 'Fragments' }),
      el('span', {
        class: 'lbl section__count' + (frags.length > cap ? ' ' : ''),
        style: frags.length > cap ? { color: 'var(--err)' } : null,
        text: frags.length + ' / ' + cap
      })
    ]));
    if (D2.level.show('glossary')) host.appendChild(define('Fragments', 'fragment'));

    if (cap === 0) {
      host.appendChild(el('div', { class: 'note' }, [
        el('span', { class: 'ico', html: D2.icon('info', { size: 16 }) }),
        el('span', { text: 'Fragment slots come from Aspects. Equip an Aspect above to open some.' })
      ]));
    }

    host.appendChild(el('div', { class: 'opts opts--2' },
      pools.fragments.map(function (fr) {
        var isOn = frags.indexOf(fr.id) !== -1;
        var full = frags.length >= cap;
        var why = cap === 0
          ? 'Equip an Aspect above to open Fragment slots.'
          : 'All ' + cap + ' Fragment slots are full. Remove one, or equip an Aspect that grants more.';
        return el('button', {
          class: 'opt' + (isOn ? ' is-on' : ''),
          type: 'button',
          disabled: !isOn && full,
          title: (!isOn && full) ? why : fr.desc,
          'aria-label': fr.name + ((!isOn && full) ? ' — unavailable. ' + why : ''),
          'aria-pressed': isOn ? 'true' : 'false',
          onclick: function () { toggleFragment(fr.id); }
        }, [
          el('span', { class: 'opt__glyph ico', html: D2.icon('fragment', { size: 18 }) }),
          el('span', { class: 'stack', style: { 'min-width': '0' } }, [
            el('span', { class: 'opt__name', text: fr.name }),
            el('span', { class: 'opt__desc', text: fr.desc })
          ])
        ]);
      })));

    if (frags.length && D2.level.show('fragmentStats')) {
      host.appendChild(el('div', { class: 'note mt4' }, [
        el('span', { class: 'ico', html: D2.icon('info', { size: 16 }) }),
        el('span', {}, [
          'Fragment stat penalties and bonuses ship blank because the Armor 3.0 remapping moves with balance patches. ',
          el('button', {
            class: 'btn btn--sm mt2',
            type: 'button',
            style: { 'margin-left': '6px' },
            html: D2.icon('edit', { size: 13 }) + '<span>Set fragment stats</span>',
            onclick: openFragmentStats
          })
        ])
      ]));
    }
  }

  /* An inline definition of a game term. Beginner mode only -- everywhere else
     this is noise between the reader and the thing they came to do. */
  function define(term, key) {
    return el('div', { class: 'define' }, [
      el('span', { class: 'ico', html: D2.icon('info', { size: 14 }) }),
      el('span', {}, [el('span', { class: 'define__t', text: term + ' — ' }), D2.level.term(key)])
    ]);
  }

  function toggleAspect(id) {
    update(function (b) {
      var arr = b.subclass.aspects;
      var i = arr.indexOf(id);
      if (i !== -1) {
        arr[i] = null;
      } else {
        var slot = arr.indexOf(null);
        if (slot === -1) return;
        arr[slot] = id;
      }
      // Dropping an Aspect can shrink fragment capacity below what is equipped.
      var dropped = B.trimFragments(b);
      if (dropped) {
        D2.bus.emit('toast', {
          kind: 'warn',
          text: dropped + (dropped === 1 ? ' Fragment was' : ' Fragments were') + ' removed to fit the remaining slots.'
        });
      }
    });
  }

  function toggleFragment(id) {
    update(function (b) {
      var arr = b.subclass.fragments;
      var i = arr.indexOf(id);
      if (i !== -1) arr.splice(i, 1);
      else if (arr.length < B.fragmentCapacity(b)) arr.push(id);
    });
  }

  /* Fragment-slot counts per Aspect move with balance patches, so they are
     corrections you can make rather than numbers you are stuck with. */
  function openAspectSlots(aspects) {
    var overrides = U.clone(D2.settings.get('aspectSlots') || {});
    var body = el('div', { class: 'stack gap4' }, [
      el('div', { class: 'note' }, [
        el('span', { class: 'ico', html: D2.icon('info', { size: 16 }) }),
        el('span', { text: 'How many Fragment slots each Aspect grants. These ship as sensible defaults; if a patch changes one, correct it here and your Fragment capacity updates everywhere.' })
      ]),
      el('div', { class: 'stack' }, aspects.map(function (asp) {
        var current = overrides[asp.id] != null ? overrides[asp.id] : asp.slots;
        return el('label', {
          class: 'row-x gap3',
          style: { padding: '8px 0', 'border-bottom': '1px solid var(--rule)' }
        }, [
          el('span', { style: { 'min-width': '0' }, text: asp.name }),
          el('input', {
            class: 'input push', type: 'number', min: '0', max: '5',
            style: { width: '72px', 'text-align': 'center' },
            value: current,
            'aria-label': asp.name + ' fragment slots',
            oninput: function (e) { overrides[asp.id] = Number(e.target.value) || 0; }
          })
        ]);
      })),
      el('div', { class: 'row-x gap2' }, [
        el('button', {
          class: 'btn btn--primary', type: 'button', text: 'Apply',
          onclick: function () {
            D2.settings.set('aspectSlots', overrides);
            var dropped = 0;
            D2.state.update(function (b) { dropped = B.trimFragments(b); });
            D2.shell.closeDialog();
            D2.bus.emit('toast', {
              kind: dropped ? 'warn' : 'ok',
              text: dropped
                ? 'Slot counts updated. ' + dropped + ' Fragment' + (dropped === 1 ? '' : 's') + ' no longer fit and were removed.'
                : 'Slot counts updated.'
            });
          }
        }),
        el('button', {
          class: 'btn btn--ghost', type: 'button', text: 'Reset to defaults',
          onclick: function () {
            D2.settings.set('aspectSlots', {});
            D2.shell.closeDialog();
            D2.bus.emit('build:change', {});
            D2.bus.emit('toast', { kind: 'ok', text: 'Slot counts reset.' });
          }
        })
      ])
    ]);
    D2.shell.openDialog({ title: 'Fragment slots per Aspect', subtitle: 'Editable so a patch never makes the capacity wrong', body: body });
  }

  function openFragmentStats() {
    var b = state();
    var body = el('div', { class: 'stack gap4' });
    b.subclass.fragments.forEach(function (fid) {
      var fr = S.fragments.filter(function (f) { return f.id === fid; })[0];
      if (!fr) return;
      var current = (b.subclass.fragmentStats || {})[fid] || {};
      body.appendChild(el('div', { class: 'field' }, [
        el('span', { class: 'field__lbl', text: fr.name }),
        el('div', { class: 'statgrid' }, G.stats.map(function (st) {
          return el('label', { class: 'statin' }, [
            el('span', { class: 'lbl lbl--micro', text: st.abbr }),
            el('input', {
              class: 'input', type: 'number', step: '5', value: current[st.id] || 0,
              'aria-label': fr.name + ' ' + st.name,
              oninput: function (e) {
                var v = Number(e.target.value) || 0;
                update(function (bb) {
                  bb.subclass.fragmentStats = bb.subclass.fragmentStats || {};
                  bb.subclass.fragmentStats[fid] = bb.subclass.fragmentStats[fid] || {};
                  bb.subclass.fragmentStats[fid][st.id] = v;
                }, { statsOnly: true });
              }
            })
          ]);
        }))
      ]));
    });
    D2.shell.openDialog({
      title: 'Fragment stat modifiers',
      subtitle: 'Whatever the game shows on the Fragment, type it here. It persists with the build.',
      body: body
    });
  }

  /* ==================== WEAPONS ==================== */

  var COL1_LABEL = {
    bow: 'Bowstring', sword: 'Blade', glaive: 'Haft',
    fusion_rifle: 'Battery', linear_fusion: 'Battery', trace_rifle: 'Battery',
    breech_gl: 'Launcher', heavy_gl: 'Launcher', rocket_launcher: 'Launcher',
    sniper_rifle: 'Scope', shotgun: 'Barrel'
  };
  var COL2_LABEL = {
    bow: 'Arrow', sword: 'Guard', glaive: 'Battery',
    fusion_rifle: 'Battery', linear_fusion: 'Battery', trace_rifle: 'Battery',
    breech_gl: 'Grenades', heavy_gl: 'Grenades', rocket_launcher: 'Warhead'
  };

  var COL_LABEL = {
    barrel: 'Barrel', magazine: 'Magazine', trait1: 'Trait 1', trait2: 'Trait 2',
    origin: 'Origin Trait', masterwork: 'Masterwork', mod: 'Mod'
  };

  var COL_GLYPH = {
    barrel: 'dot', magazine: 'dot', trait1: 'dot', trait2: 'dot',
    origin: 'spark', masterwork: 'masterwork', mod: 'mod'
  };

  function columnLabel(key, weaponType) {
    if (key === 'barrel') return COL1_LABEL[weaponType] || 'Barrel';
    if (key === 'magazine') return COL2_LABEL[weaponType] || 'Magazine';
    return COL_LABEL[key];
  }

  /* One socket on one gun. `options` is that gun's roll list for the socket --
     already narrowed by S.columnsFor, so nothing here can offer a perk the
     weapon cannot actually have. */
  function perkColumn(slotId, weapon, key, options, source, showSource) {
    var b = state();
    var slot = b.weapons[slotId];
    var currentId = slot.perks[key];
    var current = currentId && S.perkIndex[currentId];
    var label = columnLabel(key, weapon.type);
    var list = options;

    // The same trait cannot roll in both trait columns.
    var twin = key === 'trait1' ? 'trait2' : key === 'trait2' ? 'trait1' : null;
    var twinId = twin && slot.perks[twin];
    if (twinId) {
      list = list.filter(function (p) { return p.id !== twinId; });
    }

    // A perk from an older save that this gun cannot roll: say so instead of
    // silently rendering a name that is not in the list.
    var orphan = current && !options.some(function (p) { return p.id === current.id; });

    // Said once per weapon, on the first column, so the reader knows how much
    // to trust the lists without a badge on every one of seven headings.
    var head = el('span', { class: 'perkcol__lbl' }, [el('span', { text: label })]);
    if (showSource && D2.level.atLeast('midgame')) {
      head.appendChild(el('span', {
        class: 'rollsrc' + (source === 'exact' ? ' is-exact' : ''),
        title: S.ROLL_SOURCE_LABEL[source],
        text: S.ROLL_SOURCE_SHORT[source]
      }));
    }

    return el('div', { class: 'perkcol' }, [
      head,
      el('button', {
        class: 'perkbtn ' + (current ? 'is-set' : 'is-empty'),
        type: 'button',
        title: orphan
          ? current.name + ' does not roll on this weapon — it came from an older save.'
          : (current ? current.desc : 'Choose a ' + label.toLowerCase()),
        style: orphan ? { 'border-color': 'rgba(229,180,85,.5)', color: 'var(--warn)' } : null,
        onclick: function () {
          D2.picker.open({
            title: label,
            subtitle: weapon.name + ' · ' + list.length + (list.length === 1 ? ' option' : ' options'),
            selectedId: currentId,
            allowClear: true,
            emptyText: 'Nothing rolls in this socket on ' + weapon.name + '.',
            items: list.map(function (p) {
              return { id: p.id, name: p.name, desc: p.desc, glyph: COL_GLYPH[key] || 'dot' };
            }),
            onPick: function (item) {
              update(function (bb) { bb.weapons[slotId].perks[key] = item ? item.id : null; });
            }
          });
        }
      }, current ? current.name : 'Empty')
    ]);
  }

  /* The columns to draw for a weapon, at this experience level. Beginner mode
     shows the two trait columns only: they are the ones that change how a gun
     plays, and seven columns of jargon is where a new player stops reading. */
  function weaponColumns(slotId, weapon) {
    var res = S.columnsFor(weapon);
    var cols = res.columns;
    if (!D2.level.show('allPerkColumns')) {
      cols = cols.filter(function (c) { return c.key === 'trait1' || c.key === 'trait2'; });
    }
    return cols.map(function (c, i) {
      return perkColumn(slotId, weapon, c.key, c.options, res.source, i === 0);
    });
  }

  function renderWeapons() {
    var host = refs.weapons;
    U.clear(host);
    var b = state();

    host.appendChild(el('div', { class: 'grid grid--weap' }, G.weaponSlots.map(function (slot) {
      var data = b.weapons[slot.id];
      var wpn = data.weaponId && S.weaponById[data.weaponId];
      var type = wpn && G.weaponTypeById[wpn.type];

      var head = el('div', { class: 'weapon__top' }, [
        el('button', {
          class: 'slotcard',
          type: 'button',
          onclick: function () { pickWeapon(slot.id); }
        }, [
          // The well shows the weapon's own silhouette tinted by its damage
          // type, the way the game's inventory does -- not a generic square.
          el('span', {
            class: 'slotcard__icon' + (wpn ? ' slotcard__icon--filled' : ' hatch'),
            style: wpn ? { '--rar': rarc(wpn.rarity), color: elc(wpn.element) } : null,
            html: D2.icon(wpn ? weaponGlyph(wpn) : 'slot', { size: 24 })
          }),
          el('span', { class: 'stack', style: { 'min-width': '0' } }, [
            el('span', { class: 'lbl lbl--micro', text: slot.name }),
            el('span', { class: 'slotcard__name' + (wpn ? '' : ' is-empty'), text: wpn ? wpn.name : 'Empty — choose a weapon' }),
            wpn ? el('span', { class: 'slotcard__sub' }, [
              rarityChip(wpn.rarity),
              elementChip(wpn.element),
              ammoChip(wpn.ammo),
              el('span', { class: 'chip chip--plain', text: type ? type.name : '' }),
              wpn.frame ? el('span', { class: 'chip chip--plain', text: (S.frameById[wpn.frame] || {}).name || '' }) : null
            ]) : el('span', { class: 'slotcard__sub' }, [
              el('span', { class: 'chip chip--plain', text: slot.hint })
            ])
          ]),
          el('span', { class: 'ico dimmer', html: D2.icon('chevron', { size: 16 }) })
        ])
      ]);

      var body = el('div', { class: 'weapon__body' });

      if (!wpn) {
        body.classList.add('hatch');
        body.appendChild(el('p', { class: 'hint', text: 'Nothing equipped. ' + slot.hint + '.' }));
      } else if (wpn.rarity === 'exotic') {
        var exoticBits = [
          el('div', { class: 'note' }, [
            el('span', { class: 'ico', style: { color: 'var(--rar-exotic)' }, html: D2.icon('star', { size: 16 }) }),
            el('span', {}, [
              el('strong', { text: wpn.perk }), ' — ', wpn.perkDesc
            ])
          ])
        ];

        if (D2.level.atLeast('midgame')) {
          exoticBits.push(wpn.catalyst
            ? el('label', { class: 'row-x gap2', style: { cursor: 'pointer' } }, [
                el('input', {
                  type: 'checkbox', checked: data.catalyst,
                  onchange: function (e) {
                    var on = e.target.checked;
                    update(function (bb) { bb.weapons[slot.id].catalyst = on; });
                  }
                }),
                el('span', { class: 'stack' }, [
                  el('span', { class: 'lbl lbl--bone', text: wpn.catalyst }),
                  el('span', { class: 'hint', text: wpn.catalystDesc })
                ])
              ])
            : el('div', { class: 'lbl dimmer', text: 'No catalyst' }));
        }

        var exCols = weaponColumns(slot.id, wpn);
        if (exCols.length) {
          exoticBits.push(el('div', { class: 'perkcols' }, exCols));
        } else if (D2.level.show('coach') && S.columnsFor(wpn).columns.length === 0) {
          // Genuinely nothing to choose -- not merely hidden by this level.
          exoticBits.push(el('p', { class: 'hint', text: 'This Exotic has no rolled perks. What it does is fixed.' }));
        }

        body.appendChild(el('div', { class: 'stack gap3' }, exoticBits));
      } else {
        var cols = weaponColumns(slot.id, wpn);
        body.appendChild(el('div', { class: 'perkcols' }, cols));
        if (D2.level.show('coach') && !D2.level.show('allPerkColumns')) {
          body.appendChild(el('p', {
            class: 'hint',
            style: { 'margin-top': '10px' },
            text: 'These two columns are the ones that change how the gun plays. ' +
                  'Switch to Mid-game in the top bar to see barrels, magazines, origin traits and mods as well.'
          }));
        }
      }

      return el('div', { class: 'weapon' }, [head, body]);
    })));
  }

  function pickWeapon(slotId) {
    var b = state();
    var pool = D2.manifest.weaponPool();
    var candidates = S.weaponsForSlot(slotId, pool).filter(function (w) {
      return !w.classId || w.classId === b.classId;
    });

    // An Exotic in another slot blocks a second Exotic here.
    var otherExotic = null;
    ['kinetic', 'energy', 'power'].forEach(function (sl) {
      if (sl === slotId) return;
      var w = b.weapons[sl].weaponId && S.weaponById[b.weapons[sl].weaponId];
      if (w && w.rarity === 'exotic') otherExotic = w;
    });

    D2.picker.open({
      title: G.weaponSlots.filter(function (s) { return s.id === slotId; })[0].name + ' weapon',
      subtitle: candidates.length + ' available',
      selectedId: b.weapons[slotId].weaponId,
      allowClear: true,
      searchPlaceholder: 'Search weapons…',
      groupBy: function (it) { return it.group; },
      groupOrder: ['Exotic', 'Legendary'],
      filters: [
        { id: 'exotic', label: 'Exotic', test: function (it) { return it.raw.rarity === 'exotic'; } },
        { id: 'primary', label: 'Primary', test: function (it) { return it.raw.ammo === 'primary'; } },
        { id: 'special', label: 'Special', test: function (it) { return it.raw.ammo === 'special'; } },
        { id: 'heavy', label: 'Heavy', test: function (it) { return it.raw.ammo === 'heavy'; } }
      ].concat(G.elements.filter(function (e) { return e.id !== 'prismatic'; }).map(function (e) {
        return { id: 'el_' + e.id, label: e.name, test: function (it) { return it.raw.element === e.id; } };
      })),
      items: candidates.map(function (w) {
        var blocked = otherExotic && w.rarity === 'exotic';
        var type = G.weaponTypeById[w.type];
        return {
          id: w.id,
          name: w.name,
          raw: w,
          group: w.rarity === 'exotic' ? 'Exotic' : 'Legendary',
          glyph: weaponGlyph(w),
          rarityColor: rarc(w.rarity),
          searchText: (type ? type.name : '') + ' ' + w.element + ' ' + (w.perk || '') + ' ' + (w.frame ? (S.frameById[w.frame] || {}).name || '' : ''),
          desc: w.perk ? w.perk + ' — ' + w.perkDesc : (w.frame ? (S.frameById[w.frame] || {}).desc : ''),
          disabled: blocked,
          disabledReason: blocked ? 'One Exotic weapon only — ' + otherExotic.name + ' is equipped' : '',
          meta: [
            { text: (G.rarityById[w.rarity] || {}).name, cls: 'chip--rar', style: { '--rar': rarc(w.rarity) } },
            { text: type ? type.name : '', cls: 'chip--plain' },
            { text: (G.elementById[w.element] || {}).name, cls: 'chip--el', style: { '--elc': elc(w.element) } }
          ]
        };
      }),
      onPick: function (item) {
        update(function (bb) {
          if (!item) { bb.weapons[slotId] = B.emptyWeaponSlot(); return; }
          var fresh = B.emptyWeaponSlot();
          fresh.weaponId = item.id;
          bb.weapons[slotId] = fresh;
        });
      }
    });
  }

  /* ==================== ARMOR ==================== */

  function renderArmor() {
    var host = refs.armor;
    U.clear(host);
    var b = state();

    if (!b.classId) {
      host.appendChild(el('div', { class: 'empty hatch' }, [
        el('div', { class: 'empty__title', text: 'Pick a class first' }),
        el('p', { class: 'empty__body', text: 'Exotic armor is class-locked, so the list only makes sense once the app knows whether you are a Titan, Hunter or Warlock.' })
      ]));
      return;
    }

    if (D2.level.show('glossary')) {
      host.appendChild(define('Archetype', 'archetype'));
      host.appendChild(define('Energy', 'energy'));
    }

    host.appendChild(el('div', { class: 'grid grid--armor' },
      G.armorSlots.map(function (slot) { return armorCard(slot); })));
  }

  function armorCard(slot) {
    var b = state();
    var p = b.armor[slot.id];
    var exotic = p.exoticId && S.exoticArmorById[p.exoticId];
    var isExoticClassItem = exotic && slot.id === 'classitem';
    var energy = B.pieceEnergy(p);
    var stats = B.pieceStats(p).stats;

    var card = el('div', { class: 'armorcard' });

    card.appendChild(el('div', { class: 'armorcard__head' }, [
      el('span', {
        class: 'ico',
        style: { color: exotic ? rarc('exotic') : 'var(--bone-400)' },
        html: D2.icon(D2.armorSlotIcon(slot.id, b.classId), { size: 22 })
      }),
      el('span', { class: 'stack', style: { 'min-width': '0' } }, [
        el('span', { class: 'lbl lbl--micro', text: slot.name }),
        el('span', { class: 'slotcard__name truncate', style: { 'font-size': 'var(--fs-base)' }, text: exotic ? exotic.name : 'Legendary' })
      ]),
      el('span', {
        class: 'chip chip--rar push',
        style: { '--rar': exotic ? rarc('exotic') : rarc('legendary') },
        text: exotic ? 'Exotic' : 'Legendary'
      })
    ]));

    var body = el('div', { class: 'armorcard__body' });

    /* Exotic selector */
    body.appendChild(el('button', {
      class: 'perkbtn' + (exotic ? ' is-set' : ' is-empty'),
      type: 'button',
      onclick: function () { pickExoticArmor(slot.id); }
    }, [
      el('span', { class: 'ico', html: D2.icon('star', { size: 15 }) }),
      el('span', { class: 'truncate', text: exotic ? exotic.perk : 'No Exotic — pick one' })
    ]));

    if (exotic) {
      body.appendChild(el('p', { class: 'hint', text: exotic.perkDesc }));
    }

    /* Exotic class item Spirits */
    if (isExoticClassItem) {
      body.appendChild(el('div', { class: 'field__row' }, [1, 2].map(function (col) {
        var key = 'spirit' + col;
        var sp = p[key] && S.spiritById[p[key]];
        return el('div', { class: 'field' }, [
          el('span', { class: 'field__lbl', text: 'Spirit ' + col }),
          el('button', {
            class: 'perkbtn' + (sp ? ' is-set' : ' is-empty'),
            type: 'button',
            title: sp ? sp.desc : '',
            onclick: function () {
              D2.picker.open({
                title: 'Spirit ' + col,
                subtitle: exotic.name,
                selectedId: p[key],
                allowClear: true,
                items: S.spiritsFor(b.classId, col).map(function (x) {
                  return { id: x.id, name: x.name, desc: x.desc, glyph: 'aspect' };
                }),
                onPick: function (item) {
                  update(function (bb) { bb.armor[slot.id][key] = item ? item.id : null; });
                }
              });
            }
          }, sp ? sp.name : 'Empty')
        ]);
      })));
    }

    /* Stat source: archetype or manual. Manual entry is a veteran affordance --
       for everyone else the archetype editor is both simpler and enough. */
    if (D2.level.show('manualStats')) {
      body.appendChild(el('div', { class: 'row-x gap2' }, [
        el('span', { class: 'field__lbl', text: 'Stats from' }),
        el('button', {
          class: 'btn btn--sm' + (!p.manual ? ' is-on' : ''),
          type: 'button',
          text: 'Archetype',
          onclick: function () { update(function (bb) { bb.armor[slot.id].manual = false; }); }
        }),
        el('button', {
          class: 'btn btn--sm' + (p.manual ? ' is-on' : ''),
          type: 'button',
          text: 'Manual',
          onclick: function () { update(function (bb) { bb.armor[slot.id].manual = true; }); }
        })
      ]));
    } else if (p.manual) {
      // A build made on Veteran can arrive here with manual stats already set.
      // Say so and show the values, rather than offering an archetype editor
      // that would appear to do nothing because manual entry overrides it.
      body.appendChild(el('div', { class: 'note' }, [
        el('span', { class: 'ico', html: D2.icon('lock', { size: 16 }) }),
        el('span', { text: 'This piece has hand-entered stats, which is a Veteran-mode setting. Switch to Veteran in the top bar to change them.' })
      ]));
      body.appendChild(el('div', { class: 'statgrid' }, G.stats.map(function (st) {
        return el('div', { class: 'ministat' }, [
          el('div', { class: 'ministat__v num', text: p.manualStats[st.id] || 0 }),
          el('div', { class: 'ministat__k', text: st.abbr })
        ]);
      })));
    }

    if (p.manual && D2.level.show('manualStats')) {
      body.appendChild(el('div', { class: 'statgrid' }, G.stats.map(function (st) {
        return el('label', { class: 'statin' }, [
          el('span', { class: 'lbl lbl--micro', text: st.abbr }),
          el('input', {
            class: 'input', type: 'number', min: '0', max: '200', step: '1',
            value: p.manualStats[st.id] || 0,
            'aria-label': slot.name + ' ' + st.name,
            oninput: function (e) {
              var v = U.clamp(Number(e.target.value) || 0, 0, 200);
              update(function (bb) { bb.armor[slot.id].manualStats[st.id] = v; }, { statsOnly: true });
            }
          })
        ]);
      })));
    } else if (!p.manual) {
      var arch = p.archetype && G.archetypeById[p.archetype];
      body.appendChild(el('div', { class: 'field__row' }, [
        el('div', { class: 'field' }, [
          el('span', { class: 'field__lbl', text: 'Archetype' }),
          el('select', {
            class: 'select',
            'aria-label': slot.name + ' archetype',
            onchange: function (e) {
              var v = e.target.value || null;
              update(function (bb) {
                bb.armor[slot.id].archetype = v;
                var a = v && G.archetypeById[v];
                var sec = bb.armor[slot.id].secondary;
                if (a && (sec === a.primary || sec === a.tertiary)) bb.armor[slot.id].secondary = null;
              });
            }
          }, [el('option', { value: '', text: '— none —', selected: !p.archetype })].concat(
            G.archetypes.map(function (a) {
              return el('option', { value: a.id, selected: p.archetype === a.id, text: a.name });
            })
          )),
          arch ? el('span', { class: 'hint', style: { 'font-size': 'var(--fs-micro)' }, text: arch.blurb }) : null
        ]),
        el('div', { class: 'field' }, [
          el('span', { class: 'field__lbl', text: 'Tier' }),
          el('select', {
            class: 'select',
            'aria-label': slot.name + ' tier',
            onchange: function (e) {
              var v = Number(e.target.value);
              update(function (bb) { bb.armor[slot.id].tier = v; });
            }
          }, D2.settings.get('tierTable').map(function (row) {
            return el('option', { value: row.tier, selected: p.tier === row.tier, text: 'Tier ' + row.tier });
          }))
        ])
      ]));

      body.appendChild(el('div', { class: 'field' }, [
        el('span', { class: 'field__lbl', text: 'Secondary stat' }),
        el('select', {
          class: 'select',
          disabled: !arch,
          'aria-label': slot.name + ' secondary stat',
          onchange: function (e) {
            var v = e.target.value || null;
            update(function (bb) { bb.armor[slot.id].secondary = v; });
          }
        }, [el('option', { value: '', text: arch ? '— pick the rolled stat —' : '— pick an archetype first —', selected: !p.secondary })].concat(
          G.stats.filter(function (st) {
            return !arch || (st.id !== arch.primary && st.id !== arch.tertiary);
          }).map(function (st) {
            return el('option', { value: st.id, selected: p.secondary === st.id, text: st.name });
          })
        ))
      ]));

      body.appendChild(el('label', { class: 'row-x gap2', style: { cursor: 'pointer' } }, [
        el('input', {
          type: 'checkbox', checked: p.masterworked,
          onchange: function (e) {
            var on = e.target.checked;
            update(function (bb) { bb.armor[slot.id].masterworked = on; });
          }
        }),
        el('span', { class: 'lbl lbl--bone', text: 'Masterworked (+' + D2.settings.get('masterworkBonus') + ' primary)' })
      ]));
    }

    /* Set + artifice. Both are things you only track once you are farming
       specific rolls, so beginner mode leaves them out entirely. */
    var extras = [];
    if (D2.level.show('armorSet')) {
      extras.push(el('div', { class: 'field' }, [
        el('span', { class: 'field__lbl', text: 'Armor set' }),
        el('input', {
          class: 'input', type: 'text', list: 'armorsets', value: p.set || '',
          placeholder: 'e.g. Iron Will',
          'aria-label': slot.name + ' armor set',
          oninput: function (e) {
            var v = e.target.value;
            update(function (bb) { bb.armor[slot.id].set = v; }, { statsOnly: true });
          }
        })
      ]));
    }
    if (D2.level.show('artifice')) {
      extras.push(el('div', { class: 'field' }, [
        el('span', { class: 'field__lbl', text: 'Artifice' }),
        el('label', { class: 'row-x gap2', style: { cursor: 'pointer', height: '32px' } }, [
          el('input', {
            type: 'checkbox', checked: p.artifice,
            onchange: function (e) {
              var on = e.target.checked;
              update(function (bb) {
                bb.armor[slot.id].artifice = on;
                if (!on) bb.armor[slot.id].artificeMod = null;
              });
            }
          }),
          el('span', { class: 'lbl', text: 'Artifice socket' })
        ])
      ]));
    }
    if (extras.length) body.appendChild(el('div', { class: 'field__row' }, extras));

    /* Mods */
    body.appendChild(el('div', { class: 'field' }, [
      el('span', { class: 'field__lbl', text: 'Mods' }),
      el('div', { class: 'modrow' }, [0, 1, 2].map(function (i) {
        return modButton(slot.id, i);
      }).concat(p.artifice ? [artificeButton(slot.id)] : []))
    ]));

    var over = energy > G.ARMOR_ENERGY;
    body.appendChild(el('div', { class: 'energy' + (over ? ' is-over' : '') }, [
      el('span', { class: 'ico', html: D2.icon('energy', { size: 13 }) }),
      el('span', { class: 'num', text: energy + ' / ' + G.ARMOR_ENERGY }),
      el('span', { class: 'energy__bar' }, [
        el('i', { class: 'energy__fill', style: { transform: 'scaleX(' + Math.min(1, energy / G.ARMOR_ENERGY) + ')' } })
      ])
    ]));

    /* Per-piece stat readout */
    var any = G.statIds.some(function (id) { return stats[id]; });
    body.appendChild(el('div', { class: 'statgrid', style: { 'margin-top': '2px' } }, G.stats.map(function (st) {
      return el('div', { class: 'ministat' }, [
        el('div', { class: 'ministat__v num', style: stats[st.id] ? null : { color: 'var(--bone-400)' }, text: stats[st.id] || 0 }),
        el('div', { class: 'ministat__k', text: st.abbr })
      ]);
    })));
    if (!any) {
      body.appendChild(el('p', { class: 'hint', style: { 'font-size': 'var(--fs-micro)' }, text: 'No stats yet — set an archetype or switch to manual entry.' }));
    }

    card.appendChild(body);
    return card;
  }

  function modButton(slotId, index) {
    var b = state();
    var p = b.armor[slotId];
    var modId = p.mods[index];
    var mod = modId && S.modById[modId];
    return el('button', {
      class: 'perkbtn' + (mod ? ' is-set' : ' is-empty'),
      type: 'button',
      title: mod ? mod.desc + ' (' + mod.cost + ' energy)' : 'Empty mod socket',
      onclick: function () {
        var used = B.pieceEnergy(p) - (mod ? mod.cost : 0);
        D2.picker.open({
          title: 'Mod socket ' + (index + 1),
          subtitle: G.armorSlotById[slotId].name + ' · ' + used + ' of ' + G.ARMOR_ENERGY + ' energy already spent',
          selectedId: modId,
          allowClear: true,
          groupBy: function (it) { return it.group; },
          groupOrder: ['Stat mods', G.armorSlotById[slotId].name + ' mods'],
          items: S.modsForSlot(slotId, false).map(function (m) {
            var tooExpensive = used + m.cost > G.ARMOR_ENERGY;
            return {
              id: m.id, name: m.name, desc: m.desc, glyph: m.stats ? 'dot' : 'grid',
              group: m.cat === 'general' ? 'Stat mods' : G.armorSlotById[slotId].name + ' mods',
              disabled: tooExpensive,
              disabledReason: tooExpensive ? 'Needs ' + m.cost + ' energy, only ' + (G.ARMOR_ENERGY - used) + ' left' : '',
              meta: [{ text: m.cost + ' energy', cls: 'chip--plain' }]
            };
          }),
          onPick: function (item) {
            update(function (bb) { bb.armor[slotId].mods[index] = item ? item.id : null; });
          }
        });
      }
    }, mod ? mod.name : 'Socket ' + (index + 1));
  }

  function artificeButton(slotId) {
    var b = state();
    var p = b.armor[slotId];
    var mod = p.artificeMod && S.modById[p.artificeMod];
    return el('button', {
      class: 'perkbtn' + (mod ? ' is-set' : ' is-empty'),
      type: 'button',
      title: mod ? mod.desc : 'Artifice socket — free +3 to one stat',
      onclick: function () {
        D2.picker.open({
          title: 'Artifice socket',
          subtitle: 'Costs no energy. +3 to one stat.',
          selectedId: p.artificeMod,
          allowClear: true,
          items: S.modsForSlot(slotId, true).map(function (m) {
            return { id: m.id, name: m.name, desc: m.desc, glyph: 'dot' };
          }),
          onPick: function (item) {
            update(function (bb) { bb.armor[slotId].artificeMod = item ? item.id : null; });
          }
        });
      }
    }, mod ? mod.name.replace('Artifice ', '') : 'Artifice');
  }

  function pickExoticArmor(slotId) {
    var b = state();
    var pool = D2.manifest.exoticArmorPool();
    var candidates = pool.filter(function (x) { return x.classId === b.classId && x.slot === slotId; });

    var otherExotic = null;
    G.armorSlots.forEach(function (s) {
      if (s.id === slotId) return;
      var eid = b.armor[s.id].exoticId;
      if (eid && S.exoticArmorById[eid]) otherExotic = S.exoticArmorById[eid];
    });

    D2.picker.open({
      title: 'Exotic ' + G.armorSlotById[slotId].name.toLowerCase(),
      subtitle: candidates.length ? candidates.length + ' available' : 'None in the offline library for this slot',
      selectedId: b.armor[slotId].exoticId,
      allowClear: true,
      emptyText: 'No Exotic armor in this slot for this class in the offline library. Manifest sync adds the rest.',
      items: candidates.map(function (x) {
        var blocked = !!otherExotic;
        return {
          id: x.id, name: x.name, glyph: slotId, rarityColor: rarc('exotic'),
          desc: x.perk + ' — ' + x.perkDesc,
          searchText: x.perk + ' ' + x.perkDesc,
          disabled: blocked,
          disabledReason: blocked ? 'One Exotic armor piece only — ' + otherExotic.name + ' is equipped' : ''
        };
      }),
      onPick: function (item) {
        update(function (bb) {
          bb.armor[slotId].exoticId = item ? item.id : null;
          if (!item) { bb.armor[slotId].spirit1 = null; bb.armor[slotId].spirit2 = null; }
        });
      }
    });
  }

  /* ==================== THE RUNNING INSTRUCTION ====================
     One thing to do next, never a list. The spine already carries the full
     outstanding set; this is the opposite -- a single sentence that tells
     someone who has never built a loadout where to click. */

  function nextStep(b) {
    var sc = b.subclass;
    var cls = b.classId && G.classById[b.classId];

    if (!b.classId) {
      return { text: 'Start by choosing a Guardian class. It decides which Supers, Aspects and Exotic armor you can use.', go: 'identity' };
    }
    if (!b.element) {
      return { text: 'Now pick a subclass — Solar, Arc, Void, Stasis, Strand or Prismatic. This is the biggest single decision in a build.', go: 'identity' };
    }
    if (!sc.superId) {
      return { text: 'Choose your Super.', go: 'identity', action: { label: 'Choose Super', fn: pickSuper } };
    }
    if (!sc.grenadeId) return { text: 'Pick a grenade.', go: 'subclass' };
    if (!sc.meleeId) return { text: 'Pick a melee ability.', go: 'subclass' };
    if (!sc.classAbilityId) return { text: 'Pick your ' + cls.classAbilityLabel + '.', go: 'subclass' };
    if (!sc.movementId) return { text: 'Pick a ' + cls.movementLabel.toLowerCase() + ' style.', go: 'subclass' };

    var aspects = (sc.aspects || []).filter(Boolean).length;
    if (aspects < S.MAX_ASPECTS) {
      return {
        text: aspects === 0
          ? 'Equip two Aspects. They define how the subclass plays, and they are what open your Fragment slots.'
          : 'Equip one more Aspect — that is where the rest of your Fragment slots come from.',
        go: 'subclass'
      };
    }

    var cap = B.fragmentCapacity(b);
    var frags = (sc.fragments || []).length;
    if (frags < cap) {
      return {
        text: 'You have ' + (cap - frags) + ' empty Fragment ' + (cap - frags === 1 ? 'slot' : 'slots') + '. They are free stats and free effects — fill them.',
        go: 'subclass'
      };
    }

    var emptyWeapon = ['kinetic', 'energy', 'power'].filter(function (s) { return !b.weapons[s].weaponId; })[0];
    if (emptyWeapon) {
      return {
        text: 'Your ' + emptyWeapon + ' slot is empty.',
        go: 'weapons',
        action: { label: 'Choose weapon', fn: function () { pickWeapon(emptyWeapon); } }
      };
    }

    var bareArmor = G.armorSlots.filter(function (s) {
      var p = b.armor[s.id];
      return !p.archetype && !p.manual;
    })[0];
    if (bareArmor) {
      return {
        text: 'Set an archetype on your ' + G.armorSlotById[bareArmor.id].name.toLowerCase() +
              ' so the app can work out your stats. It is written on the piece in-game.',
        go: 'armor'
      };
    }

    var errs = B.validate(b).filter(function (i) { return i.level === 'error'; });
    if (errs.length) {
      return { text: errs[0].text + ' The game will not let you equip this as it stands.', go: 'identity', bad: true };
    }

    var hasExoticArmor = G.armorSlots.some(function (s) { return b.armor[s.id].exoticId; });
    if (!hasExoticArmor) {
      return {
        text: 'Everything is legal. An Exotic armor piece is usually what turns a legal build into a good one — try one.',
        go: 'armor'
      };
    }

    return {
      done: true,
      text: 'Complete and legal. Save it so you can come back to it.',
      action: { label: 'Save to library', fn: function () { D2.shell.saveCurrent(); } }
    };
  }

  function renderNextStep() {
    var host = refs.nextstep;
    if (!host) return;
    U.clear(host);
    if (!D2.level.show('nextStep')) { host.hidden = true; return; }
    host.hidden = false;

    var step = nextStep(state());
    var box = el('div', { class: 'nextstep' + (step.done ? ' is-done' : '') }, [
      el('span', {
        class: 'nextstep__icon ico',
        html: D2.icon(step.done ? 'check' : step.bad ? 'warn' : 'arrowRight', { size: 18 })
      }),
      el('span', { class: 'stack', style: { 'min-width': '0' } }, [
        el('span', { class: 'nextstep__k', text: step.done ? 'Done' : 'Next' }),
        el('span', { class: 'nextstep__v', text: step.text })
      ])
    ]);

    if (step.action) {
      box.appendChild(el('button', {
        class: 'btn btn--primary nextstep__go push',
        type: 'button',
        text: step.action.label,
        onclick: step.action.fn
      }));
    } else if (step.go) {
      box.appendChild(el('button', {
        class: 'btn nextstep__go push',
        type: 'button',
        text: 'Take me there',
        onclick: function () {
          var target = document.getElementById('sec-' + step.go);
          if (target) target.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
      }));
    }

    host.appendChild(box);
  }

  /* ==================== SPINE ==================== */

  var SECTIONS = [
    { id: 'identity', name: 'Identity' },
    { id: 'subclass', name: 'Subclass' },
    { id: 'weapons', name: 'Armament' },
    { id: 'armor', name: 'Armor' }
  ];

  function renderSpine() {
    var host = refs.spine;
    U.clear(host);
    var b = state();
    var comp = B.completion(b);
    var issues = B.validate(b);

    var list = el('div', { class: 'spine__list' }, SECTIONS.map(function (sec) {
      var c = comp[sec.id];
      var done = c.done >= c.total;
      return el('button', {
        class: 'spine__item' + (done ? ' is-done' : ''),
        type: 'button',
        onclick: function () {
          var target = document.getElementById('sec-' + sec.id);
          if (target) target.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
      }, [
        el('span', { class: 'spine__tick' }),
        el('span', {}, [
          el('span', { class: 'lbl lbl--bone', text: sec.name }),
          el('span', { class: 'spine__meta num', text: c.done + '/' + c.total })
        ])
      ]);
    }));
    host.appendChild(list);

    var errs = issues.filter(function (i) { return i.level === 'error'; });
    var todos = issues.filter(function (i) { return i.level === 'todo'; });

    // Narrow screens collapse the spine to a scrolling strip, so the issue list
    // has nowhere to live. This chip carries it there.
    host.appendChild(el('button', {
      class: 'spine__status' + (errs.length ? ' is-error' : (todos.length ? '' : ' is-ok')),
      type: 'button',
      onclick: function () { openIssues(errs, todos); }
    }, [
      el('span', { class: 'ico', html: D2.icon(errs.length ? 'warn' : todos.length ? 'dot' : 'check', { size: 14 }) }),
      el('span', {
        text: errs.length
          ? errs.length + (errs.length === 1 ? ' problem' : ' problems')
          : todos.length
            ? todos.length + ' still to fill in'
            : 'Complete and legal'
      })
    ]));

    host.appendChild(el('div', { class: 'spine__rule' }));
    var box = el('div', { class: 'spine__issues' });

    if (!errs.length && !todos.length) {
      box.appendChild(el('div', { class: 'issue', style: { color: 'var(--ok)' } }, [
        el('span', { class: 'ico', html: D2.icon('check', { size: 14 }) }),
        el('span', { text: 'Build is complete and legal.' })
      ]));
    }
    errs.forEach(function (i) {
      box.appendChild(el('div', { class: 'issue issue--error' }, [
        el('span', { class: 'ico', html: D2.icon('warn', { size: 14 }) }),
        el('span', { text: i.text })
      ]));
    });
    todos.slice(0, 6).forEach(function (i) {
      box.appendChild(el('div', { class: 'issue issue--todo' }, [
        el('span', { class: 'ico', html: D2.icon('dot', { size: 10 }) }),
        el('span', { text: i.text })
      ]));
    });
    if (todos.length > 6) {
      box.appendChild(el('div', { class: 'issue issue--todo' }, [
        el('span', { class: 'ico', html: D2.icon('dot', { size: 10 }) }),
        el('span', { text: (todos.length - 6) + ' more to fill in' })
      ]));
    }
    host.appendChild(box);
  }

  function openIssues(errs, todos) {
    var body = el('div', { class: 'stack gap4' });
    if (!errs.length && !todos.length) {
      body.appendChild(el('div', { class: 'note' }, [
        el('span', { class: 'ico', style: { color: 'var(--ok)' }, html: D2.icon('check', { size: 16 }) }),
        el('span', { text: 'Nothing outstanding. Every slot is filled and the build breaks no equip rules.' })
      ]));
    }
    if (errs.length) {
      body.appendChild(el('div', { class: 'stack gap2' }, [
        el('div', { class: 'lbl', style: { color: 'var(--err)' }, text: 'Illegal' })
      ].concat(errs.map(function (i) {
        return el('div', { class: 'issue issue--error' }, [
          el('span', { class: 'ico', html: D2.icon('warn', { size: 14 }) }),
          el('span', { text: i.text })
        ]);
      }))));
    }
    if (todos.length) {
      body.appendChild(el('div', { class: 'stack gap2' }, [
        el('div', { class: 'lbl', text: 'Unfinished' })
      ].concat(todos.map(function (i) {
        return el('div', { class: 'issue issue--todo' }, [
          el('span', { class: 'ico', html: D2.icon('dot', { size: 10 }) }),
          el('span', { text: i.text })
        ]);
      }))));
    }
    D2.shell.openDialog({ title: 'Build check', subtitle: 'What is missing, and what the game would reject', body: body });
  }

  /* ==================== MOUNT ==================== */

  /* Plain-language framing per section. Shown at beginner and mid-game, and
     deliberately different at each: mid-game gets the one-line reason a section
     matters, beginner gets the same thing said without assuming vocabulary. */
  var COACH = {
    subclass: {
      beginner: 'Your subclass is your abilities: the Super you cast, the grenade and melee you throw, ' +
                'and two Aspects that change how all of it behaves. Aspects also open Fragment slots, ' +
                'which are small bonuses. Fill everything here before you worry about guns.',
      midgame: 'Aspects gate Fragment capacity, so pick those first and fill the slots they open.'
    },
    weapons: {
      beginner: 'Three guns: one Kinetic, one Energy, one Power. You can carry exactly one Exotic ' +
                'weapon across all three. Each gun has perks — the two Trait columns are the ones ' +
                'that change how it actually plays.',
      midgame: 'One Exotic across the three slots. Perk columns show only what that specific weapon rolls.'
    },
    armor: {
      beginner: 'Five pieces. Each one has an archetype written on it in-game (Gunner, Bulwark, and so on) ' +
                'that decides which stats it is good at, plus three mod sockets sharing 10 energy. ' +
                'Set the archetype to match what you own and the stat bar below fills in.',
      midgame: 'Archetype plus tier decides the base spread; the secondary stat is the rolled one. ' +
               'Mods share 10 energy per piece.'
    }
  };

  function coachFor(sectionId) {
    if (!D2.level.show('coach')) return null;
    var copy = COACH[sectionId];
    if (!copy) return null;
    var text = D2.level.is('beginner') ? copy.beginner : copy.midgame;
    return el('p', { class: 'coach', text: text });
  }

  function section(id, title, hostKey, extra) {
    var head = el('div', { class: 'section__head' }, [
      el('h2', { class: 'section__title', text: title })
    ]);
    if (extra) head.appendChild(extra);
    var coachHost = el('div');
    refs[hostKey + 'Coach'] = coachHost;
    var host = el('div');
    refs[hostKey] = host;
    return el('section', { class: 'section', id: 'sec-' + id }, [head, coachHost, host]);
  }

  function renderCoach() {
    ['subclass', 'weapons', 'armor'].forEach(function (id) {
      var host = refs[id + 'Coach'];
      if (!host) return;
      U.clear(host);
      var node = coachFor(id);
      if (node) host.appendChild(node);
    });
  }

  Builder.mount = function (root) {
    var spine = el('nav', { class: 'spine', 'aria-label': 'Build sections' });
    refs.spine = spine;

    var identityHost = el('div');
    refs.identity = identityHost;

    var nextstepHost = el('div');
    refs.nextstep = nextstepHost;

    var sheet = el('div', { class: 'sheet' }, [
      nextstepHost,
      el('section', { class: 'section', id: 'sec-identity' }, [identityHost]),
      section('subclass', 'Subclass', 'subclass'),
      section('weapons', 'Armament', 'weapons'),
      section('armor', 'Armor', 'armor'),
      el('datalist', { id: 'armorsets' }, S.armorSetSuggestions.map(function (n) {
        return el('option', { value: n });
      }))
    ]);

    root.appendChild(el('div', { class: 'dossier' }, [spine, sheet]));
    Builder.render();
  };

  Builder.render = function (opts) {
    if (opts && opts.statsOnly) { renderSpine(); renderNextStep(); return; }
    renderIdentity();
    renderCoach();
    renderSubclass();
    renderWeapons();
    renderArmor();
    renderSpine();
    renderNextStep();
  };
})(window.D2);
