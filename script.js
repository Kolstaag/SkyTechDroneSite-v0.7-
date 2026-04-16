(function () {
  // Mobile nav
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('#site-nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close nav after click (mobile)
    nav.addEventListener('click', (e) => {
      const a = e.target && e.target.closest ? e.target.closest('a') : null;
      if (a) {
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Theme toggle
  // Requirements:
  // - Light is default
  // - Light overrides OS preference unless user explicitly toggles
  // - Smooth transitions
  const storageKey = 'theme';
  const root = document.documentElement;
  const themeToggle = document.querySelector('.theme-toggle');
  const themeIcon = document.querySelector('.theme-icon');
  const themeLabel = document.querySelector('.theme-label');

  function safeGet(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  }
  function safeSet(key, val) {
    try { localStorage.setItem(key, val); } catch {}
  }

  function setTheme(theme, persist) {
    // theme: 'light' | 'dark'
    if (theme === 'dark') {
      root.dataset.theme = 'dark';
      if (themeIcon) themeIcon.textContent = '🌙';
      if (themeLabel) themeLabel.textContent = 'Dark';
      if (themeToggle) themeToggle.setAttribute('aria-pressed', 'true');
    } else {
      // Default/light: remove dark override
      root.dataset.theme = 'light';
      if (themeIcon) themeIcon.textContent = '☀️';
      if (themeLabel) themeLabel.textContent = 'Light';
      if (themeToggle) themeToggle.setAttribute('aria-pressed', 'false');
    }

    if (persist) safeSet(storageKey, theme);
  }

  function withTransition(fn) {
    root.classList.add('theme-transition');
    // Ensure the class is applied before theme changes
    requestAnimationFrame(() => {
      fn();
      // Remove after the transition window
      window.setTimeout(() => root.classList.remove('theme-transition'), 300);
    });
  }

  // Initial theme: ALWAYS light unless user chose dark previously.
  const stored = safeGet(storageKey);
  if (stored === 'dark') setTheme('dark', false);
  else setTheme('light', false);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = root.dataset.theme === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      withTransition(() => setTheme(next, true));
    });
  }

  // Footer year
  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();

  // Contact form demo
  const form = document.querySelector('#contact-form') || document.querySelector('#contact-form-card');
  const success = document.querySelector('.form-success');
  if (form && success) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      success.hidden = false;
      setTimeout(() => (success.hidden = true), 6000);
      form.reset();
    });
  }
})();
