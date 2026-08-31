if (!window.__siteInteractionsInitialized) {
  window.__siteInteractionsInitialized = true;

  document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  initReveal(prefersReducedMotion);
  initPageNav(prefersReducedMotion);
  window.setTimeout(initRouteHighlights, 160);
  window.addEventListener('load', initRouteHighlights, { once: true });
  window.addEventListener('hashchange', initRouteHighlights);
  initNewsFilters();
  initPublicationsSpotlight();
  initBeyondCvGallery(prefersReducedMotion);
  if (!window.SCHOLAR_TEMPLATE || window.SCHOLAR_TEMPLATE.customCursor !== false) {
    initCursor(prefersReducedMotion);
  }
  initTypewriters(prefersReducedMotion);
  });
}

function animateNumericScroll(store, key, from, to, duration, apply) {
  if (store[key]) {
    window.clearTimeout(store[key]);
  }

  const start = window.performance.now();
  const distance = to - from;

  if (Math.abs(distance) < 1) {
    apply(to);
    delete store[key];
    return;
  }

  const step = () => {
    const elapsed = window.performance.now() - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);

    apply(from + distance * eased);

    if (progress < 1) {
      store[key] = window.setTimeout(step, 16);
      return;
    }

    apply(to);
    delete store[key];
  };

  store[key] = window.setTimeout(step, 16);
}

function smoothScrollWindowTo(top, prefersReducedMotion) {
  const maxTop = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
  const targetTop = Math.min(Math.max(top, 0), maxTop);

  if (prefersReducedMotion) {
    window.scrollTo({ top: targetTop, behavior: 'auto' });
    return;
  }

  animateNumericScroll(
    document.documentElement,
    '__pageScrollAnimation',
    window.scrollY,
    targetTop,
    520,
    (value) => window.scrollTo({ top: value, behavior: 'auto' })
  );
}

function smoothScrollElementTo(element, left, prefersReducedMotion) {
  const maxLeft = Math.max(element.scrollWidth - element.clientWidth, 0);
  const targetLeft = Math.min(Math.max(left, 0), maxLeft);

  if (prefersReducedMotion) {
    element.scrollLeft = targetLeft;
    return;
  }

  animateNumericScroll(
    element,
    '__elementScrollAnimation',
    element.scrollLeft,
    targetLeft,
    420,
    (value) => {
      element.scrollLeft = value;
    }
  );
}

function initReveal(prefersReducedMotion) {
  const groups = document.querySelectorAll('[data-reveal-group]');

  groups.forEach((group) => {
    const step = Number(group.getAttribute('data-reveal-step') || 70);
    [...group.querySelectorAll('[data-reveal]')].forEach((item, index) => {
      if (!item.style.getPropertyValue('--reveal-delay')) {
        item.style.setProperty('--reveal-delay', `${index * step}ms`);
      }
    });
  });

  const items = [...document.querySelectorAll('[data-reveal]')];
  if (!items.length) return;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  // Immediately reveal items already in the initial viewport (prevents flash on page load)
  const vh = window.innerHeight;
  items.forEach((item) => {
    const rect = item.getBoundingClientRect();
    if (rect.top < vh && rect.bottom > 0) {
      item.style.setProperty('--reveal-delay', '0ms');
      item.classList.add('is-visible');
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: '0px 0px -12% 0px',
      threshold: 0.12,
    }
  );

  items.forEach((item) => {
    if (!item.classList.contains('is-visible')) observer.observe(item);
  });
}

function initTypewriters(prefersReducedMotion) {
  const items = [...document.querySelectorAll('.js-typewriter')];
  if (!items.length) return;

  items.forEach((item) => {
    const fullText = item.dataset.text || item.textContent.trim();
    if (!fullText) return;

    if (prefersReducedMotion) {
      item.textContent = fullText;
      item.classList.add('js-typewriter--done');
      return;
    }

    item.textContent = '';
    item.classList.add('js-typewriter--typing');

    let index = 0;
    const baseDelay = Number(item.dataset.typewriterDelay || 160);

    const typeNext = () => {
      index += 1;
      item.textContent = fullText.slice(0, index);

      if (index < fullText.length) {
        const nextDelay = fullText[index - 1] === ' ' ? 22 : 36;
        window.setTimeout(typeNext, nextDelay);
        return;
      }

      window.setTimeout(() => {
        item.classList.remove('js-typewriter--typing');
        item.classList.add('js-typewriter--done');
      }, 420);
    };

    window.setTimeout(typeNext, baseDelay);
  });
}

function initPageNav(prefersReducedMotion) {
  const navs = document.querySelectorAll('[data-page-nav]');
  if (!navs.length) return;

  navs.forEach((nav) => {
    const wrapper = nav.closest('.page-with-rail-nav');
    const items = [...nav.querySelectorAll('.page-section-nav__link')]
      .map((link) => {
        const hash = link.getAttribute('href');
        if (!hash || !hash.startsWith('#')) return null;
        const target = document.querySelector(hash);
        if (!target) return null;
        return { link, target };
      })
      .filter(Boolean);

    if (!items.length) return;

    let activeId = '';

    const setActive = (activeItem) => {
      const nextId = activeItem ? activeItem.target.id : '';
      if (activeId === nextId) return;

      activeId = nextId;
      items.forEach(({ link }) => link.classList.remove('is-active'));
      if (!activeItem) return;
      activeItem.link.classList.add('is-active');
      activeItem.link.scrollIntoView({
        behavior: 'auto',
        block: 'nearest',
        inline: 'center',
      });
    };

    const getScrollTop = (target) => {
      const offset = window.innerWidth < 769 ? 98 : 116;
      return window.scrollY + target.getBoundingClientRect().top - offset;
    };

    items.forEach(({ link, target }) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();

        smoothScrollWindowTo(getScrollTop(target), prefersReducedMotion);

        if (target.id) {
          window.history.replaceState(null, '', `#${target.id}`);
        }

        flashTarget(target);
        setActive({ link, target });
      });
    });

    let updateTimer = null;
    const getRevealThreshold = () => {
      const anchor = wrapper || items[0].target;
      const anchorTop = window.scrollY + anchor.getBoundingClientRect().top;
      return anchorTop + (window.innerWidth >= 1152 ? 120 : 72);
    };

    const updateVisibility = () => {
      const shouldShow = Boolean(window.location.hash) || window.scrollY > getRevealThreshold();
      nav.classList.toggle('is-nav-visible', shouldShow);
    };

    const updateActive = () => {
      const offset = window.innerWidth < 769 ? 108 : 132;
      let active = items[0];

      items.forEach((item) => {
        if (item.target.getBoundingClientRect().top - offset <= 0) {
          active = item;
        }
      });

      setActive(active);
    };

    const updateState = () => {
      updateVisibility();
      updateActive();
    };

    const requestUpdate = () => {
      if (updateTimer) return;
      updateTimer = window.setTimeout(() => {
        updateTimer = null;
        updateState();
      }, 16);
    };

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    updateState();
  });
}

function initRouteHighlights() {
  if (!window.location.hash) return;

  const target = document.querySelector(window.location.hash);
  if (!target) return;

  window.setTimeout(() => flashTarget(target), 180);
}

function flashTarget(target) {
  if (!target || !target.classList.contains('supports-target-highlight')) return;

  target.classList.remove('section-targeted');
  void target.offsetWidth;
  target.classList.add('section-targeted');

  if (target.__flashTimer) {
    window.clearTimeout(target.__flashTimer);
  }

  target.__flashTimer = window.setTimeout(() => {
    target.classList.remove('section-targeted');
  }, 1800);
}

function initNewsFilters() {
  const root = document.querySelector('[data-news-filters]');
  if (!root) return;

  const items = [...document.querySelectorAll('.news-item')];
  if (!items.length) return;

  const typeGroup = root.querySelector('[data-news-type-group]');
  const yearGroup = root.querySelector('[data-news-year-group]');
  const countEl = document.querySelector('[data-news-count]');
  const toggleBtn = document.querySelector('[data-news-toggle]');
  const moreWrap = document.querySelector('[data-news-more]');
  if (!typeGroup || !yearGroup) return;

  const typeLabels = {
    all: 'All',
    paper: 'Papers',
    talk: 'Talks',
    award: 'Awards',
    grant: 'Grants',
    media: 'Media',
    event: 'Events',
  };

  const preferredTypeOrder = ['paper', 'talk', 'award', 'grant', 'media', 'event'];
  const uniqueTypes = [...new Set(items.map((item) => item.dataset.newsType).filter(Boolean))].sort((a, b) => {
    const aIndex = preferredTypeOrder.indexOf(a);
    const bIndex = preferredTypeOrder.indexOf(b);
    return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
  });
  const uniqueYears = [...new Set(items.map((item) => item.dataset.newsYear).filter(Boolean))].sort((a, b) => Number(b) - Number(a));

  const previewCount = 8;
  const state = { type: 'all', year: 'all', expanded: false };

  const buildButtons = (group, kind, values) => {
    values.forEach((value) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'news-filter';
      button.dataset.filterKind = kind;
      button.dataset.filterValue = value;
      if (kind === 'type') {
        button.textContent = typeLabels[value] || value;
      } else {
        button.textContent = value === 'all' ? 'All years' : value;
      }
      if (value === 'all') button.classList.add('is-active');

      button.addEventListener('click', () => {
        state[kind] = value;
        state.expanded = false;
        render();
      });

      group.appendChild(button);
    });
  };

  buildButtons(typeGroup, 'type', ['all', ...uniqueTypes]);
  buildButtons(yearGroup, 'year', ['all', ...uniqueYears]);

  const render = () => {
    let matchIndex = 0;
    let matchCount = 0;

    items.forEach((item) => {
      const matchesType = state.type === 'all' || item.dataset.newsType === state.type;
      const matchesYear = state.year === 'all' || item.dataset.newsYear === state.year;
      const matches = matchesType && matchesYear;
      const visible = matches && (state.expanded || matchIndex < previewCount);

      if (matches) {
        matchCount += 1;
        matchIndex += 1;
      }
      item.hidden = !visible;
      item.classList.toggle('is-hidden', !visible);
    });

    root.querySelectorAll('.news-filter').forEach((button) => {
      const kind = button.dataset.filterKind;
      button.classList.toggle('is-active', state[kind] === button.dataset.filterValue);
    });

    if (moreWrap) {
      moreWrap.hidden = matchCount <= previewCount;
    }
    if (countEl) {
      const shown = state.expanded ? matchCount : Math.min(matchCount, previewCount);
      countEl.textContent = matchCount > previewCount
        ? `Showing ${shown} of ${matchCount}`
        : '';
    }
    if (toggleBtn) {
      toggleBtn.hidden = matchCount <= previewCount;
      toggleBtn.textContent = state.expanded ? 'Show less' : 'View more';
    }
  };

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      state.expanded = !state.expanded;
      render();
    });
  }

  render();
}

function initPublicationsSpotlight() {
  const sections = document.querySelectorAll('.pub-section');
  if (!sections.length) return;

  sections.forEach((section) => {
    const items = [...section.querySelectorAll('.bl-pcard, .pub-entry')];
    if (items.length < 2) return;

    const clear = () => {
      section.classList.remove('is-spotlight');
      items.forEach((item) => item.classList.remove('is-active'));
    };

    items.forEach((item) => {
      item.classList.add('pub-focus-item');

      item.addEventListener('pointerenter', () => {
        section.classList.add('is-spotlight');
        items.forEach((entry) => entry.classList.remove('is-active'));
        item.classList.add('is-active');
      });

      item.addEventListener('focusin', () => {
        section.classList.add('is-spotlight');
        items.forEach((entry) => entry.classList.remove('is-active'));
        item.classList.add('is-active');
      });
    });

    section.addEventListener('pointerleave', clear);
    section.addEventListener('focusout', () => {
      window.setTimeout(() => {
        if (!section.contains(document.activeElement)) clear();
      }, 0);
    });
  });
}

function initCursor(prefersReducedMotion) {
  if (prefersReducedMotion) return;
  if (window.matchMedia('(hover: none)').matches) return;

  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);
  document.body.classList.add('has-custom-cursor');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  dot.style.left = mouseX + 'px';
  dot.style.top  = mouseY + 'px';
  ring.style.left = ringX + 'px';
  ring.style.top  = ringY + 'px';

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity  = '1';
    ring.style.opacity = '1';
  });

  document.addEventListener('mouseover', (e) => {
    const hoverable = e.target.closest(
      'a, button, [role="button"], label, input, select, textarea, ' +
      '.paper-tag, .rv-hit, .news-filter, .bcv__btn, [tabindex="0"]'
    );
    ring.classList.toggle('is-hovering', Boolean(hoverable));
  });

  (function animateCursor() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateCursor);
  })();
}

function initBeyondCvGallery(prefersReducedMotion) {
  const galleries = document.querySelectorAll('[data-bcv]');
  if (!galleries.length) return;

  galleries.forEach((gallery) => {
    const viewport = gallery.querySelector('[data-bcv-viewport]');
    const prev = gallery.querySelector('[data-bcv-prev]');
    const next = gallery.querySelector('[data-bcv-next]');
    if (!viewport) return;

    const scrollAmount = () => Math.max(viewport.clientWidth * 0.82, 280);
    const updateControls = () => {
      const maxLeft = Math.max(viewport.scrollWidth - viewport.clientWidth, 0);
      const left = viewport.scrollLeft;
      const atStart = left <= 8;
      const atEnd = left >= maxLeft - 8;

      if (prev) prev.disabled = atStart;
      if (next) next.disabled = atEnd;
    };

    const scrollViewport = (direction) => {
      smoothScrollElementTo(viewport, viewport.scrollLeft + direction * scrollAmount(), prefersReducedMotion);
      window.setTimeout(updateControls, prefersReducedMotion ? 0 : 460);
    };

    prev && prev.addEventListener('click', () => scrollViewport(-1));
    next && next.addEventListener('click', () => scrollViewport(1));

    viewport.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollViewport(-1);
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        scrollViewport(1);
      }
    });

    let pointerId = null;
    let startX = 0;
    let startScrollLeft = 0;
    let moved = false;

    const endDrag = (event) => {
      if (pointerId === null || event.pointerId !== pointerId) return;

      if (viewport.hasPointerCapture(pointerId)) {
        viewport.releasePointerCapture(pointerId);
      }

      viewport.classList.remove('is-dragging');
      pointerId = null;

      if (moved) {
        viewport.dataset.dragMoved = 'true';
        window.setTimeout(() => {
          delete viewport.dataset.dragMoved;
        }, 50);
      }
    };

    viewport.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'touch') return;
      if (event.pointerType === 'mouse' && event.button !== 0) return;

      if (viewport.__elementScrollAnimation) {
        window.clearTimeout(viewport.__elementScrollAnimation);
        delete viewport.__elementScrollAnimation;
      }

      pointerId = event.pointerId;
      startX = event.clientX;
      startScrollLeft = viewport.scrollLeft;
      moved = false;

      viewport.classList.add('is-dragging');
      viewport.setPointerCapture(pointerId);
    });

    viewport.addEventListener('pointermove', (event) => {
      if (pointerId === null || event.pointerId !== pointerId) return;

      const delta = event.clientX - startX;
      if (Math.abs(delta) > 6) moved = true;

      viewport.scrollLeft = startScrollLeft - delta;
    });

    viewport.addEventListener('pointerup', endDrag);
    viewport.addEventListener('pointercancel', endDrag);
    viewport.addEventListener('scroll', updateControls, { passive: true });
    window.addEventListener('resize', updateControls);

    viewport.addEventListener(
      'click',
      (event) => {
        if (viewport.dataset.dragMoved !== 'true') return;
        event.preventDefault();
        event.stopPropagation();
      },
      true
    );

    updateControls();
  });
}
