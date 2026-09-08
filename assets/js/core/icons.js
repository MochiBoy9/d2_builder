/* Authored SVG icon set, drawn to read as Destiny 2 rather than as generic UI.

   One grammar: a 24x24 box. Line icons use 1.5 stroke; game marks (classes,
   elements, ammo, weapon silhouettes, armor slots) are solid geometry so they
   survive at 14px in a dense grid. These are original drawings in Bungie's
   visual language -- angular, symmetrical, built from straight cuts -- not
   copies of Bungie's art files. No emoji and no icon font anywhere.

   Naming: element ids, class ids, armor slot ids, weapon type ids and ammo
   type ids all resolve to an icon of the same name, so callers can pass a data
   id straight through. */
(function (D2) {
  'use strict';

  var line = 'fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"';
  var thin = 'fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"';
  var solid = 'fill="currentColor"';

  var paths = {

    /* ================= GUARDIAN CLASS MARKS =================
       The three marks the game stamps on everything you own.
         Titan   -- the hexagon, braced by a bar across its waist.
         Hunter  -- three chevrons, stacked and narrowing downward.
         Warlock -- three triangles overlapped into a pair of wings. */

    titan:
      '<path ' + solid + ' d="M12 1.2 2.6 6.6v10.8l9.4 5.4 9.4-5.4V6.6L12 1.2Zm0 3.1 6.7 3.9v7.6L12 19.7l-6.7-3.9V8.2L12 4.3Z"/>' +
      '<path ' + solid + ' d="M6.4 10.4h11.2v3.2H6.4z"/>',

    hunter:
      '<path ' + solid + ' d="M12 2.2 2.4 8.1l1.5 2.5L12 5.5l8.1 5.1 1.5-2.5L12 2.2Z"/>' +
      '<path ' + solid + ' d="M12 8.9 4.4 13.5l1.5 2.5L12 12.2l6.1 3.8 1.5-2.5L12 8.9Z" opacity=".88"/>' +
      '<path ' + solid + ' d="M12 15.6 6.4 19l1.5 2.5L12 18.9l4.1 2.6 1.5-2.5-5.6-3.4Z" opacity=".76"/>',

    warlock:
      '<path ' + solid + ' d="M12 1.2 9.4 11.4 12 22.8l2.6-11.4L12 1.2Z"/>' +
      '<path ' + solid + ' d="M9.2 8.6 8.4 16.8.7 20.4 9.2 8.6Z"/>' +
      '<path ' + solid + ' d="m14.8 8.6 8.5 11.8-7.7-3.6-.8-8.2Z"/>',

    /* ================= ELEMENTS =================
       Drawn from the subclass diamonds in game: one bold white mark each,
       solid enough to survive being punched out of a coloured plate.
         Solar  -- a single flame with the curl licking off its left edge.
         Arc    -- a discharge: jagged bolts thrown out of a bright core.
         Void   -- the collapsing eye: core, ring, and an outer sweep.
         Stasis -- two crystal shards split along a diagonal fracture.
         Strand -- one thread pulled through its own loop.
         Prism. -- stacked chevrons over two pillars: all five, layered. */

    solar:
      '<path ' + solid + ' d="M12.7 1.3c.4 3.6 2.1 5.9 3.8 8 1.6 2 2.6 3.9 2.6 6.3 0 3.8-3 6.9-6.9 6.9-4 0-7-3-7-6.8 0-2.7 1.1-4.7 2.6-6.6.1 1.7.6 3 1.7 4.1-.7-2.4-.4-4.4.6-6.3 1-1.9 2.2-3.5 2.6-5.6Z"/>',

    arc:
      '<path ' + solid + ' d="M10.3 9.1 11.2 5.8 12.8 1.2l.8 4.8.1 3.1 3.3-.8 2.1.2-1.1 1.9-2.6 1.6 2.3 2.4 3 3.5-4.3-1.5-2.7-1.5-.9 3.3-1.4 1.8-1-2v-3.1l-3.3.8-4.5.9 3.5-3 2.6-1.6-2.3-2.4-.8-2h2.1l2.7 1.5Z"/>',

    'void':
      '<circle ' + solid + ' cx="12" cy="12" r="3.1"/>' +
      '<path ' + solid + ' d="M12 5.4a6.6 6.6 0 1 1 0 13.2 6.6 6.6 0 0 1 0-13.2Zm0 2.2a4.4 4.4 0 1 0 0 8.8 4.4 4.4 0 0 0 0-8.8Z"/>' +
      '<path ' + solid + ' d="M12 1.6a10.4 10.4 0 0 1 10.3 9.1l-2.2.3A8.2 8.2 0 1 0 12 20.2v2.2A10.4 10.4 0 0 1 12 1.6Z"/>',

    stasis:
      '<path ' + solid + ' d="M10.8 2 12.5 8 9.3 12.2l2.9 3.9-1.4 7L2.2 12.6 10.8 2Z"/>' +
      '<path ' + solid + ' d="m13.2 21.9 1.4-6.9-2.9-4 3.1-4.1-1.6-6 8.6 10.5-8.6 10.5Z"/>',

    strand:
      '<g transform="rotate(-38 12 12)">' +
      '<path fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" d="M2.6 21.5c4.3-.9 6.9-4 8.4-7.4 1.3-2.9 1.9-6.2 4.5-7.4 2.4-1.2 4.9.1 5 2.6.1 2.6-2 4.4-4.5 4.4-3.4 0-5.8-2.8-8-5.6C6.6 6.5 5.3 4.6 3.4 3.5"/>' +
      '</g>',

    prismatic:
      '<path ' + solid + ' d="M12 1 1.7 13.1h4.1L12 5.7l6.2 7.4h4.1L12 1Z"/>' +
      '<path ' + solid + ' d="M12 8.8 5.4 16.6h3.5L12 12.8l3.1 3.8h3.5L12 8.8Z" opacity=".8"/>' +
      '<path ' + solid + ' d="M8.2 16.8 9.9 18.2 6 22.8l-1.7-1.4 3.9-4.6Z" opacity=".6"/>' +
      '<path ' + solid + ' d="m15.8 16.8 3.9 4.6-1.7 1.4-3.9-4.6 1.7-1.4Z" opacity=".6"/>',

    kinetic:
      '<path ' + solid + ' d="M12 1.4 2.6 12 12 22.6 21.4 12 12 1.4Zm0 3.3L18.5 12 12 19.3 5.5 12 12 4.7Z"/>' +
      '<path ' + solid + ' d="m12 8 3.6 4-3.6 4-3.6-4L12 8Z"/>',

    /* ================= AMMO =================
       One family, three masses: the brick you pick up off the floor, sitting
       on its plate. Solid, because these are drawn at 11px next to a chip. */

    ammoPrimary:
      '<path ' + solid + ' d="M12 3.4 8.4 8.1v8.6h7.2V8.1L12 3.4Z"/>' +
      '<path ' + solid + ' d="M6.9 18.5h10.2v2.3H6.9z"/>',

    ammoSpecial:
      '<path ' + solid + ' d="m12 2.9 6 6.9-6 6.9-6-6.9 6-6.9Z"/>' +
      '<path ' + solid + ' d="M5.4 18.5h13.2v2.3H5.4z"/>',

    ammoHeavy:
      '<path ' + solid + ' d="M7.4 3.2h9.2l4.2 6.6-4.2 6.6H7.4L3.2 9.8l4.2-6.6Z"/>' +
      '<path ' + solid + ' d="M4.2 18.5h15.6v2.3H4.2z"/>',

    /* ================= ARMOR SLOTS =================
       Read as the five bays of the character sheet, in the order the game
       lists them. Line weight matches the rest of the set; the one solid
       accent in each is the part that tells you which piece it is. */

    // Dome, visor band, cheek guards -- the visor is what makes it read.
    helmet:
      '<path ' + line + ' d="M4.6 12.4a7.4 7.4 0 0 1 14.8 0v3.1a2.1 2.1 0 0 1-2.1 2.1h-1.8l-.8 2.6a1 1 0 0 1-1 .7h-3.4a1 1 0 0 1-1-.7l-.8-2.6H6.7a2.1 2.1 0 0 1-2.1-2.1v-3.1Z"/>' +
      '<path ' + solid + ' d="M6.4 10.8h11.2v3.1H6.4z"/>',

    // A pair of bracers: flared cuff, forearm, knuckle plate.
    gauntlets:
      '<path ' + line + ' d="M3.6 3.4h6.2l-.7 2.9H4.3l-.7-2.9ZM4.7 7.6h4l-.5 7.6H5.2L4.7 7.6Z"/>' +
      '<path ' + line + ' d="M14.2 3.4h6.2l-.7 2.9h-4.8l-.7-2.9ZM15.3 7.6h4l-.5 7.6h-3L15.3 7.6Z"/>' +
      '<path ' + solid + ' d="M4.9 16.6h3.6v4H4.9zM15.5 16.6h3.6v4h-3.6z"/>',

    // Torso plate with the two pauldrons the game always draws on it.
    chest:
      '<path ' + line + ' d="M9.1 3.2h5.8l4.4 3-1.5 3.6-1.7-.9v10.5a1.4 1.4 0 0 1-1.4 1.4H9.3a1.4 1.4 0 0 1-1.4-1.4V8.9l-1.7.9-1.5-3.6 4.4-3Z"/>' +
      '<path ' + solid + ' d="M8.6 10.4h6.8v2.6H8.6z"/>',

    // A pair of greaves, split at the knee, so it cannot read as one vessel.
    legs:
      '<path ' + line + ' d="M4.9 3.3h4.6l-.4 6.5H5.3L4.9 3.3ZM5.5 11.4h3.4l-.4 9.3H5.9l-.4-9.3Z"/>' +
      '<path ' + line + ' d="M14.5 3.3h4.6l-.4 6.5h-3.8l-.4-6.5ZM15.1 11.4h3.4l-.4 9.3h-2.6l-.4-9.3Z"/>' +
      '<path ' + solid + ' d="M5.1 6.2h4.2v2.1H5.1zM14.7 6.2h4.2v2.1h-4.2z"/>',

    // The neutral bay, shown only while no class is chosen.
    classitem:
      '<path ' + line + ' d="M6.2 3.6h11.6v2.8H6.2z"/>' +
      '<path ' + line + ' d="M8.2 7.6h7.6v12.8l-3.8-3.4-3.8 3.4V7.6Z"/>',

    // Titan Mark: belt bar, cloth, torn hem.
    mark_titan:
      '<path ' + solid + ' d="M4.4 3.1h15.2v2.9H4.4z"/>' +
      '<path ' + solid + ' d="M7.1 7h9.8v13.9l-2.45-2.6-2.45 2.6-2.45-2.6L7.1 20.9V7Zm2.2 2.2v6.2l1.35 1.4L12 15.4l1.35 1.4 1.35-1.4V9.2H9.3Z"/>',

    // Hunter Cloak: hood over a cape that widens as it falls.
    mark_hunter:
      '<path ' + solid + ' d="M12 1.8a5 5 0 0 0-5 5v1.1L4.1 21.3h15.8L17 7.9V6.8a5 5 0 0 0-5-5Zm0 2.2a2.8 2.8 0 0 1 2.8 2.8v1.6l2.4 11.1-2.5-2.6-2.7 2.8-2.7-2.8-2.5 2.6L9.2 8.4V6.8A2.8 2.8 0 0 1 12 4Z"/>',

    // Warlock Bond: arm band with the ring hanging off it.
    mark_warlock:
      '<path ' + solid + ' d="M2.6 5.4h18.8v4.4H2.6z"/>' +
      '<path ' + solid + ' d="M10.4 9.8h3.2v2.2h-3.2z"/>' +
      '<path ' + solid + ' d="M12 11.6a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Zm0 2.4a3.1 3.1 0 1 1 0 6.2 3.1 3.1 0 0 1 0-6.2Z"/>',

    /* ================= ABILITIES =================
       The four things on the ability row, plus the three class-specific
       shapes the game gives them. Callers can pass a class id through
       D2.classAbilityIcon / D2.movementIcon to get the right one. */

    grenade:
      '<circle ' + solid + ' cx="12" cy="14.6" r="6.2"/>' +
      '<path ' + solid + ' d="M9.9 5.6h4.2v3.2H9.9z"/>' +
      '<path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" d="M14.1 6.3h3.1a1 1 0 0 1 1 1v3.1"/>',

    melee:
      '<path ' + line + ' d="M6.2 12.4V8.9a1.7 1.7 0 0 1 3.4 0M9.6 8.9V7.2a1.7 1.7 0 0 1 3.4 0v1.7M13 8.4a1.7 1.7 0 0 1 3.4 0v2M16.4 10.6a1.6 1.6 0 0 1 3.2 0v3.6a6.4 6.4 0 0 1-6.4 6.4h-1.6a6 6 0 0 1-6-6v-2.2"/>',

    barricade:
      '<path ' + line + ' d="M8.6 4.6h6.8l3.4 2.4v10.2H5.2V7l3.4-2.4Z"/>' +
      '<path fill="none" stroke="currentColor" stroke-width="1.2" d="M9.7 5.6v11.6M14.3 5.6v11.6"/>' +
      '<path ' + solid + ' d="M3.4 18.6h17.2v2.2H3.4z"/>',

    dodge:
      '<path ' + line + ' d="M9.6 4.2 16.4 12l-6.8 7.8"/>' +
      '<path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" d="M3.4 8.6h3.2M2.2 12h4.4M3.4 15.4h3.2" opacity=".7"/>',

    rift:
      '<ellipse ' + line + ' cx="12" cy="18.4" rx="7.4" ry="2.8"/>' +
      '<path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" d="M12 16V3.6M7.6 16.4V7.2M16.4 16.4V7.2"/>',

    lift:
      '<path ' + solid + ' d="M12 2.6 5.6 10.4h4V16h4.8v-5.6h4L12 2.6Z"/>' +
      '<path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" d="M7.4 18.6h9.2M9.4 21.4h5.2" opacity=".75"/>',

    jump:
      '<path ' + solid + ' d="M12 2.6 6.4 9.4h11.2L12 2.6Z"/>' +
      '<path ' + solid + ' d="M12 11.2 6.4 18h11.2L12 11.2Z" opacity=".7"/>' +
      '<path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" d="M9.4 21h5.2" opacity=".7"/>',

    glide:
      '<path ' + solid + ' d="M12 3.4 7.6 9.8h8.8L12 3.4Z"/>' +
      '<path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" d="M2.6 12.4c3.8 0 6.6 1.8 8.2 4.4M21.4 12.4c-3.8 0-6.6 1.8-8.2 4.4"/>' +
      '<path ' + solid + ' d="M10.9 10.6h2.2v10.8h-2.2z" opacity=".8"/>',

    /* ================= ARMOR 3.0 STATS =================
       Named for the six stat ids, so the stat bar can pass an id straight in.
       Grenade, Super and Melee reuse the ability marks above. */

    weapons:
      '<path ' + solid + ' d="M2.4 9.4h17v2.4h-4.6l-.6 1.7h-2.8l-.5-1.7H7.8v1.5H5.5v-1.5H2.4V9.4Z"/>' +
      '<path ' + solid + ' d="M5.5 11.8h2.3l-1.1 4.9H3.4l2.1-4.9ZM17.2 7.4h2.2v2h-2.2z"/>' +
      '<path ' + solid + ' d="M10.9 13.5h2.8l-.4 3.2h-2l-.4-3.2Z"/>',

    health:
      '<path ' + solid + ' d="M12 1.8 3.6 4.9v6.4c0 5.1 3.3 9.3 8.4 11.1 5.1-1.8 8.4-6 8.4-11.1V4.9L12 1.8Zm0 2.4 6.2 2.3v4.8c0 3.8-2.3 7-6.2 8.6-3.9-1.6-6.2-4.8-6.2-8.6V6.5L12 4.2Z"/>' +
      '<path ' + solid + ' d="M10.7 7.4h2.6v3.3h3.3v2.6h-3.3v3.3h-2.6v-3.3H7.4v-2.6h3.3V7.4Z"/>',

    'class':
      '<circle ' + solid + ' cx="12" cy="17.8" r="4.2"/>' +
      '<path ' + solid + ' d="M12 1.4 6.6 8h10.8L12 1.4Z"/>' +
      '<path ' + solid + ' d="M12 8.4 7.6 13.6h8.8L12 8.4Z" opacity=".7"/>',

    'super':
      '<path ' + solid + ' d="M12 1.2 14.9 9l7.8 2.9-7.8 2.9L12 22.6 9.1 14.8 1.3 11.9 9.1 9 12 1.2Z"/>' +
      '<path ' + solid + ' d="M12 8.4 13.4 11.9 12 15.4 10.6 11.9 12 8.4Z" opacity=".35"/>',

    /* ================= WEAPON SILHOUETTES =================
       Side profiles on a shared baseline so a column of them lines up. */

    auto_rifle:
      '<path ' + solid + ' d="M2.4 9.2h17.4v2.3H14l-.6 1.7h-2.7l-.5-1.7H7.9v1.5H5.6V11.5H2.4V9.2Z"/>' +
      '<path ' + solid + ' d="M5.6 11.5h2.3l-1 4.9H3.6l2-4.9ZM17.6 7.6h2v1.6h-2z"/>' +
      '<path ' + solid + ' d="M10.2 13.2h2.7l-.4 3h-1.9l-.4-3Z"/>',

    hand_cannon:
      '<path ' + solid + ' d="M4.6 8.2h14.6v2.4h-4.4l-.5 1.6H8.3l-.4-1.6H4.6V8.2Z"/>' +
      '<path ' + solid + ' d="M7.9 10.6h3.2l-2.2 6.6H5.1l2.8-6.6Z"/>' +
      '<path ' + solid + ' d="M9.4 9a2.6 2.6 0 1 1 0 5.2 2.6 2.6 0 0 1 0-5.2Zm0 1.6a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"/>',

    pulse_rifle:
      '<path ' + solid + ' d="M2.6 9.4h16.8v2.2h-4.9l-.5 1.6h-2.6l-.5-1.6H7.6v1.4H5.4v-1.4H2.6V9.4Z"/>' +
      '<path ' + solid + ' d="M5.4 11.6h2.2l-1 4.7H3.5l1.9-4.7Z"/>' +
      '<path ' + solid + ' d="M15.6 6.9h1.5v2.5h-1.5zM17.9 6.9h1.5v2.5h-1.5z"/>' +
      '<path ' + solid + ' d="M10.7 13.2h2.6l-.4 3h-1.8l-.4-3Z"/>',

    scout_rifle:
      '<path ' + solid + ' d="M2 9.6h20v2.1h-6.6l-.5 1.6h-2.5l-.5-1.6H7.2v1.3H5v-1.3H2V9.6Z"/>' +
      '<path ' + solid + ' d="M5 11.7h2.2l-1 4.6H3.1L5 11.7Z"/>' +
      '<path ' + solid + ' d="M12.6 6.4h5.2v1.5h-5.2z"/><path ' + solid + ' d="M14.4 7.9h1.6v1.7h-1.6z"/>' +
      '<path ' + solid + ' d="M10.4 13.3h2.5l-.4 3h-1.7l-.4-3Z"/>',

    submachine_gun:
      '<path ' + solid + ' d="M4.4 9h14v2.2h-3.6l-.5 1.6h-2.5l-.5-1.6H9v1.3H6.8V11.2H4.4V9Z"/>' +
      '<path ' + solid + ' d="M6.8 11.2h2.2l-.9 4.4H5.1l1.7-4.4Z"/>' +
      '<path ' + solid + ' d="M11.3 12.8h2.5l-.3 4.4h-1.9l-.3-4.4Z"/>',

    sidearm:
      '<path ' + solid + ' d="M6.4 8.8h11.2v2.3h-3.4l-.5 1.5H9.9l-.4-1.5H6.4V8.8Z"/>' +
      '<path ' + solid + ' d="M9.5 11.1h3l-2 5.9H6.9l2.6-5.9Z"/>',

    bow:
      '<path fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" d="M17.4 2.8a11.6 11.6 0 0 1 0 18.4"/>' +
      '<path fill="none" stroke="currentColor" stroke-width="1.2" d="M17.4 2.8 15.6 12l1.8 9.2"/>' +
      '<path ' + solid + ' d="M3.4 11h12.6v2H3.4z"/>' +
      '<path ' + solid + ' d="m2 12 3.4-2.2v4.4L2 12Z"/>',

    shotgun:
      '<path ' + solid + ' d="M2.6 8.8h16.8v2.4h-4.6l-.5 1.6h-2.6l-.5-1.6H7.8v1.3H5.5v-1.3H2.6V8.8Z"/>' +
      '<path ' + solid + ' d="M5.5 11.2h2.3l-1.1 5.1H3.4l2.1-5.1Z"/>' +
      '<path ' + solid + ' d="M14.8 11.6h4.6v1.6h-4.6z"/>' +
      '<path ' + solid + ' d="M10.6 13.2h2.6l-.4 3h-1.8l-.4-3Z"/>',

    sniper_rifle:
      '<path ' + solid + ' d="M1.8 9.8h20.4v2h-6.4l-.5 1.6h-2.5l-.5-1.6H7v1.3H4.8v-1.3H1.8V9.8Z"/>' +
      '<path ' + solid + ' d="M4.8 11.8H7l-1 4.5H2.9l1.9-4.5Z"/>' +
      '<path ' + solid + ' d="M10 5.6h8.4v1.9H10z"/><path ' + solid + ' d="M13.2 7.5h2v2.3h-2z"/>' +
      '<path ' + solid + ' d="M10.2 13.4h2.5l-.4 2.9h-1.7l-.4-2.9Z"/>',

    fusion_rifle:
      '<path ' + solid + ' d="M3.4 9h15.2v2.4h-4.2l-.5 1.5h-2.6l-.5-1.5H8v1.3H5.8V11.4H3.4V9Z"/>' +
      '<path ' + solid + ' d="M5.8 11.4H8l-1 4.8H3.8l2-4.8Z"/>' +
      '<path ' + solid + ' d="M15 6.2h1.6v2.8H15zM17.4 6.2H19v2.8h-1.6zM12.6 6.2h1.6v2.8h-1.6z"/>',

    trace_rifle:
      '<path ' + solid + ' d="M3 9.2h15.4v2.3h-4.2l-.5 1.6h-2.6l-.5-1.6H7.4v1.4H5.2v-1.4H3V9.2Z"/>' +
      '<path ' + solid + ' d="M5.2 11.5h2.2l-1 4.7H3.3l1.9-4.7Z"/>' +
      '<path ' + solid + ' d="M18.4 9.9h4v.9h-4z"/><path ' + solid + ' d="M18.4 11.1h3v.7h-3z" opacity=".6"/>' +
      '<circle ' + solid + ' cx="15.8" cy="7.6" r="1.6"/>',

    glaive:
      '<path ' + solid + ' d="M18.6 1.8 12.4 8l1.5 1.5 6.2-6.2-1.5-1.5Z"/>' +
      '<path ' + solid + ' d="M20.4 1.4 22 3l-1.9 1.9-1.6-1.6 1.9-1.9Z"/>' +
      '<path ' + solid + ' d="m11.5 8.9 3.6 3.6-9.3 9.3-3.6-3.6 9.3-9.3Zm0 2.9-6.4 6.4 1.5 1.5 6.4-6.4-1.5-1.5Z"/>' +
      '<path ' + solid + ' d="M13.9 6.6 17.4 10l-1.6 1.6-3.5-3.5 1.6-1.5Z"/>',

    machine_gun:
      '<path ' + solid + ' d="M2 9.4h18.4v2.3h-5l-.5 1.6h-2.6l-.5-1.6H7v1.4H4.8v-1.4H2V9.4Z"/>' +
      '<path ' + solid + ' d="M4.8 11.7H7l-1 4.8H2.9l1.9-4.8Z"/>' +
      '<path ' + solid + ' d="M15.4 12.4h4.4l-1 4.1h-4.2l.8-4.1Z"/>' +
      '<path ' + solid + ' d="M17.6 7.4h2.6v2h-2.6z"/>',

    rocket_launcher:
      '<path ' + solid + ' d="M2.6 9.6h13.2v3.2H2.6z"/>' +
      '<path ' + solid + ' d="m15.8 9.6 5.6 1.6-5.6 1.6V9.6Z"/>' +
      '<path ' + solid + ' d="M5.4 12.8h2.4l-1.1 4.4H3.2l2.2-4.4Z"/>' +
      '<path ' + solid + ' d="M8.6 5.6h5.2v3.4H8.6z" opacity=".55"/>' +
      '<path ' + solid + ' d="M2.6 6.9h3.2v2.7H2.6z"/>',

    heavy_gl:
      '<path ' + solid + ' d="M3 9.2h11.6v3H3z"/>' +
      '<path ' + solid + ' d="M14.6 8.4h6.2v4.6h-6.2z"/>' +
      '<circle fill="none" stroke="currentColor" stroke-width="1.4" cx="17.7" cy="10.7" r="1.9"/>' +
      '<path ' + solid + ' d="M5.6 12.2H8l-1.1 4.6H3.4l2.2-4.6Z"/>',

    breech_gl:
      '<path ' + solid + ' d="M3.4 9.4h12.4v2.9H3.4z"/>' +
      '<path ' + solid + ' d="M15.8 8.6h4.8v4.5h-4.8z"/>' +
      '<path ' + solid + ' d="M5.8 12.3h2.4l-1.1 4.4H3.6l2.2-4.4Z"/>' +
      '<circle ' + solid + ' cx="18.2" cy="10.8" r="1.2"/>',

    sword:
      '<path ' + solid + ' d="M17.8 2 8.6 11.2l1.5 1.5L19.3 3.5 17.8 2Z"/>' +
      '<path ' + solid + ' d="M19.4 1.6 22 4.2l-2 .6-1.2-1.2.6-2Z"/>' +
      '<path ' + solid + ' d="m7.7 12.1 4.2 4.2-1.6 1.6-4.2-4.2 1.6-1.6Z"/>' +
      '<path ' + solid + ' d="M2 20.2 5.4 16.8l1.8 1.8L3.8 22 2 20.2Z"/>',

    linear_fusion:
      '<path ' + solid + ' d="M1.8 9.6h16.6v2.2h-4.8l-.5 1.6h-2.6l-.5-1.6H6.4v1.4H4.2v-1.4H1.8V9.6Z"/>' +
      '<path ' + solid + ' d="M4.2 11.8h2.2l-1 4.6H2.3l1.9-4.6Z"/>' +
      '<path ' + solid + ' d="M9.6 5.8h8.8v1.8H9.6z"/><path ' + solid + ' d="M12.6 7.6h1.8v2h-1.8z"/>' +
      '<path ' + solid + ' d="M18.6 9.8h3.6v1.8h-3.6z"/>',

    /* ================= INTERFACE ================= */

    search:  '<circle ' + line + ' cx="10.5" cy="10.5" r="6"/><path ' + line + ' d="m15 15 4.5 4.5"/>',
    close:   '<path ' + line + ' d="m6 6 12 12M18 6 6 18"/>',
    plus:    '<path ' + line + ' d="M12 5v14M5 12h14"/>',
    minus:   '<path ' + line + ' d="M5 12h14"/>',
    check:   '<path ' + line + ' d="m5 12.5 4.5 4.5L19 7"/>',
    chevron: '<path ' + line + ' d="m9 5 7 7-7 7"/>',
    chevronLeft: '<path ' + line + ' d="m15 5-7 7 7 7"/>',
    caret:   '<path ' + line + ' d="m6 9 6 6 6-6"/>',
    copy:    '<rect ' + line + ' x="9" y="9" width="11" height="11" rx="1.5"/><path ' + line + ' d="M15 5.5A1.5 1.5 0 0 0 13.5 4h-8A1.5 1.5 0 0 0 4 5.5v8A1.5 1.5 0 0 0 5.5 15"/>',
    trash:   '<path ' + line + ' d="M4.5 6.5h15M9.5 6.5V4.8a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v1.7M6.5 6.5l.9 12.2a1.5 1.5 0 0 0 1.5 1.4h6.2a1.5 1.5 0 0 0 1.5-1.4l.9-12.2M10.5 10v6.5M13.5 10v6.5"/>',
    download: '<path ' + line + ' d="M12 3.5v11M7.5 10 12 14.5 16.5 10M4.5 18.5v1a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-1"/>',
    upload:  '<path ' + line + ' d="M12 15.5v-11M7.5 9 12 4.5 16.5 9M4.5 18.5v1a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-1"/>',
    settings: '<circle ' + line + ' cx="12" cy="12" r="3"/><path ' + line + ' d="M12 2.8v2.4M12 18.8v2.4M4.5 7.5l2 1.2M17.5 15.3l2 1.2M4.5 16.5l2-1.2M17.5 8.7l2-1.2"/>',
    sync:    '<path ' + line + ' d="M20 11.5a8 8 0 0 0-14.2-5M4 12.5a8 8 0 0 0 14.2 5"/><path ' + line + ' d="M20 4.5v4h-4M4 19.5v-4h4"/>',
    compare: '<path ' + line + ' d="M12 3.5v17M6.5 8 3 13h7L6.5 8ZM17.5 8 14 13h7l-3.5-5Z"/>',
    library: '<rect ' + line + ' x="3.5" y="4.5" width="4.5" height="15" rx="1"/><rect ' + line + ' x="9.75" y="4.5" width="4.5" height="15" rx="1"/><path ' + line + ' d="m16.4 6 3.6 13.2"/>',
    warn:    '<path ' + line + ' d="M12 4.5 2.8 20h18.4L12 4.5Z"/><path ' + line + ' d="M12 10v4M12 17h.01"/>',
    info:    '<circle ' + line + ' cx="12" cy="12" r="8.5"/><path ' + line + ' d="M12 11v5.5M12 7.8h.01"/>',
    edit:    '<path ' + line + ' d="M4.5 19.5h4L19 9a2.1 2.1 0 0 0-3-3L4.5 17.5v2Z"/><path ' + line + ' d="m14.5 7.5 2 2"/>',
    lock:    '<rect ' + line + ' x="5" y="10.5" width="14" height="9.5" rx="1.5"/><path ' + line + ' d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>',
    star:    '<path ' + line + ' d="m12 3.8 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 10l5.9-.9L12 3.8Z"/>',
    grid:    '<rect ' + line + ' x="4" y="4" width="7" height="7" rx="1"/><rect ' + line + ' x="13" y="4" width="7" height="7" rx="1"/><rect ' + line + ' x="4" y="13" width="7" height="7" rx="1"/><rect ' + line + ' x="13" y="13" width="7" height="7" rx="1"/>',
    slot:    '<rect ' + line + ' x="4.5" y="4.5" width="15" height="15" rx="1.5"/><path ' + line + ' d="M9 12h6M12 9v6"/>',
    dot:     '<circle ' + solid + ' cx="12" cy="12" r="3.5"/>',
    arrowUp: '<path ' + line + ' d="M12 19V5M6 11l6-6 6 6"/>',
    arrowRight: '<path ' + line + ' d="M5 12h14M13 6l6 6-6 6"/>',
    filter:  '<path ' + line + ' d="M4 6h16M7 12h10M10 18h4"/>',
    book:    '<path ' + line + ' d="M4 4.5h6a2.5 2.5 0 0 1 2 1.2 2.5 2.5 0 0 1 2-1.2h6v13h-6a2.5 2.5 0 0 0-2 1.2 2.5 2.5 0 0 0-2-1.2H4v-13Z"/><path ' + line + ' d="M12 5.7v13"/>',
    spark:   '<path ' + solid + ' d="M12 2.2 13.6 9l6.8 1.6-6.8 1.6L12 19l-1.6-6.8L3.6 10.6 10.4 9 12 2.2Z"/>',
    shield:  '<path ' + line + ' d="M12 3 5 5.6v5.6c0 4.6 2.8 8 7 9.8 4.2-1.8 7-5.2 7-9.8V5.6L12 3Z"/>',

    /* ---------- subclass structure ---------- */

    aspect:
      '<path ' + solid + ' d="M12 2.4 21.6 12 12 21.6 2.4 12 12 2.4Zm0 3.1L5.5 12l6.5 6.5 6.5-6.5L12 5.5Z"/>' +
      '<path ' + solid + ' d="M12 7.8 16.2 12 12 16.2 7.8 12 12 7.8Z"/>',

    fragment:
      '<path ' + solid + ' d="m12 2.6 8.2 4.7v9.4L12 21.4l-8.2-4.7V7.3L12 2.6Zm0 2.6-6 3.4v6.8l6 3.4 6-3.4V8.6l-6-3.4Z"/>' +
      '<path ' + solid + ' d="m12 8 3.5 2v4L12 16l-3.5-2v-4L12 8Z" opacity=".75"/>',

    energy:  '<path ' + solid + ' d="M13.4 2 5.5 13.6h4.2L8.8 22l7.7-11.7h-4.2L13.4 2Z"/>',

    mod:
      '<path ' + solid + ' d="M4 4h16v16H4V4Zm2 2v12h12V6H6Z"/>' +
      '<path ' + solid + ' d="M8.6 8.6h6.8v6.8H8.6z" opacity=".8"/>',

    masterwork:
      '<path ' + solid + ' d="m12 2.6 4.6 5.2H7.4L12 2.6Z"/>' +
      '<path ' + solid + ' d="m12 9 4.6 5.2H7.4L12 9Z" opacity=".75"/>' +
      '<path ' + solid + ' d="m12 15.4 4.6 5.2H7.4l4.6-5.2Z" opacity=".5"/>',

    catalyst:
      '<path ' + line + ' d="M12 3.4 20.2 8v8L12 20.6 3.8 16V8L12 3.4Z"/>' +
      '<circle ' + solid + ' cx="12" cy="12" r="3.2"/>',

    /* ---------- experience levels ----------
       A three-step meter. The unlit steps stay clearly visible so the icon
       reads as "one of three" rather than as a single stray block. */
    novice:  '<path ' + solid + ' d="M3.5 14h5v7h-5z"/>' +
             '<path ' + solid + ' d="M9.5 9h5v12h-5z" opacity=".28"/>' +
             '<path ' + solid + ' d="M15.5 4h5v17h-5z" opacity=".28"/>',
    adept:   '<path ' + solid + ' d="M3.5 14h5v7h-5z"/>' +
             '<path ' + solid + ' d="M9.5 9h5v12h-5z"/>' +
             '<path ' + solid + ' d="M15.5 4h5v17h-5z" opacity=".28"/>',
    veteran: '<path ' + solid + ' d="M3.5 14h5v7h-5z"/>' +
             '<path ' + solid + ' d="M9.5 9h5v12h-5z"/>' +
             '<path ' + solid + ' d="M15.5 4h5v17h-5z"/>'
  };

  /* Aliases so callers can pass a raw data id straight through. */
  paths.primary = paths.ammoPrimary;
  paths.special = paths.ammoSpecial;
  paths.heavy = paths.ammoHeavy;
  paths.grenade_launcher = paths.breech_gl;
  paths.classAbility = paths['class'];
  paths.movement = paths.jump;

  D2.icon = function (name, opts) {
    var body = paths[name];
    if (!body) return '';
    var o = opts || {};
    var size = o.size || 20;
    var cls = 'ico' + (o.class ? ' ' + o.class : '');
    return '<svg class="' + cls + '" width="' + size + '" height="' + size + '" viewBox="0 0 24 24" ' +
      'aria-hidden="true" focusable="false">' + body + '</svg>';
  };

  /* Class items have a different silhouette per class in the game; use the real
     mark when the class is known and the neutral shape when it is not. */
  D2.classItemIcon = function (classId) {
    return classId && paths['mark_' + classId] ? 'mark_' + classId : 'classitem';
  };

  /* An armor slot icon that knows about the class item special case. */
  D2.armorSlotIcon = function (slotId, classId) {
    return slotId === 'classitem' ? D2.classItemIcon(classId) : slotId;
  };

  /* Barricade, Dodge and Rift are three different shapes in the game, and so
     are Lift, Jump and Glide. Resolve them from the class, and fall back to
     the neutral mark while no class is chosen. */
  var CLASS_ABILITY = { titan: 'barricade', hunter: 'dodge', warlock: 'rift' };
  var MOVEMENT = { titan: 'lift', hunter: 'jump', warlock: 'glide' };

  D2.classAbilityIcon = function (classId) {
    return CLASS_ABILITY[classId] || 'classAbility';
  };
  D2.movementIcon = function (classId) {
    return MOVEMENT[classId] || 'movement';
  };

  D2.iconNames = Object.keys(paths);
  D2.hasIcon = function (n) { return !!paths[n]; };
})(window.D2);
