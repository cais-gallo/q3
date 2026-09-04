/* ============================================
   LoveAura - Nav Template (injected by nav.js)
   ============================================ */

const NAV_HTML = `
<nav class="navbar">
  <a href="index.html" class="navbar-logo">
    <span>💖</span> LoveAura
  </a>
  <ul class="nav-links">
    <li><a href="index.html">Home</a></li>
    <li><a href="about.html">About</a></li>
    <li><a href="gallery.html">Gallery</a></li>
    <li><a href="quiz.html">Love Quiz</a></li>
    <li><a href="love.html">Generator</a></li>
    <li><a href="calculator.html">Calculator</a></li>
    <li><a href="memory.html">Memories</a></li>
    <li><a href="contact.html">Contact</a></li>
    <li><a href="secret.html">🔐 Secret</a></li>
  </ul>
  <div class="nav-right">
    <button class="dark-toggle" title="Toggle Dark Mode">🌙</button>
    <button class="music-btn" id="music-btn" title="Play Music">🎵</button>
    <button class="hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>
<div id="hearts-bg"></div>
`;

// Inject nav into every page
document.addEventListener('DOMContentLoaded', () => {
  const placeholder = document.getElementById('nav-placeholder');
  if (placeholder) placeholder.outerHTML = NAV_HTML;
});
