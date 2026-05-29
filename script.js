const revealElements = document.querySelectorAll('.reveal');
const yearElement = document.querySelector('#year');
const navLinks = document.querySelectorAll('.nav a[href^="#"]');
const sections = document.querySelectorAll('main section[id]');
const topbar = document.querySelector('.topbar');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

function setActiveNavLink(targetId) {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${targetId}`;
    link.classList.toggle('is-active', isActive);
  });
}

function updateActiveNavLink() {
  if (!sections.length) {
    return;
  }

  const topbarOffset = topbar ? topbar.offsetHeight : 0;
  const scrollPosition = window.scrollY + topbarOffset + Math.min(window.innerHeight * 0.35, 280);
  let activeSectionId = sections[0].id;

  sections.forEach((section) => {
    if (scrollPosition >= section.offsetTop) {
      activeSectionId = section.id;
    }
  });

  setActiveNavLink(activeSectionId);
}

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const targetId = link.getAttribute('href').slice(1);
    setActiveNavLink(targetId);

    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      const topbarOffset = topbar ? topbar.offsetHeight : 0;
      const targetPosition = window.scrollY + targetSection.getBoundingClientRect().top - topbarOffset - 16;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }

    if (menuToggle && nav && window.innerWidth <= 960) {
      nav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Abrir menu');
    }
  });
});

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  });
}

if (sections.length > 0) {
  let rafId = 0;

  const handleScrollSpy = () => {
    window.cancelAnimationFrame(rafId);
    rafId = window.requestAnimationFrame(updateActiveNavLink);
  };

  window.addEventListener('scroll', handleScrollSpy, { passive: true });
  window.addEventListener('resize', handleScrollSpy);

  if (window.location.hash) {
    setActiveNavLink(window.location.hash.slice(1));
  }

  updateActiveNavLink();
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14,
    }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}