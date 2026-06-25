/* ============================================================
   Samridh Prabhakar - Portfolio Interactions
   ============================================================ */

(function () {
  'use strict';

  // --- Utilities ---
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ------------------------------------------------------------------
  // 1. Exposure Overlay (Signature Animation)
  // ------------------------------------------------------------------
  function initExposure() {
    const overlay = $('.exposure-overlay');
    const hero = $('#hero');
    if (!overlay || !hero) return;

    const alreadyPlayed = sessionStorage.getItem('exposure-played');

    if (prefersReducedMotion() || alreadyPlayed) {
      // Skip animation - show everything immediately
      overlay.classList.add('done');
      hero.classList.add('no-animation');
      return;
    }

    // Let the CSS animation run, then reveal hero content
    overlay.addEventListener('animationend', function handler(e) {
      // Wait for the curtain animation specifically
      if (e.animationName === 'curtain-reveal') {
        overlay.classList.add('done');
        hero.classList.add('revealed');
        sessionStorage.setItem('exposure-played', '1');
        overlay.removeEventListener('animationend', handler);
      }
    });

    // Fallback: if animationend doesn't fire (edge cases), reveal after 2s
    setTimeout(() => {
      if (!hero.classList.contains('revealed') && !hero.classList.contains('no-animation')) {
        overlay.classList.add('done');
        hero.classList.add('revealed');
        sessionStorage.setItem('exposure-played', '1');
      }
    }, 2200);
  }

  // ------------------------------------------------------------------
  // 2. Mobile FAB Toggle
  // ------------------------------------------------------------------
  function initMobileFAB() {
    const fab = $('.mobile-fab');
    const nav = $('.mobile-nav');
    if (!fab || !nav) return;

    fab.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = nav.classList.toggle('expanded');
      fab.classList.toggle('active', isOpen);
      fab.setAttribute('aria-expanded', isOpen);
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !fab.contains(e.target)) {
        nav.classList.remove('expanded');
        fab.classList.remove('active');
        fab.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        nav.classList.remove('expanded');
        fab.classList.remove('active');
        fab.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ------------------------------------------------------------------
  // 3. Project Card Mobile Tap Interaction
  // ------------------------------------------------------------------
    function initProjectCards() {
    const cards = $$('.project-card:not(.project-placeholder)');
    const modal = $('#project-modal');
    if (!modal) return;

    const modalBody = $('.modal-body', modal);
    const backBtn = $('.modal-back-btn', modal);
    const backdrop = $('.modal-backdrop', modal);

    function openModal(card) {
      const overlayContent = $('.project-overlay', card);
      if (!overlayContent) return;

      // Inject content
      modalBody.innerHTML = overlayContent.innerHTML;

      // Show modal
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeModal() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = ''; // Restore scrolling
      setTimeout(() => {
        modalBody.innerHTML = ''; // Clear content after transition
      }, 300);
    }

    cards.forEach((card) => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(card);
      });
    });

    if (backBtn) backBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeModal();
      }
    });
  }

  // ------------------------------------------------------------------
  // 4. Smooth Scroll for CTAs
  // ------------------------------------------------------------------
  function initSmoothScroll() {
    $$('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const target = $(anchor.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ------------------------------------------------------------------
  // 5. Scroll-Triggered Reveal (IntersectionObserver)
  // ------------------------------------------------------------------
  function initScrollReveal() {
    if (prefersReducedMotion()) {
      // Show everything immediately
      $$('.timeline-item, .project-card').forEach((el) =>
        el.classList.add('scroll-revealed')
      );
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Stagger delay based on position among siblings
            const siblings = [...entry.target.parentElement.children];
            const index = siblings.indexOf(entry.target);
            entry.target.style.transitionDelay = `${index * 0.1}s`;
            entry.target.classList.add('scroll-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    $$('.timeline-item, .project-card').forEach((el) => observer.observe(el));
  }

  // ------------------------------------------------------------------
  // 6. Photo Fallback
  // ------------------------------------------------------------------
  function initPhotoFallback() {
    const frame = $('.photo-frame');
    if (!frame) return;

    const img = frame.querySelector('img');
    const placeholder = frame.querySelector('.photo-placeholder');

    if (img && placeholder) {
      // If image loads successfully, hide placeholder
      img.addEventListener('load', () => {
        placeholder.style.display = 'none';
      });
      // If image fails, keep placeholder visible
      img.addEventListener('error', () => {
        img.style.display = 'none';
        placeholder.style.display = 'flex';
      });
    }
  }

  // ------------------------------------------------------------------
  // Initialize everything on DOM ready
  // ------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initExposure();
    initMobileFAB();
    initProjectCards();
    initSmoothScroll();
    initScrollReveal();
    initPhotoFallback();
  });
})();
