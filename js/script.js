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

// Modal de turnos
const modal = document.getElementById("appointmentModal");
const closeModal = document.getElementById("modalClose");

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

modal.addEventListener("click", e => {
  if (e.target === modal) hideModal();
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") hideModal();
});

// Formulario de contacto
const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", e => {
  e.preventDefault();
  const message = document.getElementById("formMessage");
  message.textContent = "✓ Mensaje enviado correctamente. Nos comunicaremos con vos pronto.";
  e.target.reset();
});

// Formulario de turno
const appointmentForm = document.getElementById("appointmentForm");
appointmentForm.addEventListener("submit", e => {
  e.preventDefault();
  const message = document.getElementById("appointmentMessage");
  message.textContent = "✓ Solicitud recibida. Nos comunicaremos para confirmar el turno.";
  e.target.reset();
});

// Año automático
const year = new Date().getFullYear();
document.getElementById("year").textContent = year;

// =====================================================
// NUEVAS ANIMACIONES: FADE-IN SCROLL Y CONTADORES
// =====================================================

// 1. Observador para el Fade-In (Aparición al hacer scroll)
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible'); // Tu CSS ya tiene .reveal.visible
      revealObserver.unobserve(entry.target); // Solo anima una vez para mejor rendimiento
    }
  });
}, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

revealElements.forEach(el => revealObserver.observe(el));


// 2. Observador y lógica para los Contadores de Números
const counters = document.querySelectorAll('.counter-number');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target); // Solo cuenta una vez
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 2000; // Duración de 2 segundos
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing: empieza rápido y frena suavemente al final
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(easeOut * target);
    
    el.textContent = current + suffix;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target + suffix; // Asegura que el número final sea exacto
    }
  }
  requestAnimationFrame(update);
}
