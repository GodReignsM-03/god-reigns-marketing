/* ============================================
   MAIN.JS — Page interactions and animations

   WHAT THIS FILE DOES:
   1. Fades in sections as you scroll down
   2. Highlights the active nav link based
      on which section you are viewing
   3. Adds subtle entrance animations
============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ---- SCROLL FADE-IN ANIMATION ----
  // Elements with class "fade-in" become visible as you scroll to them
  // We add this class via JavaScript so that if JS fails, content still shows

  const sections = document.querySelectorAll('.services, .proof, .about, .contact, .footer');

  // IntersectionObserver watches elements and fires when they enter the screen
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        // Stop watching once visible — no need to keep observing
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1, // Trigger when 10% of the section is visible
  });

  // Set initial state and start observing each section
  sections.forEach(function (section) {
    section.style.opacity    = '0';
    section.style.transform  = 'translateY(24px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });


  // ---- ACTIVE NAV LINK HIGHLIGHTING ----
  // As you scroll, the correct nav link lights up in tan

  const navLinks = document.querySelectorAll('.nav-link');
  const sectionIds = ['home', 'services', 'proof', 'about', 'contact'];

  window.addEventListener('scroll', function () {
    let current = '';

    sectionIds.forEach(function (id) {
      const section = document.getElementById(id);
      if (!section) return;

      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = id;
      }
    });

    navLinks.forEach(function (link) {
      link.style.color = '';  // Reset to default
      if (link.getAttribute('href') === '#' + current) {
        link.style.color = 'var(--color-tan)';
      }
    });
  });


  // ---- SERVICE CARD STAGGER ----
  // Cards appear one after another instead of all at once

  const serviceCards = document.querySelectorAll('.service-card');
  const cardObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, index) {
      if (entry.isIntersecting) {
        // Delay each card slightly more than the last
        setTimeout(function () {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 120);
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  serviceCards.forEach(function (card) {
    card.style.opacity    = '0';
    card.style.transform  = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.3s ease';
    cardObserver.observe(card);
  });

});
