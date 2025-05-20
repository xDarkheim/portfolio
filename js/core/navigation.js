// Copyright (c) 2024 Dmytro Hovenko
// All rights reserved.
/**
 * Navigation and scrolling functionality
 */
const Navigation = {
    init() {
        // Initialize mobile menu toggle
        this.initMobileMenu();
        
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', e => {
                const id = anchor.getAttribute('href').slice(1);
                const target = document.getElementById(id);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                    
                    // Close mobile menu if open
                    const menu = document.querySelector('.menu ul');
                    const menuToggle = document.querySelector('.menu-toggle');
                    if (menu && menu.classList.contains('open')) {
                        menu.classList.remove('open');
                        menuToggle.classList.remove('active');
                    }
                }
            });
        });

        // Hide menu on outside click (for mobile, if menu is open)
        document.addEventListener('click', e => {
            const menu = document.querySelector('.menu ul');
            const menuToggle = document.querySelector('.menu-toggle');
            
            // If click is outside menu and toggle, and menu is open
            if (menu && menu.classList.contains('open') && 
                !menu.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                menu.classList.remove('open');
                menuToggle.classList.remove('active');
            }
        });
    },
    
    initMobileMenu() {
        // Create menu toggle button if it doesn't exist
        let menuToggle = document.querySelector('.menu-toggle');
        const menu = document.querySelector('.menu');
        
        if (!menuToggle && menu) {
            menuToggle = document.createElement('button');
            menuToggle.className = 'menu-toggle';
            menuToggle.setAttribute('aria-label', 'Toggle menu');
            menuToggle.innerHTML = '<span></span>';
            
            // Insert before the menu if header controls exist, otherwise append to menu
            const headerControls = document.querySelector('.header-controls');
            if (headerControls) {
                headerControls.appendChild(menuToggle);
            } else {
                menu.prepend(menuToggle);
            }
        }
        
        // Add event listener to toggle
        if (menuToggle) {
            menuToggle.addEventListener('click', e => {
                e.stopPropagation();
                const menuList = document.querySelector('.menu ul');
                if (menuList) {
                    menuList.classList.toggle('open');
                    menuToggle.classList.toggle('active');
                    
                    // Set aria-expanded for accessibility
                    const isExpanded = menuList.classList.contains('open');
                    menuToggle.setAttribute('aria-expanded', isExpanded);
                }
            });
        }
    }
};

export default Navigation;
