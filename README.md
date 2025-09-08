# 🌌 Aura - Cosmic Campus Social Media Platform

A fully-featured, multi-page social media website for college students built with HTML, CSS, and vanilla JavaScript. Experience the cosmos through stunning cosmic themes, animated transitions, and interactive elements.

## ✨ Features

### 🚀 Core Pages
- **Splash Screen** (`index.html`) - Animated cosmic intro with floating elements
- **Campus Selection** (`onboarding-campus.html`) - Choose from top Indian universities
- **Student Details** (`onboarding-details.html`) - Complete profile with glowing inputs
- **Login** (`login.html`) - Cosmic authentication with avatar preview

### 🎨 Design Features
- **Cosmic Theme** - Deep blues, purples, gradients, and starfield backgrounds
- **Animated Elements** - Floating orbs, cosmic particles, glowing effects
- **Responsive Design** - Mobile-first approach with cosmic aesthetics
- **Interactive UI** - Hover effects, click animations, and smooth transitions

### 🔧 Technical Features
- **Pure Frontend** - No frameworks, just HTML, CSS, and JavaScript
- **Local Storage** - Data persistence across pages
- **Form Validation** - Real-time validation with cosmic feedback
- **Performance Optimized** - Efficient animations and responsive design

## 🏗️ Project Structure

```
aura html/
├── index.html                 # Splash screen
├── onboarding-campus.html     # Campus selection
├── onboarding-details.html    # Student profile form
├── login.html                 # Login page
├── css/
│   ├── main.css              # Global styles and variables
│   ├── splash.css            # Splash screen styles
│   ├── onboarding.css        # Onboarding styles
│   ├── details.css           # Form styles
│   ├── login.css             # Login styles
│   └── animations.css        # Animation utilities
├── js/
│   ├── splash.js             # Splash screen logic
│   ├── onboarding.js         # Campus selection logic
│   ├── details.js            # Form handling
│   ├── login.js              # Login functionality
│   └── animations.js         # Animation utilities
└── README.md                 # This file
```

## 🎯 Campus Options

The platform includes these prestigious institutions:
- **Chitkara University** - Tech Hub & Innovation
- **Thapar University** - Engineering & Research
- **IIT Delhi** - Premier Excellence
- **IIT Bombay** - Innovation & Leadership
- **BITS Pilani** - Technology & Excellence

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)

### Installation
1. Clone or download the project
2. Open `index.html` in your browser
3. Start your cosmic journey!

### Development
1. Navigate to the project directory
2. Open files in your preferred code editor
3. Make changes and refresh the browser
4. Use a local server for better development experience

## 🎨 Customization

### Colors
Modify CSS variables in `css/main.css`:
```css
:root {
    --cosmic-primary: #6366f1;
    --cosmic-secondary: #8b5cf6;
    --cosmic-accent: #06b6d4;
    /* ... more variables */
}
```

### Animations
Adjust animation parameters in `css/animations.css`:
```css
@keyframes fade-in-up {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}
```

### Content
Update campus data in `js/onboarding.js`:
```javascript
const campuses = [
    {
        id: 'your-campus',
        name: 'Your University',
        location: 'City, Country',
        // ... more properties
    }
];
```

## 📱 Responsive Design

The platform is fully responsive with breakpoints:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

## 🔧 Browser Support

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

## 🎭 Animation Features

### Entrance Animations
- Fade in/up/down/left/right
- Scale in with bounce effects
- Slide in from various directions
- Staggered animations for lists

### Interactive Effects
- Hover lift and glow effects
- Click ripple animations
- Floating elements
- Cosmic particle systems

### Performance
- Hardware acceleration support
- Reduced motion preferences
- Optimized for low-end devices

## 🚧 Future Enhancements

### Planned Features
- [ ] Feed page with cosmic posts
- [ ] Profile management
- [ ] Club and event systems
- [ ] Leaderboard and quests
- [ ] Real-time chat
- [ ] Mobile app version

### Technical Improvements
- [ ] Service Worker for offline support
- [ ] Progressive Web App features
- [ ] Advanced animations
- [ ] Sound effects
- [ ] 3D cosmic elements

## 🤝 Contributing

1. Fork the project
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Cosmic theme inspiration from space exploration
- UI components inspired by modern design systems
- Animation techniques from web development best practices
- Campus data from Indian educational institutions

## 📞 Support

For questions, issues, or contributions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Ready to explore the cosmos? Launch Aura and begin your cosmic campus journey! 🚀✨**
