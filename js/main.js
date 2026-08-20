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

  document.querySelectorAll('.story-block, .project-card, .cred-card, .nav-card').forEach(el => {
    el.classList.add('fade-observe');
    observer.observe(el);
  });

  /* ── Scroll-scrubbed featured credentials ── */
  const certStage = document.getElementById('certStage');
  const certScroll = document.getElementById('certScroll');
  const certPin = certScroll?.querySelector('.cert-pin');
  const certCards = certStage ? [...certStage.querySelectorAll('.cert-card')] : [];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  certCards.forEach(card => {
    card.addEventListener('pointerenter', () => certStage.classList.add('is-hovering'));
    card.addEventListener('pointerleave', () => certStage.classList.remove('is-hovering'));
  });

  if (certStage && certScroll && certPin && certCards.length === 3 && !reduceMotion && window.gsap && window.ScrollTrigger) {
    const [diplomaCard, bachelorsCard, mastersCard] = certCards;
    gsap.registerPlugin(ScrollTrigger);
    certScroll.classList.add('is-scroll-ready');

    const cardMedia = gsap.matchMedia();
    cardMedia.add({
      desktop: '(min-width: 601px)',
      mobile: '(max-width: 600px)'
    }, context => {
      const mobile = context.conditions.mobile;
      const twoCardOffset = () => diplomaCard.offsetWidth * (mobile ? 0.28 : 0.32);
      const threeCardOffset = () => diplomaCard.offsetWidth * (mobile ? 0.42 : 0.54);

      gsap.set(diplomaCard, { xPercent: -50, yPercent: -50, x: 0, rotation: 0, scale: 1, autoAlpha: 1 });
      gsap.set(bachelorsCard, { xPercent: -50, yPercent: -50, x: twoCardOffset, rotation: 5, scale: 0.9, autoAlpha: 0 });
      gsap.set(mastersCard, { xPercent: -50, yPercent: -50, x: threeCardOffset, rotation: 7, scale: 0.9, autoAlpha: 0 });

      const cardTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: certScroll,
          start: 'top top',
          end: 'bottom bottom',
          pin: certPin,
          pinSpacing: false,
          scrub: 0.65,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });

      cardTimeline
        .to(diplomaCard, {
          x: () => -twoCardOffset(),
          rotation: -5,
          duration: 0.9,
          ease: 'power3.inOut'
        }, 0)
        .to(bachelorsCard, {
          x: twoCardOffset,
          rotation: 5,
          scale: 1,
          autoAlpha: 1,
          duration: 0.76,
          ease: 'back.out(1.55)'
        }, 0.16)
        .to(diplomaCard, {
          x: () => -threeCardOffset(),
          rotation: -7,
          duration: 0.9,
          ease: 'power3.inOut'
        }, 1.24)
        .to(bachelorsCard, {
          x: 0,
          rotation: 0,
          duration: 0.9,
          ease: 'power3.inOut'
        }, 1.24)
        .to(mastersCard, {
          x: threeCardOffset,
          rotation: 7,
          scale: 1,
          autoAlpha: 1,
          duration: 0.76,
          ease: 'back.out(1.55)'
        }, 1.4);

      return () => {
        cardTimeline.scrollTrigger?.kill();
        cardTimeline.kill();
        gsap.set(certCards, { clearProps: 'transform,opacity,visibility' });
      };
    });

    window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
  }

  /* ── Typewriter reveal for hero name and page titles ── */
  function typewriterReveal(heroName) {
    const em = heroName.querySelector('em');

    // Grab the first non-empty text node ("Jolene")
    let firstTextNode = null;
    for (const node of heroName.childNodes) {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        firstTextNode = node;
        break;
      }
    }

    const text1 = firstTextNode ? firstTextNode.textContent.trim() : '';
    const text2 = em ? em.textContent.trim() : '';

    // Replace each text string with per-character spans that are invisible
    // (visibility:hidden keeps layout space; each span snaps visible on its turn)
    function spannify(text) {
      const frag = document.createDocumentFragment();
      for (const ch of text) {
        const s = document.createElement('span');
        s.textContent = ch;
        s.style.visibility = 'hidden';
        frag.appendChild(s);
      }
      return frag;
    }

    if (firstTextNode && text1) firstTextNode.replaceWith(spannify(text1));
    if (em && text2) { em.innerHTML = ''; em.appendChild(spannify(text2)); }

    const spans1 = [...heroName.querySelectorAll(':scope > span')];
    const spans2 = em ? [...em.querySelectorAll('span')] : [];

    const msPerChar   = 90;   // typing speed
    const pauseBetween = 160; // gap between the two lines
    const startAfter  = 880;  // wait for fadeUp (~0.9s) to settle

    setTimeout(() => {
      spans1.forEach((s, i) => setTimeout(() => { s.style.visibility = 'visible'; }, i * msPerChar));
      const line2Start = spans1.length * msPerChar + pauseBetween;
      spans2.forEach((s, i) => setTimeout(() => { s.style.visibility = 'visible'; }, line2Start + i * msPerChar));
    }, startAfter);
  }

  document.querySelectorAll('.hero-name, .page-title').forEach(typewriterReveal);

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

/* ── Scroll progress bar ── */
document.addEventListener('DOMContentLoaded', () => {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  function updateProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    bar.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
});

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

/* ── Ikigai cards: single-open accordion ── */
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.ikigai-grid');
  if (!grid) return;

  const items = Array.from(grid.querySelectorAll('.ikigai-item'));

  items.forEach(item => {
    const toggle = item.querySelector('.ikigai-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', () => {
      const willOpen = !item.classList.contains('is-open');

      /* Close whatever is open, so only one card is ever expanded */
      items.forEach(other => {
        other.classList.remove('is-open');
        const otherToggle = other.querySelector('.ikigai-toggle');
        if (otherToggle) otherToggle.setAttribute('aria-expanded', 'false');
      });

      if (willOpen) {
        item.classList.add('is-open');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });
  });
});

/* ── About page: scroll-linked opacity reveal ──
   Opacity is mapped continuously to each block's position in the viewport
   rather than toggled at a threshold, so the fade tracks the scrollbar in
   both directions. Text blocks are split into word spans that each carry a
   stagger offset, producing a diagonal reveal; images and the accordion
   cards fade as whole blocks. */
document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('.about-main');
  if (!main) return;

  /* Honour the OS setting: leave everything at full opacity, no listeners */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const TEXT_UNITS = '.page-header-inner, .story-label, .story-text, .timeline-item, .stat, .currently-col';
  const BLOCK_UNITS = '.story-img, .ikigai-item';

  /* Never split inside these. Each becomes one atomic word so it still fades,
     but its internal markup and animations survive untouched. .page-title is
     here because the typewriter reveal rewrites it into per-character spans. */
  const ATOMIC = '.text-wave, .story-em--shimmer, .timeline-badge, .lang-level, .ikigai-toggle, .ikigai-panel, .page-title, img, br';

  /* Wrap bare text nodes in spans, leaving element children alone */
  function splitWords(root) {
    const words = [];

    (function walk(node) {
      for (const child of [...node.childNodes]) {
        if (child.nodeType === Node.TEXT_NODE) {
          if (!child.textContent.trim()) continue;
          const frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) {
              frag.appendChild(document.createTextNode(part));
            } else {
              const span = document.createElement('span');
              span.className = 'sr-w';
              span.textContent = part;
              frag.appendChild(span);
              words.push(span);
            }
          });
          child.replaceWith(frag);
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          if (child.matches(ATOMIC)) {
            if (child.tagName !== 'BR') {
              child.classList.add('sr-w');
              words.push(child);
            }
          } else {
            walk(child);
          }
        }
      }
    })(root);

    return words;
  }

  /* Group a block's words into visual lines by measuring where each one sits,
     then stagger by line rather than by word index. Every word on a line
     shares one offset, so the block wipes straight down instead of drifting
     diagonally across each line. Line breaks depend on layout, so this is
     recomputed whenever the text can rewrap. */
  function assignLines(unit) {
    const words = unit.querySelectorAll('.sr-w');
    if (!words.length) return;

    const lineOf = [];
    let lineTop = null;
    let line = -1;

    words.forEach(w => {
      const top = w.getBoundingClientRect().top;
      /* A new line starts once a word sits clearly below the current one.
         The tolerance absorbs baseline nudges, such as the timeline badges
         that are shifted up by a pixel. */
      if (lineTop === null || top > lineTop + 4) {
        line++;
        lineTop = top;
      }
      lineOf.push(line);
    });

    const lastLine = line;
    words.forEach((w, i) => {
      w.style.setProperty('--d', lastLine > 0 ? (lineOf[i] / lastLine).toFixed(3) : '0');
    });
  }

  const units = [];
  const textUnits = [];

  main.querySelectorAll(TEXT_UNITS).forEach(el => {
    el.classList.add('sr');
    splitWords(el);
    units.push(el);
    textUnits.push(el);
  });

  main.querySelectorAll(BLOCK_UNITS).forEach(el => {
    el.classList.add('sr', 'sr-block');
    units.push(el);
  });

  if (!units.length) return;

  /* Reveal window, as fractions of viewport height. A block starts fading in
     when its top passes ENTER_START and is fully revealed by ENTER_END. It
     fades back out as its bottom approaches the top of the screen, so the
     reverse is visible on screen rather than off it.
     The gap between the two enter values is deliberately narrow. A wide window
     means several blocks sit mid-fade at once and the page reads as one
     synchronised wash, so this is kept close to the spacing between blocks,
     letting each finish before the next starts in earnest. It stays a window
     rather than a trigger point, so the fade is still continuous. */
  const ENTER_START = 0.85;
  const ENTER_END   = 0.68;
  const EXIT_BAND   = 0.12;

  let ticking = false;

  function update() {
    ticking = false;
    const vh = window.innerHeight;
    const enterFrom = vh * ENTER_START;
    const enterTo   = vh * ENTER_END;
    const exitZone  = vh * EXIT_BAND;

    /* How far the page can still scroll. Blocks near the very bottom can never
       climb as high as enterTo, so their target is capped to the highest point
       they can actually reach, otherwise they would sit part-faded forever. */
    const scrollY   = window.scrollY;
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - vh);

    for (const el of units) {
      const rect = el.getBoundingClientRect();

      /* Skip anything far from the viewport, but pin its value first so it
         does not keep a stale mid-fade opacity when it comes back */
      if (rect.top > vh + 200) { el.style.setProperty('--p', '0'); continue; }
      if (rect.bottom < -200)  { el.style.setProperty('--p', '0'); continue; }

      const reachableTop = rect.top - (maxScroll - scrollY);
      const target = Math.max(enterTo, reachableTop);
      const span = enterFrom - target;

      const entering = span > 0 ? (enterFrom - rect.top) / span : 1;
      const leaving  = rect.bottom / exitZone;
      let p = Math.min(entering, leaving);
      p = p < 0 ? 0 : p > 1 ? 1 : p;

      el.style.setProperty('--p', p.toFixed(3));
    }
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  /* Re-measure lines in one batched pass, then repaint the opacities */
  function remeasure() {
    textUnits.forEach(assignLines);
    update();
  }

  let resizeTimer = null;
  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(remeasure, 120);
    onScroll();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize, { passive: true });

  /* Web fonts can rewrap the text after first paint, which would leave the
     line grouping measured against the fallback font */
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(remeasure);
  }
  window.addEventListener('load', remeasure, { once: true });

  remeasure();
});
