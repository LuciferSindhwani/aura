// Clubs Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    checkAuthStatus();
    setupEventListeners();
    loadClubsData();
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

    // Search clubs modal
    const searchClubsBtn = document.getElementById('searchClubsBtn');
    if (searchClubsBtn) {
        searchClubsBtn.addEventListener('click', showSearchModal);
    }

    const closeSearchModal = document.getElementById('closeSearchModal');
    if (closeSearchModal) {
        closeSearchModal.addEventListener('click', hideSearchModal);
    }

    // Create club modal
    const createClubBtn = document.getElementById('createClubBtn');
    if (createClubBtn) {
        createClubBtn.addEventListener('click', showCreateClubModal);
    }

    const closeCreateClubModal = document.getElementById('closeCreateClubModal');
    if (closeCreateClubModal) {
        closeCreateClubModal.addEventListener('click', hideCreateClubModal);
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
            loadAllClubs();
            break;
        case 'my':
            loadMyClubs();
            break;
        case 'trending':
            loadTrendingClubs();
            break;
        case 'categories':
            loadCategories();
            break;
    }
}

function loadClubsData() {
    updateOverviewStats();
    loadAllClubs();
}

function updateOverviewStats() {
    const stats = {
        total: Math.floor(Math.random() * 100) + 50,
        my: Math.floor(Math.random() * 20) + 5,
        active: Math.floor(Math.random() * 30) + 10
    };

    document.getElementById('totalClubs').textContent = stats.total;
    document.getElementById('myClubs').textContent = stats.my;
    document.getElementById('activeClubs').textContent = stats.active;

    document.querySelector('[data-tab="all"] .tab-count').textContent = stats.total;
    document.querySelector('[data-tab="my"] .tab-count').textContent = stats.my;
}

function loadAllClubs() {
    const clubs = [
        {
            name: 'Tech Innovation Club',
            icon: '💻',
            category: 'Technology',
            members: 156,
            description: 'A community of tech enthusiasts exploring the latest innovations.',
            tags: ['AI', 'Programming', 'Innovation'],
            status: 'active',
            isMember: false
        },
        {
            name: 'Art & Culture Society',
            icon: '🎨',
            category: 'Arts',
            members: 89,
            description: 'Celebrating creativity through various art forms.',
            tags: ['Art', 'Culture', 'Creativity'],
            status: 'active',
            isMember: true
        }
    ];

    const allClubsGrid = document.getElementById('allClubsGrid');
    allClubsGrid.innerHTML = clubs.map(club => createClubCard(club)).join('');
}

function loadMyClubs() {
    const myClubs = [
        {
            name: 'Art & Culture Society',
            icon: '🎨',
            category: 'Arts',
            members: 89,
            description: 'Celebrating creativity through various art forms.',
            tags: ['Art', 'Culture', 'Creativity'],
            status: 'active',
            isMember: true
        }
    ];

    const myClubsGrid = document.getElementById('myClubsGrid');
    myClubsGrid.innerHTML = myClubs.map(club => createClubCard(club)).join('');
}

function loadTrendingClubs() {
    const trendingClubs = [
        {
            name: 'Tech Innovation Club',
            icon: '💻',
            category: 'Technology',
            members: 156,
            description: 'A community of tech enthusiasts exploring the latest innovations.',
            tags: ['AI', 'Programming', 'Innovation'],
            status: 'active',
            isMember: false
        }
    ];

    const trendingClubsGrid = document.getElementById('trendingClubsGrid');
    trendingClubsGrid.innerHTML = trendingClubs.map(club => createClubCard(club)).join('');
}

function loadCategories() {
    const categories = [
        {
            icon: '💻',
            name: 'Technology',
            count: 15,
            description: 'Innovation, programming, AI, and cutting-edge tech'
        },
        {
            icon: '🎨',
            name: 'Arts & Culture',
            count: 12,
            description: 'Creative expression through various art forms'
        }
    ];

    const categoriesGrid = document.getElementById('categoriesGrid');
    categoriesGrid.innerHTML = categories.map(category => createCategoryCard(category)).join('');
}

function createClubCard(club) {
    const statusClass = club.status === 'active' ? 'active' : 'inactive';
    const memberClass = club.isMember ? 'joined' : '';
    
    return `
        <div class="club-card">
            <div class="club-header">
                <div class="club-icon">${club.icon}</div>
                <div class="club-info">
                    <div class="club-name">${club.name}</div>
                    <div class="club-category">${club.category}</div>
                    <div class="club-members">${club.members} members</div>
                </div>
            </div>
            <div class="club-description">${club.description}</div>
            <div class="club-tags">
                ${club.tags.map(tag => `<span class="club-tag">${tag}</span>`).join('')}
            </div>
            <div class="club-actions">
                <div class="club-status">
                    <div class="status-indicator ${statusClass}"></div>
                    <span>${club.status}</span>
                </div>
                <button class="join-club-btn ${memberClass}">
                    ${club.isMember ? 'Leave Club' : 'Join Club'}
                </button>
            </div>
        </div>
    `;
}

function createCategoryCard(category) {
    return `
        <div class="category-card">
            <div class="category-icon">${category.icon}</div>
            <div class="category-name">${category.name}</div>
            <div class="category-count">${category.count} clubs</div>
            <div class="category-description">${category.description}</div>
        </div>
    `;
}

function showSearchModal() {
    const modal = document.getElementById('searchClubsModal');
    if (modal) {
        modal.classList.add('show');
    }
}

function hideSearchModal() {
    const modal = document.getElementById('searchClubsModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

function showCreateClubModal() {
    const modal = document.getElementById('createClubModal');
    if (modal) {
        modal.classList.add('show');
    }
}

function hideCreateClubModal() {
    const modal = document.getElementById('createClubModal');
    if (modal) {
        modal.classList.remove('show');
    }
}
