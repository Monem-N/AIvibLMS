# Component Documentation Workflow

This directory contains tools and templates for the systematic component documentation workflow for the Hypatia LMS modernization project.

## Overview

The component documentation workflow is a systematic process for documenting components in the Hypatia LMS. It ensures consistent, comprehensive, and high-quality documentation across the component library.

The workflow consists of the following steps:

1. Initialize component documentation using the standardized template
2. Document component purpose and specifications
3. Create interactive examples with live code sandbox
4. Document props/API with type definitions
5. Document accessibility features and create compliance report
6. Create version compatibility matrix
7. Conduct technical debt review
8. Validate documentation against checklist
9. Submit for peer review
10. Address feedback and finalize documentation

## Getting Started

### Prerequisites

- Node.js 14+
- Git
- Access to the Hypatia LMS repository

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-org/hypatia-lms.git
   cd hypatia-lms
   ```

2. Make the workflow scripts executable:
   ```bash
   chmod +x docs/component-library/workflow/*.sh
   chmod +x docs/component-library/workflow/*.js
   ```

## Using the Workflow

### Automated Workflow

The easiest way to use the workflow is with the automated script:

```bash
cd docs/component-library/workflow
./document-component.sh ComponentName category
```

For example:
```bash
./document-component.sh Button ui
```

This script will guide you through each step of the documentation process, running the appropriate tools at each stage.

### Manual Workflow

If you prefer to run each step manually, you can use the individual scripts:

1. **Initialize Documentation**:
   ```bash
   node initialize-documentation.js ComponentName category
   ```

2. **Update Progress Tracker**:
   ```bash
   node update-progress.js ComponentName "📝 In Progress" --owner="Your Name"
   ```

3. **Validate Documentation**:
   ```bash
   node validate-documentation.js ../ui/ComponentName.md
   ```

4. **Analyze Technical Debt**:
   ```bash
   node analyze-technical-debt.js ../../src/components/ui/ComponentName.tsx
   ```

## Workflow Tools

### initialize-documentation.js

Creates a new documentation file for a component using the standardized template.

```bash
node initialize-documentation.js ComponentName category
```

### update-progress.js

Updates the documentation progress tracker with the current status of a component.

```bash
node update-progress.js ComponentName status [options]
```

Options:
- `--owner="Name"`: Set the owner of the documentation
- `--due="YYYY-MM-DD"`: Set the due date
- `--review="Status"`: Set the review status

### validate-documentation.js

Validates component documentation against the documentation checklist.

```bash
node validate-documentation.js path/to/documentation.md
```

### analyze-technical-debt.js

Analyzes a component for technical debt issues and generates a technical debt report.

```bash
node analyze-technical-debt.js path/to/component.tsx
```

## Templates

### component-template.md

The standardized template for component documentation.

### accessibility-checklist.md

Checklist for ensuring components meet accessibility standards.

### technical-debt-template.md

Template for documenting technical debt in components.

### version-compatibility-template.md

Template for documenting component version compatibility.

### peer-review-template.md

Template for conducting peer reviews of component documentation.

## Workflow Stages

### 1. Initialize Component Documentation

- Create a new documentation file using the template
- Update the progress tracker
- Create a new branch for the documentation work

### 2. Document Purpose & Specifications

- Document the component description
- Document key features and use cases
- Document design principles or guidelines

### 3. Create Interactive Examples

- Create basic usage examples
- Create examples for different variants and states
- Create examples for common use cases
- Create Storybook stories

### 4. Document Props/API

- Document all props with types, defaults, and descriptions
- Document complex type definitions
- Document methods and event handlers

### 5. Document Accessibility

- Document keyboard navigation support
- Document screen reader compatibility
- Document ARIA attributes
- Document color contrast considerations
- Create accessibility compliance report

### 6. Create Version Compatibility Matrix

- Document version history
- Document breaking changes
- Create migration guides
- Document browser compatibility

### 7. Technical Debt Review

- Identify incomplete legacy patterns
- Document deprecated prop migrations
- List required future optimizations
- Create technical debt records

### 8. Validate Documentation

- Check documentation against checklist
- Ensure all required sections are complete
- Verify examples work correctly

### 9. Peer Review

- Submit documentation for peer review
- Address feedback
- Update documentation based on review

### 10. Component Graduation

- Finalize documentation
- Update progress tracker
- Merge documentation into main branch

## Best Practices

1. **Be Thorough**: Document all aspects of the component, including edge cases and limitations
2. **Be Clear**: Use simple, direct language and provide examples
3. **Be Accurate**: Ensure documentation matches the actual implementation
4. **Be Consistent**: Follow the established templates and guidelines
5. **Be Collaborative**: Seek feedback and review from peers
6. **Be Iterative**: Update documentation as the component evolves

## Troubleshooting

### Common Issues

- **Script Permission Denied**: Run `chmod +x script.js` to make the script executable
- **Component Not Found in Progress Tracker**: Update the progress tracker manually
- **Validation Fails**: Check the validation output for specific issues to fix

### Getting Help

If you encounter issues with the documentation workflow, please contact the Frontend Lead or create an issue in the repository.

## Contributing

To improve the documentation workflow:

1. Create a new branch for your changes
2. Make your changes to the workflow tools or templates
3. Test your changes
4. Submit a pull request

## License

This documentation workflow is part of the Hypatia LMS project and is subject to the same license.
