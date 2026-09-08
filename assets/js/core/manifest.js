/* Bungie manifest sync — the path to "every single weapon and armor piece".

   The curated offline database is a snapshot written by hand: complete on
   subclasses, complete on Exotics as of writing, and a deliberate slice of
   Legendaries. It cannot be every item in Destiny 2, because Destiny 2 has
   thousands of them and adds more every season. This is how the app gets the
   rest, and it gets them from the only authoritative source there is.

   What a sync pulls in:

     Every weapon        with its real type, damage type, ammo, rarity and icon.
     Every armor piece   including the full Exotic list for all three classes.
     Every weapon perk   barrels, magazines, traits, origin traits, masterworks.
     Every armor mod     with its stat contributions mapped into Armor 3.0.
     Each weapon's own   socket layout and roll lists, so a perk column shows
                         exactly what that gun can roll and nothing else.

   Subclass data stays curated: it is already complete offline, and its manifest
   representation is scattered across plug sets that are not worth the download.

   Everything is stored in IndexedDB and survives reloads. Nothing is uploaded. */
(function (D2) {
  'use strict';
  var G = D2.game, S = D2.data, U = D2.util;

  var M = D2.manifest = {};
  var DB_NAME = 'd2bm-manifest';
  var STORE = 'items';
  var BUNGIE = 'https://www.bungie.net';

  /* Bucket hashes for the slots we care about. */
  var BUCKET = {
    1498876634: 'kinetic',
    2465295065: 'energy',
    953998645: 'power',
    3448274439: 'helmet',
    3551918588: 'gauntlets',
    14239492: 'chest',
    20886954: 'legs',
    1585787867: 'classitem'
  };
  var WEAPON_BUCKETS = { kinetic: 1, energy: 1, power: 1 };
  var ARMOR_BUCKETS = { helmet: 1, gauntlets: 1, chest: 1, legs: 1, classitem: 1 };

  var DAMAGE = { 1: 'kinetic', 2: 'arc', 3: 'solar', 4: 'void', 6: 'stasis', 7: 'strand' };
  var TIER = { 6: 'exotic', 5: 'legendary', 4: 'rare', 3: 'uncommon', 2: 'common' };
  var CLASS = { 0: 'titan', 1: 'hunter', 2: 'warlock' };
  var AMMO = { 1: 'primary', 2: 'special', 3: 'heavy' };

  /* Weapon type.

     itemSubType is an enum whose exact numbering has shifted over the years and
     which is easy to get subtly wrong -- a misnumbered entry silently files
     every Sidearm as a Sword. itemTypeDisplayName is the string the game itself
     prints on the item, is stable, and is trivially checkable, so it leads.
     The subtype map is only a backstop for anything it does not recognise. */
  var TYPE_BY_NAME = {
    'auto rifle': 'auto_rifle',
    'hand cannon': 'hand_cannon',
    'pulse rifle': 'pulse_rifle',
    'scout rifle': 'scout_rifle',
    'submachine gun': 'submachine_gun',
    'sidearm': 'sidearm',
    'combat bow': 'bow',
    'bow': 'bow',
    'shotgun': 'shotgun',
    'sniper rifle': 'sniper_rifle',
    'fusion rifle': 'fusion_rifle',
    'trace rifle': 'trace_rifle',
    'glaive': 'glaive',
    'machine gun': 'machine_gun',
    'rocket launcher': 'rocket_launcher',
    'sword': 'sword',
    'linear fusion rifle': 'linear_fusion',
    'grenade launcher': 'breech_gl',   // split by ammo below
    'rocket sidearm': 'sidearm'
  };

  var SUBTYPE = {
    6: 'auto_rifle', 7: 'shotgun', 8: 'machine_gun', 9: 'hand_cannon',
    10: 'rocket_launcher', 11: 'fusion_rifle', 12: 'sniper_rifle', 13: 'pulse_rifle',
    14: 'scout_rifle', 17: 'sword', 18: 'sidearm', 22: 'linear_fusion',
    23: 'breech_gl', 24: 'submachine_gun', 25: 'trace_rifle', 31: 'bow', 33: 'glaive'
  };

  function weaponType(def, ammo) {
    var label = (def.itemTypeDisplayName || '').toLowerCase().trim();
    var type = TYPE_BY_NAME[label] || SUBTYPE[def.itemSubType] || null;
    // Grenade launchers are one display name and two very different weapons;
    // the ammo they draw is what separates them.
    if (type === 'breech_gl' && ammo === 'heavy') type = 'heavy_gl';
    if (type === 'sword' || type === 'glaive') return type;
    return type;
  }

  /* Armor 3.0 stat hashes.

     Armor 3.0 renamed the six stats rather than renumbering them, so the hashes
     are the long-standing ones and the mapping is a rename:

       Mobility   -> Weapons     Discipline -> Grenade
       Resilience -> Health      Intellect  -> Super
       Recovery   -> Class       Strength   -> Melee

     This is the mapping that lets armor mods be imported with their real stat
     contributions instead of being dropped. It is asserted here in one place so
     that if Bungie ever does renumber, there is exactly one thing to fix. */
  var STAT_HASH = {
    2996146975: 'weapons',    // was Mobility
    392767087:  'health',     // was Resilience
    1943323491: 'class',      // was Recovery
    1735777505: 'grenade',    // was Discipline
    144602215:  'super',      // was Intellect
    4244567218: 'melee'       // was Strength
  };
  M.STAT_HASH = STAT_HASH;

  var loaded = { weapons: [], armor: [], plugs: {}, rolls: {}, mods: [] };
  M.ready = false;

  /* ------------------------- IndexedDB ------------------------- */

  function idb() {
    return new Promise(function (resolve, reject) {
      if (!window.indexedDB) { reject(new Error('IndexedDB is not available in this browser.')); return; }
      var req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = function () {
        var db = req.result;
        if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
      };
      req.onsuccess = function () { resolve(req.result); };
      req.onerror = function () { reject(req.error || new Error('Could not open local database.')); };
    });
  }

  function idbPut(key, value) {
    return idb().then(function (db) {
      return new Promise(function (resolve, reject) {
        var tx = db.transaction(STORE, 'readwrite');
        tx.objectStore(STORE).put(value, key);
        tx.oncomplete = function () { db.close(); resolve(); };
        tx.onerror = function () { db.close(); reject(tx.error); };
      });
    });
  }

  function idbGet(key) {
    return idb().then(function (db) {
      return new Promise(function (resolve, reject) {
        var tx = db.transaction(STORE, 'readonly');
        var req = tx.objectStore(STORE).get(key);
        req.onsuccess = function () { db.close(); resolve(req.result); };
        req.onerror = function () { db.close(); reject(req.error); };
      });
    });
  }

  function idbClear() {
    return idb().then(function (db) {
      return new Promise(function (resolve, reject) {
        var tx = db.transaction(STORE, 'readwrite');
        tx.objectStore(STORE).clear();
        tx.oncomplete = function () { db.close(); resolve(); };
        tx.onerror = function () { db.close(); reject(tx.error); };
      });
    });
  }

  /* ------------------------- reduce ------------------------- */

  function icon(def) {
    var p = def.displayProperties && def.displayProperties.icon;
    return p ? BUNGIE + p : null;
  }

  /* Which of our perk buckets a plug belongs in, decided from the plug's own
     category identifier rather than from socket-category hashes -- the plug
     tells us what it is, so nothing has to be memorised. */
  function plugBucket(id) {
    if (!id) return null;
    if (id === 'barrels' || id === 'blades' || id === 'bowstrings' || id === 'hafts' ||
        id === 'scopes' || id === 'tubes' || id === 'batteries') return 'barrels';
    if (id === 'magazines' || id === 'magazines_gl' || id === 'arrows' || id === 'guards' ||
        id === 'intrinsics_shaders') return 'magazines';
    if (id === 'frames') return 'traits';
    if (id === 'origins') return 'originTraits';
    if (id.indexOf('v400.plugs.weapons.masterworks') === 0) return 'masterworks';
    if (id.indexOf('v400.weapon.mod') === 0) return 'weaponMods';
    if (id.indexOf('enhancements.') === 0) return 'armorMods';
    return null;
  }

  /* Armor mods carry their stat contributions in investmentStats, keyed by the
     hashes above. Anything that maps to nothing is skipped rather than imported
     as a mod that silently contributes zero. */
  function modStats(def) {
    var out = null;
    (def.investmentStats || []).forEach(function (s) {
      var key = STAT_HASH[s.statTypeHash];
      if (!key || !s.value) return;
      out = out || {};
      out[key] = (out[key] || 0) + s.value;
    });
    return out;
  }

  /* Which armor slot a mod fits, from its plug category:
     enhancements.v2_head / .v2_arms / .v2_chest / .v2_legs / .v2_class_item,
     enhancements.general for the stat mods, .artifice for artifice sockets. */
  function modCategory(id) {
    if (!id) return null;
    if (id.indexOf('v2_head') !== -1) return 'helmet';
    if (id.indexOf('v2_arms') !== -1) return 'gauntlets';
    if (id.indexOf('v2_chest') !== -1) return 'chest';
    if (id.indexOf('v2_legs') !== -1) return 'legs';
    if (id.indexOf('v2_class_item') !== -1) return 'classitem';
    if (id.indexOf('artifice') !== -1) return 'artifice';
    if (id.indexOf('general') !== -1) return 'general';
    return null;
  }

  /* Resolve one weapon's socket layout into our column keys.

     socketEntries gives, per socket, either a plug set hash (random rolls, or a
     fixed reusable list) or a single initial item. Resolving those against
     DestinyPlugSetDefinition produces the exact list of plugs that socket can
     hold -- which is precisely "the attachments that are on this gun". */
  function weaponRolls(def, plugSets, plugOwner) {
    var sockets = def.sockets;
    if (!sockets || !sockets.socketEntries) return null;

    var buckets = {};   // bucket name -> array of arrays (one per socket)
    sockets.socketEntries.forEach(function (entry) {
      var hashes = [];

      function addSet(setHash) {
        var set = setHash && plugSets[setHash];
        if (!set || !set.reusablePlugItems) return;
        set.reusablePlugItems.forEach(function (p) {
          if (p.currentlyCanRoll === false) return;
          hashes.push(p.plugItemHash);
        });
      }

      addSet(entry.randomizedPlugSetHash);
      addSet(entry.reusablePlugSetHash);
      (entry.reusablePlugItems || []).forEach(function (p) { hashes.push(p.plugItemHash); });
      if (!hashes.length && entry.singleInitialItemHash) hashes.push(entry.singleInitialItemHash);
      if (!hashes.length) return;

      // Classify the socket by what its plugs actually are.
      var bucket = null, ids = [], seen = {};
      for (var i = 0; i < hashes.length; i++) {
        var owner = plugOwner[hashes[i]];
        if (!owner) continue;
        if (!bucket) bucket = owner.bucket;
        if (owner.bucket !== bucket) continue;
        if (seen[owner.id]) continue;
        seen[owner.id] = 1;
        ids.push(owner.id);
      }
      if (!bucket || !ids.length) return;
      (buckets[bucket] = buckets[bucket] || []).push(ids);
    });

    var out = {};
    if (buckets.barrels) out.barrel = buckets.barrels[0];
    if (buckets.magazines) out.magazine = buckets.magazines[0];
    if (buckets.traits) {
      out.trait1 = buckets.traits[0];
      if (buckets.traits[1]) out.trait2 = buckets.traits[1];
    }
    if (buckets.originTraits) out.origin = buckets.originTraits[0];
    if (buckets.masterworks) out.masterwork = buckets.masterworks[0];
    if (buckets.weaponMods) out.mod = buckets.weaponMods[0];

    // Sockets the weapon genuinely lacks are recorded as absent, and
    // S.columnsFor treats an explicit null as "this gun has no such column".
    ['barrel', 'magazine', 'trait1', 'trait2', 'origin', 'masterwork', 'mod'].forEach(function (k) {
      if (!out[k]) out[k] = null;
    });
    return out;
  }

  function reduceDefs(defs, plugSets, onProgress) {
    var weapons = [], armor = [], plugs = {}, mods = [], rolls = {};
    var keys = Object.keys(defs);
    var seenWeaponNames = {}, seenArmorNames = {};
    var plugOwner = {};   // plug hash -> { id, bucket }

    /* Pass one: plugs. Weapons reference them, so they have to exist first. */
    for (var i = 0; i < keys.length; i++) {
      if (onProgress && (i % 6000 === 0)) onProgress(i / keys.length * 0.45);
      var def = defs[keys[i]];
      if (!def || !def.displayProperties || !def.displayProperties.name) continue;
      if (def.redacted) continue;
      if (!(def.itemType === 19 || (def.plug && def.plug.plugCategoryIdentifier))) continue;

      var pci = def.plug && def.plug.plugCategoryIdentifier;
      var bucket = plugBucket(pci);
      if (!bucket) continue;

      var entry = {
        id: 'm_' + def.hash,
        hash: def.hash,
        name: def.displayProperties.name,
        desc: (def.displayProperties.description || '').trim(),
        icon: icon(def),
        cost: (def.plug && def.plug.energyCost && def.plug.energyCost.energyCost) || 0,
        source: 'manifest'
      };

      if (bucket === 'armorMods') {
        var st = modStats(def);
        var cat = modCategory(pci);
        // A mod we cannot place, or a cosmetic with no effect we model, would
        // sit in the picker doing nothing. Leave it out.
        if (!cat) continue;
        if (cat === 'general' && !st) continue;
        entry.cat = cat === 'artifice' ? 'artifice' : cat;
        if (st) entry.stats = st;
        mods.push(entry);
        continue;
      }

      plugOwner[def.hash] = { id: entry.id, bucket: bucket };
      (plugs[bucket] = plugs[bucket] || []).push(entry);
    }

    /* Pass two: weapons and armor. */
    for (var j = 0; j < keys.length; j++) {
      if (onProgress && (j % 6000 === 0)) onProgress(0.45 + j / keys.length * 0.55);
      var d = defs[keys[j]];
      if (!d || !d.displayProperties || !d.displayProperties.name) continue;
      if (d.redacted) continue;
      var name = d.displayProperties.name;
      var slot = BUCKET[d.inventory && d.inventory.bucketTypeHash];
      if (!slot) continue;
      var tier = TIER[d.inventory && d.inventory.tierType];
      if (tier !== 'exotic' && tier !== 'legendary') continue;

      if (d.itemType === 3 && WEAPON_BUCKETS[slot]) {
        // Sunset reissues share a name; keep the first of each name per slot.
        var wkey = slot + '|' + name;
        if (seenWeaponNames[wkey]) continue;
        seenWeaponNames[wkey] = true;

        var ammo = AMMO[d.equippingBlock && d.equippingBlock.ammoType] ||
                   (slot === 'power' ? 'heavy' : 'primary');
        var type = weaponType(d, ammo);
        if (!type || !G.weaponTypeById[type]) continue;

        var w = {
          id: 'm_' + d.hash,
          hash: d.hash,
          name: name,
          type: type,
          slot: slot,
          ammo: ammo,
          element: DAMAGE[d.defaultDamageType] || 'kinetic',
          rarity: tier,
          icon: icon(d),
          classId: CLASS[d.classType] || null,
          flavor: d.flavorText || '',
          source: 'manifest'
        };
        weapons.push(w);

        var r = weaponRolls(d, plugSets, plugOwner);
        if (r) rolls[d.hash] = r;
        continue;
      }

      if (d.itemType === 2 && ARMOR_BUCKETS[slot]) {
        var akey = slot + '|' + name + '|' + d.classType;
        if (seenArmorNames[akey]) continue;
        seenArmorNames[akey] = true;

        armor.push({
          id: 'm_' + d.hash,
          hash: d.hash,
          name: name,
          slot: slot,
          rarity: tier,
          classId: CLASS[d.classType] || null,
          icon: icon(d),
          // The armor definition itself carries no perk text -- the Exotic perk
          // lives in a socket plug. Rather than pass flavour text off as a perk
          // description, say plainly where the description came from.
          perk: tier === 'exotic' ? 'Exotic perk' : '',
          perkDesc: d.flavorText || d.displayProperties.description || '',
          descIsFlavor: true,
          source: 'manifest'
        });
      }
    }

    weapons.sort(function (a, b) { return a.name.localeCompare(b.name); });
    armor.sort(function (a, b) { return a.name.localeCompare(b.name); });
    mods.sort(function (a, b) { return a.name.localeCompare(b.name); });
    return { weapons: weapons, armor: armor, plugs: plugs, mods: mods, rolls: rolls, syncedAt: Date.now() };
  }

  /* ------------------------- sync ------------------------- */

  M.sync = function (apiKey, onStatus) {
    function say(text, pct) { if (onStatus) onStatus(text, pct); }

    // Browsers refuse cross-origin requests from a file:// page, and the error
    // they give ("Failed to fetch") explains nothing. Say the real reason.
    if (location.protocol === 'file:') {
      return Promise.reject(new Error(
        'this page is open from a file, and browsers block network requests there. ' +
        'Run serve.ps1 and open http://localhost:8123 instead.'
      ));
    }

    var paths;
    say('Contacting Bungie…', 0.02);
    return fetch(BUNGIE + '/Platform/Destiny2/Manifest/', { headers: { 'X-API-Key': apiKey } })
      .then(function (r) {
        if (r.status === 401) throw new Error('That API key was rejected. Check it at bungie.net/developer.');
        if (!r.ok) throw new Error('Bungie returned HTTP ' + r.status + '.');
        return r.json();
      })
      .then(function (json) {
        var all = json && json.Response && json.Response.jsonWorldComponentContentPaths;
        paths = all && (all.en || all[Object.keys(all)[0]]);
        if (!paths || !paths.DestinyInventoryItemDefinition) {
          throw new Error('Bungie did not return an item definition path.');
        }
        say('Downloading plug sets…', 0.08);
        // Plug sets are what turn "this weapon has a socket" into "this weapon
        // rolls these seven perks". Without them the app can only guess.
        return paths.DestinyPlugSetDefinition
          ? fetch(BUNGIE + paths.DestinyPlugSetDefinition).then(function (r) {
              return r.ok ? r.json() : {};
            }).catch(function () { return {}; })
          : {};
      })
      .then(function (plugSets) {
        say('Downloading item definitions (this is the big one)…', 0.16);
        return fetch(BUNGIE + paths.DestinyInventoryItemDefinition).then(function (r) {
          if (!r.ok) throw new Error('Could not download definitions: HTTP ' + r.status + '.');
          return r.json();
        }).then(function (defs) { return { defs: defs, plugSets: plugSets }; });
      })
      .then(function (bundle) {
        say('Reducing to what this app needs…', 0.62);
        var reduced = reduceDefs(bundle.defs, bundle.plugSets, function (frac) {
          say('Reducing to what this app needs…', 0.62 + frac * 0.28);
        });
        say('Saving locally…', 0.94);
        return idbPut('reduced', reduced).then(function () { return reduced; });
      })
      .then(function (reduced) {
        loaded = reduced;
        M.ready = true;
        D2.settings.set('manifestEnabled', true);
        D2.settings.set('lastSync', reduced.syncedAt);
        say('Done', 1);
        D2.bus.emit('manifest:ready', reduced);
        return reduced;
      });
  };

  M.load = function () {
    return idbGet('reduced').then(function (data) {
      if (!data) return null;
      loaded = data;
      M.ready = true;
      D2.bus.emit('manifest:ready', data);
      return data;
    }).catch(function () { return null; });
  };

  M.clear = function () {
    return idbClear().then(function () {
      loaded = { weapons: [], armor: [], plugs: {}, rolls: {}, mods: [] };
      M.ready = false;
      S.setManifestRolls(null);
      D2.settings.set('manifestEnabled', false);
      D2.settings.set('lastSync', null);
      D2.bus.emit('manifest:ready', null);
    });
  };

  M.stats = function () {
    return {
      ready: M.ready,
      weapons: (loaded.weapons || []).length,
      armor: (loaded.armor || []).length,
      mods: (loaded.mods || []).length,
      rolls: Object.keys(loaded.rolls || {}).length,
      plugs: Object.keys(loaded.plugs || {}).reduce(function (n, k) { return n + loaded.plugs[k].length; }, 0),
      syncedAt: loaded.syncedAt || null
    };
  };

  /* ------------------------- pools -------------------------
     Curated entries come first so hand-written Exotic perk text survives, and
     manifest items fill in everything the offline library never had. */

  function reindex() {
    (loaded.weapons || []).forEach(function (w) { S.weaponById[w.id] = w; });
    (loaded.armor || []).forEach(function (a) {
      if (a.rarity === 'exotic') S.exoticArmorById[a.id] = a;
    });
    // Perk lookups have to resolve for every imported plug, not only the ones a
    // picker happened to build a list from.
    Object.keys(loaded.plugs || {}).forEach(function (bucket) {
      loaded.plugs[bucket].forEach(function (p) { S.perkIndex[p.id] = p; });
    });
    (loaded.mods || []).forEach(function (m) { S.modById[m.id] = m; });
    S.setManifestRolls(loaded.rolls || null);
  }
  D2.bus.on('manifest:ready', reindex);

  function curatedNames(list) {
    var set = {};
    list.forEach(function (x) { set[U.fold(x.name)] = true; });
    return set;
  }

  M.weaponPool = function () {
    if (!M.ready || !loaded.weapons.length) return S.weapons;
    var taken = curatedNames(S.weapons);
    var extra = loaded.weapons.filter(function (w) { return !taken[U.fold(w.name)]; });
    return S.weapons.concat(extra);
  };

  M.exoticArmorPool = function () {
    if (!M.ready || !(loaded.armor || []).length) return S.exoticArmor;
    var exotics = loaded.armor.filter(function (a) { return a.rarity === 'exotic'; });
    var taken = curatedNames(S.exoticArmor);
    var extra = exotics.filter(function (a) { return !taken[U.fold(a.name)]; });
    return S.exoticArmor.concat(extra);
  };

  /* Every Legendary armor piece in the game, for the armor-set field and for
     naming a piece rather than leaving it as an anonymous "Legendary". */
  M.legendaryArmorPool = function () {
    if (!M.ready || !(loaded.armor || []).length) return [];
    return loaded.armor.filter(function (a) { return a.rarity === 'legendary'; });
  };

  M.plugPool = function (bucket, curated) {
    if (!M.ready || !loaded.plugs || !loaded.plugs[bucket]) return curated;
    var taken = curatedNames(curated);
    var extra = loaded.plugs[bucket].filter(function (p) { return p.name && !taken[U.fold(p.name)]; });
    return curated.concat(extra);
  };

  M.modPool = function () {
    if (!M.ready || !(loaded.mods || []).length) return S.mods;
    var taken = curatedNames(S.mods);
    var extra = loaded.mods.filter(function (m) { return !taken[U.fold(m.name)]; });
    return S.mods.concat(extra);
  };

  /* Does this weapon have exact roll data? Used by the interface to say so. */
  M.hasRolls = function (weapon) {
    return !!(M.ready && weapon && weapon.hash != null && loaded.rolls && loaded.rolls[weapon.hash]);
  };
})(window.D2);
