/* Build library: everything you have saved, searchable, taggable, and
   exportable — because a local-only library that cannot be backed up is a
   data-loss trap rather than a feature. */
(function (D2) {
  'use strict';
  var G = D2.game, S = D2.data, B = D2.build, U = D2.util, el = U.el;

  var Library = D2.libraryUI = {};
  var root, gridEl, query = '', activeTags = [], activeClass = null;

  function summary(b) {
    var parts = [];
    if (b.classId) parts.push(G.classById[b.classId].name);
    if (b.classId && b.element) {
      var p = B.path(b.classId, b.element);
      parts.push(p ? p.name : G.elementById[b.element].name);
    }
    var sup = b.subclass && b.subclass.superId && S.supers.filter(function (s) { return s.id === b.subclass.superId; })[0];
    if (sup) parts.push(sup.name);
    return parts.length ? parts.join(' · ') : 'Empty build';
  }

  function exoticNames(b) {
    var out = [];
    ['kinetic', 'energy', 'power'].forEach(function (sl) {
      var w = b.weapons && b.weapons[sl] && b.weapons[sl].weaponId && S.weaponById[b.weapons[sl].weaponId];
      if (w && w.rarity === 'exotic') out.push(w.name);
    });
    G.armorSlots.forEach(function (s) {
      var p = b.armor && b.armor[s.id];
      var x = p && p.exoticId && S.exoticArmorById[p.exoticId];
      if (x) out.push(x.name);
    });
    return out;
  }

  function card(b) {
    var isCurrent = D2.state.build && b.id === D2.state.build.id;
    var stats = B.computeStats(B.hydrate(b)).total;
    var exotics = exoticNames(b);

    return el('article', {
      class: 'buildcard' + (isCurrent ? ' is-current' : ''),
      style: b.element ? { '--el': G.elementById[b.element].color } : null
    }, [
      el('div', { class: 'buildcard__head' }, [
        el('span', {
          class: 'ico',
          style: { color: b.element ? G.elementById[b.element].color : 'var(--bone-500)', 'margin-top': '2px' },
          // Class mark, tinted by the equipped element: both facts in one glyph.
          html: D2.icon(b.classId || 'slot', { size: 22 })
        }),
        el('div', { class: 'stack', style: { 'min-width': '0' } }, [
          el('h3', { class: 'buildcard__title', text: b.name || 'Untitled Build' }),
          el('p', { class: 'buildcard__sub', text: summary(b) }),
          exotics.length
            ? el('p', { class: 'buildcard__sub', style: { color: 'var(--rar-exotic)' }, text: exotics.join(' + ') })
            : null
        ]),
        isCurrent ? el('span', { class: 'chip chip--el', style: { '--elc': 'var(--el)' }, text: 'Current' }) : null
      ]),

      el('div', { class: 'buildcard__stats' }, G.stats.map(function (st) {
        var v = stats[st.id];
        return el('div', { class: 'ministat' }, [
          el('div', { class: 'ministat__v num', style: v ? null : { color: 'var(--bone-400)' }, text: v }),
          el('div', { class: 'ministat__k', text: st.abbr }),
          el('div', { class: 'ministat__bar' }, [
            el('i', { style: { width: Math.min(100, (v / G.STAT_MAX) * 100) + '%' } })
          ])
        ]);
      })),

      b.tags && b.tags.length
        ? el('div', { class: 'buildcard__tags' }, b.tags.map(function (t) {
            return el('span', { class: 'chip', text: (G.tagById[t] || { name: t }).name });
          }))
        : null,

      el('div', { class: 'buildcard__foot' }, [
        el('button', {
          class: 'btn btn--sm',
          type: 'button',
          text: isCurrent ? 'Editing' : 'Open',
          disabled: isCurrent,
          onclick: function () {
            D2.state.replace(b);
            D2.state.setView('builder');
            D2.bus.emit('toast', { kind: 'ok', text: 'Opened "' + (b.name || 'Untitled') + '".' });
          }
        }),
        el('button', {
          class: 'btn btn--sm btn--ghost',
          type: 'button',
          title: 'Edit tags',
          html: D2.icon('edit', { size: 13 }),
          'aria-label': 'Edit tags for ' + b.name,
          onclick: function () { editTags(b); }
        }),
        el('button', {
          class: 'btn btn--sm btn--ghost',
          type: 'button',
          title: 'Duplicate',
          html: D2.icon('copy', { size: 13 }),
          'aria-label': 'Duplicate ' + b.name,
          onclick: function () { D2.library.duplicate(b.id); D2.bus.emit('toast', { kind: 'ok', text: 'Duplicated.' }); }
        }),
        el('button', {
          class: 'btn btn--sm btn--ghost',
          type: 'button',
          title: 'Compare against this build',
          html: D2.icon('compare', { size: 13 }),
          'aria-label': 'Compare with ' + b.name,
          onclick: function () { D2.compareUI.openWith(b.id); }
        }),
        el('span', { class: 'lbl lbl--micro push', text: U.formatDate(b.updatedAt) }),
        el('button', {
          class: 'btn btn--sm btn--ghost btn--danger',
          type: 'button',
          title: 'Delete',
          html: D2.icon('trash', { size: 13 }),
          'aria-label': 'Delete ' + b.name,
          onclick: function () { confirmDelete(b); }
        })
      ])
    ]);
  }

  function confirmDelete(b) {
    D2.shell.openDialog({
      title: 'Delete this build?',
      subtitle: b.name || 'Untitled Build',
      body: el('div', { class: 'stack gap4' }, [
        el('p', { class: 'hint', text: 'This removes it from your local library permanently. There is no undo, and nothing is stored anywhere else.' }),
        el('div', { class: 'row-x gap2' }, [
          el('button', {
            class: 'btn btn--danger',
            type: 'button',
            html: D2.icon('trash', { size: 14 }) + '<span>Delete build</span>',
            onclick: function () {
              D2.library.remove(b.id);
              D2.shell.closeDialog();
              D2.bus.emit('toast', { kind: 'ok', text: 'Deleted.' });
            }
          }),
          el('button', { class: 'btn btn--ghost', type: 'button', text: 'Cancel', onclick: function () { D2.shell.closeDialog(); } })
        ])
      ])
    });
  }

  function editTags(b) {
    var chosen = (b.tags || []).slice();
    var body = el('div', { class: 'stack gap4' }, [
      el('p', { class: 'hint', text: 'Tags are how you find a build six weeks from now. Pick as many as fit.' }),
      el('div', { class: 'filters' }, G.tags.map(function (t) {
        return el('button', {
          class: 'chip chip-btn' + (chosen.indexOf(t.id) !== -1 ? ' is-on' : ''),
          type: 'button',
          text: t.name,
          onclick: function (e) {
            var i = chosen.indexOf(t.id);
            if (i === -1) chosen.push(t.id); else chosen.splice(i, 1);
            e.currentTarget.classList.toggle('is-on');
          }
        });
      })),
      el('button', {
        class: 'btn btn--primary',
        type: 'button',
        text: 'Save tags',
        onclick: function () {
          var stored = D2.library.get(b.id);
          if (stored) { stored.tags = chosen; D2.library.save(stored); }
          if (D2.state.build.id === b.id) {
            D2.state.update(function (bb) { bb.tags = chosen; });
          }
          D2.shell.closeDialog();
        }
      })
    ]);
    D2.shell.openDialog({ title: 'Tags', subtitle: b.name, body: body });
  }

  function filtered() {
    return D2.library.all().filter(function (b) {
      if (activeClass && b.classId !== activeClass) return false;
      if (activeTags.length && !activeTags.every(function (t) { return (b.tags || []).indexOf(t) !== -1; })) return false;
      if (!query) return true;
      var hay = (b.name || '') + ' ' + summary(b) + ' ' + exoticNames(b).join(' ');
      return U.fuzzy(query, hay) >= 0;
    });
  }

  function renderGrid() {
    U.clear(gridEl);
    var items = filtered();
    var total = D2.library.all().length;

    if (!items.length) {
      gridEl.appendChild(el('div', { class: 'empty hatch', style: { 'grid-column': '1 / -1' } }, [
        el('div', { class: 'empty__title', text: total ? 'No builds match those filters' : 'Your library is empty' }),
        el('p', {
          class: 'empty__body',
          text: total
            ? 'Clear the search or the tag filters to see the other ' + total + '.'
            : 'Builds you save from the builder land here. Save the one you are working on with the button in the stat bar, and it stays on this machine — no account, no upload.'
        }),
        total ? null : el('button', {
          class: 'btn btn--primary mt4',
          type: 'button',
          style: { margin: '16px auto 0' },
          text: 'Back to the builder',
          onclick: function () { D2.state.setView('builder'); }
        })
      ]));
      return;
    }

    items.forEach(function (b) { gridEl.appendChild(card(b)); });
  }

  Library.mount = function (mountRoot) {
    root = mountRoot;

    var search = el('input', {
      class: 'input',
      type: 'search',
      placeholder: 'Search builds…',
      'aria-label': 'Search builds',
      style: { width: '240px' },
      oninput: U.debounce(function (e) { query = e.target.value.trim(); renderGrid(); }, 100)
    });

    var classChips = el('div', { class: 'filters' }, G.classes.map(function (c) {
      return el('button', {
        class: 'chip chip-btn',
        type: 'button',
        text: c.name,
        onclick: function (e) {
          // Class is single-select: clear the siblings, then light this one.
          activeClass = activeClass === c.id ? null : c.id;
          U.qsa('.chip-btn', e.currentTarget.parentNode).forEach(function (n) { n.classList.remove('is-on'); });
          if (activeClass) e.currentTarget.classList.add('is-on');
          renderGrid();
        }
      });
    }));

    var tagChips = el('div', { class: 'filters' }, G.tags.map(function (t) {
      return el('button', {
        class: 'chip chip-btn',
        type: 'button',
        text: t.name,
        onclick: function (e) {
          var i = activeTags.indexOf(t.id);
          if (i === -1) activeTags.push(t.id); else activeTags.splice(i, 1);
          e.currentTarget.classList.toggle('is-on');
          renderGrid();
        }
      });
    }));

    gridEl = el('div', { class: 'libgrid' });

    root.appendChild(el('div', { class: 'libwrap' }, [
      el('div', { class: 'section__head' }, [
        el('h2', { class: 'section__title', text: 'Build library' })
      ]),
      el('div', { class: 'libtools' }, [
        search,
        el('span', { class: 'push' }),
        el('button', {
          class: 'btn', type: 'button',
          html: D2.icon('download', { size: 15 }) + '<span>Export</span>',
          title: 'Save every build to a JSON file',
          onclick: exportLibrary
        }),
        el('button', {
          class: 'btn', type: 'button',
          html: D2.icon('upload', { size: 15 }) + '<span>Import</span>',
          title: 'Merge builds from a JSON file',
          onclick: importLibrary
        }),
        el('button', {
          class: 'btn btn--primary', type: 'button',
          html: D2.icon('plus', { size: 15 }) + '<span>New build</span>',
          onclick: function () { D2.shell.newBuild(); }
        })
      ]),
      el('div', { class: 'libfilters' }, [
        el('div', { class: 'libfilters__group' }, [el('span', { class: 'lbl', text: 'Class' }), classChips]),
        el('div', { class: 'libfilters__group' }, [el('span', { class: 'lbl', text: 'Tags' }), tagChips])
      ]),
      gridEl
    ]));

    renderGrid();
  };

  Library.render = renderGrid;

  /* ---------- export / import ---------- */

  function exportLibrary() {
    var json = D2.library.exportAll();
    var name = 'destiny-builds-' + new Date().toISOString().slice(0, 10) + '.json';
    var blob = new Blob([json], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = el('a', { href: url, download: name });
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
    D2.bus.emit('toast', { kind: 'ok', text: 'Exported ' + D2.library.all().length + ' builds.' });
  }

  function importLibrary() {
    var input = el('input', { type: 'file', accept: 'application/json,.json', style: { display: 'none' } });
    input.addEventListener('change', function () {
      var file = input.files && input.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function () {
        try {
          var n = D2.library.importAll(String(reader.result), 'merge');
          D2.bus.emit('toast', { kind: 'ok', text: 'Imported ' + n + ' builds.' });
        } catch (err) {
          D2.bus.emit('toast', { kind: 'error', text: 'Could not read that file: ' + err.message });
        }
        input.remove();
      };
      reader.onerror = function () {
        D2.bus.emit('toast', { kind: 'error', text: 'Could not read that file.' });
        input.remove();
      };
      reader.readAsText(file);
    });
    document.body.appendChild(input);
    input.click();
  }
})(window.D2);
