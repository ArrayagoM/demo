class AnimatedCounters {
  constructor() {
    this.counters = document.querySelectorAll('.metric-number');
    this.options = {
      threshold: 0.5
    };
    this.init();
  }

  init() {
    if (!this.counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, this.options);

    this.counters.forEach(counter => {
      observer.observe(counter);
    });
  }

  animate(element) {
    const target = parseInt(element.textContent);
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        clearInterval(timer);
        current = target;
      }
      element.textContent = Math.floor(current);
    }, 16);
  }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  new AnimatedCounters();
});