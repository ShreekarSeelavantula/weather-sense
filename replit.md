# Weather Dashboard Application

## Overview

This is a modern weather dashboard application built with a React frontend and Express backend. The application provides real-time weather information including current conditions, hourly forecasts, air quality data, and various weather metrics. Users can search for weather information by city name and view detailed weather data in an intuitive, responsive interface with both light and dark themes.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is built using React with TypeScript and follows a component-based architecture:

**UI Framework**: React 18 with TypeScript for type safety and modern React features
**Styling**: Tailwind CSS with shadcn/ui component library for consistent, accessible UI components
**Routing**: Wouter for lightweight client-side routing
**State Management**: TanStack Query (React Query) for server state management and caching
**Theme System**: Custom theme provider supporting light/dark modes with CSS variables
**Build Tool**: Vite for fast development and optimized production builds

The application uses a modular component structure with reusable UI components, weather-specific components, and utility functions. The design system is based on CSS variables for theming and uses Radix UI primitives for accessibility.

### Backend Architecture
The backend follows a RESTful API design pattern:

**Framework**: Express.js with TypeScript for the server implementation
**API Design**: RESTful endpoints with proper HTTP status codes and error handling
**Request/Response**: JSON-based communication with schema validation using Zod
**Development Tools**: Hot module replacement via Vite integration for seamless development

The server implements middleware for request logging, error handling, and serves both API endpoints and static files in production.

### Data Storage Solutions
**Session Storage**: In-memory storage implementation with interface abstraction for potential database integration
**User Management**: Basic user schema defined but currently using memory-based storage
**Schema Validation**: Zod schemas for weather data validation and type safety

The storage layer is designed with an interface pattern allowing easy migration to database solutions like PostgreSQL with Drizzle ORM (configuration present but not actively used).

### Authentication and Authorization
Currently implements a basic storage interface for user management with plans for session-based authentication. The infrastructure includes:

**User Schema**: Defined user types with insert and select patterns
**Storage Interface**: Abstracted storage layer ready for authentication implementation
**Session Support**: PostgreSQL session store configuration available

### API Integration Patterns
**Weather API**: Integration with WeatherAPI.com for comprehensive weather data
**Error Handling**: Structured error responses with proper HTTP status codes
**Data Transformation**: Weather condition codes mapped to FontAwesome icons
**Caching Strategy**: Client-side caching via React Query with 5-minute refresh intervals

## External Dependencies

### Weather Services
- **WeatherAPI.com**: Primary weather data provider supporting current conditions, forecasts, and air quality data
- Requires API key configuration via environment variables (`OPENWEATHER_API_KEY`, `WEATHER_API_KEY`, or `WEATHERAPI_KEY`)

### Database Infrastructure
- **Neon Database**: PostgreSQL serverless database platform configured with Drizzle ORM
- **Drizzle ORM**: Type-safe database toolkit with migration support
- Connection managed via `DATABASE_URL` environment variable

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework for styling
- **shadcn/ui**: High-quality React component library built on Radix UI
- **Radix UI**: Unstyled, accessible UI primitives
- **FontAwesome**: Icon library for weather condition representations

### Development and Build Tools
- **Vite**: Frontend build tool with HMR and optimized production builds
- **TypeScript**: Type safety across the entire application
- **ESBuild**: Fast JavaScript bundler for server-side code
- **PostCSS**: CSS processing with Autoprefixer

### Runtime and Utilities
- **TanStack Query**: Powerful data synchronization for React
- **date-fns**: Modern JavaScript date utility library
- **Wouter**: Minimalist routing for React applications
- **Zod**: TypeScript-first schema validation