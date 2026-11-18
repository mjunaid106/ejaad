(function () {
  "use strict";

  var KEY = "ejaad-analytics-consent";
  var CLARITY_ID = "zflidbbh2p";
  var banner = document.getElementById("consentBanner");

  function read() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function write(value) {
    try { localStorage.setItem(KEY, value); } catch (e) {}
  }

  function loadClarity() {
    if (window.clarity) return;
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", CLARITY_ID);
  }

  var choice = read();
  if (choice === "granted") {
    loadClarity();
  } else if (choice !== "denied" && banner) {
    banner.hidden = false;
  }

  var accept = document.getElementById("consentAccept");
  var decline = document.getElementById("consentDecline");
  if (accept) {
    accept.addEventListener("click", function () {
      write("granted");
      if (banner) banner.hidden = true;
      loadClarity();
    });
  }
  if (decline) {
    decline.addEventListener("click", function () {
      write("denied");
      if (banner) banner.hidden = true;
    });
  }

  var manage = document.getElementById("manageConsent");
  if (manage) {
    manage.addEventListener("click", function (event) {
      event.preventDefault();
      try { localStorage.removeItem(KEY); } catch (e) {}
      window.location.reload();
    });
  }
})();
