// Friends Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    checkAuthStatus();
    setupEventListeners();
    loadFriendsData();
    loadTabContent('all');
});

function checkAuthStatus() {
    const userData = localStorage.getItem('auraUserData');
    if (!userData) {
        window.location.href = 'login.html';
        return;
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

    // Search friends modal
    const searchFriendsBtn = document.getElementById('searchFriendsBtn');
    if (searchFriendsBtn) {
        searchFriendsBtn.addEventListener('click', showSearchModal);
    }

    const closeSearchModal = document.getElementById('closeSearchModal');
    if (closeSearchModal) {
        closeSearchModal.addEventListener('click', hideSearchModal);
    }

    // Add friend modal
    const addFriendBtn = document.getElementById('addFriendBtn');
    if (addFriendBtn) {
        addFriendBtn.addEventListener('click', showAddFriendModal);
    }

    const closeAddFriendModal = document.getElementById('closeAddFriendModal');
    if (closeAddFriendModal) {
        closeAddFriendModal.addEventListener('click', hideAddFriendModal);
    }
}

function switchTab(tabName) {
    document.querySelectorAll('.nav-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`${tabName}Tab`).classList.add('active');

    loadTabContent(tabName);
}

function loadTabContent(tabName) {
    switch (tabName) {
        case 'all':
            loadAllFriends();
            break;
        case 'online':
            loadOnlineFriends();
            break;
        case 'requests':
            loadFriendRequests();
            break;
        case 'suggestions':
            loadFriendSuggestions();
            break;
    }
}

function loadFriendsData() {
    updateOverviewStats();
    loadAllFriends();
}

function updateOverviewStats() {
    const stats = {
        total: Math.floor(Math.random() * 200) + 100,
        online: Math.floor(Math.random() * 50) + 10,
        recent: Math.floor(Math.random() * 20) + 5
    };

    document.getElementById('totalFriends').textContent = stats.total;
    document.getElementById('onlineFriends').textContent = stats.online;
    document.getElementById('recentActivity').textContent = stats.recent;

    document.querySelector('[data-tab="all"] .tab-count').textContent = stats.total;
    document.querySelector('[data-tab="online"] .tab-count').textContent = stats.online;
}

function loadAllFriends() {
    const friends = [
        { name: 'Alice Smith', initials: 'AS', status: 'Online', online: true },
        { name: 'Mike Johnson', initials: 'MJ', status: 'Online', online: true },
        { name: 'Sarah Kim', initials: 'SK', status: '2 hours ago', online: false }
    ];

    const allFriendsGrid = document.getElementById('allFriendsGrid');
    allFriendsGrid.innerHTML = friends.map(friend => createFriendCard(friend)).join('');
}

function loadOnlineFriends() {
    const onlineFriends = [
        { name: 'Alice Smith', initials: 'AS', status: 'Online', online: true },
        { name: 'Mike Johnson', initials: 'MJ', status: 'Online', online: true }
    ];

    const onlineFriendsGrid = document.getElementById('onlineFriendsGrid');
    onlineFriendsGrid.innerHTML = onlineFriends.map(friend => createFriendCard(friend)).join('');
}

function loadFriendRequests() {
    const requests = [
        { name: 'Alex Turner', initials: 'AT', mutual: '3 mutual friends' },
        { name: 'Maria Rodriguez', initials: 'MR', mutual: '5 mutual friends' }
    ];

    const requestsList = document.getElementById('friendRequestsList');
    requestsList.innerHTML = requests.map(request => createRequestItem(request)).join('');
}

function loadFriendSuggestions() {
    const suggestions = [
        { name: 'Rachel Green', initials: 'RG', mutual: '4 mutual friends' },
        { name: 'Kevin Chen', initials: 'KC', mutual: '6 mutual friends' }
    ];

    const suggestionsGrid = document.getElementById('friendSuggestionsGrid');
    suggestionsGrid.innerHTML = suggestions.map(suggestion => createSuggestionCard(suggestion)).join('');
}

function createFriendCard(friend) {
    const onlineClass = friend.online ? 'online' : '';
    return `
        <div class="friend-card">
            <div class="friend-avatar ${onlineClass}">
                <span class="avatar-initials">${friend.initials}</span>
            </div>
            <div class="friend-name">${friend.name}</div>
            <div class="friend-status">${friend.status}</div>
        </div>
    `;
}

function createRequestItem(request) {
    return `
        <div class="request-item">
            <div class="request-avatar">
                <span class="avatar-initials">${request.initials}</span>
            </div>
            <div class="request-info">
                <div class="request-name">${request.name}</div>
                <div class="request-mutual">${request.mutual}</div>
            </div>
            <div class="request-actions">
                <button class="accept-btn">Accept</button>
                <button class="decline-btn">Decline</button>
            </div>
        </div>
    `;
}

function createSuggestionCard(suggestion) {
    return `
        <div class="suggestion-card">
            <div class="suggestion-header">
                <div class="suggestion-avatar">
                    <span class="avatar-initials">${suggestion.initials}</span>
                </div>
                <div class="suggestion-info">
                    <div class="suggestion-name">${suggestion.name}</div>
                    <div class="suggestion-details">MIT Campus</div>
                </div>
            </div>
            <div class="suggestion-mutual">${suggestion.mutual}</div>
            <div class="suggestion-actions">
                <button class="add-friend-suggestion-btn">Add Friend</button>
            </div>
        </div>
    `;
}

function showSearchModal() {
    const modal = document.getElementById('searchFriendsModal');
    if (modal) {
        modal.classList.add('show');
    }
}

function hideSearchModal() {
    const modal = document.getElementById('searchFriendsModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

function showAddFriendModal() {
    const modal = document.getElementById('addFriendModal');
    if (modal) {
        modal.classList.add('show');
    }
}

function hideAddFriendModal() {
    const modal = document.getElementById('addFriendModal');
    if (modal) {
        modal.classList.remove('show');
    }
}
