// Events Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    checkAuthStatus();
    setupEventListeners();
    loadEventsData();
    loadTabContent('upcoming');
    updateTodayDate();
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

    // Search events modal
    const searchEventsBtn = document.getElementById('searchEventsBtn');
    if (searchEventsBtn) {
        searchEventsBtn.addEventListener('click', showSearchModal);
    }

    const closeSearchModal = document.getElementById('closeSearchModal');
    if (closeSearchModal) {
        closeSearchModal.addEventListener('click', hideSearchModal);
    }

    // Create event modal
    const createEventBtn = document.getElementById('createEventBtn');
    if (createEventBtn) {
        createEventBtn.addEventListener('click', showCreateEventModal);
    }

    const closeCreateEventModal = document.getElementById('closeCreateEventModal');
    if (closeCreateEventModal) {
        closeCreateEventModal.addEventListener('click', hideCreateEventModal);
    }

    // Calendar navigation
    const prevMonthBtn = document.getElementById('prevMonthBtn');
    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', () => navigateMonth(-1));
    }

    const nextMonthBtn = document.getElementById('nextMonthBtn');
    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', () => navigateMonth(1));
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
        case 'upcoming':
            loadUpcomingEvents();
            break;
        case 'today':
            loadTodayEvents();
            break;
        case 'my':
            loadMyEvents();
            break;
        case 'calendar':
            loadCalendar();
            break;
    }
}

function loadEventsData() {
    updateOverviewStats();
    loadUpcomingEvents();
}

function updateOverviewStats() {
    const stats = {
        total: Math.floor(Math.random() * 50) + 25,
        my: Math.floor(Math.random() * 15) + 3,
        trending: Math.floor(Math.random() * 20) + 5
    };

    document.getElementById('totalEvents').textContent = stats.total;
    document.getElementById('myEvents').textContent = stats.my;
    document.getElementById('trendingEvents').textContent = stats.trending;

    document.querySelector('[data-tab="upcoming"] .tab-count').textContent = '15';
    document.querySelector('[data-tab="today"] .tab-count').textContent = '3';
    document.querySelector('[data-tab="my"] .tab-count').textContent = stats.my;
}

function updateTodayDate() {
    const today = new Date();
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const dateString = today.toLocaleDateString('en-US', options);
    document.getElementById('todayDate').textContent = dateString;
}

function loadUpcomingEvents() {
    const events = [
        {
            name: 'Tech Innovation Workshop',
            icon: '💻',
            category: 'Technology',
            time: 'Tomorrow at 2:00 PM',
            description: 'Join us for an exciting workshop on the latest innovations in technology.',
            tags: ['AI', 'Innovation', 'Workshop'],
            location: 'Student Center Room 101',
            attendees: '45/50',
            status: 'upcoming',
            isRegistered: false
        },
        {
            name: 'Art Exhibition Opening',
            icon: '🎨',
            category: 'Arts',
            time: 'Friday at 6:00 PM',
            description: 'Celebrate the opening of our annual student art exhibition.',
            tags: ['Art', 'Exhibition', 'Culture'],
            location: 'Art Gallery',
            attendees: '78/100',
            status: 'upcoming',
            isRegistered: true
        }
    ];

    const upcomingEventsGrid = document.getElementById('upcomingEventsGrid');
    upcomingEventsGrid.innerHTML = events.map(event => createEventCard(event)).join('');
}

function loadTodayEvents() {
    const events = [
        {
            name: 'Study Group Session',
            icon: '📚',
            category: 'Academic',
            time: 'Today at 3:00 PM',
            description: 'Join our study group for advanced mathematics.',
            tags: ['Study', 'Math', 'Academic'],
            location: 'Library Study Room 3',
            attendees: '12/15',
            status: 'today',
            isRegistered: true
        }
    ];

    const todayEventsGrid = document.getElementById('todayEventsGrid');
    todayEventsGrid.innerHTML = events.map(event => createEventCard(event)).join('');
}

function loadMyEvents() {
    const events = [
        {
            name: 'Art Exhibition Opening',
            icon: '🎨',
            category: 'Arts',
            time: 'Friday at 6:00 PM',
            description: 'Celebrate the opening of our annual student art exhibition.',
            tags: ['Art', 'Exhibition', 'Culture'],
            location: 'Art Gallery',
            attendees: '78/100',
            status: 'upcoming',
            isRegistered: true
        },
        {
            name: 'Study Group Session',
            icon: '📚',
            category: 'Academic',
            time: 'Today at 3:00 PM',
            description: 'Join our study group for advanced mathematics.',
            tags: ['Study', 'Math', 'Academic'],
            location: 'Library Study Room 3',
            attendees: '12/15',
            status: 'today',
            isRegistered: true
        }
    ];

    const myEventsGrid = document.getElementById('myEventsGrid');
    myEventsGrid.innerHTML = events.map(event => createEventCard(event)).join('');
}

function loadCalendar() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getDate();
    
    document.getElementById('currentMonth').textContent = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    renderCalendar(currentMonth, currentYear);
}

function renderCalendar(month, year) {
    const calendarContainer = document.getElementById('calendarContainer');
    
    // Calendar header
    const headerHTML = `
        <div class="calendar-header">
            <div class="calendar-day-header">Sun</div>
            <div class="calendar-day-header">Mon</div>
            <div class="calendar-day-header">Tue</div>
            <div class="calendar-day-header">Wed</div>
            <div class="calendar-day-header">Thu</div>
            <div class="calendar-day-header">Fri</div>
            <div class="calendar-day-header">Sat</div>
        </div>
    `;
    
    // Calendar grid
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    let gridHTML = '<div class="calendar-grid">';
    
    for (let i = 0; i < 42; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        
        const isCurrentMonth = currentDate.getMonth() === month;
        const isToday = currentDate.toDateString() === new Date().toDateString();
        const hasEvents = Math.random() > 0.7; // Simulate events
        
        let dayClass = 'calendar-day';
        if (!isCurrentMonth) dayClass += ' other-month';
        if (isToday) dayClass += ' today';
        if (hasEvents) dayClass += ' has-events';
        
        gridHTML += `
            <div class="${dayClass}" data-date="${currentDate.toISOString()}">
                <div class="day-number">${currentDate.getDate()}</div>
                ${hasEvents ? '<div class="day-events">2</div>' : ''}
            </div>
        `;
    }
    
    gridHTML += '</div>';
    
    calendarContainer.innerHTML = headerHTML + gridHTML;
}

function navigateMonth(direction) {
    // In a real app, this would navigate between months
    console.log(`Navigating month: ${direction > 0 ? 'next' : 'previous'}`);
}

function createEventCard(event) {
    const statusClass = event.status;
    const registeredClass = event.isRegistered ? 'registered' : '';
    
    return `
        <div class="event-card">
            <div class="event-header">
                <div class="event-icon">${event.icon}</div>
                <div class="event-info">
                    <div class="event-name">${event.name}</div>
                    <div class="event-category">${event.category}</div>
                    <div class="event-time">${event.time}</div>
                </div>
            </div>
            <div class="event-description">${event.description}</div>
            <div class="event-tags">
                ${event.tags.map(tag => `<span class="event-tag">${tag}</span>`).join('')}
            </div>
            <div class="event-meta">
                <div class="event-location">
                    <span class="location-icon">📍</span>
                    <span>${event.location}</span>
                </div>
                <div class="event-attendees">
                    <span class="attendees-count">${event.attendees}</span>
                    <span class="attendees-icon">👥</span>
                </div>
            </div>
            <div class="event-actions">
                <div class="event-status">
                    <div class="status-indicator ${statusClass}"></div>
                    <span>${event.status}</span>
                </div>
                <button class="register-event-btn ${registeredClass}">
                    ${event.isRegistered ? 'Registered' : 'Register'}
                </button>
            </div>
        </div>
    `;
}

function showSearchModal() {
    const modal = document.getElementById('searchEventsModal');
    if (modal) {
        modal.classList.add('show');
    }
}

function hideSearchModal() {
    const modal = document.getElementById('searchEventsModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

function showCreateEventModal() {
    const modal = document.getElementById('createEventModal');
    if (modal) {
        modal.classList.add('show');
    }
}

function hideCreateEventModal() {
    const modal = document.getElementById('createEventModal');
    if (modal) {
        modal.classList.remove('show');
    }
}
