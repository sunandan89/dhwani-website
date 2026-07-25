/* Dhwani RIS merged site — shared behaviour */
(function () {
  // header scroll state (pages with .page-hero or no photo hero keep solid on scroll)
  var hdr = document.querySelector('header.site');
  if (hdr) {
    var solidAlways = hdr.hasAttribute('data-solid');
    var setState = function () {
      hdr.classList.toggle('scrolled', solidAlways || window.scrollY > 60);
    };
    window.addEventListener('scroll', setState, { passive: true });
    setState();
  }

  // reveal on scroll
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.14 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  // count-up stats (animates 0 -> target; never negative)
  function countUp(el) {
    var target = +el.dataset.count, suf = el.dataset.suf || '', dur = 1400, t0 = performance.now();
    function tick(now) {
      var p = Math.min((now - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) { requestAnimationFrame(tick); }
      else { el.innerHTML = target + '<span class="suf">' + suf + '</span>'; }
    }
    requestAnimationFrame(tick);
  }
  if ('IntersectionObserver' in window) {
    var statIO = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { countUp(e.target); statIO.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('.num[data-count]').forEach(function (el) { statIO.observe(el); });
  }

  // DPDP countdown (any element with id="dpdp-days")
  var dd = document.getElementById('dpdp-days');
  if (dd) {
    var target = new Date('2027-05-13T00:00:00+05:30');
    var days = Math.max(0, Math.ceil((target - new Date()) / 86400000));
    dd.textContent = days.toLocaleString('en-IN');
  }

  // mobile menu
  var mb = document.querySelector('.menu-btn');
  if (mb) {
    mb.setAttribute('aria-expanded', 'false');
    mb.setAttribute('aria-controls', 'primary-nav');
    var nav = document.querySelector('nav.main');
    if (nav) { nav.id = nav.id || 'primary-nav'; }
    mb.addEventListener('click', function () {
      var n = document.querySelector('nav.main');
      var open = n.style.display === 'flex';
      n.style.cssText = open ? '' : 'display:flex;position:absolute;top:100%;right:16px;left:16px;flex-direction:column;background:#fff;padding:18px;border-radius:14px;box-shadow:var(--shadow);gap:14px';
      n.querySelectorAll('a').forEach(function (a) { a.style.color = 'var(--ink)'; });
      mb.setAttribute('aria-expanded', open ? 'false' : 'true');
    });
  }
})();

/* client bucket tabs */
(function () {
  var root = document.querySelector('[data-bucket-tabs]');
  if (!root) return;
  var tabs = root.querySelectorAll('.bucket-tab');
  var panels = root.querySelectorAll('.bucket-panel');
  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      tabs.forEach(function (x) { x.classList.remove('active'); x.setAttribute('aria-selected', 'false'); });
      panels.forEach(function (p) { p.classList.remove('active'); });
      t.classList.add('active'); t.setAttribute('aria-selected', 'true');
      var p = root.querySelector('.bucket-panel[data-bucket="' + t.dataset.bucket + '"]');
      if (p) p.classList.add('active');
    });
  });
})();

/* brochure download gate: [data-brochure] links open a form; details go to partnerships@; download starts on submit */
(function () {
  var triggers = document.querySelectorAll('[data-brochure]');
  if (!triggers.length) return;
  var PDF = 'assets/docs/dhwani-brochure.pdf';
  var overlay = document.createElement('div');
  overlay.className = 'brochure-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Download the Dhwani RIS brochure');
  overlay.innerHTML =
    '<div class="brochure-modal">' +
    '<button type="button" class="brochure-close" aria-label="Close">&times;</button>' +
    '<h3>Get the Dhwani RIS brochure</h3>' +
    '<p>Tell us who you are and the download starts right away.</p>' +
    '<form id="brochure-form">' +
    '<label for="br-name">Your name</label><input id="br-name" name="name" type="text" required autocomplete="name" placeholder="Full name">' +
    '<label for="br-org">Organisation</label><input id="br-org" name="org" type="text" required autocomplete="organization" placeholder="Organisation name">' +
    '<label for="br-email">Work email</label><input id="br-email" name="email" type="email" required autocomplete="email" placeholder="name@organisation.org">' +
    '<div class="actions"><button type="submit" class="btn btn-primary" style="flex:1;justify-content:center">Download brochure</button></div>' +
    '</form></div>';
  document.body.appendChild(overlay);

  function close() { overlay.classList.remove('open'); }
  overlay.querySelector('.brochure-close').addEventListener('click', close);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

  triggers.forEach(function (t) {
    t.addEventListener('click', function (e) {
      e.preventDefault();
      overlay.classList.add('open');
      var first = overlay.querySelector('input'); if (first) first.focus();
    });
  });

  overlay.querySelector('#brochure-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('br-name').value.trim();
    var org = document.getElementById('br-org').value.trim();
    var email = document.getElementById('br-email').value.trim();
    var payload = { name: name, org: org, email: email, source: 'brochure-download' };
    /* try the serverless endpoint if deployed; otherwise fall back silently */
    try {
      fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(function () {});
    } catch (err) {}
    /* start the download */
    var a = document.createElement('a');
    a.href = PDF; a.download = 'Dhwani-RIS-Brochure.pdf';
    document.body.appendChild(a); a.click(); a.remove();
    close();
  });
})();
