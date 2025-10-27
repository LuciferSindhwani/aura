import React, { useState } from 'react';
import '../styles/leaderboard.css';

const Leaderboard = () => {
    const [activeTab, setActiveTab] = useState('campus');
    const [timeRange, setTimeRange] = useState('weekly');

    // Sample data - replace with actual data later
    const leaderboardData = {
        campus: [
            { rank: 1, name: "Engineering", score: 2500, trend: "up" },
            { rank: 2, name: "Business", score: 2300, trend: "down" },
            { rank: 3, name: "Arts & Sciences", score: 2100, trend: "up" }
        ],
        individual: [
            { rank: 1, name: "Alex Johnson", score: 850, avatar: "🧑", trend: "up" },
            { rank: 2, name: "Sarah Lee", score: 820, avatar: "👩", trend: "same" },
            { rank: 3, name: "Mike Chen", score: 780, avatar: "👨", trend: "down" }
        ]
    };

    return (
        <div className="leaderboard-page">
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
                        <h1 className="page-title">Leaderboard</h1>
                    </div>
                    <div className="header-right">
                        <div className="header-actions">
                            <button className="action-btn">
                                <span className="action-icon">📊</span>
                                <span className="action-text">Stats</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="leaderboard-container">
                {/* Leaderboard Navigation */}
                <div className="leaderboard-nav">
                    <div className="nav-tabs">
                        <button 
                            className={`nav-tab ${activeTab === 'campus' ? 'active' : ''}`}
                            onClick={() => setActiveTab('campus')}
                        >
                            <span className="tab-icon">🏫</span>
                            <span className="tab-text">Campus</span>
                        </button>
                        <button 
                            className={`nav-tab ${activeTab === 'individual' ? 'active' : ''}`}
                            onClick={() => setActiveTab('individual')}
                        >
                            <span className="tab-icon">👤</span>
                            <span className="tab-text">Individual</span>
                        </button>
                    </div>
                    <div className="time-range-selector">
                        <button 
                            className={`time-btn ${timeRange === 'weekly' ? 'active' : ''}`}
                            onClick={() => setTimeRange('weekly')}
                        >
                            Weekly
                        </button>
                        <button 
                            className={`time-btn ${timeRange === 'monthly' ? 'active' : ''}`}
                            onClick={() => setTimeRange('monthly')}
                        >
                            Monthly
                        </button>
                        <button 
                            className={`time-btn ${timeRange === 'alltime' ? 'active' : ''}`}
                            onClick={() => setTimeRange('alltime')}
                        >
                            All Time
                        </button>
                    </div>
                </div>

                {/* Leaderboard Content */}
                <div className="leaderboard-content">
                    {/* Top 3 Podium */}
                    <div className="podium-section">
                        <div className="podium">
                            {/* Second Place */}
                            <div className="podium-place second-place">
                                <div className="podium-avatar">
                                    {activeTab === 'individual' ? leaderboardData.individual[1].avatar : '🏫'}
                                </div>
                                <div className="podium-info">
                                    <span className="podium-rank">2</span>
                                    <span className="podium-name">{activeTab === 'campus' ? leaderboardData.campus[1].name : leaderboardData.individual[1].name}</span>
                                    <span className="podium-score">{activeTab === 'campus' ? leaderboardData.campus[1].score : leaderboardData.individual[1].score}</span>
                                </div>
                                <div className="podium-platform second"></div>
                            </div>

                            {/* First Place */}
                            <div className="podium-place first-place">
                                <div className="podium-avatar">
                                    {activeTab === 'individual' ? leaderboardData.individual[0].avatar : '🏫'}
                                </div>
                                <div className="podium-info">
                                    <span className="podium-rank">1</span>
                                    <span className="podium-name">{activeTab === 'campus' ? leaderboardData.campus[0].name : leaderboardData.individual[0].name}</span>
                                    <span className="podium-score">{activeTab === 'campus' ? leaderboardData.campus[0].score : leaderboardData.individual[0].score}</span>
                                </div>
                                <div className="podium-platform first"></div>
                            </div>

                            {/* Third Place */}
                            <div className="podium-place third-place">
                                <div className="podium-avatar">
                                    {activeTab === 'individual' ? leaderboardData.individual[2].avatar : '🏫'}
                                </div>
                                <div className="podium-info">
                                    <span className="podium-rank">3</span>
                                    <span className="podium-name">{activeTab === 'campus' ? leaderboardData.campus[2].name : leaderboardData.individual[2].name}</span>
                                    <span className="podium-score">{activeTab === 'campus' ? leaderboardData.campus[2].score : leaderboardData.individual[2].score}</span>
                                </div>
                                <div className="podium-platform third"></div>
                            </div>
                        </div>
                    </div>

                    {/* Full Rankings */}
                    <div className="rankings-section">
                        <div className="rankings-header">
                            <h3 className="rankings-title">Complete Rankings</h3>
                            <div className="rankings-filters">
                                <button className="filter-btn active">All</button>
                                <button className="filter-btn">Top 10</button>
                                <button className="filter-btn">My Friends</button>
                            </div>
                        </div>
                        <div className="rankings-list">
                            {activeTab === 'campus' 
                                ? leaderboardData.campus.map((item, index) => (
                                    <div key={index} className="ranking-item">
                                        <div className="rank-number">{item.rank}</div>
                                        <div className="rank-icon">🏫</div>
                                        <div className="rank-info">
                                            <span className="rank-name">{item.name}</span>
                                            <span className="rank-score">{item.score} pts</span>
                                        </div>
                                        <div className={`rank-trend ${item.trend}`}>
                                            {item.trend === 'up' ? '↑' : item.trend === 'down' ? '↓' : '→'}
                                        </div>
                                    </div>
                                ))
                                : leaderboardData.individual.map((item, index) => (
                                    <div key={index} className="ranking-item">
                                        <div className="rank-number">{item.rank}</div>
                                        <div className="rank-avatar">{item.avatar}</div>
                                        <div className="rank-info">
                                            <span className="rank-name">{item.name}</span>
                                            <span className="rank-score">{item.score} pts</span>
                                        </div>
                                        <div className={`rank-trend ${item.trend}`}>
                                            {item.trend === 'up' ? '↑' : item.trend === 'down' ? '↓' : '→'}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    {/* Score Breakdown */}
                    <div className="score-section">
                        <div className="score-header">
                            <h3 className="score-title">Score Breakdown</h3>
                            <button className="details-btn">
                                <span className="details-icon">ℹ️</span>
                                <span className="details-text">How scores are calculated</span>
                            </button>
                        </div>
                        <div className="score-categories">
                            <div className="score-category">
                                <div className="category-icon">🎯</div>
                                <div className="category-info">
                                    <span className="category-name">Quest Completion</span>
                                    <span className="category-score">500 pts</span>
                                </div>
                                <div className="category-bar">
                                    <div className="progress-bar" style={{width: '75%'}}></div>
                                </div>
                            </div>
                            <div className="score-category">
                                <div className="category-icon">👥</div>
                                <div className="category-info">
                                    <span className="category-name">Social Engagement</span>
                                    <span className="category-score">350 pts</span>
                                </div>
                                <div className="category-bar">
                                    <div className="progress-bar" style={{width: '60%'}}></div>
                                </div>
                            </div>
                            <div className="score-category">
                                <div className="category-icon">📊</div>
                                <div className="category-info">
                                    <span className="category-name">Academic Performance</span>
                                    <span className="category-score">450 pts</span>
                                </div>
                                <div className="category-bar">
                                    <div className="progress-bar" style={{width: '85%'}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Leaderboard;