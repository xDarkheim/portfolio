// Copyright (c) 2024 Dmytro Hovenko
// All rights reserved.
/**
 * Main JavaScript entry point
 * Initializes all modules
 */
import ThemeManager from './core/theme.js';
import Navigation from './core/navigation.js';
import Animations from './core/animations.js';
import LanguageManager from './lang/lang-core.js';

document.addEventListener('DOMContentLoaded', async () => {
    console.log('Initializing application modules.');
    
    // Initialize core modules
    if (ThemeManager && typeof ThemeManager.init === 'function') {
        ThemeManager.init(); 
    }
    if (Navigation && typeof Navigation.init === 'function') {
        Navigation.init();
    }
    if (Animations && typeof Animations.init === 'function') {
        Animations.init();
    }
    // Ensure LanguageManager completes before other operations that might depend on translations
    if (LanguageManager && typeof LanguageManager.init === 'function') {
        await LanguageManager.init(); 
    }
    
    // Initialize performance optimization utilities
    initScrollOptimization();
    initMobileOptimizations();
    initLazyLoading();
});

/**
 * Optimizes animations during scroll events.
 * Adds/removes CSS classes to pause animations while scrolling.
 */
function initScrollOptimization() {
    const body = document.body;
    let scrollTimeout;
    // let lastScrollTop = 0; // This variable was assigned but not used.
    
    // Initially enable animations
    body.classList.add('enable-animations');
    
    window.addEventListener('scroll', () => {
        // const st = window.pageYOffset || document.documentElement.scrollTop;
        // lastScrollTop = st; // lastScrollTop is not used for any logic.
        
        // Add 'is-scrolling' class to potentially pause animations via CSS
        if (!body.classList.contains('is-scrolling')) {
            body.classList.add('is-scrolling');
            body.classList.remove('enable-animations');
        }
        
        // Clear previous timeout and set a new one to re-enable animations after scrolling stops
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            body.classList.remove('is-scrolling');
            body.classList.add('enable-animations');
        }, 150); // Adjusted timeout for a slightly smoother experience
    }, {passive: true}); // Use passive listener for better scroll performance
}

/**
 * Applies specific optimizations for mobile devices.
 */
function initMobileOptimizations() {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    
    if (isMobile) {
        // Add class to reduce or disable animations for better performance on mobile
        document.body.classList.add('reduce-motion');
        
        // Use passive listeners for touch events to improve scrolling performance
        window.addEventListener('touchstart', () => {}, {passive: true});
        window.addEventListener('touchmove', () => {}, {passive: true});
    }
}

/**
 * Implements lazy loading for images.
 * Uses native lazy loading if supported, otherwise falls back to Intersection Observer.
 */
function initLazyLoading() {
    // Check for native lazy loading support
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            if (img.dataset.src) { // Ensure data-src exists before assigning
                img.src = img.dataset.src;
            }
        });
    } else {
        // Fallback to Intersection Observer for browsers that don't support native lazy loading
        const imgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) { // Ensure data-src exists
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src'); // Optional: remove data-src after loading
                    }
                    observer.unobserve(img); // Stop observing the image once loaded
                }
            });
        });
        
        // Observe all images with a data-src attribute
        document.querySelectorAll('img[data-src]').forEach(img => {
            imgObserver.observe(img);
        });
    }
}
