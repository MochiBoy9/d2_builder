/* Exotic armor for all three classes, plus the Prismatic Exotic class items
   and their Spirit perk pools.

   Legendary armor is not enumerated: in Armor 3.0 a Legendary piece is defined
   by its archetype, tier, stat spread and set, all of which you configure
   directly on the piece. Naming ten thousand individual Legendary rolls would
   add nothing the archetype editor does not already give you. Manifest sync
   brings in the named Legendary sets with their icons if you want them. */
(function (D2) {
  'use strict';
  var S = D2.data;

  // a(id, name, classId, slot, perkName, perkDesc)
  function a(id, name, classId, slot, perkName, perkDesc) {
    return {
      id: id, name: name, classId: classId, slot: slot,
      rarity: 'exotic', perk: perkName, perkDesc: perkDesc, source: 'curated'
    };
  }

  S.exoticArmor = [

    /* ======================= TITAN ======================= */
    // Helmets
    a('ea_skullfort', 'An Insurmountable Skullfort', 'titan', 'helmet', 'Transfusion Matrix',
      'Arc melee final blows trigger health regeneration and restore melee energy.'),
    a('ea_helm_saint14', 'Helm of Saint-14', 'titan', 'helmet', 'Starless Night',
      'Ward of Dawn blinds nearby enemies. Allies passing through the barrier gain an overshield.'),
    a('ea_eternal_warrior', 'Eternal Warrior', 'titan', 'helmet', 'Tempered Metal',
      'Fists of Havoc grants an Arc overshield; Arc final blows grant bonus weapon damage to you and allies.'),
    a('ea_one_eyed_mask', 'One-Eyed Mask', 'titan', 'helmet', 'Vengeance',
      'Marks the enemy that damaged you. Defeating that target grants an overshield and health regeneration.'),
    a('ea_mask_quiet_one', 'Mask of the Quiet One', 'titan', 'helmet', 'Dreaded Visage',
      'Gain ability energy when damaged. Final blows while critically wounded restore health.'),
    a('ea_precious_scars', 'Precious Scars', 'titan', 'helmet', 'Cauterizing Aegis',
      'Reloading after a final blow heals you and nearby allies. Revives grant an overshield to the fireteam.'),
    a('ea_loreley', 'Loreley Splendor Helm', 'titan', 'helmet', 'Cauterizing Flame',
      'Casting your barricade creates a Sunspot. While critically wounded, a Sunspot is created automatically.'),
    a('ea_khepris_horn', "Khepri's Horn", 'titan', 'helmet', 'Solar Bulwark',
      'Your barricade releases a blast of Solar energy and leaves a scorching wave in front of it.'),
    a('ea_cadmus_ridge', 'Cadmus Ridge Lancecap', 'titan', 'helmet', 'Vail of Sorrow',
      'Standing near a Stasis crystal or frozen target creates a Diamond Lance. Lance impacts create crystals.'),
    a('ea_hoarfrost_helm', 'Mask of Fealty', 'titan', 'helmet', 'Frozen Focus',
      'Stasis melee final blows create a Stasis crystal at the target’s location.'),

    // Gauntlets
    a('ea_synthoceps', 'Synthoceps', 'titan', 'gauntlets', 'Biotic Enhancements',
      'Improved melee and Super damage when you are surrounded by combatants.'),
    a('ea_wormgod_caress', 'Wormgod Caress', 'titan', 'gauntlets', 'Burning Fists',
      'Melee final blows stack a large melee damage bonus that decays over time.'),
    a('ea_ursa_furiosa', 'Ursa Furiosa', 'titan', 'gauntlets', 'Ursine Guard',
      'Guarding with Sentinel Shield converts damage blocked into Super energy and grants faster movement.'),
    a('ea_doom_fang', 'Doom Fang Pauldron', 'titan', 'gauntlets', 'Horns of Doom',
      'Void melee final blows recharge Sentinel Shield. Shield Throw kills extend the Super.'),
    a('ea_stronghold', 'Stronghold', 'titan', 'gauntlets', 'Fortifying Bulwark',
      'Guarding with a sword perfectly blocks all damage and heals you. Swords reload on a successful guard.'),
    a('ea_citans_ramparts', "Citan's Ramparts", 'titan', 'gauntlets', 'Assault Barricade',
      'Your barricade is wider and you and allies can fire through it.'),
    a('ea_acd0_feedback', 'ACD/0 Feedback Fence', 'titan', 'gauntlets', 'Fury Conductors',
      'Melee final blows build charges. Taking melee damage releases a damaging Arc explosion.'),
    a('ea_no_backup_plans', 'No Backup Plans', 'titan', 'gauntlets', 'Sneak Attack',
      'Void overshields last longer, and shotgun final blows extend them and restore melee energy.'),
    a('ea_icefall_mantle', 'Icefall Mantle', 'titan', 'gauntlets', 'Glacial Fortification',
      'Replaces your barricade with a Stasis overshield that slows your movement but greatly reduces incoming damage.'),
    a('ea_second_chance', 'Second Chance', 'titan', 'gauntlets', 'Fortified Light',
      'Grants an additional Shield Throw charge. Hitting a Barrier Champion with Shield Throw stuns it.'),
    a('ea_ashen_wake', 'Ashen Wake', 'titan', 'gauntlets', 'Fusion Burst',
      'Fusion grenades explode on impact and travel faster. Kills with them return grenade energy.'),
    a('ea_pyrogale', 'Pyrogale Gauntlets', 'titan', 'gauntlets', 'Roaring Flames',
      'Consecration’s second slam becomes a single massive Solar eruption. Burning Maul slam creates cyclones.'),
    a('ea_point_contact', 'Point-Contact Cannon Brace', 'titan', 'gauntlets', 'Thunderous Retort',
      'Thunderclap and Ballistic Slam call down lightning strikes. Damage taken charges Thunderclap faster.'),
    a('ea_wishful_ignorance', 'Wishful Ignorance', 'titan', 'gauntlets', 'Bladed Nightmare',
      'Frenzied Blade gains an additional charge. Strand melee final blows grant Unravelling Rounds.'),
    a('ea_aeon_safe', 'Aeon Safe', 'titan', 'gauntlets', 'Sect of Force',
      'Finishers grant a chosen boon to your fireteam — Heavy ammo, ability energy or damage — shared with other Aeon wearers.'),

    // Chest
    a('ea_heart_inmost_light', 'Heart of Inmost Light', 'titan', 'chest', 'Overflowing Light',
      'Using an ability empowers the other two, greatly increasing their regeneration rate and effect.'),
    a('ea_actium_war_rig', 'Actium War Rig', 'titan', 'chest', 'Auto-Loading Link',
      'Auto rifles and machine guns continuously reload a portion of the magazine from reserves.'),
    a('ea_hallowfire_heart', 'Hallowfire Heart', 'titan', 'chest', 'Sunfire Furnace',
      'Greatly improves Solar ability recharge rate while your Super is charging.'),
    a('ea_cuirass_falling_star', 'Cuirass of the Falling Star', 'titan', 'chest', 'Impact Conversion',
      'Thundercrash deals massively increased damage and grants an overshield on impact.'),
    a('ea_armamentarium', 'The Armamentarium', 'titan', 'chest', 'And Another Thing',
      'Grants an additional grenade charge.'),
    a('ea_hoarfrost_z', 'Hoarfrost-Z', 'titan', 'chest', 'Glacial Fortification',
      'Your barricade becomes a wall of Stasis crystals. Standing near it grants weapon stability and range.'),
    a('ea_severance_enclosure', 'Severance Enclosure', 'titan', 'chest', 'Hive Soul',
      'Powered melee final blows and finishers create a large damaging explosion.'),
    a('ea_crest_alpha_lupi', 'Crest of Alpha Lupi', 'titan', 'chest', 'Survival Well',
      'Your barricade releases a healing burst for you and nearby allies. Revive allies faster.'),

    // Legs
    a('ea_dunemarchers', 'Dunemarchers', 'titan', 'legs', 'Linear Actuators',
      'Sprinting builds static charge. Melee attacks chain lightning to nearby targets.'),
    a('ea_peacekeepers', 'Peacekeepers', 'titan', 'legs', 'Mecha Holster',
      'Submachine guns are automatically reloaded when stowed and ready instantly.'),
    a('ea_lion_rampant', 'Lion Rampant', 'titan', 'legs', 'Jump Jets',
      'Improved in-air accuracy and control over Lift.'),
    a('ea_antaeus_wards', 'Antaeus Wards', 'titan', 'legs', 'Reflective Vents',
      'Sliding after sprinting creates a shield that reflects incoming projectiles.'),
    a('ea_path_burning_steps', 'The Path of Burning Steps', 'titan', 'legs', 'Firewalker',
      'Solar final blows grant stacking weapon damage. Immune to Stasis slow and freeze.'),
    a('ea_phoenix_cradle', 'Phoenix Cradle', 'titan', 'legs', 'Lorelei’s Blessing',
      'Sunspots last longer and grant Restoration to you and allies who stand in them.'),
    a('ea_mk44', 'Mk. 44 Stand Asides', 'titan', 'legs', 'Seriously, Watch Out',
      'Shoulder charge final blows grant an overshield and health regeneration.'),
    a('ea_abeyant_leap', 'Abeyant Leap', 'titan', 'legs', 'Vengeful Barricade',
      'Drengr’s Lash sends out additional tracking waves and suspends for longer.'),
    a('ea_peregrine_greaves', 'Peregrine Greaves', 'titan', 'legs', 'Peregrine Strike',
      'Shoulder charge attacks from the air deal massively increased damage.'),

    /* ======================= HUNTER ======================= */
    // Helmets
    a('ea_celestial_nighthawk', 'Celestial Nighthawk', 'hunter', 'helmet', 'Hawkeye Hack',
      'Golden Gun fires a single high-damage shot. Kills with it refund Super energy and generate heavy ammo.'),
    a('ea_knucklehead', 'Knucklehead Radar', 'hunter', 'helmet', 'Upgraded Sensor Pack',
      'Radar stays active while aiming down sights and gains enhanced resolution.'),
    a('ea_foetracer', 'Foetracer', 'hunter', 'helmet', 'Relentless Tracker',
      'Aiming at an enemy marks them. Marked targets take more damage from your abilities.'),
    a('ea_mask_of_bakris', 'Mask of Bakris', 'hunter', 'helmet', 'Shifting Step',
      'Your dodge becomes a long-range Light shift that grants bonus Arc and Stasis weapon damage.'),
    a('ea_graviton_forfeit', 'Graviton Forfeit', 'hunter', 'helmet', 'Aeon Drain',
      'Invisibility lasts longer and grants improved melee and recovery while active.'),
    a('ea_assassins_cowl', "Assassin's Cowl", 'hunter', 'helmet', 'Vanishing Execution',
      'Powered melee final blows and finishers grant invisibility and restore health.'),
    a('ea_wormhusk_crown', 'Wormhusk Crown', 'hunter', 'helmet', 'Burning Souls',
      'Dodging grants a small burst of health and shield energy.'),
    a('ea_blight_ranger', 'Blight Ranger', 'hunter', 'helmet', 'Nowhere to Run',
      'Deflecting damage with Arc Staff builds a reflective blast that damages and blinds.'),
    a('ea_cyrtarachnes', "Cyrtarachne's Facade", 'hunter', 'helmet', 'Threaded Needle',
      'Using your grapple grants Woven Mail and greatly reduced flinch.'),
    a('ea_gifted_conviction', 'Gifted Conviction', 'hunter', 'helmet', 'Ex Machina',
      'Using your class ability grants a large stacking bonus to resilience and recovery.'),

    // Gauntlets
    a('ea_liars_handshake', "Liar's Handshake", 'hunter', 'gauntlets', 'Cross Counter',
      'Melee after taking melee damage deals massively increased damage and heals you.'),
    a('ea_young_ahamkara', "Young Ahamkara's Spine", 'hunter', 'gauntlets', 'Wish-Dragon Teeth',
      'Tripmine grenades last longer, and dealing ability damage returns grenade energy.'),
    a('ea_shinobus_vow', "Shinobu's Vow", 'hunter', 'gauntlets', 'New Tricks',
      'Grants an additional Skip Grenade charge, and skip grenades track better and deal more damage.'),
    a('ea_athrys_embrace', "Athrys's Embrace", 'hunter', 'gauntlets', 'Skittering Stinger',
      'Weighted Throwing Knife ricochets and gains a large damage bonus after precision hits.'),
    a('ea_renewal_grasps', 'Renewal Grasps', 'hunter', 'gauntlets', 'Redirected Rage',
      'Duskfield grenades create a large dome that greatly weakens enemy damage inside it.'),
    a('ea_calibans_hand', "Caliban's Hand", 'hunter', 'gauntlets', 'Fastball',
      'Proximity Explosive Knife ignites targets, and melee final blows create Firesprites.'),
    a('ea_khepris_sting', "Khepri's Sting", 'hunter', 'gauntlets', 'Touch of Venom',
      'Smoke bombs damage on contact. Melee from invisibility blinds nearby targets.'),
    a('ea_mechaneers', "Mechaneer's Tricksleeves", 'hunter', 'gauntlets', 'Cutting Fire',
      'Greatly increases sidearm ready speed and damage, especially while critically wounded.'),
    a('ea_oathkeeper', 'Oathkeeper', 'hunter', 'gauntlets', 'Adamantine Brace',
      'Hold bow arrows at full draw indefinitely, gaining damage the longer you hold.'),
    a('ea_shards_galanor', 'Shards of Galanor', 'hunter', 'gauntlets', 'Sharp Edges',
      'Blade Barrage hits and kills return a portion of your Super energy.'),
    a('ea_sealed_ahamkara', 'Sealed Ahamkara Grasps', 'hunter', 'gauntlets', 'Flawless Execution',
      'Dealing melee damage reloads your stowed weapons.'),
    a('ea_mothkeepers', "Mothkeeper's Wraps", 'hunter', 'gauntlets', 'Wraith of Wishes',
      'Your grenade releases a cage of moths that damage enemies and shield allies.'),
    a('ea_triton_vice', 'Triton Vice', 'hunter', 'gauntlets', 'Ivory Prongs',
      'Glaive melee attacks release a damaging shockwave and grant glaive ammo.'),
    a('ea_aeon_swift', 'Aeon Swift', 'hunter', 'gauntlets', 'Sect of Insight',
      'Finishers grant a chosen boon to your fireteam — Heavy ammo, ability energy or damage — shared with other Aeon wearers.'),

    // Chest
    a('ea_gyrfalcons', "Gyrfalcon's Hauberk", 'hunter', 'chest', 'Enduring Uncertainty',
      'Emerging from invisibility grants Volatile Rounds to your Void weapons and improved weapon damage.'),
    a('ea_ophidia_spathe', 'Ophidia Spathe', 'hunter', 'chest', 'Scissor Fingers',
      'Grants an additional throwing knife charge.'),
    a('ea_dragons_shadow', "The Dragon's Shadow", 'hunter', 'chest', 'Wraithmetal Mail',
      'Dodging reloads all weapons and grants greatly increased movement and weapon handling.'),
    a('ea_sixth_coyote', 'The Sixth Coyote', 'hunter', 'chest', 'Double Dodge',
      'Grants an additional dodge charge.'),
    a('ea_raijus_harness', "Raiju's Harness", 'hunter', 'chest', 'Touch of Ionization',
      'Arc Staff can be deactivated early to save Super. Deflecting damage extends its duration.'),
    a('ea_lucky_raspberry', 'Lucky Raspberry', 'hunter', 'chest', 'Probability Matrix',
      'Arcbolt grenades chain further and have a chance to fully recharge on damage.'),
    a('ea_gwisin_vest', 'Gwisin Vest', 'hunter', 'chest', 'Roving Assassin',
      'Vanishing during Spectral Blades refunds Super energy based on how many targets you defeated.'),

    // Legs
    a('ea_orpheus_rig', 'Orpheus Rig', 'hunter', 'legs', 'Uncanny Arrows',
      'Shadowshot tethers return a large amount of Super energy per target tethered.'),
    a('ea_star_eater_scales', 'Star-Eater Scales', 'hunter', 'legs', 'Feast of Light',
      'Collecting Orbs of Power while your Super is full overcharges it for greatly increased damage.'),
    a('ea_stompees', 'ST0MP-EE5', 'hunter', 'legs', 'Hydraulic Boosters',
      'Increased sprint speed, slide distance and jump height.'),
    a('ea_lucky_pants', 'Lucky Pants', 'hunter', 'legs', 'Illegally Modded Holster',
      'Readying a Hand Cannon greatly improves accuracy and stacks a large damage bonus.'),
    a('ea_radiant_dance', 'Radiant Dance Machines', 'hunter', 'legs', 'Improvised Reload',
      'Dodging near enemies grants free dodges and instant weapon swapping.'),
    a('ea_frostees', 'Fr0st-EE5', 'hunter', 'legs', 'Rapid Cooldown',
      'Increased grenade, melee and dodge regeneration while sprinting.'),
    a('ea_gemini_jester', 'Gemini Jester', 'hunter', 'legs', 'Misdirection',
      'Dodging disorients nearby enemies and removes their radar.'),
    a('ea_the_bombardiers', 'The Bombardiers', 'hunter', 'legs', 'Parting Gift',
      'Dodging leaves behind an explosive that matches your subclass element.'),
    a('ea_speedloader_slacks', 'Speedloader Slacks', 'hunter', 'legs', 'Speed Load',
      'Dodging grants a large stacking reload speed and handling bonus to you and nearby allies.'),
    a('ea_swarmers', 'Swarmers', 'hunter', 'legs', 'Weaver’s Trance',
      'Destroying a Tangle spawns a Threadling. Threadling final blows unravel nearby targets.'),

    /* ======================= WARLOCK ======================= */
    // Helmets
    a('ea_crown_tempests', 'Crown of Tempests', 'warlock', 'helmet', 'Conduction Tines',
      'Arc ability final blows increase the recharge rate of all your Arc abilities.'),
    a('ea_nezarecs_sin', "Nezarec's Sin", 'warlock', 'helmet', 'Abyssal Extractors',
      'Void damage kills greatly increase all ability energy recharge rates.'),
    a('ea_eye_another_world', 'Eye of Another World', 'warlock', 'helmet', 'Cerebral Uplink',
      'Highlights priority targets and improves the regeneration of all your abilities.'),
    a('ea_skull_dire_ahamkara', 'Skull of Dire Ahamkara', 'warlock', 'helmet', 'Actual Grandeur',
      'Nova Bomb kills grant Super energy. Take reduced damage while your Super is active.'),
    a('ea_apotheosis_veil', 'Apotheosis Veil', 'warlock', 'helmet', 'Insatiable',
      'On Super activation, immediately regenerate melee, grenade and health energy for you and nearby allies.'),
    a('ea_the_stag', 'The Stag', 'warlock', 'helmet', 'Dumbfound',
      'Grants a rift on death. Rifts grant damage resistance while you are critically wounded.'),
    a('ea_astrocyte_verse', 'Astrocyte Verse', 'warlock', 'helmet', 'Move On, Nothing to See Here',
      'Blink further, and weapons ready instantly after blinking.'),
    a('ea_veritys_brow', "Verity's Brow", 'warlock', 'helmet', 'The Fourth Magic',
      'Weapon final blows with a matching element grant greatly increased grenade energy to you and allies.'),
    a('ea_fallen_sunstar', 'Fallen Sunstar', 'warlock', 'helmet', 'Interspatial Flight',
      'Ionic Traces move faster, grant more ability energy, and share energy with nearby allies.'),
    a('ea_dawn_chorus', 'Dawn Chorus', 'warlock', 'helmet', 'Iron Spike',
      'Daybreak projectiles scorch on hit, and scorch damage is increased.'),
    a('ea_felwinters_helm', "Felwinter's Helm", 'warlock', 'helmet', 'Warlord’s End',
      'Powered melee final blows emit a burst that weakens nearby combatants.'),
    a('ea_cenotaph_mask', 'Cenotaph Mask', 'warlock', 'helmet', 'Hive Trace',
      'Trace rifle damage marks targets. Allies defeating marked targets generate Heavy ammo.'),
    a('ea_speakers_sight', "Speaker's Sight", 'warlock', 'helmet', 'Ghost of the Speaker',
      'Healing grenades spawn a healing turret that cures you and your allies.'),

    // Gauntlets
    a('ea_ophidian_aspect', 'Ophidian Aspect', 'warlock', 'gauntlets', 'Cephalarius Adornment',
      'Weapons ready and reload faster, and melee range is increased.'),
    a('ea_sunbracers', 'Sunbracers', 'warlock', 'gauntlets', 'Helion Blaze',
      'Solar melee final blows grant greatly increased grenade energy and unlimited Solar grenades briefly.'),
    a('ea_contraverse_hold', 'Contraverse Hold', 'warlock', 'gauntlets', 'Chaotic Exchanger',
      'Charging a Void grenade grants damage resistance, and Void grenade hits return grenade energy.'),
    a('ea_karnstein_armlets', 'Karnstein Armlets', 'warlock', 'gauntlets', 'Vampire’s Caress',
      'Melee final blows grant immediate health regeneration and continued healing.'),
    a('ea_claws_ahamkara', 'Claws of Ahamkara', 'warlock', 'gauntlets', 'Improved Unflinching',
      'Grants an additional melee charge.'),
    a('ea_nothing_manacles', 'Nothing Manacles', 'warlock', 'gauntlets', 'Vex Manacles',
      'Grants an additional Scatter Grenade charge, and scatter grenade projectiles track targets.'),
    a('ea_winters_guile', "Winter's Guile", 'warlock', 'gauntlets', 'Fel Taradiddle',
      'Melee final blows greatly increase melee damage, stacking with each kill.'),
    a('ea_osmiomancy_gloves', 'Osmiomancy Gloves', 'warlock', 'gauntlets', 'Cold Bore Refit',
      'Grants an additional Coldsnap Grenade charge; seekers travel farther and track better.'),
    a('ea_necrotic_grip', 'Necrotic Grip', 'warlock', 'gauntlets', 'Nezarec’s Whisper',
      'Melee damage poisons targets. Poisoned targets that die spread the poison to nearby enemies.'),
    a('ea_getaway_artist', 'Getaway Artist', 'warlock', 'gauntlets', 'Dynamic Duo',
      'Convert your grenade into a supercharged Arc Soul and become Amplified.'),
    a('ea_briarbinds', 'Briarbinds', 'warlock', 'gauntlets', 'Overflowing Chalice',
      'Void Souls last longer and can be picked up and redeployed.'),
    a('ea_aeon_soul', 'Aeon Soul', 'warlock', 'gauntlets', 'Sect of Vigor',
      'Finishers grant a chosen boon to your fireteam — Heavy ammo, ability energy or damage — shared with other Aeon wearers.'),
    a('ea_geomag', 'Geomag Stabilizers', 'warlock', 'legs', 'Chaotic Amplifier',
      'Chaos Reach lingers longer when damaging targets, and sprinting tops off your Super.'),

    // Chest
    a('ea_starfire_protocol', 'Starfire Protocol', 'warlock', 'chest', 'Ember of Benevolence',
      'Grants an additional Fusion Grenade charge. Grenade damage returns rift energy while Empowering Rift is active.'),
    a('ea_phoenix_protocol', 'Phoenix Protocol', 'warlock', 'chest', 'Battle Bond',
      'Kills and assists while standing in your Well of Radiance return Super energy.'),
    a('ea_transversive_chest', 'Chromatic Fire', 'warlock', 'chest', 'Crystalline Transistor',
      'Kinetic weapon precision final blows cause an elemental explosion matching your subclass.'),
    a('ea_wings_sacred_dawn', 'Wings of Sacred Dawn', 'warlock', 'chest', 'Tome of Dawn',
      'Aiming down sights while airborne suspends you in mid-air and increases weapon damage.'),
    a('ea_vesper_of_radius', 'Vesper of Radius', 'warlock', 'chest', 'Planetary Torrent',
      'Rifts release an Arc shockwave on cast, and rift energy regenerates faster when surrounded.'),
    a('ea_stormdancers_brace', "Stormdancer's Brace", 'warlock', 'chest', 'Ascending Amplitude',
      'Kills with Stormtrance increase its damage and return Super energy on cast.'),
    a('ea_mantle_battle_harmony', 'Mantle of Battle Harmony', 'warlock', 'chest', 'Absorption Cells',
      'While your Super is full, weapons matching your subclass element deal bonus damage.'),
    a('ea_ballidorse', 'Ballidorse Wrathweavers', 'warlock', 'chest', 'Wrath of Rasputin',
      'Winter’s Wrath grants nearby allies bonus Stasis weapon damage and shatter damage.'),
    a('ea_sanguine_alchemy', 'Sanguine Alchemy', 'warlock', 'chest', 'Heart of the Pack',
      'Standing in a rift marks targets and grants bonus weapon damage of your subclass element.'),
    a('ea_rime_coat', 'Rime-coat Raiment', 'warlock', 'chest', 'Iceborn Bulwark',
      'Winter’s Wrath gains a shatter shockwave, and shattering crystals near you grants a Stasis overshield.'),

    // Legs
    a('ea_transversive_steps', 'Transversive Steps', 'warlock', 'legs', 'Strange Protractor',
      'Sprinting increases movement speed and automatically reloads your equipped weapon.'),
    a('ea_lunafaction_boots', 'Lunafaction Boots', 'warlock', 'legs', 'Alchemical Etchings',
      'Your rifts automatically reload the weapons of you and allies inside them.'),
    a('ea_promethium_spur', 'Promethium Spur', 'warlock', 'legs', 'Flame Refraction',
      'Solar ability final blows create a rift at the target’s location.'),
    a('ea_boots_assembler', 'Boots of the Assembler', 'warlock', 'legs', 'Blessing of Order',
      'Standing in your rift creates Noble Seekers that heal or empower nearby allies.'),
    a('ea_secant_filaments', 'Secant Filaments', 'warlock', 'legs', 'Tangled Web',
      'Casting an Empowering Rift grants Devour.'),
    a('ea_rain_of_fire', 'Rain of Fire', 'warlock', 'legs', 'Fusion Cell',
      'Fusion rifle final blows reload your weapons. Icarus Dash reloads fusion rifles and grants bonus damage.'),

    /* ============ PRISMATIC EXOTIC CLASS ITEMS ============ */
    a('ea_stoicism', 'Stoicism', 'titan', 'classitem', 'Twin Spirits',
      'A Prismatic Exotic class item. Rolls with two Spirit perks drawn from other Exotic armor.'),
    a('ea_relativism', 'Relativism', 'hunter', 'classitem', 'Twin Spirits',
      'A Prismatic Exotic class item. Rolls with two Spirit perks drawn from other Exotic armor.'),
    a('ea_solipsism', 'Solipsism', 'warlock', 'classitem', 'Twin Spirits',
      'A Prismatic Exotic class item. Rolls with two Spirit perks drawn from other Exotic armor.')
  ];

  S.exoticArmorById = {};
  S.exoticArmor.forEach(function (x) { S.exoticArmorById[x.id] = x; });

  S.exoticArmorFor = function (classId, slotId) {
    return S.exoticArmor.filter(function (x) {
      return x.classId === classId && (!slotId || x.slot === slotId);
    });
  };

  /* =====================================================================
     SPIRIT PERKS — the two columns on a Prismatic Exotic class item.
     Column 1 mostly grants a class ability / utility effect; column 2 mostly
     grants a damage or economy effect. Curated snapshot; manifest sync
     replaces it with the live pool.
     ===================================================================== */

  function sp(id, name, classes, col, desc) {
    return { id: id, name: name, classes: classes, col: col, desc: desc };
  }
  var ALL3 = ['titan', 'hunter', 'warlock'];

  S.spirits = [
    /* ---- Column 1: shared across all three class items ---- */
    sp('sp_assassin',   'Spirit of the Assassin',   ALL3, 1, 'Finishers and powered melee final blows grant invisibility.'),
    sp('sp_inmost',     'Spirit of Inmost Light',   ALL3, 1, 'Using an ability empowers the other two abilities.'),
    sp('sp_ophidian',   'Spirit of the Ophidian',   ALL3, 1, 'Weapons ready and reload faster; increased melee range.'),
    sp('sp_dragon',     'Spirit of the Dragon',     ALL3, 1, 'Using your class ability reloads your weapons and improves weapon handling.'),
    sp('sp_star_eater', 'Spirit of the Star-Eater', ALL3, 1, 'Collecting Orbs of Power while your Super is full overcharges your next Super.'),
    sp('sp_synthoceps', 'Spirit of Synthoceps',     ALL3, 1, 'Improved melee and Super damage when you are surrounded.'),
    sp('sp_verity',     'Spirit of Verity',         ALL3, 1, 'Weapon final blows matching your subclass grant grenade energy.'),
    sp('sp_harmony',    'Spirit of Harmony',        ALL3, 1, 'Weapon final blows matching your subclass element grant Super energy.'),
    /* ---- Column 1: class-specific ---- */
    sp('sp_eternal_warrior', 'Spirit of the Eternal Warrior', ['titan'], 1, 'Activating your Super grants a weapon damage bonus.'),
    sp('sp_bear',       'Spirit of the Bear',       ['titan'],   1, 'Guarding with Sentinel Shield converts damage blocked into Super energy.'),
    sp('sp_horn',       'Spirit of the Horn',       ['titan'],   1, 'Casting your barricade creates a Solar explosion.'),
    sp('sp_liar',       'Spirit of the Liar',       ['hunter'],  1, 'Melee after taking melee damage deals greatly increased damage and heals you.'),
    sp('sp_galanor',    'Spirit of Galanor',        ['hunter'],  1, 'Hits and kills with your Super return Super energy.'),
    sp('sp_foetracer',  'Spirit of the Foetracer',  ['hunter'],  1, 'Damaging a target with an ability grants matching-element weapon damage.'),
    sp('sp_caliban',    'Spirit of Caliban',        ['hunter'],  1, 'Powered melee final blows cause an ignition.'),
    sp('sp_renewal',    'Spirit of Renewal',        ['hunter'],  1, 'Targets inside your Duskfield deal greatly reduced damage.'),
    sp('sp_stag',       'Spirit of the Stag',       ['warlock'], 1, 'Your rift grants damage resistance while you are critically wounded.'),
    sp('sp_filaments',  'Spirit of the Filaments',  ['warlock'], 1, 'Casting an Empowering Rift grants Devour.'),
    sp('sp_necrotic',   'Spirit of Necrotic',       ['warlock'], 1, 'Melee damage poisons targets; poisoned targets spread it on death.'),
    sp('sp_apotheosis', 'Spirit of Apotheosis',     ['warlock'], 1, 'Activating your Super grants greatly increased ability regeneration.'),
    sp('sp_starfire',   'Spirit of Starfire',       ['warlock'], 1, 'Empowering Rift grants an additional grenade charge.'),

    /* ---- Column 2: shared ---- */
    sp('sp_alpha_lupi', 'Spirit of Alpha Lupi',        ALL3, 2, 'Your class ability releases a healing burst for you and nearby allies.'),
    sp('sp_scars',      'Spirit of Scars',             ALL3, 2, 'Reloading after a final blow heals you and nearby allies.'),
    sp('sp_gyrfalcon',  'Spirit of the Gyrfalcon',     ALL3, 2, 'Emerging from invisibility grants Volatile Rounds.'),
    sp('sp_cyrtarachne', 'Spirit of Cyrtarachne',      ALL3, 2, 'Using your grapple grants Woven Mail.'),
    sp('sp_contact',    'Spirit of Contact',           ALL3, 2, 'Powered melee final blows jolt nearby targets.'),
    sp('sp_swarm',      'Spirit of the Swarm',         ALL3, 2, 'Destroying a Tangle spawns Threadlings.'),
    sp('sp_osmiomancy', 'Spirit of Osmiomancy',        ALL3, 2, 'Grants an additional Coldsnap Grenade charge with better tracking.'),
    sp('sp_severance',  'Spirit of Severance',         ALL3, 2, 'Powered melee final blows and finishers create a damaging explosion.'),
    sp('sp_armamentarium', 'Spirit of the Armamentarium', ALL3, 2, 'Grants an additional grenade charge.'),
    sp('sp_wormgod',    'Spirit of the Wormgod',       ALL3, 2, 'Melee final blows stack a large melee damage bonus.'),
    sp('sp_dawn_chorus', 'Spirit of the Dawn',         ALL3, 2, 'Powered melee hits make you Radiant.'),
    sp('sp_vesper',     'Spirit of Vesper',            ALL3, 2, 'Your class ability releases an Arc shockwave.'),
    /* ---- Column 2: class-specific ---- */
    sp('sp_hoarfrost',  'Spirit of Hoarfrost',      ['titan'],   2, 'Your barricade becomes a wall of Stasis crystals.'),
    sp('sp_abeyant',    'Spirit of the Abeyant',    ['titan'],   2, 'Drengr’s Lash sends additional tracking waves with a longer suspend.'),
    sp('sp_falling_star', 'Spirit of the Falling Star', ['titan'], 2, 'Thundercrash deals greatly increased damage.'),
    sp('sp_coyote',     'Spirit of the Coyote',     ['hunter'],  2, 'Grants an additional dodge charge.'),
    sp('sp_wormhusk',   'Spirit of the Wormhusk',   ['hunter'],  2, 'Dodging grants a small burst of health and shields.'),
    sp('sp_bombardiers', 'Spirit of the Bombardier', ['hunter'], 2, 'Dodging leaves behind an explosive charge.'),
    sp('sp_claw',       'Spirit of the Claw',       ['warlock'], 2, 'Grants an additional melee charge.'),
    sp('sp_sunbracers', 'Spirit of the Sunbracers', ['warlock'], 2, 'Solar melee final blows grant briefly unlimited Solar grenades.')
  ];

  S.spiritById = {};
  S.spirits.forEach(function (x) { S.spiritById[x.id] = x; });

  S.spiritsFor = function (classId, col) {
    return S.spirits.filter(function (x) {
      return x.col === col && x.classes.indexOf(classId) !== -1;
    });
  };

  /* Named armor set list used for the 2-piece / 4-piece counter. Set bonus
     text is not shipped -- you write your own note per set and the app tracks
     how many pieces you have equipped. Manifest sync fills in real bonuses. */
  S.armorSetSuggestions = [
    // Raids
    'Ancient Apocalypse', 'Deep Explorer', 'Iron Symmachy', 'Techeun Force',
    'Illicit', 'Scatterhorn', 'Prodigal', 'Cassoid', 'Anti-Extinction',
    'Kairos Function', 'Nessus Aquatic', 'Gilded Precept', 'Cunning Rite',
    // Dungeons
    'Ill Omen', 'Vestments of the Ninth Wave', 'Bladesmith’s Memory',
    'Vault Security', 'Legacy’s Oath', 'Redress', 'Empty Vessel',
    // Trials, Iron Banner, Vanguard, Crucible
    'The Exile’s Curse', 'Iron Will', 'Iron Forerunner', 'Iron Fellowship',
    'Iron Truage', 'Bulletsmith’s Ire', 'Kell’s Fury', 'Wing Contender',
    'Optimacy', 'Wildwood', 'Notorious Sentry', 'Ancient Believer',
    // Seasonal, world and vendor
    'Substitutional Alloy', 'Solstice', 'Neomuna', 'Righteous', 'Refugee',
    'Tex Mechanica', 'BrayTech Sol-Wing', 'Insight Rover', 'Midnight Exigent',
    'Explorer', 'Simulator', 'Devastation Complex', 'Path of Burning Steps',
    'Vigil of Heroes', 'Phenotype Plasticity', 'Cosmetereological',
    'Lightkin', 'Gunsmith’s Devotion', 'Holdfast', 'Cryptic Wanderer',
    'Ghost Forge', 'Terrestrial Complex', 'Sunspoiled', 'Tusked Allegiance'
  ];
})(window.D2);
