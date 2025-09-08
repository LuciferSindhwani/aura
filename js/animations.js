// Aura - Cosmic Campus Social Media Platform
// Animations and Page Transitions JavaScript

// Global animation utilities
const AuraAnimations = {
    // Initialize all animations
    init() {
        this.initScrollAnimations();
        this.initIntersectionObserver();
        this.initPageTransitions();
        this.initCosmicEffects();
        console.log('🎭 Aura Animations Initialized');
    },

    // Initialize scroll-triggered animations
    initScrollAnimations() {
        const animatedElements = document.querySelectorAll('[data-animate]');
        
        animatedElements.forEach(element => {
            const animationType = element.dataset.animate;
            const delay = element.dataset.delay || 0;
            
            element.style.animationDelay = `${delay}s`;
            element.classList.add(animationType);
        });
    },

    // Initialize intersection observer for scroll animations
    initIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animationType = element.dataset.animate;
                    
                    if (animationType) {
                        element.classList.add('visible');
                        
                        // Add stagger effect for containers
                        if (element.classList.contains('stagger-container')) {
                            this.animateStaggerChildren(element);
                        }
                    }
                }
            });
        }, observerOptions);

        // Observe all animated elements
        const animatedElements = document.querySelectorAll('[data-animate]');
        animatedElements.forEach(el => observer.observe(el));
    },

    // Animate stagger children
    animateStaggerChildren(container) {
        const children = container.children;
        
        Array.from(children).forEach((child, index) => {
            setTimeout(() => {
                child.classList.add('visible');
            }, index * 100);
        });
    },

    // Initialize page transitions
    initPageTransitions() {
        // Create page transition overlay
        this.createPageTransitionOverlay();
        
        // Add transition to all internal links
        this.addTransitionToLinks();
    },

    // Create page transition overlay
    createPageTransitionOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'page-transition';
        overlay.innerHTML = `
            <div class="page-transition-inner">
                <div class="transition-logo">AURA</div>
                <div class="transition-text">Navigating the cosmos...</div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        this.pageTransitionOverlay = overlay;
    },

    // Add transition to internal links
    addTransitionToLinks() {
        const internalLinks = document.querySelectorAll('a[href^="./"], a[href^="/"], a[href^="#"]');
        
        internalLinks.forEach(link => {
            if (link.href.includes('.html') || link.href.includes('#')) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.transitionToPage(link.href);
                });
            }
        });
    },

    // Transition to a new page
    transitionToPage(url) {
        if (this.pageTransitionOverlay) {
            this.pageTransitionOverlay.classList.add('active');
            
            setTimeout(() => {
                if (url.includes('#')) {
                    // Handle anchor links
                    const targetId = url.split('#')[1];
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        this.pageTransitionOverlay.classList.remove('active');
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                } else {
                    // Navigate to new page
                    window.location.href = url;
                }
            }, 600);
        }
    },

    // Initialize cosmic effects
    initCosmicEffects() {
        this.addCosmicHoverEffects();
        this.addCosmicClickEffects();
        this.addCosmicScrollEffects();
    },

    // Add cosmic hover effects
    addCosmicHoverEffects() {
        const hoverElements = document.querySelectorAll('.hover-lift, .hover-glow, .hover-scale, .hover-rotate');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.enhanceCosmicEffect(element);
            });
            
            element.addEventListener('mouseleave', () => {
                this.resetCosmicEffect(element);
            });
        });
    },

    // Enhance cosmic effect on hover
    enhanceCosmicEffect(element) {
        if (element.classList.contains('hover-lift')) {
            element.style.transform = 'translateY(-5px)';
            element.style.boxShadow = '0 0 30px rgba(99, 102, 241, 0.8)';
        }
        
        if (element.classList.contains('hover-glow')) {
            element.style.boxShadow = '0 0 30px rgba(99, 102, 241, 0.8)';
        }
        
        if (element.classList.contains('hover-scale')) {
            element.style.transform = 'scale(1.05)';
        }
        
        if (element.classList.contains('hover-rotate')) {
            element.style.transform = 'rotate(5deg)';
        }
    },

    // Reset cosmic effect
    resetCosmicEffect(element) {
        element.style.transform = '';
        element.style.boxShadow = '';
    },

    // Add cosmic click effects
    addCosmicClickEffects() {
        const clickableElements = document.querySelectorAll('button, .clickable, [data-click-effect]');
        
        clickableElements.forEach(element => {
            element.addEventListener('click', (e) => {
                this.createCosmicClickEffect(e, element);
            });
        });
    },

    // Create cosmic click effect
    createCosmicClickEffect(event, element) {
        const ripple = document.createElement('div');
        ripple.className = 'cosmic-ripple';
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.6) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple-expand 0.6s ease-out;
            pointer-events: none;
            z-index: 10;
        `;
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    },

    // Add cosmic scroll effects
    addCosmicScrollEffects() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateCosmicScrollEffects();
                    ticking = false;
                });
                ticking = true;
            }
        });
    },

    // Update cosmic scroll effects
    updateCosmicScrollEffects() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        // Update cosmic background position
        this.updateCosmicBackground(scrolled);
    },

    // Update cosmic background
    updateCosmicBackground(scrolled) {
        const cosmicBg = document.querySelector('.cosmic-bg');
        if (cosmicBg) {
            const yPos = scrolled * 0.1;
            cosmicBg.style.transform = `translateY(${yPos}px)`;
        }
    },

    // Utility functions
    fadeIn(element, duration = 600) {
        element.style.opacity = '0';
        element.style.display = 'block';
        
        let start = null;
        const animate = (timestamp) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const opacity = Math.min(progress / duration, 1);
            
            element.style.opacity = opacity;
            
            if (progress < duration) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    },

    fadeOut(element, duration = 600) {
        let start = null;
        const initialOpacity = parseFloat(getComputedStyle(element).opacity);
        
        const animate = (timestamp) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const opacity = Math.max(initialOpacity - (progress / duration), 0);
            
            element.style.opacity = opacity;
            
            if (progress < duration) {
                requestAnimationFrame(animate);
            } else {
                element.style.display = 'none';
            }
        };
        
        requestAnimationFrame(animate);
    },

    slideIn(element, direction = 'up', duration = 600) {
        const directions = {
            up: { from: 'translateY(100px)', to: 'translateY(0)' },
            down: { from: 'translateY(-100px)', to: 'translateY(0)' },
            left: { from: 'translateX(-100px)', to: 'translateX(0)' },
            right: { from: 'translateX(100px)', to: 'translateX(0)' }
        };
        
        const dir = directions[direction];
        element.style.transform = dir.from;
        element.style.opacity = '0';
        element.style.display = 'block';
        
        setTimeout(() => {
            element.style.transition = `all ${duration}ms ease-out`;
            element.style.transform = dir.to;
            element.style.opacity = '1';
        }, 10);
    },

    // Add cosmic loading animation
    showCosmicLoader(message = 'Loading...') {
        const loader = document.createElement('div');
        loader.className = 'cosmic-loader-overlay';
        loader.innerHTML = `
            <div class="cosmic-loader-content">
                <div class="cosmic-loader-spinner"></div>
                <div class="cosmic-loader-text">${message}</div>
            </div>
        `;
        
        document.body.appendChild(loader);
        
        // Add CSS for loader
        if (!document.getElementById('cosmic-loader-styles')) {
            const style = document.createElement('style');
            style.id = 'cosmic-loader-styles';
            style.textContent = `
                .cosmic-loader-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(2, 6, 23, 0.9);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 10000;
                    backdrop-filter: blur(10px);
                }
                
                .cosmic-loader-content {
                    text-align: center;
                    color: var(--cosmic-lighter);
                }
                
                .cosmic-loader-spinner {
                    width: 60px;
                    height: 60px;
                    border: 3px solid transparent;
                    border-top: 3px solid var(--cosmic-primary);
                    border-right: 3px solid var(--cosmic-secondary);
                    border-radius: 50%;
                    animation: cosmic-spin 1s linear infinite;
                    margin: 0 auto 20px;
                }
                
                .cosmic-loader-text {
                    font-size: 1.1rem;
                    opacity: 0.8;
                }
                
                @keyframes cosmic-spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
        
        return loader;
    },

    hideCosmicLoader(loader) {
        if (loader && loader.parentNode) {
            loader.parentNode.removeChild(loader);
        }
    }
};

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    AuraAnimations.init();
});

// Export for use in other scripts
window.AuraAnimations = AuraAnimations;
