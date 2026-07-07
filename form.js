/* ============================================
   FORM.JS — Contact form behavior

   WHAT THIS FILE DOES:
   1. Validates that required fields are filled
   2. Submits form data to a webhook (Make.com)
   3. Shows a success message after submission
   4. Shows an error if something goes wrong

   IMPORTANT — WEBHOOK SETUP:
   When you are ready to connect Make.com,
   replace the WEBHOOK_URL value below with
   your real Make.com webhook URL.
   That is the only change needed to make
   this form feed your CRM automatically.
============================================ */

document.addEventListener('DOMContentLoaded', function () {

  window.formspree = window.formspree || function () {
    (formspree.q = formspree.q || []).push(arguments);
  };

  formspree('initForm', {
    formElement: '#contactForm',
    formId: 'xeebwabq',
  });

  const form       = document.getElementById('contactForm');
  const submitBtn  = document.getElementById('submitBtn');
  const successMsg = document.getElementById('formSuccess');
  const aside      = document.querySelector('.contact-aside');

  if (!form) return;

  form.addEventListener('formspree:success', function () {
    form.style.display   = 'none';
    if (aside) aside.style.display = 'none';
    successMsg.classList.add('visible');
    successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  form.addEventListener('formspree:error', function () {
    alert('Something went wrong. Please try again.');
  });

  const inputs = form.querySelectorAll('input, select, textarea');
  inputs.forEach(function (input) {
    input.addEventListener('blur', function () {
      if (input.value.trim() !== '') {
        input.style.borderColor = 'rgba(196, 168, 130, 0.5)';
      }
    });
  });

});
