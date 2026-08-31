document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('.page__content img, .news-item__img, .bcv__item img');

  const openLightbox = (img, event) => {
    event.preventDefault();
    event.stopPropagation();

    const overlay = document.createElement('div');
    overlay.className = 'img-lightbox-overlay';

    const figure = document.createElement('figure');
    figure.className = 'img-lightbox-figure';

    const enlarged = img.cloneNode(true);
    enlarged.removeAttribute('width');
    enlarged.removeAttribute('height');
    enlarged.className = 'img-lightbox-img';

    figure.appendChild(enlarged);

    if (img.alt) {
      const caption = document.createElement('figcaption');
      caption.className = 'img-lightbox-caption';
      caption.textContent = img.alt;
      figure.appendChild(caption);
    }

    overlay.appendChild(figure);
    document.body.appendChild(overlay);

    const removeOverlay = () => {
      overlay.classList.add('closing');
      setTimeout(() => overlay.remove(), 150);
    };

    overlay.addEventListener('click', removeOverlay);
    document.addEventListener(
      'keydown',
      (evt) => {
        if (evt.key === 'Escape') {
          removeOverlay();
        }
      },
      { once: true }
    );
  };

  images.forEach((img) => {
    if (img.dataset.lightboxBound === 'true') return;
    if (img.dataset.noLightbox === 'true') return;
    if (img.closest('.bl-pcard')) return;
    if (img.closest('.bl-lightbox')) return;
    if (img.closest('.site-logo')) return;
    if (img.closest('.author__avatar')) return;
    if (img.classList.contains('news-section__yay')) return;

    img.dataset.lightboxBound = 'true';
    img.classList.add('img-lightbox-target');

    img.addEventListener('click', (event) => {
      openLightbox(img, event);
    });
  });

  document.querySelectorAll('.bcv__item').forEach((item) => {
    if (item.dataset.lightboxBound === 'true') return;
    const img = item.querySelector('img');
    if (!img || img.dataset.noLightbox === 'true') return;
    item.dataset.lightboxBound = 'true';
    item.classList.add('img-lightbox-target');
    item.addEventListener('click', (event) => {
      const viewport = item.closest('[data-bcv-viewport]');
      if (viewport && viewport.dataset.dragMoved === 'true') return;
      openLightbox(img, event);
    });
  });
});
