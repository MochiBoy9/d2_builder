/* Shell: top bar, view switching, element theming, dialogs, toasts, sync. */
(function (D2) {
  'use strict';
  var G = D2.game, S = D2.data, U = D2.util, el = U.el;

  var Shell = D2.shell = {};
  var nameInput, viewButtons = {}, sweepEl, toastHost, dialogRefs = null, levelBtn;

  /* ---------------- element theming ---------------- */

  function hexToRgba(hex, a) {
    var h = hex.replace('#', '');
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var n = parseInt(h, 16);
    return 'rgba(' + ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a + ')';
  }

  function lighten(hex, amt) {
    var h = hex.replace('#', '');
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var n = parseInt(h, 16);
    var r = Math.min(255, Math.round(((n >> 16) & 255) + 255 * amt));
    var g = Math.min(255, Math.round(((n >> 8) & 255) + 255 * amt));
    var b = Math.min(255, Math.round((n & 255) + 255 * amt));
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  Shell.applyTheme = function () {
    var b = D2.state.build;
    var color = b.element ? (G.elementById[b.element] || {}).color : null;
    var root = document.documentElement;
    var accent = color || '#D9AE4A';
    root.style.setProperty('--el', accent);
    root.style.setProperty('--el-hi', lighten(accent, 0.16));
    root.style.setProperty('--el-ghost', hexToRgba(accent, 0.14));
    root.style.setProperty('--el-wash', hexToRgba(accent, b.element ? 0.075 : 0.05));
  };

  Shell.fireSweep = function () {
    if (!sweepEl) return;
    sweepEl.classList.remove('is-firing');
    void sweepEl.offsetWidth;
    sweepEl.classList.add('is-firing');
  };

  /* ---------------- dialogs (same slide-over grammar as the picker) ------ */

  Shell.openDialog = function (cfg) {
    Shell.closeDialog();
    var restore = document.activeElement;
    var scrim = el('div', { class: 'scrim', onclick: Shell.closeDialog });
    var panel = el('div', {
      class: 'sheet-panel',
      role: 'dialog',
      'aria-modal': 'true',
      'aria-label': cfg.title,
      style: { 'grid-template-rows': 'auto 1fr' }
    }, [
      el('div', { class: 'sheet-panel__head' }, [
        el('div', { class: 'stack', style: { 'min-width': '0' } }, [
          el('div', { class: 'sheet-panel__title', text: cfg.title }),
          cfg.subtitle ? el('div', { class: 'sheet-panel__sub', text: cfg.subtitle }) : null
        ]),
        el('button', {
          class: 'btn btn--ghost btn--icon push',
          type: 'button',
          'aria-label': 'Close',
          html: D2.icon('close'),
          onclick: Shell.closeDialog
        })
      ]),
      el('div', { class: 'sheet-panel__list' }, [cfg.body])
    ]);

    function onKey(e) {
      if (e.key === 'Escape') { e.stopPropagation(); Shell.closeDialog(); }
    }
    document.addEventListener('keydown', onKey, true);
    document.body.appendChild(scrim);
    document.body.appendChild(panel);
    dialogRefs = { scrim: scrim, panel: panel, onKey: onKey, restore: restore };

    var first = panel.querySelector('input, select, textarea, button:not([aria-label="Close"])');
    if (first) first.focus();
  };

  Shell.closeDialog = function () {
    if (!dialogRefs) return;
    document.removeEventListener('keydown', dialogRefs.onKey, true);
    dialogRefs.scrim.remove();
    dialogRefs.panel.remove();
    var r = dialogRefs.restore;
    dialogRefs = null;
    if (r && r.isConnected) r.focus();
  };

  /* ---------------- toasts ---------------- */

  function toast(payload) {
    var kind = payload.kind || 'ok';
    var node = el('div', { class: 'toast toast--' + (kind === 'error' ? 'error' : kind === 'warn' ? 'warn' : 'ok'), role: 'status' }, [
      el('span', { class: 'ico', html: D2.icon(kind === 'error' ? 'warn' : kind === 'warn' ? 'info' : 'check', { size: 16 }) }),
      el('span', { text: payload.text })
    ]);
    toastHost.appendChild(node);
    setTimeout(function () {
      node.style.transition = 'opacity 200ms, transform 200ms';
      node.style.opacity = '0';
      node.style.transform = 'translateY(6px)';
      setTimeout(function () { node.remove(); }, 220);
    }, kind === 'error' ? 6000 : 3000);
  }

  /* ---------------- build actions ---------------- */

  Shell.newBuild = function () {
    var fresh = D2.build.create();
    D2.state.replace(fresh);
    D2.state.setView('builder');
    toast({ kind: 'ok', text: 'Started a new build.' });
  };

  Shell.saveCurrent = function () {
    var b = D2.state.build;
    if (!b.name || b.name === 'Untitled Build') {
      var input = el('input', { class: 'input', type: 'text', value: '', placeholder: 'e.g. Prismatic Consecration Titan' });
      function commit() {
        var name = input.value.trim() || 'Untitled Build';
        D2.state.update(function (bb) { bb.name = name; });
        D2.library.save(D2.state.build);
        Shell.closeDialog();
        toast({ kind: 'ok', text: 'Saved "' + name + '".' });
      }
      Shell.openDialog({
        title: 'Name this build',
        subtitle: 'It goes into your library under this name.',
        body: el('div', { class: 'stack gap4' }, [
          el('div', { class: 'field' }, [el('span', { class: 'field__lbl', text: 'Build name' }), input]),
          el('button', { class: 'btn btn--primary', type: 'button', text: 'Save to library', onclick: commit })
        ])
      });
      // Bound to the handler rather than to a querySelector, which would find
      // the wrong primary button if a picker were open behind this dialog.
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { e.preventDefault(); commit(); }
      });
      return;
    }
    D2.library.save(b);
    toast({ kind: 'ok', text: 'Saved "' + b.name + '".' });
  };

  /* ---------------- manifest sync ---------------- */

  function openSync() {
    var stats = D2.manifest.stats();
    var keyInput = el('input', {
      class: 'input', type: 'password', autocomplete: 'off', spellcheck: 'false',
      placeholder: 'Paste your Bungie API key',
      value: D2.settings.get('apiKey') || ''
    });
    var status = el('p', { class: 'hint' });
    var progressTrack = el('div', { class: 'energy__bar', style: { display: 'none' } });
    var progressFill = el('i', { class: 'energy__fill', style: { transform: 'scaleX(0)' } });
    progressTrack.appendChild(progressFill);

    function setStatus(text, pct) {
      status.textContent = text;
      if (pct != null) {
        progressTrack.style.display = 'block';
        progressFill.style.transform = 'scaleX(' + pct + ')';
      }
    }

    var syncBtn = el('button', {
      class: 'btn btn--primary',
      type: 'button',
      html: D2.icon('sync', { size: 15 }) + '<span>Sync now</span>',
      onclick: function () {
        var key = keyInput.value.trim();
        if (!key) { setStatus('Enter an API key first.'); return; }
        D2.settings.set('apiKey', key);
        syncBtn.disabled = true;
        setStatus('Starting…', 0.01);
        D2.manifest.sync(key, setStatus).then(function () {
          syncBtn.disabled = false;
          var s = D2.manifest.stats();
          setStatus('Synced ' + s.weapons.toLocaleString() + ' weapons, ' + s.armor.toLocaleString() +
            ' armor pieces, ' + s.plugs.toLocaleString() + ' weapon perks and ' + s.mods.toLocaleString() +
            ' armor mods. Exact roll lists for ' + s.rolls.toLocaleString() + ' weapons.', 1);
          toast({ kind: 'ok', text: 'Manifest synced.' });
          D2.bus.emit('build:change', {});
        }).catch(function (err) {
          syncBtn.disabled = false;
          progressTrack.style.display = 'none';
          setStatus('Sync failed: ' + err.message);
          toast({ kind: 'error', text: 'Sync failed: ' + err.message });
        });
      }
    });

    var body = el('div', { class: 'stack gap4' }, [
      el('p', { class: 'hint', text: 'The offline library covers every subclass in full, every Exotic weapon and armor piece, and a curated slice of Legendaries. It is a hand-written snapshot, so it cannot be every item in a game that has thousands and adds more each season. Syncing swaps in Bungie’s own item database and closes that gap completely.' }),

      el('div', { class: 'stack gap2' }, [
        el('div', { class: 'lbl', text: 'What a sync adds' }),
        el('div', { class: 'verbrows' }, [
          ['Every weapon', 'with its real type, damage type, ammo and icon.'],
          ['Every armor piece', 'including the full Exotic list for all three classes.'],
          ['Every weapon perk', 'barrels, magazines, traits, origin traits and masterworks.'],
          ['Every armor mod', 'with its stat contributions mapped into the six Armor 3.0 stats.'],
          ['Exact roll lists', 'each weapon’s own sockets, so a perk column shows only what that gun can actually roll.']
        ].map(function (row) {
          return el('div', { class: 'lvlcard__row' }, [
            el('span', { class: 'lbl lbl--micro lvlcard__verb', text: row[0] }),
            el('span', { text: row[1] })
          ]);
        }))
      ]),

      stats.ready
        ? el('div', { class: 'note' }, [
            el('span', { class: 'ico', style: { color: 'var(--ok)' }, html: D2.icon('check', { size: 16 }) }),
            el('span', { text: stats.weapons.toLocaleString() + ' weapons, ' + stats.armor.toLocaleString() +
              ' armor pieces, ' + stats.plugs.toLocaleString() + ' weapon perks and ' + stats.mods.toLocaleString() +
              ' armor mods loaded, with exact roll lists for ' + stats.rolls.toLocaleString() +
              ' weapons. Last synced ' + U.formatDate(stats.syncedAt) + '.' })
          ])
        : el('div', { class: 'note' }, [
            el('span', { class: 'ico', html: D2.icon('info', { size: 16 }) }),
            el('span', { text: 'Not synced. The app is fully usable without this — you just get the curated snapshot rather than the whole game.' })
          ]),

      el('div', { class: 'field' }, [
        el('span', { class: 'field__lbl', text: 'Bungie API key' }),
        keyInput,
        el('p', { class: 'hint' }, [
          'Free from ',
          el('a', { href: 'https://www.bungie.net/en/Application', target: '_blank', rel: 'noopener noreferrer', text: 'bungie.net/en/Application' }),
          ' — create an application, set OAuth to "None", and copy the API key. It is stored only in this browser and only ever sent to bungie.net.'
        ])
      ]),

      el('div', { class: 'row-x gap2' }, [
        syncBtn,
        stats.ready ? el('button', {
          class: 'btn btn--ghost btn--danger',
          type: 'button',
          html: D2.icon('trash', { size: 14 }) + '<span>Clear synced data</span>',
          onclick: function () {
            D2.manifest.clear().then(function () {
              Shell.closeDialog();
              toast({ kind: 'ok', text: 'Synced data cleared. Offline library is back.' });
              D2.bus.emit('build:change', {});
            });
          }
        }) : null
      ]),
      progressTrack,
      status,

      el('hr', { class: 'divider' }),
      location.protocol === 'file:'
        ? el('div', { class: 'note note--warn' }, [
            el('span', { class: 'ico', html: D2.icon('warn', { size: 16 }) }),
            el('span', { text: 'This page is open straight from a file, and browsers block network requests there — sync cannot run. Start serve.ps1 in the app folder and open http://localhost:8123 instead. Everything else works exactly as it does now.' })
          ])
        : el('div', { class: 'note note--warn' }, [
            el('span', { class: 'ico', html: D2.icon('warn', { size: 16 }) }),
            el('span', { text: 'The definitions file is large — expect tens of megabytes and a minute or two on a first sync.' })
          ])
    ]);

    Shell.openDialog({ title: 'Item database', subtitle: 'Offline library, or live Bungie manifest', body: body });
  }

  /* ---------------- experience level ---------------- */

  /* What actually changes, said plainly, so the choice is informed rather than
     a guess between three adjectives. */
  var LEVEL_EFFECTS = {
    beginner: [
      ['Shows', 'Plain-language notes on every section, a running “do this next” instruction, and a definition for every game term the moment it appears.'],
      ['Shows', 'Starter builds you can load complete and then take apart.'],
      ['Simplifies', 'Weapons show their two trait columns only — the ones that change how a gun plays.'],
      ['Hides', 'Manual stat entry, the editable tier table, Fragment stat overrides, artifice sockets and armor set tracking.']
    ],
    midgame: [
      ['Shows', 'Every slot, all seven weapon perk columns, artifice sockets, armor sets and catalysts.'],
      ['Shows', 'Short coaching notes on what a choice is worth, and starter builds.'],
      ['Hides', 'The balance-model editors — the tier point table and per-Fragment stat overrides.']
    ],
    veteran: [
      ['Shows', 'Everything, including manual per-piece stat entry, the editable tier table, Fragment stat overrides and Aspect slot corrections.'],
      ['Removes', 'Coaching notes and term definitions. Nothing is explained that you already know.'],
      ['Tightens', 'Denser spacing throughout.']
    ]
  };

  function levelCard(def, onPick) {
    var on = D2.level.is(def.id);
    return el('button', {
      class: 'lvlcard' + (on ? ' is-on' : ''),
      type: 'button',
      'aria-pressed': on ? 'true' : 'false',
      onclick: function () { onPick(def.id); }
    }, [
      el('div', { class: 'lvlcard__head' }, [
        el('span', { class: 'lvlcard__icon ico', html: D2.icon(def.icon, { size: 20 }) }),
        el('span', { class: 'stack', style: { 'min-width': '0' } }, [
          el('span', { class: 'lvlcard__name', text: def.name }),
          el('span', { class: 'lvlcard__tag', text: def.tagline })
        ]),
        on ? el('span', { class: 'chip chip--el push', style: { '--elc': 'var(--el)' }, text: 'Current' }) : null
      ]),
      el('div', { class: 'lvlcard__list verbrows' }, LEVEL_EFFECTS[def.id].map(function (row) {
        return el('div', { class: 'lvlcard__row' }, [
          el('span', { class: 'lbl lbl--micro lvlcard__verb', text: row[0] }),
          el('span', { text: row[1] })
        ]);
      }))
    ]);
  }

  Shell.openLevelPicker = function (firstRun) {
    var body = el('div', { class: 'stack gap4' }, [
      el('p', { class: 'hint', text: firstRun
        ? 'One question before you start, so the app shows you the right amount of machinery. You can change it any time from the top bar — it never touches your builds.'
        : 'How much of the tool to expose, and how much to explain. Switching is instant and never edits a build.' }),
      el('div', { class: 'lvlgrid' }, D2.level.levels.map(function (def) {
        return levelCard(def, function (id) {
          D2.level.set(id);
          D2.level.markChosen();
          Shell.closeDialog();
          toast({ kind: 'ok', text: D2.level.byId[id].name + ' mode.' });
        });
      })),
      el('p', { class: 'hint dimmer', text: 'A build made in one mode is the same build in every other mode. Only the interface differs.' })
    ]);

    Shell.openDialog({
      title: firstRun ? 'How much do you already know?' : 'Builder mode',
      subtitle: firstRun ? 'This only changes the interface, never the maths' : 'How much the app shows and explains',
      body: body
    });
  };

  /* ---------------- starter builds ---------------- */

  Shell.openPresets = function () {
    var suggested = D2.presets.suggested();
    var others = D2.presets.all().filter(function (p) { return suggested.indexOf(p) === -1; });

    function presetRow(p) {
      var cls = G.classById[p.classId];
      var elDef = G.elementById[p.element];
      var path = D2.build.path(p.classId, p.element);
      return el('div', { class: 'preset', style: { '--elc': elDef.color } }, [
        el('div', { class: 'preset__head' }, [
          el('span', { class: 'preset__icon ico', style: { color: elDef.color }, html: D2.icon(p.element, { size: 20 }) }),
          el('span', { class: 'stack', style: { 'min-width': '0' } }, [
            el('span', { class: 'preset__name', text: p.name }),
            el('span', { class: 'preset__sub', text: cls.name + ' · ' + (path ? path.name : elDef.name) })
          ]),
          el('button', {
            class: 'btn btn--primary btn--sm push',
            type: 'button',
            text: 'Load',
            onclick: function () {
              var build = D2.presets.toBuild(p);
              D2.state.replace(build);
              D2.state.setView('builder');
              Shell.closeDialog();
              toast({ kind: 'ok', text: 'Loaded “' + p.name + '”. Everything in it is editable.' });
            }
          })
        ]),
        el('p', { class: 'preset__pitch', text: p.pitch }),
        D2.level.show('coach') ? el('p', { class: 'hint', text: p.how }) : null,
        el('div', { class: 'preset__stats num', text: D2.presets.statLine(p) })
      ]);
    }

    var body = el('div', { class: 'stack gap4' }, [
      el('p', { class: 'hint', text: 'Complete, legal builds you can load whole and then take apart. Armor is set to plausible archetypes rather than perfect rolls — correct each piece to whatever you actually have and the stats follow.' }),
      el('div', { class: 'stack gap3' }, suggested.map(presetRow)),
      others.length ? el('hr', { class: 'divider' }) : null,
      others.length ? el('div', { class: 'lbl', text: 'Other builds' }) : null,
      others.length ? el('div', { class: 'stack gap3' }, others.map(presetRow)) : null
    ]);

    Shell.openDialog({ title: 'Starter builds', subtitle: 'Load one, then change everything about it', body: body });
  };

  /* ---------------- about / data provenance ---------------- */

  function openAbout() {
    var body = el('div', { class: 'stack gap4' }, [
      el('p', { class: 'hint', text: 'A local Destiny 2 loadout workbench. Nothing leaves this machine: builds live in your browser’s storage, and the only network request the app ever makes is the optional Bungie manifest sync you trigger yourself.' }),

      el('div', { class: 'stack gap2' }, [
        el('div', { class: 'lbl', text: 'Builder mode' }),
        el('p', { class: 'hint', text: 'Beginner, Mid-game and Veteran change how much of the tool is exposed and how much is explained — not what a build is or what the maths does. Switch any time from the top bar; a build made in one mode is the same build in every other. Starter builds (the ✦ button) load a complete, legal build you can take apart.' })
      ]),

      el('div', { class: 'stack gap2' }, [
        el('div', { class: 'lbl', text: 'What the offline library contains' }),
        el('p', { class: 'hint', text: 'All 18 subclass paths with every Super, grenade, melee, class ability, movement mode, Aspect and Fragment. Every Exotic weapon and Exotic armor piece it knows about, with their intrinsic perks and catalysts. A curated slice of Legendaries, the full weapon perk pool, the armor mod list, and the Armor 3.0 archetype system.' })
      ]),

      el('div', { class: 'stack gap2' }, [
        el('div', { class: 'lbl', text: 'Weapon perk columns' }),
        el('p', { class: 'hint', text: 'A perk column shows what that specific weapon rolls, not everything its type can roll, and a column the weapon does not have is not drawn at all. The label says which source it used: EXACT is Bungie’s own socket data after a manifest sync, CHECKED is a hand-written roll list, TYPE POOL is the honest fallback for a weapon neither covers.' })
      ]),

      el('div', { class: 'stack gap2' }, [
        el('div', { class: 'lbl', text: 'What it does not claim' }),
        el('p', { class: 'hint', text: 'It is a snapshot, not a live feed. Newer releases add Exotics it has not seen, and Prismatic ability pools are curated by Bungie and shift between seasons. Numbers that balance patches move — the tier point spreads, the masterwork bonus, Aspect fragment-slot counts and Fragment stat modifiers — are all editable in the app rather than baked in, and manifest sync replaces the item list with the game’s own data.' })
      ]),

      el('div', { class: 'stack gap2' }, [
        el('div', { class: 'lbl', text: 'The maths' }),
        el('p', { class: 'hint', text: 'Stat totals, per-source attribution, energy budgets and breakpoint distances are computed exactly and show their working — tap any stat in the bar. Ability cooldowns in seconds are deliberately not shown, because publishing invented numbers would be worse than publishing none.' })
      ]),

      el('div', { class: 'stack gap2' }, [
        el('div', { class: 'lbl', text: 'Keyboard' }),
        el('div', { class: 'stack gap1' }, [
          ['B', 'Builder'], ['L', 'Library'], ['C', 'Compare'],
          ['S', 'Save to library'], ['N', 'New build'],
          ['P', 'Starter builds'], ['M', 'Builder mode'], ['Esc', 'Close a panel']
        ].map(function (pair) {
          return el('div', { class: 'row-x gap3' }, [
            el('span', { class: 'chip', style: { 'min-width': '38px', 'justify-content': 'center' }, text: pair[0] }),
            el('span', { class: 'hint', text: pair[1] })
          ]);
        }))
      ]),

      el('p', { class: 'hint dimmer', text: 'Destiny 2 is a trademark of Bungie, Inc. This is an unofficial fan tool with no affiliation.' })
    ]);
    Shell.openDialog({ title: 'About this app', subtitle: 'Where the data comes from, and what it is worth', body: body });
  }

  /* ---------------- top bar ---------------- */

  function viewButton(id, label, glyph) {
    var btn = el('button', {
      class: 'btn btn--ghost',
      type: 'button',
      'aria-pressed': 'false',
      // Named on the element rather than only by the span, because the span is
      // what collapses on a phone.
      title: label,
      'aria-label': label,
      html: D2.icon(glyph, { size: 15 }) + '<span>' + label + '</span>',
      onclick: function () { D2.state.setView(id); }
    });
    viewButtons[id] = btn;
    return btn;
  }

  Shell.mountTopbar = function (root) {
    nameInput = el('input', {
      class: 'name-field',
      type: 'text',
      'aria-label': 'Build name',
      spellcheck: 'false',
      value: D2.state.build.name,
      oninput: function (e) {
        var v = e.target.value;
        D2.state.update(function (b) { b.name = v; }, { statsOnly: true });
      }
    });

    root.appendChild(el('header', { class: 'topbar' }, [
      el('div', { class: 'mark' }, [
        el('span', { class: 'mark__glyph ico', html: D2.icon('prismatic', { size: 22 }) }),
        el('span', { class: 'mark__text' }, ['BUILD ', el('span', { text: 'MAKER' })])
      ]),
      el('div', { class: 'topbar__name' }, [nameInput]),
      el('div', { class: 'topbar__actions' }, [
        viewButton('builder', 'Builder', 'grid'),
        viewButton('library', 'Library', 'library'),
        viewButton('compare', 'Compare', 'compare'),
        el('span', { style: { width: '1px', height: '22px', background: 'var(--rule)', margin: '0 4px' } }),
        (levelBtn = el('button', {
          class: 'btn btn--ghost lvlbtn',
          type: 'button',
          title: 'Builder mode — how much the app shows and explains',
          'aria-label': 'Builder mode',
          onclick: function () { Shell.openLevelPicker(false); }
        })),
        el('button', {
          class: 'btn btn--ghost btn--icon',
          type: 'button',
          title: 'Starter builds',
          'aria-label': 'Starter builds',
          html: D2.icon('spark', { size: 16 }),
          onclick: function () { Shell.openPresets(); }
        }),
        el('button', {
          class: 'btn btn--ghost btn--icon',
          type: 'button',
          title: 'Item database and Bungie sync',
          'aria-label': 'Item database and Bungie sync',
          html: D2.icon('sync', { size: 16 }),
          onclick: openSync
        }),
        el('button', {
          class: 'btn btn--ghost btn--icon',
          type: 'button',
          title: 'About this app',
          'aria-label': 'About this app',
          html: D2.icon('info', { size: 16 }),
          onclick: openAbout
        })
      ])
    ]));

    sweepEl = el('div', { class: 'sweep' });
    toastHost = el('div', { class: 'toasts' });
    document.body.appendChild(sweepEl);
    document.body.appendChild(toastHost);
    D2.bus.on('toast', toast);
  };

  Shell.syncTopbar = function () {
    if (nameInput && document.activeElement !== nameInput && nameInput.value !== D2.state.build.name) {
      nameInput.value = D2.state.build.name;
    }
    if (levelBtn) {
      var def = D2.level.def();
      levelBtn.innerHTML = D2.icon(def.icon, { size: 15 }) + '<span>' + U.esc(def.name) + '</span>';
    }
    Object.keys(viewButtons).forEach(function (id) {
      var on = D2.state.view === id;
      viewButtons[id].classList.toggle('is-on', on);
      viewButtons[id].setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  };

  /* ---------------- keyboard ---------------- */

  Shell.bindKeys = function () {
    document.addEventListener('keydown', function (e) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      var t = e.target;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable)) return;
      if (document.querySelector('.sheet-panel')) return;
      var k = e.key.toLowerCase();
      if (k === 'b') { D2.state.setView('builder'); }
      else if (k === 'l') { D2.state.setView('library'); }
      else if (k === 'c') { D2.state.setView('compare'); }
      else if (k === 's') { e.preventDefault(); Shell.saveCurrent(); }
      else if (k === 'n') { Shell.newBuild(); }
      else if (k === 'p') { Shell.openPresets(); }
      else if (k === 'm') { Shell.openLevelPicker(false); }
    });
  };
})(window.D2);
