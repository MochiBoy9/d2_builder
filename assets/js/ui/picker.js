/* The slide-over picker. Every "choose a thing" in this app goes through here,
   so search, filtering, keyboard handling and empty states behave identically
   whether you are picking a Super, a barrel, or an Exotic helmet. */
(function (D2) {
  'use strict';
  var U = D2.util, el = U.el;

  var open = null;

  function close() {
    if (!open) return;
    document.removeEventListener('keydown', onKey, true);
    open.scrim.remove();
    open.panel.remove();
    var restore = open.restoreFocus;
    open = null;
    if (restore && restore.isConnected) restore.focus();
  }

  function onKey(e) {
    if (!open) return;
    if (e.key === 'Escape') { e.stopPropagation(); close(); return; }
    if (e.key === 'Enter' && document.activeElement === open.search) {
      var first = open.list.querySelector('.row:not(:disabled)');
      if (first) { e.preventDefault(); first.click(); }
      return;
    }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      var rows = U.qsa('.row:not(:disabled)', open.list);
      if (!rows.length) return;
      e.preventDefault();
      var i = rows.indexOf(document.activeElement);
      var next = e.key === 'ArrowDown'
        ? (i < 0 ? 0 : Math.min(i + 1, rows.length - 1))
        : (i <= 0 ? -1 : i - 1);
      if (next < 0) open.search.focus(); else rows[next].focus();
    }
    if (e.key === 'Tab') {
      // keep focus inside the sheet
      var focusables = U.qsa('button, input, select, textarea, [tabindex]:not([tabindex="-1"])', open.panel)
        .filter(function (n) { return !n.disabled && n.offsetParent !== null; });
      if (!focusables.length) return;
      var firstF = focusables[0], lastF = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === firstF) { e.preventDefault(); lastF.focus(); }
      else if (!e.shiftKey && document.activeElement === lastF) { e.preventDefault(); firstF.focus(); }
    }
  }

  function metaChips(item) {
    return (item.meta || []).map(function (m) {
      return el('span', {
        class: 'chip ' + (m.cls || ''),
        style: m.style || null,
        text: m.text
      });
    });
  }

  function render() {
    if (!open) return;
    var q = open.search.value.trim();
    var active = open.activeFilters;

    var items = open.items.filter(function (it) {
      if (active.length) {
        for (var i = 0; i < active.length; i++) {
          var f = open.filterById[active[i]];
          if (f && !f.test(it)) return false;
        }
      }
      if (!q) return true;
      var hay = it.name + ' ' + (it.searchText || '') + ' ' + (it.desc || '');
      return U.fuzzy(q, hay) >= 0;
    });

    if (q) {
      items = items.map(function (it) {
        return { it: it, score: Math.max(U.fuzzy(q, it.name), U.fuzzy(q, it.searchText || '') - 50) };
      }).sort(function (a, b) { return b.score - a.score; })
        .map(function (x) { return x.it; });
    }

    U.clear(open.list);

    if (!items.length) {
      open.list.appendChild(el('div', { class: 'empty' }, [
        el('div', { class: 'empty__title', text: q ? 'Nothing matches "' + q + '"' : 'Nothing available here' }),
        el('p', {
          class: 'empty__body',
          text: q
            ? 'Try a shorter search, or clear the filters above.'
            : (open.emptyText || 'This list is filtered down to nothing. Clear a filter to see more.')
        })
      ]));
      open.count.textContent = '0 results';
      return;
    }

    open.count.textContent = items.length + (items.length === 1 ? ' result' : ' results');

    var grouped = open.groupBy ? U.groupBy(items, open.groupBy) : { '': items };
    var keys = Object.keys(grouped);
    if (open.groupOrder) {
      keys.sort(function (a, b) {
        var ia = open.groupOrder.indexOf(a), ib = open.groupOrder.indexOf(b);
        return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
      });
    }

    keys.forEach(function (key) {
      var group = el('div', { class: 'listgroup' });
      if (key) group.appendChild(el('div', { class: 'listgroup__lbl lbl lbl--micro', text: key }));
      grouped[key].forEach(function (it) {
        var isOn = it.id === open.selectedId;
        var row = el('button', {
          class: 'row' + (isOn ? ' is-on' : ''),
          type: 'button',
          disabled: it.disabled || false,
          'aria-current': isOn ? 'true' : null,
          title: it.disabledReason || '',
          style: it.rarityColor ? { '--rar': it.rarityColor } : null,
          onclick: function () {
            var pick = open.onPick;
            close();
            pick(it);
          }
        }, [
          el('span', { class: 'row__glyph', html: D2.icon(it.glyph || 'slot', { size: 18 }) }),
          el('span', { class: 'stack', style: { 'min-width': '0' } }, [
            el('span', { class: 'row__name', text: it.name }),
            (it.meta && it.meta.length) ? el('span', { class: 'row__meta' }, metaChips(it)) : null,
            it.desc ? el('span', { class: 'row__desc', text: it.desc }) : null,
            it.disabled && it.disabledReason
              ? el('span', { class: 'row__meta' }, [el('span', { class: 'chip chip--warn', text: it.disabledReason })])
              : null
          ]),
          isOn ? el('span', { class: 'ico', html: D2.icon('check', { size: 18 }) }) : null
        ]);
        group.appendChild(row);
      });
      open.list.appendChild(group);
    });
  }

  D2.picker = {
    open: function (cfg) {
      close();

      var scrim = el('div', { class: 'scrim', onclick: close });
      var search = el('input', {
        class: 'input',
        type: 'search',
        placeholder: cfg.searchPlaceholder || 'Search…',
        'aria-label': 'Search ' + (cfg.title || 'options'),
        autocomplete: 'off',
        spellcheck: 'false'
      });
      // Not role="listbox": these rows are buttons that pick and close, and a
      // listbox whose children are buttons inside group divs is announced as an
      // empty one. The panel is already role="dialog"; buttons speak for
      // themselves, and the equipped row is marked aria-current.
      var list = el('div', { class: 'sheet-panel__list' });
      var count = el('span', { class: 'lbl lbl--micro' });

      var filters = cfg.filters || [];
      var filterById = {};
      filters.forEach(function (f) { filterById[f.id] = f; });

      open = {
        scrim: scrim, search: search, list: list, count: count,
        items: cfg.items || [],
        selectedId: cfg.selectedId || null,
        onPick: cfg.onPick || function () {},
        groupBy: cfg.groupBy || null,
        groupOrder: cfg.groupOrder || null,
        emptyText: cfg.emptyText,
        filters: filters,
        filterById: filterById,
        activeFilters: [],
        restoreFocus: document.activeElement
      };

      var filterRow = el('div', { class: 'filters' });
      filters.forEach(function (f) {
        var chip = el('button', {
          class: 'chip chip-btn',
          type: 'button',
          'aria-pressed': 'false',
          text: f.label,
          onclick: function () {
            var i = open.activeFilters.indexOf(f.id);
            if (i === -1) open.activeFilters.push(f.id); else open.activeFilters.splice(i, 1);
            chip.classList.toggle('is-on');
            chip.setAttribute('aria-pressed', chip.classList.contains('is-on') ? 'true' : 'false');
            render();
          }
        });
        filterRow.appendChild(chip);
      });

      var panel = el('div', {
        class: 'sheet-panel',
        role: 'dialog',
        'aria-modal': 'true',
        'aria-label': cfg.title || 'Choose'
      }, [
        el('div', { class: 'sheet-panel__head' }, [
          el('div', { class: 'stack', style: { 'min-width': '0' } }, [
            el('div', { class: 'sheet-panel__title', text: cfg.title || 'Choose' }),
            cfg.subtitle ? el('div', { class: 'sheet-panel__sub', text: cfg.subtitle }) : null
          ]),
          el('button', {
            class: 'btn btn--ghost btn--icon push',
            type: 'button',
            'aria-label': 'Close',
            html: D2.icon('close'),
            onclick: close
          })
        ]),
        el('div', { class: 'sheet-panel__tools' }, [
          el('div', { class: 'searchbox' }, [
            el('span', { class: 'ico', html: D2.icon('search', { size: 16 }) }),
            search
          ]),
          filters.length ? filterRow : null
        ]),
        list,
        el('div', { class: 'sheet-panel__foot' }, [
          count,
          cfg.allowClear
            ? el('button', {
                class: 'btn btn--ghost',
                type: 'button',
                html: D2.icon('close', { size: 15 }) + '<span>Clear slot</span>',
                onclick: function () { var p = open.onPick; close(); p(null); }
              })
            : null
        ])
      ]);

      open.panel = panel;
      document.body.appendChild(scrim);
      document.body.appendChild(panel);
      document.addEventListener('keydown', onKey, true);

      search.addEventListener('input', U.debounce(render, 90));
      render();
      search.focus();
    },
    close: close
  };
})(window.D2);
