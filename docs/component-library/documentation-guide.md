# Component Documentation Guide

This guide provides instructions and best practices for documenting components in the Hypatia LMS component library.

## Why Document Components?

Comprehensive component documentation provides several benefits:

1. **Improved Developer Experience**: Makes it easier for developers to use components correctly
2. **Reduced Duplication**: Prevents creation of duplicate components
3. **Consistent Implementation**: Ensures components are used consistently
4. **Easier Onboarding**: Helps new team members understand the component library
5. **Better Maintenance**: Makes it easier to maintain and update components

## Documentation Process

### 1. Identify Components to Document

- Review the [documentation progress tracker](./documentation-progress.md) to identify components that need documentation
- Prioritize components based on their usage frequency and importance
- Coordinate with the Frontend Lead to ensure you're working on the right components

### 2. Research the Component

Before writing documentation, gather information about the component:

- Review the component's source code
- Understand the component's purpose and use cases
- Identify all props and their types
- Note any dependencies or related components
- Test the component to understand its behavior

### 3. Create the Documentation File

- Create a new Markdown file in the appropriate directory
- Use the [component template](./component-template.md) as a starting point
- Name the file according to the component name (e.g., `Button.md`)

### 4. Write the Documentation

Follow the template structure and include:

- **Component Name and Description**: Clearly describe the component's purpose
- **Usage**: Show how to import and use the component
- **Props**: Document all props with types, defaults, and descriptions
- **Examples**: Provide examples for common use cases
- **Features**: Highlight key features
- **Accessibility**: Document accessibility considerations
- **Edge Cases**: Note any edge cases or limitations
- **Implementation Details**: Provide a simplified implementation
- **Related Components**: Link to related components

### 5. Create Storybook Examples

- Create a Storybook story file for the component
- Implement examples that match the documentation
- Test the examples to ensure they work correctly
- Link to the Storybook examples from the documentation

### 6. Review the Documentation

- Use the [documentation checklist](./documentation-checklist.md) to ensure completeness
- Review the documentation yourself for accuracy and clarity
- Ask a peer to review the documentation
- Submit the documentation for review by the Frontend Lead

### 7. Update the Progress Tracker

- Update the [documentation progress tracker](./documentation-progress.md) with the status of your documentation
- Mark the component as "In Progress" while working on it
- Mark it as "Complete" when it's been approved

## Documentation Best Practices

### Be Clear and Concise

- Use simple, direct language
- Avoid jargon and technical terms when possible
- Explain complex concepts clearly
- Use short paragraphs and bullet points for readability

### Be Comprehensive

- Document all props, even if they seem obvious
- Include examples for all common use cases
- Document edge cases and limitations
- Explain accessibility considerations

### Be Accurate

- Ensure code examples are correct and up-to-date
- Test examples to verify they work as described
- Verify prop types and defaults match the actual implementation
- Update documentation when the component changes

### Be Consistent

- Follow the established template
- Use consistent terminology
- Format code examples consistently
- Use consistent naming conventions

### Focus on the Developer Experience

- Write documentation from the perspective of a developer using the component
- Anticipate questions and provide answers
- Make it easy to find information
- Provide helpful tips and best practices

## Writing Style Guidelines

### Headings

- Use sentence case for headings (capitalize first word only)
- Use heading levels (H1, H2, H3) to create a clear hierarchy
- Keep headings concise and descriptive

### Code Examples

- Use syntax highlighting for code examples
- Format code examples consistently
- Include imports in examples
- Use realistic prop values

### Props Documentation

- List props in a table format
- Include type, default, required status, and description for each prop
- Document complex prop types with TypeScript interfaces
- Provide examples for props with complex values

### Language and Tone

- Use active voice
- Write in present tense
- Be direct and straightforward
- Maintain a professional, helpful tone

## Example Documentation

Here's an excerpt from well-documented component:

```markdown
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
```

## Common Documentation Mistakes

- **Incomplete prop documentation**: Missing props or prop details
- **Outdated examples**: Examples that don't match the current implementation
- **Missing edge cases**: Not documenting limitations or special cases
- **Unclear descriptions**: Vague or confusing explanations
- **Inconsistent formatting**: Mixing different styles or formats
- **Assuming knowledge**: Not explaining concepts that may be unfamiliar
- **No accessibility information**: Failing to document accessibility considerations

## Getting Help

If you have questions about documenting components:

- Consult the Frontend Lead
- Ask for help in the #frontend channel
- Review existing documentation for similar components
- Refer to this guide and the component template

## Conclusion

Good documentation is essential for a successful component library. By following this guide and the provided templates, you'll create documentation that helps developers use components effectively and consistently.
