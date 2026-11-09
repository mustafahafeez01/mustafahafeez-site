// Visual enhancement only. All reading content and links are already in HTML.
(() => {
 const scenes = [...document.querySelectorAll('[data-journey-scene]')];
 if (!scenes.length || typeof IntersectionObserver !== 'function' || typeof Element.prototype.animate !== 'function') return;
 const root = document.documentElement;
 const preference = matchMedia('(prefers-reduced-motion: reduce)');
 const timelineSupported = typeof CSS !== 'undefined' && CSS.supports('animation-timeline: view()');
 const targets = scenes.map(scene => scene.querySelector('[data-journey-visual]'));
 const seen = new WeakSet();
 const frozen = new WeakSet();
 const pending = new Set();
 let userScrolled = false;
 let observer;
 const layers = scene => [scene.querySelector('[data-journey-visual]'), scene.querySelector('.paper-backing')].filter(Boolean);
 const clearFreeze = scene => {
  layers(scene).forEach(layer => {
   layer.style.removeProperty('animation');
   layer.style.removeProperty('transform');
  });
  frozen.delete(scene);
 };
 function enter(target) {
  if (seen.has(target) || preference.matches) return;
  seen.add(target);
  pending.delete(target);
  observer.unobserve(target);
  if (target.matches(':focus-within')) return;
  target.style.transform = 'translateY(0)';
  const animation = target.animate([{transform: 'translateY(40px)'}, {transform: 'translateY(0)'}], {
   duration: 550,
   easing: 'cubic-bezier(.16,1,.3,1)'
  });
  animation.finished.then(() => target.style.removeProperty('transform')).catch(() => {});
 }
 const updateLayout = () => {
  const enabled = !preference.matches;
  root.classList.toggle('journey-enabled', enabled);
  root.classList.toggle('journey-timeline', enabled && timelineSupported);
  targets.forEach(target => {
   if (enabled && !seen.has(target)) target.style.transform = 'translateY(40px)';
   else if (!enabled) {
    target.getAnimations().forEach(animation => animation.cancel());
    target.style.removeProperty('transform');
   }
  });
  scenes.forEach(scene => {
   // The reserve contains the entrance and keeps any pin within its chapter.
   scene.classList.toggle('can-stick', enabled && scene.offsetHeight <= innerHeight - 64);
   if (!enabled) {
    layers(scene).forEach(layer => layer.getAnimations().forEach(animation => animation.cancel()));
    clearFreeze(scene);
   }
  });
  if (observer && userScrolled && enabled) {
   for (const target of pending) {
    const rect = target.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < innerHeight * .92) enter(target);
   }
  }
 };
 scenes.forEach(scene => {
  scene.addEventListener('focusin', () => {
   if (preference.matches || frozen.has(scene)) return;
   const target = scene.querySelector('[data-journey-visual]');
   seen.add(target);
   pending.delete(target);
   observer?.unobserve(target);
   layers(scene).forEach(layer => {
    const transform = getComputedStyle(layer).transform;
    layer.getAnimations().forEach(animation => animation.cancel());
    layer.style.animation = 'none';
    layer.style.transform = transform;
   });
   frozen.add(scene);
  });
  scene.addEventListener('focusout', event => {
   if (!scene.contains(event.relatedTarget)) clearFreeze(scene);
  });
 });
 updateLayout();
 addEventListener('resize', updateLayout, {passive: true});
 preference.addEventListener('change', updateLayout);
 if (typeof ResizeObserver === 'function') {
  const sizeObserver = new ResizeObserver(updateLayout);
  scenes.forEach(scene => sizeObserver.observe(scene));
 }
 observer = new IntersectionObserver(changes => {
  changes.forEach(change => {
   if (!change.isIntersecting || seen.has(change.target)) return;
   if (!userScrolled) pending.add(change.target);
   else enter(change.target);
  });
 }, {threshold: .12, rootMargin: '0px 0px -8% 0px'});
 const arm = event => {
  if (event.type === 'keydown' && (!['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', ' ', 'End', 'Home'].includes(event.key) || event.target.closest('button,a,input,textarea,select,dialog'))) return;
  userScrolled = true;
  for (const target of pending) {
   const rect = target.getBoundingClientRect();
   if (rect.bottom > 0 && rect.top < innerHeight * .92) enter(target);
  }
  removeEventListener('scroll', arm);
  removeEventListener('wheel', arm);
  removeEventListener('touchmove', arm);
  removeEventListener('keydown', arm);
 };
 // Wait for initial fragment/restoration layout, then also cover scrollbar and assistive scrolling.
 const watchScroll = () => requestAnimationFrame(() => requestAnimationFrame(() => {
  if (!userScrolled) addEventListener('scroll', arm, {passive: true});
 }));
 if (document.readyState === 'complete') watchScroll();
 else addEventListener('load', watchScroll, {once: true});
 addEventListener('wheel', arm, {passive: true});
 addEventListener('touchmove', arm, {passive: true});
 addEventListener('keydown', arm);
 targets.forEach(target => observer.observe(target));
})();
