
# AIvibLMS UI/UX CSS Guidelines (Revised)

This document outlines the CSS and styling guidelines for the AIvibLMS application. Following these guidelines will ensure a consistent, maintainable, accessible, and visually cohesive user interface, leveraging the Material-UI (MUI) library.

## Table of Contents

1. [Core Principles](https://www.google.com/search?q=%23core-principles)
2. [Spacing System](https://www.google.com/search?q=%23spacing-system)
3. [Typography](https://www.google.com/search?q=%23typography)
4. [Color Usage](https://www.google.com/search?q=%23color-usage)
5. [Accessibility (A11y)](https://www.google.com/search?q=%23accessibility-a11y)
6. [Component Styling](https://www.google.com/search?q=%23component-styling)
7. [Layout Guidelines](https://www.google.com/search?q=%23layout-guidelines)
8. [Responsive Design](https://www.google.com/search?q=%23responsive-design)
9. [CSS Management Best Practices](https://www.google.com/search?q=%23css-management-best-practices)
10. [Tooling & Linting](https://www.google.com/search?q=%23tooling--linting)

## Core Principles

Our CSS approach is built on these fundamental principles:

1. **Component-Based Styling**: Styles should primarily be tied to components, not pages or global selectors, promoting encapsulation.
2. **Theme-Driven Design**: Utilize the central MUI theme for all design tokens (colors, spacing, typography, border-radius, etc.) to ensure consistency.
3. **Consistency**: Apply spacing, typography, colors, and interaction patterns uniformly throughout the application.
4. **Maintainability**: Write clear, understandable, and easily modifiable styles. Prefer theme values and standard component props over arbitrary overrides.
5. **Modularity**: Create reusable style patterns and styled components where applicable.
6. **Accessibility**: Design and implement with accessibility standards (WCAG) in mind from the start.

## Spacing System

Our spacing system is based on an **8px base unit**, aligned with Material Design and MUI's `theme.spacing()` function (`theme.spacing(1)` = 8px).

| Name | Value                 | Usage                                                    |
| :--- | :-------------------- | :------------------------------------------------------- |
| `xs` | 4px (`theme.spacing(0.5)`) | Tiny spacing, e.g., between an icon and adjacent text. Use sparingly. |
| `sm` | 8px (`theme.spacing(1)`)  | Small spacing between closely related elements.           |
| `md` | 16px (`theme.spacing(2)`) | Medium spacing between elements within a section/component. |
| `lg` | 24px (`theme.spacing(3)`) | Large spacing between distinct sections or components.     |
| `xl` | 32px (`theme.spacing(4)`) | Extra-large spacing for major page sections or blocks.   |

### Spacing Guidelines

* **Always** use `theme.spacing()` for margin and padding values to maintain consistency with the base unit. Avoid raw pixel values.
* Apply consistent vertical spacing (using margin-bottom `mb` is common):
  * `mb: 1` (8px) for closely related elements (e.g., label and input).
  * `mb: 2` (16px) for elements within the same logical group.
  * `mb: 3` (24px) or `mb: 4` (32px) for separating distinct sections.
* Use appropriate padding inside containers:
  * Cards: `p: 2` (16px) is standard. `p: 1.5` (12px) can be used for more compact cards if necessary.
  * Page/Section Containers: `p: 3` (24px) or `p: 4` (32px) for main content areas.
* Maintain consistent spacing between grid items using the `Grid` component's `spacing` prop: `spacing={2}` (16px gutters) or `spacing={3}` (24px gutters).

## Typography

Follow these typography guidelines for consistent text styling and hierarchy:

| Element         | Recommended Variant(s) | Recommended Weight | Usage                                 |
| :-------------- | :--------------------- | :----------------- | :------------------------------------ |
| Page titles     | `h4` or `h5`           | 600 (Semi-bold)    | Main page headings (usually one `h1` equivalent per page) |
| Section titles  | `h6` or `subtitle1`    | 600 (Semi-bold)    | Headings for distinct content sections |
| Card/Widget titles | `subtitle1` or `subtitle2` | 600 (Semi-bold)    | Titles within cards, dialogs, etc.    |
| Body text       | `body1`                | 400 (Regular)      | Main content text, descriptions       |
| Secondary text  | `body2`                | 400 (Regular)      | Supporting information, help text     |
| Small/Meta text | `caption`              | 400 (Regular)      | Metadata, timestamps, small labels    |

### Typography Guidelines

* Use semantic MUI `Typography` variants (`variant="h4"`, `variant="body1"`, etc.) rather than setting font sizes directly. This ensures consistency with the theme.
* Apply consistent font weights as defined above. Use `fontWeight: 500` (Medium) for moderate emphasis or `fontWeight: 700` (Bold) for strong emphasis (e.g., key stats) where appropriate.
* Maintain a clear visual hierarchy on each page using appropriate variants and spacing.
* Use color (`text.primary`, `text.secondary`, `primary.main`) thoughtfully to enhance hierarchy, but ensure sufficient contrast (see [Accessibility](https://www.google.com/search?q=%23accessibility-a11y)).
* Generally, rely on the default `lineHeight` provided by the MUI theme for each variant unless a specific design requirement necessitates an override.

## Color Usage

Use theme colors consistently according to their semantic meaning:

| Color             | Usage                                                          |
| :---------------- | :------------------------------------------------------------- |
| `primary.main`    | Primary actions (buttons), key information, active navigation, branding |
| `secondary.main`  | Secondary actions, complementary information, alternative highlights |
| `error.main`      | Error states, destructive actions (delete), validation messages |
| `warning.main`    | Warning states, potentially problematic situations, alerts      |
| `info.main`       | Informational messages, neutral alerts, help text highlights    |
| `success.main`    | Success states, confirmation messages, positive outcomes       |
| `text.primary`    | Main content text, high emphasis                               |
| `text.secondary`  | Supporting text, labels, lower emphasis information            |
| `text.disabled`   | Text for disabled elements                                     |
| `background.paper`| Surface color for components like Cards, Paper, Dialogs, Menus |
| `background.default`| Base page background color                                     |
| `divider`         | Subtle borders and dividers between elements                   |
| `action.active`   | Color for active interactive elements like icons               |
| `action.hover`    | Background color for hover states (often with opacity)         |
| `action.disabledBackground` | Background for disabled elements                         |
| `action.disabled` | Color for content (text/icons) within disabled elements        |

### Color Guidelines

* **Always** access colors via the theme: `theme.palette.primary.main`, `theme.palette.text.secondary`, etc.
* For subtle backgrounds or states using theme colors with opacity, use the `alpha` utility from MUI:

    ```jsx
    import { alpha } from '@mui/material/styles';
    // Example usage in sx prop:
    sx={{ backgroundColor: alpha(theme.palette.primary.main, 0.1) }} // 10% opacity primary color
    ```

* **Ensure sufficient contrast** between text and background colors to meet WCAG AA standards (see [Accessibility](https://www.google.com/search?q=%23accessibility-a11y)). Use contrast checker tools.
* Use color consistently to indicate state (error, success, disabled) and meaning (primary action vs. secondary).
* Apply color purposefully; avoid overuse, which can diminish impact and visual hierarchy.

## Accessibility (A11y)

Accessibility is crucial for an inclusive user experience. Keep these points in mind during design and development:

1. **Color Contrast:** Ensure text has sufficient contrast against its background (WCAG AA requires 4.5:1 for normal text, 3:1 for large text). Use tools to check contrast ratios, especially when using `text.secondary` or custom colors.
2. **Focus Indicators:** Ensure all interactive elements (buttons, links, inputs) have clear and visible focus indicators. MUI provides good defaults; avoid removing or obscuring them without providing a clear alternative.
3. **Semantic HTML:** Use appropriate HTML elements (e.g., `<button>` for actions, `<a>` for navigation, `<nav>`, `<main>`, headings) even when styling with MUI components. `Typography` component's `component` prop can map variants to semantic tags (`<Typography variant="h4" component="h1">`).
4. **Form Labels:** All form inputs must have associated labels (use MUI `TextField`'s `label` prop, or `InputLabel` + `FormControl`).
5. **ARIA Attributes:** Use ARIA (Accessible Rich Internet Applications) attributes where necessary to provide context for assistive technologies, especially for complex or custom components.
6. **Keyboard Navigation:** Ensure all interactive elements are reachable and operable using the keyboard alone in a logical order.
7. **Touch Target Size:** Ensure interactive elements have sufficient size for easy interaction on touch devices (minimum 44x44px is a good guideline).

## Component Styling

Apply styles directly to components using MUI's styling solutions. Here are base examples for common components:

### Cards (Base Example)

This shows a standard card style. Variations may exist, but should maintain consistency in border-radius, elevation/shadow, and internal padding based on the theme.

```jsx
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles'; // Needed to access theme directly in component scope

// ... inside component ...
const theme = useTheme(); // Get theme

<Paper
  elevation={2} // Use theme-defined elevations where possible
  sx={{
    borderRadius: theme.shape.borderRadius * 2, // Use theme.shape
    overflow: 'hidden', // Often needed with border-radius
    height: '100%', // Example: If cards need uniform height in a grid
    // Consistent base shadow - consider defining levels in theme if needed
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    // Optional subtle hover effect for interactive cards:
    transition: theme.transitions.create(['transform', 'box-shadow']), // Use theme transitions
    '&:hover': {
      // Ensure hover effect is meaningful and not distracting
      // transform: 'translateY(-4px)',
      // boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
    }
  }}
>
  {/* Card header (Example structure) */}
  <Box sx={{
    p: 1.5, // Use theme.spacing based padding (12px here)
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${theme.palette.divider}`, // Use theme divider color
    backgroundColor: theme.palette.background.paper // Use theme background
  }}>
    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
      Card Title
    </Typography>
    {/* Optional icon or action */}
  </Box>

  {/* Card content */}
  <Box sx={{ p: 1.5 }}> {/* Consistent internal padding */}
    {/* Card content goes here */}
  </Box>
</Paper>
```

### Buttons (Base Example)

Prefer standard MUI Button props (`variant`, `color`, `size`) over custom padding unless necessary for a specific, justified design variation.

```jsx
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon'; // Placeholder

<Button
  variant="contained" // Choose variant based on importance: contained > outlined > text
  color="primary"     // Use theme colors: primary, secondary, error, etc.
  size="medium"       // Use standard sizes: small, medium, large
  sx={{
    // Use theme border radius (MUI default is often sufficient)
    // borderRadius: theme.shape.borderRadius,
    textTransform: 'none', // Common preference to disable uppercase
    fontWeight: 500,       // Medium weight for emphasis is common
    // Avoid custom px/py if standard size prop achieves the goal
    // px: 2,
    // py: 0.75
  }}
  startIcon={<Icon />} // Optional icon
>
  Button Text
</Button>
```

### Form Controls (Base Example)

Use standard MUI form components and props. Ensure labels and helper text are used correctly.

```jsx
import TextField from '@mui/material/TextField';

<TextField
  label="Label Text" // Crucial for accessibility
  variant="outlined" // Or "filled", "standard" - be consistent
  fullWidth
  margin="normal" // Provides standard vertical spacing ('dense' or 'none' also available)
  helperText="Optional helper text"
  sx={{
    // Only add sx overrides if necessary and not achievable via props/theme
    // Example: Ensure consistent spacing if margin="none"
    // mb: 2,
    '& .MuiOutlinedInput-root': {
      // Example: Customize border-radius if theme default isn't used
      // borderRadius: theme.shape.borderRadius
    }
  }}
/>
```

## Layout Guidelines

### Page Structure (Example)

Employ a consistent page layout, often using `Container` or `Box` for constraining width and `Grid` for content arrangement.

```jsx
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon'; // Placeholder
import AdminLayout from './AdminLayout'; // Placeholder layout component
import { useTheme } from '@mui/material/styles';

// ... inside component ...
const theme = useTheme();

<AdminLayout>
  {/* Use Box or Container for padding and max-width */}
  <Box sx={{ px: { xs: 2, sm: 3 }, py: 3, maxWidth: 1400, mx: 'auto' }}>
    {/* Page header */}
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Icon sx={{ mr: 1, color: theme.palette.primary.main }} />
        {/* Ensure semantic H1 equivalent exists */}
        <Typography variant="h5" component="h1" sx={{ fontWeight: 600 }}>
          Page Title
        </Typography>
      </Box>
      <Typography variant="body1" color="text.secondary">
        Page description or introduction text.
      </Typography>
    </Box>

    {/* Page content - Use Grid for layout */}
    <Grid container spacing={3}> {/* Consistent grid spacing */}
      {/* Grid items using responsive props */}
      <Grid item xs={12} md={6} lg={4}>
         {/* Content Block 1 */}
      </Grid>
      <Grid item xs={12} md={6} lg={8}>
         {/* Content Block 2 */}
      </Grid>
    </Grid>
  </Box>
</AdminLayout>
```

### Grid System

* Utilize the MUI `Grid` component (`<Grid container>` and `<Grid item>`) for responsive layouts.
* Apply consistent spacing between grid items using the `spacing` prop on the container (e.g., `spacing={2}` for 16px, `spacing={3}` for 24px).
* Use responsive grid item props (`xs`, `sm`, `md`, `lg`, `xl`) to define column spans at different breakpoints.
* Limit maximum content width using `maxWidth` on a container (`Box` or `Container`) combined with `mx: 'auto'` for readability on large screens (e.g., `maxWidth: 1400`).

### Whitespace Distribution

* Maintain consistent vertical and horizontal spacing using the defined [Spacing System](https://www.google.com/search?q=%23spacing-system).
* Use whitespace effectively to group related elements and separate distinct sections, improving readability and visual hierarchy.
* Avoid large, inconsistent gaps or overly cramped layouts. Strive for balance.

## Responsive Design

* **Design Principle:** While not strictly "mobile-first" in implementation sequence sometimes, always consider the mobile experience. Ensure layouts reflow gracefully and content remains usable on small screens. Test thoroughly.
* Use MUI's responsive breakpoints, defined in the theme:
  * `xs`: 0px+
  * `sm`: 600px+
  * `md`: 900px+
  * `lg`: 1200px+
  * `xl`: 1536px+
* Apply responsive styles directly within the `sx` prop or `styled()` using the breakpoint syntax:

    ```jsx
    sx={{
      // Example: Width changes at different breakpoints
      width: { xs: '100%', md: '80%', lg: '60%' },
      // Example: Padding increases on larger screens
      p: { xs: 1, sm: 2, md: 3 },
      // Example: Flex direction changes from column to row
      flexDirection: { xs: 'column', md: 'row' },
    }}
    ```

* **Test layouts** on various screen sizes (using browser dev tools and real devices if possible) to ensure proper display, readability, and usability.

## CSS Management Best Practices

### Styling Approaches: `sx` Prop vs. `styled()` API

* **`sx` Prop:**

  * **Use Case:** Ideal for one-off, instance-specific style overrides directly on a component. Good for applying theme values (spacing, colors) quickly.
  * **Syntax:**

        ```jsx
        <Box sx={{ display: 'flex', alignItems: 'center', p: 2, mb: 3, backgroundColor: 'primary.main' }}> {/* Content */} </Box>
        ```

        ```jsx
        <Box sx={(theme) => ({ // Callback syntax to access full theme
            backgroundColor: theme.palette.background.paper,
            borderRadius: theme.shape.borderRadius,
            p: theme.spacing(2)
          })}
        > {/* Content */} </Box>
        ```

* **`styled()` API:**

  * **Use Case:** Best for creating reusable, custom-styled components that encapsulate complex or frequently repeated style patterns. Promotes cleaner component code for styled elements.
  * **Syntax:**

        ```jsx
        import { styled } from '@mui/material/styles';
        import Paper from '@mui/material/Paper';

        const StyledCard = styled(Paper)(({ theme }) => ({
          borderRadius: theme.shape.borderRadius * 2,
          overflow: 'hidden',
          height: '100%',
          padding: theme.spacing(2),
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          // ... other base styles
        }));

        // Usage in component:
        <StyledCard> {/* Card content */} </StyledCard>
        ```

* **Guideline:** Prefer `sx` for simplicity and direct overrides. Use `styled()` when creating a distinct, reusable styled element or when the styles become extensive.

### Theme Usage

* Always access theme values (`palette`, `spacing`, `shape`, `typography`, `transitions`) rather than hardcoding values.
* Use the callback syntax `sx={(theme) => ({...})}` or the `useTheme` hook within functional components to access the theme object when needed.

    ```jsx
    import { useTheme } from '@mui/material/styles';

    const MyComponent = () => {
      const theme = useTheme(); // Hook to get theme object
      return (
        <Box sx={{ color: theme.palette.primary.main, mt: theme.spacing(2) }}>
          Content using theme values
        </Box>
      );
    };
    ```

### Style Organization

* Keep styles defined close to the components they affect (co-location).
* For styles defined outside `sx` or `styled` (less common with MUI, perhaps helper objects), use descriptive names.

    ```jsx
    // Less common pattern with sx/styled, but if needed:
    const cardStyles = {
      wrapper: { /* ... */ },
      header: { /* ... */ },
      content: { /* ... */ }
    };
    // <Paper sx={cardStyles.wrapper}>...</Paper>
    ```

### Avoid Global Styles

* Minimize the use of global CSS files (`index.css`, `App.css`). MUI's `CssBaseline` handles normalization, and most styles should be component-scoped or theme-based.
* If unavoidable global styles are needed (e.g., custom scrollbars, base body styles), apply them cautiously through theme customization, specifically within `theme.components.MuiCssBaseline.styleOverrides`.

    ```jsx
    // In theme definition:
    import { createTheme } from '@mui/material/styles';

    const theme = createTheme({
      // ... other theme options
      components: {
        MuiCssBaseline: {
          styleOverrides: `
            body {
              scrollbar-width: thin; /* Example */
              scrollbar-color: #6b6b6b #2b2b2b; /* Example */
            }
            /* Other minimal global overrides */
          `,
        },
      },
    });
    ```

## Tooling & Linting

* Consider using ESLint with plugins relevant to React, MUI, and style consistency (e.g., general React hooks rules, potentially specific MUI plugins if available and useful) to help automatically enforce coding standards and catch potential issues.

-----

By adhering to these revised guidelines, we aim to build and maintain a high-quality, consistent, accessible, and visually appealing user interface for the AIvibLMS application.
