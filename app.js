// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const id=a.getAttribute('href').slice(1);
    const el=document.getElementById(id);
    if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth',block:'start'});}
  }, {passive:true});
});

// ===== Modal (audit) =====
const backdrop = document.getElementById('auditModalBackdrop');
let lastOpener = null;

function trapFocus(e){
  if(backdrop.getAttribute('aria-hidden') === 'true') return;
  const focusables = backdrop.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if(!focusables.length) return;
  const first = focusables[0], last = focusables[focusables.length-1];
  if(e.key === 'Tab'){
    if(e.shiftKey && document.activeElement === first){ last.focus(); e.preventDefault(); }
    else if(!e.shiftKey && document.activeElement === last){ first.focus(); e.preventDefault(); }
  }
  if(e.key === 'Escape'){ closeModal(); }
}

function openModal(opener){
  if(!backdrop) return;
  lastOpener = opener || null;
  backdrop.setAttribute('aria-hidden','false');
  document.body.classList.add('modal-open');
  const firstInput = backdrop.querySelector('input, textarea, select, button');
  setTimeout(()=> firstInput?.focus(), 30);
  document.addEventListener('keydown', trapFocus);
}
function closeModal(){
  if(!backdrop) return;
  backdrop.setAttribute('aria-hidden','true');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', trapFocus);
  if(lastOpener) lastOpener.focus();
}

document.querySelectorAll('[data-open-audit]').forEach(b=>b.addEventListener('click', e=>openModal(e.currentTarget)));
document.querySelectorAll('[data-close-audit]').forEach(b=>b.addEventListener('click', closeModal));
backdrop?.addEventListener('click', e=>{ if(e.target===backdrop) closeModal(); });

// Modal success state
const auditForm = document.getElementById('auditForm');
const auditSuccess = document.getElementById('auditSuccess');
auditForm?.addEventListener('submit', e=>{
  e.preventDefault();
  if(!auditForm.checkValidity()){
    auditForm.reportValidity();
    return;
  }
  auditForm.style.display='none';
  auditSuccess.style.display='block';
});

// ===== Contact form lightweight hints =====
const growthForm = document.getElementById('growthForm');
const growthHint = document.getElementById('growthHint');
growthForm?.addEventListener('submit', e=>{
  e.preventDefault();
  if(!growthForm.checkValidity()){
    growthHint.hidden = false;
    growthHint.textContent = 'Please complete required fields and valid email.';
    growthForm.reportValidity();
    return;
  }
  growthHint.hidden = false;
  growthHint.textContent = 'Thanks! We will be in touch.';
  growthForm.reset();
});
