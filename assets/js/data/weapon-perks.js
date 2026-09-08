/* Weapon perk pools: barrels, magazines, traits, origin traits, masterworks
   and weapon mods. `on` restricts a perk to specific weapon types; a perk with
   no `on` is offered everywhere it plausibly rolls. */
(function (D2) {
  'use strict';
  var S = D2.data;

  var PRIMARY_GUNS = ['auto_rifle', 'hand_cannon', 'pulse_rifle', 'scout_rifle', 'submachine_gun', 'sidearm'];
  var ALL_GUNS = PRIMARY_GUNS.concat(['shotgun', 'sniper_rifle', 'fusion_rifle', 'trace_rifle',
    'machine_gun', 'linear_fusion', 'breech_gl', 'heavy_gl', 'rocket_launcher']);

  /* ================= COLUMN 1 — barrels, sights, hafts ================= */

  S.barrels = [
    { id: 'b_arrowhead',      name: 'Arrowhead Brake',     desc: 'Greatly controls recoil. Increases handling speed.' },
    { id: 'b_chambered',      name: 'Chambered Compensator', desc: 'Moderately controls recoil. Increases stability, slightly decreases handling.' },
    { id: 'b_corkscrew',      name: 'Corkscrew Rifling',   desc: 'Balanced barrel. Slightly increases range, stability and handling.' },
    { id: 'b_extended',       name: 'Extended Barrel',     desc: 'Weighty barrel. Increases range, decreases handling.' },
    { id: 'b_fluted',         name: 'Fluted Barrel',       desc: 'Ultra-light barrel. Increases handling speed and stability.' },
    { id: 'b_full_bore',      name: 'Full Bore',           desc: 'Barrel optimised for distance. Greatly increases range at the cost of stability and handling.' },
    { id: 'b_hammer_forged',  name: 'Hammer-Forged Rifling', desc: 'Durable ranged barrel. Increases range.' },
    { id: 'b_polygonal',      name: 'Polygonal Rifling',   desc: 'Stabilising barrel. Increases stability.' },
    { id: 'b_smallbore',      name: 'Smallbore',           desc: 'Dual-purpose barrel. Increases range and stability, decreases handling.' },
    { id: 'b_full_choke',     name: 'Full Choke',          on: ['shotgun'], desc: 'Tightens the shot pattern for more consistent long-range damage.' },
    { id: 'b_rifled_barrel',  name: 'Rifled Barrel',       on: ['shotgun'], desc: 'Ranged barrel. Increases range, decreases handling.' },
    { id: 'b_barrel_shroud',  name: 'Barrel Shroud',       on: ['shotgun', 'submachine_gun'], desc: 'Balanced barrel shroud. Increases range and handling.' },
    { id: 'b_hard_launch',    name: 'Hard Launch',         on: ['breech_gl', 'heavy_gl', 'rocket_launcher'], desc: 'Faster projectile velocity, less blast radius.' },
    { id: 'b_volatile_launch', name: 'Volatile Launch',    on: ['breech_gl', 'heavy_gl', 'rocket_launcher'], desc: 'Bigger blast radius, slower projectile velocity.' },
    { id: 'b_quick_launch',   name: 'Quick Launch',        on: ['breech_gl', 'heavy_gl', 'rocket_launcher'], desc: 'Increases handling and velocity.' },
    { id: 'b_countermass',    name: 'Countermass',         on: ['breech_gl', 'heavy_gl', 'rocket_launcher'], desc: 'Recoil is more predictable and vertical. Increases handling.' },
    { id: 'b_confined_launch', name: 'Confined Launch',    on: ['breech_gl', 'heavy_gl', 'rocket_launcher'], desc: 'Greatly increased velocity at the cost of blast radius.' },
    { id: 'b_smart_drift',    name: 'Smart Drift Control', on: ['breech_gl', 'heavy_gl', 'rocket_launcher'], desc: 'Predictable and controllable recoil. Increases stability.' },
    { id: 'b_projection',     name: 'Projection Fuse',     on: ['breech_gl', 'heavy_gl', 'rocket_launcher'], desc: 'Increases blast radius.' },
    { id: 'b_high_velocity',  name: 'High-Velocity Rounds', on: ['breech_gl', 'heavy_gl', 'rocket_launcher'], desc: 'Increases projectile velocity and reload speed.' },
    { id: 'b_enhanced_battery', name: 'Enhanced Battery',  on: ['fusion_rifle', 'linear_fusion', 'trace_rifle'], desc: 'Increases magazine size.' },
    { id: 'b_particle_repeater', name: 'Particle Repeater', on: ['fusion_rifle', 'linear_fusion'], desc: 'Increases stability.' },
    { id: 'b_projection_fuse', name: 'Accelerated Coils',  on: ['fusion_rifle', 'linear_fusion'], desc: 'Faster charge time, slightly less damage.' },
    { id: 'b_liquid_coils',   name: 'Liquid Coils',        on: ['fusion_rifle', 'linear_fusion'], desc: 'Slower charge time, more damage per bolt.' },
    { id: 'b_ionized_battery', name: 'Ionized Battery',    on: ['fusion_rifle', 'linear_fusion'], desc: 'Greatly increases magazine size, decreases stability.' },
    { id: 'b_elastic_string', name: 'Elastic String',      on: ['bow'], desc: 'Faster draw time, less accuracy.' },
    { id: 'b_natural_string', name: 'Natural String',      on: ['bow'], desc: 'Balanced string. Increases draw time and stability.' },
    { id: 'b_tactile_string', name: 'Tactile String',      on: ['bow'], desc: 'Increases stability and accuracy.' },
    { id: 'b_flexible_string', name: 'Flexible String',    on: ['bow'], desc: 'Greatly increases draw time.' },
    { id: 'b_agile_bstring',  name: 'Agile Bowstring',     on: ['bow'], desc: 'Faster draw at the cost of accuracy.' },
    { id: 'b_honed_edge',     name: 'Honed Edge',          on: ['sword'], desc: 'Increases sword damage at the cost of charge rate.' },
    { id: 'b_jagged_edge',    name: 'Jagged Edge',         on: ['sword'], desc: 'Heavy blade. Increases damage, decreases swing speed.' },
    { id: 'b_tempered_edge',  name: 'Tempered Edge',       on: ['sword'], desc: 'Balanced blade. Slightly increases damage and swing speed.' },
    { id: 'b_hungry_edge',    name: 'Hungry Edge',         on: ['sword'], desc: 'Increases charge rate at the cost of damage.' },
    { id: 'b_enduring_guard', name: 'Enduring Guard',      on: ['sword', 'glaive'], desc: 'Increases guard endurance.' },
    { id: 'b_balanced_guard', name: 'Balanced Guard',      on: ['sword', 'glaive'], desc: 'Balanced guard stats across the board.' },
    { id: 'b_swordmasters',   name: "Swordmaster's Guard", on: ['sword'], desc: 'Increases guard efficiency.' },
    { id: 'b_low_impedance',  name: 'Low-Impedance Windings', on: ['glaive'], desc: 'Increases shield duration.' },
    { id: 'b_supercooled',    name: 'Supercooled Accelerator', on: ['glaive'], desc: 'Increases projectile velocity.' }
  ];

  /* ================= COLUMN 2 — magazines, batteries ================= */

  S.magazines = [
    { id: 'mg_accurized',    name: 'Accurized Rounds',   desc: 'Increases range.' },
    { id: 'mg_alloy',        name: 'Alloy Magazine',     desc: 'Faster reloads when the magazine is empty.' },
    { id: 'mg_appended',     name: 'Appended Mag',       desc: 'Increases magazine size.' },
    { id: 'mg_armor_piercing', name: 'Armor-Piercing Rounds', desc: 'Rounds pierce targets and ricochet on impact. Increases range.' },
    { id: 'mg_extended',     name: 'Extended Mag',       desc: 'Greatly increases magazine size, greatly decreases reload speed.' },
    { id: 'mg_flared',       name: 'Flared Magwell',     desc: 'Greatly increases reload speed. Slightly increases stability.' },
    { id: 'mg_high_caliber', name: 'High-Caliber Rounds', desc: 'Rounds flinch targets harder. Slightly increases range.' },
    { id: 'mg_light_mag',    name: 'Light Mag',          desc: 'Faster reload and slightly increased range.' },
    { id: 'mg_ricochet',     name: 'Ricochet Rounds',    desc: 'Rounds ricochet off hard surfaces. Increases stability and range.' },
    { id: 'mg_steady',       name: 'Steady Rounds',      desc: 'Increases stability, decreases range.' },
    { id: 'mg_tactical',     name: 'Tactical Mag',       desc: 'Slightly increases stability, magazine size and reload speed.' },
    { id: 'mg_assault',      name: 'Assault Mag',        on: ['shotgun'], desc: 'Increases rate of fire and stability.' },
    { id: 'mg_pinpoint',     name: 'Pinpoint Slug Frame', on: ['shotgun'], desc: 'Fires a single accurate slug.' },
    { id: 'mg_spike',        name: 'Spike Grenades',     on: ['breech_gl', 'heavy_gl'], desc: 'Grenades deal bonus damage on direct hits.' },
    { id: 'mg_implosion',    name: 'Implosion Rounds',   on: ['breech_gl', 'heavy_gl'], desc: 'Tighter blast, more direct damage.' },
    { id: 'mg_blinding',     name: 'Blinding Grenades',  on: ['breech_gl', 'heavy_gl'], desc: 'Detonations blind nearby combatants.' },
    { id: 'mg_concussion',   name: 'Concussion Grenades', on: ['breech_gl', 'heavy_gl'], desc: 'Detonations push targets back.' },
    { id: 'mg_disorienting', name: 'Disorienting Grenades', on: ['breech_gl', 'heavy_gl'], desc: 'Detonations disorient targets.' },
    { id: 'mg_proximity',    name: 'Proximity Grenades', on: ['breech_gl', 'heavy_gl'], desc: 'Grenades detonate near targets.' },
    { id: 'mg_cluster',      name: 'Cluster Bomb',       on: ['rocket_launcher'], desc: 'Rockets spawn cluster bombs on detonation.' },
    { id: 'mg_black_powder', name: 'Black Powder',       on: ['rocket_launcher'], desc: 'Greatly increases blast radius.' },
    { id: 'mg_impact_casing', name: 'Impact Casing',     on: ['rocket_launcher', 'breech_gl', 'heavy_gl'], desc: 'Increases direct-hit damage.' },
    { id: 'mg_alloy_casing', name: 'Alloy Casing',       on: ['rocket_launcher'], desc: 'Increases reload speed.' },
    { id: 'mg_helical',      name: 'Helical Rifling',    on: ['sniper_rifle', 'linear_fusion'], desc: 'Balanced barrel. Increases range and stability.' },
    { id: 'mg_hip_fire',     name: 'Hip-Fire Grip',      desc: 'Improves accuracy, stability and range while firing from the hip.' },
    { id: 'mg_compulsive',   name: 'Compulsive Reloader', desc: 'Reloading a partially full magazine is faster.' },
    { id: 'mg_enhanced_batt', name: 'Enhanced Battery',  on: ['fusion_rifle', 'linear_fusion', 'trace_rifle', 'glaive'], desc: 'Increases magazine size.' },
    { id: 'mg_projectile_acc', name: 'Projectile Accelerator', on: ['fusion_rifle'], desc: 'Increases projectile speed.' },
    { id: 'mg_helical_arrow', name: 'Helical Fletching', on: ['bow'], desc: 'Increases accuracy and stability.' },
    { id: 'mg_straight_fletch', name: 'Straight Fletching', on: ['bow'], desc: 'Increases stability and draw time.' },
    { id: 'mg_fiberglass',   name: 'Fiberglass Arrow Shaft', on: ['bow'], desc: 'Increases accuracy.' },
    { id: 'mg_carbon_arrow', name: 'Carbon Arrow Shaft', on: ['bow'], desc: 'Increases draw time.' },
    { id: 'mg_enhanced_bstring', name: 'Enhanced Bowstring', on: ['bow'], desc: 'Faster arrow nocking.' }
  ];

  /* ================= COLUMNS 3 & 4 — traits ================= */

  function t(id, name, desc, opts) {
    var o = { id: id, name: name, desc: desc };
    if (opts) { for (var k in opts) o[k] = opts[k]; }
    return o;
  }

  S.traits = [
    /* --- reload / ammo economy --- */
    t('tr_outlaw', 'Outlaw', 'Precision final blows greatly increase reload speed.'),
    t('tr_feeding_frenzy', 'Feeding Frenzy', 'Each rapid final blow progressively increases reload speed for a short time.'),
    t('tr_rapid_hit', 'Rapid Hit', 'Rapid precision hits temporarily increase stability and reload speed.'),
    t('tr_auto_loading', 'Auto-Loading Holster', 'The magazine is automatically reloaded after a short period of being stowed.'),
    t('tr_overflow', 'Overflow', 'Picking up special or heavy ammo overflows the magazine to twice capacity.'),
    t('tr_clown_cartridge', 'Clown Cartridge', 'Reloading from empty grants a randomly overfilled magazine.'),
    t('tr_ambitious_assassin', 'Ambitious Assassin', 'Overflows the magazine based on the number of rapid final blows before reloading.'),
    t('tr_reconstruction', 'Reconstruction', 'This weapon slowly reloads itself over time, up to double capacity.'),
    t('tr_envious_assassin', 'Envious Assassin', 'Dealing sustained damage to targets overflows the magazine from reserves.'),
    t('tr_envious_arsenal', 'Envious Arsenal', 'Kills with other weapons partially reload this weapon from reserves.'),
    t('tr_field_prep', 'Field Prep', 'Increases ammo reserves. Faster reload and ready while crouching.'),
    t('tr_fourth_times', "Fourth Time's the Charm", 'Rapidly landing four precision hits returns two rounds to the magazine.'),
    t('tr_triple_tap', 'Triple Tap', 'Rapidly landing three precision hits returns one round to the magazine.'),
    t('tr_rewind_rounds', 'Rewind Rounds', 'Missed shots are returned to the magazine after landing a portion of the magazine on targets.'),
    t('tr_subsistence', 'Subsistence', 'Final blows partially refill the magazine from reserves.'),
    t('tr_demolitionist', 'Demolitionist', 'Kills with this weapon grant grenade energy. Activating your grenade reloads this weapon.'),
    t('tr_wellspring', 'Wellspring', 'Final blows with this weapon grant ability energy.'),
    t('tr_pugilist', 'Pugilist', 'Final blows with this weapon grant melee energy.'),
    t('tr_thresh', 'Thresh', 'Final blows with this weapon grant Super energy.'),
    t('tr_grave_robber', 'Grave Robber', 'Melee final blows reload this weapon from reserves.'),
    t('tr_lead_from_gold', 'Lead from Gold', 'Picking up heavy ammo reloads this weapon from reserves.'),
    t('tr_attrition_orbs', 'Attrition Orbs', 'Sustained damage without reloading creates an Orb of Power.'),
    t('tr_strategist', 'Strategist', 'Rapid final blows grant class ability energy.'),
    t('tr_loose_change', 'Loose Change', 'Applying a debuff greatly increases reload speed and grants ability energy.'),
    t('tr_deconstruct', 'Deconstruct', 'Damaging vehicles and constructs refills the magazine; sustained damage increases weapon damage.'),
    t('tr_enlightened_action', 'Enlightened Action', 'Damaging targets grants stacking handling and reload speed.'),

    /* --- damage buffs --- */
    t('tr_rampage', 'Rampage', 'Kills with this weapon temporarily grant increased damage. Stacks three times.'),
    t('tr_kill_clip', 'Kill Clip', 'Reloading after a kill grants increased damage.'),
    t('tr_multikill_clip', 'Multikill Clip', 'Reloading grants increased damage based on the number of rapid kills beforehand.'),
    t('tr_swashbuckler', 'Swashbuckler', 'Weapon kills increase damage; a melee kill grants maximum stacks instantly.'),
    t('tr_frenzy', 'Frenzy', 'Being in combat for a while grants damage, handling and reload speed until combat ends.'),
    t('tr_adrenaline_junkie', 'Adrenaline Junkie', 'Grenade damage or a kill after a grenade grants increased damage and handling.'),
    t('tr_one_for_all', 'One for All', 'Hitting three separate targets greatly increases damage for a long window.'),
    t('tr_golden_tricorn', 'Golden Tricorn', 'Final blows grant a damage bonus; an ability kill afterwards upgrades and extends it.'),
    t('tr_killing_wind', 'Killing Wind', 'Final blows grant increased mobility, weapon range and handling.'),
    t('tr_desperate_measures', 'Desperate Measures', 'Damaging targets progressively increases damage; ability kills grant maximum stacks.'),
    t('tr_harmony', 'Harmony', 'Final blows with other weapons increase this weapon’s damage and handling.'),
    t('tr_focused_fury', 'Focused Fury', 'Landing half a magazine as precision hits grants increased damage until reload.'),
    t('tr_target_lock', 'Target Lock', 'Sustained damage to a single target ramps up damage the longer you stay on it.'),
    t('tr_vorpal', 'Vorpal Weapon', 'Increased damage against bosses, vehicles and Guardians with their Super active.'),
    t('tr_firing_line', 'Firing Line', 'Increased precision damage while two or more allies are near you.',
      { on: ['sniper_rifle', 'linear_fusion', 'fusion_rifle', 'scout_rifle', 'hand_cannon', 'bow', 'machine_gun', 'sidearm', 'pulse_rifle'] }),
    t('tr_rangefinder', 'Rangefinder', 'Aiming down sights increases effective range and zoom.'),
    t('tr_bait_and_switch', 'Bait and Switch', 'Damaging with all three weapons within a short window massively boosts this weapon’s damage.'),
    t('tr_explosive_light', 'Explosive Light', 'Picking up Orbs of Power increases blast radius and damage for the next few shots.'),
    t('tr_lasting_impression', 'Lasting Impression', 'Rockets stick to targets and detonate later for greatly increased damage.'),
    t('tr_killing_tally', 'Killing Tally', 'Kills grant increased damage; stacks are lost on reload or stow.'),
    t('tr_cascade_point', 'Cascade Point', 'After a rapid kill with another weapon, this weapon gains greatly increased rate of fire.'),
    t('tr_reservoir_burst', 'Reservoir Burst', 'A full magazine deals bonus damage and causes targets to explode.'),
    t('tr_controlled_burst', 'Controlled Burst', 'Landing every bolt of a burst grants increased damage.'),
    t('tr_high_ground', 'High Ground', 'Being above your target grants increased weapon damage.'),
    t('tr_precision_instrument', 'Precision Instrument', 'Consecutive precision hits progressively increase precision damage.'),
    t('tr_master_of_arms', 'Master of Arms', 'Any final blow grants a stacking bonus to weapon damage.'),
    t('tr_collective_action', 'Collective Action', 'Picking up an Elemental Well or Orb grants a stacking weapon damage bonus.'),
    t('tr_to_the_pain', 'To the Pain', 'Missing hurts, landing hits pays: sustained accuracy grants a large damage bonus.'),
    t('tr_elemental_honing', 'Elemental Honing', 'Damaging with matching elemental damage stacks a damage bonus.'),
    t('tr_sword_logic', 'Sword Logic', 'Final blows grant stacking damage; stacks increase in higher-difficulty activities.'),
    t('tr_recombination', 'Recombination', 'Elemental final blows increase this weapon’s damage for the next magazine.'),
    t('tr_paracausal_affinity', 'Paracausal Affinity', 'Final blows with Strand or Stasis weapons grant increased damage.'),
    t('tr_surrounded', 'Surrounded', 'Increased damage when three or more targets are in close proximity.'),
    t('tr_trench_barrel', 'Trench Barrel', 'A melee hit grants a burst of increased damage, reload and handling.'),
    t('tr_one_two_punch', 'One-Two Punch', 'Hitting a target with every pellet greatly increases melee damage briefly.'),
    t('tr_whirlwind_blade', 'Whirlwind Blade', 'Sustained sword damage increases damage. Stacks with kills.'),
    t('tr_relentless_strikes', 'Relentless Strikes', 'Landing three rapid sword strikes grants sword ammo.'),
    t('tr_tireless_blade', 'Tireless Blade', 'Every second powered sword kill returns ammo.'),
    t('tr_vorpal_glaive', 'Close to Melee', 'Increased damage while at close range.'),

    /* --- elemental / debuff verbs --- */
    t('tr_incandescent', 'Incandescent', 'Defeating a target spreads scorch to nearby targets.'),
    t('tr_voltshot', 'Voltshot', 'Reloading after a kill jolts the next target you damage.'),
    t('tr_headstone', 'Headstone', 'Precision final blows create a Stasis crystal on the target’s location.'),
    t('tr_hatchling', 'Hatchling', 'Precision final blows or Strand kills spawn a Threadling.'),
    t('tr_destabilizing', 'Destabilizing Rounds', 'Final blows make nearby targets volatile.'),
    t('tr_repulsor_brace', 'Repulsor Brace', 'Defeating a target affected by a Void debuff grants a Void overshield.'),
    t('tr_jolting_feedback', 'Jolting Feedback', 'Rapid hits jolt the target.'),
    t('tr_chill_clip', 'Chill Clip', 'Reloading loads a round that slows on impact and can freeze.'),
    t('tr_dragonfly', 'Dragonfly', 'Precision final blows create an elemental damage burst.'),
    t('tr_firefly', 'Firefly', 'Precision final blows cause an explosion and increase reload speed.'),
    t('tr_chain_reaction', 'Chain Reaction', 'Every final blow creates an elemental damage explosion.'),
    t('tr_disruption_break', 'Disruption Break', 'Breaking a shield greatly increases Kinetic damage against that target.'),
    t('tr_osmosis', 'Osmosis', 'Using your grenade changes this weapon’s damage type to match your subclass.'),
    t('tr_permeability', 'Permeability', 'Using your class ability changes this weapon’s damage type to match your subclass.'),
    t('tr_unrelenting', 'Unrelenting', 'Rapidly defeating targets triggers health regeneration.'),
    t('tr_heal_clip', 'Heal Clip', 'Reloading after a final blow cures you and grants Restoration to nearby allies.'),
    t('tr_circle_of_life', 'Circle of Life', 'Increased damage while standing in a Solar Super effect.'),
    t('tr_shoot_to_loot', 'Shoot to Loot', 'Shooting an ammo brick picks it up.'),
    t('tr_pulse_monitor', 'Pulse Monitor', 'On taking critical damage, automatically reloads and increases handling.'),
    t('tr_gutshot_straight', 'Gutshot Straight', 'Body shots deal additional damage; precision damage is slightly reduced.'),

    /* --- handling / movement / accuracy --- */
    t('tr_snapshot', 'Snapshot Sights', 'Faster time to aim down sights.'),
    t('tr_quickdraw', 'Quickdraw', 'This weapon is ready to fire immediately when swapped to.'),
    t('tr_opening_shot', 'Opening Shot', 'The first shot of an attack has greatly increased accuracy and range.'),
    t('tr_moving_target', 'Moving Target', 'Increased movement speed and target acquisition while aiming down sights.'),
    t('tr_slideshot', 'Slideshot', 'Sliding partially reloads the magazine and boosts range and stability.'),
    t('tr_slideways', 'Slideways', 'Sliding partially reloads the magazine and boosts handling and stability.'),
    t('tr_perpetual_motion', 'Perpetual Motion', 'Moving grants stacking stability, handling and reload speed.'),
    t('tr_dynamic_sway', 'Dynamic Sway Reduction', 'Sustained fire increases accuracy and stability.'),
    t('tr_under_pressure', 'Under Pressure', 'Stability and accuracy improve as the magazine empties.'),
    t('tr_tunnel_vision', 'Tunnel Vision', 'Reloading after a kill greatly increases target acquisition and aim-down-sights speed.'),
    t('tr_threat_detector', 'Threat Detector', 'Increased stability, reload and handling when enemies are close.'),
    t('tr_hip_fire_grip', 'Hip-Fire Grip', 'Improved accuracy, stability and range while firing from the hip.'),
    t('tr_elemental_capacitor', 'Elemental Capacitor', 'Grants a stat bonus determined by your equipped subclass element.'),
    t('tr_air_trigger', 'Air Assault', 'Improved airborne effectiveness and handling while in the air.'),
    t('tr_impulse_amplifier', 'Impulse Amplifier', 'Greatly increases projectile velocity and reload speed.'),
    t('tr_well_rounded', 'Well-Rounded', 'Using any ability grants stacking stability, handling and range.'),
    t('tr_danger_zone', 'Danger Zone', 'Increased blast radius.'),
    t('tr_closing_time', 'Closing Time', 'Handling and stability improve as the magazine empties.'),
    t('tr_discord', 'Discord', 'Final blows with other weapons make this weapon create Orbs of Power on kill.'),
    t('tr_backup_plan', 'Backup Plan', 'Swapping to this weapon dramatically increases charge speed and handling briefly.'),
    t('tr_successful_warmup', 'Successful Warm-Up', 'Final blows greatly increase charge rate.'),
    t('tr_adagio', 'Adagio', 'After a kill, this weapon deals more damage and fires slower.'),
    t('tr_bipod', 'Bipod', 'Adds an extra round to the magazine at the cost of blast radius and reserves.'),
    t('tr_rolling_storm', 'Rolling Storm', 'Charging your Super grants Bolt Charge.'),
    t('tr_physic', 'Physic', 'Kills while critically wounded restore health.'),
    t('tr_redirection', 'Redirection', 'Damaging a target with a charged shot builds a stacking damage bonus.'),
    t('tr_ensemble', 'Ensemble', 'Nearby allies grant increased reload and handling speed.'),
    t('tr_headseeker', 'Headseeker', 'Body shots increase precision damage for a short duration.'),
    t('tr_archers_tempo', "Archer's Tempo", 'Precision hits increase draw speed.'),
    t('tr_energy_transfer', 'Energy Transfer', 'Sword final blows recharge your grenade and Super energy.'),
    t('tr_cluster_bomb', 'Cluster Bomb', 'Rocket detonations release a cluster of tracking submunitions.'),
    t('tr_tracking_module', 'Tracking Module', 'Rockets acquire and track targets more aggressively.'),
    t('tr_genesis', 'Genesis', 'Breaking a shield with matching energy refills the magazine from reserves.'),
    t('tr_surplus', 'Surplus', 'Every charged ability improves handling, reload and stability.'),
    t('tr_dual_loader', 'Dual Loader', 'Loads two rounds at once.'),
    t('tr_compulsive_reloader', 'Compulsive Reloader', 'Reloading before the magazine is half empty grants bonus damage.'),
    t('tr_steady_hands', 'Steady Hands', 'A final blow greatly improves handling for a short duration.'),
    t('tr_turnabout', 'Turnabout', 'Breaking a shield with this weapon grants an overshield.'),
    t('tr_explosive_payload', 'Explosive Payload', 'Projectiles create an area-of-effect detonation on impact.'),
    t('tr_timed_payload', 'Timed Payload', 'Projectiles detonate a short time after impact.'),
    t('tr_full_court', 'Full Court', 'Grenades deal more damage the farther they travel before detonating.'),
    t('tr_blast_radius', 'Sympathetic Arsenal', 'Reloading this weapon reloads your other two weapons.'),
    t('tr_box_breathing', 'Box Breathing', 'Aiming for a moment greatly increases precision damage on the next shot.'),
    t('tr_firmly_planted', 'Firmly Planted', 'Increased stability, accuracy and handling while crouched.'),
    t('tr_no_distractions', 'No Distractions', 'Aiming down sights reduces flinch from incoming damage.'),
    t('tr_zen_moment', 'Zen Moment', 'Dealing damage increases stability.'),
    t('tr_encore', 'Encore', 'Precision hits grant stacking range, stability and accuracy.'),
    t('tr_offhand_strike', 'Offhand Strike', 'Increased accuracy and range while strafing.'),
    t('tr_eye_of_the_storm', 'Eye of the Storm', 'This weapon becomes more accurate and handles better as your health drops.'),
    t('tr_kickstart', 'Kickstart', 'Reloading immediately after a kill grants a burst of increased damage.'),
    t('tr_shot_swap', 'Shot Swap', 'A precision hit greatly increases the swap speed to other weapons.'),
    t('tr_slice', 'Slice', 'Sword damage severs targets.'),
    t('tr_eager_edge', 'Eager Edge', 'Swapping to this sword grants a powerful lunge.'),
    t('tr_assassins_blade', "Assassin's Blade", 'Melee final blows increase movement speed and sword damage.'),
    t('tr_flash_counter', 'Flash Counter', 'Blocking an attack blinds nearby combatants.'),
    t('tr_duelists_trance', "Duelist's Trance", 'Melee kills grant stacking handling, accuracy and reload speed.'),
    t('tr_immovable_object', 'Immovable Object', 'Guarding grants an overshield.'),
    t('tr_replenishing_aegis', 'Replenishing Aegis', 'Blocking damage returns ammo to the magazine.')
  ];

  /* ================= COLUMN 5 — origin traits ================= */

  S.originTraits = [
    { id: 'ot_veist_stinger',  name: 'Veist Stinger',        desc: 'Damaging a target has a chance to partially refill the magazine and increase movement speed.' },
    { id: 'ot_hakke_breach',   name: 'Hakke Breach Armaments', desc: 'Increased damage against vehicles, barricades and constructs.' },
    { id: 'ot_omolon_fluid',   name: 'Omolon Fluid Dynamics', desc: 'Landing multiple shots improves stability and reload speed.' },
    { id: 'ot_suros_synergy',  name: 'Suros Synergy',        desc: 'Using your class ability grants increased handling and accuracy.' },
    { id: 'ot_tex_balanced',   name: 'Tex Balanced Stock',   desc: 'Final blows briefly increase movement, reload and handling.' },
    { id: 'ot_nadir_focus',    name: 'Nadir Focus',          desc: 'Sustained fire increases accuracy and stability.' },
    { id: 'ot_bray_inheritance', name: 'Bray Inheritance',   desc: 'Defeating targets with abilities grants a stacking reload and handling bonus.' },
    { id: 'ot_field_tested',   name: 'Field-Tested',         desc: 'Sustained damage grants stacking range, stability, handling and reload.' },
    { id: 'ot_alacrity',       name: 'Alacrity',             desc: 'When you are the last living member of your fireteam, gain greatly improved weapon stats.' },
    { id: 'ot_one_quiet_moment', name: 'One Quiet Moment',   desc: 'Greatly increased reload speed while out of combat.' },
    { id: 'ot_search_party',   name: 'Search Party',         desc: 'Increased movement speed while aiming down sights when away from allies.' },
    { id: 'ot_nanotech_tracer', name: 'Nanotech Tracer Rockets', desc: 'Sustained damage causes the weapon to fire micro-rockets.' },
    { id: 'ot_harmonic_res',   name: 'Harmonic Resonance',   desc: 'Matching your subclass element with other equipped weapons improves stats.' },
    { id: 'ot_runneth_over',   name: 'Runneth Over',         desc: 'Reloading near allies overfills the magazine.' },
    { id: 'ot_noble_deeds',    name: 'Noble Deeds',          desc: 'Healing or empowering allies grants a stacking damage bonus.' },
    { id: 'ot_vanguards_vind', name: "Vanguard's Vindication", desc: 'Melee final blows grant health and a small overshield.' },
    { id: 'ot_dealers_choice', name: "Dealer's Choice",      desc: 'Rapid final blows return a portion of the magazine.' },
    { id: 'ot_ambush',         name: 'Ambush',               desc: 'The first shots fired after a respawn or revive deal bonus damage.' },
    { id: 'ot_land_tank',      name: 'Land Tank',            desc: 'Sustained damage grants damage resistance and reload speed.' },
    { id: 'ot_head_rush',      name: 'Head Rush',            desc: 'Precision final blows briefly increase class ability regeneration.' },
    { id: 'ot_indomitability', name: 'Indomitability',       desc: 'Damaging targets grants a small overshield.' },
    { id: 'ot_stunning_recovery', name: 'Stunning Recovery', desc: 'Stunning a Champion grants health regeneration and reloads the magazine.' },
    { id: 'ot_skulking_wolf',  name: 'Skulking Wolf',        desc: 'Rapid final blows or a precision kill briefly make you harder to detect.' },
    { id: 'ot_dark_ether',     name: 'Dark Ether Reaper',    desc: 'Final blows have a chance to spawn a healing Dark Ether orb.' },
    { id: 'ot_dragons_venge',  name: "Dragon's Vengeance",   desc: 'On Super activation, reloads the magazine and grants a damage bonus.' },
    { id: 'ot_to_excess',      name: 'To Excess',            desc: 'Gain improved stats while your Super is fully charged.' },
    { id: 'ot_fragile_focus',  name: 'Fragile Focus',        desc: 'Increased range while unharmed; lost when you take damage.' },
    { id: 'ot_right_hook',     name: 'Right Hook',           desc: 'Melee hits improve target acquisition and accuracy.' },
    { id: 'ot_kickstart_ot',   name: 'Nothing Left to Give', desc: 'Emptying the magazine into targets grants a burst of ability energy.' },
    { id: 'ot_classy_contender', name: 'Classy Contender',   desc: 'Final blows grant class ability energy.' },
    { id: 'ot_extrovert',      name: 'Extrovert',            desc: 'Improved weapon stats while near allies.' },
    { id: 'ot_introvert',      name: 'Introvert',            desc: 'Improved weapon stats while away from allies.' },
    { id: 'ot_gun_and_run',    name: 'Gun and Run',          desc: 'Final blows grant increased movement speed.' }
  ];

  /* ================= MASTERWORKS ================= */

  S.masterworks = [
    { id: 'mw_range',      name: 'Range',            desc: '+10 Range at tier 10.' },
    { id: 'mw_stability',  name: 'Stability',        desc: '+10 Stability at tier 10.' },
    { id: 'mw_handling',   name: 'Handling',         desc: '+10 Handling at tier 10.' },
    { id: 'mw_reload',     name: 'Reload Speed',     desc: '+10 Reload Speed at tier 10.' },
    { id: 'mw_magazine',   name: 'Magazine',         desc: 'Increases magazine size.' },
    { id: 'mw_charge',     name: 'Charge Time',      on: ['fusion_rifle', 'linear_fusion'], desc: 'Reduces charge time.' },
    { id: 'mw_draw',       name: 'Draw Time',        on: ['bow'], desc: 'Reduces draw time.' },
    { id: 'mw_blast',      name: 'Blast Radius',     on: ['breech_gl', 'heavy_gl', 'rocket_launcher'], desc: 'Increases blast radius.' },
    { id: 'mw_velocity',   name: 'Velocity',         on: ['breech_gl', 'heavy_gl', 'rocket_launcher'], desc: 'Increases projectile velocity.' },
    { id: 'mw_impact',     name: 'Impact',           on: ['sword'], desc: 'Increases sword impact.' },
    { id: 'mw_accuracy',   name: 'Accuracy',         on: ['bow'], desc: 'Increases accuracy.' },
    { id: 'mw_swing',      name: 'Swing Speed',      on: ['sword'], desc: 'Increases swing speed.' },
    { id: 'mw_guard_eff',  name: 'Guard Efficiency', on: ['sword', 'glaive'], desc: 'Reduces ammo drain while guarding.' },
    { id: 'mw_guard_res',  name: 'Guard Resistance', on: ['sword', 'glaive'], desc: 'Increases damage resistance while guarding.' },
    { id: 'mw_guard_end',  name: 'Guard Endurance',  on: ['sword', 'glaive'], desc: 'Increases guard health.' },
    { id: 'mw_shield_dur', name: 'Shield Duration',  on: ['glaive'], desc: 'Increases glaive shield duration.' }
  ];

  /* ================= WEAPON MODS ================= */

  S.weaponMods = [
    { id: 'wm_backup_mag',    name: 'Backup Mag',        desc: 'Increases magazine size.' },
    { id: 'wm_boss_spec',     name: 'Boss Spec',         desc: 'Increases damage against bosses and vehicles.' },
    { id: 'wm_major_spec',    name: 'Major Spec',        desc: 'Increases damage against majors (yellow bars).' },
    { id: 'wm_minor_spec',    name: 'Minor Spec',        desc: 'Increases damage against minors (red bars).' },
    { id: 'wm_taken_spec',    name: 'Taken Spec',        desc: 'Increases damage against Taken combatants.' },
    { id: 'wm_adept_big_ones', name: 'Adept Big Ones Spec', desc: 'Increases damage against majors, minibosses, champions and bosses.' },
    { id: 'wm_freehand',      name: 'Freehand Grip',     desc: 'Improves hip-fire accuracy and draw speed.' },
    { id: 'wm_counterbalance', name: 'Counterbalance Stock', desc: 'Reduces recoil deviation.' },
    { id: 'wm_icarus',        name: 'Icarus Grip',       desc: 'Improves accuracy while airborne.' },
    { id: 'wm_quick_access',  name: 'Quick Access Sling', desc: 'Faster weapon swap speed.' },
    { id: 'wm_radar_booster', name: 'Radar Booster',     desc: 'Increases radar resolution while this weapon is equipped.' },
    { id: 'wm_radar_tuner',   name: 'Radar Tuner',       desc: 'Radar stays visible while aiming down sights.' },
    { id: 'wm_sprint_grip',   name: 'Sprint Grip',       desc: 'Faster ready time after sprinting.' },
    { id: 'wm_targeting_adj', name: 'Targeting Adjuster', desc: 'Improved target acquisition.' },
    { id: 'wm_adept_charge',  name: 'Adept Charge Time', desc: 'Adept only. Reduces charge time.' },
    { id: 'wm_adept_range',   name: 'Adept Range',       desc: 'Adept only. Increases range.' },
    { id: 'wm_adept_stability', name: 'Adept Stability', desc: 'Adept only. Increases stability.' },
    { id: 'wm_adept_mag',     name: 'Adept Mag',         desc: 'Adept only. Increases magazine size.' }
  ];

  /* ================= FRAMES (archetypes) ================= */

  S.frames = [
    // Auto Rifle
    { id: 'f_ar_rapid',       name: 'Rapid-Fire Frame',      type: 'auto_rifle', desc: 'Deeper ammo reserves. Faster reload when the magazine is empty.' },
    { id: 'f_ar_adaptive',    name: 'Adaptive Frame',        type: 'auto_rifle', desc: 'A well-rounded grip, reliable and sturdy.' },
    { id: 'f_ar_precision',   name: 'Precision Frame',       type: 'auto_rifle', desc: 'Recoil pattern is more predictably vertical.' },
    { id: 'f_ar_high_impact', name: 'High-Impact Frame',     type: 'auto_rifle', desc: 'Slow rate of fire, high damage. More effective at longer ranges.' },
    { id: 'f_ar_support',     name: 'Support Frame',         type: 'auto_rifle', desc: 'Heals allies you hit; does reduced damage to combatants.' },
    // Hand Cannon
    { id: 'f_hc_aggressive',  name: 'Aggressive Frame',      type: 'hand_cannon', desc: 'High damage, high recoil. 120 RPM.' },
    { id: 'f_hc_adaptive',    name: 'Adaptive Frame',        type: 'hand_cannon', desc: 'A well-rounded grip, reliable and sturdy. 140 RPM.' },
    { id: 'f_hc_precision',   name: 'Precision Frame',       type: 'hand_cannon', desc: 'Recoil pattern is more predictably vertical. 180 RPM.' },
    { id: 'f_hc_lightweight', name: 'Lightweight Frame',     type: 'hand_cannon', desc: 'Faster movement speed while this weapon is equipped.' },
    { id: 'f_hc_heavy_burst', name: 'Heavy Burst Frame',     type: 'hand_cannon', desc: 'Fires a powerful two-round burst.' },
    // Pulse Rifle
    { id: 'f_pr_rapid',       name: 'Rapid-Fire Frame',      type: 'pulse_rifle', desc: 'Deeper ammo reserves. Faster reload when empty.' },
    { id: 'f_pr_adaptive',    name: 'Adaptive Frame',        type: 'pulse_rifle', desc: 'A well-rounded grip, reliable and sturdy.' },
    { id: 'f_pr_high_impact', name: 'High-Impact Frame',     type: 'pulse_rifle', desc: 'Slower, harder-hitting bursts. Better at range.' },
    { id: 'f_pr_lightweight', name: 'Lightweight Frame',     type: 'pulse_rifle', desc: 'Faster movement speed while equipped.' },
    { id: 'f_pr_aggressive',  name: 'Aggressive Frame',      type: 'pulse_rifle', desc: 'High damage, high recoil. Fires a four-round burst.' },
    { id: 'f_pr_heavy_burst', name: 'Heavy Burst Frame',     type: 'pulse_rifle', desc: 'Fires a powerful two-round burst.' },
    // Scout Rifle
    { id: 'f_sc_rapid',       name: 'Rapid-Fire Frame',      type: 'scout_rifle', desc: 'Deeper ammo reserves. Faster reload when empty.' },
    { id: 'f_sc_lightweight', name: 'Lightweight Frame',     type: 'scout_rifle', desc: 'Faster movement speed while equipped.' },
    { id: 'f_sc_precision',   name: 'Precision Frame',       type: 'scout_rifle', desc: 'Recoil pattern is more predictably vertical.' },
    { id: 'f_sc_high_impact', name: 'High-Impact Frame',     type: 'scout_rifle', desc: 'Slow rate of fire, high damage.' },
    { id: 'f_sc_aggressive',  name: 'Aggressive Frame',      type: 'scout_rifle', desc: 'High damage, high recoil.' },
    { id: 'f_sc_veist_rapid', name: 'Adaptive Frame',        type: 'scout_rifle', desc: 'A well-rounded grip, reliable and sturdy.' },
    // SMG
    { id: 'f_smg_lightweight', name: 'Lightweight Frame',    type: 'submachine_gun', desc: 'Faster movement speed while equipped.' },
    { id: 'f_smg_adaptive',   name: 'Adaptive Frame',        type: 'submachine_gun', desc: 'A well-rounded grip, reliable and sturdy.' },
    { id: 'f_smg_precision',  name: 'Precision Frame',       type: 'submachine_gun', desc: 'Recoil pattern is more predictably vertical.' },
    { id: 'f_smg_aggressive', name: 'Aggressive Frame',      type: 'submachine_gun', desc: 'High damage, high recoil.' },
    { id: 'f_smg_rapid',      name: 'Rapid-Fire Frame',      type: 'submachine_gun', desc: 'Deeper ammo reserves. Faster reload when empty.' },
    // Sidearm
    { id: 'f_sa_adaptive',    name: 'Adaptive Frame',        type: 'sidearm', desc: 'A well-rounded grip, reliable and sturdy.' },
    { id: 'f_sa_lightweight', name: 'Lightweight Frame',     type: 'sidearm', desc: 'Faster movement speed while equipped.' },
    { id: 'f_sa_aggressive',  name: 'Aggressive Burst',      type: 'sidearm', desc: 'Fires a powerful burst; high damage, high recoil.' },
    { id: 'f_sa_omolon',      name: 'Omolon Adaptive Frame', type: 'sidearm', desc: 'Fires a long-range projectile that explodes on impact.' },
    { id: 'f_sa_rocket',      name: 'Rocket-Assisted Frame', type: 'sidearm', desc: 'Fires rocket-assisted projectiles. Uses Special ammo.' },
    { id: 'f_sa_precision',   name: 'Precision Frame',       type: 'sidearm', desc: 'Recoil pattern is more predictably vertical.' },
    // Bow
    { id: 'f_bow_lightweight', name: 'Lightweight Frame',    type: 'bow', desc: 'Faster draw, faster movement.' },
    { id: 'f_bow_precision',  name: 'Precision Frame',       type: 'bow', desc: 'Slower draw, higher precision damage.' },
    { id: 'f_bow_combat',     name: 'Combat Bow',            type: 'bow', desc: 'Standard combat bow frame.' },
    // Shotgun
    { id: 'f_sg_lightweight', name: 'Lightweight Frame',     type: 'shotgun', desc: 'Faster movement speed while equipped.' },
    { id: 'f_sg_precision',   name: 'Precision Frame',       type: 'shotgun', desc: 'Tighter pellet spread.' },
    { id: 'f_sg_rapid',       name: 'Rapid-Fire Frame',      type: 'shotgun', desc: 'Full auto. Deeper reserves, faster reload when empty.' },
    { id: 'f_sg_aggressive',  name: 'Aggressive Frame',      type: 'shotgun', desc: 'High damage, high recoil. Slug-adjacent close range.' },
    { id: 'f_sg_pinpoint',    name: 'Pinpoint Slug Frame',   type: 'shotgun', desc: 'Fires a single accurate slug.' },
    { id: 'f_sg_wave',        name: 'Wave Frame',            type: 'shotgun', desc: 'Fires a wave of energy along the ground.' },
    { id: 'f_sg_support',     name: 'Support Frame',         type: 'shotgun', desc: 'Heals and buffs allies you hit.' },
    // Sniper
    { id: 'f_sr_rapid',       name: 'Rapid-Fire Frame',      type: 'sniper_rifle', desc: 'Deeper reserves, faster reload when empty.' },
    { id: 'f_sr_adaptive',    name: 'Adaptive Frame',        type: 'sniper_rifle', desc: 'A well-rounded frame, reliable and sturdy.' },
    { id: 'f_sr_aggressive',  name: 'Aggressive Frame',      type: 'sniper_rifle', desc: 'High damage, high recoil.' },
    // Fusion
    { id: 'f_fr_rapid',       name: 'Rapid-Fire Frame',      type: 'fusion_rifle', desc: 'Fast charge, deeper reserves.' },
    { id: 'f_fr_adaptive',    name: 'Adaptive Frame',        type: 'fusion_rifle', desc: 'A well-rounded frame, reliable and sturdy.' },
    { id: 'f_fr_precision',   name: 'Precision Frame',       type: 'fusion_rifle', desc: 'Tighter bolt spread.' },
    { id: 'f_fr_high_impact', name: 'High-Impact Frame',     type: 'fusion_rifle', desc: 'Slow charge, high damage.' },
    { id: 'f_fr_aggressive',  name: 'Aggressive Frame',      type: 'fusion_rifle', desc: 'High damage, high recoil.' },
    // Trace
    { id: 'f_tr_adaptive',    name: 'Adaptive Frame',        type: 'trace_rifle', desc: 'A well-rounded frame, reliable and sturdy.' },
    { id: 'f_tr_support',     name: 'Support Frame',         type: 'trace_rifle', desc: 'Heals allies you hit.' },
    // Glaive
    { id: 'f_gl_adaptive',    name: 'Adaptive Glaive',       type: 'glaive', desc: 'A well-rounded glaive with a projectile and an energy shield.' },
    { id: 'f_gl_lightweight', name: 'Lightweight Glaive',    type: 'glaive', desc: 'Faster movement and melee speed.' },
    // Breech GL
    { id: 'f_bgl_lightweight', name: 'Lightweight Frame',    type: 'breech_gl', desc: 'Faster movement speed while equipped.' },
    { id: 'f_bgl_double',     name: 'Double Fire',           type: 'breech_gl', desc: 'Fires two grenades per trigger pull.' },
    { id: 'f_bgl_wave',       name: 'Wave Frame',            type: 'breech_gl', desc: 'Fires a wave of energy along the ground.' },
    { id: 'f_bgl_area',       name: 'Area Denial Frame',     type: 'breech_gl', desc: 'Creates a lingering elemental field on detonation.' },
    { id: 'f_bgl_rocket',     name: 'Rocket-Assisted Frame', type: 'breech_gl', desc: 'Rocket-assisted grenades with heavy direct damage.' },
    // Heavy GL
    { id: 'f_hgl_adaptive',   name: 'Adaptive Frame',        type: 'heavy_gl', desc: 'A well-rounded drum-loaded frame.' },
    { id: 'f_hgl_rapid',      name: 'Rapid-Fire Frame',      type: 'heavy_gl', desc: 'Deeper reserves, faster reload when empty.' },
    { id: 'f_hgl_aggressive', name: 'Aggressive Frame',      type: 'heavy_gl', desc: 'High damage, high blast radius.' },
    { id: 'f_hgl_precision',  name: 'Precision Frame',       type: 'heavy_gl', desc: 'Predictable arc, high direct-hit damage.' },
    // Machine Gun
    { id: 'f_mg_adaptive',    name: 'Adaptive Frame',        type: 'machine_gun', desc: 'A well-rounded frame, reliable and sturdy.' },
    { id: 'f_mg_rapid',       name: 'Rapid-Fire Frame',      type: 'machine_gun', desc: 'Deeper reserves, faster reload when empty.' },
    { id: 'f_mg_high_impact', name: 'High-Impact Frame',     type: 'machine_gun', desc: 'Slow rate of fire, high damage.' },
    { id: 'f_mg_aggressive',  name: 'Aggressive Frame',      type: 'machine_gun', desc: 'High damage, high recoil.' },
    // Rocket
    { id: 'f_rl_adaptive',    name: 'Adaptive Frame',        type: 'rocket_launcher', desc: 'A well-rounded frame, reliable and sturdy.' },
    { id: 'f_rl_aggressive',  name: 'Aggressive Frame',      type: 'rocket_launcher', desc: 'High damage, high blast radius.' },
    { id: 'f_rl_precision',   name: 'Precision Frame',       type: 'rocket_launcher', desc: 'Predictable flight path, high direct-hit damage.' },
    { id: 'f_rl_high_impact', name: 'High-Impact Frame',     type: 'rocket_launcher', desc: 'Slow reload, very high damage.' },
    { id: 'f_rl_hakke',       name: 'Hakke Precision Frame', type: 'rocket_launcher', desc: 'Extremely accurate with high direct-hit damage.' },
    // Linear Fusion
    { id: 'f_lf_precision',   name: 'Precision Frame',       type: 'linear_fusion', desc: 'Fires a single high-damage precision bolt.' },
    { id: 'f_lf_aggressive',  name: 'Aggressive Frame',      type: 'linear_fusion', desc: 'Fires a three-round burst.' },
    // Sword
    { id: 'f_sw_adaptive',    name: 'Adaptive Frame',        type: 'sword', desc: 'A well-rounded sword. Heavy attack is a spin.' },
    { id: 'f_sw_aggressive',  name: 'Aggressive Frame',      type: 'sword', desc: 'High damage, slow swing. Heavy attack is an uppercut.' },
    { id: 'f_sw_vortex',      name: 'Vortex Frame',          type: 'sword', desc: 'Heavy attack unleashes a spinning vortex attack.' },
    { id: 'f_sw_caster',      name: 'Caster Frame',          type: 'sword', desc: 'Heavy attack projects energy at range.' },
    { id: 'f_sw_wave',        name: 'Wave Frame',            type: 'sword', desc: 'Heavy attack sends a wave of energy along the ground.' },
    { id: 'f_sw_lightweight', name: 'Lightweight Frame',     type: 'sword', desc: 'Faster movement speed while equipped.' }
  ];

  /* Index helpers ------------------------------------------------------ */
  function indexById(list) {
    var m = {};
    list.forEach(function (x) { m[x.id] = x; });
    return m;
  }

  S.perkIndex = {};
  [S.barrels, S.magazines, S.traits, S.originTraits, S.masterworks, S.weaponMods, S.frames]
    .forEach(function (list) {
      list.forEach(function (p) { S.perkIndex[p.id] = p; });
    });

  S.frameById = indexById(S.frames);
  S.framesByType = D2.util.groupBy(S.frames, function (f) { return f.type; });

  // Filter a perk list down to what a given weapon type can roll.
  S.perksFor = function (list, weaponTypeId) {
    return list.filter(function (p) {
      if (!p.on) return true;
      return p.on.indexOf(weaponTypeId) !== -1;
    });
  };

  S.PRIMARY_GUNS = PRIMARY_GUNS;
  S.ALL_GUNS = ALL_GUNS;
})(window.D2);
