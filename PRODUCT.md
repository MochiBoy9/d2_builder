# PRODUCT.md — Destiny Build Maker

## What it is
A local-first Destiny 2 loadout workbench. A player assembles a complete, legal
build — class, subclass with every ability/aspect/fragment slot, three weapons
with full perk columns, five armor pieces with Armor 3.0 archetypes and mods —
then measures it, saves it to a library, and compares it against another build.

## Who uses it
Destiny 2 players who theorycraft outside the game: between sessions, on a second
monitor, at night, usually while the game or a raid VOD is on the other screen.

They are not all at the same place. Three, explicitly:

- **Beginner.** Has a Guardian, has not built one. Does not know what a Fragment
  is, that Aspects gate Fragment slots, or which of six stats matters. Needs to
  be told what to do next, in words, one thing at a time — and needs the
  advanced machinery *absent*, not greyed out.
- **Mid-game.** Knows the vocabulary, is still learning what a choice is worth.
  Wants every real slot present and a short note on why it matters.
- **Veteran.** Category-fluent. Knows what "Aggressive Frame" means and what 100
  Grenade buys them. Needs speed, completeness and maths they can trust, and
  needs the tool to stop explaining things.

One tool, one build model, three surfaces. The setting changes what is exposed
and what is explained; it never changes what a build is or what the maths does.

## The job
1. Build a loadout that is *legal* (aspect/fragment budgets, energy budgets,
   exotic limits, element restrictions) without opening the game.
2. See the numbers that decide whether it works: six Armor 3.0 stats, where each
   lands against its breakpoints, and what the next breakpoint is worth.
3. Pick perks from what the gun actually rolls, not from a catalogue of
   everything that exists — a perk you cannot chase is worse than no perk.
4. Keep more than one build. Tag them. Put two side by side and see the delta.
5. For someone who has never done any of this: be told what to do next, and be
   able to load a finished build and take it apart.

## Product truth (non-negotiable facts the design serves)
- Destiny 2 runs Armor 3.0: six stats — Weapons, Health, Class, Grenade, Super,
  Melee — each 0–200, with meaningful behavior above 100.
- Armor pieces carry an archetype (Gunner, Paragon, Brawler, Bulwark, Grenadier,
  Specialist) that determines primary/secondary/tertiary stat distribution.
- Exactly one exotic weapon and one exotic armor piece may be equipped.
- Subclasses have hard budgets: aspect slots gate fragment slots.
- Armor has an energy budget that mods spend.
- Elements are the game's strongest visual signal. Solar is orange, Arc is
  cyan, Void is violet, Stasis is blue, Strand is green, Prismatic is all of them.

## Constraints
- No build step. No Node, no npm, no bundler available on the target machine.
  Ships as plain HTML/CSS/JS, opens by double-clicking `index.html`.
- Must work fully offline with a curated database.
- Optional: a Bungie API key upgrades the item database to the complete live
  manifest. Network is an enhancement, never a dependency.
- All persistence is local (localStorage / IndexedDB). No account, no server.

## Explicitly out of scope (user deselected)
- Shareable build URLs and print/screenshot build cards.
- Written gameplay-loop notes and auto-detected synergy commentary.
(Library export/import stays in, because a local-only library that cannot be
backed up is a data-loss trap, not a feature.)

## Success
A player opens it, has a complete legal build in under two minutes without
reading anything, and trusts the stat readout enough to go equip it.

## Assumptions (inferred from the brief, unconfirmed)
- Single-player use; no team/sharing requirements.
- Desktop-first, but it will get opened on a phone next to a console.
