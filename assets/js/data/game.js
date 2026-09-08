/* Structural game constants: classes, elements, slots, rarities, Armor 3.0 stats. */
(function (D2) {
  'use strict';
  var G = D2.game = {};

  /* ---------------- Guardian classes ---------------- */

  G.classes = [
    { id: 'titan',   name: 'Titan',   tagline: 'Disciplined. Unbreakable.', classAbilityLabel: 'Barricade', movementLabel: 'Lift' },
    { id: 'hunter',  name: 'Hunter',  tagline: 'Reckless. Precise.',        classAbilityLabel: 'Dodge',     movementLabel: 'Jump' },
    { id: 'warlock', name: 'Warlock', tagline: 'Curious. Devastating.',     classAbilityLabel: 'Rift',      movementLabel: 'Glide' }
  ];
  G.classById = {};
  G.classes.forEach(function (c) { G.classById[c.id] = c; });

  /* ---------------- Damage types / elements ---------------- */

  G.elements = [
    { id: 'kinetic',   name: 'Kinetic',   short: 'KIN', color: '#D6D2C8' },
    { id: 'solar',     name: 'Solar',     short: 'SOL', color: '#F0631E' },
    { id: 'arc',       name: 'Arc',       short: 'ARC', color: '#79D5EC' },
    { id: 'void',      name: 'Void',      short: 'VOI', color: '#B18CD9' },
    { id: 'stasis',    name: 'Stasis',    short: 'STA', color: '#5B92FF' },
    { id: 'strand',    name: 'Strand',    short: 'STR', color: '#35CE6B' },
    { id: 'prismatic', name: 'Prismatic', short: 'PRS', color: '#E3A9E0' }
  ];

  // Subclass elements only. Kinetic is a weapon damage type, never a subclass.
  G.subclassElements = ['solar', 'arc', 'void', 'stasis', 'strand', 'prismatic'];

  G.elementById = {};
  G.elements.forEach(function (e) { G.elementById[e.id] = e; });

  /* ---------------- Rarity ---------------- */

  G.rarities = [
    { id: 'exotic',    name: 'Exotic',    color: '#CEAE33' },
    { id: 'legendary', name: 'Legendary', color: '#B08BC8' },
    { id: 'rare',      name: 'Rare',      color: '#5076A3' },
    { id: 'uncommon',  name: 'Uncommon',  color: '#4B8C5A' },
    { id: 'common',    name: 'Common',    color: '#C3BCB4' }
  ];
  G.rarityById = {};
  G.rarities.forEach(function (r) { G.rarityById[r.id] = r; });

  /* ---------------- Weapons ---------------- */

  G.weaponSlots = [
    { id: 'kinetic', name: 'Kinetic', hint: 'Kinetic, Stasis and Strand weapons' },
    { id: 'energy',  name: 'Energy',  hint: 'Arc, Solar and Void weapons' },
    { id: 'power',   name: 'Power',   hint: 'Heavy ammo only' }
  ];
  G.weaponSlotById = {};
  G.weaponSlots.forEach(function (s) { G.weaponSlotById[s.id] = s; });

  G.ammoTypes = [
    { id: 'primary', name: 'Primary', color: '#D6D2C8' },
    { id: 'special', name: 'Special', color: '#7FE07F' },
    { id: 'heavy',   name: 'Heavy',   color: '#B47CE0' }
  ];
  G.ammoById = {};
  G.ammoTypes.forEach(function (a) { G.ammoById[a.id] = a; });

  // Every weapon type in Destiny 2, with the ammo it uses by default.
  G.weaponTypes = [
    { id: 'auto_rifle',      name: 'Auto Rifle',            ammo: 'primary' },
    { id: 'hand_cannon',     name: 'Hand Cannon',           ammo: 'primary' },
    { id: 'pulse_rifle',     name: 'Pulse Rifle',           ammo: 'primary' },
    { id: 'scout_rifle',     name: 'Scout Rifle',           ammo: 'primary' },
    { id: 'submachine_gun',  name: 'Submachine Gun',        ammo: 'primary' },
    { id: 'sidearm',         name: 'Sidearm',               ammo: 'primary' },
    { id: 'bow',             name: 'Combat Bow',            ammo: 'primary' },
    { id: 'shotgun',         name: 'Shotgun',               ammo: 'special' },
    { id: 'sniper_rifle',    name: 'Sniper Rifle',          ammo: 'special' },
    { id: 'fusion_rifle',    name: 'Fusion Rifle',          ammo: 'special' },
    { id: 'breech_gl',       name: 'Grenade Launcher',      ammo: 'special', note: 'Breech-loaded' },
    { id: 'trace_rifle',     name: 'Trace Rifle',           ammo: 'special' },
    { id: 'glaive',          name: 'Glaive',                ammo: 'special' },
    { id: 'machine_gun',     name: 'Machine Gun',           ammo: 'heavy' },
    { id: 'rocket_launcher', name: 'Rocket Launcher',       ammo: 'heavy' },
    { id: 'sword',           name: 'Sword',                 ammo: 'heavy' },
    { id: 'linear_fusion',   name: 'Linear Fusion Rifle',   ammo: 'heavy' },
    { id: 'heavy_gl',        name: 'Heavy Grenade Launcher', ammo: 'heavy', note: 'Drum-loaded' }
  ];
  G.weaponTypeById = {};
  G.weaponTypes.forEach(function (t) { G.weaponTypeById[t.id] = t; });

  /* ---------------- Armor ---------------- */

  G.armorSlots = [
    { id: 'helmet',    name: 'Helmet' },
    { id: 'gauntlets', name: 'Gauntlets' },
    { id: 'chest',     name: 'Chest Armor' },
    { id: 'legs',      name: 'Leg Armor' },
    { id: 'classitem', name: 'Class Item' }
  ];
  G.armorSlotById = {};
  G.armorSlots.forEach(function (s) { G.armorSlotById[s.id] = s; });

  G.ARMOR_ENERGY = 10; // energy each armor piece has to spend on mods

  /* ---------------- Armor 3.0 stats ----------------
     Six stats, 0-200 each. Below 100 is regeneration and capacity; above 100
     converts into an offensive or defensive bonus. The effect copy below is
     descriptive, not a damage table -- exact multipliers move with balance
     patches. The arithmetic this app performs (totals, per-source attribution,
     distance to breakpoints) is exact. ------------------------------------- */

  G.stats = [
    {
      id: 'weapons', name: 'Weapons', abbr: 'WPN',
      under: 'Increases weapon damage and ammo reserves across all three slots.',
      over: 'Keeps scaling weapon damage past 100 with no cap on usefulness.',
      hint: 'Every build wants some.'
    },
    {
      id: 'health', name: 'Health', abbr: 'HTH',
      under: 'Increases shield capacity and shortens the delay before recovery starts.',
      over: 'Converts into flat incoming damage resistance.',
      hint: 'The endgame survivability stat.'
    },
    {
      id: 'class', name: 'Class', abbr: 'CLS',
      under: 'Reduces class ability cooldown -- Barricade, Dodge, Rift.',
      over: 'Extends the duration and strength of your class ability.',
      hint: 'Feeds anything keyed off your class ability.'
    },
    {
      id: 'grenade', name: 'Grenade', abbr: 'GRN',
      under: 'Reduces grenade cooldown.',
      over: 'Increases grenade damage.',
      hint: 'Grenade-loop builds live here.'
    },
    {
      id: 'super', name: 'Super', abbr: 'SUP',
      under: 'Reduces Super cooldown.',
      over: 'Increases Super damage.',
      hint: 'Damage phases and roaming Supers.'
    },
    {
      id: 'melee', name: 'Melee', abbr: 'MLE',
      under: 'Reduces melee cooldown.',
      over: 'Increases melee damage.',
      hint: 'Powered-melee and one-two punch builds.'
    }
  ];
  G.statIds = G.stats.map(function (s) { return s.id; });
  G.statById = {};
  G.stats.forEach(function (s) { G.statById[s.id] = s; });

  G.STAT_MAX = 200;
  G.STAT_PIVOT = 100; // where "under" behaviour flips to "over" behaviour

  G.emptyStats = function () {
    var o = {};
    G.statIds.forEach(function (id) { o[id] = 0; });
    return o;
  };

  /* ---------------- Armor archetypes ----------------
     Each archetype names a primary and a tertiary stat; the secondary is rolled,
     so you pick it here. Point spreads live in G.tierTable and are editable at
     runtime, so a balance pass never silently makes the calculator wrong. */

  G.archetypes = [
    { id: 'gunner',     name: 'Gunner',     primary: 'weapons', tertiary: 'grenade', blurb: 'Weapon damage first, grenade support.' },
    { id: 'bulwark',    name: 'Bulwark',    primary: 'health',  tertiary: 'class',   blurb: 'Survivability first, class ability support.' },
    { id: 'brawler',    name: 'Brawler',    primary: 'melee',   tertiary: 'health',  blurb: 'Melee first, survivability support.' },
    { id: 'specialist', name: 'Specialist', primary: 'class',   tertiary: 'weapons', blurb: 'Class ability first, weapon support.' },
    { id: 'grenadier',  name: 'Grenadier',  primary: 'grenade', tertiary: 'super',   blurb: 'Grenade first, Super support.' },
    { id: 'paragon',    name: 'Paragon',    primary: 'super',   tertiary: 'melee',   blurb: 'Super first, melee support.' }
  ];
  G.archetypeById = {};
  G.archetypes.forEach(function (a) { G.archetypeById[a.id] = a; });

  G.tierTable = [
    { tier: 1, primary: 18, secondary: 14, tertiary: 11 },
    { tier: 2, primary: 21, secondary: 17, tertiary: 13 },
    { tier: 3, primary: 24, secondary: 19, tertiary: 15 },
    { tier: 4, primary: 27, secondary: 22, tertiary: 17 },
    { tier: 5, primary: 30, secondary: 25, tertiary: 20 }
  ];
  G.MASTERWORK_BONUS = 5; // default, editable from the Stats panel

  G.tierRow = function (tier) {
    for (var i = 0; i < G.tierTable.length; i++) {
      if (G.tierTable[i].tier === tier) return G.tierTable[i];
    }
    return G.tierTable[G.tierTable.length - 1];
  };

  /* ---------------- Library tags ---------------- */

  G.tags = [
    { id: 'pve',       name: 'PvE' },
    { id: 'pvp',       name: 'PvP' },
    { id: 'raid',      name: 'Raid' },
    { id: 'dungeon',   name: 'Dungeon' },
    { id: 'gm',        name: 'Grandmaster' },
    { id: 'trials',    name: 'Trials' },
    { id: 'boss_dps',  name: 'Boss DPS' },
    { id: 'add_clear', name: 'Add Clear' },
    { id: 'survival',  name: 'Survivability' },
    { id: 'solo',      name: 'Solo' }
  ];
  G.tagById = {};
  G.tags.forEach(function (t) { G.tagById[t.id] = t; });
})(window.D2);
