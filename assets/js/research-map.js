document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-research-map]').forEach((map) => {
    const stage = map.querySelector('.research-atlas__stage');
    const regions = [...map.querySelectorAll('[data-research-region]')];
    const popover = map.querySelector('[data-research-popover]');
    if (!stage || !popover) return;

    const title = popover.querySelector('.research-popover__title');
    const venue = popover.querySelector('.research-popover__venue');
    const meta = popover.querySelector('.research-popover__meta');
    const link = popover.querySelector('.research-popover__link');
    const close = popover.querySelector('.research-popover__close');
    let activeDot = null;

    const setRegion = (region) => {
      regions.forEach((item) => item.classList.toggle('is-active', item === region));
      if (region) stage.dataset.active = region.dataset.strand || 'active';
      else delete stage.dataset.active;
    };

    regions.forEach((region) => {
      region.addEventListener('pointerenter', () => setRegion(region));
      region.addEventListener('pointerleave', () => {
        if (!region.contains(document.activeElement)) setRegion(null);
      });
      region.addEventListener('focusin', () => setRegion(region));
      region.addEventListener('focusout', () => {
        window.setTimeout(() => {
          if (!region.contains(document.activeElement)) setRegion(null);
        }, 0);
      });
    });

    const hidePopover = (returnFocus = false) => {
      popover.hidden = true;
      if (returnFocus && activeDot) activeDot.focus();
      activeDot = null;
    };

    const positionPopover = (dot) => {
      const rect = dot.getBoundingClientRect();
      const width = Math.min(290, window.innerWidth - 28);
      const left = Math.min(Math.max(rect.left + rect.width / 2 - width / 2, 14), window.innerWidth - width - 14);
      const estimatedHeight = 190;
      let top = rect.bottom + 12;
      if (top + estimatedHeight > window.innerHeight - 12) top = Math.max(12, rect.top - estimatedHeight - 12);
      popover.style.left = `${left}px`;
      popover.style.top = `${top}px`;
    };

    map.querySelectorAll('.research-dot').forEach((dot) => {
      dot.addEventListener('click', (event) => {
        event.stopPropagation();
        activeDot = dot;
        title.textContent = dot.dataset.workTitle || '';
        venue.textContent = dot.dataset.workVenue || '';
        meta.innerHTML = `<span>${dot.dataset.workYear || ''}</span><span>${dot.dataset.workStatus || ''}</span>`;
        if (dot.dataset.workUrl) {
          link.hidden = false;
          link.href = dot.dataset.workUrl;
        } else {
          link.hidden = true;
        }
        popover.hidden = false;
        positionPopover(dot);
      });
    });

    close.addEventListener('click', () => hidePopover(true));
    document.addEventListener('click', (event) => {
      if (!popover.hidden && !popover.contains(event.target) && !event.target.closest('.research-dot')) hidePopover(false);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !popover.hidden) hidePopover(true);
    });
    window.addEventListener('resize', () => {
      if (!popover.hidden && activeDot) positionPopover(activeDot);
    });
  });
});
