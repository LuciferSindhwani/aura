import React, { useState } from 'react';
import '../styles/friends.css';

const Friends = () => {
    const [activeTab, setActiveTab] = useState('friends');
    const [showSearchModal, setShowSearchModal] = useState(false);

    // Sample data - replace with actual data later
    const friendsData = {
        friends: [
            { id: 1, name: "Sarah Lee", username: "@sarahlee", avatar: "👩", campus: "Engineering", mutualFriends: 15 },
            { id: 2, name: "Mike Chen", username: "@mikechen", avatar: "👨", campus: "Business", mutualFriends: 8 },
            { id: 3, name: "Emma Wilson", username: "@emmaw", avatar: "👩", campus: "Arts", mutualFriends: 12 }
        ],
        requests: [
            { id: 4, name: "John Doe", username: "@johndoe", avatar: "👨", campus: "Engineering", mutualFriends: 5 },
            { id: 5, name: "Lisa Park", username: "@lisap", avatar: "👩", campus: "Medicine", mutualFriends: 3 }
        ],
        suggestions: [
            { id: 6, name: "David Kim", username: "@davidk", avatar: "👨", campus: "Engineering", mutualFriends: 20 },
            { id: 7, name: "Anna Smith", username: "@annas", avatar: "👩", campus: "Business", mutualFriends: 15 }
        ]
    };

    return (
        <div className="friends-page">
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
                        <h1 className="page-title">Friends</h1>
                    </div>
                    <div className="header-right">
                        <div className="header-actions">
                            <button className="action-btn" onClick={() => setShowSearchModal(true)}>
                                <span className="action-icon">🔍</span>
                                <span className="action-text">Find Friends</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="friends-container">
                {/* Friends Stats */}
                <section className="friends-stats">
                    <div className="stats-card">
                        <div className="stats-icon">👥</div>
                        <div className="stats-info">
                            <div className="stats-value">{friendsData.friends.length}</div>
                            <div className="stats-label">Friends</div>
                        </div>
                    </div>
                    <div className="stats-card">
                        <div className="stats-icon">💫</div>
                        <div className="stats-info">
                            <div className="stats-value">{friendsData.requests.length}</div>
                            <div className="stats-label">Pending Requests</div>
                        </div>
                    </div>
                    <div className="stats-card">
                        <div className="stats-icon">⭐</div>
                        <div className="stats-info">
                            <div className="stats-value">{friendsData.suggestions.length}</div>
                            <div className="stats-label">Suggestions</div>
                        </div>
                    </div>
                </section>

                {/* Friends Navigation */}
                <section className="friends-nav">
                    <div className="nav-tabs">
                        <button 
                            className={`nav-tab ${activeTab === 'friends' ? 'active' : ''}`}
                            onClick={() => setActiveTab('friends')}
                        >
                            <span className="tab-icon">👥</span>
                            <span className="tab-text">Friends</span>
                            <span className="tab-count">{friendsData.friends.length}</span>
                        </button>
                        <button 
                            className={`nav-tab ${activeTab === 'requests' ? 'active' : ''}`}
                            onClick={() => setActiveTab('requests')}
                        >
                            <span className="tab-icon">💫</span>
                            <span className="tab-text">Requests</span>
                            <span className="tab-count">{friendsData.requests.length}</span>
                        </button>
                        <button 
                            className={`nav-tab ${activeTab === 'suggestions' ? 'active' : ''}`}
                            onClick={() => setActiveTab('suggestions')}
                        >
                            <span className="tab-icon">⭐</span>
                            <span className="tab-text">Suggestions</span>
                            <span className="tab-count">{friendsData.suggestions.length}</span>
                        </button>
                    </div>
                </section>

                {/* Friends Content */}
                <section className="friends-content">
                    {/* Friends Tab */}
                    <div className={`tab-content ${activeTab === 'friends' ? 'active' : ''}`}>
                        <div className="friends-list">
                            {friendsData.friends.map(friend => (
                                <div key={friend.id} className="friend-card">
                                    <div className="friend-avatar">{friend.avatar}</div>
                                    <div className="friend-info">
                                        <h3 className="friend-name">{friend.name}</h3>
                                        <p className="friend-username">{friend.username}</p>
                                        <p className="friend-campus">{friend.campus}</p>
                                        <p className="mutual-friends">
                                            {friend.mutualFriends} mutual friends
                                        </p>
                                    </div>
                                    <div className="friend-actions">
                                        <button className="action-btn message-btn">
                                            <span className="btn-icon">💬</span>
                                            <span className="btn-text">Message</span>
                                        </button>
                                        <button className="action-btn remove-btn">
                                            <span className="btn-icon">✖️</span>
                                            <span className="btn-text">Remove</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Requests Tab */}
                    <div className={`tab-content ${activeTab === 'requests' ? 'active' : ''}`}>
                        <div className="friends-list">
                            {friendsData.requests.map(request => (
                                <div key={request.id} className="friend-card">
                                    <div className="friend-avatar">{request.avatar}</div>
                                    <div className="friend-info">
                                        <h3 className="friend-name">{request.name}</h3>
                                        <p className="friend-username">{request.username}</p>
                                        <p className="friend-campus">{request.campus}</p>
                                        <p className="mutual-friends">
                                            {request.mutualFriends} mutual friends
                                        </p>
                                    </div>
                                    <div className="friend-actions">
                                        <button className="action-btn accept-btn">
                                            <span className="btn-icon">✓</span>
                                            <span className="btn-text">Accept</span>
                                        </button>
                                        <button className="action-btn decline-btn">
                                            <span className="btn-icon">✕</span>
                                            <span className="btn-text">Decline</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Suggestions Tab */}
                    <div className={`tab-content ${activeTab === 'suggestions' ? 'active' : ''}`}>
                        <div className="friends-list">
                            {friendsData.suggestions.map(suggestion => (
                                <div key={suggestion.id} className="friend-card">
                                    <div className="friend-avatar">{suggestion.avatar}</div>
                                    <div className="friend-info">
                                        <h3 className="friend-name">{suggestion.name}</h3>
                                        <p className="friend-username">{suggestion.username}</p>
                                        <p className="friend-campus">{suggestion.campus}</p>
                                        <p className="mutual-friends">
                                            {suggestion.mutualFriends} mutual friends
                                        </p>
                                    </div>
                                    <div className="friend-actions">
                                        <button className="action-btn add-btn">
                                            <span className="btn-icon">+</span>
                                            <span className="btn-text">Add Friend</span>
                                        </button>
                                        <button className="action-btn ignore-btn">
                                            <span className="btn-icon">✕</span>
                                            <span className="btn-text">Ignore</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {/* Search Friends Modal */}
            <div className={`modal-overlay ${showSearchModal ? 'show' : ''}`}>
                <div className="modal-content search-modal">
                    <div className="modal-header">
                        <h3 className="modal-title">Find Friends</h3>
                        <button className="modal-close" onClick={() => setShowSearchModal(false)}>×</button>
                    </div>
                    <div className="modal-body">
                        <div className="search-section">
                            <div className="search-input-wrapper">
                                <input 
                                    type="text" 
                                    className="search-input" 
                                    placeholder="Search by name, username, or campus..."
                                />
                                <button className="search-btn">
                                    <span className="search-icon">🔍</span>
                                </button>
                            </div>
                            <div className="search-filters">
                                <button className="filter-chip active">All</button>
                                <button className="filter-chip">Name</button>
                                <button className="filter-chip">Username</button>
                                <button className="filter-chip">Campus</button>
                            </div>
                        </div>
                        <div className="search-results">
                            {/* Search results will appear here */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Friends;