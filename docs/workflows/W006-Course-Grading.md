# Workflow Documentation: Course Grading

## Workflow Information

| Attribute | Description |
|-----------|-------------|
| **Workflow Name** | Course Grading |
| **Workflow ID** | W006 |
| **User Role(s)** | Instructor, Administrator |
| **Priority** | Medium |
| **Status in Legacy System** | Minimally Implemented |

## Workflow Description

The Course Grading workflow enables instructors to evaluate student performance, assign grades for assessments, and calculate final course grades within the Hypatia LMS. It covers the entire process from reviewing student submissions to finalizing course grades and providing feedback. This workflow is critical for the assessment and evaluation of student learning and is a core component of the educational experience.

## Workflow Diagram

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │     │                 │
│  Access Course  │────▶│ View Submissions│────▶│ Grade Submission│────▶│ Provide Feedback│
│                 │     │                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘     └─────────────────┘
                                                                               │
                                                                               │
                                                                               ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │     │                 │
│ Publish Grades  │◀────│Calculate Course │◀────│Review Assessment│◀────│ Save Grade      │
│                 │     │     Grade       │     │    Statistics   │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘     └─────────────────┘
```

## Detailed Steps

### 1. Access Course

**Description**: Instructor accesses a course to begin the grading process.

**User Actions**:
- Log in to the LMS
- Navigate to the instructor dashboard
- Select a course from the list of assigned courses
- Access the course management interface

**System Actions**:
- Authenticate the user and verify instructor role
- Display the list of courses the instructor is assigned to
- Load the selected course data
- Present course management options

**UI Components**:
- Login form
- Instructor dashboard
- Course list
- Course management interface

**Data Involved**:
- User authentication data
- Course assignment data
- Course metadata

**Conditions and Rules**:
- User must have instructor or administrator role
- User must be assigned to the course
- Course must be active

### 2. View Submissions

**Description**: Instructor views the list of student submissions for an assessment.

**User Actions**:
- Navigate to the assessments section of the course
- Select an assessment to grade
- View the list of student submissions
- Filter or sort submissions as needed (e.g., by submission date, status)

**System Actions**:
- Retrieve assessment data
- Fetch all submissions for the selected assessment
- Apply any filters or sorting criteria
- Display submission list with relevant metadata
- Show submission statistics (e.g., number of submissions, average completion time)

**UI Components**:
- Assessment list
- Submission list
- Filter and sort controls
- Submission statistics panel

**Data Involved**:
- Assessment data
- Submission metadata (student name, submission date, status)
- Submission statistics

**Conditions and Rules**:
- Only submissions for the selected assessment are displayed
- Submissions may be filtered by status (submitted, graded, late)
- Instructor can only view submissions for courses they are assigned to

### 3. Grade Submission

**Description**: Instructor reviews and grades a student's submission.

**User Actions**:
- Select a submission from the list
- Review the submitted content (answers, files, etc.)
- Evaluate the submission against grading criteria
- Assign points or select grade levels for each criterion
- Calculate total score

**System Actions**:
- Load the complete submission data
- Display submission content in appropriate format
- Present grading interface based on assessment type
- Calculate running total as grades are entered
- Validate grade entries

**UI Components**:
- Submission viewer
- Grading interface
- Rubric display (if applicable)
- Point allocation controls
- Grade calculator

**Data Involved**:
- Complete submission data
- Assessment grading criteria
- Rubric data (if applicable)
- Grade data

**Conditions and Rules**:
- Grades must be within the defined range for each criterion
- Total score cannot exceed maximum points for the assessment
- System may enforce grading policies (e.g., late submission penalties)
- Different assessment types may have different grading interfaces

### 4. Provide Feedback

**Description**: Instructor provides detailed feedback on the student's submission.

**User Actions**:
- Enter general feedback comments
- Add specific comments on individual parts of the submission
- Annotate submitted files or text (if applicable)
- Reference course materials or examples in feedback
- Suggest improvements or additional resources

**System Actions**:
- Save feedback text
- Associate annotations with specific parts of the submission
- Format feedback for student viewing
- Check for any required feedback fields

**UI Components**:
- Feedback text editor
- Annotation tools
- Reference selector
- Feedback preview

**Data Involved**:
- Feedback text
- Annotations
- References to course materials

**Conditions and Rules**:
- Feedback should be constructive and specific
- Certain assessment types may require minimum feedback
- Feedback may be structured according to rubric criteria
- System may provide feedback templates or suggestions

### 5. Save Grade

**Description**: Instructor saves the grade and feedback for the submission.

**User Actions**:
- Review the assigned grade and feedback
- Make any final adjustments
- Save the grade
- Optionally, move to the next submission

**System Actions**:
- Validate all required grading fields
- Save grade data to the database
- Update submission status to "graded"
- Record grading timestamp and grader information
- Prepare notification for student (if enabled)

**UI Components**:
- Grade summary
- Save button
- Next submission navigation
- Confirmation message

**Data Involved**:
- Final grade data
- Feedback data
- Submission status update
- Grading metadata (timestamp, grader)

**Conditions and Rules**:
- All required fields must be completed before saving
- System may enforce grade approval workflows for certain courses
- Grades may be saved as draft before final submission
- Notification settings may control when students are notified

### 6. Review Assessment Statistics

**Description**: Instructor reviews statistics for the assessment across all students.

**User Actions**:
- Navigate to assessment statistics view
- Review grade distribution
- Analyze performance on specific criteria or questions
- Identify areas where students struggled
- Compare with previous assessments or course averages

**System Actions**:
- Calculate assessment statistics
- Generate visualizations of grade distribution
- Analyze performance patterns
- Highlight potential issues or anomalies
- Compare with historical data if available

**UI Components**:
- Statistics dashboard
- Grade distribution charts
- Question analysis table
- Comparison tools
- Export options

**Data Involved**:
- All grades for the assessment
- Question-level performance data
- Historical assessment data
- Statistical calculations

**Conditions and Rules**:
- Statistics are only available after a minimum number of submissions are graded
- Certain statistics may be restricted based on privacy settings
- System may flag unusual patterns for review
- Statistics should not reveal individual student identities in aggregate views

### 7. Calculate Course Grade

**Description**: Instructor calculates or updates overall course grades based on all assessments.

**User Actions**:
- Navigate to course grade calculation interface
- Review all assessment grades for each student
- Verify assessment weightings
- Run course grade calculation
- Review calculated grades
- Make manual adjustments if necessary

**System Actions**:
- Retrieve all assessment grades for the course
- Apply assessment weightings according to course settings
- Calculate overall course grade for each student
- Apply any course grading policies (e.g., minimum passing requirements)
- Display calculated grades with supporting details

**UI Components**:
- Course grade calculator
- Student grade list
- Assessment weighting editor
- Grade adjustment tools
- Calculation preview

**Data Involved**:
- All assessment grades
- Assessment weightings
- Course grading policies
- Calculated course grades

**Conditions and Rules**:
- Course grade calculation follows the formula defined in course settings
- Missing assessment grades may be handled according to policy (e.g., counted as zero)
- Manual adjustments may require justification
- System may enforce grade boundaries or rounding rules

### 8. Publish Grades

**Description**: Instructor publishes grades to make them visible to students.

**User Actions**:
- Review final grades before publishing
- Select which grades to publish (individual assessment or course grades)
- Add any class-wide announcements about grades
- Confirm publication

**System Actions**:
- Update grade visibility settings
- Send notifications to students (if enabled)
- Record publication timestamp
- Update course grade records
- Generate grade reports if configured

**UI Components**:
- Grade publication interface
- Selection controls for which grades to publish
- Announcement composer
- Confirmation dialog

**Data Involved**:
- Grade visibility settings
- Notification data
- Publication metadata
- Grade report data

**Conditions and Rules**:
- Grades must be finalized before publishing
- Publication may be scheduled for a future date
- Publication may be synchronized with course events
- System may enforce review processes before publication
- Once published, grade changes may require special permissions

## Alternative Flows

### Batch Grading Flow

For efficiently grading multiple submissions at once:

1. Instructor selects multiple submissions from the list
2. System presents a batch grading interface
3. Instructor enters the same grade and/or feedback for all selected submissions
4. System applies the grade to all selected submissions
5. Instructor can review and adjust individual grades as needed

### Moderation Flow

For courses requiring grade moderation:

1. Primary instructor grades submissions
2. Grades are marked as "pending moderation"
3. Moderator reviews grades and provides feedback to instructor
4. Instructor adjusts grades based on moderator feedback
5. Moderator approves final grades
6. Approved grades are published to students

### Grade Appeal Flow

For handling student appeals of grades:

1. Student submits a grade appeal with justification
2. Instructor receives notification of appeal
3. Instructor reviews the original submission and appeal
4. Instructor decides whether to adjust the grade
5. Instructor provides response to the appeal
6. Student is notified of the appeal outcome
7. If grade is changed, course grade is recalculated

## Integration Points

### Integration with Assessment System

- Assessment configuration defines grading criteria
- Submission data is retrieved from the Assessment System
- Grades are stored in the Assessment System
- Assessment statistics are calculated based on all grades

### Integration with Course Management

- Course structure defines assessment weightings
- Course policies influence grading rules
- Course calendar may determine grade publication timing
- Course enrollment determines which students appear in grading interface

### Integration with Notification System

- Notifications are sent when grades are published
- Notifications may be sent for grade changes
- Notifications alert instructors to new submissions
- Notifications inform administrators of grade publication

### Integration with Reporting System

- Grade data feeds into course reports
- Statistical analysis of grades across courses
- Grade distribution reports for administrators
- Student progress reports include grade information

## Current Implementation Status

The Course Grading workflow in the legacy Hypatia LMS is minimally implemented:

1. **Grade Data Structure**: The data model includes a `finalGrade` field in user enrollments, but it's not actively used.
2. **Grade Date**: Activities have a `gradeDate` field, but no actual grading functionality.
3. **Placeholder Component**: The Grades component exists but displays a placeholder message.
4. **No Grading Interface**: There is no interface for instructors to grade submissions.
5. **No Grade Calculation**: There is no functionality to calculate course grades.
6. **No Grade Publication**: There is no mechanism to publish grades to students.

The current implementation shows that the system was designed with grading in mind, but the functionality was not fully implemented.

## Code References from Legacy System

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

### Activity with Grade Date

```javascript
// From src/app/core/admin/admin.jsx (inferred from context)
save() {
  if (this.props.userData.info.level === CONSTANTS.ADMIN_LEVEL) {
    const item = this.state.selectedItem;
    // ...
    
    if (item && (item.title || this.state.type === 'users')) {
      // ...
      
      if (item.date) {
        item.date = moment(item.date).format('YYYY-MM-DD');
      }
      if (item.startDate) {
        item.startDate = moment(item.startDate).format('YYYY-MM-DD');
      }
      if (item.endDate) {
        item.endDate = moment(item.endDate).format('YYYY-MM-DD');
      }
      if (item.gradeDate) {
        item.gradeDate = moment(item.gradeDate).format('YYYY-MM-DD');
      }
      
      // ...
    }
  }
}
```

### Enrollment with Final Grade Field

```javascript
// From src/app/themes/nekomy/pages/course/course.jsx
modalBoxAnswer(answer) {
  if (answer === 'accept') {
    let courseID = null;
    Object.keys(this.props.course).map((key) => {
      courseID = key;
      return false;
    });

    let subjectsAdded = 0;
    const subjectData = {
      finalGrade: '',
      status: 'enrolled'
    };

    $(this.refs['btn-enroll']).hide();
    $(this.refs['loader-enroll']).show();

    for (let i = 0; i < this.state.selectedSubjects.length; i += 1) {
      this.props.firebase.set(`users/${this.props.user.uid}/courses/${courseID}/${this.state.selectedSubjects[i]}`, subjectData).then(() => {
        subjectsAdded += 1;
        if (subjectsAdded === this.state.selectedSubjects.length) {
          $(this.refs['btn-enroll']).show();
          $(this.refs['loader-enroll']).hide();
          this.props.setNotification({ message: CONSTANTS.ENROLLED_COURSE, type: 'success' });
          this.setState({ selectedSubjects: [] });
        }
      }, (error) => {
        $(this.refs['btn-enroll']).show();
        $(this.refs['loader-enroll']).hide();
        this.props.setNotification({ message: String(error), type: 'error' });
      });
    }
  }
}
```

## Modern Implementation Approach

The modern implementation of the Course Grading workflow will leverage React, TypeScript, and Firebase Firestore to create a comprehensive grading system.

### Key Components

1. **GradingService**: Service for managing grades and calculations
2. **SubmissionList**: Component for displaying and filtering submissions
3. **SubmissionViewer**: Component for viewing submission details
4. **GradingInterface**: Component for assigning grades and feedback
5. **RubricEditor**: Component for creating and applying grading rubrics
6. **GradeBook**: Component for managing all grades in a course
7. **GradeCalculator**: Service for calculating course grades
8. **GradePublisher**: Component for publishing grades to students

### Data Model

```typescript
// Grade model
interface Grade {
  id: string;
  submissionId: string;
  userId: string;
  assessmentId: string;
  courseId: string;
  score: number;
  maxScore: number;
  percentage: number;
  feedback: string;
  rubricScores?: RubricScore[];
  status: 'draft' | 'final' | 'published' | 'appealed' | 'revised';
  gradedBy: string;
  gradedAt: Date;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Rubric score model
interface RubricScore {
  criterionId: string;
  score: number;
  maxScore: number;
  comment?: string;
}

// Course grade model
interface CourseGrade {
  id: string;
  userId: string;
  courseId: string;
  finalGrade: number;
  letterGrade?: string;
  assessmentGrades: {
    assessmentId: string;
    weight: number;
    score: number;
    weightedScore: number;
  }[];
  status: 'calculated' | 'adjusted' | 'final' | 'published';
  calculatedAt: Date;
  publishedAt?: Date;
  adjustedBy?: string;
  adjustmentReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Grade calculation settings
interface GradeCalculationSettings {
  courseId: string;
  assessmentWeights: {
    assessmentId: string;
    weight: number;
  }[];
  dropLowest: boolean;
  passingGrade: number;
  letterGradeScale?: {
    letter: string;
    minPercentage: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
}
```

### Service Layer

```typescript
// Grading service
export class GradingService {
  // Methods for handling grading operations
  async getSubmissionsForAssessment(assessmentId: string): Promise<Submission[]>;
  async getSubmission(submissionId: string): Promise<Submission>;
  async gradeSubmission(gradeData: Partial<Grade>): Promise<string>;
  async updateGrade(gradeId: string, gradeData: Partial<Grade>): Promise<void>;
  async getGrade(gradeId: string): Promise<Grade>;
  async getGradesForAssessment(assessmentId: string): Promise<Grade[]>;
  async getGradesForUser(userId: string, courseId?: string): Promise<Grade[]>;
  async calculateAssessmentStatistics(assessmentId: string): Promise<AssessmentStatistics>;
  async calculateCourseGrade(userId: string, courseId: string): Promise<CourseGrade>;
  async publishGrades(gradeIds: string[]): Promise<void>;
  async publishCourseGrades(courseId: string): Promise<void>;
}
```

### UI Implementation

```typescript
// Submission list component
export const SubmissionList: React.FC<SubmissionListProps> = ({ 
  assessmentId, 
  onSelectSubmission 
}) => {
  // Component implementation
};

// Submission viewer component
export const SubmissionViewer: React.FC<SubmissionViewerProps> = ({ 
  submission,
  onGrade 
}) => {
  // Component implementation
};

// Grading interface component
export const GradingInterface: React.FC<GradingInterfaceProps> = ({ 
  submission,
  assessment,
  existingGrade,
  onSaveGrade 
}) => {
  // Component implementation
};

// Rubric grading component
export const RubricGrading: React.FC<RubricGradingProps> = ({ 
  rubric,
  existingScores,
  onChange 
}) => {
  // Component implementation
};

// Grade book component
export const GradeBook: React.FC<GradeBookProps> = ({ 
  courseId 
}) => {
  // Component implementation
};

// Grade publisher component
export const GradePublisher: React.FC<GradePublisherProps> = ({ 
  courseId,
  assessmentId 
}) => {
  // Component implementation
};
```

## Recommendations for Implementation

1. **Phased Approach**: Implement the grading system in phases, starting with basic submission grading and expanding to course grade calculation and publication.

2. **Flexible Grading Models**: Support different grading models (points-based, percentage-based, rubric-based) to accommodate various assessment types.

3. **Automated Calculations**: Implement automated grade calculations for objective assessments (e.g., multiple-choice quizzes) to reduce instructor workload.

4. **Batch Operations**: Support batch operations for grading multiple submissions and publishing multiple grades to improve efficiency.

5. **Grade History**: Maintain a history of grade changes for audit purposes and to support grade appeals.

6. **Mobile Support**: Ensure the grading interface works well on tablets to allow instructors to grade on mobile devices.

7. **Offline Capabilities**: Implement offline grading capabilities to allow instructors to grade without a constant internet connection.

8. **Integration with LMS**: Integrate the grading system with other LMS features such as notifications, reporting, and analytics.

9. **Export/Import**: Support exporting and importing grades in common formats (CSV, Excel) for backup and integration with external systems.

10. **Privacy and Security**: Implement proper access controls to ensure that grades are only visible to authorized users.
