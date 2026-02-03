# Tippingpoint - Active Senior No.1 Media

## Overview
This is a Korean marketing website for Tippingpoint, a digital media company specializing in active senior (5070) fandom marketing. Built with React + Vite + TypeScript.

## Project Architecture
- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS (via CDN in development)
- **Font**: Pretendard (Google Fonts)

## Project Structure
```
/
├── index.html          # Entry HTML file
├── index.tsx           # React entry point
├── App.tsx             # Main App with routing
├── types.ts            # TypeScript type definitions
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript configuration
├── package.json        # Dependencies and scripts
├── pages/              # Page components
│   ├── Home.tsx        # Main landing page
│   └── AdvertisingMedia.tsx # 광고 매체 page with tabs
├── components/         # React components
│   ├── Header.tsx      # Navigation header
│   ├── Hero.tsx        # Hero section
│   ├── Statistics.tsx  # Statistics section
│   ├── TargetInsight.tsx # Target audience insights
│   ├── MediaSolutions.tsx # Media solutions section
│   ├── ContactForm.tsx # Contact form
│   └── Footer.tsx      # Footer component
└── public/
    └── images/         # Image assets
        ├── main.png    # Hero background
        └── channel.png # Channel infographic
```

## Routes
- `/` - Home page (landing page)
- `/advertising-media` - 광고 매체 page with sidebar navigation

## Running the Project
- Development: `npm run dev` (runs on port 5000)
- Build: `npm run build` (outputs to `dist/`)
- Preview: `npm run preview`

## Design System
- **Primary Color (tp-red)**: #E2002D
- **Font**: Pretendard (weights: 100, 400, 700, 900)

## Recent Changes
- February 3, 2026: Added 광고 매체 (Advertising Media) subpage
  - Created multi-page routing with React Router DOM
  - Added sidebar navigation with 6 tabs (정보채널, 바이럴채널, 매거진채널, 크리에이터, 언론보도, 온라인평판관리)
  - Implemented VIRAL section matching reference design
- February 2, 2026: Updated Footer with Contact Us section
  - Added KakaoTalk inquiry button with link
  - Added company introduction button
  - Updated company information
- February 1, 2026: Initial setup in Replit environment
  - Moved component files to `components/` directory
  - Configured Vite for port 5000 with allowedHosts for Replit proxy
  - Set up deployment configuration for static hosting
