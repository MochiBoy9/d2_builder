/* Settings (editable numeric defaults) and the build library.

   Every balance-sensitive number in this app is editable and persisted, so a
   patch never silently makes the calculator wrong. */
(function (D2) {
  'use strict';
  var G = D2.game, U = D2.util, storage = D2.storage;

  var KEY_SETTINGS = 'd2bm.settings.v1';
  var KEY_LIBRARY  = 'd2bm.library.v1';
  var KEY_CURRENT  = 'd2bm.current.v1';
  var KEY_UI       = 'd2bm.ui.v1';

  /* ============================ SETTINGS ============================ */

  var defaults = {
    masterworkBonus: G.MASTERWORK_BONUS,
    tierTable: U.clone(G.tierTable),
    aspectSlots: {},          // aspectId -> overridden fragment-slot count
    setNotes: {},             // set name -> user's own bonus note
    level: 'midgame',         // beginner | midgame | veteran -- see core/level.js
    levelChosen: false,       // has the user ever been asked?
    manifestEnabled: false,
    apiKey: '',
    lastSync: null
  };

  var settings = D2.settings = {
    _data: null,

    get: function (key) {
      return settings._data[key];
    },
    set: function (key, value) {
      settings._data[key] = value;
      settings.save();
      D2.bus.emit('settings:change', { key: key, value: value });
    },
    all: function () { return settings._data; },
    save: function () { storage.set(KEY_SETTINGS, settings._data); },
    reset: function () {
      settings._data = U.clone(defaults);
      settings.save();
      D2.bus.emit('settings:change', { key: '*', value: null });
    },
    tierRow: function (tier) {
      var table = settings._data.tierTable || G.tierTable;
      for (var i = 0; i < table.length; i++) {
        if (table[i].tier === tier) return table[i];
      }
      return table[table.length - 1];
    }
  };

  settings._data = (function () {
    var saved = storage.get(KEY_SETTINGS, null);
    var base = U.clone(defaults);
    if (saved) {
      Object.keys(saved).forEach(function (k) { base[k] = saved[k]; });
    }
    return base;
  })();

  /* ============================= LIBRARY ============================= */

  var library = D2.library = {
    _items: storage.get(KEY_LIBRARY, []),

    all: function () {
      return library._items.slice().sort(function (a, b) { return b.updatedAt - a.updatedAt; });
    },
    get: function (id) {
      return library._items.filter(function (b) { return b.id === id; })[0] || null;
    },
    save: function (build) {
      var copy = U.clone(build);
      copy.updatedAt = Date.now();
      var i = library._items.findIndex(function (b) { return b.id === copy.id; });
      if (i === -1) library._items.push(copy); else library._items[i] = copy;
      library._persist();
      D2.bus.emit('library:change', { action: i === -1 ? 'create' : 'update', build: copy });
      return copy;
    },
    remove: function (id) {
      library._items = library._items.filter(function (b) { return b.id !== id; });
      library._persist();
      D2.bus.emit('library:change', { action: 'delete', id: id });
    },
    duplicate: function (id) {
      var src = library.get(id);
      if (!src) return null;
      var copy = U.clone(src);
      copy.id = U.uid('build');
      copy.name = src.name + ' (copy)';
      copy.createdAt = Date.now();
      copy.updatedAt = Date.now();
      library._items.push(copy);
      library._persist();
      D2.bus.emit('library:change', { action: 'create', build: copy });
      return copy;
    },
    _persist: function () {
      var ok = storage.set(KEY_LIBRARY, library._items);
      if (!ok) D2.bus.emit('toast', { kind: 'error', text: 'Browser storage is full. Export your library before adding more builds.' });
    },
    exportAll: function () {
      return JSON.stringify({
        format: 'destiny-build-maker',
        version: 1,
        exportedAt: new Date().toISOString(),
        settings: settings._data,
        builds: library._items
      }, null, 2);
    },
    importAll: function (json, mode) {
      var parsed = JSON.parse(json);
      var incoming = Array.isArray(parsed) ? parsed : parsed.builds;
      if (!Array.isArray(incoming)) throw new Error('That file does not contain a build list.');
      var hydrated = incoming.map(function (b) { return D2.build.hydrate(b); });
      if (mode === 'replace') {
        library._items = hydrated;
      } else {
        var existing = {};
        library._items.forEach(function (b) { existing[b.id] = true; });
        hydrated.forEach(function (b) {
          if (existing[b.id]) b.id = U.uid('build');
          library._items.push(b);
        });
      }
      library._persist();
      D2.bus.emit('library:change', { action: 'import' });
      return hydrated.length;
    }
  };

  // Array.prototype.findIndex guard for very old engines. Defined
  // non-enumerably: a plain assignment here would show up in every `for...in`
  // over an array anywhere in the app.
  if (!Array.prototype.findIndex) {
    Object.defineProperty(Array.prototype, 'findIndex', {
      value: function (fn) {
        for (var i = 0; i < this.length; i++) { if (fn(this[i], i, this)) return i; }
        return -1;
      },
      writable: true, configurable: true, enumerable: false
    });
  }

  /* ========================= CURRENT BUILD ========================= */

  var state = D2.state = {
    build: null,
    view: 'builder',          // builder | library | compare
    compareWith: null,

    init: function () {
      var saved = storage.get(KEY_CURRENT, null);
      state.build = saved ? D2.build.hydrate(saved) : D2.build.create();
      var ui = storage.get(KEY_UI, {});
      state.view = ui.view === 'library' ? 'library' : 'builder';
    },

    // Mutate the current build through here so persistence and redraws happen.
    update: function (mutator, opts) {
      mutator(state.build);
      state.build.updatedAt = Date.now();
      storage.set(KEY_CURRENT, state.build);
      D2.bus.emit('build:change', opts || {});
    },

    replace: function (build) {
      state.build = D2.build.hydrate(build);
      storage.set(KEY_CURRENT, state.build);
      D2.bus.emit('build:change', { full: true });
    },

    setView: function (view) {
      state.view = view;
      storage.set(KEY_UI, { view: view });
      D2.bus.emit('view:change', view);
    },

    persistNow: function () { storage.set(KEY_CURRENT, state.build); }
  };
})(window.D2);
