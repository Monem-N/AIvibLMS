# Hypatia Modern LMS

A modern learning management system built with React, TypeScript, and Firebase.

## Project Overview

This project is a modernization of the Hypatia LMS platform, using a "modern architecture first" approach. We're building a new system from the ground up while preserving all existing functionality.

## Current Status

The project is currently in the **Discovery and Planning** phase. We are:

1. Documenting existing features and user workflows
2. Designing the modern architecture
3. Setting up project infrastructure

## Project Structure

- `/docs` - Project documentation
  - `/architecture` - Architecture design documents and ADRs
  - `/features` - Feature documentation
  - `/workflows` - User workflow documentation
- `/src` - Source code
  - `/packages` - Monorepo packages
    - `/client` - Frontend application
    - `/common` - Shared utilities and types
    - `/components` - Reusable UI components
- `/scripts` - Development and build scripts

## Documentation

### Feature Documentation

We are documenting all existing features of the Hypatia LMS platform. Each feature is documented using a standard template that includes:

- Feature information and description
- User roles and permissions
- User workflows
- UI components
- Data model
- API endpoints
- Dependencies
- Testing considerations
- Migration notes

See the [Feature Documentation README](./docs/features/README.md) for more information.

### User Workflow Documentation

We are documenting key user workflows to understand how users interact with the system. Each workflow is documented using a standard template that includes:

- Workflow information
- Preconditions
- Step-by-step process
- Postconditions
- Error conditions
- Performance expectations
- User experience considerations

See the [User Workflow Documentation README](./docs/workflows/README.md) for more information.

### Architecture Documentation

We are designing a modern architecture for the Hypatia LMS platform. The architecture documentation includes:

- Architecture vision
- Component architecture
- Data architecture
- API design
- Security architecture
- DevOps and infrastructure

See the [Architecture Documentation README](./docs/architecture/README.md) for more information.

## Technology Stack

The modernized Hypatia LMS will be built using the following technologies:

### Frontend

- React 18+ with functional components and hooks
- Redux Toolkit for state management
- React Router for navigation
- Material-UI for UI components
- TypeScript for type safety
- Vite for build and development

### Backend

- Firebase Authentication for user management
- Firestore for data storage
- Firebase Storage for file storage
- Firebase Functions for serverless backend logic
- Firebase Hosting for deployment

### DevOps

- GitHub Actions for CI/CD
- Jest and React Testing Library for testing
- ESLint and Prettier for code quality
- Firebase Performance Monitoring for performance tracking

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn 1.22+
- Firebase CLI

### Installation

1. Clone the repository
2. Install dependencies: `yarn install`
3. Copy `.env.example` to `.env` and fill in the values
4. Start the development server: `yarn dev`

## Project Plan

See the [Discovery Phase Project Plan](./docs/Discovery_Phase_Project_Plan.md) for the current phase plan.

## Contributing

Please see the [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines.

## License

This project is licensed under the [MIT License](LICENSE).
