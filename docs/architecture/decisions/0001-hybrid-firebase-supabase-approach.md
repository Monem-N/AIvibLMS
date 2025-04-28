# ADR 0001: Hybrid Firebase/Supabase Approach for AIvibLMS

## Status

Accepted

## Context

AIvibLMS requires a robust backend solution that can handle:

- User authentication and management
- Database operations for courses, assignments, and other educational content
- Storage for user-generated files (images, audio, video, documents)

We initially considered using Firebase for all backend needs, but identified some limitations with Firebase Storage, particularly around cost and flexibility for handling large media files.

## Decision

We have decided to implement a hybrid approach:

- **Firebase** for authentication and database (Firestore)
- **Supabase** for file storage

This decision leverages the strengths of both platforms:

### Firebase Strengths (Auth & Database)

- Mature authentication system with multiple providers
- Real-time database capabilities with Firestore
- Seamless integration with other Google services
- Robust security rules and custom claims for role-based access

### Supabase Strengths (Storage)

- SQL-based storage with powerful querying capabilities
- Generous free tier (1GB storage)
- Simple API for file operations
- Built-in CDN for fast content delivery
- Cost-effective for storing and serving large media files

## Consequences

### Positive

- More cost-effective solution for file storage
- Better performance for serving media files through Supabase's CDN
- Simplified file management with Supabase's storage API
- Continued use of Firebase's robust authentication and database features

### Negative

- Increased complexity with two backend services
- Need to manage two sets of credentials and configurations
- Potential for increased latency when operations span both services
- Additional learning curve for developers to understand both systems

### Mitigations

- Created abstraction layers (`fileService.ts`) to hide the complexity of the hybrid approach
- Developed reusable components for file operations
- Documented the approach thoroughly for future developers
- Implemented proper error handling for cross-service operations

## Implementation Details

1. **Firebase** handles:
   - User authentication and session management
   - User profile data and permissions
   - Course, module, and assignment data
   - Real-time features like notifications and messaging

2. **Supabase** handles:
   - Profile images
   - Course materials (documents, presentations)
   - Assignment submissions
   - Media resources (images, audio, video)

## Alternatives Considered

1. **Firebase-only approach**: Would provide a unified backend but at higher costs for storage and potentially lower performance for media-heavy applications.

2. **Supabase-only approach**: Would provide excellent storage capabilities but would require migrating authentication and database from Firebase, increasing development time.

3. **Custom server with S3**: Would provide maximum flexibility but significantly increase development and maintenance complexity.

The hybrid approach provides the best balance of capabilities, cost, and development effort for our specific needs.
