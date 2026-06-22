// ============================================
// NOVA STORM — Site Scripts
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Footer year ----
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Mobile nav toggle ----
  const navToggle = document.getElementById('navToggle');
  const navList = document.getElementById('nav-list');

  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      const isOpen = navList.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu after clicking a link (mobile)
    navList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- Newsletter / ARC signup ----
  // Handled entirely by Kit's embedded form widgets (see the <script>
  // tags in the #newsletter section of index.html). No custom JS needed —
  // Kit manages validation, submission, tagging, and the confirmation
  // email on their end.
  const form = document.getElementById('signupForm');
  const formNote = document.getElementById('formNote');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = form.email.value.trim();
      const wantsArc = form.arc.checked;

      if (!email || !email.includes('@')) {
        formNote.textContent = 'Please enter a valid email address.';
        return;
      }

      const submitBtn = form.querySelector('.signup-submit');
      submitBtn.textContent = 'Signing up…';
      submitBtn.disabled = true;

      try {
        // ---- PLACEHOLDER: wire up to Kit (ConvertKit) here ----
        // Example once you have a Kit form:
        //
        // await fetch('https://api.kit.com/v4/forms/YOUR_FORM_ID/subscribers', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //     email_address: email,
        //     tags: wantsArc ? ['arc-reader'] : []
        //   })
        // });

        await new Promise(resolve => setTimeout(resolve, 600)); // placeholder delay

        form.reset();
        submitBtn.textContent = 'Sign me up';
        submitBtn.disabled = false;
        formNote.textContent = wantsArc
          ? "You're in! Check your inbox to confirm — ARC details to follow closer to release."
          : "You're in! Check your inbox to confirm.";
      } catch (err) {
        submitBtn.textContent = 'Sign me up';
        submitBtn.disabled = false;
        formNote.textContent = 'Something went wrong. Please try again in a moment.';
      }
    });
  }

});
