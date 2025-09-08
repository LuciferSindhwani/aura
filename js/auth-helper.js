// Authentication Helper Functions for Aura
// This file provides consistent authentication functions across all pages

// Check if user is authenticated
function isAuthenticated() {
    const userData = localStorage.getItem('auraUserData');
    if (!userData) return false;
    
    try {
        const user = JSON.parse(userData);
        return user.isLoggedIn === true;
    } catch (error) {
        console.error('Error parsing user data:', error);
        return false;
    }
}

// Get current user data
function getCurrentUser() {
    const userData = localStorage.getItem('auraUserData');
    if (!userData) return null;
    
    try {
        return JSON.parse(userData);
    } catch (error) {
        console.error('Error parsing user data:', error);
        return null;
    }
}

// Require authentication - redirect to login if not authenticated
function requireAuth() {
    if (!isAuthenticated()) {
        // Store intended destination
        const currentPath = window.location.pathname;
        if (currentPath !== '/login.html' && currentPath !== '/index.html') {
            localStorage.setItem('redirectAfterLogin', currentPath);
        }
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Logout user
function logout() {
    // Clear user data
    localStorage.removeItem('auraUserData');
    localStorage.removeItem('isLoggedIn');
    
    // Keep onboarding data for potential re-login
    // localStorage.removeItem('studentDetails');
    // localStorage.removeItem('selectedCampus');
    
    // Redirect to home page
    window.location.href = 'index.html';
}

// Update user data
function updateUserData(newData) {
    const currentUser = getCurrentUser();
    if (currentUser) {
        const updatedUser = { ...currentUser, ...newData };
        localStorage.setItem('auraUserData', JSON.stringify(updatedUser));
        return true;
    }
    return false;
}

// Check if user should be redirected after login
function checkRedirectAfterLogin() {
    const redirectPath = localStorage.getItem('redirectAfterLogin');
    if (redirectPath) {
        localStorage.removeItem('redirectAfterLogin');
        window.location.href = redirectPath;
    }
}

// Export functions for use in other files
window.AuthHelper = {
    isAuthenticated,
    getCurrentUser,
    requireAuth,
    logout,
    updateUserData,
    checkRedirectAfterLogin
};
