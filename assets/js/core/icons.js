/* Authored SVG icon set, drawn to read as Destiny 2 rather than as generic UI.

   One grammar: a 24x24 box. Line icons use 1.5 stroke; game marks (classes,
   elements, ammo, weapon silhouettes, armor slots, the six stats) are solid
   geometry so they survive at 14px in a dense grid. These are original drawings
   in Bungie's visual language -- angular, symmetrical, built from straight cuts
   -- not copies of Bungie's art files. No emoji and no icon font anywhere.

   The marks follow the game's own construction where the game has one: the
   Titan hexagon, the Hunter chevron stack and the Warlock wing triangles; a
   flame, a bolt, an eclipsed sphere, a shard cluster and a weave for the
   elements; armour drawn as the piece itself rather than as a pictogram of it;
   and one weapon silhouette per type, built so a Hand Cannon cannot be mistaken
   for a Scout Rifle at 14px.

   Naming: element ids, class ids, armor slot ids, weapon type ids, ammo type
   ids and stat ids all resolve to an icon of the same name, so callers can pass
   a data id straight through. */
(function (D2) {
  'use strict';

  var line = 'fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"';
  var thin = 'fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"';
  var solid = 'fill="currentColor"';

  /* Holes are punched with the even-odd rule rather than by reversing the
     winding of the inner subpath by hand -- the geometry below has enough
     going on without every ring being written twice in opposite directions. */
  var cut = 'fill="currentColor" fill-rule="evenodd"';

  /* An axis-aligned block. Most of the weapon furniture is blocks, and writing
     them as one call keeps the silhouettes readable as silhouettes. */
  function bar(x, y, w, h, o) {
    return '<path ' + solid + ' d="M' + x + ' ' + y + 'h' + w + 'v' + h + 'h-' + w + 'Z"' +
      (o ? ' opacity="' + o + '"' : '') + '/>';
  }

  /* Shared weapon furniture. Every gun is drawn against the same receiver line
     (y 9.4 to 12.0), the same grip and the same magazine well, so a column of
     them lines up and only what actually differs between weapon types --
     barrel, optic, feed -- is drawn per weapon. */
  var STOCK = bar(1.8, 9.4, 3.8, 2.6);
  var GRIP = '<path ' + solid + ' d="M5.6 12h2.9l-1.3 5.3H3.1L5.6 12Z"/>';
  var MAG = '<path ' + solid + ' d="M10.3 12h2.9l-.5 3.4h-1.9l-.5-3.4Z"/>';
  var MAG_LONG = '<path ' + solid + ' d="M10.3 12h2.9l-.4 5.8h-2.1l-.4-5.8Z"/>';

  var paths = {

    /* ================= GUARDIAN CLASS MARKS =================
       The three marks are the game's own construction, and they are the three
       icons most often seen side by side, so they are built to differ in
       silhouette rather than in detail: a hexagon, a stack of chevrons and a
       spread of wings read apart at 14px where three framed diamonds do not.

       Titan   -- the hexagonal crest, banded across the middle.
       Hunter  -- three stacked chevrons.
       Warlock -- three triangles converging to a point: wings. */

    titan:
      '<path ' + cut + ' d="M12 1.7 20.7 6.7v10.6L12 22.3 3.3 17.3V6.7L12 1.7Zm0 2.8L5.7 8.1v7.8L12 19.5l6.3-3.6V8.1L12 4.5Z"/>' +
      '<path ' + solid + ' d="M4.6 10.2h14.8v3.6H4.6z"/>',

    hunter:
      '<path ' + solid + ' d="M3.4 2.8 12 8.7l8.6-5.9v3.1L12 11.8 3.4 5.9V2.8Z"/>' +
      '<path ' + solid + ' d="M3.4 7.8 12 13.7l8.6-5.9v3.1L12 16.8 3.4 10.9V7.8Z"/>' +
      '<path ' + solid + ' d="M3.4 12.8 12 18.7l8.6-5.9v3.1L12 21.8 3.4 15.9v-3.1Z"/>',

    warlock:
      '<path ' + solid + ' d="M12 21.9 8.1 5.1h7.8L12 21.9Z"/>' +
      '<path ' + solid + ' d="M12 21.9 1.7 9.3l4.6-4.4L12 21.9Z" opacity=".78"/>' +
      '<path ' + solid + ' d="M12 21.9 22.3 9.3l-4.6-4.4L12 21.9Z" opacity=".78"/>',

    /* ================= ELEMENTS =================
       Each is the shape the game trains you to read at a glance, and each is
       built from a different primitive so no two collide at 14px: a flame, a
       bolt, an eclipse, a shard cluster, a weave and a cut gem. */

    solar:
      '<path ' + solid + ' d="M13.3 1.2c.2 3.5 3.6 5.4 4.8 8.8 1.6 4.4-1.2 9.3-5.9 10.7 1.3-1.5 1.8-3.1 1.2-4.8-.6-1.8-2.2-3.1-3.4-4.7-.8 1.5-.7 3 0 4.4.8 1.6 1 3.1-.1 4.6-2.9-1.7-4.5-4.4-4.5-7.5 0-5.2 6.9-6.4 7.9-11.5Z"/>',

    arc:
      '<path ' + solid + ' d="M16.2 1.4 4.4 13.6h5.4l-1.8 9L19.6 10.2h-5.5l2.1-8.8Z"/>',

    // Gravity: a sphere with the light eaten out of one side.
    'void':
      '<path ' + cut + ' d="M12 1.6a10.4 10.4 0 1 0 0 20.8 10.4 10.4 0 0 0 0-20.8Zm0 2.3a8.1 8.1 0 1 1 0 16.2 8.1 8.1 0 0 1 0-16.2Z"/>' +
      '<path ' + cut + ' d="M12 6.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Zm3.7-2.4a4.6 4.6 0 1 0 0 9.2 4.6 4.6 0 0 0 0-9.2Z"/>',

    stasis:
      '<path ' + solid + ' d="M12 1.4v20.8L8.9 8.6 12 1.4Z"/>' +
      '<path ' + solid + ' d="M12 1.4 15.1 8.6 12 22.2V1.4Z" opacity=".55"/>' +
      '<path ' + solid + ' d="M6.1 5.4 8.5 10.5 6.6 20.5 4 11.2l2.1-5.8Z" opacity=".82"/>' +
      '<path ' + solid + ' d="M17.9 5.4 20 11.2l-2.6 9.3-1.9-10 2.4-5.1Z" opacity=".82"/>',

    // Two threads twisted into one: the weave, not a lightning-shaped stand-in.
    strand:
      '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M8.4 2.6c0 4.7 7.2 4.7 7.2 9.4s-7.2 4.7-7.2 9.4"/>' +
      '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M15.6 2.6c0 4.7-7.2 4.7-7.2 9.4s7.2 4.7 7.2 9.4"/>',

    // One stone cut into facets, each throwing back a different amount of light.
    prismatic:
      '<path ' + cut + ' d="M12 1.3 22.7 12 12 22.7 1.3 12 12 1.3Zm0 3.3L4.6 12 12 19.4 19.4 12 12 4.6Z"/>' +
      '<path ' + solid + ' d="M12 6.6 17.4 12 12 17.4V6.6Z"/>' +
      '<path ' + solid + ' d="M12 6.6 6.6 12 12 17.4V6.6Z" opacity=".45"/>',

    // No element at all: a round.
    kinetic:
      '<path ' + cut + ' d="M12 1.9 17.6 8.6v11.5H6.4V8.6L12 1.9Zm0 3.4L8.9 9.1v8.4h6.2V9.1L12 5.3Z"/>' +
      '<path ' + solid + ' d="M8.9 12.9h6.2v2.2H8.9z"/>',

    /* ================= AMMO =================
       Three rounds rather than three abstract marks, because the thing the
       colour is telling you is what fits in the gun. */

    ammoPrimary:
      '<path ' + solid + ' d="M12 2.2 9.6 6.9v3.3h4.8V6.9L12 2.2Z"/>' +
      '<path ' + solid + ' d="M9.2 10.6h5.6v7.9H9.2z"/>' +
      '<path ' + solid + ' d="M8.3 18.9h7.4v2.6H8.3z"/>',

    ammoSpecial:
      '<path ' + solid + ' d="M8.4 3.1h7.2v3.4H8.4z"/>' +
      '<path ' + solid + ' d="M7.7 6.9h8.6v10.2H7.7z"/>' +
      '<path ' + solid + ' d="M6.8 17.5h10.4v3.4H6.8z"/>',

    ammoHeavy:
      '<path ' + solid + ' d="M12 1.6 8.9 7.4h6.2L12 1.6Z"/>' +
      '<path ' + solid + ' d="M8.9 7.8h6.2v9.4H8.9z"/>' +
      '<path ' + solid + ' d="M8.9 13.2 5.6 21.2h3.3v-8ZM15.1 13.2l3.3 8h-3.3v-8Z"/>' +
      '<path ' + solid + ' d="M9.3 17.6h5.4l-.9 3.8h-3.6l-.9-3.8Z"/>',

    /* ================= ARMOR SLOTS =================
       Drawn as the armour piece, not as a pictogram of one: the visor slit, the
       pair of vambraces, the split chest plate, the pair of greaves. */

    helmet:
      '<path ' + cut + ' d="M12 2.2c-4.5 0-7.9 3.4-7.9 8v5.5c0 1.3.9 2.2 2.2 2.2h2l.9 2.8c.2.5.6.9 1.2.9h3.2c.6 0 1-.4 1.2-.9l.9-2.8h2c1.3 0 2.2-.9 2.2-2.2v-5.5c0-4.6-3.4-8-7.9-8Zm-5.7 8.1h11.4v3.5H6.3v-3.5Z"/>',

    gauntlets:
      '<path ' + cut + ' d="M1.4 3.8h9.2l-1.4 5.2.9 1.4-1 8.4H3.9l-1-8.4.9-1.4-1.4-5.2Zm2.5 9.6h4.6v2.1H3.9v-2.1Z"/>' +
      '<path ' + cut + ' d="M13.4 3.8h9.2l-1.4 5.2.9 1.4-1 8.4h-4.2l-1-8.4.9-1.4-1.4-5.2Zm2.5 9.6h4.6v2.1h-4.6v-2.1Z"/>',

    chest:
      '<path ' + cut + ' d="M12 2.2 5.4 4.8 1.6 6.7l.9 4 2.9-1.3v2.2c0 4.7 2.7 8.3 7.6 10.2 4.9-1.9 7.6-5.5 7.6-10.2V9.4l2.9 1.3.9-4-3.8-1.9L12 2.2Zm-.8 3.6h1.6v14.6h-1.6V5.8Z"/>',

    legs:
      '<path ' + cut + ' d="M4 2.4h6.2l-.8 7 .9 1.7-.8 7.1H4.7l-.8-7.1.9-1.7-.8-7Zm1.3 8.8h3.6v2H5.3v-2Z"/>' +
      '<path ' + solid + ' d="M4.6 18.4h5v3.2H2.2v-1.4l2.4-1.8Z"/>' +
      '<path ' + cut + ' d="M13.8 2.4H20l-.8 7 .9 1.7-.8 7.1h-4.6l-.8-7.1.9-1.7-.8-7Zm1.3 8.8h3.6v2h-3.6v-2Z"/>' +
      '<path ' + solid + ' d="M14.4 18.4h5l2.4 1.8v1.4h-7.4v-3.2Z"/>',

    // Neutral hanging cloth, for when the class is not known yet.
    classitem:
      '<path ' + solid + ' d="M4.6 3.2h14.8v3.1H4.6z"/>' +
      '<path ' + solid + ' d="M6.2 7.1h11.6l-1 8.6-2.1 5.6-2.7-3.6-2.7 3.6-2.1-5.6-1-8.6Z"/>',

    // The Mark: a banner hung from the waist plate.
    mark_titan:
      '<path ' + solid + ' d="M3.8 3h16.4v3.1H3.8z"/>' +
      '<path ' + cut + ' d="M6.4 6.9h11.2l-1.3 10L12 21.6l-4.3-4.7-1.3-10Zm2.6 2.2 1 7.4 2 2.2 2-2.2 1-7.4H9Z"/>',

    // The Cloak: an open hood over a cape.
    mark_hunter:
      '<path ' + cut + ' d="M12 1.9c-3.4 0-6 2.7-6 6.2v1.6h12V8.1c0-3.5-2.6-6.2-6-6.2Zm0 2.7c1.9 0 3.3 1.5 3.3 3.5v1.6H8.7V8.1c0-2 1.4-3.5 3.3-3.5Z"/>' +
      '<path ' + solid + ' d="M5.2 10.9h13.6l-1.5 6.6L12 22.3l-5.3-4.8-1.5-6.6Z"/>',

    // The Bond: a plate carried on an arm strap.
    mark_warlock:
      '<path ' + cut + ' d="M12 6.2c-5.7 0-10.3 3-10.3 6.7s4.6 6.7 10.3 6.7 10.3-3 10.3-6.7S17.7 6.2 12 6.2Zm0 3c3.9 0 7 1.7 7 3.7s-3.1 3.7-7 3.7-7-1.7-7-3.7 3.1-3.7 7-3.7Z"/>' +
      '<path ' + solid + ' d="M7.2 2.4h9.6v6.4H7.2z"/>',

    /* ================= WEAPON SILHOUETTES =================
       Side profiles on the shared receiver line. The differences carried here
       are the ones a player actually names a weapon type by: a Hand Cannon's
       cylinder, a Scout's glass, a Fusion's coils, a Shotgun's pump, a drum on
       one Grenade Launcher and a break action on the other. */

    auto_rifle:
      STOCK + bar(2.2, 9.4, 11.2, 2.6) + bar(13.4, 10, 6.2, 1.4) +
      bar(18.4, 8.2, 1.2, 1.8) +
      GRIP + '<path ' + solid + ' d="M10.3 12h3l-.3 4.2-2.1.5-.6-4.7Z"/>',

    // Three-round burst: three ports along the top of the barrel.
    pulse_rifle:
      STOCK + bar(2.2, 9.4, 10.6, 2.6) + bar(12.8, 10, 6.6, 1.4) +
      bar(13.6, 7.8, 1.3, 2) + bar(15.6, 7.8, 1.3, 2) + bar(17.6, 7.8, 1.3, 2) +
      GRIP + MAG,

    // Long barrel and glass -- the two things that make it a Scout.
    scout_rifle:
      STOCK + bar(2, 9.4, 12, 2.6) + bar(14, 10.1, 7.6, 1.2) +
      bar(11.2, 6.2, 6.6, 1.9) + bar(12.2, 8.1, 1.1, 1.3) + bar(16, 8.1, 1.1, 1.3) +
      GRIP + MAG,

    // Short, fed by a long stick magazine.
    submachine_gun:
      bar(3.4, 9.4, 9.2, 2.6) + bar(12.6, 10, 3.4, 1.4) +
      GRIP + MAG_LONG,

    // No stock, no magazine well below the barrel: a pistol.
    sidearm:
      bar(6.2, 8.8, 10.6, 2.6) + bar(16.8, 9.4, 1.4, 1.4) +
      '<path ' + solid + ' d="M9.2 11.4h3.2l-2.3 6.4H6.2l3-6.4Z"/>' +
      bar(5.4, 8.8, 1.2, 1.6),

    // Cylinder, swept grip, hammer. Nothing else in the set is round here.
    hand_cannon:
      bar(12.2, 9.4, 7.6, 1.9) + bar(6, 8.6, 6.6, 2.1) + bar(4.6, 7.4, 1.6, 1.9) +
      '<path ' + cut + ' d="M9.4 8.4a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm0 2.2a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6Z"/>' +
      '<path ' + solid + ' d="M6.2 12.8h3.7l-1.3 3.4c-.7 1.9-2.5 3.2-4.6 3.2H2.6l3.6-6.6Z"/>',

    // Recurve limbs, string, nocked arrow.
    bow:
      '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M17.8 2.4a11.4 11.4 0 0 1 0 19.2"/>' +
      '<path fill="none" stroke="currentColor" stroke-width="1.1" d="M17.8 2.4 15.6 12l2.2 9.6"/>' +
      bar(3.6, 11.1, 12.6, 1.8) +
      '<path ' + solid + ' d="M2 12 5.6 9.4v5.2L2 12Z"/>' +
      '<path ' + solid + ' d="M14.6 9.6h1.8v4.8h-1.8z" opacity=".6"/>',

    // Pump under the barrel, and the barrel is thick.
    shotgun:
      STOCK + bar(1.8, 9.4, 11.6, 2.6) + bar(13.4, 9.2, 6, 2.8) +
      bar(13.2, 13.2, 5.2, 2) + bar(15.2, 12, 1.4, 1.2) +
      GRIP + bar(9.6, 12, 2.8, 1.5),

    // Long thin barrel, big glass, bipod.
    sniper_rifle:
      bar(1.6, 9.6, 11.6, 2.4) + bar(13.2, 10.3, 9.2, 1) +
      bar(8.4, 5.4, 8.8, 2.2) + bar(9.4, 7.6, 1.1, 2) + bar(15.4, 7.6, 1.1, 2) +
      GRIP + MAG +
      '<path fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" d="M17.6 11.3 15.9 15.6M17.6 11.3l1.7 4.3"/>',

    // Charge coils: three prongs, and that is the whole read.
    fusion_rifle:
      bar(3, 9.2, 10.6, 3) + bar(13.6, 7.4, 5.8, 1.5) + bar(13.6, 10, 5.8, 1.5) +
      bar(13.6, 12.6, 5.8, 1.5) +
      GRIP + MAG,

    // A continuous beam off a single emitter.
    trace_rifle:
      bar(3, 9.4, 10.2, 2.6) +
      '<circle ' + solid + ' cx="14.8" cy="10.7" r="2.3"/>' +
      bar(17.6, 10.2, 4.6, 1) + bar(17.6, 11.8, 3.4, 0.8, '.55') +
      GRIP + MAG,

    // Polearm: blade, guard, haft.
    glaive:
      '<path ' + solid + ' d="M22.8 1.2 20.4 7.2 14.4 9.6 16.8 3.6 22.8 1.2Z"/>' +
      '<path ' + solid + ' d="M11.4 6.6 17.4 12.6l-1.7 1.7-6-6 1.7-1.7Z"/>' +
      '<path ' + solid + ' d="M13.8 8.6 15.4 10.2 4.2 21.4 2.6 19.8 13.8 8.6Z"/>' +
      '<path ' + solid + ' d="M3.4 18.6 5.4 20.6 3.4 22.6 1.4 20.6 3.4 18.6Z"/>',

    // Break action, fat bore.
    breech_gl:
      bar(3.6, 9.6, 11.2, 2.8) + bar(14.8, 8.4, 5.4, 5) +
      '<path ' + cut + ' d="M17.5 8.8a2.6 2.6 0 1 0 0 5.2 2.6 2.6 0 0 0 0-5.2Zm0 1.7a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8Z"/>' +
      GRIP,

    // Drum-fed: the drum is the whole difference from the breech-loader.
    heavy_gl:
      bar(3.2, 9, 10.8, 3) + bar(14, 8.4, 6.2, 4.2) +
      '<path ' + cut + ' d="M9.6 11.4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 2.2a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6Z"/>' +
      GRIP,

    // Belt box under the receiver, bipod at the front.
    machine_gun:
      STOCK + bar(1.8, 9.4, 12.2, 2.6) + bar(14, 10, 6, 1.4) +
      '<path ' + solid + ' d="M9.4 12h5.6l-.7 4.6H10L9.4 12Z"/>' +
      GRIP +
      '<path fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" d="M17 11.4 15.4 15.8M17 11.4l1.6 4.4"/>',

    // A tube with a mouth at both ends.
    rocket_launcher:
      bar(2.6, 8.6, 15.2, 4.2) +
      '<path ' + solid + ' d="M17.8 8.6 22.2 10.7l-4.4 2.1V8.6Z"/>' +
      '<path ' + solid + ' d="M2.6 7.4 1.4 6.2v10.4l1.2-1.2V7.4Z"/>' +
      bar(8.6, 5.2, 5, 3.4, '.62') +
      '<path ' + solid + ' d="M6 12.8h2.9l-1.3 4.8H3.4L6 12.8Z"/>',

    // Blade, crossguard, hilt -- drawn on the diagonal the way the game does.
    sword:
      '<path ' + solid + ' d="M20.4 1 23 3.6 11.4 15.2 8.8 12.6 20.4 1Z"/>' +
      '<path ' + solid + ' d="M7.4 10.6 13.4 16.6l-1.6 1.6-6-6 1.6-1.6Z"/>' +
      '<path ' + solid + ' d="M8.2 13.6 10.4 15.8 6.2 20l-2.2-2.2 4.2-4.2Z"/>' +
      '<path ' + solid + ' d="M4.6 18.2 6.4 20 4.2 22.2 2.4 20.4l2.2-2.2Z"/>',

    // Long body, glass, and coils at the muzzle.
    linear_fusion:
      bar(1.8, 9.4, 11.6, 2.6) + bar(13.4, 10, 4.6, 1.4) +
      bar(18, 8, 1.5, 2.6) + bar(18, 11.4, 1.5, 2.6) +
      bar(7, 5.8, 7.6, 2) + bar(8, 7.8, 1.1, 1.6) + bar(12.6, 7.8, 1.1, 1.6) +
      GRIP + MAG,

    /* ================= ARMOR 3.0 STATS =================
       Six stats, six marks, drawn from what each one actually does: a reticle,
       a shield, a raised barricade, a grenade, a Super going off, a fist. */

    weapons:
      '<path ' + cut + ' d="M12 2.4a9.6 9.6 0 1 0 0 19.2 9.6 9.6 0 0 0 0-19.2Zm0 2.4a7.2 7.2 0 1 1 0 14.4 7.2 7.2 0 0 1 0-14.4Z"/>' +
      '<path ' + solid + ' d="M11.1.6h1.8v5.8h-1.8zM11.1 17.6h1.8v5.8h-1.8zM.6 11.1h5.8v1.8H.6zM17.6 11.1h5.8v1.8h-5.8z"/>' +
      '<circle ' + solid + ' cx="12" cy="12" r="2.4"/>',

    health:
      '<path ' + cut + ' d="M12 1.7 3.3 4.9v6.9c0 5.2 3.5 9.3 8.7 11.2 5.2-1.9 8.7-6 8.7-11.2V4.9L12 1.7Zm0 2.7 6.1 2.2v5.3c0 3.7-2.3 6.7-6.1 8.3-3.8-1.6-6.1-4.6-6.1-8.3V6.6L12 4.4Z"/>' +
      '<path ' + solid + ' d="M12 7.1 15.5 8.4v3.5c0 2.2-1.3 4-3.5 4.9-2.2-.9-3.5-2.7-3.5-4.9V8.4L12 7.1Z"/>',

    'class':
      '<path ' + solid + ' d="M12 3.1a9.1 9.1 0 0 0-9.1 9.1v1.6h3.5v-1.6a5.6 5.6 0 0 1 11.2 0v1.6h3.5v-1.6A9.1 9.1 0 0 0 12 3.1Z"/>' +
      '<path ' + solid + ' d="M2.9 15.9h18.2v2.8H2.9z"/>',

    grenade:
      '<path ' + cut + ' d="M11.4 6.9a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15Zm-7.2 6h14.4v2.2H4.2v-2.2Z"/>' +
      '<path ' + solid + ' d="M9.2 3.2h4.4v4H9.2z"/>' +
      '<path ' + solid + ' d="M13.6 3.2h5.6v2h-3.6v4.2h-2V3.2Z"/>',

    'super':
      '<path ' + solid + ' d="M12 .6 13.7 8.2 12 12l-1.7-3.8L12 .6ZM12 23.4 10.3 15.8 12 12l1.7 3.8L12 23.4ZM.6 12l7.6-1.7L12 12l-3.8 1.7L.6 12ZM23.4 12l-7.6 1.7L12 12l3.8-1.7 7.6 1.7Z"/>' +
      '<path ' + solid + ' d="M3.9 3.9 9.9 8.1 12 12l-3.9-2.1-4.2-6ZM20.1 20.1l-6-4.2L12 12l3.9 2.1 4.2 6ZM3.9 20.1l4.2-6L12 12l-2.1 3.9-6 4.2ZM20.1 3.9l-4.2 6L12 12l2.1-3.9 6-4.2Z" opacity=".5"/>' +
      '<circle ' + solid + ' cx="12" cy="12" r="2.7"/>',

    melee:
      '<path ' + solid + ' d="M2.2 7.4h6.8v9.8H2.2z"/>' +
      '<path ' + solid + ' d="M8.8 5.2h6.8a2 2 0 0 1 0 4H8.8V5.2Z"/>' +
      '<path ' + solid + ' d="M8.8 10h7.8a2 2 0 0 1 0 4H8.8v-4Z"/>' +
      '<path ' + solid + ' d="M8.8 14.8h6.4a2 2 0 0 1 0 4H8.8v-4Z"/>' +
      '<path ' + solid + ' d="M6.4 19.6h6.2a1.6 1.6 0 0 1 0 3.2H6.4v-3.2Z" opacity=".7"/>',

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

    /* ---------- subclass structure ----------
       Aspects and Fragments are sockets in the game, so they are drawn as
       sockets: the Aspect plate is the larger one and carries a core, the
       Fragment is the small shard that drops into it. */

    aspect:
      '<path ' + cut + ' d="M12 2.4 21.6 12 12 21.6 2.4 12 12 2.4Zm0 3.1L5.5 12l6.5 6.5 6.5-6.5L12 5.5Z"/>' +
      '<path ' + solid + ' d="M12 7.8 16.2 12 12 16.2 7.8 12 12 7.8Z"/>',

    fragment:
      '<path ' + cut + ' d="m12 2.6 8.2 4.7v9.4L12 21.4l-8.2-4.7V7.3L12 2.6Zm0 2.6-6 3.4v6.8l6 3.4 6-3.4V8.6l-6-3.4Z"/>' +
      '<path ' + solid + ' d="m12 8 3.5 2v4L12 16l-3.5-2v-4L12 8Z" opacity=".75"/>',

    // Armour energy is a cell with charge in it, not a lightning bolt -- the
    // bolt already means Arc everywhere else in the app.
    energy:
      '<path ' + cut + ' d="M6.6 4.2h10.8v16.4H6.6V4.2Zm2.2 2.2v12h6.4v-12H8.8Z"/>' +
      '<path ' + solid + ' d="M9.6 3h4.8v1.6H9.6z"/>' +
      '<path ' + solid + ' d="M9.6 11.6h4.8v6H9.6z"/>',

    // A mod is a plug seated in a socket.
    mod:
      '<path ' + cut + ' d="m12 2.2 8.5 4.9v9.8L12 21.8l-8.5-4.9V7.1L12 2.2Zm0 2.6-6.3 3.6v7.2l6.3 3.6 6.3-3.6V8.4L12 4.8Z"/>' +
      '<path ' + solid + ' d="M9 9.4h6v5.2H9z"/>',

    // The masterwork chevron, stacked the way the game stacks it.
    masterwork:
      '<path ' + solid + ' d="M12 2.4 18.6 9h-4.2v2.6H9.6V9H5.4L12 2.4Z"/>' +
      '<path ' + solid + ' d="M12 10.4 18.6 17h-4.2v2.6H9.6V17H5.4l6.6-6.6Z" opacity=".55"/>' +
      '<path ' + solid + ' d="M6.4 21h11.2v1.8H6.4z"/>',

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

  D2.iconNames = Object.keys(paths);
  D2.hasIcon = function (n) { return !!paths[n]; };
})(window.D2);
