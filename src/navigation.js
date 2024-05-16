// Navigation Menu Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navClose = document.getElementById('nav-close');
const loginBtn = document.getElementById('login-btn');
const login = document.getElementById('login');
const loginClose = document.getElementById('login-close');
const mainContent = document.getElementById('main-content');


// load main content to page
const loadContent = async (url) => {
  try {
    const response = await fetch(url);
    const content = await response.text();
    mainContent.innerHTML = content;
  } catch (error) {
    console.error('Error: ', error);
  }
};

loadContent('nested/podcasts.html')

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

// content handler
const navLinks = document.querySelectorAll('.nav__link');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const href = link.getAttribute('href');
    loadContent(`nested/${href}.html`);

    // highlight active page
    navLinks.forEach(navLink => navLink.classList.remove('active'));
    link.classList.add('active');
  })

})

