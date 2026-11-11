// Preserve links to sections on the former profile homepage.
if (location.pathname === '/' && ['#work', '#journey', '#contact', '#writing'].includes(location.hash)) {
 location.replace(location.hash === '#writing' ? '/blog/#notes' : '/about/' + location.hash);
}

(() => {
 const modal = document.querySelector('#privacy');
 document.querySelectorAll('[data-privacy]').forEach(button => button.addEventListener('click', event => {
  if (!modal || typeof modal.showModal !== 'function') return;
  event?.preventDefault();
  if (modal.classList.contains('privacy-prompt')) modal.close();
  modal.classList.remove('privacy-prompt');
  document.documentElement.classList.remove('analytics-choice-needed');
  const title = modal.querySelector('#privacy-title');
  if (title) title.textContent = 'Privacy & cookies';
  const description = modal.querySelector('[data-privacy-text]');
  if (description) description.textContent = 'Optional Google Analytics uses cookies to measure visits and link clicks after you allow it. Change your choice in Cookie settings.';
  if (!modal.open) { modal.showModal(); modal.querySelector('[data-close]')?.focus(); }
 }));
 const close = () => {modal.close(); document.documentElement.classList.remove('analytics-choice-needed')};
 document.querySelector('[data-close]')?.addEventListener('click', close);
 document.querySelectorAll('[data-consent]').forEach(b => b.addEventListener('click', () => {window.setAnalyticsConsent?.(b.dataset.consent); close();}));
 modal?.addEventListener?.('keydown', event => {
  if (modal.classList.contains('privacy-prompt')) {
   if (event.key === 'Escape') close();
   return;
  }
  if(event.key!=='Tab') return;
  const controls=[...modal.querySelectorAll('button, a[href], input, select, textarea, [tabindex="0"]')].filter(el=>!el.hidden&&!el.disabled&&el.getClientRects().length);
  const first=controls[0],last=controls.at(-1);
  if(first&&event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
  else if(last&&!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
 });
})();

// Reflect the Services fragment without intercepting any native link navigation.
(() => {
 const nav = document.querySelector('nav[aria-label="Main navigation"][data-active]');
 if (!nav || typeof nav.querySelectorAll !== 'function' || typeof window === 'undefined') return;
 const update = () => {
  if (location.pathname !== '/') return;
  const services = location.hash === '#services';
  nav.dataset.active = services ? 'services' : 'home';
  nav.querySelectorAll('a').forEach(link => {
   const selected = link.getAttribute('href') === (services ? '/#services' : '/');
   if (selected) link.setAttribute('aria-current', services ? 'location' : 'page');
   else link.removeAttribute('aria-current');
  });
 };
 update(); window.addEventListener('hashchange', update); window.addEventListener('pageshow', update);
})();

// Animate only the local selection after an ordinary same-tab page navigation.
// Native links remain immediate, and no preference or navigation data is stored.
(() => {
 const nav = document.querySelector('nav[aria-label="Main navigation"][data-active]');
 if (!nav) return;
 const activation = window.navigation?.activation;
 if (activation?.navigationType !== 'push' || typeof activation.from?.url !== 'string' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
 const previous = new URL(activation.from.url);
 if (previous.origin !== location.origin) return;
 const routes = {'/': 'home', '/blog/': 'writing', '/about/': 'about'};
 const from = previous.pathname === '/' && previous.hash === '#services' ? 'services' : routes[previous.pathname];
 const to = location.pathname === '/' && location.hash === '#services' ? 'services' : routes[location.pathname];
 const indicator = nav.querySelector('.nav-indicator');
 if (!from || !to || to !== nav.dataset.active || from === to || !indicator?.animate) return;
 const position = active => ({home: 'translateX(0)', writing: 'translateX(calc(200% + 4px))', about: 'translateX(calc(300% + 6px))', services: 'translateX(calc(100% + 2px))'})[active];
 const animation = indicator.animate([{transform: position(from)}, {transform: position(to)}], {duration: 220, easing: 'cubic-bezier(.2,.7,.3,1)'});
 window.addEventListener('pagehide', () => animation.cancel(), {once: true});
})();

// Keep all figures readable without JavaScript. Enhance only multi-image galleries.
(() => {
 document.querySelectorAll('[data-carousel]').forEach(carousel => {
   const slides = [...carousel.querySelectorAll('[data-carousel-slide]')];
   const controls = carousel.querySelector('.carousel-controls');
   const status = carousel.querySelector('[data-carousel-status]');
   const scenes = [...carousel.querySelectorAll('[data-carousel-scene]')];
   const sceneControls = carousel.querySelector('.carousel-scenes');
   if (slides.length < 2 || !controls || !status) return;
   let current = 0;
   const show = index => {
     current = (index + slides.length) % slides.length;
     slides.forEach((slide, i) => { slide.hidden = i !== current; });
     scenes.forEach((button, i) => button.setAttribute('aria-pressed', String(i === current)));
     status.textContent = `Image ${current + 1} of ${slides.length}`;
   };
   slides.forEach((slide, i) => {
     slide.setAttribute('aria-roledescription', 'slide');
     slide.setAttribute('aria-label', `${i + 1} of ${slides.length}`);
   });
   scenes.forEach((button, i) => button.addEventListener('click', () => show(i)));
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
   if (sceneControls) sceneControls.hidden = false;
   show(0);
   if (carousel.hasAttribute('data-carousel-autoplay')) {
     const toggle = carousel.querySelector('[data-carousel-toggle]');
     const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
     let paused = reducedMotion.matches;
     let visible = false;
     let hovering = false;
     let entered = false;
     let entrance;
     let timer;
     const updatePlayback = () => {
       clearInterval(timer);
       const playing = !paused && visible && !hovering && !document.hidden;
       status.setAttribute('aria-live', playing ? 'off' : 'polite');
       toggle.setAttribute('aria-label', paused ? 'Play slideshow' : 'Pause slideshow');
       toggle.title = paused ? 'Play slideshow' : 'Pause slideshow';
       toggle.firstElementChild.textContent = paused ? '▶' : 'Ⅱ';
       if (playing) timer = setInterval(() => show(current + 1), 5000);
     };
     toggle.addEventListener('click', () => { paused = !paused; updatePlayback(); });
     carousel.addEventListener('mouseenter', () => { hovering = true; updatePlayback(); });
     carousel.addEventListener('mouseleave', () => { hovering = false; updatePlayback(); });
     carousel.addEventListener('focusin', event => {
       if (event.target !== toggle) { paused = true; updatePlayback(); }
     });
     carousel.addEventListener('touchstart', () => { paused = true; updatePlayback(); }, {passive: true});
     document.addEventListener('visibilitychange', updatePlayback);
     reducedMotion.addEventListener('change', () => { paused = true; entrance?.cancel(); updatePlayback(); });
     new IntersectionObserver(entries => {
       visible = entries[0].isIntersecting;
       if (visible && !entered) {
         entered = true;
         if (!reducedMotion.matches) entrance = carousel.animate([{opacity: 0.35}, {opacity: 1}], {duration: 550, easing: 'ease-out'});
       }
       updatePlayback();
     }, {threshold: 0.25}).observe(carousel);
     updatePlayback();
   }
 });
})();

// Sharing uses the canonical public URL, with no third-party widget requests.
(() => {
 const panel = document.querySelector('[data-article-share]');
 if (!panel) return;
 const url = panel.dataset.shareUrl;
 const title = panel.dataset.shareTitle;
 const status = panel.querySelector('[role="status"]');
 const fallback = panel.querySelector('.share-link-fallback');
 const copy = panel.querySelector('[data-copy-article]');
 copy.hidden = false;
 copy.addEventListener('click', async () => {
  try {
   await navigator.clipboard.writeText(url);
   status.textContent = 'Link copied.';
  } catch {
   fallback.hidden = false;
   fallback.focus();
   fallback.select();
   status.textContent = 'Select and copy the link below.';
  }
 });
 const share = panel.querySelector('[data-native-share]');
 if (typeof navigator.share !== 'function') return;
 share.hidden = false;
 share.addEventListener('click', async () => {
  try {
   await navigator.share({title, url});
  } catch (error) {
   if (error.name !== 'AbortError') status.textContent = 'Sharing is unavailable. You can copy the link instead.';
  }
 });
})();

document.querySelectorAll('[data-code-example]').forEach(panel => {
 const button = panel.querySelector('[data-copy-code]');
 const code = panel.querySelector('code');
 const feedback = panel.querySelector('[role="status"]');
 button.hidden = false;
 button.addEventListener('click', async () => {
  try {
   await navigator.clipboard.writeText(code.textContent);
   feedback.textContent = 'Code copied.';
  } catch {
   const selection = window.getSelection();
   const range = document.createRange();
   range.selectNodeContents(code);
   selection.removeAllRanges();
   selection.addRange(range);
   panel.querySelector('pre').focus();
   feedback.textContent = 'Code selected. Use your device’s copy command.';
  }
 });
});

// Original product GIFs autoplay unless reduced motion is requested.
// Pause swaps to a still image; no JavaScript retains the still images.
(() => {
 const panels = document.querySelectorAll('[data-gif-demo]');
 if (!panels.length || typeof window.matchMedia !== 'function') return;
 const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
 panels.forEach(panel => {
  const image = panel.querySelector('[data-gif-src]');
  const button = panel.querySelector('[data-gif-toggle]');
  if (!image || !button) return;
  let playing = !motion.matches;
  const render = () => {
   image.src = playing ? image.dataset.gifSrc : image.dataset.stillSrc;
   button.textContent = playing ? 'Pause animation' : 'Play animation';
   button.setAttribute('aria-label', button.textContent + ': ' + panel.querySelector('.eyebrow').textContent.toLowerCase());
  };
  button.hidden = false;
  button.addEventListener('click', () => { playing = !playing; render(); });
  motion.addEventListener('change', () => { if (motion.matches) { playing = false; render(); } });
  render();
 });
})();

// Keep keyboard focus clear of the non-modal fixed analytics choice notice.
(() => {
 if (typeof window === 'undefined' || typeof window.requestAnimationFrame !== 'function') return;
 document.addEventListener('focusin', event => {
  window.requestAnimationFrame(() => {
   const notice = document.querySelector('#privacy.privacy-prompt[open]');
   const target = event.target;
   if (!notice || !notice.getClientRects().length || notice.contains(target) || !target?.getBoundingClientRect) return;
   const rect = target.getBoundingClientRect();
   const limit = notice.getBoundingClientRect().top - 12;
   if (rect.bottom > limit) window.scrollBy({top: rect.bottom - limit, behavior: 'instant'});
  });
 });
})();

// External report makes no request until the visitor explicitly loads it.
(() => {
 document.querySelectorAll('[data-embed-demo]').forEach(panel => {
  const open = panel.querySelector('[data-load-demo]');
  const close = panel.querySelector('[data-close-demo]');
  const container = panel.querySelector('[data-demo-container]');
  if (!open || !close || !container) return;
  open.hidden = false;
  open.addEventListener('click', () => {
   if (container.firstChild) return;
   const frame = document.createElement('iframe');
   frame.title = 'Visokio Omniscope public demo catalogue';
   frame.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms');
   frame.referrerPolicy = 'no-referrer';
   frame.src = 'https://public.omniscope.me/Demos/Catalogue.iox/r/Gallery/?utm_source=mustafa_hafeez&utm_medium=referral&utm_campaign=personal_website&utm_content=about_demo_embed';
   container.append(frame);
   open.hidden = true; close.hidden = false; close.focus();
  });
  close.addEventListener('click', () => {
   container.replaceChildren(); close.hidden = true; open.hidden = false; open.focus();
  });
 });
})();
