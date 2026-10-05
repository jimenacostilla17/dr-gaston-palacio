const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
  menuToggle.textContent = nav.classList.contains("open") ? "✕" : "☰";
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.textContent = "☰";
  });
});

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav a");

window.addEventListener("scroll", () => {
  let current = "inicio";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 130) current = section.id;
  });

  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
});
// =====================================================
// MODAL Y FORMULARIOS (PROTEGIDOS CONTRA ERRORES)
// =====================================================

// 1. Modal de turnos
const modal = document.getElementById("appointmentModal");
const closeModal = document.getElementById("modalClose");

if (modal && closeModal) {
  document.querySelectorAll("[data-open-appointment]").forEach(button => {
    button.addEventListener("click", () => {
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });

  function hideModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  closeModal.addEventListener("click", hideModal);
  modal.addEventListener("click", e => { if (e.target === modal) hideModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") hideModal(); });
}

// 2. Formulario de contacto
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", e => {
    e.preventDefault();
    const message = document.getElementById("formMessage");
    if (message) message.textContent = "✓ Mensaje enviado correctamente.";
    e.target.reset();
  });
}

// 3. Formulario de turno
const appointmentForm = document.getElementById("appointmentForm");
if (appointmentForm) {
  appointmentForm.addEventListener("submit", e => {
    e.preventDefault();
    const message = document.getElementById("appointmentMessage");
    if (message) message.textContent = "✓ Solicitud recibida.";
    e.target.reset();
  });
}

// 4. Año automático
const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// =====================================================
// ANIMACIONES: FADE-IN SCROLL Y CONTADORES
// =====================================================

// 1. Agregar clase 'reveal' a los elementos que queremos animar
const elementosConFade = [
  '.about-grid',
  '.value-card',
  '.timeline-item',
  '.cert-card',
  '.service-card',
  '.testimonial-card',
  '.contact-card',
  '.consultorio-features article',
  '.gallery img'
];

elementosConFade.forEach(selector => {
  document.querySelectorAll(selector).forEach(el => {
    el.classList.add('reveal');
  });
});

// 2. Configurar el observador para el fade
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target); // Solo anima una vez
    }
  });
}, { 
  threshold: 0.1, 
  rootMargin: "0px 0px 100px 0px" /* ✅ CAMBIO CLAVE: Empieza 100px ANTES de entrar en pantalla */
});

revealElements.forEach(el => revealObserver.observe(el));

// 3. Contadores de Números
const counters = document.querySelectorAll('.counter-number');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 2000;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(easeOut * target);
    
    el.textContent = current + suffix;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target + suffix;
    }
  }
  requestAnimationFrame(update);
}