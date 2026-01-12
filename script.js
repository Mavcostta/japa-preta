// ====================================
// MENU MOBILE
// ====================================
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

// Toggle menu
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenuBtn.classList.toggle("active");
    navMenu.classList.toggle("active");
    document.body.style.overflow = navMenu.classList.contains("active")
      ? "hidden"
      : "";
  });
}

// Fechar menu ao clicar em um link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenuBtn.classList.remove("active");
    navMenu.classList.remove("active");
    document.body.style.overflow = "";
  });
});

// Fechar menu ao clicar fora
document.addEventListener("click", (e) => {
  if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
    mobileMenuBtn.classList.remove("active");
    navMenu.classList.remove("active");
    document.body.style.overflow = "";
  }
});

// ====================================
// CARROSSEL DE DESTAQUES - MÚLTIPLOS
// ====================================
const carousels = document.querySelectorAll(".hero-carousel");

carousels.forEach((carouselElement) => {
  const heroCarousel = carouselElement.querySelector(".hero-carousel-track");
  const heroSlides = carouselElement.querySelectorAll(".hero-carousel-item");
  const heroPrev = carouselElement.querySelector(".hero-prev");
  const heroNext = carouselElement.querySelector(".hero-next");
  const heroIndicators = carouselElement.querySelectorAll(".hero-indicator");

  if (heroCarousel && heroSlides.length > 0) {
    let currentIndex = 0;
    const totalItems = heroSlides.length;

    function showSlide(index) {
      heroCarousel.style.transform = `translateX(-${index * 100}%)`;

      heroIndicators.forEach((indicator, i) => {
        indicator.classList.toggle("active", i === index);
      });
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % totalItems;
      showSlide(currentIndex);
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + totalItems) % totalItems;
      showSlide(currentIndex);
    }

    if (heroNext) heroNext.addEventListener("click", nextSlide);
    if (heroPrev) heroPrev.addEventListener("click", prevSlide);

    heroIndicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        currentIndex = index;
        showSlide(currentIndex);
      });
    });

    // Auto-play
    let autoplay = setInterval(nextSlide, 5000);

    carouselElement.addEventListener("mouseenter", () =>
      clearInterval(autoplay)
    );
    carouselElement.addEventListener("mouseleave", () => {
      autoplay = setInterval(nextSlide, 5000);
    });

    // Touch swipe
    let touchStart = 0;
    heroCarousel.addEventListener("touchstart", (e) => {
      touchStart = e.touches[0].clientX;
    });

    heroCarousel.addEventListener("touchend", (e) => {
      const touchEnd = e.changedTouches[0].clientX;
      if (touchStart - touchEnd > 50) nextSlide();
      else if (touchEnd - touchStart > 50) prevSlide();
    });
  }
});

// ====================================
// BARRA DE PROGRESSO DE SCROLL
// ====================================
const progressBar = document.querySelector(".scroll-progress-bar");

function updateProgressBar() {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Calcula a porcentagem de scroll
  const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;

  // Atualiza a largura da barra
  progressBar.style.width = scrollPercentage + "%";
}

// Atualiza ao carregar e ao rolar
window.addEventListener("scroll", updateProgressBar);
window.addEventListener("load", updateProgressBar);

// ====================================
// HEADER SCROLL
// ====================================
const header = document.getElementById("header");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
});

// ====================================
// BOTÃO SCROLL TO TOP
// ====================================
const scrollTopBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 500) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// ====================================
// CARROSSEL DE GALERIA - REMOVIDO
// ====================================
// Galeria foi simplificada - grid de trabalhos removido
// Mantido apenas o carrossel de destaques

// ====================================
// MODAL GALERIA (com suporte a vídeos)
// ====================================
const modal = document.getElementById("modalGaleria");
const modalImg = document.getElementById("modalImg");
const modalClose = document.querySelector(".modal-close");
const btnViews = document.querySelectorAll(".btn-view");

// Ao abrir item da galeria
btnViews.forEach((btn, index) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const item = btn.closest(".galeria-item");
    const isVideo = item.classList.contains("galeria-video");

    modal.style.display = "block";

    if (isVideo) {
      const video = item.querySelector("video");
      // Cria um elemento de vídeo no modal
      const videoElement = document.createElement("video");
      videoElement.src = video.src;
      videoElement.controls = true;
      videoElement.autoplay = true;
      videoElement.muted = true;
      videoElement.className = "modal-content";
      videoElement.style.maxHeight = "85vh";

      // Remove imagem se existir e adiciona vídeo
      modalImg.style.display = "none";
      const existingVideo = modal.querySelector("video.modal-content");
      if (existingVideo) {
        existingVideo.remove();
      }
      modal
        .querySelector(".modal-close")
        .insertAdjacentElement("afterend", videoElement);
    } else {
      const img = item.querySelector("img");
      modalImg.style.display = "block";
      modalImg.src = img.src;

      // Remove vídeo se existir
      const existingVideo = modal.querySelector("video.modal-content");
      if (existingVideo) {
        existingVideo.remove();
      }
    }

    // Previne scroll do body quando modal está aberto
    document.body.style.overflow = "hidden";
  });
});

// Fechar modal ao clicar no X
modalClose.addEventListener("click", () => {
  closeModal();
});

// Fechar modal ao clicar fora
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Fechar modal com tecla ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.style.display === "block") {
    closeModal();
  }
});

function closeModal() {
  modal.style.display = "none";
  document.body.style.overflow = "auto";

  // Para o vídeo se estiver tocando
  const video = modal.querySelector("video.modal-content");
  if (video) {
    video.pause();
  }
}

// ====================================
// ANIMAÇÕES AO SCROLL (AOS)
// ====================================
function animateOnScroll() {
  const elements = document.querySelectorAll("[data-aos]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("aos-animate");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  elements.forEach((element) => {
    observer.observe(element);
  });
}

// Iniciar animações quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  animateOnScroll();
});

// ====================================
// SMOOTH SCROLL PARA LINKS INTERNOS
// ====================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// ====================================
// PREVIEW DE VÍDEOS (ADAPTADO PARA CARROSSEL)
// ====================================
/* Não necessário - vídeos já têm preview no carrossel */

// ====================================
// ANIMAÇÃO DE DIGITAÇÃO NO HERO (OPCIONAL)
// ====================================
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// ====================================
// CONTADOR DE NÚMEROS (ANIMAÇÃO)
// ====================================
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  }

  updateCounter();
}

// Animar contador quando o elemento estiver visível
const observerCounter = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
        const target = parseInt(entry.target.textContent);
        animateCounter(entry.target, target);
        entry.target.classList.add("counted");
      }
    });
  },
  { threshold: 0.5 }
);

// Observar o badge de anos de experiência
const badgeNumber = document.querySelector(".badge-number");
if (badgeNumber) {
  observerCounter.observe(badgeNumber);
}

// ====================================
// PREVENÇÃO DE CLIQUE DIREITO EM IMAGENS (OPCIONAL)
// ====================================
// Descomente se quiser proteger as imagens
/*
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });
});
*/

// ====================================
// LOADING PARA IMAGENS
// ====================================
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    img.addEventListener("load", () => {
      img.style.opacity = "1";
    });

    // Se a imagem já estiver carregada (do cache)
    if (img.complete) {
      img.style.opacity = "1";
    }
  });
});

// ====================================
// PARALLAX SUAVE NO HERO (OPCIONAL)
// ====================================
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero-content");

  if (hero && scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    hero.style.opacity = 1 - scrolled / 700;
  }
});

// ====================================
// VALIDAÇÃO DE FORMULÁRIO PERSONALIZADA
// ====================================
const formInputs = document.querySelectorAll(
  ".form-group input, .form-group textarea, .form-group select"
);

formInputs.forEach((input) => {
  input.addEventListener("blur", () => {
    if (input.value.trim() !== "") {
      input.classList.add("filled");
    } else {
      input.classList.remove("filled");
    }
  });

  input.addEventListener("invalid", (e) => {
    e.preventDefault();
    input.style.borderColor = "#ff6b6b";
  });

  input.addEventListener("input", () => {
    input.style.borderColor = "";
  });
});

// ====================================
// DETECÇÃO DE MODO ESCURO DO SISTEMA (FUTURO)
// ====================================
if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  // Já está em modo escuro por padrão
  console.log("Tema escuro detectado");
}

// ====================================
// CONSOLE LOG PERSONALIZADO
// ====================================
console.log(
  "%c Japa Preta Academy ",
  "background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%); color: #1a1a1a; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 5px;"
);
console.log("%c Site desenvolvido com ❤️ ", "color: #d4af37; font-size: 14px;");

// ====================================
// PERFORMANCE - Lazy Loading para Imagens
// ====================================
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          observer.unobserve(img);
        }
      }
    });
  });

  // Observar imagens com data-src
  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

// ====================================

// FAQ ACCORDION
// ====================================
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", () => {
    // Fecha outros itens abertos
    const isActive = item.classList.contains("active");

    faqItems.forEach((otherItem) => {
      otherItem.classList.remove("active");
    });

    // Se não estava ativo, ativa este
    if (!isActive) {
      item.classList.add("active");
    }
  });
});

// ====================================
// MENSAGEM DE BOAS-VINDAS
// ====================================
window.addEventListener("load", () => {
  console.log("✨ Site carregado com sucesso!");

  // Animar contadores de estatísticas
  animateCounters();
});

// ====================================
// ANIMAÇÃO DE CONTADORES
// ====================================
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number[data-target]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !entry.target.classList.contains("counted")
        ) {
          entry.target.classList.add("counted");
          animateCounter(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function animateCounter(element) {
  const target = parseInt(element.getAttribute("data-target"));

  // Validação: se target não for um número válido, usar o textContent
  if (isNaN(target) || target === null) {
    console.error("Valor inválido no data-target:", element);
    return;
  }

  const duration = 2000; // 2 segundos
  const increment = target / (duration / 16); // 60fps
  let current = 0;

  const updateCounter = () => {
    current += increment;

    if (current < target) {
      // Formatar número baseado no valor
      if (target >= 1000) {
        const formatted = Math.floor(current).toLocaleString("pt-BR");
        element.textContent = formatted + "+";
      } else if (target === 100) {
        element.textContent = Math.floor(current) + "%";
      } else {
        element.textContent = Math.floor(current);
      }

      requestAnimationFrame(updateCounter);
    } else {
      // Valor final formatado
      if (target >= 1000) {
        element.textContent = target.toLocaleString("pt-BR") + "+";
      } else if (target === 100) {
        element.textContent = "100%";
      } else {
        element.textContent = target;
      }
    }
  };

  updateCounter();
}
