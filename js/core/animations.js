// Copyright (c) 2024 Dmytro Hovenko
// All rights reserved.
/**
 * Animation and transition functionality
 */
const Animations = {
    init() {
        // Handle loading screen
        const loadingScreen = document.getElementById('loadingScreen');
        window.addEventListener('load', () => {
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
                setTimeout(() => loadingScreen.remove(), 1000);
            }
        });

        // Sequential section fade-in
        this.initSectionFadeIn();
        
        // Initialize skill animations
        this.initSkillAnimations();
    },
    
    initSectionFadeIn() {
        const sections = Array.from(document.querySelectorAll('section'));
        sections.forEach(section => section.classList.add('hidden'));
        
        let i = 0;
        const showNext = () => {
            if (i < sections.length) {
                sections[i++].classList.add('visible');
                setTimeout(showNext, 250);
            }
        };
        
        showNext();
    },
    
    initSkillAnimations() {
        // Setup intersection observer for skill bars
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Reset and replay the animation when skill section comes into view
                    const skillBars = entry.target.querySelectorAll('.skill-level-fill');
                    skillBars.forEach(bar => {
                        // Reset the animation by removing and re-adding the class
                        bar.style.animation = 'none';
                        // Force reflow
                        void bar.offsetWidth;
                        // Re-add the animation with slightly slower timing for beginner levels
                        bar.style.animation = 'skillLoad 1.8s cubic-bezier(0.22, 1, 0.36, 1) forwards';
                    });
                    
                    // Observe only once
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });
        
        // Observe skills containers
        document.querySelectorAll('.skills-box').forEach(box => {
            observer.observe(box);
        });
    }
};

export default Animations;
