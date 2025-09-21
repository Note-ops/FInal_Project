document.addEventListener('DOMContentLoaded', function () {
  // Carousel
  const slides = document.querySelectorAll('.slide');
  let idx = 0;
  const show = i => {
    slides.forEach((s, j) => {
      s.classList.toggle('active', false);
      if (i === j) {
        s.classList.add('active');
      }
    });
  };
  const nextBtn = document.getElementById('next');
  const prevBtn = document.getElementById('prev');
  if (!nextBtn || !prevBtn) {
    console.error('Carousel buttons not found');
  }
  if (slides.length === 0) {
    console.error('No slides found');
  }
  nextBtn && nextBtn.addEventListener('click', () => {
    idx = (idx + 1) % slides.length;
    show(idx);
  });
  prevBtn && prevBtn.addEventListener('click', () => {
    idx = (idx - 1 + slides.length) % slides.length;
    show(idx);
  });
  setInterval(() => {
    idx = (idx + 1) % slides.length;
    show(idx);
  }, 5000);

  // Package filtering
  const search = document.getElementById('search');
  const filter = document.getElementById('filter');
  const cards = Array.from(document.querySelectorAll('.card'));
  function applyFilter() {
    const q = search.value.trim().toLowerCase();
    const t = filter.value;
    cards.forEach(c => {
      const type = c.dataset.type || '';
      const text = (c.innerText || '').toLowerCase();
      const matches = (t === 'all' || type === t) && (q === '' || text.includes(q));
      c.style.display = matches ? '' : 'none';
    });
  }
  search.addEventListener('input', applyFilter);
  filter.addEventListener('change', applyFilter);

  // AJAX Contact form
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      status.textContent = 'Sending...';
      const data = new FormData(form);
      try {
        const res = await fetch(form.action, { method: 'POST', body: data });
        const json = await res.json();
        if (json.success) {
          status.textContent = 'Message sent — thanks!';
          form.reset();
        } else {
          status.textContent = json.error || 'Could not send message.';
        }
      } catch (err) {
        status.textContent = 'Network error. Try again later.';
        // For debugging, log the error:
        console.error('Contact form error:', err);
      }
    });
  }
});
