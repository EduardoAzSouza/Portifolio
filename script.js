const revealElements = document.querySelectorAll('.reveal');
const yearElement = document.querySelector('#year');
const navLinks = document.querySelectorAll('.nav a[href^="#"]');
const sections = document.querySelectorAll('main section[id]');
const topbar = document.querySelector('.topbar');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const progressBar = document.querySelector('.scroll-progress');
const menuLabelOpen = menuToggle?.dataset.labelOpen || 'Abrir menu';
const menuLabelClose = menuToggle?.dataset.labelClose || 'Fechar menu';

function setActiveNavLink(targetId) {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${targetId}`;
    link.classList.toggle('is-active', isActive);
    if (isActive) {
      link.setAttribute('aria-current', 'true');
    } else {
      link.removeAttribute('aria-current');
    }
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

function updateScrollProgress() {
  if (progressBar) {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    progressBar.style.width = `${Math.min(ratio * 100, 100)}%`;
  }

  if (topbar) {
    topbar.classList.toggle('is-scrolled', window.scrollY > 12);
  }
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
      menuToggle.setAttribute('aria-label', menuLabelOpen);
    }
  });
});

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? menuLabelClose : menuLabelOpen);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !nav.classList.contains('is-open')) {
      return;
    }
    nav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', menuLabelOpen);
    menuToggle.focus();
  });
}

let scrollRafId = 0;

const handleScroll = () => {
  window.cancelAnimationFrame(scrollRafId);
  scrollRafId = window.requestAnimationFrame(() => {
    updateScrollProgress();
    updateActiveNavLink();
  });
};

window.addEventListener('scroll', handleScroll, { passive: true });
window.addEventListener('resize', handleScroll);

if (window.location.hash) {
  setActiveNavLink(window.location.hash.slice(1));
}

updateScrollProgress();
updateActiveNavLink();

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
      threshold: 0.12,
    }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}