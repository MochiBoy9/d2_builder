/* Starter builds.

   A blank builder is a fair ask of someone who already knows what they want and
   a wall to someone who does not. These are complete, legal, well-known builds
   you can load whole and then take apart -- which is how most people actually
   learn what a Fragment does.

   Each one loads as an ordinary build: nothing about it is locked, and editing
   it is the point. Armor is set to plausible archetypes rather than perfect
   rolls, because a preset that assumes five tier-5 pieces would be lying about
   what you have in your vault. Every id here is checked against the database at
   load time, so a data change makes a preset disappear rather than produce a
   broken build. */
(function (D2) {
  'use strict';
  var G = D2.game, S = D2.data, U = D2.util;

  var P = D2.presets = {};

  /* Armor shorthand: [archetype, secondary, tier, masterworked, mods...] */
  function piece(archetype, secondary, tier, mw, mods) {
    return { archetype: archetype, secondary: secondary, tier: tier || 4, masterworked: !!mw, mods: mods || [] };
  }

  var LIST = [
    {
      id: 'p_titan_sunspot',
      name: 'Sunspot Bruiser',
      classId: 'titan',
      element: 'solar',
      forLevel: 'beginner',
      pitch: 'Stand in fire, get healed by fire. The most forgiving build in the game to learn on.',
      how: 'Throw the hammer, pick it back up — that heals you and refunds the melee. ' +
           'Your barricade and your Solar kills leave Sunspots on the ground; standing in one ' +
           'keeps you alive. Loreley does it for you automatically when you get hurt.',
      subclass: {
        superId: 'su_hammer_of_sol',
        grenadeId: 'g_healing',
        meleeId: 'm_throwing_hammer',
        classAbilityId: 'ca_rally_barricade',
        movementId: 'mv_catapult_lift',
        aspects: ['as_sol_invictus', 'as_roaring_flames'],
        fragments: ['fr_torches', 'fr_searing', 'fr_empyrean', 'fr_solace']
      },
      weapons: { kinetic: 'lg_austringer', energy: 'x_sunshot', power: 'lg_commemoration' },
      armor: {
        helmet:    piece('bulwark', 'weapons', 4, true, ['mod_solar_siphon']),
        gauntlets: piece('brawler', 'weapons', 4, false, ['mod_heavy_handed']),
        chest:     piece('bulwark', 'class', 4, false, ['mod_health']),
        legs:      piece('gunner', 'health', 4, false, ['mod_solar_surge', 'mod_recuperation']),
        classitem: piece('specialist', 'health', 4, false, ['mod_bomber'])
      },
      exoticArmor: { slot: 'helmet', id: 'ea_loreley' }
    },

    {
      id: 'p_hunter_invis',
      name: 'Invisible Support Hunter',
      classId: 'hunter',
      element: 'void',
      forLevel: 'beginner',
      pitch: 'Disappear whenever things go wrong, and make your fireteam hit harder while you do it.',
      how: 'Dodge to go invisible. Coming out of invisibility gives your Void weapons ' +
           'Volatile Rounds, which make everything you shoot explode. If a fight turns, ' +
           'dodge again — you are the hardest class in the game to kill once this loop starts.',
      subclass: {
        superId: 'su_ss_deadfall',
        grenadeId: 'g_vortex',
        meleeId: 'm_snare_bomb',
        classAbilityId: 'ca_gamblers_dodge',
        movementId: 'mv_triple_jump',
        aspects: ['as_vanishing_step', 'as_stylish_executioner'],
        fragments: ['fr_persistence', 'fr_starvation', 'fr_harvest', 'fr_undermining']
      },
      weapons: { kinetic: 'lg_fatebringer', energy: 'x_graviton_lance', power: 'lg_commemoration' },
      armor: {
        helmet:    piece('bulwark', 'class', 4, true, ['mod_void_siphon']),
        gauntlets: piece('specialist', 'weapons', 4, false, ['mod_impact_induction']),
        chest:     piece('bulwark', 'grenade', 4, false, ['mod_health']),
        legs:      piece('gunner', 'health', 4, false, ['mod_void_surge', 'mod_absolution']),
        classitem: piece('specialist', 'grenade', 4, false, ['mod_bomber'])
      },
      exoticArmor: { slot: 'chest', id: 'ea_gyrfalcons' }
    },

    {
      id: 'p_warlock_well',
      name: 'Well of Radiance',
      classId: 'warlock',
      element: 'solar',
      forLevel: 'beginner',
      pitch: 'The fireteam-carrying Super. Drop it on a boss and everyone standing in it stops dying.',
      how: 'Healing grenade keeps you and an ally alive between fights. Touch of Flame ' +
           'makes that grenade much stronger. Save the Super for a damage phase or a room ' +
           'you are losing — it heals and buffs everyone inside it.',
      subclass: {
        superId: 'su_well_of_radiance',
        grenadeId: 'g_healing',
        meleeId: 'm_incinerator_snap',
        classAbilityId: 'ca_healing_rift',
        movementId: 'mv_burst_glide',
        aspects: ['as_touch_of_flame', 'as_hellion'],
        fragments: ['fr_torches', 'fr_singeing', 'fr_benevolence', 'fr_solace']
      },
      weapons: { kinetic: 'lg_hung_jury', energy: 'lg_calus_mini', power: 'lg_apex_predator' },
      armor: {
        helmet:    piece('bulwark', 'super', 4, true, ['mod_ashes_to_assets']),
        gauntlets: piece('grenadier', 'weapons', 4, false, ['mod_bolstering_det']),
        chest:     piece('bulwark', 'grenade', 4, false, ['mod_health']),
        legs:      piece('paragon', 'health', 4, false, ['mod_solar_surge', 'mod_innervation']),
        classitem: piece('grenadier', 'super', 4, false, ['mod_bomber'])
      },
      exoticArmor: { slot: 'gauntlets', id: 'ea_sunbracers' }
    },

    {
      id: 'p_titan_prismatic',
      name: 'Prismatic Consecration',
      classId: 'titan',
      element: 'prismatic',
      forLevel: 'midgame',
      pitch: 'Slide-melee, slam, repeat. The endgame add-clear Titan.',
      how: 'Slide then melee to fire a Solar wave; melee again immediately to slam. ' +
           'Knockout heals you on melee kills and Facet of Ruin makes the slam bigger. ' +
           'Every kill feeds the loop, so you almost never stop swinging.',
      subclass: {
        superId: 'su_twilight_arsenal',
        grenadeId: 'g_glacier',
        meleeId: 'm_frenzied_blade',
        classAbilityId: 'ca_rally_barricade',
        movementId: 'mv_strafe_lift',
        aspects: ['as_p_consecration', 'as_p_knockout'],
        fragments: ['fr_ruin', 'fr_dawn', 'fr_courage']
      },
      weapons: { kinetic: 'lg_rose', energy: 'lg_forbearance', power: 'lg_falling_guillotine' },
      armor: {
        helmet:    piece('brawler', 'weapons', 5, true, ['mod_hands_on']),
        gauntlets: piece('brawler', 'class', 5, true, ['mod_heavy_handed']),
        chest:     piece('bulwark', 'melee', 5, true, ['mod_health']),
        legs:      piece('gunner', 'health', 5, true, ['mod_solar_surge', 'mod_invigoration']),
        classitem: piece('specialist', 'melee', 5, true, ['mod_outreach'])
      },
      exoticArmor: { slot: 'gauntlets', id: 'ea_wormgod_caress' }
    },

    {
      id: 'p_hunter_arc',
      name: 'Combination Blow Arcstrider',
      classId: 'hunter',
      element: 'arc',
      forLevel: 'midgame',
      pitch: 'Punch, heal, punch harder. A melee loop that gets stronger the longer it runs.',
      how: 'Combination Blow kills heal you and stack melee damage; Gambler\'s Dodge near an ' +
           'enemy refunds the melee outright. Assassin\'s Cowl turns each kill into ' +
           'invisibility and a full heal, which is what makes this survivable at high difficulty.',
      subclass: {
        superId: 'su_arc_staff',
        grenadeId: 'g_arcbolt',
        meleeId: 'm_combination_blow',
        classAbilityId: 'ca_gamblers_dodge',
        movementId: 'mv_triple_jump',
        aspects: ['as_flow_state', 'as_lethal_current'],
        fragments: ['fr_shock', 'fr_feedback', 'fr_amplitude', 'fr_ions']
      },
      weapons: { kinetic: 'lg_bygones', energy: 'x_riskrunner', power: 'lg_hammerhead' },
      armor: {
        helmet:    piece('brawler', 'class', 5, true, ['mod_arc_siphon']),
        gauntlets: piece('brawler', 'weapons', 5, true, ['mod_heavy_handed']),
        chest:     piece('bulwark', 'melee', 5, true, ['mod_health']),
        legs:      piece('specialist', 'health', 5, true, ['mod_arc_surge', 'mod_invigoration']),
        classitem: piece('specialist', 'melee', 5, true, ['mod_outreach'])
      },
      exoticArmor: { slot: 'helmet', id: 'ea_assassins_cowl' }
    },

    {
      id: 'p_warlock_starfire',
      name: 'Starfire Grenade Loop',
      classId: 'warlock',
      element: 'solar',
      forLevel: 'veteran',
      pitch: 'Two Fusion Grenades, an Empowering Rift, and enough uptime to never run dry.',
      how: 'Empowering Rift plus Starfire gives a second grenade charge. Fusion Grenade ' +
           'damage returns rift energy, and Touch of Flame makes each grenade detonate twice. ' +
           'Grenade stat is the whole build — get it as high as you can stand.',
      subclass: {
        superId: 'su_daybreak',
        grenadeId: 'g_fusion',
        meleeId: 'm_incinerator_snap',
        classAbilityId: 'ca_empowering_rift',
        movementId: 'mv_burst_glide',
        aspects: ['as_touch_of_flame', 'as_heat_rises'],
        fragments: ['fr_ashes', 'fr_char', 'fr_blistering', 'fr_singeing']
      },
      weapons: { kinetic: 'lg_austringer', energy: 'lg_cartesian', power: 'lg_apex_predator' },
      armor: {
        helmet:    piece('grenadier', 'health', 5, true, ['mod_ashes_to_assets']),
        gauntlets: piece('grenadier', 'weapons', 5, true, ['mod_bolstering_det']),
        chest:     piece('bulwark', 'grenade', 5, true, ['mod_health']),
        legs:      piece('grenadier', 'health', 5, true, ['mod_solar_surge', 'mod_innervation']),
        classitem: piece('grenadier', 'class', 5, true, ['mod_bomber'])
      },
      exoticArmor: { slot: 'chest', id: 'ea_starfire_protocol' }
    }
  ];

  /* ---------------------------------------------------------------------
     Validation. A preset that names something the database does not have is
     a bug, and shipping it would produce a build the app then flags as
     illegal. Drop it instead, and say so in the console rather than in the
     user's face. */

  function idsExist(preset) {
    var missing = [];
    var pools = D2.build.pools(preset.classId, preset.element);

    function has(list, id) { return !id || list.some(function (x) { return x.id === id; }); }

    if (!has(pools.supers, preset.subclass.superId)) missing.push(preset.subclass.superId);
    if (!has(pools.grenades, preset.subclass.grenadeId)) missing.push(preset.subclass.grenadeId);
    if (!has(pools.melees, preset.subclass.meleeId)) missing.push(preset.subclass.meleeId);
    if (!has(pools.classAbilities, preset.subclass.classAbilityId)) missing.push(preset.subclass.classAbilityId);
    if (!has(pools.movements, preset.subclass.movementId)) missing.push(preset.subclass.movementId);
    preset.subclass.aspects.forEach(function (id) { if (!has(pools.aspects, id)) missing.push(id); });
    preset.subclass.fragments.forEach(function (id) { if (!has(pools.fragments, id)) missing.push(id); });

    Object.keys(preset.weapons).forEach(function (slot) {
      var id = preset.weapons[slot];
      var w = id && S.weaponById[id];
      if (!w) { missing.push(id); return; }
      if (S.slotsForWeapon(w).indexOf(slot) === -1) missing.push(id + ' (wrong slot)');
    });

    if (preset.exoticArmor) {
      var ex = S.exoticArmorById[preset.exoticArmor.id];
      if (!ex) missing.push(preset.exoticArmor.id);
      else if (ex.classId !== preset.classId || ex.slot !== preset.exoticArmor.slot) {
        missing.push(preset.exoticArmor.id + ' (wrong class or slot)');
      }
    }

    Object.keys(preset.armor).forEach(function (slot) {
      (preset.armor[slot].mods || []).forEach(function (m) {
        if (!S.modById[m]) missing.push(m);
      });
    });

    return missing;
  }

  P.all = function () {
    return LIST.filter(function (p) {
      if (p._checked === undefined) {
        var missing = idsExist(p);
        p._checked = missing.length === 0;
        if (missing.length) {
          console.warn('[D2] preset "' + p.name + '" disabled — unknown ids:', missing);
        }
      }
      return p._checked;
    });
  };

  P.forClass = function (classId) {
    return P.all().filter(function (p) { return !classId || p.classId === classId; });
  };

  /* Presets are surfaced by level, but never hidden from someone who wants
     them: a veteran can still load a beginner preset, it just is not pushed. */
  P.suggested = function () {
    var lvl = D2.level.current();
    var all = P.all();
    var mine = all.filter(function (p) { return p.forLevel === lvl; });
    return mine.length ? mine : all;
  };

  P.get = function (id) {
    return P.all().filter(function (p) { return p.id === id; })[0] || null;
  };

  /* Turn a preset into a real build object. */
  P.toBuild = function (preset) {
    var b = D2.build.create();
    b.name = preset.name;
    b.classId = preset.classId;
    b.element = preset.element;
    b.tags = preset.tags || ['pve'];
    b.fromPreset = preset.id;

    b.subclass.superId = preset.subclass.superId;
    b.subclass.grenadeId = preset.subclass.grenadeId;
    b.subclass.meleeId = preset.subclass.meleeId;
    b.subclass.classAbilityId = preset.subclass.classAbilityId;
    b.subclass.movementId = preset.subclass.movementId;
    b.subclass.aspects = preset.subclass.aspects.slice(0, S.MAX_ASPECTS);
    while (b.subclass.aspects.length < S.MAX_ASPECTS) b.subclass.aspects.push(null);
    b.subclass.fragments = preset.subclass.fragments.slice();
    D2.build.trimFragments(b);

    Object.keys(preset.weapons).forEach(function (slot) {
      b.weapons[slot].weaponId = preset.weapons[slot];
    });

    G.armorSlots.forEach(function (s) {
      var spec = preset.armor[s.id];
      if (!spec) return;
      var p = b.armor[s.id];
      p.archetype = spec.archetype;
      p.secondary = spec.secondary;
      p.tier = spec.tier;
      p.masterworked = spec.masterworked;
      (spec.mods || []).forEach(function (m, i) { if (i < S.MOD_SOCKETS) p.mods[i] = m; });
    });

    if (preset.exoticArmor) {
      b.armor[preset.exoticArmor.slot].exoticId = preset.exoticArmor.id;
    }

    return b;
  };

  /* A one-line reason to trust the preset, computed rather than claimed. */
  P.statLine = function (preset) {
    var b = P.toBuild(preset);
    var totals = D2.build.computeStats(b).total;
    return G.stats.map(function (st) {
      return st.abbr + ' ' + totals[st.id];
    }).join('  ');
  };

  P.uid = U.uid;
})(window.D2);
