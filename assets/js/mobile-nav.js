document.addEventListener('DOMContentLoaded', () => {
  const mobileNav = document.querySelector('.mobile-nav');
  if (!mobileNav) return;

  const toggleButton = mobileNav.querySelector('.mobile-nav__toggle');
  const closeButton = mobileNav.querySelector('.mobile-nav__close');
  const overlay = mobileNav.querySelector('.mobile-nav__overlay');
  const panel = mobileNav.querySelector('.mobile-nav__panel');
  const focusableSelector = [
    'a[href]',
    'button:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(',');

  if (!toggleButton || !closeButton || !overlay || !panel) return;

  const html = document.documentElement;
  html.classList.add('mobile-nav-ready');
  let previouslyFocused = null;

  const setScrollLock = (isLocked) => {
    html.classList.toggle('mobile-nav-lock', isLocked);
  };

  const focusFirstItem = () => {
    const focusableItems = panel.querySelectorAll(focusableSelector);
    if (focusableItems.length > 0) {
      focusableItems[0].focus();
    }
  };

  const returnFocus = () => {
    if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
      previouslyFocused.focus();
    } else {
      toggleButton.focus();
    }
  };

  const openNav = () => {
    if (mobileNav.classList.contains('is-open')) return;
    previouslyFocused = document.activeElement;
    mobileNav.classList.add('is-open');
    toggleButton.setAttribute('aria-expanded', 'true');
    overlay.hidden = false;
    panel.hidden = false;
    panel.setAttribute('aria-hidden', 'false');
    setScrollLock(true);
    window.requestAnimationFrame(() => {
      focusFirstItem();
    });
  };

  const closeNav = () => {
    if (!mobileNav.classList.contains('is-open')) return;
    mobileNav.classList.remove('is-open');
    toggleButton.setAttribute('aria-expanded', 'false');
    overlay.hidden = true;
    panel.hidden = true;
    panel.setAttribute('aria-hidden', 'true');
    setScrollLock(false);
    returnFocus();
  };

  const toggleNav = () => {
    if (mobileNav.classList.contains('is-open')) {
      closeNav();
    } else {
      openNav();
    }
  };

  toggleButton.addEventListener('click', toggleNav);
  closeButton.addEventListener('click', closeNav);
  overlay.addEventListener('click', closeNav);

  document.addEventListener('keydown', (event) => {
    if (!mobileNav.classList.contains('is-open')) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      closeNav();
      return;
    }

    if (event.key === 'Tab') {
      const focusableItems = Array.from(panel.querySelectorAll(focusableSelector));
      if (focusableItems.length === 0) return;

      const first = focusableItems[0];
      const last = focusableItems[focusableItems.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  const mediaQuery = window.matchMedia('(min-width: 48em)');
  const handleCloseOnWiden = (event) => {
    if (event.matches && mobileNav.classList.contains('is-open')) {
      closeNav();
    }
  };

  if (typeof mediaQuery.addEventListener === 'function') {
    mediaQuery.addEventListener('change', handleCloseOnWiden);
  } else if (typeof mediaQuery.addListener === 'function') {
    mediaQuery.addListener(handleCloseOnWiden);
  }
});
