# DESIGN.md — Vault Terminal

The visual system behind Destiny Build Maker, written from the built result.
Single committed look. Dark is not a category default here: this gets opened at
night, on a second monitor, beside a game that is already dark.

---

## 1. Ground and material

Warm near-black strata, never blue-black. Every surface is a step in one ladder,
and depth comes from the step plus a hairline, not from a floating shadow.

| Token | Value | Used for |
|---|---|---|
| `--ink-000` | `#080809` | deepest wells, mod-socket interiors |
| `--ink-050` | `#0B0B0C` | page ground |
| `--ink-100` | `#101011` | panel base, picker sheet |
| `--ink-200` | `#151517` | resting surface for options and pickers |
| `--ink-300` | `#1B1B1E` | raised panel top, selected rows |
| `--ink-400` | `#232327` | button rest, hover surface |
| `--ink-500` | `#2C2C31` | button hover, meter track |
| `--ink-600` | `#3A3A40` | scrollbar thumb hover |

Two textures, both semantic, neither decorative:

- **Film grain** — a 140px `feTurbulence` tile fixed over the whole shell at
  3.2% opacity. It is the reason surfaces read as brushed metal rather than flat
  fill.
- **Diagonal hatch** (`.hatch`) — a 45° repeating gradient at 2.8% opacity, used
  only on **unfilled** bays: empty weapon bodies, empty exotic slots, empty
  states. Hatch means "nothing here yet", never "this is a surface".

---

## 2. Type

**The game's own face, when it can be had.** Destiny 2 and bungie.net are set in
Neue Haas Grotesk Display Pro — a licensed Linotype face that cannot ship with a
fan tool. The `D2 Display` `@font-face` blocks bind it by `local()` under every
name the family ships under, so an installed copy is picked up automatically with
no network request; `url()` sources for a local drop-in sit one uncommented line
away (see `assets/fonts/README.md`). They ship commented because a browser
re-requests a missing font file once per element that asks for it, and a wall of
404s is a worse default than a fallback.

Two tokens, because the two jobs are different:

- `--font` — body, item names, descriptions. **Inter** leads the fallback: it is
  the nearest freely available neo-grotesque to Neue Haas Grotesk, which is what
  Destiny's item text actually is.
- `--font-hud` — the tracked uppercase labels, stat numerals and display sizes.
  **Archivo** leads here because those need the variable `wdth` axis that Inter
  does not have, and the whole label system is built on width and tracking.

`--font-glyph` binds Bungie's free **Destiny Symbols** font when it is present,
applied by `.glyph`, falling back to the HUD face so text set in it never renders
as tofu.

The Destiny look in this interface comes from tracking, uppercase and hairlines
rather than from a novelty typeface. That is why the fallback is a plain Swiss
grotesque and not something squared-off and "techy": a squared face would read as
sci-fi generic, which is the opposite of the target.

- **Labels** (`.lbl`, `.field__lbl`, `.perkcol__lbl`) — 10–11px, weight 640,
  width 92%, `letter-spacing: .14em`, uppercase. This is the interface's voice.
- **Display** (`.display`, `.band__supername`) — weight 700, width 112%,
  `letter-spacing: -.022em`. Reserved for the Super name and stat values.
- **Body / UI** — 13.5px, weight 420, line-height 1.5.
- **Data** — `font-variant-numeric: tabular-nums` globally, `.num` for anything
  that must align in a column. Numerals never jitter as values change.

Fixed rem-free px scale, not fluid clamps: this is product UI viewed at
consistent DPI, and a heading that shrinks inside a panel looks worse, not
better.

---

## 3. Colour strategy

**Restrained, with a displaced accent.** Neutrals carry the whole interface. One
accent carries primary action, current selection and state.

The accent is aged Vanguard brass `#D9AE4A` — *until a subclass is equipped*, at
which point the equipped element's colour takes over `--el`, `--el-hi`,
`--el-ghost` and `--el-wash` at runtime. Every accent in the app is expressed as
`var(--el)`, so choosing Void turns the entire tool violet without a second
theme existing anywhere in the CSS.

| Element | Colour |
|---|---|
| Kinetic | `#D6D2C8` |
| Solar | `#F0631E` |
| Arc | `#79D5EC` |
| Void | `#B18CD9` |
| Stasis | `#5B92FF` |
| Strand | `#35CE6B` |
| Prismatic | `#E3A9E0` |

Rarity (`--rar-exotic #CEAE33`, legendary, rare, uncommon, common) and ammo
(primary / special / heavy) are separate scales that never borrow the accent.

Element colour is applied as **field**, not halo: a 6–7% wash bled from two
corners of the shell, a tinted background on selected options, a 1px border. No
glow rings, no neon edges.

**Contrast is measured, not eyeballed.** Against `--ink-200`: `--bone-300` 5.6:1,
`--bone-400` 5.1:1 — both cleared for the small tracked labels this interface
runs on. `--bone-500` is 3.9:1 and is restricted to drawn glyphs and inert
marks; no word the reader needs is ever set in it.

---

## 4. Geometry

- **Zero border radius everywhere.** Sharp corners are the world.
- **Chamfer** (`--plate`, `--plate-sm`) — a 9px cut on the top-left and
  bottom-right, applied by `clip-path` to filled surfaces only: the identity
  band, element buttons, primary buttons. Never on bordered panels, where a clip
  would eat the hairline.
- **Corner flag** — a small filled triangle in the top-right of a selected
  option or class tile. This is the selection tell, in place of a thick coloured
  border.
- **Hairlines** — `--rule` (8.5%), `--rule-mid` (15%), `--rule-hi` (26%).
- **Lift** — `inset 0 1px 0 rgba(255,253,245,.05)` on raised panels: a top edge
  catching light, the way brushed metal does. Shadows carry both offset and blur;
  no zero-offset colour halos.

---

## 5. Motion

150–250ms on everything, exponential ease-out `cubic-bezier(.16,1,.3,1)` from an
already-visible default. Motion conveys state; nothing is choreographed on load.

**One authored moment: the element takeover.** Changing subclass element fires
`.sweep` — a skewed band of the new element colour wiping across the shell in
640ms on `screen` blend — while the accent tokens transition underneath it. It
happens once, on the one action that changes the identity of the whole build.

Meters (`.stat__fill`, `.energy__fill`) animate `transform: scaleX()` from their
own left edge, never `width`. `prefers-reduced-motion` collapses everything to
0.01ms.

---

## 6. Components

- **Plate / slotcard** — the equipment tile: 46px glyph well, name, chip row.
- **Chip** — 10px uppercase micro-label with a 1px border, tinted per role
  (`--el`, `--rar`, `--am`, warn, err, ok) or plain.
- **Option** (`.opt`) — Aspect and Fragment tiles: glyph, name, description,
  corner flag when selected, disabled with a written reason when unavailable.
- **Slide-over sheet** (`.sheet-panel`) — *every* "choose a thing" in the app,
  from a Super to a barrel to a settings dialog, is the same right-hand panel:
  head, search, filter chips, scrolling grouped list, footer with a result count
  and Clear slot. One grammar, learned once.
- **Stat bar** — pinned bottom, always present including at zero. Six tracks,
  each split at the 100 pivot which is drawn into the track itself. Its height is
  measured at runtime and fed back into `--statbar-h` so the dossier reserves
  exactly the right space at any breakpoint.

- **Next step** (`.nextstep`) — beginner mode only. A chamfered element-washed
  bar carrying exactly one instruction and one button. Never a list: the spine
  already holds the full outstanding set, and this is deliberately the opposite
  of it.
- **Coach** (`.coach`) — one paragraph of plain language under a section
  heading, never beside it. Different copy per level: mid-game gets the one-line
  reason a section matters, beginner gets the same thing said without assuming
  vocabulary.
- **Define** (`.define`) — an inline glossary entry, set on the deepest ink with
  a left hairline so it reads as a footnote rather than as body copy.
- **Level card** (`.lvlcard`) — the mode chooser. Each one states what it
  *shows*, *hides* and *simplifies* in the reader's words, so the choice is
  informed rather than a guess between three adjectives.
- **Roll source** (`.rollsrc`) — a 9px badge on the first perk column heading:
  `EXACT`, `CHECKED` or `TYPE POOL`. Tinted with the element accent only when
  exact. It appears once per weapon, not once per column.

Every interactive element ships default, hover, active, disabled and
focus-visible. Browser surfaces are themed rather than inherited: selection
colour, caret colour, custom scrollbar, focus ring, placeholder tone.

### Icons

Authored SVG on a 24×24 box, original drawings in Bungie's visual language —
angular, symmetrical, built from straight cuts — never copies of Bungie's art
files. 1.5-weight strokes for interface icons; solid geometry for everything
that has to survive at 14px in a dense grid.

**The rule that decides every mark: differ in silhouette, not in detail.** Icons
in this app are seen three at a time, side by side, at 14–22px. Three framed
diamonds are three framed diamonds however carefully the insides differ, so
nothing shares a primitive with its neighbours:

- three **class marks** on the game's own construction — the Titan hexagon
  banded across the middle, the Hunter chevron stack, the Warlock wing
  triangles converging to a point;
- six **element glyphs** plus Kinetic, each built from a different primitive so
  no two collide small: a flame, a bolt, an eclipsed sphere, a shard cluster, a
  braid, a cut gem, a round;
- three **ammo** marks drawn as what actually fits in the gun — rifle round,
  shell, rocket — because that is what the colour is telling you;
- five **armor slots** drawn as the piece rather than as a pictogram of one:
  the visor slit, the flared vambraces, the split chest plate with pauldrons,
  greaves standing on feet. The class-specific Mark, Cloak and Bond stand in for
  the generic class-item shape whenever the class is known;
- six **Armor 3.0 stat marks** — reticle, shield, raised barricade, grenade,
  Super going off, fist — leading each readout in the stat bar so the row is
  scannable before it is read;
- a side-profile **silhouette for all eighteen weapon types**, drawn on one
  shared receiver line so a column of them lines up, and carrying the feature a
  player actually names the type by: a Hand Cannon's cylinder, a Scout's glass,
  a Fusion's coils, a Shotgun's pump, a drum on one Grenade Launcher and a break
  action on the other. Tinted by damage type in the slot well the way the game's
  inventory does.

Where the game has a published construction the mark follows it; where it does
not, the mark is drawn from what the thing does, in the same grammar. Both are
original geometry either way.

Any element, class, armor slot, weapon type, ammo id or stat id resolves to an
icon of the same name, so a caller can pass a data id straight through. No
emoji, no icon font.

### Level as a design variable

`body[data-level]` carries the builder mode, so density is a CSS concern rather
than a branch in every component: veteran tightens section gaps and card padding,
beginner widens perk columns and raises hit areas. What is *shown* is decided in
`core/level.js` — one matrix, read through `D2.level.show(key)` — so no component
hard-codes a level name.

---

## 7. Layout — the Guardian Dossier

One continuous vertical record, not a dashboard of widgets. Max width 1420px.

```
┌─────────────────────────────────────────────────────────┐
│ topbar: mark · build name · views · sync · about        │
├────────┬────────────────────────────────────────────────┤
│ spine  │  identity band                                 │
│ 168px  │    class marks | element row | super | exotics │
│ sticky │  subclass  (abilities, aspects, fragments)     │
│        │  armament  (3 weapon strips, perk columns)     │
│ issues │  armor     (5 cards, archetype + mods)         │
├────────┴────────────────────────────────────────────────┤
│ stat bar: six stats, pinned                             │
└─────────────────────────────────────────────────────────┘
```

The **spine** is a completion record, not navigation chrome: each section shows
filled-of-total and a tick, followed by the live list of what is missing or
illegal.

Responsive behaviour is structural, never fluid type:

- **≤1120px** — spine becomes a sticky horizontal strip; its issue list collapses
  into a single status chip that opens the full check in a sheet. Identity band
  stacks. Stats go to three columns.
- **≤760px** — stat labels shorten to three-letter codes, coaching notes drop,
  armor and option grids go single-column, sheets go full width.
- **≤420px** — tighter bar padding and button padding.

---

## 8. Refusals

Recorded so later work does not reintroduce them:

- No card-grid-of-icon-heading-text as page structure. Sections are sections.
- No eyebrows or kickers above headings.
- No section numbers.
- No gradient text.
- No glass or blur as decoration — `backdrop-filter` appears twice, on the pinned
  stat bar and the sticky mobile spine, both places where content passes behind.
- No coloured `border-left` accents on cards or list items.
- No monospace as a costume. Numerics use tabular figures in the UI face.
- No emoji standing in for icons.
- No modal where an inline control would do; the one overlay grammar is the
  right-hand sheet, used where focus genuinely needs protecting.
