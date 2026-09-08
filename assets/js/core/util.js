/* Destiny Build Maker — core namespace, helpers, tiny reactive store.
   No modules: every file attaches to window.D2 so the app runs from file://. */
(function (root) {
  'use strict';

  var D2 = root.D2 = root.D2 || {};

  /* ---------- tiny DOM helpers ---------- */

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      for (var k in attrs) {
        if (!Object.prototype.hasOwnProperty.call(attrs, k)) continue;
        var v = attrs[k];
        if (v === null || v === undefined || v === false) continue;
        if (k === 'class') node.className = v;
        else if (k === 'html') node.innerHTML = v;
        else if (k === 'text') node.textContent = v;
        else if (k === 'dataset') { for (var d in v) node.dataset[d] = v[d]; }
        else if (k === 'style' && typeof v === 'object') { for (var s in v) node.style.setProperty(s, v[s]); }
        else if (k.slice(0, 2) === 'on' && typeof v === 'function') node.addEventListener(k.slice(2), v);
        else node.setAttribute(k, v === true ? '' : v);
      }
    }
    append(node, children);
    return node;
  }

  function append(node, children) {
    if (children === null || children === undefined || children === false) return node;
    if (Array.isArray(children)) { children.forEach(function (c) { append(node, c); }); return node; }
    node.appendChild(children.nodeType ? children : document.createTextNode(String(children)));
    return node;
  }

  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function clear(node) { while (node && node.firstChild) node.removeChild(node.firstChild); return node; }

  /* ---------- text ---------- */

  function esc(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  // Fold accents + punctuation so "Ex Diris" matches "ex diris" and "St0mp-EE5" matches "stompee".
  function fold(str) {
    var s = String(str == null ? "" : str).toLowerCase();
    return s.normalize ? s.normalize("NFD").replace(/[\u0300-\u036f]/g, "") : s;
  }

  function slug(str) {
    return fold(str).replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }

  // Subsequence match, so "khvo" finds "Khvostov" and "wortcun" finds "Word of Crota".
  function fuzzy(needle, haystack) {
    var n = fold(needle), h = fold(haystack);
    if (!n) return 0;
    var direct = h.indexOf(n);
    if (direct === 0) return 1000;
    if (direct > 0) return 800 - direct;
    // token-initial match: "wc" -> "Word of Crota"
    var initials = h.split(/[^a-z0-9]+/).filter(Boolean).map(function (w) { return w[0]; }).join('');
    if (initials.indexOf(n) === 0) return 700;
    var hi = 0, score = 0;
    for (var i = 0; i < n.length; i++) {
      var found = h.indexOf(n[i], hi);
      if (found === -1) return -1;
      score += found === hi ? 6 : 2;
      hi = found + 1;
    }
    return score;
  }

  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function sum(arr) { return arr.reduce(function (a, b) { return a + b; }, 0); }
  function uid(prefix) {
    return (prefix || 'id') + '-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
  }
  function clone(v) { return v === undefined ? v : JSON.parse(JSON.stringify(v)); }

  function debounce(fn, ms) {
    var t;
    return function () {
      var args = arguments, self = this;
      clearTimeout(t);
      t = setTimeout(function () { fn.apply(self, args); }, ms || 120);
    };
  }

  function groupBy(arr, keyFn) {
    var out = {};
    arr.forEach(function (item) {
      var k = keyFn(item);
      (out[k] = out[k] || []).push(item);
    });
    return out;
  }

  function formatDate(ts) {
    try {
      return new Date(ts).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (e) { return ''; }
  }

  /* ---------- event bus ---------- */

  function Emitter() { this._h = {}; }
  Emitter.prototype.on = function (evt, fn) {
    (this._h[evt] = this._h[evt] || []).push(fn);
    var self = this;
    return function off() { self._h[evt] = (self._h[evt] || []).filter(function (f) { return f !== fn; }); };
  };
  Emitter.prototype.emit = function (evt, payload) {
    (this._h[evt] || []).slice().forEach(function (fn) {
      try { fn(payload); } catch (e) { console.error('[D2] handler for "' + evt + '" failed', e); }
    });
    if (evt !== '*') this.emit('*', { type: evt, payload: payload });
  };

  /* ---------- persistence ---------- */

  var LS_OK = (function () {
    try {
      var k = '__d2probe__';
      localStorage.setItem(k, '1');
      localStorage.removeItem(k);
      return true;
    } catch (e) { return false; }
  })();

  var memoryStore = {};

  var storage = {
    available: LS_OK,
    get: function (key, fallback) {
      try {
        var raw = LS_OK ? localStorage.getItem(key) : memoryStore[key];
        return raw == null ? fallback : JSON.parse(raw);
      } catch (e) { return fallback; }
    },
    set: function (key, value) {
      var raw = JSON.stringify(value);
      try {
        if (LS_OK) localStorage.setItem(key, raw); else memoryStore[key] = raw;
        return true;
      } catch (e) {
        memoryStore[key] = raw;
        D2.bus && D2.bus.emit('storage:full', e);
        return false;
      }
    },
    remove: function (key) {
      try { if (LS_OK) localStorage.removeItem(key); } catch (e) {}
      delete memoryStore[key];
    }
  };

  /* ---------- exports ---------- */

  D2.util = {
    el: el, append: append, qs: qs, qsa: qsa, clear: clear,
    esc: esc, fold: fold, slug: slug, fuzzy: fuzzy,
    clamp: clamp, sum: sum, uid: uid, clone: clone,
    debounce: debounce, groupBy: groupBy, formatDate: formatDate
  };
  D2.Emitter = Emitter;
  D2.bus = new Emitter();
  D2.storage = storage;
})(window);
