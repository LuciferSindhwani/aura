// Signup Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signupForm');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const passwordToggle = document.getElementById('passwordToggle');
    const confirmPasswordToggle = document.getElementById('confirmPasswordToggle');
    const successModal = document.getElementById('successModal');
    const continueBtn = document.getElementById('continueBtn');

    // Password visibility toggles
    passwordToggle.addEventListener('click', () => togglePassword(passwordInput, passwordToggle));
    confirmPasswordToggle.addEventListener('click', () => togglePassword(confirmPasswordInput, confirmPasswordToggle));

    // Form submission
    form.addEventListener('submit', handleFormSubmit);

    // Continue button
    continueBtn.addEventListener('click', () => {
        window.location.href = 'feed.html';
    });

    // Password strength checking
    passwordInput.addEventListener('input', checkPasswordStrength);

    // Password confirmation checking
    confirmPasswordInput.addEventListener('input', checkPasswordConfirmation);

    function togglePassword(input, toggle) {
        const type = input.type === 'password' ? 'text' : 'password';
        input.type = type;
        const icon = toggle.querySelector('.toggle-icon');
        icon.textContent = type === 'password' ? '👁' : '🙈';
    }

    function checkPasswordStrength() {
        const password = passwordInput.value;
        const strength = calculatePasswordStrength(password);
        
        const strengthFill = document.getElementById('strengthFill');
        const strengthText = document.getElementById('strengthText');
        
        strengthFill.style.width = strength.score + '%';
        strengthText.textContent = strength.label;
    }

    function calculatePasswordStrength(password) {
        let score = 0;
        
        if (password.length >= 8) score += 25;
        if (password.length >= 12) score += 10;
        if (/[a-z]/.test(password)) score += 15;
        if (/[A-Z]/.test(password)) score += 15;
        if (/[0-9]/.test(password)) score += 15;
        if (/[^A-Za-z0-9]/.test(password)) score += 20;

        let label;
        if (score >= 80) label = 'Strong';
        else if (score >= 60) label = 'Good';
        else if (score >= 40) label = 'Fair';
        else label = 'Weak';

        return { score, label };
    }

    function checkPasswordConfirmation() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        if (confirmPassword && password !== confirmPassword) {
            confirmPasswordInput.classList.add('error');
        } else {
            confirmPasswordInput.classList.remove('error');
        }
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        
        // Basic validation
        const requiredFields = form.querySelectorAll('input[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('error');
                isValid = false;
            } else {
                field.classList.remove('error');
            }
        });

        // Check terms acceptance
        const termsAccepted = document.getElementById('termsAccepted').checked;
        if (!termsAccepted) {
            alert('Please accept the terms and conditions');
            return;
        }

        if (!isValid) {
            alert('Please fill in all required fields');
            return;
        }

        // Show loading state
        const submitBtn = document.getElementById('signupBtn');
        const originalText = submitBtn.querySelector('.btn-text').textContent;
        submitBtn.querySelector('.btn-text').textContent = 'Creating Account...';
        submitBtn.disabled = true;

        try {
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Collect form data
            const formData = new FormData(form);
            const userData = Object.fromEntries(formData.entries());
            
            // Save to localStorage
            localStorage.setItem('auraUserData', JSON.stringify(userData));
            localStorage.setItem('userAccountCreated', 'true');
            
            // Show success modal
            successModal.classList.add('show');
            
        } catch (error) {
            alert('An error occurred. Please try again.');
            submitBtn.querySelector('.btn-text').textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    // Load existing user data
    function loadUserData() {
        const userData = localStorage.getItem('auraUserData');
        const campusData = localStorage.getItem('selectedCampus');
        
        if (!userData || !campusData) {
            window.location.href = 'onboarding-campus.html';
            return;
        }

        try {
            const user = JSON.parse(userData);
            
            // Pre-fill form fields
            if (user.firstName) document.getElementById('firstName').value = user.firstName;
            if (user.lastName) document.getElementById('lastName').value = user.lastName;
            if (user.email) document.getElementById('email').value = user.email;
            
        } catch (error) {
            console.error('Error loading user data:', error);
            window.location.href = 'onboarding-campus.html';
        }
    }

    // Initialize
    loadUserData();
});
