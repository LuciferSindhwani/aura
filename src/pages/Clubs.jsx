import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';
import '../styles/clubs.css';
import clubsData from '../data/clubs.json';

function Clubs() {
  const [activeTab, setActiveTab] = useState('all');
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const stats = {
    totalClubs: clubsData.length,
    myClubs: clubsData.filter(club => club.isMember).length,
    activeClubs: clubsData.filter(club => club.isActive).length
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <div>
      {/* Navigation Header */}
      <nav className="cosmic-header">
        <div className="header-container">
          <div className="header-left">
            <Link to="/feed" className="back-btn">
              <span className="back-icon">←</span>
              <span className="back-text">Back to Feed</span>
            </Link>
          </div>
          
          <div className="header-center">
            <h1 className="page-title">Campus Clubs</h1>
          </div>
          
          <div className="header-right">
            <div className="header-actions">
              <button 
                className="action-btn" 
                onClick={() => setSearchModalOpen(true)}
              >
                <span className="action-icon">🔍</span>
                <span className="action-text">Search</span>
              </button>
              <button 
                className="action-btn"
                onClick={() => setCreateModalOpen(true)}
              >
                <span className="action-icon">➕</span>
                <span className="action-text">Create Club</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="clubs-container">
        {/* Clubs Overview */}
        <section className="clubs-overview">
          <div className="overview-stats">
            {[
              { icon: '🎭', value: stats.totalClubs, label: 'Total Clubs' },
              { icon: '👥', value: stats.myClubs, label: 'My Clubs' },
              { icon: '🌟', value: stats.activeClubs, label: 'Active Now' }
            ].map((stat, index) => (
              <div className="stat-card" key={index}>
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-info">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Clubs Navigation */}
        <section className="clubs-nav">
          <div className="nav-tabs">
            {[
              { id: 'all', icon: '🎭', text: 'All Clubs', count: 42 },
              { id: 'my', icon: '👥', text: 'My Clubs', count: 8 },
              { id: 'trending', icon: '🔥', text: 'Trending', count: 12 },
              { id: 'categories', icon: '📂', text: 'Categories' }
            ].map(tab => (
              <button
                key={tab.id}
                className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => handleTabChange(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-text">{tab.text}</span>
                {tab.count && <span className="tab-count">{tab.count}</span>}
              </button>
            ))}
          </div>
        </section>

        {/* Clubs Content */}
        <section className="clubs-content">
          {/* All Clubs Tab */}
          {activeTab === 'all' && (
            <div className="tab-content active">
              <div className="clubs-section">
                <div className="section-header">
                  <h3 className="section-title">All Campus Clubs</h3>
                  <div className="section-actions">
                    {['all', 'tech', 'arts', 'sports', 'academic'].map(filter => (
                      <button
                        key={filter}
                        className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                        onClick={() => handleFilterChange(filter)}
                      >
                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="clubs-grid">
                  {clubsData
                    .filter(club => activeFilter === 'all' || club.category.toLowerCase() === activeFilter)
                    .map(club => (
                      <div key={club.id} className="club-card">
                        <div className="club-banner" style={{ backgroundImage: `url(${club.bannerImage})` }}>
                          <div className="club-category">{club.category}</div>
                        </div>
                        <div className="club-info">
                          <h4 className="club-name">{club.name}</h4>
                          <p className="club-description">{club.description}</p>
                          <div className="club-stats">
                            <span className="club-members">👥 {club.memberCount} members</span>
                            <span className="club-events">📅 {club.eventCount} events</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* Other tabs content will be conditionally rendered here */}
        </section>
      </main>

      {/* Search Modal */}
      {searchModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content search-modal">
            <div className="modal-header">
              <h3 className="modal-title">Search Clubs</h3>
              <button 
                className="modal-close"
                onClick={() => setSearchModalOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="search-input-wrapper">
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="Search clubs by name, category, or description..." 
                />
                <button className="search-btn">
                  <span className="search-icon">🔍</span>
                </button>
              </div>
              <div className="search-filters">
                {['all', 'name', 'category', 'description'].map(filter => (
                  <button
                    key={filter}
                    className={`filter-chip ${activeFilter === filter ? 'active' : ''}`}
                    onClick={() => handleFilterChange(filter)}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>
              <div className="search-results">
                {/* Search results will appear here */}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Club Modal */}
      {createModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content create-club-modal">
            <div className="modal-header">
              <h3 className="modal-title">Create New Club</h3>
              <button 
                className="modal-close"
                onClick={() => setCreateModalOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <form className="create-club-form">
                {/* Club creation form fields */}
                <div className="form-group">
                  <label htmlFor="clubName" className="form-label">Club Name</label>
                  <input 
                    type="text" 
                    id="clubName" 
                    name="name" 
                    className="cosmic-input" 
                    placeholder="Enter club name" 
                    required 
                  />
                </div>
                {/* Add more form fields here */}
                <div className="form-actions">
                  <button 
                    type="button" 
                    className="cosmic-btn secondary-btn"
                    onClick={() => setCreateModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="cosmic-btn primary-btn">
                    <span className="btn-text">Create Club</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Clubs;