import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/main.css';
import '../styles/auth.css';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      // TODO: Implement actual login logic
      // For now, simulate successful login and redirect to feed
      navigate('/feed');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="cosmic-body auth-page">
      <div className="auth-container">
        <div className="auth-box">
          <div className="auth-header">
            <h1 className="logo-text">AURA</h1>
            <p className="auth-subtitle">Welcome back, cosmic explorer!</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                <span className="label-icon">📧</span>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input cosmic-input"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <div className="input-glow"></div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                <span className="label-icon">🔒</span>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-input cosmic-input"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <div className="input-glow"></div>
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" className="forgot-password">Forgot Password?</a>
            </div>

            <button type="submit" className="auth-button cosmic-btn">
              <span className="btn-text">Login</span>
            </button>
          </form>

          <div className="auth-footer">
            <p>Don't have an account? <a href="/" className="auth-link">Sign up</a></p>
          </div>
        </div>

        <div className="cosmic-decoration">
          <div className="stars"></div>
          <div className="nebula"></div>
          <div className="cosmic-particles"></div>
        </div>
      </div>
    </div>
  );
}

export default Login;