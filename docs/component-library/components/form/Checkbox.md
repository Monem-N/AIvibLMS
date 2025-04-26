# Checkbox

The Checkbox component is used in the Hypatia LMS for collecting boolean input and multiple selections in forms.

## Description

The Checkbox component provides a standardized checkbox input with support for various states, sizes, and variants. It is used throughout the application in forms, settings, and preference interfaces where users need to make boolean choices or select multiple options from a list. The component supports labels, helper text, error messages, and various styling options to ensure consistency and usability across the platform.

## Visual Examples

### Checkbox Variants Display

![Checkbox Variants](https://i.imgur.com/XYZ123.png)

From left to right: Outlined (default) and Filled variants

### Checkbox States Display

![Checkbox States](https://i.imgur.com/ABC456.png)

From top to bottom: Unchecked, Checked, Indeterminate, Disabled, and Error states

## Usage

```tsx
import { Checkbox } from 'components/form/Checkbox';

<Checkbox 
  label="Accept terms and conditions"
  onChange={handleChange}
/>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| label | string | - | No | The label for the checkbox |
| helperText | string | - | No | Helper text to display below the checkbox |
| error | string | - | No | Error message to display below the checkbox |
| size | 'small' \| 'medium' \| 'large' | 'medium' | No | The size of the checkbox |
| variant | 'outlined' \| 'filled' | 'outlined' | No | The variant of the checkbox |
| indeterminate | boolean | false | No | Whether the checkbox is in an indeterminate state |
| fullWidth | boolean | false | No | Whether the checkbox should take up the full width of its container |
| disabled | boolean | false | No | Whether the checkbox is disabled |
| checked | boolean | - | No | Whether the checkbox is checked (controlled) |
| defaultChecked | boolean | - | No | Whether the checkbox is initially checked (uncontrolled) |
| className | string | - | No | Additional CSS class names |
| id | string | - | No | The ID of the checkbox element |

In addition to these props, the Checkbox component accepts all standard HTML input attributes (e.g., `name`, `required`, `autoComplete`, etc.) as it extends the `React.InputHTMLAttributes<HTMLInputElement>` interface.

## Type Definitions

```tsx
export type CheckboxSize = 'small' | 'medium' | 'large';
export type CheckboxVariant = 'outlined' | 'filled';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * The label for the checkbox
   */
  label?: string;
  
  /**
   * Helper text to display below the checkbox
   */
  helperText?: string;
  
  /**
   * Error message to display below the checkbox
   */
  error?: string;
  
  /**
   * The size of the checkbox
   * @default 'medium'
   */
  size?: CheckboxSize;
  
  /**
   * The variant of the checkbox
   * @default 'outlined'
   */
  variant?: CheckboxVariant;
  
  /**
   * Whether the checkbox is indeterminate
   * @default false
   */
  indeterminate?: boolean;
  
  /**
   * Whether the checkbox should take up the full width of its container
   * @default false
   */
  fullWidth?: boolean;
}
```

## Examples

### Basic Example

```tsx
<Checkbox
  label="Remember me"
/>
```

### Checkbox with Helper Text and Error

```tsx
<Checkbox 
  label="Accept terms and conditions"
  helperText="You must accept the terms to continue"
  error={!accepted ? "Please accept the terms and conditions" : undefined}
  required
/>
```

### Checkbox Variants

```tsx
<>
  <Checkbox 
    label="Outlined Checkbox"
    variant="outlined"
  />
  
  <Checkbox 
    label="Filled Checkbox"
    variant="filled"
  />
</>
```

### Checkbox Sizes

```tsx
<>
  <Checkbox 
    label="Small Checkbox"
    size="small"
  />
  
  <Checkbox 
    label="Medium Checkbox"
    size="medium"
  />
  
  <Checkbox 
    label="Large Checkbox"
    size="large"
  />
</>
```

### Indeterminate Checkbox

```tsx
<Checkbox 
  label="Select All"
  indeterminate={someSelected && !allSelected}
  checked={allSelected}
  onChange={handleSelectAll}
/>
```

### Disabled Checkbox

```tsx
<Checkbox 
  label="Disabled Checkbox"
  disabled
/>
```

### Checkbox Group

```tsx
const [selected, setSelected] = useState(['option1']);

const handleChange = (e) => {
  const { value, checked } = e.target;
  if (checked) {
    setSelected([...selected, value]);
  } else {
    setSelected(selected.filter(item => item !== value));
  }
};

return (
  <div>
    <Checkbox
      label="Option 1"
      value="option1"
      checked={selected.includes('option1')}
      onChange={handleChange}
    />
    <Checkbox
      label="Option 2"
      value="option2"
      checked={selected.includes('option2')}
      onChange={handleChange}
    />
    <Checkbox
      label="Option 3"
      value="option3"
      checked={selected.includes('option3')}
      onChange={handleChange}
    />
  </div>
);
```

## Features

1. **Multiple Variants**: Supports outlined and filled checkbox styles to match different design requirements
2. **Size Options**: Available in small, medium, and large sizes for different contexts
3. **Error Handling**: Built-in error display with visual indicators and error messages
4. **Helper Text**: Support for helper text to provide additional context to users
5. **Indeterminate State**: Support for the indeterminate state for parent-child checkbox relationships
6. **Accessibility**: Fully accessible with proper ARIA attributes and keyboard navigation
7. **Form Integration**: Seamlessly integrates with form libraries and native HTML form functionality
8. **Customization**: Supports custom styling through className prop and styled-components

## Form Integration

The Checkbox component is designed to work seamlessly with both native HTML forms and form libraries like Formik and React Hook Form:

### Native HTML Forms

```tsx
<form onSubmit={handleSubmit}>
  <Checkbox
    name="terms"
    label="I accept the terms and conditions"
    required
  />
  <Checkbox
    name="newsletter"
    label="Subscribe to newsletter"
  />
  <button type="submit">Submit</button>
</form>
```

### Formik Integration

```tsx
import { Formik, Form, Field } from 'formik';

<Formik
  initialValues={{ terms: false, newsletter: false }}
  validate={values => {
    const errors = {};
    if (!values.terms) {
      errors.terms = 'You must accept the terms and conditions';
    }
    return errors;
  }}
  onSubmit={handleSubmit}
>
  {({ errors, touched, values, setFieldValue }) => (
    <Form>
      <Field name="terms">
        {({ field }) => (
          <Checkbox
            {...field}
            label="I accept the terms and conditions"
            error={touched.terms && errors.terms}
            checked={values.terms}
            onChange={e => setFieldValue('terms', e.target.checked)}
          />
        )}
      </Field>
      <Field name="newsletter">
        {({ field }) => (
          <Checkbox
            {...field}
            label="Subscribe to newsletter"
            checked={values.newsletter}
            onChange={e => setFieldValue('newsletter', e.target.checked)}
          />
        )}
      </Field>
      <button type="submit">Submit</button>
    </Form>
  )}
</Formik>
```

### React Hook Form Integration

```tsx
import { useForm } from 'react-hook-form';

const { register, handleSubmit, formState: { errors } } = useForm();

<form onSubmit={handleSubmit(onSubmit)}>
  <Checkbox
    label="I accept the terms and conditions"
    error={errors.terms?.message}
    {...register('terms', { 
      required: 'You must accept the terms and conditions'
    })}
  />
  <Checkbox
    label="Subscribe to newsletter"
    {...register('newsletter')}
  />
  <button type="submit">Submit</button>
</form>
```

## Accessibility

The Checkbox component is designed to be fully accessible according to WCAG 2.1 guidelines:

### Keyboard Navigation

- The checkbox is focusable using the Tab key
- When focused, the checkbox can be toggled using Space
- Focus is visually indicated with a clear outline

### Screen Reader Support

- The checkbox has an accessible name provided by the label
- Error messages are announced to screen readers
- Helper text is linked to the checkbox using aria-describedby
- Required checkboxes are properly marked with the required attribute
- The checked and indeterminate states are announced to screen readers

### ARIA Attributes

- `aria-invalid`: Set to true when the checkbox has an error
- `aria-describedby`: Links the checkbox to its helper text or error message
- `aria-required`: Indicates that the checkbox is required
- `aria-disabled`: Indicates that the checkbox is disabled
- `aria-checked`: Indicates the checked state of the checkbox

### Color Contrast

- All text meets WCAG AA contrast requirements (4.5:1 for normal text)
- Error states use colors that meet contrast requirements
- Focus indicators have sufficient contrast (3:1 minimum)
- Checked state has sufficient contrast with background

### Focus Management

- Focus is clearly visible with a distinct outline
- Focus states are consistent across all checkbox variants
- Focus indicators are visible in both light and dark themes

## Edge Cases

- **No Label**: When no label is provided, the checkbox still functions correctly but may be less accessible. It's recommended to always provide a label.
- **Long Label Text**: When label text is very long, it wraps naturally and maintains proper alignment with the checkbox.
- **Error State with Helper Text**: When both error and helperText props are provided, the error message takes precedence and the helper text is not displayed.
- **Disabled with Required**: When both disabled and required props are true, the required visual indicator is still shown, but the checkbox cannot be interacted with.
- **RTL Support**: The component supports right-to-left languages, with appropriate text alignment and checkbox positioning.
- **Controlled vs Uncontrolled**: The component can be used in both controlled and uncontrolled modes, with appropriate handling of checked/defaultChecked props.
- **Form Reset**: When a form is reset, the checkbox value is cleared if it's uncontrolled, or reset to the controlled value if it's controlled.
- **Indeterminate State**: The indeterminate state is only visual and doesn't affect the checked value. When clicked, an indeterminate checkbox becomes checked.

## Implementation Details

The Checkbox component is implemented using styled-components with a focus on accessibility and customization:

```tsx
// Simplified implementation
import React, { forwardRef } from 'react';
import styled from 'styled-components';

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  label,
  helperText,
  error,
  size = 'medium',
  variant = 'outlined',
  indeterminate = false,
  fullWidth = false,
  disabled = false,
  id,
  className,
  ...rest
}, ref) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substring(2, 9)}`;
  const hasError = !!error;
  const displayHelperText = error || helperText;
  
  // Handle indeterminate state
  React.useEffect(() => {
    if (ref && 'current' in ref && ref.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate, ref]);
  
  return (
    <CheckboxContainer
      size={size}
      variant={variant}
      fullWidth={fullWidth}
      hasError={hasError}
      disabled={disabled}
      className={className}
    >
      <CheckboxWrapper>
        <HiddenInput
          type="checkbox"
          id={checkboxId}
          ref={ref}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={displayHelperText ? `${checkboxId}-helper-text` : undefined}
          {...rest}
        />
        <CheckboxControl className="checkbox-control" />
        {label && (
          <CheckboxLabel htmlFor={checkboxId} hasError={hasError}>
            {label}
          </CheckboxLabel>
        )}
      </CheckboxWrapper>
      
      {displayHelperText && (
        <HelperText
          id={`${checkboxId}-helper-text`}
          hasError={hasError}
        >
          {displayHelperText}
        </HelperText>
      )}
    </CheckboxContainer>
  );
});
```

## Technical Debt

The Checkbox component has minimal technical debt, with only a few low-severity issues identified:

### Code Quality Issues

| ID | Issue | Description | Impact | Remediation | Priority |
|----|-------|-------------|--------|-------------|----------|
| CQ-001 | Magic Numbers | Uses hard-coded numbers without explanation | Reduces code readability and maintainability | Extract magic numbers to named constants | Low |
| CQ-002 | Duplicate Styling Logic | Shares styling logic with other form components | Increases maintenance burden when styles change | Extract shared styling to a common utility | Low |

### Technical Debt Roadmap

| ID | Issue | Priority | Estimated Effort | Target Version | Dependencies |
|----|-------|----------|------------------|----------------|--------------|
| CQ-001 | Code Quality Issues: Magic Numbers | Low | 0.5-1 day | Next major | None |
| CQ-002 | Code Quality Issues: Duplicate Styling Logic | Low | 1-2 days | Next major | None |

For a complete technical debt analysis, see the [Checkbox Technical Debt Report](../technical-debt/Checkbox-technical-debt.md).

## Related Components

- [Input](./Input.md): Text input component that shares styling with Checkbox
- [Radio](./Radio.md): Similar component for single selection from multiple options
- [Switch](./Switch.md): Toggle component for boolean input with a different visual representation
- [FormGroup](./FormGroup.md): Container component for grouping form controls
- [CheckboxGroup](./CheckboxGroup.md): Component for managing a group of related checkboxes

## Interactive Examples

See this component in action in [Storybook](http://localhost:6006/?path=/story/form-checkbox--basic).

The Storybook examples demonstrate:

- Different checkbox variants (outlined, filled)
- Different checkbox sizes (small, medium, large)
- Error states and validation
- Helper text usage
- Indeterminate state
- Disabled state
- Checkbox groups

## Changelog

| Version | Changes |
|---------|---------|
| 1.0.0 | Initial implementation |
| 1.1.0 | Added support for indeterminate state |
| 1.2.0 | Added support for different variants (outlined, filled) |
| 1.3.0 | Added support for different sizes (small, medium, large) |
| 1.4.0 | Added support for error state and helper text |
| 1.5.0 | Improved accessibility with ARIA attributes |
| 2.0.0 | Refactored to use styled-components and TypeScript |
