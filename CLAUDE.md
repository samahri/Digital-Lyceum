# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

Start the full-stack development environment:
```bash
pnpm run dev
```
This runs both the React frontend (port 3000) and Express backend (port 4000) concurrently.

Run only the backend server:
```bash
pnpm run server
```

Build the application:
```bash
pnpm run build
```
This compiles TypeScript and builds the Vite frontend.

Lint the codebase:
```bash
pnpm run lint
```

Preview the production build:
```bash
pnpm run preview
```

## Architecture Overview

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with SWC for fast refresh
- **UI Components**: Radix UI primitives with custom styling
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: React hooks (no external state management library)
- **Dev Server**: Runs on port 3000 with API proxy to backend

### Backend
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js (uses `node` to run TypeScript files directly)
- **Security**: Helmet for security headers, CORS for cross-origin requests
- **Configuration**: dotenv for environment variables
- **Dev Server**: Runs on port 4000

### Project Structure
```
src/
├── components/
│   ├── ui/           # Reusable UI components (shadcn/ui)
│   └── figma/        # Figma-exported components
├── styles/           # CSS/styling files
├── App.tsx          # Main application component
└── main.tsx         # React entry point

server/
└── index.ts         # Express server entry point
```

### Key Features
- **Full-stack TypeScript**: Both frontend and backend use TypeScript
- **API Integration**: Frontend proxies `/api` requests to backend
- **Chat Interface**: Main feature is a chat demo with Aristotelian philosophy responses
- **Component Architecture**: Uses composition pattern with Radix UI primitives
- **Modern Tooling**: Vite for fast development, concurrently for running multiple processes

### Environment Configuration
- Backend uses environment variables for CORS origins and API keys
- Vite proxy handles development API routing
- Production builds output to `build/` directory

### Development Workflow
- Use `pnpm run dev` for full-stack development
- Frontend hot reloads on changes via Vite
- Backend runs with nodemon-like behavior via the server script
- All TypeScript compilation happens at build time or via Vite