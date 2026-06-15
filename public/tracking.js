/**
 * Flowbyte Attribution Tracking
 * Läuft auf allen LPs. Liest gclid + utm_* aus der URL (falls vorhanden),
 * persistiert sie 90 Tage in localStorage, merkt sich erste Landing-Page + Zeitstempel.
 * Stellt window.FLOWBYTE_ATTR bereit; form-handler injizieren die Felder beim Submit.
 */
(function () {
  'use strict';

  var KEY = 'fb_attr_v1';
  var TTL_MS = 90 * 24 * 60 * 60 * 1000;

  function readStored() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return null;
      var obj = JSON.parse(raw);
      if (!obj || !obj._saved_at) return null;
      if (Date.now() - obj._saved_at > TTL_MS) return null;
      return obj;
    } catch (e) { return null; }
  }

  function write(obj) {
    try {
      obj._saved_at = Date.now();
      localStorage.setItem(KEY, JSON.stringify(obj));
    } catch (e) {}
  }

  function urlParam(name) {
    try {
      var v = new URLSearchParams(window.location.search).get(name);
      return v ? v.trim() : '';
    } catch (e) { return ''; }
  }

  function todayISO() { return new Date().toISOString().slice(0, 10); }

  var existing = readStored() || {};
  var fresh = {
    gclid:              urlParam('gclid'),
    utm_source:         urlParam('utm_source'),
    utm_medium:         urlParam('utm_medium'),
    utm_campaign:       urlParam('utm_campaign'),
    utm_content:        urlParam('utm_content'),
    utm_term:           urlParam('utm_term'),
    ads_campaign_name:  urlParam('ads_campaign'),
    ads_ad_group_name:  urlParam('ads_adgroup')
  };

  // Neue Werte gewinnen (letzter Klick-Stand), aber nur wenn gesetzt —
  // first_landing_page + first_touch_at bleiben first-touch.
  var merged = {};
  Object.keys(fresh).forEach(function (k) {
    merged[k] = fresh[k] || existing[k] || '';
  });
  merged.first_landing_page = existing.first_landing_page || window.location.pathname || '/';
  merged.first_touch_at     = existing.first_touch_at || todayISO();

  write(merged);
  window.FLOWBYTE_ATTR = merged;
})();
