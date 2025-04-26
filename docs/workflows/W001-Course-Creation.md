# User Workflow: Course Creation

## Workflow Information

| Attribute | Description |
|-----------|-------------|
| **Workflow Name** | Course Creation |
| **Workflow ID** | W001 |
| **User Role(s)** | Administrator, Instructor |
| **Related Features** | Course Management, Content Management, File Management |
| **Frequency** | Moderate (typically done at the beginning of a term or when new content is developed) |
| **Criticality** | High |

## Workflow Overview

This workflow describes the process of creating a new course in the Hypatia LMS. It includes defining course metadata, organizing course content, setting up modules and activities, and publishing the course for student enrollment.

## Preconditions

- User is authenticated and has appropriate permissions (Administrator or Instructor role)
- User has access to the course materials they want to include
- Any prerequisite courses have already been created in the system

## Workflow Steps

### Step 1: Navigate to Admin Section

**Actor**: Administrator or Instructor

**Action**: User navigates to the Admin section of the platform.

**System Response**: System displays the admin interface with various content types that can be managed.

**UI Components**: Admin navigation, Content type selection

**Alternative Flows**: None

### Step 2: Initiate New Course Creation

**Actor**: Administrator or Instructor

**Action**: User selects "Courses" from the content types and clicks "New" to create a new course.

**System Response**: System displays the course creation form with fields for course details.

**UI Components**: Content type selector, New button, Course creation form

**Alternative Flows**: None

### Step 3: Enter Course Details

**Actor**: Administrator or Instructor

**Action**: User enters the following course information:
- Course title
- Course code
- Description (content1, content2, content3 fields)
- Level (e.g., Certificate, Degree, etc.)
- Price (if applicable)
- Featured image
- Start and end dates for enrollment
- Status (active, inactive, draft)
- Slug (auto-generated from title but can be customized)

**System Response**: System validates the input as the user enters information.

**UI Components**: Course details form, Image upload component

**Alternative Flows**: 
- If validation fails, system displays error messages and prevents submission
- User can save as draft at any point

### Step 4: Save Course

**Actor**: Administrator or Instructor

**Action**: User clicks the "Save in courses" button to save the course.

**System Response**: System saves the course to the Firebase database and displays a success message.

**UI Components**: Save button, Notification component

**Alternative Flows**: 
- If save fails, system displays an error message
- User can cancel the operation and return to the admin dashboard

### Step 5: Add Subjects to Course

**Actor**: Administrator or Instructor

**Action**: After creating the course, user needs to create and associate subjects with the course. User navigates to "Subjects" in the admin section and creates new subjects, specifying the course they belong to.

**System Response**: System displays the subject creation form.

**UI Components**: Subject creation form, Course selector

**Alternative Flows**: User can edit existing subjects to associate them with the new course

### Step 6: Add Modules to Subjects

**Actor**: Administrator or Instructor

**Action**: After creating subjects, user creates modules within each subject. User navigates to "Modules" in the admin section and creates new modules, specifying the subject they belong to and adding:
- Module title
- Module code
- Content
- Authors
- Credits
- Featured image

**System Response**: System displays the module creation form.

**UI Components**: Module creation form, Subject selector, Author selector

**Alternative Flows**: None

### Step 7: Add Activities to Modules

**Actor**: Administrator or Instructor

**Action**: Finally, user creates activities within each module. User navigates to "Activities" in the admin section and creates new activities, specifying the module they belong to and adding:
- Activity title
- Content
- Start and end dates
- Grade date
- Authors

**System Response**: System displays the activity creation form.

**UI Components**: Activity creation form, Module selector, Author selector, Date pickers

**Alternative Flows**: None

### Step 8: Review and Publish

**Actor**: Administrator or Instructor

**Action**: User reviews the course structure by navigating to the course page in the frontend and verifies all content is correct. If satisfied, user ensures the course status is set to "active".

**System Response**: System displays the course as it will appear to students.

**UI Components**: Course preview page, Edit button to return to admin interface

**Alternative Flows**: User can make additional edits if needed

## Postconditions

- New course is created in the system with associated subjects, modules, and activities
- Course is either published (status: active) or saved as a draft (status: inactive)
- Course appears in the course catalog if published
- Course is available for enrollment based on the specified start and end dates

## Error Conditions and Recovery

| Error Condition | Recovery Path |
|-----------------|---------------|
| Required fields missing | System highlights missing fields and prompts user to complete them |
| Image upload fails | System provides retry option or alternative upload method |
| Server connection lost during creation | System automatically saves draft and allows resuming when connection is restored |
| Duplicate course code | System notifies user and requests a different code |

## Performance Expectations

- Course creation form should load within 2 seconds
- Each save operation should complete within 3 seconds
- Image uploads should process within 5 seconds for typical image sizes
- Course publication should complete within 10 seconds

## User Experience Considerations

- The course creation process is fragmented across different sections of the admin interface
- Creating a complete course requires navigating between different content types (courses, subjects, modules, activities)
- There is no unified view of the course structure during creation
- The process requires multiple save operations and navigation steps

## Testing Scenarios

1. Create a basic course with minimal information and publish
2. Create a complex course with multiple subjects, modules, and activities
3. Upload various file types as attachments
4. Test course creation on different devices (desktop, tablet)
5. Test with slow network connections
6. Create a course, save as draft, return later to complete and publish

## Workflow Diagram

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Navigate to    │     │  Create New     │     │  Enter Course   │
│  Admin Section  │────▶│  Course         │────▶│  Details        │
└─────────────────┘     └─────────────────┘     └────────┬────────┘
                                                         │
                                                         ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Review and     │     │  Add Activities │     │  Add Modules    │
│  Publish        │◀────│  to Modules     │◀────│  to Subjects    │◀────┐
└────────┬────────┘     └─────────────────┘     └─────────────────┘     │
         │                                                               │
         │                                      ┌─────────────────┐      │
         │                                      │  Add Subjects   │      │
         └─────────────────────────────────────▶│  to Course      │──────┘
                                                └─────────────────┘
```

## Code References from Legacy System

### Course Creation in Admin Panel

```javascript
// From src/app/core/admin/admin.jsx
save() {
  if (this.props.userData.info.level === CONSTANTS.ADMIN_LEVEL) {
    const item = this.state.selectedItem;
    const method = (this.state.action === 'new')
      ? 'push'
      : 'set';
    const path = (this.state.action === 'new')
      ? this.state.type
      : `${this.state.type}/${this.state.selectedId}`;
    let uploadFile = false;

    if (item.title) {
      // Handle file upload if needed
      
      this.toggleButtons(false);

      if (!uploadFile) {
        this.props.firebase[method](path, item).then((snap) => {
          this.toggleButtons(true);
          this.props.setNotification({ message: CONSTANTS.ITEM_SAVED, type: 'success' });

          if (snap) {
            this.setState({
              selectedId: snap.key
            }, () => {
              this.loadItem(snap.key, 'edit', this.state.type);
            });
          }
        });
      }
    } else {
      this.props.setNotification({ message: CONSTANTS.NEED_TITLE, type: 'error' });
    }
  } else {
    this.props.setNotification({ message: CONSTANTS.ADMIN_REQUIRED, type: 'error' });
  }
}
```

### Course Display in Frontend

```javascript
// From src/app/themes/nekomy/pages/course/course.jsx
render() {
  let course = null;
  let featuredImage = null;
  let courseID = null;
  let subjects = null;
  let enrollmentOpened = false;
  let totalCredits = 0;
  let section = 'info';

  if (isLoaded(this.props.course) && isLoaded(this.props.files) && !isEmpty(this.props.course) && !isEmpty(this.props.files)) {
    Object.keys(this.props.course).map((key) => {
      courseID = key;
      course = this.props.course[key];

      if (course.featuredImage) {
        Object.keys(this.props.files).map((fileKey) => {
          if (fileKey === course.featuredImage) {
            featuredImage = this.props.files[fileKey];
          }
          return false;
        });
      }

      if (moment().isBetween(moment(course.startDate), moment(course.endDate), 'days', '[]')) {
        enrollmentOpened = true;
      }
      return false;
    });
  }
  
  // Render course details
}
```

## Migration Notes

### Current Implementation Issues

1. **Fragmented Process**: Course creation is split across different admin sections (courses, subjects, modules, activities)
2. **No Unified View**: No single view to see and manage the entire course structure
3. **Limited Validation**: Basic validation for required fields only
4. **Manual Relationships**: Relationships between courses, subjects, modules, and activities must be manually established
5. **Limited Rich Text Editing**: Basic markdown support without advanced formatting options
6. **No Templates**: No ability to use templates or duplicate existing courses
7. **jQuery Dependency**: Uses jQuery for UI interactions
8. **Limited Preview**: No comprehensive preview of the course as students will see it

### Migration Recommendations

1. **Unified Course Builder**: Create a dedicated course builder interface that shows the entire course structure
2. **Drag-and-Drop Organization**: Implement drag-and-drop functionality for organizing course content
3. **Enhanced Rich Text Editor**: Provide a more powerful editor with media embedding, formatting options
4. **Course Templates**: Allow saving and reusing course templates
5. **Automatic Relationships**: Automatically establish relationships between course components
6. **Comprehensive Validation**: Implement more thorough validation with helpful error messages
7. **Live Preview**: Provide a live preview of how the course will appear to students
8. **Bulk Operations**: Allow bulk creation and editing of course components
9. **Import/Export**: Support importing and exporting course content

## Additional Notes

- Course creation is one of the most complex workflows in the system
- Instructors have reported that the current interface is difficult to use for complex courses
- The ability to duplicate existing courses would be a valuable addition
- Integration with external content repositories would streamline content creation
