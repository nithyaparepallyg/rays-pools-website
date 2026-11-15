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
document.querySelectorAll('.section-head, .pool-card, .steps li, .service-list li, .eq-grid figure, .chem, .proj-grid > div, .mosaic, .about-copy, .olympic-copy, .olympic-photos')
  .forEach(el => { if (io) { el.classList.add('reveal'); io.observe(el); } });

document.getElementById('yr').textContent = new Date().getFullYear();

// ---------- Our work: filters + photo viewer ----------
(function () {
  const items = [...document.querySelectorAll('.work')];
  const filters = document.querySelectorAll('.filter');
  filters.forEach(btn => btn.addEventListener('click', () => {
    filters.forEach(b => { const on = b === btn; b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', on); });
    const f = btn.dataset.filter;
    items.forEach(it => { it.hidden = !(f === 'all' || it.dataset.cat === f); });
  }));

  const lb = document.querySelector('.lightbox');
  if (!lb || typeof lb.showModal !== 'function') return;
  const img = lb.querySelector('img'), cap = lb.querySelector('figcaption');
  let list = [], idx = 0;
  function show(i) {
    idx = (i + list.length) % list.length;
    const it = list[idx], src = it.querySelector('img');
    img.src = src.src; img.alt = src.alt;
    cap.innerHTML = '';
    const t = document.createElement('strong'); t.textContent = it.querySelector('figcaption strong').textContent;
    const d = document.createElement('span'); d.textContent = it.querySelector('figcaption span').textContent;
    cap.append(t, d);
  }
  items.forEach(it => it.querySelector('.work-btn').addEventListener('click', () => {
    list = items.filter(x => !x.hidden);
    show(list.indexOf(it));
    lb.showModal();
  }));
  lb.querySelector('.lb-close').addEventListener('click', () => lb.close());
  lb.querySelector('.lb-prev').addEventListener('click', () => show(idx - 1));
  lb.querySelector('.lb-next').addEventListener('click', () => show(idx + 1));
  lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });
  lb.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') show(idx - 1); if (e.key === 'ArrowRight') show(idx + 1); });
  // swipe on phones
  let x0 = null;
  lb.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1)); x0 = null; });
})();
