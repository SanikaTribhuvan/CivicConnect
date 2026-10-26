# CivicConnect Ahilyanagar

CivicConnect Ahilyanagar is a smart municipal civic issue reporting and resolution platform prototype designed for Ahilyanagar city (Maharashtra, India). It provides transparent, ward-by-ward reporting, tracking, and administration of civic issues such as potholes, garbage, open drains, waterlogging, streetlights, and manholes.

All sample data is Demo data.

---

## Tech Stack

- **Framework**: React 19 + TypeScript + Vite 6
- **Styling**: Tailwind CSS v3 with `@tailwindcss/forms` and `@tailwindcss/typography`
- **State & Data Layer**: `@tanstack/react-query` v5 + localStorage mock API with `BroadcastChannel` for multi-tab sync
- **Motion & Scrolling**: `framer-motion` + `lenis` smooth scroll
- **Visuals & Charts**: `recharts` for municipal analytics, `lucide-react` for iconography, OpenStreetMap/Leaflet
- **Deployment**: Netlify ready with single-page application (SPA) redirect configuration

---

## Local Development & Build

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+)

### Installation
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```
Starts the local dev server at `http://localhost:5173/`.

### Production Build & Type Checking
```bash
npm run build
```
Executes `tsc -b && vite build` with strict TypeScript linting and bundles production assets into `dist/`.

### Preview Production Bundle
```bash
npm run preview
```

---

## Netlify Deployment

1. **Repository**: Connect your GitHub repository (`SanikaTribhuvan/CivicConnect`) to Netlify.
2. **Build Settings**:
   - **Base directory**: `/` (repository root)
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. **SPA Routing**: The `public/_redirects` file is automatically copied to `dist/_redirects` during build:
   ```text
   /*    /index.html   200
   ```
   This ensures deep routes (`/report`, `/track`, `/admin`) reload without 404 errors.

---

## Feature Checklist

### Completed Features (Done)
- [x] **Sticky Navigation**: Exact 72px nav height (`h-[72px]`), glassmorphism backdrop filter, and responsive layout.
- [x] **Landing Page Chapters**:
  - Chapter 1: The reveal (hero with live ticket counter from local data)
  - Chapter 2: Report anything (curated avenue aesthetic)
  - Chapter 3: Six problems (Garbage, Open Drains, Potholes, Waterlogging, Manholes, Streetlights with SLAs and departments)
  - Chapter 4: Ward by ward (Ahilyanagar ward breakdown and Sina River stream corridor)
  - Chapter 5: One city (Ahilyanagar municipal unity overview)
  - Outro: Report > Assign > Resolve steps with demo data badges
- [x] **Multi-Tab Sync**: `BroadcastChannel` notifies open tabs when a new report is filed or updated without manual refresh.
- [x] **Issue Reporting Flow** (`/report`):
  - Form validation with categories and Ahilyanagar wards (Savedi, Kedgaon, Bhingar, Delhi Gate, Station Road, Tophkhana, etc.)
  - Generates standardized municipal ticket IDs (e.g., `CC-2026-00046`)
  - Direct deep-link to track the newly created ticket
- [x] **Complaint Tracker** (`/track`):
  - Search complaints by Ticket ID or Citizen Phone number
  - Live status indicators (Reported, Assigned, In Progress, Resolved)
- [x] **Admin Dashboard & Analytics** (`/admin`):
  - KPI indicator cards (Total, Reported, In Progress, Resolved)
  - Category breakdown bar chart rendered with Recharts
  - Complete city complaints list with ward tracking
- [x] **Role & Language Selectors**:
  - Role switcher (Citizen | Officer | Admin)
  - Language toggle (EN | मराठी | हिंदी)
- [x] **Design System & Glassmorphism**:
  - Curated palette: Forest `#0A1D13`, Saffron `#F7941D`, Moss `#588357`, Pool `#489EB2`, Cream `#F5EEEA`
  - Glass cards with 28px border-radius, 22px blur, 140% saturation, and `0 24px 60px rgba(0,0,0,.28)` shadows
- [x] **Production Build Cleanliness**: Zero TypeScript errors, zero build warnings under strict TS rules.

### Roadmap (NOT BUILT YET - In Progress / TODO)
- [ ] **Voice Note Input**: Audio recording support in citizen report flow.
- [ ] **SHA-256 Web Crypto Audit Chain**: Tamper-evident cryptographic ledger with visual chain integrity verification and simulation of broken links.
- [ ] **Interactive GPS Pinning**: Draggable Leaflet map marker with geolocation auto-tagging.
- [ ] **Officer Resolution Flow**: Dedicated officer view requiring photo verification before resolving tickets.
- [ ] **SLA Auto-Escalation**: Countdown timers with a fast-forward 24h simulator.
- [ ] **Automated Demo Walkthrough**: Floating 60-second interactive guided story with captions.
