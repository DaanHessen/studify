// Navigation Menu Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navClose = document.getElementById('nav-close');
const loginBtn = document.getElementById('login-btn');
const login = document.getElementById('login');
const loginClose = document.getElementById('login-close');

// Open Menu
navToggle.addEventListener('click', () => {
  navMenu.classList.add('show-menu');
});

// Close Menu
navClose.addEventListener('click', () => {
  navMenu.classList.remove('show-menu');
});

// Open Login
loginBtn.addEventListener('click', () => {
  login.classList.add('show-login');
});

// Close Login
loginClose.addEventListener('click', () => {
  login.classList.remove('show-login');
});

// Close Menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
    navMenu.classList.remove('show-menu');
  }
});

// Close Login when clicking outside
document.addEventListener('click', (e) => {
  if (!login.contains(e.target) && !loginBtn.contains(e.target)) {
    login.classList.remove('show-login');
  }
});

// Highlight the active page link
const navLinks = document.querySelectorAll('.nav__link');

navLinks.forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add('active');
  }
});