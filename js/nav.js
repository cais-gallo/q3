/* ============================================
   Para mi Coneja - Navegación (nav.js)
   ============================================ */

const NAV_HTML = `
<nav class="navbar">
  <a href="index.html" class="navbar-logo">
    <span>🐰</span> Coneja
  </a>
  <ul class="nav-links">
    <li><a href="index.html">Inicio</a></li>
    <li><a href="about.html">Sobre Nosotros</a></li>
    <li><a href="gallery.html">Galería</a></li>
    <li><a href="quiz.html">Quiz</a></li>
    <li><a href="love.html">Generador</a></li>
    <li><a href="calculator.html">Calculadora</a></li>
    <li><a href="memory.html">Recuerdos</a></li>
    <li><a href="contact.html">Para mi Coneja</a></li>
    <li><a href="secret.html">🔐 Secreto</a></li>
  </ul>
  <div class="nav-right">
    <button class="dark-toggle" title="Cambiar tema">🌙</button>
    <button class="music-btn" id="music-btn" title="Reproducir música">🎵</button>
    <button class="hamburger" aria-label="Menú">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>
<div id="hearts-bg"></div>
`;

// Inyectar la navegación en cada página
document.addEventListener('DOMContentLoaded', () => {
  const placeholder = document.getElementById('nav-placeholder');
  if (placeholder) placeholder.outerHTML = NAV_HTML;
});
