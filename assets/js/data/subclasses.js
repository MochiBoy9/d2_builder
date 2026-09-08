/* Subclass database: every Super, ability, Aspect and Fragment for all three
   classes across Solar, Arc, Void, Stasis, Strand and Prismatic.

   Numeric defaults (Aspect fragment-slot counts, Fragment stat modifiers) are
   editable in the app and overwritten by Bungie manifest sync when enabled --
   they are the one part of this file that balance patches move. */
(function (D2) {
  'use strict';
  var S = D2.data = D2.data || {};

  /* =====================================================================
     GRENADES  (shared per element; `only` restricts to specific classes)
     ===================================================================== */

  S.grenades = [
    // --- Solar ---
    { id: 'g_incendiary', name: 'Incendiary Grenade', element: 'solar', desc: 'Explodes on impact, scorching targets caught in the blast.' },
    { id: 'g_swarm',      name: 'Swarm Grenade',      element: 'solar', desc: 'Splits into multiple drones that seek out and scorch nearby targets.' },
    { id: 'g_thermite',   name: 'Thermite Grenade',   element: 'solar', desc: 'Sends a burning line of fire forward along the ground.' },
    { id: 'g_fusion',     name: 'Fusion Grenade',     element: 'solar', desc: 'Attaches to targets and detonates after a short delay for heavy damage.' },
    { id: 'g_solar',      name: 'Solar Grenade',      element: 'solar', desc: 'Creates a lingering flare of Solar Light that continuously damages targets inside it.' },
    { id: 'g_firebolt',   name: 'Firebolt Grenade',   element: 'solar', desc: 'Emits bolts of Solar Light at nearby targets, scorching each one it hits.' },
    { id: 'g_healing',    name: 'Healing Grenade',    element: 'solar', desc: 'Creates a burst of restorative Light that cures you and grants Restoration to allies.' },
    { id: 'g_tripmine',   name: 'Tripmine Grenade',   element: 'solar', only: ['hunter'], desc: 'Sticks to surfaces and detonates when a target crosses its laser trigger.' },

    // --- Arc ---
    { id: 'g_arcbolt',    name: 'Arcbolt Grenade',    element: 'arc', desc: 'Chains lightning between nearby targets, jolting them.' },
    { id: 'g_flux',       name: 'Flux Grenade',       element: 'arc', desc: 'Attaches to targets and deals bonus damage on detonation.' },
    { id: 'g_lightning',  name: 'Lightning Grenade',  element: 'arc', desc: 'Attaches to a surface and emits repeated bursts of lightning.' },
    { id: 'g_pulse',      name: 'Pulse Grenade',      element: 'arc', desc: 'Periodically damages targets inside its radius over time.' },
    { id: 'g_skip',       name: 'Skip Grenade',       element: 'arc', desc: 'Splits into seeking submunitions on impact.' },
    { id: 'g_storm',      name: 'Storm Grenade',      element: 'arc', desc: 'Calls down a localized lightning storm at the point of impact.' },
    { id: 'g_flashbang',  name: 'Flashbang Grenade',  element: 'arc', desc: 'Detonates on impact, blinding targets caught in the blast.' },

    // --- Void ---
    { id: 'g_vortex',     name: 'Vortex Grenade',     element: 'void', desc: 'Creates a vortex that continually damages targets trapped inside.' },
    { id: 'g_scatter',    name: 'Scatter Grenade',    element: 'void', desc: 'Splits into submunitions that detonate on contact.' },
    { id: 'g_axion',      name: 'Axion Bolt',         element: 'void', desc: 'Splits into bolts that seek out and chase nearby targets.' },
    { id: 'g_voidwall',   name: 'Voidwall Grenade',   element: 'void', desc: 'Creates a horizontal wall of burning Void Light.' },
    { id: 'g_magnetic',   name: 'Magnetic Grenade',   element: 'void', desc: 'Attaches to targets and detonates twice, weakening survivors.' },
    { id: 'g_suppressor', name: 'Suppressor Grenade', element: 'void', desc: 'Detonates on impact, suppressing targets and preventing ability use.' },
    { id: 'g_spike',      name: 'Spike Grenade',      element: 'void', desc: 'Attaches to any surface and emits a torrent of damaging Void Light.' },

    // --- Stasis ---
    { id: 'g_glacier',    name: 'Glacier Grenade',    element: 'stasis', desc: 'Erects a wall of Stasis crystals that block movement and shatter for damage.' },
    { id: 'g_coldsnap',   name: 'Coldsnap Grenade',   element: 'stasis', desc: 'Spawns a seeker that freezes its target, then chains to another.' },
    { id: 'g_duskfield',  name: 'Duskfield Grenade',  element: 'stasis', desc: 'Creates a suppressing field that slows and then freezes targets inside.' },

    // --- Strand ---
    { id: 'g_grapple',    name: 'Grapple',            element: 'strand', desc: 'Fires a Strand tether you can swing from. Grapple melee follows a grapple.' },
    { id: 'g_shackle',    name: 'Shackle Grenade',    element: 'strand', desc: 'Splits into seekers that suspend the targets they strike.' },
    { id: 'g_threadling', name: 'Threadling Grenade', element: 'strand', desc: 'Spawns Threadlings that seek out and attack nearby targets.' }
  ];

  /* =====================================================================
     MELEE ABILITIES  (class + element specific)
     ===================================================================== */

  S.melees = [
    // Titan
    { id: 'm_throwing_hammer', name: 'Throwing Hammer', classId: 'titan', element: 'solar', desc: 'Throw a hammer you can pick back up to instantly refresh the melee and cure yourself.' },
    { id: 'm_hammer_strike',   name: 'Hammer Strike',   classId: 'titan', element: 'solar', desc: 'A slam that scorches targets and leaves them weakened to your fire.' },
    { id: 'm_seismic_strike',  name: 'Seismic Strike',  classId: 'titan', element: 'arc',   desc: 'Shoulder-charge forward, blinding nearby targets on impact.' },
    { id: 'm_ballistic_slam',  name: 'Ballistic Slam',  classId: 'titan', element: 'arc',   desc: 'Slam to the ground from the air for area damage that scales with height.' },
    { id: 'm_thunderclap',     name: 'Thunderclap',     classId: 'titan', element: 'arc',   desc: 'Charge a devastating ground-punch. The longer the charge, the bigger the blast.' },
    { id: 'm_shield_bash',     name: 'Shield Bash',     classId: 'titan', element: 'void',  desc: 'Charge forward with your shield, weakening the target on impact.' },
    { id: 'm_shield_throw',    name: 'Shield Throw',    classId: 'titan', element: 'void',  desc: 'Throw a shield that ricochets between targets and returns Void energy.' },
    { id: 'm_shiver_strike',   name: 'Shiver Strike',   classId: 'titan', element: 'stasis', desc: 'Launch forward with a heavy Stasis punch that slows everything it touches.' },
    { id: 'm_frenzied_blade',  name: 'Frenzied Blade',  classId: 'titan', element: 'strand', desc: 'A multi-charge Strand blade dash that severs targets it hits.' },

    // Hunter
    { id: 'm_knife_trick',        name: 'Knife Trick',              classId: 'hunter', element: 'solar', desc: 'Throw a fan of flaming knives that scorch on hit.' },
    { id: 'm_weighted_knife',     name: 'Weighted Throwing Knife',  classId: 'hunter', element: 'solar', desc: 'A heavy knife that bounces off surfaces and refunds itself on a precision kill.' },
    { id: 'm_proximity_knife',    name: 'Proximity Explosive Knife', classId: 'hunter', element: 'solar', desc: 'A knife that detonates when it passes near a target.' },
    { id: 'm_lightweight_knife',  name: 'Lightweight Knife',        classId: 'hunter', element: 'solar', desc: 'A fast, flat-trajectory knife with a shorter cooldown.' },
    { id: 'm_combination_blow',   name: 'Combination Blow',         classId: 'hunter', element: 'arc',   desc: 'A melee kill cures you and stacks damage. The signature Arc Hunter loop.' },
    { id: 'm_disorienting_blow',  name: 'Disorienting Blow',        classId: 'hunter', element: 'arc',   desc: 'Blinds the target and nearby combatants, amplifying you on a hit.' },
    { id: 'm_snare_bomb',         name: 'Snare Bomb',               classId: 'hunter', element: 'void',  desc: 'A smoke bomb that sticks, then weakens and makes targets volatile.' },
    { id: 'm_withering_blade',    name: 'Withering Blade',          classId: 'hunter', element: 'stasis', desc: 'A ricocheting Stasis shuriken that slows and eventually freezes.' },
    { id: 'm_threaded_spike',     name: 'Threaded Spike',           classId: 'hunter', element: 'strand', desc: 'A tracking Strand blade that severs and can be caught to refund the melee.' },

    // Warlock
    { id: 'm_celestial_fire',    name: 'Celestial Fire',    classId: 'warlock', element: 'solar', desc: 'Loose three bursts of Solar flame in an arc ahead of you.' },
    { id: 'm_incinerator_snap', name: 'Incinerator Snap',   classId: 'warlock', element: 'solar', desc: 'Snap your fingers to throw a spray of scorching Solar sparks.' },
    { id: 'm_ball_lightning',   name: 'Ball Lightning',     classId: 'warlock', element: 'arc',   desc: 'Release a rolling ball of Arc energy that discharges downward.' },
    { id: 'm_chain_lightning',  name: 'Chain Lightning',    classId: 'warlock', element: 'arc',   desc: 'A melee strike that arcs lightning to nearby targets.' },
    { id: 'm_pocket_singularity', name: 'Pocket Singularity', classId: 'warlock', element: 'void', desc: 'Launch a Void mass that detonates and makes surrounding targets volatile.' },
    { id: 'm_penumbral_blast',  name: 'Penumbral Blast',    classId: 'warlock', element: 'stasis', desc: 'Fire a Stasis projectile that freezes the target it strikes.' },
    { id: 'm_arcane_needle',    name: 'Arcane Needle',      classId: 'warlock', element: 'strand', desc: 'Three charges of a tracking Strand needle that applies Unravel.' }
  ];

  /* =====================================================================
     CLASS ABILITIES + MOVEMENT
     `elements: '*'` means available on every subclass for that class.
     ===================================================================== */

  S.classAbilities = [
    { id: 'ca_towering_barricade', name: 'Towering Barricade', classId: 'titan', elements: '*', desc: 'A tall wall of Light that blocks damage from both sides.' },
    { id: 'ca_rally_barricade',    name: 'Rally Barricade',    classId: 'titan', elements: '*', desc: 'A short barricade that boosts reload, stability and range while you stand behind it.' },
    { id: 'ca_thruster',           name: 'Thruster',           classId: 'titan', elements: ['arc', 'strand', 'prismatic'], desc: 'A fast lateral dodge on a short cooldown, in place of a barricade.' },

    { id: 'ca_marksmans_dodge', name: "Marksman's Dodge", classId: 'hunter', elements: '*', desc: 'Dodge and instantly reload the equipped weapon.' },
    { id: 'ca_gamblers_dodge',  name: "Gambler's Dodge",  classId: 'hunter', elements: '*', desc: 'Dodge near a target to fully recharge your melee.' },
    { id: 'ca_acrobats_dodge',  name: "Acrobat's Dodge",  classId: 'hunter', elements: ['arc', 'prismatic'], desc: 'Dodge to become Amplified and grant nearby allies a share of it.' },

    { id: 'ca_healing_rift',    name: 'Healing Rift',    classId: 'warlock', elements: '*', desc: 'A pool of Light that continuously heals you and allies standing in it.' },
    { id: 'ca_empowering_rift', name: 'Empowering Rift', classId: 'warlock', elements: '*', desc: 'A pool of Light that increases weapon damage for you and allies inside it.' },
    { id: 'ca_phoenix_dive',    name: 'Phoenix Dive',    classId: 'warlock', elements: ['solar', 'prismatic'], desc: 'Dive to the ground, curing yourself and scorching nearby targets on landing.' }
  ];

  S.movements = [
    { id: 'mv_high_lift',     name: 'High Lift',     classId: 'titan', elements: '*', desc: 'Greater jump height at the cost of speed.' },
    { id: 'mv_strafe_lift',   name: 'Strafe Lift',   classId: 'titan', elements: '*', desc: 'Better directional control while airborne.' },
    { id: 'mv_catapult_lift', name: 'Catapult Lift', classId: 'titan', elements: '*', desc: 'A strong initial burst of momentum.' },

    { id: 'mv_high_jump',   name: 'High Jump',   classId: 'hunter', elements: '*', desc: 'Greater jump height on the second jump.' },
    { id: 'mv_strafe_jump', name: 'Strafe Jump', classId: 'hunter', elements: '*', desc: 'Better directional control while airborne.' },
    { id: 'mv_triple_jump', name: 'Triple Jump', classId: 'hunter', elements: '*', desc: 'A third sustained jump for extra distance.' },

    { id: 'mv_burst_glide',    name: 'Burst Glide',    classId: 'warlock', elements: '*', desc: 'A strong initial burst of speed.' },
    { id: 'mv_strafe_glide',   name: 'Strafe Glide',   classId: 'warlock', elements: '*', desc: 'Better directional control while gliding.' },
    { id: 'mv_balanced_glide', name: 'Balanced Glide', classId: 'warlock', elements: '*', desc: 'Moderate speed and moderate control.' },
    { id: 'mv_blink',          name: 'Blink',          classId: 'warlock', elements: ['void', 'prismatic'], desc: 'Teleport a short distance instead of gliding.' }
  ];

  /* =====================================================================
     SUPERS
     ===================================================================== */

  S.supers = [
    // Titan
    { id: 'su_hammer_of_sol',   name: 'Hammer of Sol',   classId: 'titan', element: 'solar',  kind: 'roaming', desc: 'Summon a flaming hammer and hurl it at enemies.' },
    { id: 'su_burning_maul',    name: 'Burning Maul',    classId: 'titan', element: 'solar',  kind: 'roaming', desc: 'Summon a flaming maul with a heavy slam and a spinning cyclone attack.' },
    { id: 'su_fists_of_havoc',  name: 'Fists of Havoc',  classId: 'titan', element: 'arc',    kind: 'roaming', desc: 'Charge with Arc Light and slam the ground with devastating force.' },
    { id: 'su_thundercrash',    name: 'Thundercrash',    classId: 'titan', element: 'arc',    kind: 'oneoff',  desc: 'Launch yourself into the air and crash down as a living missile.' },
    { id: 'su_sentinel_shield', name: 'Sentinel Shield', classId: 'titan', element: 'void',   kind: 'roaming', desc: 'Summon a Void shield to bash and throw, and guard allies behind it.' },
    { id: 'su_ward_of_dawn',    name: 'Ward of Dawn',    classId: 'titan', element: 'void',   kind: 'oneoff',  desc: 'Erect an indestructible dome that shelters and empowers your fireteam.' },
    { id: 'su_twilight_arsenal', name: 'Twilight Arsenal', classId: 'titan', element: 'void', kind: 'oneoff',  desc: 'Throw three Void axes that weaken and create Void breaches, then pick them back up.' },
    { id: 'su_glacial_quake',   name: 'Glacial Quake',   classId: 'titan', element: 'stasis', kind: 'roaming', desc: 'Summon a Stasis gauntlet, freezing targets and raising crystals with every slam.' },
    { id: 'su_bladefury',       name: 'Bladefury',       classId: 'titan', element: 'strand', kind: 'roaming', desc: 'Summon Strand blades. Heavy attack suspends everything it hits.' },

    // Hunter
    { id: 'su_gg_marksman',    name: 'Golden Gun - Marksman',    classId: 'hunter', element: 'solar',  kind: 'oneoff',  desc: 'Three precise, high-damage Solar shots with a longer duration.' },
    { id: 'su_gg_deadshot',    name: 'Golden Gun - Deadshot',    classId: 'hunter', element: 'solar',  kind: 'roaming', desc: 'Six Solar shots with target acquisition; kills extend the Super.' },
    { id: 'su_blade_barrage',  name: 'Blade Barrage',            classId: 'hunter', element: 'solar',  kind: 'oneoff',  desc: 'Vault into the air and unleash a volley of explosive Solar knives.' },
    { id: 'su_arc_staff',      name: 'Arc Staff',                classId: 'hunter', element: 'arc',    kind: 'roaming', desc: 'A staff of pure Arc energy for fast, agile melee combat.' },
    { id: 'su_gathering_storm', name: 'Gathering Storm',         classId: 'hunter', element: 'arc',    kind: 'oneoff',  desc: 'Hurl your staff to anchor a lightning storm in place.' },
    { id: 'su_storms_edge',    name: "Storm's Edge",             classId: 'hunter', element: 'arc',    kind: 'oneoff',  desc: 'Teleport and unleash a whirlwind of Arc blades. Up to three activations.' },
    { id: 'su_ss_deadfall',    name: 'Shadowshot - Deadfall',    classId: 'hunter', element: 'void',   kind: 'oneoff',  desc: 'A Void anchor with a wide tether radius that suppresses and weakens.' },
    { id: 'su_ss_moebius',     name: 'Shadowshot - Moebius Quiver', classId: 'hunter', element: 'void', kind: 'oneoff', desc: 'Fire volleys of tethering shots that weaken targets for heavy damage.' },
    { id: 'su_spectral_blades', name: 'Spectral Blades',         classId: 'hunter', element: 'void',   kind: 'roaming', desc: 'Stalk your prey invisibly with twin Void blades.' },
    { id: 'su_silence_squall', name: 'Silence and Squall',       classId: 'hunter', element: 'stasis', kind: 'oneoff',  desc: 'Twin Stasis blades: one freezes, the other summons a roaming blizzard.' },
    { id: 'su_silkstrike',     name: 'Silkstrike',               classId: 'hunter', element: 'strand', kind: 'roaming', desc: 'A Strand rope dart you can swing, whip and slam with.' },

    // Warlock
    { id: 'su_daybreak',        name: 'Daybreak',              classId: 'warlock', element: 'solar',  kind: 'roaming', desc: 'Forge Solar Light into blades and hurl them from the air.' },
    { id: 'su_well_of_radiance', name: 'Well of Radiance',     classId: 'warlock', element: 'solar',  kind: 'oneoff',  desc: 'Plunge your sword to create a well that heals and empowers your fireteam.' },
    { id: 'su_song_of_flame',   name: 'Song of Flame',         classId: 'warlock', element: 'solar',  kind: 'roaming', desc: 'A Solar transformation that empowers your abilities and your allies.' },
    { id: 'su_stormtrance',     name: 'Stormtrance',           classId: 'warlock', element: 'arc',    kind: 'roaming', desc: 'Channel lightning from your hands and blink between targets.' },
    { id: 'su_chaos_reach',     name: 'Chaos Reach',           classId: 'warlock', element: 'arc',    kind: 'oneoff',  desc: 'A sustained beam of concentrated Arc energy you can cancel early to save Super.' },
    { id: 'su_nova_cataclysm',  name: 'Nova Bomb - Cataclysm', classId: 'warlock', element: 'void',   kind: 'oneoff',  desc: 'A slow-moving Void bomb that splits into seekers.' },
    { id: 'su_nova_vortex',     name: 'Nova Bomb - Vortex',    classId: 'warlock', element: 'void',   kind: 'oneoff',  desc: 'A Void bomb that leaves a lingering singularity where it lands.' },
    { id: 'su_nova_warp',       name: 'Nova Warp',             classId: 'warlock', element: 'void',   kind: 'roaming', desc: 'Teleport through the Void and detonate in a devastating blast.' },
    { id: 'su_winters_wrath',   name: "Winter's Wrath",        classId: 'warlock', element: 'stasis', kind: 'roaming', desc: 'A Stasis staff that freezes targets and shatters them at will.' },
    { id: 'su_needlestorm',     name: 'Needlestorm',           classId: 'warlock', element: 'strand', kind: 'oneoff',  desc: 'Loose a volley of Strand needles that weave into Threadlings on impact.' }
  ];

  /* =====================================================================
     ASPECTS
     `slots` = fragment slots this Aspect contributes. Editable in-app.
     ===================================================================== */

  S.aspects = [
    // --- Titan Solar (Sunbreaker) ---
    { id: 'as_roaring_flames', name: 'Roaring Flames', classId: 'titan', element: 'solar', slots: 2, desc: 'Solar ability final blows stack increasing Solar ability damage.' },
    { id: 'as_sol_invictus',   name: 'Sol Invictus',   classId: 'titan', element: 'solar', slots: 2, desc: 'Solar ability kills and Hammer of Sol impacts create Sunspots that cure and scorch.' },
    { id: 'as_consecration',   name: 'Consecration',   classId: 'titan', element: 'solar', slots: 1, desc: 'Slide then melee to launch a wave of Solar energy; a second melee slams down in a fiery eruption.' },

    // --- Titan Arc (Striker) ---
    { id: 'as_knockout',       name: 'Knockout',       classId: 'titan', element: 'arc', slots: 2, desc: 'Breaking a shield or critically wounding a target grants melee damage, range and health on kill.' },
    { id: 'as_touch_of_thunder', name: 'Touch of Thunder', classId: 'titan', element: 'arc', slots: 2, desc: 'Arc grenades gain enhanced functionality: bigger storms, extra pulses, chained bolts.' },
    { id: 'as_juggernaut',     name: 'Juggernaut',     classId: 'titan', element: 'arc', slots: 1, desc: 'While sprinting with full class ability energy, gain a frontal Arc shield.' },

    // --- Titan Void (Sentinel) ---
    { id: 'as_controlled_demolition', name: 'Controlled Demolition', classId: 'titan', element: 'void', slots: 2, desc: 'Void ability hits make targets volatile; volatile detonations heal you.' },
    { id: 'as_bastion',            name: 'Bastion',            classId: 'titan', element: 'void', slots: 2, desc: 'Barricade grants an overshield to you and allies who pass through it.' },
    { id: 'as_offensive_bulwark',  name: 'Offensive Bulwark',  classId: 'titan', element: 'void', slots: 1, desc: 'While overshielded, grenade energy regenerates faster and melee range and damage increase.' },
    { id: 'as_unbreakable',        name: 'Unbreakable',        classId: 'titan', element: 'void', slots: 1, desc: 'Hold your barricade input to raise a Void shield that absorbs damage and releases it as a blast.' },

    // --- Titan Stasis (Behemoth) ---
    { id: 'as_tectonic_harvest', name: 'Tectonic Harvest', classId: 'titan', element: 'stasis', slots: 2, desc: 'Shattering a Stasis crystal creates a Stasis shard that grants melee energy.' },
    { id: 'as_howl_of_the_storm', name: 'Howl of the Storm', classId: 'titan', element: 'stasis', slots: 1, desc: 'Slide then melee to send out a wall of Stasis crystals.' },
    { id: 'as_cryoclasm',       name: 'Cryoclasm',        classId: 'titan', element: 'stasis', slots: 2, desc: 'Longer, faster slides that shatter Stasis crystals and frozen targets.' },
    { id: 'as_diamond_lance',   name: 'Diamond Lance',    classId: 'titan', element: 'stasis', slots: 2, desc: 'Stasis final blows create a Diamond Lance you can throw to freeze on impact.' },

    // --- Titan Strand (Berserker) ---
    { id: 'as_into_the_fray',   name: 'Into the Fray',    classId: 'titan', element: 'strand', slots: 2, desc: 'Destroying a Tangle grants Woven Mail to you and nearby allies.' },
    { id: 'as_drengrs_lash',    name: "Drengr's Lash",    classId: 'titan', element: 'strand', slots: 2, desc: 'Your barricade sends a wave of Strand forward that suspends targets.' },
    { id: 'as_flechette_storm', name: 'Flechette Storm',  classId: 'titan', element: 'strand', slots: 1, desc: 'Slide then melee to launch upward in a flurry of Strand needles.' },
    { id: 'as_banner_of_war',   name: 'Banner of War',    classId: 'titan', element: 'strand', slots: 1, desc: 'Melee and Strand kills build a banner that heals and empowers your fireteam.' },

    // --- Titan Prismatic ---
    { id: 'as_p_knockout',      name: 'Knockout',         classId: 'titan', element: 'prismatic', slots: 2, desc: 'Breaking a shield or critically wounding grants melee damage and health on kill.' },
    { id: 'as_p_consecration',  name: 'Consecration',     classId: 'titan', element: 'prismatic', slots: 1, desc: 'Slide melee sends a Solar wave; a second melee slams down in an eruption.' },
    { id: 'as_p_drengrs_lash',  name: "Drengr's Lash",    classId: 'titan', element: 'prismatic', slots: 2, desc: 'Your barricade sends a suspending wave of Strand forward.' },
    { id: 'as_p_unbreakable',   name: 'Unbreakable',      classId: 'titan', element: 'prismatic', slots: 1, desc: 'Hold barricade to raise a Void shield that stores damage and releases it.' },
    { id: 'as_p_diamond_lance', name: 'Diamond Lance',    classId: 'titan', element: 'prismatic', slots: 2, desc: 'Stasis final blows create a throwable Diamond Lance.' },
    { id: 'as_p_into_the_fray', name: 'Into the Fray',    classId: 'titan', element: 'prismatic', slots: 2, desc: 'Destroying a Tangle grants Woven Mail to you and nearby allies.' },

    // --- Hunter Solar (Gunslinger) ---
    { id: 'as_knock_em_down',    name: "Knock 'Em Down",  classId: 'hunter', element: 'solar', slots: 2, desc: 'Your Super deals more damage while Radiant; throwing knives are stronger.' },
    { id: 'as_on_your_mark',     name: 'On Your Mark',     classId: 'hunter', element: 'solar', slots: 2, desc: 'Precision final blows grant stacking weapon handling and reload speed.' },
    { id: 'as_gunpowder_gamble', name: 'Gunpowder Gamble', classId: 'hunter', element: 'solar', slots: 1, desc: 'Solar kills build a charge you can throw as a powerful explosive.' },

    // --- Hunter Arc (Arcstrider) ---
    { id: 'as_flow_state',    name: 'Flow State',    classId: 'hunter', element: 'arc', slots: 2, desc: 'Defeating a jolted target makes you Amplified, with faster dodge and reload.' },
    { id: 'as_lethal_current', name: 'Lethal Current', classId: 'hunter', element: 'arc', slots: 2, desc: 'After dodging, your melee jolts and chains lightning to nearby targets.' },
    { id: 'as_tempest_strike', name: 'Tempest Strike', classId: 'hunter', element: 'arc', slots: 1, desc: 'Slide then melee to sweep a wave of Arc energy along the ground.' },
    { id: 'as_ascension',     name: 'Ascension',     classId: 'hunter', element: 'arc', slots: 2, desc: 'Airborne dodge spins you upward, jolting nearby targets and amplifying allies.' },

    // --- Hunter Void (Nightstalker) ---
    { id: 'as_vanishing_step',   name: 'Vanishing Step',   classId: 'hunter', element: 'void', slots: 2, desc: 'Dodging makes you invisible.' },
    { id: 'as_stylish_executioner', name: 'Stylish Executioner', classId: 'hunter', element: 'void', slots: 2, desc: 'Defeating a weakened, suppressed or volatile target grants invisibility and Truesight.' },
    { id: 'as_trappers_ambush',  name: "Trapper's Ambush",  classId: 'hunter', element: 'void', slots: 1, desc: 'Quickfall dive that makes nearby allies invisible and weakens enemies.' },
    { id: 'as_on_the_prowl',     name: 'On the Prowl',      classId: 'hunter', element: 'void', slots: 2, desc: 'Finishers mark a nearby target; defeating the mark grants invisibility and ability energy.' },

    // --- Hunter Stasis (Revenant) ---
    { id: 'as_grim_harvest',   name: 'Grim Harvest',   classId: 'hunter', element: 'stasis', slots: 2, desc: 'Defeating slowed or frozen targets creates Stasis shards that grant melee energy.' },
    { id: 'as_touch_of_winter', name: 'Touch of Winter', classId: 'hunter', element: 'stasis', slots: 1, desc: 'Your Stasis grenades gain enhanced properties and larger effects.' },
    { id: 'as_winters_shroud', name: "Winter's Shroud", classId: 'hunter', element: 'stasis', slots: 2, desc: 'Dodging slows nearby targets.' },
    { id: 'as_shatterdive',    name: 'Shatterdive',     classId: 'hunter', element: 'stasis', slots: 1, desc: 'Dive to the ground, shattering nearby frozen targets and crystals.' },

    // --- Hunter Strand (Threadrunner) ---
    { id: 'as_widows_silk',    name: "Widow's Silk",    classId: 'hunter', element: 'strand', slots: 2, desc: 'Grapple gains an additional charge and creates a persistent Grapple Tangle.' },
    { id: 'as_ensnaring_slam', name: 'Ensnaring Slam',  classId: 'hunter', element: 'strand', slots: 2, desc: 'Air-dodge into a slam that suspends nearby targets.' },
    { id: 'as_threaded_specter', name: 'Threaded Specter', classId: 'hunter', element: 'strand', slots: 1, desc: 'Dodging leaves a Strand decoy that detonates into Threadlings.' },
    { id: 'as_whirling_maelstrom', name: 'Whirling Maelstrom', classId: 'hunter', element: 'strand', slots: 2, desc: 'Destroying a Tangle creates a churning vortex that severs and spawns Threadlings.' },

    // --- Hunter Prismatic ---
    { id: 'as_p_ascension',       name: 'Ascension',           classId: 'hunter', element: 'prismatic', slots: 2, desc: 'Airborne dodge spins you upward, jolting targets and amplifying allies.' },
    { id: 'as_p_gunpowder',       name: 'Gunpowder Gamble',    classId: 'hunter', element: 'prismatic', slots: 1, desc: 'Kills build a charge you can throw as a powerful Solar explosive.' },
    { id: 'as_p_stylish',         name: 'Stylish Executioner', classId: 'hunter', element: 'prismatic', slots: 2, desc: 'Defeating a weakened, suppressed or volatile target grants invisibility.' },
    { id: 'as_p_winters_shroud',  name: "Winter's Shroud",     classId: 'hunter', element: 'prismatic', slots: 2, desc: 'Dodging slows nearby targets.' },
    { id: 'as_p_threaded_specter', name: 'Threaded Specter',   classId: 'hunter', element: 'prismatic', slots: 1, desc: 'Dodging leaves a Strand decoy that detonates into Threadlings.' },
    { id: 'as_p_on_your_mark',    name: 'On Your Mark',        classId: 'hunter', element: 'prismatic', slots: 2, desc: 'Precision final blows grant stacking handling and reload speed.' },

    // --- Warlock Solar (Dawnblade) ---
    { id: 'as_heat_rises',    name: 'Heat Rises',    classId: 'warlock', element: 'solar', slots: 2, desc: 'Consume your grenade to gain sustained flight and airborne effectiveness.' },
    { id: 'as_icarus_dash',   name: 'Icarus Dash',   classId: 'warlock', element: 'solar', slots: 1, desc: 'Dodge in mid-air. Two charges while Amplified or Radiant.' },
    { id: 'as_touch_of_flame', name: 'Touch of Flame', classId: 'warlock', element: 'solar', slots: 2, desc: 'Healing, Firebolt, Fusion and Solar grenades gain enhanced functionality.' },
    { id: 'as_hellion',       name: 'Hellion',       classId: 'warlock', element: 'solar', slots: 2, desc: 'Summon a Solar turret that bombards nearby targets.' },

    // --- Warlock Arc (Stormcaller) ---
    { id: 'as_arc_soul',          name: 'Arc Soul',          classId: 'warlock', element: 'arc', slots: 2, desc: 'Your rift grants you and allies an autonomous Arc Soul turret.' },
    { id: 'as_electrostatic_mind', name: 'Electrostatic Mind', classId: 'warlock', element: 'arc', slots: 2, desc: 'Defeating jolted or blinded targets creates an Ionic Trace.' },
    { id: 'as_lightning_surge',   name: 'Lightning Surge',   classId: 'warlock', element: 'arc', slots: 1, desc: 'Slide then melee to blink forward and discharge a lightning blast.' },

    // --- Warlock Void (Voidwalker) ---
    { id: 'as_chaos_accelerant',  name: 'Chaos Accelerant',  classId: 'warlock', element: 'void', slots: 2, desc: 'Hold the grenade input to overcharge it for greater size, duration and damage.' },
    { id: 'as_feed_the_void',     name: 'Feed the Void',     classId: 'warlock', element: 'void', slots: 2, desc: 'Void ability final blows grant Devour.' },
    { id: 'as_child_of_old_gods', name: 'Child of the Old Gods', classId: 'warlock', element: 'void', slots: 2, desc: 'Your rift spawns a Void soul that weakens targets and returns ability energy.' },

    // --- Warlock Stasis (Shadebinder) ---
    { id: 'as_iceflare_bolts', name: 'Iceflare Bolts', classId: 'warlock', element: 'stasis', slots: 2, desc: 'Shattering a frozen target spawns seekers that freeze other nearby targets.' },
    { id: 'as_frostpulse',     name: 'Frostpulse',     classId: 'warlock', element: 'stasis', slots: 2, desc: 'Casting a rift emits a shockwave that freezes nearby targets.' },
    { id: 'as_glacial_harvest', name: 'Glacial Harvest', classId: 'warlock', element: 'stasis', slots: 1, desc: 'Freezing a target creates Stasis shards around it.' },
    { id: 'as_bleak_watcher',  name: 'Bleak Watcher',  classId: 'warlock', element: 'stasis', slots: 2, desc: 'Convert your grenade into a Stasis turret that slows and freezes.' },

    // --- Warlock Strand (Broodweaver) ---
    { id: 'as_mindspun_invocation', name: 'Mindspun Invocation', classId: 'warlock', element: 'strand', slots: 2, desc: 'Your Strand grenades and melee gain enhanced functionality.' },
    { id: 'as_weavers_call',   name: "Weaver's Call",   classId: 'warlock', element: 'strand', slots: 2, desc: 'Casting a rift weaves three Threadlings that seek nearby targets.' },
    { id: 'as_the_wanderer',   name: 'The Wanderer',    classId: 'warlock', element: 'strand', slots: 1, desc: 'Tangles you throw suspend targets; Threadling kills create Tangles.' },
    { id: 'as_weavewalk',      name: 'Weavewalk',       classId: 'warlock', element: 'strand', slots: 2, desc: 'Consume a Threadling charge to enter the Weave, gaining heavy damage resistance.' },

    // --- Warlock Prismatic ---
    { id: 'as_p_hellion',        name: 'Hellion',        classId: 'warlock', element: 'prismatic', slots: 2, desc: 'Summon a Solar turret that bombards nearby targets.' },
    { id: 'as_p_bleak_watcher',  name: 'Bleak Watcher',  classId: 'warlock', element: 'prismatic', slots: 2, desc: 'Convert your grenade into a Stasis turret.' },
    { id: 'as_p_weavers_call',   name: "Weaver's Call",  classId: 'warlock', element: 'prismatic', slots: 2, desc: 'Casting a rift weaves three Threadlings.' },
    { id: 'as_p_lightning_surge', name: 'Lightning Surge', classId: 'warlock', element: 'prismatic', slots: 1, desc: 'Slide melee blinks you forward into a lightning blast.' },
    { id: 'as_p_feed_the_void',  name: 'Feed the Void',  classId: 'warlock', element: 'prismatic', slots: 2, desc: 'Void ability final blows grant Devour.' }
  ];

  /* =====================================================================
     FRAGMENTS
     `stats` holds stat modifiers. Left empty by default: the Armor 3.0
     remapping is patch-sensitive, so the app lets you set them per fragment
     (persisted), and manifest sync fills them from the game's own data.
     ===================================================================== */

  function frag(id, name, element, desc) {
    return { id: id, name: name, element: element, desc: desc, stats: {} };
  }

  S.fragments = [
    // --- Solar: Ember of ... ---
    frag('fr_ashes',       'Ember of Ashes',       'solar', 'Apply more scorch stacks to targets.'),
    frag('fr_beams',       'Ember of Beams',       'solar', 'Solar Super projectiles have stronger target acquisition.'),
    frag('fr_benevolence', 'Ember of Benevolence', 'solar', 'Healing or empowering an ally greatly increases ability regeneration.'),
    frag('fr_blistering',  'Ember of Blistering',  'solar', 'Defeating targets with Solar ignitions grants grenade energy.'),
    frag('fr_char',        'Ember of Char',        'solar', 'Solar ignitions spread scorch to nearby targets.'),
    frag('fr_combustion',  'Ember of Combustion',  'solar', 'Final blows with your Solar Super cause ignitions.'),
    frag('fr_empyrean',    'Ember of Empyrean',    'solar', 'Solar final blows extend the duration of Restoration and Radiant.'),
    frag('fr_eruption',    'Ember of Eruption',    'solar', 'Ignitions you cause have a larger area of effect.'),
    frag('fr_mercy',       'Ember of Mercy',       'solar', 'Reviving an ally grants Restoration to you and nearby allies.'),
    frag('fr_resolve',     'Ember of Resolve',     'solar', 'Solar grenade final blows cure you.'),
    frag('fr_searing',     'Ember of Searing',     'solar', 'Defeating a scorched target creates a Firesprite.'),
    frag('fr_singeing',    'Ember of Singeing',    'solar', 'Solar ability final blows increase class ability regeneration.'),
    frag('fr_solace',      'Ember of Solace',      'solar', 'Radiant and Restoration effects last longer.'),
    frag('fr_tempering',   'Ember of Tempering',   'solar', 'Solar weapon final blows grant stacking weapon damage and scorch on your kills.'),
    frag('fr_torches',     'Ember of Torches',     'solar', 'Powered melee attacks against combatants make you Radiant.'),
    frag('fr_wonder',      'Ember of Wonder',      'solar', 'Rapidly defeating scorched targets creates an Orb of Power.'),

    // --- Arc: Spark of ... ---
    frag('fr_amplitude',  'Spark of Amplitude',  'arc', 'Rapidly defeating targets while Amplified creates an Ionic Trace.'),
    frag('fr_beacons',    'Spark of Beacons',    'arc', 'Arc Super final blows create a blinding explosion.'),
    frag('fr_brilliance', 'Spark of Brilliance', 'arc', 'Defeating a target with an Arc grenade blinds nearby combatants.'),
    frag('fr_discharge',  'Spark of Discharge',  'arc', 'Arc weapon final blows have a chance to create an Ionic Trace.'),
    frag('fr_feedback',   'Spark of Feedback',   'arc', 'Taking melee damage briefly increases your outgoing melee damage.'),
    frag('fr_focus',      'Spark of Focus',      'arc', 'Sprinting for a short time boosts class ability regeneration.'),
    frag('fr_frequency',  'Spark of Frequency',  'arc', 'Melee damage greatly increases reload speed for a short duration.'),
    frag('fr_haste',      'Spark of Haste',      'arc', 'Greatly increased mobility, resilience and recovery while sliding.'),
    frag('fr_instinct',   'Spark of Instinct',   'arc', 'Taking heavy damage emits a burst of damaging Arc energy.'),
    frag('fr_ions',       'Spark of Ions',       'arc', 'Defeating a jolted target creates an Ionic Trace.'),
    frag('fr_magnitude',  'Spark of Magnitude',  'arc', 'Lingering Arc grenades last longer.'),
    frag('fr_momentum',   'Spark of Momentum',   'arc', 'Sliding over ammo reloads your weapon and grants a small overshield.'),
    frag('fr_recharge',   'Spark of Recharge',   'arc', 'At low health, melee and grenade energy regenerate faster.'),
    frag('fr_resistance', 'Spark of Resistance', 'arc', 'Gain damage resistance while surrounded by combatants.'),
    frag('fr_shock',      'Spark of Shock',      'arc', 'Arc grenades jolt targets.'),
    frag('fr_volts',      'Spark of Volts',      'arc', 'Finishers make you Amplified.'),

    // --- Void: Echo of ... ---
    frag('fr_undermining', 'Echo of Undermining', 'void', 'Void grenades weaken targets.'),
    frag('fr_instability', 'Echo of Instability', 'void', 'Defeating targets with grenades grants Volatile Rounds to your Void weapons.'),
    frag('fr_remnants',    'Echo of Remnants',    'void', 'Your lingering Void grenades last longer.'),
    frag('fr_provision',   'Echo of Provision',   'void', 'Damaging targets with grenades grants melee energy.'),
    frag('fr_persistence', 'Echo of Persistence', 'void', 'Void buffs applied to you have increased duration.'),
    frag('fr_leeching',    'Echo of Leeching',    'void', 'Melee final blows start health regeneration for you and nearby allies.'),
    frag('fr_domineering', 'Echo of Domineering',  'void', 'Suppressing a target grants greatly increased mobility and reloads your stowed weapons.'),
    frag('fr_dilation',    'Echo of Dilation',    'void', 'While crouched, you sneak faster and your radar detail increases.'),
    frag('fr_expulsion',   'Echo of Expulsion',   'void', 'Void ability final blows cause targets to explode.'),
    frag('fr_exchange',    'Echo of Exchange',    'void', 'Melee final blows grant grenade energy.'),
    frag('fr_vigilance',   'Echo of Vigilance',   'void', 'Defeating a target while your allies are dead grants an overshield.'),
    frag('fr_harvest',     'Echo of Harvest',     'void', 'Defeating weakened targets with precision damage creates an Orb of Power and a Void Breach.'),
    frag('fr_obscurity',   'Echo of Obscurity',   'void', 'Finisher final blows grant invisibility.'),
    frag('fr_reprisal',    'Echo of Reprisal',    'void', 'Defeating a target while surrounded grants Super energy.'),
    frag('fr_starvation',  'Echo of Starvation',  'void', 'Picking up an Orb of Power grants Devour.'),
    frag('fr_cessation',   'Echo of Cessation',   'void', 'Finisher final blows create a Void detonation that makes targets volatile.'),

    // --- Stasis: Whisper of ... ---
    frag('fr_bonds',      'Whisper of Bonds',      'stasis', 'Defeating frozen targets with weapons grants Super energy.'),
    frag('fr_chains',     'Whisper of Chains',     'stasis', 'Near frozen targets or a Stasis crystal, you take reduced damage.'),
    frag('fr_conduction',  'Whisper of Conduction', 'stasis', 'Nearby Stasis shards track to you from farther away.'),
    frag('fr_durance',    'Whisper of Durance',    'stasis', 'Slow effects and lingering Stasis abilities last longer.'),
    frag('fr_fissures',   'Whisper of Fissures',   'stasis', 'Shattering a Stasis crystal or frozen target deals more damage in a larger radius.'),
    frag('fr_fractures',  'Whisper of Fractures',  'stasis', 'Melee energy regenerates faster when near two or more targets.'),
    frag('fr_hedrons',    'Whisper of Hedrons',    'stasis', 'Freezing a target grants a bonus to weapon stability, aim assist and airborne effectiveness.'),
    frag('fr_hunger',     'Whisper of Hunger',     'stasis', 'Increases melee energy gained from picking up Stasis shards.'),
    frag('fr_impetus',    'Whisper of Impetus',    'stasis', 'Damaging a target with a Stasis ability reloads your equipped weapon from reserves.'),
    frag('fr_refraction', 'Whisper of Refraction', 'stasis', 'Defeating slowed or frozen targets grants class ability energy.'),
    frag('fr_rending',    'Whisper of Rending',    'stasis', 'Kinetic weapons do increased damage to Stasis crystals and frozen targets.'),
    frag('fr_rime',       'Whisper of Rime',       'stasis', 'Collecting a Stasis shard grants a small overshield.'),
    frag('fr_shards',     'Whisper of Shards',     'stasis', 'Shattering a Stasis crystal temporarily boosts grenade recharge rate.'),
    frag('fr_torment',    'Whisper of Torment',    'stasis', 'Taking damage from a combatant grants grenade energy.'),

    // --- Strand: Thread of ... ---
    frag('fr_ascent',        'Thread of Ascent',        'strand', 'Activating your grenade reloads your weapon and boosts handling and airborne effectiveness.'),
    frag('fr_binding',       'Thread of Binding',       'strand', 'Your Super damage suspends targets.'),
    frag('fr_continuity',    'Thread of Continuity',    'strand', 'Suspend, Unravel and Sever effects have increased duration.'),
    frag('fr_evolution',     'Thread of Evolution',     'strand', 'Threadlings travel farther and deal more damage.'),
    frag('fr_fury',          'Thread of Fury',          'strand', 'Damaging targets with a Tangle grants melee energy.'),
    frag('fr_generation',    'Thread of Generation',    'strand', 'Dealing damage generates grenade energy.'),
    frag('fr_isolation',     'Thread of Isolation',     'strand', 'Precision hits on a target sever it.'),
    frag('fr_mind',          'Thread of Mind',          'strand', 'Defeating severed targets grants class ability energy.'),
    frag('fr_propagation',   'Thread of Propagation',   'strand', 'Powered melee final blows grant Unraveling Rounds to your Strand weapons.'),
    frag('fr_rebirth',       'Thread of Rebirth',       'strand', 'Defeating targets with your Super spawns Threadlings.'),
    frag('fr_transmutation',  'Thread of Transmutation', 'strand', 'Damaging targets while you have Woven Mail creates a Tangle.'),
    frag('fr_warding',       'Thread of Warding',       'strand', 'Picking up an Orb of Power grants Woven Mail.'),
    frag('fr_wisdom',        'Thread of Wisdom',        'strand', 'Defeating a suspended target creates an Orb of Power.'),

    // --- Prismatic: Facet of ... ---
    frag('fr_awakening',  'Facet of Awakening',  'prismatic', 'Damaging targets with Darkness abilities grants bonus Light ability energy, and vice versa.'),
    frag('fr_balance',    'Facet of Balance',    'prismatic', 'Rapidly switching between Light and Darkness weapon damage grants faster reload and handling.'),
    frag('fr_bravery',    'Facet of Bravery',    'prismatic', 'Defeating targets with grenades grants Volatile Rounds; with melee, Unraveling Rounds.'),
    frag('fr_command',    'Facet of Command',    'prismatic', 'Damaging a target with an ability marks it; defeating a marked target grants Transcendence energy.'),
    frag('fr_courage',    'Facet of Courage',    'prismatic', 'Light abilities deal more damage to targets affected by Darkness debuffs, and vice versa.'),
    frag('fr_dawn',       'Facet of Dawn',       'prismatic', 'Powered melee hits make you Radiant; precision melee kills also grant Restoration.'),
    frag('fr_defiance',   'Facet of Defiance',   'prismatic', 'Finisher final blows create a burst of Darkness that severs, slows and makes targets volatile.'),
    frag('fr_devotion',   'Facet of Devotion',   'prismatic', 'Defeating targets with Light abilities grants nearby allies Devotion.'),
    frag('fr_dominance',  'Facet of Dominance',  'prismatic', 'Void grenades weaken; Arc and Strand grenades jolt or sever.'),
    frag('fr_generosity',  'Facet of Generosity',  'prismatic', 'Defeating targets with grenades grants Transcendence energy to nearby allies.'),
    frag('fr_grace',      'Facet of Grace',      'prismatic', 'While Transcendent, defeating targets with Light damage grants a stacking damage bonus.'),
    frag('fr_heroism',    'Facet of Heroism',    'prismatic', 'Defeating a target with your Super grants Transcendence energy.'),
    frag('fr_honor',      'Facet of Honor',      'prismatic', 'Collecting an Orb of Power while Transcendent grants healing.'),
    frag('fr_hope',       'Facet of Hope',       'prismatic', 'While you have an elemental buff, your class ability regenerates faster.'),
    frag('fr_p_instinct', 'Facet of Instinct',   'prismatic', 'At low health, gain a burst of healing and increased damage resistance.'),
    frag('fr_justice',    'Facet of Justice',    'prismatic', 'While Transcendent, ability final blows cause a detonation matching that ability.'),
    frag('fr_mending',    'Facet of Mending',    'prismatic', 'Using your class ability grants Cure.'),
    frag('fr_protection',  'Facet of Protection',  'prismatic', 'While surrounded by combatants, gain damage resistance.'),
    frag('fr_purpose',    'Facet of Purpose',    'prismatic', 'Picking up an Orb of Power grants an elemental buff matching your Super.'),
    frag('fr_ruin',       'Facet of Ruin',       'prismatic', 'Increases the size and damage of your Light and Darkness ability detonations.'),
    frag('fr_sacrifice',  'Facet of Sacrifice',  'prismatic', 'Light and Darkness final blows grant Transcendence energy.'),
    frag('fr_solitude',   'Facet of Solitude',   'prismatic', 'While no allies are near, gain damage resistance and faster health regeneration.')
  ];

  /* =====================================================================
     PATHS -- one per class x element. Prismatic paths name their own pools
     because Bungie curates a subset rather than exposing every ability.
     ===================================================================== */

  S.paths = [
    { classId: 'titan', element: 'solar',  name: 'Sunbreaker' },
    { classId: 'titan', element: 'arc',    name: 'Striker' },
    { classId: 'titan', element: 'void',   name: 'Sentinel' },
    { classId: 'titan', element: 'stasis', name: 'Behemoth' },
    { classId: 'titan', element: 'strand', name: 'Berserker' },
    {
      classId: 'titan', element: 'prismatic', name: 'Prismatic',
      supers:   ['su_twilight_arsenal', 'su_thundercrash', 'su_hammer_of_sol', 'su_glacial_quake', 'su_bladefury'],
      melees:   ['m_frenzied_blade', 'm_shield_throw', 'm_thunderclap', 'm_hammer_strike', 'm_shiver_strike'],
      grenades: ['g_glacier', 'g_duskfield', 'g_coldsnap', 'g_grapple', 'g_shackle', 'g_threadling',
                 'g_vortex', 'g_magnetic', 'g_suppressor', 'g_pulse', 'g_storm', 'g_arcbolt',
                 'g_healing', 'g_solar', 'g_thermite']
    },

    { classId: 'hunter', element: 'solar',  name: 'Gunslinger' },
    { classId: 'hunter', element: 'arc',    name: 'Arcstrider' },
    { classId: 'hunter', element: 'void',   name: 'Nightstalker' },
    { classId: 'hunter', element: 'stasis', name: 'Revenant' },
    { classId: 'hunter', element: 'strand', name: 'Threadrunner' },
    {
      classId: 'hunter', element: 'prismatic', name: 'Prismatic',
      supers:   ['su_storms_edge', 'su_gg_marksman', 'su_ss_deadfall', 'su_silence_squall', 'su_silkstrike'],
      melees:   ['m_threaded_spike', 'm_combination_blow', 'm_withering_blade', 'm_knife_trick', 'm_snare_bomb'],
      grenades: ['g_glacier', 'g_duskfield', 'g_coldsnap', 'g_grapple', 'g_shackle', 'g_threadling',
                 'g_vortex', 'g_magnetic', 'g_suppressor', 'g_pulse', 'g_storm', 'g_arcbolt',
                 'g_healing', 'g_solar', 'g_tripmine']
    },

    { classId: 'warlock', element: 'solar',  name: 'Dawnblade' },
    { classId: 'warlock', element: 'arc',    name: 'Stormcaller' },
    { classId: 'warlock', element: 'void',   name: 'Voidwalker' },
    { classId: 'warlock', element: 'stasis', name: 'Shadebinder' },
    { classId: 'warlock', element: 'strand', name: 'Broodweaver' },
    {
      classId: 'warlock', element: 'prismatic', name: 'Prismatic',
      supers:   ['su_song_of_flame', 'su_nova_cataclysm', 'su_needlestorm', 'su_winters_wrath', 'su_chaos_reach'],
      melees:   ['m_arcane_needle', 'm_penumbral_blast', 'm_incinerator_snap', 'm_pocket_singularity', 'm_chain_lightning'],
      grenades: ['g_glacier', 'g_duskfield', 'g_coldsnap', 'g_grapple', 'g_shackle', 'g_threadling',
                 'g_vortex', 'g_magnetic', 'g_suppressor', 'g_pulse', 'g_storm', 'g_arcbolt',
                 'g_healing', 'g_solar', 'g_firebolt']
    }
  ];

  /* Prismatic pools are curated by Bungie and shift with each release. The
     lists above are the offline snapshot; manifest sync replaces them with the
     live set. The app surfaces this so a build is never silently wrong. */
  S.prismaticPoolsAreSnapshot = true;

  S.MAX_ASPECTS = 2; // Aspect slots on every subclass
})(window.D2);
