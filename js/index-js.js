document.addEventListener('DOMContentLoaded', function () {
  // ========= Header shrink on scroll =========
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  });

  // ========= ScrollReveal setup (smooth fade-in) =========
  function revealSelector(selector, options = {}) {
    if (window.ScrollReveal) {
      ScrollReveal().reveal(selector, Object.assign({
        distance: '20px',
        origin: 'bottom',
        opacity: 0,
        interval: 80,
        duration: 700,
        easing: 'cubic-bezier(.2,.8,.2,1)',
        scale: 1
      }, options));
    } else {
      const nodes = document.querySelectorAll(selector);
      const io = new IntersectionObserver((entries) => {
        entries.forEach(ent => {
          if (ent.isIntersecting) {
            ent.target.classList.add('sr-visible');
            io.unobserve(ent.target);
          }
        });
      }, { threshold: 0.12 });
      nodes.forEach(n => io.observe(n));
    }
  }

  revealSelector('[data-sr]');
  revealSelector('.hero-content', { delay: 100, origin: 'top' });
  revealSelector('.section .container > *', { interval: 80 });
  revealSelector('.card', { interval: 70 });
  revealSelector('.gallery-grid img', { interval: 60 });

  // ========= Newsletter form (demo handling) =========
  const form = document.getElementById('newsletter-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('input[name="email"]').value.trim();
      if (!email) {
        alert('Por favor escribe un correo válido.');
        return;
      }
      form.querySelector('input[name="email"]').value = '';
      alert('¡Gracias! Te hemos suscrito — revisar tu correo.');
    });
  }

  // ========= Current year in footer =========
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // ========= Modal handlers =========
  const buttons = document.querySelectorAll('.btn-learn');
  const modals = document.querySelectorAll('.info-modal');
  const closes = document.querySelectorAll('.close');

  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = btn.dataset.info;
      const modal = document.getElementById(target);
      if (modal) modal.style.display = (modal.style.display === 'flex') ? 'none' : 'flex';
    });
  });

  closes.forEach(close => {
    close.addEventListener('click', () => {
      const modal = close.closest('.info-modal');
      if (modal) modal.style.display = 'none';
    });
  });

  window.addEventListener('click', e => {
    modals.forEach(modal => {
      if (e.target === modal) modal.style.display = 'none';
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modals.forEach(m => m.style.display = 'none');
    }
  });

  // ========= Smooth scroll for internal anchors =========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.length > 1 && document.querySelector(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ========= NUEVO: Tarjetas expandibles con animación =========
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    const content = card.querySelector('p, form, div');
    if (content) content.style.transition = 'all 0.4s ease';

    card.addEventListener('click', () => {
      const isExpanded = card.classList.contains('expanded');
      cards.forEach(c => {
        c.classList.remove('expanded');
        const cContent = c.querySelector('p, form, div');
        if (cContent) {
          cContent.style.maxHeight = null;
          cContent.style.opacity = 0;
        }
      });

      if (!isExpanded) {
        card.classList.add('expanded');
        if (content) {
          content.style.maxHeight = content.scrollHeight + 'px';
          content.style.opacity = 1;
        }
      }
    });
  });

});
