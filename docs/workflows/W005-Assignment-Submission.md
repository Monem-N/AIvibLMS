# Workflow Documentation: Assignment Submission

## Workflow Information

| Attribute | Description |
|-----------|-------------|
| **Workflow Name** | Assignment Submission |
| **Workflow ID** | W005 |
| **User Role(s)** | Student |
| **Priority** | High |
| **Status in Legacy System** | Minimally Implemented |

## Workflow Description

The Assignment Submission workflow enables students to view, complete, and submit assignments within the Hypatia LMS. It covers the entire process from accessing an assignment to receiving feedback and grades. This workflow is critical for the assessment and evaluation of student learning and is a core component of the educational experience.

## Workflow Diagram

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │     │                 │
│  View Activity  │────▶│ Start Assignment│────▶│Complete Assignment────▶│Submit Assignment│
│                 │     │                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘     └─────────────────┘
                                                                               │
                                                                               │
                                                                               ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │     │                 │
│  View Feedback  │◀────│ Receive Grade   │◀────│ Instructor Review────│Submission Confirmed
│                 │     │                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘     └─────────────────┘
```

## Detailed Steps

### 1. View Activity

**Description**: Student accesses an activity that contains an assignment.

**User Actions**:
- Navigate to the course dashboard
- Select a subject from the "My subjects" list
- View the list of activities for the subject
- Select an activity with an assignment

**System Actions**:
- Display the activity details page
- Show assignment information including title, description, due date, and instructions
- Display any associated files or resources

**UI Components**:
- Course dashboard
- Subject list
- Activity list
- Activity details page

**Data Involved**:
- Activity data (title, description, startDate, endDate, gradeDate)
- Assignment data (instructions, requirements, attachments)

**Conditions and Rules**:
- Student must be enrolled in the course
- Activity must be published and within its availability period

### 2. Start Assignment

**Description**: Student begins working on the assignment.

**User Actions**:
- Read assignment instructions and requirements
- Access any provided resources or materials
- Click "Start Assignment" button

**System Actions**:
- Record the start time of the assignment attempt
- Initialize the submission record
- Display the appropriate interface based on assignment type (quiz, file upload, text entry, etc.)

**UI Components**:
- Assignment instructions panel
- Resource viewer
- Start button
- Assignment interface (varies by type)

**Data Involved**:
- Assignment configuration (type, time limit, attempt limits)
- Submission record (initialized with status "in progress")

**Conditions and Rules**:
- Assignment must be within its availability period
- Student must not have exceeded the maximum number of attempts (if applicable)
- Time-limited assignments will display a countdown timer

### 3. Complete Assignment

**Description**: Student works on and completes the assignment.

**User Actions**:
- For quiz/test assignments:
  - Answer questions
  - Navigate between questions
  - Review answers
- For file upload assignments:
  - Create required files offline
  - Upload files to the system
- For text entry assignments:
  - Compose response in the provided editor
- For project assignments:
  - Complete project requirements
  - Document process and results
  - Prepare submission materials

**System Actions**:
- Save progress automatically at regular intervals
- Validate file types and sizes for uploads
- Check for plagiarism (if enabled)
- Track time spent on the assignment

**UI Components**:
- Question display and navigation
- File upload interface
- Text editor
- Progress indicator
- Save indicator

**Data Involved**:
- Student responses
- Uploaded files
- Progress data
- Time tracking data

**Conditions and Rules**:
- System should prevent submission of empty or incomplete responses (where applicable)
- File uploads must meet size and type restrictions
- Time-limited assignments will automatically submit when time expires

### 4. Submit Assignment

**Description**: Student submits the completed assignment for grading.

**User Actions**:
- Review completed assignment
- Make any final adjustments
- Click "Submit Assignment" button
- Confirm submission in dialog

**System Actions**:
- Validate submission for completeness
- Record submission timestamp
- Change submission status to "submitted"
- Store all submitted content (answers, files, etc.)
- Send confirmation to student
- Notify instructor of new submission (optional)

**UI Components**:
- Review panel
- Submit button
- Confirmation dialog
- Submission confirmation page

**Data Involved**:
- Completed submission data
- Submission metadata (timestamp, status, attempt number)

**Conditions and Rules**:
- Submission must occur before the due date to be considered on time
- Late submissions may be allowed based on course policy
- Once submitted, the assignment may not be editable (depending on settings)

### 5. Submission Confirmation

**Description**: System confirms successful submission and provides receipt.

**User Actions**:
- View submission confirmation
- Download submission receipt (optional)
- Return to course dashboard

**System Actions**:
- Display confirmation message with submission details
- Generate submission receipt
- Update student's activity status

**UI Components**:
- Confirmation message
- Submission details display
- Receipt download button
- Navigation options

**Data Involved**:
- Submission confirmation data
- Receipt data

**Conditions and Rules**:
- Confirmation should include timestamp and submission ID for reference
- System should provide clear indication of next steps

### 6. Instructor Review

**Description**: Instructor reviews and grades the submitted assignment.

**User Actions**: (Instructor)
- Access list of submissions
- Select submission to review
- Review submitted content
- Provide feedback
- Assign grade

**System Actions**:
- Display submission content to instructor
- Record feedback and grade
- Update submission status to "graded"
- Notify student when grading is complete (optional)

**UI Components**:
- Submission list
- Submission viewer
- Grading interface
- Feedback editor

**Data Involved**:
- Submission data
- Grading criteria
- Feedback data
- Grade data

**Conditions and Rules**:
- Only instructors and administrators can grade submissions
- Grading may follow a rubric or point system
- Automated grading may be applied for certain question types

### 7. Receive Grade

**Description**: Student receives notification that the assignment has been graded.

**User Actions**:
- Receive notification
- Navigate to the graded assignment

**System Actions**:
- Send notification to student
- Update assignment status to "graded"
- Make grade visible in gradebook

**UI Components**:
- Notification system
- Assignment status indicator
- Gradebook display

**Data Involved**:
- Grade data
- Notification data

**Conditions and Rules**:
- Grades may be hidden until a specific release date
- Grade visibility may depend on course settings

### 8. View Feedback

**Description**: Student views grade and feedback for the submitted assignment.

**User Actions**:
- Access graded assignment
- Review grade
- Read instructor feedback
- View any annotations or comments
- Respond to feedback (if allowed)

**System Actions**:
- Display grade and feedback
- Track feedback viewing
- Record any student responses to feedback

**UI Components**:
- Grade display
- Feedback display
- Annotation viewer
- Response interface (if applicable)

**Data Involved**:
- Grade data
- Feedback data
- Annotation data
- Student response data (if applicable)

**Conditions and Rules**:
- Students can only view feedback for their own submissions
- Feedback visibility may depend on course settings

## Alternative Flows

### Resubmission Flow

If the instructor allows resubmissions or multiple attempts:

1. Student receives feedback on initial submission
2. Student revises work based on feedback
3. Student resubmits the assignment
4. System tracks the new submission as a separate attempt
5. Instructor grades the new submission
6. Final grade may be highest attempt, latest attempt, or average (per settings)

### Group Assignment Flow

For assignments that allow group submissions:

1. Group leader creates or joins a group
2. Group members collaborate on the assignment
3. Group leader submits the assignment on behalf of the group
4. Submission is linked to all group members
5. Instructor grades the submission once
6. All group members receive the same grade

### Offline Submission Flow

For situations where online submission is not possible:

1. Student completes assignment offline
2. Student submits assignment through alternative means (email, physical copy)
3. Instructor manually records the submission in the system
4. Grading and feedback proceed as normal

## Integration Points

### Integration with Assessment System

- Assignment configuration is defined in the Assessment System
- Submission data is stored in the Assessment System
- Grading is performed through the Assessment System

### Integration with Notification System

- Notifications are sent for assignment creation
- Reminders are sent for upcoming due dates
- Notifications are sent when assignments are graded

### Integration with Gradebook

- Assignment grades are recorded in the Gradebook
- Grades contribute to course grade calculations
- Grade statistics are available for analysis

### Integration with File Management

- Assignment resources are stored in the File Management system
- Submitted files are stored in the File Management system
- File access permissions are managed based on user roles

## Current Implementation Status

The Assignment Submission workflow in the legacy Hypatia LMS is minimally implemented:

1. **Activity Display**: Activities are displayed with basic information including title, description, start date, end date, and grade date.
2. **No Submission Interface**: There is no dedicated interface for submitting assignments.
3. **No File Upload**: File upload functionality for assignments is not implemented.
4. **No Grading Interface**: There is no interface for instructors to grade submissions.
5. **Placeholder Components**: The Grades component exists but displays a placeholder message.
6. **Dashboard Integration**: Activities are displayed on the dashboard with due dates, but submission actions are not functional.

The current implementation shows activities in the dashboard with "Upload" and "Download" icons, but these are non-functional placeholders.

## Code References from Legacy System

### Activity Display

```javascript
// From src/app/themes/nekomy/pages/activity/activity.jsx
render() {
  let activity = null;
  let featuredImage = null;
  let authors = '';

  if (isLoaded(this.props.activity) && isLoaded(this.props.files) && isLoaded(this.props.users) && !isEmpty(this.props.activity) && !isEmpty(this.props.files) && !isEmpty(this.props.users)) {
    Object.keys(this.props.activity).map((key) => {
      activity = this.props.activity[key];
      // ... code to prepare data ...
      return false;
    });
  }

  return (
    <section className="page activity">
      {activity
        ? <div className="page-wrapper">
          <h1 className="title">{activity.title}</h1>
          <div className="meta">
            {authors
              ? <div className="author"><Icon glyph={Professor} />{authors}</div>
              : ''}
            <Icon glyph={Calendar} />From
            <span className="date">{moment(activity.startDate).format('D MMMM YYYY')}</span>
            until
            <span className="date">{moment(activity.endDate).format('D MMMM YYYY')}</span>
            {/* ... edit controls ... */}
          </div>
          <div className="columns">
            <div className="column page-content">
              {featuredImage
                ? <img alt="" className="featured-image" role="presentation" src={featuredImage.url} />
                : ''}
              <div
                className="content"
                dangerouslySetInnerHTML={{
                  __html: CONSTANTS.converter.makeHtml(activity.content1)
                }}
              />
            </div>
            {/* ... additional content columns ... */}
          </div>
        </div>
      : <div className="loader-small" />}
    </section>
  );
}
```

### Dashboard Activity Display

```javascript
// From src/app/themes/nekomy/pages/dashboard/dashboard.jsx
if (this.props.subjects[subject].activities) {
  const newActivities = this.props.subjects[subject].activities.map(activity => (
    <li
      key={activity}
      className="item"
      style={{
        borderLeftColor: this.props.colors[c]
      }}
    >
      <Link to={`/activities/${this.props.activities[activity].slug}`}>{this.props.activities[activity].title}</Link>
      <div className="meta">
        Due in
        <span className="date">{moment(this.props.activities[activity].endDate).format('D MMMM YYYY')}</span>
      </div>
      <div className="actions">
        <Link to="/dashboard#demo-not-yet-linked"><Icon glyph={Announcement} /></Link>
        <Link to="/dashboard#demo-not-yet-linked"><Icon glyph={Download} /></Link>
        <Link to="/dashboard#demo-not-yet-linked"><Icon glyph={Upload} /></Link>
        <Link to="/dashboard#demo-not-yet-linked"><Icon glyph={Chat} /></Link>
      </div>
    </li>
  ));

  activities.push(newActivities);
}
```

### Grades Component (Placeholder)

```javascript
// From src/app/themes/nekomy/components/grades/grades.jsx
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setLoading } from '../../../../core/actions/actions';

class Grades extends Component {

  componentDidMount() {}

  render() {
    return (
      <section className={`calendar-panel ${this.props.class}`}>
        <h4 className="panel-heading">Activities Hub</h4>
        <p>Sorry, this feature will be available in the following weeks.</p>
      </section>
    );
  }
}

const mapDispatchToProps = {
  setLoading
};

const mapStateToProps = ({
  mainReducer: {
    isDesktop,
    user
  }
}) => ({ isDesktop, user });

export default connect(mapStateToProps, mapDispatchToProps)(Grades);
```

## Modern Implementation Approach

The modern implementation of the Assignment Submission workflow will leverage React, TypeScript, and Firebase Firestore to create a comprehensive submission and grading system.

### Key Components

1. **AssignmentViewer**: Displays assignment details and instructions
2. **SubmissionForm**: Interface for submitting assignments
3. **FileUploader**: Component for uploading submission files
4. **SubmissionStatus**: Displays submission status and history
5. **FeedbackViewer**: Displays instructor feedback and grades

### Data Model

```typescript
// Assignment model
interface Assignment {
  id: string;
  title: string;
  description: string;
  instructions: string;
  type: 'quiz' | 'file_upload' | 'text_entry' | 'project';
  dueDate: Date;
  availableDate: Date;
  timeLimit?: number; // in minutes
  maxAttempts?: number;
  totalPoints: number;
  status: 'draft' | 'published' | 'closed';
  activityId: string;
  courseId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Submission model
interface Submission {
  id: string;
  userId: string;
  assignmentId: string;
  attemptNumber: number;
  status: 'in_progress' | 'submitted' | 'graded';
  submittedAt?: Date;
  timeSpent?: number; // in seconds
  files?: SubmissionFile[];
  textResponse?: string;
  answers?: Answer[];
  createdAt: Date;
  updatedAt: Date;
}

// Submission file model
interface SubmissionFile {
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: Date;
}

// Grade model
interface Grade {
  id: string;
  submissionId: string;
  userId: string;
  assignmentId: string;
  score: number;
  feedback: string;
  gradedBy: string;
  gradedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

### Service Layer

```typescript
// Assignment submission service
export class AssignmentSubmissionService {
  // Methods for handling assignment submissions
  async getAssignment(assignmentId: string): Promise<Assignment>;
  async startSubmission(assignmentId: string): Promise<string>;
  async saveSubmissionProgress(submissionId: string, data: Partial<Submission>): Promise<void>;
  async uploadSubmissionFile(submissionId: string, file: File): Promise<string>;
  async submitAssignment(submissionId: string): Promise<void>;
  async getSubmission(submissionId: string): Promise<Submission>;
  async getUserSubmissions(userId: string, assignmentId?: string): Promise<Submission[]>;
  async getSubmissionGrade(submissionId: string): Promise<Grade | null>;
}
```

### UI Implementation

```typescript
// Assignment submission component
export const AssignmentSubmission: React.FC = () => {
  // Component implementation
};

// File upload component
export const FileUpload: React.FC<FileUploadProps> = ({ submissionId, onUploadComplete }) => {
  // Component implementation
};

// Submission confirmation component
export const SubmissionConfirmation: React.FC<SubmissionConfirmationProps> = ({ submission }) => {
  // Component implementation
};

// Feedback viewer component
export const FeedbackViewer: React.FC<FeedbackViewerProps> = ({ grade }) => {
  // Component implementation
};
```

## Recommendations for Implementation

1. **Progressive Enhancement**: Implement the workflow in phases, starting with basic file submission and expanding to more complex assignment types.

2. **Real-time Updates**: Use Firestore's real-time capabilities to provide immediate feedback on submission status.

3. **Offline Support**: Implement offline support to allow students to work on assignments without a constant internet connection.

4. **Mobile Optimization**: Ensure the submission interface works well on mobile devices.

5. **Accessibility**: Make the submission process accessible to all users, including those with disabilities.

6. **Performance Optimization**: Optimize file uploads and submissions to handle large files and high traffic.

7. **Security**: Implement proper security measures to prevent unauthorized submissions and ensure data integrity.

8. **Analytics**: Add analytics to track submission patterns and identify students who may need assistance.

9. **Integration**: Integrate with the notification system to send reminders about upcoming due dates and grade notifications.

10. **Feedback Loop**: Provide immediate feedback to students after submission to confirm receipt and next steps.
