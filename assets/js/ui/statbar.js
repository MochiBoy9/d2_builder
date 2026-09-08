/* The stat bar. Pinned from first paint, including at zero, because an empty
   readout teaches the six stats better than a blank space does.
   Clicking a stat shows its full attribution -- every piece, mod and fragment
   that contributed, and what the next breakpoint costs. */
(function (D2) {
  'use strict';
  var G = D2.game, B = D2.build, U = D2.util, el = U.el;

  var Statbar = D2.statbar = {};
  var host, totalsEl, actionsEl;

  /* The stat-model editor is a theorycrafter's tool -- it changes what the
     calculator believes about the game, which is not a button a new player
     should be able to press by accident. */
  function renderActions() {
    if (!actionsEl) return;
    U.clear(actionsEl);
    if (D2.level.show('statModel')) {
      actionsEl.appendChild(el('button', {
        class: 'btn',
        type: 'button',
        html: D2.icon('settings', { size: 15 }) + '<span>Stat model</span>',
        title: 'Edit the tier table and masterwork bonus this calculator uses',
        onclick: openModelEditor
      }));
    }
    actionsEl.appendChild(el('button', {
      class: 'btn btn--primary',
      type: 'button',
      html: D2.icon('library', { size: 15 }) + '<span>Save to library</span>',
      onclick: function () { D2.shell.saveCurrent(); }
    }));
  }

  // The bar's height changes with breakpoint, wrapping and content, so the
  // dossier reserves whatever it actually measures rather than a guessed
  // per-breakpoint constant that clips the last section.
  function syncHeight() {
    if (!host) return;
    var h = Math.ceil(host.getBoundingClientRect().height);
    if (h > 0) document.documentElement.style.setProperty('--statbar-h', h + 'px');
  }

  function bar(statDef, value, ctx) {
    // Each half of the track is its own segment scaled 0..1 from its left edge.
    var underScale = Math.min(value, G.STAT_PIVOT) / G.STAT_PIVOT;
    var overScale = value > G.STAT_PIVOT ? (value - G.STAT_PIVOT) / G.STAT_PIVOT : 0;

    var note;
    if (value === 0) note = statDef.hint;
    else if (value >= G.STAT_MAX) note = 'Capped';
    else if (ctx.toPivot > 0) note = '+' + ctx.toPivot + ' to 100';
    else note = 'T' + ctx.tier + ' · +' + ctx.toNextTen + ' to T' + (ctx.tier + 1);

    // Tiers are jargon. Say the same arithmetic in words for a new player.
    if (D2.level.show('simpleStats') && value > 0 && value < G.STAT_MAX) {
      note = ctx.toPivot > 0
        ? ctx.toPivot + ' more to reach 100'
        : ctx.toNextTen + ' more to the next step';
    }

    return el('button', {
      class: 'stat',
      type: 'button',
      'aria-label': statDef.name + ' ' + value + ' of ' + G.STAT_MAX + '. ' + note,
      onclick: function () { openDetail(statDef.id); }
    }, [
      el('span', { class: 'stat__top' }, [
        // Full name where there is room, three-letter code where there is not.
        el('span', { class: 'stat__abbr stat__abbr--long', text: statDef.name.toUpperCase() }),
        el('span', { class: 'stat__abbr stat__abbr--short', text: statDef.abbr }),
        el('span', { class: 'stat__val num' + (value ? '' : ' is-zero'), text: value })
      ]),
      el('span', { class: 'stat__track' }, [
        el('i', { class: 'stat__fill', style: { transform: 'scaleX(' + underScale + ')' } }),
        overScale ? el('i', {
          class: 'stat__fill stat__fill--over',
          style: { transform: 'scaleX(' + overScale + ')' }
        }) : null
      ]),
      el('span', { class: 'stat__note', text: note })
    ]);
  }

  function openDetail(statId) {
    var b = D2.state.build;
    var res = B.computeStats(b);
    var def = G.statById[statId];
    var value = res.total[statId];
    var ctx = B.statContext(value);
    var rows = res.breakdown[statId];

    var body = el('div', { class: 'stack gap4' }, [
      el('div', { class: 'row-x gap3' }, [
        el('div', { class: 'display', style: { 'font-size': 'var(--fs-3xl)' }, text: value }),
        el('div', { class: 'stack' }, [
          el('span', { class: 'lbl lbl--el', text: 'Tier ' + ctx.tier + ' of 20' }),
          el('span', { class: 'hint', text: ctx.toPivot > 0
            ? ctx.toPivot + ' more points reaches 100, where ' + def.name + ' starts paying out differently.'
            : (ctx.toMax > 0 ? ctx.toNextTen + ' more points reaches tier ' + (ctx.tier + 1) + '. ' + ctx.toMax + ' from the cap.' : 'At the 200 cap.') })
        ])
      ]),

      el('div', { class: 'stack gap2' }, [
        el('div', { class: 'note' }, [
          el('span', { class: 'ico', html: D2.icon('info', { size: 16 }) }),
          el('span', {}, [el('strong', { text: '0–100 · ' }), def.under])
        ]),
        el('div', { class: 'note' }, [
          el('span', { class: 'ico', html: D2.icon('arrowUp', { size: 16 }) }),
          el('span', {}, [el('strong', { text: '100–200 · ' }), def.over])
        ])
      ]),

      el('div', { class: 'stack gap2' }, [
        el('div', { class: 'lbl', text: 'Where it comes from' }),
        rows.length
          ? el('div', { class: 'stack' }, rows.map(function (r) {
              return el('div', {
                class: 'row-x gap3',
                style: { padding: '7px 0', 'border-bottom': '1px solid var(--rule)' }
              }, [
                el('span', { class: 'ico dimmer', html: D2.icon(r.group === 'fragment' ? 'fragment' : 'grid', { size: 14 }) }),
                el('span', { style: { 'min-width': '0' }, text: r.label }),
                el('span', {
                  class: 'num push',
                  style: { color: r.value > 0 ? 'var(--el)' : 'var(--err)', 'font-weight': '660' },
                  text: (r.value > 0 ? '+' : '') + r.value
                })
              ]);
            }))
          : el('p', { class: 'hint', text: 'Nothing contributes to ' + def.name + ' yet. Set archetypes on your armor, or slot a ' + def.name + ' mod.' })
      ]),

      res.overflow[statId] > 0
        ? el('div', { class: 'note note--warn' }, [
            el('span', { class: 'ico', html: D2.icon('warn', { size: 16 }) }),
            el('span', { text: res.overflow[statId] + ' points are wasted above the 200 cap. Move a mod somewhere useful.' })
          ])
        : null
    ]);

    D2.shell.openDialog({ title: def.name, subtitle: 'Armor 3.0 stat', body: body });
  }

  Statbar.mount = function (root) {
    totalsEl = el('div', { class: 'statbar__stats' });
    actionsEl = el('div', { class: 'row-x gap2' });
    host = el('div', {
      class: 'statbar',
      role: 'region',
      'aria-label': 'Build stats'
    }, [
      el('div', { class: 'statbar__inner' }, [totalsEl, actionsEl])
    ]);
    root.appendChild(host);
    renderActions();

    if (window.ResizeObserver) {
      new ResizeObserver(syncHeight).observe(host);
    }
    window.addEventListener('resize', U.debounce(syncHeight, 120));

    Statbar.render();
  };

  Statbar.render = function () {
    var b = D2.state.build;
    var res = B.computeStats(b);
    renderActions();
    U.clear(totalsEl);
    G.stats.forEach(function (st) {
      var v = res.total[st.id];
      totalsEl.appendChild(bar(st, v, B.statContext(v)));
    });
    syncHeight();
  };

  /* The editable stat model. Balance patches move these numbers; this is how
     you keep the calculator honest without waiting for an app update. */
  function openModelEditor() {
    var table = U.clone(D2.settings.get('tierTable'));
    var mwInput;

    var rows = table.map(function (row) {
      return el('div', { class: 'row-x gap2', style: { padding: '6px 0' } }, [
        el('span', { class: 'lbl', style: { width: '58px' }, text: 'Tier ' + row.tier }),
        ['primary', 'secondary', 'tertiary'].map(function (k) {
          return el('label', { class: 'statin', style: { flex: '1' } }, [
            el('span', { class: 'lbl lbl--micro', text: k }),
            el('input', {
              class: 'input', type: 'number', min: '0', max: '100', value: row[k],
              'aria-label': 'Tier ' + row.tier + ' ' + k,
              oninput: function (e) { row[k] = Number(e.target.value) || 0; }
            })
          ]);
        })
      ]);
    });

    var body = el('div', { class: 'stack gap4' }, [
      el('div', { class: 'note' }, [
        el('span', { class: 'ico', html: D2.icon('info', { size: 16 }) }),
        el('span', { text: 'These are the numbers the archetype calculator uses. They ship as sensible defaults, not as patch-exact truth — if a balance pass changes them, correct them here and every build recalculates.' })
      ]),
      el('div', { class: 'stack' }, [el('div', { class: 'lbl', text: 'Points per tier' })].concat(rows)),
      el('div', { class: 'field' }, [
        el('span', { class: 'field__lbl', text: 'Masterwork bonus (added to the primary stat)' }),
        mwInput = el('input', {
          class: 'input', type: 'number', min: '0', max: '50',
          value: D2.settings.get('masterworkBonus')
        })
      ]),
      el('div', { class: 'row-x gap2' }, [
        el('button', {
          class: 'btn btn--primary',
          type: 'button',
          text: 'Apply',
          onclick: function () {
            D2.settings.set('tierTable', table);
            D2.settings.set('masterworkBonus', Number(mwInput.value) || 0);
            D2.shell.closeDialog();
            D2.bus.emit('build:change', {});
            D2.bus.emit('toast', { kind: 'ok', text: 'Stat model updated.' });
          }
        }),
        el('button', {
          class: 'btn btn--ghost',
          type: 'button',
          text: 'Reset to defaults',
          onclick: function () {
            D2.settings.set('tierTable', U.clone(G.tierTable));
            D2.settings.set('masterworkBonus', G.MASTERWORK_BONUS);
            D2.shell.closeDialog();
            D2.bus.emit('build:change', {});
            D2.bus.emit('toast', { kind: 'ok', text: 'Stat model reset.' });
          }
        })
      ])
    ]);

    D2.shell.openDialog({ title: 'Stat model', subtitle: 'Editable so a patch never makes the maths wrong', body: body });
  }

  Statbar.setVisible = function (on) {
    if (!host) return;
    host.style.transform = on ? 'none' : 'translateY(110%)';
  };
})(window.D2);
