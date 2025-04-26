# Component Technical Debt Review Template

This template provides a structured format for documenting technical debt in components. Use this template when conducting technical debt reviews as part of the component documentation process.

## Technical Debt Review for [ComponentName]

### Summary

| Category | Count | Severity | Overall Impact |
|----------|-------|----------|----------------|
| Legacy Patterns | 0 | Low | Low |
| Deprecated Props | 0 | Low | Low |
| Performance Issues | 0 | Low | Low |
| Accessibility Issues | 0 | Low | Low |
| Code Quality Issues | 0 | Low | Low |
| **Total** | **0** | **Low** | **Low** |

### Legacy Patterns

| ID | Pattern | Description | Impact | Remediation | Priority |
|----|---------|-------------|--------|-------------|----------|
| LP-001 | [Pattern Name] | [Description of the legacy pattern] | [Impact on maintainability, performance, etc.] | [Recommended remediation approach] | [High/Medium/Low] |

### Deprecated Props

| ID | Prop | Version Deprecated | Replacement | Migration Path | Breaking Change |
|----|------|-------------------|-------------|----------------|----------------|
| DP-001 | [Prop Name] | [Version] | [Replacement Prop] | [Migration instructions] | [Yes/No] |

### Required Future Optimizations

| ID | Optimization | Description | Benefit | Complexity | Priority |
|----|--------------|-------------|---------|------------|----------|
| RFO-001 | [Optimization Name] | [Description of the optimization] | [Expected benefit] | [High/Medium/Low] | [High/Medium/Low] |

### Code Quality Issues

| ID | Issue | Description | Impact | Remediation | Priority |
|----|-------|-------------|--------|-------------|----------|
| CQ-001 | [Issue Name] | [Description of the code quality issue] | [Impact on maintainability, readability, etc.] | [Recommended remediation approach] | [High/Medium/Low] |

### Performance Issues

| ID | Issue | Description | Impact | Remediation | Priority |
|----|-------|-------------|--------|-------------|----------|
| PI-001 | [Issue Name] | [Description of the performance issue] | [Impact on user experience, resource usage, etc.] | [Recommended remediation approach] | [High/Medium/Low] |

### Accessibility Issues

| ID | Issue | WCAG Criterion | Impact | Remediation | Priority |
|----|-------|----------------|--------|-------------|----------|
| AI-001 | [Issue Name] | [WCAG criterion] | [Impact on accessibility] | [Recommended remediation approach] | [High/Medium/Low] |

### Technical Debt Roadmap

| ID | Issue | Priority | Estimated Effort | Target Version | Dependencies |
|----|-------|----------|------------------|----------------|--------------|
| [ID] | [Issue summary] | [High/Medium/Low] | [Story points or days] | [Target version] | [Dependencies] |

### Migration Guide for Deprecated Features

```jsx
// Old usage (deprecated)
<ComponentName deprecatedProp="value" />

// New usage (recommended)
<ComponentName newProp="value" />
```

### Additional Notes

[Any additional notes or context about the technical debt in this component]

## Severity Definitions

| Severity | Definition |
|----------|------------|
| **High** | Critical issues that significantly impact maintainability, performance, or user experience. Should be addressed in the next release. |
| **Medium** | Important issues that have moderate impact. Should be addressed in the next few releases. |
| **Low** | Minor issues with limited impact. Can be addressed when convenient or as part of larger refactoring efforts. |

## Priority Definitions

| Priority | Definition |
|----------|------------|
| **High** | Should be addressed as soon as possible, ideally in the next sprint. |
| **Medium** | Should be addressed in the next 2-3 sprints. |
| **Low** | Can be addressed when convenient or as part of larger refactoring efforts. |

## Technical Debt Review Process

1. **Identify**: Review component code and identify technical debt issues
2. **Categorize**: Categorize issues by type (legacy patterns, deprecated props, etc.)
3. **Assess**: Determine severity and priority for each issue
4. **Document**: Document issues using this template
5. **Plan**: Create a roadmap for addressing the technical debt
6. **Track**: Add issues to the project tracking system with appropriate labels

## Common Technical Debt Patterns to Look For

### Legacy Patterns

- Direct DOM manipulation instead of React patterns
- Class components that could be functional components
- Mixins or higher-order components that could use hooks
- Prop drilling instead of context or state management
- Inline styles instead of styled components or CSS modules
- Imperative code instead of declarative patterns

### Deprecated Props and APIs

- Props that have been replaced by newer alternatives
- Usage of deprecated React lifecycle methods
- Usage of deprecated DOM APIs
- Usage of deprecated third-party library APIs
- Usage of deprecated browser APIs

### Performance Issues

- Unnecessary re-renders
- Missing memoization
- Inefficient rendering patterns
- Large component bundles
- Expensive calculations in render methods
- Inefficient state updates

### Code Quality Issues

- Duplicated code
- Overly complex components
- Poor separation of concerns
- Inconsistent naming conventions
- Inadequate error handling
- Missing or outdated tests
- Inadequate documentation

### Accessibility Issues

- Missing ARIA attributes
- Improper semantic HTML
- Keyboard navigation issues
- Color contrast issues
- Screen reader compatibility issues
