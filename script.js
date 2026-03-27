/* ── Theme Toggle ── */
const themeToggle = document.getElementById('themeToggle');

const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

themeToggle.addEventListener('change', () => {
  applyTheme(themeToggle.checked ? 'dark' : 'light');
});

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeToggle.checked = theme === 'dark';
  localStorage.setItem('theme', theme);
}

/* ── Skill bars animate on scroll ── */
const skillBars = document.querySelectorAll('.skill-bar');

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar   = entry.target;
      const level = bar.getAttribute('data-level');
      bar.style.width = level + '%';
      barObserver.unobserve(bar);
    }
  });
}, { threshold: 0.3 });

skillBars.forEach(bar => barObserver.observe(bar));

/* ── Skill items expand/collapse on click ── */
const skillItems = document.querySelectorAll('.skill-item');

skillItems.forEach(item => {
  item.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    // Close all
    skillItems.forEach(s => s.classList.remove('open'));

    // Toggle clicked
    if (!isOpen) item.classList.add('open');
  });
});

/* ── "Show more" toggle for McKinsey bullets ── */
const toggleBtns = document.querySelectorAll('.btn-toggle');

toggleBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const targetId    = btn.getAttribute('data-target');
    const list        = document.getElementById(targetId);
    const extras      = list.querySelectorAll('.extra-bullet');
    const allVisible  = extras[0].classList.contains('visible');

    extras.forEach(li => li.classList.toggle('visible', !allVisible));
    btn.textContent = allVisible ? 'Show more ↓' : 'Show less ↑';
  });
});

/* ── Smooth scroll to skills ── */
document.getElementById('scrollToSkills').addEventListener('click', () => {
  document.getElementById('skills').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

/* ── Download button (triggers print dialog as simple CV export) ── */
const toast = document.getElementById('toast');

document.getElementById('downloadBtn').addEventListener('click', () => {
  showToast('CV download started!');
  setTimeout(() => window.print(), 600);
});

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

/* ── Entrance animations on scroll ── */
const cards = document.querySelectorAll('.card, .hero, .timeline-item');

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.animationDelay = `${i * 0.04}s`;
      entry.target.classList.add('fade-in');
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

cards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(18px)';
  card.style.transition = 'opacity .45s ease, transform .45s ease';
  cardObserver.observe(card);
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.card, .hero').forEach(el => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(18px)';
  });
});

// Trigger fade-in helper via class (attach keyframe via JS)
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .fade-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  </style>
`);
