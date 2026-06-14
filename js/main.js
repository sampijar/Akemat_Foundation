// =========================================================
// Akemat Foundation — main.js
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('primary-nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.getAttribute('data-state') === 'open';
      nav.setAttribute('data-state', isOpen ? 'closed' : 'open');
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      navToggle.classList.toggle('is-open', !isOpen);
    });

    // Close menu after tapping a link (mobile)
    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.setAttribute('data-state', 'closed');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.classList.remove('is-open');
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback: show everything immediately
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Donation tiers ---------- */
  const tierCards = document.querySelectorAll('.tier-card');
  const donateDesc = document.getElementById('donateDesc');
  const customAmountInput = document.getElementById('customAmount');
  const customAmountBtn = document.getElementById('customAmountBtn');

  function selectTier(card) {
    tierCards.forEach((c) => c.classList.remove('is-active'));
    card.classList.add('is-active');
    if (donateDesc) donateDesc.textContent = card.dataset.desc;
  }

  tierCards.forEach((card) => {
    card.addEventListener('click', () => selectTier(card));
  });

  if (customAmountBtn && customAmountInput) {
    customAmountBtn.addEventListener('click', () => {
      const value = Number(customAmountInput.value);
      if (!value || value <= 0) {
        customAmountInput.focus();
        return;
      }
      tierCards.forEach((c) => c.classList.remove('is-active'));
      const formatted = value.toLocaleString('id-ID');
      if (donateDesc) {
        donateDesc.textContent = `Terima kasih! Donasi sebesar Rp ${formatted} sangat berarti bagi keluarga yang kami layani. Silakan transfer ke rekening di bawah ini.`;
      }
    });
  }

  /* ---------- Copy bank account number ---------- */
  const copyBankBtn = document.getElementById('copyBankBtn');
  if (copyBankBtn) {
    copyBankBtn.addEventListener('click', async () => {
      const accountNumber = copyBankBtn.dataset.account || '';
      const originalLabel = copyBankBtn.textContent;

      try {
        await navigator.clipboard.writeText(accountNumber);
        copyBankBtn.textContent = 'Nomor disalin!';
      } catch (err) {
        copyBankBtn.textContent = 'Gagal menyalin, salin manual';
      }

      setTimeout(() => {
        copyBankBtn.textContent = originalLabel;
      }, 2200);
    });
  }

  /* ---------- Forms (demo only — no backend) ---------- */
  // NOTE: Ini situs statis. Untuk menerima data formulir secara nyata,
  // hubungkan elemen <form> ke layanan seperti Formspree, Getform,
  // atau Google Apps Script, lalu sesuaikan kode di bawah ini.

  function handleDemoSubmit(formId, statusId, successMessage) {
    const form = document.getElementById(formId);
    const status = document.getElementById(statusId);
    if (!form || !status) return;

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      status.textContent = successMessage;
      form.reset();
    });
  }

  handleDemoSubmit(
    'requestForm',
    'requestStatus',
    'Terima kasih! Permintaan Anda sudah kami terima. Tim Akemat akan menghubungi Anda via WhatsApp dalam 1–2 hari kerja.'
  );

  handleDemoSubmit(
    'contactForm',
    'contactStatus',
    'Terima kasih sudah menghubungi kami. Pesan Anda sudah terkirim dan akan kami balas secepatnya.'
  );

});
