// ---------- Rays Pools chat assistant ----------
// Answers common customer questions instantly from the knowledge below.
// No server or API key needed. Anything it can't answer is handed to WhatsApp.
// To change an answer, edit the text in KB. Keywords are what visitors might type.
(function () {
  const WA = '919844066321';
  const PHONE1 = '+91 98440 66321', PHONE2 = '+91 99805 55122';
  const MAP = 'https://maps.app.goo.gl/aGniJcNXSeBUbKAK6';
  const wa = (text) => `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;

  const KB = [
    { id: 'greet', keys: ['hi', 'hello', 'hey', 'hii', 'namaste', 'namaskara', 'good morning', 'good evening', 'good afternoon'],
      a: `Hello! 👋 I can answer questions about our pools, services, chemicals and how to get a quote. What would you like to know?`,
      chips: ['Types of pools', 'Cost of a pool', 'Maintenance / AMC', 'Contact details'] },

    { id: 'types', keys: ['types', 'type', 'kinds', 'kind', 'what pools', 'which pools', 'infinity', 'lap pool', 'lap', 'indoor', 'olympic', 'recreational', 'above ground', 'residential pool', 'commercial pool', 'villa pool', 'home pool', 'water park', 'build pool', 'new pool', 'construct', 'construction'],
      a: `We design and build all kinds of swimming pools for homes and businesses:<ul><li>Infinity (zero-edge) pools</li><li>Lap pools for fitness</li><li>Terrace &amp; rooftop pools</li><li>Indoor pools</li><li>Recreational / free-form pools</li><li>Olympic &amp; mini-Olympic pools</li><li>Spas &amp; jacuzzis</li><li>Above-ground pools and water parks</li></ul>We've completed 500+ projects since 1994.`,
      chips: ['Cost of a pool', 'Terrace pools', 'Book a site visit'] },

    { id: 'cost', keys: ['cost', 'price', 'prices', 'rate', 'rates', 'charges', 'charge', 'how much', 'budget', 'estimate', 'quotation', 'quote', 'expensive', 'cheap', 'per sq ft', 'per sqft', 'square feet', 'lakh', 'lakhs', 'rupees', 'amount'],
      a: `The cost depends on the pool's size and type, your site (ground or terrace), the finishes and tiles, and the filtration and equipment you choose — so we don't quote a fixed rate online.<br><br>Share your location, approximate size and type of pool and our team will guide you on budget and arrange a site visit for an exact quotation.`,
      chips: ['Get a quote on WhatsApp', 'Book a site visit', 'How long does it take?'] },

    { id: 'time', keys: ['how long', 'time', 'duration', 'days', 'weeks', 'months', 'timeline', 'when complete', 'completion', 'finish', 'schedule'],
      a: `Timelines depend on the size of the pool, the site and the finishes. Our team plans the full schedule with you along with the quotation, and manages the build so it finishes on time.`,
      chips: ['Book a site visit', 'Cost of a pool'] },

    { id: 'areas', keys: ['where do you work', 'do you work in', 'which city', 'cities', 'area', 'areas', 'outside bangalore', 'outside bengaluru', 'other city', 'other state', 'hyderabad', 'chennai', 'tamil nadu', 'kerala', 'mangalore', 'mangaluru', 'udupi', 'manipal', 'mysore', 'mysuru', 'goa', 'india', 'travel', 'serve', 'service area', 'location of work'],
      a: `We're based in Koramangala, Bengaluru, and work across South India and beyond. We've built pools in Bengaluru, Mangaluru, Surathkal, Udupi, Malpe, Manipal, Kundapura, Chikkamagaluru, Hampi, Hyderabad and Tamil Nadu — 500+ projects across India.<br><br>Building somewhere else? Ask us — we travel for the right project.`,
      chips: ['Get a quote on WhatsApp', 'Our projects'] },

    { id: 'maint', keys: ['maintenance', 'maintain', 'amc', 'annual', 'cleaning', 'clean', 'servicing', 'service', 'green water', 'green', 'algae', 'cloudy', 'dirty', 'murky', 'smell', 'smelly', 'foam', 'water quality', 'weekly', 'monthly'],
      a: `Yes — we offer annual maintenance contracts (AMC) and one-time service for pools, fountains and water features: cleaning, water testing, chemical balancing and equipment checks.<br><br>Green or cloudy water? Tell us the pool size and location and we'll send a technician.`,
      chips: ['Request maintenance on WhatsApp', 'Pool chemicals', 'Repairs & renovation'] },

    { id: 'repair', keys: ['repair', 'repairs', 'leak', 'leakage', 'leaking', 'crack', 'broken', 'renovation', 'renovate', 'refurbish', 'remodel', 'old pool', 'retile', 're tile', 'tiles', 'tile', 'plaster', 'replaster', 'resurface', 'not working'],
      a: `We repair and renovate existing pools — leaks, cracks, re-tiling, re-plastering, interior surfaces, plumbing and equipment, lighting and full refurbishments. Tiles are from our partner Sisa Mosaic.<br><br>Send a few photos of the pool on WhatsApp and we'll suggest the next step.`,
      chips: ['Send photos on WhatsApp', 'Maintenance / AMC'] },

    { id: 'chem', keys: ['chemical', 'chemicals', 'chlorine', 'ph', 'algaecide', 'test kit', 'testing kit', 'bleaching', 'tablets', 'granules', 'buy', 'purchase', 'supply', 'supplier', 'stock'],
      a: `Yes, we supply pool chemicals — chlorine and sanitisers, organic and inorganic water treatment, maintenance products and test kits.<br><br>Tell us what you need and the quantity, and we'll share availability and price. You can also visit our shop in Koramangala.`,
      chips: ['Order chemicals on WhatsApp', 'Shop address'] },

    { id: 'equip', keys: ['equipment', 'pump', 'pumps', 'filter', 'filters', 'filtration', 'filtration plant', 'sand filter', 'heater', 'heating', 'heat pump', 'light', 'lights', 'lighting', 'led', 'valve', 'valves', 'cleaner', 'robot', 'automation', 'automatic', 'nozzle', 'skimmer', 'uv'],
      a: `We supply and install pool equipment: pumps, sand and cartridge filters, filtration plants, heaters, underwater LED lights, multiport valves, automatic cleaners, nozzles and fittings, and pool automation.`,
      chips: ['Ask about equipment on WhatsApp', 'Repairs & renovation'] },

    { id: 'spa', keys: ['spa', 'spas', 'jacuzzi', 'jacuzzis', 'hot tub', 'whirlpool', 'steam'],
      a: `Yes, we design and build spas and jacuzzis — indoors or outdoors, on their own or alongside a pool.`,
      chips: ['Get a quote on WhatsApp', 'Types of pools'] },

    { id: 'fountain', keys: ['fountain', 'fountains', 'water feature', 'water features', 'waterfall', 'cascade', 'water wall', 'musical fountain', 'pond', 'water body'],
      a: `We design, build and maintain fountains and water features — jet and musical fountains, cascades and water walls for homes, lobbies, gardens and campuses.`,
      chips: ['Get a quote on WhatsApp', 'Maintenance / AMC'] },

    { id: 'terrace', keys: ['terrace', 'rooftop', 'roof', 'roof top', 'waterproofing', 'waterproof', 'load', 'structure', 'structural', 'building top', 'apartment pool'],
      a: `Terrace and rooftop pools are one of our specialities. We check the structure, handle the structural engineering and waterproofing, and coordinate with your architect so the pool, deck and lighting are planned together.`,
      chips: ['Book a site visit', 'Cost of a pool'] },

    { id: 'size', keys: ['size', 'small', 'compact', 'space', 'dimensions', 'minimum', 'how big', 'length', 'width', 'depth', 'deep', 'narrow plot'],
      a: `We design each pool around your site, so size is flexible — from compact pools and narrow lap pools for small plots up to Olympic-size competition pools. Share your available space and we'll suggest what fits.`,
      chips: ['Book a site visit', 'Types of pools'] },

    { id: 'architect', keys: ['architect', 'architects', 'builder', 'builders', 'developer', 'developers', 'engineer', 'consultant', 'consultancy', 'drawings', 'design', 'designs', 'tender', 'project management'],
      a: `Yes — much of our work is with architects, engineers, builders and developers. We provide pool consultancy, concept design, drawings and structural engineering, and join the project early so plumbing, filtration and finishes are coordinated with the building.`,
      chips: ['Talk to our team on WhatsApp', 'Our projects'] },

    { id: 'exp', keys: ['experience', 'since', 'how old', 'years', 'established', 'founded', 'founder', 'owner', 'projects', 'clients', 'portfolio', 'reference', 'references', 'previous work', 'trust', 'about', 'company'],
      a: `Rays Pools &amp; Chemicals was founded in 1994 by Mr. A. S. Venkatesha. We've designed, built and refurbished 500+ pools and water bodies across India for clients like Karnataka Golf Association, NIT Surathkal, The Park Hotel, Paradise Resorts, Kishkinda Water Park and many builders and homeowners.`,
      chips: ['Our projects', 'Types of pools'] },

    { id: 'visit', keys: ['site visit', 'visit my site', 'inspection', 'inspect', 'survey', 'consultation', 'consult', 'meet', 'meeting', 'appointment', 'come and see', 'book'],
      a: `Happy to visit your site. Send us your name, location and what you're planning, and our team will call you to fix a time.`,
      chips: ['Book on WhatsApp', 'Contact details'] },

    { id: 'contact', keys: ['contact', 'phone', 'call', 'number', 'mobile', 'whatsapp', 'email', 'mail', 'talk', 'speak', 'reach', 'instagram', 'facebook', 'insta', 'fb', 'social media', 'social'],
      a: `You can reach us on:<ul><li>📞 <a href="tel:+919844066321">${PHONE1}</a> / <a href="tel:+919980555122">${PHONE2}</a></li><li>💬 <a href="${wa('Hello Rays Pools & Chemicals')}" target="_blank" rel="noopener">WhatsApp us</a></li><li>✉️ <a href="mailto:rayspools999@gmail.com">rayspools999@gmail.com</a></li><li>✉️ <a href="mailto:rayspoolschemicals@gmail.com">rayspoolschemicals@gmail.com</a></li><li>📷 <a href="https://www.instagram.com/rayspoolschemicals/" target="_blank" rel="noopener">Instagram</a> · <a href="https://www.facebook.com/rayspoolschemicals/" target="_blank" rel="noopener">Facebook</a></li></ul>`,
      chips: ['Shop address', 'Book a site visit'] },

    { id: 'address', keys: ['address', 'office', 'shop', 'store', 'located', 'location', 'map', 'maps', 'directions', 'koramangala', 'national games village', 'come to', 'where are you', 'where is your', 'your office', 'where is the shop'],
      a: `We're at Shop No. 12, Sharavathi Block, National Games Village Complex, Koramangala, Bengaluru.<br><br><a href="${MAP}" target="_blank" rel="noopener">Open in Google Maps →</a><br><br>Please call ${PHONE1} before visiting.`,
      chips: ['Contact details', 'Pool chemicals'] },

    { id: 'hours', keys: ['hours', 'opening time', 'shop time', 'timing', 'timings', 'open', 'opening', 'closed', 'sunday', 'saturday', 'holiday', 'working hours'],
      a: `For our shop timings, please call <a href="tel:+919844066321">${PHONE1}</a> or message us on WhatsApp before you visit.`,
      chips: ['Shop address', 'Contact details'] },

    { id: 'thanks', keys: ['thanks', 'thank you', 'thankyou', 'ok', 'okay', 'great', 'super', 'nice', 'cool'],
      a: `You're welcome! Anything else I can help with?`,
      chips: ['Get a quote on WhatsApp', 'Contact details'] },
  ];

  // Chips that map to an answer or a direct action
  const CHIP_TO = {
    'Types of pools': 'types', 'Cost of a pool': 'cost', 'How long does it take?': 'time',
    'Maintenance / AMC': 'maint', 'Repairs & renovation': 'repair', 'Pool chemicals': 'chem',
    'Terrace pools': 'terrace', 'Contact details': 'contact', 'Shop address': 'address',
    'Book a site visit': 'visit', 'Our projects': '#projects',
  };
  const WA_CHIPS = {
    'Get a quote on WhatsApp': "Hello Rays Pools & Chemicals, I'd like a quote for a swimming pool.\nLocation:\nApprox size:\nType of pool:",
    'Request maintenance on WhatsApp': "Hello, I need pool maintenance.\nLocation:\nPool size:",
    'Send photos on WhatsApp': "Hello, I need a pool repair/renovation. Sending photos.\nLocation:",
    'Order chemicals on WhatsApp': "Hello, I'd like to order pool chemicals:\n",
    'Ask about equipment on WhatsApp': "Hello, I have a question about pool equipment:\n",
    'Talk to our team on WhatsApp': "Hello Rays Pools & Chemicals, I'm an architect/builder and would like to discuss a project.",
    'Book on WhatsApp': "Hello, I'd like to book a site visit.\nName:\nLocation:\nWhat I'm planning:",
  };

  const norm = (t) => ' ' + t.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim() + ' ';
  function match(text) {
    const q = norm(text);
    let best = null, bestScore = 0;
    for (const item of KB) {
      let score = 0;
      for (const k of item.keys) if (q.includes(' ' + k + ' ')) score += k.split(' ').length;
      // a greeting or "thanks" alone shouldn't beat a real question
      if ((item.id === 'greet' || item.id === 'thanks') && score) score = 0.5;
      if (score > bestScore) { best = item; bestScore = score; }
    }
    return best;
  }

  // ---------- UI ----------
  const launcher = document.createElement('button');
  launcher.className = 'chat-launch';
  launcher.setAttribute('aria-label', 'Ask us a question');
  launcher.setAttribute('aria-expanded', 'false');
  launcher.innerHTML = '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path fill="currentColor" d="M12 3C6.5 3 2 6.8 2 11.5c0 2.4 1.2 4.6 3.1 6.1L4.5 21l3.8-1.9c1.2.4 2.4.6 3.7.6 5.5 0 10-3.8 10-8.5S17.5 3 12 3Zm-4 9.7a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Zm4 0a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Zm4 0a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Z"/></svg><span class="chat-launch-label">Ask us</span>';

  const panel = document.createElement('section');
  panel.className = 'chat';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'Rays Pools assistant');
  panel.hidden = true;
  panel.innerHTML = `
    <header class="chat-head">
      <img src="assets/img/mono-white.png" alt="" width="34" height="30">
      <div><strong>Rays Pools Assistant</strong><span>Instant answers · our team replies on WhatsApp</span></div>
      <button class="chat-close" aria-label="Close chat">×</button>
    </header>
    <div class="chat-log" aria-live="polite"></div>
    <form class="chat-form">
      <input type="text" placeholder="Type your question…" aria-label="Your question" autocomplete="off" maxlength="300">
      <button type="submit" aria-label="Send"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M3 20.5 21 12 3 3.5v6.6l12 1.9-12 1.9v6.6Z"/></svg></button>
    </form>`;
  document.body.append(panel, launcher);

  const log = panel.querySelector('.chat-log');
  const form = panel.querySelector('.chat-form');
  const input = form.querySelector('input');
  let started = false;

  function add(html, who, chips) {
    const m = document.createElement('div');
    m.className = 'msg ' + who;
    m.innerHTML = html;
    log.appendChild(m);
    if (chips && chips.length) {
      const row = document.createElement('div');
      row.className = 'chips';
      chips.forEach(c => {
        const b = document.createElement('button');
        b.type = 'button'; b.textContent = c;
        if (WA_CHIPS[c]) b.classList.add('wa');
        b.addEventListener('click', () => onChip(c));
        row.appendChild(b);
      });
      log.appendChild(row);
    }
    log.scrollTop = log.scrollHeight;
  }
  const esc = (t) => t.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function reply(item, question) {
    const typing = document.createElement('div');
    typing.className = 'msg bot typing'; typing.innerHTML = '<i></i><i></i><i></i>';
    log.appendChild(typing); log.scrollTop = log.scrollHeight;
    setTimeout(() => {
      typing.remove();
      if (item) add(item.a, 'bot', item.chips);
      else add(`I'm not sure about that one, but our team can help right away. <a href="${wa('Hello Rays Pools & Chemicals, ' + question)}" target="_blank" rel="noopener">Ask on WhatsApp →</a> or call <a href="tel:+919844066321">${PHONE1}</a>.`, 'bot', ['Types of pools', 'Cost of a pool', 'Contact details']);
    }, 550);
  }

  function onChip(c) {
    if (WA_CHIPS[c]) { window.open(wa(WA_CHIPS[c]), '_blank', 'noopener'); return; }
    const to = CHIP_TO[c];
    if (to && to.startsWith('#')) { close(); location.hash = to; return; }
    add(esc(c), 'user');
    reply(KB.find(k => k.id === to), c);
  }

  function open() {
    panel.hidden = false;
    document.body.classList.add('chat-open');
    launcher.setAttribute('aria-expanded', 'true');
    if (!started) {
      started = true;
      add(`Hi! 👋 I'm the Rays Pools assistant. Ask me about pool types, costs, maintenance, chemicals or how to reach us.`, 'bot',
        ['Types of pools', 'Cost of a pool', 'Maintenance / AMC', 'Repairs & renovation', 'Pool chemicals', 'Contact details']);
    }
    setTimeout(() => input.focus(), 50);
  }
  function close() {
    panel.hidden = true;
    document.body.classList.remove('chat-open');
    launcher.setAttribute('aria-expanded', 'false');
    launcher.focus();
  }

  launcher.addEventListener('click', () => (panel.hidden ? open() : close()));
  panel.querySelector('.chat-close').addEventListener('click', close);
  panel.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  form.addEventListener('submit', e => {
    e.preventDefault();
    const q = input.value.trim();
    if (!q) return;
    add(esc(q), 'user');
    input.value = '';
    reply(match(q), q);
  });
})();
