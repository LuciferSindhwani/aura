import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';
import '../styles/feed.css';
import postsData from '../data/posts.json';
import usersData from '../data/users.json';
import promoted1 from '../assets/promotions/promoted1.svg';
import promoted2 from '../assets/promotions/promoted2.svg';

const NAV_ITEMS = [
  { path: '/feed', icon: '🏠', text: 'Home' },
  { path: '/profile', icon: '👤', text: 'Profile' },
  { path: '/friends', icon: '👥', text: 'Friends' },
  { path: '/clubs', icon: '🎭', text: 'Clubs' },
  { path: '/events', icon: '📅', text: 'Events' },
  { path: '/leaderboard', icon: '🏆', text: 'Leaderboard' },
  { path: '/quests', icon: '⭐', text: 'Quests' }
];

function Feed() {
  const [postInput, setPostInput] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const handlePostSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement post submission
    setPostInput('');
  };

  // Build feed items (posts + occasional ads)
  const feedItems = [];
  postsData.forEach((post, idx) => {
    const author = usersData.find(user => user.id === post.authorId);
    if (!author) return;

    feedItems.push(
      <div key={post.id} className="post-card">
        <div className="post-header">
          <div className="post-author">
            <div className="author-avatar">{author.avatar}</div>
            <div className="author-info">
              <div className="author-name">{author.name}</div>
              <div className="post-meta">{new Date(post.createdAt).toLocaleDateString()}</div>
            </div>
          </div>
          <button className="post-menu-btn">⋮</button>
        </div>
        <div className="post-content">
          <p className="post-text">{post.content}</p>
        </div>
        <div className="post-actions">
          <button className="post-action-btn"><span className="action-icon">❤️</span><span className="action-count">{post.likes}</span></button>
          <button className="post-action-btn"><span className="action-icon">💬</span><span className="action-count">{post.comments}</span></button>
        </div>
      </div>
    );

    // Insert an ad after the 3rd and 7th posts
    if (idx === 2) {
      feedItems.push(
        <div key={`promoted-1`} className="ad-card" style={{ margin: '1rem 0' }}>
          <img src={promoted1} alt="Promoted" style={{ width: '100%', height: 'auto', borderRadius: 12 }} />
        </div>
      );
    }
    if (idx === 6) {
      feedItems.push(
        <div key={`promoted-2`} className="ad-card" style={{ margin: '1rem 0' }}>
          <img src={promoted2} alt="Promoted" style={{ width: '100%', height: 'auto', borderRadius: 12 }} />
        </div>
      );
    }
  });

  return (
    <div>
      {/* Navigation Header */}
      <nav className="cosmic-header">
        <div className="header-container">
          <div className="header-left">
            <Link to="/" className="logo-link">
              <span className="logo-text">AURA</span>
            </Link>
          </div>
          
          <div className="header-center">
            <div className="search-container">
              <div className="search-input-wrapper">
                <input type="text" className="search-input" placeholder="Search posts, people, clubs..." />
                <button className="search-btn">
                  <span className="search-icon">🔍</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="header-right">
            <div className="header-actions">
              <button className="action-btn">
                <span className="action-icon">🔔</span>
              </button>
              <button className="action-btn">
                <span className="action-icon">💬</span>
              </button>
              <div className="user-menu">
                <button className="user-avatar">
                  <div className="avatar-placeholder">
                    <span className="avatar-initials">LM</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
  <main className="feed-container" style={{ maxWidth: 'none', width: '100%', margin: 0, paddingRight: 0 }}>
        {/* Left Sidebar */}
        <aside className="feed-sidebar left-sidebar">
          <div className="sidebar-section">
            <h3 className="sidebar-title">Navigation</h3>
            <nav className="sidebar-nav">
              {NAV_ITEMS.map(item => (
                <Link 
                  key={item.path} 
                  to={item.path} 
                  className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-text">{item.text}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Quick Actions Section */}
          <div className="sidebar-section">
            <h3 className="sidebar-title">Quick Actions</h3>
            <div className="quick-actions">
              <button className="quick-action-btn">
                <span className="action-icon">✏️</span>
                <span className="action-text">Create Post</span>
              </button>
              <button className="quick-action-btn">
                <span className="action-icon">🎭</span>
                <span className="action-text">Join Club</span>
              </button>
              <button className="quick-action-btn">
                <span className="action-icon">🚀</span>
                <span className="action-text">Start Quest</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Feed */}
        <section className="feed-main">
          {/* Stories Section */}
          <div className="stories-section">
            {usersData.slice(0, 6).map(user => (
              <div key={user.id} className="story-item">
                <div className="story-avatar">
                  <div className="story-avatar-inner">
                    {user.avatar}
                  </div>
                </div>
                <span className="story-username">{user.username}</span>
              </div>
            ))}
          </div>

          {/* Posts Feed */}
          <div className="posts-feed">
            {feedItems}
          </div>
        </section>

        {/* Right Sidebar */}
        <aside className="feed-sidebar right-sidebar">
          {/* User Stats Section */}
          <div className="sidebar-section">
            <h3 className="sidebar-title">Your Stats</h3>
            <div className="user-stats">
              <div className="stat-item">
                <div className="stat-value">42</div>
                <div className="stat-label">Posts</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">156</div>
                <div className="stat-label">Friends</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">2.4k</div>
                <div className="stat-label">Likes</div>
              </div>
            </div>
          </div>

          {/* Active Users Section */}
          <div className="sidebar-section">
            <h3 className="sidebar-title">Active Now</h3>
            <div className="active-users">
              {usersData
                .filter(user => user.isOnline)
                .slice(0, 5)
                .map(user => (
                  <div key={user.id} className="active-user">
                    <div className="user-avatar">
                      <span className="avatar-initials">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                      <span className="online-indicator"></span>
                    </div>
                    <div className="user-info">
                      <div className="user-name">{user.name}</div>
                      <div className="user-status">{user.status}</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default Feed;