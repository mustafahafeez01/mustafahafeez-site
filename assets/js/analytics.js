(() => {
 const config = window.SITE_CONFIG || {};
 const enabled = config.analyticsEnabled === true && /^G-[A-Z0-9]+$/.test(config.gaMeasurementId) && location.hostname === config.productionHostname && location.protocol === 'https:';
 const key = 'mh-analytics-consent';
 let loaded = false;
 let measuring = false;
 const read = () => {try{return localStorage.getItem(key)}catch{return null}};
 let consent = read();
 const allowed = () => enabled && consent === 'granted' && read() === 'granted' && !window['ga-disable-'+config.gaMeasurementId];
 function status() {
  const node = document.querySelector('[data-consent-status]');
  if(node) node.textContent = !enabled ? 'Analytics is off for this site.' : read() === 'granted' ? 'Analytics is allowed. You can withdraw it here.' : 'Analytics is not allowed.';
 }
 function load() {
  if (!allowed() || measuring) return;
  measuring = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function(){window.dataLayer.push(arguments)};
  window.gtag('js', new Date());
  window.gtag('config', config.gaMeasurementId, {anonymize_ip:true,allow_google_signals:false,allow_ad_personalization_signals:false,send_page_view:false});
  window.gtag('event', 'page_view', {page_location:location.href,page_referrer:document.referrer});
  if(!loaded){
   loaded = true;
   const script = document.createElement('script'); script.async = true;script.src = 'https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(config.gaMeasurementId);document.head.append(script);
  }
 }
 window.setAnalyticsConsent = (value) => {
  if (!['granted','denied'].includes(value)) return;
  // Withdrawal always stops this page, even if storage has become unavailable.
  if(value === 'denied') consent = value;
  try{localStorage.setItem(key,value);consent=value}catch{if(value === 'granted') return}
  if(value === 'denied') {
   measuring = false;
   window['ga-disable-'+config.gaMeasurementId] = true;
   // Discard commands that the library may not have processed yet.
   if(window.dataLayer) window.dataLayer.length = 0;
   for(const cookie of document.cookie.split(';')){const name=cookie.split('=')[0].trim();if(name.startsWith('_ga')){for(const domain of ['',location.hostname,'.'+location.hostname])document.cookie=name+'=; Max-Age=0; path=/'+(domain?'; domain='+domain:'')}}
  } else {window['ga-disable-'+config.gaMeasurementId]=false;load()}
  status();
 };
 status();
 if(!enabled){document.querySelectorAll('[data-consent]').forEach(b=>b.hidden=true);return}
 const description=document.querySelector('[data-privacy-text]');
 if(description) description.textContent='Optional Google Analytics uses cookies to measure visits and link clicks after you allow it. Change your choice in Privacy & cookies.';
 document.addEventListener('click', event => {
  if(!allowed() || !loaded || typeof window.gtag !== 'function') return;
  const link=event.target.closest?.('a[href]');if(!link) return;
  let url;try{url=new URL(link.href,location.origin)}catch{return}
  const section=link.closest?.('section[id]')?.id || 'page';
  const source={source_page:location.pathname,source_section:/^[a-z][a-z0-9-]*$/i.test(section)?section:'page'};
  if(url.protocol==='mailto:' || (link.dataset.analytics==='contact' && ['https:','http:'].includes(url.protocol))){window.gtag('event','contact_click',source);return}
  if(!['https:','http:'].includes(url.protocol))return;
  // No destination path, query, fragment, link text or user identifiers in events.
  if(link.dataset.analytics === 'cv-download') window.gtag('event','cv_download',source);
  else if(url.origin!==location.origin) window.gtag('event','outbound_click',{...source,link_domain:url.hostname});
 });
 if(read() !== 'granted' && read() !== 'denied') {
  const prompt = document.querySelector('#privacy');
  if (prompt) { prompt.classList.add('privacy-prompt'); prompt.setAttribute('open', ''); }
 }
 load();
})();
