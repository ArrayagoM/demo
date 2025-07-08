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
  // duplica
  const allItems = [...items, ...items.map((i) => i.cloneNode(true))];
  allItems.forEach((i) => carousel.append(i));

  // 2) Crear dots
  data.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.dataset.idx = idx;
    dotsContainer.append(dot);
  });

  // 3) Animación infinita
  let pos = 0;
  const speed = 0.105; // px por frame
  function animate() {
    pos -= speed;
    if (pos <= -carousel.scrollWidth / 2) pos = 0;
    carousel.style.transform = `translateX(${pos}px)`;
    detectCenter();
    requestAnimationFrame(animate);
  }
  animate();

  // 4) Detección de centro
  function detectCenter() {
    const centerX = window.innerWidth / 2;
    allItems.forEach((item, i) => {
      const { left, width } = item.getBoundingClientRect();
      const itemCenter = left + width / 2;
      if (Math.abs(itemCenter - centerX) < width / 2) {
        const key = item.dataset.key;
        if (!item.classList.contains('active')) {
          // desactivar todos
          document.querySelectorAll('.carousel-item.active').forEach((e) => {
            e.classList.remove('active');
            e.querySelector('img').src = `./image/OurClient/${e.dataset.key}.png`;
          });
          // activar este
          item.classList.add('active');
          item.querySelector('img').src = `./image/OurClient/${key}(azul).png`;
          showText(key);
        }
      }
    });
  }

  // 5) Mostrar texto y actualizar dots
  function showText(key) {
    const info = data.find((d) => d.key === key);
    textContainer.innerHTML = `
      <h3><strong>${info.title}</strong></h3> &nbsp; <em>${info.time}</em>
      <p>${info.desc}</p>
    `;
    // dots
    document.querySelectorAll('.dot').forEach((dot) => dot.classList.remove('active'));
    const idx = data.findIndex((d) => d.key === key);
    const dot = document.querySelector(`.dot[data-idx="${idx}"]`);
    dot.classList.add('active');
  }
});
