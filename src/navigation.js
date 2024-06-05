const mainContent = document.getElementById('main-content');

// Utility for platform colors
const platformColors = {
    podimo: '#7a4bf9',
    spotify: '#1DB954',
    // more later on
};

const applyPlatformColor = (podcastElement, platform) => {
    const color = platformColors[platform.toLowerCase()];
    if (color) {
        const label = document.createElement('div');
        label.classList.add('platform-label');
        label.style.backgroundColor = color; // Set background color of the label

        const platformName = document.createElement('span');
        platformName.classList.add('platform-name');
        platformName.textContent = platform.charAt(0).toUpperCase() + platform.slice(1);
        
        const visitLabel = document.createElement('span');
        visitLabel.classList.add('visit-label');
        visitLabel.textContent = 'Bezoek';

        label.appendChild(platformName);
        label.appendChild(visitLabel);
        podcastElement.appendChild(label);
    }
};

// Example usage
document.querySelectorAll('.podcast').forEach(podcast => {
    const platform = podcast.dataset.platform; // Assuming you have data-platform attribute
    applyPlatformColor(podcast, platform);
});




// Function to initialize podcast logic
const initializePodcastLogic = () => {
    console.log("Initializing podcast logic");

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

    // Hide templates
    popularTemplate.style.display = 'none';
    recommendedTemplate.style.display = 'none';
    newTemplate.style.display = 'none';

    const fillTemplate = (template, data) => {
        let filledTemplate = template.outerHTML;
        for (let key in data) {
            const placeholder = new RegExp(`%${key}%`, 'g');
            filledTemplate = filledTemplate.replace(placeholder, data[key]);
        }
        return filledTemplate;
    };

    const createPodcastElement = (podcast, template) => {
        const podcastDiv = document.createElement("div");
        podcastDiv.innerHTML = fillTemplate(template, podcast);
        const podcastElement = podcastDiv.firstElementChild;
        podcastElement.classList.remove("template");
        podcastElement.style.display = 'block';

        // Add platform-specific color and label
        if (podcast.platform) {
            applyPlatformColor(podcastElement, podcast.platform);
        }

        return podcastElement;
    };

    const fetchAndDisplayPodcasts = () => {
        console.log("Fetching podcasts for containers");
        fetch("http://localhost:5001/fetch_podcasts")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log("Podcasts fetched successfully:", data);

                // Clear existing content
                popularContainer.innerHTML = '';
                recommendedContainer.innerHTML = '';
                newContainer.innerHTML = '';

                data.popular.slice(0, 6).forEach(podcast => {
                    const podcastElement = createPodcastElement(podcast, popularTemplate);
                    popularContainer.appendChild(podcastElement);
                });

                data.recommended.slice(0, 6).forEach(podcast => {
                    const podcastElement = createPodcastElement(podcast, recommendedTemplate);
                    recommendedContainer.appendChild(podcastElement);
                });

                data.new.slice(0, 6).forEach(podcast => {
                    const podcastElement = createPodcastElement(podcast, newTemplate);
                    newContainer.appendChild(podcastElement);
                });
            })
            .catch(error => console.error("Error fetching data:", error));
    };

    fetchAndDisplayPodcasts();
};

// Function to highlight active page
const highlightLink = (page) => {
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === page) {
            link.classList.add('active');
        }
    });
};

// Load main content to page
const loadContent = async (url) => {
    try {
        const response = await fetch(url);
        const content = await response.text();
        mainContent.innerHTML = content;

        // Reinitialize podcast logic if the podcasts section is detected
        if (document.querySelector("#popular-container")) {
            initializePodcastLogic();
        }
    } catch (error) {
        console.error('Error: ', error);
    }
};

// Initial content load
const defaultPage = 'podcasts';
loadContent(`nested/${defaultPage}.html`).then(() => highlightLink(defaultPage));

// Observe changes to main content
const observer = new MutationObserver(() => {
    if (document.querySelector("#popular-container")) {
        initializePodcastLogic();
    }
});
observer.observe(mainContent, { childList: true, subtree: true });

// Event listeners for navigation
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('data-page');
        loadContent(`nested/${href}`).then(() => highlightLink(href));
    });
});

// JS for menu for smaller devices
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
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
const loginBtn = document.getElementById('login-btn');
const login = document.getElementById('login');
const loginClose = document.getElementById('login-close');
const body = document.body;

if (loginBtn && login && loginClose) {
    loginBtn.addEventListener('click', () => {
        login.classList.add('show-login');
        body.classList.add('show-login-overlay'); // Ensure body gets overlay class
    });

    loginClose.addEventListener('click', () => {
        login.classList.remove('show-login');
        body.classList.remove('show-login-overlay'); // Remove overlay class from body
    });

    // Close login form when clicking outside of it
    document.addEventListener('click', function(event) {
        const loginContainer = document.querySelector('.login__container');
        if (loginContainer && !loginContainer.contains(event.target) && !event.target.matches('#login-btn')) {
            login.classList.remove('show-login');
            body.classList.remove('show-login-overlay');
        }
    });
} else {
    console.error('One or more login elements are missing.');
}
// Close login form when clicking outside of it
document.addEventListener('click', function(event) {
    const loginContainer = document.querySelector('.login__container');
    if (loginContainer && !loginContainer.contains(event.target) && !event.target.matches('#login-btn')) {
        login.classList.remove('show-login');
        body.classList.remove('show-login-overlay');
        loginClose.classList.remove('visible');
    }
});

// Sidebar button (for smaller devices on podcast page)
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const toggleButton = document.getElementById('sidebar-toggle');

    toggleButton.addEventListener('click', function () {
        sidebar.classList.toggle('active');
    });
});
