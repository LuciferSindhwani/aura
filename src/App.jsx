import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import OnboardingDetails from './pages/OnboardingDetails';
import OnboardingCampus from './pages/OnboardingCampus';
import Login from './pages/Login';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import Clubs from './pages/Clubs';
import Events from './pages/Events';
import Friends from './pages/Friends';
import Leaderboard from './pages/Leaderboard';
import Quests from './pages/Quests';
import './styles/main.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
  <Route path="/onboarding" element={<OnboardingCampus />} />
  <Route path="/onboarding/details" element={<OnboardingDetails />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/clubs" element={<Clubs />} />
  <Route path="/events" element={<Events />} />
  <Route path="/friends" element={<Friends />} />
  <Route path="/leaderboard" element={<Leaderboard />} />
  <Route path="/quests" element={<Quests />} />
  <Route path="/login" element={<Login />} />
  <Route path="/feed" element={<Feed />} />
      </Routes>
    </Router>
  )
}

export default App
