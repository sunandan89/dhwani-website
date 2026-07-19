/* Dhwani Dots — brand particle animation (vanilla, extracted from the standalone bundle)
   Dots scatter, converge into the Dhwani logo, hold, disperse, and loop.
   Pauses when off-screen; renders a static logo when prefers-reduced-motion. */
(function () {
  var IMG_SRC = 'data:image/png;base64,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';

  function init(canvas) {
    var ctx = canvas.getContext('2d');
    var W = 1280, H = 720;
    var DPR = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * DPR; canvas.height = H * DPR;
    canvas.style.width = '100%'; canvas.style.height = 'auto';
    ctx.scale(DPR, DPR);
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var img = new Image();
    img.onload = function () {
      var targetW = 840, scale = targetW / img.width, targetH = img.height * scale;
      var offX = (W - targetW) / 2, offY = (H - targetH) / 2 - 6;
      var off = document.createElement('canvas'); off.width = targetW; off.height = targetH;
      var octx = off.getContext('2d'); octx.drawImage(img, 0, 0, targetW, targetH);
      var data;
      try { data = octx.getImageData(0, 0, targetW, targetH).data; }
      catch (e) { ctx.drawImage(img, offX, offY, targetW, targetH); return; }

      var gap = 3, targets = [];
      for (var y = 0; y < targetH; y += gap) {
        for (var x = 0; x < targetW; x += gap) {
          var i = ((y | 0) * targetW + (x | 0)) * 4, a = data[i + 3];
          if (a > 90) targets.push({ tx: offX + x, ty: offY + y, r: data[i], g: data[i+1], b: data[i+2], a: a / 255 });
        }
      }

      function drawStatic() {
        ctx.clearRect(0, 0, W, H);
        for (var k = 0; k < targets.length; k++) {
          var p = targets[k];
          ctx.globalAlpha = p.a; ctx.fillStyle = 'rgb(' + p.r + ',' + p.g + ',' + p.b + ')';
          ctx.beginPath(); ctx.arc(p.tx, p.ty, 1.5, 0, 6.2832); ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
      if (reduce) { drawStatic(); return; }

      var cx = W / 2, cy = H / 2;
      var particles = targets.map(function (t) {
        var ang = Math.random() * Math.PI * 2, dist = 420 + Math.random() * 520;
        return { tx: t.tx, ty: t.ty, r: t.r, g: t.g, b: t.b, a: t.a,
          sx: cx + Math.cos(ang) * dist, sy: cy + Math.sin(ang) * dist * 0.7,
          delay: Math.random() * 0.55, size: 1.15 + Math.random() * 1.15, spin: Math.random() * Math.PI * 2 };
      });

      var easeOut = function (p) { return 1 - Math.pow(1 - p, 3); };
      var easeInOut = function (p) { return p < 0.5 ? 4*p*p*p : 1 - Math.pow(-2*p+2,3)/2; };
      var FORM = 2.6, HOLD = 2.4, DISPERSE = 1.4, CYCLE = FORM + HOLD + DISPERSE;
      var start = performance.now(), raf = null;

      function frame(now) {
        var t = ((now - start) / 1000) % CYCLE;
        ctx.clearRect(0, 0, W, H);
        for (var k = 0; k < particles.length; k++) {
          var p = particles[k], x, y, alpha, sz;
          if (t < FORM) {
            var raw = (t - p.delay) / (FORM - p.delay), prog = raw <= 0 ? 0 : easeOut(Math.min(1, raw));
            x = p.sx + (p.tx - p.sx) * prog; y = p.sy + (p.ty - p.sy) * prog;
            alpha = p.a * Math.min(1, prog * 1.6); sz = p.size * (1.6 - 0.6 * prog);
          } else if (t < FORM + HOLD) {
            var bt = t - FORM;
            x = p.tx + Math.sin(bt * 1.4 + p.spin) * 0.8; y = p.ty + Math.cos(bt * 1.4 + p.spin) * 0.8;
            alpha = p.a; sz = p.size;
          } else {
            var dp = easeInOut(Math.min(1, (t - FORM - HOLD) / DISPERSE));
            x = p.tx + (p.sx - p.tx) * dp; y = p.ty + (p.sy - p.ty) * dp;
            alpha = p.a * (1 - dp); sz = p.size * (1 + 0.4 * dp);
          }
          ctx.globalAlpha = Math.max(0, alpha); ctx.fillStyle = 'rgb(' + p.r + ',' + p.g + ',' + p.b + ')';
          ctx.beginPath(); ctx.arc(x, y, sz, 0, 6.2832); ctx.fill();
        }
        ctx.globalAlpha = 1; raf = requestAnimationFrame(frame);
      }

      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (es) {
          es.forEach(function (e) {
            if (e.isIntersecting && !raf) { start = performance.now(); raf = requestAnimationFrame(frame); }
            else if (!e.isIntersecting && raf) { cancelAnimationFrame(raf); raf = null; }
          });
        }, { threshold: 0.15 });
        io.observe(canvas);
      } else { start = performance.now(); raf = requestAnimationFrame(frame); }

      var replay = canvas.parentNode.querySelector('[data-dots-replay]');
      if (replay) replay.addEventListener('click', function () { start = performance.now(); });
    };
    img.src = IMG_SRC;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var els = document.querySelectorAll('.dhwani-dots-canvas');
    for (var i = 0; i < els.length; i++) init(els[i]);
  });
})();
