import './view/pages/home-page';

// menu for smaller devices
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const closeButton = document.getElementById('nav-close'); // Update closeButton to refer to the hamburger menu close button

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
    navClose.classList.toggle('visible');
    closeButton.classList.toggle('visible'); // Toggle the visibility of the close button
}

// login
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

function toggleLogin() {
    loginForm.classList.toggle('show');
    body.classList.toggle('show-login-overlay');
    closeButton.classList.toggle('visible'); // Toggle the visibility of the close button
}