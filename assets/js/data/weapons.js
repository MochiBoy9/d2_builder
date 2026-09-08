/* Weapon database.

   Exotics carry their intrinsic perk and catalyst. Legendaries carry their
   frame; their perk columns are rolled in the app from the pools in
   weapon-perks.js, which is how the game rolls them too.

   This is a curated offline snapshot, not the full manifest -- Destiny 2 has
   thousands of Legendary weapons and a handful more Exotics land every release.
   Turning on Bungie manifest sync replaces this list with every weapon in the
   game, icons included. The app labels which source a weapon came from. */
(function (D2) {
  'use strict';
  var S = D2.data;

  // w(id, name, type, slot, element, extras)
  function w(id, name, type, slot, element, extras) {
    var o = {
      id: id, name: name, type: type, slot: slot, element: element,
      rarity: 'exotic', source: 'curated'
    };
    if (extras) { for (var k in extras) o[k] = extras[k]; }
    return o;
  }
  // l(...) -> legendary with a frame
  function l(id, name, type, slot, element, frame, extras) {
    var o = w(id, name, type, slot, element, extras);
    o.rarity = 'legendary';
    o.frame = frame;
    return o;
  }

  S.weapons = [

    /* ==================== EXOTIC — AUTO RIFLES ==================== */
    w('x_sweet_business', 'Sweet Business', 'auto_rifle', 'kinetic', 'kinetic', {
      perk: 'Payday', perkDesc: 'Holding down the trigger increases accuracy and rate of fire. Picking up ammo bricks reloads a portion of the magazine.',
      catalyst: 'Sweet Business Catalyst', catalystDesc: 'Increases magazine size and reduces flinch.' }),
    w('x_monte_carlo', 'Monte Carlo', 'auto_rifle', 'kinetic', 'kinetic', {
      perk: 'Markov Chain', perkDesc: 'Dealing damage reduces melee cooldown and grants a chance to fully charge your melee.',
      catalyst: 'Monte Carlo Catalyst', catalystDesc: 'Grants Monte Carlo’s Method: melee kills grant a chargeable damage buff.' }),
    w('x_suros_regime', 'SUROS Regime', 'auto_rifle', 'kinetic', 'kinetic', {
      perk: 'SUROS Legacy', perkDesc: 'The bottom half of every magazine deals bonus damage and has a chance to heal on kill.',
      catalyst: 'SUROS Regime Catalyst', catalystDesc: 'Kills with the bottom half of the magazine have a higher chance to heal.' }),
    w('x_cerberus', 'Cerberus+1', 'auto_rifle', 'kinetic', 'kinetic', {
      perk: 'Four-Headed Dog', perkDesc: 'Fires from four barrels at once in a spread pattern.',
      catalyst: 'Cerberus+1 Catalyst', catalystDesc: 'Aiming down sights tightens the spread considerably.' }),
    w('x_necrochasm', 'Necrochasm', 'auto_rifle', 'kinetic', 'kinetic', {
      perk: 'Cursed Thrall', perkDesc: 'Precision final blows cause a cursed thrall explosion.',
      catalyst: 'Necrochasm Catalyst', catalystDesc: 'Explosions grant Eternal Warrior: stacking weapon damage.' }),
    w('x_hard_light', 'Hard Light', 'auto_rifle', 'energy', 'arc', {
      perk: 'Volatile Light', perkDesc: 'Rounds overpenetrate and ricochet off hard surfaces with increasing damage. Damage type is selectable.',
      catalyst: 'Hard Light Catalyst', catalystDesc: 'Increases stability and reload speed.' }),
    w('x_tommys_matchbook', "Tommy's Matchbook", 'auto_rifle', 'energy', 'solar', {
      perk: 'Ignition Trigger', perkDesc: 'Sustained fire deals bonus damage but scorches you as well.',
      catalyst: "Tommy's Matchbook Catalyst", catalystDesc: 'Grants a healing effect while the intrinsic buff is active.' }),
    w('x_centrifuse', 'Centrifuse', 'auto_rifle', 'energy', 'arc', {
      perk: 'Static Charge', perkDesc: 'Sustained fire builds a static charge; sprinting builds it faster. Release it as a blinding Arc explosion.',
      catalyst: 'Centrifuse Catalyst', catalystDesc: 'Blinding explosions grant increased handling and reload speed.' }),
    w('x_khvostov', 'Khvostov 7G-0X', 'auto_rifle', 'kinetic', 'kinetic', {
      perk: 'Persistence', perkDesc: 'Sustained fire increases accuracy and stability. Alt-fire launches a ricocheting projectile.',
      catalyst: 'Khvostov 7G-0X Catalyst', catalystDesc: 'Final blows spawn a Void or Arc explosion depending on your subclass.' }),
    w('x_choir_of_one', 'Choir of One', 'auto_rifle', 'energy', 'void', {
      ammo: 'special',
      perk: 'Xenoclast IV', perkDesc: 'Fires shield-piercing rounds. Uses Special ammo. Aiming down sights fires a burst that deals heavy damage.',
      catalyst: 'Choir of One Catalyst', catalystDesc: 'Defeating targets grants increased reload speed and handling.' }),
    w('x_quicksilver_storm', 'Quicksilver Storm', 'auto_rifle', 'kinetic', 'kinetic', {
      perk: 'Nanite Conversion', perkDesc: 'Every few rounds loads a micro-rocket. Rocket hits attach nanites that detonate on further damage. Grenade kills convert the weapon to Strand.',
      catalyst: 'Quicksilver Storm Catalyst', catalystDesc: 'Grants Grave Robber and Tex Balanced Stock, and unlocks the Strand conversion permanently.' }),

    /* ==================== EXOTIC — HAND CANNONS ==================== */
    w('x_thorn', 'Thorn', 'hand_cannon', 'kinetic', 'kinetic', {
      perk: 'Mark of the Devourer', perkDesc: 'Rounds pierce targets and deal lingering poison damage. Killing a poisoned target creates a Remnant.',
      catalyst: 'Thorn Catalyst', catalystDesc: 'Absorbing a Remnant increases damage and grants faster movement.' }),
    w('x_last_word', 'The Last Word', 'hand_cannon', 'kinetic', 'kinetic', {
      perk: 'Fan Fire', perkDesc: 'Fires full auto from the hip with high damage and increased accuracy.',
      catalyst: 'The Last Word Catalyst', catalystDesc: 'Hip-fire hits build stacks that increase damage.' }),
    w('x_ace_of_spades', 'Ace of Spades', 'hand_cannon', 'kinetic', 'kinetic', {
      perk: 'Memento Mori', perkDesc: 'Reloading after a kill loads rounds that deal bonus damage. Precision kills grant Firefly.',
      catalyst: 'Ace of Spades Catalyst', catalystDesc: 'Increases magazine size and reload speed.' }),
    w('x_hawkmoon', 'Hawkmoon', 'hand_cannon', 'kinetic', 'kinetic', {
      perk: 'Paracausal Charge', perkDesc: 'Each hit stacks damage on a random round in the magazine. The final round is devastating.',
      catalyst: 'Hawkmoon Catalyst', catalystDesc: 'Grants a selectable perk in the third column.' }),
    w('x_malfeasance', 'Malfeasance', 'hand_cannon', 'kinetic', 'kinetic', {
      perk: 'Explosive Shadow', perkDesc: 'Rounds embed in targets; five rounds detonate for heavy damage.',
      catalyst: 'Malfeasance Catalyst', catalystDesc: 'Detonations grant increased handling and stability.' }),
    w('x_crimson', 'Crimson', 'hand_cannon', 'kinetic', 'kinetic', {
      perk: 'Cruel Remedy', perkDesc: 'Fires a three-round burst. Kills heal you. Precision kills refill the magazine.',
      catalyst: 'Crimson Catalyst', catalystDesc: 'Increases magazine size and target acquisition.' }),
    w('x_sturm', 'Sturm', 'hand_cannon', 'kinetic', 'kinetic', {
      perk: 'Storm and Stress', perkDesc: 'Kills with Drang overcharge the next Sturm round. Energy weapon kills return ammo.',
      catalyst: 'Sturm Catalyst', catalystDesc: 'Kills with Sturm return special ammo to Drang.' }),
    w('x_sunshot', 'Sunshot', 'hand_cannon', 'energy', 'solar', {
      perk: 'Sunburn', perkDesc: 'Rounds explode on impact. Kills cause targets to detonate and highlight nearby enemies.',
      catalyst: 'Sunshot Catalyst', catalystDesc: 'Increases magazine size and reload speed.' }),
    w('x_lumina', 'Lumina', 'hand_cannon', 'energy', 'solar', {
      perk: 'Noble Rounds', perkDesc: 'Kills create Remnants. Firing at an ally consumes a Remnant to heal them and grant both of you Blessing of the Sky.',
      catalyst: 'Lumina Catalyst', catalystDesc: 'Blessing of the Sky lasts longer and grants extra healing.' }),
    w('x_erianas_vow', "Eriana's Vow", 'hand_cannon', 'energy', 'solar', {
      ammo: 'special',
      perk: 'Look Ahead', perkDesc: 'Fires armor-piercing special ammo rounds with a scope. Highly effective against shields.',
      catalyst: "Eriana's Vow Catalyst", catalystDesc: 'Reloading after a kill loads a round with bonus damage.' }),

    /* ==================== EXOTIC — PULSE RIFLES ==================== */
    w('x_vigilance_wing', 'Vigilance Wing', 'pulse_rifle', 'kinetic', 'kinetic', {
      perk: 'Harsh Truths', perkDesc: 'Fires a five-round burst. When a teammate dies you gain increased movement, health regeneration and rate of fire.',
      catalyst: 'Vigilance Wing Catalyst', catalystDesc: 'Increases magazine size and reload speed.' }),
    w('x_no_time_to_explain', 'No Time to Explain', 'pulse_rifle', 'kinetic', 'kinetic', {
      perk: 'Rewind Again', perkDesc: 'Precision hits and hits on slowed or suspended targets return rounds to the magazine.',
      catalyst: 'No Time to Explain Catalyst', catalystDesc: 'Precision kills open a temporal rift that fires at your targets.' }),
    w('x_outbreak_perfected', 'Outbreak Perfected', 'pulse_rifle', 'kinetic', 'kinetic', {
      perk: 'The Corruption Spreads', perkDesc: 'Precision hits create SIVA nanite swarms that seek and damage nearby targets.',
      catalyst: 'Outbreak Perfected Catalyst', catalystDesc: 'Nanites deal more damage and are created more often.' }),
    w('x_bad_juju', 'Bad Juju', 'pulse_rifle', 'kinetic', 'kinetic', {
      perk: 'String of Curses', perkDesc: 'Kills refill the magazine and grant stacking damage and Super energy.',
      catalyst: 'Bad Juju Catalyst', catalystDesc: 'Increases the maximum number of String of Curses stacks.' }),
    w('x_graviton_lance', 'Graviton Lance', 'pulse_rifle', 'energy', 'void', {
      perk: 'Black Hole', perkDesc: 'The second shot of each burst deals bonus damage. Kills cause a Void detonation that spawns seeker projectiles.',
      catalyst: 'Graviton Lance Catalyst', catalystDesc: 'Increases stability and reduces recoil.' }),
    w('x_revision_zero', 'Revision Zero', 'pulse_rifle', 'kinetic', 'kinetic', {
      perk: 'Four-Times Refit', perkDesc: 'Precision hits build toward a heavy burst mode. Configurable with unlockable frames.',
      catalyst: 'Revision Zero Catalyst', catalystDesc: 'Unlocks additional intrinsic configurations.' }),
    w('x_red_death', 'Red Death Reformed', 'pulse_rifle', 'kinetic', 'kinetic', {
      perk: 'Kills Cure', perkDesc: 'Final blows cure you. Rapid final blows increase reload speed.',
      catalyst: 'Red Death Reformed Catalyst', catalystDesc: 'Curing yourself grants a burst of increased weapon damage.' }),
    w('x_collective_obligation', 'Collective Obligation', 'pulse_rifle', 'energy', 'void', {
      perk: 'Umbral Sustenance', perkDesc: 'Absorbs Void debuffs from targets you defeat and applies them with alt-fire — volatile, weaken and suppress.',
      catalyst: 'Collective Obligation Catalyst', catalystDesc: 'Increases the duration of stolen Void effects and grants reload speed.' }),

    /* ==================== EXOTIC — SCOUT RIFLES ==================== */
    w('x_mida', 'MIDA Multi-Tool', 'scout_rifle', 'kinetic', 'kinetic', {
      perk: 'MIDA Multi-Tool', perkDesc: 'Increases movement speed and shows the radar while aiming down sights.',
      catalyst: 'MIDA Multi-Tool Catalyst', catalystDesc: 'Kills increase handling and reload speed.' }),
    w('x_dead_mans_tale', "Dead Man's Tale", 'scout_rifle', 'kinetic', 'kinetic', {
      perk: 'Cranial Spike', perkDesc: 'Precision hits stack damage and improve hip-fire accuracy dramatically.',
      catalyst: "Dead Man's Tale Catalyst", catalystDesc: 'Grants a selectable perk in the third column.' }),
    w('x_polaris_lance', 'Polaris Lance', 'scout_rifle', 'energy', 'solar', {
      perk: 'The Perfect Fifth', perkDesc: 'Four precision hits load an explosive Solar round that scorches.',
      catalyst: 'Polaris Lance Catalyst', catalystDesc: 'Perfect Fifth kills trigger a large Solar explosion.' }),
    w('x_skyburners_oath', "Skyburner's Oath", 'scout_rifle', 'energy', 'solar', {
      perk: 'Slug Rifle', perkDesc: 'Fires slow Solar slugs that track. Full auto, and does bonus damage to Cabal shields and phalanxes.',
      catalyst: "Skyburner's Oath Catalyst", catalystDesc: 'Increases magazine size and reload speed.' }),
    w('x_symmetry', 'Symmetry', 'scout_rifle', 'energy', 'void', {
      perk: 'Dynamic Charge', perkDesc: 'Precision hits build Revolution stacks; firing them launches seeking projectiles.',
      catalyst: 'Symmetry Catalyst', catalystDesc: 'Kills grant additional Revolution stacks.' }),
    w('x_touch_of_malice', 'Touch of Malice', 'scout_rifle', 'kinetic', 'kinetic', {
      perk: 'Touch of Malice', perkDesc: 'The final round of the magazine deals bonus damage and regenerates itself from your own health.',
      catalyst: 'Touch of Malice Catalyst', catalystDesc: 'Grants Charged with Blight: final blows create a damaging Void field.' }),
    w('x_wicked_implement', 'Wicked Implement', 'scout_rifle', 'kinetic', 'stasis', {
      perk: 'Tithing Harvest', perkDesc: 'Rapid precision hits apply Slow. Defeating slowed targets creates Stasis shards.',
      catalyst: 'Wicked Implement Catalyst', catalystDesc: 'Creates additional Stasis shards and improves handling.' }),
    w('x_jade_rabbit', 'The Jade Rabbit', 'scout_rifle', 'kinetic', 'kinetic', {
      perk: 'Fate of All Fools', perkDesc: 'Body shots return ammo to the magazine and stack bonus precision damage.',
      catalyst: 'The Jade Rabbit Catalyst', catalystDesc: 'Increases magazine size and stability.' }),

    /* ==================== EXOTIC — SMGs ==================== */
    w('x_riskrunner', 'Riskrunner', 'submachine_gun', 'energy', 'arc', {
      perk: 'Arc Conductor', perkDesc: 'Taking Arc damage overcharges the weapon: chain lightning, damage resistance and self-reloading rounds.',
      catalyst: 'Riskrunner Catalyst', catalystDesc: 'Arc Conductor kills return ammo to the magazine.' }),
    w('x_tarrabah', 'Tarrabah', 'submachine_gun', 'energy', 'solar', {
      perk: 'Ravenous Beast', perkDesc: 'Dealing and taking damage fills the beast. Unleash it for greatly increased damage and full auto fire.',
      catalyst: 'Tarrabah Catalyst', catalystDesc: 'Ravenous Beast lasts longer and does not deactivate on stow.' }),
    w('x_huckleberry', 'The Huckleberry', 'submachine_gun', 'kinetic', 'kinetic', {
      perk: 'Ride the Bull', perkDesc: 'Holding the trigger increases rate of fire and recoil. Kills refill the magazine.',
      catalyst: 'The Huckleberry Catalyst', catalystDesc: 'Kills restore health as well as ammo.' }),
    w('x_osteo_striga', 'Osteo Striga', 'submachine_gun', 'kinetic', 'kinetic', {
      perk: 'Toxic Overload', perkDesc: 'Fires tracking projectiles that poison. Poisoned targets burst on death, spreading the poison.',
      catalyst: 'Osteo Striga Catalyst', catalystDesc: 'Poison bursts create larger clouds and grant reload speed.' }),
    w('x_barrow_dyad', 'Barrow-Dyad', 'submachine_gun', 'kinetic', 'strand', {
      perk: 'Cruel Remedy', perkDesc: 'Configurable Strand SMG with swappable intrinsic modes for suppression, sustain or damage.',
      catalyst: 'Barrow-Dyad Catalyst', catalystDesc: 'Enhances the selected intrinsic mode.' }),
    w('x_manticore', 'The Manticore', 'submachine_gun', 'energy', 'void', {
      perk: 'Vespertine Skimmer', perkDesc: 'Sustained fire while airborne grants hover and lift. Void kills extend the effect.',
      catalyst: 'The Manticore Catalyst', catalystDesc: 'Airborne kills grant an overshield and increased airborne effectiveness.' }),

    /* ==================== EXOTIC — SIDEARMS ==================== */
    w('x_rat_king', 'Rat King', 'sidearm', 'kinetic', 'kinetic', {
      perk: 'Rat Pack', perkDesc: 'Grows stronger with each nearby ally also carrying Rat King. Reloading after a kill grants invisibility.',
      catalyst: 'Rat King Catalyst', catalystDesc: 'Increases magazine size and reload speed.' }),
    w('x_travelers_chosen', "Traveler's Chosen", 'sidearm', 'kinetic', 'kinetic', {
      perk: 'Gift of the Traveler', perkDesc: 'Kills stack a buff; consume it on reload to return ability energy.',
      catalyst: "Traveler's Chosen Catalyst", catalystDesc: 'Increases stacks and ability energy returned.' }),
    w('x_devils_ruin', "Devil's Ruin", 'sidearm', 'energy', 'solar', {
      perk: 'Closing Time', perkDesc: 'Hold the trigger to charge a piercing Solar laser beam.',
      catalyst: "Devil's Ruin Catalyst", catalystDesc: 'The laser fully reloads the magazine and scorches targets.' }),
    w('x_forerunner', 'Forerunner', 'sidearm', 'kinetic', 'kinetic', {
      ammo: 'special',
      perk: 'Pinpoint Slug', perkDesc: 'Fires a high-damage precision slug using Special ammo.',
      catalyst: 'Forerunner Catalyst', catalystDesc: 'Final blows grant increased handling and a chance for a grenade-like detonation.' }),
    w('x_final_warning', 'Final Warning', 'sidearm', 'kinetic', 'strand', {
      perk: 'Nanite Targeting', perkDesc: 'Hold to mark targets, release to fire tracking Strand rounds. Damage suspends.',
      catalyst: 'Final Warning Catalyst', catalystDesc: 'Increases damage against suspended targets and improves handling.' }),
    w('x_buried_bloodline', 'Buried Bloodline', 'sidearm', 'energy', 'void', {
      ammo: 'special',
      perk: 'Dark Blessing', perkDesc: 'Fires two rounds at once. Kills grant Devour to you and nearby allies.',
      catalyst: 'Buried Bloodline Catalyst', catalystDesc: 'Grants Queensfoil Censer: weakens targets on hit.' }),
    w('x_cryosthesia', 'Cryosthesia 77K', 'sidearm', 'energy', 'stasis', {
      perk: 'Cold Comfort', perkDesc: 'Kills allow a charged Stasis shot that freezes targets in a small area.',
      catalyst: 'Cryosthesia 77K Catalyst', catalystDesc: 'Freezing targets grants increased handling and reload speed.' }),
    w('x_trespasser', 'Trespasser', 'sidearm', 'energy', 'arc', {
      perk: 'Rapid-Fire Burst', perkDesc: 'Reloading after a kill loads a devastating Arc burst into the next shot.',
      catalyst: 'Trespasser Catalyst', catalystDesc: 'Extends the duration of the empowered burst.' }),

    /* ==================== EXOTIC — BOWS ==================== */
    w('x_trinity_ghoul', 'Trinity Ghoul', 'bow', 'energy', 'arc', {
      perk: 'Split Electron', perkDesc: 'Fires an arrow that splits into a horizontal spread on release.',
      catalyst: 'Trinity Ghoul Catalyst', catalystDesc: 'Grants Lightning Rod: precision kills electrify the next arrow with chain lightning.' }),
    w('x_wish_ender', 'Wish-Ender', 'bow', 'kinetic', 'kinetic', {
      perk: "Broadhead", perkDesc: 'Fully drawn arrows pierce targets and walls, revealing enemies through them.',
      catalyst: 'Wish-Ender Catalyst', catalystDesc: 'Increases draw speed and stability.' }),
    w('x_le_monarque', 'Le Monarque', 'bow', 'energy', 'void', {
      perk: 'Poison Arrows', perkDesc: 'Fully drawn arrows poison targets. Poisoned targets spread the effect on death.',
      catalyst: 'Le Monarque Catalyst', catalystDesc: 'Increases draw time and grants faster arrow nocking.' }),
    w('x_ticuus', "Ticuu's Divination", 'bow', 'energy', 'solar', {
      perk: 'Sacred Flame', perkDesc: 'Hip-fire marks targets with tracking Solar projectiles. Aimed shots detonate the marks.',
      catalyst: "Ticuu's Divination Catalyst", catalystDesc: 'Detonations create larger, longer-lasting explosions.' }),
    w('x_hierarchy_of_needs', 'Hierarchy of Needs', 'bow', 'energy', 'solar', {
      perk: 'Guiding Sight', perkDesc: 'Precision hits build a Light ring that fires seeking Solar arrows at your targets.',
      catalyst: 'Hierarchy of Needs Catalyst', catalystDesc: 'The ring lasts longer and fires more arrows.' }),
    w('x_verglas_curve', 'Verglas Curve', 'bow', 'kinetic', 'stasis', {
      perk: 'Hail Barrage', perkDesc: 'Final blows build charges; release them as a volley of Stasis arrows that create crystals.',
      catalyst: 'Verglas Curve Catalyst', catalystDesc: 'Increases charges and improves draw time.' }),
    w('x_leviathans_breath', "Leviathan's Breath", 'bow', 'power', 'void', {
      perk: 'Big-Game Hunter', perkDesc: 'A heavy bow whose arrows stagger unshielded combatants and stun Unstoppable Champions.',
      catalyst: "Leviathan's Breath Catalyst", catalystDesc: 'Increases reserves and grants faster draw after a stagger.' }),

    /* ==================== EXOTIC — SHOTGUNS ==================== */
    w('x_chaperone', 'The Chaperone', 'shotgun', 'kinetic', 'kinetic', {
      perk: 'Precision Slug', perkDesc: 'Fires a single accurate slug round.',
      catalyst: 'The Chaperone Catalyst', catalystDesc: 'Grants Roadborn: precision kills increase damage, range and rate of fire.' }),
    w('x_lord_of_wolves', 'Lord of Wolves', 'shotgun', 'energy', 'solar', {
      perk: 'Shrapnel Launcher', perkDesc: 'Fires a burst of Solar shrapnel. Release the Wolfpack for a devastating full-auto mode.',
      catalyst: 'Lord of Wolves Catalyst', catalystDesc: 'Improves stability and handling in Release the Wolves mode.' }),
    w('x_fourth_horseman', 'The Fourth Horseman', 'shotgun', 'energy', 'arc', {
      perk: 'Four Horsemen', perkDesc: 'Full-auto shotgun. The final round of the magazine deals bonus damage.',
      catalyst: 'The Fourth Horseman Catalyst', catalystDesc: 'Adds a fifth round and improves handling.' }),
    w('x_duality', 'Duality', 'shotgun', 'kinetic', 'kinetic', {
      perk: 'Two-Tailed', perkDesc: 'Hip-fire is a shotgun blast; aiming down sights fires a high-damage slug.',
      catalyst: 'Duality Catalyst', catalystDesc: 'Slug kills create a Void detonation and grant increased handling.' }),
    w('x_conditional_finality', 'Conditional Finality', 'shotgun', 'kinetic', 'stasis', {
      perk: 'Split Decision', perkDesc: 'Fires two barrels at once: one Stasis that freezes, one Solar that ignites.',
      catalyst: 'Conditional Finality Catalyst', catalystDesc: 'Improves handling and reload speed on freeze or ignition.' }),
    w('x_slayers_fang', "Slayer's Fang", 'shotgun', 'energy', 'void', {
      perk: 'Blood Debt', perkDesc: 'Fires a slug that seeks nearby targets after a kill, chaining Void detonations.',
      catalyst: "Slayer's Fang Catalyst", catalystDesc: 'Chained kills increase damage and reload speed.' }),
    w('x_tractor_cannon', 'Tractor Cannon', 'shotgun', 'power', 'void', {
      perk: 'Repulsor Force', perkDesc: 'Massive knockback. Hit targets are suppressed and take greatly increased damage from all sources.',
      catalyst: 'Tractor Cannon Catalyst', catalystDesc: 'Kills grant increased handling and Void ability energy.' }),
    w('x_legend_of_acrius', 'Legend of Acrius', 'shotgun', 'power', 'arc', {
      perk: 'Shock Blast', perkDesc: 'Fires a devastating Arc blast at close range.',
      catalyst: 'Legend of Acrius Catalyst', catalystDesc: 'Increases magazine size and reload speed.' }),

    /* ==================== EXOTIC — SNIPERS ==================== */
    w('x_izanagis_burden', "Izanagi's Burden", 'sniper_rifle', 'kinetic', 'kinetic', {
      perk: "Honed Edge", perkDesc: 'Hold reload to consume the magazine into a single devastating armor-piercing round.',
      catalyst: "Izanagi's Burden Catalyst", catalystDesc: 'Honed Edge x4 kills return two rounds to the magazine.' }),
    w('x_cloudstrike', 'Cloudstrike', 'sniper_rifle', 'energy', 'arc', {
      perk: 'Mortal Polarity', perkDesc: 'Precision kills call down a lightning storm at the target’s location.',
      catalyst: 'Cloudstrike Catalyst', catalystDesc: 'Rapid precision hits grant Stormbringer: increased reload and handling.' }),
    w('x_borealis', 'Borealis', 'sniper_rifle', 'energy', 'solar', {
      perk: 'Matchmaker', perkDesc: 'Change this weapon’s damage type at will. Breaking a matching shield refills the magazine.',
      catalyst: 'Borealis Catalyst', catalystDesc: 'Breaking a shield or changing element grants a damage bonus.' }),
    w('x_still_hunt', 'Still Hunt', 'sniper_rifle', 'energy', 'solar', {
      perk: 'Golden Tricorn', perkDesc: 'Charges a Golden Gun shot as you deal damage. Fire it for enormous single-target damage.',
      catalyst: 'Still Hunt Catalyst', catalystDesc: 'Grants Hunter’s Trace: dealing damage charges the Golden Gun faster.' }),
    w('x_icebreaker', 'Ice Breaker', 'sniper_rifle', 'energy', 'solar', {
      perk: 'No Backpack', perkDesc: 'Regenerates its own ammo over time. Kills cause targets to detonate in Solar fire.',
      catalyst: 'Ice Breaker Catalyst', catalystDesc: 'Ammo regenerates faster and detonations are larger.' }),
    w('x_whisper', 'Whisper of the Worm', 'sniper_rifle', 'power', 'solar', {
      perk: 'White Nail', perkDesc: 'Rapidly landing three precision hits refills the magazine from reserves.',
      catalyst: 'Whisper of the Worm Catalyst', catalystDesc: 'Grants increased ammo reserves and Fourth Time’s the Charm behaviour.' }),
    w('x_darci', 'D.A.R.C.I.', 'sniper_rifle', 'power', 'arc', {
      perk: 'Personal Assistant', perkDesc: 'Aiming at a target displays its health and critical spots, and grants increased damage while scoped on the same target.',
      catalyst: 'D.A.R.C.I. Catalyst', catalystDesc: 'Increases magazine size and reload speed.' }),

    /* ==================== EXOTIC — FUSION / LINEAR ==================== */
    w('x_vex_mythoclast', 'Vex Mythoclast', 'fusion_rifle', 'energy', 'solar', {
      ammo: 'primary',
      perk: 'Temporal Unlimiter', perkDesc: 'Fires as a full-auto primary-ammo rifle. Kills build toward an overcharged burst mode.',
      catalyst: 'Vex Mythoclast Catalyst', catalystDesc: 'Grants Calculated Balance: stacking damage on kills.' }),
    w('x_telesto', 'Telesto', 'fusion_rifle', 'energy', 'void', {
      perk: 'Unplanned Reprieve', perkDesc: 'Fires projectiles that attach to surfaces and detonate after a delay.',
      catalyst: 'Telesto Catalyst', catalystDesc: 'Detonations return ammo to the magazine.' }),
    w('x_merciless', 'Merciless', 'fusion_rifle', 'energy', 'solar', {
      perk: 'Conserve Momentum', perkDesc: 'Non-lethal hits progressively increase charge speed.',
      catalyst: 'Merciless Catalyst', catalystDesc: 'Increases magazine size and reload speed.' }),
    w('x_jotunn', 'Jötunn', 'fusion_rifle', 'energy', 'solar', {
      perk: 'Charge Shot', perkDesc: 'Fires a tracking Solar projectile that scorches on impact.',
      catalyst: 'Jötunn Catalyst', catalystDesc: 'Kills grant increased handling, charge rate and reload speed.' }),
    w('x_bastion', 'Bastion', 'fusion_rifle', 'kinetic', 'kinetic', {
      perk: 'Chambered Compensator', perkDesc: 'Fires a three-round burst of Kinetic slugs that pierce shields.',
      catalyst: 'Bastion Catalyst', catalystDesc: 'Kills grant a temporary overshield.' }),
    w('x_delicate_tomb', 'Delicate Tomb', 'fusion_rifle', 'energy', 'arc', {
      perk: 'Controlled Burst', perkDesc: 'Fires Arc bolts that build static charge; release it as a blinding shockwave.',
      catalyst: 'Delicate Tomb Catalyst', catalystDesc: 'The shockwave jolts targets and grants ability energy.' }),
    w('x_tessellation', 'Tessellation', 'fusion_rifle', 'kinetic', 'kinetic', {
      perk: 'Lightweight Emitter', perkDesc: 'Consume your grenade to fire a charged shot matching your subclass element.',
      catalyst: 'Tessellation Catalyst', catalystDesc: 'Charged shots return grenade energy on hit.' }),
    w('x_sleeper_simulant', 'Sleeper Simulant', 'linear_fusion', 'power', 'solar', {
      perk: 'Ionized Battery', perkDesc: 'Fires a high-impact Solar laser that ricochets off hard surfaces.',
      catalyst: 'Sleeper Simulant Catalyst', catalystDesc: 'Increases magazine size and reload speed.' }),
    w('x_lorentz_driver', 'Lorentz Driver', 'linear_fusion', 'energy', 'void', {
      ammo: 'special',
      perk: 'Lagrangian Sight', perkDesc: 'Marks targets on precision hits. Three marks create a Void implosion on kill.',
      catalyst: 'Lorentz Driver Catalyst', catalystDesc: 'Implosions grant increased handling and stability.' }),
    w('x_queenbreaker', 'The Queenbreaker', 'linear_fusion', 'power', 'arc', {
      perk: 'Marksman Sights', perkDesc: 'A Fallen wire rifle that blinds targets on impact.',
      catalyst: 'The Queenbreaker Catalyst', catalystDesc: 'Increases charge rate and handling.' }),
    w('x_euphony', 'Euphony', 'linear_fusion', 'power', 'strand', {
      perk: 'Thread of Fate', perkDesc: 'Sustained damage weaves Strand threads that unravel and spawn Threadlings on kills.',
      catalyst: 'Euphony Catalyst', catalystDesc: 'Threadlings deal increased damage and are created more often.' }),
    w('x_arbalest', 'Arbalest', 'linear_fusion', 'kinetic', 'kinetic', {
      ammo: 'special',
      perk: 'Compounding Force', perkDesc: 'Uses Special ammo. Shield-piercing rounds that break elemental shields regardless of type, creating a large explosion.',
      catalyst: 'Arbalest Catalyst', catalystDesc: 'Breaking a shield grants greatly increased reload speed and weapon damage.' }),
    w('x_one_thousand_voices', 'One Thousand Voices', 'fusion_rifle', 'power', 'solar', {
      perk: 'Ahamkara’s Eye', perkDesc: 'Fires a continuous beam of Solar Light that leaves burning pools where it lands.',
      catalyst: 'One Thousand Voices Catalyst', catalystDesc: 'Increases the beam’s range and the damage of the pools.' }),

    /* ==================== EXOTIC — TRACE RIFLES ==================== */
    w('x_coldheart', 'Coldheart', 'trace_rifle', 'energy', 'arc', {
      perk: 'Longest Winter', perkDesc: 'The longer the beam is held on a target, the more damage it deals.',
      catalyst: 'Coldheart Catalyst', catalystDesc: 'Ramps damage faster and increases magazine size.' }),
    w('x_prometheus_lens', 'Prometheus Lens', 'trace_rifle', 'energy', 'solar', {
      perk: 'Prismatic Inferno', perkDesc: 'Creates a scorching flame vortex around the target as you hold the beam.',
      catalyst: 'Prometheus Lens Catalyst', catalystDesc: 'Increases magazine size and reload speed.' }),
    w('x_divinity', 'Divinity', 'trace_rifle', 'energy', 'arc', {
      perk: 'Judgment', perkDesc: 'Sustained damage creates a field that makes the target critically vulnerable to precision damage.',
      catalyst: 'Divinity Catalyst', catalystDesc: 'Breaking the cage deals damage and blinds nearby targets.' }),
    w('x_ruinous_effigy', 'Ruinous Effigy', 'trace_rifle', 'energy', 'void', {
      perk: 'Transmutation', perkDesc: 'Kills create Void transmutation spheres you can pick up and wield as a weapon.',
      catalyst: 'Ruinous Effigy Catalyst', catalystDesc: 'Spheres grant an overshield and last longer.' }),
    w('x_agers_scepter', "Ager's Scepter", 'trace_rifle', 'kinetic', 'stasis', {
      perk: 'Rimestealer', perkDesc: 'Kills slow nearby targets. Consume your Super to grant the beam freezing power.',
      catalyst: "Ager's Scepter Catalyst", catalystDesc: 'Grants Will Given Form: greatly increased damage on frozen targets.' }),
    w('x_wavesplitter', 'Wavesplitter', 'trace_rifle', 'energy', 'void', {
      perk: 'Oscillation', perkDesc: 'Cycles between three power levels. Picking up an Orb of Power grants maximum power.',
      catalyst: 'Wavesplitter Catalyst', catalystDesc: 'Increases magazine size and reload speed.' }),
    w('x_navigator', 'The Navigator', 'trace_rifle', 'kinetic', 'strand', {
      perk: 'Tangled Bond', perkDesc: 'Firing at allies grants them Woven Mail. Damaging targets creates Tangles.',
      catalyst: 'The Navigator Catalyst', catalystDesc: 'Woven Mail lasts longer and grants ability energy.' }),
    w('x_lodestar', 'Lodestar', 'trace_rifle', 'energy', 'arc', {
      perk: 'Storm Chaser', perkDesc: 'Sustained fire builds an Arc charge; release it as a jolting bolt.',
      catalyst: 'Lodestar Catalyst', catalystDesc: 'Jolting bolts create Ionic Traces.' }),
    w('x_microcosm', 'Microcosm', 'trace_rifle', 'power', 'kinetic', {
      perk: 'Paracausal Imbuement', perkDesc: 'A Heavy trace rifle. Damage matches your subclass element and grants Super energy on kills.',
      catalyst: 'Microcosm Catalyst', catalystDesc: 'Increases Super energy returned and magazine size.' }),

    /* ==================== EXOTIC — GLAIVES ==================== */
    w('x_vexcalibur', 'Vexcalibur', 'glaive', 'kinetic', 'void', {
      perk: 'Vexcalibur', perkDesc: 'Melee kills grant an overshield. Blocking builds toward a Void detonation.',
      catalyst: 'Vexcalibur Catalyst', catalystDesc: 'Grants Repulsor Brace-style overshield generation and improved guard.' }),
    w('x_edge_of_concurrence', 'Edge of Concurrence', 'glaive', 'kinetic', 'arc', {
      classId: 'hunter',
      perk: 'Lightning Rod', perkDesc: 'Charged melee kills create an Arc lightning strike. Hunter only.',
      catalyst: null }),
    w('x_edge_of_action', 'Edge of Action', 'glaive', 'kinetic', 'void', {
      classId: 'titan',
      perk: 'Bastion Bulwark', perkDesc: 'Charged melee creates a Void barrier that protects your fireteam. Titan only.',
      catalyst: null }),
    w('x_edge_of_intent', 'Edge of Intent', 'glaive', 'kinetic', 'solar', {
      classId: 'warlock',
      perk: 'Solar Turret', perkDesc: 'Charged melee summons a healing Solar turret. Warlock only.',
      catalyst: null }),
    w('x_winterbite', 'Winterbite', 'glaive', 'power', 'stasis', {
      perk: 'Volatile Orb', perkDesc: 'Launches a slow-moving Stasis orb that freezes everything around it.',
      catalyst: 'Winterbite Catalyst', catalystDesc: 'Freezing targets returns glaive energy.' }),

    /* ==================== EXOTIC — GRENADE LAUNCHERS ==================== */
    w('x_fighting_lion', 'Fighting Lion', 'breech_gl', 'kinetic', 'kinetic', {
      perk: 'Delayed Gratification', perkDesc: 'Grenades detonate on trigger release or impact with a target. Kills with other weapons reload it.',
      catalyst: 'Fighting Lion Catalyst', catalystDesc: 'Grants Thin the Herd: damaging targets returns ammo.' }),
    w('x_dead_messenger', 'Dead Messenger', 'breech_gl', 'energy', 'void', {
      perk: 'Trinary Vision', perkDesc: 'Fires a wave that splits into Solar, Arc and Void bolts. The element is selectable.',
      catalyst: 'Dead Messenger Catalyst', catalystDesc: 'Bolts track targets and grant ability energy on kill.' }),
    w('x_ex_diris', 'Ex Diris', 'breech_gl', 'energy', 'arc', {
      perk: 'Moth Sacrifice', perkDesc: 'Grenades release Arc moths that seek and detonate on targets.',
      catalyst: 'Ex Diris Catalyst', catalystDesc: 'Creates a lightning storm on multi-kills.' }),
    w('x_lost_signal', 'Lost Signal', 'breech_gl', 'kinetic', 'kinetic', {
      perk: 'Rapid-Fire Frame', perkDesc: 'A full-auto breech grenade launcher that fires bouncing grenades.',
      catalyst: 'Lost Signal Catalyst', catalystDesc: 'Damaging targets grants increased handling and reload speed.' }),
    w('x_anarchy', 'Anarchy', 'heavy_gl', 'power', 'arc', {
      perk: 'Arc Traps', perkDesc: 'Grenades attach to surfaces and link with Arc tethers that damage over time.',
      catalyst: 'Anarchy Catalyst', catalystDesc: 'Increases magazine size and reload speed.' }),
    w('x_parasite', 'Parasite', 'heavy_gl', 'power', 'strand', {
      perk: 'Worm Byproduct', perkDesc: 'Final blows stack damage on the next shot. Fires a worm larva that explodes.',
      catalyst: 'Parasite Catalyst', catalystDesc: 'Grants stacks faster and increases blast radius.' }),
    w('x_salvations_grip', "Salvation's Grip", 'heavy_gl', 'power', 'stasis', {
      perk: 'Cryocladism', perkDesc: 'Creates Stasis crystals on impact. Hold the trigger to fire a larger burst.',
      catalyst: "Salvation's Grip Catalyst", catalystDesc: 'Creates additional crystals and improves handling.' }),
    w('x_colony', 'The Colony', 'heavy_gl', 'power', 'void', {
      perk: 'Insectoid Robot Grenades', perkDesc: 'Fires robotic spiders that seek out targets and explode.',
      catalyst: 'The Colony Catalyst', catalystDesc: 'Kills return ammo to the magazine.' }),
    w('x_witherhoard', 'Witherhoard', 'breech_gl', 'kinetic', 'kinetic', {
      ammo: 'special',
      perk: 'Primeval’s Torment', perkDesc: 'Projectiles attach to targets or create a pool of blight that damages anything inside it over time.',
      catalyst: 'Witherhoard Catalyst', catalystDesc: 'Grants greatly increased reload speed and handling while the blight is active.' }),
    w('x_prospector', 'The Prospector', 'heavy_gl', 'power', 'arc', {
      perk: 'Full Auto Trigger System', perkDesc: 'Fires sticky grenades on full auto that all detonate together, and sets targets on fire.',
      catalyst: 'The Prospector Catalyst', catalystDesc: 'Increases blast radius and reload speed.' }),

    /* ==================== EXOTIC — ROCKETS ==================== */
    w('x_gjallarhorn', 'Gjallarhorn', 'rocket_launcher', 'power', 'solar', {
      perk: 'Wolfpack Rounds', perkDesc: 'Rockets split into tracking cluster missiles. Grants Wolfpack Rounds to nearby allies’ rockets.',
      catalyst: 'Gjallarhorn Catalyst', catalystDesc: 'Kills grant increased handling and reload speed.' }),
    w('x_truth', 'Truth', 'rocket_launcher', 'power', 'void', {
      perk: 'Prototype Trueseeker', perkDesc: 'Rockets have extremely aggressive target tracking.',
      catalyst: 'Truth Catalyst', catalystDesc: 'Increases magazine size and blast radius.' }),
    w('x_wardcliff_coil', 'The Wardcliff Coil', 'rocket_launcher', 'power', 'arc', {
      perk: 'Mad Scientist', perkDesc: 'Fires a volley of rockets in a wild spread. Reloads automatically from reserves.',
      catalyst: 'The Wardcliff Coil Catalyst', catalystDesc: 'Grants Chain Reaction: kills cause elemental explosions.' }),
    w('x_two_tailed_fox', 'Two-Tailed Fox', 'rocket_launcher', 'power', 'solar', {
      perk: 'Third Tail', perkDesc: 'Fires three rockets: Solar suppression, Void suppression, and a Strand-severing tail.',
      catalyst: 'Two-Tailed Fox Catalyst', catalystDesc: 'Adds a third Strand rocket that severs targets.' }),
    w('x_deathbringer', 'Deathbringer', 'rocket_launcher', 'power', 'void', {
      perk: 'Dark Descent', perkDesc: 'Fires a Void projectile that rains seeking bolts. The higher it drops from, the more damage.',
      catalyst: 'Deathbringer Catalyst', catalystDesc: 'Increases the number of bolts and reload speed.' }),
    w('x_eyes_of_tomorrow', 'Eyes of Tomorrow', 'rocket_launcher', 'power', 'solar', {
      perk: 'Adaptive Ordnance', perkDesc: 'Fires a volley of tracking rockets at up to four targets simultaneously.',
      catalyst: null }),
    w('x_dragons_breath', "Dragon's Breath", 'rocket_launcher', 'power', 'solar', {
      perk: 'Pyrotoxin Rounds', perkDesc: 'Rockets leave a Solar pool that scorches and ignites targets caught in it.',
      catalyst: "Dragon's Breath Catalyst", catalystDesc: 'Pools last longer and grant increased weapon damage.' }),

    /* ==================== EXOTIC — MACHINE GUNS ==================== */
    w('x_xenophage', 'Xenophage', 'machine_gun', 'power', 'solar', {
      perk: 'Pyrotoxin Rounds', perkDesc: 'Fires high-damage explosive rounds. Does not require precision hits.',
      catalyst: 'Xenophage Catalyst', catalystDesc: 'Increases magazine size and reload speed.' }),
    w('x_thunderlord', 'Thunderlord', 'machine_gun', 'power', 'arc', {
      perk: 'Reign Havoc', perkDesc: 'Sustained fire calls lightning strikes. Kills with grenades reload it from reserves.',
      catalyst: 'Thunderlord Catalyst', catalystDesc: 'Increases magazine size and lightning damage.' }),
    w('x_grand_overture', 'Grand Overture', 'machine_gun', 'power', 'arc', {
      perk: 'Ordnance Rounds', perkDesc: 'Builds missile charges as you land hits; switch to fire a devastating missile salvo.',
      catalyst: 'Grand Overture Catalyst', catalystDesc: 'Missiles blind targets and build faster.' }),
    w('x_heir_apparent', 'Heir Apparent', 'machine_gun', 'power', 'arc', {
      perk: 'Heavy Slug Thrower', perkDesc: 'Spinning up at full health grants a Guardian Games shield that absorbs damage.',
      catalyst: 'Heir Apparent Catalyst', catalystDesc: 'The shield regenerates and grants damage resistance.' }),
    w('x_deterministic_chaos', 'Deterministic Chaos', 'machine_gun', 'power', 'void', {
      perk: 'Heavy Metal', perkDesc: 'Every fourth round weakens the target; every sixteenth makes it volatile.',
      catalyst: 'Deterministic Chaos Catalyst', catalystDesc: 'Defeating a weakened or volatile target grants increased weapon damage.' }),

    /* ==================== EXOTIC — SWORDS ==================== */
    w('x_black_talon', 'Black Talon', 'sword', 'power', 'void', {
      perk: 'Crow’s Wings', perkDesc: 'Heavy attack fires a projected Void blade wave at range.',
      catalyst: 'Black Talon Catalyst', catalystDesc: 'Projected blades deal increased damage and return ammo.' }),
    w('x_lament', 'The Lament', 'sword', 'power', 'solar', {
      perk: 'Banshee’s Wail', perkDesc: 'Revving the chainsaw sword grants massively increased damage and shield piercing.',
      catalyst: 'The Lament Catalyst', catalystDesc: 'Revved kills heal you.' }),
    w('x_heartshadow', 'Heartshadow', 'sword', 'power', 'void', {
      perk: 'Exhumation', perkDesc: 'Heavy attack while invisible unleashes Void projectiles and makes targets volatile.',
      catalyst: 'Heartshadow Catalyst', catalystDesc: 'Grants invisibility on heavy attack kills.' }),
    w('x_ergo_sum', 'Ergo Sum', 'sword', 'power', 'solar', {
      perk: 'Caster Frame', perkDesc: 'A sword with a randomly rolled Exotic intrinsic and elemental type.',
      catalyst: null }),
    w('x_worldline_zero', 'Worldline Zero', 'sword', 'power', 'arc', {
      perk: 'Tesseract', perkDesc: 'Heavy attack performs a long-range dash strike.',
      catalyst: 'Worldline Zero Catalyst', catalystDesc: 'Grants Another Dimension: increased dash damage and range.' }),

    /* ==================== LEGENDARY — a curated meta selection ==================== */
    /* Kinetic-slot primaries */
    l('lg_khvostov_leg', 'Khvostov 7G-02', 'auto_rifle', 'kinetic', 'kinetic', 'f_ar_adaptive'),
    l('lg_ammit', 'Ammit AR2', 'auto_rifle', 'energy', 'solar', 'f_ar_high_impact'),
    l('lg_chattering_bone', 'Chattering Bone', 'pulse_rifle', 'kinetic', 'kinetic', 'f_pr_adaptive'),
    l('lg_bygones', 'Bygones', 'pulse_rifle', 'kinetic', 'kinetic', 'f_pr_adaptive'),
    l('lg_redrix', 'Redrix’s Estoc', 'pulse_rifle', 'energy', 'void', 'f_pr_rapid'),
    l('lg_blast_furnace', 'Blast Furnace', 'pulse_rifle', 'kinetic', 'kinetic', 'f_pr_aggressive'),
    l('lg_outbreak_leg', 'Nasreddin', 'pulse_rifle', 'energy', 'strand', 'f_pr_heavy_burst'),
    l('lg_fatebringer', 'Fatebringer', 'hand_cannon', 'kinetic', 'kinetic', 'f_hc_adaptive'),
    l('lg_igneous_hammer', 'Igneous Hammer', 'hand_cannon', 'energy', 'solar', 'f_hc_aggressive'),
    l('lg_austringer', 'Austringer', 'hand_cannon', 'kinetic', 'kinetic', 'f_hc_adaptive'),
    l('lg_rose', 'Rose', 'hand_cannon', 'kinetic', 'kinetic', 'f_hc_lightweight'),
    l('lg_eyasluna', 'Eyasluna', 'hand_cannon', 'kinetic', 'stasis', 'f_hc_adaptive'),
    l('lg_posterity', 'Posterity', 'hand_cannon', 'kinetic', 'kinetic', 'f_hc_precision'),
    l('lg_sunshot_leg', 'Zaouli’s Bane', 'hand_cannon', 'kinetic', 'kinetic', 'f_hc_adaptive'),
    l('lg_warden_law', 'Warden’s Law', 'hand_cannon', 'kinetic', 'kinetic', 'f_hc_heavy_burst'),
    l('lg_the_immortal', 'The Immortal', 'submachine_gun', 'energy', 'void', 'f_smg_aggressive'),
    l('lg_recluse', 'The Recluse', 'submachine_gun', 'energy', 'void', 'f_smg_precision'),
    l('lg_ikelos_smg', 'IKELOS_SMG_v1.0.3', 'submachine_gun', 'energy', 'arc', 'f_smg_adaptive'),
    l('lg_calus_mini', 'Calus Mini-Tool', 'submachine_gun', 'energy', 'solar', 'f_smg_lightweight'),
    l('lg_hung_jury', 'Hung Jury SR4', 'scout_rifle', 'kinetic', 'kinetic', 'f_sc_precision'),
    l('lg_dead_mans_leg', 'Doomed Petitioner', 'scout_rifle', 'kinetic', 'stasis', 'f_sc_aggressive'),
    l('lg_veles_x', 'Veles-X', 'scout_rifle', 'energy', 'arc', 'f_sc_rapid'),
    l('lg_tarnished_mettle', 'Tarnished Mettle', 'scout_rifle', 'kinetic', 'kinetic', 'f_sc_rapid'),
    l('lg_rat_king_leg', 'Enigma’s Draw', 'sidearm', 'kinetic', 'kinetic', 'f_sa_adaptive'),
    l('lg_indebted_kindness', 'Indebted Kindness', 'sidearm', 'energy', 'arc', 'f_sa_rocket', { ammo: 'special' }),
    l('lg_aberrant_action', 'Aberrant Action', 'sidearm', 'energy', 'solar', 'f_sa_rocket', { ammo: 'special' }),
    l('lg_the_call', 'The Call', 'sidearm', 'kinetic', 'strand', 'f_sa_rocket', { ammo: 'special' }),
    l('lg_wish_keeper', 'Wish-Keeper', 'bow', 'kinetic', 'strand', 'f_bow_lightweight'),
    l('lg_tyranny_of_heaven', 'Tyranny of Heaven', 'bow', 'kinetic', 'kinetic', 'f_bow_lightweight'),

    /* Special */
    l('lg_found_verdict', 'Found Verdict', 'shotgun', 'energy', 'arc', 'f_sg_aggressive'),
    l('lg_matador', 'Matador 64', 'shotgun', 'kinetic', 'kinetic', 'f_sg_aggressive'),
    l('lg_riptide', 'Riptide', 'fusion_rifle', 'energy', 'stasis', 'f_fr_rapid'),
    l('lg_cartesian', 'Cartesian Coordinate', 'fusion_rifle', 'energy', 'solar', 'f_fr_precision'),
    l('lg_null_composure', 'Null Composure', 'fusion_rifle', 'energy', 'void', 'f_fr_rapid'),
    l('lg_succession', 'Succession', 'sniper_rifle', 'kinetic', 'kinetic', 'f_sr_aggressive'),
    l('lg_praedyths_revenge', 'Praedyth’s Revenge', 'sniper_rifle', 'energy', 'void', 'f_sr_rapid'),
    l('lg_adjudicator', 'Adjudicator', 'submachine_gun', 'kinetic', 'stasis', 'f_smg_adaptive'),
    l('lg_forbearance', 'Forbearance', 'breech_gl', 'energy', 'arc', 'f_bgl_wave'),
    l('lg_wilderflight', 'Wilderflight', 'breech_gl', 'energy', 'void', 'f_bgl_double'),
    l('lg_sunshot_gl', 'Explosive Personality', 'breech_gl', 'energy', 'stasis', 'f_bgl_lightweight'),
    l('lg_veiled_threat', 'Veiled Threat', 'breech_gl', 'energy', 'strand', 'f_bgl_area'),
    l('lg_ikelos_sniper', 'IKELOS_SR_v1.0.3', 'sniper_rifle', 'energy', 'solar', 'f_sr_adaptive'),
    l('lg_lubrae', 'Lubrae’s Ruin', 'glaive', 'energy', 'solar', 'f_gl_adaptive'),
    l('lg_judgment_of_kelgorath', 'Judgment of Kelgorath', 'glaive', 'kinetic', 'stasis', 'f_gl_adaptive'),

    /* Heavy */
    l('lg_apex_predator', 'Apex Predator', 'rocket_launcher', 'power', 'solar', 'f_rl_aggressive'),
    l('lg_hezen_vengeance', 'Hezen Vengeance', 'rocket_launcher', 'power', 'solar', 'f_rl_precision'),
    l('lg_cold_comfort', 'Cold Comfort', 'rocket_launcher', 'power', 'stasis', 'f_rl_aggressive'),
    l('lg_bump_in_the_night', 'Bump in the Night', 'rocket_launcher', 'power', 'void', 'f_rl_high_impact'),
    l('lg_dragons_hand', 'Song of Ir Yût', 'machine_gun', 'power', 'void', 'f_mg_adaptive'),
    l('lg_commemoration', 'Commemoration', 'machine_gun', 'power', 'void', 'f_mg_adaptive'),
    l('lg_retrofit_escapade', 'Retrofit Escapade', 'machine_gun', 'power', 'void', 'f_mg_adaptive'),
    l('lg_hammerhead', 'Hammerhead', 'machine_gun', 'power', 'void', 'f_mg_rapid'),
    l('lg_falling_guillotine', 'Falling Guillotine', 'sword', 'power', 'void', 'f_sw_vortex'),
    l('lg_the_other_half', 'The Other Half', 'sword', 'power', 'arc', 'f_sw_lightweight'),
    l('lg_cathedral', 'Cataphract GL3', 'heavy_gl', 'power', 'solar', 'f_hgl_adaptive'),
    l('lg_tarnation', 'Tarnation', 'heavy_gl', 'power', 'void', 'f_hgl_adaptive'),
    l('lg_taipan', 'Taipan-4fr', 'linear_fusion', 'power', 'void', 'f_lf_precision'),
    l('lg_reeds_regret', 'Reed’s Regret', 'linear_fusion', 'power', 'stasis', 'f_lf_aggressive'),

    /* --- second pass: filling out the thinner weapon types --- */
    l('lg_midnight_coup', 'Midnight Coup', 'hand_cannon', 'kinetic', 'kinetic', 'f_hc_adaptive'),
    l('lg_palindrome', 'The Palindrome', 'hand_cannon', 'kinetic', 'stasis', 'f_hc_adaptive'),
    l('lg_sunshot_hc', 'Nullify', 'hand_cannon', 'energy', 'void', 'f_hc_precision'),
    l('lg_summoner', 'The Summoner', 'auto_rifle', 'energy', 'solar', 'f_ar_adaptive'),
    l('lg_rufus_fury', 'Rufus’s Fury', 'auto_rifle', 'energy', 'strand', 'f_ar_rapid'),
    l('lg_abyss_defiant', 'Abyss Defiant', 'auto_rifle', 'kinetic', 'kinetic', 'f_ar_high_impact'),
    l('lg_multimach', 'Multimach CCX', 'submachine_gun', 'energy', 'arc', 'f_smg_lightweight'),
    l('lg_funnelweb', 'Funnelweb', 'submachine_gun', 'energy', 'void', 'f_smg_adaptive'),
    l('lg_tarnished_gold', 'Cataclysmic', 'linear_fusion', 'power', 'solar', 'f_lf_precision'),
    l('lg_doom_of_chelchis', 'Doom of Chelchis', 'scout_rifle', 'energy', 'void', 'f_sc_precision'),
    l('lg_nightwatch', 'Night Watch', 'scout_rifle', 'kinetic', 'kinetic', 'f_sc_precision'),
    l('lg_zealots_reward', 'Zealot’s Reward', 'fusion_rifle', 'energy', 'solar', 'f_fr_precision'),
    l('lg_deliverance', 'Deliverance', 'fusion_rifle', 'kinetic', 'stasis', 'f_fr_rapid'),
    l('lg_perfect_paradox', 'Perfect Paradox', 'shotgun', 'kinetic', 'kinetic', 'f_sg_lightweight'),
    l('lg_ikelos_sg', 'IKELOS_SG_v1.0.3', 'shotgun', 'energy', 'solar', 'f_sg_aggressive'),
    l('lg_heritage', 'Heritage', 'shotgun', 'kinetic', 'kinetic', 'f_sg_precision'),
    l('lg_fractethyst', 'Fractethyst', 'shotgun', 'kinetic', 'stasis', 'f_sg_aggressive'),
    l('lg_beloved', 'Beloved', 'sniper_rifle', 'energy', 'solar', 'f_sr_adaptive'),
    l('lg_frozen_orbit', 'Frozen Orbit', 'sniper_rifle', 'kinetic', 'kinetic', 'f_sr_rapid'),
    l('lg_cloudstrike_leg', 'Doomed Petitioner II', 'sniper_rifle', 'kinetic', 'stasis', 'f_sr_aggressive'),
    l('lg_le_devourer', 'Ecliptic Distaff', 'bow', 'kinetic', 'kinetic', 'f_bow_precision'),
    l('lg_biting_winds', 'Biting Winds', 'bow', 'kinetic', 'kinetic', 'f_bow_lightweight'),
    l('lg_point_of_the_stag', 'Point of the Stag', 'bow', 'energy', 'arc', 'f_bow_precision'),
    l('lg_vantage_point', 'Vantage Point', 'pulse_rifle', 'kinetic', 'kinetic', 'f_pr_lightweight'),
    l('lg_disparity', 'Disparity', 'pulse_rifle', 'kinetic', 'stasis', 'f_pr_high_impact'),
    l('lg_syncopation', 'Syncopation-53', 'pulse_rifle', 'kinetic', 'kinetic', 'f_pr_aggressive'),
    l('lg_deicide', 'Deicide', 'glaive', 'energy', 'arc', 'f_gl_adaptive'),
    l('lg_vexcalibur_leg', 'Unending Vigil', 'glaive', 'energy', 'void', 'f_gl_adaptive'),
    l('lg_edge_transit', 'Edge Transit', 'heavy_gl', 'power', 'void', 'f_hgl_adaptive'),
    l('lg_ammit_gl', 'Regnant', 'heavy_gl', 'power', 'solar', 'f_hgl_adaptive'),
    l('lg_bequest', 'Bequest', 'sword', 'power', 'solar', 'f_sw_caster'),
    l('lg_goldtusk', 'Goldtusk', 'sword', 'power', 'arc', 'f_sw_lightweight'),
    l('lg_forensic_nightmare', 'Forensic Nightmare', 'machine_gun', 'power', 'strand', 'f_mg_adaptive'),
    l('lg_thunderlord_leg', 'Corrective Measure', 'machine_gun', 'power', 'arc', 'f_mg_adaptive'),
    l('lg_dragonfly_rl', 'Palmyra-B', 'rocket_launcher', 'power', 'arc', 'f_rl_adaptive'),
    l('lg_the_hothead', 'Hothead', 'rocket_launcher', 'power', 'solar', 'f_rl_adaptive'),
    l('lg_lost_signal_gl', 'Circular Logic', 'breech_gl', 'energy', 'strand', 'f_bgl_lightweight'),
    l('lg_drang', 'Drang', 'sidearm', 'kinetic', 'kinetic', 'f_sa_adaptive'),
    l('lg_traveler_chosen_leg', 'Aisha’s Care', 'sidearm', 'energy', 'void', 'f_sa_adaptive')
  ];

  /* --------------------------------------------------------------- */

  S.weaponById = {};
  S.weapons.forEach(function (x) {
    // Power-slot weapons always draw Heavy ammo regardless of their frame
    // type, and the rule runs the other way too: nothing outside the Power
    // slot draws Heavy. A Linear Fusion or Grenade Launcher sitting in the
    // Kinetic or Energy slot is a Special-ammo one, which is what the game
    // does with Arbalest and Lorentz Driver.
    if (!x.ammo) {
      var typeAmmo = D2.game.weaponTypeById[x.type].ammo;
      if (x.slot === 'power') x.ammo = 'heavy';
      else x.ammo = typeAmmo === 'heavy' ? 'special' : typeAmmo;
    }
    S.weaponById[x.id] = x;
  });

  // Which slots a weapon may legally occupy. Curated entries declare their own
  // slot; manifest-imported items that do not get the general rule --
  // Kinetic slot takes Kinetic, Stasis and Strand damage, Power takes Heavy
  // ammo, and everything else goes Energy.
  S.slotsForWeapon = function (weapon) {
    if (weapon.slot) return [weapon.slot];
    if (weapon.ammo === 'heavy') return ['power'];
    if (weapon.element === 'kinetic' || weapon.element === 'stasis' || weapon.element === 'strand') {
      return ['kinetic'];
    }
    return ['energy'];
  };

  S.weaponsForSlot = function (slotId, pool) {
    return (pool || S.weapons).filter(function (x) {
      return S.slotsForWeapon(x).indexOf(slotId) !== -1;
    });
  };
})(window.D2);
