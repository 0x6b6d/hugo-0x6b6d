// 0x6b6d theme — main.js

(function () {
  'use strict';

  // ── Reading progress bar ──────────────────────────────────
  const progressBar = document.querySelector('.progress-bar');
  if (progressBar) {
    function updateProgress() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = pct + '%';
    }
    window.addEventListener('scroll', updateProgress, { passive: true });
  }

  // ── Scroll-to-top button ──────────────────────────────────
  const scrollBtn = document.querySelector('.scroll-top');
  if (scrollBtn) {
    window.addEventListener('scroll', function () {
      scrollBtn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    scrollBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Active nav link ───────────────────────────────────────
  const currentPath = window.location.pathname;
  document.querySelectorAll('.site-nav a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href && href !== '/' && currentPath.startsWith(href)) {
      link.classList.add('active');
    } else if (href === '/' && (currentPath === '/' || currentPath === '')) {
      link.classList.add('active');
    }
  });


  // ── Hamburger menu ────────────────────────────────────────
  const navToggle = document.getElementById('nav-toggle');
  const siteNav   = document.getElementById('site-nav');
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      const isOpen = siteNav.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
    });
    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !siteNav.contains(e.target)) {
        siteNav.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
    // Close when a nav link is tapped
    siteNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        siteNav.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ── Stagger post card animations ─────────────────────────
  document.querySelectorAll('.post-card').forEach(function (card, i) {
    card.style.animationDelay = (i * 0.07) + 's';
  });

  // ── Glitch title (single post pages) ─────────────────────
  const glitchEl = document.getElementById('glitch-title');
  if (glitchEl) {
    const target = glitchEl.dataset.text || glitchEl.textContent;
    const chars  = '!<>-_\\/[]{}—=+*^?#________';
    let frame = 0, done = false;

    function decrypt() {
      let out = '';
      let resolved = 0;
      for (let i = 0; i < target.length; i++) {
        if (frame > i * 2.5) {
          out += target[i];
          resolved++;
        } else {
          out += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      glitchEl.textContent = out;
      if (resolved < target.length) {
        frame++;
        setTimeout(function () { requestAnimationFrame(decrypt); }, 30);
      } else {
        done = true;
        glitchEl.textContent = target;
        scheduleGlitch();
      }
    }

    function glitch() {
      if (!done) return;
      const arr = target.split('');
      const count = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < count; i++) {
        const idx = Math.floor(Math.random() * arr.length);
        arr[idx] = chars[Math.floor(Math.random() * chars.length)];
      }
      glitchEl.textContent = arr.join('');
      setTimeout(function () { glitchEl.textContent = target; }, 80 + Math.random() * 120);
    }

    function scheduleGlitch() {
      setInterval(function () {
        if (Math.random() > 0.82) glitch();
      }, 600);
    }

    // Only animate if user doesn't prefer reduced motion
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      glitchEl.textContent = '';
      requestAnimationFrame(decrypt);
    }
  }

  // ── Copy code buttons ─────────────────────────────────────
  document.querySelectorAll('.post-content pre').forEach(function (pre) {
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = 'copy';
    btn.setAttribute('aria-label', 'Copy code');
    pre.style.position = 'relative';
    pre.appendChild(btn);

    btn.addEventListener('click', function () {
      const code = pre.querySelector('code');
      const text = code ? code.textContent : pre.textContent.replace('copy', '').trim();
      navigator.clipboard.writeText(text).then(function () {
        btn.textContent = 'copied!';
        btn.classList.add('copied');
        setTimeout(function () {
          btn.textContent = 'copy';
          btn.classList.remove('copied');
        }, 2000);
      });
    });
  });

})();
