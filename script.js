/* ============================================================
   SCRIPT.JS — Personal Portfolio (Arya Pratama)
   ============================================================ */

'use strict';

// ─── DATA ────────────────────────────────────────────────────
const SKILLS = {
  frontend: [
    { name: '⚛️ React / Next.js',   pct: 92 },
    { name: '🟨 JavaScript / ES2024', pct: 95 },
    { name: '🔷 TypeScript',          pct: 88 },
    { name: '🎨 CSS / Tailwind',      pct: 90 },
    { name: '🌐 HTML5 / Semantic',    pct: 97 },
    { name: '🏗️ Vue.js',              pct: 72 },
  ],
  backend: [
    { name: '🟢 Node.js / Express',  pct: 90 },
    { name: '🐍 Python / FastAPI',   pct: 80 },
    { name: '🐘 PostgreSQL',         pct: 84 },
    { name: '🍃 MongoDB',            pct: 78 },
    { name: '🔴 Redis',              pct: 70 },
    { name: '🦫 Go (Golang)',        pct: 60 },
  ],
  tools: [
    { name: '🐳 Docker / K8s',       pct: 78 },
    { name: '🔁 CI/CD (GH Actions)', pct: 82 },
    { name: '☁️ AWS / GCP',          pct: 74 },
    { name: '🧪 Jest / Vitest',      pct: 85 },
    { name: '📦 Git / Monorepo',     pct: 92 },
    { name: '🎭 Figma / Design',     pct: 68 },
  ]
};

const PROJECTS = [
  {
    id: 1, category: 'web',
    title: 'FinTrack Dashboard',
    desc: 'Aplikasi dashboard keuangan real-time dengan visualisasi data interaktif menggunakan React, D3.js, dan Node.js.',
    tags: ['React', 'D3.js', 'Node', 'PostgreSQL'],
    color1: '#32ADD2', color2: '#5DA4C4',
    demo: '#', code: '#'
  },
  {
    id: 2, category: 'mobile',
    title: 'TaskFlow Mobile',
    desc: 'Aplikasi manajemen tugas lintas platform dengan sinkronisasi offline-first menggunakan React Native.',
    tags: ['React Native', 'Redux', 'SQLite'],
    color1: '#C74D5D', color2: '#47AFD0',
    demo: '#', code: '#'
  },
  {
    id: 3, category: 'api',
    title: 'AuthGuard API',
    desc: 'Microservice autentikasi yang scalable dengan JWT, OAuth2, dan rate limiting. Mendukung >10k req/detik.',
    tags: ['Node.js', 'Redis', 'Docker', 'JWT'],
    color1: '#47AFD0', color2: '#838671',
    demo: '#', code: '#'
  },
  {
    id: 4, category: 'web',
    title: 'ShopNow E-Commerce',
    desc: 'Platform e-commerce full-stack dengan sistem pembayaran terintegrasi, manajemen stok, dan panel admin.',
    tags: ['Next.js', 'Stripe', 'MongoDB'],
    color1: '#5DA4C4', color2: '#32ADD2',
    demo: '#', code: '#'
  },
  {
    id: 5, category: 'api',
    title: 'NotifyHub',
    desc: 'Platform notifikasi multi-channel (email, SMS, push) dengan templating dinamis dan analytics.',
    tags: ['Go', 'Kafka', 'PostgreSQL'],
    color1: '#838671', color2: '#5DA4C4',
    demo: '#', code: '#'
  },
  {
    id: 6, category: 'web',
    title: 'DevBlog CMS',
    desc: 'CMS headless untuk developer dengan Markdown support, syntax highlighting, dan SEO otomatis.',
    tags: ['Next.js', 'MDX', 'Prisma', 'Vercel'],
    color1: '#C74D5D', color2: '#47AFD0',
    demo: '#', code: '#'
  },
];

const CODE_LINES = [
  '// portfolio.js',
  '',
  'const developer = {',
  '  name: "Arya Pratama",',
  '  role: "Full-Stack Developer",',
  '  stack: ["React", "Node", "Go"],',
  '  passion: "Building great UX",',
  '',
  '  code() {',
  '    while (true) {',
  '      this.learn();',
  '      this.build();',
  '      this.ship(); ✨',
  '    }',
  '  }',
  '};',
  '',
  'developer.code();',
];

const ROLES = [
  'Full-Stack Developer',
  'UI/UX Enthusiast',
  'Open Source Contributor',
  'Problem Solver',
];

// ─── DOM READY ────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initCursor();
  initNavbar();
  initHamburger();
  initTypingGreeting();
  initRoleTyper();
  initCodeTyper();
  initReveal();
  initCounters();
  initSkills('frontend');
  initSkillTabs();
  initPortfolio();
  initPortfolioFilter();
  initContactForm();
  initSmoothScroll();
});

// ─── 1. PARTICLE CANVAS ──────────────────────────────────────
function initParticles() {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.r  = Math.random() * 1.8 + .4;
      this.vx = (Math.random() - .5) * .3;
      this.vy = (Math.random() - .5) * .3;
      this.alpha = Math.random() * .5 + .1;
      this.hue = Math.random() > .5 ? 196 : 350; // teal or red
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue}, 80%, 70%, ${this.alpha})`;
      ctx.fill();
    }
  }

  // Create particles
  for (let i = 0; i < 120; i++) particles.push(new Particle());

  // Draw connecting lines between nearby particles
  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(50,173,210,${.12 * (1 - dist / 120)})`;
          ctx.lineWidth = .6;
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(loop);
  }
  loop();
}

// ─── 2. CUSTOM CURSOR ────────────────────────────────────────
function initCursor() {
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  let mx = 0, my = 0, fx = 0, fy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  function animateFollower() {
    fx += (mx - fx) * .12;
    fy += (my - fy) * .12;
    follower.style.left = fx + 'px';
    follower.style.top  = fy + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();
}

// ─── 3. NAVBAR SCROLL ────────────────────────────────────────
function initNavbar() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });
}

// ─── 4. HAMBURGER ────────────────────────────────────────────
function initHamburger() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');

  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    menu.classList.toggle('open');
  });

  document.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
      btn.classList.remove('open');
      menu.classList.remove('open');
    });
  });
}

// ─── 5. TYPING GREETING ──────────────────────────────────────
function initTypingGreeting() {
  const el   = document.getElementById('typed-greeting');
  const text = 'Hello, World! 👋';
  let i = 0;

  function type() {
    if (i < text.length) {
      el.textContent += text[i++];
      setTimeout(type, 80);
    }
  }
  setTimeout(type, 600);
}

// ─── 6. ROLE TYPER ───────────────────────────────────────────
function initRoleTyper() {
  const el = document.getElementById('role-text');
  let roleIdx = 0, charIdx = 0, deleting = false;

  function tick() {
    const current = ROLES[roleIdx];
    if (!deleting) {
      el.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(tick, 1800);
        return;
      }
    } else {
      el.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % ROLES.length;
      }
    }
    setTimeout(tick, deleting ? 45 : 80);
  }
  setTimeout(tick, 1200);
}

// ─── 7. CODE TYPER ───────────────────────────────────────────
function initCodeTyper() {
  const el = document.getElementById('code-display');
  let lineIdx = 0, charIdx = 0;
  let rendered = '';

  // Syntax highlight tokens
  const highlight = (line) => {
    return line
      .replace(/(".*?")/g, '<span style="color:#47AFD0">$1</span>')
      .replace(/\b(const|let|var|function|while|true|return|new)\b/g,
               '<span style="color:#C74D5D">$1</span>')
      .replace(/(\/\/.*)/g, '<span style="color:#838671">$1</span>')
      .replace(/\b(this)\b/g, '<span style="color:#32ADD2">$1</span>');
  };

  function typeNext() {
    if (lineIdx >= CODE_LINES.length) return;
    const line = CODE_LINES[lineIdx];

    if (charIdx < line.length) {
      charIdx++;
      const partial = line.slice(0, charIdx);
        el.innerHTML = rendered + highlight(partial) + '<span style="color:#32ADD2">▋</span>';
      setTimeout(typeNext, Math.random() * 30 + 20);
    } else {
      rendered += highlight(line) + '\n';
      lineIdx++;
      charIdx = 0;
      el.innerHTML = rendered + '<span style="color:#32ADD2">▋</span>';
      setTimeout(typeNext, lineIdx < CODE_LINES.length ? 80 : 0);
    }
  }
  setTimeout(typeNext, 1000);
}

// ─── 8. SCROLL REVEAL ────────────────────────────────────────
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        // Stagger children
        const kids = e.target.querySelectorAll('.skill-item, .project-card, .stat-card');
        kids.forEach((kid, i) => {
          kid.style.transitionDelay = `${i * 0.06}s`;
        });
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ─── 9. COUNTERS ─────────────────────────────────────────────
function initCounters() {
  const nums = document.querySelectorAll('.stat-num');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.dataset.done) {
        e.target.dataset.done = 'true';
        animateCounter(e.target);
      }
    });
  }, { threshold: 0.5 });

  nums.forEach(n => observer.observe(n));
}

function animateCounter(el) {
  const target = +el.dataset.target;
  const duration = 1600;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

// ─── 10. SKILLS ──────────────────────────────────────────────
function initSkills(cat) {
  const grid = document.getElementById('skills-grid');
  grid.innerHTML = '';
  SKILLS[cat].forEach((sk, i) => {
    const div = document.createElement('div');
    div.className = 'skill-item reveal';
    div.style.animationDelay = `${i * 0.07}s`;
    div.innerHTML = `
      <div class="skill-header">
        <span class="skill-name">${sk.name}</span>
        <span class="skill-pct">${sk.pct}%</span>
      </div>
      <div class="skill-bar">
        <div class="skill-fill" data-width="${sk.pct}"></div>
      </div>
    `;
    grid.appendChild(div);
  });

  // Trigger bar fill after a short delay
  setTimeout(() => {
    grid.querySelectorAll('.skill-fill').forEach(bar => {
      bar.style.width = bar.dataset.width + '%';
    });
    grid.querySelectorAll('.reveal').forEach(el => {
      el.classList.add('visible');
    });
  }, 100);
}

function initSkillTabs() {
  document.querySelectorAll('.skill-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.skill-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      initSkills(tab.dataset.cat);
    });
  });
}

// ─── 11. PORTFOLIO ───────────────────────────────────────────
function initPortfolio() {
  const grid = document.getElementById('portfolio-grid');
  PROJECTS.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'project-card reveal';
    card.dataset.category = p.category;
    card.style.transitionDelay = `${i * 0.08}s`;
    card.innerHTML = `
      <div class="project-thumb">
        <canvas class="project-bg" width="400" height="190" data-c1="${p.color1}" data-c2="${p.color2}"></canvas>
        <div class="project-overlay">
          <span style="font-size:2rem">👁️</span>
        </div>
      </div>
      <div class="project-body">
        <div class="project-meta">
          ${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
        </div>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.desc}</p>
        <div class="project-links">
          <a href="${p.demo}" class="proj-link">🔗 Demo</a>
          <a href="${p.code}" class="proj-link">📂 Code</a>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  // Draw generative thumbnail art
  grid.querySelectorAll('.project-bg').forEach(c => drawThumbnail(c));

  // Reveal observer
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.1 });
  grid.querySelectorAll('.project-card').forEach(c => obs.observe(c));
}

function drawThumbnail(canvas) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const c1 = canvas.dataset.c1;
  const c2 = canvas.dataset.c2;

  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, c1 + '33');
  grad.addColorStop(1, c2 + '22');
  ctx.fillStyle = '#0d1220';
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Random flowing blobs
  for (let i = 0; i < 5; i++) {
    const x = Math.random() * W;
    const y = Math.random() * H;
    const r = Math.random() * 80 + 40;
    const g2 = ctx.createRadialGradient(x, y, 0, x, y, r);
    g2.addColorStop(0, (i % 2 === 0 ? c1 : c2) + '44');
    g2.addColorStop(1, 'transparent');
    ctx.fillStyle = g2;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Grid lines
  ctx.strokeStyle = 'rgba(255,255,255,.04)';
  ctx.lineWidth = 1;
  for (let x = 0; x < W; x += 30) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = 0; y < H; y += 30) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  // Glowing dots
  for (let i = 0; i < 12; i++) {
    const x = Math.random() * W;
    const y = Math.random() * H;
    ctx.beginPath();
    ctx.arc(x, y, Math.random() * 3 + 1, 0, Math.PI * 2);
    ctx.fillStyle = i % 2 === 0 ? c1 : c2;
    ctx.globalAlpha = Math.random() * .6 + .2;
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  // Wavy line
  ctx.beginPath();
  ctx.moveTo(0, H * .55);
  for (let x = 0; x < W; x++) {
    ctx.lineTo(x, H * .55 + Math.sin(x / 30) * 18);
  }
  ctx.strokeStyle = c1 + '88';
  ctx.lineWidth = 2;
  ctx.stroke();
}

// ─── 12. PORTFOLIO FILTER ────────────────────────────────────
function initPortfolioFilter() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      document.querySelectorAll('.project-card').forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.style.display = match ? '' : 'none';
        if (match) {
          card.style.animation = 'fadeSlideIn .4s ease both';
        }
      });
    });
  });
}

// ─── 13. CONTACT FORM ────────────────────────────────────────
function initContactForm() {
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-success');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn');
    btn.disabled = true;
    btn.querySelector('.btn-text').textContent = 'Mengirim...';

    // Simulate send
    setTimeout(() => {
      success.classList.add('show');
      form.reset();
      btn.disabled = false;
      btn.querySelector('.btn-text').textContent = 'Kirim Pesan';
      setTimeout(() => success.classList.remove('show'), 5000);
    }, 1400);
  });
}

// ─── 14. SMOOTH SCROLL ───────────────────────────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = document.getElementById('navbar').offsetHeight;
        const y    = target.getBoundingClientRect().top + window.scrollY - navH - 20;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });
}
