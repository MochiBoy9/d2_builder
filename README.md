# Destiny Build Maker

A local Destiny 2 loadout workbench. Assemble a complete, legal build — class,
subclass with every ability, Aspect and Fragment slot, three weapons with their
real perk columns, five armor pieces with Armor 3.0 archetypes and mods — then
read its stats, save it, and diff it against another build.

Nothing leaves your machine. There is no account, no server, and no telemetry.
Builds live in your browser's local storage.

---

## Running it

**Double-click `index.html`.** That is the whole install. No Node, no npm, no
build step — it is plain HTML, CSS and JavaScript.

There is one thing `file://` cannot do: browsers block network requests from
local files, so the optional Bungie manifest sync needs a real `http://` origin.
If you want that, start the bundled server instead:

```bash
powershell -ExecutionPolicy Bypass -File serve.ps1
```

It opens <http://localhost:8123> in your browser. `Ctrl+C` stops it. Pass
`-Port 8080` if 8123 is taken. (This uses Windows' built-in `HttpListener` —
nothing to install.)

---

## Builder mode — beginner, mid-game, veteran

The first time you open the app it asks one question: how much do you already
know? The answer changes how much of the machinery is exposed and how much is
explained. It never changes what a build *is* or what the maths does — a build
made on Beginner is the same object as one made on Veteran, and switching mode
never edits a build. Change it any time from the top bar, or press `M`.

**Beginner** — guided. Every game term is defined inline the moment it first
appears. A running "do this next" instruction sits at the top of the dossier and
tells you exactly one thing to do, with a button that takes you there. Weapons
show their two Trait columns only — the ones that change how a gun plays.
Manual stat entry, the editable tier table, Fragment stat overrides, artifice
sockets and armor set tracking are hidden entirely, not disabled: there is
nothing there to be intimidated by. Stat notes read "15 more to reach 100"
rather than "T8 · +5 to T9".

**Mid-game** — the working tool. Every slot, all seven weapon perk columns,
artifice sockets, armor sets, catalysts and tags. Short coaching notes stay. The
balance-model editors stay tucked away.

**Veteran** — everything, dense, no coaching. Manual per-piece stat entry, the
editable tier table, Fragment stat overrides, Aspect slot corrections, raw
attribution, tighter spacing.

**Starter builds** (the ✦ button, or `P`) load a complete, legal, well-known
build you can then take apart — which is how most people actually learn what a
Fragment does. Six of them, spread across the three modes. Armor is set to
plausible archetypes rather than perfect rolls, because a preset that assumed
five tier-5 pieces would be lying about what is in your vault. Every id in every
preset is checked against the database at load, so a data change makes a preset
disappear rather than produce a broken build.

---

## Weapon perks show only what the gun actually rolls

A perk column is not "every perk that exists for this weapon type". It is the
specific list that rolls on that specific gun — and the columns a gun *has* at
all differ by type and rarity. A Hand Cannon has no Battery. An Exotic has no
random trait columns. Fatebringer has no Origin Trait. Falling Guillotine's
first trait column holds four perks, not a hundred and thirty.

The app resolves each weapon's columns from the best source it has, and the
column label says which one it used:

| Badge | Meaning |
|---|---|
| `EXACT` | Bungie's own socket and plug-set data for that weapon hash, from a manifest sync. Every gun in the game, exactly right. |
| `CHECKED` | A hand-written roll list in `weapon-rolls.js`, for the weapons most people build around. |
| `TYPE POOL` | The fallback: everything that plausibly rolls on this kind of weapon. Labelled so you know it is an approximation. |

A column the weapon genuinely does not have is not drawn. A perk carried over
from an older save that this gun cannot roll is shown in warning colour with the
reason on hover, rather than sitting there looking legitimate.

---

## What's in it

**Subclasses — complete.** All 18 paths: Titan, Hunter and Warlock across Solar,
Arc, Void, Stasis, Strand and Prismatic. Every Super, grenade, melee, class
ability, movement mode, Aspect and Fragment, with the real slot rules — two
Aspect slots, Fragment capacity derived from the Aspects you equip, and Prismatic
drawing from its own curated ability pools.

**Weapons — 224 curated.** 127 Exotics with their intrinsic perk and catalyst,
and 97 Legendaries. Full perk columns per weapon type — the barrel column becomes
*Bowstring* on a bow, *Battery* on a fusion, *Launcher* on a rocket, *Blade* on a
sword — drawn from a pool of ~145 traits, ~40 barrels and magazines, 33 origin
traits, 16 masterworks and 18 weapon mods, with type restrictions so sword perks
stay on swords. The same trait cannot roll in both trait columns, and only one
Exotic weapon can be equipped at a time.

**Armor — 128 Exotics curated.** Every Exotic armor piece for all three classes
with its perk, plus the Prismatic Exotic class items and their two Spirit
columns. Armor 3.0 modelled properly: six archetypes (Gunner, Bulwark, Brawler,
Specialist, Grenadier, Paragon), tiers 1–5, a rolled secondary stat,
masterworking, artifice sockets, 56 named armor sets, and a 10-point energy
budget per piece that mods actually spend.

**The stat calculator.** Six Armor 3.0 stats, 0–200, with tier markers and the
100 pivot drawn into the track. Click any stat and it shows its working: every
piece, mod and Fragment that contributed, what each was worth, how far the next
breakpoint is, and what the stat does below and above 100.

**Library and compare.** Save unlimited builds locally, tag them (PvE, GM, Trials,
Boss DPS…), search them, and put two side by side — stats first with the delta,
then every equipment slot, with matching rows dimmed so the differences stand out.
Export the whole library to JSON and import it back.

Keyboard: `B` builder, `L` library, `C` compare, `S` save, `N` new,
`P` starter builds, `M` builder mode, `Esc` close.

---

## Typography

Destiny 2 and bungie.net are set in **Neue Haas Grotesk Display Pro**, a licensed
Linotype face that cannot be redistributed here. The app uses it anyway when it
can: `@font-face` rules bind it by `local()` under every name the family ships
under, so an installed copy is picked up automatically with no network request.
To use font *files* instead, drop them in `assets/fonts/` and uncomment one line
per weight in `tokens.css` — see `assets/fonts/README.md`.

Without it, the fallback is **Inter** for body and item names (the nearest freely
available neo-grotesque) with **Archivo** carrying the variable width axis that
the tracked uppercase HUD labels are built on. Bungie's free **Destiny Symbols**
glyph font binds the same way and is applied by the `.glyph` class.

---

## Icons

Every icon is authored SVG on a 24×24 box — original drawings in Bungie's visual
language, not copies of Bungie's art files. Solid geometry for the things that
have to read at 14px in a dense grid, and one rule behind all of it: marks that
appear side by side must differ in **silhouette**, not in detail.

- **Class marks** on the game's own construction — the Titan hexagon, the Hunter
  chevron stack, the Warlock wings.
- **Elements** each built from a different primitive so no two collide small: a
  flame, a bolt, an eclipsed sphere, a shard cluster, a braid, a cut gem, and a
  plain round for Kinetic.
- **Ammo** drawn as what fits in the gun — rifle round, shell, rocket.
- **Armor slots** drawn as the piece: visor slit, flared vambraces, split chest
  plate, greaves standing on feet, plus the class-specific Mark, Cloak and Bond
  for class items.
- **The six Armor 3.0 stats** — reticle, shield, barricade, grenade, Super, fist
  — leading each readout in the stat bar.
- **Eighteen weapon silhouettes** on one shared receiver line, each carrying the
  feature you name the type by, so a Hand Cannon looks like a Hand Cannon in its
  slot and in the picker — cylinder, glass, coils, pump, drum, break action.

1.5-weight strokes for interface icons. No emoji, no icon font.

---

## What it does not claim

This matters more than the feature list.

**The offline library is a snapshot, not a live feed.** Destiny 2 has thousands
of Legendary weapons and adds Exotics every release. Everything here was written
by hand from knowledge with a cutoff, which means a release after that cutoff
added things this app has never heard of. The Exotic weapon and armor lists are
complete as far as that cutoff goes; the Legendary weapon list is a deliberate
slice, not an enumeration, and Legendary armor is not enumerated at all — in
Armor 3.0 a Legendary piece is defined by its archetype, tier, stat spread and
set, all of which you configure directly on the piece. Prismatic ability pools in
particular are curated by Bungie and shift between seasons.

**That is what manifest sync is for, and it is the answer to "every single
weapon and armor piece".** Open the sync panel (the ⟳ button), paste a free
Bungie API key from [bungie.net/en/Application](https://www.bungie.net/en/Application)
(create an application, set OAuth to "None", copy the API key), and the app pulls
Bungie's live `DestinyInventoryItemDefinition` and `DestinyPlugSetDefinition`,
reduces them to the fields it needs, and stores the result in IndexedDB. After a
sync you get:

- every weapon in the game, with its real type, damage type, ammo and icon;
- every armor piece, including the full Exotic list for all three classes;
- every weapon perk — barrels, magazines, traits, origin traits, masterworks;
- every armor mod, **with its stat contributions mapped into the six Armor 3.0
  stats**, so an imported stat mod moves the totals exactly like a curated one;
- each weapon's own socket layout and roll lists, which is what turns the perk
  columns from `TYPE POOL` into `EXACT`.

Curated entries keep their hand-written Exotic perk text; manifest items fill in
everything else. It is a large download — tens of megabytes — and it needs the
local server above.

Two details worth knowing about the import. Weapon type comes from the item's
own `itemTypeDisplayName` rather than the `itemSubType` enum, because that enum's
numbering is easy to get subtly wrong and a single wrong entry files every
Sidearm as a Sword. And the Armor 3.0 stat mapping is asserted in one place in
`manifest.js` (Mobility→Weapons, Resilience→Health, Recovery→Class,
Discipline→Grenade, Intellect→Super, Strength→Melee) so that if Bungie ever
renumbers, there is exactly one thing to fix.

Imported armor pieces get no perk *description*: an armor definition carries no
perk text — the Exotic perk lives in a socket plug — so the app shows the item's
flavour text and says that is what it is, rather than passing flavour off as a
perk.

**Balance-sensitive numbers are editable, not baked in.** The tier point spreads,
the masterwork bonus, each Aspect's Fragment-slot count and each Fragment's stat
modifiers all move with balance patches. Rather than ship a number that quietly
goes wrong, the app lets you correct any of them — *Stat model* in the stat bar,
and *Set fragment stats* under the Fragments section, both in Veteran mode — and
every build recalculates. Fragment stat modifiers ship blank for exactly this
reason.

**Ability cooldowns in seconds are not shown.** They would have to be invented,
and an invented number in a calculator is worse than no number. What the app does
compute — stat totals, per-source attribution, energy budgets, breakpoint
distances — is exact arithmetic that shows its working.

---

## Layout

```
index.html              the whole app shell and script order
serve.ps1               optional local web server (Windows, no dependencies)
DESIGN.md               the visual system: palette, type, geometry, motion
PRODUCT.md              who this is for and what it is meant to do
assets/
  fonts/README.md       how to use Destiny 2's real typeface if you have it
  css/
    tokens.css          font bindings, palette, type scale, spacing, motion, reset
    app.css             layout and components
  js/
    core/
      util.js           DOM helpers, fuzzy search, event bus, storage
      icons.js          authored SVG icon set
      build.js          build model, legality rules, stat engine
      store.js          editable settings + build library + current state
      level.js          builder mode: what each level shows, and the glossary
      presets.js        starter builds, validated against the database at load
      manifest.js       optional Bungie sync (IndexedDB)
    data/
      game.js           classes, elements, slots, Armor 3.0 stat definitions
      subclasses.js     all 18 subclass paths
      weapons.js        Exotics and curated Legendaries
      weapon-perks.js   barrels, magazines, traits, origin traits, masterworks
      weapon-rolls.js   per-weapon column layouts and roll lists
      armor.js          Exotic armor, Spirits, named armor sets
      mods.js           armor mods, including the Armor 3.0 stat mods
    ui/
      shell.js          top bar, theming, dialogs, toasts, sync, mode, presets
      picker.js         the slide-over used by every "choose a thing"
      builder.js        the dossier: identity, subclass, armament, armor
      statbar.js        pinned stat readout and its attribution panel
      library.js        saved builds
      compare.js        two-build diff
    app.js              bootstrap
```

No modules and no bundler by design: classic `<script>` tags load from `file://`,
which is what lets the app open by double-clicking.

`.claude/launch.json` is a convenience for editor tooling that can start
`serve.ps1` for you. Nothing in the app reads it; delete it if you do not use it.

---

Destiny 2 is a trademark of Bungie, Inc. This is an unofficial fan tool with no
affiliation with or endorsement by Bungie.
