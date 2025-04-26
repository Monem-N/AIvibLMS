# Component Conversion Guide

This guide provides step-by-step instructions for converting class components to functional components with hooks in the Hypatia LMS modernization project.

## Why Convert Components?

Converting class components to functional components with hooks offers several benefits:

1. **Simpler Code**: Functional components are generally more concise and easier to read
2. **Better Performance**: Functional components can have better performance characteristics
3. **Hooks API**: Access to the powerful React Hooks API
4. **Easier Testing**: Functional components are typically easier to test
5. **Modern Patterns**: Alignment with modern React best practices

## Conversion Process

Follow these steps to convert a class component to a functional component:

### 1. Identify Component Dependencies

Before converting, identify all dependencies and imports needed by the component:

```jsx
// Original imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
```

### 2. Create a Functional Component Skeleton

Replace the class declaration with a functional component:

```jsx
// Before
class CourseCard extends Component {
  // Component code
}

// After
const CourseCard = (props) => {
  // Component code
};
```

### 3. Convert State to useState Hook

Replace class state with the useState hook:

```jsx
// Before
class CourseCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      loading: true
    };
  }
  
  // Component code
}

// After
const CourseCard = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Component code
};
```

### 4. Convert Lifecycle Methods to useEffect

Replace lifecycle methods with the useEffect hook:

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

### 5. Convert Instance Methods to Functions

Convert instance methods to regular functions or custom hooks:

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

### 6. Replace this.props with props

Replace all instances of `this.props` with `props`:

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

### 7. Replace this.state with State Variables

Replace all instances of `this.state` with the corresponding state variables:

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

### 8. Convert Event Handlers

Convert event handlers to use the state setter functions:

```jsx
// Before
toggleExpanded = () => {
  this.setState(prevState => ({
    expanded: !prevState.expanded
  }));
}

// After
const toggleExpanded = () => {
  setExpanded(prevExpanded => !prevExpanded);
};
```

### 9. Replace refs with useRef

Replace class refs with the useRef hook:

```jsx
// Before
class CourseCard extends Component {
  constructor(props) {
    super(props);
    this.cardRef = React.createRef();
  }
  
  componentDidMount() {
    if (this.cardRef.current) {
      this.cardRef.current.focus();
    }
  }
  
  render() {
    return <div ref={this.cardRef}>{/* Content */}</div>;
  }
}

// After
const CourseCard = (props) => {
  const cardRef = useRef(null);
  
  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.focus();
    }
  }, []);
  
  return <div ref={cardRef}>{/* Content */}</div>;
};
```

### 10. Replace Context with useContext

Replace context consumers with the useContext hook:

```jsx
// Before
class CourseCard extends Component {
  static contextType = ThemeContext;
  
  render() {
    const theme = this.context;
    return <div className={theme}>{/* Content */}</div>;
  }
}

// After
const CourseCard = (props) => {
  const theme = useContext(ThemeContext);
  return <div className={theme}>{/* Content */}</div>;
};
```

### 11. Replace Redux connect with useSelector and useDispatch

Replace Redux connect with the useSelector and useDispatch hooks:

```jsx
// Before
class CourseCard extends Component {
  // Component code
}

const mapStateToProps = (state) => ({
  courses: state.courses.items,
  loading: state.courses.loading
});

const mapDispatchToProps = {
  fetchCourses
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseCard);

// After
const CourseCard = (props) => {
  const courses = useSelector(state => state.courses.items);
  const loading = useSelector(state => state.courses.loading);
  const dispatch = useDispatch();
  
  const handleFetchCourses = () => {
    dispatch(fetchCourses());
  };
  
  // Component code
};

export default CourseCard;
```

### 12. Replace jQuery with React Patterns

Replace jQuery DOM manipulation with React patterns:

```jsx
// Before
componentDidMount() {
  $(this.cardRef.current).fadeIn(500);
}

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

### 13. Update PropTypes

Move PropTypes outside the component:

```jsx
// Before
class CourseCard extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string
  };
  
  // Component code
}

// After
const CourseCard = (props) => {
  // Component code
};

CourseCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string
};
```

### 14. Add TypeScript Types (Optional)

If using TypeScript, add type definitions:

```tsx
// Before
class CourseCard extends Component {
  // Component code
}

// After
interface CourseCardProps {
  title: string;
  description?: string;
  courseId: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ title, description, courseId }) => {
  // Component code
};
```

## Complete Example

### Class Component

```jsx
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCourseDetails } from '../../actions/courseActions';
import $ from 'jquery';

class CourseCard extends Component {
  static propTypes = {
    courseId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    fetchCourseDetails: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      loading: true,
      details: null
    };
    this.cardRef = React.createRef();
  }

  componentDidMount() {
    this.fetchDetails();
    $(this.cardRef.current).fadeIn(500);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.courseId !== this.props.courseId) {
      this.fetchDetails();
    }
  }

  fetchDetails = () => {
    this.setState({ loading: true });
    this.props.fetchCourseDetails(this.props.courseId)
      .then(details => {
        this.setState({
          details,
          loading: false
        });
      });
  }

  toggleExpanded = () => {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }));
  }

  render() {
    const { title, description } = this.props;
    const { expanded, loading, details } = this.state;

    return (
      <div 
        ref={this.cardRef}
        className={`course-card ${expanded ? 'expanded' : 'collapsed'}`}
        onClick={this.toggleExpanded}
      >
        <h3>{title}</h3>
        <p>{description}</p>
        
        {loading ? (
          <div className="loading">Loading details...</div>
        ) : details && (
          <div className="details">
            <p>Instructor: {details.instructor}</p>
            <p>Duration: {details.duration}</p>
            <p>Level: {details.level}</p>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  details: state.courses.details[ownProps.courseId]
});

const mapDispatchToProps = {
  fetchCourseDetails
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseCard);
```

### Functional Component

```jsx
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourseDetails } from '../../actions/courseActions';

const CourseCard = ({ courseId, title, description }) => {
  // State
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  
  // Refs
  const cardRef = useRef(null);
  
  // Redux
  const details = useSelector(state => state.courses.details[courseId]);
  const dispatch = useDispatch();
  
  // Effects
  useEffect(() => {
    fetchDetails();
    setVisible(true); // Replace jQuery fadeIn
  }, []);
  
  useEffect(() => {
    fetchDetails();
  }, [courseId]);
  
  // Methods
  const fetchDetails = () => {
    setLoading(true);
    dispatch(fetchCourseDetails(courseId))
      .then(() => {
        setLoading(false);
      });
  };
  
  const toggleExpanded = () => {
    setExpanded(prevExpanded => !prevExpanded);
  };
  
  // Render
  return (
    <div 
      ref={cardRef}
      className={`course-card ${expanded ? 'expanded' : 'collapsed'} ${visible ? 'visible' : ''}`}
      onClick={toggleExpanded}
    >
      <h3>{title}</h3>
      <p>{description}</p>
      
      {loading ? (
        <div className="loading">Loading details...</div>
      ) : details && (
        <div className="details">
          <p>Instructor: {details.instructor}</p>
          <p>Duration: {details.duration}</p>
          <p>Level: {details.level}</p>
        </div>
      )}
    </div>
  );
};

CourseCard.propTypes = {
  courseId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string
};

export default CourseCard;
```

## Common Challenges and Solutions

### 1. Complex State Logic

For complex state logic, consider using useReducer instead of multiple useState calls:

```jsx
const initialState = {
  expanded: false,
  loading: true,
  details: null,
  error: null
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, details: action.payload, error: null };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'TOGGLE_EXPANDED':
      return { ...state, expanded: !state.expanded };
    default:
      return state;
  }
}

const CourseCard = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  // Component code
};
```

### 2. Handling Instance Variables

For instance variables that don't trigger re-renders, use useRef:

```jsx
// Before
class Component extends React.Component {
  constructor(props) {
    super(props);
    this.timer = null;
  }
  
  componentDidMount() {
    this.timer = setInterval(() => {
      // Do something
    }, 1000);
  }
  
  componentWillUnmount() {
    clearInterval(this.timer);
  }
}

// After
const Component = (props) => {
  const timerRef = useRef(null);
  
  useEffect(() => {
    timerRef.current = setInterval(() => {
      // Do something
    }, 1000);
    
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);
};
```

### 3. Handling getDerivedStateFromProps

For getDerivedStateFromProps, use useEffect with the appropriate dependencies:

```jsx
// Before
static getDerivedStateFromProps(nextProps, prevState) {
  if (nextProps.value !== prevState.value) {
    return { value: nextProps.value };
  }
  return null;
}

// After
const [value, setValue] = useState(props.value);

useEffect(() => {
  setValue(props.value);
}, [props.value]);
```

### 4. Handling forceUpdate

For forceUpdate, use a state update to trigger a re-render:

```jsx
// Before
forceUpdate() {
  this.forceUpdate();
}

// After
const [, forceUpdate] = useReducer(x => x + 1, 0);

const handleForceUpdate = () => {
  forceUpdate();
};
```

## Testing Converted Components

After converting a component, make sure to test it thoroughly:

1. **Unit Tests**: Update unit tests to work with functional components
2. **Integration Tests**: Verify that the component works correctly with other components
3. **Manual Testing**: Test the component in the browser to ensure it behaves as expected

## Conclusion

Converting class components to functional components is a key part of our technical debt reduction strategy. By following this guide, you can systematically convert components while maintaining functionality and improving code quality.

Remember to:
1. Start with simpler components
2. Test thoroughly after conversion
3. Update documentation
4. Update the component inventory tracking system

For any questions or assistance with component conversion, please contact the Technical Lead.
