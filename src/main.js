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

// JS for menu for smaller devices
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");

    // Check if the podcasts section is present in the DOM
    const podcastsSectionPresent = document.querySelector("#popular-container");

    if (podcastsSectionPresent) {
        console.log("Podcasts section detected. Running podcast logic.");

        const popularContainer = document.getElementById("popular-container");
        const recommendedContainer = document.getElementById("recommended-container");
        const newContainer = document.getElementById("new-container");

        console.log("popularContainer:", popularContainer);
        console.log("recommendedContainer:", recommendedContainer);
        console.log("newContainer:", newContainer);

        if (!popularContainer || !recommendedContainer || !newContainer) {
            console.error("One or more containers are missing in the DOM.");
            return;
        }

        // Ensure templates are properly identified
        const popularTemplate = document.querySelector("#popular-container .template");
        const recommendedTemplate = document.querySelector("#recommended-container .template");
        const newTemplate = document.querySelector("#new-container .template");

        console.log("popularTemplate:", popularTemplate);
        console.log("recommendedTemplate:", recommendedTemplate);
        console.log("newTemplate:", newTemplate);

        if (!popularTemplate || !recommendedTemplate || !newTemplate) {
            console.error("One or more templates are missing.");
            return;
        }

        // Function to replace placeholders with actual data
        const fillTemplate = (template, data) => {
            let filledTemplate = template.outerHTML;
            for (let key in data) {
                const placeholder = new RegExp(`%${key}%`, 'g');
                filledTemplate = filledTemplate.replace(placeholder, data[key]);
            }
            return filledTemplate;
        };

        // Function to create podcast elements
        const createPodcastElement = (podcast, template) => {
            const podcastDiv = document.createElement("div");
            podcastDiv.innerHTML = fillTemplate(template, podcast);
            // Remove template class from the new element
            podcastDiv.firstElementChild.classList.remove("template");
            return podcastDiv.firstElementChild;
        };

        // Function to fetch and display podcasts
        const fetchAndDisplayPodcasts = (container, template) => {
            console.log("Fetching podcasts for container:", container);
            fetch("http://localhost:5001/fetch_podcasts")
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("Podcasts fetched successfully:", data);
                    data.forEach(podcast => {
                        const podcastElement = createPodcastElement(podcast, template);
                        container.appendChild(podcastElement);
                    });
                })
                .catch(error => console.error("Error fetching data:", error));
        };

        // Fetch and display podcasts for each section
        fetchAndDisplayPodcasts(popularContainer, popularTemplate);
        fetchAndDisplayPodcasts(recommendedContainer, recommendedTemplate);
        fetchAndDisplayPodcasts(newContainer, newTemplate);
    } else {
        console.log("Podcasts section not detected. Skipping podcast logic.");
    }

    // JS for menu for smaller devices
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            if (window.innerWidth <= 1023) {
                if (navMenu) navMenu.classList.add('show-menu');
                toggleNavClose();
            }
        });
    } else {
        console.error("navToggle element is missing.");
    }

    if (navClose) {
        navClose.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('show-menu');
            toggleNavClose();
        });
    } else {
        console.error("navClose element is missing.");
    }

    function toggleNavClose() {
        if (navMenu && navClose) {
            const isMenuVisible = navMenu.classList.contains('show-menu');
            navClose.classList.toggle('visible', isMenuVisible);
        }
    }

    // Login
    const loginBtn = document.getElementById('login-btn');
    const loginClose = document.getElementById('login-close');
    const loginForm = document.getElementById('login');

    if (loginBtn && loginClose && loginForm) {
        loginBtn.addEventListener('click', () => {
            toggleLogin();
            toggleNavClose();
        });

        loginClose.addEventListener('click', () => {
            toggleLogin();
            toggleNavClose();
        });
    } else {
        console.error("One or more login elements are missing.");
    }

    function toggleLogin() {
        if (loginForm && loginClose && body) {
            loginForm.classList.toggle('show');
            body.classList.toggle('show-login-overlay');
            loginClose.classList.toggle('visible', loginForm.classList.contains('show'));
        }
    }

    // Close login form when clicking outside of it
    document.addEventListener('click', function(event) {
        const loginContainer = document.querySelector('.login__container');
        if (loginContainer && !loginContainer.contains(event.target) && !event.target.matches('#login-btn')) {
            if (loginForm && loginClose) {
                loginForm.classList.remove('show');
                body.classList.remove('show-login-overlay');
                loginClose.classList.remove('visible');
            }
        }
    });
});
