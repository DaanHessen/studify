const body = document.body;
const lightModeToggle = document.getElementById('light-mode-toggle');

// Function to set the theme based on the user's preference
function setTheme(isLightMode) {
    if (isLightMode) {
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
    }
}

// Check the saved theme in localStorage and set the initial state
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    lightModeToggle.checked = true;
    setTheme(true);
} else {
    setTheme(false);
}

// Add an event listener to the toggle switch
lightModeToggle.addEventListener('change', () => {
    setTheme(lightModeToggle.checked);
});