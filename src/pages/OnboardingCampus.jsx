import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/onboarding.css';

function OnboardingCampus() {
  const navigate = useNavigate();
  const [selectedCampus, setSelectedCampus] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const campuses = [
    {
      id: 'chitkara',
      name: 'Chitkara University',
      description: 'Top-ranked university in Punjab with 100+ clubs and active research community',
      icon: 'CU'
    },
    {
      id: 'thapar',
      name: 'Thapar Institute',
      description: 'Leading engineering institute with innovation hub and world-class facilities',
      icon: 'TU'
    },
    {
      id: 'pec',
      name: 'Punjab Engineering College',
      description: 'Historic institute known for engineering excellence and innovation',
      icon: 'PE'
    }
  ];

  const filteredCampuses = campuses.filter(campus =>
    campus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campus.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="onboarding-container">
      <header className="header">
        <h1>Choose Your Campus</h1>
      </header>

      <div className="progress-dots">
        <div className="dot active"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>

      <div className="campus-selection">
        <h2 className="section-title">Find Your Community</h2>
        <p className="campus-subtitle">Choose your university to connect with your campus community</p>

        <div className="search-bar">
          <svg aria-label="Search" color="rgb(168,168,168)" fill="rgb(168,168,168)" height="16" role="img" viewBox="0 0 24 24" width="16">
            <path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="16.511" x2="22" y1="16.511" y2="22"></line>
          </svg>
          <input
            type="text"
            placeholder="Search universities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="campus-grid">
          {filteredCampuses.map(campus => (
            <div
              key={campus.id}
              className={`campus-card ${selectedCampus?.id === campus.id ? 'selected' : ''}`}
              onClick={() => setSelectedCampus(campus)}
            >
              <div className="campus-icon">
                {campus.icon}
              </div>
              <div className="campus-details">
                <h3 className="campus-name">{campus.name}</h3>
                <p className="campus-description">{campus.description}</p>
              </div>
              {selectedCampus?.id === campus.id && (
                <svg aria-label="Selected" color="rgb(0, 149, 246)" fill="rgb(0, 149, 246)" height="24" role="img" viewBox="0 0 24 24" width="24">
                  <path d="M12.001.504a11.5 11.5 0 1 0 11.5 11.5 11.513 11.513 0 0 0-11.5-11.5Zm5.706 9.21-6.5 6.495a1 1 0 0 1-1.414-.001l-3.5-3.503a1 1 0 1 1 1.414-1.414l2.794 2.796L16.293 8.3a1 1 0 0 1 1.414 1.415Z"></path>
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="navigation-buttons">
        <button className="nav-btn back-btn" onClick={() => navigate('/login')}>
          Back
        </button>
        <button
          className="nav-btn next-btn"
          onClick={() => selectedCampus && navigate('/onboarding/details')}
          disabled={!selectedCampus}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default OnboardingCampus;