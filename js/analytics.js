/**
 * Bindlore marketing-site analytics (bindlore.app only).
 *
 * Tracks Chrome Web Store / Add to Chrome clicks as Vercel custom event `cws_click`.
 * Pro plan allows 2 custom properties, so the event sends only utm_campaign and utm_src.
 * Page views and utm_* query params stay on the URL. Do not strip utm_*.
 *
 * HARD BAN: do not send book content, file names, uploaded documents, extension
 * internals, or other user-content as event properties.
 */
(function () {
  "use strict";

  var UTM_KEY = "bl_utm";
  var MAX_LEN = 100;

  function isChromeWebStoreLink(el) {
    var link = el && el.closest ? el.closest("a") : null;
    if (!link || !link.href) return false;
    try {
      return new URL(link.href, window.location.href).hostname === "chromewebstore.google.com";
    } catch (err) {
      return false;
    }
  }

  function sanitize(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/[^a-z0-9_\-./]/g, "")
      .slice(0, MAX_LEN);
  }

  function campaignProp(campaign) {
    return sanitize(campaign) || "direct";
  }

  function srcProp(source, medium) {
    var src = sanitize(source);
    var med = sanitize(medium);
    var combined = "direct";
    if (src && med) combined = src + "/" + med;
    else if (src) combined = src;
    else if (med) combined = med;
    return combined.slice(0, MAX_LEN);
  }

  function persistUtm() {
    try {
      var params = new URLSearchParams(window.location.search);
      var source = params.get("utm_source");
      var medium = params.get("utm_medium");
      var campaign = params.get("utm_campaign");
      var present = [source, medium, campaign].some(function (value) {
        return value != null && value !== "";
      });
      if (!present) return;
      sessionStorage.setItem(UTM_KEY, JSON.stringify({
        utm_source: source || "",
        utm_medium: medium || "",
        utm_campaign: campaign || ""
      }));
    } catch (err) {}
  }

  function loadUtm() {
    try {
      var raw = sessionStorage.getItem(UTM_KEY);
      if (!raw) return { utm_source: "", utm_medium: "", utm_campaign: "" };
      var data = JSON.parse(raw);
      if (!data || typeof data !== "object") {
        return { utm_source: "", utm_medium: "", utm_campaign: "" };
      }
      return {
        utm_source: data.utm_source || "",
        utm_medium: data.utm_medium || "",
        utm_campaign: data.utm_campaign || ""
      };
    } catch (err) {
      return { utm_source: "", utm_medium: "", utm_campaign: "" };
    }
  }

  function trackCwsClick() {
    if (typeof window.va !== "function") return;
    var utm = loadUtm();
    window.va("event", {
      name: "cws_click",
      data: {
        utm_campaign: campaignProp(utm.utm_campaign),
        utm_src: srcProp(utm.utm_source, utm.utm_medium)
      }
    });
  }

  function onActivate(event) {
    if (event.type === "auxclick" && event.button !== 1) return;
    if (isChromeWebStoreLink(event.target)) trackCwsClick();
  }

  persistUtm();
  document.addEventListener("click", onActivate, true);
  document.addEventListener("auxclick", onActivate, true);
})();
