# Hypatia LMS Modernization Migration Guide

This guide provides comprehensive instructions for migrating components and features from the legacy Hypatia LMS codebase to the modernized architecture. It serves as the primary reference for developers working on the modernization project.

## Table of Contents

1. [Introduction](#introduction)
2. [Modernization Approach](#modernization-approach)
3. [Component Migration Process](#component-migration-process)
4. [State Management Migration](#state-management-migration)
5. [API Integration Migration](#api-integration-migration)
6. [Testing Guidelines](#testing-guidelines)
7. [TypeScript Migration](#typescript-migration)
8. [Security Best Practices](#security-best-practices)
9. [Performance Considerations](#performance-considerations)
10. [Code Review Checklist](#code-review-checklist)

## Introduction

The Hypatia LMS modernization project aims to update the codebase to use modern React patterns, remove jQuery dependencies, implement TypeScript, and improve overall code quality and maintainability. This guide provides a structured approach to migrating components and features from the legacy codebase to the modernized architecture.

### Key Modernization Goals

1. Convert class components to functional components with hooks
2. Remove jQuery dependencies
3. Implement TypeScript
4. Improve component architecture
5. Enhance security
6. Improve performance
7. Increase test coverage

## Modernization Approach

We are following a component-first approach to modernization, focusing on converting high-priority components first and then gradually migrating the rest of the codebase. The modernization process is divided into the following phases:

1. **Discovery and Planning**: Analyze the component, identify dependencies, and plan the migration approach
2. **Component Conversion**: Convert the component from class to functional, remove jQuery dependencies
3. **TypeScript Implementation**: Add TypeScript types to the component
4. **Testing**: Write tests for the component
5. **Documentation**: Document the component's API and usage
6. **Review and Refinement**: Review the component for quality, performance, and security

### Prioritization Criteria

Components are prioritized for modernization based on the following criteria:

1. **Usage Frequency**: Components used across multiple pages
2. **Complexity**: Components with complex state management or DOM manipulation
3. **jQuery Dependency**: Components with heavy jQuery usage
4. **Security Impact**: Components handling sensitive data or user input
5. **Performance Impact**: Components affecting critical user flows

## Component Migration Process

### Step 1: Component Analysis

Before migrating a component, analyze it to understand its functionality, dependencies, and integration points:

1. Identify the component's purpose and functionality
2. List all props, state variables, and lifecycle methods
3. Identify jQuery dependencies and DOM manipulations
4. Note any Redux or context usage
5. Identify any security or performance concerns

Use the Component Inventory tool to help with this analysis:

```bash
node tools/component-inventory/generate-inventory.js
```

### Step 2: Create a New Component

Create a new component file with the modernized naming convention:

```
// Legacy component
src/components/CourseCard.jsx

// Modernized component
src/components/CourseCardModern.tsx
```

### Step 3: Convert Class Component to Functional Component

Follow these steps to convert a class component to a functional component:

1. **Create the functional component skeleton**:

```jsx
// Before
class CourseCard extends Component {
  // Component code
}

// After
const CourseCardModern: React.FC<CourseCardProps> = (props) => {
  // Component code
};
```

2. **Convert state to useState hooks**:

```jsx
// Before
constructor(props) {
  super(props);
  this.state = {
    expanded: false,
    loading: true
  };
}

// After
const [expanded, setExpanded] = useState<boolean>(false);
const [loading, setLoading] = useState<boolean>(true);
```

3. **Convert lifecycle methods to useEffect**:

```jsx
// Before
componentDidMount() {
  this.fetchCourseDetails();
}

componentDidUpdate(prevProps) {
  if (prevProps.courseId !== this.props.courseId) {
    this.fetchCourseDetails();
  }
}

// After
useEffect(() => {
  fetchCourseDetails();
}, []); // Empty dependency array = componentDidMount

useEffect(() => {
  fetchCourseDetails();
}, [props.courseId]); // Dependency array with courseId = componentDidUpdate when courseId changes
```

4. **Convert instance methods to functions**:

```jsx
// Before
fetchCourseDetails() {
  this.setState({ loading: true });
  fetch(`/api/courses/${this.props.courseId}`)
    .then(response => response.json())
    .then(data => {
      this.setState({ 
        courseDetails: data,
        loading: false
      });
    });
}

// After
const fetchCourseDetails = () => {
  setLoading(true);
  fetch(`/api/courses/${props.courseId}`)
    .then(response => response.json())
    .then(data => {
      setCourseDetails(data);
      setLoading(false);
    });
};
```

5. **Replace this.props with props**:

```jsx
// Before
render() {
  const { title, description } = this.props;
  
  return (
    <div className="course-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

// After
const { title, description } = props;

return (
  <div className="course-card">
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);
```

6. **Replace this.state with state variables**:

```jsx
// Before
render() {
  const { expanded, loading } = this.state;
  
  return (
    <div className="course-card">
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className={expanded ? 'expanded' : 'collapsed'}>
          {/* Content */}
        </div>
      )}
    </div>
  );
}

// After
return (
  <div className="course-card">
    {loading ? (
      <div className="loading">Loading...</div>
    ) : (
      <div className={expanded ? 'expanded' : 'collapsed'}>
        {/* Content */}
      </div>
    )}
  </div>
);
```

For more detailed examples, refer to the [Component Conversion Guide](../technical-debt/Component_Conversion_Guide.md).

### Step 4: Remove jQuery Dependencies

Replace jQuery DOM manipulations with React patterns:

1. **Replace jQuery selectors with refs**:

```jsx
// Before
componentDidMount() {
  $(this.cardRef).addClass('loaded');
}

// After
const cardRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (cardRef.current) {
    cardRef.current.classList.add('loaded');
  }
}, []);
```

2. **Replace jQuery animations with CSS transitions**:

```jsx
// Before
$(this.cardRef).fadeIn(500);

// After
const [visible, setVisible] = useState(false);

useEffect(() => {
  setVisible(true);
}, []);

// In CSS:
// .card { opacity: 0; transition: opacity 0.5s; }
// .card.visible { opacity: 1; }

return (
  <div className={`card ${visible ? 'visible' : ''}`}>
    {/* Content */}
  </div>
);
```

3. **Replace jQuery event handling with React events**:

```jsx
// Before
$(this.cardRef).on('click', this.handleClick);

// After
return (
  <div onClick={handleClick}>
    {/* Content */}
  </div>
);
```

For more detailed examples, refer to the [jQuery Removal Guide](../technical-debt/jQuery_Removal_Guide.md).

### Step 5: Add TypeScript Types

Add TypeScript types to the component:

1. **Create an interface for props**:

```tsx
interface CourseCardProps {
  courseId: string;
  title: string;
  description?: string;
  onEnroll?: (courseId: string) => void;
}
```

2. **Add type annotations to state variables**:

```tsx
const [expanded, setExpanded] = useState<boolean>(false);
const [loading, setLoading] = useState<boolean>(true);
const [courseDetails, setCourseDetails] = useState<CourseDetails | null>(null);
```

3. **Add type annotations to functions**:

```tsx
const handleEnroll = (): void => {
  if (props.onEnroll) {
    props.onEnroll(props.courseId);
  }
};

const fetchCourseDetails = async (): Promise<void> => {
  try {
    setLoading(true);
    const response = await fetch(`/api/courses/${props.courseId}`);
    const data: CourseDetails = await response.json();
    setCourseDetails(data);
    setLoading(false);
  } catch (error) {
    console.error('Error fetching course details:', error);
    setLoading(false);
  }
};
```

For more detailed examples, refer to the [TypeScript Implementation Guide](../technical-debt/TypeScript_Implementation_Guide.md).

### Step 6: Write Tests

Write tests for the component using Jest and React Testing Library:

```tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CourseCardModern from '../CourseCardModern';

describe('CourseCardModern Component', () => {
  const mockProps = {
    courseId: '123',
    title: 'Test Course',
    description: 'Test Description',
    onEnroll: jest.fn()
  };
  
  it('renders without crashing', () => {
    render(<CourseCardModern {...mockProps} />);
    
    expect(screen.getByText('Test Course')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });
  
  it('calls onEnroll when enroll button is clicked', () => {
    render(<CourseCardModern {...mockProps} />);
    
    const enrollButton = screen.getByRole('button', { name: 'Enroll' });
    fireEvent.click(enrollButton);
    
    expect(mockProps.onEnroll).toHaveBeenCalledWith('123');
  });
});
```

For more detailed examples, refer to the [Testing Implementation Guide](../technical-debt/Testing_Implementation.md).

## State Management Migration

### Redux Migration

When migrating Redux-connected components:

1. **Replace connect HOC with hooks**:

```jsx
// Before
const mapStateToProps = (state) => ({
  courses: state.courses.items,
  loading: state.courses.loading
});

const mapDispatchToProps = {
  fetchCourses
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseList);

// After
const CourseListModern: React.FC = () => {
  const courses = useSelector((state: RootState) => state.courses.items);
  const loading = useSelector((state: RootState) => state.courses.loading);
  const dispatch = useDispatch();
  
  const handleFetchCourses = () => {
    dispatch(fetchCourses());
  };
  
  // Component code
};

export default CourseListModern;
```

2. **Add TypeScript types to Redux**:

```tsx
// src/types/state.ts
export interface RootState {
  courses: CoursesState;
  auth: AuthState;
  // Other state slices
}

export interface CoursesState {
  items: Course[];
  loading: boolean;
  error: string | null;
}
```

### Context API Migration

When migrating components using Context API:

1. **Replace context consumers with useContext hook**:

```jsx
// Before
<ThemeContext.Consumer>
  {theme => (
    <div className={theme}>
      {/* Content */}
    </div>
  )}
</ThemeContext.Consumer>

// After
const theme = useContext(ThemeContext);

return (
  <div className={theme}>
    {/* Content */}
  </div>
);
```

## API Integration Migration

### Fetch API

Replace jQuery AJAX with Fetch API:

```jsx
// Before
$.ajax({
  url: '/api/courses',
  method: 'GET',
  success: function(data) {
    // Handle success
  },
  error: function(error) {
    // Handle error
  }
});

// After
fetch('/api/courses')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Handle success
  })
  .catch(error => {
    // Handle error
  });
```

### Axios

Alternatively, use Axios for API calls:

```jsx
// Before
$.ajax({
  url: '/api/courses',
  method: 'GET',
  success: function(data) {
    // Handle success
  },
  error: function(error) {
    // Handle error
  }
});

// After
import axios from 'axios';

axios.get('/api/courses')
  .then(response => {
    // Handle success
    const data = response.data;
  })
  .catch(error => {
    // Handle error
  });
```

### Custom Hooks for API Calls

Create custom hooks for API calls:

```tsx
// src/hooks/useCourses.ts
export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/courses');
      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }
      const data = await response.json();
      setCourses(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchCourses();
  }, []);
  
  return { courses, loading, error, refetch: fetchCourses };
}

// Usage in component
const { courses, loading, error, refetch } = useCourses();
```

## Testing Guidelines

### Component Testing

When writing tests for components:

1. **Test rendering**: Test that the component renders correctly with different props
2. **Test user interactions**: Test how the component responds to user interactions
3. **Test state changes**: Test that the component's state changes correctly
4. **Test error handling**: Test how the component handles error conditions

```tsx
// Example component test
it('toggles expanded state when header is clicked', () => {
  render(<CourseCardModern {...mockProps} />);
  
  const header = screen.getByText('Test Course');
  
  // Initially not expanded
  expect(screen.queryByText('Course details')).not.toBeInTheDocument();
  
  // Click to expand
  fireEvent.click(header);
  
  // Now expanded
  expect(screen.getByText('Course details')).toBeInTheDocument();
  
  // Click to collapse
  fireEvent.click(header);
  
  // No longer expanded
  expect(screen.queryByText('Course details')).not.toBeInTheDocument();
});
```

### Hook Testing

When writing tests for custom hooks:

1. **Use renderHook**: Use the renderHook utility from @testing-library/react-hooks
2. **Test initial state**: Test the initial state of the hook
3. **Test state changes**: Test how the hook's state changes in response to actions
4. **Test error handling**: Test how the hook handles error conditions

```tsx
// Example hook test
it('fetches courses on mount', async () => {
  // Mock fetch
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue([{ id: '1', title: 'Test Course' }])
  });
  
  const { result, waitForNextUpdate } = renderHook(() => useCourses());
  
  // Initially loading
  expect(result.current.loading).toBe(true);
  expect(result.current.courses).toEqual([]);
  
  // Wait for fetch to complete
  await waitForNextUpdate();
  
  // No longer loading, courses loaded
  expect(result.current.loading).toBe(false);
  expect(result.current.courses).toEqual([{ id: '1', title: 'Test Course' }]);
});
```

For more detailed examples, refer to the [Testing Implementation Guide](../technical-debt/Testing_Implementation.md).

## TypeScript Migration

### Adding TypeScript to Components

When adding TypeScript to components:

1. **Create interfaces for props and state**:

```tsx
interface CourseCardProps {
  courseId: string;
  title: string;
  description?: string;
  onEnroll?: (courseId: string) => void;
}

interface CourseDetails {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: string;
}
```

2. **Add type annotations to hooks**:

```tsx
const [expanded, setExpanded] = useState<boolean>(false);
const [loading, setLoading] = useState<boolean>(true);
const [courseDetails, setCourseDetails] = useState<CourseDetails | null>(null);
```

3. **Add return types to functions**:

```tsx
const handleEnroll = (): void => {
  if (props.onEnroll) {
    props.onEnroll(props.courseId);
  }
};

const fetchCourseDetails = async (): Promise<void> => {
  // Implementation
};
```

### TypeScript Best Practices

1. **Use interfaces for objects**: Use interfaces for defining object shapes
2. **Use type for unions and intersections**: Use type for defining union and intersection types
3. **Use enums for related constants**: Use enums for defining related constants
4. **Use generics for reusable components**: Use generics for creating reusable components
5. **Use type guards**: Use type guards for narrowing types

For more detailed examples, refer to the [TypeScript Implementation Guide](../technical-debt/TypeScript_Implementation_Guide.md).

## Security Best Practices

### XSS Prevention

When handling user input:

1. **Avoid dangerouslySetInnerHTML**: Avoid using dangerouslySetInnerHTML when possible
2. **Sanitize HTML**: Use DOMPurify to sanitize HTML before rendering it
3. **Use React's auto-escaping**: Let React handle escaping by default
4. **Validate user input**: Validate user input on both client and server sides

```jsx
// Before (vulnerable)
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// After (safe)
import DOMPurify from 'dompurify';

<div dangerouslySetInnerHTML={{ 
  __html: DOMPurify.sanitize(userInput, {
    ALLOWED_TAGS: ['p', 'b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: ['href', 'target', 'rel']
  }) 
}} />
```

### CSRF Protection

When making API calls:

1. **Use CSRF tokens**: Include CSRF tokens in API requests
2. **Use same-origin cookies**: Use same-origin cookies for authentication
3. **Use proper HTTP methods**: Use proper HTTP methods for different operations

```jsx
// Include CSRF token in API requests
fetch('/api/courses', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
  },
  body: JSON.stringify(data)
});
```

For more detailed examples, refer to the [XSS Prevention Guide](../security/XSS_Prevention_Guide.md).

## Performance Considerations

### React Performance

When optimizing React components:

1. **Use React.memo**: Use React.memo to memoize components
2. **Use useCallback**: Use useCallback to memoize callback functions
3. **Use useMemo**: Use useMemo to memoize expensive calculations
4. **Avoid unnecessary renders**: Avoid unnecessary renders by optimizing component structure
5. **Use virtualization**: Use virtualization for long lists

```jsx
// Memoize component
const CourseCard = React.memo(({ course, onEnroll }) => {
  // Component code
});

// Memoize callback
const handleEnroll = useCallback(() => {
  onEnroll(course.id);
}, [course.id, onEnroll]);

// Memoize expensive calculation
const sortedCourses = useMemo(() => {
  return [...courses].sort((a, b) => a.title.localeCompare(b.title));
}, [courses]);
```

### Bundle Size Optimization

When optimizing bundle size:

1. **Use code splitting**: Use code splitting to load code on demand
2. **Use tree shaking**: Use tree shaking to eliminate dead code
3. **Optimize dependencies**: Optimize dependencies by using smaller alternatives
4. **Use dynamic imports**: Use dynamic imports for large dependencies

```jsx
// Code splitting with React.lazy
const CourseDetails = React.lazy(() => import('./CourseDetails'));

// Dynamic import
import('large-library').then(module => {
  // Use module
});
```

## Code Review Checklist

Use this checklist when reviewing modernized components:

### Functionality

- [ ] Component works as expected
- [ ] All features from the original component are preserved
- [ ] Edge cases are handled properly
- [ ] Error handling is implemented

### Code Quality

- [ ] Code follows project style guide
- [ ] No unnecessary complexity
- [ ] No duplicate code
- [ ] Clear variable and function names
- [ ] Proper comments and documentation

### React Best Practices

- [ ] Uses functional components with hooks
- [ ] No unnecessary state
- [ ] Proper use of useEffect
- [ ] Proper use of useCallback and useMemo
- [ ] No direct DOM manipulation

### TypeScript

- [ ] Proper type definitions
- [ ] No any types
- [ ] Proper use of interfaces and types
- [ ] Proper use of generics
- [ ] No type assertions without validation

### Testing

- [ ] Tests cover all component functionality
- [ ] Tests for edge cases
- [ ] Tests for error handling
- [ ] Tests for user interactions
- [ ] Tests for state changes

### Security

- [ ] No XSS vulnerabilities
- [ ] Proper input validation
- [ ] No sensitive data exposure
- [ ] Proper authentication and authorization
- [ ] No insecure direct object references

### Performance

- [ ] No unnecessary renders
- [ ] Proper use of memoization
- [ ] No expensive calculations in render
- [ ] Proper handling of large lists
- [ ] No memory leaks

## Conclusion

This migration guide provides a comprehensive approach to modernizing the Hypatia LMS codebase. By following these guidelines, developers can ensure a consistent and high-quality modernization process that preserves functionality while improving code quality, maintainability, and security.

For more detailed information on specific aspects of the modernization process, refer to the linked guides in each section.
