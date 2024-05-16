const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navClose = document.getElementById('nav-close');
const loginBtn = document.getElementById('login-btn');
const login = document.getElementById('login');
const loginClose = document.getElementById('login-close');
const mainContent = document.getElementById('main-content');

// highlight active page
const highlightLink = (page) => {
  const navLinks = document.querySelectorAll('.nav__link');
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === page) {
      link.classList.add('active');
    }
  });
};

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

const defaultPage = 'podcasts';
loadContent(`nested/${defaultPage}.html`).then(() => highlightLink(defaultPage));


// open & closing of hamburger menu / login form
navToggle.addEventListener('click', () => {
  navMenu.classList.add('show-menu');
});

navClose.addEventListener('click', () => {
  navMenu.classList.remove('show-menu');
});

loginBtn.addEventListener('click', () => {
  login.classList.add('show-login');
});

loginClose.addEventListener('click', () => {
  login.classList.remove('show-login');
});

// close hamburger menu / login form when clicking outside of container
document.addEventListener('click', (e) => {
  if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
    navMenu.classList.remove('show-menu');
  }
});

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
    loadContent(`nested/${href}.html`).then(() => highlightLink(href));
  });
});

// sidebar button (for smaller devices on podcast page)
document.addEventListener('DOMContentLoaded', function() {
  const sidebar = document.getElementById('sidebar');
  const toggleButton = document.getElementById('sidebar-toggle');

  toggleButton.addEventListener('click', function () {
      sidebar.classList.toggle('active');
  });
});