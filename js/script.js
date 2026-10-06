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