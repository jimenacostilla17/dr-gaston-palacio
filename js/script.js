/* =====================================================
   MENÚ RESPONSIVE
===================================================== */

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

if (menuToggle && nav) {

  menuToggle.addEventListener("click", () => {

    nav.classList.toggle("open");

    const isOpen = nav.classList.contains("open");

    menuToggle.textContent = isOpen ? "✕" : "☰";

    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Cerrar menú" : "Abrir menú"
    );

    menuToggle.setAttribute(
      "aria-expanded",
      isOpen ? "true" : "false"
    );

  });


  /* Cerrar menú al tocar un enlace */

  document.querySelectorAll(".nav a").forEach((link) => {

    link.addEventListener("click", () => {

      nav.classList.remove("open");

      menuToggle.textContent = "☰";

      menuToggle.setAttribute(
        "aria-label",
        "Abrir menú"
      );

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

    });

  });


  /* Cerrar menú si se vuelve a pantalla grande */

  window.addEventListener("resize", () => {

    if (window.innerWidth > 850) {

      nav.classList.remove("open");

      menuToggle.textContent = "☰";

      menuToggle.setAttribute(
        "aria-label",
        "Abrir menú"
      );

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

    }

  });

}


/* =====================================================
   SCROLL SPY
===================================================== */

const sections = document.querySelectorAll(
  "main section[id]"
);

const navLinks = document.querySelectorAll(
  ".nav a"
);

window.addEventListener("scroll", () => {

  let current = "inicio";

  sections.forEach((section) => {

    if (
      window.scrollY >=
      section.offsetTop - 130
    ) {

      current = section.id;

    }

  });


  navLinks.forEach((link) => {

    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current}`
    );

  });

});


/* =====================================================
   MODAL DE TURNOS
===================================================== */

const modal = document.getElementById(
  "appointmentModal"
);

const closeModal = document.getElementById(
  "modalClose"
);

document
  .querySelectorAll("[data-open-appointment]")
  .forEach((button) => {

    button.addEventListener("click", () => {

      if (!modal) {
        return;
      }

      modal.classList.add("open");

      modal.setAttribute(
        "aria-hidden",
        "false"
      );

      document.body.style.overflow = "hidden";

    });

  });


function hideModal() {

  if (!modal) {
    return;
  }

  modal.classList.remove("open");

  modal.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.style.overflow = "";

}


if (closeModal) {

  closeModal.addEventListener(
    "click",
    hideModal
  );

}


if (modal) {

  modal.addEventListener("click", (event) => {

    if (event.target === modal) {

      hideModal();

    }

  });

}


document.addEventListener("keydown", (event) => {

  if (event.key === "Escape") {

    hideModal();

  }

});


/* =====================================================
   FORMULARIO DE CONTACTO
===================================================== */

const contactForm = document.getElementById(
  "contactForm"
);

if (contactForm) {

  contactForm.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();

      const message =
        document.getElementById("formMessage");

      if (message) {

        message.textContent =
          "✓ Mensaje enviado correctamente. Nos comunicaremos con vos pronto.";

      }

      contactForm.reset();

    }
  );

}


/* =====================================================
   FORMULARIO DE TURNO
===================================================== */

const appointmentForm =
  document.getElementById(
    "appointmentForm"
  );

if (appointmentForm) {

  appointmentForm.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();

      const message =
        document.getElementById(
          "appointmentMessage"
        );

      if (message) {

        message.textContent =
          "✓ Solicitud recibida. Nos comunicaremos para confirmar el turno.";

      }

      appointmentForm.reset();

    }
  );

}


/* =====================================================
   AÑO AUTOMÁTICO
===================================================== */

const year =
  document.getElementById("year");

if (year) {

  year.textContent =
    new Date().getFullYear();

}


/* =====================================================
  ANIMACIONES DE SCROLL Y TEXTO
===================================================== */

// 1. ACTIVADOR DE ANIMACIONES SCROLL (REVEAL)
const elementosConFade = [
  '.about-grid', '.value-card', '.timeline-item', '.cert-card',
  '.service-card', '.testimonial-card', '.contact-card',
  '.consultorio-features article', '.gallery img', '.metric-card', '.location-map'
];

elementosConFade.forEach(selector => {
  document.querySelectorAll(selector).forEach(el => {
    if (!el.classList.contains('reveal')) {
      el.classList.add('reveal');
    }
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { 
  threshold: 0.1, 
  rootMargin: "0px 0px -50px 0px" 
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


// 2. PROCESADOR DE TEXTO "SOBRE MÍ" 
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
});


/* =====================================================
  CARRUSEL Y CONTADORES ANIMADOS
===================================================== */

// ==========================================
// 1. CARRUSEL AUTOMÁTICO DE TESTIMONIOS
// ==========================================
const testimoniosData = [
  { texto: "Excelente atención, muy profesional y siempre dispuesto a explicar cada detalle.", autor: "María González", tipo: "Consulta médica" },
  { texto: "Una atención muy cálida y profesional. Me sentí acompañado durante todo el proceso.", autor: "Carlos Rodríguez", tipo: "Cirugía" },
  { texto: "Muy recomendable. La atención fue excelente y me brindó mucha tranquilidad.", autor: "Ana Martínez", tipo: "Estudio médico" },
  { texto: "El doctor es muy atento y se toma el tiempo necesario para explicar todo.", autor: "Juan Pérez", tipo: "Consulta médica" },
  { texto: "Profesionalismo y humanidad en cada consulta. Excelente experiencia.", autor: "Laura Sánchez", tipo: "Tratamiento" }
];

const carruselTrack = document.getElementById('carruselTrack');

if (carruselTrack) {
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

  // Lógica de auto-play
  let indiceActual = 0;
  const totalTestimonios = testimoniosData.length;
  let intervalo;

  function cambiarTestimonio() {
    indiceActual = (indiceActual + 1) % totalTestimonios;
    carruselTrack.style.transform = `translateX(-${indiceActual * 100}%)`;
  }

  function iniciarCarrusel() {
    intervalo = setInterval(cambiarTestimonio, 4500); 
  }

  function detenerCarrusel() {
    clearInterval(intervalo);
  }

  iniciarCarrusel();
  carruselTrack.addEventListener('mouseenter', detenerCarrusel);
  carruselTrack.addEventListener('mouseleave', iniciarCarrusel);
}


// ==========================================
// 2. CONTADORES ANIMADOS DE NÚMEROS
// ==========================================
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
  const duration = 2000; // 2 segundos de duración
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