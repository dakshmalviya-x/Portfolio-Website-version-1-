// ============================================
// Shared site behavior
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => links.classList.remove('open'));
    });
  }

  // mark active nav link
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
    if (a.dataset.page === path) a.classList.add('active');
  });

  // scroll reveal (progressive enhancement — content is visible by default via CSS)
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    document.documentElement.classList.add('js-reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
    // safety net: reveal everything after 4s in case observer misses something
    // (e.g. element already in view at load but observer fires late)
    setTimeout(() => revealEls.forEach(el => el.classList.add('in')), 4000);
  }

  // contact form (static — no backend, mailto fallback)
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = encodeURIComponent(form.name.value);
      const email = encodeURIComponent(form.email.value);
      const message = encodeURIComponent(form.message.value);
      const subject = encodeURIComponent(`Portfolio contact from ${form.name.value}`);
      const body = encodeURIComponent(`Name: ${form.name.value}\nEmail: ${form.email.value}\n\n${form.message.value}`);
      window.location.href = `mailto:hustlingkiddo@gmail.com?subject=${subject}&body=${body}`;
      const status = document.getElementById('form-status');
      if (status) status.textContent = 'Opening your email client…';
    });
  }
});
