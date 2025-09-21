document.addEventListener('DOMContentLoaded', function () {
  const slides = document.querySelectorAll('.carousel-slide');
  const indicators = document.querySelectorAll('.carousel-indicator');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  let current = 0;
  let interval = null;
  const SLIDE_INTERVAL = 4000;

  function showSlide(idx) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === idx);
      indicators[i].classList.toggle('active', i === idx);
    });
    current = idx;
  }

  function nextSlide() {
    showSlide((current + 1) % slides.length);
  }

  function prevSlide() {
    showSlide((current - 1 + slides.length) % slides.length);
  }

  function startAuto() {
    stopAuto();
    interval = setInterval(nextSlide, SLIDE_INTERVAL);
  }

  function stopAuto() {
    if (interval) clearInterval(interval);
  }

  prevBtn.addEventListener('click', () => {
    prevSlide();
    startAuto();
  });

  nextBtn.addEventListener('click', () => {
    nextSlide();
    startAuto();
  });

  indicators.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      showSlide(idx);
      startAuto();
    });
  });

  // Pause on hover
  document.querySelector('.carousel').addEventListener('mouseenter', stopAuto);
  document.querySelector('.carousel').addEventListener('mouseleave', startAuto);

  startAuto();
});
