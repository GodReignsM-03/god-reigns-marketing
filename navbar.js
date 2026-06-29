/* ============================================
   NAVBAR.JS — Navigation behavior
   
   WHAT THIS FILE DOES:
   1. Adds a shadow to the navbar when you scroll down
   2. Makes the hamburger menu work on mobile
   3. Closes the mobile menu when you click a link
============================================ */

// Wait for the page to fully load before running any code
document.addEventListener('DOMContentLoaded', function () {

  // Grab the elements we need from the HTML
  const navbar    = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');
  const allLinks  = document.querySelectorAll('.nav-link, .nav-cta');

  // ---- SCROLL EFFECT ----
  // When user scrolls down more than 20px, add a shadow to the navbar
  window.addEventListener('scroll', function () {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ---- MOBILE HAMBURGER MENU ----
  // When the hamburger button is clicked, toggle the menu open/closed
  navToggle.addEventListener('click', function () {
    navLinks.classList.toggle('open');

    // Change the icon between hamburger ☰ and X depending on state
    if (navLinks.classList.contains('open')) {
      navToggle.innerHTML = '&#10005;'; // X icon
    } else {
      navToggle.innerHTML = '&#9776;'; // Hamburger icon
    }
  });

  // ---- CLOSE MENU ON LINK CLICK ----
  // When a nav link is clicked on mobile, close the menu automatically
  allLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      navToggle.innerHTML = '&#9776;';
    });
  });

});
