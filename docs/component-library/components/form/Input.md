# Input

The Input component is used in the Hypatia LMS for collecting and validating user input in forms.

## Description

The Input component provides a standardized text input field with support for various states, sizes, and variants. It is used throughout the application in forms, search fields, and data entry interfaces. The component supports labels, helper text, error messages, icons, and various styling options to ensure consistency and usability across the platform.

## Visual Examples

### Input Variants Display

![Input Variants](https://i.imgur.com/XYZ123.png)

From left to right: Outlined (default), Filled, and Standard variants

### Input States Display

![Input States](https://i.imgur.com/ABC456.png)

From top to bottom: Default, Focused, Error, and Disabled states

## Usage

```tsx
import { Input } from 'components/form/Input';

<Input
  label="Email"
  placeholder="Enter your email"
  type="email"
  required
/>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| label | string | - | No | The label for the input |
| helperText | string | - | No | Helper text to display below the input |
| error | string | - | No | Error message to display below the input |
| size | 'small' \| 'medium' \| 'large' | 'medium' | No | The size of the input |
| variant | 'outlined' \| 'filled' \| 'standard' | 'outlined' | No | The variant of the input |
| fullWidth | boolean | false | No | Whether the input should take up the full width of its container |
| startIcon | React.ReactNode | - | No | Icon to display at the start of the input |
| endIcon | React.ReactNode | - | No | Icon to display at the end of the input |
| required | boolean | false | No | Whether the input is required |
| disabled | boolean | false | No | Whether the input is disabled |
| className | string | - | No | Additional CSS class names |
| id | string | - | No | The ID of the input element |
| placeholder | string | - | No | Placeholder text for the input |
| type | string | 'text' | No | The type of the input (e.g., 'text', 'email', 'password') |

In addition to these props, the Input component accepts all standard HTML input attributes (e.g., `name`, `autoComplete`, `min`, `max`, `pattern`, etc.) as it extends the `React.InputHTMLAttributes<HTMLInputElement>` interface.

## Type Definitions

```tsx
export type InputSize = 'small' | 'medium' | 'large';
export type InputVariant = 'outlined' | 'filled' | 'standard';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * The label for the input
   */
  label?: string;

  /**
   * Helper text to display below the input
   */
  helperText?: string;

  /**
   * Error message to display below the input
   */
  error?: string;

  /**
   * The size of the input
   * @default 'medium'
   */
  size?: InputSize;

  /**
   * The variant of the input
   * @default 'outlined'
   */
  variant?: InputVariant;

  /**
   * Whether the input should take up the full width of its container
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Icon to display at the start of the input
   */
  startIcon?: React.ReactNode;

  /**
   * Icon to display at the end of the input
   */
  endIcon?: React.ReactNode;

  /**
   * Whether the input is required
   * @default false
   */
  required?: boolean;
}
```

## Examples

### Basic Example

```tsx
<Input
  label="Username"
  placeholder="Enter your username"
/>
```

### Input with Helper Text and Error

```tsx
<Input
  label="Email"
  placeholder="Enter your email"
  type="email"
  helperText="We'll never share your email with anyone else"
  error={!isValidEmail ? "Please enter a valid email address" : undefined}
  required
/>
```

### Input Variants

```tsx
<>
  <Input
    label="Outlined Input"
    variant="outlined"
    placeholder="Outlined variant"
  />

  <Input
    label="Filled Input"
    variant="filled"
    placeholder="Filled variant"
  />

  <Input
    label="Standard Input"
    variant="standard"
    placeholder="Standard variant"
  />
</>
```

### Input Sizes

```tsx
<>
  <Input
    label="Small Input"
    size="small"
    placeholder="Small size"
  />

  <Input
    label="Medium Input"
    size="medium"
    placeholder="Medium size"
  />

  <Input
    label="Large Input"
    size="large"
    placeholder="Large size"
  />
</>
```

### Input with Icons

```tsx
<>
  <Input
    label="Search"
    placeholder="Search..."
    startIcon={<SearchIcon />}
  />

  <Input
    label="Password"
    type="password"
    placeholder="Enter your password"
    endIcon={<EyeIcon onClick={togglePasswordVisibility} />}
  />
</>
```

### Full Width Input

```tsx
<Input
  label="Message"
  placeholder="Type your message here"
  fullWidth
/>
```

### Disabled Input

```tsx
<Input
  label="Disabled Input"
  placeholder="This input is disabled"
  disabled
/>
```

## Features

1. **Multiple Variants**: Supports outlined, filled, and standard input styles to match different design requirements
2. **Size Options**: Available in small, medium, and large sizes for different contexts
3. **Error Handling**: Built-in error display with visual indicators and error messages
4. **Helper Text**: Support for helper text to provide additional context to users
5. **Icon Support**: Ability to add icons at the start or end of the input
6. **Accessibility**: Fully accessible with proper ARIA attributes and keyboard navigation
7. **Form Integration**: Seamlessly integrates with form libraries and native HTML form functionality
8. **Customization**: Supports custom styling through className prop and styled-components

## Form Integration

The Input component is designed to work seamlessly with both native HTML forms and form libraries like Formik and React Hook Form:

### Native HTML Forms

```tsx
<form onSubmit={handleSubmit}>
  <Input
    name="email"
    label="Email"
    type="email"
    required
  />
  <Input
    name="password"
    label="Password"
    type="password"
    required
  />
  <button type="submit">Submit</button>
</form>
```

### Formik Integration

```tsx
import { Formik, Form, Field } from 'formik';

<Formik
  initialValues={{ email: '', password: '' }}
  validate={values => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    return errors;
  }}
  onSubmit={handleSubmit}
>
  {({ errors, touched }) => (
    <Form>
      <Field name="email">
        {({ field }) => (
          <Input
            {...field}
            label="Email"
            type="email"
            error={touched.email && errors.email}
          />
        )}
      </Field>
      <Field name="password">
        {({ field }) => (
          <Input
            {...field}
            label="Password"
            type="password"
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
  <Input
    label="Email"
    error={errors.email?.message}
    {...register('email', {
      required: 'Email is required',
      pattern: {
        value: /\S+@\S+\.\S+/,
        message: 'Invalid email address'
      }
    })}
  />
  <Input
    label="Password"
    type="password"
    error={errors.password?.message}
    {...register('password', {
      required: 'Password is required',
      minLength: {
        value: 8,
        message: 'Password must be at least 8 characters'
      }
    })}
  />
  <button type="submit">Submit</button>
</form>
```

## Accessibility

The Input component is designed to be fully accessible according to WCAG 2.1 guidelines:

### Keyboard Navigation

- The input is focusable using the Tab key
- When focused, the input can be interacted with using standard keyboard controls
- Focus is visually indicated with a clear outline

### Screen Reader Support

- The input has an accessible name provided by the label
- Error messages are announced to screen readers
- Helper text is linked to the input using aria-describedby
- Required inputs are properly marked with the required attribute

### ARIA Attributes

- `aria-invalid`: Set to true when the input has an error
- `aria-describedby`: Links the input to its helper text or error message
- `aria-required`: Indicates that the input is required
- `aria-disabled`: Indicates that the input is disabled

### Color Contrast

- All text meets WCAG AA contrast requirements (4.5:1 for normal text)
- Error states use colors that meet contrast requirements
- Focus indicators have sufficient contrast (3:1 minimum)

### Focus Management

- Focus is clearly visible with a distinct outline
- Focus states are consistent across all input variants
- Focus indicators are visible in both light and dark themes

## Edge Cases

- **Empty Value**: When the input is empty, the placeholder text is displayed if provided. If no placeholder is provided, the input appears empty.
- **Long Text**: When the input value is longer than the visible area, the text scrolls horizontally within the input field.
- **Error State with Helper Text**: When both error and helperText props are provided, the error message takes precedence and the helper text is not displayed.
- **Disabled with Required**: When both disabled and required props are true, the required visual indicator is still shown, but the input cannot be interacted with.
- **RTL Support**: The component supports right-to-left languages, with appropriate text alignment and icon positioning.
- **Controlled vs Uncontrolled**: The component can be used in both controlled and uncontrolled modes, with appropriate handling of value/defaultValue props.
- **Form Reset**: When a form is reset, the input value is cleared if it's uncontrolled, or reset to the controlled value if it's controlled.
- **Autofill**: The component handles browser autofill correctly, with appropriate styling for autofilled fields.

## Implementation Details

The Input component is implemented using styled-components with a focus on accessibility and customization:

```tsx
// Simplified implementation
import React, { forwardRef } from 'react';
import styled from 'styled-components';

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  helperText,
  error,
  size = 'medium',
  variant = 'outlined',
  fullWidth = false,
  startIcon,
  endIcon,
  required = false,
  disabled = false,
  id,
  className,
  ...rest
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
  const hasError = !!error;
  const displayHelperText = error || helperText;

  return (
    <InputContainer
      size={size}
      variant={variant}
      fullWidth={fullWidth}
      hasError={hasError}
      disabled={disabled}
      className={className}
    >
      {label && (
        <InputLabel htmlFor={inputId} required={required} hasError={hasError}>
          {label}
        </InputLabel>
      )}

      <InputWrapper
        size={size}
        variant={variant}
        fullWidth={fullWidth}
        hasError={hasError}
        disabled={disabled}
      >
        {startIcon && (
          <IconWrapper position="start">
            {startIcon}
          </IconWrapper>
        )}

        <StyledInput
          id={inputId}
          ref={ref}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={displayHelperText ? `${inputId}-helper-text` : undefined}
          required={required}
          {...rest}
        />

        {endIcon && (
          <IconWrapper position="end">
            {endIcon}
          </IconWrapper>
        )}
      </InputWrapper>

      {displayHelperText && (
        <HelperText
          id={`${inputId}-helper-text`}
          hasError={hasError}
        >
          {displayHelperText}
        </HelperText>
      )}
    </InputContainer>
  );
});
```

## Technical Debt

The Input component has minimal technical debt, with only one low-severity issue identified:

### Code Quality Issues

| ID | Issue | Description | Impact | Remediation | Priority |
|----|-------|-------------|--------|-------------|----------|
| CO-001 | Magic Numbers | Uses hard-coded numbers without explanation | Reduces code readability and maintainability | Extract magic numbers to named constants | Low |

### Technical Debt Roadmap

| ID | Issue | Priority | Estimated Effort | Target Version | Dependencies |
|----|-------|----------|------------------|----------------|--------------|
| CO-001 | Code Quality Issues: Magic Numbers | Low | 0.5-1 day | Next major | None |

For a complete technical debt analysis, see the [Input Technical Debt Report](../technical-debt/Input-technical-debt.md).

## Related Components

- [Select](./Select.md): Dropdown selection component that shares styling with Input
- [Checkbox](./Checkbox.md): Boolean input component for multiple selections
- [Radio](./Radio.md): Boolean input component for single selection from multiple options
- [FormGroup](./FormGroup.md): Container component for grouping form controls
- [DatePicker](./DatePicker.md): Date selection component that uses Input internally

## Interactive Examples

See this component in action in [Storybook](http://localhost:6006/?path=/story/form-input--basic).

The Storybook examples demonstrate:

- Different input variants (outlined, filled, standard)
- Different input sizes (small, medium, large)
- Error states and validation
- Helper text usage
- Icon integration
- Disabled and required states
- Full width inputs

## Changelog

| Version | Changes |
|---------|---------|
| 1.0.0 | Initial implementation |
| 1.1.0 | Added support for startIcon and endIcon |
| 1.2.0 | Added support for different variants (outlined, filled, standard) |
| 1.3.0 | Added support for different sizes (small, medium, large) |
| 1.4.0 | Added support for error state and helper text |
| 1.5.0 | Improved accessibility with ARIA attributes |
| 2.0.0 | Refactored to use styled-components and TypeScript |
