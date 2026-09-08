/* Compare two builds. Stats first with the delta called out, then every slot
   that differs. Rows that match are dimmed so the differences are what you see. */
(function (D2) {
  'use strict';
  var G = D2.game, S = D2.data, B = D2.build, U = D2.util, el = U.el;

  var Compare = D2.compareUI = {};
  var root, bodyEl, leftId = null, rightId = null;

  function candidates() {
    var list = D2.library.all().slice();
    var cur = D2.state.build;
    if (!list.some(function (b) { return b.id === cur.id; })) {
      list.unshift(U.clone(cur));
    }
    return list;
  }

  function resolve(id) {
    if (!id) return null;
    var cur = D2.state.build;
    if (cur && cur.id === id) return B.hydrate(cur);
    var found = D2.library.get(id);
    return found ? B.hydrate(found) : null;
  }

  function label(build, getter, fallback) {
    if (!build) return '—';
    try {
      var v = getter(build);
      return v == null || v === '' ? (fallback || '—') : v;
    } catch (e) { return fallback || '—'; }
  }

  function weaponLabel(b, slot) {
    var d = b.weapons[slot];
    var w = d.weaponId && S.weaponById[d.weaponId];
    if (!w) return '—';
    var perks = ['trait1', 'trait2'].map(function (k) {
      var p = d.perks[k] && S.perkIndex[d.perks[k]];
      return p ? p.name : null;
    }).filter(Boolean);
    return w.name + (perks.length ? ' · ' + perks.join(' / ') : '');
  }

  function armorLabel(b, slotId) {
    var p = b.armor[slotId];
    var ex = p.exoticId && S.exoticArmorById[p.exoticId];
    var bits = [];
    if (ex) bits.push(ex.name);
    else if (p.archetype) bits.push(G.archetypeById[p.archetype].name + ' T' + p.tier);
    else if (p.manual) bits.push('Manual');
    var mods = (p.mods || []).map(function (id) { return id && S.modById[id] ? S.modById[id].name : null; }).filter(Boolean);
    if (mods.length) bits.push(mods.join(', '));
    return bits.length ? bits.join(' · ') : '—';
  }

  function rowsFor(a, b) {
    var rows = [];

    function push(group, key, va, vb, delta) {
      rows.push({ group: group, key: key, a: va, b: vb, delta: delta });
    }

    G.stats.forEach(function (st) {
      var sa = a ? B.computeStats(a).total[st.id] : 0;
      var sb = b ? B.computeStats(b).total[st.id] : 0;
      push('Stats', st.name, String(sa), String(sb), sb - sa);
    });

    push('Identity', 'Class', label(a, function (x) { return x.classId && G.classById[x.classId].name; }),
      label(b, function (x) { return x.classId && G.classById[x.classId].name; }));
    push('Identity', 'Subclass', label(a, function (x) { return x.classId && x.element && (B.path(x.classId, x.element) || {}).name; }),
      label(b, function (x) { return x.classId && x.element && (B.path(x.classId, x.element) || {}).name; }));

    function abil(key, list) {
      return function (x) {
        var id = x.subclass[key];
        var found = id && list.filter(function (i) { return i.id === id; })[0];
        return found ? found.name : null;
      };
    }
    push('Subclass', 'Super', label(a, abil('superId', S.supers)), label(b, abil('superId', S.supers)));
    push('Subclass', 'Grenade', label(a, abil('grenadeId', S.grenades)), label(b, abil('grenadeId', S.grenades)));
    push('Subclass', 'Melee', label(a, abil('meleeId', S.melees)), label(b, abil('meleeId', S.melees)));
    push('Subclass', 'Class ability', label(a, abil('classAbilityId', S.classAbilities)), label(b, abil('classAbilityId', S.classAbilities)));
    push('Subclass', 'Movement', label(a, abil('movementId', S.movements)), label(b, abil('movementId', S.movements)));

    function aspectNames(x) {
      return (x.subclass.aspects || []).filter(Boolean).map(function (id) {
        var f = S.aspects.filter(function (i) { return i.id === id; })[0];
        return f ? f.name : id;
      }).join(', ');
    }
    function fragNames(x) {
      return (x.subclass.fragments || []).map(function (id) {
        var f = S.fragments.filter(function (i) { return i.id === id; })[0];
        return f ? f.name.replace(/^(Ember|Spark|Echo|Whisper|Thread|Facet) of /, '') : id;
      }).join(', ');
    }
    push('Subclass', 'Aspects', label(a, aspectNames), label(b, aspectNames));
    push('Subclass', 'Fragments', label(a, fragNames), label(b, fragNames));

    G.weaponSlots.forEach(function (slot) {
      push('Armament', slot.name, a ? weaponLabel(a, slot.id) : '—', b ? weaponLabel(b, slot.id) : '—');
    });

    G.armorSlots.forEach(function (slot) {
      push('Armor', slot.name, a ? armorLabel(a, slot.id) : '—', b ? armorLabel(b, slot.id) : '—');
    });

    return rows;
  }

  function buildSelect(side, value) {
    return el('select', {
      class: 'select',
      'aria-label': 'Build ' + side,
      onchange: function (e) {
        if (side === 'A') leftId = e.target.value || null; else rightId = e.target.value || null;
        renderBody();
      }
    }, [el('option', { value: '', text: '— choose a build —', selected: !value })].concat(
      candidates().map(function (b) {
        return el('option', { value: b.id, selected: value === b.id, text: (b.name || 'Untitled') + (D2.state.build.id === b.id ? ' (open)' : '') });
      })
    ));
  }

  function renderBody() {
    U.clear(bodyEl);

    bodyEl.appendChild(el('div', { class: 'cmp-picker' }, [
      el('div', { class: 'field' }, [el('span', { class: 'field__lbl', text: 'Build A' }), buildSelect('A', leftId)]),
      el('div', { class: 'field' }, [el('span', { class: 'field__lbl', text: 'Build B' }), buildSelect('B', rightId)])
    ]));

    var a = resolve(leftId), b = resolve(rightId);

    if (!a || !b) {
      bodyEl.appendChild(el('div', { class: 'empty hatch' }, [
        el('div', { class: 'empty__title', text: 'Pick two builds' }),
        el('p', { class: 'empty__body', text: 'Choose a build in each slot above. Stats line up first with the difference between them, then every equipment slot — matching rows stay quiet so the differences stand out.' })
      ]));
      return;
    }

    var rows = rowsFor(a, b);
    var grid = el('div', { class: 'cmpgrid' });

    grid.appendChild(el('div', { class: 'cmp-h lbl', text: '' }));
    grid.appendChild(el('div', { class: 'cmp-h' }, [el('span', { class: 'buildcard__title', text: a.name || 'Untitled' })]));
    grid.appendChild(el('div', { class: 'cmp-h lbl', style: { 'text-align': 'center' }, text: 'Δ' }));
    grid.appendChild(el('div', { class: 'cmp-h' }, [el('span', { class: 'buildcard__title', text: b.name || 'Untitled' })]));

    var lastGroup = null;
    rows.forEach(function (r) {
      if (r.group !== lastGroup) {
        lastGroup = r.group;
        grid.appendChild(el('div', {
          class: 'cmp-k lbl lbl--el',
          style: { 'grid-column': '1 / -1', background: 'var(--ink-300)' },
          text: r.group
        }));
      }
      var differs = r.a !== r.b;
      grid.appendChild(el('div', { class: 'cmp-k lbl', text: r.key }));
      grid.appendChild(el('div', { class: 'cmp-v' + (differs ? ' differs' : ''), style: differs ? null : { color: 'var(--bone-400)' }, text: r.a }));

      var d = r.delta;
      grid.appendChild(el('div', {
        class: 'cmp-d num' + (d > 0 ? ' up' : d < 0 ? ' down' : ''),
        text: d === undefined ? (differs ? '≠' : '=') : (d === 0 ? '—' : (d > 0 ? '+' + d : String(d)))
      }));
      grid.appendChild(el('div', { class: 'cmp-v' + (differs ? ' differs' : ''), style: differs ? null : { color: 'var(--bone-400)' }, text: r.b }));
    });

    bodyEl.appendChild(grid);
  }

  Compare.mount = function (mountRoot) {
    root = mountRoot;
    bodyEl = el('div');
    root.appendChild(el('div', { class: 'cmpwrap' }, [
      el('div', { class: 'section__head' }, [
        el('h2', { class: 'section__title', text: 'Compare builds' })
      ]),
      bodyEl
    ]));
    renderBody();
  };

  Compare.render = function () {
    if (!bodyEl) return;
    if (!leftId) leftId = D2.state.build.id;
    renderBody();
  };

  Compare.openWith = function (id) {
    leftId = D2.state.build.id;
    rightId = id;
    D2.state.setView('compare');
  };
})(window.D2);
