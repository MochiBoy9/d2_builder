/* Bootstrap. Load order matters: data, then core, then UI, then this. */
(function (D2) {
  'use strict';
  var U = D2.util, el = U.el;

  function boot() {
    var root = document.getElementById('app');
    if (!root) return;

    D2.state.init();

    var shell = el('div', { class: 'shell' });
    var main = el('main', { class: 'main' });

    var builderView = el('div', { class: 'view', id: 'view-builder' });
    var libraryView = el('div', { class: 'view', id: 'view-library', hidden: true });
    var compareView = el('div', { class: 'view', id: 'view-compare', hidden: true });

    main.appendChild(builderView);
    main.appendChild(libraryView);
    main.appendChild(compareView);

    D2.shell.mountTopbar(shell);
    shell.appendChild(main);
    root.appendChild(el('div', { class: 'grain', 'aria-hidden': 'true' }));
    root.appendChild(shell);

    D2.builder.mount(builderView);
    D2.libraryUI.mount(libraryView);
    D2.compareUI.mount(compareView);
    D2.statbar.mount(shell);

    var views = { builder: builderView, library: libraryView, compare: compareView };

    function applyView() {
      Object.keys(views).forEach(function (k) {
        views[k].hidden = D2.state.view !== k;
      });
      D2.statbar.setVisible(D2.state.view === 'builder');
      D2.shell.syncTopbar();
      if (D2.state.view === 'library') D2.libraryUI.render();
      if (D2.state.view === 'compare') D2.compareUI.render();
    }

    D2.bus.on('build:change', function (opts) {
      D2.shell.applyTheme();
      D2.builder.render(opts);
      D2.statbar.render();
      D2.shell.syncTopbar();
      if (D2.state.view === 'library') D2.libraryUI.render();
      if (D2.state.view === 'compare') D2.compareUI.render();
    });

    D2.bus.on('view:change', applyView);
    D2.bus.on('library:change', function () {
      if (D2.state.view === 'library') D2.libraryUI.render();
      if (D2.state.view === 'compare') D2.compareUI.render();
    });
    D2.bus.on('manifest:ready', function () {
      D2.builder.render();
    });
    D2.bus.on('storage:full', function () {
      D2.bus.emit('toast', { kind: 'error', text: 'Browser storage is full — export your library to keep it safe.' });
    });

    D2.bus.on('level:change', function () {
      D2.statbar.render();
      D2.shell.syncTopbar();
    });

    D2.level.applyBodyClass();
    D2.shell.applyTheme();
    D2.shell.bindKeys();
    applyView();

    // Ask once, on the very first run, how much machinery to expose. Never
    // again after that -- the setting lives in the top bar from then on.
    if (!D2.level.chosen()) {
      setTimeout(function () { D2.shell.openLevelPicker(true); }, 260);
    }

    if (!D2.storage.available) {
      D2.bus.emit('toast', {
        kind: 'warn',
        text: 'This browser is blocking local storage, so builds will not survive a refresh. Export before you close the tab.'
      });
    }

    // Pull any previously synced manifest back in without blocking first paint.
    D2.manifest.load();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})(window.D2);
