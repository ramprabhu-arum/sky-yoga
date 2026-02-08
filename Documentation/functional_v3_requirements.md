# Sky Yoga V3: Functional Requirements Document

This document outlines the core functional behavior, navigation flows, and interactive logic of the **Sky Yoga V3** prototype. It serves as the benchmark for modernizing the Zen and Serene designs.

## 1. Primary Navigation (Top Navbar)
The persistent menu provides high-level navigation and section-anchored scrolling:

| Menu Item | Action / Destination |
| :--- | :--- |
| **Home** | Scrolls to Hero section (Top of page). |
| **About** | Scrolls to "Our Heritage" section (History & Mission). |
| **Services** | Scrolls to "What We Offer" section (The 4 Pillars). |
| **Courses** | Opens the **Explore Courses** full-screen overlay. |
| **Centers** | Opens the **Find a Center** full-screen overlay. |
| **Stories** | Scrolls to "Testimonials" section (User Stories). |
| **Register** | (Button) Opens the **Find a Center** overlay to begin the journey. |

---

## 2. "Explore Courses" Feature
This view focuses on **what** the user wants to learn.

### A. Discovery Flow
1. **Selection Grid**: Users start with a grid representing the 4 core practices:
   - SKY Meditation, Physical Exercise, Kayakalpa Yoga, and Introspection.
2. **Practice Detail**: Clicking a practice reveals its description, benefits, and a list of centers where it is active.

### B. Search & Filter
- **Interface**: A search bar labeled "Search by city, state, or center name...".
- **Logic**: Filters the list of centers displaying the selected practice based on city, state, center title, or address string matches.

### C. Interactions & Cross-Linking
- **Session Rows**: Users can click a "Sign Up" button on any specific session row.
- **Center Drilldown**: Each center entry has a button: *"View all sessions at this center →"*.
  - **Redirect**: This closes the "Courses" context and opens the **Find a Center** context pre-selected with that specific center.

---

## 3. "Find a Center" Feature
This view focuses on **where** the user is located.

### A. Location Search
- **Interface**: A global search bar for "City, state, or country".
- **Region Pills**: Quick filters for:
  - Texas, California, Ontario, and Online (Virtual Studio).

### B. Center Detail View
Clicking a Center card opens a deep-dive view:
- **Contact Info**: Name, Address, Phone, and Description.
- **Practice Quick-Links**: Icons for the practices taught at that center (e.g., "SKY Meditation →").
  - **Redirect**: Clicking these takes the user to the **Explore Courses** view, pre-selected with that specific practice.
- **Session Catalog**: All sessions hosted by the center, grouped by practice type.

---

## 4. Registration & Booking
The registration flow is handled via a focused, two-step modal:

- **Step 1 (The Form)**:
  - **Required**: Full Name, Email Address.
  - **Optional**: Phone Number, Experience Level (Select), and Notes (Textarea).
- **Step 2 (Confirmation)**:
  - Displays a "Welcome" thank-you screen.
  - Summarizes the booking (Session Title).
  - Notes that a confirmation email has been sent.

---

## 5. Technical Interaction Notes
- **Scroll Locking**: Opening any overlay (Courses or Centers) locks the background scroll to maintain focus.
- **Breadcrumbs**: Both overlays feature "← Back to Home" or "← All Practices" links for easy exit.
- **Visual Feedback**: All cards (Practices and Centers) feature hover elevations and border highlighting to indicate clickability.
