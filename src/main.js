import './view/pages/home-page';

// JS for menu for smaller devices
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

navToggle.addEventListener('click', () => {
    if (window.innerWidth <= 1023) {
        navMenu.classList.add('show-menu');
        toggleNavClose();  
    }
});

navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
    toggleNavClose();  
});

function toggleNavClose() {
    const isMenuVisible = navMenu.classList.contains('show-menu');
    navClose.classList.toggle('visible', isMenuVisible);
}

function toggleLogin() {
    loginForm.classList.toggle('show');
    body.classList.toggle('show-login-overlay');
    loginClose.classList.toggle('visible', loginForm.classList.contains('show'));
}

// Login
const loginBtn = document.getElementById('login-btn');
const loginClose = document.getElementById('login-close');
const loginForm = document.getElementById('login');
const body = document.body;

loginBtn.addEventListener('click', () => {
    toggleLogin();
    toggleNavClose();
});

loginClose.addEventListener('click', () => {
    toggleLogin();
    toggleNavClose();
});

// Close login form when clicking outside of it
document.addEventListener('click', function(event) {
    const loginContainer = document.querySelector('.login__container');
    if (!loginContainer.contains(event.target) && !event.target.matches('#login-btn')) {
        loginForm.classList.remove('show');
        body.classList.remove('show-login-overlay');
        loginClose.classList.remove('visible');
    }
});


