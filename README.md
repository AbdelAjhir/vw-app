# VW DIGITAL:HUB Frontend Technical Test

A movie management application built with React and TypeScript that demonstrates modern frontend development practices. The app allows users to browse, search, sort, and manage a collection of movies through an intuitive interface.

---

## 🎬 Live Demo

> **Note:** The API server runs on a free tier, so initial data loading might be slow. Please be patient!

**Frontend Application:** [https://vw-digital.netlify.app/](https://vw-digital.netlify.app/)  
**API Server:** [https://frontend-challenge-cq9a.onrender.com/movies](https://frontend-challenge-cq9a.onrender.com/movies)

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/AbdelAjhir/vw-app.git
   cd vw-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   ```bash
   cp .env.example .env
   ```

   The `.env` file should contain:

   ```
   VITE_API_URL=http://localhost:3001
   MODE=development
   ```

4. **Start the local API server:**

   ```bash
   npm run api
   ```

   This starts JSON Server on `http://localhost:3001` with the movie data.

5. **Start the development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) in your browser.

6. **Run tests:**

   ```bash
   # Unit tests
   npm run test

   # E2E tests (make sure both the app and API server are running first)
   npm run test:e2e
   ```

---

## 🎯 Features

### Core Functionality

- **Movie Management:** Full CRUD operations (Create, Read, Update, Delete)
- **Dual Table Views:** Simple and Advanced table implementations
- **Search & Filter:** Global search across all movie fields (debounced in Advanced table)
- **Sorting:** Multi column sorting with visual indicators (client side in Simple, server side in Advanced)
- **Pagination:** Server side pagination in the advanced view
- **Responsive Design:** Mobile first approach with adaptive layouts

### User Experience

- **Dark/Light Theme:** Toggle between themes with system preference detection
- **Toast Notifications:** User feedback for all operations
- **Loading States:** Spinners and loading indicators
- **Error Handling:** Graceful error states and user friendly messages
- **Accessibility:** ARIA labels, keyboard navigation, and screen reader support

### Technical Features

- **TypeScript:** Full type safety throughout the application
- **State Management:** Redux Toolkit with RTK Query for API calls
- **Modern UI:** Tailwind CSS with shadcn/ui components
- **Testing:** Unit tests with Vitest and E2E tests with Playwright
- **Code Quality:** ESLint, Prettier, and Husky pre-commit hooks

---

## 🏗️ Architecture

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── DataTable/      # Table implementations (Simple & Advanced)
│   ├── Details/        # Movie detail components
│   ├── MovieForm/      # Add/Edit movie form
│   └── ui/             # Base UI components (shadcn/ui components with Radix UI primitives)
├── pages/              # Route components
├── store/              # Redux store and movie API slice
├── types/              # TypeScript type definitions
├── helpers/            # Utility functions
├── hooks/              # Custom React hooks (useDebounce)
├── layouts/            # Layout components
└── test/               # Test utilities and mocks
```

### Key Technologies

**Frontend Stack:**

- **React 19** with TypeScript
- **Redux Toolkit** + **RTK Query** for state management
- **React Router** for navigation
- **Tailwind CSS** for styling
- **shadcn/ui** for accessible components (built on Radix UI)

**Development Tools:**

- **Vite** for fast development and building
- **Vitest** for unit testing
- **Playwright** for E2E testing
- **ESLint** + **Prettier** for code quality
- **Husky** for Git hooks

**API & Data:**

- **JSON Server** for mock API
- **Render** for hosting JSON Server
- **Netlify** for frontend hosting

---

## 📊 Table Implementations

**Simple Table:** Client side sorting, filtering, and pagination, ideal for small or static datasets with fast local performance  
**Advanced Table:** Server side pagination and querying via RTK Query + TanStack Table, better suited for large, dynamic datasets where performance and scalability matter

Both support global search, sorting, responsive design, and CRUD operations.

---

## 🎨 Design Decisions

### UI Framework Choice: Tailwind CSS

I chose Tailwind CSS because it gives control over styling using classes, while keeping your CSS size small and your setup simple. The new v4 features make it even faster, more flexible, and easier to theme, whether you're building small components or large apps.

**Why Tailwind:**

- **Speed:** Write styles directly in HTML, no context switching
- **Responsive:** Built in breakpoints and state variants (hover, focus, dark mode)
- **Performance:** v4 brings lightning fast builds and tiny bundles
- **Flexibility:** Arbitrary values and dynamic utilities for any design need
- **Team-friendly:** Consistent patterns and great tooling keep everyone on the same page

### State Management: Redux Toolkit + RTK Query

Redux Toolkit is like having a smart assistant for state management. It takes the complexity out of Redux and adds RTK Query, which is basically magic for API calls.

**Why Redux Toolkit:**

- **Less Code:** Auto generated hooks and fetch logic save tons of boilerplate
- **Smart Caching:** No more duplicate requests it remembers what you've already fetched
- **Real-time Feel:** Optimistic updates make the app feel instant
- **Developer Friendly:** Full Redux DevTools integration for debugging
- **Type Safety:** Strong TypeScript support keeps your API calls bulletproof

### Component Architecture

The application follows a micro framework approach with:

- **Reusable Components:** Modular, composable UI elements
- **Container Pattern:** Separation of business logic from presentation
- **Custom Hooks:** Shared logic extraction
- **Type Safety:** Full TypeScript coverage

### ♻️ Component Reuse

**UI Primitives:** Buttons, inputs, dialogs, and other base components are generated using `npx shadcn@latest add component-name` for consistency and accessibility.

**Custom Structures:** Larger components like forms, table rows, search bars, and complex layouts are custom built following consistent design patterns and props interfaces for easy composition and scalability.

---

## 📱 Responsive Design

**Mobile-first approach** with horizontal scrolling tables, touch friendly buttons, and responsive navigation. Forms and dialogs are optimized for small screens.

---

## 🧪 Testing Strategy

**Unit Tests (Vitest):** Component testing with React Testing Library

- **Table Components:** Sorting functionality and data rendering in SimpleMovieTable
- **Form Validation:** MovieForm with comprehensive field validation and error handling
- **UI Components:** SearchBar with debounce functionality and user interactions
- **Store Configuration:** Redux store setup and RTK Query integration

**E2E Tests (Playwright):** Critical user journeys and table functionality

- **App Loading:** Verifies page title, navigation, and initial table state
- **Table Display:** Confirms all columns render correctly with expected data
- **Search Functionality:** Tests search bar visibility and placeholder text

**Test Coverage:** Focused on high impact user interactions and core business logic  
✅ **Coverage Summary:** Table sorting, form validation, search functionality, and store configuration are tested. Coverage targets critical user paths rather than exhaustive testing.

---

## 🚀 Performance Optimizations

**Code Splitting:** Route-based lazy loading and dynamic imports  
**Caching:** RTK Query automatic caching with optimistic updates  
**Bundle Optimization:** Vite tree shaking and Tailwind CSS purging

---

## ♿ Accessibility Features

**ARIA Implementation:** Proper labels, roles, and screen reader support  
**Semantic HTML:** Proper heading hierarchy and table structure  
**Testing:** ESLint rules and keyboard navigation testing

---

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run api              # Start JSON Server (API)
npm run build            # Build for production
npm run preview          # Preview production build

# Testing
npm run test             # Run unit tests
npm run test:e2e         # Run E2E tests

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run format           # Check Prettier formatting
npm run format:fix       # Fix formatting issues
npm run typecheck        # TypeScript type checking

# Utilities
npm run clean            # Clean build artifacts
npm run check:all        # Run all checks (lint, format, typecheck)
npm run validate         # Full validation before deployment
```

---

## 🚀 Deployment

**Frontend (Netlify):** Automatic deployment with environment variables  
**API Server (Render):** JSON Server deployment with automatic HTTPS

---

## 🤖 AI Tools Usage

AI tools (such as ChatGPT, GitHub Copilot) were used to assist throughout the project in a way consistent with how many developers today leverage these tools to boost productivity as enhancers, not as replacements for decision making or problem solving.

### 💻 Code & Architecture

**🧱 Generated boilerplate code & custom implementations**

- **useDebounce hook:** Created a custom debounce hook instead of using lodash library for better bundle size and control
- **ESLint configuration:** Helped set up comprehensive linting rules for React, TypeScript, and accessibility
- **Vite configuration:** Assisted with build optimization, alias resolution, and development server setup
- **TypeScript interfaces:** Generated and refined type definitions for Movie data and API responses
- **Utility functions:** Helped create the formatDate function and other helper utilities

**🚀 Productivity enhancements**

- **Autocomplete Suggestions:** Copilot suggests entire lines or blocks of code as you type
- **Reduces Repetitive Work:** Quickly fills in boilerplate code and common patterns

**🔧 Helped with understanding and implementing tanstack/react-table and shadcn/ui**
AI was used to break down advanced table patterns (e.g., server side pagination, column sorting, custom renderers) and make sense of sparse or complex documentation.

### ♿ Accessibility

**🧩 Introduced accessibility considerations**
AI helped apply accessibility best practices (e.g., ARIA roles, semantic HTML, keyboard support) to UI elements.

**✅ Assisted in accessibility audits**
Ensured that basic standards were met for interactive components and navigational structure.

### 📚 Documentation & Developer Experience

**📖 Helped draft and organize the README**
Structured sections like setup, features, tech stack, and deployment instructions with proper markdown formatting, icons, and visual hierarchy.

**💬 Improved commit messages and PR descriptions**
AI suggestions helped write clear, conventional commit messages and pull request descriptions.

---

## 💡 Developer Mindset

### ⏱️ Time Investment & Quality Standards

**Estimated vs. Actual Time:** While the challenge suggested 20 hours, I invested additional time to demonstrate my development standards and attention to detail. I took this as a chance to demonstrate the kind of quality I bring to a production grade codebase.

**Real World Perspective:** In a production environment, I would adapt my approach based on sprint velocity, business priorities, technical debt considerations, and code review feedback.

### 🎯 Design Decisions & Interpretation

I made deliberate choices based on the challenge's open ended nature, treating it as an opportunity to show my thought process and simulate realistic production scenarios.

**Collaborative Development Mindset:** I developed the project as if it were part of a team environment applying a modular architecture, Git best practices, and documentation that could support onboarding new developers.

---

## 📌 Final Notes

This project allowed me to simulate a real product environment where scalability, architecture, developer experience, and collaboration all matter. The open ended nature of the challenge encouraged me to go beyond the basics. I implemented both table types to reflect real world use cases, structured the project as if it were part of a team environment, and focused on writing scalable, maintainable, production grade code not just something that works.

The client side version offers fast interactions for small datasets, while the server side version scales for large datasets with TanStack Table and RTK Query integration.

### 🧪 If I had more time...

- 🔖 Add a "Favorites" feature for marking liked movies (using Redux Toolkit for global state management)
- 🧪 Expand unit and integration test coverage, especially around forms and table logic
- 🌐 Expand E2E coverage for edge cases and a11y flows
- 🧯 Introduce error boundaries for graceful crash handling
- 📁 Add Storybook for UI isolation and visual consistency testing

**Note:** I intentionally kept Redux Toolkit usage minimal to avoid over engineering global state wasn't required for the current table implementations, but would be perfect for features like favorites, user preferences, or watchlist functionality.

### 📱 Mobile Usability

Responsive tables on mobile are notoriously difficult due to limited screen space and dense layouts. I addressed this by enabling horizontal scroll on table wrappers, ensuring that key actions like Edit/Delete remain large and touch friendly. Forms and dialogs adapt to smaller screens with a stacked layout and minimal distractions, ensuring usability on mobile devices.

I also made modals full screen on smaller viewports to reduce friction and improve focus. In the future, I'd explore features like collapsible columns or mobile row expansion patterns to further improve the experience.

### 🔍 Implementation Rationale

My priorities were reusability, clarity, and performance. Every major UI piece is modular and follows consistent design patterns. I chose Redux Toolkit + RTK Query over Context for better scalability with async logic and caching.

### 🚀 Performance Optimizations

**Code splitting & lazy loading:** Major routes are lazily loaded  
**Memoization:** React.memo, useMemo, and useCallback for heavy components and function optimization  
**Bundling:** Tailwind CSS purging and Vite tree shaking for minimal bundle size

## ⚠️ Known Limitations & Future Work

- No persistent "favorites" or user preferences yet
- Error boundaries not yet implemented for full crash safety
- E2E coverage could be expanded to include edge cases and accessibility flows
- Some forms could benefit from additional input validation or fallback states

---

### 👋 Final Thoughts

I truly enjoyed working on this project. It allowed me to put together several pieces I care deeply about clean architecture, accessibility, developer experience, and realistic UI patterns. Thank you for designing a challenge that intentionally left room for interpretation, it gave me the chance to show how I approach ambiguity, structure my work, and think like a product minded engineer. I treated this like a real product I would ship with a team, not just to impress, but to show how I build for quality, collaboration, and scale.

This wasn't just a test for me it was a chance to build something thoughtful, structured, and scalable, as I would on any real team. Every decision was intentional, and I've done my best to reflect that here.

---

## 👨‍💻 Developer Information

**Name:** Abdelbari Ajhir  
**Email:** abdeelajhir@gmail.com  
**LinkedIn:** [linkedin.com/in/abdelbariajhir](https://linkedin.com/in/abdelbariajhir)  
**GitHub:** [github.com/AbdelAjhir](https://github.com/AbdelAjhir)

---

## 📄 License

This project was created as part of the VW DIGITAL:HUB Frontend Technical Test. All rights reserved.
