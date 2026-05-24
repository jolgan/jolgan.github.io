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

  /* ── Nav card background photos ── */
  const navCardBgs = {
    'about.html':     'media/about/ls2-marylebone.png',
    'portfolio.html': 'media/about/ls3-photoshoot.jpg',
    'learning.html':  'media/about/ls4-graduation-arch.png',
  };
  document.querySelectorAll('.nav-card').forEach(card => {
    const page = (card.getAttribute('href') || '').split('/').pop();
    const img  = navCardBgs[page];
    if (!img) return;
    const applyBg = alpha => {
      const ov = `rgba(10,9,8,${alpha})`;
      card.style.backgroundImage    = `linear-gradient(${ov},${ov}),url('${img}')`;
      card.style.backgroundSize     = 'cover';
      card.style.backgroundPosition = 'center';
    };
    applyBg(0.82);
    card.addEventListener('mouseenter', () => applyBg(0.68));
    card.addEventListener('mouseleave', () => applyBg(0.82));
  });

  /* ── Chip tooltip typewriter ── */
  document.querySelectorAll('.chip-tooltip').forEach(tooltip => {
    const chip = tooltip.closest('.tool-chip');
    if (!chip) return;
    const lines = (tooltip.dataset.lines || '').split('|').map(l => l.trim()).filter(Boolean);
    let timer = null;

    chip.addEventListener('mouseenter', () => {
      clearInterval(timer);
      tooltip.innerHTML = '';

      /* Build a span per line up-front so the tooltip expands cleanly */
      const lineEls = lines.map(line => {
        const span = document.createElement('span');
        span.className = 'chip-tooltip-line' + (line === '+ more' ? ' chip-tooltip-more' : '');
        tooltip.appendChild(span);
        return { el: span, text: line };
      });

      let li = 0, ci = 0;
      timer = setInterval(() => {
        if (li >= lineEls.length) { clearInterval(timer); return; }
        lineEls[li].el.textContent = lineEls[li].text.substring(0, ci + 1);
        ci++;
        if (ci >= lineEls[li].text.length) { li++; ci = 0; }
      }, 18);
    });

    chip.addEventListener('mouseleave', () => {
      clearInterval(timer);
      tooltip.innerHTML = '';
    });
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
function toggleCredImg(wrapper) {
  const img = wrapper.querySelector('img');
  if (!img) return;

  const isExpanded = wrapper.classList.toggle('expanded');

  if (isExpanded) {
    const isPortfolioCred = !!wrapper.closest('.cred-card');
    const isMimoItem = !!wrapper.closest('.course-cert-img-pair');
    const isMobile = window.innerWidth < 768;

    if (isPortfolioCred) {
      /* Portfolio credentials: expand to natural full size */
      const cardWidth = wrapper.closest('.cred-card').offsetWidth;
      const ratio = img.naturalHeight / img.naturalWidth;
      const targetH = Math.round(cardWidth * ratio);
      wrapper.style.setProperty('--expanded-h', targetH + 'px');
      setTimeout(() => {
        wrapper.closest('.cred-card').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 50);
    } else {
      /* Course cert items: capped expansion */
      const parentWidth = (wrapper.closest('.course-cert-card') || wrapper.parentElement).offsetWidth;
      const ratio = img.naturalHeight / img.naturalWidth;
      const isPortrait = ratio > 1;

      if (isMimoItem && isPortrait) {
        /* MIMO portrait images: use inline styles to guarantee override */
        const widthCap = isMobile ? 340 : 280;
        const expandedW = Math.min(widthCap, parentWidth);
        const expandedH = Math.round(expandedW * ratio);
        wrapper.style.width  = expandedW + 'px';
        wrapper.style.height = expandedH + 'px';
      } else {
        /* Landscape or non-MIMO: expand based on height via CSS variable */
        const naturalH = Math.round(parentWidth * ratio);
        let cap;
        if (isMimoItem)      cap = isMobile ? 240 : 180;
        else if (isMobile)   cap = 400;
        else                 cap = 180;
        wrapper.style.setProperty('--expanded-h', Math.min(naturalH, cap) + 'px');
      }

      setTimeout(() => {
        const card = wrapper.closest('.course-cert-card');
        if (card) card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 80);
    }
  } else {
    wrapper.style.removeProperty('--expanded-h');
    wrapper.style.removeProperty('--expanded-w');
    wrapper.style.removeProperty('width');
    wrapper.style.removeProperty('height');
  }
}
