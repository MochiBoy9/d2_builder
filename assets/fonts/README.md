# Fonts

Destiny 2 and bungie.net are set in **Neue Haas Grotesk Display Pro**. It is a
licensed Linotype typeface, so it is not — and cannot be — shipped with this
app. What the app does instead, in `assets/css/tokens.css`:

1. **Uses it if your machine already has it.** The `@font-face` rules for
   `D2 Display` start with `local()` lookups for every common PostScript and
   full name the family ships under. If Neue Haas Grotesk Display Pro is
   installed, the whole interface picks it up with no further action.

2. **Uses it if you drop the files in here.** Put any of these in this folder:

   ```
   assets/fonts/NeueHaasDisplay-Roman.woff2   (weight 400–500)
   assets/fonts/NeueHaasDisplay-Mediu.woff2   (weight 501–650)
   assets/fonts/NeueHaasDisplay-Bold.woff2    (weight 651–900)
   ```

   Then open `assets/css/tokens.css` and uncomment the matching `url(...)`
   line in each `@font-face` block — they are one line each, marked. Reload
   and the app is set in the game's own face.

   Those lines ship commented out deliberately: a browser re-requests a
   missing font file once per element that asks for it, so leaving them live
   would fill the console with 404s for everyone who has not dropped files in.

   Only do this with a licence that permits it.

3. **Falls back to the closest free pairing.** Without either of the above the
   app uses **Inter** for body and item names (the nearest freely available
   neo-grotesque to Neue Haas Grotesk) and **Archivo** for the tracked
   uppercase HUD labels and numerals, because those need a variable width axis
   that Inter does not have. Both load from Google Fonts.

## Destiny Symbols

Bungie distributes a free symbol font for the in-game glyphs (the ability
icons, ammo marks and platform buttons that appear inside item text). If it is
installed on your machine it is picked up automatically. To use a file instead,
drop it in here:

```
assets/fonts/Destiny_Symbols_Common.woff2
```

and uncomment the `url(...)` line in the `Destiny Symbols` `@font-face` block
in `assets/css/tokens.css`. It binds to the `Destiny Symbols` family and is
applied by the `.glyph` class. Without it, `.glyph` falls back to the HUD face,
so nothing renders as tofu.

## Converting to woff2

If you have `.otf` or `.ttf` files, convert them first — browsers accept those
formats but woff2 is roughly half the size:

```bash
pip install fonttools brotli
fonttools ttLib.woff2 compress NeueHaasDisplay-Roman.otf
```

## Offline note

The Google Fonts fallback needs a network connection on first load. Once the
browser has cached it, the app works offline. If you never want a network
request at all, drop the real fonts in here and delete the
`fonts.googleapis.com` `<link>` from `index.html` — the `D2Fallback` face keeps
the layout stable in the gap either way.
