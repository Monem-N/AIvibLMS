# Hypatia-Modern Component Catalog

## Project Overview

**Framework Goals**:

- 🎯 Accessibility-First Design (WCAG 2.1 AA compliance)
- 🌐 Cross-Platform Compatibility (Web, Mobile, Desktop)
- ⚡ Performance Optimization (Lighthouse Score >95)
- 🧩 Atomic Design Methodology
- 🎨 Theming System with CSS-in-JS

**Core Principles**:

1. Strict TypeScript enforcement
2. Framework-agnostic core components
3. Mobile-first responsive design
4. Automated accessibility testing
5. Zero external CSS dependencies

## Component Catalog

1. **Core Components**

- `CourseActions.jsx` (JSX)
- `CourseDescription.jsx` (JSX)
- `CourseDescriptionFixed.jsx` (JSX)

2. **Activity Components**

- `ActivityContent.tsx` (TSX)
- `ActivityDetailModern.tsx` (TSX)
- `ActivityFeedback.tsx` (TSX)
- `ActivityHeader.tsx` (TSX)
- `ActivityNavigation.tsx` (TSX)
- `ActivitySubmission.tsx` (TSX)

3. **Authentication Components**

- `ForgotPasswordModern.tsx` (TSX)
- `PrivateRoute.tsx` (TSX)
- `SignInModern.tsx` (TSX)
- `SignUpModern.tsx` (TSX)
- `VerifyEmailModern.tsx` (TSX)

4. **Common UI Components**

- `Breadcrumbs.jsx`/`Breadcrumbs.tsx` (JSX/TSX)
- `ErrorMessage.tsx` (TSX)
- `LoadingSpinner.tsx` (TSX)
- `NotificationModern.tsx` (TSX)
- `Button.tsx` (TSX)

5. **Course Management**

- `CourseAnnouncements.tsx` (TSX)
- `CourseDetailModern.tsx` (TSX)
- `CourseHeader.tsx` (TSX)
- `CourseModules.tsx` (TSX)
- `CourseParticipants.tsx` (TSX)
- `CourseResources.tsx` (TSX)
- `CourseTabs.tsx` (TSX)

6. **Editor Components**

- `ActivityEditor.tsx` (TSX)
- `CourseEditorModern.tsx` (TSX)
- `CourseEditorForm.tsx` (TSX)
- `ModuleEditor.tsx` (TSX)
- `ResourceEditor.tsx` (TSX)

7. **Dashboard Components**

- `DashboardModern.tsx` (TSX)
- `DashboardWidget.tsx` (TSX)
- `ActivitiesWidget.tsx` (TSX)
- `AnnouncementsWidget.tsx` (TSX)
- `CalendarWidget.tsx` (TSX)

8. **Navigation**

- `Navigation.tsx` (TSX)
- `TopNavModern.tsx` (TSX)

9. **Form Components**

- `Checkbox.tsx` (TSX)
- `Input.tsx` (TSX)
- `Select.tsx` (TSX)

10. **Grading Components**

- `GradingDashboardModern.tsx` (TSX)
- `SubmissionGraderModern.tsx` (TSX)
- `SubmissionsList.tsx` (TSX)

**Architecture Notes**:

- Organized using feature-based directory structure
- Mix of modern TypeScript (TSX) and legacy JSX components
- Follows React patterns with presentational/container separation
- All new components use CSS-in-JS theming system

## Integration Matrix

| Component | Web | Mobile (RN) | Desktop (Electron) | React | Vue | Angular |
|-----------|-----|-------------|--------------------|-------|-----|---------|
| PrimaryButton | ✅ | ✅ | ✅ | ✅ | v2+ | v15+ |
| DataTable | ✅ | Partial | ✅ | ✅ | ❌ | ❌ |
| LineChart | ✅ | ✅ | ✅ | ✅ | Plugin | ❌ |
| ThemeProvider | ✅ | ✅ | ✅ | ✅ | Adapter | Wrapper |

## Versioning & Roadmap

**Current (v2.3)**:

- Dark mode enhancements
- Mobile gesture support
- Tree-shaking optimization

**Q4 2024**:

- Figma design token sync
- Web Components export
- Accessibility audit toolkit

## Glossary

- **Atomic Design**: Component hierarchy methodology
- **WCAG 2.1**: Web accessibility standards
- **CSS-in-JS**: Runtime CSS generation technique
- **ARIA**: Accessible Rich Internet Applications
- **RTL**: Right-to-Left text support
