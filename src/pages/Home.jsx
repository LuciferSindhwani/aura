import { Link } from 'react-router-dom';
import '../styles/main.css';
import '../styles/splash.css';

function Home() {
  return (
    <div className="cosmic-body">
      <div className="splash-container">
        <div className="logo-container">
          <div className="aura-logo">
            <h1 className="logo-text">AURA</h1>
            <div className="logo-subtitle">Cosmic Campus Social Media</div>
          </div>
        </div>

        <div className="tagline-container">
          <h2 className="main-tagline">Connect Across the Cosmos</h2>
          <p className="sub-tagline">Where students become stars in the digital universe</p>
        </div>

        <div className="cta-container">
          <Link to="/onboarding" className="get-started-btn cosmic-btn">
            <span className="btn-text">Get Started</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;