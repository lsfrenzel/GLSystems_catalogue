# Overview

Catálogo de Soluções Digitais is a modern business-to-business landing page application designed to showcase enterprise software solutions. The project serves as a commercial catalog presenting various business systems including ERP, CRM, restaurant management, financial systems, inventory management, and educational platforms. The application features a clean, minimalist design inspired by modern e-commerce aesthetics with smooth scrolling, interactive animations, and a comprehensive contact system.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The frontend is built as a modern React single-page application using Vite as the build tool and development server. The architecture follows a component-based approach with TypeScript for type safety. The UI components are built on top of shadcn/ui (Radix UI primitives) providing a consistent design system with dark theme support. Tailwind CSS handles styling with custom CSS variables for theming, and the application uses Wouter for client-side routing instead of React Router for a lighter bundle size.

The application structure separates concerns with dedicated directories for components, pages, hooks, and utilities. Form handling is managed through React Hook Form with Zod validation, while TanStack Query handles server state management and API interactions. The design emphasizes accessibility and responsive design principles.

## Backend Architecture
The backend follows a minimalist Express.js architecture with TypeScript, serving both API endpoints and static assets. The server implements a simple storage abstraction pattern with an in-memory implementation (MemStorage) that can be easily replaced with database persistence. The API layer is RESTful with proper error handling and validation using Zod schemas.

The application uses middleware for request logging and error handling, with development-specific features like Vite integration for hot module replacement. The server structure separates route definitions, storage logic, and utility services for maintainability.

## Data Management
Data persistence uses an abstraction layer (IStorage interface) currently implemented with in-memory storage for contact submissions and user data. The schema definitions are shared between client and server using Zod for validation. Drizzle ORM is configured for PostgreSQL with schema-first approach, suggesting future database integration plans.

Form data validation occurs on both client and server sides using shared schema definitions, ensuring data integrity across the application stack.

## Email System
The application includes a comprehensive email service using Nodemailer for SMTP communication. The email system handles both administrative notifications and user confirmations asynchronously, with proper error handling and configuration flexibility through environment variables. Email templates are generated programmatically with proper encoding and security considerations.

# External Dependencies

## UI and Styling
- **Radix UI** - Headless UI primitives for accessible components (accordion, dialog, dropdown, form controls, etc.)
- **Tailwind CSS** - Utility-first CSS framework with custom theme configuration
- **shadcn/ui** - Pre-built component library based on Radix UI primitives
- **Lucide React** - Icon library for consistent iconography
- **Font Awesome** - Additional icon support via CDN
- **Google Fonts** - Typography using Montserrat, Lato, and Playfair Display fonts

## Data Management and Validation
- **Zod** - Schema validation for forms and API data
- **React Hook Form** - Form state management and validation
- **TanStack React Query** - Server state management and caching
- **Drizzle ORM** - TypeScript ORM configured for PostgreSQL
- **Drizzle Kit** - Database schema management and migrations

## Backend Services
- **Express.js** - Web application framework
- **Nodemailer** - Email sending capability via SMTP
- **connect-pg-simple** - PostgreSQL session store (configured but not actively used)
- **he** - HTML entity encoding for email security

## Development and Build Tools
- **Vite** - Build tool and development server with React plugin
- **TypeScript** - Type safety across the entire application
- **ESBuild** - Fast JavaScript bundling for production builds
- **PostCSS with Autoprefixer** - CSS processing and vendor prefixing

## Database Infrastructure
- **Neon Database Serverless** - PostgreSQL-compatible serverless database driver
- **PostgreSQL** - Primary database system (configured via Drizzle)

## External APIs and Services
The application is designed to integrate with:
- SMTP email providers (Gmail, custom SMTP servers)
- External image hosting (Unsplash for placeholder images)
- Social media platforms (configured for LinkedIn, Instagram, Facebook, YouTube)

The architecture supports easy integration of additional third-party services through environment variable configuration and modular service patterns.