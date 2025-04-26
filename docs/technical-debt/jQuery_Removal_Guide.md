# jQuery Removal Guide

This guide provides strategies and patterns for removing jQuery dependencies from the Hypatia LMS codebase. Removing jQuery is a key part of our technical debt reduction strategy, as it will reduce bundle size, improve performance, and align our codebase with modern React best practices.

## Why Remove jQuery?

1. **Bundle Size**: jQuery adds approximately 30KB to our bundle size
2. **Performance**: React's virtual DOM provides better performance than direct DOM manipulation
3. **Modern Practices**: Direct DOM manipulation conflicts with React's declarative paradigm
4. **Maintenance**: Mixing React and jQuery creates confusing code patterns
5. **Testing**: jQuery DOM manipulations are harder to test than React components

## Common jQuery Patterns and React Alternatives

### 1. DOM Selection and Manipulation

#### jQuery:
```javascript
$('.element').addClass('active');
$('.element').removeClass('active');
$('.element').toggleClass('active');
```

#### React:
```jsx
// Using state to control classes
const [isActive, setIsActive] = useState(false);

return (
  <div className={isActive ? 'element active' : 'element'}>
    {/* content */}
  </div>
);

// Or with multiple classes
const [classes, setClasses] = useState({
  active: false,
  highlighted: true
});

return (
  <div className={`element ${classes.active ? 'active' : ''} ${classes.highlighted ? 'highlighted' : ''}`}>
    {/* content */}
  </div>
);
```

### 2. Animations and Transitions

#### jQuery:
```javascript
$('.element').fadeIn(500);
$('.element').fadeOut(500);
$('.element').slideDown(500);
$('.element').slideUp(500);
```

#### React with CSS:
```jsx
// Fade in/out
const [visible, setVisible] = useState(false);

useEffect(() => {
  setVisible(true); // Trigger fade in on mount
}, []);

return (
  <div className={`element ${visible ? 'visible' : ''}`}>
    {/* content */}
  </div>
);

// CSS
.element {
  opacity: 0;
  transition: opacity 0.5s ease;
}

.element.visible {
  opacity: 1;
}
```

#### React with Animation Libraries:
```jsx
// Using react-transition-group
import { CSSTransition } from 'react-transition-group';

const [visible, setVisible] = useState(false);

return (
  <CSSTransition
    in={visible}
    timeout={500}
    classNames="fade"
    unmountOnExit
  >
    <div className="element">
      {/* content */}
    </div>
  </CSSTransition>
);

// CSS
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  opacity: 1;
  transition: opacity 500ms;
}
.fade-exit {
  opacity: 1;
}
.fade-exit-active {
  opacity: 0;
  transition: opacity 500ms;
}
```

### 3. Event Handling

#### jQuery:
```javascript
$('.button').on('click', function() {
  // Handle click
});

$('.input').on('change', function() {
  // Handle change
});
```

#### React:
```jsx
const handleClick = () => {
  // Handle click
};

const handleChange = (e) => {
  // Handle change
};

return (
  <>
    <button onClick={handleClick}>Click Me</button>
    <input onChange={handleChange} />
  </>
);
```

### 4. AJAX Requests

#### jQuery:
```javascript
$.ajax({
  url: '/api/data',
  method: 'GET',
  success: function(data) {
    // Handle success
  },
  error: function(error) {
    // Handle error
  }
});
```

#### React:
```jsx
// Using fetch
const fetchData = async () => {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    // Handle success
  } catch (error) {
    // Handle error
  }
};

// Using axios
import axios from 'axios';

const fetchData = async () => {
  try {
    const response = await axios.get('/api/data');
    // Handle success
  } catch (error) {
    // Handle error
  }
};
```

### 5. DOM Traversal

#### jQuery:
```javascript
const parent = $(element).parent();
const children = $(element).children();
const next = $(element).next();
const prev = $(element).prev();
```

#### React:
```jsx
// In React, you don't need to traverse the DOM
// Instead, structure your components to reflect the hierarchy

return (
  <div className="parent">
    <div className="previous-sibling"></div>
    <div className="current-element">
      <div className="child"></div>
    </div>
    <div className="next-sibling"></div>
  </div>
);
```

### 6. Element Creation and Insertion

#### jQuery:
```javascript
const newElement = $('<div>').addClass('new-element').text('New content');
$('.container').append(newElement);
```

#### React:
```jsx
// In React, you render elements declaratively
const [elements, setElements] = useState([]);

const addElement = () => {
  setElements([...elements, { id: Date.now(), content: 'New content' }]);
};

return (
  <div className="container">
    {elements.map(element => (
      <div key={element.id} className="new-element">
        {element.content}
      </div>
    ))}
    <button onClick={addElement}>Add Element</button>
  </div>
);
```

### 7. Form Handling

#### jQuery:
```javascript
$('#myForm').submit(function(e) {
  e.preventDefault();
  const formData = {
    name: $('#name').val(),
    email: $('#email').val()
  };
  // Submit form data
});
```

#### React:
```jsx
const [formData, setFormData] = useState({
  name: '',
  email: ''
});

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};

const handleSubmit = (e) => {
  e.preventDefault();
  // Submit form data
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
    <button type="submit">Submit</button>
  </form>
);
```

### 8. Element Visibility

#### jQuery:
```javascript
$('.element').show();
$('.element').hide();
$('.element').toggle();
```

#### React:
```jsx
const [visible, setVisible] = useState(false);

const toggleVisibility = () => {
  setVisible(!visible);
};

return (
  <>
    {visible && <div className="element">{/* content */}</div>}
    <button onClick={toggleVisibility}>
      {visible ? 'Hide' : 'Show'}
    </button>
  </>
);
```

### 9. Attribute Manipulation

#### jQuery:
```javascript
$('.element').attr('data-id', '123');
const id = $('.element').attr('data-id');
$('.element').removeAttr('data-id');
```

#### React:
```jsx
const [id, setId] = useState('123');

return (
  <div data-id={id}>
    {/* content */}
  </div>
);
```

### 10. Document Ready

#### jQuery:
```javascript
$(document).ready(function() {
  // Initialize application
});
```

#### React:
```jsx
// In React, you don't need document.ready
// Components are rendered when they're ready

// For initialization logic, use useEffect
useEffect(() => {
  // Initialize application
}, []);
```

## Step-by-Step jQuery Removal Process

### 1. Identify jQuery Usage

Use the component inventory tool to identify components with jQuery dependencies:

```bash
node tools/component-inventory/generate-inventory.js
```

### 2. Prioritize Components

Prioritize components based on:
- Frequency of use
- Complexity of jQuery usage
- Importance to the application

### 3. Create a Replacement Plan

For each component:
1. Identify all jQuery usages
2. Determine the appropriate React alternative for each usage
3. Plan the conversion approach

### 4. Convert One Component at a Time

For each component:
1. Create a new branch for the conversion
2. Implement the React alternatives
3. Test thoroughly
4. Submit a PR for review

### 5. Update Dependencies

Once all jQuery usages are removed:
1. Remove jQuery from package.json
2. Remove jQuery imports from all files
3. Run the application to ensure everything works without jQuery

## Example: Converting a Component with jQuery

### Original Component with jQuery

```jsx
import React, { Component } from 'react';
import $ from 'jquery';

class Accordion extends Component {
  constructor(props) {
    super(props);
    this.accordionRef = React.createRef();
  }

  componentDidMount() {
    $(this.accordionRef.current).find('.accordion-header').on('click', function() {
      $(this).next('.accordion-content').slideToggle(300);
      $(this).toggleClass('active');
    });
  }

  componentWillUnmount() {
    $(this.accordionRef.current).find('.accordion-header').off('click');
  }

  render() {
    return (
      <div className="accordion" ref={this.accordionRef}>
        {this.props.items.map((item, index) => (
          <div key={index} className="accordion-item">
            <div className="accordion-header">{item.title}</div>
            <div className="accordion-content" style={{ display: 'none' }}>
              {item.content}
            </div>
          </div>
        ))}
      </div>
    );
  }
}
```

### Converted Component without jQuery

```jsx
import React, { useState } from 'react';
import './Accordion.css';

const Accordion = ({ items }) => {
  const [activeIndices, setActiveIndices] = useState([]);

  const toggleItem = (index) => {
    setActiveIndices(prevIndices => {
      if (prevIndices.includes(index)) {
        return prevIndices.filter(i => i !== index);
      } else {
        return [...prevIndices, index];
      }
    });
  };

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <div key={index} className="accordion-item">
          <div 
            className={`accordion-header ${activeIndices.includes(index) ? 'active' : ''}`}
            onClick={() => toggleItem(index)}
          >
            {item.title}
          </div>
          <div 
            className={`accordion-content ${activeIndices.includes(index) ? 'expanded' : ''}`}
          >
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
};
```

```css
/* Accordion.css */
.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}

.accordion-content.expanded {
  max-height: 500px; /* Adjust based on content */
}

.accordion-header {
  cursor: pointer;
  padding: 10px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
}

.accordion-header.active {
  background-color: #e0e0e0;
}
```

## Testing jQuery Removal

After removing jQuery from a component:

1. **Unit Tests**: Update and run unit tests to ensure the component behaves correctly
2. **Integration Tests**: Test the component in the context of the application
3. **Visual Regression Tests**: Ensure the component looks and animates correctly
4. **Performance Tests**: Measure the performance improvement

## Common Challenges and Solutions

### 1. Complex jQuery Plugins

For complex jQuery plugins, consider:
- Finding a React-specific alternative
- Creating a custom React component with similar functionality
- Using a React wrapper for the jQuery plugin as a temporary solution

### 2. Direct DOM Manipulation

For direct DOM manipulation:
- Use React refs with caution
- Convert imperative code to declarative React patterns
- Use state and props to control component behavior

### 3. Event Delegation

For event delegation:
- Use React's synthetic event system
- Attach event handlers directly to elements
- Use context or state management for shared event handling

### 4. Animation Complexity

For complex animations:
- Use CSS transitions and animations
- Consider animation libraries like react-transition-group or framer-motion
- Break complex animations into smaller, manageable pieces

## Conclusion

Removing jQuery dependencies is a critical step in modernizing the Hypatia LMS codebase. By following this guide, you can systematically replace jQuery with modern React patterns, resulting in a more maintainable, performant, and consistent codebase.

Remember to:
1. Take a systematic approach
2. Test thoroughly after each conversion
3. Update documentation
4. Track progress using the component inventory tool

For any questions or assistance with jQuery removal, please contact the Technical Lead.
