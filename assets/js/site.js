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
