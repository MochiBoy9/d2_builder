/* Per-weapon perk columns.

   A perk column is not "every perk that exists for this weapon type" -- it is
   the specific list that rolls on that specific gun, and the columns a gun has
   at all differ by type and rarity. A Hand Cannon has no Battery. An Exotic has
   no random trait columns. A pre-Witch Queen raid weapon has no Origin Trait.
   Showing a perk that cannot roll is worse than showing nothing, because it
   invites you to plan a roll you can never chase.

   Three sources, best first, and the interface says which one it used:

     exact    Bungie's own socket data for that weapon hash, pulled by manifest
              sync. Every gun in the game, exactly right.
     curated  A hand-written roll list in this file. Correct at the time of
              writing for the weapons most people build around.
     pool     The type-filtered fallback: everything that plausibly rolls on
              this kind of weapon. Honest about being an approximation.

   Column keys match the build model: barrel, magazine, trait1, trait2, origin,
   masterwork, mod. A column set to null does not exist on that weapon and is
   not rendered at all. */
(function (D2) {
  'use strict';
  var S = D2.data;

  /* ================= shared column pools =================
     Named so a curated entry reads as a roll list rather than as a wall of
     ids, and so a correction to one standard column fixes every gun using it. */

  var RIFLE_BARRELS = ['b_arrowhead', 'b_chambered', 'b_corkscrew', 'b_extended',
    'b_fluted', 'b_full_bore', 'b_hammer_forged', 'b_polygonal', 'b_smallbore'];

  var STD_MAGS = ['mg_accurized', 'mg_alloy', 'mg_appended', 'mg_armor_piercing',
    'mg_extended', 'mg_flared', 'mg_high_caliber', 'mg_light_mag', 'mg_ricochet',
    'mg_steady', 'mg_tactical'];

  var LAUNCH_BARRELS = ['b_hard_launch', 'b_volatile_launch', 'b_quick_launch',
    'b_countermass', 'b_confined_launch', 'b_smart_drift', 'b_projection', 'b_high_velocity'];

  var BATTERIES = ['b_enhanced_battery', 'b_particle_repeater', 'b_projection_fuse',
    'b_liquid_coils', 'b_ionized_battery'];

  var BOWSTRINGS = ['b_elastic_string', 'b_natural_string', 'b_tactile_string',
    'b_flexible_string', 'b_agile_bstring'];

  var BLADES = ['b_honed_edge', 'b_jagged_edge', 'b_tempered_edge', 'b_hungry_edge'];
  var GUARDS = ['b_enduring_guard', 'b_balanced_guard', 'b_swordmasters'];

  S.columnPools = {
    rifleBarrels: RIFLE_BARRELS,
    stdMags: STD_MAGS,
    launchBarrels: LAUNCH_BARRELS,
    batteries: BATTERIES,
    bowstrings: BOWSTRINGS,
    blades: BLADES,
    guards: GUARDS
  };

  /* ================= trait restrictions =================
     A sword perk has no business appearing in a Hand Cannon's trait column. The
     trait list itself stays readable as a flat list of every trait in the game;
     the restrictions live here, applied once at load, so a correction is a
     one-line edit rather than a hunt through 140 entries.

     Only genuinely type-bound traits are listed. A trait absent from this table
     is offered on every weapon that has a trait column, which is the honest
     default for the large majority that really do roll widely. */

  var ADS_GUNS = ['auto_rifle', 'hand_cannon', 'pulse_rifle', 'scout_rifle',
    'submachine_gun', 'sidearm', 'shotgun', 'sniper_rifle', 'fusion_rifle',
    'trace_rifle', 'machine_gun', 'linear_fusion'];
  var SWORDS = ['sword'];
  var MELEE_WEAPONS = ['sword', 'glaive'];
  var CHARGED = ['fusion_rifle', 'linear_fusion'];
  var EXPLOSIVE = ['breech_gl', 'heavy_gl', 'rocket_launcher'];
  var ROCKETS = ['rocket_launcher'];
  var SHOTGUNS = ['shotgun'];
  var BOWS = ['bow'];
  var PRECISION_SLOW = ['sniper_rifle', 'linear_fusion', 'bow', 'scout_rifle'];

  var TRAIT_ON = {
    // Swords and glaives
    tr_whirlwind_blade: SWORDS,
    tr_relentless_strikes: SWORDS,
    tr_tireless_blade: SWORDS,
    tr_eager_edge: SWORDS,
    tr_assassins_blade: SWORDS,
    tr_energy_transfer: SWORDS,
    tr_slice: MELEE_WEAPONS,
    tr_flash_counter: MELEE_WEAPONS,
    tr_duelists_trance: MELEE_WEAPONS,
    tr_immovable_object: MELEE_WEAPONS,
    tr_replenishing_aegis: MELEE_WEAPONS,
    tr_vorpal_glaive: ['glaive'],

    // Charge weapons
    tr_backup_plan: CHARGED,
    tr_successful_warmup: CHARGED,
    tr_reservoir_burst: CHARGED,
    tr_controlled_burst: CHARGED,
    tr_redirection: CHARGED,
    tr_chill_clip: CHARGED.concat(EXPLOSIVE, ['sidearm']),

    // Explosives
    tr_danger_zone: EXPLOSIVE,
    tr_blast_radius: EXPLOSIVE,
    tr_full_court: EXPLOSIVE,
    tr_bipod: EXPLOSIVE,
    tr_impulse_amplifier: EXPLOSIVE,
    tr_cluster_bomb: ROCKETS,
    tr_tracking_module: ROCKETS,
    tr_lasting_impression: ROCKETS,

    // Shotguns
    tr_trench_barrel: SHOTGUNS,
    tr_one_two_punch: SHOTGUNS,
    tr_offhand_strike: SHOTGUNS.concat(['sidearm', 'submachine_gun']),
    tr_closing_time: SHOTGUNS.concat(['sidearm', 'submachine_gun', 'fusion_rifle']),

    // Bows
    tr_archers_tempo: BOWS,
    tr_circle_of_life: BOWS,

    // Aim-down-sights behaviour has no meaning on a sword
    tr_box_breathing: PRECISION_SLOW,
    tr_snapshot: ADS_GUNS,
    tr_no_distractions: ADS_GUNS,
    tr_opening_shot: ADS_GUNS,
    tr_firmly_planted: ADS_GUNS,
    tr_rangefinder: ADS_GUNS,
    tr_firing_line: ['sniper_rifle', 'linear_fusion', 'fusion_rifle', 'scout_rifle',
      'hand_cannon', 'bow', 'machine_gun', 'sidearm', 'pulse_rifle'],
    tr_precision_instrument: ADS_GUNS.concat(BOWS),
    tr_headseeker: ['pulse_rifle', 'hand_cannon', 'scout_rifle', 'auto_rifle', 'sidearm'],
    tr_hip_fire_grip: ADS_GUNS,
    tr_dual_loader: ['rocket_launcher', 'heavy_gl', 'shotgun', 'sniper_rifle'],

    // Reload behaviours that need a magazine
    tr_triple_tap: ADS_GUNS,
    tr_fourth_times: ADS_GUNS,
    tr_rewind_rounds: ADS_GUNS.concat(EXPLOSIVE)
  };

  S.traits.forEach(function (tr) {
    if (TRAIT_ON[tr.id] && !tr.on) tr.on = TRAIT_ON[tr.id];
  });

  /* The trait id was written as tr_veist_stinger but the perk is Subsistence;
     the origin trait Veist Stinger is a different thing entirely. Renamed, with
     the old id kept resolvable so builds saved before the fix still load. */
  if (S.perkIndex && S.perkIndex.tr_subsistence) {
    S.perkIndex.tr_veist_stinger = S.perkIndex.tr_subsistence;
  }

  /* ================= type allow-lists =================
     Swords, glaives, bows and rockets share almost nothing with a rifle's trait
     pool, and restriction-by-exception leaves them with far too much. For those
     four, the pool fallback uses an allow-list instead: still an approximation,
     but one in the right order of magnitude. */

  var TYPE_TRAITS = {
    sword: ['tr_relentless_strikes', 'tr_tireless_blade', 'tr_energy_transfer',
      'tr_whirlwind_blade', 'tr_eager_edge', 'tr_assassins_blade', 'tr_flash_counter',
      'tr_duelists_trance', 'tr_immovable_object', 'tr_replenishing_aegis', 'tr_slice',
      'tr_vorpal', 'tr_bait_and_switch', 'tr_chain_reaction', 'tr_frenzy', 'tr_surrounded',
      'tr_thresh', 'tr_attrition_orbs', 'tr_demolitionist', 'tr_wellspring', 'tr_one_for_all',
      'tr_sword_logic', 'tr_repulsor_brace', 'tr_grave_robber', 'tr_swashbuckler',
      'tr_jolting_feedback', 'tr_hatchling', 'tr_incandescent'],

    glaive: ['tr_vorpal_glaive', 'tr_immovable_object', 'tr_replenishing_aegis',
      'tr_unrelenting', 'tr_swashbuckler', 'tr_frenzy', 'tr_demolitionist', 'tr_hatchling',
      'tr_destabilizing', 'tr_incandescent', 'tr_voltshot', 'tr_headstone', 'tr_lead_from_gold',
      'tr_grave_robber', 'tr_perpetual_motion', 'tr_thresh', 'tr_chain_reaction',
      'tr_repulsor_brace', 'tr_flash_counter', 'tr_duelists_trance', 'tr_slice',
      'tr_attrition_orbs', 'tr_one_for_all', 'tr_vorpal', 'tr_close_to_melee',
      'tr_impulse_amplifier', 'tr_kill_clip'],

    bow: ['tr_archers_tempo', 'tr_circle_of_life', 'tr_dragonfly', 'tr_hatchling',
      'tr_incandescent', 'tr_headstone', 'tr_destabilizing', 'tr_repulsor_brace',
      'tr_shoot_to_loot', 'tr_precision_instrument', 'tr_desperate_measures', 'tr_frenzy',
      'tr_vorpal', 'tr_perpetual_motion', 'tr_killing_wind', 'tr_moving_target',
      'tr_dynamic_sway', 'tr_no_distractions', 'tr_wellspring', 'tr_demolitionist',
      'tr_thresh', 'tr_pulse_monitor', 'tr_explosive_head', 'tr_successful_warmup',
      'tr_opening_shot', 'tr_rangefinder', 'tr_firing_line', 'tr_enlightened_action',
      'tr_attrition_orbs', 'tr_golden_tricorn', 'tr_focused_fury'],

    rocket_launcher: ['tr_reconstruction', 'tr_envious_assassin', 'tr_envious_arsenal',
      'tr_auto_loading', 'tr_field_prep', 'tr_clown_cartridge', 'tr_ambitious_assassin',
      'tr_impulse_amplifier', 'tr_tracking_module', 'tr_cluster_bomb', 'tr_bipod',
      'tr_bait_and_switch', 'tr_explosive_light', 'tr_lasting_impression', 'tr_frenzy',
      'tr_vorpal', 'tr_chain_reaction', 'tr_demolitionist', 'tr_wellspring',
      'tr_one_for_all', 'tr_dual_loader', 'tr_deconstruct', 'tr_attrition_orbs',
      'tr_thresh', 'tr_blast_radius']
  };

  var TYPE_MAGS = {
    bow: ['mg_helical_arrow', 'mg_straight_fletch', 'mg_fiberglass', 'mg_carbon_arrow',
      'mg_enhanced_bstring', 'mg_compulsive'],
    sword: GUARDS,
    glaive: GUARDS,
    rocket_launcher: ['mg_alloy', 'mg_appended', 'mg_high_caliber', 'mg_impact_casing',
      'mg_cluster', 'mg_black_powder', 'mg_alloy_casing', 'mg_tactical'],
    breech_gl: ['mg_alloy', 'mg_appended', 'mg_high_caliber', 'mg_spike', 'mg_implosion',
      'mg_blinding', 'mg_concussion', 'mg_disorienting', 'mg_proximity', 'mg_impact_casing', 'mg_tactical'],
    heavy_gl: ['mg_alloy', 'mg_appended', 'mg_high_caliber', 'mg_spike', 'mg_implosion',
      'mg_blinding', 'mg_concussion', 'mg_disorienting', 'mg_proximity', 'mg_impact_casing', 'mg_tactical'],
    fusion_rifle: ['mg_accurized', 'mg_alloy', 'mg_appended', 'mg_enhanced_batt',
      'mg_projectile_acc', 'mg_high_caliber', 'mg_tactical', 'mg_particle_repeater'],
    linear_fusion: ['mg_accurized', 'mg_alloy', 'mg_appended', 'mg_enhanced_batt',
      'mg_high_caliber', 'mg_tactical', 'mg_helical'],
    trace_rifle: ['mg_accurized', 'mg_alloy', 'mg_appended', 'mg_enhanced_batt',
      'mg_light_mag', 'mg_tactical']
  };

  /* ================= which columns a weapon type has =================
     Independent of the roll list: this is the socket layout, and it is what
     decides whether a column is drawn at all. */

  var NO_ORIGIN_TYPES = {};           // every type can carry one; per-weapon overrides below

  function columnsForType(typeId, rarity) {
    var cols = ['barrel', 'magazine'];

    // Exotics carry a fixed intrinsic instead of two rolled trait columns, and
    // their upgrade is the catalyst rather than a masterwork column.
    if (rarity === 'exotic') {
      cols.push('mod');
      return cols;
    }

    cols.push('trait1', 'trait2', 'origin', 'masterwork', 'mod');
    return cols;
  }

  /* Swords have no magazine socket -- the second column is the Guard. Glaives
     take a Battery there. Both are still the "magazine" key in the model; only
     the label and the pool change, which the label map in the builder handles. */

  function typePool(bucket, weapon) {
    var t = weapon.type;
    if (bucket === 'barrel') {
      if (t === 'bow') return BOWSTRINGS;
      if (t === 'sword') return BLADES;
      if (t === 'fusion_rifle' || t === 'linear_fusion' || t === 'trace_rifle') return BATTERIES;
      if (t === 'breech_gl' || t === 'heavy_gl' || t === 'rocket_launcher') return LAUNCH_BARRELS;
      if (t === 'glaive') return ['b_low_impedance', 'b_supercooled'];
      return null; // fall through to the type filter over the whole barrel list
    }
    if (bucket === 'magazine') return TYPE_MAGS[t] || null;
    if (bucket === 'trait1' || bucket === 'trait2') return TYPE_TRAITS[t] || null;
    return null;
  }

  /* ================= curated roll lists =================
     Hand-written for the weapons people actually build around. Each entry is
     what that gun can roll, not what its type can roll. Anything absent falls
     back to the type pool and is labelled as an approximation rather than
     presented as fact. */

  var curated = {};

  function r(weaponId, spec) { curated[weaponId] = spec; }

  /* --- Hand Cannons --- */
  r('lg_fatebringer', {
    barrel: RIFLE_BARRELS, magazine: STD_MAGS,
    trait1: ['tr_outlaw', 'tr_rapid_hit', 'tr_thresh', 'tr_shoot_to_loot', 'tr_moving_target', 'tr_zen_moment'],
    trait2: ['tr_firefly', 'tr_explosive_payload', 'tr_rampage', 'tr_frenzy', 'tr_opening_shot', 'tr_vorpal'],
    origin: null, masterwork: '*', mod: '*'
  });
  r('lg_austringer', {
    barrel: RIFLE_BARRELS, magazine: STD_MAGS,
    trait1: ['tr_outlaw', 'tr_rapid_hit', 'tr_perpetual_motion', 'tr_slideshot', 'tr_eye_of_the_storm', 'tr_pugilist', 'tr_subsistence'],
    trait2: ['tr_opening_shot', 'tr_explosive_payload', 'tr_rampage', 'tr_multikill_clip', 'tr_frenzy', 'tr_harmony', 'tr_gutshot_straight'],
    origin: ['ot_dealers_choice'], masterwork: '*', mod: '*'
  });
  r('lg_rose', {
    barrel: RIFLE_BARRELS, magazine: STD_MAGS,
    trait1: ['tr_outlaw', 'tr_rapid_hit', 'tr_perpetual_motion', 'tr_slideshot', 'tr_encore', 'tr_moving_target'],
    trait2: ['tr_opening_shot', 'tr_kill_clip', 'tr_precision_instrument', 'tr_headseeker', 'tr_explosive_payload'],
    origin: ['ot_alacrity', 'ot_one_quiet_moment'], masterwork: '*', mod: '*'
  });
  r('lg_igneous_hammer', {
    barrel: RIFLE_BARRELS, magazine: STD_MAGS,
    trait1: ['tr_outlaw', 'tr_rapid_hit', 'tr_slideshot', 'tr_perpetual_motion', 'tr_heal_clip', 'tr_pugilist'],
    trait2: ['tr_incandescent', 'tr_rampage', 'tr_kill_clip', 'tr_opening_shot', 'tr_precision_instrument', 'tr_adagio'],
    origin: ['ot_alacrity', 'ot_one_quiet_moment'], masterwork: '*', mod: '*'
  });
  r('lg_eyasluna', {
    barrel: RIFLE_BARRELS, magazine: STD_MAGS,
    trait1: ['tr_outlaw', 'tr_rapid_hit', 'tr_perpetual_motion', 'tr_encore', 'tr_shoot_to_loot', 'tr_slideshot'],
    trait2: ['tr_headstone', 'tr_kill_clip', 'tr_harmony', 'tr_opening_shot', 'tr_rampage', 'tr_eye_of_the_storm'],
    origin: null, masterwork: '*', mod: '*'
  });

  /* --- Auto / Pulse / Scout --- */
  r('lg_bygones', {
    barrel: RIFLE_BARRELS, magazine: STD_MAGS,
    trait1: ['tr_outlaw', 'tr_feeding_frenzy', 'tr_rapid_hit', 'tr_zen_moment', 'tr_moving_target'],
    trait2: ['tr_kill_clip', 'tr_rampage', 'tr_headseeker', 'tr_multikill_clip', 'tr_dragonfly'],
    origin: null, masterwork: '*', mod: '*'
  });
  r('lg_hung_jury', {
    barrel: RIFLE_BARRELS, magazine: STD_MAGS,
    trait1: ['tr_outlaw', 'tr_rapid_hit', 'tr_field_prep', 'tr_perpetual_motion', 'tr_shoot_to_loot', 'tr_fourth_times'],
    trait2: ['tr_explosive_payload', 'tr_firefly', 'tr_kill_clip', 'tr_one_for_all', 'tr_frenzy', 'tr_incandescent'],
    origin: ['ot_vanguards_vind'], masterwork: '*', mod: '*'
  });
  r('lg_ammit', {
    barrel: RIFLE_BARRELS, magazine: STD_MAGS,
    trait1: ['tr_subsistence', 'tr_rapid_hit', 'tr_perpetual_motion', 'tr_heal_clip', 'tr_enlightened_action'],
    trait2: ['tr_incandescent', 'tr_adrenaline_junkie', 'tr_frenzy', 'tr_target_lock', 'tr_desperate_measures'],
    origin: ['ot_nadir_focus'], masterwork: '*', mod: '*'
  });

  /* --- SMG / Sidearm --- */
  r('lg_calus_mini', {
    barrel: RIFLE_BARRELS, magazine: STD_MAGS,
    trait1: ['tr_subsistence', 'tr_perpetual_motion', 'tr_heal_clip', 'tr_threat_detector', 'tr_enlightened_action'],
    trait2: ['tr_incandescent', 'tr_multikill_clip', 'tr_swashbuckler', 'tr_target_lock', 'tr_one_for_all'],
    origin: ['ot_stunning_recovery'], masterwork: '*', mod: '*'
  });
  r('lg_the_call', {
    barrel: LAUNCH_BARRELS, magazine: ['mg_alloy', 'mg_appended', 'mg_flared', 'mg_tactical', 'mg_high_caliber'],
    trait1: ['tr_slideshot', 'tr_strategist', 'tr_lead_from_gold', 'tr_demolitionist', 'tr_envious_assassin'],
    trait2: ['tr_desperate_measures', 'tr_destabilizing', 'tr_chain_reaction', 'tr_repulsor_brace', 'tr_one_for_all'],
    origin: ['ot_indomitability'], masterwork: '*', mod: '*'
  });

  /* --- Special --- */
  r('lg_riptide', {
    barrel: BATTERIES, magazine: ['mg_alloy', 'mg_appended', 'mg_enhanced_batt', 'mg_projectile_acc', 'mg_high_caliber', 'mg_tactical'],
    trait1: ['tr_auto_loading', 'tr_perpetual_motion', 'tr_lead_from_gold', 'tr_under_pressure', 'tr_envious_assassin'],
    trait2: ['tr_chill_clip', 'tr_successful_warmup', 'tr_adagio', 'tr_harmony', 'tr_focused_fury'],
    origin: ['ot_nadir_focus'], masterwork: '*', mod: '*'
  });
  r('lg_forbearance', {
    barrel: LAUNCH_BARRELS, magazine: ['mg_alloy', 'mg_appended', 'mg_high_caliber', 'mg_tactical', 'mg_spike'],
    trait1: ['tr_ambitious_assassin', 'tr_auto_loading', 'tr_field_prep', 'tr_pugilist', 'tr_demolitionist'],
    trait2: ['tr_chain_reaction', 'tr_wellspring', 'tr_adrenaline_junkie', 'tr_one_for_all', 'tr_vorpal'],
    origin: null, masterwork: '*', mod: '*'
  });
  r('lg_succession', {
    barrel: RIFLE_BARRELS, magazine: STD_MAGS,
    trait1: ['tr_reconstruction', 'tr_field_prep', 'tr_rapid_hit', 'tr_clown_cartridge', 'tr_fourth_times'],
    trait2: ['tr_vorpal', 'tr_firing_line', 'tr_recombination', 'tr_focused_fury', 'tr_snapshot'],
    origin: null, masterwork: '*', mod: '*'
  });

  /* --- Heavy --- */
  r('lg_apex_predator', {
    barrel: LAUNCH_BARRELS, magazine: ['mg_alloy', 'mg_appended', 'mg_high_caliber', 'mg_impact_casing', 'mg_tactical'],
    trait1: ['tr_reconstruction', 'tr_envious_assassin', 'tr_auto_loading', 'tr_field_prep', 'tr_clown_cartridge'],
    trait2: ['tr_bait_and_switch', 'tr_explosive_light', 'tr_lasting_impression', 'tr_frenzy', 'tr_vorpal'],
    origin: null, masterwork: '*', mod: '*'
  });
  r('lg_commemoration', {
    barrel: RIFLE_BARRELS, magazine: STD_MAGS,
    trait1: ['tr_reconstruction', 'tr_subsistence', 'tr_feeding_frenzy', 'tr_fourth_times', 'tr_field_prep'],
    trait2: ['tr_killing_tally', 'tr_frenzy', 'tr_target_lock', 'tr_adrenaline_junkie', 'tr_dragonfly'],
    origin: null, masterwork: '*', mod: '*'
  });
  r('lg_falling_guillotine', {
    barrel: BLADES, magazine: GUARDS,
    trait1: ['tr_relentless_strikes', 'tr_tireless_blade', 'tr_energy_transfer', 'tr_thresh'],
    trait2: ['tr_whirlwind_blade', 'tr_vorpal', 'tr_chain_reaction', 'tr_bait_and_switch'],
    origin: null, masterwork: '*', mod: '*'
  });
  r('lg_taipan', {
    barrel: BATTERIES, magazine: ['mg_alloy', 'mg_appended', 'mg_enhanced_batt', 'mg_projectile_acc', 'mg_tactical'],
    trait1: ['tr_clown_cartridge', 'tr_fourth_times', 'tr_rapid_hit', 'tr_triple_tap', 'tr_field_prep'],
    trait2: ['tr_firing_line', 'tr_vorpal', 'tr_focused_fury', 'tr_frenzy', 'tr_bait_and_switch'],
    origin: null, masterwork: '*', mod: '*'
  });

  S.curatedRolls = curated;

  /* ================= resolution =================
     `manifestRolls` is injected by core/manifest.js when a sync has run; it is
     keyed by weapon id and holds Bungie's own socket lists. */

  var manifestRolls = null;
  S.setManifestRolls = function (map) { manifestRolls = map || null; };

  function resolveIds(ids, index) {
    var out = [];
    ids.forEach(function (id) {
      var p = index[id];
      if (p) out.push(p);
    });
    return out;
  }

  var BUCKET_LIST = {
    barrel: 'barrels', magazine: 'magazines', trait1: 'traits', trait2: 'traits',
    origin: 'originTraits', masterwork: 'masterworks', mod: 'weaponMods'
  };

  /* The full column set for one weapon: what sockets it has, what each one can
     hold, and how much the app actually knows. */
  S.columnsFor = function (weapon) {
    if (!weapon) return { source: 'pool', columns: [] };

    var exact = manifestRolls && weapon.hash != null && manifestRolls[weapon.hash];
    var hand = curated[weapon.id];
    var source = exact ? 'exact' : (hand ? 'curated' : 'pool');

    var keys = columnsForType(weapon.type, weapon.rarity);
    var out = [];

    keys.forEach(function (key) {
      var listName = BUCKET_LIST[key];
      var full = D2.manifest && D2.manifest.plugPool
        ? D2.manifest.plugPool(listName, S[listName])
        : S[listName];

      var options = null;

      if (exact && exact[key]) {
        options = resolveIds(exact[key], S.perkIndex);
        // A socket Bungie says exists but whose plugs we could not resolve is
        // still a real socket -- fall back rather than silently dropping it.
        if (!options.length) options = null;
      }

      if (options === null && exact) {
        // Bungie's data says this weapon has no such socket. Believe it.
        if (Object.prototype.hasOwnProperty.call(exact, key)) return;
      }

      if (options === null && hand && Object.prototype.hasOwnProperty.call(hand, key)) {
        var spec = hand[key];
        if (spec === null) return;          // explicitly: this gun has no such column
        if (spec !== '*') options = resolveIds(spec, S.perkIndex);
      }

      if (options === null) {
        var typed = typePool(key, weapon);
        options = typed ? resolveIds(typed, S.perkIndex) : S.perksFor(full, weapon.type);
      }

      if (!options.length) return;
      out.push({ key: key, options: options });
    });

    return { source: source, columns: out };
  };

  /* Convenience for the builder: the option list for one column, or null when
     the weapon has no such socket. */
  S.columnOptions = function (weapon, key) {
    var res = S.columnsFor(weapon);
    for (var i = 0; i < res.columns.length; i++) {
      if (res.columns[i].key === key) return res.columns[i].options;
    }
    return null;
  };

  S.ROLL_SOURCE_LABEL = {
    exact: 'Exact roll list from Bungie’s own data for this weapon.',
    curated: 'Hand-checked roll list for this weapon. Sync the manifest for the live one.',
    pool: 'Everything this weapon type can roll — not this specific gun’s list. ' +
          'Sync the Bungie manifest to narrow it to the real roll.'
  };
  S.ROLL_SOURCE_SHORT = { exact: 'EXACT', curated: 'CHECKED', pool: 'TYPE POOL' };

  /* A curated roll list that names a perk this app does not have would silently
     shrink the column instead of failing, so check the whole table once at load
     and say so loudly in the console. Cheap, and it turns a class of invisible
     data rot into an obvious one. */
  S.auditRolls = function () {
    var problems = [];
    Object.keys(curated).forEach(function (wid) {
      if (!S.weaponById[wid]) { problems.push(wid + ': no such weapon'); return; }
      var spec = curated[wid];
      Object.keys(spec).forEach(function (col) {
        var v = spec[col];
        if (v === null || v === '*') return;
        v.forEach(function (pid) {
          if (!S.perkIndex[pid]) problems.push(wid + '.' + col + ': unknown perk "' + pid + '"');
        });
      });
    });
    Object.keys(TRAIT_ON).forEach(function (tid) {
      if (!S.perkIndex[tid]) problems.push('trait restriction for unknown trait "' + tid + '"');
    });
    if (problems.length) console.warn('[D2] weapon roll data problems:\n' + problems.join('\n'));
    return problems;
  };
  S.auditRolls();
})(window.D2);
