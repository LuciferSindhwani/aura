// Aura - Login JavaScript

let isLoggingIn = false;

document.addEventListener('DOMContentLoaded', function() {
    console.log('🔐 Aura Login Initialized');
    
    // Load user data
    loadUserData();
    
    // Initialize form functionality
    initLoginForm();
    
    // Initialize password toggle
    initPasswordToggle();
    
    // Initialize cosmic effects
    initCosmicEffects();
    
    // Initialize keyboard navigation
    initKeyboardNavigation();
});

// Load user data from localStorage
function loadUserData() {
    // Check if user is already logged in
    const auraUserData = localStorage.getItem('auraUserData');
    if (auraUserData) {
        try {
            const userData = JSON.parse(auraUserData);
            if (userData.isLoggedIn) {
                // User is already logged in, redirect to feed
                console.log('User already logged in, redirecting to feed');
                window.location.href = 'feed.html';
                return;
            }
        } catch (error) {
            console.error('Error parsing user data:', error);
        }
    }
    
    const studentDetails = localStorage.getItem('studentDetails');
    const campusData = localStorage.getItem('selectedCampus');
    
    if (studentDetails && campusData) {
        try {
            const student = JSON.parse(studentDetails);
            const campus = JSON.parse(campusData);
            displayUserInfo(student, campus);
        } catch (error) {
            console.error('Error loading user data:', error);
        }
    } else {
        // No user data, redirect to onboarding
        setTimeout(() => {
            window.location.href = 'onboarding-campus.html';
        }, 2000);
    }
}

// Display user information
function displayUserInfo(student, campus) {
    const avatarName = document.getElementById('avatarName');
    const avatarCampus = document.getElementById('avatarCampus');
    const avatarPreview = document.getElementById('avatarPreview');
    
    if (avatarName && avatarCampus && avatarPreview) {
        // Update avatar name
        avatarName.textContent = student.personal.fullName;
        
        // Update campus info
        avatarCampus.textContent = campus.name;
        
        // Update avatar preview with initials
        const initials = getInitials(student.personal.fullName);
        avatarPreview.innerHTML = `<span class="avatar-initials">${initials}</span>`;
        
        // Add cosmic entrance animation
        avatarPreview.style.opacity = '0';
        avatarPreview.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            avatarPreview.style.transition = 'all 0.6s ease-out';
            avatarPreview.style.opacity = '1';
            avatarPreview.style.transform = 'scale(1)';
        }, 100);
    }
}

// Get initials from full name
function getInitials(fullName) {
    return fullName
        .split(' ')
        .map(name => name.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

// Initialize login form
function initLoginForm() {
    const form = document.getElementById('loginForm');
    
    if (form) {
        form.addEventListener('submit', handleLoginSubmit);
        
        // Add real-time validation
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                validateLoginField(input);
            });
        });
    }
}

// Initialize password toggle
function initPasswordToggle() {
    const passwordToggle = document.getElementById('passwordToggle');
    const passwordInput = document.getElementById('password');
    
    if (passwordToggle && passwordInput) {
        passwordToggle.addEventListener('click', function() {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            
            // Update toggle icon
            const toggleIcon = this.querySelector('.toggle-icon');
            if (type === 'text') {
                toggleIcon.textContent = '🙈';
            } else {
                toggleIcon.textContent = '👁️';
            }
            
            // Add cosmic effect
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    }
}

// Initialize cosmic effects
function initCosmicEffects() {
    // Add floating animation to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('float');
    });
    
    // Add glow effect to inputs on focus
    const inputs = document.querySelectorAll('.cosmic-input');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = '';
        });
    });
    
    // Add cosmic particles to login container
    addLoginCosmicParticles();
}

// Add cosmic particles to login container
function addLoginCosmicParticles() {
    const loginContainer = document.querySelector('.login-container');
    
    if (loginContainer) {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'login-particles';
        particleContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            overflow: hidden;
        `;
        
        loginContainer.appendChild(particleContainer);
        
        // Create particles
        for (let i = 0; i < 20; i++) {
            createLoginParticle(particleContainer);
        }
    }
}

// Create individual login particle
function createLoginParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 3 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 4 + 3;
    const delay = Math.random() * 2;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${getRandomCosmicColor()};
        border-radius: 50%;
        left: ${x}%;
        top: ${y}%;
        animation: login-particle-float ${duration}s ease-in-out infinite;
        animation-delay: ${delay}s;
        opacity: ${Math.random() * 0.4 + 0.2};
    `;
    
    container.appendChild(particle);
}

// Get random cosmic color
function getRandomCosmicColor() {
    const colors = [
        'rgba(99, 102, 241, 0.6)',
        'rgba(139, 92, 246, 0.6)',
        'rgba(6, 182, 212, 0.6)',
        'rgba(34, 197, 94, 0.6)'
    ];
    
    return colors[Math.floor(Math.random() * colors.length)];
}

// Initialize keyboard navigation
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Tab navigation enhancement
        if (e.key === 'Tab') {
            const activeElement = document.activeElement;
            if (activeElement.classList.contains('cosmic-input')) {
                activeElement.parentElement.style.transform = 'scale(1.02)';
            }
        }
        
        // Enter key to submit form
        if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
            e.preventDefault();
            const form = document.getElementById('loginForm');
            if (form) {
                form.dispatchEvent(new Event('submit'));
            }
        }
        
        // Escape key to close modal
        if (e.key === 'Escape') {
            closeLoginModal();
        }
    });
}

// Validate login field
function validateLoginField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    if (field.type === 'email') {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    if (field.type === 'password') {
        if (value.length < 6) {
            isValid = false;
            errorMessage = 'Password must be at least 6 characters';
        }
    }
    
    // Update field state
    updateLoginFieldValidation(field, isValid, errorMessage);
    
    return isValid;
}

// Update login field validation state
function updateLoginFieldValidation(field, isValid, errorMessage) {
    // Remove existing classes
    field.classList.remove('valid', 'invalid');
    
    if (isValid) {
        field.classList.add('valid');
    } else {
        field.classList.add('invalid');
    }
}

// Handle login form submission
function handleLoginSubmit(e) {
    e.preventDefault();
    
    if (isLoggingIn) return;
    
    // Validate form
    const form = e.target;
    const emailInput = form.querySelector('#email');
    const passwordInput = form.querySelector('#password');
    
    let isValid = true;
    
    if (!validateLoginField(emailInput)) {
        isValid = false;
    }
    
    if (!validateLoginField(passwordInput)) {
        isValid = false;
    }
    
    if (!isValid) {
        showLoginError('Please fill in all fields correctly');
        return;
    }
    
    // Show loading state
    showLoadingState();
    
    // Simulate login process
    setTimeout(() => {
        hideLoadingState();
        showLoginSuccess();
    }, 2000);
}

// Show loading state
function showLoadingState() {
    isLoggingIn = true;
    
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
        loginBtn.innerHTML = '<span class="btn-icon">⏳</span> <span class="btn-text">Logging In...</span>';
        loginBtn.disabled = true;
    }
    
    // Add loading class to form
    const form = document.getElementById('loginForm');
    if (form) {
        form.classList.add('loading');
    }
}

// Hide loading state
function hideLoadingState() {
    isLoggingIn = false;
    
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
        loginBtn.innerHTML = '<span class="btn-icon">🚀</span> <span class="btn-text">Login to Aura</span>';
        loginBtn.disabled = false;
    }
    
    // Remove loading class from form
    const form = document.getElementById('loginForm');
    if (form) {
        form.classList.remove('loading');
    }
}

// Show login error
function showLoginError(message) {
    const errorToast = document.createElement('div');
    errorToast.className = 'error-toast';
    errorToast.innerHTML = `
        <div class="toast-content">
            <div class="toast-icon">❌</div>
            <div class="toast-message">${message}</div>
        </div>
    `;
    
    errorToast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(239, 68, 68, 0.9);
        color: white;
        padding: var(--spacing-md);
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 3000;
        transform: translateX(400px);
        transition: transform 0.3s ease-out;
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(errorToast);
    
    // Animate in
    setTimeout(() => {
        errorToast.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        errorToast.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (errorToast.parentNode) {
                errorToast.parentNode.removeChild(errorToast);
            }
        }, 300);
    }, 4000);
}

// Show login success
function showLoginSuccess() {
    const modal = document.getElementById('loginSuccessModal');
    const userWelcome = document.getElementById('userWelcome');
    
    if (modal && userWelcome) {
        // Get user data
        const studentDetails = localStorage.getItem('studentDetails');
        const campusData = localStorage.getItem('selectedCampus');
        
        if (studentDetails && campusData) {
            const student = JSON.parse(studentDetails);
            const campus = JSON.parse(campusData);
            
            // Update user welcome
            userWelcome.innerHTML = `
                <h4>Welcome, ${student.personal.fullName}!</h4>
                <p><strong>Campus:</strong> ${campus.name}</p>
                <p><strong>Branch:</strong> ${student.academic.branch}</p>
                <p><strong>Year:</strong> ${student.academic.year}</p>
            `;
        }
        
        // Show modal
        modal.classList.add('active');
        
        // Add cosmic entrance effect
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.animation = 'modal-slide-in 0.3s ease-out';
    }
}

// Close login modal
function closeLoginModal() {
    const modal = document.getElementById('loginSuccessModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Enter Aura (main platform)
function enterAura() {
    closeLoginModal();
    
    // Get user data from onboarding
    const studentDetails = localStorage.getItem('studentDetails');
    const campusData = localStorage.getItem('selectedCampus');
    
    if (studentDetails && campusData) {
        const student = JSON.parse(studentDetails);
        const campus = JSON.parse(campusData);
        
        // Create user data structure that matches what other pages expect
        const userData = {
            id: Date.now().toString(),
            email: student.personal.email || 'lucifer@campus.edu',
            name: student.personal.fullName || 'Lucifer Morningstar',
            campus: campus.name,
            branch: student.academic.branch || 'Theology & Philosophy',
            year: student.academic.year || '3rd Year',
            avatar: student.personal.avatar || 'cosmic-avatar.png',
            bio: 'Fallen angel turned student, exploring the mortal realm of academia. Passionate about redemption and second chances.',
            phone: '+1 (555) 666-9999',
            username: 'lucifer',
            isLoggedIn: true,
            loginTime: new Date().toISOString()
        };
        
        // Store user data in the format expected by other pages
        localStorage.setItem('auraUserData', JSON.stringify(userData));
        localStorage.setItem('isLoggedIn', 'true');
        
        // Check if there's a redirect path stored
        const redirectPath = localStorage.getItem('redirectAfterLogin');
        const targetPath = redirectPath || 'feed.html';
        
        // Clear redirect path
        if (redirectPath) {
            localStorage.removeItem('redirectAfterLogin');
        }
        
        // Navigate to target platform
        setTimeout(() => {
            window.location.href = targetPath;
        }, 500);
    } else {
        console.error('Missing user data for login');
        // Redirect back to onboarding if data is missing
        window.location.href = 'onboarding-campus.html';
    }
}

// Social login functions
function socialLogin(provider) {
    console.log(`Logging in with ${provider}...`);
    
    // Show loading state
    showLoadingState();
    
    // Simulate social login
    setTimeout(() => {
        hideLoadingState();
        showLoginSuccess();
    }, 1500);
}

// Add CSS for login particles and animations
const loginStyles = document.createElement('style');
loginStyles.textContent = `
    @keyframes login-particle-float {
        0%, 100% { 
            transform: translateY(0) rotate(0deg); 
            opacity: 0.2;
        }
        50% { 
            transform: translateY(-15px) rotate(180deg); 
            opacity: 0.6;
        }
    }
    
    .avatar-initials {
        font-size: 2.5rem;
        font-weight: 700;
        color: white;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }
    
    .login-form.loading {
        opacity: 0.7;
        pointer-events: none;
    }
    
    .error-toast .toast-content {
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
    
    .form-input.valid {
        border-color: #22c55e;
        box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
    }
    
    .form-input.invalid {
        border-color: #ef4444;
        box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
    }
`;

document.head.appendChild(loginStyles);

// Initialize cosmic effects on load
window.addEventListener('load', function() {
    // Add visible class to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('visible');
        }, index * 100);
    });
});
