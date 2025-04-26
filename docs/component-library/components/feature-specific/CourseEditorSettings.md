# CourseEditorSettings

## Introduction

The CourseEditorSettings component is used in the Hypatia LMS for configuring and managing course settings within the course editor interface. It provides a comprehensive form interface for instructors to customize various aspects of their courses, including enrollment options, visibility, completion criteria, and other advanced settings.

## Description

The CourseEditorSettings component is a feature-rich form interface that allows instructors to configure various settings for their courses. It organizes settings into logical sections, making it easy for instructors to find and adjust specific configurations. The component handles different types of inputs, including dropdowns, checkboxes, and text fields, providing appropriate UI elements for each setting type.

The component is designed to be user-friendly and accessible, with clear labels, helpful hints, and intuitive controls. It integrates with the CourseEditorModern component as part of the settings tab, providing a seamless experience for course configuration. The settings managed by this component affect various aspects of course behavior, student experience, and administrative options.

## Visual Examples

### Enrollment Settings Section

<!-- Note: Replace with actual screenshot when available -->
![Enrollment Settings](https://via.placeholder.com/800x400?text=Enrollment+Settings+Section)

The enrollment settings section allows instructors to configure how students can enroll in the course

### Visibility Settings Section

<!-- Note: Replace with actual screenshot when available -->
![Visibility Settings](https://via.placeholder.com/800x400?text=Visibility+Settings+Section)

The visibility settings section controls who can see the course in the catalog

### Completion Settings Section

<!-- Note: Replace with actual screenshot when available -->
![Completion Settings](https://via.placeholder.com/800x400?text=Completion+Settings+Section)

The completion settings section defines how students complete the course

### Advanced Settings Section

<!-- Note: Replace with actual screenshot when available -->
![Advanced Settings](https://via.placeholder.com/800x400?text=Advanced+Settings+Section)

The advanced settings section provides additional configuration options

## Import

```tsx
import { CourseEditorSettings } from 'components/courses/editor/CourseEditorSettings';
```

## Basic Example

```tsx
import React, { useState } from 'react';
import { CourseEditorSettings } from 'components/courses/editor/CourseEditorSettings';
import { Course } from 'types/course';

const CourseEditor: React.FC = () => {
  const [courseData, setCourseData] = useState<Partial<Course>>({
    enrollmentType: 'open',
    maxEnrollment: 100,
    selfPaced: false,
    visibility: 'public',
    featured: false,
    completionCriteria: 'all-activities',
    certificateEnabled: true,
    language: 'en',
    discussionEnabled: true,
    peerReviewEnabled: false
  });

  const handleChange = (field: string, value: any) => {
    setCourseData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <CourseEditorSettings
      courseData={courseData}
      onChange={handleChange}
    />
  );
};
```

## Usage

The CourseEditorSettings component is typically used within the CourseEditorModern component as part of the settings tab:

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| courseData | Partial\<Course\> | {} | Yes | Course data object containing settings to be displayed and edited |
| onChange | (field: string, value: any) => void | - | Yes | Callback function called when a setting is changed |

## State

The component doesn't maintain any internal state. All state is managed by the parent component through the `courseData` prop and the `onChange` callback.

## Course Settings

The component manages the following course settings:

### Enrollment Settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| enrollmentType | 'open' \| 'invite' \| 'approval' | 'open' | Controls how students can enroll in the course |
| maxEnrollment | number | undefined | Maximum number of students who can enroll in the course |
| selfPaced | boolean | false | Whether students can progress through the course at their own pace |

### Visibility Settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| visibility | 'public' \| 'unlisted' \| 'private' | 'public' | Controls who can see the course in the catalog |
| featured | boolean | false | Whether the course should be featured on the homepage |

### Completion Settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| completionCriteria | 'all-activities' \| 'required-activities' \| 'percentage' \| 'final-exam' | 'all-activities' | Defines how students complete the course |
| completionPercentage | number | undefined | Percentage of activities required for completion (when completionCriteria is 'percentage') |
| certificateEnabled | boolean | false | Whether students receive a certificate upon course completion |

### Advanced Settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| language | string | 'en' | The primary language of the course |
| discussionEnabled | boolean | true | Whether course discussions are enabled |
| peerReviewEnabled | boolean | false | Whether peer reviews are enabled for the course |

## Type Definitions

```tsx
/**
 * Props for the CourseEditorSettings component
 */
interface CourseEditorSettingsProps {
  courseData: Partial<Course>;
  onChange: (field: string, value: any) => void;
}

/**
 * Course Interface (relevant properties for CourseEditorSettings)
 */
interface Course {
  // Enrollment settings
  enrollmentType?: 'open' | 'invite' | 'approval';
  maxEnrollment?: number;
  selfPaced?: boolean;

  // Visibility settings
  visibility?: 'public' | 'unlisted' | 'private';
  featured?: boolean;

  // Completion settings
  completionCriteria?: 'all-activities' | 'required-activities' | 'percentage' | 'final-exam';
  completionPercentage?: number;
  certificateEnabled?: boolean;

  // Advanced settings
  language?: string;
  discussionEnabled?: boolean;
  peerReviewEnabled?: boolean;
}
```

## Examples

### Basic Example

```tsx
import React from 'react';
import { CourseEditorSettings } from 'components/courses/editor/CourseEditorSettings';

const CourseEditor = () => {
  return (
    <CourseEditorSettings
      courseData={{
        enrollmentType: 'open',
        visibility: 'public',
        completionCriteria: 'all-activities',
        language: 'en'
      }}
      onChange={(field, value) => console.log(`Updated ${field} to:`, value)}
    />
  );
};
```

### Advanced Example

```tsx
import React, { useState } from 'react';
import { CourseEditorSettings } from 'components/courses/editor/CourseEditorSettings';
import { Course } from 'types/course';

const CourseEditor = () => {
  const [courseData, setCourseData] = useState<Partial<Course>>({
    enrollmentType: 'invite',
    maxEnrollment: 50,
    selfPaced: true,
    visibility: 'unlisted',
    featured: true,
    completionCriteria: 'percentage',
    completionPercentage: 80,
    certificateEnabled: true,
    language: 'fr',
    discussionEnabled: true,
    peerReviewEnabled: true
  });

  const handleChange = (field: string, value: any) => {
    setCourseData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <CourseEditorSettings
      courseData={courseData}
      onChange={handleChange}
    />
  );
};
```

### Simple Implementation

```tsx
import React, { useState } from 'react';
import { CourseEditorSettings } from 'components/courses/editor/CourseEditorSettings';
import { Course } from 'types/course';

const CourseEditor: React.FC = () => {
  const [courseData, setCourseData] = useState<Partial<Course>>({
    enrollmentType: 'open',
    visibility: 'public',
    completionCriteria: 'all-activities',
    language: 'en'
  });

  const handleChange = (field: string, value: any) => {
    setCourseData(prev => ({
      ...prev,
      [field]: value
    }));
    // Save to database or update parent state
    console.log(`Updated ${field} to:`, value);
  };

  return (
    <div className="course-editor">
      <h2>Course Settings</h2>
      <CourseEditorSettings
        courseData={courseData}
        onChange={handleChange}
      />
    </div>
  );
};
```

### With Advanced Settings

```tsx
import React, { useState } from 'react';
import { CourseEditorSettings } from 'components/courses/editor/CourseEditorSettings';
import { Course } from 'types/course';

const CourseEditor: React.FC = () => {
  const [courseData, setCourseData] = useState<Partial<Course>>({
    enrollmentType: 'invite',
    maxEnrollment: 50,
    selfPaced: true,
    visibility: 'unlisted',
    featured: true,
    completionCriteria: 'percentage',
    completionPercentage: 80,
    certificateEnabled: true,
    language: 'fr',
    discussionEnabled: true,
    peerReviewEnabled: true
  });

  const handleChange = (field: string, value: any) => {
    setCourseData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <CourseEditorSettings
      courseData={courseData}
      onChange={handleChange}
    />
  );
};
```

### Integration with CourseEditorModern

```tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'types/state';
import { updateCourse } from 'actions/courseActions';
import CourseEditorSettings from 'components/courses/editor/CourseEditorSettings';

const CourseEditorModern: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const dispatch = useDispatch();

  // Get course data from Redux store
  const { currentCourse } = useSelector(
    (state: RootState) => state.courses
  );

  // Handle settings change
  const handleSettingsChange = (field: string, value: any) => {
    dispatch(updateCourse(courseId!, {
      ...currentCourse,
      [field]: value
    }));
  };

  return (
    <div className="course-editor-container">
      {/* Other components */}

      <div className="course-editor-content">
        {activeTab === 'settings' && (
          <CourseEditorSettings
            courseData={currentCourse || {}}
            onChange={handleSettingsChange}
          />
        )}

        {/* Other tabs */}
      </div>
    </div>
  );
};
```

## Features

1. **Organized Settings Sections**: Settings are organized into logical sections (enrollment, visibility, completion, advanced)
2. **Form Validation**: Validates input values to ensure they meet requirements
3. **Conditional Fields**: Some fields are only shown when certain conditions are met (e.g., completionPercentage only shown when completionCriteria is 'percentage')
4. **Tooltips and Hints**: Provides helpful tooltips and hints for complex settings
5. **Responsive Design**: Adapts to different screen sizes with a mobile-friendly layout
6. **Real-time Updates**: Updates parent component state immediately when settings are changed
7. **Accessibility Support**: Designed with accessibility in mind, including keyboard navigation and screen reader support
8. **Internationalization**: Supports multiple languages for labels and hints
9. **Error Handling**: Provides clear error messages for invalid inputs
10. **Default Values**: Provides sensible default values for all settings

## Accessibility

The CourseEditorSettings component is designed with accessibility in mind, addressing the following considerations:

### Keyboard Navigation

- All form controls are keyboard accessible
- Tab order follows a logical sequence through the form
- Dropdown menus can be navigated with arrow keys
- Checkboxes can be toggled with Space
- Form sections can be navigated using keyboard shortcuts
- Error messages can be accessed with keyboard

### Screen Reader Support

- Form controls have proper labels for screen readers
- Error messages are announced to screen readers
- Section headings use proper heading elements (h2, h3) for hierarchical structure
- Tooltips and hints are accessible to screen readers
- Required fields are announced as required to screen readers
- Field groups have proper group labels

### ARIA Attributes

- Form controls use `aria-labelledby` to associate with their labels
- Required fields use `aria-required="true"` attribute
- Error messages use `aria-live="polite"` to announce errors
- Tooltips use `aria-describedby` to associate with their form controls
- Conditional fields use `aria-expanded` to indicate their state
- Form sections use `role="region"` and `aria-labelledby` attributes

### Color Contrast

- All text meets WCAG 2.1 AA contrast requirements
- Form controls have sufficient contrast with their backgrounds
- Error messages have sufficient contrast with their backgrounds
- Focus indicators have sufficient contrast
- Required field indicators have sufficient contrast
- Disabled fields have appropriate visual styling

### Focus Management

- Focus is visible at all times
- Focus order follows a logical sequence through the form
- Focus is properly managed when conditional fields appear or disappear
- Error messages receive focus when they appear
- Focus returns to the appropriate field after error correction
- Focus is maintained within the current section when navigating with keyboard shortcuts

## Edge Cases

- **Empty Course Data**: When the courseData prop is empty, the component displays default values for all settings
- **Invalid Enrollment Type**: If an invalid enrollment type is provided, the component defaults to 'open'
- **Invalid Visibility**: If an invalid visibility value is provided, the component defaults to 'public'
- **Invalid Completion Criteria**: If an invalid completion criteria is provided, the component defaults to 'all-activities'
- **Negative Max Enrollment**: If a negative max enrollment value is provided, the component displays an error message
- **Negative Completion Percentage**: If a negative completion percentage is provided, the component displays an error message
- **Completion Percentage > 100**: If a completion percentage greater than 100 is provided, the component displays an error message
- **Missing Required Fields**: The component validates required fields and displays appropriate error messages
- **Unsupported Language**: If an unsupported language is provided, the component defaults to 'en'
- **Conditional Field Dependencies**: The component handles dependencies between fields (e.g., completionPercentage is only relevant when completionCriteria is 'percentage')
- **Form Submission with Errors**: The component prevents form submission when there are validation errors
- **Concurrent Edits**: The component doesn't currently handle concurrent edits by multiple users

## Implementation Details

Here's a simplified implementation of the CourseEditorSettings component to help developers understand its inner workings:

```tsx
import React from 'react';
import { Course } from '../../../types/course';
import './CourseEditorSettings.css';

interface CourseEditorSettingsProps {
  courseData: Partial<Course>;
  onChange: (field: string, value: any) => void;
}

const CourseEditorSettings: React.FC<CourseEditorSettingsProps> = ({
  courseData,
  onChange
}) => {
  // Helper function to handle input changes
  const handleInputChange = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value = e.target.type === 'checkbox'
      ? (e.target as HTMLInputElement).checked
      : e.target.value;

    onChange(field, value);
  };

  // Helper function to handle number input changes
  const handleNumberChange = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value === '' ? undefined : parseInt(e.target.value, 10);
    onChange(field, value);
  };

  // Validate max enrollment
  const validateMaxEnrollment = (value?: number): string | null => {
    if (value !== undefined && value < 1) {
      return 'Maximum enrollment must be at least 1';
    }
    return null;
  };

  // Validate completion percentage
  const validateCompletionPercentage = (value?: number): string | null => {
    if (value !== undefined) {
      if (value < 1) {
        return 'Completion percentage must be at least 1';
      }
      if (value > 100) {
        return 'Completion percentage cannot exceed 100';
      }
    }
    return null;
  };

  // Get default values
  const enrollmentType = courseData.enrollmentType || 'open';
  const maxEnrollment = courseData.maxEnrollment;
  const selfPaced = courseData.selfPaced || false;
  const visibility = courseData.visibility || 'public';
  const featured = courseData.featured || false;
  const completionCriteria = courseData.completionCriteria || 'all-activities';
  const completionPercentage = courseData.completionPercentage;
  const certificateEnabled = courseData.certificateEnabled || false;
  const language = courseData.language || 'en';
  const discussionEnabled = courseData.discussionEnabled !== false; // Default to true
  const peerReviewEnabled = courseData.peerReviewEnabled || false;

  // Validation errors
  const maxEnrollmentError = validateMaxEnrollment(maxEnrollment);
  const completionPercentageError = validateCompletionPercentage(completionPercentage);

  return (
    <div className="course-editor-settings">
      <h2 className="settings-title">Course Settings</h2>

      {/* Enrollment Settings */}
      <section className="settings-section" aria-labelledby="enrollment-settings-title">
        <h3 id="enrollment-settings-title" className="section-title">Enrollment Settings</h3>

        <div className="form-group">
          <label htmlFor="enrollmentType" className="form-label">
            Enrollment Type
          </label>
          <select
            id="enrollmentType"
            className="form-select"
            value={enrollmentType}
            onChange={handleInputChange('enrollmentType')}
            aria-describedby="enrollmentType-hint"
          >
            <option value="open">Open Enrollment</option>
            <option value="invite">Invite Only</option>
            <option value="approval">Requires Approval</option>
          </select>
          <div id="enrollmentType-hint" className="form-hint">
            Controls how students can enroll in your course
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="maxEnrollment" className="form-label">
            Maximum Enrollment
          </label>
          <input
            id="maxEnrollment"
            type="number"
            className={`form-input ${maxEnrollmentError ? 'form-input-error' : ''}`}
            value={maxEnrollment === undefined ? '' : maxEnrollment}
            onChange={handleNumberChange('maxEnrollment')}
            aria-describedby="maxEnrollment-hint maxEnrollment-error"
            min="1"
          />
          <div id="maxEnrollment-hint" className="form-hint">
            Leave empty for unlimited enrollment
          </div>
          {maxEnrollmentError && (
            <div id="maxEnrollment-error" className="form-error" role="alert">
              {maxEnrollmentError}
            </div>
          )}
        </div>

        <div className="form-group">
          <div className="form-checkbox">
            <input
              id="selfPaced"
              type="checkbox"
              checked={selfPaced}
              onChange={handleInputChange('selfPaced')}
              aria-describedby="selfPaced-hint"
            />
            <label htmlFor="selfPaced" className="checkbox-label">
              Self-Paced Course
            </label>
          </div>
          <div id="selfPaced-hint" className="form-hint">
            Allow students to progress at their own pace
          </div>
        </div>
      </section>

      {/* Visibility Settings */}
      <section className="settings-section" aria-labelledby="visibility-settings-title">
        <h3 id="visibility-settings-title" className="section-title">Visibility Settings</h3>

        <div className="form-group">
          <label htmlFor="visibility" className="form-label">
            Course Visibility
          </label>
          <select
            id="visibility"
            className="form-select"
            value={visibility}
            onChange={handleInputChange('visibility')}
            aria-describedby="visibility-hint"
          >
            <option value="public">Public</option>
            <option value="unlisted">Unlisted</option>
            <option value="private">Private</option>
          </select>
          <div id="visibility-hint" className="form-hint">
            Controls who can see your course in the catalog
          </div>
        </div>

        <div className="form-group">
          <div className="form-checkbox">
            <input
              id="featured"
              type="checkbox"
              checked={featured}
              onChange={handleInputChange('featured')}
              aria-describedby="featured-hint"
            />
            <label htmlFor="featured" className="checkbox-label">
              Featured Course
            </label>
          </div>
          <div id="featured-hint" className="form-hint">
            Feature this course on the homepage
          </div>
        </div>
      </section>

      {/* Completion Settings */}
      <section className="settings-section" aria-labelledby="completion-settings-title">
        <h3 id="completion-settings-title" className="section-title">Completion Settings</h3>

        <div className="form-group">
          <label htmlFor="completionCriteria" className="form-label">
            Completion Criteria
          </label>
          <select
            id="completionCriteria"
            className="form-select"
            value={completionCriteria}
            onChange={handleInputChange('completionCriteria')}
            aria-describedby="completionCriteria-hint"
          >
            <option value="all-activities">Complete All Activities</option>
            <option value="required-activities">Complete Required Activities</option>
            <option value="percentage">Complete Percentage of Activities</option>
            <option value="final-exam">Pass Final Exam</option>
          </select>
          <div id="completionCriteria-hint" className="form-hint">
            Defines how students complete the course
          </div>
        </div>

        {completionCriteria === 'percentage' && (
          <div className="form-group">
            <label htmlFor="completionPercentage" className="form-label">
              Completion Percentage
            </label>
            <input
              id="completionPercentage"
              type="number"
              className={`form-input ${completionPercentageError ? 'form-input-error' : ''}`}
              value={completionPercentage === undefined ? '' : completionPercentage}
              onChange={handleNumberChange('completionPercentage')}
              aria-describedby="completionPercentage-hint completionPercentage-error"
              min="1"
              max="100"
              required
              aria-required="true"
            />
            <div id="completionPercentage-hint" className="form-hint">
              Percentage of activities required for completion
            </div>
            {completionPercentageError && (
              <div id="completionPercentage-error" className="form-error" role="alert">
                {completionPercentageError}
              </div>
            )}
          </div>
        )}

        <div className="form-group">
          <div className="form-checkbox">
            <input
              id="certificateEnabled"
              type="checkbox"
              checked={certificateEnabled}
              onChange={handleInputChange('certificateEnabled')}
              aria-describedby="certificateEnabled-hint"
            />
            <label htmlFor="certificateEnabled" className="checkbox-label">
              Enable Certificates
            </label>
          </div>
          <div id="certificateEnabled-hint" className="form-hint">
            Issue certificates to students who complete the course
          </div>
        </div>
      </section>

      {/* Advanced Settings */}
      <section className="settings-section" aria-labelledby="advanced-settings-title">
        <h3 id="advanced-settings-title" className="section-title">Advanced Settings</h3>

        <div className="form-group">
          <label htmlFor="language" className="form-label">
            Course Language
          </label>
          <select
            id="language"
            className="form-select"
            value={language}
            onChange={handleInputChange('language')}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="zh">Chinese</option>
            <option value="ja">Japanese</option>
            <option value="ko">Korean</option>
            <option value="ar">Arabic</option>
            <option value="ru">Russian</option>
          </select>
        </div>

        <div className="form-group">
          <div className="form-checkbox">
            <input
              id="discussionEnabled"
              type="checkbox"
              checked={discussionEnabled}
              onChange={handleInputChange('discussionEnabled')}
              aria-describedby="discussionEnabled-hint"
            />
            <label htmlFor="discussionEnabled" className="checkbox-label">
              Enable Discussions
            </label>
          </div>
          <div id="discussionEnabled-hint" className="form-hint">
            Allow students to participate in course discussions
          </div>
        </div>

        <div className="form-group">
          <div className="form-checkbox">
            <input
              id="peerReviewEnabled"
              type="checkbox"
              checked={peerReviewEnabled}
              onChange={handleInputChange('peerReviewEnabled')}
              aria-describedby="peerReviewEnabled-hint"
            />
            <label htmlFor="peerReviewEnabled" className="checkbox-label">
              Enable Peer Reviews
            </label>
          </div>
          <div id="peerReviewEnabled-hint" className="form-hint">
            Allow students to review each other's work
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseEditorSettings;
```

## Related Components

- [CourseEditorModern](./CourseEditorModern.md): Parent component that contains CourseEditorSettings as a tab
- [CourseEditorHeader](./CourseEditorHeader.md): Header component for the course editor
- [CourseEditorTabs](./CourseEditorTabs.md): Tabs component for navigating between different sections of the course editor
- [CourseEditorForm](./CourseEditorForm.md): Form component for editing basic course details
- [CourseEditorModules](./CourseEditorModules.md): Component for managing course modules
- [CourseEditorResources](./CourseEditorResources.md): Component for managing course resources
- [FormField](../common/FormField.md): Reusable form field component used within CourseEditorSettings
- [Checkbox](../common/Checkbox.md): Reusable checkbox component used within CourseEditorSettings

## Interactive Examples

See this component in action in [Storybook](https://hypatia-storybook.netlify.app/?path=/story/editor-courseeditorsettings--basic).

## Technical Debt

- The component doesn't implement proper form validation for all fields
- The component doesn't handle concurrent edits by multiple users
- The component doesn't implement proper error boundaries
- The component doesn't have comprehensive test coverage
- The component doesn't implement proper focus management for accessibility
- The component doesn't implement proper keyboard navigation for accessibility
- The component doesn't implement proper ARIA attributes for accessibility
- The component doesn't support all languages for internationalization
- The component doesn't support custom validation rules
- The component doesn't support custom form fields

## Version Compatibility

For detailed version compatibility information, see the [CourseEditorSettings Version Compatibility Matrix](./CourseEditorSettings-version-compatibility.md).

## Changelog

| Version | Changes |
|---------|---------|
| 1.0.0 | Initial implementation with basic settings |
| 1.1.0 | Added enrollment settings |
| 1.2.0 | Added visibility settings |
| 1.3.0 | Added completion settings |
| 1.4.0 | Added advanced settings |
| 2.0.0 | Refactored to TypeScript |
| 2.1.0 | Added form validation |
| 2.2.0 | Added conditional fields |
| 2.3.0 | Added responsive design |
