/* ============================================================
   GLOBAL JAVASCRIPT
   ============================================================ */

/* ── Mobile Nav Toggle ── */
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      const isOpen = links.classList.contains('open');
      toggle.setAttribute('aria-expanded', isOpen);
      // Animate hamburger to X
      const spans = toggle.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
        spans[1].style.opacity   = '0';
        spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity   = '';
        spans[2].style.transform = '';
      }
    });

    // Close on link click
    links.querySelectorAll('.nav-link').forEach(l => {
      l.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.querySelectorAll('span').forEach(s => {
          s.style.transform = '';
          s.style.opacity   = '';
        });
      });
    });
  }

  /* ── Scroll-triggered fade-in ── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.story-block, .project-card, .cred-card, .nav-card, .cert-card').forEach(el => {
    el.classList.add('fade-observe');
    observer.observe(el);
  });
});

/* ── Certificate Carousel ── */
let carouselIndex = 0;

function shiftCarousel(dir) {
  const track = document.getElementById('certTrack');
  if (!track) return;
  const cards = track.querySelectorAll('.cert-card');
  const visible = Math.floor(track.parentElement.offsetWidth / (220 + 16));
  const max = Math.max(0, cards.length - visible);
  carouselIndex = Math.min(Math.max(carouselIndex + dir, 0), max);
  track.style.transform = `translateX(-${carouselIndex * (220 + 16)}px)`;
}

/* ── Smooth hash scrolling ── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 120; // nav + jump-nav height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ── Event photo carousel ── */
const carouselIndexes = {};

function shiftEventCarousel(trackId, dir) {
  const track = document.getElementById(trackId);
  if (!track) return;
  const slides = track.querySelectorAll('.event-carousel-slide');
  const total  = slides.length;
  if (!carouselIndexes[trackId]) carouselIndexes[trackId] = 0;
  carouselIndexes[trackId] = (carouselIndexes[trackId] + dir + total) % total;
  goToEventSlide(trackId, carouselIndexes[trackId]);
}

function goToEventSlide(trackId, index) {
  const track = document.getElementById(trackId);
  if (!track) return;
  const slides = track.querySelectorAll('.event-carousel-slide');
  carouselIndexes[trackId] = index;
  track.style.transform = `translateX(-${index * 100}%)`;
  /* Update dots */
  const dotsId = trackId.replace('Track', 'Dots');
  const dots = document.getElementById(dotsId);
  if (dots) {
    dots.querySelectorAll('.event-carousel-dot').forEach((d, i) => {
      d.classList.toggle('on', i === index);
    });
  }
}

/* ── Return to top button ── */
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('returnToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

/* ── Expandable credential images ── */
function toggleCredImg(el) {
  const slot = el.classList.contains('cred-img-slot') ? el : el;
  const isExpanded = slot.classList.toggle('expanded');
  const hint = slot.nextElementSibling;
  if (hint && hint.classList.contains('cred-expand-hint')) {
    hint.textContent = isExpanded ? 'click to collapse ↕' : 'click to expand ↕';
  }
  if (isExpanded) {
    setTimeout(() => slot.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
  }
}
