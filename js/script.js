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
