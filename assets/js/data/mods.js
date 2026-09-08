/* Armor mods.

   Socket model: each armor piece has three mod sockets sharing a 10-point
   energy budget, plus an optional Artifice socket that costs no energy and
   only accepts +3 stat mods. A mod fits a socket if its category is `general`
   or matches that piece's armor slot.

   Stat mods are the ones the calculator cares about: they carry a `stats`
   object that feeds straight into the six Armor 3.0 totals. */
(function (D2) {
  'use strict';
  var S = D2.data;
  var G = D2.game;

  var mods = [];

  function m(id, name, cat, cost, desc, stats) {
    var o = { id: id, name: name, cat: cat, cost: cost, desc: desc };
    if (stats) o.stats = stats;
    mods.push(o);
    return o;
  }

  /* ---------------- General: Armor 3.0 stat mods ---------------- */
  /* These are the mods that move the six stats. Minor: +5 for 1 energy.
     Standard: +10 for 3 energy. Artifice: +3 for free, artifice socket only. */

  G.stats.forEach(function (st) {
    var minor = {}, major = {}, art = {};
    minor[st.id] = 5; major[st.id] = 10; art[st.id] = 3;

    m('mod_minor_' + st.id, 'Minor ' + st.name + ' Mod', 'general', 1,
      'Increases ' + st.name + ' by 5.', minor);
    m('mod_' + st.id, st.name + ' Mod', 'general', 3,
      'Increases ' + st.name + ' by 10.', major);
    m('mod_art_' + st.id, 'Artifice ' + st.name + ' Mod', 'artifice', 0,
      'Artifice armor only. Increases ' + st.name + ' by 3.', art);
  });

  /* ---------------- Helmet ---------------- */
  m('mod_ashes_to_assets', 'Ashes to Assets',   'helmet', 3, 'Grenade final blows grant bonus Super energy.');
  m('mod_hands_on',        'Hands-On',          'helmet', 3, 'Powered melee final blows grant bonus Super energy.');
  m('mod_dynamo',          'Dynamo',            'helmet', 3, 'Using your class ability near combatants grants Super energy.');
  m('mod_heavy_finder',    'Heavy Ammo Finder', 'helmet', 1, 'Increases the chance Heavy ammo drops from combatants.');
  m('mod_special_finder',  'Special Ammo Finder', 'helmet', 1, 'Increases the chance Special ammo drops from combatants.');
  m('mod_kinetic_siphon',  'Kinetic Siphon',    'helmet', 3, 'Rapid Kinetic weapon final blows create an Orb of Power.');
  m('mod_solar_siphon',    'Solar Siphon',      'helmet', 3, 'Rapid Solar weapon final blows create an Orb of Power.');
  m('mod_arc_siphon',      'Arc Siphon',        'helmet', 3, 'Rapid Arc weapon final blows create an Orb of Power.');
  m('mod_void_siphon',     'Void Siphon',       'helmet', 3, 'Rapid Void weapon final blows create an Orb of Power.');
  m('mod_stasis_siphon',   'Stasis Siphon',     'helmet', 3, 'Rapid Stasis weapon final blows create an Orb of Power.');
  m('mod_strand_siphon',   'Strand Siphon',     'helmet', 3, 'Rapid Strand weapon final blows create an Orb of Power.');
  m('mod_harmonic_siphon', 'Harmonic Siphon',   'helmet', 1, 'Rapid final blows with weapons matching your subclass create an Orb of Power.');

  /* ---------------- Gauntlets ---------------- */
  m('mod_heavy_handed',    'Heavy Handed',      'gauntlets', 3, 'Powered melee final blows refund melee energy.');
  m('mod_impact_induction', 'Impact Induction', 'gauntlets', 2, 'Dealing melee damage reduces your grenade cooldown.');
  m('mod_momentum_transfer', 'Momentum Transfer', 'gauntlets', 2, 'Dealing grenade damage reduces your melee cooldown.');
  m('mod_focusing_strike', 'Focusing Strike',   'gauntlets', 3, 'Dealing melee damage grants class ability energy.');
  m('mod_bolstering_det',  'Bolstering Detonation', 'gauntlets', 3, 'Dealing grenade damage grants class ability energy.');
  m('mod_firepower',       'Firepower',         'gauntlets', 3, 'Grenade final blows create an Orb of Power.');
  m('mod_grenade_kick',    'Grenade Kickstart', 'gauntlets', 4, 'Using your grenade at low energy returns a portion of its cost.');
  m('mod_melee_kick',      'Melee Kickstart',   'gauntlets', 4, 'Using your melee at low energy returns a portion of its cost.');
  m('mod_fastball',        'Fastball',          'gauntlets', 1, 'Increases grenade throw distance.');
  m('mod_kinetic_loader',  'Kinetic Loader',    'gauntlets', 3, 'Increases reload speed of Kinetic weapons.');
  m('mod_solar_loader',    'Solar Loader',      'gauntlets', 3, 'Increases reload speed of Solar weapons.');
  m('mod_arc_loader',      'Arc Loader',        'gauntlets', 3, 'Increases reload speed of Arc weapons.');
  m('mod_void_loader',     'Void Loader',       'gauntlets', 3, 'Increases reload speed of Void weapons.');
  m('mod_stasis_loader',   'Stasis Loader',     'gauntlets', 3, 'Increases reload speed of Stasis weapons.');
  m('mod_strand_loader',   'Strand Loader',     'gauntlets', 3, 'Increases reload speed of Strand weapons.');
  m('mod_harmonic_loader', 'Harmonic Loader',   'gauntlets', 1, 'Increases reload speed of weapons matching your subclass element.');
  m('mod_kinetic_dex',     'Kinetic Dexterity', 'gauntlets', 2, 'Faster ready and stow for Kinetic weapons.');
  m('mod_harmonic_dex',    'Harmonic Dexterity', 'gauntlets', 1, 'Faster ready and stow for weapons matching your subclass element.');

  /* ---------------- Chest ---------------- */
  m('mod_charged_up',      'Charged Up',        'chest', 3, 'Increases your maximum Armor Charge by one.');
  m('mod_concussive',      'Concussive Dampener', 'chest', 3, 'Reduces incoming area-of-effect damage.');
  m('mod_sniper_resist',   'Sniper Damage Resistance', 'chest', 3, 'Reduces incoming damage from combatant snipers.');
  m('mod_melee_resist',    'Melee Damage Resistance', 'chest', 3, 'Reduces incoming melee damage from combatants.');
  m('mod_arc_resist',      'Arc Resistance',    'chest', 2, 'Reduces incoming Arc damage.');
  m('mod_solar_resist',    'Solar Resistance',  'chest', 2, 'Reduces incoming Solar damage.');
  m('mod_void_resist',     'Void Resistance',   'chest', 2, 'Reduces incoming Void damage.');
  m('mod_stasis_resist',   'Stasis Resistance', 'chest', 2, 'Reduces incoming Stasis damage.');
  m('mod_strand_resist',   'Strand Resistance', 'chest', 2, 'Reduces incoming Strand damage.');
  m('mod_harmonic_resist', 'Harmonic Resistance', 'chest', 1, 'Reduces incoming damage matching your subclass element.');
  m('mod_unflinch_kinetic', 'Unflinching Kinetic Aim', 'chest', 3, 'Reduces flinch while aiming Kinetic weapons.');
  m('mod_unflinch_solar',  'Unflinching Solar Aim', 'chest', 3, 'Reduces flinch while aiming Solar weapons.');
  m('mod_unflinch_arc',    'Unflinching Arc Aim', 'chest', 3, 'Reduces flinch while aiming Arc weapons.');
  m('mod_unflinch_void',   'Unflinching Void Aim', 'chest', 3, 'Reduces flinch while aiming Void weapons.');
  m('mod_unflinch_stasis', 'Unflinching Stasis Aim', 'chest', 3, 'Reduces flinch while aiming Stasis weapons.');
  m('mod_unflinch_strand', 'Unflinching Strand Aim', 'chest', 3, 'Reduces flinch while aiming Strand weapons.');
  m('mod_unflinch_harmonic', 'Harmonic Unflinching Aim', 'chest', 1, 'Reduces flinch with weapons matching your subclass element.');
  m('mod_emergency_reinf', 'Emergency Reinforcement', 'chest', 4, 'Grants strong damage resistance while critically wounded.');

  /* ---------------- Legs ---------------- */
  m('mod_recuperation',    'Recuperation',      'legs', 1, 'Picking up an Orb of Power starts health regeneration.');
  m('mod_better_already',  'Better Already',    'legs', 3, 'Picking up an Orb of Power grants a burst of healing.');
  m('mod_absolution',      'Absolution',        'legs', 3, 'Picking up an Orb of Power reduces all ability cooldowns.');
  m('mod_innervation',     'Innervation',       'legs', 3, 'Picking up an Orb of Power grants grenade energy.');
  m('mod_invigoration',    'Invigoration',      'legs', 3, 'Picking up an Orb of Power grants melee energy.');
  m('mod_insulation',      'Insulation',        'legs', 3, 'Picking up an Orb of Power grants class ability energy.');
  m('mod_orbs_restoration', 'Orbs of Restoration', 'legs', 2, 'Gain health when picking up an Orb of Power at low health.');
  m('mod_kinetic_surge',   'Kinetic Surge',     'legs', 3, 'While you have Armor Charge, Kinetic weapons deal bonus damage.');
  m('mod_solar_surge',     'Solar Surge',       'legs', 3, 'While you have Armor Charge, Solar weapons deal bonus damage.');
  m('mod_arc_surge',       'Arc Surge',         'legs', 3, 'While you have Armor Charge, Arc weapons deal bonus damage.');
  m('mod_void_surge',      'Void Surge',        'legs', 3, 'While you have Armor Charge, Void weapons deal bonus damage.');
  m('mod_stasis_surge',    'Stasis Surge',      'legs', 3, 'While you have Armor Charge, Stasis weapons deal bonus damage.');
  m('mod_strand_surge',    'Strand Surge',      'legs', 3, 'While you have Armor Charge, Strand weapons deal bonus damage.');
  m('mod_harmonic_surge',  'Harmonic Surge',    'legs', 1, 'While you have Armor Charge, weapons matching your subclass deal bonus damage.');

  /* ---------------- Class item ---------------- */
  m('mod_bomber',          'Bomber',            'classitem', 3, 'Using your class ability reduces your grenade cooldown.');
  m('mod_outreach',        'Outreach',          'classitem', 3, 'Using your class ability reduces your melee cooldown.');
  m('mod_distribution',    'Distribution',      'classitem', 4, 'Using your class ability near combatants reduces all ability cooldowns.');
  m('mod_powerful_attract', 'Powerful Attraction', 'classitem', 1, 'Using your class ability pulls in nearby Orbs of Power.');
  m('mod_time_dilation',   'Time Dilation',     'classitem', 3, 'Increases the duration of your Armor Charge.');
  m('mod_reaper',          'Reaper',            'classitem', 3, 'After using your class ability, your next weapon final blow creates an Orb of Power.');
  m('mod_utility_kick',    'Utility Kickstart', 'classitem', 4, 'Using your class ability at low energy returns a portion of its cost.');
  m('mod_stacks_on_stacks', 'Stacks on Stacks', 'classitem', 4, 'Picking up an Orb of Power grants an additional stack of Armor Charge.');
  m('mod_special_finisher', 'Special Finisher', 'classitem', 1, 'Finishers with full Super energy consume it and generate Special ammo.');
  m('mod_heavy_finisher',  'Heavy Finisher',    'classitem', 4, 'Finishers with full Super energy consume it and generate Heavy ammo.');
  m('mod_one_two_finisher', 'One-Two Finisher', 'classitem', 1, 'Finishers grant a burst of Special ammo and increased reload speed.');

  S.mods = mods;
  S.modById = {};
  mods.forEach(function (x) { S.modById[x.id] = x; });

  /* A mod fits a piece if it is general, artifice-only in the artifice socket,
     or matches that piece's armor slot.

     Draws from the manifest pool when a sync has run, so every armor mod in the
     game is selectable; falls back to the curated list otherwise. Manifest mods
     arrive with their stat contributions already mapped into the six Armor 3.0
     stats, so an imported stat mod moves the totals exactly like a curated one. */
  S.modsForSlot = function (slotId, isArtificeSocket) {
    var pool = (D2.manifest && D2.manifest.modPool) ? D2.manifest.modPool() : mods;
    return pool.filter(function (mod) {
      if (isArtificeSocket) return mod.cat === 'artifice';
      if (mod.cat === 'artifice') return false;
      return mod.cat === 'general' || mod.cat === slotId;
    });
  };

  S.MOD_SOCKETS = 3;

  /* ---------------- Seasonal artifact ----------------
     The artifact resets every season, so shipping a fixed list would be wrong
     within weeks. You name your own artifact perks here and they persist and
     appear in the build summary. Manifest sync pulls the live artifact. */
  S.artifactIsUserDefined = true;
})(window.D2);
