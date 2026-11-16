/* eJaad — small, dependency-free enhancements */
(function () {
  "use strict";

  /* ---------------------------------------------------------------- nav */
  var header = document.getElementById("siteHeader");
  var nav = document.getElementById("primaryNav");
  var toggle = document.getElementById("navToggle");

  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  function closeNav() {
    if (!nav || !toggle) return;
    nav.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeNav();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeNav();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 760) closeNav();
    });
  }

  /* ------------------------------------------------------------- reveal */
  var revealItems = document.querySelectorAll(".reveal");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!("IntersectionObserver" in window) || reduceMotion) {
    revealItems.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    revealItems.forEach(function (el, index) {
      el.style.transitionDelay = Math.min(index % 4, 3) * 70 + "ms";
      observer.observe(el);
    });
  }

  /* --------------------------------------------------------------- year */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* ------------------------------------------------------- contact form */
  var form = document.getElementById("contactForm");
  var note = document.getElementById("formNote");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var name = form.elements.name;
      var email = form.elements.email;
      var message = form.elements.message;

      var invalid = [name, email, message].filter(function (input) {
        return !input.value.trim() || (input.type === "email" && !input.checkValidity());
      });

      [name, email, message].forEach(function (input) {
        input.removeAttribute("aria-invalid");
      });

      if (invalid.length) {
        invalid.forEach(function (input) { input.setAttribute("aria-invalid", "true"); });
        invalid[0].focus();
        if (note) {
          note.textContent = "Please fill in your name, a valid email, and a short description.";
          note.classList.add("is-error");
        }
        return;
      }

      if (note) {
        note.classList.remove("is-error");
        note.textContent = "Opening your email client with the brief filled in…";
      }

      var subject = "Project enquiry — " + form.elements.service.value + " — " + name.value.trim();
      var body = [
        "Name: " + name.value.trim(),
        "Email: " + email.value.trim(),
        "Project type: " + form.elements.service.value,
        "Budget: " + form.elements.budget.value,
        "",
        "Brief:",
        message.value.trim()
      ].join("\n");

      window.location.href =
        "mailto:hello@ejaad.com?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
    });
  }
})();
