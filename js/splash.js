// Aura - Cosmic Campus Social Media Platform
// Splash Screen JavaScript

// Global variables
let isAnimating = false;
let cosmicParticles = [];

// Initialize splash screen
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Aura Cosmic Platform Initializing...');
    
    // Start cosmic animations
    initCosmicAnimations();
    
    // Initialize floating orbs
    initFloatingOrbs();
    
    // Add cosmic particle effects
    createCosmicParticles();
    
    // Start particle animation loop
    animateCosmicParticles();
    
    // Add scroll-triggered animations
    initScrollAnimations();
    
    console.log('✨ Aura Platform Ready!');
});

// Initialize cosmic animations
function initCosmicAnimations() {
    // Add entrance animations to elements
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right, .scale-in');
    
    animatedElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
        element.classList.add('visible');
    });
    
    // Add cosmic sparkle effects
    addCosmicSparkles();
}

// Initialize floating orbs
function initFloatingOrbs() {
    const orbs = document.querySelectorAll('.floating-orb');
    
    orbs.forEach((orb, index) => {
        // Add random movement patterns
        const randomX = Math.random() * 100 - 50;
        const randomY = Math.random() * 100 - 50;
        
        orb.style.setProperty('--random-x', randomX + 'px');
        orb.style.setProperty('--random-y', randomY + 'px');
        
        // Add hover effects
        orb.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
            this.style.filter = 'brightness(1.5)';
        });
        
        orb.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.filter = 'brightness(1)';
        });
    });
}

// Create cosmic particles
function createCosmicParticles() {
    const particleContainer = document.querySelector('.cosmic-particles');
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'cosmic-particle';
        
        // Random properties
        const size = Math.random() * 3 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${getRandomCosmicColor()};
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            animation: particle-float ${duration}s linear infinite;
            animation-delay: ${delay}s;
            opacity: ${Math.random() * 0.8 + 0.2};
        `;
        
        particleContainer.appendChild(particle);
        cosmicParticles.push(particle);
    }
}

// Get random cosmic color
function getRandomCosmicColor() {
    const colors = [
        'rgba(99, 102, 241, 0.8)',
        'rgba(139, 92, 246, 0.8)',
        'rgba(6, 182, 212, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(251, 146, 60, 0.8)',
        'rgba(239, 68, 68, 0.8)'
    ];
    
    return colors[Math.floor(Math.random() * colors.length)];
}

// Animate cosmic particles
function animateCosmicParticles() {
    cosmicParticles.forEach((particle, index) => {
        // Add subtle movement
        const currentX = parseFloat(particle.style.left);
        const currentY = parseFloat(particle.style.top);
        
        // Random drift
        const driftX = (Math.random() - 0.5) * 0.1;
        const driftY = (Math.random() - 0.5) * 0.1;
        
        particle.style.left = (currentX + driftX) + '%';
        particle.style.top = (currentY + driftY) + '%';
        
        // Wrap around screen edges
        if (currentX < -5) particle.style.left = '105%';
        if (currentX > 105) particle.style.left = '-5%';
        if (currentY < -5) particle.style.top = '105%';
        if (currentY > 105) particle.style.top = '-5%';
    });
    
    requestAnimationFrame(animateCosmicParticles);
}

// Add cosmic sparkles
function addCosmicSparkles() {
    const sparkleContainer = document.createElement('div');
    sparkleContainer.className = 'cosmic-sparkle-container';
    sparkleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 5;
    `;
    
    document.body.appendChild(sparkleContainer);
    
    // Create random sparkles
    setInterval(() => {
        if (Math.random() > 0.7) {
            createSparkle(sparkleContainer);
        }
    }, 2000);
}

// Create individual sparkle
function createSparkle(container) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const size = Math.random() * 20 + 10;
    const rotation = Math.random() * 360;
    
    sparkle.style.cssText = `
        position: absolute;
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        background: ${getRandomCosmicColor()};
        border-radius: 50%;
        transform: rotate(${rotation}deg);
        animation: sparkle-appear 2s ease-out forwards;
        opacity: 0;
    `;
    
    container.appendChild(sparkle);
    
    // Remove sparkle after animation
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, 2000);
}

// Initialize scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right, .scale-in');
    animatedElements.forEach(el => observer.observe(el));
}

// Start journey function (called by Get Started button)
function startJourney() {
    if (isAnimating) return;
    
    isAnimating = true;
    console.log('🚀 Starting cosmic journey...');
    
    // Show loading screen
    const loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.classList.add('active');
    
    // Simulate loading process
    setTimeout(() => {
        // Navigate to campus selection page
        window.location.href = 'onboarding-campus.html';
    }, 2000);
}

// Add cosmic effects to button
function addCosmicButtonEffects() {
    const getStartedBtn = document.querySelector('.get-started-btn');
    
    if (getStartedBtn) {
        getStartedBtn.addEventListener('mouseenter', function() {
            // Add cosmic ripple effect
            createCosmicRipple(this, event);
            
            // Enhance glow
            this.style.boxShadow = '0 0 40px rgba(99, 102, 241, 0.8)';
        });
        
        getStartedBtn.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 0 20px rgba(99, 102, 241, 0.5)';
        });
    }
}

// Create cosmic ripple effect
function createCosmicRipple(button, event) {
    const ripple = document.createElement('div');
    ripple.className = 'cosmic-ripple';
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple-expand 0.6s ease-out;
        pointer-events: none;
    `;
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

// Add keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        startJourney();
    }
});

// Add cosmic sound effects (optional)
function addCosmicSounds() {
    // Create audio context for cosmic ambient sounds
    if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        const audioContext = new AudioContextClass();
        
        // Add cosmic ambient sound generation here if desired
        console.log('🎵 Cosmic audio context ready');
    }
}

// Performance optimization
function optimizePerformance() {
    // Reduce particle count on mobile
    if (window.innerWidth < 768) {
        cosmicParticles = cosmicParticles.slice(0, 25);
    }
    
    // Reduce animation complexity on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        document.body.classList.add('low-performance');
    }
}

// Initialize everything when page loads
window.addEventListener('load', function() {
    addCosmicButtonEffects();
    addCosmicSounds();
    optimizePerformance();
    
    // Add cosmic cursor effect
    addCosmicCursor();
});

// Add cosmic cursor effect
function addCosmicCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'cosmic-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.8) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        transition: transform 0.1s ease;
        display: none;
    `;
    
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.display = 'block';
    });
    
    document.addEventListener('mouseleave', function() {
        cursor.style.display = 'none';
    });
}

// Add CSS for new animations
const style = document.createElement('style');
style.textContent = `
    @keyframes particle-float {
        0% { transform: translateY(0) rotate(0deg); }
        100% { transform: translateY(-100px) rotate(360deg); }
    }
    
    @keyframes sparkle-appear {
        0% { opacity: 0; transform: scale(0) rotate(0deg); }
        50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
        100% { opacity: 0; transform: scale(0) rotate(360deg); }
    }
    
    @keyframes ripple-expand {
        0% { transform: scale(0); opacity: 1; }
        100% { transform: scale(2); opacity: 0; }
    }
    
    .cosmic-cursor {
        mix-blend-mode: difference;
    }
    
    .low-performance .floating-orb {
        animation-duration: 12s;
    }
    
    .low-performance .cosmic-particles {
        animation-duration: 30s;
    }
`;

document.head.appendChild(style);
