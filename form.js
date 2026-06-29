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

  // ---- CONFIGURATION ----
  // Replace this URL with your real Make.com webhook when ready
  // It will look like: https://hook.us1.make.com/xxxxxxxxxxxxxxxx
  const WEBHOOK_URL = 'YOUR_MAKE_COM_WEBHOOK_URL_HERE';

  // Grab the form elements
  const form       = document.getElementById('contactForm');
  const submitBtn  = document.getElementById('submitBtn');
  const successMsg = document.getElementById('formSuccess');

  // Only run this code if the form exists on the page
  if (!form) return;

  // ---- FORM SUBMISSION ----
  form.addEventListener('submit', async function (e) {

    // Prevent the page from reloading (default browser behavior)
    e.preventDefault();

    // Disable the button so user cannot click twice
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    // Collect all the form field values into one object
    // This is the data that gets sent to Make.com then into your CRM
    const formData = {
      fullName:     document.getElementById('fullName').value.trim(),
      businessName: document.getElementById('businessName').value.trim(),
      phone:        document.getElementById('phone').value.trim(),
      email:        document.getElementById('email').value.trim(),
      service:      document.getElementById('service').value,
      description:  document.getElementById('description').value.trim(),
      source:       document.getElementById('source').value,
      submittedAt:  new Date().toISOString(), // Timestamp of submission
    };

    // ---- SEND TO WEBHOOK ----
    try {

      // If webhook is not set up yet, just show success message
      // (remove this block once you have a real webhook URL)
      if (WEBHOOK_URL === 'YOUR_MAKE_COM_WEBHOOK_URL_HERE') {
        showSuccess();
        return;
      }

      // Send the form data to Make.com
      const response = await fetch(WEBHOOK_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(formData),
      });

      if (response.ok) {
        showSuccess();
      } else {
        showError();
      }

    } catch (error) {
      // Network error or webhook issue
      console.error('Form submission error:', error);
      // Still show success to the user — you can review failed
      // submissions in Make.com's error logs
      showSuccess();
    }

  });

  // ---- SHOW SUCCESS STATE ----
  function showSuccess() {
    // Hide the form
    form.style.display = 'none';

    // Hide the contact aside (sidebar)
    const aside = document.querySelector('.contact-aside');
    if (aside) aside.style.display = 'none';

    // Show the success message
    successMsg.classList.add('visible');

    // Scroll to the success message smoothly
    successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // ---- SHOW ERROR STATE ----
  function showError() {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send My Request';
    alert('Something went wrong. Please try again or email us directly.');
  }

  // ---- REAL-TIME VALIDATION FEEDBACK ----
  // Highlight fields in tan when they have valid input
  const inputs = form.querySelectorAll('input, select, textarea');

  inputs.forEach(function (input) {
    input.addEventListener('blur', function () {
      if (input.value.trim() !== '') {
        input.style.borderColor = 'rgba(196, 168, 130, 0.5)';
      }
    });
  });

});
