// Profile Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    checkAuthStatus();
    setupEventListeners();
    loadProfileData();
    loadTabContent('posts'); // Load default tab
});

function checkAuthStatus() {
    if (!window.AuthHelper || !window.AuthHelper.requireAuth()) {
        return;
    }
    
    // Get current user data
    const user = window.AuthHelper.getCurrentUser();
    if (user) {
        // Update user info in header
        updateUserInfo(user);
    }
}

function updateUserInfo(user) {
    try {
        // Update profile header
        if (user.name) {
            document.getElementById('profileName').textContent = user.name;
            document.getElementById('profileAvatar').textContent = 
                user.name.split(' ').map(name => name.charAt(0)).join('').toUpperCase();
        }
        
        if (user.campus) {
            document.getElementById('profileCampus').textContent = user.campus;
        }
        
        if (user.bio) {
            document.getElementById('profileBio').textContent = user.bio;
        }
    } catch (error) {
        console.error('Error updating user info:', error);
    }
}

function setupEventListeners() {
    // Tab switching
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            switchTab(tabName);
        });
    });

    // Edit profile modal
    const editProfileBtn = document.getElementById('editProfileBtn');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', showEditProfileModal);
    }

    const closeEditProfileModal = document.getElementById('closeEditProfileModal');
    if (closeEditProfileModal) {
        closeEditProfileModal.addEventListener('click', hideEditProfileModal);
    }

    const cancelEditBtn = document.getElementById('cancelEditBtn');
    if (cancelEditBtn) {
        cancelEditBtn.addEventListener('click', hideEditProfileModal);
    }

    // Edit profile form
    const editProfileForm = document.getElementById('editProfileForm');
    if (editProfileForm) {
        editProfileForm.addEventListener('submit', handleProfileUpdate);
    }

    // Bio character count
    const editBio = document.getElementById('editBio');
    if (editBio) {
        editBio.addEventListener('input', updateCharCount);
    }

    // Add friend button
    const addFriendBtn = document.getElementById('addFriendBtn');
    if (addFriendBtn) {
        addFriendBtn.addEventListener('click', handleAddFriend);
    }

    // Activity filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            filterActivity(filter);
        });
    });
    
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
}

function switchTab(tabName) {
    // Remove active class from all tabs and content
    document.querySelectorAll('.nav-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    // Add active class to selected tab and content
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`${tabName}Tab`).classList.add('active');

    // Load content for the selected tab
    loadTabContent(tabName);
}

function loadTabContent(tabName) {
    switch (tabName) {
        case 'posts':
            loadUserPosts();
            break;
        case 'about':
            loadAboutData();
            break;
        case 'friends':
            loadFriendsData();
            break;
        case 'achievements':
            loadAchievementsData();
            break;
        case 'activity':
            loadActivityData();
            break;
    }
}

function loadProfileData() {
    try {
        const userData = JSON.parse(localStorage.getItem('auraUserData'));
        const campusData = JSON.parse(localStorage.getItem('selectedCampus'));
        
        if (userData) {
            // Update profile header
            if (userData.name) {
                document.getElementById('profileName').textContent = userData.name;
                document.getElementById('profileAvatar').textContent = 
                    userData.name.split(' ').map(name => name.charAt(0)).join('').toUpperCase();
            }

            if (campusData) {
                document.getElementById('profileCampus').textContent = campusData.name;
            } else if (userData.campus) {
                document.getElementById('profileCampus').textContent = userData.campus;
            }
            
            if (userData.bio) {
                document.getElementById('profileBio').textContent = userData.bio;
            }

            // Update stats (simulated data)
            updateProfileStats();
        }
    } catch (error) {
        console.error('Error loading profile data:', error);
    }
}

function updateProfileStats() {
    // Simulate loading stats
    const stats = {
        posts: Math.floor(Math.random() * 100) + 20,
        friends: Math.floor(Math.random() * 200) + 100,
        likes: Math.floor(Math.random() * 5000) + 1000,
        level: Math.floor(Math.random() * 20) + 10
    };

    document.getElementById('postsCount').textContent = stats.posts;
    document.getElementById('friendsCount').textContent = stats.friends;
    document.getElementById('likesCount').textContent = formatNumber(stats.likes);
    document.getElementById('levelValue').textContent = stats.level;
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
}

function loadUserPosts() {
    const userPosts = document.getElementById('userPosts');
    const posts = JSON.parse(localStorage.getItem('auraPosts') || '[]');
    
    if (posts.length === 0) {
        userPosts.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📝</div>
                <h3>No posts yet</h3>
                <p>Share your first cosmic experience!</p>
            </div>
        `;
        return;
    }

    userPosts.innerHTML = posts.map(post => `
        <div class="post-card">
            <div class="post-header">
                <div class="post-author">
                    <div class="author-avatar">
                        <span class="avatar-initials">${post.author.initials}</span>
                    </div>
                    <div class="author-info">
                        <div class="author-name">${post.author.name}</div>
                        <div class="post-time">${formatTime(post.timestamp)}</div>
                    </div>
                </div>
            </div>
            <div class="post-content">
                <p>${post.content}</p>
            </div>
            <div class="post-actions">
                <button class="action-btn like-btn">
                    <span class="action-icon">❤️</span>
                    <span class="action-count">${post.likes}</span>
                </button>
                <button class="action-btn comment-btn">
                    <span class="action-icon">💬</span>
                    <span class="action-count">${post.comments}</span>
                </button>
            </div>
        </div>
    `).join('');
}

function loadAboutData() {
    try {
        const userData = JSON.parse(localStorage.getItem('auraUserData'));
        const campusData = JSON.parse(localStorage.getItem('selectedCampus'));
        
        if (userData) {
            document.getElementById('fullName').textContent = userData.name || 'Lucifer Morningstar';
            document.getElementById('username').textContent = userData.username || 'lucifer';
            document.getElementById('email').textContent = userData.email || 'lucifer@campus.edu';
            document.getElementById('phone').textContent = userData.phone || '+1 (555) 666-9999';
        }

        if (campusData) {
            document.getElementById('campusName').textContent = campusData.name;
        } else if (userData.campus) {
            document.getElementById('campusName').textContent = userData.campus;
        }
        
        if (userData.branch) {
            document.getElementById('branch').textContent = userData.branch;
        }
        
        if (userData.year) {
            document.getElementById('year').textContent = userData.year;
        }

        // Load interests
        loadInterests();
    } catch (error) {
        console.error('Error loading about data:', error);
    }
}

function loadInterests() {
    const interests = [
        'Technology', 'Innovation', 'Space Exploration', 'Artificial Intelligence',
        'Gaming', 'Music', 'Travel', 'Photography', 'Cooking', 'Fitness'
    ];

    const interestsGrid = document.getElementById('interestsGrid');
    interestsGrid.innerHTML = interests.map(interest => `
        <span class="interest-tag">${interest}</span>
    `).join('');
}

function loadFriendsData() {
    const friends = [
        { name: 'Alice Smith', initials: 'AS', status: 'Online' },
        { name: 'Mike Johnson', initials: 'MJ', status: 'Online' },
        { name: 'Sarah Kim', initials: 'SK', status: '2 hours ago' },
        { name: 'David Wilson', initials: 'DW', status: 'Yesterday' },
        { name: 'Emma Davis', initials: 'ED', status: 'Online' },
        { name: 'James Brown', initials: 'JB', status: '3 days ago' }
    ];

    const friendsGrid = document.getElementById('friendsGrid');
    friendsGrid.innerHTML = friends.map(friend => `
        <div class="friend-card">
            <div class="friend-avatar">
                <span class="avatar-initials">${friend.initials}</span>
            </div>
            <div class="friend-name">${friend.name}</div>
            <div class="friend-status">${friend.status}</div>
        </div>
    `).join('');
}

function loadAchievementsData() {
    const achievements = [
        { icon: '🌟', name: 'First Post', desc: 'Created your first post' },
        { icon: '🚀', name: 'Rising Star', desc: 'Reached 100 likes' },
        { icon: '👥', name: 'Social Butterfly', desc: 'Made 50 friends' },
        { icon: '📝', name: 'Content Creator', desc: 'Posted 25 times' },
        { icon: '🏆', name: 'Top Contributor', desc: 'Most active this week' },
        { icon: '💫', name: 'Cosmic Explorer', desc: 'Visited all campus areas' }
    ];

    const achievementsGrid = document.getElementById('achievementsGrid');
    achievementsGrid.innerHTML = achievements.map(achievement => `
        <div class="achievement-card">
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-name">${achievement.name}</div>
            <div class="achievement-desc">${achievement.desc}</div>
        </div>
    `).join('');
}

function loadActivityData() {
    const activities = [
        { icon: '📝', text: 'Created a new post', time: '2 hours ago' },
        { icon: '❤️', text: 'Liked a post by Alice Smith', time: '4 hours ago' },
        { icon: '👥', text: 'Added Mike Johnson as friend', time: '1 day ago' },
        { icon: '🎭', text: 'Joined Tech Club', time: '2 days ago' },
        { icon: '🌟', text: 'Completed daily quest', time: '3 days ago' },
        { icon: '📅', text: 'Attended campus event', time: '1 week ago' }
    ];

    const activityTimeline = document.getElementById('activityTimeline');
    activityTimeline.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon">${activity.icon}</div>
            <div class="activity-content">
                <div class="activity-text">${activity.text}</div>
                <div class="activity-time">${activity.time}</div>
            </div>
        </div>
    `).join('');
}

function filterActivity(filter) {
    // Remove active class from all filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    
    // Add active class to selected filter
    document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
    
    // Filter activities based on selection
    // This is a simplified implementation - in a real app, you'd filter the actual data
    console.log(`Filtering activities by: ${filter}`);
}

function showEditProfileModal() {
    const modal = document.getElementById('editProfileModal');
    if (modal) {
        modal.classList.add('show');
        populateEditForm();
    }
}

function hideEditProfileModal() {
    const modal = document.getElementById('editProfileModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

function populateEditForm() {
    try {
        const userData = JSON.parse(localStorage.getItem('auraUserData'));
        if (userData) {
            const names = userData.name ? userData.name.split(' ') : ['Lucifer', 'Morningstar'];
            document.getElementById('editFirstName').value = names[0] || 'Lucifer';
            document.getElementById('editLastName').value = names[1] || 'Morningstar';
            document.getElementById('editBio').value = userData.bio || 'Fallen angel turned student, exploring the mortal realm of academia.';
            document.getElementById('editPhone').value = userData.phone || '+1 (555) 666-9999';
            updateCharCount();
        }
    } catch (error) {
        console.error('Error populating edit form:', error);
    }
}

function updateCharCount() {
    const bioInput = document.getElementById('editBio');
    const charCount = document.getElementById('charCount');
    if (bioInput && charCount) {
        charCount.textContent = bioInput.value.length;
    }
}

function handleProfileUpdate(e) {
    e.preventDefault();
    
    try {
        const userData = JSON.parse(localStorage.getItem('auraUserData'));
        const formData = new FormData(e.target);
        
        // Update user data
        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        userData.name = `${firstName} ${lastName}`;
        userData.bio = formData.get('bio');
        userData.phone = formData.get('phone');
        
        // Save updated data
        localStorage.setItem('auraUserData', JSON.stringify(userData));
        
        // Update profile display
        loadProfileData();
        loadAboutData();
        
        // Hide modal
        hideEditProfileModal();
        
        // Show success message
        showToast('Profile updated successfully!', 'success');
        
    } catch (error) {
        console.error('Error updating profile:', error);
        showToast('Error updating profile. Please try again.', 'error');
    }
}

function handleAddFriend() {
    showToast('Friend request sent!', 'success');
}

function handleLogout() {
    if (window.AuthHelper) {
        window.AuthHelper.logout();
    } else {
        // Fallback logout
        localStorage.removeItem('auraUserData');
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'index.html';
    }
}

function showToast(message, type = 'info') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <span class="toast-message">${message}</span>
        <button class="toast-close">×</button>
    `;
    
    // Add styles
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(15, 23, 42, 0.95);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(99, 102, 241, 0.3);
        border-radius: 12px;
        padding: 1rem 1.5rem;
        color: var(--cosmic-text-primary);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 1rem;
        animation: slide-in-right 0.3s ease-out;
    `;
    
    // Add close button functionality
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => removeToast(toast));
    
    // Add to page
    document.body.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => removeToast(toast), 3000);
}

function removeToast(toast) {
    toast.style.animation = 'slide-out-right 0.3s ease-out';
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 300);
}

function formatTime(timestamp) {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffMs = now - postTime;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return postTime.toLocaleDateString();
}

// Add CSS animations for toast
const style = document.createElement('style');
style.textContent = `
    @keyframes slide-in-right {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slide-out-right {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .toast-close {
        background: none;
        border: none;
        color: var(--cosmic-text-secondary);
        cursor: pointer;
        font-size: 1.2rem;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.2s ease;
    }
    
    .toast-close:hover {
        background: rgba(99, 102, 241, 0.1);
        color: var(--cosmic-text-primary);
    }
`;
document.head.appendChild(style);
