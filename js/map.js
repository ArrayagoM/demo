window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.marker').forEach(el => {
    el.style.top  = `${el.dataset.top}%`;
    el.style.left = `${el.dataset.left}%`;
  });
});
