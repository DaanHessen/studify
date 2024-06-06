import { initializePodcastLogic } from './podcastLogic.js';

document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');

    const highlightLink = (page) => {
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === page) {
                link.classList.add('active');
            }
        });
    };

    const loadContent = async (page) => {
        try {
            const response = await fetch(`nested/${page}.html`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const content = await response.text();
            mainContent.innerHTML = content;

            // Reinitialize podcast logic if the podcasts section is detected
            if (document.querySelector("#popular-container")) {
                initializePodcastLogic();
            }
        } catch (error) {
            console.error('Error loading content:', error);
        }
    };

    // Initial content load
    const defaultPage = 'browse';
    loadContent(defaultPage).then(() => highlightLink(defaultPage));

    // Event listeners for navigation
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            loadContent(page).then(() => highlightLink(page));
        });
    });
});
