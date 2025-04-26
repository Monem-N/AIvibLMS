# Button

The Button component is a primary interaction element used throughout the Hypatia LMS for triggering actions.

## Description

The Button component provides a consistent way to trigger actions across the application. It supports different variants, sizes, and states to accommodate various use cases.

## Usage

```tsx
import { Button } from 'components/ui/Button';

<Button variant="primary" onClick={handleClick}>
  Click Me
</Button>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| variant | 'primary' \| 'secondary' \| 'tertiary' \| 'danger' | 'primary' | No | The visual style of the button |
| size | 'small' \| 'medium' \| 'large' | 'medium' | No | The size of the button |
| fullWidth | boolean | false | No | Whether the button should take up the full width of its container |
| disabled | boolean | false | No | Whether the button is disabled |
| loading | boolean | false | No | Whether the button is in a loading state |
| type | 'button' \| 'submit' \| 'reset' | 'button' | No | The HTML button type |
| onClick | (event: React.MouseEvent<HTMLButtonElement>) => void | - | No | Function called when the button is clicked |
| children | React.ReactNode | - | Yes | The content of the button |
| className | string | - | No | Additional CSS class names |
| startIcon | React.ReactNode | - | No | Icon to display before the button text |
| endIcon | React.ReactNode | - | No | Icon to display after the button text |

## Examples

### Basic Button Variants

```tsx
<Button variant="primary">Primary Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button variant="tertiary">Tertiary Button</Button>
<Button variant="danger">Danger Button</Button>
```

### Button Sizes

```tsx
<Button size="small">Small Button</Button>
<Button size="medium">Medium Button</Button>
<Button size="large">Large Button</Button>
```

### Button States

```tsx
<Button disabled>Disabled Button</Button>
<Button loading>Loading Button</Button>
```

### Button with Icons

```tsx
import { PlusIcon, ArrowRightIcon } from 'components/icons';

<Button startIcon={<PlusIcon />}>Add Item</Button>
<Button endIcon={<ArrowRightIcon />}>Next</Button>
```

### Full Width Button

```tsx
<Button fullWidth>Full Width Button</Button>
```

### Submit Button in a Form

```tsx
<form onSubmit={handleSubmit}>
  {/* Form fields */}
  <Button type="submit">Submit</Button>
</form>
```

## Accessibility

The Button component follows these accessibility guidelines:

- Uses native `<button>` element for proper keyboard navigation and screen reader support
- Maintains a minimum touch target size of 44x44 pixels
- Provides visual feedback for focus, hover, and active states
- Includes appropriate ARIA attributes for loading and disabled states
- Ensures sufficient color contrast for all variants
- Supports keyboard activation with Enter and Space keys

## Edge Cases

- **Long Text**: Button text that is too long will wrap to multiple lines. Consider using a shorter label or a larger button size.
- **Icon-Only Buttons**: When using a button with only an icon, provide an `aria-label` for screen readers.
- **Loading State**: When in loading state, the button is automatically disabled to prevent multiple submissions.
- **Mobile Devices**: On mobile devices, buttons have increased touch targets to improve usability.

## Implementation Details

The Button component is implemented using styled-components with a focus on customization and reusability:

```tsx
// Simplified implementation
import React from 'react';
import styled, { css } from 'styled-components';
import { Spinner } from '../Spinner';

const StyledButton = styled.button<ButtonStyleProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  
  /* Size styles */
  ${props => getSizeStyles(props.size)}
  
  /* Variant styles */
  ${props => getVariantStyles(props.variant)}
  
  /* Full width styles */
  ${props => props.fullWidth && css`
    width: 100%;
  `}
  
  /* Disabled styles */
  ${props => props.disabled && css`
    opacity: 0.6;
    cursor: not-allowed;
  `}
  
  /* Icon spacing */
  .start-icon {
    margin-right: 8px;
  }
  
  .end-icon {
    margin-left: 8px;
  }
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  loading = false,
  type = 'button',
  onClick,
  className,
  startIcon,
  endIcon,
  ...rest
}) => {
  return (
    <StyledButton
      type={type}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      onClick={onClick}
      className={className}
      {...rest}
    >
      {loading && <Spinner size="small" />}
      {!loading && startIcon && <span className="start-icon">{startIcon}</span>}
      {children}
      {!loading && endIcon && <span className="end-icon">{endIcon}</span>}
    </StyledButton>
  );
};
```

## Related Components

- [IconButton](./IconButton.md): Button that contains only an icon
- [ButtonGroup](./ButtonGroup.md): Group of related buttons
- [LinkButton](./LinkButton.md): Button that acts as a link
- [DropdownButton](./DropdownButton.md): Button with dropdown menu
