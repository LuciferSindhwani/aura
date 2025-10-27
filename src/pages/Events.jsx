import React, { useState } from 'react';
import '../styles/events.css';

const Events = () => {
    // State for active tab and modals
    const [activeTab, setActiveTab] = useState('upcoming');
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    // Sample data (replace with actual data later)
    const stats = {
        totalEvents: 28,
        myEvents: 5,
        trendingEvents: 8
    };

    // Helper function to format date
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div>
            {/* Navigation Header */}
            <nav className="cosmic-header">
                <div className="header-container">
                    <div className="header-left">
                        <a href="#" className="back-btn" onClick={(e) => { e.preventDefault(); window.history.back(); }}>
                            <span className="back-icon">←</span>
                            <span className="back-text">Back to Feed</span>
                        </a>
                    </div>
                    
                    <div className="header-center">
                        <h1 className="page-title">Campus Events</h1>
                    </div>
                    
                    <div className="header-right">
                        <div className="header-actions">
                            <button className="action-btn" onClick={() => setShowSearchModal(true)}>
                                <span className="action-icon">🔍</span>
                                <span className="action-text">Search</span>
                            </button>
                            <button className="action-btn" onClick={() => setShowCreateModal(true)}>
                                <span className="action-icon">➕</span>
                                <span className="action-text">Create Event</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="events-container">
                {/* Events Overview */}
                <section className="events-overview">
                    <div className="overview-stats">
                        <div className="stat-card">
                            <div className="stat-icon">📅</div>
                            <div className="stat-info">
                                <div className="stat-value">{stats.totalEvents}</div>
                                <div className="stat-label">Total Events</div>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">🎯</div>
                            <div className="stat-info">
                                <div className="stat-value">{stats.myEvents}</div>
                                <div className="stat-label">My Events</div>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">🔥</div>
                            <div className="stat-info">
                                <div className="stat-value">{stats.trendingEvents}</div>
                                <div className="stat-label">Trending</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Events Navigation */}
                <section className="events-nav">
                    <div className="nav-tabs">
                        <button 
                            className={`nav-tab ${activeTab === 'upcoming' ? 'active' : ''}`}
                            onClick={() => setActiveTab('upcoming')}
                        >
                            <span className="tab-icon">📅</span>
                            <span className="tab-text">Upcoming</span>
                            <span className="tab-count">15</span>
                        </button>
                        <button 
                            className={`nav-tab ${activeTab === 'today' ? 'active' : ''}`}
                            onClick={() => setActiveTab('today')}
                        >
                            <span className="tab-icon">🌟</span>
                            <span className="tab-text">Today</span>
                            <span className="tab-count">3</span>
                        </button>
                        <button 
                            className={`nav-tab ${activeTab === 'my' ? 'active' : ''}`}
                            onClick={() => setActiveTab('my')}
                        >
                            <span className="tab-icon">🎯</span>
                            <span className="tab-text">My Events</span>
                            <span className="tab-count">5</span>
                        </button>
                        <button 
                            className={`nav-tab ${activeTab === 'calendar' ? 'active' : ''}`}
                            onClick={() => setActiveTab('calendar')}
                        >
                            <span className="tab-icon">📆</span>
                            <span className="tab-text">Calendar</span>
                        </button>
                    </div>
                </section>

                {/* Events Content */}
                <section className="events-content">
                    {/* Upcoming Events Tab */}
                    <div className={`tab-content ${activeTab === 'upcoming' ? 'active' : ''}`}>
                        <div className="events-section">
                            <div className="section-header">
                                <h3 className="section-title">Upcoming Events</h3>
                                <div className="section-actions">
                                    <button className="filter-btn active">All</button>
                                    <button className="filter-btn">Academic</button>
                                    <button className="filter-btn">Social</button>
                                    <button className="filter-btn">Tech</button>
                                    <button className="filter-btn">Arts</button>
                                </div>
                            </div>
                            <div className="events-grid">
                                {/* Events will be loaded here */}
                            </div>
                        </div>
                    </div>

                    {/* Today's Events Tab */}
                    <div className={`tab-content ${activeTab === 'today' ? 'active' : ''}`}>
                        <div className="events-section">
                            <div className="section-header">
                                <h3 className="section-title">Today's Events</h3>
                                <div className="today-date">
                                    <span className="date-display">{formatDate(new Date())}</span>
                                </div>
                            </div>
                            <div className="events-grid">
                                {/* Today's events will be loaded here */}
                            </div>
                        </div>
                    </div>

                    {/* My Events Tab */}
                    <div className={`tab-content ${activeTab === 'my' ? 'active' : ''}`}>
                        <div className="events-section">
                            <div className="section-header">
                                <h3 className="section-title">My Events</h3>
                                <div className="my-events-stats">
                                    <span className="event-count">Registered for {stats.myEvents} events</span>
                                </div>
                            </div>
                            <div className="events-grid">
                                {/* User's events will be loaded here */}
                            </div>
                        </div>
                    </div>

                    {/* Calendar Tab */}
                    <div className={`tab-content ${activeTab === 'calendar' ? 'active' : ''}`}>
                        <div className="calendar-section">
                            <div className="section-header">
                                <h3 className="section-title">Event Calendar</h3>
                                <div className="calendar-navigation">
                                    <button className="calendar-nav-btn">←</button>
                                    <span className="current-month">
                                        {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                    </span>
                                    <button className="calendar-nav-btn">→</button>
                                </div>
                            </div>
                            <div className="calendar-container">
                                {/* Calendar will be loaded here */}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Search Events Modal */}
            <div className={`modal-overlay ${showSearchModal ? 'show' : ''}`}>
                <div className="modal-content search-modal">
                    <div className="modal-header">
                        <h3 className="modal-title">Search Events</h3>
                        <button className="modal-close" onClick={() => setShowSearchModal(false)}>×</button>
                    </div>
                    <div className="modal-body">
                        <div className="search-input-wrapper">
                            <input 
                                type="text" 
                                className="search-input" 
                                placeholder="Search events by name, description, or location..."
                            />
                            <button className="search-btn">
                                <span className="search-icon">🔍</span>
                            </button>
                        </div>
                        <div className="search-filters">
                            <button className="filter-chip active">All</button>
                            <button className="filter-chip">Name</button>
                            <button className="filter-chip">Category</button>
                            <button className="filter-chip">Location</button>
                        </div>
                        <div className="search-results">
                            {/* Search results will appear here */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Create Event Modal */}
            <div className={`modal-overlay ${showCreateModal ? 'show' : ''}`}>
                <div className="modal-content create-event-modal">
                    <div className="modal-header">
                        <h3 className="modal-title">Create New Event</h3>
                        <button className="modal-close" onClick={() => setShowCreateModal(false)}>×</button>
                    </div>
                    <div className="modal-body">
                        <form className="create-event-form">
                            <div className="form-group">
                                <label htmlFor="eventName" className="form-label">Event Name</label>
                                <input 
                                    type="text" 
                                    id="eventName" 
                                    className="cosmic-input" 
                                    placeholder="Enter event name" 
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="eventCategory" className="form-label">Category</label>
                                <select id="eventCategory" className="cosmic-input" required>
                                    <option value="">Select a category</option>
                                    <option value="academic">Academic</option>
                                    <option value="social">Social</option>
                                    <option value="tech">Technology</option>
                                    <option value="arts">Arts & Culture</option>
                                    <option value="sports">Sports</option>
                                    <option value="workshop">Workshop</option>
                                </select>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="eventDate" className="form-label">Date</label>
                                    <input type="date" id="eventDate" className="cosmic-input" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="eventTime" className="form-label">Time</label>
                                    <input type="time" id="eventTime" className="cosmic-input" required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="eventLocation" className="form-label">Location</label>
                                <input 
                                    type="text" 
                                    id="eventLocation" 
                                    className="cosmic-input" 
                                    placeholder="Enter event location" 
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="eventDescription" className="form-label">Description</label>
                                <textarea 
                                    id="eventDescription" 
                                    className="cosmic-textarea" 
                                    placeholder="Describe your event..." 
                                    rows="4" 
                                    maxLength="500" 
                                    required 
                                />
                                <div className="char-count">
                                    <span>0</span>/500
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="eventTags" className="form-label">Tags (Optional)</label>
                                <input 
                                    type="text" 
                                    id="eventTags" 
                                    className="cosmic-input" 
                                    placeholder="Enter tags separated by commas" 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="maxAttendees" className="form-label">Maximum Attendees</label>
                                <input 
                                    type="number" 
                                    id="maxAttendees" 
                                    className="cosmic-input" 
                                    placeholder="Leave empty for unlimited" 
                                    min="1" 
                                />
                            </div>
                            <div className="form-actions">
                                <button 
                                    type="button" 
                                    className="cosmic-btn secondary-btn" 
                                    onClick={() => setShowCreateModal(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="cosmic-btn primary-btn">
                                    <span className="btn-text">Create Event</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Event Details Modal */}
            <div className={`modal-overlay ${showDetailsModal ? 'show' : ''}`}>
                <div className="modal-content event-details-modal">
                    <div className="modal-header">
                        <div className="event-header">
                            <div className="event-icon-large">📅</div>
                            <div className="event-info">
                                <h3 className="event-name">Tech Innovation Workshop</h3>
                                <p className="event-category">Technology</p>
                                <p className="event-time">Today at 2:00 PM</p>
                            </div>
                        </div>
                        <button className="modal-close" onClick={() => setShowDetailsModal(false)}>×</button>
                    </div>
                    <div className="modal-body">
                        <div className="event-details">
                            <div className="detail-section">
                                <h4 className="detail-title">About</h4>
                                <p className="event-description">
                                    Join us for an exciting workshop on the latest innovations in technology.
                                </p>
                            </div>
                            <div className="detail-section">
                                <h4 className="detail-title">Event Information</h4>
                                <div className="event-info-grid">
                                    <div className="info-item">
                                        <span className="info-label">Date:</span>
                                        <span className="info-value">{formatDate(new Date())}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">Time:</span>
                                        <span className="info-value">2:00 PM - 4:00 PM</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">Location:</span>
                                        <span className="info-value">Student Center Room 101</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">Attendees:</span>
                                        <span className="info-value">45/50</span>
                                    </div>
                                </div>
                            </div>
                            <div className="detail-section">
                                <h4 className="detail-title">Event Tags</h4>
                                <div className="event-tags">
                                    {/* Event tags will be loaded here */}
                                </div>
                            </div>
                        </div>
                        <div className="event-actions">
                            <button className="action-btn primary-btn">
                                <span className="btn-icon">🎯</span>
                                <span className="btn-text">Register for Event</span>
                            </button>
                            <button className="action-btn secondary-btn">
                                <span className="btn-icon">📤</span>
                                <span className="btn-text">Share Event</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Events;