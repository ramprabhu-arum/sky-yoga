# Implementation Plan - Modernize Web Prototypes

## Goal Description
The user wants to upgrade `sky-yoga-zen` and `sky-yoga-serene-in-garden` to matched the functionality of `sky-yoga-v3` (Reference) while applying creative, modern design improvements.

## Analysis: Sky Yoga V3 (Reference)
**Key Features:**
- **Dynamic Content:** Data-driven sections (Locations, Centers, Sessions).
- **Interactive UI:**
    - "Find Center" overlay with search.
    - "Explore Courses" overlay with detailed views.
    - "Registration" modal with 2-step flow.
    - Responsive Navigation (Mobile toggle).
    - Scroll-aware interactions.

## Proposed Changes (Radical Redesign)

### 1. Upgrade `sky-yoga-zen` (The "Zen Dashboard" Concept)
**Core Concept:** "Architectural Balance". High density, high utility.
**New Layout:** **Bento Grid / Dashboard**.
- **Navigation:** Vertical Sidebar (Text + Icons).
- **Content:** Grid of "Widgets". Information is visible at a glance, not hidden.
- **Visuals:** "Swiss Style" / Architectural. White backgrounds, strong dividers (`1px solid #E5E5E5`), minimal shadows.
- **Typography:** `Outfit` (Modern Sans) + `Cormorant` (Accents).
- **Features:**
    - **Schedule Widget:** Vertical timeline of classes.
    - **Centers Widget:** Map-like card with quick filters.
    - **Stats:** "Classes Attended", "Minutes Meditated".
    - **Quick Actions:** "Book Now" buttons directly on the dashboard.

### 2. Upgrade `sky-yoga-serene` (The "Organic" Concept)
**Core Concept:** "Flow & Growth". Abandon the rigid grid.
**New Layout:** **Asymmetrical / Masonry**.
- **Navigation:** Floating "Island" header that shrinks on scroll.
- **Content:** Cards are not uniform. Some are wide, some tall. Not aligned strictly to a grid.
- **Visuals:** Background uses ample whitespace with subtle "watercorlor" blobs.
- **Interaction:** Heavy use of *parallax*. Elements drift at different speeds when scrolling.
- **Functionality:**
    - "Find Center" looks like a travel journal or passport.
    - "Course Details" expands inline like an accordion rather than a modal.

## Verification Plan
- **Manual Walkthrough:**
    - Click every "Book" button -> check Modal.
    - Open "Centers" -> Search for "Plano" -> Verify filter.
    - Resize to Mobile -> Check Nav menu.
