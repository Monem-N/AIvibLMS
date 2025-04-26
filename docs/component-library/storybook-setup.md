# Storybook Setup for Component Library

This document provides instructions for setting up and using Storybook to create interactive examples for the Hypatia LMS component library.

## What is Storybook?

Storybook is an open-source tool for developing UI components in isolation. It makes building stunning UIs organized and efficient by isolating components, which enables faster and easier development.

## Installation

To add Storybook to the Hypatia LMS project:

```bash
# Navigate to the project root
cd hypatia-modern

# Install Storybook
npx storybook init

# Install additional dependencies
npm install --save-dev @storybook/addon-a11y @storybook/addon-viewport @storybook/addon-controls
```

## Configuration

### Main Configuration

Create or update `.storybook/main.js`:

```javascript
module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "@storybook/addon-viewport"
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5"
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
};
```

### Preview Configuration

Create or update `.storybook/preview.js`:

```javascript
import { themes } from '@storybook/theming';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import '../src/styles/global.css';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    theme: themes.light,
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
  a11y: {
    element: '#root',
    manual: false,
  },
};
```

### Theme Configuration

Create `.storybook/manager.js`:

```javascript
import { addons } from '@storybook/addons';
import { themes } from '@storybook/theming';

addons.setConfig({
  theme: {
    ...themes.light,
    brandTitle: 'Hypatia LMS Component Library',
    brandUrl: 'https://hypatia-lms.com',
    brandImage: '/logo.png',
  },
});
```

## Creating Stories

### Basic Story Structure

Create a story file for each component. For example, `src/components/ui/Button/Button.stories.tsx`:

```tsx
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from './Button';

export default {
  title: 'UI/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary', 'danger'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    onClick: { action: 'clicked' },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  children: 'Primary Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  children: 'Secondary Button',
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  variant: 'tertiary',
  children: 'Tertiary Button',
};

export const Danger = Template.bind({});
Danger.args = {
  variant: 'danger',
  children: 'Danger Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  children: 'Small Button',
};

export const Medium = Template.bind({});
Medium.args = {
  size: 'medium',
  children: 'Medium Button',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  children: 'Large Button',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  children: 'Disabled Button',
};

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
  children: 'Loading Button',
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  fullWidth: true,
  children: 'Full Width Button',
};
```

### Complex Component Story

For more complex components like the GradingForm, create a story with more detailed setup:

```tsx
import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { GradingForm } from './GradingForm';

export default {
  title: 'Feature/GradingForm',
  component: GradingForm,
  parameters: {
    layout: 'padded',
  },
} as ComponentMeta<typeof GradingForm>;

// Create a template for the component
const Template: ComponentStory<typeof GradingForm> = (args) => {
  const [gradeData, setGradeData] = useState(args.gradeData);
  
  const handleChange = (field, value) => {
    setGradeData({
      ...gradeData,
      [field]: value,
    });
  };
  
  return (
    <GradingForm
      {...args}
      gradeData={gradeData}
      onChange={handleChange}
    />
  );
};

// Basic example
export const Basic = Template.bind({});
Basic.args = {
  submission: {
    id: 'submission-1',
    activityId: 'activity-1',
    userId: 'user-1',
    content: 'This is my submission',
    status: 'submitted',
    submittedAt: '2023-08-01T12:00:00Z',
    activity: {
      id: 'activity-1',
      title: 'Assignment 1',
      type: 'assignment',
      points: 100,
    },
    user: {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
    },
  },
  gradeData: {
    score: 85,
    feedback: 'Good work!',
    status: 'graded',
  },
  onSubmit: () => alert('Grade submitted'),
  submitting: false,
};

// Read-only example
export const ReadOnly = Template.bind({});
ReadOnly.args = {
  ...Basic.args,
  readOnly: true,
};

// With rubric example
export const WithRubric = Template.bind({});
WithRubric.args = {
  submission: {
    ...Basic.args.submission,
    activity: {
      ...Basic.args.submission.activity,
      rubric: {
        criteria: [
          {
            id: 'criteria-1',
            title: 'Content',
            points: 40,
            levels: [
              { id: 'level-1', title: 'Excellent', points: 40 },
              { id: 'level-2', title: 'Good', points: 30 },
              { id: 'level-3', title: 'Fair', points: 20 },
              { id: 'level-4', title: 'Poor', points: 10 },
            ],
          },
          {
            id: 'criteria-2',
            title: 'Organization',
            points: 30,
            levels: [
              { id: 'level-1', title: 'Excellent', points: 30 },
              { id: 'level-2', title: 'Good', points: 20 },
              { id: 'level-3', title: 'Fair', points: 10 },
              { id: 'level-4', title: 'Poor', points: 5 },
            ],
          },
          {
            id: 'criteria-3',
            title: 'Grammar',
            points: 30,
            levels: [
              { id: 'level-1', title: 'Excellent', points: 30 },
              { id: 'level-2', title: 'Good', points: 20 },
              { id: 'level-3', title: 'Fair', points: 10 },
              { id: 'level-4', title: 'Poor', points: 5 },
            ],
          },
        ],
      },
    },
  },
  gradeData: {
    score: 85,
    feedback: 'Good work!',
    status: 'graded',
    rubricScores: {
      'criteria-1': 30,
      'criteria-2': 30,
      'criteria-3': 25,
    },
  },
  onSubmit: () => alert('Grade submitted'),
  submitting: false,
};

// Submitting example
export const Submitting = Template.bind({});
Submitting.args = {
  ...Basic.args,
  submitting: true,
};
```

## Running Storybook

To run Storybook locally:

```bash
# Start Storybook development server
npm run storybook
```

This will start Storybook on port 6006. Open your browser and navigate to `http://localhost:6006` to view your component library.

## Building Storybook for Deployment

To build Storybook for deployment:

```bash
# Build Storybook
npm run build-storybook
```

This will create a static build of your Storybook in the `storybook-static` directory, which can be deployed to any static hosting service.

## Best Practices

1. **Organize by Component Type**: Group stories by component type (UI, Form, Navigation, etc.)
2. **Show Variants**: Create stories for all component variants
3. **Show States**: Create stories for different component states (loading, disabled, error, etc.)
4. **Interactive Controls**: Use controls to allow interaction with component props
5. **Accessibility Testing**: Use the a11y addon to test component accessibility
6. **Responsive Testing**: Use the viewport addon to test component responsiveness
7. **Documentation**: Include component documentation in stories

## Integration with Component Documentation

The Storybook setup complements the component documentation by providing interactive examples. When documenting components:

1. Reference the corresponding Storybook story
2. Include a link to the Storybook instance
3. Use Storybook for component development and testing

Example documentation reference:

```markdown
## Interactive Examples

See this component in action in [Storybook](http://localhost:6006/?path=/story/ui-button--primary).
```

## Conclusion

Storybook provides a powerful environment for developing, documenting, and testing UI components. By integrating Storybook with the component library documentation, we create a comprehensive resource for developers working on the Hypatia LMS modernization project.
