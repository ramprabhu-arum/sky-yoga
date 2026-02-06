# Sky Yoga - Prototype Collection

A collection of stunning, fully-functional web prototypes for SKY Yoga meditation centers, showcasing different design aesthetics while maintaining consistent functionality.

![Sky Yoga Prototypes](https://img.shields.io/badge/Prototypes-4-blue) ![React](https://img.shields.io/badge/React-18-61dafb) ![Vite](https://img.shields.io/badge/Vite-5-646cff)

## 🎨 Live Prototypes

This project contains **4 unique design implementations**, each with the same core functionality but distinct visual identities:

### 1. **V3 - Warm & Inviting**
- **Aesthetic**: Warm earth tones, organic shapes, soft shadows
- **Colors**: Beige (#FAF7F0), Terracotta (#C4956A), Warm Browns
- **Typography**: Cormorant Garamond + Inter
- **Best For**: Traditional, welcoming feel

### 2. **Zen - Dark & Minimalist**
- **Aesthetic**: Dark mode, high contrast, minimal UI
- **Colors**: Dark Gray (#121212), Gold Accents (#D4AF37)
- **Typography**: Playfair Display + Inter
- **Best For**: Modern, sophisticated audiences

### 3. **Serene - Nature-Inspired**
- **Aesthetic**: Light, airy, organic with nature motifs
- **Colors**: Soft Greens (#748C70), Cream (#FAF9F6)
- **Typography**: Cormorant Garamond + Inter
- **Best For**: Wellness, natural healing focus

### 4. **Editorial - Bold & Premium** ⭐
- **Aesthetic**: Magazine-style, asymmetric grids, dramatic typography
- **Colors**: High contrast (#E63946, #2A9D8F, #F4A261, #457B9D)
- **Typography**: Playfair Display (900) + Inter
- **Best For**: Premium, design-forward presentation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/ramprabhu-arum/sky-yoga.git
cd sky-yoga

# Navigate to web prototypes
cd web-prototypes

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to view the prototype launcher.

## 📂 Project Structure

```
sky-yoga/
├── Documentation/              # Project documentation
│   ├── functional_v3_requirements.md
│   ├── prototype_blueprint.md
│   ├── implementation_plan.md
│   ├── walkthrough.md
│   └── task.md
├── web-prototypes/            # Main application
│   ├── src/
│   │   ├── designs/
│   │   │   ├── sky-yoga-v3/
│   │   │   ├── sky-yoga-zen/
│   │   │   ├── sky-yoga-serene/
│   │   │   └── sky-yoga-editorial/
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
└── Prototypes/                # Legacy standalone files
```

## 🎯 Core Features

All prototypes share the same comprehensive functionality:

### Navigation System
- **Home** - Hero section with practice overview
- **Explore Courses** - Browse by practice type (Meditation, Exercise, Kayakalpa, Introspection)
- **Find a Center** - Search and filter by location
- **Registration** - Multi-step signup flow

### Practice Types
1. **🪷 SKY Meditation** - Progressive meditation levels
2. **🌿 Physical Exercise** - 9 exercises for body harmony
3. **☀️ Kayakalpa Yoga** - Ancient rejuvenation practice
4. **🕊️ Introspection** - Character building through self-inquiry

### Smart Search & Filtering
- **By Practice Type**: View all sessions for a specific practice
- **By Location**: City, state, or center name search
- **By Center**: See all practices offered at a location
- **Cross-Linking**: Navigate seamlessly between centers and practices

### Session Management
- Real-time capacity tracking with visual indicators
- Session metadata (day, time, duration, instructor, level)
- Mode indicators (in-person vs online)
- Registration with form validation

## 📖 Documentation

Comprehensive documentation is available in the `/Documentation` folder:

- **[Functional Requirements](Documentation/functional_v3_requirements.md)** - Complete feature specification
- **[Prototype Blueprint](Documentation/prototype_blueprint.md)** - Template for creating new design variants
- **[Implementation Plan](Documentation/implementation_plan.md)** - Technical architecture and approach
- **[Walkthrough](Documentation/walkthrough.md)** - Development journey and decisions

## 🛠️ Technology Stack

- **Framework**: React 18
- **Build Tool**: Vite 5
- **Routing**: React Router DOM 6
- **Styling**: Inline styles with Google Fonts
- **State Management**: React Hooks (useState, useEffect)

## 🎨 Design Philosophy

Each prototype demonstrates how the same functional requirements can be expressed through radically different visual languages:

- **V3**: Comfort and tradition
- **Zen**: Sophistication and focus
- **Serene**: Nature and tranquility
- **Editorial**: Bold and premium

This approach allows stakeholders to choose the aesthetic that best matches their brand while maintaining feature parity.

## 📱 Responsive Design

All prototypes are fully responsive with:
- Fluid typography using `clamp()`
- CSS Grid for adaptive layouts
- Mobile-first breakpoints
- Touch-friendly interactions

## 🔧 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Adding a New Prototype

1. Create a new folder in `src/designs/your-prototype-name/`
2. Implement `index.jsx` following the blueprint
3. Add lazy import in `App.jsx`
4. Add route in `App.jsx`
5. Add card to landing page

See [Prototype Blueprint](Documentation/prototype_blueprint.md) for detailed guidance.

## 🚀 Deployment

### Deploy to Render

This project includes a `render.yaml` configuration for easy deployment to [Render](https://render.com):

1. **Push to GitHub** (already done!)
2. **Connect to Render**:
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Blueprint"
   - Connect your GitHub repository: `ramprabhu-arum/sky-yoga`
   - Render will automatically detect `render.yaml`
   - Click "Apply" to deploy

3. **Your app will be live** at: `https://sky-yoga-prototypes.onrender.com`

The deployment configuration:
- **Runtime**: Node.js 18
- **Build**: Installs dependencies and builds production bundle
- **Start**: Serves the built app on Render's assigned port
- **Plan**: Free tier (perfect for prototypes)

### Manual Deployment

For other platforms (Vercel, Netlify, etc.):

```bash
cd web-prototypes
npm run build
# Deploy the 'dist' folder
```

## 📊 Data Model

All prototypes use the same data structure:

- **LOCATIONS** - Cities and regions (18 locations)
- **CENTERS** - Physical/virtual centers (10 centers)
- **SESSIONS** - Scheduled classes (13+ sessions)
- **PRACTICES** - Course types (4 practices)

## 🌟 Key Highlights

- ✅ **Blueprint-Driven Development** - Reusable template for rapid prototyping
- ✅ **Full Feature Parity** - All prototypes have identical functionality
- ✅ **Production-Ready Code** - Clean, maintainable, well-documented
- ✅ **No External Dependencies** - Pure React, no UI libraries
- ✅ **Accessibility Considered** - Semantic HTML, keyboard navigation
- ✅ **Performance Optimized** - Lazy loading, efficient re-renders

## 🤝 Contributing

This is a prototype collection for demonstration purposes. For production use:

1. Replace mock data with real API integration
2. Add authentication and user management
3. Implement backend for session registration
4. Add analytics and tracking
5. Enhance accessibility (ARIA labels, screen reader support)
6. Add comprehensive testing

## 📄 License

This project is for educational and demonstration purposes.

## 👤 Author

**Ram Prabhu**
- GitHub: [@ramprabhu-arum](https://github.com/ramprabhu-arum)

## 🙏 Acknowledgments

- SKY Yoga for inspiration
- Google Fonts for typography
- React and Vite communities

---

**Built with ❤️ using React + Vite**
