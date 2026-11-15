// ---------- Intro splash ----------
// Plays on every page load and opens the site by itself after a few seconds.
// Tap/click/Enter/Esc skips straight to the site.
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

  function close() {
    if (done) return; done = true;
    intro.classList.add('out');
    document.body.classList.remove('intro-on');
    setTimeout(() => intro.remove(), 800);
  }
  intro.addEventListener('click', close);
  intro.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') { e.preventDefault(); close(); } });
  setTimeout(close, AUTO_MS);
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
