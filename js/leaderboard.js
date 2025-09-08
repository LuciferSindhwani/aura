// Leaderboard Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    checkAuthStatus();
    setupEventListeners();
    loadLeaderboardData();
    loadTabContent('global');
    loadAchievements();
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

    // View achievements modal
    const viewAchievementsBtn = document.getElementById('viewAchievementsBtn');
    if (viewAchievementsBtn) {
        viewAchievementsBtn.addEventListener('click', showAchievementsModal);
    }

    const closeAchievementsModal = document.getElementById('closeAchievementsModal');
    if (closeAchievementsModal) {
        closeAchievementsModal.addEventListener('click', hideAchievementsModal);
    }

    // View stats modal
    const viewStatsBtn = document.getElementById('viewStatsBtn');
    if (viewStatsBtn) {
        viewStatsBtn.addEventListener('click', showStatsModal);
    }

    const closeStatsModal = document.getElementById('closeStatsModal');
    if (closeStatsModal) {
        closeStatsModal.addEventListener('click', hideStatsModal);
    }

    // View all achievements
    const viewAllAchievementsBtn = document.getElementById('viewAllAchievementsBtn');
    if (viewAllAchievementsBtn) {
        viewAllAchievementsBtn.addEventListener('click', showAchievementsModal);
    }

    // Filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            filterLeaderboard(filter);
        });
    });

    // Campus selector
    const campusSelect = document.getElementById('campusSelect');
    if (campusSelect) {
        campusSelect.addEventListener('change', handleCampusChange);
    }

    // Achievement category buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('category-btn')) {
            const category = e.target.dataset.category;
            filterAchievements(category);
        }
    });
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
        case 'global':
            loadGlobalLeaderboard();
            break;
        case 'campus':
            loadCampusLeaderboard();
            break;
        case 'weekly':
            loadWeeklyLeaderboard();
            break;
        case 'monthly':
            loadMonthlyLeaderboard();
            break;
    }
}

function loadLeaderboardData() {
    updateOverviewStats();
    loadGlobalLeaderboard();
}

function updateOverviewStats() {
    const stats = {
        total: Math.floor(Math.random() * 2000) + 1000,
        my: Math.floor(Math.random() * 100) + 20,
        score: Math.floor(Math.random() * 5000) + 2000
    };

    document.getElementById('totalUsers').textContent = stats.total.toLocaleString();
    document.getElementById('myRank').textContent = `#${stats.my}`;
    document.getElementById('myScore').textContent = stats.score.toLocaleString();
}

function loadGlobalLeaderboard() {
    const rankings = [
        {
            rank: 1,
            name: 'Alex Chen',
            initials: 'AC',
            campus: 'MIT',
            level: 'Senior',
            score: 15420,
            isTop3: true
        },
        {
            rank: 2,
            name: 'Sarah Kim',
            initials: 'SK',
            campus: 'Stanford',
            level: 'Junior',
            score: 14280,
            isTop3: true
        },
        {
            rank: 3,
            name: 'Mike Johnson',
            initials: 'MJ',
            campus: 'Harvard',
            level: 'Senior',
            score: 13850,
            isTop3: true
        },
        {
            rank: 4,
            name: 'Emma Davis',
            initials: 'ED',
            campus: 'MIT',
            level: 'Sophomore',
            score: 12560,
            isTop3: false
        },
        {
            rank: 5,
            name: 'David Wilson',
            initials: 'DW',
            campus: 'UC Berkeley',
            level: 'Junior',
            score: 11890,
            isTop3: false
        }
    ];

    const globalLeaderboardList = document.getElementById('globalLeaderboardList');
    globalLeaderboardList.innerHTML = rankings.map(ranking => createLeaderboardItem(ranking)).join('');
}

function loadCampusLeaderboard() {
    const rankings = [
        {
            rank: 1,
            name: 'Alex Chen',
            initials: 'AC',
            campus: 'MIT',
            level: 'Senior',
            score: 15420,
            isTop3: true
        },
        {
            rank: 2,
            name: 'Emma Davis',
            initials: 'ED',
            campus: 'MIT',
            level: 'Sophomore',
            score: 12560,
            isTop3: true
        },
        {
            rank: 3,
            name: 'James Brown',
            initials: 'JB',
            campus: 'MIT',
            level: 'Freshman',
            score: 11200,
            isTop3: true
        }
    ];

    const campusLeaderboardList = document.getElementById('campusLeaderboardList');
    campusLeaderboardList.innerHTML = rankings.map(ranking => createLeaderboardItem(ranking)).join('');
}

function loadWeeklyLeaderboard() {
    const rankings = [
        {
            rank: 1,
            name: 'Lisa Garcia',
            initials: 'LG',
            campus: 'MIT',
            level: 'Junior',
            score: 2840,
            isTop3: true
        },
        {
            rank: 2,
            name: 'Tom Anderson',
            initials: 'TA',
            campus: 'Stanford',
            level: 'Senior',
            score: 2650,
            isTop3: true
        },
        {
            rank: 3,
            name: 'Rachel Green',
            initials: 'RG',
            campus: 'Harvard',
            level: 'Sophomore',
            score: 2480,
            isTop3: true
        }
    ];

    const weeklyLeaderboardList = document.getElementById('weeklyLeaderboardList');
    weeklyLeaderboardList.innerHTML = rankings.map(ranking => createLeaderboardItem(ranking)).join('');
}

function loadMonthlyLeaderboard() {
    const rankings = [
        {
            rank: 1,
            name: 'Kevin Chen',
            initials: 'KC',
            campus: 'MIT',
            level: 'Senior',
            score: 8920,
            isTop3: true
        },
        {
            rank: 2,
            name: 'Nina Patel',
            initials: 'NP',
            campus: 'Stanford',
            level: 'Junior',
            score: 8450,
            isTop3: true
        },
        {
            rank: 3,
            name: 'Marcus Johnson',
            initials: 'MJ',
            campus: 'UC Berkeley',
            level: 'Senior',
            score: 8120,
            isTop3: true
        }
    ];

    const monthlyLeaderboardList = document.getElementById('monthlyLeaderboardList');
    monthlyLeaderboardList.innerHTML = rankings.map(ranking => createLeaderboardItem(ranking)).join('');
}

function createLeaderboardItem(ranking) {
    const top3Class = ranking.isTop3 ? 'top-3' : '';
    const rankClass = ranking.rank <= 3 ? `rank-${ranking.rank}` : 'rank-other';
    
    return `
        <div class="leaderboard-item ${top3Class}">
            <div class="rank-badge ${rankClass}">${ranking.rank}</div>
            <div class="user-avatar">${ranking.initials}</div>
            <div class="user-info">
                <div class="user-name">${ranking.name}</div>
                <div class="user-campus">${ranking.campus}</div>
                <div class="user-level">${ranking.level}</div>
            </div>
            <div class="user-score">
                <div class="score-value">${ranking.score.toLocaleString()}</div>
                <div class="score-label">Points</div>
            </div>
        </div>
    `;
}

function loadAchievements() {
    const achievements = [
        {
            icon: '🏆',
            name: 'First Post',
            description: 'Created your first post on Aura'
        },
        {
            icon: '🌟',
            name: 'Social Butterfly',
            description: 'Connected with 50+ friends'
        },
        {
            icon: '🎯',
            name: 'Goal Setter',
            description: 'Completed 10 daily quests'
        },
        {
            icon: '🔥',
            name: 'Trending',
            description: 'Had a post reach 100+ likes'
        }
    ];

    const achievementsGrid = document.getElementById('achievementsGrid');
    achievementsGrid.innerHTML = achievements.map(achievement => createAchievementCard(achievement)).join('');
}

function createAchievementCard(achievement) {
    return `
        <div class="achievement-card">
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-name">${achievement.name}</div>
            <div class="achievement-description">${achievement.description}</div>
        </div>
    `;
}

function filterLeaderboard(filter) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
    
    // In a real app, this would filter the leaderboard by year level
    console.log(`Filtering leaderboard by: ${filter}`);
}

function handleCampusChange() {
    const campusSelect = document.getElementById('campusSelect');
    const selectedCampus = campusSelect.value;
    
    // In a real app, this would load the leaderboard for the selected campus
    console.log(`Loading leaderboard for campus: ${selectedCampus}`);
    loadCampusLeaderboard();
}

function filterAchievements(category) {
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
    
    // In a real app, this would filter achievements by category
    console.log(`Filtering achievements by category: ${category}`);
}

function showAchievementsModal() {
    const modal = document.getElementById('achievementsModal');
    if (modal) {
        modal.classList.add('show');
        loadAllAchievements();
    }
}

function hideAchievementsModal() {
    const modal = document.getElementById('achievementsModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

function showStatsModal() {
    const modal = document.getElementById('statsModal');
    if (modal) {
        modal.classList.add('show');
    }
}

function hideStatsModal() {
    const modal = document.getElementById('statsModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

function loadAllAchievements() {
    const allAchievements = [
        {
            icon: '🏆',
            name: 'First Post',
            description: 'Created your first post on Aura',
            category: 'social'
        },
        {
            icon: '🌟',
            name: 'Social Butterfly',
            description: 'Connected with 50+ friends',
            category: 'social'
        },
        {
            icon: '🎯',
            name: 'Goal Setter',
            description: 'Completed 10 daily quests',
            category: 'academic'
        },
        {
            icon: '🔥',
            name: 'Trending',
            description: 'Had a post reach 100+ likes',
            category: 'social'
        },
        {
            icon: '🎨',
            name: 'Creative Soul',
            description: 'Shared 25 creative posts',
            category: 'creative'
        },
        {
            icon: '📚',
            name: 'Scholar',
            description: 'Participated in 20 academic discussions',
            category: 'academic'
        },
        {
            icon: '⚽',
            name: 'Athlete',
            description: 'Joined 5 sports-related events',
            category: 'sports'
        }
    ];

    const achievementsList = document.getElementById('achievementsList');
    achievementsList.innerHTML = allAchievements.map(achievement => createAchievementItem(achievement)).join('');
}

function createAchievementItem(achievement) {
    return `
        <div class="achievement-item" data-category="${achievement.category}">
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-name">${achievement.name}</div>
            <div class="achievement-description">${achievement.description}</div>
        </div>
    `;
}
