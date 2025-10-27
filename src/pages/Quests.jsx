import React, { useState } from 'react';
import '../styles/quests.css';

const Quests = () => {
    const [activeTab, setActiveTab] = useState('available');

    // Sample data - replace with actual data later
    const questsData = {
        available: [
            {
                id: 1,
                title: "Campus Explorer",
                description: "Visit 5 different buildings on campus",
                reward: 100,
                progress: 3,
                total: 5,
                type: "exploration",
                deadline: "2 days"
            },
            {
                id: 2,
                title: "Social Butterfly",
                description: "Make 3 new friends this week",
                reward: 150,
                progress: 1,
                total: 3,
                type: "social",
                deadline: "5 days"
            }
        ],
        active: [
            {
                id: 3,
                title: "Event Enthusiast",
                description: "Attend 2 campus events",
                reward: 200,
                progress: 1,
                total: 2,
                type: "events",
                deadline: "3 days"
            }
        ],
        completed: [
            {
                id: 4,
                title: "Club Pioneer",
                description: "Join a campus club",
                reward: 100,
                type: "social",
                completedDate: "2 days ago"
            }
        ]
    };

    return (
        <div className="quests-page">
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
                        <h1 className="page-title">Cosmic Quests</h1>
                    </div>
                    <div className="header-right">
                        <div className="header-actions">
                            <button className="action-btn">
                                <span className="action-icon">🏆</span>
                                <span className="action-text">Rewards</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="quests-container">
                {/* Quest Stats */}
                <section className="quest-stats">
                    <div className="stats-card">
                        <div className="stats-icon">🎯</div>
                        <div className="stats-info">
                            <div className="stats-value">{questsData.available.length}</div>
                            <div className="stats-label">Available</div>
                        </div>
                    </div>
                    <div className="stats-card">
                        <div className="stats-icon">⚡</div>
                        <div className="stats-info">
                            <div className="stats-value">{questsData.active.length}</div>
                            <div className="stats-label">Active</div>
                        </div>
                    </div>
                    <div className="stats-card">
                        <div className="stats-icon">✨</div>
                        <div className="stats-info">
                            <div className="stats-value">{questsData.completed.length}</div>
                            <div className="stats-label">Completed</div>
                        </div>
                    </div>
                </section>

                {/* Quest Navigation */}
                <section className="quest-nav">
                    <div className="nav-tabs">
                        <button 
                            className={`nav-tab ${activeTab === 'available' ? 'active' : ''}`}
                            onClick={() => setActiveTab('available')}
                        >
                            <span className="tab-icon">🎯</span>
                            <span className="tab-text">Available</span>
                            <span className="tab-count">{questsData.available.length}</span>
                        </button>
                        <button 
                            className={`nav-tab ${activeTab === 'active' ? 'active' : ''}`}
                            onClick={() => setActiveTab('active')}
                        >
                            <span className="tab-icon">⚡</span>
                            <span className="tab-text">Active</span>
                            <span className="tab-count">{questsData.active.length}</span>
                        </button>
                        <button 
                            className={`nav-tab ${activeTab === 'completed' ? 'active' : ''}`}
                            onClick={() => setActiveTab('completed')}
                        >
                            <span className="tab-icon">✨</span>
                            <span className="tab-text">Completed</span>
                            <span className="tab-count">{questsData.completed.length}</span>
                        </button>
                    </div>
                </section>

                {/* Quest Content */}
                <section className="quest-content">
                    {/* Available Quests Tab */}
                    <div className={`tab-content ${activeTab === 'available' ? 'active' : ''}`}>
                        <div className="quests-grid">
                            {questsData.available.map(quest => (
                                <div key={quest.id} className="quest-card">
                                    <div className="quest-header">
                                        <div className="quest-type-icon">
                                            {quest.type === 'exploration' ? '🗺️' :
                                             quest.type === 'social' ? '👥' :
                                             quest.type === 'events' ? '🎉' : '🎯'}
                                        </div>
                                        <div className="quest-reward">
                                            <span className="reward-icon">⭐</span>
                                            <span className="reward-value">{quest.reward}</span>
                                        </div>
                                    </div>
                                    <div className="quest-body">
                                        <h3 className="quest-title">{quest.title}</h3>
                                        <p className="quest-description">{quest.description}</p>
                                        <div className="quest-progress">
                                            <div className="progress-bar">
                                                <div 
                                                    className="progress-fill"
                                                    style={{width: `${(quest.progress / quest.total) * 100}%`}}
                                                ></div>
                                            </div>
                                            <span className="progress-text">
                                                {quest.progress} / {quest.total}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="quest-footer">
                                        <span className="deadline">
                                            <span className="deadline-icon">⏰</span>
                                            {quest.deadline} left
                                        </span>
                                        <button className="start-quest-btn">
                                            Start Quest
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Active Quests Tab */}
                    <div className={`tab-content ${activeTab === 'active' ? 'active' : ''}`}>
                        <div className="quests-grid">
                            {questsData.active.map(quest => (
                                <div key={quest.id} className="quest-card active">
                                    <div className="quest-header">
                                        <div className="quest-type-icon">
                                            {quest.type === 'exploration' ? '🗺️' :
                                             quest.type === 'social' ? '👥' :
                                             quest.type === 'events' ? '🎉' : '🎯'}
                                        </div>
                                        <div className="quest-reward">
                                            <span className="reward-icon">⭐</span>
                                            <span className="reward-value">{quest.reward}</span>
                                        </div>
                                    </div>
                                    <div className="quest-body">
                                        <h3 className="quest-title">{quest.title}</h3>
                                        <p className="quest-description">{quest.description}</p>
                                        <div className="quest-progress">
                                            <div className="progress-bar">
                                                <div 
                                                    className="progress-fill"
                                                    style={{width: `${(quest.progress / quest.total) * 100}%`}}
                                                ></div>
                                            </div>
                                            <span className="progress-text">
                                                {quest.progress} / {quest.total}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="quest-footer">
                                        <span className="deadline">
                                            <span className="deadline-icon">⏰</span>
                                            {quest.deadline} left
                                        </span>
                                        <button className="abandon-quest-btn">
                                            Abandon Quest
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Completed Quests Tab */}
                    <div className={`tab-content ${activeTab === 'completed' ? 'active' : ''}`}>
                        <div className="quests-grid">
                            {questsData.completed.map(quest => (
                                <div key={quest.id} className="quest-card completed">
                                    <div className="quest-header">
                                        <div className="quest-type-icon">
                                            {quest.type === 'exploration' ? '🗺️' :
                                             quest.type === 'social' ? '👥' :
                                             quest.type === 'events' ? '🎉' : '🎯'}
                                        </div>
                                        <div className="quest-reward collected">
                                            <span className="reward-icon">⭐</span>
                                            <span className="reward-value">{quest.reward}</span>
                                        </div>
                                    </div>
                                    <div className="quest-body">
                                        <h3 className="quest-title">{quest.title}</h3>
                                        <p className="quest-description">{quest.description}</p>
                                    </div>
                                    <div className="quest-footer">
                                        <span className="completion-date">
                                            <span className="completion-icon">✨</span>
                                            Completed {quest.completedDate}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Quests;