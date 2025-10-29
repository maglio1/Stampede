// ===== Modal helpers =====
function openBackdrop(backdrop) {
  if (!backdrop) return;
  backdrop.removeAttribute('aria-hidden');
  document.documentElement.style.overflow = 'hidden';
  // Focus the first focusable control inside modal
  const firstBtn = backdrop.querySelector('button, [href], input, select, textarea');
  if (firstBtn) firstBtn.focus();
}

function closeBackdrop(backdrop) {
  if (!backdrop) return;
  backdrop.setAttribute('aria-hidden', 'true');
  document.documentElement.style.overflow = '';
}

// ===== Audit Modal (opens from header buttons) =====
const auditBackdrop = document.getElementById('auditModalBackdrop');
const openAuditBtns = document.querySelectorAll('[data-open-audit]');
const closeAuditBtns = document.querySelectorAll('[data-close-audit]');

openAuditBtns.forEach(btn => btn.addEventListener('click', () => openBackdrop(auditBackdrop)));
closeAuditBtns.forEach(btn => btn.addEventListener('click', () => {
  // reset success state if shown
  const success = document.getElementById('auditSuccess');
  const form = document.getElementById('auditForm');
  if (success) success.style.display = 'none';
  if (form) form.style.display = '';
  closeBackdrop(auditBackdrop);
}));

// Close audit modal when clicking outside modal content
auditBackdrop?.addEventListener('click', (e) => {
  if (e.target === auditBackdrop) {
    closeBackdrop(auditBackdrop);
  }
});

// ===== Audit Form handling (shows success state inside modal) =====
const auditForm = document.getElementById('auditForm');
if (auditForm) {
  auditForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // TODO: integrate with your backend / Formspree / Netlify if desired.
    // For now, we just show success state.
    const success = document.getElementById('auditSuccess');
    auditForm.style.display = 'none';
    if (success) success.style.display = '';
    auditForm.reset();
  });
}

// ===== Growth Form handling (shows separate thank-you popup) =====
const growthForm = document.getElementById('growthForm');
const thanksBackdrop = document.getElementById('thanksModalBackdrop');
const closeThanksBtns = document.querySelectorAll('[data-close-thanks]');

if (growthForm) {
  growthForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic front-end validation
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    if (!name.value.trim() || !email.value.trim()) {
      const hint = document.getElementById('growthHint');
      if (hint) {
        hint.hidden = false;
        hint.textContent = 'Please enter your name and a valid email.';
      }
      return;
    }

    // TODO: integrate with Formspree/Netlify (uncomment and replace URL)
    // fetch('https://formspree.io/f/XXXXXXXX', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(Object.fromEntries(new FormData(growthForm)))
    // }).then(() => { ... });

    // Show thanks popup
    openBackdrop(thanksBackdrop);
    growthForm.reset();
    const hint = document.getElementById('growthHint');
    if (hint) { hint.hidden = true; hint.textContent = ''; }
  });
}

closeThanksBtns.forEach(btn => btn.addEventListener('click', () => closeBackdrop(thanksBackdrop)));

// Close thanks modal when clicking outside modal content
thanksBackdrop?.addEventListener('click', (e) => {
  if (e.target === thanksBackdrop) {
    closeBackdrop(thanksBackdrop);
  }
});    }

    // TODO: integrate with Formspree/Netlify (uncomment and replace URL)
    // fetch('https://formspree.io/f/XXXXXXXX', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(Object.fromEntries(new FormData(growthForm)))
    // }).then(() => { ... });

    // Show thanks popup
    openBackdrop(thanksBackdrop);
    growthForm.reset();
    const hint = document.getElementById('growthHint');
    if (hint) { hint.hidden = true; hint.textContent = ''; }
  });
}

closeThanksBtns.forEach(btn => btn.addEventListener('click', () => closeBackdrop(thanksBackdrop)));

// Close thanks modal when clicking outside modal content
thanksBackdrop?.addEventListener('click', (e) => {
  if (e.target === thanksBackdrop) {
    closeBackdrop(thanksBackdrop);
  }
});
