# Sky Yoga Prototype Blueprint

Use this blueprint to generate fully functional Sky Yoga prototypes with unique visual designs while preserving core functionality.

---

## Core Functionality Requirements

### 1. Data Model (Required)
All prototypes must include these data structures:

```javascript
LOCATIONS = [18 locations across US/Canada + Virtual]
CENTERS = [20 physical centers + 1 virtual studio]
SESSIONS = [34+ sessions with properties: title, type, mode, day, time, duration, instructor, level, capacity]
PRACTICES = [4 core practices: meditation, exercise, kayakalpa, introspection]
```

### 2. Navigation System
**Primary Menu** (always accessible):
- Home → Hero/Landing section
- About → Heritage/Mission section  
- Services → Practices overview
- **Courses** → Opens Explore Courses view
- **Centers** → Opens Find a Center view
- Stories → Testimonials section
- Register → CTA to Find a Center

### 3. "Explore Courses" Feature
**Purpose**: Browse by WHAT you want to learn.

**Flow**:
1. **Practice Selection Grid**: Display all 4 practices with icon, title, tagline, description, and session/center counts
2. **Practice Detail View**: 
   - Show practice benefits
   - List all centers offering this practice
   - Display sessions grouped by center
   - Include search: "Search by city, state, or center name..."
   - **Cross-link**: Each center has "View all sessions at this center →" button
     - Action: Switch to Find a Center view, pre-selected to that center

**Session Display**:
- Show: Title, Practice type badge, Mode (in-person/online), Day, Time, Duration, Instructor, Level
- Capacity bar with "X spots left" indicator
- "Sign Up" button → Opens Registration Modal

### 4. "Find a Center" Feature  
**Purpose**: Browse by WHERE you are located.

**Flow**:
1. **Center Discovery**:
   - Search bar: "Search by city, state, or country..."
   - Quick filters: Texas, California, Ontario, Online
   - Grid of center cards showing: Name, Location, Description, Practice icons, Session count
2. **Center Detail View**:
   - Full contact info (Address, Phone)
   - Practice quick-links with icons
     - **Cross-link**: Click practice icon → Switch to Explore Courses view, pre-selected to that practice
   - All sessions grouped by practice type
   - Each practice group has "View at all centers →" button
     - Action: Switch to Explore Courses view for that practice

### 5. Registration Modal
**Two-step flow**:
- **Step 1**: Form with Name (required), Email (required), Phone (optional), Experience level (select), Notes (textarea)
- **Step 2**: Confirmation screen with "Namaste" message, booking summary, email confirmation notice

### 6. Technical Requirements
- **Scroll locking**: Background freezes when overlays open
- **Breadcrumbs**: "← Back" navigation in all overlay views
- **Hover feedback**: Visual elevation/highlighting on interactive cards
- **Responsive**: Mobile-friendly layouts

---

## Design Freedom Areas

You have complete creative freedom in these aspects:

### Visual Aesthetics
- Color palette (warm/cool, light/dark, vibrant/muted)
- Typography choices (serif/sans-serif, display fonts)
- Spacing and density (compact/airy, tight/generous)
- Border styles (sharp/rounded, visible/subtle)

### Layout Paradigms
- **Navigation**: Top bar, sidebar, floating island, bottom dock, hamburger menu
- **Practice Grid**: Cards, masonry, carousel, list, split-screen
- **Center Discovery**: Map view, list, grid, timeline, regional grouping
- **Session Display**: Table, cards, timeline, calendar view, kanban

### Interaction Models
- **Overlays**: Full-screen, modal, slide-in panel, accordion expansion
- **Transitions**: Fade, slide, scale, morph, parallax
- **Animations**: Micro-interactions, loading states, scroll reveals

### Theme Concepts (Examples)
- **Minimalist Zen**: High contrast, negative space, monochrome + accent
- **Nature Organic**: Soft greens, rounded corners, flowing shapes, parallax
- **Editorial Magazine**: Bold typography, asymmetric grids, high-density
- **Glassmorphism**: Frosted layers, depth, translucency, blur effects
- **Brutalist**: Raw, geometric, high-contrast, unconventional layouts

---

## Implementation Checklist

When generating a prototype, ensure:

- [ ] All 4 data models are populated (LOCATIONS, CENTERS, SESSIONS, PRACTICES)
- [ ] Primary navigation includes all 7 menu items
- [ ] "Explore Courses" has practice grid → detail → search → cross-link to centers
- [ ] "Find a Center" has search/filters → center grid → detail → cross-link to practices
- [ ] Registration modal has 2-step form with required fields
- [ ] Session rows display all metadata and capacity indicators
- [ ] Cross-linking works bidirectionally (Courses ↔ Centers)
- [ ] Scroll locking and breadcrumbs function correctly
- [ ] Hover states provide visual feedback

---

## Usage Instructions

1. **Choose a Design Direction**: Select your visual theme and layout paradigm
2. **Preserve Functionality**: Copy all data models and interaction logic from V3
3. **Redesign Components**: Apply your chosen aesthetics to each UI element
4. **Test Cross-Links**: Verify that Centers→Practices and Practices→Centers navigation works
5. **Validate Search**: Ensure location/center search filters correctly across all views

**Result**: A fully functional prototype with unique visual identity but identical feature set to Sky Yoga V3.
