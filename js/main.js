/* ════════════════════════════════
   SHIVAM BAVDA — PORTFOLIO JS
   Premium Interactions & Animations
════════════════════════════════ */

/* ── CURSOR GLOW ── */
const cursorGlow = document.getElementById('cursor-glow');
document.addEventListener('mousemove', e => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top  = e.clientY + 'px';
});

/* ── NAVBAR SCROLL ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveNav();
});

/* ── MOBILE MENU ── */
const menuToggle = document.getElementById('menu-toggle');
const navLinks   = document.getElementById('nav-links');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = menuToggle.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

/* ── ACTIVE NAV LINK ── */
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY  = window.scrollY + 120;
  sections.forEach(sec => {
    const top    = sec.offsetTop;
    const height = sec.offsetHeight;
    const id     = sec.getAttribute('id');
    const link   = document.querySelector(`.nav-link[data-section="${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    }
  });
}
updateActiveNav();

/* ── TYPED TEXT EFFECT ── */
const phrases = [
  'Beautiful UIs',
  'React Apps',
  'Responsive Sites',
  'Smooth Animations',
  'Web Experiences',
];
let phraseIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typed-text');

function typeEffect() {
  const current = phrases[phraseIdx];
  if (deleting) {
    typedEl.textContent = current.substring(0, charIdx--);
    if (charIdx < 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      setTimeout(typeEffect, 400);
      return;
    }
    setTimeout(typeEffect, 60);
  } else {
    typedEl.textContent = current.substring(0, charIdx++);
    if (charIdx > current.length) {
      deleting = true;
      setTimeout(typeEffect, 1800);
      return;
    }
    setTimeout(typeEffect, 100);
  }
}
setTimeout(typeEffect, 500);

/* ── AOS (Animate on Scroll) ── */
function initAOS() {
  const els = document.querySelectorAll('[data-aos]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = parseInt(e.target.dataset.aosDelay || 0);
        setTimeout(() => e.target.classList.add('aos-animate'), delay);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  els.forEach(el => observer.observe(el));
}
initAOS();

/* ── COUNTER ANIMATION ── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1500;
  const start = performance.now();
  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  }
  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.stat-number').forEach(animateCounter);
      statsObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

/* ── SKILL BARS ANIMATION ── */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(bar => {
        const w = bar.dataset.width;
        setTimeout(() => bar.style.width = w + '%', 200);
      });
      skillObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skills-card').forEach(card => skillObserver.observe(card));

/* ── PROJECT FILTER ── */
const filterBtns  = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      if (match) {
        card.classList.remove('hidden');
        card.style.animation = 'none';
        requestAnimationFrame(() => {
          card.style.animation = 'cardIn .4s ease forwards';
        });
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* Card-in keyframe via JS */
const style = document.createElement('style');
style.textContent = `
  @keyframes cardIn {
    from { opacity: 0; transform: scale(.95) translateY(10px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }
`;
document.head.appendChild(style);

/* ── CONTACT FORM ── */
const form    = document.getElementById('contact-form');
const success = document.getElementById('form-success');
const submitBtn = document.getElementById('submit-btn');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  setTimeout(() => {
    form.reset();
    submitBtn.innerHTML = `
      Send Message
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
      </svg>`;
    submitBtn.disabled = false;
    success.classList.add('show');
    setTimeout(() => success.classList.remove('show'), 4000);
  }, 1500);
});

/* ── SMOOTH SCROLL for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ── PARALLAX ORBS on mouse move ── */
const orbs = document.querySelectorAll('.orb');
document.addEventListener('mousemove', e => {
  const xPct = (e.clientX / window.innerWidth - 0.5);
  const yPct = (e.clientY / window.innerHeight - 0.5);
  orbs.forEach((orb, i) => {
    const factor = (i + 1) * 15;
    orb.style.transform = `translate(${xPct * factor}px, ${yPct * factor}px)`;
  });
});

/* ── PROFILE RING pause on hover ── */
const profileRing = document.querySelector('.profile-ring');
const profileImg  = document.querySelector('.profile-img');
if (profileRing) {
  profileRing.addEventListener('mouseenter', () => {
    profileRing.style.animationPlayState = 'paused';
    profileImg.style.animationPlayState  = 'paused';
  });
  profileRing.addEventListener('mouseleave', () => {
    profileRing.style.animationPlayState = 'running';
    profileImg.style.animationPlayState  = 'running';
  });
}

console.log('%c Shivam Bavda Portfolio', 'background: linear-gradient(135deg,#6366f1,#a855f7); color:#fff; font-size:16px; padding:8px 16px; border-radius:8px; font-weight:bold;');
console.log('%c Built with ❤️ using HTML, CSS & JavaScript', 'color:#8892a4; font-size:12px;');
