# ADR 003: UI Component Library Selection

## Status
Proposed

## Context
The modernization of the Hypatia LMS requires selecting a UI component library that will provide the building blocks for the user interface. The current implementation uses custom components with jQuery for DOM manipulation. We need to decide on a modern UI component library that will provide a consistent, accessible, and responsive user interface.

Key considerations include:
- Component completeness and quality
- Customization and theming capabilities
- Accessibility compliance
- Performance characteristics
- Learning curve and documentation
- Community support and longevity
- Integration with React and TypeScript
- Mobile responsiveness

## Decision
We will use Material-UI (MUI) v5+ as the UI component library for the modernized Hypatia LMS.

Specifically:
1. We will use MUI's core components as the foundation for our UI
2. We will create a custom theme to match the Hypatia brand
3. We will extend MUI components with custom components as needed
4. We will use MUI's styling solution (emotion) for component styling
5. We will leverage MUI's theming capabilities for light/dark mode support

## Rationale
Material-UI was selected for the following reasons:

1. **Comprehensive Component Library**: MUI provides a wide range of components that cover most UI needs, from basic inputs to complex data displays.

2. **Customization and Theming**: MUI offers robust theming capabilities that allow for consistent styling across the application while maintaining the ability to customize the look and feel.

3. **Accessibility**: MUI components are built with accessibility in mind, following WAI-ARIA standards and providing keyboard navigation support.

4. **TypeScript Support**: MUI has excellent TypeScript definitions, making it easy to integrate with our TypeScript codebase.

5. **Active Development and Community**: MUI has a large and active community, regular updates, and extensive documentation, ensuring long-term viability.

6. **Performance Optimization**: MUI v5 includes performance improvements such as reduced bundle size and better rendering performance.

7. **Responsive Design**: MUI components are designed to work well on all device sizes, with built-in responsive behavior.

8. **Integration with React**: MUI is specifically designed for React and works well with modern React patterns like hooks.

Alternative libraries considered:

1. **Chakra UI**: While Chakra UI offers excellent developer experience and accessibility, it has a smaller component set and community compared to MUI.

2. **Ant Design**: Ant Design provides a comprehensive set of components but has a more opinionated design system that would require more customization to match the Hypatia brand.

3. **Tailwind CSS**: Tailwind offers great flexibility but would require building components from scratch, increasing development time.

4. **Bootstrap**: While widely used, Bootstrap's React implementation is less mature than MUI and would require more custom styling.

## Consequences

### Positive
- Accelerated development with pre-built, high-quality components
- Consistent UI across the application
- Built-in accessibility support
- Responsive design out of the box
- Strong TypeScript integration
- Comprehensive documentation and examples

### Negative
- Learning curve for developers not familiar with MUI
- Potential for "Material Design" look if not properly themed
- Larger bundle size compared to minimal UI libraries
- Some customizations may require overriding default styles
- Dependency on a third-party library for core UI components

## Implementation Strategy

1. **Set Up MUI**: Install and configure MUI in the project
2. **Create Custom Theme**: Develop a custom theme that aligns with the Hypatia brand
3. **Build Component Library**: Create a library of common components based on MUI
4. **Implement Responsive Layouts**: Use MUI's Grid and Box components for responsive layouts
5. **Add Dark Mode Support**: Implement theme switching functionality

## Example Implementation

### Theme Configuration

```typescript
// theme.ts
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Define color palette
const palette = {
  primary: {
    main: '#1976d2',
    light: '#42a5f5',
    dark: '#1565c0',
    contrastText: '#fff',
  },
  secondary: {
    main: '#9c27b0',
    light: '#ba68c8',
    dark: '#7b1fa2',
    contrastText: '#fff',
  },
  error: {
    main: '#d32f2f',
    light: '#ef5350',
    dark: '#c62828',
    contrastText: '#fff',
  },
  background: {
    default: '#f5f5f5',
    paper: '#fff',
  },
};

// Create the base theme
let theme = createTheme({
  palette,
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

// Make typography responsive
theme = responsiveFontSizes(theme);

export default theme;
```

### Theme Provider Setup

```typescript
// ThemeProvider.tsx
import React from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { useTheme } from '../hooks/useTheme';
import lightTheme from '../themes/lightTheme';
import darkTheme from '../themes/darkTheme';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { theme: themeMode } = useTheme();
  const theme = themeMode === 'light' ? lightTheme : darkTheme;

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
```

### Custom Component Example

```typescript
// components/CourseCard.tsx
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, Chip, styled } from '@mui/material';
import { Course } from '../types/course';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

const CardMediaStyled = styled(CardMedia)(({ theme }) => ({
  paddingTop: '56.25%', // 16:9 aspect ratio
  position: 'relative',
}));

const ChipContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  zIndex: 1,
}));

interface CourseCardProps {
  course: Course;
  onEnroll?: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onEnroll }) => {
  return (
    <StyledCard>
      <CardMediaStyled
        image={course.featuredImage || '/placeholder-course.jpg'}
        title={course.title}
      >
        <ChipContainer>
          {course.level && (
            <Chip
              label={course.level}
              size="small"
              color="primary"
              sx={{ marginRight: 1 }}
            />
          )}
          {course.price > 0 ? (
            <Chip
              label={`$${course.price}`}
              size="small"
              color="secondary"
            />
          ) : (
            <Chip
              label="Free"
              size="small"
              color="success"
            />
          )}
        </ChipContainer>
      </CardMediaStyled>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {course.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {course.description}
        </Typography>
      </CardContent>
      <Box sx={{ p: 2, pt: 0 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={onEnroll}
        >
          {course.enrolled ? 'Continue Learning' : 'Enroll Now'}
        </Button>
      </Box>
    </StyledCard>
  );
};
```

### Page Layout Example

```typescript
// layouts/MainLayout.tsx
import React from 'react';
import { Box, Container, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { Footer } from '../components/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = React.useState(!isMobile);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar open={sidebarOpen} variant={isMobile ? 'temporary' : 'persistent'} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <Toolbar /> {/* Spacer for fixed header */}
        <Container
          maxWidth="lg"
          sx={{
            flexGrow: 1,
            py: 3,
          }}
        >
          {children}
        </Container>
        <Footer />
      </Box>
    </Box>
  );
};
```

## Related Decisions
- ADR 001: Frontend Framework Selection
- ADR 002: State Management Approach
- ADR 004: Build System Selection (Upcoming)
