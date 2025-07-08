const hamburger = document.querySelector('.hamburger');
const navSections = document.querySelector('.nav-sections');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navSections.classList.toggle('active');
});

document.querySelectorAll('.nav-sections span').forEach((item) => {
  item.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navSections.classList.remove('active');
  });
});
