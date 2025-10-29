// app.js (hardened)

(function () {
  function onReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  function openBackdrop(backdrop) {
    if (!backdrop) return;
    backdrop.setAttribute("aria-hidden", "false");
    backdrop.classList.add("is-open"); // CSS safety toggle
    document.documentElement.style.overflow = "hidden";
    const first = backdrop.querySelector("button, [href], input, select, textarea");
    if (first) first.focus();
  }

  function closeBackdrop(backdrop) {
    if (!backdrop) return;
    backdrop.setAttribute("aria-hidden", "true");
    backdrop.classList.remove("is-open");
    document.documentElement.style.overflow = "";
  }

  onReady(function () {
    try {
      // ====== AUDIT MODAL ======
      const auditBackdrop = document.getElementById("auditModalBackdrop");
      const openAuditBtns = document.querySelectorAll("[data-open-audit]");
      const closeAuditBtns = document.querySelectorAll("[data-close-audit]");
      const auditForm = document.getElementById("auditForm");
      const auditSuccess = document.getElementById("auditSuccess");

      openAuditBtns.forEach((btn) =>
        btn.addEventListener("click", () => openBackdrop(auditBackdrop))
      );

      closeAuditBtns.forEach((btn) =>
        btn.addEventListener("click", () => {
          if (auditSuccess) auditSuccess.style.display = "none";
          if (auditForm) auditForm.style.display = "";
          closeBackdrop(auditBackdrop);
        })
      );

      if (auditBackdrop) {
        auditBackdrop.addEventListener("click", (e) => {
          if (e.target === auditBackdrop) closeBackdrop(auditBackdrop);
        });
      }

      if (auditForm) {
        auditForm.addEventListener("submit", function (e) {
          e.preventDefault();
          if (auditForm) auditForm.style.display = "none";
          if (auditSuccess) auditSuccess.style.display = "";
          auditForm.reset();
        });
      }

      // ====== GROWTH FORM + THANKS POPUP ======
      const growthForm = document.getElementById("growthForm");
      const thanksBackdrop = document.getElementById("thanksModalBackdrop");
      const closeThanksBtns = document.querySelectorAll("[data-close-thanks]");
      const hint = document.getElementById("growthHint");

      if (growthForm) {
        growthForm.addEventListener("submit", function (e) {
          e.preventDefault();
          const name = document.getElementById("name");
          const email = document.getElementById("email");

          if (!name?.value.trim() || !email?.value.trim()) {
            if (hint) {
              hint.hidden = false;
              hint.textContent = "Please enter your name and a valid email.";
            }
            return;
          }

          // TODO: wire to Formspree/Netlify here if desired.

          if (hint) { hint.hidden = true; hint.textContent = ""; }
          growthForm.reset();
          openBackdrop(thanksBackdrop);
        });
      }

      closeThanksBtns.forEach((btn) =>
        btn.addEventListener("click", () => closeBackdrop(thanksBackdrop))
      );

      if (thanksBackdrop) {
        thanksBackdrop.addEventListener("click", (e) => {
          if (e.target === thanksBackdrop) closeBackdrop(thanksBackdrop);
        });
      }

      console.log("Stampede app.js loaded OK");
    } catch (err) {
      console.error("Stampede app.js error:", err);
    }
  });
})();    }

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
