# Select

The Select component is used in the Hypatia LMS for selecting options from a predefined list in forms and user interfaces.

## Description

The Select component provides a standardized dropdown selection field with support for various states, sizes, and variants. It is used throughout the application in forms, filters, and settings interfaces where users need to choose from a set of options. The component supports labels, helper text, error messages, and various styling options to ensure consistency and usability across the platform.

## Visual Examples

### Select Variants Display

![Select Variants](https://i.imgur.com/XYZ123.png)

From left to right: Outlined (default), Filled, and Standard variants

### Select States Display

![Select States](https://i.imgur.com/ABC456.png)

From top to bottom: Default, Focused, Error, and Disabled states

## Usage

```tsx
import { Select } from 'components/form/Select';

<Select
  label="Country"
  options={[
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'mx', label: 'Mexico' }
  ]}
  placeholder="Select a country"
/>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| label | string | - | No | The label for the select |
| helperText | string | - | No | Helper text to display below the select |
| error | string | - | No | Error message to display below the select |
| size | 'small' \| 'medium' \| 'large' | 'medium' | No | The size of the select |
| variant | 'outlined' \| 'filled' \| 'standard' | 'outlined' | No | The variant of the select |
| fullWidth | boolean | false | No | Whether the select should take up the full width of its container |
| options | SelectOption[] | [] | Yes | The options to display in the select |
| required | boolean | false | No | Whether the select is required |
| disabled | boolean | false | No | Whether the select is disabled |
| placeholder | string | - | No | Placeholder text to display when no option is selected |
| className | string | - | No | Additional CSS class names |
| id | string | - | No | The ID of the select element |

In addition to these props, the Select component accepts all standard HTML select attributes (e.g., `name`, `multiple`, `autoComplete`, etc.) as it extends the `React.SelectHTMLAttributes<HTMLSelectElement>` interface.

## Type Definitions

```tsx
export type SelectSize = 'small' | 'medium' | 'large';
export type SelectVariant = 'outlined' | 'filled' | 'standard';

export interface SelectOption {
  /**
   * The value of the option
   */
  value: string;

  /**
   * The label to display for the option
   */
  label: string;

  /**
   * Whether the option is disabled
   */
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /**
   * The label for the select
   */
  label?: string;

  /**
   * Helper text to display below the select
   */
  helperText?: string;

  /**
   * Error message to display below the select
   */
  error?: string;

  /**
   * The size of the select
   * @default 'medium'
   */
  size?: SelectSize;

  /**
   * The variant of the select
   * @default 'outlined'
   */
  variant?: SelectVariant;

  /**
   * Whether the select should take up the full width of its container
   * @default false
   */
  fullWidth?: boolean;

  /**
   * The options to display in the select
   */
  options: SelectOption[];

  /**
   * Whether the select is required
   * @default false
   */
  required?: boolean;

  /**
   * Placeholder text to display when no option is selected
   */
  placeholder?: string;
}
```

## Examples

### Basic Example

```tsx
<Select
  label="Country"
  options={[
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'mx', label: 'Mexico' }
  ]}
  placeholder="Select a country"
/>
```

### Select with Helper Text and Error

```tsx
<Select
  label="Language"
  options={[
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'French' },
    { value: 'es', label: 'Spanish' }
  ]}
  placeholder="Select a language"
  helperText="This will be your default language"
  error={!selectedLanguage ? "Please select a language" : undefined}
  required
/>
```

### Select Variants

```tsx
<>
  <Select
    label="Outlined Select"
    variant="outlined"
    options={options}
    placeholder="Outlined variant"
  />

  <Select
    label="Filled Select"
    variant="filled"
    options={options}
    placeholder="Filled variant"
  />

  <Select
    label="Standard Select"
    variant="standard"
    options={options}
    placeholder="Standard variant"
  />
</>
```

### Select Sizes

```tsx
<>
  <Select
    label="Small Select"
    size="small"
    options={options}
    placeholder="Small size"
  />

  <Select
    label="Medium Select"
    size="medium"
    options={options}
    placeholder="Medium size"
  />

  <Select
    label="Large Select"
    size="large"
    options={options}
    placeholder="Large size"
  />
</>
```

### Disabled Select

```tsx
<Select
  label="Disabled Select"
  options={options}
  placeholder="This select is disabled"
  disabled
/>
```

### Full Width Select

```tsx
<Select
  label="Category"
  options={categories}
  placeholder="Select a category"
  fullWidth
/>
```

### Select with Disabled Options

```tsx
<Select
  label="Subscription Plan"
  options={[
    { value: 'free', label: 'Free Plan' },
    { value: 'basic', label: 'Basic Plan' },
    { value: 'premium', label: 'Premium Plan' },
    { value: 'enterprise', label: 'Enterprise Plan', disabled: true }
  ]}
  placeholder="Select a plan"
/>
```

## Features

1. **Multiple Variants**: Supports outlined, filled, and standard select styles to match different design requirements
2. **Size Options**: Available in small, medium, and large sizes for different contexts
3. **Error Handling**: Built-in error display with visual indicators and error messages
4. **Helper Text**: Support for helper text to provide additional context to users
5. **Placeholder**: Support for placeholder text when no option is selected
6. **Disabled Options**: Ability to disable specific options in the select
7. **Accessibility**: Fully accessible with proper ARIA attributes and keyboard navigation
8. **Form Integration**: Seamlessly integrates with form libraries and native HTML form functionality
9. **Customization**: Supports custom styling through className prop and styled-components

## Form Integration

The Select component is designed to work seamlessly with both native HTML forms and form libraries like Formik and React Hook Form:

### Native HTML Forms

```tsx
<form onSubmit={handleSubmit}>
  <Select
    name="country"
    label="Country"
    options={countries}
    required
  />
  <Select
    name="language"
    label="Language"
    options={languages}
    required
  />
  <button type="submit">Submit</button>
</form>
```

### Formik Integration

```tsx
import { Formik, Form, Field } from 'formik';

<Formik
  initialValues={{ country: '', language: '' }}
  validate={values => {
    const errors = {};
    if (!values.country) {
      errors.country = 'Required';
    }
    if (!values.language) {
      errors.language = 'Required';
    }
    return errors;
  }}
  onSubmit={handleSubmit}
>
  {({ errors, touched, values, setFieldValue }) => (
    <Form>
      <Field name="country">
        {({ field }) => (
          <Select
            {...field}
            label="Country"
            options={countries}
            error={touched.country && errors.country}
            onChange={e => setFieldValue('country', e.target.value)}
            value={values.country}
          />
        )}
      </Field>
      <Field name="language">
        {({ field }) => (
          <Select
            {...field}
            label="Language"
            options={languages}
            error={touched.language && errors.language}
            onChange={e => setFieldValue('language', e.target.value)}
            value={values.language}
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
  <Select
    label="Country"
    error={errors.country?.message}
    {...register('country', {
      required: 'Country is required'
    })}
    options={countries}
  />
  <Select
    label="Language"
    error={errors.language?.message}
    {...register('language', {
      required: 'Language is required'
    })}
    options={languages}
  />
  <button type="submit">Submit</button>
</form>
```

## Accessibility

The Select component is designed to be fully accessible according to WCAG 2.1 guidelines:

### Keyboard Navigation

- The select is focusable using the Tab key
- When focused, the select can be opened using Space or Enter
- Options can be navigated using arrow keys
- An option can be selected using Enter
- The select can be closed using Escape
- Focus is visually indicated with a clear outline

### Screen Reader Support

- The select has an accessible name provided by the label
- Error messages are announced to screen readers
- Helper text is linked to the select using aria-describedby
- Required selects are properly marked with the required attribute
- The current selected option is announced to screen readers

### ARIA Attributes

- `aria-invalid`: Set to true when the select has an error
- `aria-describedby`: Links the select to its helper text or error message
- `aria-required`: Indicates that the select is required
- `aria-disabled`: Indicates that the select is disabled
- `aria-expanded`: Indicates whether the select dropdown is open or closed

### Color Contrast

- All text meets WCAG AA contrast requirements (4.5:1 for normal text)
- Error states use colors that meet contrast requirements
- Focus indicators have sufficient contrast (3:1 minimum)
- Selected option has sufficient contrast with background

### Focus Management

- Focus is clearly visible with a distinct outline
- Focus states are consistent across all select variants
- Focus indicators are visible in both light and dark themes
- When the select is closed, focus returns to the select element

## Edge Cases

- **No Options**: When the options array is empty, the select displays only the placeholder option if provided. If no placeholder is provided, the select appears empty.
- **Long Option Text**: When option labels are longer than the visible area, the text is truncated with an ellipsis in the dropdown.
- **Error State with Helper Text**: When both error and helperText props are provided, the error message takes precedence and the helper text is not displayed.
- **Disabled with Required**: When both disabled and required props are true, the required visual indicator is still shown, but the select cannot be interacted with.
- **RTL Support**: The component supports right-to-left languages, with appropriate text alignment and arrow positioning.
- **Controlled vs Uncontrolled**: The component can be used in both controlled and uncontrolled modes, with appropriate handling of value/defaultValue props.
- **Form Reset**: When a form is reset, the select value is cleared if it's uncontrolled, or reset to the controlled value if it's controlled.
- **Option Groups**: The component does not natively support option groups (optgroup), but this can be simulated with styling and appropriate labeling.

## Implementation Details

The Select component is implemented using styled-components with a focus on accessibility and customization:

```tsx
// Simplified implementation
import React, { forwardRef } from 'react';
import styled from 'styled-components';

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  helperText,
  error,
  size = 'medium',
  variant = 'outlined',
  fullWidth = false,
  options = [],
  required = false,
  disabled = false,
  placeholder,
  id,
  className,
  ...rest
}, ref) => {
  const selectId = id || `select-${Math.random().toString(36).substring(2, 9)}`;
  const hasError = !!error;
  const displayHelperText = error || helperText;

  return (
    <SelectContainer
      size={size}
      variant={variant}
      fullWidth={fullWidth}
      hasError={hasError}
      disabled={disabled}
      className={className}
    >
      {label && (
        <SelectLabel htmlFor={selectId} required={required} hasError={hasError}>
          {label}
        </SelectLabel>
      )}

      <SelectWrapper
        size={size}
        variant={variant}
        fullWidth={fullWidth}
        hasError={hasError}
        disabled={disabled}
      >
        <StyledSelect
          id={selectId}
          ref={ref}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={displayHelperText ? `${selectId}-helper-text` : undefined}
          required={required}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}

          {options.map(option => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </StyledSelect>

        <ArrowIcon />
      </SelectWrapper>

      {displayHelperText && (
        <HelperText
          id={`${selectId}-helper-text`}
          hasError={hasError}
        >
          {displayHelperText}
        </HelperText>
      )}
    </SelectContainer>
  );
});
```

## Technical Debt

The Select component has some technical debt that should be addressed in future releases:

### Legacy Patterns

| ID | Pattern | Description | Impact | Remediation | Priority |
|----|---------|-------------|--------|-------------|----------|
| LP-001 | Native HTML Select | Uses native HTML select element instead of a custom implementation | Limited styling options and functionality | Implement a custom select component with better styling and functionality | Medium |

### Code Quality Issues

| ID | Issue | Description | Impact | Remediation | Priority |
|----|-------|-------------|--------|-------------|----------|
| CQ-001 | Magic Numbers | Uses hard-coded numbers without explanation | Reduces code readability and maintainability | Extract magic numbers to named constants | Low |
| CQ-002 | Duplicate Styling Logic | Shares styling logic with Input component | Increases maintenance burden when styles change | Extract shared styling to a common utility | Low |

### Performance Issues

| ID | Issue | Description | Impact | Remediation | Priority |
|----|-------|-------------|--------|-------------|----------|
| PI-001 | Inefficient Option Rendering | Renders all options even when not visible | Minimal impact with small option lists, but could affect performance with large lists | Implement virtualized rendering for large option lists | Medium |

### Technical Debt Roadmap

| ID | Issue | Priority | Estimated Effort | Target Version | Dependencies |
|----|-------|----------|------------------|----------------|--------------|
| LP-001 | Legacy Pattern: Native HTML Select | Medium | 3-5 days | 3.0.0 | None |
| RFO-001 | Option Groups Support | Medium | 1-2 days | 2.1.0 | None |
| RFO-002 | Multi-select Support | Medium | 3-4 days | 2.2.0 | None |
| CQ-001 | Code Quality Issues: Magic Numbers | Low | 0.5-1 day | Next major | None |
| CQ-002 | Code Quality Issues: Duplicate Styling Logic | Low | 1-2 days | Next major | None |
| PI-001 | Performance Issues: Inefficient Option Rendering | Medium | 2-3 days | 2.3.0 | LP-001 |

For a complete technical debt analysis, see the [Select Technical Debt Report](../technical-debt/Select-technical-debt.md).

## Related Components

- [Input](./Input.md): Text input component that shares styling with Select
- [Checkbox](./Checkbox.md): Boolean input component for multiple selections
- [Radio](./Radio.md): Alternative component for selecting from a list of options
- [FormGroup](./FormGroup.md): Container component for grouping form controls
- [MultiSelect](./MultiSelect.md): Component for selecting multiple options from a list

## Interactive Examples

See this component in action in [Storybook](http://localhost:6006/?path=/story/form-select--basic).

The Storybook examples demonstrate:

- Different select variants (outlined, filled, standard)
- Different select sizes (small, medium, large)
- Error states and validation
- Helper text usage
- Disabled options
- Disabled select
- Full width select

## Changelog

| Version | Changes |
|---------|---------|
| 1.0.0 | Initial implementation |
| 1.1.0 | Added support for placeholder |
| 1.2.0 | Added support for different variants (outlined, filled, standard) |
| 1.3.0 | Added support for different sizes (small, medium, large) |
| 1.4.0 | Added support for error state and helper text |
| 1.5.0 | Improved accessibility with ARIA attributes |
| 2.0.0 | Refactored to use styled-components and TypeScript |
