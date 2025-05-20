// Copyright (c) 2024 Dmytro Hovenko
// All rights reserved.
/**
 * Theme management functionality
 * Handles light/dark mode switching and persistence.
 */
const ThemeManager = {
    init() { 
        const themeToggleBtn = document.getElementById('themeToggleBtn');
        const themeIcon = document.getElementById('themeIcon'); // Assumes an element to display current theme icon (sun/moon)
        
        // Determine initial theme: localStorage > system preference > default
        let currentTheme = localStorage.getItem('theme');
        const defaultTheme = 'dark'; // Site's default theme
        const allowSystemPreference = true; // Whether to respect OS color scheme preference

        if (!currentTheme) { // No theme saved in localStorage
            if (allowSystemPreference && window.matchMedia) { // Check for system preference support
                currentTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
            } else {
                currentTheme = defaultTheme; // Fallback to default theme
            }
        }
        
        this.applyTheme(currentTheme, themeIcon);

        // Add event listener for the theme toggle button
        if (themeToggleBtn) {
            themeToggleBtn.addEventListener('click', () => {
                // Determine new theme based on current body class
                const newTheme = document.body.classList.contains('light-mode') ? 'dark' : 'light';
                this.applyTheme(newTheme, themeIcon);
            });
        } else {
            console.warn('Theme toggle button #themeToggleBtn not found.');
        }
    },

    /**
     * Applies the specified theme to the document and updates the theme icon.
     * @param {string} theme - The theme to apply ('light' or 'dark').
     * @param {HTMLElement} themeIconElement - The HTML element for the theme icon.
     */
    applyTheme(theme, themeIconElement) {
        document.body.classList.remove('light-mode', 'dark-mode'); // Remove existing theme classes
        document.body.classList.add(theme === 'light' ? 'light-mode' : 'dark-mode');
        
        if (themeIconElement) {
            themeIconElement.innerHTML = theme === 'light' ? '&#9790;' : '&#9788;'; // Moon for light, Sun for dark
        }
        
        localStorage.setItem('theme', theme); // Persist theme choice
        document.documentElement.setAttribute('data-theme', theme); // Set data-theme for CSS variable scoping
    }
    // getPreferredTheme() was effectively integrated into init for simplicity.
    // If needed separately, it can be:
    // getPreferredTheme() {
    //     if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    //         return 'light';
    //     }
    //     return 'dark'; 
    // }
};

export default ThemeManager;
