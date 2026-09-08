/* Builder experience level.

   The same tool has to serve someone who has never heard the word "Fragment"
   and someone who is counting frames on a damage phase. Rather than ship two
   apps, one setting decides how much of the machinery is exposed and how much
   is explained.

     beginner  Guided. Plain language for every game term, a running "do this
               next" instruction, starter builds you can load whole, and the
               advanced editors hidden entirely -- not disabled, hidden, so
               there is nothing to be intimidated by.
     midgame   The working tool. Every real choice is present, short coaching
               notes stay, the balance-model editors that only matter to
               theorycrafters stay out of the way.
     veteran   Everything, dense, no hand-holding. Manual stat entry, the
               editable tier table, fragment stat overrides, raw numbers.

   Nothing here changes what a build *is* or what the maths does. A build made
   on beginner is the same object as one made on veteran; only the surface
   differs, so switching level never edits your build. */
(function (D2) {
  'use strict';

  var L = D2.level = {};

  L.levels = [
    {
      id: 'beginner',
      name: 'Beginner',
      icon: 'novice',
      tagline: 'Guided, explained, nothing hidden behind jargon',
      blurb: 'Every game term is spelled out, the app tells you what to do next, ' +
             'and the advanced editors stay out of the way until you want them.'
    },
    {
      id: 'midgame',
      name: 'Mid-game',
      icon: 'adept',
      tagline: 'The full tool, with the jargon left in',
      blurb: 'Every slot, perk column and mod, plus short notes on what a choice ' +
             'is worth. The balance-model editors stay tucked away.'
    },
    {
      id: 'veteran',
      name: 'Veteran',
      icon: 'veteran',
      tagline: 'Everything, dense, no coaching',
      blurb: 'Manual stat entry, the editable tier table, fragment stat overrides, ' +
             'raw attribution. Nothing is explained that you already know.'
    }
  ];

  L.byId = {};
  L.levels.forEach(function (x, i) { x.rank = i; L.byId[x.id] = x; });

  /* Which surfaces each level gets. A key absent from a level's row is off. */
  var MATRIX = {
    beginner: {
      coach: true,          // plain-language notes under section heads
      nextStep: true,       // the running "do this next" instruction
      glossary: true,       // define game terms inline
      presets: true,        // load a complete starter build
      recommend: true,      // mark beginner-friendly choices in pickers
      simpleStats: true,    // stat bar explains rather than abbreviates
      traitColumns: true    // trait columns only, not all seven
    },
    midgame: {
      coach: true,
      presets: true,
      recommend: true,
      allPerkColumns: true,
      artifice: true,
      armorSet: true,
      fragmentStats: true,
      catalysts: true,
      tags: true
    },
    veteran: {
      allPerkColumns: true,
      artifice: true,
      armorSet: true,
      fragmentStats: true,
      aspectSlots: true,
      statModel: true,
      manualStats: true,
      catalysts: true,
      tags: true,
      dense: true
    }
  };

  L.current = function () {
    var id = D2.settings.get('level');
    return L.byId[id] ? id : 'midgame';
  };

  L.def = function () { return L.byId[L.current()]; };

  L.is = function (id) { return L.current() === id; };

  L.rank = function () { return L.byId[L.current()].rank; };

  /* "At least this experienced" — useful for things that should appear from
     mid-game upward without naming both levels every time. */
  L.atLeast = function (id) {
    var target = L.byId[id];
    return !!target && L.rank() >= target.rank;
  };

  L.show = function (key) { return !!MATRIX[L.current()][key]; };

  L.set = function (id) {
    if (!L.byId[id] || id === L.current()) return;
    D2.settings.set('level', id);
    document.body.setAttribute('data-level', id);
    D2.bus.emit('level:change', id);
    D2.bus.emit('build:change', { full: true });
  };

  /* Called once at boot so CSS can key off the level without a redraw. */
  L.applyBodyClass = function () {
    document.body.setAttribute('data-level', L.current());
  };

  /* Has the user ever been asked? Used to offer the one-time chooser rather
     than silently guessing on someone's behalf. */
  L.chosen = function () { return !!D2.settings.get('levelChosen'); };
  L.markChosen = function () { D2.settings.set('levelChosen', true); };

  /* ------------------------------------------------------------------
     Glossary. Beginner mode defines these inline; the other levels never
     ask. Kept here rather than in the data files because it is interface
     copy about the game's vocabulary, not game data. */

  L.glossary = {
    aspect: 'Aspects are the two big perks that define how a subclass plays. ' +
            'They also decide how many Fragment slots you get.',
    fragment: 'Fragments are small modifiers you slot into the openings your ' +
              'Aspects create. Two Aspects with three slots each means six Fragments.',
    archetype: 'In Armor 3.0 every armor piece has an archetype — Gunner, ' +
               'Bulwark, Brawler, Specialist, Grenadier or Paragon. It decides ' +
               'which stats that piece is good at before any mods.',
    tier: 'Armor tier is the quality of the roll, 1 to 5. A tier 5 piece gives ' +
          'noticeably more stat points than a tier 1.',
    secondary: 'Each archetype fixes a best and a third-best stat. The ' +
               'second-best is rolled at random on the piece — pick whichever ' +
               'one yours actually has.',
    masterwork: 'Masterworking an armor piece costs materials and adds points ' +
                'to its primary stat.',
    artifice: 'Artifice armor has one extra socket that costs no energy and ' +
              'adds +3 to a stat. It drops from dungeons and a few other sources.',
    energy: 'Each armor piece has 10 energy to spend on mods. A better mod ' +
            'costs more, so you cannot slot everything at once.',
    exotic: 'You can wear exactly one Exotic weapon and one Exotic armor piece ' +
            'at a time. They are usually the thing a build is built around.',
    catalyst: 'A catalyst is an upgrade you earn for an Exotic weapon. It adds ' +
              'a perk or improves its stats.',
    breakpoint: 'Stats matter in steps of 10. Getting from 91 to 100 is worth ' +
                'a lot; getting from 91 to 95 is worth nothing yet.',
    pivot: 'Below 100 a stat improves how fast something recharges. Above 100 ' +
           'it starts adding damage or duration instead.',
    origin: 'An origin trait comes from where the weapon dropped — a raid, a ' +
            'vendor, a season. Every weapon from that source has the same one.',
    frame: 'The frame is the weapon’s intrinsic type — how fast it fires and ' +
           'how hard it hits. It is fixed; you cannot roll a different one.'
  };

  L.term = function (key) { return L.glossary[key] || ''; };
})(window.D2);
