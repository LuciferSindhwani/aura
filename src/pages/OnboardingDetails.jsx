import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/onboarding.css';

function OnboardingDetails() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    rollNumber: '',
    email: '',
    phone: '',
    branch: '',
    year: '',
    section: '',
    bio: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to save the data
    navigate('/login');
  };

  const branchOptions = [
    'Computer Science',
    'Information Technology',
    'Electronics',
    'Mechanical',
    'Civil',
    'Electrical'
  ];

  const yearOptions = ['1st', '2nd', '3rd', '4th'];
  const sectionOptions = ['A', 'B', 'C', 'D'];

  return (
    <div className="onboarding-container">
      <header className="header">
        <h1>Complete Your Profile</h1>
      </header>

      <div className="progress-dots">
        <div className="dot"></div>
        <div className="dot active"></div>
        <div className="dot"></div>
      </div>

      <div className="campus-selection">
        <h2 className="section-title">Tell Us About You</h2>
        <p className="campus-subtitle">This helps us personalize your experience</p>

        <form className="details-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="rollNumber"
              placeholder="Roll Number"
              value={formData.rollNumber}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="College Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <select
              name="branch"
              value={formData.branch}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Branch</option>
              {branchOptions.map(branch => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group half">
              <select
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                required
              >
                <option value="">Year</option>
                {yearOptions.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <div className="form-group half">
              <select
                name="section"
                value={formData.section}
                onChange={handleInputChange}
                required
              >
                <option value="">Section</option>
                {sectionOptions.map(section => (
                  <option key={section} value={section}>{section}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <textarea
              name="bio"
              placeholder="Write a short bio..."
              value={formData.bio}
              onChange={handleInputChange}
              rows="3"
            />
          </div>
        </form>
      </div>

      <div className="navigation-buttons">
        <button className="nav-btn back-btn" onClick={() => navigate(-1)}>
          Back
        </button>
        <button
          className="nav-btn next-btn"
          onClick={handleSubmit}
          disabled={!formData.fullName || !formData.email}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default OnboardingDetails;