/* ============================================
   LoveAura - Main JavaScript
   Author: Created with ❤️ by Shubham
   ============================================ */

// =============================================
// DARK MODE TOGGLE
// =============================================
function initDarkMode() {
  const toggles = document.querySelectorAll('.dark-toggle');
  const isDark = localStorage.getItem('loveaura_dark') === 'true';
  if (isDark) document.body.classList.add('dark-mode');

  toggles.forEach(btn => {
    btn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    btn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const dark = document.body.classList.contains('dark-mode');
      localStorage.setItem('loveaura_dark', dark);
      toggles.forEach(b => b.textContent = dark ? '☀️' : '🌙');
    });
  });
}

// =============================================
// HAMBURGER MENU
// =============================================
function initHamburger() {
  const ham = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (!ham || !navLinks) return;

  ham.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = ham.querySelectorAll('span');
    ham.classList.toggle('active');
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// =============================================
// HIGHLIGHT ACTIVE NAV LINK
// =============================================
function highlightNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
}

// =============================================
// FLOATING HEARTS BACKGROUND
// =============================================
function initHeartsBackground() {
  const container = document.getElementById('hearts-bg');
  if (!container) return;

  const symbols = ['❤️', '💕', '💖', '💗', '💓', '💞', '💝', '🌹', '✨'];
  let count = 0;

  function spawnHeart() {
    if (count >= 22) return;
    const heart = document.createElement('div');
    heart.className = 'heart-particle';
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    const size = 0.8 + Math.random() * 1.4;
    const left = Math.random() * 100;
    const duration = 8 + Math.random() * 12;
    const delay = Math.random() * 3;

    heart.style.cssText = `
      left: ${left}%;
      font-size: ${size}rem;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `;

    container.appendChild(heart);
    count++;

    // Recycle
    setTimeout(() => {
      heart.remove();
      count--;
    }, (duration + delay) * 1000);
  }

  // Spawn hearts periodically
  setInterval(spawnHeart, 600);
  // Initial batch
  for (let i = 0; i < 10; i++) spawnHeart();
}

// =============================================
// BACKGROUND MUSIC
// =============================================
function initMusic() {
  const btn = document.getElementById('music-btn');
  if (!btn) return;

  // Create audio context for gentle piano-like tones using Web Audio API
  let audioCtx = null;
  let isPlaying = false;
  let intervalId = null;

  // Simple melody notes (frequencies in Hz)
  const melody = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];

  function playNote(freq, when, duration) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, when);
    gainNode.gain.setValueAtTime(0, when);
    gainNode.gain.linearRampToValueAtTime(0.04, when + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, when + duration);
    osc.start(when);
    osc.stop(when + duration + 0.1);
  }

  function playMelody() {
    if (!audioCtx) return;
    let noteIndex = 0;
    intervalId = setInterval(() => {
      if (!isPlaying) return;
      const now = audioCtx.currentTime;
      // Play a note + harmony
      playNote(melody[noteIndex % melody.length], now, 1.2);
      playNote(melody[noteIndex % melody.length] * 1.5, now, 1.0);
      noteIndex++;
    }, 1200);
  }

  btn.addEventListener('click', () => {
    if (!isPlaying) {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      isPlaying = true;
      btn.textContent = '⏸';
      btn.title = 'Pause Music';
      playMelody();
    } else {
      isPlaying = false;
      btn.textContent = '🎵';
      btn.title = 'Play Music';
      clearInterval(intervalId);
    }
  });
}

// =============================================
// CUSTOM AOS (Animate On Scroll)
// =============================================
function initAOS() {
  const elements = document.querySelectorAll('[data-aos]');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}

// =============================================
// SMOOTH SCROLL
// =============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// =============================================
// NAVBAR SCROLL EFFECT
// =============================================
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 4px 30px rgba(255,77,109,0.15)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });
}

// =============================================
// COPY TO CLIPBOARD UTILITY
// =============================================
function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  } else {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    el.remove();
  }
}

function showCopyToast(msg = '💕 Copied to clipboard!') {
  let toast = document.querySelector('.copy-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'copy-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// =============================================
// INIT ALL
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initHamburger();
  highlightNav();
  initHeartsBackground();
  initMusic();
  initAOS();
  initSmoothScroll();
  initNavbarScroll();
});
