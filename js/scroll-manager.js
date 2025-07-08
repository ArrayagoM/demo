class ScrollManager {
  constructor() {
    this.sections = document.querySelectorAll('[data-scroll-section]');
    this.options = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    };
    this.init();
  }

  init() {
    if (!this.sections.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, this.options);

    this.sections.forEach((section) => {
      observer.observe(section);
    });
  }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  new ScrollManager();
});
