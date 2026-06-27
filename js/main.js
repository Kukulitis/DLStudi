// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
reveals.forEach(el => observer.observe(el));

// Nav active state
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--gold-hi)' : '';
  });
});

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinksList = document.querySelector('.nav-links');
if (navToggle && navLinksList) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinksList.classList.toggle('open');
  });
  navLinksList.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinksList.classList.remove('open');
    });
  });
}

// WhatsApp booking widget
const waBookBtn = document.getElementById('wa-book-btn');
if (waBookBtn) {
  const waDateInput = document.getElementById('wa-date');
  const waServiceSelect = document.getElementById('wa-service');
  const waPhoneNumber = '31681984444';

  waDateInput.min = new Date().toISOString().split('T')[0];

  waBookBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if (!waDateInput.value) {
      waDateInput.focus();
      waDateInput.reportValidity?.();
      return;
    }

    const formattedDate = new Date(waDateInput.value + 'T00:00:00').toLocaleDateString('en-GB', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
    const service = waServiceSelect.value;
    const message = `Hi, I would like to book a ${service} on ${formattedDate}.`;
    const waUrl = `https://wa.me/${waPhoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank', 'noopener');
  });
}

// Form submit placeholder
document.querySelector('button.btn-primary').addEventListener('click', () => {
  alert('Booking request sent! We\'ll be in touch within 24 hours.');
});
