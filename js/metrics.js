function animateValue(id, start, end, duration) {
  let current = start;
  const increment = end > start ? 1 : -1;
  const stepTime = Math.abs(Math.floor(duration / (end - start)));
  const obj = document.getElementById(id);

  const timer = setInterval(() => {
    current += increment;
    obj.textContent = current;
    if (current === end) clearInterval(timer);
  }, stepTime);
}

let animated = false;

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !animated) {
        console.log('Animando los números...');
        animated = true;
        animateValue('clients', 0, 100, 1000);
        animateValue('projects', 0, 150, 1000);
        animateValue('years', 0, 5, 1000);
        animateValue('retention', 0, 100, 1000);
      }
    });
  },
  { threshold: 0.5 }
);

observer.observe(document.getElementById('metrics-section'));
