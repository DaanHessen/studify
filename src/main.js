import './view/pages/home-page';

// menu for smaller devices
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu')
})

navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu')
})



// login
const loginBtn = document.getElementById('login-btn'),
      loginClose = document.getElementById('login-close'),
      loginForm = document.getElementById('login'),
      body = document.body;

      loginBtn.addEventListener('click', toggleLogin);
      loginClose.addEventListener('click', toggleLogin);
      
      function toggleLogin() {
          loginForm.classList.toggle('show');
          body.classList.toggle('show-login-overlay');
      }