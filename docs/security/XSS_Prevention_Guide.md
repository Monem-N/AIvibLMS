# XSS Prevention Guide

This guide provides best practices for preventing Cross-Site Scripting (XSS) vulnerabilities in the Hypatia LMS application.

## What is XSS?

Cross-Site Scripting (XSS) is a security vulnerability that allows attackers to inject malicious scripts into web pages viewed by other users. These scripts can steal sensitive information, manipulate the page content, or perform actions on behalf of the user.

## Common XSS Vulnerabilities in React

1. **Unsafe use of `dangerouslySetInnerHTML`**: Directly inserting HTML from user input without sanitization
2. **DOM manipulation with refs**: Using refs to manipulate the DOM directly with user input
3. **Evaluating user input**: Using `eval()` or similar functions with user input
4. **URL manipulation**: Inserting user input into URLs without proper encoding
5. **Event handlers with user input**: Using user input directly in event handlers

## How to Fix XSS Vulnerabilities

### 1. Sanitize HTML with DOMPurify

Always sanitize HTML before using `dangerouslySetInnerHTML`:

```jsx
// VULNERABLE
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// FIXED
import DOMPurify from 'dompurify';

<div dangerouslySetInnerHTML={{ 
  __html: DOMPurify.sanitize(userInput, {
    ALLOWED_TAGS: ['p', 'b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: ['href', 'target', 'rel']
  }) 
}} />
```

### 2. Avoid Direct DOM Manipulation

Avoid using refs to manipulate the DOM directly:

```jsx
// VULNERABLE
<div ref={(el) => {
  if (el) {
    el.innerHTML = userInput;
  }
}} />

// FIXED
import DOMPurify from 'dompurify';

<div dangerouslySetInnerHTML={{ 
  __html: DOMPurify.sanitize(userInput) 
}} />
```

### 3. Never Use eval() with User Input

Never use `eval()` or similar functions with user input:

```jsx
// VULNERABLE
eval(`alert('${userInput}')`);

// FIXED
console.log(userInput);
// Perform the intended action directly
```

### 4. Encode URL Parameters

Always encode URL parameters:

```jsx
// VULNERABLE
window.location.href = `https://example.com?search=${userInput}`;

// FIXED
window.location.href = `https://example.com?search=${encodeURIComponent(userInput)}`;
```

### 5. Use Safe Event Handlers

Be careful with user input in event handlers:

```jsx
// VULNERABLE
<button onClick={() => eval(userInput)}>Click Me</button>

// FIXED
<button onClick={() => handleClick(userInput)}>Click Me</button>
```

## Best Practices for XSS Prevention

1. **Default to React's Auto-Escaping**: React automatically escapes values embedded in JSX, so use this as your first line of defense.

2. **Minimize use of dangerouslySetInnerHTML**: Only use it when absolutely necessary, and always sanitize the input.

3. **Use Content Security Policy (CSP)**: Implement a strict CSP to prevent execution of unauthorized scripts.

4. **Validate and Sanitize User Input**: Always validate and sanitize user input on both client and server sides.

5. **Use TypeScript**: TypeScript can help prevent some XSS vulnerabilities by enforcing type safety.

6. **Regular Security Audits**: Regularly audit your code for security vulnerabilities.

7. **Keep Dependencies Updated**: Regularly update your dependencies to get security fixes.

## Example: Fixing a Vulnerable Component

### Vulnerable Component

```jsx
const VulnerableComponent = ({ userContent }) => {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: userContent }} />
      <div ref={(el) => {
        if (el) {
          el.innerHTML = userContent;
        }
      }} />
      <button onClick={() => eval(`alert('${userContent}')`)}>
        Click Me
      </button>
    </div>
  );
};
```

### Fixed Component

```jsx
import DOMPurify from 'dompurify';

const SafeComponent = ({ userContent }) => {
  const handleClick = () => {
    console.log(userContent);
    // Perform the intended action directly
  };

  return (
    <div>
      <div dangerouslySetInnerHTML={{ 
        __html: DOMPurify.sanitize(userContent) 
      }} />
      <div>{userContent}</div> {/* Let React handle escaping */}
      <button onClick={handleClick}>
        Click Me
      </button>
    </div>
  );
};
```

## Tools for XSS Prevention

1. **DOMPurify**: A library for sanitizing HTML and preventing XSS attacks
2. **ESLint with security plugins**: Use ESLint with security plugins to catch potential vulnerabilities
3. **Content Security Policy (CSP)**: Implement a strict CSP to prevent execution of unauthorized scripts
4. **React Helmet**: Use React Helmet to set security headers
5. **Security Testing Tools**: Use tools like OWASP ZAP to test for XSS vulnerabilities

## References

- [OWASP XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [React Security Documentation](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml)
- [DOMPurify Documentation](https://github.com/cure53/DOMPurify)
- [Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
