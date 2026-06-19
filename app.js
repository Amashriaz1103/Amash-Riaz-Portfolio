/* ═══════════════════════════════════════════════
   AMASH RIAZ PORTFOLIO — app.js
═══════════════════════════════════════════════ */

'use strict';

/* ─── 1. CURSOR GLOW ─────────────────────────── */
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', e => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top  = e.clientY + 'px';
});

/* ─── 2. NAVBAR SCROLL ───────────────────────── */
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Sticky shadow
  navbar.classList.toggle('scrolled', window.scrollY > 60);

  // Active link highlight
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}, { passive: true });

/* ─── 3. HAMBURGER ───────────────────────────── */
const hamburger  = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksEl.classList.toggle('open');
});

navLinksEl.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksEl.classList.remove('open');
  });
});

/* ─── 4. TYPED TEXT ──────────────────────────── */
const phrases = [
  'Generative AI Specialist',
  'Data & Business Analyst',
  'Agentic AI Developer',
  'Power BI Developer',
  'Python & SQL Engineer',
  'LLMOps & DevOps Enthusiast',
  'RAG & Agent Architect',
  'Insight-Driven Business Thinker',
];
let phraseIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typedText');

function typeLoop() {
  const phrase = phrases[phraseIdx];
  if (!deleting) {
    typedEl.textContent = phrase.slice(0, ++charIdx);
    if (charIdx === phrase.length) {
      deleting = true;
      return setTimeout(typeLoop, 1800);
    }
  } else {
    typedEl.textContent = phrase.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }
  setTimeout(typeLoop, deleting ? 50 : 80);
}
typeLoop();

/* ─── 5. PARTICLE CANVAS ─────────────────────── */
const canvas = document.getElementById('particlesCanvas');
const ctx    = canvas.getContext('2d');

let particles = [];

function resizeCanvas() {
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function createParticle() {
  return {
    x:  Math.random() * canvas.width,
    y:  Math.random() * canvas.height,
    r:  Math.random() * 1.8 + 0.4,
    dx: (Math.random() - 0.5) * 0.35,
    dy: (Math.random() - 0.5) * 0.35,
    alpha: Math.random() * 0.5 + 0.1,
  };
}

for (let i = 0; i < 80; i++) particles.push(createParticle());

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0,212,170,${p.alpha})`;
    ctx.fill();
    p.x += p.dx; p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width)  p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });

  // Connect nearby particles
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const d = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
      if (d < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(0,212,170,${0.08 * (1 - d / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(drawParticles);
}
drawParticles();

/* ─── 6. SCROLL REVEAL ───────────────────────── */
function addRevealClasses() {
  const revealTargets = [
    '.skill-category-card',
    '.project-card',
    '.cert-card',
    '.edu-card',
    '.contact-card',
    '.about-grid',
    '.about-highlights',
    '.contact-form',
    '.hero-stats',
  ];
  revealTargets.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => el.classList.add('reveal'));
  });
}
addRevealClasses();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ─── 7. COUNTER ANIMATION ───────────────────── */
function animateCounter(el) {
  const target = +el.dataset.target;
  const dur    = 1600;
  const step   = dur / target;
  let current  = 0;
  const timer  = setInterval(() => {
    current++;
    el.textContent = current;
    if (current >= target) {
      el.textContent = target + (target === 7 ? '+' : '+');
      clearInterval(timer);
    }
  }, step);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-number').forEach(animateCounter);
      counterObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) counterObserver.observe(heroStats);

/* ─── 8. PROFICIENCY BARS ────────────────────── */
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.prof-fill').forEach(bar => {
        const w = bar.dataset.width;
        setTimeout(() => { bar.style.width = w + '%'; }, 200);
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-category-card').forEach(card => barObserver.observe(card));

/* ─── 9. CONTACT FORM ────────────────────────── */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"] span');
    btn.textContent = 'Sending…';
    setTimeout(() => {
      contactForm.reset();
      formSuccess.classList.add('show');
      btn.textContent = 'Send Message';
      setTimeout(() => formSuccess.classList.remove('show'), 5000);
    }, 1200);
  });
}

/* ─── 10. SMOOTH SECTION HIGHLIGHT ──────────────*/
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ─── 11. SKILL TAG RIPPLE ───────────────────── */
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('click', function(e) {
    const r = document.createElement('span');
    r.style.cssText = `
      position:absolute;width:6px;height:6px;border-radius:50%;
      background:rgba(0,212,170,0.6);
      left:${e.offsetX}px;top:${e.offsetY}px;
      transform:translate(-50%,-50%) scale(0);
      animation:ripple 0.5s ease forwards;pointer-events:none;
    `;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(r);
    setTimeout(() => r.remove(), 500);
  });
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes ripple {
    to { transform:translate(-50%,-50%) scale(14); opacity:0; }
  }
`;
document.head.appendChild(rippleStyle);

/* ─── 12. ACTIVE PROJECT CARD ON HOVER ────────── */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    document.querySelectorAll('.project-card').forEach(c => {
      if (c !== card && !c.classList.contains('hide')) {
        c.style.opacity = '0.35';
      }
    });
  });
  card.addEventListener('mouseleave', () => {
    document.querySelectorAll('.project-card').forEach(c => {
      if (!c.classList.contains('hide')) {
        c.style.opacity = '1';
      }
    });
  });
});

/* ─── 13. ROLE SELECTOR FILTERING ─────────────── */
const roleBtns = document.querySelectorAll('.role-btn');
const projectCards = document.querySelectorAll('.project-card');
const skillCards = document.querySelectorAll('.skill-category-card');
const certCards = document.querySelectorAll('.cert-card');

// Configuration for dynamic stats based on roles
const statsConfig = {
  all:      { projects: 6, certs: 6, skills: 20 },
  genai:    { projects: 3, certs: 3, skills: 10 },
  data:     { projects: 4, certs: 4, skills: 12 },
  business: { projects: 3, certs: 3, skills: 8 }
};

function updateStats(role) {
  const config = statsConfig[role] || statsConfig.all;
  const statNumbers = document.querySelectorAll('.stat-number');
  
  if (statNumbers.length >= 3) {
    // Projects counter
    animateStatCounter(statNumbers[0], config.projects);
    // Certifications counter
    animateStatCounter(statNumbers[1], config.certs);
    // Tech Skills counter
    animateStatCounter(statNumbers[2], config.skills);
  }
}

function animateStatCounter(el, targetVal) {
  let current = 0;
  el.textContent = '0';
  if (targetVal === 0) return;
  
  const dur = 800;
  const step = dur / targetVal;
  const timer = setInterval(() => {
    current++;
    el.textContent = current + '+';
    if (current >= targetVal) {
      el.textContent = targetVal + '+';
      clearInterval(timer);
    }
  }, step);
}

roleBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    
    // Update active button state
    roleBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Smooth scroll to roles section if clicked from elsewhere
    if (window.scrollY < 200) {
      document.getElementById('roles')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Update body class for CSS customization
    document.body.className = document.body.className.replace(/\bfilter-\S+/g, '');
    document.body.classList.add(`filter-${filter}`);
    
    // Filter projects
    projectCards.forEach(card => {
      const roles = card.dataset.role ? card.dataset.role.split(' ') : [];
      if (filter === 'all' || roles.includes(filter)) {
        card.classList.remove('hide');
        card.style.display = 'flex';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0) scale(1)';
        }, 50);
      } else {
        card.classList.add('hide');
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px) scale(0.95)';
        setTimeout(() => {
          if (card.classList.contains('hide')) {
            card.style.display = 'none';
          }
        }, 300);
      }
    });

    // Highlight/Filter Skill Categories
    skillCards.forEach(card => {
      const roles = card.dataset.role ? card.dataset.role.split(' ') : [];
      if (filter === 'all' || roles.includes(filter)) {
        card.classList.remove('dimmed');
        card.style.opacity = '1';
        card.style.pointerEvents = 'all';
      } else {
        card.classList.add('dimmed');
        card.style.opacity = '0.3';
        card.style.pointerEvents = 'none';
      }
    });

    // Highlight/Filter Certifications
    certCards.forEach(card => {
      const roles = card.dataset.role ? card.dataset.role.split(' ') : [];
      if (filter === 'all' || roles.includes(filter)) {
        card.style.display = 'flex';
        setTimeout(() => {
          card.style.opacity = '1';
        }, 50);
      } else {
        card.style.opacity = '0';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });

    // Update stats counters
    updateStats(filter);
  });
});

/* ─── 14. PAGE LOAD FADE-IN ──────────────────── */
document.body.style.opacity = '0';
window.addEventListener('load', () => {
  document.body.style.transition = 'opacity 0.5s ease';
  document.body.style.opacity = '1';
  
  // Set initial class
  document.body.classList.add('filter-all');
});
