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

const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", e => {
    e.preventDefault();
    const message = document.getElementById("formMessage");
    if (message) message.textContent = "✓ Mensaje enviado correctamente.";
    e.target.reset();
  });
}

const appointmentForm = document.getElementById("appointmentForm");
if (appointmentForm) {
  appointmentForm.addEventListener("submit", e => {
    e.preventDefault();
    const message = document.getElementById("appointmentMessage");
    if (message) message.textContent = "✓ Solicitud recibida.";
    e.target.reset();
  });
}

const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// =====================================================
// ANIMACIONES: FADE-IN SCROLL Y CONTADORES
// =====================================================

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
      revealObserver.unobserve(entry.target); 
    }
  });
}, { 
  threshold: 0.1, 
  rootMargin: "0px 0px 100px 0px" 
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

// =====================================================
// ANIMACIÓN CASCADA PARA EL TEXTO "SOBRE MÍ"
// =====================================================
const aboutText = document.querySelector('.about-text.parrafos-cascada');
if (aboutText) {
  const textObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        textObserver.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.2, // Se activa cuando el 20% del texto es visible
    rootMargin: "0px 0px -50px 0px" 
  });
  
  textObserver.observe(aboutText);
}

// =====================================================
// ASIGNAR RETRASOS A LAS PALABRAS (EFECTO ESCRITURA)
// =====================================================
document.querySelectorAll('.about-text.parrafos-cascada .palabra').forEach((palabra, index) => {
  // 0.02s = 20 milisegundos por palabra. 
  // Si quieres que sea aún más rápido, cambia 0.02 por 0.015
  palabra.style.animationDelay = `${index * 0.02}s`; 
});

// =====================================================
// 1. PROCESADOR DE TEXTO "SOBRE MÍ" (Automático)
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
  const textoContainer = document.getElementById('textoSobreMi');
  
  if (textoContainer) {
    const palabrasConColor = {
      'azul-fuerte': ['10', 'años', 'bienestar', 'integral'],
      'azul-claro': ['experiencia', 'otorrinolaringología', 'formación', 'especializada'],
      'acento': ['excelencia', 'diagnósticos', 'precisos']
    };

    textoContainer.querySelectorAll('p').forEach(parrafo => {
      const textoOriginal = parrafo.textContent.trim();
      const palabras = textoOriginal.split(/\s+/);
      parrafo.innerHTML = '';
      
      palabras.forEach((palabra, index) => {
        const span = document.createElement('span');
        span.className = 'palabra';
        const palabraLimpia = palabra.replace(/[.,;:!?]/g, '').toLowerCase();
        
        for (const [clase, lista] of Object.entries(palabrasConColor)) {
          if (lista.includes(palabraLimpia)) {
            span.classList.add(clase);
            break;
          }
        }
        
        span.textContent = palabra;
        span.style.animationDelay = `${index * 0.02}s`;
        parrafo.appendChild(span);
        
        if (index < palabras.length - 1) {
          parrafo.appendChild(document.createTextNode(' '));
        }
      });
    });

    // Observer para disparar la animación al hacer scroll
    const textObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          textObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2, rootMargin: "0px 0px -50px 0px" });
    
    textObserver.observe(textoContainer);
  }

  // =====================================================
// CARRUSEL AUTOMÁTICO DE TESTIMONIOS (SIN DOTS)
// =====================================================
const testimoniosData = [
  { texto: "Excelente atención, muy profesional y siempre dispuesto a explicar cada detalle.", autor: "María González", tipo: "Consulta médica" },
  { texto: "Una atención muy cálida y profesional. Me sentí acompañado durante todo el proceso.", autor: "Carlos Rodríguez", tipo: "Cirugía" },
  { texto: "Muy recomendable. La atención fue excelente y me brindó mucha tranquilidad.", autor: "Ana Martínez", tipo: "Estudio médico" },
  { texto: "El doctor es muy atento y se toma el tiempo necesario para explicar todo.", autor: "Juan Pérez", tipo: "Consulta médica" },
  { texto: "Profesionalismo y humanidad en cada consulta. Excelente experiencia.", autor: "Laura Sánchez", tipo: "Tratamiento" }
];

const carruselTrack = document.getElementById('carruselTrack');

if (carruselTrack) {
  // 1. Generar las tarjetas
  testimoniosData.forEach(testimonio => {
    const card = document.createElement('article');
    card.className = 'testimonial-card';
    card.innerHTML = `
      <div class="testimonial-stars">
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
      </div>
      <p class="testimonial-text">"${testimonio.texto}"</p>
      <div class="testimonial-author">
        <div class="testimonial-avatar"><i class="fa-solid fa-user"></i></div>
        <div>
          <strong>${testimonio.autor}</strong>
          <span>${testimonio.tipo}</span>
        </div>
      </div>
    `;
    carruselTrack.appendChild(card);
  });

  let indiceActual = 0;
  const totalTestimonios = testimoniosData.length;
  let intervalo;

  function cambiarTestimonio() {
    indiceActual = (indiceActual + 1) % totalTestimonios; // Vuelve a 0 al llegar al final
    carruselTrack.style.transform = `translateX(-${indiceActual * 100}%)`;
  }

  function iniciarCarrusel() {
    intervalo = setInterval(cambiarTestimonio, 4500); // Cambia cada 4.5 segundos
  }

  function detenerCarrusel() {
    clearInterval(intervalo);
  }

  iniciarCarrusel();

  carruselTrack.addEventListener('mouseenter', detenerCarrusel);
  carruselTrack.addEventListener('mouseleave', iniciarCarrusel);
}
});