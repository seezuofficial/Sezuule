/* ===== EDIT THIS BLOCK: all popup content lives here ===== */
const SEEZU = {
  projects: {
    "SEEZU® — Personal Identity": {sub:"This website", body:["A digital home for the person behind the name. It holds my interests, projects, notes and photos in one place, and it keeps changing as I do."], links:[{l:"See the code on GitHub", u:"https://github.com/seezuofficial"}]},
    "Next experiment": {sub:"In the making", body:["The next idea is still taking shape. Want to follow it or add to it?"], links:[{l:"Send me an idea", u:"mailto:hello@seezu.me"}]},
    "Future collaborations": {sub:"Open to ideas", body:["Good ideas get better when they’re shared. If you’re building something, say hello."], links:[{l:"Start a conversation", u:"mailto:hello@seezu.me"}]},
  },
  gallery: [
    {t:"Moments", d:"The now. Good things take time."},
    {t:"Places", d:"Out there. Collect experiences."},
    {t:"Details", d:"Notice more. The little things."}
  ]
};
/* ===== END EDIT BLOCK ===== */

(() => {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const root = document.createElement('div');
  root.className = 'gm';
  root.innerHTML = '<div class="gm-card" role="dialog" aria-modal="true"><button class="gm-x" aria-label="Close">×</button><div class="gm-body"></div></div>';
  document.body.appendChild(root);
  const body = root.querySelector('.gm-body');
  const closeBtn = root.querySelector('.gm-x');
  let last = null;

  function open(html, trigger) {
    last = trigger || null;
    body.innerHTML = html;
    root.classList.add('open');
    document.documentElement.style.overflow = 'hidden';
    closeBtn.focus();
  }
  function close() {
    root.classList.remove('open');
    document.documentElement.style.overflow = '';
    if (last) last.focus();
  }
  closeBtn.addEventListener('click', close);
  root.addEventListener('click', e => { if (e.target === root) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && root.classList.contains('open')) close(); });

  const head = (t, s) => `<p class="gm-sub">${esc(s || '')}</p><h3 class="gm-title">${esc(t)}</h3>`;
  const link = (l, u) => `<a class="gm-btn" href="${esc(u)}" ${u.startsWith('mailto') ? '' : 'target="_blank" rel="noopener"'}>${esc(l)} <span>↗</span></a>`;

  window.gmOpen = open; window.gmHead = head;
  function makeClickable(el, fn) {
    el.tabIndex = 0;
    el.setAttribute('role', 'button');
    el.style.cursor = 'pointer';
    el.addEventListener('click', e => { e.preventDefault(); fn(el); });
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fn(el); } });
  }

  // projects and notes -> glass popup, with action buttons that open a new tab
  document.querySelectorAll('.project-row').forEach(row => {
    const name = row.querySelector('h3').textContent.trim();
    const d = SEEZU.projects[name]; if (!d) return;
    makeClickable(row, () => open(head(name, d.sub) + d.body.map(p => `<p class="gm-p">${esc(p)}</p>`).join('') +
      (d.links ? '<div class="gm-actions">' + d.links.map(x => link(x.l, x.u)).join('') + '</div>' : ''), row));
  });

  // gallery -> lightbox (shows the real photo if one is added)
  document.querySelectorAll('.gallery-tile').forEach((tile, i) => {
    const d = SEEZU.gallery[i]; if (!d) return;
    makeClickable(tile, () => {
      const art = tile.querySelector('.tile-art').cloneNode(true);
      art.classList.add('gm-art');
      open(head(d.t, 'Frames of life') + '<div class="gm-artwrap"></div>' + `<p class="gm-p">${esc(d.d)}</p>`, tile);
      body.querySelector('.gm-artwrap').appendChild(art);
    });
  });

  // in-page links scroll smoothly; placeholder "#" links do nothing
  document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    e.preventDefault();
    if (id.length > 1) document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));
})();

(() => {
  // fade out, then go to the next page (same-site links only)
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
    const u = new URL(a.href, location.href);
    if (u.origin !== location.origin || u.pathname === location.pathname) return;
    e.preventDefault();
    document.body.classList.add('leaving');
    setTimeout(() => { location.href = a.href; }, 350);
  });
  window.addEventListener('pageshow', e => { if (e.persisted) document.body.classList.remove('leaving'); });
})();

(() => {
  const bar = document.createElement('div'); bar.className = 'progress'; document.body.appendChild(bar);
  const up = document.createElement('button'); up.className = 'totop'; up.setAttribute('aria-label', 'Back to top'); up.textContent = '↑'; document.body.appendChild(up);
  up.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  const tick = () => { const h = document.documentElement, m = h.scrollHeight - innerHeight; bar.style.width = (m > 0 ? scrollY / m * 100 : 0) + '%'; up.classList.toggle('show', scrollY > 600); };
  addEventListener('scroll', tick, { passive: true }); tick();
  // filters + search (delegated so they work on every page)
  const apply = g => {
    const cat = g.querySelector('.chip[aria-pressed="true"]')?.dataset.cat || 'all';
    const q = (g.querySelector('.search')?.value || '').toLowerCase().trim();
    let n = 0;
    g.querySelectorAll('.card').forEach(c => { const ok = (cat === 'all' || c.dataset.cat === cat) && (!q || c.textContent.toLowerCase().includes(q)); c.classList.toggle('hide', !ok); if (ok) n++; });
    g.querySelector('.empty')?.classList.toggle('show', n === 0);
  };
  document.addEventListener('click', e => { const c = e.target.closest('.chip'); if (!c) return; const g = c.closest('[data-filter]'); g.querySelectorAll('.chip').forEach(x => x.setAttribute('aria-pressed', String(x === c))); apply(g); });
  document.addEventListener('input', e => { const g = e.target.closest('[data-filter]'); if (g && e.target.matches('.search')) apply(g); });
})();

/* ===== v2: social, intro, art, gallery, travel, Tawk.to (data: content.js) ===== */
(() => {
  const C = window.SEEZU_C || {}, demo = C.demo !== false;
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const isR = v => /^REPLACE:/.test(v || '');
  const TAG = '<i class="edit-tag">EDIT</i>';
  const txt = v => isR(v) ? (demo ? esc(v) + TAG : '') : esc(v);
  const show = o => demo || !Object.values(o).some(isR) || !isR(o.t || o.place);

  const soc = () => (C.social || []).map(s => isR(s.u)
    ? (demo ? `<span class="soc">${esc(s.n)}${TAG}</span>` : '')
    : `<a class="soc" href="${esc(s.u)}" target="_blank" rel="noopener noreferrer">${esc(s.n)} ↗</a>`).join('');
  document.querySelectorAll('[data-social]').forEach(e => e.innerHTML = soc());
  document.querySelectorAll('.nav').forEach(n => { const d = document.createElement('span'); d.className = 'nav-social'; d.innerHTML = soc(); n.insertBefore(d, n.querySelector('.nav-contact')); });
  document.querySelectorAll('.footer').forEach(f => { const d = document.createElement('div'); d.className = 'social-bar foot-social'; d.innerHTML = soc(); f.appendChild(d); });

  document.querySelectorAll('[data-intro]').forEach(e => e.innerHTML = (C.intro || []).map(p => txt(p) ? `<p>${txt(p)}</p>` : '').join(''));

  const click = (el, fn) => { el.tabIndex = 0; el.setAttribute('role', 'button'); el.addEventListener('click', fn); el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fn(); } }); };
  const mapBtn = u => isR(u) ? (demo ? `<span class="soc">MAP${TAG}</span>` : '') : `<a class="gm-btn" href="${esc(u)}" target="_blank" rel="noopener">GOOGLE MAPS <span>↗</span></a>`;

  // art: filter chips + cards + lightbox
  const art = document.getElementById('art-grid');
  if (art) {
    const items = (C.art || []).filter(show);
    const cats = [...new Set(items.map(a => a.cat))];
    document.getElementById('art-chips').innerHTML = '<button class="chip" data-cat="all" aria-pressed="true">ALL</button>' + cats.map(c => `<button class="chip" data-cat="${esc(c)}" aria-pressed="false">${txt(c) || esc(c)}</button>`).join('');
    items.forEach(a => {
      const el = document.createElement('article'); el.className = 'card'; el.dataset.cat = a.cat;
      el.innerHTML = `<div class="shot">${isR(a.img) ? 'PHOTO PLACEHOLDER' + (demo ? TAG : '') : `<img src="${esc(a.img)}" alt="${esc(a.t)}" loading="lazy">`}</div><span class="meta">${txt(a.cat)}</span><h3>${txt(a.t)}</h3><p>${txt(a.d)}</p>`;
      click(el, () => window.gmOpen(window.gmHead(isR(a.t) ? 'Drawing' : a.t, isR(a.cat) ? '' : a.cat) + (isR(a.img) ? '' : `<img class="gm-img" src="${esc(a.img)}" alt="${esc(a.t)}">`) + `<p class="gm-p">${txt(a.d)}</p>`, el));
      art.appendChild(el);
    });
  }

  // gallery: albums -> popup with photo grid (tap a photo to enlarge)
  const alb = document.getElementById('album-grid');
  if (alb) (C.albums || []).filter(show).forEach(a => {
    const el = document.createElement('article'); el.className = 'card';
    const cover = a.photos && a.photos[0];
    el.innerHTML = `<div class="shot">${cover ? `<img src="${esc(cover)}" alt="${esc(a.t)}" loading="lazy">` : 'ALBUM COVER PLACEHOLDER' + (demo ? TAG : '')}</div><span class="meta">${(a.photos || []).length} PHOTOS</span><h3>${txt(a.t)}</h3><p>${txt(a.d)}</p>`;
    click(el, () => { window.gmOpen(window.gmHead(isR(a.t) ? 'Album' : a.t, 'Gallery') + `<p class="gm-p">${txt(a.d)}</p><div class="pgrid">${(a.photos || []).map(p => `<img src="${esc(p)}" alt="" loading="lazy">`).join('') || '<p class="gm-p">Photos yahan aayengi.</p>'}</div>`, el);
      document.querySelectorAll('.pgrid img').forEach(i => i.addEventListener('click', () => i.classList.toggle('zoom'))); });
    alb.appendChild(el);
  });

  // travel: done + planned (planned = month only), Google Maps links
  [['trips-done', 'done'], ['trips-plan', 'plan']].forEach(([id, k]) => {
    const box = document.getElementById(id); if (!box) return;
    ((C.trips || {})[k] || []).filter(show).forEach(t => {
      const el = document.createElement('article'); el.className = 'card';
      el.innerHTML = `<span class="meta">${txt(t.when)}</span><h3>${txt(t.place)}</h3><p>${txt(t.note)}</p><div class="links">${mapBtn(t.map)}</div>`;
      box.appendChild(el);
    });
  });

  // Tawk.to: sirf tab jab dono ID asli hon
  const t = C.tawk || {};
  if (t.propertyId && t.widgetId && !isR(t.propertyId) && !isR(t.widgetId)) {
    window.Tawk_API = window.Tawk_API || {};
    const s = document.createElement('script'); s.async = true; s.charset = 'UTF-8'; s.setAttribute('crossorigin', '*');
    s.src = `https://embed.tawk.to/${encodeURIComponent(t.propertyId)}/${encodeURIComponent(t.widgetId)}`;
    document.head.appendChild(s);
  }
})();

/* ===== v3: menu bahar click par band, scroll yaad rakhna, section jump ke baad Back ===== */
(() => {
  const nav = document.querySelector('.nav'), tog = document.querySelector('.menu-toggle');
  const closeMenu = () => { nav?.classList.remove('open'); tog?.setAttribute('aria-expanded', 'false'); };
  document.addEventListener('click', e => { if (nav?.classList.contains('open') && !e.target.closest('.nav, .menu-toggle')) closeMenu(); }, true);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  if (window.SEEZU_DEMO) return; // demo ka apna router hai

  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  const K = 'seezu:y:' + location.pathname;
  const save = () => { try { sessionStorage.setItem(K, String(Math.round(scrollY))); } catch (_) {} };
  addEventListener('pagehide', save);
  document.addEventListener('click', e => { if (e.target.closest('a[href]')) save(); }, true);

  // Back/forward par purani jagah wapas (layout settle hone tak dobara try)
  const restore = () => {
    let y = 0; try { y = +sessionStorage.getItem(K) || 0; } catch (_) {}
    const t0 = performance.getEntriesByType('navigation')[0];
    if (!y || !t0 || t0.type !== 'back_forward') return;
    const el = document.documentElement; el.style.scrollBehavior = 'auto';
    let n = 0; const t = () => { scrollTo(0, y); if (Math.abs(scrollY - y) > 3 && n++ < 25) setTimeout(t, 80); else el.style.scrollBehavior = ''; }; t();
  };
  if (document.readyState === 'complete') restore(); else addEventListener('load', restore);

  // "BACK TO HOME" links: agar hum home se aaye the to history.back() (position ke saath)
  addEventListener('click', e => {
    const a = e.target.closest('a.back:not(.more), .footer > a:last-of-type');
    if (!a || a.getAttribute('href') !== 'index.html') return;
    try { const r = new URL(document.referrer); if (r.origin === location.origin && /(\/|index\.html)$/.test(r.pathname)) { e.preventDefault(); e.stopPropagation(); history.back(); } } catch (_) {}
  }, true);

  // Section jump (#about etc.): history entry banti hai, Back se pehle wali jagah
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]'); if (!a) return;
    const id = a.getAttribute('href').slice(1); if (!id || !document.getElementById(id)) return;
    try { history.replaceState({ y: Math.round(scrollY) }, ''); history.pushState({ sec: id }, '', '#' + id); } catch (_) {}
  }, true);
  addEventListener('popstate', e => {
    const s = e.state || {};
    if (s.y != null) scrollTo({ top: s.y, behavior: 'smooth' });
    else if (s.sec) document.getElementById(s.sec)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else if (!location.hash) scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ===== v4: Links hub + Friends circle (data: content.js) ===== */
(() => {
  const C = window.SEEZU_C || {}, demo = C.demo !== false;
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const isR = v => /^REPLACE:/.test(v || '');
  const TAG = '<i class="edit-tag">EDIT</i>';
  const txt = v => isR(v) ? (demo ? esc(v) + TAG : '') : esc(v);
  const keep = o => demo || !Object.values(o).some(v => typeof v === 'string' && isR(v)) || false;

  const hub = document.getElementById('links-hub');
  if (hub) {
    const groups = [{ group: 'Also find me on', items: (C.social || []).filter(s => !(C.connect || []).some(c => c.n.toLowerCase() === String(s.n).toLowerCase())).map(s => ({ t: s.n, u: s.u, d: '' })) }, ...(C.links || [])];
    hub.innerHTML = groups.map(g => {
      const cards = (g.items || []).filter(i => demo || !isR(i.u)).map(i => {
        const inner = `<span class="meta">${txt(g.group)}</span><h3>${txt(i.t)}</h3><p>${txt(i.d)}</p>`;
        if (i.copy && !i.u) return `<div class="card">${inner}<div class="links"><button type="button" class="gm-btn" data-copy="${esc(i.copy)}">COPY USERNAME <span>⧉</span></button></div></div>`;
        return isR(i.u) ? `<div class="card">${inner}<div class="links"><span class="soc">LINK${TAG}</span></div></div>`
          : `<a class="card" href="${esc(i.u)}" target="_blank" rel="noopener noreferrer">${inner}<div class="links"><span>OPEN ↗</span></div></a>`;
      }).join('');
      return cards ? `<p class="sec-title">${txt(g.group)}</p><div class="cards">${cards}</div>` : '';
    }).join('');
  }

  const fg = document.getElementById('friend-grid');
  if (fg) {
    fg.innerHTML = (C.friends || []).filter(f => demo || !isR(f.name)).map(f => {
      const shot = isR(f.photo) || !f.photo ? `<div class="shot">${isR(f.name) ? '+' : esc((f.name || '?').charAt(0))}${isR(f.photo) && demo ? TAG : ''}</div>` : `<div class="shot"><img src="${esc(f.photo)}" alt="${esc(f.name)}" loading="lazy"></div>`;
      const link = isR(f.link) ? (demo ? `<span class="soc">PROFILE${TAG}</span>` : '') : `<a class="gm-btn" href="${esc(f.link)}" target="_blank" rel="noopener noreferrer">PROFILE <span>↗</span></a>`;
      return `<article class="card">${shot}<span class="meta">${txt(f.tag)}</span><h3>${txt(f.name)}</h3><p>${txt(f.bio)}</p><div class="links">${link}</div></article>`;
    }).join('');
  }
  const fj = document.getElementById('friend-join');
  if (fj) {
    const sub = encodeURIComponent('Join the SEEZU friend circle');
    const body = encodeURIComponent('Name:\nMy link (Instagram / profile):\nOne line about me:\nI am okay with showing this on your site: yes');
    const form = C.friendsForm && !isR(C.friendsForm) ? `<a class="gm-btn" href="${esc(C.friendsForm)}" target="_blank" rel="noopener noreferrer">FILL THE FORM <span>↗</span></a>` : (demo ? `<span class="soc">FORM${TAG}</span>` : '');
    fj.innerHTML = `<article class="card"><span class="meta">OPEN INVITE</span><h3>Want to be in?</h3><p>Send your name, a profile link and one line about you. I add people who are fine with being shown here.</p><div class="links"><a class="gm-btn" href="mailto:${esc(C.mail || '')}?subject=${sub}&body=${body}">ASK BY EMAIL <span>↗</span></a>${form}</div></article>`;
  }
})();

/* ===== v5: device detect + phone popup (Rotate -> landscape + full screen / Stay vertical) ===== */
(() => {
  const ua = navigator.userAgent || '';
  const coarse = matchMedia('(pointer:coarse)').matches;
  const short = Math.min(screen.width, screen.height);
  const phone = /iPhone|iPod|Android.*Mobile|Mobile.*Firefox/i.test(ua) || (coarse && short <= 600);
  const tablet = !phone && ((coarse && short > 600) || /iPad|Android/i.test(ua));
  const kind = phone ? 'phone' : tablet ? 'tablet' : 'desktop';
  document.documentElement.dataset.device = kind;
  window.SEEZU_DEVICE = kind;
  if (kind !== 'phone') return; // laptop / desktop / tablet: no popup

  const KEY = 'seezu:view';
  const get = () => { try { return sessionStorage.getItem(KEY); } catch (_) { return null; } };
  const set = v => { try { sessionStorage.setItem(KEY, v); } catch (_) {} };
  const el = document.documentElement;
  const isFS = () => !!(document.fullscreenElement || document.webkitFullscreenElement);
  const goFull = async () => {
    let ok = false;
    const rfs = el.requestFullscreen || el.webkitRequestFullscreen;
    try { if (rfs) { if (!isFS()) await rfs.call(el); ok = true; } } catch (_) {}
    try { await screen.orientation.lock('landscape'); } catch (_) {}
    return ok;
  };

  const saved = get();
  if (saved === 'landscape') {
    // fullscreen ends when a new page loads; the first tap on this page brings it back
    if (!isFS()) addEventListener('pointerup', () => { goFull(); }, { once: true });
    return;
  }
  if (saved) return; // already chose "vertical" this visit

  const root = document.createElement('div');
  root.className = 'dv';
  root.innerHTML = '<div class="dv-card" role="dialog" aria-modal="true" aria-labelledby="dv-t">' +
    '<p class="gm-sub">PHONE DETECTED</p><h3 class="gm-title" id="dv-t">How do you want to view this?</h3>' +
    '<p class="gm-p dv-msg">The site looks best sideways, but both work.</p>' +
    '<div class="dv-opts">' +
    '<button type="button" class="dv-opt" data-v="landscape"><i class="dv-ph land"></i><span><b>Rotate</b><small>Landscape and full screen</small></span></button>' +
    '<button type="button" class="dv-opt" data-v="portrait"><i class="dv-ph"></i><span><b>Vertical</b><small>Stay as it is</small></span></button>' +
    '</div></div>';
  const done = v => {
    set(v);
    root.classList.remove('open');
    document.documentElement.style.overflow = '';
    setTimeout(() => root.remove(), 350);
  };
  root.addEventListener('click', async e => {
    const b = e.target.closest('.dv-opt');
    if (!b) return;
    if (b.dataset.v === 'portrait') return done('portrait');
    const ok = await goFull();
    if (ok) return done('landscape');
    // browser has no full screen (for example iPhone Safari): ask to turn the phone instead
    root.querySelector('.dv-opts').remove();
    root.querySelector('.dv-msg').textContent = 'This browser cannot go full screen by itself. Turn your phone sideways to view it in landscape.';
    set('landscape-hint');
    setTimeout(() => done('landscape-hint'), 3200);
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && root.isConnected) done('portrait'); });
  setTimeout(() => {
    document.body.appendChild(root);
    document.documentElement.style.overflow = 'hidden';
    requestAnimationFrame(() => { root.classList.add('open'); root.querySelector('.dv-opt').focus(); });
  }, 500);
})();

/* ===== v6: "Let's Connect" social cards (data: content.js -> connect) ===== */
(() => {
  const ICONS = {"instagram": "M7.03.084c-1.277.06-2.149.264-2.91.563a5.9 5.9 0 0 0-2.124 1.388 5.9 5.9 0 0 0-1.38 2.127C.321 4.926.12 5.8.064 7.076s-.069 1.688-.063 4.947.021 3.667.083 4.947c.061 1.277.264 2.149.563 2.911.308.789.72 1.457 1.388 2.123a5.9 5.9 0 0 0 2.129 1.38c.763.295 1.636.496 2.913.552 1.278.056 1.689.069 4.947.063s3.668-.021 4.947-.082c1.28-.06 2.147-.265 2.91-.563a5.9 5.9 0 0 0 2.123-1.388 5.9 5.9 0 0 0 1.38-2.129c.295-.763.496-1.636.551-2.912.056-1.28.07-1.69.063-4.948-.006-3.258-.02-3.667-.081-4.947-.06-1.28-.264-2.148-.564-2.911a5.9 5.9 0 0 0-1.387-2.123 5.86 5.86 0 0 0-2.128-1.38C19.074.322 18.202.12 16.924.066 15.647.009 15.236-.006 11.977 0S8.31.021 7.03.084m.14 21.693c-1.17-.05-1.805-.245-2.228-.408a3.7 3.7 0 0 1-1.382-.895 3.7 3.7 0 0 1-.9-1.378c-.165-.423-.363-1.058-.417-2.228-.06-1.264-.072-1.644-.08-4.848-.006-3.204.006-3.583.061-4.848.05-1.169.246-1.805.408-2.228.216-.561.477-.96.895-1.382a3.7 3.7 0 0 1 1.379-.9c.423-.165 1.057-.361 2.227-.417 1.265-.06 1.644-.072 4.848-.08 3.203-.006 3.583.006 4.85.062 1.168.05 1.804.244 2.227.408.56.216.96.475 1.382.895s.681.817.9 1.378c.165.422.362 1.056.417 2.227.06 1.265.074 1.645.08 4.848.005 3.203-.006 3.583-.061 4.848-.051 1.17-.245 1.805-.408 2.23-.216.56-.477.96-.896 1.38a3.7 3.7 0 0 1-1.378.9c-.422.165-1.058.362-2.226.418-1.266.06-1.645.072-4.85.079s-3.582-.006-4.848-.06m9.783-16.192a1.44 1.44 0 1 0 1.437-1.442 1.44 1.44 0 0 0-1.437 1.442M5.839 12.012a6.161 6.161 0 1 0 12.323-.024 6.162 6.162 0 0 0-12.323.024M8 12.008A4 4 0 1 1 12.008 16 4 4 0 0 1 8 12.008", "whatsapp": "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52s.198-.298.298-.497c.099-.198.05-.371-.025-.52s-.669-1.612-.916-2.207c-.242-.579-.487-.5-.669-.51a13 13 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074s2.096 3.2 5.077 4.487c.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413s.248-1.289.173-1.413c-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.9 11.9 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413", "youtube": "M23.498 6.186a3.02 3.02 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.02 3.02 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.02 3.02 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.02 3.02 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814M9.545 15.568V8.432L15.818 12z", "facebook": "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a9 9 0 0 1 1.141.195v3.325a9 9 0 0 0-.653-.036 27 27 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.7 1.7 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647", "snapchat": "M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301a1 1 0 0 1 .464-.104c.182 0 .359.029.509.09.45.149.734.479.734.838q.022.674-1.213 1.168c-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509a.6.6 0 0 1-.045.225c-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03a3 3 0 0 1-.538-.074 6 6 0 0 0-1.273-.135c-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884a7 7 0 0 0-.928-.074c-.54 0-.958.089-1.272.149a3 3 0 0 1-.54.074c-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226a.6.6 0 0 1-.055-.225.496.496 0 0 1 .42-.509c3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809a2 2 0 0 1-.346-.119c-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z", "telegram": "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm4.962 7.224c.1-.002.321.023.465.14a.5.5 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024q-.159.037-5.061 3.345-.72.495-1.302.48c-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789q.04-.324.893-.663 5.247-2.286 6.998-3.014c3.332-1.386 4.025-1.627 4.476-1.635", "pinterest": "M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026z"};
  const BRAND = { instagram: '#E4405F', whatsapp: '#25D366', youtube: '#FF0000', facebook: '#1877F2', snapchat: '#FFFC00', telegram: '#26A5E4', pinterest: '#E60023' };
  const DARK_ICON = { snapchat: 1 };
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

  const copy = async t => {
    try { await navigator.clipboard.writeText(t); return true; } catch (_) {}
    try { const a = document.createElement('textarea'); a.value = t; a.style.position = 'fixed'; a.style.opacity = '0'; document.body.appendChild(a); a.select(); const ok = document.execCommand('copy'); a.remove(); return ok; } catch (_) { return false; }
  };
  document.addEventListener('click', async e => {
    const b = e.target.closest('[data-copy]'); if (!b) return;
    const ok = await copy(b.dataset.copy);
    const tag = b.querySelector('.soc-go') || b;
    const keep = b.dataset.label || (b.dataset.label = tag.textContent);
    tag.textContent = ok ? 'COPIED ✓' : 'COPY FAILED';
    setTimeout(() => { tag.textContent = keep; }, 1800);
  });

  const grid = document.getElementById('connect-grid');
  if (!grid) return;
  grid.innerHTML = ((window.SEEZU_C || {}).connect || []).map(s => {
    const c = BRAND[s.id] || '#ffffff', d = ICONS[s.id] || '';
    const style = `--c:${c};--ic:${DARK_ICON[s.id] ? '#000' : '#fff'}`;
    const inner = `<span class="soc-ico"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${d}"/></svg></span>` +
      `<span class="soc-txt"><b>${esc(s.n)}</b><small>${esc(s.h)}</small></span>`;
    return s.u
      ? `<a class="soc-card" style="${style}" href="${esc(s.u)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(s.n)}, ${esc(s.h)}">${inner}<span class="soc-go">↗</span></a>`
      : `<button type="button" class="soc-card" style="${style}" data-copy="${esc(s.copy || s.h)}" aria-label="Copy ${esc(s.n)} username ${esc(s.h)}">${inner}<span class="soc-go">COPY</span></button>`;
  }).join('');

  const cards = [...grid.querySelectorAll('.soc-card')];
  cards.forEach(c => c.addEventListener('pointermove', e => { const r = c.getBoundingClientRect(); c.style.setProperty('--x', (e.clientX - r.left) + 'px'); c.style.setProperty('--y', (e.clientY - r.top) + 'px'); }));
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { threshold: 0.15 });
    cards.forEach((c, i) => { c.style.transitionDelay = (i % 4) * 70 + 'ms,' + (i % 4) * 70 + 'ms,0s,0s,0s,0s'; io.observe(c); });
  } else cards.forEach(c => c.classList.add('in'));
})();
