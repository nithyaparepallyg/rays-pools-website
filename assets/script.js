// ---------- Intro splash ----------
// Plays on every page load and opens the site by itself after a few seconds.
// A short, soft chime plays with it. Browsers only allow sound once the visitor has
// interacted with the page, so we try to play straight away and, if the browser
// blocks it, play it the moment the visitor taps.
(function () {
  const intro = document.getElementById('intro');
  if (!intro) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) { intro.remove(); return; }

  const AUTO_MS = 5000;
  intro.style.setProperty('--intro-ms', AUTO_MS + 'ms');
  document.body.classList.add('intro-on');
  intro.focus({ preventScroll: true });
  let done = false, played = false, ctx = null;

  function close(delay) {
    if (done) return; done = true;
    setTimeout(() => {
      intro.classList.add('out');
      document.body.classList.remove('intro-on');
      setTimeout(() => intro.remove(), 800);
    }, delay || 0);
  }

  // Soft "water chime": a gentle rising arpeggio with an echo, about 4 seconds, low volume.
  function chime() {
    if (played || !ctx || ctx.state !== 'running') return;
    played = true;
    const now = ctx.currentTime + 0.05;
    const master = ctx.createGain(); master.gain.value = 0.07;           // overall volume (0–1)
    const echo = ctx.createDelay(); echo.delayTime.value = 0.28;
    const fb = ctx.createGain(); fb.gain.value = 0.35;
    const wet = ctx.createGain(); wet.gain.value = 0.5;
    const tone = ctx.createBiquadFilter(); tone.type = 'lowpass'; tone.frequency.value = 3800;
    master.connect(tone).connect(ctx.destination);
    master.connect(echo); echo.connect(fb).connect(echo); echo.connect(wet).connect(tone);

    // D major pentatonic, rising then settling
    const notes = [587.33, 739.99, 880.0, 987.77, 1174.66, 987.77, 880.0];
    notes.forEach((f, i) => {
      const t = now + i * 0.22;
      [['sine', 1], ['triangle', 0.25]].forEach(([type, lvl]) => {
        const o = ctx.createOscillator(); o.type = type; o.frequency.value = type === 'sine' ? f : f * 2;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(lvl, t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 1.6);
        o.connect(g).connect(master); o.start(t); o.stop(t + 1.7);
      });
    });
    // Warm pad underneath
    [293.66, 440.0].forEach(f => {
      const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = f;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, now);
      g.gain.exponentialRampToValueAtTime(0.35, now + 0.8);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);
      o.connect(g).connect(master); o.start(now); o.stop(now + 4);
    });
    setTimeout(() => { try { ctx.close(); } catch (e) {} }, 6000);
  }

  // Try to start sound immediately (works where the browser allows it, e.g. returning visitors)
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (AC) {
      ctx = new AC();
      if (ctx.state === 'running') chime();
      else ctx.resume().then(chime).catch(() => {});
    }
  } catch (e) {}

  function enter() {
    if (done) return;
    if (!played && ctx) {
      ctx.resume().then(chime).catch(() => {});
      close(900);              // let the chime start before the site opens
    } else {
      close(0);
    }
  }
  intro.addEventListener('click', enter);
  intro.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') { e.preventDefault(); enter(); } });
  setTimeout(() => close(0), AUTO_MS);
})();

// Mobile navigation
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));

// Enquiry form: no server needed. Opens WhatsApp or the email app with the details filled in.
const form = document.getElementById('enquiry');
let via = 'wa';
form.querySelectorAll('button[type=submit]').forEach(b => b.addEventListener('click', () => { via = b.dataset.via; }));
form.addEventListener('submit', e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(form));
  const text = `Hello Rays Pools & Chemicals,\n\nName: ${d.name}\nPhone: ${d.phone}\nLooking for: ${d.need}\nProperty: ${d.type}\nDetails: ${d.msg || '-'}`;
  if (via === 'mail') {
    location.href = `mailto:rayspools999@gmail.com,rayspoolschemicals@gmail.com?subject=${encodeURIComponent('Enquiry: ' + d.need)}&body=${encodeURIComponent(text)}`;
  } else {
    window.open(`https://wa.me/919844066321?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  }
});

// Gentle reveal on scroll
const io = 'IntersectionObserver' in window && new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
}, { rootMargin: '0px 0px -8% 0px' });
document.querySelectorAll('.section-head, .pool-card, .steps li, .service-list li, .eq-grid figure, .chem, .proj-grid > div, .mosaic, .about-copy')
  .forEach(el => { if (io) { el.classList.add('reveal'); io.observe(el); } });

document.getElementById('yr').textContent = new Date().getFullYear();
