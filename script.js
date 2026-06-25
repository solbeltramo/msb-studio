// MSB Digital Studio — script.js

// NAV MOBILE
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');
navToggle?.addEventListener('click', () => navMobile.classList.toggle('open'));
document.querySelectorAll('.nav-mobile-link').forEach(link => {
  link.addEventListener('click', () => navMobile.classList.remove('open'));
});

// NAV SCROLL
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.style.background = window.scrollY > 40
    ? 'rgba(10,10,18,0.98)'
    : 'rgba(10,10,18,0.9)';
}, { passive: true });

// PARALLAX HERO IMAGE
const heroBg = document.getElementById('heroBg');
window.addEventListener('scroll', () => {
  if (!heroBg) return;
  const scrollY = window.scrollY;
  heroBg.style.transform = `scale(1.1) translateY(${scrollY * 0.25}px)`;
}, { passive: true });

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// SCROLL REVEAL
const revealEls = document.querySelectorAll('.service-card, .process-step, .value, .social-card, .about-card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// FORMULARIO
function handleSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('contactForm');
  const btn = form.querySelector('button[type="submit"]');
  if (!form.nombre.value.trim() || !form.email.value.trim() || !form.mensaje.value.trim()) {
    showMsg('Por favor completá los campos obligatorios.', 'error');
    return;
  }
  btn.textContent = 'Enviando...';
  btn.disabled = true;
  setTimeout(() => {
    showMsg('¡Gracias! Te respondemos en menos de 24 horas.', 'success');
    form.reset();
    btn.textContent = 'Enviar consulta';
    btn.disabled = false;
  }, 1200);
}

function showMsg(text, type) {
  const msg = document.getElementById('formMsg');
  msg.textContent = text;
  msg.className = 'form-msg ' + type;
  msg.style.display = 'block';
  setTimeout(() => { msg.style.display = 'none'; }, 6000);
}

// ACTIVE NAV
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) current = s.getAttribute('id'); });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === '#' + current ? 'var(--gold)' : '';
  });
}, { passive: true });
