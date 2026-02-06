# Sky Yoga Modernized Prototypes: Functional Overview

This document details the functional parity achieved between the legacy `sky-yoga-v3` and the new design concepts: **Sky Yoga Zen** and **Sky Yoga Serene**.

## 1. Core Data Hub
Both prototypes are powered by the centralized V3 data model:
- **Locations & Centers:** Global list of 20+ locations and dedicated sanctuaries.
- **Practices:** Catalog of SKY Meditation, Kayakalpa, Introspection, and Physical Exercise.
- **Live Sessions:** Real-time schedule including in-person and virtual studio sessions.

---

## 2. Sky Yoga Serene ("The Organic Garden")
A nature-inspired, asymmetrical interface focusing on "Flow & Growth".

### Key Functionalities:
- **Island Navigation:** A floating, adaptive menu with links to Home, About, Services, Courses, Centers, and Stories.
- **Dynamic Overlays:**
    - **Our Practices:** Full-screen catalog of SKY disciplines with sub-lists of available sessions.
    - **Find a Sanctuary:** A two-column grid of centers with detailed addresses and descriptions.
- **Masonry Layout:** Staggered visual cards for fundamental practices.
- **Contextual Schedule:** A list of "Upcoming Gatherings" at the foot of the page, allowing immediate registration.
- **Organic Registration:** A minimalist, nature-themed booking modal for quick sign-ups.

---

## 3. Sky Yoga Zen ("The Public Portal")
A high-density Swiss-grid dashboard designed for clarity and architectural balance.

### Key Functionalities:
- **Widget-Based Dashboard:**
    - **Live Feature:** A prominent "Happening Now" card for immediate participation.
    - **Timeline:** A vertical schedule of today's classes with inline "Join" and "Register" actions.
    - **Community Stats:** Real-time metrics based on the center and session database.
- **Navigation Sidebar:** Permanent menu for fast context switching (Portal, Practices, Centers, Events).
- **Public Context:** Features a "Member Access" call-to-action for sign-ins, replacing personal profile data.
- **Zen Registration:** A structured, professional booking modal with clear confirmation steps.

---

## 4. Verification Details
- **Search & Filter:** Overlays in Serene and lists in Zen use data-driven filtering.
- **State Management:** Fully reactive modals and overlays with scroll-locking for focus.
- **Responsive Design:** Both designs utilize `clamp()` and media-aware layouts for mobile/desktop support.
