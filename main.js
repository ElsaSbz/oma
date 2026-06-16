/* ── EmailJS Setup ── */
emailjs.init('Rc_y2F_UNRbHZnUKO');

/* ── Smooth Scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── Contact Form ── */
const contactForm = document.getElementById('contactForm');
const successMsg  = document.getElementById('successMessage');
const errorMsg    = document.getElementById('errorMessage');
const submitBtn   = document.getElementById('submitBtn');

const SEND_ICON = `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
</svg>`;

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();

  errorMsg.style.display = 'none';
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  const templateParams = {
    from_name:  document.getElementById('name').value,
    from_email: document.getElementById('email').value,
    phone:      document.getElementById('phone').value,
    message:    document.getElementById('message').value || '—',
    to_email:   'shadisabzali1991@gmail.com'
  };

  emailjs.send('service_87fp47r', 'template_402idwf', templateParams)
    .then(function () {
      contactForm.classList.add('hidden');
      successMsg.classList.remove('hidden');

      setTimeout(function () {
        contactForm.classList.remove('hidden');
        successMsg.classList.add('hidden');
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Request ' + SEND_ICON;
      }, 4000);
    })
    .catch(function (error) {
      console.error('EmailJS error:', error);
      errorMsg.style.display = 'block';
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Send Request ' + SEND_ICON;
    });
});
