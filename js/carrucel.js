document.addEventListener('DOMContentLoaded', () => {
  const data = [
    {
      key: 'SCA',
      title: 'SCA',
      time: '2015 - 2020',
      desc: 'Descripción de SCA...',
    },
    {
      key: 'Unops',
      title: 'United Nations Office for Project Services (UNOPS)',
      time: '2017 - 2022',
      desc: 'Hemos trabajado con UNOPS en...',
    },
    {
      key: 'giz',
      title: 'GIZ',
      time: '2018 - Present',
      desc: 'Desde 2018 apoyamos a GIZ con...',
    },
    {
      key: 'australian',
      title: 'Australian Trade Commission',
      time: '2016 - 2019',
      desc: 'Campañas para promover comercio en...',
    },
    {
      key: 'aselsan',
      title: 'ASELSAN',
      time: '2020 - Present',
      desc: 'Desarrollos para ASELSAN en...',
    },
    {
      key: 'bbva',
      title: 'Garanti BBVA',
      time: '2019 - Present',
      desc: 'Estrategias digitales para BBVA...',
    },
    {
      key: 'aga',
      title: 'AGA KHAN FOUNDATION CANADA',
      time: '2014 - 2018',
      desc: 'Automatización de procesos para AGA...',
    },
    {
      key: 'Undp',
      title: 'United Nations Development Programme (UNDP)',
      time: '2019 - Present',
      desc: 'Since 2019, we’ve helped UNDP enhance its digital presence through targeted campaigns, social media strategy, and content that drives global engagement and awareness.',
    },
  ];

  const carousel = document.querySelector('.carousel');
  const dotsContainer = document.querySelector('.carousel-dots');
  const textContainer = document.querySelector('.carousel-text');

  // 1) Generar items y duplicarlos para infinito
  const items = [];
  data.forEach((item) => {
    const div = document.createElement('div');
    div.className = 'carousel-item';
    div.dataset.key = item.key;
    const img = document.createElement('img');
    img.src = `./image/OurClient/${item.key}.png`;
    img.alt = item.key;
    div.append(img);
    items.push(div);
  });
 
  const allItems = [...items, ...items.map((i) => i.cloneNode(true))];
  allItems.forEach((i) => carousel.append(i));


  data.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.dataset.idx = idx;
    dotsContainer.append(dot);
  });

  // Variables para controlar la pausa
  let isPaused = false;
  let pauseStartTime = 0;
  const PAUSE_DURATION = 3000;

  // 3) Animación infinita con pausa
  let pos = 0;
  const speed = 0.105;
  function animate() {
    if (!isPaused) {
      pos -= speed;
      if (pos <= -carousel.scrollWidth / 2) pos = 0;
      carousel.style.transform = `translateX(${pos}px)`;
    } else {
      
      if (Date.now() - pauseStartTime >= PAUSE_DURATION) {
        isPaused = false;
      }
    }
    detectCenter();
    requestAnimationFrame(animate);
  }
  animate();

  // 4) Detección de centro (con pausa)
function detectCenter() {
  const centerX = window.innerWidth / 2;
  const TOLERANCE = 10; // Margen de error en píxeles (ajústalo según necesites)
  
  allItems.forEach((item) => {
    const { left, width } = item.getBoundingClientRect();
    const itemCenter = left + width / 2;
    const distanceToCenter = Math.abs(itemCenter - centerX);

    // Solo activa si el centro del item está muy cerca del centro de la pantalla
    if (distanceToCenter < TOLERANCE) {
      const key = item.dataset.key;
      if (!item.classList.contains('active')) {
        // Desactivar todos
        document.querySelectorAll('.carousel-item.active').forEach((e) => {
          e.classList.remove('active');
          e.querySelector('img').src = `./image/OurClient/${e.dataset.key}.png`;
        });
        // Activar este
        item.classList.add('active');
        item.querySelector('img').src = `./image/OurClient/${key}(azul).png`;
        showText(key);

        
        isPaused = true;
        pauseStartTime = Date.now();
      }
    }
  });
}
  // 5) Mostrar texto y actualizar dots (sin cambios)
  function showText(key) {
    const info = data.find((d) => d.key === key);
    textContainer.innerHTML = `
      <h3><strong>${info.title}</strong></h3> &nbsp; <em>${info.time}</em>
      <p>${info.desc}</p>
    `;
    
    document.querySelectorAll('.dot').forEach((dot) => dot.classList.remove('active'));
    const idx = data.findIndex((d) => d.key === key);
    const dot = document.querySelector(`.dot[data-idx="${idx}"]`);
    dot.classList.add('active');
  }
});
