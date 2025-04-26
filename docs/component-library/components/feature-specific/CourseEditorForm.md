# CourseEditorForm

## Introduction

The CourseEditorForm component is used in the Hypatia LMS for creating and editing course details within the course editor interface.

## Description

The CourseEditorForm component provides a comprehensive form interface for instructors and course creators to input and edit course information. It handles various course properties such as title, description, category, difficulty level, dates, and additional information like syllabus and prerequisites. The component is designed to be user-friendly and accessible, with clear form labels, validation, and responsive layout for different screen sizes.

## Visual Examples

### Basic Information Section

<!-- Note: Replace with actual screenshot when available -->
![Basic Information Section](https://via.placeholder.com/800x400?text=Course+Editor+Form+Basic+Information)

The basic information section of the course editor form

### Schedule Section

<!-- Note: Replace with actual screenshot when available -->
![Schedule Section](https://via.placeholder.com/800x200?text=Course+Editor+Form+Schedule)

The schedule section with date inputs for course start and end dates

### Mobile View

<!-- Note: Replace with actual screenshot when available -->
![Mobile View](https://via.placeholder.com/400x800?text=Course+Editor+Form+Mobile+View)

The responsive layout on mobile devices

## Import

```tsx
import { CourseEditorForm } from 'components/courses/editor/CourseEditorForm';
```

## Usage

```tsx
import React, { useState } from 'react';
import { CourseEditorForm } from 'components/courses/editor/CourseEditorForm';
import { Course } from 'types/course';

const CourseEditor: React.FC = () => {
  // State for course data
  const [courseData, setCourseData] = useState<Partial<Course>>({
    title: '',
    description: '',
    category: '',
    level: 'beginner',
    startDate: '',
    endDate: ''
  });

  // Handle field changes
  const handleChange = (field: string, value: any) => {
    setCourseData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  return (
    <div className="course-editor">
      <h1>Create New Course</h1>

      <CourseEditorForm
        courseData={courseData}
        onChange={handleChange}
      />

      <div className="form-actions">
        <button className="btn btn-primary">Save Course</button>
      </div>
    </div>
  );
};
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| courseData | Partial\<Course\> | - | Yes | The course data to edit or an empty object for new courses |
| onChange | (field: string, value: any) => void | - | Yes | Callback function called when a field value changes |

## Type Definitions

```tsx
/**
 * CourseEditorFormProps Interface
 */
interface CourseEditorFormProps {
  /**
   * The course data to edit or an empty object for new courses
   */
  courseData: Partial<Course>;

  /**
   * Callback function called when a field value changes
   */
  onChange: (field: string, value: any) => void;
}

/**
 * Course Interface (from types/course.ts)
 * Relevant properties used by CourseEditorForm
 */
interface Course {
  /**
   * Unique identifier for the course
   */
  id: string;

  /**
   * Course title
   */
  title: string;

  /**
   * Course description
   */
  description: string;

  /**
   * Course status
   */
  status: 'draft' | 'published' | 'archived';

  /**
   * Course category
   */
  category?: string;

  /**
   * Course difficulty level
   */
  level?: 'beginner' | 'intermediate' | 'advanced';

  /**
   * Course start date (ISO string)
   */
  startDate?: string;

  /**
   * Course end date (ISO string)
   */
  endDate?: string;

  /**
   * Course syllabus
   */
  syllabus?: string;

  /**
   * Course prerequisites
   */
  prerequisites?: string[];

  /**
   * Course enrollment type
   */
  enrollmentType?: 'open' | 'invite' | 'approval';

  /**
   * Maximum number of students that can enroll
   */
  maxEnrollment?: number;

  /**
   * Whether the course is self-paced
   */
  selfPaced?: boolean;

  /**
   * Course visibility
   */
  visibility?: 'public' | 'unlisted' | 'private';

  // Other course properties...
}
```

## Examples

### Basic Example

```tsx
<CourseEditorForm
  courseData={{
    title: '',
    description: '',
    category: '',
    level: 'beginner'
  }}
  onChange={(field, value) => console.log(field, value)}
/>
```

### Advanced Example

```tsx
<CourseEditorForm
  courseData={{
    title: 'Introduction to React',
    description: 'Learn the basics of React and build your first application.',
    category: 'Web Development',
    level: 'beginner',
    startDate: '2023-01-01T00:00:00.000Z',
    endDate: '2023-06-30T00:00:00.000Z',
    syllabus: '# Course Syllabus\n\n## Week 1\n- Introduction to React\n- Setting up your environment',
    prerequisites: ['Basic HTML/CSS knowledge', 'JavaScript fundamentals'],
    enrollmentType: 'open',
    maxEnrollment: 100,
    selfPaced: false,
    visibility: 'public'
  }}
  onChange={(field, value) => {
    console.log(`Field ${field} changed to:`, value);
    // Update course data in state or store
  }}
/>
```

### Example with CourseEditorModern

```tsx
import React, { useState } from 'react';
import { CourseEditorForm } from 'components/courses/editor/CourseEditorForm';
import { CourseEditorTabs } from 'components/courses/editor/CourseEditorTabs';
import { CourseEditorHeader } from 'components/courses/editor/CourseEditorHeader';
import { Course } from 'types/course';

const CourseEditorModern: React.FC = () => {
  // State for course data
  const [courseData, setCourseData] = useState<Partial<Course>>({
    title: '',
    description: '',
    category: '',
    level: 'beginner',
    status: 'draft'
  });

  // State for active tab
  const [activeTab, setActiveTab] = useState('details');

  // Handle field changes
  const handleChange = (field: string, value: any) => {
    setCourseData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  // Handle save
  const handleSave = () => {
    console.log('Saving course:', courseData);
    // Save course data to API
  };

  return (
    <div className="course-editor-container">
      <CourseEditorHeader
        isNew={true}
        title={courseData.title || 'New Course'}
        status={courseData.status || 'draft'}
        onSave={handleSave}
        onPublish={() => {}}
        saving={false}
      />

      <CourseEditorTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="course-editor-content">
        {activeTab === 'details' && (
          <CourseEditorForm
            courseData={courseData}
            onChange={handleChange}
          />
        )}

        {/* Other tabs content */}
      </div>
    </div>
  );
};
```

## Features

1. **Basic Information Fields**: Provides fields for course title, description, and category
2. **Difficulty Level Selection**: Allows selecting the course difficulty level (beginner, intermediate, advanced)
3. **Date Handling**: Provides date inputs for course start and end dates with proper formatting
4. **Syllabus Editor**: Includes a textarea for course syllabus with Markdown support
5. **Prerequisites Management**: Allows adding and removing course prerequisites
6. **Enrollment Settings**: Provides options for enrollment type, maximum enrollment, and self-paced learning
7. **Visibility Controls**: Allows setting course visibility (public, unlisted, private)
8. **Responsive Design**: Adapts to different screen sizes with a mobile-friendly layout
9. **Field Validation**: Validates required fields and provides feedback
10. **Organized Sections**: Groups related fields into logical sections for better organization

## Accessibility

The CourseEditorForm component is designed with accessibility in mind:

### Keyboard Navigation

- All form fields are fully keyboard accessible using the Tab key
- The form follows a logical tab order from top to bottom
- Date inputs can be navigated and manipulated using keyboard controls
- Select dropdowns can be operated using keyboard arrow keys
- Form can be submitted using Enter when a field is focused

### Screen Reader Support

- Form fields have proper labels that are announced by screen readers
- Required fields are properly indicated to screen readers
- Error messages are announced when validation fails
- Form sections have appropriate headings for navigation
- Form hints (like Markdown support) are properly associated with their fields

### ARIA Attributes

- Form fields have appropriate `aria-required` attributes for required fields
- Error messages use `aria-live` regions to announce validation errors
- Form sections use appropriate heading levels for structure
- Date inputs have appropriate `aria-label` attributes
- Select dropdowns have appropriate `aria-expanded` attributes

### Color Contrast

- All text meets WCAG 2.1 AA contrast requirements (4.5:1 for normal text, 3:1 for large text)
- Form field borders have sufficient contrast with the background
- Error messages have sufficient contrast
- Required field indicators have sufficient contrast

### Focus Management

- Focus indicators are clearly visible for all interactive elements
- Focus order follows a logical sequence
- Focus states are consistent with the rest of the application
- No focus traps are present in the component

## Edge Cases

- **Empty Course Data**: When no course data is provided, the component initializes with empty values and default selections
- **Invalid Dates**: If invalid date formats are entered, the component handles this gracefully by clearing the date or showing an error
- **Long Text Content**: For courses with long descriptions or syllabi, the textareas expand to accommodate the content while maintaining usability
- **Missing Required Fields**: The component validates that required fields are provided and shows appropriate error messages
- **Form Overflow**: On small screens, the form becomes scrollable to ensure all fields are accessible
- **Date Range Validation**: The component validates that the end date is after the start date and shows an error if not
- **Array Field Handling**: For prerequisites and other array fields, the component handles empty arrays and provides UI for adding/removing items
- **Markdown Content**: The component supports Markdown in the syllabus field and provides a hint about Markdown support
- **Category Options**: If no categories are available, the component shows a message or provides a way to add a new category
- **Unsaved Changes**: The component does not currently warn about unsaved changes when navigating away

## Implementation Details

Here's a simplified implementation of the CourseEditorForm component to help developers understand its inner workings:

```tsx
/**
 * CourseEditorForm Component
 *
 * Form for editing course details.
 */

import React from 'react';
import { Course } from '../../../types/course';

// Import CSS
import './CourseEditorForm.css';

interface CourseEditorFormProps {
  courseData: Partial<Course>;
  onChange: (field: string, value: any) => void;
}

const CourseEditorForm: React.FC<CourseEditorFormProps> = ({
  courseData,
  onChange
}) => {
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  // Handle date change
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange(name, value ? new Date(value).toISOString() : '');
  };

  // Format date for input
  const formatDateForInput = (dateString?: string): string => {
    if (!dateString) return '';

    try {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    } catch (error) {
      return '';
    }
  };

  // Handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    onChange(name, checked);
  };

  // Handle prerequisites change
  const handlePrerequisiteChange = (index: number, value: string) => {
    const prerequisites = [...(courseData.prerequisites || [])];
    prerequisites[index] = value;
    onChange('prerequisites', prerequisites);
  };

  // Add prerequisite
  const addPrerequisite = () => {
    const prerequisites = [...(courseData.prerequisites || []), ''];
    onChange('prerequisites', prerequisites);
  };

  // Remove prerequisite
  const removePrerequisite = (index: number) => {
    const prerequisites = [...(courseData.prerequisites || [])];
    prerequisites.splice(index, 1);
    onChange('prerequisites', prerequisites);
  };

  return (
    <div className="course-editor-form">
      {/* Basic Information Section */}
      <div className="form-section">
        <h2 className="section-title">Basic Information</h2>

        <div className="form-group">
          <label htmlFor="title">Course Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={courseData.title || ''}
            onChange={handleInputChange}
            placeholder="Enter course title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Course Description *</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={courseData.description || ''}
            onChange={handleInputChange}
            placeholder="Enter course description"
            rows={5}
            required
          ></textarea>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              className="form-control"
              value={courseData.category || ''}
              onChange={handleInputChange}
            >
              <option value="">Select Category</option>
              <option value="Web Development">Web Development</option>
              <option value="Data Science">Data Science</option>
              <option value="Mobile Development">Mobile Development</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Business">Business</option>
              <option value="Design">Design</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="level">Difficulty Level</label>
            <select
              id="level"
              name="level"
              className="form-control"
              value={courseData.level || 'beginner'}
              onChange={handleInputChange}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>
      </div>

      {/* Schedule Section */}
      <div className="form-section">
        <h2 className="section-title">Schedule</h2>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              className="form-control"
              value={formatDateForInput(courseData.startDate)}
              onChange={handleDateChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              className="form-control"
              value={formatDateForInput(courseData.endDate)}
              onChange={handleDateChange}
            />
          </div>
        </div>

        <div className="form-group">
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="selfPaced"
              name="selfPaced"
              checked={courseData.selfPaced || false}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="selfPaced">Self-paced course</label>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="form-section">
        <h2 className="section-title">Content</h2>

        <div className="form-group">
          <label htmlFor="syllabus">Syllabus</label>
          <textarea
            id="syllabus"
            name="syllabus"
            className="form-control"
            value={courseData.syllabus || ''}
            onChange={handleInputChange}
            placeholder="Enter course syllabus (supports Markdown)"
            rows={8}
          ></textarea>
          <div className="form-hint">
            You can use Markdown to format your syllabus
          </div>
        </div>

        <div className="form-group">
          <label>Prerequisites</label>

          {(courseData.prerequisites || []).map((prerequisite, index) => (
            <div key={index} className="prerequisite-item">
              <input
                type="text"
                className="form-control"
                value={prerequisite}
                onChange={(e) => handlePrerequisiteChange(index, e.target.value)}
                placeholder="Enter prerequisite"
              />
              <button
                type="button"
                className="btn btn-icon"
                onClick={() => removePrerequisite(index)}
                aria-label="Remove prerequisite"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
          ))}

          <button
            type="button"
            className="btn btn-outline"
            onClick={addPrerequisite}
          >
            Add Prerequisite
          </button>
        </div>
      </div>

      {/* Settings Section */}
      <div className="form-section">
        <h2 className="section-title">Settings</h2>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="enrollmentType">Enrollment Type</label>
            <select
              id="enrollmentType"
              name="enrollmentType"
              className="form-control"
              value={courseData.enrollmentType || 'open'}
              onChange={handleInputChange}
            >
              <option value="open">Open Enrollment</option>
              <option value="invite">Invite Only</option>
              <option value="approval">Requires Approval</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="maxEnrollment">Maximum Enrollment</label>
            <input
              type="number"
              id="maxEnrollment"
              name="maxEnrollment"
              className="form-control"
              value={courseData.maxEnrollment || ''}
              onChange={handleInputChange}
              placeholder="Leave empty for unlimited"
              min="1"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="visibility">Visibility</label>
          <select
            id="visibility"
            name="visibility"
            className="form-control"
            value={courseData.visibility || 'public'}
            onChange={handleInputChange}
          >
            <option value="public">Public</option>
            <option value="unlisted">Unlisted</option>
            <option value="private">Private</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CourseEditorForm;
```

## Related Components

- [CourseEditorModern](./CourseEditorModern.md): Parent component that uses CourseEditorForm for the details tab
- [CourseEditorHeader](./CourseEditorHeader.md): Header component used alongside CourseEditorForm in the course editor
- [CourseEditorTabs](./CourseEditorTabs.md): Tab navigation component that controls which editor component is displayed
- [CourseEditorModules](./CourseEditorModules.md): Component for editing course modules, used in a different tab
- [CourseEditorSettings](./CourseEditorSettings.md): Component for editing course settings, used in a different tab
- [CourseEditorResources](./CourseEditorResources.md): Component for managing course resources, used in a different tab

## Interactive Examples

See this component in action in [Storybook](https://hypatia-storybook.netlify.app/?path=/story/editor-courseeditorform--basic).

## Changelog

| Version | Changes |
|---------|---------|
| 1.0.0 | Initial implementation with basic course fields |
| 1.1.0 | Added support for prerequisites as an array |
| 1.2.0 | Added support for enrollment settings |
| 1.3.0 | Added support for visibility settings |
| 2.0.0 | Refactored to TypeScript |
| 2.1.0 | Added responsive design for mobile devices |
| 2.2.0 | Added Markdown support for syllabus |
| 2.3.0 | Added accessibility improvements |

## Technical Debt

- The component currently uses `any` type for the `onChange` callback value parameter, which could be improved with more specific types
- Date handling could be improved with a dedicated date picker component
- Form validation is minimal and could be enhanced with a form validation library
- The component doesn't warn about unsaved changes when navigating away
- The prerequisites management UI could be improved with drag-and-drop reordering
- The component doesn't support custom categories, only predefined ones
- The component doesn't have built-in error handling for API failures

## Version Compatibility

For detailed version compatibility information, see the [CourseEditorForm Version Compatibility Matrix](./CourseEditorForm-version-compatibility.md).
