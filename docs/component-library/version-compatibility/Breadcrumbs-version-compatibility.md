# Version Compatibility Matrix for Breadcrumbs

## Framework Compatibility

| Framework Version | Compatible | Notes |
|-------------------|------------|-------|
| React 16.8+ | ✅ Yes | Fully compatible (uses hooks) |
| React 16.0-16.7 | ❌ No | Not compatible (uses hooks) |
| React 17.x | ✅ Yes | Fully compatible |
| React 18.x | ✅ Yes | Fully compatible |
| React Router 5.x | ✅ Yes | Fully compatible |
| React Router 6.x | ✅ Yes | Fully compatible |
| Redux 4.x | ✅ Yes | Fully compatible |
| TypeScript 4.x | ✅ Yes | Fully compatible |
| TypeScript 3.x | ⚠️ Partial | May require type adjustments |
| CSS Modules | ✅ Yes | Used for styling |
| styled-components | ❌ No | Not currently used, planned for future versions |

## Browser Compatibility

| Browser | Minimum Version | Notes |
|---------|----------------|-------|
| Chrome | 60+ | Full support |
| Firefox | 55+ | Full support |
| Safari | 11+ | Full support |
| Edge | 16+ | Full support |
| IE | 11 | Not supported (uses modern JS features) |
| iOS Safari | 11+ | Full support |
| Android Chrome | 60+ | Full support |

## Component Version History

| Version | Release Date | Compatible With App Version | Breaking Changes | New Features | Bug Fixes |
|---------|-------------|----------------------------|-----------------|-------------|-----------|
| 1.0.0 | 2022-03-15 | 1.0.0 - current | N/A | Initial implementation with basic breadcrumbs | N/A |
| 1.1.0 | 2022-05-20 | 1.0.0 - current | No | Added Redux integration | Fixed styling issues |
| 1.2.0 | 2022-07-10 | 1.0.0 - current | No | Improved styling and accessibility | Fixed layout issues |
| 2.0.0 | 2023-01-25 | 1.5.0 - current | Yes | Refactored to TypeScript | Fixed various issues |

## Breaking Changes

### Version 2.0.0

The component was refactored to TypeScript in version 2.0.0, which introduced the following breaking changes:

1. **Stricter Type Checking**: Props are now strictly typed, so passing incorrect prop types will result in TypeScript errors
2. **React 16.8+ Required**: The component now uses React hooks, requiring React 16.8 or higher
3. **Redux Store Structure**: The component expects breadcrumbs to be in a specific location in the Redux store

## Migration Guides

### Migrating from 1.x to 2.0

```jsx
// Old usage (1.x)
<Breadcrumbs location={location} />

// New usage (2.0)
// Make sure your Redux store has the correct structure:
// state.mainReducer.breadcrumbs = [{ name: string, path: string }, ...]
<Breadcrumbs location={location} />
```

## Dependency Requirements

| Dependency | Required Version | Notes |
|------------|------------------|-------|
| react | >=16.8.0 | Required for hooks |
| react-dom | >=16.8.0 | Required for hooks |
| react-router-dom | >=5.0.0 | Required for navigation |
| react-redux | >=7.0.0 | Required for Redux integration |
| redux | >=4.0.0 | Required for Redux integration |
| typescript | >=3.7.0 | Required for type definitions in v2.0.0+ |

## Feature Support Matrix

| Feature | Added in Version | Deprecated in Version | Removed in Version | Notes |
|---------|------------------|----------------------|-------------------|-------|
| Basic breadcrumbs | 1.0.0 | - | - | Core feature |
| Redux integration | 1.1.0 | - | - | Added in 1.1.0 |
| Improved styling | 1.2.0 | - | - | Added in 1.2.0 |
| TypeScript support | 2.0.0 | - | - | Added in 2.0.0 |

## Prop Support Matrix

| Prop | Added in Version | Deprecated in Version | Removed in Version | Replacement | Notes |
|------|------------------|----------------------|-------------------|-------------|-------|
| location | 1.0.0 | - | - | - | Core prop |

## Known Issues

| Issue | Affected Versions | Fixed in Version | Workaround | Notes |
|-------|-------------------|-----------------|------------|-------|
| Layout issues with long breadcrumb titles | 1.0.0 - 1.1.0 | 1.2.0 | Use shorter titles | Fixed in 1.2.0 |
| Missing ARIA attributes | 1.0.0 - current | Planned for 2.1.0 | Add ARIA attributes manually | Scheduled for 2.1.0 |
| Redux coupling | 1.1.0 - current | Planned for 2.2.0 | Pass breadcrumbs directly as a prop | Scheduled for 2.2.0 |

## Future Deprecations

| Feature/Prop | Current Version | Planned Deprecation | Planned Removal | Replacement | Notes |
|--------------|-----------------|---------------------|----------------|-------------|-------|
| CSS file imports | 2.0.0 | 3.0.0 | 4.0.0 | styled-components | Will be replaced with styled-components for better encapsulation |
| Redux-only breadcrumbs | 2.0.0 | 2.2.0 | 3.0.0 | Direct breadcrumbs prop | Will add a direct breadcrumbs prop with Redux as fallback |
