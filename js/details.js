// Aura - Cosmic Campus Social Media Platform
// Student Details JavaScript

// Global variables
let selectedInterests = [];
let formData = {};
let isSubmitting = false;

// Initialize details page
document.addEventListener('DOMContentLoaded', function() {
    console.log('📝 Aura Student Details Initialized');
    
    // Load selected campus
    loadSelectedCampus();
    
    // Initialize form functionality
    initForm();
    
    // Initialize interests selection
    initInterests();
    
    // Initialize character counter
    initCharacterCounter();
    
    // Initialize form validation
    initFormValidation();
    
    // Initialize cosmic effects
    initCosmicEffects();
    
    // Initialize keyboard navigation
    initKeyboardNavigation();
});

// Load selected campus from localStorage
function loadSelectedCampus() {
    const campusData = localStorage.getItem('selectedCampus');
    
    if (campusData) {
        try {
            const campus = JSON.parse(campusData);
            displayCampusInfo(campus);
        } catch (error) {
            console.error('Error loading campus data:', error);
            // Redirect back to campus selection if no valid data
            setTimeout(() => {
                window.location.href = 'onboarding-campus.html';
            }, 2000);
        }
    } else {
        // No campus selected, redirect back
        setTimeout(() => {
            window.location.href = 'onboarding-campus.html';
        }, 2000);
    }
}

// Display campus information
function displayCampusInfo(campus) {
    const campusIcon = document.getElementById('selectedCampusIcon');
    const campusText = document.getElementById('selectedCampusText');
    const campusName = document.getElementById('selectedCampusName');
    const campusLocation = document.getElementById('selectedCampusLocation');
    
    if (campusIcon && campusText && campusName && campusLocation) {
        campusIcon.className = `icon-bg ${campus.iconClass}`;
        campusText.textContent = campus.abbreviation;
        campusName.textContent = campus.name;
        campusLocation.textContent = campus.location;
        
        // Add cosmic entrance animation
        const campusBadge = document.querySelector('.campus-badge');
        campusBadge.style.opacity = '0';
        campusBadge.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            campusBadge.style.transition = 'all 0.6s ease-out';
            campusBadge.style.opacity = '1';
            campusBadge.style.transform = 'scale(1)';
        }, 100);
    }
}

// Initialize form functionality
function initForm() {
    const form = document.getElementById('studentDetailsForm');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
        
        // Add real-time validation
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('invalid')) {
                    validateField(input);
                }
                updateFormProgress();
            });
        });
    }
}

// Initialize interests selection
function initInterests() {
    const interestTags = document.querySelectorAll('.interest-tag');
    const customInterestInput = document.getElementById('customInterest');
    
    // Add click handlers to interest tags
    interestTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const interest = this.dataset.interest;
            toggleInterest(interest, this.textContent);
        });
        
        // Add keyboard support
        tag.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const interest = this.dataset.interest;
                toggleInterest(interest, this.textContent);
            }
        });
    });
    
    // Handle custom interest input
    if (customInterestInput) {
        customInterestInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const value = this.value.trim();
                if (value) {
                    addCustomInterest(value);
                    this.value = '';
                }
            }
        });
    }
}

// Toggle interest selection
function toggleInterest(interestId, interestText) {
    const index = selectedInterests.findIndex(item => item.id === interestId);
    
    if (index > -1) {
        // Remove interest
        selectedInterests.splice(index, 1);
        document.querySelector(`[data-interest="${interestId}"]`).classList.remove('selected');
    } else {
        // Add interest
        selectedInterests.push({
            id: interestId,
            text: interestText
        });
        document.querySelector(`[data-interest="${interestId}"]`).classList.add('selected');
    }
    
    updateSelectedInterests();
    updateFormProgress();
}

// Add custom interest
function addCustomInterest(text) {
    const customId = 'custom-' + Date.now();
    selectedInterests.push({
        id: customId,
        text: text,
        custom: true
    });
    
    updateSelectedInterests();
    updateFormProgress();
}

// Update selected interests display
function updateSelectedInterests() {
    const container = document.getElementById('selectedInterests');
    
    if (container) {
        container.innerHTML = selectedInterests.map(interest => `
            <span class="selected-interest">
                ${interest.text}
                <button class="remove-interest" onclick="removeInterest('${interest.id}')" title="Remove interest">
                    ×
                </button>
            </span>
        `).join('');
    }
}

// Remove interest
function removeInterest(interestId) {
    const index = selectedInterests.findIndex(item => item.id === interestId);
    
    if (index > -1) {
        const interest = selectedInterests[index];
        
        // Remove from selected interests
        selectedInterests.splice(index, 1);
        
        // Remove selected class from tag if it's a predefined interest
        if (!interest.custom) {
            const tag = document.querySelector(`[data-interest="${interest.id}"]`);
            if (tag) {
                tag.classList.remove('selected');
            }
        }
        
        updateSelectedInterests();
        updateFormProgress();
    }
}

// Initialize character counter
function initCharacterCounter() {
    const bioTextarea = document.getElementById('bio');
    const charCount = document.getElementById('charCount');
    
    if (bioTextarea && charCount) {
        bioTextarea.addEventListener('input', function() {
            const length = this.value.length;
            charCount.textContent = length;
            
            // Add cosmic effect when approaching limit
            if (length > 250) {
                charCount.style.color = '#f59e0b';
                charCount.style.fontWeight = '600';
            } else if (length > 200) {
                charCount.style.color = '#22c55e';
                charCount.style.fontWeight = '500';
            } else {
                charCount.style.color = '';
                charCount.style.fontWeight = '';
            }
        });
    }
}

// Initialize form validation
function initFormValidation() {
    // Add validation rules
    window.validationRules = {
        fullName: {
            required: true,
            minLength: 2,
            maxLength: 50,
            pattern: /^[a-zA-Z\s]+$/
        },
        rollNumber: {
            required: true,
            minLength: 3,
            maxLength: 20,
            pattern: /^[a-zA-Z0-9]+$/
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },
        phone: {
            required: true,
            pattern: /^[\+]?[0-9\s\-\(\)]{10,}$/
        },
        branch: {
            required: true
        },
        year: {
            required: true
        },
        semester: {
            required: true
        },
        section: {
            required: true
        }
    };
}

// Validate individual field
function validateField(field) {
    const fieldName = field.name;
    const value = field.value.trim();
    const rules = window.validationRules[fieldName];
    
    if (!rules) return true;
    
    let isValid = true;
    let errorMessage = '';
    
    // Required validation
    if (rules.required && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Length validation
    if (isValid && rules.minLength && value.length < rules.minLength) {
        isValid = false;
        errorMessage = `Minimum ${rules.minLength} characters required`;
    }
    
    if (isValid && rules.maxLength && value.length > rules.maxLength) {
        isValid = false;
        errorMessage = `Maximum ${rules.maxLength} characters allowed`;
    }
    
    // Pattern validation
    if (isValid && rules.pattern && !rules.pattern.test(value)) {
        isValid = false;
        switch (fieldName) {
            case 'fullName':
                errorMessage = 'Only letters and spaces allowed';
                break;
            case 'rollNumber':
                errorMessage = 'Only letters and numbers allowed';
                break;
            case 'email':
                errorMessage = 'Please enter a valid email address';
                break;
            case 'phone':
                errorMessage = 'Please enter a valid phone number';
                break;
            default:
                errorMessage = 'Invalid format';
        }
    }
    
    // Update field state
    updateFieldValidation(field, isValid, errorMessage);
    
    return isValid;
}

// Update field validation state
function updateFieldValidation(field, isValid, errorMessage) {
    const validationElement = document.getElementById(field.name + 'Validation');
    
    // Remove existing classes
    field.classList.remove('valid', 'invalid');
    
    if (isValid) {
        field.classList.add('valid');
        if (validationElement) {
            validationElement.textContent = '';
            validationElement.className = 'validation-message hidden';
        }
    } else {
        field.classList.add('invalid');
        if (validationElement) {
            validationElement.textContent = errorMessage;
            validationElement.className = 'validation-message error';
        }
    }
}

// Update form progress
function updateFormProgress() {
    const form = document.getElementById('studentDetailsForm');
    const progressBar = document.getElementById('formProgressBar');
    const progressPercentage = document.getElementById('progressPercentage');
    
    if (form && progressBar && progressPercentage) {
        const inputs = form.querySelectorAll('input, select, textarea');
        let filledFields = 0;
        let totalFields = 0;
        
        inputs.forEach(input => {
            if (input.name && input.name !== 'customInterest') {
                totalFields++;
                if (input.value.trim()) {
                    filledFields++;
                }
            }
        });
        
        // Add interest points
        if (selectedInterests.length > 0) {
            filledFields += Math.min(selectedInterests.length, 3); // Max 3 points for interests
            totalFields += 3;
        }
        
        const percentage = Math.round((filledFields / totalFields) * 100);
        
        // Animate progress bar
        progressBar.style.width = percentage + '%';
        progressPercentage.textContent = percentage + '%';
        
        // Add cosmic effect when complete
        if (percentage === 100) {
            progressBar.style.animation = 'progress-complete 1s ease-out';
            setTimeout(() => {
                progressBar.style.animation = '';
            }, 1000);
        }
    }
}

// Initialize cosmic effects
function initCosmicEffects() {
    // Add floating animation to form elements
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach((group, index) => {
        group.style.animationDelay = `${index * 0.1}s`;
        group.classList.add('fade-in-up');
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
    
    // Add cosmic particles to form
    addFormCosmicParticles();
}

// Add cosmic particles to form
function addFormCosmicParticles() {
    const form = document.querySelector('.student-details-form');
    
    if (form) {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'form-particles';
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
        
        form.style.position = 'relative';
        form.appendChild(particleContainer);
        
        // Create particles
        for (let i = 0; i < 15; i++) {
            createFormParticle(particleContainer);
        }
    }
}

// Create individual form particle
function createFormParticle(container) {
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
        animation: form-particle-float ${duration}s ease-in-out infinite;
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
        if (e.key === 'Enter' && e.target.tagName === 'INPUT' && e.target.type !== 'textarea') {
            e.preventDefault();
            const nextInput = e.target.parentElement.nextElementSibling?.querySelector('.cosmic-input');
            if (nextInput) {
                nextInput.focus();
            }
        }
    });
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    // Validate all fields
    const form = e.target;
    const inputs = form.querySelectorAll('input, select, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (input.name && input.name !== 'customInterest') {
            if (!validateField(input)) {
                isValid = false;
            }
        }
    });
    
    if (!isValid) {
        showValidationError('Please fill in all required fields correctly');
        return;
    }
    
    // Collect form data
    collectFormData();
    
    // Show loading state
    showLoadingState();
    
    // Simulate form submission
    setTimeout(() => {
        hideLoadingState();
        showSuccessModal();
    }, 2000);
}

// Collect form data
function collectFormData() {
    const form = document.getElementById('studentDetailsForm');
    const formDataObj = new FormData(form);
    
    formData = {
        campus: JSON.parse(localStorage.getItem('selectedCampus')),
        personal: {
            fullName: formDataObj.get('fullName'),
            rollNumber: formDataObj.get('rollNumber'),
            email: formDataObj.get('email'),
            phone: formDataObj.get('phone')
        },
        academic: {
            branch: formDataObj.get('branch'),
            year: formDataObj.get('year'),
            semester: formDataObj.get('semester'),
            section: formDataObj.get('section')
        },
        additional: {
            bio: formDataObj.get('bio'),
            interests: selectedInterests
        }
    };
    
    // Store in localStorage
    localStorage.setItem('studentDetails', JSON.stringify(formData));
}

// Show loading state
function showLoadingState() {
    isSubmitting = true;
    
    const submitBtn = document.querySelector('.btn-primary');
    if (submitBtn) {
        submitBtn.innerHTML = '<span class="btn-icon">⏳</span> Creating Profile...';
        submitBtn.disabled = true;
    }
    
    // Add loading class to form
    const form = document.getElementById('studentDetailsForm');
    if (form) {
        form.classList.add('loading');
    }
}

// Hide loading state
function hideLoadingState() {
    isSubmitting = false;
    
    const submitBtn = document.querySelector('.btn-primary');
    if (submitBtn) {
        submitBtn.innerHTML = '<span class="btn-icon">🚀</span> Continue to Login';
        submitBtn.disabled = false;
    }
    
    // Remove loading class from form
    const form = document.getElementById('studentDetailsForm');
    if (form) {
        form.classList.remove('loading');
    }
}

// Show validation error
function showValidationError(message) {
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

// Show success modal
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    const profileSummary = document.getElementById('profileSummary');
    
    if (modal && profileSummary) {
        // Update profile summary
        profileSummary.innerHTML = `
            <h4>Profile Summary</h4>
            <p><strong>Name:</strong> ${formData.personal.fullName}</p>
            <p><strong>Campus:</strong> ${formData.campus.name}</p>
            <p><strong>Branch:</strong> ${formData.academic.branch}</p>
            <p><strong>Year:</strong> ${formData.academic.year}</p>
            <p><strong>Interests:</strong> ${formData.additional.interests.map(i => i.text).join(', ')}</p>
        `;
        
        // Show modal
        modal.classList.add('active');
        
        // Add cosmic entrance effect
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.animation = 'modal-slide-in 0.3s ease-out';
    }
}

// Close success modal
function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Proceed to login
function proceedToLogin() {
    closeSuccessModal();
    
    // Navigate to login page
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 500);
}

// Go back to campus selection
function goBack() {
    // Show confirmation dialog
    if (confirm('Are you sure you want to go back? Your progress will be lost.')) {
        window.location.href = 'onboarding-campus.html';
    }
}

// Add CSS for form particles and animations
const formStyles = document.createElement('style');
formStyles.textContent = `
    @keyframes form-particle-float {
        0%, 100% { 
            transform: translateY(0) rotate(0deg); 
            opacity: 0.2;
        }
        50% { 
            transform: translateY(-15px) rotate(180deg); 
            opacity: 0.6;
        }
    }
    
    @keyframes progress-complete {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .form-group {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease-out;
    }
    
    .form-group.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .student-details-form.loading {
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
`;

document.head.appendChild(formStyles);

// Initialize form progress on load
window.addEventListener('load', function() {
    updateFormProgress();
    
    // Add visible class to form groups
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        setTimeout(() => {
            group.classList.add('visible');
        }, index * 100);
    });
});
