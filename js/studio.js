/* =============================================
   SAICON V4.4 — Shared Studio JS
   Used by all studio pages (overview + individual)
   ============================================= */
(function(){
  'use strict';
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];

  /* ── Nav scroll — handles #nav, .site-nav, .pg-nav ── */
  const nav = $('#nav') || $('.site-nav') || $('.pg-nav');
  if(nav){
    /* .site-nav uses 'scrolled'; all others use 'sc' */
    const scrollClass = nav.classList.contains('site-nav') ? 'scrolled' : 'sc';
    const onScroll = () => nav.classList.toggle(scrollClass, window.scrollY > 30);
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();
  }

  /* ── IntersectionObserver — reveal animations ── */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.classList.add('iv');
        io.unobserve(e.target);
      }
    });
  }, {threshold: 0.07, rootMargin: '0px 0px -40px 0px'});

  /* Observe all animatable elements (legacy + new) */
  $$('.svc-block, .sc, .rv, .plat-item, .pg-hero-left, .pg-hero-right, .vert-card').forEach(function(el){
    /* Stagger svc-blocks and studio cards */
    if(el.classList.contains('svc-block') || el.classList.contains('sc') || el.classList.contains('vert-card')){
      var siblings = Array.prototype.filter.call(el.parentElement.children, function(c){
        return c.classList.contains(el.classList[0]);
      });
      var idx = siblings.indexOf(el);
      el.style.transitionDelay = (idx * 0.12) + 's';
    }
    io.observe(el);
  });

  /* Remove stagger delay after first hover so subsequent hovers feel instant */
  $$('.sc, .vert-card').forEach(function(el){
    el.addEventListener('mouseenter', function(){
      if(el.classList.contains('iv')) el.style.transitionDelay = '0s';
    }, {once: true});
  });

  /* ── Individual studio page: svc-blocks inside .svc-blocks ── */
  /* These use the same .svc-block class — already handled above.   */
  /* Override stagger delay to use per-container index (0.13s step) */
  $$('.svc-blocks .svc-block').forEach(function(el, idx){
    el.style.transitionDelay = (idx * 0.13) + 's';
    /* io.observe() already called in the general loop above — not repeated here */
  });

  /* ── Hamburger menu (mobile) ── */
  var hamburger = $('.nav-hamburger');
  var navLinksEl = $('.nav-links');
  if(hamburger && navLinksEl){
    hamburger.addEventListener('click', function(){
      var open = navLinksEl.style.display === 'flex';
      navLinksEl.style.display = open ? '' : 'flex';
      navLinksEl.style.flexDirection = open ? '' : 'column';
      navLinksEl.style.position = open ? '' : 'absolute';
      navLinksEl.style.top = open ? '' : '70px';
      navLinksEl.style.left = open ? '' : '0';
      navLinksEl.style.right = open ? '' : '0';
      navLinksEl.style.background = open ? '' : 'rgba(244,242,238,.98)';
      navLinksEl.style.padding = open ? '' : '1.5rem 2rem';
      navLinksEl.style.borderBottom = open ? '' : '1px solid rgba(13,18,37,.08)';
      navLinksEl.style.zIndex = open ? '' : '899';
    });
  }

  /* ── Hamburger menu for vertical studio pages (.pg-nav) ── */
  var pgBurger = document.querySelector('.pg-nav-burger');
  var pgNavLinks = document.querySelector('.pg-nav-links');
  if (pgBurger && pgNavLinks) {
    pgBurger.addEventListener('click', function() {
      pgNavLinks.classList.toggle('open');
    });
  }

})();
