// msb.studio — script.js

// ---- NAV MOBILE TOGGLE ----
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');

navToggle?.addEventListener('click', () => {
  navMobile.classList.toggle('open');
});

// Cerrar menú al hacer click en un link
document.querySelectorAll('.nav-mobile-link').forEach(link => {
  link.addEventListener('click', () => navMobile.classList.remove('open'));
});

// ---- NAV SCROLL EFFECT ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav.style.background = 'rgba(13,13,13,0.98)';
  } else {
    nav.style.background = 'rgba(13,13,13,0.92)';
  }
});

// ---- SMOOTH SCROLL para links internos ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---- SCROLL REVEAL ----
const revealEls = document.querySelectorAll(
  '.service-card, .process-step, .value, .social-card, .about-card'
);

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

// ---- FORMULARIO DE CONTACTO ----
function handleSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('contactForm');
  const msg = document.getElementById('formMsg');
  const btn = form.querySelector('button[type="submit"]');

  const nombre = form.nombre.value.trim();
  const email = form.email.value.trim();
  const mensaje = form.mensaje.value.trim();

  if (!nombre || !email || !mensaje) {
    showMsg('Por favor completá los campos obligatorios.', 'error');
    return;
  }

  // Estado cargando
  btn.textContent = 'Enviando...';
  btn.disabled = true;

  // Simulación de envío (reemplazar con Formspree o EmailJS)
  // Para conectar Formspree: cambiar el action del form a https://formspree.io/f/TU_ID
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

// ---- ACTIVE NAV LINK por sección ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === '#' + current
      ? 'var(--gold)'
      : '';
  });
});
