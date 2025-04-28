# AIvibLMS Architecture Overview

## Introduction

AIvibLMS is a modern learning management system built with React, TypeScript, and a hybrid backend approach using Firebase and Supabase. This document provides an overview of the system architecture, key components, and design decisions.

## System Architecture

AIvibLMS follows a client-server architecture with a React frontend and a serverless backend using Firebase and Supabase services.

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client Application                        │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────┐ │
│  │    React    │  │   Redux     │  │  React      │  │  MUI    │ │
│  │  Components │  │   Store     │  │  Router     │  │         │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────┘ │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Service Layer                              │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────┐ │
│  │  Firebase   │  │  Supabase   │  │   Custom    │  │  Error  │ │
│  │  Services   │  │  Services   │  │   Hooks     │  │ Handling│ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────┘ │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Backend Services                           │
│                                                                 │
│  ┌─────────────────────────┐      ┌─────────────────────────┐   │
│  │       Firebase          │      │       Supabase          │   │
│  │                         │      │                         │   │
│  │  ┌─────────┐ ┌────────┐ │      │  ┌─────────────────┐    │   │
│  │  │  Auth   │ │Firestore│ │      │  │     Storage     │    │   │
│  │  └─────────┘ └────────┘ │      │  └─────────────────┘    │   │
│  │                         │      │                         │   │
│  │  ┌─────────┐ ┌────────┐ │      │                         │   │
│  │  │Functions│ │Realtime │ │      │                         │   │
│  │  │         │ │Database │ │      │                         │   │
│  │  └─────────┘ └────────┘ │      │                         │   │
│  └─────────────────────────┘      └─────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend

- **React 18+**: UI library for building the user interface
- **TypeScript**: For type safety and improved developer experience
- **Redux Toolkit**: For state management
- **React Router**: For client-side routing
- **Material-UI**: For UI components and styling
- **Vite**: For fast development and optimized builds

### Backend

- **Firebase**:
  - Authentication: User management and authentication
  - Firestore: NoSQL database for application data
  - Realtime Database: For real-time features
  - Cloud Functions: For serverless backend logic

- **Supabase**:
  - Storage: For file storage (images, audio, video, documents)

## Key Components

### Frontend Components

#### Core Components

- **App**: Main application component with routing
- **AuthProvider**: Context provider for authentication state
- **SupabaseInitializer**: Initializes Supabase for storage
- **FirebaseInitializer**: Initializes Firebase services

#### Layout Components

- **MainLayout**: Layout for authenticated pages
- **AuthLayout**: Layout for authentication pages
- **DashboardLayout**: Layout for dashboard pages

#### Feature Components

- **Courses**: Components for course management
- **Assignments**: Components for assignment management
- **Submissions**: Components for submission management
- **Grading**: Components for grading
- **Users**: Components for user management

#### Common Components

- **FileUpload**: Reusable component for file uploads
- **FileDisplay**: Reusable component for displaying files
- **Pagination**: For paginated lists
- **SearchBar**: For search functionality
- **Notifications**: For displaying notifications

### Service Layer

#### Firebase Services

- **firebaseService.ts**: Initializes Firebase
- **authService.ts**: Authentication operations
- **databaseService.ts**: Firestore database operations

#### Supabase Services

- **supabaseStorageService.ts**: Supabase Storage operations

#### Hybrid Services

- **fileService.ts**: Combines Firebase auth with Supabase storage

#### Custom Hooks

- **useAuth**: Hook for authentication operations
- **useFirebase**: Hook for Firebase operations
- **useSupabase**: Hook for Supabase operations
- **useNotification**: Hook for displaying notifications

## Data Model

### Firebase Firestore Collections

- **users**: User profiles and metadata
- **courses**: Course information
- **modules**: Course modules
- **activities**: Learning activities
- **enrollments**: User enrollments in courses
- **assignments**: Course assignments
- **submissions**: Assignment submissions (metadata only)
- **grades**: Assignment grades
- **announcements**: Course announcements
- **messages**: User messages
- **notifications**: User notifications

### Supabase Storage Buckets

- **course-materials**: For storing course materials
- **profile-images**: For storing user profile images
- **submissions**: For storing assignment submissions
- **resources**: For storing course resources

## Authentication and Authorization

### Authentication

- Email/password authentication
- Social authentication (Google, GitHub, etc.)
- Email verification
- Password reset

### Authorization

- Role-based access control (RBAC)
- User roles: admin, instructor, assistant, moderator, student
- Custom claims for role-based permissions
- Security rules for Firestore and Storage

## File Storage Strategy

AIvibLMS uses a hybrid approach for file storage:

1. **Metadata in Firestore**: File metadata (name, type, owner, etc.) is stored in Firestore
2. **Actual Files in Supabase**: The files themselves are stored in Supabase Storage
3. **File References**: Firestore documents contain URLs to the files in Supabase

This approach provides:

- Cost-effective storage for large files
- Fast file serving through Supabase's CDN
- Secure access control through Firebase authentication

## Deployment Architecture

### Development Environment

- Local development server with Vite
- Firebase emulators for local testing
- Environment variables for configuration

### Production Environment

- Firebase Hosting for web application
- Firebase Authentication for user management
- Firebase Firestore for database
- Firebase Functions for serverless backend
- Supabase Storage for file storage

## Security Considerations

### Authentication Security

- Secure authentication with Firebase Auth
- Email verification
- Password policies
- Rate limiting for authentication attempts

### Data Security

- Firestore security rules for access control
- Row-level security in Supabase
- Data validation in Cloud Functions
- Input sanitization in client code

### File Security

- Secure file uploads with content type validation
- Virus scanning for uploaded files (via Cloud Functions)
- Access control for file downloads
- Signed URLs for temporary access

## Performance Considerations

### Frontend Performance

- Code splitting with React.lazy
- Memoization of expensive computations
- Optimized rendering with React.memo
- Efficient state management with Redux Toolkit

### Backend Performance

- Efficient Firestore queries with proper indexing
- Pagination for large data sets
- Caching strategies for frequently accessed data
- CDN for file serving

## Scalability Considerations

### Database Scalability

- Firestore's automatic scaling
- Efficient data modeling to avoid hotspots
- Sharding strategies for high-volume collections

### Storage Scalability

- Supabase's scalable storage
- Content delivery network for global distribution
- Efficient file organization in storage buckets

## Monitoring and Logging

### Error Monitoring

- Client-side error tracking
- Server-side error logging
- Error reporting to monitoring services

### Performance Monitoring

- Firebase Performance Monitoring
- Custom performance metrics
- User experience monitoring

## Future Considerations

### Potential Enhancements

- Real-time collaboration features
- Advanced analytics for learning outcomes
- AI-powered content recommendations
- Mobile applications with React Native

### Technology Evolution

- Evaluation of new Firebase and Supabase features
- Consideration of alternative technologies as needed
- Regular updates to dependencies and security patches

## References

- [Firebase Documentation](https://firebase.google.com/docs)
- [Supabase Documentation](https://supabase.io/docs)
- [React Documentation](https://reactjs.org/docs)
- [Material-UI Documentation](https://mui.com/getting-started/usage/)
- [Architecture Decision Records](./decisions/)
