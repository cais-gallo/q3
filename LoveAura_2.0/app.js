// ===== LoveAura JavaScript - Shubham Narware =====
// Complete interactive functionality

// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initFloatingHearts();
  initCursor();
  initNavbar();
  initTyping();
  initScrollReveal();
  initCounterAnimation();
  initGallery();
  initQuiz();
  initGenerator();
  initMemories();
  initDiary();
  initRelationshipTimer();
  initEasterEgg();
  loadDiaryDate();
  renderMemories();
  renderDiaryEntries();
  addSVGDefs();
});

// ===== LOADER =====
function initLoader() {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }, 2500);
  document.body.style.overflow = 'hidden';
}

// ===== FLOATING HEARTS =====
function initFloatingHearts() {
  const container = document.getElementById('hearts-bg');
  const hearts = ['❤️','💕','💖','💗','💓','💞','🌸','✨','💝','🌹'];
  const count = 20;

  for (let i = 0; i < count; i++) {
    createFloatingHeart(container, hearts);
  }

  setInterval(() => {
    if (container.children.length < 30) {
      createFloatingHeart(container, hearts);
    }
  }, 1500);
}

function createFloatingHeart(container, hearts) {
  const heart = document.createElement('div');
  heart.className = 'floating-heart';
  heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
  heart.style.cssText = `
    left: ${Math.random() * 100}%;
    font-size: ${Math.random() * 20 + 10}px;
    animation-duration: ${Math.random() * 10 + 8}s;
    animation-delay: ${Math.random() * 5}s;
    opacity: 0;
  `;
  container.appendChild(heart);
  setTimeout(() => heart.remove(), 20000);
}

// ===== CUSTOM CURSOR =====
function initCursor() {
  const trail = document.getElementById('cursor-trail');
  let mx = 0, my = 0;
  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    trail.style.left = mx - 10 + 'px';
    trail.style.top = my - 10 + 'px';
  });

  // Click burst
  document.addEventListener('click', (e) => {
    for (let i = 0; i < 6; i++) {
      createClickHeart(e.clientX, e.clientY);
    }
  });
}

function createClickHeart(x, y) {
  const h = document.createElement('div');
  h.textContent = ['❤️','💖','✨','💕'][Math.floor(Math.random()*4)];
  h.style.cssText = `
    position: fixed;
    left: ${x}px; top: ${y}px;
    font-size: ${Math.random()*15+10}px;
    pointer-events: none;
    z-index: 9998;
    animation: clickHeart 0.8s ease forwards;
    transform: translate(-50%, -50%);
  `;
  document.body.appendChild(h);
  const angle = (Math.random() - 0.5) * 120;
  const dist = Math.random() * 80 + 40;
  h.animate([
    { opacity: 1, transform: `translate(-50%,-50%) scale(1)` },
    { opacity: 0, transform: `translate(calc(-50% + ${Math.sin(angle)*dist}px), calc(-50% - ${dist}px)) scale(0.3)` }
  ], { duration: 800, easing: 'ease-out' }).onfinish = () => h.remove();
}

// ===== NAVBAR =====
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    updateActiveNav();
  });

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.textContent = '☰';
    });
  });

  // Theme toggle
  document.getElementById('themeToggle').addEventListener('click', () => {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    document.getElementById('themeToggle').textContent = isDark ? '☀️' : '🌙';
  });

  // Music toggle (simulated)
  document.getElementById('musicToggle').addEventListener('click', () => {
    const btn = document.getElementById('musicToggle');
    btn.classList.toggle('playing');
    btn.textContent = btn.classList.contains('playing') ? '🔇' : '🎵';
    const panel = document.getElementById('moodPanel');
    panel.style.display = btn.classList.contains('playing') ? 'block' : 'none';
  });
}

function updateActiveNav() {
  const sections = document.querySelectorAll('.section');
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 200) current = s.id;
  });
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + current);
  });
}

// ===== SMOOTH SCROLL =====
window.scrollToSection = function(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

// ===== TYPING ANIMATION =====
function initTyping() {
  const el = document.getElementById('typingText');
  const words = [
    'Magic of Love ❤️',
    'LoveAura ✨',
    'Beauty of Romance 💕',
    'Warmth Within 🌹',
    'Forever Together 💑'
  ];
  let wi = 0, ci = 0, deleting = false;
  const cursor = document.createElement('span');
  cursor.className = 'typing-cursor';

  function type() {
    const word = words[wi];
    el.textContent = word.slice(0, ci);
    el.parentElement?.appendChild(cursor);

    if (!deleting) {
      ci++;
      if (ci > word.length) {
        deleting = true;
        setTimeout(type, 2000);
        return;
      }
    } else {
      ci--;
      if (ci === 0) {
        deleting = false;
        wi = (wi + 1) % words.length;
      }
    }
    setTimeout(type, deleting ? 60 : 100);
  }
  setTimeout(type, 1000);
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    observer.observe(el);
  });
}

// ===== COUNTER ANIMATION =====
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-num');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => obs.observe(c));
}

function animateCounter(el) {
  const target = +el.getAttribute('data-target');
  let count = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    count = Math.min(count + step, target);
    el.textContent = Math.floor(count) + (target > 100 ? '+' : '');
    if (count >= target) clearInterval(timer);
  }, 25);
}

// ===== GALLERY =====
const galleryData = [
  { emoji: '💏', caption: 'Two hearts, one soul' },
  { emoji: '🌹', caption: 'The rose of eternal love' },
  { emoji: '💍', caption: 'A promise forever' },
  { emoji: '🌅', caption: 'Sunrise of our story' },
  { emoji: '💑', caption: 'Together is our favorite place' },
  { emoji: '🕯️', caption: 'Candlelit romance' },
  { emoji: '🫶', caption: 'Heart in our hands' },
  { emoji: '🌙', caption: 'Moonlight memories' },
  { emoji: '✈️', caption: 'Adventures together' },
  { emoji: '🎆', caption: 'Celebrating our love' },
  { emoji: '☕', caption: 'Coffee and conversations' },
  { emoji: '🌈', caption: 'After every storm' },
];

let lbIndex = 0;

function initGallery() {
  const grid = document.getElementById('galleryGrid');
  galleryData.forEach((item, i) => {
    const div = document.createElement('div');
    div.className = 'gallery-item reveal';
    div.innerHTML = `
      <span>${item.emoji}</span>
      <div class="gallery-overlay">
        <span class="gallery-caption">${item.caption}</span>
      </div>
    `;
    div.addEventListener('click', () => openLightbox(i));
    grid.appendChild(div);
  });
}

function openLightbox(i) {
  lbIndex = i;
  updateLightbox();
  document.getElementById('lightbox').classList.add('open');
}

function updateLightbox() {
  document.getElementById('lbEmoji').textContent = galleryData[lbIndex].emoji;
  document.getElementById('lbCaption').textContent = galleryData[lbIndex].caption;
}

window.closeLightbox = () => document.getElementById('lightbox').classList.remove('open');
window.lbPrev = () => { lbIndex = (lbIndex - 1 + galleryData.length) % galleryData.length; updateLightbox(); };
window.lbNext = () => { lbIndex = (lbIndex + 1) % galleryData.length; updateLightbox(); };

// ===== QUIZ =====
const quizData = [
  { q: 'What makes you fall for someone first?', a: ['Their smile 😊', 'Their mind 🧠', 'Their laugh 😂', 'Their eyes 👀'], scores: [3,1,2,3] },
  { q: 'Your perfect date would be...', a: ['Candlelit dinner 🕯️', 'Adventure hike ⛰️', 'Movie marathon 🎬', 'Stargazing 🌟'], scores: [3,2,1,3] },
  { q: 'How do you show love best?', a: ['Words of affirmation 💬', 'Quality time ⏰', 'Physical touch 🤗', 'Thoughtful gifts 🎁'], scores: [2,3,3,2] },
  { q: 'A perfect Sunday with your partner...', a: ['Breakfast in bed ☕', 'Long walks 🚶', 'Cooking together 👨‍🍳', 'Reading together 📚'], scores: [3,2,2,1] },
  { q: 'Love song or love letter?', a: ['Song 🎵', 'Letter 📝', 'Both 💕', 'Neither - actions speak'], scores: [2,3,3,1] },
  { q: 'Distance makes your heart...', a: ['Grow fonder 💖', 'Anxious 😰', 'Creative 🎨', 'Stronger 💪'], scores: [3,1,2,3] },
  { q: 'You believe love is...', a: ['A feeling 💓', 'A choice ✅', 'An adventure 🚀', 'A partnership 🤝'], scores: [2,3,3,3] },
  { q: 'Your love language is...', a: ['Touch 🤗', 'Words 💬', 'Time ⏰', 'Acts of service 🌟'], scores: [3,2,3,2] },
];

let qIndex = 0, totalScore = 0;
let quizAnswered = false;

window.startQuiz = function() {
  qIndex = 0; totalScore = 0;
  showScreen('quizQuestion');
  showQuestion();
};

function showQuestion() {
  quizAnswered = false;
  const q = quizData[qIndex];
  document.getElementById('quizProgress').style.width = ((qIndex / quizData.length) * 100) + '%';
  document.getElementById('quizCount').textContent = `${qIndex + 1}/${quizData.length}`;
  document.getElementById('questionText').textContent = q.q;

  const grid = document.getElementById('answersGrid');
  grid.innerHTML = '';
  q.a.forEach((ans, i) => {
    const btn = document.createElement('button');
    btn.className = 'answer-btn';
    btn.textContent = ans;
    btn.addEventListener('click', () => {
      if (quizAnswered) return;
      quizAnswered = true;
      grid.querySelectorAll('.answer-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      totalScore += q.scores[i];
      setTimeout(() => {
        qIndex++;
        if (qIndex < quizData.length) showQuestion();
        else showResult();
      }, 600);
    });
    grid.appendChild(btn);
  });
}

function showResult() {
  const maxScore = quizData.length * 3;
  const pct = Math.round((totalScore / maxScore) * 100);
  let title, desc, emoji;

  if (pct >= 80) { emoji = '💖'; title = 'Hopeless Romantic!'; desc = 'You love deeply and passionately. Your heart is your greatest treasure and you share it generously.'; }
  else if (pct >= 60) { emoji = '💑'; title = 'The True Partner!'; desc = 'You value genuine connection and commitment. Your love is steady, warm, and real.'; }
  else if (pct >= 40) { emoji = '💕'; title = 'The Adventurous Lover!'; desc = 'You believe love should be fun, exciting, and spontaneous. Every day is a new story with you.'; }
  else { emoji = '💙'; title = 'The Independent Soul!'; desc = 'You love on your own terms — quietly, thoughtfully, and profoundly. Your love is rare and precious.'; }

  document.getElementById('resultEmoji').textContent = emoji;
  document.getElementById('resultTitle').textContent = title;
  document.getElementById('resultDesc').textContent = desc;
  document.getElementById('resultScore').textContent = `Love Score: ${pct}%`;
  showScreen('quizResult');
}

function showScreen(id) {
  document.querySelectorAll('.quiz-screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

window.resetQuiz = () => showScreen('quizStart');

// ===== GENERATOR =====
const genContent = {
  messages: [
    "Every time I look at you, I fall in love all over again. You are my forever and always. 💖",
    "In a world full of chaos, loving you is the only thing that makes perfect sense. 🌹",
    "You are not just my love — you are my home, my peace, my beginning and end. ❤️",
    "With you, every ordinary moment becomes an extraordinary memory worth treasuring. 💕",
    "My heart knew it had found its person the very moment our eyes met. 💑",
    "You are the poem I never knew how to write and the song I never knew how to sing. 🎵",
    "If loving you is wrong, I never want to be right. You are my favorite mistake. 😍",
    "Some things in this world are impossible to explain — and falling for you is one of them. ✨",
    "You are the reason my heart smiles even when my face forgets to. 💫",
    "I would choose you in a hundred lifetimes, in a hundred worlds, in any version of reality. 💝",
  ],
  shayari: [
    "Tere bina zindagi se koi shikwa to nahin,\nTere bina zindagi bhi lekin zindagi to nahin. 💔",
    "Mohabbat karte karte umr guzar jaayegi,\nFir bhi dil ka ye armaan adhura hi rahega. 🌹",
    "Teri aankhon mein jo gehraai hai,\nMaine wahin apni duniya basaai hai. 💖",
    "Tu mera aasman, tu mera zameen,\nBas teri zaroorat hai mujhe din aur raat. 🌙",
    "Ishq ne seekhaya hai mujhe jeena,\nTujhse milke hua hai dil ka chain. ❤️",
    "Har saans mein teri khusboo hai,\nHar dil ki dhadkan tujhe hi PocoIta hai. 💕",
    "Yeh mohabbat ka qissa hai anokha,\nTujhe dekh kar dil ne mana hai Deepa. 🌸",
    "Teri muskaan mera junoon hai,\nTeri zulfon mein hi mera sukoon hai. 💫",
  ],
  pickup: [
    "Do you believe in love at first scroll? Because I've been scrolling through my feelings and they all lead to you. 😏",
    "Are you a keyboard? Because you're exactly my type. ⌨️💕",
    "If you were a song, you'd be the one I replay on infinite loop. 🎵",
    "My GPS must be broken — it keeps directing me straight to your heart. 💖",
    "Are you made of copper and tellurium? Because you're CuTe. 🧪",
    "I'd never play hide and seek with you — because someone like you is impossible to find. 🥹",
    "If being beautiful was a crime, you'd be serving a life sentence. 😍",
    "Do you have a Band-Aid? Because I scraped my knee falling for you. 🩹",
    "I was wondering if you're an artist — because you drew a smile on my face. 🎨",
    "Your eyes are like a sunset — absolutely breathtaking and impossible to look away from. 🌅",
  ]
};

let currentTab = 'messages';

window.switchTab = function(tab, btn) {
  currentTab = tab;
  document.querySelectorAll('.gen-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  generateContent();
};

window.generateContent = function() {
  const items = genContent[currentTab];
  const item = items[Math.floor(Math.random() * items.length)];
  const el = document.getElementById('genText');
  el.style.opacity = 0;
  setTimeout(() => {
    el.textContent = item;
    el.style.transition = 'opacity 0.5s ease';
    el.style.opacity = 1;
  }, 200);
};

window.copyContent = function() {
  const text = document.getElementById('genText').textContent;
  navigator.clipboard.writeText(text).then(() => {
    const s = document.getElementById('copySuccess');
    s.classList.remove('hidden');
    setTimeout(() => s.classList.add('hidden'), 2000);
  });
};

window.shareContent = function() {
  const text = document.getElementById('genText').textContent;
  if (navigator.share) {
    navigator.share({ title: 'LoveAura ❤️', text: text });
  } else {
    window.copyContent();
  }
};

// Initialize generator
generateContent();

// ===== LOVE CALCULATOR =====
window.calculateLove = function() {
  const n1 = document.getElementById('name1').value.trim();
  const n2 = document.getElementById('name2').value.trim();
  if (!n1 || !n2) {
    alert('Please enter both names! 💕');
    return;
  }

  // Deterministic but fun algorithm
  let hash = 0;
  const combined = (n1 + n2).toLowerCase();
  for (let c of combined) hash = ((hash << 5) - hash) + c.charCodeAt(0);
  const pct = Math.abs(hash % 41) + 60; // 60-100%

  const result = document.getElementById('calcResult');
  result.classList.remove('hidden');

  // Animate percentage
  let cur = 0;
  const timer = setInterval(() => {
    cur = Math.min(cur + 2, pct);
    document.getElementById('lovePercent').textContent = cur + '%';
    // Circle progress
    const circumference = 314;
    const offset = circumference - (cur / 100) * circumference;
    document.getElementById('circleProgress').style.strokeDashoffset = offset;
    if (cur >= pct) clearInterval(timer);
  }, 30);

  let msg, emoji;
  if (pct >= 90) { msg = `${n1} & ${n2} are a match made in heaven! 💒`; emoji = '💕💕💕'; }
  else if (pct >= 80) { msg = `${n1} & ${n2} — a beautiful love story! 🌹`; emoji = '💖💖'; }
  else if (pct >= 70) { msg = `${n1} & ${n2} have great potential together! 💑`; emoji = '❤️'; }
  else { msg = `${n1} & ${n2} — love is a beautiful journey! 💫`; emoji = '💕'; }

  document.getElementById('calcMessage').textContent = msg;
  document.getElementById('calcEmoji').textContent = emoji;
};

// ===== MEMORIES =====
function initMemories() {}

window.addMemory = function() {
  const title = document.getElementById('memTitle').value.trim();
  const date = document.getElementById('memDate').value;
  const desc = document.getElementById('memDesc').value.trim();
  const emoji = document.getElementById('memEmoji').value;

  if (!title || !date) { alert('Please enter a title and date! 💕'); return; }

  const memories = getMemories();
  memories.unshift({ id: Date.now(), title, date, desc, emoji });
  saveMemories(memories);
  renderMemories();

  document.getElementById('memTitle').value = '';
  document.getElementById('memDate').value = '';
  document.getElementById('memDesc').value = '';
};

function getMemories() {
  return JSON.parse(localStorage.getItem('loveaura_memories') || '[]');
}
function saveMemories(m) {
  localStorage.setItem('loveaura_memories', JSON.stringify(m));
}

function renderMemories() {
  const list = document.getElementById('memoriesList');
  const memories = getMemories();
  list.innerHTML = '';

  if (!memories.length) {
    list.innerHTML = '<p style="text-align:center; color: var(--text-muted); padding: 2rem;">No memories yet. Add your first special moment! 💕</p>';
    return;
  }

  memories.forEach(m => {
    const div = document.createElement('div');
    div.className = 'memory-item';
    const countdown = getCountdown(m.date);
    div.innerHTML = `
      <div class="memory-emoji">${m.emoji}</div>
      <div class="memory-info">
        <div class="memory-title">${m.title}</div>
        <div class="memory-date">📅 ${formatDate(m.date)}</div>
        ${m.desc ? `<div class="memory-desc">${m.desc}</div>` : ''}
        <div class="memory-countdown">${countdown}</div>
      </div>
      <button class="memory-del" onclick="deleteMemory(${m.id})">🗑️</button>
    `;
    list.appendChild(div);
  });
}

window.deleteMemory = function(id) {
  const memories = getMemories().filter(m => m.id !== id);
  saveMemories(memories);
  renderMemories();
};

function getCountdown(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = date - now;
  if (diff < 0) {
    const days = Math.floor(-diff / 86400000);
    return `⏰ ${days} days ago`;
  } else {
    const days = Math.floor(diff / 86400000);
    return `⏳ In ${days} days`;
  }
}

function formatDate(str) {
  return new Date(str).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

// ===== RELATIONSHIP TIMER =====
function initRelationshipTimer() {
  const saved = localStorage.getItem('loveaura_startdate');
  if (saved) {
    document.getElementById('loveStartDate').value = saved;
    updateRelTimer();
  }
  setInterval(updateRelTimer, 1000);
}

window.updateRelTimer = function() {
  const val = document.getElementById('loveStartDate').value;
  if (!val) return;
  localStorage.setItem('loveaura_startdate', val);

  const start = new Date(val);
  const now = new Date();
  const diff = now - start;

  if (diff < 0) {
    document.getElementById('relMessage').textContent = 'That date is in the future! ❤️';
    return;
  }

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);

  document.getElementById('rtDays').textContent = days;
  document.getElementById('rtHours').textContent = hours;
  document.getElementById('rtMins').textContent = mins;
  document.getElementById('rtSecs').textContent = secs;

  const messages = [
    `You've been in love for ${days} beautiful days! ❤️`,
    `${days} days of choosing each other, every single day! 💑`,
    `${days} days and counting — your love story continues! 🌹`,
    `Together for ${days} magical days. Every day is a gift! 💖`
  ];
  document.getElementById('relMessage').textContent = messages[Math.floor(days % messages.length)];
};

// ===== SECRET LETTER =====
window.unlockLetter = function() {
  const pass = document.getElementById('secretPassword').value;
  const correct = 'shubham';

  if (pass.toLowerCase() === correct) {
    document.getElementById('secretLock').classList.add('hidden');
    document.getElementById('secretLetter').classList.remove('hidden');
    document.getElementById('wrongPass').classList.add('hidden');
    createHeartBurst();
  } else {
    document.getElementById('wrongPass').classList.remove('hidden');
    document.getElementById('secretPassword').style.borderColor = '#ff4444';
    setTimeout(() => {
      document.getElementById('secretPassword').style.borderColor = '';
    }, 1000);
  }
};

window.lockLetter = function() {
  document.getElementById('secretLock').classList.remove('hidden');
  document.getElementById('secretLetter').classList.add('hidden');
  document.getElementById('secretPassword').value = '';
};

// ===== VIRTUAL GIFTS =====
window.sendGift = function(el, emoji, message) {
  // Burst effect
  const burst = document.getElementById('giftBurst');
  burst.textContent = emoji;
  burst.classList.remove('hidden');
  burst.animate([
    { opacity: 0, transform: 'scale(0.5)' },
    { opacity: 1, transform: 'scale(2)' },
    { opacity: 0, transform: 'scale(3)' }
  ], { duration: 1000 }).onfinish = () => burst.classList.add('hidden');

  // Toast
  const toast = document.getElementById('giftToast');
  toast.textContent = `${emoji} ${message}`;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 3000);

  // Gift item animation
  el.style.animation = 'none';
  el.offsetHeight;
  el.style.animation = 'heartbeat 0.3s ease 3';
};

// ===== MOOD MUSIC =====
const moodLabels = {
  romantic: 'Romantic Vibes 💕',
  happy: 'Happy Melodies ❤️',
  sad: 'Melancholy Notes 💔'
};

window.setMood = function(mood) {
  document.querySelectorAll('.mood-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.mood === mood);
  });
  document.getElementById('moodNow').textContent = moodLabels[mood];
};

// ===== DIARY =====
let diaryMood = '😊';

function loadDiaryDate() {
  document.getElementById('diaryDate').value = new Date().toISOString().split('T')[0];
}

window.setDiaryMood = function(el, mood) {
  diaryMood = mood;
  document.querySelectorAll('.mood-emoji').forEach(e => e.classList.remove('selected'));
  el.classList.add('selected');
};

window.saveDiaryEntry = function() {
  const title = document.getElementById('diaryTitle').value.trim();
  const entry = document.getElementById('diaryEntry').value.trim();
  const date = document.getElementById('diaryDate').value;

  if (!title || !entry) { alert('Please write a title and entry! 💕'); return; }

  const entries = getDiaryEntries();
  entries.unshift({ id: Date.now(), title, entry, date, mood: diaryMood });
  saveDiaryEntries(entries);
  renderDiaryEntries();

  document.getElementById('diaryTitle').value = '';
  document.getElementById('diaryEntry').value = '';
  diaryMood = '😊';
  document.querySelectorAll('.mood-emoji').forEach(e => e.classList.remove('selected'));
};

function getDiaryEntries() {
  return JSON.parse(localStorage.getItem('loveaura_diary') || '[]');
}
function saveDiaryEntries(e) {
  localStorage.setItem('loveaura_diary', JSON.stringify(e));
}

function renderDiaryEntries() {
  const container = document.getElementById('diaryEntries');
  const entries = getDiaryEntries();
  container.innerHTML = '';

  if (!entries.length) {
    container.innerHTML = '<p style="text-align:center; color: var(--text-muted); padding: 2rem; font-family: Dancing Script, cursive; font-size: 1.3rem;">Your diary is waiting for your first story... 📖</p>';
    return;
  }

  entries.forEach(e => {
    const div = document.createElement('div');
    div.className = 'diary-entry-card';
    div.innerHTML = `
      <div class="entry-header">
        <span class="entry-title">${e.mood} ${e.title}</span>
        <div style="display:flex; gap:0.5rem; align-items:center">
          <span class="entry-mood-date">${formatDate(e.date)}</span>
          <button class="entry-del" onclick="deleteDiaryEntry(${e.id})">🗑️</button>
        </div>
      </div>
      <p class="entry-preview">${e.entry.slice(0, 120)}${e.entry.length > 120 ? '...' : ''}</p>
    `;
    container.appendChild(div);
  });
}

window.deleteDiaryEntry = function(id) {
  const entries = getDiaryEntries().filter(e => e.id !== id);
  saveDiaryEntries(entries);
  renderDiaryEntries();
};

// ===== CONTACT FORM =====
window.submitContact = function() {
  const name = document.getElementById('contactName').value.trim();
  const email = document.getElementById('contactEmail').value.trim();
  const msg = document.getElementById('contactMsg').value.trim();

  if (!name || !email || !msg) { alert('Please fill all fields! 💕'); return; }
  if (!/\S+@\S+\.\S+/.test(email)) { alert('Please enter a valid email! 📧'); return; }

  document.querySelector('.contact-form .form-group').style.display = 'none';
  document.querySelectorAll('.contact-form .form-group').forEach(g => g.style.display = 'none');
  document.querySelector('.contact-form button').style.display = 'none';
  document.getElementById('contactSuccess').classList.remove('hidden');
  createHeartBurst();
};

// ===== EASTER EGG =====
let footerClicks = 0;

function initEasterEgg() {
  document.querySelector('.footer-logo').addEventListener('click', () => {
    footerClicks++;
    if (footerClicks >= 7) {
      footerClicks = 0;
      document.getElementById('easterEgg').classList.remove('hidden');
    }
  });
}

window.closeEasterEgg = () => document.getElementById('easterEgg').classList.add('hidden');

// Konami-like secret
let keySequence = [];
const secretCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight'];
document.addEventListener('keydown', (e) => {
  keySequence.push(e.key);
  keySequence = keySequence.slice(-8);
  if (JSON.stringify(keySequence) === JSON.stringify(secretCode)) {
    document.getElementById('easterEgg').classList.remove('hidden');
  }
});

// ===== HEART BURST =====
function createHeartBurst() {
  const hearts = ['❤️','💖','💕','💗','✨','🌹','💝','🌸'];
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const h = document.createElement('div');
      h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      h.style.cssText = `
        position: fixed;
        left: ${Math.random() * window.innerWidth}px;
        top: ${Math.random() * window.innerHeight}px;
        font-size: ${Math.random() * 30 + 15}px;
        pointer-events: none;
        z-index: 9999;
      `;
      document.body.appendChild(h);
      h.animate([
        { opacity: 1, transform: 'translateY(0) scale(1)' },
        { opacity: 0, transform: `translateY(-${Math.random()*100+50}px) scale(0.3)` }
      ], { duration: 1500, easing: 'ease-out' }).onfinish = () => h.remove();
    }, i * 80);
  }
}

// ===== SVG GRADIENT =====
function addSVGDefs() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '0'); svg.setAttribute('height', '0');
  svg.style.position = 'absolute';
  svg.innerHTML = `<defs>
    <linearGradient id="loveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#ff4d6d"/>
      <stop offset="100%" style="stop-color:#ff8fa3"/>
    </linearGradient>
  </defs>`;
  document.body.appendChild(svg);
}

// ===== FOOTER HEARTS =====
window.addEventListener('load', () => {
  const fh = document.getElementById('footerHearts');
  if (!fh) return;
  for (let i = 0; i < 8; i++) {
    const h = document.createElement('span');
    h.textContent = ['❤️','💕','🌹','✨'][i % 4];
    h.style.cssText = `
      position: absolute;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      font-size: ${Math.random() * 20 + 10}px;
      opacity: 0.15;
      animation: float ${Math.random() * 3 + 2}s ease infinite;
      animation-delay: ${Math.random() * 2}s;
    `;
    fh.appendChild(h);
  }
});

// ===== GALLERY SCROLL REVEAL =====
window.addEventListener('scroll', () => {
  document.querySelectorAll('.gallery-item').forEach((el, i) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      setTimeout(() => el.style.opacity = '1', i * 50);
    }
  });
});

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const hero = document.querySelector('.hero-visual');
  if (hero) {
    hero.style.transform = `translateY(${scrollY * 0.1}px)`;
  }
});

// ===== INIT GENERATOR on page load =====
window.addEventListener('load', () => {
  generateContent();
  renderMemories();
  renderDiaryEntries();
  initRelationshipTimer();
});

console.log('%c❤️ LoveAura by Shubham Narware ❤️', 'color: #ff4d6d; font-size: 20px; font-weight: bold; font-family: cursive;');
console.log('%cBuilt with every heartbeat 💖', 'color: #ff8fa3; font-size: 14px;');
