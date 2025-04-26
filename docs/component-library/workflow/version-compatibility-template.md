# Component Version Compatibility Matrix Template

This template provides a structured format for documenting component version compatibility. Use this template when creating version compatibility matrices as part of the component documentation process.

## Version Compatibility Matrix for [ComponentName]

### Framework Compatibility

| Framework Version | Compatible | Notes |
|-------------------|------------|-------|
| React 16.8+ | ✅ Yes | Requires hooks support |
| React 16.0-16.7 | ❌ No | No hooks support |
| React 17.x | ✅ Yes | Fully compatible |
| React 18.x | ✅ Yes | Fully compatible |

### Browser Compatibility

| Browser | Minimum Version | Notes |
|---------|----------------|-------|
| Chrome | 60+ | Full support |
| Firefox | 55+ | Full support |
| Safari | 11+ | Full support |
| Edge | 79+ | Full support |
| IE | ❌ Not supported | No support for IE |

### Component Version History

| Version | Release Date | Compatible With App Version | Breaking Changes | New Features | Bug Fixes |
|---------|-------------|----------------------------|-----------------|-------------|-----------|
| 1.0.0 | YYYY-MM-DD | 1.0.0 - 1.5.0 | N/A | Initial release | N/A |
| 1.1.0 | YYYY-MM-DD | 1.0.0 - 2.0.0 | No | Added prop X | Fixed issue with Y |
| 2.0.0 | YYYY-MM-DD | 1.5.0 - current | Yes (see below) | Redesigned interface | Fixed accessibility issues |

### Breaking Changes

#### Version 2.0.0

1. **Renamed Props**
   - `oldProp` renamed to `newProp`
   - `anotherOldProp` renamed to `anotherNewProp`

2. **Removed Props**
   - `deprecatedProp` removed, use `alternativeProp` instead
   - `anotherDeprecatedProp` removed with no replacement

3. **Changed Behavior**
   - Default value of `someProp` changed from `'old'` to `'new'`
   - Event handling for `onSomeEvent` now passes different parameters

4. **Changed DOM Structure**
   - Root element changed from `div` to `section`
   - Child elements restructured for better accessibility

### Migration Guides

#### Migrating from 1.x to 2.0

```jsx
// Old usage (1.x)
<ComponentName
  oldProp="value"
  deprecatedProp="value"
  anotherOldProp="value"
  someProp="customValue"
  onSomeEvent={handleOldEvent}
/>

// New usage (2.0)
<ComponentName
  newProp="value"
  alternativeProp="value"
  anotherNewProp="value"
  someProp="customValue" // Note: If you relied on the default, you may need to update
  onSomeEvent={handleNewEvent} // Note: Event handler needs to be updated
/>

// Old event handler
const handleOldEvent = (value) => {
  console.log(value);
};

// New event handler
const handleNewEvent = (value, metadata) => {
  console.log(value, metadata);
};
```

### Dependency Requirements

| Dependency | Required Version | Notes |
|------------|------------------|-------|
| styled-components | >=5.0.0 | Required for styling |
| @material-ui/core | >=4.0.0 | Optional - used for icons |
| react-transition-group | >=4.0.0 | Required for animations |

### Feature Support Matrix

| Feature | Added in Version | Deprecated in Version | Removed in Version | Notes |
|---------|------------------|----------------------|-------------------|-------|
| Feature A | 1.0.0 | - | - | Core feature |
| Feature B | 1.1.0 | - | - | Added in 1.1.0 |
| Feature C | 1.0.0 | 1.5.0 | 2.0.0 | Use Feature D instead |
| Feature D | 1.5.0 | - | - | Replacement for Feature C |

### Prop Support Matrix

| Prop | Added in Version | Deprecated in Version | Removed in Version | Replacement | Notes |
|------|------------------|----------------------|-------------------|-------------|-------|
| propA | 1.0.0 | - | - | - | Core prop |
| oldProp | 1.0.0 | 1.5.0 | 2.0.0 | newProp | Renamed for clarity |
| deprecatedProp | 1.0.0 | 1.5.0 | 2.0.0 | alternativeProp | Functionality changed |
| newFeatureProp | 2.0.0 | - | - | - | Added in 2.0.0 |

### Known Issues

| Issue | Affected Versions | Fixed in Version | Workaround | Notes |
|-------|-------------------|-----------------|------------|-------|
| Issue A | 1.0.0 - 1.1.0 | 1.2.0 | [Workaround description] | [Additional notes] |
| Issue B | 1.5.0 - 2.0.0 | Not fixed | [Workaround description] | [Additional notes] |

### Future Deprecations

| Feature/Prop | Current Version | Planned Deprecation | Planned Removal | Replacement | Notes |
|--------------|-----------------|---------------------|----------------|-------------|-------|
| Feature E | 2.0.0 | 2.5.0 | 3.0.0 | Feature F | Will be replaced by more flexible Feature F |
| propB | 2.0.0 | 2.5.0 | 3.0.0 | propC | Will be renamed for consistency |

## How to Use This Template

1. Replace `[ComponentName]` with the actual component name
2. Fill in all relevant tables with accurate information
3. Remove any tables that are not applicable to the component
4. Add component-specific information as needed
5. Ensure all version numbers and dates are accurate
6. Provide detailed migration guides for breaking changes
7. Include code examples for all migration scenarios
