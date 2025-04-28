# Architecture Documentation

This directory contains architecture documentation for the AIvibLMS (Hypatia Modern LMS) platform.

## Architecture Overview

AIvibLMS is built using a component-based architecture with the following key characteristics:

- **Frontend**: React 18+ with functional components and hooks
- **State Management**: Redux Toolkit with Context API for local state
- **API Layer**: Service abstraction over Firebase and Supabase
- **Data Storage**: Firestore/Firebase Realtime Database
- **File Storage**: Supabase Storage for user-generated content
- **Authentication**: Firebase Authentication
- **Hosting**: Firebase Hosting

## Documentation Structure

- `/decisions` - Architecture Decision Records (ADRs)
- `/diagrams` - Architecture diagrams and visual representations
- `/specifications` - Detailed specifications for components and services
- `architecture-overview.md` - Comprehensive overview of the system architecture
- `file-storage-strategy.md` - Detailed documentation of the hybrid file storage approach

## Architecture Principles

1. **User-Centered Design**: Prioritize user experience in architectural decisions
2. **Modularity**: Design loosely coupled components with clear boundaries
3. **Scalability**: Design for horizontal scalability and performance
4. **Security**: Implement security at all layers
5. **Maintainability**: Create consistent patterns and comprehensive documentation
6. **Cloud-Native**: Leverage managed services and automated scaling

## Key Architecture Decisions

| ADR ID | Title | Status | Date |
|--------|-------|--------|------|
| ADR-001 | Frontend Framework Selection | Accepted | 2023-07-17 |
| ADR-002 | State Management Approach | Proposed | 2023-07-18 |
| ADR-003 | UI Component Library Selection | Proposed | 2023-07-18 |
| ADR-004 | Build System Selection | Proposed | 2023-07-19 |
| ADR-005 | API Layer Design | Proposed | 2023-07-20 |
| ADR-006 | Data Storage Strategy | Proposed | 2023-07-21 |
| ADR-007 | Authentication and Authorization | Not Started | - |
| ADR-008 | Deployment and DevOps | Not Started | - |
| ADR-0001 | Hybrid Firebase/Supabase Approach | Accepted | 2023-05-01 |

## Architecture Decision Records (ADRs)

Architecture decisions are documented using ADRs. See the `/decisions` directory for all ADRs.

## Progress Summary

| Component | Status | Notes |
|-----------|--------|-------|
| Architecture Vision | Completed | See Architecture_Vision.md |
| Frontend Framework | Decided | React 18+ with functional components and hooks |
| State Management | Proposed | Redux Toolkit with Context API for local state |
| UI Component Library | Proposed | Material-UI (MUI) v5+ |
| Build System | Proposed | Vite for development and production builds |
| API Layer | Proposed | Service-based abstraction with RTK Query |
| Data Storage | Decided | Firestore with migration from Realtime Database |
| File Storage | Decided | Supabase Storage for user-generated content |
| Authentication | Proposed | Firebase Authentication with custom claims and RBAC |
| Deployment & DevOps | Proposed | GitHub Actions, Firebase Hosting, Terraform |
| User Experience | Completed | Dashboard, Profiles, Forums, Notifications documented |
| Analytics | Completed | Reporting and Analytics features documented |
| Workflows | Completed | 10 of 10 key workflows documented |

## Next Steps

1. **Critical Security Improvements** (Highest Priority)
   - Update Firebase database security rules
   - Implement basic RBAC in Firebase Authentication
   - Address high-priority XSS vulnerabilities
   - Add security scanning to development process

2. **Technical Debt Reduction**
   - Create component inventory and modernization tracking
   - Begin converting class components to functional components
   - Start removing jQuery dependencies
   - Implement TypeScript in new components

3. **Testing Implementation**
   - Set up testing framework (Jest, React Testing Library)
   - Create test templates and guidelines
   - Begin writing tests for critical components
   - Set up CI integration for testing

4. **Architecture Implementation**
   - Review and finalize all proposed architecture decisions
   - Begin project infrastructure setup based on ADR-008
   - Create implementation plan for Core Framework phase
   - Set up development repository with the defined structure
   - Configure build system based on ADR-004

5. **Documentation and Design**
   - Create component architecture diagram
   - Design data model
   - Define API specifications
   - Create proof-of-concept implementations for high-risk areas
