# Hypatia LMS Component Library

This documentation provides a comprehensive guide to the reusable components in the Hypatia LMS modernization project. The component library is designed to ensure consistency, improve developer efficiency, and reduce technical debt.

## Component Categories

The component library is organized into the following categories:

- **[UI Components](./ui/README.md)**: Basic UI elements such as buttons, cards, modals, etc.
- **[Form Components](./form/README.md)**: Form elements and validation components
- **[Navigation Components](./navigation/README.md)**: Navigation elements such as menus, breadcrumbs, etc.
- **[Data Components](./data/README.md)**: Data display components such as tables, lists, charts, etc.
- **[Feature-Specific Components](./feature-specific/README.md)**: Components specific to features such as grading, course management, etc.

## Using This Documentation

Each component documentation includes:

- Component purpose and usage
- Props/parameters with types and descriptions
- Examples with code snippets
- Accessibility considerations
- Edge cases and limitations
- Related components

## Component Development Guidelines

When creating new components for the Hypatia LMS, follow these guidelines:

1. **Reusability**: Design components to be reusable across different parts of the application
2. **Composability**: Create small, focused components that can be composed together
3. **Accessibility**: Ensure components meet WCAG 2.1 AA standards
4. **Responsiveness**: Design components to work across different screen sizes
5. **Performance**: Optimize components for performance
6. **Documentation**: Document components according to the standards in this library

## Contributing to the Component Library

To add or update component documentation:

1. Identify the appropriate category for the component
2. Create or update the component documentation file
3. Follow the documentation template
4. Submit a pull request for review

## Documentation Template

Use the following template when documenting components:

```markdown
# ComponentName

## Description

Brief description of the component and its purpose.

## Usage

```tsx
import { ComponentName } from 'components/path/to/ComponentName';

<ComponentName prop1="value" prop2={value} />
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| prop1 | string | - | Yes | Description of prop1 |
| prop2 | number | 0 | No | Description of prop2 |

## Examples

### Basic Example

```tsx
<ComponentName prop1="value" />
```

### Advanced Example

```tsx
<ComponentName 
  prop1="value"
  prop2={42}
  prop3={() => console.log('callback')}
/>
```

## Accessibility

Accessibility considerations for this component.

## Edge Cases

Known edge cases and limitations.

## Related Components

- [RelatedComponent1](./RelatedComponent1.md)
- [RelatedComponent2](./RelatedComponent2.md)
```

## Interactive Examples

Interactive examples of components are available in Storybook. To run Storybook locally:

```bash
cd hypatia-modern
npm run storybook
```

## Maintenance

This component library documentation is maintained by the Frontend Lead. If you have questions or suggestions, please contact [frontend-lead@example.com](mailto:frontend-lead@example.com).
