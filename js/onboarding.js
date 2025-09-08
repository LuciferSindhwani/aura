// Aura - Cosmic Campus Social Media Platform
// Onboarding JavaScript

// Campus data
const campuses = [
    {
        id: 'chitkara',
        name: 'Chitkara University',
        location: 'Punjab, India',
        abbreviation: 'CU',
        features: ['Tech Hub', 'Innovation'],
        iconClass: 'chitkara-bg',
        description: 'A leading private university known for its innovative approach to education and strong industry connections.',
        studentCount: '2.5K+',
        ranking: 1
    },
    {
        id: 'thapar',
        name: 'Thapar University',
        location: 'Punjab, India',
        abbreviation: 'TU',
        features: ['Engineering', 'Research'],
        iconClass: 'thapar-bg',
        description: 'Premier engineering institution with a focus on research and technological advancement.',
        studentCount: '1.2K+',
        ranking: 3
    },
    {
        id: 'iit-delhi',
        name: 'IIT Delhi',
        location: 'Delhi, India',
        abbreviation: 'IITD',
        features: ['Premier', 'Excellence'],
        iconClass: 'iit-delhi-bg',
        description: 'One of India\'s premier engineering institutions, known for academic excellence and innovation.',
        studentCount: '1.8K+',
        ranking: 2
    },
    {
        id: 'iit-bombay',
        name: 'IIT Bombay',
        location: 'Mumbai, India',
        abbreviation: 'IITB',
        features: ['Innovation', 'Leadership'],
        iconClass: 'iit-bombay-bg',
        description: 'Leading IIT with a strong focus on innovation, research, and leadership development.',
        studentCount: '1.5K+',
        ranking: 4
    },
    {
        id: 'bits-pilani',
        name: 'BITS Pilani',
        location: 'Rajasthan, India',
        abbreviation: 'BITS',
        features: ['Technology', 'Excellence'],
        iconClass: 'bits-bg',
        description: 'Premier technical institution known for its rigorous academic programs and industry partnerships.',
        studentCount: '1.0K+',
        ranking: 5
    }
];

// Global variables
let selectedCampus = null;
let searchTimeout = null;

// Initialize onboarding
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎓 Aura Onboarding Initialized');
    
    // Initialize search functionality
    initSearch();
    
    // Initialize campus cards
    initCampusCards();
    
    // Add cosmic effects
    addCosmicEffects();
    
    // Initialize keyboard navigation
    initKeyboardNavigation();
});

// Initialize search functionality
function initSearch() {
    const searchInput = document.getElementById('campusSearch');
    const searchSuggestions = document.getElementById('searchSuggestions');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.trim();
            
            // Clear previous timeout
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
            
            // Add delay for better UX
            searchTimeout = setTimeout(() => {
                if (query.length > 0) {
                    const results = searchCampuses(query);
                    showSearchSuggestions(results);
                } else {
                    hideSearchSuggestions();
                }
            }, 300);
        });
        
        // Handle search input focus
        searchInput.addEventListener('focus', function() {
            if (this.value.trim().length > 0) {
                const results = searchCampuses(this.value.trim());
                showSearchSuggestions(results);
            }
        });
        
        // Handle search input blur
        searchInput.addEventListener('blur', function() {
            // Delay hiding to allow clicking on suggestions
            setTimeout(() => {
                hideSearchSuggestions();
            }, 200);
        });
    }
}

// Search campuses based on query
function searchCampuses(query) {
    const lowerQuery = query.toLowerCase();
    
    return campuses.filter(campus => {
        return campus.name.toLowerCase().includes(lowerQuery) ||
               campus.location.toLowerCase().includes(lowerQuery) ||
               campus.features.some(feature => 
                   feature.toLowerCase().includes(lowerQuery)
               ) ||
               campus.abbreviation.toLowerCase().includes(lowerQuery);
    });
}

// Show search suggestions
function showSearchSuggestions(results) {
    const searchSuggestions = document.getElementById('searchSuggestions');
    
    if (results.length === 0) {
        searchSuggestions.innerHTML = `
            <div class="suggestion-item">
                <span>No campuses found</span>
            </div>
        `;
    } else {
        searchSuggestions.innerHTML = results.map(campus => `
            <div class="suggestion-item" onclick="selectCampusFromSearch('${campus.id}')">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div class="campus-icon" style="width: 30px; height: 30px;">
                        <div class="icon-bg ${campus.iconClass}"></div>
                        <span class="icon-text" style="font-size: 0.8rem;">${campus.abbreviation}</span>
                    </div>
                    <div>
                        <div style="font-weight: 600; color: var(--cosmic-lighter);">${campus.name}</div>
                        <div style="font-size: 0.9rem; color: var(--cosmic-light); opacity: 0.7;">${campus.location}</div>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    searchSuggestions.classList.add('active');
}

// Hide search suggestions
function hideSearchSuggestions() {
    const searchSuggestions = document.getElementById('searchSuggestions');
    searchSuggestions.classList.remove('active');
}

// Select campus from search
function selectCampusFromSearch(campusId) {
    const campus = campuses.find(c => c.id === campusId);
    if (campus) {
        // Update search input
        document.getElementById('campusSearch').value = campus.name;
        hideSearchSuggestions();
        
        // Scroll to campus card
        const campusCard = document.querySelector(`[onclick="selectCampus('${campusId}')"]`);
        if (campusCard) {
            campusCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Highlight the card temporarily
            campusCard.style.transform = 'scale(1.05)';
            campusCard.style.boxShadow = '0 0 40px rgba(99, 102, 241, 0.8)';
            
            setTimeout(() => {
                campusCard.style.transform = '';
                campusCard.style.boxShadow = '';
            }, 2000);
        }
    }
}

// Initialize campus cards
function initCampusCards() {
    const campusCards = document.querySelectorAll('.campus-card');
    
    campusCards.forEach(card => {
        // Add cosmic hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = '0 0 30px rgba(99, 102, 241, 0.6)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
        
        // Add click effects
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on button
            if (e.target.tagName !== 'BUTTON') {
                createCosmicClickEffect(e, this);
            }
        });
    });
}

// Add cosmic effects
function addCosmicEffects() {
    // Add floating animation to campus icons
    const campusIcons = document.querySelectorAll('.campus-icon');
    
    campusIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.2}s`;
        icon.classList.add('float');
    });
    
    // Add glow effect to feature tags
    const featureTags = document.querySelectorAll('.feature-tag');
    
    featureTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 15px rgba(99, 102, 241, 0.6)';
            this.style.transform = 'scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
            this.style.transform = '';
        });
    });
}

// Initialize keyboard navigation
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Escape key to close modal
        if (e.key === 'Escape') {
            closeCampusModal();
        }
        
        // Enter key to confirm selection
        if (e.key === 'Enter' && selectedCampus) {
            confirmCampusSelection();
        }
        
        // Search focus with Ctrl/Cmd + K
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.getElementById('campusSearch');
            if (searchInput) {
                searchInput.focus();
            }
        }
    });
}

// Select campus function
function selectCampus(campusId) {
    const campus = campuses.find(c => c.id === campusId);
    if (!campus) return;
    
    selectedCampus = campus;
    showCampusModal(campus);
}

// Show campus selection modal
function showCampusModal(campus) {
    const modal = document.getElementById('campusModal');
    const modalCampusIcon = document.getElementById('modalCampusIcon');
    const modalCampusText = document.getElementById('modalCampusText');
    const modalCampusName = document.getElementById('modalCampusName');
    const modalCampusLocation = document.getElementById('modalCampusLocation');
    
    if (modal && modalCampusIcon && modalCampusText && modalCampusName && modalCampusLocation) {
        // Update modal content
        modalCampusIcon.className = `icon-bg ${campus.iconClass}`;
        modalCampusText.textContent = campus.abbreviation;
        modalCampusName.textContent = campus.name;
        modalCampusLocation.textContent = campus.location;
        
        // Show modal with cosmic animation
        modal.classList.add('active');
        
        // Add cosmic entrance effect
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.animation = 'modal-slide-in 0.3s ease-out';
        
        // Add cosmic particles around modal
        addModalCosmicParticles(modal);
    }
}

// Add cosmic particles to modal
function addModalCosmicParticles(modal) {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'modal-particles';
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    modal.appendChild(particleContainer);
    
    // Create particles
    for (let i = 0; i < 20; i++) {
        createModalParticle(particleContainer);
    }
}

// Create individual modal particle
function createModalParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 2;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 3 + 2;
    const delay = Math.random() * 2;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${getRandomCosmicColor()};
        border-radius: 50%;
        left: ${x}%;
        top: ${y}%;
        animation: modal-particle-float ${duration}s ease-in-out infinite;
        animation-delay: ${delay}s;
        opacity: ${Math.random() * 0.6 + 0.4};
    `;
    
    container.appendChild(particle);
}

// Get random cosmic color
function getRandomCosmicColor() {
    const colors = [
        'rgba(99, 102, 241, 0.8)',
        'rgba(139, 92, 246, 0.8)',
        'rgba(6, 182, 212, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(251, 146, 60, 0.8)'
    ];
    
    return colors[Math.floor(Math.random() * colors.length)];
}

// Close campus modal
function closeCampusModal() {
    const modal = document.getElementById('campusModal');
    if (modal) {
        modal.classList.remove('active');
        selectedCampus = null;
        
        // Remove cosmic particles
        const particles = modal.querySelector('.modal-particles');
        if (particles) {
            particles.remove();
        }
    }
}

// Confirm campus selection
function confirmCampusSelection() {
    if (!selectedCampus) return;
    
    console.log(`🎓 Selected campus: ${selectedCampus.name}`);
    
    // Store selection in localStorage
    localStorage.setItem('selectedCampus', JSON.stringify(selectedCampus));
    
    // Show success message
    showSuccessMessage(`Welcome to ${selectedCampus.name}!`);
    
    // Close modal
    closeCampusModal();
    
    // Navigate to next step after delay
    setTimeout(() => {
        window.location.href = 'onboarding-details.html';
    }, 2000);
}

// Show success message
function showSuccessMessage(message) {
    const successToast = document.createElement('div');
    successToast.className = 'success-toast';
    successToast.innerHTML = `
        <div class="toast-content">
            <div class="toast-icon">✅</div>
            <div class="toast-message">${message}</div>
        </div>
    `;
    
    successToast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(34, 197, 94, 0.9);
        color: white;
        padding: var(--spacing-md);
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 3000;
        transform: translateX(400px);
        transition: transform 0.3s ease-out;
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(successToast);
    
    // Animate in
    setTimeout(() => {
        successToast.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        successToast.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (successToast.parentNode) {
                successToast.parentNode.removeChild(successToast);
            }
        }, 300);
    }, 3000);
}

// Add CSS for modal particles
const modalParticleStyles = document.createElement('style');
modalParticleStyles.textContent = `
    @keyframes modal-particle-float {
        0%, 100% { 
            transform: translateY(0) rotate(0deg); 
            opacity: 0.4;
        }
        50% { 
            transform: translateY(-10px) rotate(180deg); 
            opacity: 0.8;
        }
    }
    
    .success-toast .toast-content {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
    }
    
    .toast-icon {
        font-size: 1.2rem;
    }
    
    .toast-message {
        font-weight: 500;
    }
`;

document.head.appendChild(modalParticleStyles);

// Add cosmic loading effect for page transitions
window.addEventListener('beforeunload', function() {
    // Add cosmic exit animation
    document.body.style.opacity = '0';
    document.body.style.transform = 'scale(0.95)';
    document.body.style.transition = 'all 0.2s ease-out';
});

// Performance optimization
function optimizePerformance() {
    // Reduce animations on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        document.body.classList.add('low-performance');
        
        // Reduce particle count
        const particles = document.querySelectorAll('.cosmic-particles');
        particles.forEach(particle => {
            particle.style.animationDuration = '30s';
        });
    }
}

// Initialize performance optimization
window.addEventListener('load', optimizePerformance);
