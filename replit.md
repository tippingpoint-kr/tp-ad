# Tippingpoint - Active Senior No.1 Media

## Overview
This is a Korean marketing website for Tippingpoint, a digital media company specializing in active senior (5070) fandom marketing. Built with React + Vite + TypeScript with a Node.js/Express backend.

## Project Architecture
- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS (via CDN in development)
- **Font**: Pretendard (Google Fonts)
- **Backend**: Node.js + Express.js
- **Database**: PostgreSQL (Replit built-in)

## Project Structure
```
/
├── index.html          # Entry HTML file
├── index.tsx           # React entry point
├── App.tsx             # Main App with routing
├── vite.config.ts      # Vite configuration
├── package.json        # Dependencies and scripts
├── pages/              # Page components
│   ├── Home.tsx        # Main landing page
│   ├── AdvertisingMedia.tsx # 광고 매체 page with tabs
│   └── admin/          # Admin dashboard pages
│       ├── AdminLogin.tsx
│       ├── AdminLayout.tsx
│       ├── AdminChannels.tsx
│       ├── AdminInquiries.tsx
│       └── AdminDocuments.tsx
├── components/         # React components
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Statistics.tsx
│   ├── TargetInsight.tsx
│   ├── MediaSolutions.tsx
│   ├── ContactForm.tsx
│   └── Footer.tsx
├── server/             # Backend server
│   ├── index.cjs       # Main server file
│   ├── db.cjs          # Database connection
│   ├── middleware/
│   │   └── auth.cjs    # JWT authentication
│   └── routes/
│       ├── auth.cjs    # Auth API
│       ├── channels.cjs # Channels API
│       ├── inquiries.cjs # Inquiries API
│       └── documents.cjs # Documents API
├── uploads/            # Uploaded files
│   ├── logos/          # Channel logos
│   └── documents/      # PDF/Excel documents
└── public/
    └── images/
```

## Routes
### Public Routes
- `/` - Home page (landing page)
- `/advertising-media` - 광고 매체 page with sidebar navigation

### Admin Routes
- `/admin/login` - Admin login page
- `/admin/channels` - Channel management
- `/admin/inquiries` - Inquiry management
- `/admin/documents` - Document management

## Admin Credentials
- **Username**: admin
- **Password**: tippingpoint2026

## API Endpoints
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/channels` - Get all channels
- `POST /api/channels` - Create channel (admin only)
- `PUT /api/channels/:id` - Update channel (admin only)
- `DELETE /api/channels/:id` - Delete channel (admin only)
- `GET /api/inquiries` - Get all inquiries (admin only)
- `POST /api/inquiries` - Submit inquiry (public)
- `GET /api/documents` - Get active documents (public)
- `POST /api/documents` - Upload document (admin only)

## Running the Project
- Frontend: `npm run dev` (runs on port 5000)
- Backend: `node server/index.cjs` (runs on port 3001)

## Design System
- **Primary Color (tp-red)**: #E2002D
- **Font**: Pretendard (weights: 100, 400, 700, 900)

## Database Tables
- `admins` - Admin users
- `channels` - Channel data (name, category, logo, hashtags, subscribers, demographics, etc.)
- `inquiries` - Contact form submissions
- `documents` - Company documents (PDFs, Excel files)

## Recent Changes
- February 3, 2026: Added Admin Dashboard System
  - Backend server with Express.js and PostgreSQL
  - Admin authentication with JWT
  - Channel management (CRUD with image upload)
  - Inquiry management (view, status update, delete)
  - Document management (upload PDF/Excel files)
  - Connected frontend to backend API
- February 3, 2026: Added 광고 매체 (Advertising Media) subpage
  - Created multi-page routing with React Router DOM
  - Added sidebar navigation with 5 tabs
- February 2, 2026: Updated Footer with Contact Us section
- February 1, 2026: Initial setup in Replit environment
