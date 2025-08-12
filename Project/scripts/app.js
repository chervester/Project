// scripts/app.js
import { fetchUniversities } from './data.js';

/* common UI helpers */
function toggleNav(btn, links) {
  const expanded = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!expanded));
  links.style.display = links.style.display === 'flex' ? '' : 'flex';
}

/* card creation functions */
function makeCardSimple(tpl, item) {
  const clone = tpl.content.cloneNode(true);
  clone.querySelector('.card-img').src = item.image;
  clone.querySelector('.card-img').alt = `${item.name} campus, ${item.location}`;
  clone.querySelector('.card-name').textContent = item.name;
  clone.querySelector('.card-meta').textContent = `${item.location} • ${item.type}`;
  return clone;
}

function makeCardFull(tpl, item) {
  const clone = tpl.content.cloneNode(true);
  clone.querySelector('.card-img').src = item.image;
  clone.querySelector('.card-img').alt = `${item.name} campus, ${item.location}`;
  clone.querySelector('.card-name').textContent = item.name;
  clone.querySelector('.card-location').textContent = `${item.location} • ${item.type}`;
  clone.querySelector('.card-desc').textContent = item.description;
  const tags = clone.querySelector('.card-tags');
  if (tags) {
    item.programs.slice(0,4).forEach(p => {
      const s = document.createElement('span'); s.className='tag'; s.textContent = p;
      tags.appendChild(s);
    });
  }
  return clone;
}

/* Modal helpers - accessible */
function openModal(modal, item) {
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
  modal.querySelector('#modal-title').textContent = item.name;
  modal.querySelector('#modal-image').src = item.image;
  modal.querySelector('#modal-image').alt = `${item.name} campus, ${item.location}`;
  modal.querySelector('#modal-desc').textContent = item.description;
  const ul = modal.querySelector('#modal-info'); ul.innerHTML='';
  [['Location', item.location], ['Type', item.type], ['Founded', item.founded], ['Phone', item.phone]].forEach(([k,v])=>{
    const li = document.createElement('li'); li.textContent = `${k}: ${v || '—'}`; ul.appendChild(li);
  });
  modal.querySelector('#modal-site').href = item.website || '#';

  // focus trap
  const focusable = modal.querySelectorAll('a, button, input, [tabindex]:not([tabindex="-1"])');
  const first = focusable[0], last = focusable[focusable.length-1];
  function trap(e){
    if (e.key === 'Escape') closeModal(modal);
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
    }
  }
  modal._trap = trap;
  document.addEventListener('keydown', trap);
  first?.focus();
}

function closeModal(modal) {
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
  if (modal._trap) { document.removeEventListener('keydown', modal._trap); modal._trap = null; }
}

/* page-specific initialization */
document.addEventListener('DOMContentLoaded', async () => {
  // set years
  document.querySelectorAll('#year, #year2, #year3, #year4').forEach(el => { if (el) el.textContent = new Date().getFullYear(); });

  // nav toggles
  const hb = document.getElementById('hamburger');
  const links = document.getElementById('nav-links');
  if (hb && links) {
    hb.addEventListener('click', ()=> toggleNav(hb, links));
    hb.addEventListener('keyup', (e)=> { if (e.key==='Enter' || e.key===' ') toggleNav(hb, links); });
  }
  const hb2 = document.getElementById('hamburger-2');
  const links2 = document.getElementById('nav-links-2');
  if (hb2 && links2) {
    hb2.addEventListener('click', ()=> toggleNav(hb2, links2));
    hb2.addEventListener('keyup', (e)=> { if (e.key==='Enter' || e.key===' ') toggleNav(hb2, links2); });
  }

  // load data once
  let data = [];
  try { data = await fetchUniversities(); }
  catch (err) { console.error(err); }

  /* Home page: featured */
  if (document.body.id === 'page-home') {
    const tpl = document.getElementById('card-tpl');
    const grid = document.getElementById('featured-grid');
    (data.slice(0,3)).forEach(item => {
      const node = makeCardSimple(tpl, item);
      const card = node.querySelector('.card');
      const det = card.querySelector('.details');
      const fav = card.querySelector('.fav');
      det.addEventListener('click', ()=> alert(`${item.name}\n${item.description}\n${item.website}`));
      fav.addEventListener('click', ()=>{
        const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
        const idx = favs.indexOf(item.id);
        if (idx === -1){ favs.push(item.id); fav.setAttribute('aria-pressed','true'); fav.textContent='♥'; }
        else { favs.splice(idx,1); fav.setAttribute('aria-pressed','false'); fav.textContent='♡'; }
        localStorage.setItem('favorites', JSON.stringify(favs));
      });
      grid.appendChild(node);
    });
  }

  /* Universities page */
  if (document.body.id === 'page-universities') {
    const list = document.getElementById('list');
    const tpl = document.getElementById('full-card');
    const search = document.getElementById('search');
    const type = document.getElementById('type');
    const program = document.getElementById('program');
    const modal = document.getElementById('modal');
    const modalClose = document.getElementById('modal-close');

    function render(items){
      list.innerHTML = '';
      if (!items.length) { document.getElementById('results').textContent='No results'; return; }
      document.getElementById('results').textContent = `Showing ${items.length} universities`;
      items.forEach(item => {
        const node = makeCardFull(tpl, item);
        const card = node.querySelector('.card');
        const det = card.querySelector('.details');
        const fav = card.querySelector('.fav');

        det.addEventListener('click', ()=> openModal(modal, item));
        fav.addEventListener('click', ()=>{
          const favs = JSON.parse(localStorage.getItem('favorites')||'[]');
          const idx = favs.indexOf(item.id);
          if (idx === -1){ favs.push(item.id); fav.setAttribute('aria-pressed','true'); fav.textContent='♥ Favorite'; }
          else { favs.splice(idx,1); fav.setAttribute('aria-pressed','false'); fav.textContent='♡ Favorite'; }
          localStorage.setItem('favorites', JSON.stringify(favs));
        });

        // reflect saved favorites
        const favsSaved = JSON.parse(localStorage.getItem('favorites')||'[]');
        if (favsSaved.includes(item.id)){ const fbtn = card.querySelector('.fav'); fbtn.setAttribute('aria-pressed','true'); fbtn.textContent='♥ Favorite'; }

        list.appendChild(node);
      });
    }

    // populate program select
    const pset = new Set(); data.forEach(d => d.programs.forEach(p=> pset.add(p)));
    Array.from(pset).sort().forEach(p => program.appendChild(Object.assign(document.createElement('option'), { value: p, textContent: p })) );

    // initial render
    render(data);

    // filters
    function apply(){
      const q = (search.value||'').trim().toLowerCase();
      const t = type.value;
      const p = program.value;
      const res = data.filter(item=>{
        let ok=true;
        if (t !== 'all') ok = ok && item.type === t;
        if (p !== 'all') ok = ok && item.programs.includes(p);
        if (q) ok = ok && (item.name.toLowerCase().includes(q) || item.location.toLowerCase().includes(q) || item.programs.join(' ').toLowerCase().includes(q));
        return ok;
      });
      render(res);
    }
    search.addEventListener('input', apply);
    type.addEventListener('change', apply);
    program.addEventListener('change', apply);

    // modal close handlers
    modalClose.addEventListener('click', ()=> closeModal(modal));
    modal.addEventListener('click', (e)=> { if (e.target === modal) closeModal(modal); });
  }

  /* About page & Contact page small logic */
  if (document.body.id === 'page-contact') {
    const uniField = document.getElementById('university');
    const favs = JSON.parse(localStorage.getItem('favorites')||'[]');
    if (favs.length) uniField.placeholder = 'One of your favorites';
  }
});
