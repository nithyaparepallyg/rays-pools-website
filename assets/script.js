// ---------- Intro splash ----------
// Plays on every page load. Tap/click/Enter = water sound + enter; otherwise it opens by itself.
// (Browsers don't allow sound before the visitor interacts, so the sound plays on tap.)
(function () {
  const intro = document.getElementById('intro');
  if (!intro) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) { intro.remove(); return; }

  const AUTO_MS = 5000;
  intro.style.setProperty('--intro-ms', AUTO_MS + 'ms');
  document.body.classList.add('intro-on');
  intro.focus({ preventScroll: true });
  let done = false;

  function close(delay) {
    if (done) return; done = true;
    setTimeout(() => {
      intro.classList.add('out');
      document.body.classList.remove('intro-on');
      setTimeout(() => intro.remove(), 800);
    }, delay || 0);
  }

  function splashSound() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    const ctx = new AC();
    const now = ctx.currentTime;
    // Splash: a burst of filtered noise that sweeps down
    const len = ctx.sampleRate * 1.4;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.2);
    const noise = ctx.createBufferSource(); noise.buffer = buf;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass';
    lp.frequency.setValueAtTime(3200, now); lp.frequency.exponentialRampToValueAtTime(300, now + 1.2);
    const ng = ctx.createGain(); ng.gain.setValueAtTime(0.0001, now);
    ng.gain.exponentialRampToValueAtTime(0.5, now + 0.03); ng.gain.exponentialRampToValueAtTime(0.0001, now + 1.3);
    noise.connect(lp).connect(ng).connect(ctx.destination); noise.start(now);
    // Bubbles: short rising sine "bloops"
    for (let k = 0; k < 9; k++) {
      const t = now + 0.15 + Math.random() * 0.9;
      const o = ctx.createOscillator(); o.type = 'sine';
      const f = 350 + Math.random() * 650;
      o.frequency.setValueAtTime(f, t); o.frequency.exponentialRampToValueAtTime(f * 2.2, t + 0.07);
      const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.12, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
      o.connect(g).connect(ctx.destination); o.start(t); o.stop(t + 0.1);
    }
    setTimeout(() => ctx.close(), 2000);
  }

  function enter() {
    if (done) return;
    try { splashSound(); } catch (e) {}
    close(650);
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
