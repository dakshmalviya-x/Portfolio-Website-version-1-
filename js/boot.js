// ============================================
// Homepage boot-sequence hero animation
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  const boot = document.getElementById('boot-sequence');
  if (!boot) return;

  const heroReveal = document.getElementById('hero-reveal');
  const lines = [
    { cmd: 'whoami', out: 'daksh_malviya' },
    { cmd: 'cat role.txt', out: 'Full-Stack Developer · AI Enthusiast' },
    { cmd: 'status --check', out: 'building things at JUET Guna…' },
  ];

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    boot.style.display = 'none';
    if (heroReveal) heroReveal.classList.add('in');
    return;
  }

  let lineIndex = 0;
  let charIndex = 0;
  const typeSpeed = 28;
  const lineDelay = 380;

  function typeNextChar() {
    if (lineIndex >= lines.length) {
      setTimeout(() => {
        boot.classList.add('fade-out');
        if (heroReveal) {
          heroReveal.classList.add('in');
        }
        setTimeout(() => { boot.style.display = 'none'; }, 500);
      }, 400);
      return;
    }

    const currentLineEl = boot.querySelector(`[data-line="${lineIndex}"] .cmd-text`);
    const fullCmd = lines[lineIndex].cmd;

    if (charIndex <= fullCmd.length) {
      if (currentLineEl) currentLineEl.textContent = fullCmd.slice(0, charIndex);
      charIndex++;
      setTimeout(typeNextChar, typeSpeed);
    } else {
      const outEl = boot.querySelector(`[data-line="${lineIndex}"] .out-text`);
      if (outEl) outEl.style.opacity = '1';
      lineIndex++;
      charIndex = 0;
      setTimeout(typeNextChar, lineDelay);
    }
  }

  setTimeout(typeNextChar, 350);
});
