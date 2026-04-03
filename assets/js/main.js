/* ============================================================
   POUSADA MONTVERDE — main.js v3
   Komplexa Hotéis
   ============================================================ */

const WEBHOOK_URL = 'https://webhook.cidigitalmarketing.com/webhook/795f27d1-f878-4a73-8233-d3663db6d7a7';
const WA_NUMBER   = '5521996915036';
const HOTEL_NAME  = 'Pousada MontVerde';

// ── dataLayer GTM ──
window.dataLayer = window.dataLayer || [];
function pushLead(tipo) {
  window.dataLayer.push({
    event:      'gerar_lead',
    lead_tipo:  tipo,
    pagina:     document.title,
    url:        location.href
  });
}

// ── WEBHOOK ──
async function sendToWebhook(payload) {
  try {
    await fetch(WEBHOOK_URL, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        hotel: HOTEL_NAME,
        origem_pagina: document.title,
        url: location.href,
        timestamp: new Date().toISOString(),
        ...payload
      })
    });
  } catch(e) { console.warn('Webhook:', e); }
}

// ── HEADER SCROLL ──
const hdr = document.getElementById('hdr');
if (hdr && hdr.classList.contains('hero-mode')) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) { hdr.classList.add('solid'); hdr.classList.remove('hero-mode'); }
    else { hdr.classList.remove('solid'); hdr.classList.add('hero-mode'); }
  }, { passive: true });
}

// ── MOBILE MENU ──
const ham = document.getElementById('ham');
const mob = document.getElementById('mobnav');
function openMob()  { mob?.classList.add('open'); ham?.classList.add('open'); document.body.style.overflow='hidden'; ham?.setAttribute('aria-expanded','true'); }
function closeMob() { mob?.classList.remove('open'); ham?.classList.remove('open'); document.body.style.overflow=''; ham?.setAttribute('aria-expanded','false'); }
ham?.addEventListener('click', () => mob?.classList.contains('open') ? closeMob() : openMob());

// ── LAZY LOAD ──
const imgObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('loaded'); imgObs.unobserve(e.target); } });
}, { rootMargin: '200px' });
document.querySelectorAll('img').forEach(img => {
  if (img.complete && img.naturalWidth > 0) img.classList.add('loaded');
  else {
    img.addEventListener('load',  () => img.classList.add('loaded'), {once:true});
    img.addEventListener('error', () => img.classList.add('loaded'), {once:true});
    imgObs.observe(img);
  }
});

// ── WHATSAPP MODAL ──
const waModal = document.getElementById('waModal');
function openWAModal()  { if (!waModal) return; waModal.classList.add('open'); document.body.style.overflow='hidden'; }
function closeWAModal() { if (!waModal) return; waModal.classList.remove('open'); document.body.style.overflow=''; }
waModal?.addEventListener('click', e => { if (e.target === waModal) closeWAModal(); });

async function submitWAForm(e) {
  e.preventDefault();
  const nome     = document.getElementById('wa-nome')?.value  || '';
  const email    = document.getElementById('wa-email')?.value || '';
  const tel      = document.getElementById('wa-tel')?.value   || '';
  const checkin  = (document.getElementById('wa-in')  || document.getElementById('wa-checkin'))?.value  || '';
  const checkout = (document.getElementById('wa-out') || document.getElementById('wa-checkout'))?.value || '';

  // GTM
  pushLead('whatsapp_modal');

  await sendToWebhook({ tipo: 'whatsapp_lead', nome, email, telefone: tel, checkin, checkout });
  const msg = encodeURIComponent(`Olá, Pousada MontVerde! 🌿\nMeu nome é ${nome}.\nCheck-in: ${checkin}\nCheck-out: ${checkout}\nGostaria de informações sobre hospedagem.`);
  window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');
  closeWAModal();
}

// ── POPUP DESCONTO (uma vez por sessão) ──
const popup = document.getElementById('discountPopup');
if (popup && !sessionStorage.getItem('mv_popup')) {
  setTimeout(() => { popup.classList.add('open'); }, 5000);
}
function closePopup() { popup?.classList.remove('open'); sessionStorage.setItem('mv_popup','1'); }

async function submitPopup(e) {
  e.preventDefault();
  const email = document.getElementById('popup-email')?.value || '';

  // GTM
  pushLead('popup_desconto');

  await sendToWebhook({ tipo: 'lead_popup', email });
  closePopup();
}
popup?.addEventListener('click', e => { if (e.target === popup) closePopup(); });

// ── COOKIE BANNER ──
const ckBanner = document.getElementById('cookieBanner');
if (ckBanner && !localStorage.getItem('ck_status')) ckBanner.classList.add('show');
function acceptCookies()  { localStorage.setItem('ck_status','accepted'); if(ckBanner) ckBanner.classList.remove('show'); }
function declineCookies() { localStorage.setItem('ck_status','declined'); if(ckBanner) ckBanner.classList.remove('show'); }

// ── FILTRO QUARTOS ──
function filterRooms(type, btn) {
  document.querySelectorAll('.fbtn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('#roomsGrid .rc').forEach(rc => {
    rc.style.display = (type==='all' || rc.dataset.type===type) ? '' : 'none';
  });
}

// ── LIGHTBOX ──
let lbCur = 0; const LB_SRCS = [];
function openLB(i) {
  lbCur=i; const lbImg=document.getElementById('lbImg'); const lbCnt=document.getElementById('lbCnt');
  if(!lbImg) return;
  lbImg.src=LB_SRCS[i]||''; if(lbCnt) lbCnt.textContent=(i+1)+' / '+LB_SRCS.length;
  document.getElementById('lb')?.classList.add('open'); document.body.style.overflow='hidden';
}
function closeLB() { document.getElementById('lb')?.classList.remove('open'); document.body.style.overflow=''; }
function navLB(d) {
  lbCur=(lbCur+d+LB_SRCS.length)%LB_SRCS.length;
  document.getElementById('lbImg').src=LB_SRCS[lbCur]||'';
  document.getElementById('lbCnt').textContent=(lbCur+1)+' / '+LB_SRCS.length;
}
document.getElementById('lb')?.addEventListener('click', e => { if(e.target===document.getElementById('lb')) closeLB(); });
document.addEventListener('keydown', e => {
  if(!document.getElementById('lb')?.classList.contains('open')) return;
  if(e.key==='Escape') closeLB(); if(e.key==='ArrowLeft') navLB(-1); if(e.key==='ArrowRight') navLB(1);
});

// ── FORMULÁRIO CONTATO ──
async function submitContact(e) {
  e.preventDefault();
  const form = e.target;
  const data = Object.fromEntries(new FormData(form));

  // GTM
  pushLead('formulario_contato');

  await sendToWebhook({ tipo: 'contato', ...data });
  form.reset();
  document.getElementById('contactOk')?.classList.add('show');
}

// ── TÍTULO DA ABA ao sair da página ──
const tituloOriginal = document.title;
document.addEventListener('visibilitychange', () => {
  document.title = document.hidden
    ? '👋 Volte Aqui — Estamos te esperando!'
    : tituloOriginal;
});
