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
