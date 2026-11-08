(() => {
 const modal = document.querySelector('#privacy');
 document.querySelectorAll('[data-privacy]').forEach(b => b.addEventListener('click', () => {if(modal && !modal.open) modal.showModal()}));
 document.querySelector('[data-close]')?.addEventListener('click', () => modal.close());
 document.querySelectorAll('[data-consent]').forEach(b => b.addEventListener('click', () => {window.setAnalyticsConsent?.(b.dataset.consent); modal.close();}));
 modal?.addEventListener?.('keydown', event => {
  if(event.key!=='Tab') return;
  const controls=[...modal.querySelectorAll('button, a[href], input, select, textarea, [tabindex="0"]')].filter(el=>!el.hidden&&!el.disabled&&el.getClientRects().length);
  const first=controls[0],last=controls.at(-1);
  if(first&&event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
  else if(last&&!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
 });
})();

// Keep all figures readable without JavaScript. Enhance only multi-image galleries.
(() => {
 document.querySelectorAll('[data-carousel]').forEach(carousel => {
   const slides = [...carousel.querySelectorAll('[data-carousel-slide]')];
   const controls = carousel.querySelector('.carousel-controls');
   const status = carousel.querySelector('[data-carousel-status]');
   if (slides.length < 2 || !controls || !status) return;
   let current = 0;
   const show = index => {
     current = (index + slides.length) % slides.length;
     slides.forEach((slide, i) => { slide.hidden = i !== current; });
     status.textContent = `Image ${current + 1} of ${slides.length}`;
   };
   slides.forEach((slide, i) => {
     slide.setAttribute('role', 'group');
     slide.setAttribute('aria-roledescription', 'slide');
     slide.setAttribute('aria-label', `${i + 1} of ${slides.length}`);
   });
   carousel.querySelector('[data-carousel-prev]').addEventListener('click', () => show(current - 1));
   carousel.querySelector('[data-carousel-next]').addEventListener('click', () => show(current + 1));
   carousel.addEventListener('keydown', event => {
     if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
     if (event.target.matches('input, textarea, select, [contenteditable]')) return;
     event.preventDefault();
     show(event.key === 'Home' ? 0 : event.key === 'End' ? slides.length - 1 : current + (event.key === 'ArrowRight' ? 1 : -1));
   });
   let start;
   const viewport = carousel.querySelector('.carousel-slides');
   viewport.addEventListener('touchstart', event => {
     start = event.touches.length === 1 ? {x: event.touches[0].clientX, y: event.touches[0].clientY} : null;
   }, {passive: true});
   viewport.addEventListener('touchcancel', () => { start = null; }, {passive: true});
   viewport.addEventListener('touchend', event => {
     if (!start || !event.changedTouches.length) return;
     const dx = event.changedTouches[0].clientX - start.x;
     const dy = event.changedTouches[0].clientY - start.y;
     start = null;
     if (Math.abs(dx) >= 50 && Math.abs(dx) > Math.abs(dy) * 1.5) show(current + (dx < 0 ? 1 : -1));
   }, {passive: true});
   controls.hidden = false;
   show(0);
 });
})();
