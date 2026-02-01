# Tippingpoint - Active Senior No.1 Media

## Overview
This is a Korean marketing website for Tippingpoint, a digital media company specializing in active senior (5070) fandom marketing. Built with React + Vite + TypeScript.

## Project Architecture
- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS (via CDN in development)
- **Font**: Pretendard (Google Fonts)

## Project Structure
```
/
├── index.html          # Entry HTML file
├── index.tsx           # React entry point
├── App.tsx             # Main App component
├── types.ts            # TypeScript type definitions
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript configuration
├── package.json        # Dependencies and scripts
└── components/         # React components
    ├── Header.tsx      # Navigation header
    ├── Hero.tsx        # Hero section
    ├── Statistics.tsx  # Statistics section
    ├── TargetInsight.tsx # Target audience insights
    ├── MediaSolutions.tsx # Media solutions section
    ├── ContactForm.tsx # Contact form
    └── Footer.tsx      # Footer component
```

## Running the Project
- Development: `npm run dev` (runs on port 5000)
- Build: `npm run build` (outputs to `dist/`)
- Preview: `npm run preview`

## Recent Changes
- February 1, 2026: Initial setup in Replit environment
  - Moved component files to `components/` directory
  - Configured Vite for port 5000 with allowedHosts for Replit proxy
  - Set up deployment configuration for static hosting
