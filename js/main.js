/* ============================================
   Para mi Coneja - JavaScript Principal
   Hecho con ❤️ para Yaz
   ============================================ */

// =============================================
// MODO OSCURO / CLARO
// =============================================
function initDarkMode() {
  const toggles = document.querySelectorAll('.dark-toggle');
  const isDark = localStorage.getItem('conejita_dark') === 'true';
  if (isDark) document.body.classList.add('dark-mode');

  toggles.forEach(btn => {
    btn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    btn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const dark = document.body.classList.contains('dark-mode');
      localStorage.setItem('conejita_dark', dark);
      toggles.forEach(b => b.textContent = dark ? '☀️' : '🌙');
    });
  });
}

// =============================================
// MENÚ HAMBURGUESA
// =============================================
function initHamburger() {
  const ham = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (!ham || !navLinks) return;

  ham.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    ham.classList.toggle('active');
  });

  // Cerrar al hacer clic en un enlace
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// =============================================
// RESALTAR ENLACE ACTIVO
// =============================================
function highlightNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
}

// =============================================
// CORAZONES FLOTANTES DE FONDO
// =============================================
function initHeartsBackground() {
  const container = document.getElementById('hearts-bg');
  if (!container) return;

  const symbols = ['❤️', '💕', '💖', '💗', '💓', '💞', '💝', '🌹', '✨', '🐰'];
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

    // Reciclar
    setTimeout(() => {
      heart.remove();
      count--;
    }, (duration + delay) * 1000);
  }

  // Generar corazones periódicamente
  setInterval(spawnHeart, 600);
  // Lote inicial
  for (let i = 0; i < 10; i++) spawnHeart();
}

// =============================================
// 🎵 MÚSICA DE FONDO - ARCHIVO MP3
// =============================================
function initMusic() {
  const btn = document.getElementById('music-btn');
  
  // Crear el elemento de audio
  const audio = new Audio('music/m.mp3');
  audio.loop = true; // Reproducir en bucle
  audio.volume = 0.5; // Volumen al 50% (ajusta si quieres)
  
  let isPlaying = false;

  // Intentar reproducir automáticamente al cargar
  function tryAutoPlay() {
    audio.play().then(() => {
      isPlaying = true;
      if (btn) {
        btn.textContent = '⏸';
        btn.title = 'Pausar música';
      }
    }).catch(() => {
      // El navegador bloqueó la reproducción automática
      // El usuario tendrá que hacer clic en el botón
      if (btn) {
        btn.textContent = '🎵';
        btn.title = 'Reproducir música';
      }
    });
  }

  // Si hay botón, configurar evento
  if (btn) {
    btn.addEventListener('click', () => {
      if (isPlaying) {
        audio.pause();
        isPlaying = false;
        btn.textContent = '🎵';
        btn.title = 'Reproducir música';
      } else {
        audio.play().then(() => {
          isPlaying = true;
          btn.textContent = '⏸';
          btn.title = 'Pausar música';
        }).catch(err => {
          console.log('Error al reproducir:', err);
        });
      }
    });

    // Actualizar estado del botón cuando la música termina (por si acaso)
    audio.addEventListener('ended', () => {
      // Como está en loop, no debería terminar, pero por si acaso
      if (btn && isPlaying) {
        btn.textContent = '🎵';
        btn.title = 'Reproducir música';
        isPlaying = false;
      }
    });
  }

  // Intentar auto-reproducción después de un pequeño retraso
  // (algunos navegadores permiten auto-play después de la interacción del usuario)
  setTimeout(tryAutoPlay, 500);

  // También intentar cuando el usuario hace clic en cualquier parte (para navegadores)
  document.addEventListener('click', () => {
    if (!isPlaying && audio.paused) {
      audio.play().then(() => {
        isPlaying = true;
        if (btn) {
          btn.textContent = '⏸';
          btn.title = 'Pausar música';
        }
      }).catch(() => {});
    }
  }, { once: true }); // Solo una vez

  // Guardar referencia al audio por si se necesita
  window.__backgroundMusic = audio;
}

// =============================================
// AOS PERSONALIZADO (Animar al hacer scroll)
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
// SCROLL SUAVE
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
// EFECTO DE SCROLL EN LA NAVBAR
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
// UTILIDAD: COPIAR AL PORTAPAPELES
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

function showCopyToast(msg = '💕 ¡Copiado al portapapeles!') {
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
// INICIALIZAR TODO
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
