// Feed Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    checkAuthStatus();
    setupEventListeners();
    loadPosts();
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
        // Update all avatar initials throughout the page
        const avatarElements = document.querySelectorAll('.avatar-initials');
        avatarElements.forEach(avatar => {
            if (user.name) {
                const names = user.name.split(' ');
                const initials = names.map(name => name.charAt(0)).join('').toUpperCase();
                avatar.textContent = initials;
            }
        });
        
        // Update user dropdown information
        const dropdownName = document.querySelector('.dropdown-name');
        const dropdownCampus = document.querySelector('.dropdown-campus');
        
        if (dropdownName && user.name) {
            dropdownName.textContent = user.name;
        }
        
        if (dropdownCampus && user.campus) {
            dropdownCampus.textContent = user.campus;
        }
        
        // Update post creator avatar
        const creatorAvatars = document.querySelectorAll('.creator-avatar .avatar-initials');
        creatorAvatars.forEach(avatar => {
            if (user.name) {
                const names = user.name.split(' ');
                const initials = names.map(name => name.charAt(0)).join('').toUpperCase();
                avatar.textContent = initials;
            }
        });
        
        // Update modal post creator avatar
        const modalCreatorAvatars = document.querySelectorAll('.post-creator-modal .avatar-initials');
        modalCreatorAvatars.forEach(avatar => {
            if (user.name) {
                const names = user.name.split(' ');
                const initials = names.map(name => name.charAt(0)).join('').toUpperCase();
                avatar.textContent = initials;
            }
        });
        
    } catch (error) {
        console.error('Error updating user info:', error);
    }
}

function setupEventListeners() {
    const createPostBtn = document.getElementById('createPostBtn');
    if (createPostBtn) {
        createPostBtn.addEventListener('click', showCreatePostModal);
    }
    
    const closeModalBtn = document.getElementById('closeCreatePostModal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', hideCreatePostModal);
    }
    
    const postSubmitBtn = document.getElementById('postSubmitBtn');
    if (postSubmitBtn) {
        postSubmitBtn.addEventListener('click', handlePostSubmit);
    }
    
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Add input event listeners for post creation
    const postInput = document.getElementById('postInput');
    if (postInput) {
        postInput.addEventListener('input', handlePostInput);
    }
    
    const modalPostInput = document.getElementById('modalPostInput');
    if (modalPostInput) {
        modalPostInput.addEventListener('input', handleModalPostInput);
    }
    
    // Add modal post submit button listener
    const modalPostSubmitBtn = document.getElementById('modalPostSubmitBtn');
    if (modalPostSubmitBtn) {
        modalPostSubmitBtn.addEventListener('click', handleModalPostSubmit);
    }
    
    // Add user dropdown toggle
    const userAvatarBtn = document.getElementById('userAvatarBtn');
    if (userAvatarBtn) {
        userAvatarBtn.addEventListener('click', toggleUserDropdown);
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        const userMenu = document.getElementById('userMenu');
        if (userMenu && !userMenu.contains(e.target)) {
            hideUserDropdown();
        }
    });
}

function showCreatePostModal() {
    const modal = document.getElementById('createPostModal');
    if (modal) {
        modal.classList.add('show');
    }
}

function toggleUserDropdown() {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) {
        if (dropdown.style.display === 'block') {
            hideUserDropdown();
        } else {
            showUserDropdown();
        }
    }
}

function showUserDropdown() {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) {
        dropdown.style.display = 'block';
        dropdown.style.opacity = '1';
        dropdown.style.visibility = 'visible';
        dropdown.style.transform = 'translateY(0)';
    }
}

function hideUserDropdown() {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) {
        dropdown.style.display = 'none';
        dropdown.style.opacity = '0';
        dropdown.style.visibility = 'hidden';
        dropdown.style.transform = 'translateY(-10px)';
    }
}

function hideCreatePostModal() {
    const modal = document.getElementById('createPostModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

function handlePostSubmit() {
    const postInput = document.getElementById('postInput');
    const content = postInput.value.trim();
    
    if (!content) return;
    
    createPost(content);
    postInput.value = '';
    document.getElementById('postSubmitBtn').disabled = true;
}

function handlePostInput() {
    const postInput = document.getElementById('postInput');
    const postSubmitBtn = document.getElementById('postSubmitBtn');
    
    if (postInput && postSubmitBtn) {
        const content = postInput.value.trim();
        postSubmitBtn.disabled = !content;
    }
}

function handleModalPostInput() {
    const modalPostInput = document.getElementById('modalPostInput');
    const modalPostSubmitBtn = document.getElementById('modalPostSubmitBtn');
    
    if (modalPostInput && modalPostSubmitBtn) {
        const content = modalPostInput.value.trim();
        modalPostSubmitBtn.disabled = !content;
    }
}

function handleModalPostSubmit() {
    const modalPostInput = document.getElementById('modalPostInput');
    const content = modalPostInput.value.trim();
    
    if (!content) return;
    
    createPost(content);
}

function createPost(content) {
    const user = window.AuthHelper.getCurrentUser();
    if (!user) return;
    
    const post = {
        id: Date.now(),
        content: content,
        author: {
            name: user.name,
            initials: user.name.split(' ').map(name => name.charAt(0)).join('').toUpperCase()
        },
        timestamp: new Date().toISOString(),
        likes: 0,
        comments: 0
    };
    
    addPostToFeed(post);
    savePostToStorage(post);
    
    // Close modal if it's open
    hideCreatePostModal();
    
    // Clear modal input
    const modalPostInput = document.getElementById('modalPostInput');
    if (modalPostInput) {
        modalPostInput.value = '';
        document.getElementById('modalPostSubmitBtn').disabled = true;
    }
}

function addPostToFeed(post) {
    const postsFeed = document.getElementById('postsFeed');
    if (!postsFeed) return;
    
    const postElement = createPostElement(post);
    postsFeed.insertBefore(postElement, postsFeed.firstChild);
}

function createPostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.className = 'post-card';
    postDiv.innerHTML = `
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
            <button class="action-btn like-btn" data-post-id="${post.id}">
                <span class="action-icon">❤️</span>
                <span class="action-count">${post.likes}</span>
            </button>
            <button class="action-btn comment-btn" data-post-id="${post.id}">
                <span class="action-icon">💬</span>
                <span class="action-count">${post.comments}</span>
            </button>
            <button class="action-btn share-btn" data-post-id="${post.id}">
                <span class="action-icon">📤</span>
                <span class="action-count">Share</span>
            </button>
        </div>
    `;
    
    const likeBtn = postDiv.querySelector('.like-btn');
    likeBtn.addEventListener('click', () => handleLike(post.id));
    
    const shareBtn = postDiv.querySelector('.share-btn');
    shareBtn.addEventListener('click', () => handleShare(post.id));
    
    return postDiv;
}

function handleLike(postId) {
    const likeBtn = document.querySelector(`[data-post-id="${postId}"]`);
    const countElement = likeBtn.querySelector('.action-count');
    
    if (likeBtn.classList.contains('liked')) {
        likeBtn.classList.remove('liked');
        countElement.textContent = parseInt(countElement.textContent) - 1;
        likeBtn.style.color = '';
    } else {
        likeBtn.classList.add('liked');
        countElement.textContent = parseInt(countElement.textContent) + 1;
        likeBtn.style.color = '#e11d48';
    }
}

function handleShare(postId) {
    // Simulate sharing functionality
    const shareBtn = document.querySelector(`[data-post-id="${postId}"] .share-btn`);
    if (shareBtn) {
        shareBtn.style.color = '#22c55e';
        setTimeout(() => {
            shareBtn.style.color = '';
        }, 1000);
    }
    
    // Show a simple share notification
    showToast('Post shared successfully!', 'success');
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

function savePostToStorage(post) {
    const posts = JSON.parse(localStorage.getItem('auraPosts') || '[]');
    posts.unshift(post);
    localStorage.setItem('auraPosts', JSON.stringify(posts));
}

function loadPosts() {
    const posts = JSON.parse(localStorage.getItem('auraPosts') || '[]');
    const postsFeed = document.getElementById('postsFeed');
    
    if (!postsFeed) return;
    
    postsFeed.innerHTML = '';
    
    // If no posts exist, create sample posts
    if (posts.length === 0) {
        createSamplePosts();
        return;
    }
    
    posts.forEach(post => {
        addPostToFeed(post);
    });
}

function createSamplePosts() {
    const samplePosts = [
        {
            id: Date.now() - 1000,
            content: "Just finished my Theology & Philosophy lecture! The discussion about redemption and second chances was absolutely mind-blowing. 🌟 #CampusLife #Philosophy",
            author: {
                name: "Lucifer Morningstar",
                initials: "LM"
            },
            timestamp: new Date(Date.now() - 1000).toISOString(),
            likes: 24,
            comments: 8
        },
        {
            id: Date.now() - 2000,
            content: "Anyone up for a late-night study session at the library? I'm working on my paper about the nature of good and evil. 📚 #StudyGroup #Philosophy",
            author: {
                name: "Alice Smith",
                initials: "AS"
            },
            timestamp: new Date(Date.now() - 2000).toISOString(),
            likes: 18,
            comments: 12
        },
        {
            id: Date.now() - 3000,
            content: "Tech meetup was incredible today! Learned so much about AI and its implications for humanity. The future is both exciting and terrifying! 🤖 #TechWeek #AI",
            author: {
                name: "Mike Johnson",
                initials: "MJ"
            },
            timestamp: new Date(Date.now() - 3000).toISOString(),
            likes: 31,
            comments: 15
        },
        {
            id: Date.now() - 4000,
            content: "Just joined the Cosmic Explorers Club! Can't wait to discover all the amazing opportunities this campus has to offer. 🚀 #NewBeginnings #CampusLife",
            author: {
                name: "Sarah Kim",
                initials: "SK"
            },
            timestamp: new Date(Date.now() - 4000).toISOString(),
            likes: 42,
            comments: 9
        },
        {
            id: Date.now() - 5000,
            content: "Midnight ramen run with the squad! Nothing beats good food and great conversations about life, the universe, and everything. 🍜 #CampusLife #Friends",
            author: {
                name: "David Wilson",
                initials: "DW"
            },
            timestamp: new Date(Date.now() - 5000).toISOString(),
            likes: 28,
            comments: 6
        }
    ];
    
    // Save sample posts to localStorage
    localStorage.setItem('auraPosts', JSON.stringify(samplePosts));
    
    // Display sample posts
    samplePosts.forEach(post => {
        addPostToFeed(post);
    });
}

function showEmptyState() {
    const postsFeed = document.getElementById('postsFeed');
    postsFeed.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">🌟</div>
            <h3>No posts yet</h3>
            <p>Be the first to share something amazing!</p>
        </div>
    `;
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
        color: white;
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 1rem;
        animation: slide-in-right 0.3s ease-out;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
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
        color: #94a3b8;
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
        color: white;
    }
    
    .toast-success {
        border-color: rgba(34, 197, 94, 0.3);
    }
    
    .toast-error {
        border-color: rgba(239, 68, 68, 0.3);
    }
`;
document.head.appendChild(style);
