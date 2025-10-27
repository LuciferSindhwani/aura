import React, { useState } from 'react';
import '../styles/profile.css';
import usersData from '../data/users.json';

const Profile = () => {
    const [activeTab, setActiveTab] = useState('badges');
    const [showEditModal, setShowEditModal] = useState(false);

    // Use the first user as the current user (in a real app, this would be the logged-in user)
    const userData = usersData[0] || {};

    // Defensive defaults in case the JSON doesn't include these fields yet
    const stats = userData.stats || { auraScore: 0, friends: 0, clubs: 0, events: 0 };
    const badges = userData.badges || [];

    // Basic user fields with defaults to avoid undefined access in JSX
    const {
        avatar = '🙂',
        name = 'Unknown',
        username = '',
        role = '',
        campus = ''
    } = userData;

    return (
        <div className="profile-page">
            {/* Navigation Header */}
            <nav className="cosmic-header">
                <div className="header-container">
                    <div className="header-left">
                        <a href="#" className="back-btn" onClick={(e) => { e.preventDefault(); window.history.back(); }}>
                            <span className="back-icon">←</span>
                            <span className="back-text">Back</span>
                        </a>
                    </div>
                    <div className="header-center">
                        <h1 className="page-title">Profile</h1>
                    </div>
                    <div className="header-right">
                        <div className="header-actions">
                            <button className="action-btn" onClick={() => setShowEditModal(true)}>
                                <span className="action-icon">✏️</span>
                                <span className="action-text">Edit</span>
                            </button>
                            <button className="action-btn">
                                <span className="action-icon">⚙️</span>
                                <span className="action-text">Settings</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="profile-container">
                {/* Profile Header */}
                <section className="profile-header">
                    <div className="profile-banner">
                        <div className="banner-content">
                            <div className="profile-avatar">{avatar}</div>
                            <div className="profile-info">
                                <h2 className="profile-name">{name}</h2>
                                <p className="profile-username">{username}</p>
                                <p className="profile-role">{role}</p>
                                <p className="profile-campus">{campus}</p>
                            </div>
                            <div className="profile-stats">
                                <div className="stat-item">
                                    <span className="stat-value">{stats?.auraScore ?? 0}</span>
                                    <span className="stat-label">Aura Score</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-value">{stats?.friends ?? 0}</span>
                                    <span className="stat-label">Friends</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-value">{stats?.clubs ?? 0}</span>
                                    <span className="stat-label">Clubs</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-value">{stats?.events ?? 0}</span>
                                    <span className="stat-label">Events</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Profile Navigation */}
                <section className="profile-nav">
                    <div className="nav-tabs">
                        <button 
                            className={`nav-tab ${activeTab === 'badges' ? 'active' : ''}`}
                            onClick={() => setActiveTab('badges')}
                        >
                            <span className="tab-icon">🏆</span>
                            <span className="tab-text">Badges</span>
                        </button>
                        <button 
                            className={`nav-tab ${activeTab === 'activity' ? 'active' : ''}`}
                            onClick={() => setActiveTab('activity')}
                        >
                            <span className="tab-icon">📊</span>
                            <span className="tab-text">Activity</span>
                        </button>
                        <button 
                            className={`nav-tab ${activeTab === 'achievements' ? 'active' : ''}`}
                            onClick={() => setActiveTab('achievements')}
                        >
                            <span className="tab-icon">🌟</span>
                            <span className="tab-text">Achievements</span>
                        </button>
                    </div>
                </section>

                {/* Profile Content */}
                <section className="profile-content">
                    {/* Badges Tab */}
                    <div className={`tab-content ${activeTab === 'badges' ? 'active' : ''}`}>
                        <div className="badges-grid">
                            {badges.map(badge => (
                                <div key={badge.id} className="badge-card">
                                    <div className="badge-icon">{badge.icon}</div>
                                    <div className="badge-info">
                                        <h3 className="badge-name">{badge.name}</h3>
                                        <div className="badge-level">
                                            Level {badge.level}
                                            <div className="level-progress">
                                                <div 
                                                    className="progress-bar" 
                                                    style={{width: `${(badge.level / 5) * 100}%`}}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Activity Tab */}
                    <div className={`tab-content ${activeTab === 'activity' ? 'active' : ''}`}>
                        <div className="activity-timeline">
                            <div className="timeline-item">
                                <div className="timeline-icon">📅</div>
                                <div className="timeline-content">
                                    <h4 className="activity-title">Joined Tech Innovation Workshop</h4>
                                    <p className="activity-time">2 hours ago</p>
                                </div>
                            </div>
                            <div className="timeline-item">
                                <div className="timeline-icon">🏆</div>
                                <div className="timeline-content">
                                    <h4 className="activity-title">Earned "Tech Pioneer" Badge Level 3</h4>
                                    <p className="activity-time">Yesterday</p>
                                </div>
                            </div>
                            <div className="timeline-item">
                                <div className="timeline-icon">👥</div>
                                <div className="timeline-content">
                                    <h4 className="activity-title">Joined Coding Club</h4>
                                    <p className="activity-time">3 days ago</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Achievements Tab */}
                    <div className={`tab-content ${activeTab === 'achievements' ? 'active' : ''}`}>
                        <div className="achievements-grid">
                            <div className="achievement-card">
                                <div className="achievement-icon">🎯</div>
                                <div className="achievement-info">
                                    <h3 className="achievement-name">Quest Master</h3>
                                    <p className="achievement-desc">Completed 50 campus quests</p>
                                    <div className="achievement-progress">
                                        <div className="progress-bar" style={{width: '80%'}}></div>
                                        <span className="progress-text">40/50</span>
                                    </div>
                                </div>
                            </div>
                            <div className="achievement-card">
                                <div className="achievement-icon">🤝</div>
                                <div className="achievement-info">
                                    <h3 className="achievement-name">Social Network</h3>
                                    <p className="achievement-desc">Connected with 100 students</p>
                                    <div className="achievement-progress">
                                        <div className="progress-bar" style={{width: '60%'}}></div>
                                        <span className="progress-text">60/100</span>
                                    </div>
                                </div>
                            </div>
                            <div className="achievement-card locked">
                                <div className="achievement-icon">🌟</div>
                                <div className="achievement-info">
                                    <h3 className="achievement-name">Campus Legend</h3>
                                    <p className="achievement-desc">Reach 5000 Aura Score</p>
                                    <div className="achievement-progress">
                                        <div className="progress-bar" style={{width: '50%'}}></div>
                                        <span className="progress-text">2500/5000</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Edit Profile Modal */}
            <div className={`modal-overlay ${showEditModal ? 'show' : ''}`}>
                <div className="modal-content edit-profile-modal">
                    <div className="modal-header">
                        <h3 className="modal-title">Edit Profile</h3>
                        <button className="modal-close" onClick={() => setShowEditModal(false)}>×</button>
                    </div>
                    <div className="modal-body">
                        <form className="edit-profile-form">
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">Full Name</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    className="cosmic-input" 
                                    defaultValue={userData.name} 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input 
                                    type="text" 
                                    id="username" 
                                    className="cosmic-input" 
                                    defaultValue={userData.username} 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="role" className="form-label">Role</label>
                                <input 
                                    type="text" 
                                    id="role" 
                                    className="cosmic-input" 
                                    defaultValue={userData.role} 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="campus" className="form-label">Campus</label>
                                <select id="campus" className="cosmic-input" defaultValue={userData.campus}>
                                    <option value="Engineering">Engineering</option>
                                    <option value="Business">Business</option>
                                    <option value="Arts">Arts & Sciences</option>
                                    <option value="Medicine">Medicine</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="bio" className="form-label">Bio</label>
                                <textarea 
                                    id="bio" 
                                    className="cosmic-textarea" 
                                    rows="4"
                                    placeholder="Tell us about yourself..."
                                ></textarea>
                            </div>
                            <div className="form-actions">
                                <button 
                                    type="button" 
                                    className="cosmic-btn secondary-btn" 
                                    onClick={() => setShowEditModal(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="cosmic-btn primary-btn">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;