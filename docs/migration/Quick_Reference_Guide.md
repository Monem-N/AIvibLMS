# Hypatia LMS Modernization Quick Reference Guide

This quick reference guide provides a concise summary of the key patterns and practices for the Hypatia LMS modernization project. For more detailed information, refer to the [Migration Guide](./Migration_Guide.md).

## Component Conversion Cheat Sheet

### Class to Functional Component

```jsx
// Before
class CourseCard extends Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }
  
  toggleExpand = () => {
    this.setState({ expanded: !this.state.expanded });
  }
  
  render() {
    return (
      <div onClick={this.toggleExpand}>
        <h3>{this.props.title}</h3>
        {this.state.expanded && <p>{this.props.description}</p>}
      </div>
    );
  }
}

// After
const CourseCard = ({ title, description }) => {
  const [expanded, setExpanded] = useState(false);
  
  const toggleExpand = () => {
    setExpanded(prevExpanded => !prevExpanded);
  };
  
  return (
    <div onClick={toggleExpand}>
      <h3>{title}</h3>
      {expanded && <p>{description}</p>}
    </div>
  );
};
```

### Lifecycle Methods to Hooks

```jsx
// Before
componentDidMount() {
  this.fetchData();
}

componentDidUpdate(prevProps) {
  if (prevProps.id !== this.props.id) {
    this.fetchData();
  }
}

componentWillUnmount() {
  this.cleanup();
}

// After
useEffect(() => {
  fetchData();
  
  return () => {
    cleanup();
  };
}, []); // Empty dependency array = componentDidMount + componentWillUnmount

useEffect(() => {
  fetchData();
}, [id]); // Dependency array with id = componentDidUpdate when id changes
```

### jQuery to React

```jsx
// Before
componentDidMount() {
  $(this.element).fadeIn(500);
  $(this.element).on('click', this.handleClick);
}

// After
const [visible, setVisible] = useState(false);

useEffect(() => {
  setVisible(true);
}, []);

// In CSS:
// .element { opacity: 0; transition: opacity 0.5s; }
// .element.visible { opacity: 1; }

return (
  <div 
    className={`element ${visible ? 'visible' : ''}`}
    onClick={handleClick}
  >
    {/* content */}
  </div>
);
```

### Redux Connect to Hooks

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
const CourseList = () => {
  const courses = useSelector(state => state.courses.items);
  const loading = useSelector(state => state.courses.loading);
  const dispatch = useDispatch();
  
  const handleFetchCourses = useCallback(() => {
    dispatch(fetchCourses());
  }, [dispatch]);
  
  // Component code
};

export default CourseList;
```

## TypeScript Cheat Sheet

### Props Interface

```tsx
interface CourseCardProps {
  courseId: string;
  title: string;
  description?: string;
  onEnroll?: (courseId: string) => void;
  status: 'published' | 'draft' | 'archived';
}

const CourseCard: React.FC<CourseCardProps> = ({ 
  courseId, 
  title, 
  description, 
  onEnroll,
  status
}) => {
  // Component code
};
```

### useState with TypeScript

```tsx
const [expanded, setExpanded] = useState<boolean>(false);
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);
const [error, setError] = useState<string>('');
const [items, setItems] = useState<string[]>([]);
```

### useRef with TypeScript

```tsx
const inputRef = useRef<HTMLInputElement>(null);
const buttonRef = useRef<HTMLButtonElement>(null);
const timerRef = useRef<number | null>(null);
```

### Event Handlers with TypeScript

```tsx
const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
  setName(e.target.value);
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
  e.preventDefault();
  // Submit form
};

const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
  // Handle click
};
```

## Testing Cheat Sheet

### Component Rendering Test

```tsx
it('renders without crashing', () => {
  render(<CourseCard {...mockProps} />);
  
  expect(screen.getByText('Test Course')).toBeInTheDocument();
  expect(screen.getByText('Test Description')).toBeInTheDocument();
});
```

### User Interaction Test

```tsx
it('calls onEnroll when enroll button is clicked', () => {
  const onEnroll = jest.fn();
  
  render(<CourseCard {...mockProps} onEnroll={onEnroll} />);
  
  const enrollButton = screen.getByRole('button', { name: 'Enroll' });
  fireEvent.click(enrollButton);
  
  expect(onEnroll).toHaveBeenCalledWith('123');
});
```

### Async Test

```tsx
it('fetches course details on mount', async () => {
  // Mock fetch
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue({ id: '123', title: 'Test Course' })
  });
  
  render(<CourseDetails courseId="123" />);
  
  // Initially loading
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  
  // Wait for fetch to complete
  await waitFor(() => {
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });
  
  // Course details loaded
  expect(screen.getByText('Test Course')).toBeInTheDocument();
});
```

### Mocking Hooks

```tsx
// Mock useSelector and useDispatch
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

// Mock custom hook
jest.mock('../../hooks/useAuth', () => ({
  useAuth: jest.fn(() => ({
    user: null,
    signIn: jest.fn(),
    signOut: jest.fn()
  }))
}));
```

## Security Cheat Sheet

### XSS Prevention

```jsx
// Sanitize HTML
import DOMPurify from 'dompurify';

const sanitizedHtml = DOMPurify.sanitize(userInput, {
  ALLOWED_TAGS: ['p', 'b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li'],
  ALLOWED_ATTR: ['href', 'target', 'rel']
});

return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
```

### Input Validation

```jsx
const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
};

const handleSubmit = (e) => {
  e.preventDefault();
  
  if (!validateEmail(email)) {
    setError('Please enter a valid email address');
    return;
  }
  
  // Submit form
};
```

## Performance Cheat Sheet

### Memoization

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

### Code Splitting

```jsx
// Code splitting with React.lazy
const CourseDetails = React.lazy(() => import('./CourseDetails'));

// Usage with Suspense
<Suspense fallback={<div>Loading...</div>}>
  <CourseDetails courseId="123" />
</Suspense>
```

## Common Patterns

### Form Handling

```jsx
const [formData, setFormData] = useState({
  name: '',
  email: '',
  password: ''
});

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prevData => ({
    ...prevData,
    [name]: value
  }));
};

const handleSubmit = (e) => {
  e.preventDefault();
  // Submit form
};

return (
  <form onSubmit={handleSubmit}>
    <input
      type="text"
      name="name"
      value={formData.name}
      onChange={handleChange}
    />
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
    />
    <input
      type="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
    />
    <button type="submit">Submit</button>
  </form>
);
```

### Data Fetching

```jsx
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/data');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      setData(result);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  fetchData();
}, []);

if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error}</div>;
if (!data) return <div>No data</div>;

return (
  <div>
    {/* Render data */}
  </div>
);
```

### Custom Hooks

```jsx
// Custom hook for form handling
function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };
  
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prevTouched => ({
      ...prevTouched,
      [name]: true
    }));
  };
  
  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };
  
  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    reset
  };
}

// Usage
const { values, handleChange, handleBlur, reset } = useForm({
  name: '',
  email: '',
  password: ''
});
```

## File Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── ...
│   ├── auth/
│   │   ├── SigninModern.tsx
│   │   ├── SignupModern.tsx
│   │   └── ...
│   ├── dashboard/
│   │   ├── DashboardModern.tsx
│   │   ├── DashboardWidget.tsx
│   │   └── ...
│   └── ...
├── hooks/
│   ├── useAuth.ts
│   ├── useForm.ts
│   └── ...
├── types/
│   ├── user.ts
│   ├── course.ts
│   └── ...
├── services/
│   ├── api.ts
│   ├── auth.ts
│   └── ...
├── utils/
│   ├── validation.ts
│   ├── formatting.ts
│   └── ...
└── ...
```

## Naming Conventions

- **Components**: PascalCase (e.g., `CourseCard.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useAuth.ts`)
- **Types**: PascalCase (e.g., `CourseCardProps`)
- **Functions**: camelCase (e.g., `fetchCourses`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_ITEMS`)
- **Files**: PascalCase for components, camelCase for others
- **Modernized Components**: Add `Modern` suffix (e.g., `CourseCardModern.tsx`)

## Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

- **Type**: feat, fix, docs, style, refactor, test, chore
- **Scope**: component, hook, service, etc.
- **Subject**: Short description of the change
- **Body**: Detailed description of the change
- **Footer**: Breaking changes, references to issues

Example:
```
refactor(CourseCard): Convert to functional component

- Replace class component with functional component
- Remove jQuery dependencies
- Add TypeScript types
- Add tests

Closes #123
```

## Pull Request Template

```markdown
## Description
Brief description of the changes

## Changes
- Detailed list of changes

## Testing
- How to test the changes

## Screenshots
If applicable, add screenshots

## Checklist
- [ ] Code follows project style guide
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] All tests passing
- [ ] No new warnings/errors
```

## Resources

- [Migration Guide](./Migration_Guide.md)
- [Component Conversion Guide](../technical-debt/Component_Conversion_Guide.md)
- [jQuery Removal Guide](../technical-debt/jQuery_Removal_Guide.md)
- [TypeScript Implementation Guide](../technical-debt/TypeScript_Implementation_Guide.md)
- [Testing Implementation Guide](../technical-debt/Testing_Implementation.md)
- [XSS Prevention Guide](../security/XSS_Prevention_Guide.md)
