/**
 * Bindlore marketing-site analytics (bindlore.app only).
 *
 * Tracks Chrome Web Store / Add to Chrome clicks as Vercel custom event `cws_click`.
 * Page views and utm_* query params are captured by Vercel Web Analytics — do not
 * strip utm_* from URLs.
 *
 * HARD BAN: do not send book content, file names, uploaded documents, extension
 * internals, or other user-content as event properties.
 */
(function () {
  "use strict";

  function isChromeWebStoreLink(el) {
    var link = el && el.closest ? el.closest("a") : null;
    if (!link || !link.href) return false;
    try {
      return new URL(link.href, window.location.href).hostname === "chromewebstore.google.com";
    } catch (err) {
      return false;
    }
  }

  function trackCwsClick() {
    if (typeof window.va === "function") {
      window.va("event", { name: "cws_click" });
    }
  }

  function onActivate(event) {
    if (isChromeWebStoreLink(event.target)) trackCwsClick();
  }

  document.addEventListener("click", onActivate, true);
  document.addEventListener("auxclick", onActivate, true);
})();
