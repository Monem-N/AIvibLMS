# Feature Documentation: Assessment System

## Feature Information

| Attribute | Description |
|-----------|-------------|
| **Feature Name** | Assessment System |
| **Feature ID** | F006 |
| **Category** | Assessment and Evaluation |
| **Priority** | High |
| **Status in Legacy System** | Partially Implemented |

## Functional Description

The Assessment System feature enables instructors to create, manage, and grade various types of assessments within the Hypatia LMS. It allows students to take assessments, submit their work, and receive feedback and grades. The system supports different assessment types including quizzes, assignments, projects, and exams. Assessments are linked to activities within modules and contribute to the overall course grading.

## User Roles and Permissions

| Role | Permissions |
|------|-------------|
| Administrator | Can create, edit, and delete all assessment types; can manage assessment settings; can view all submissions and grades |
| Instructor | Can create and manage assessments within their assigned courses; can grade student submissions; can provide feedback |
| Student | Can view and take published assessments; can submit their work; can view their grades and feedback |
| Anonymous User | Cannot access assessments |

## User Workflows

### Assessment Creation

1. Instructor navigates to a module or activity
2. Instructor selects "Add Assessment" option
3. Instructor chooses assessment type (quiz, assignment, project, exam)
4. Instructor enters assessment details (title, instructions, due date, grading criteria)
5. Instructor configures assessment-specific settings (time limits, attempts allowed, etc.)
6. Instructor adds assessment content (questions, file upload requirements, etc.)
7. Instructor sets grading options (points, rubric, etc.)
8. Instructor saves and optionally publishes the assessment

### Assessment Taking (Student)

1. Student navigates to a course module or activity
2. Student views available assessments
3. Student selects an assessment to take
4. System displays assessment instructions and requirements
5. Student completes the assessment (answers questions, uploads files, etc.)
6. Student reviews their work
7. Student submits the assessment
8. System confirms submission and records timestamp

### Assessment Grading

1. Instructor navigates to a course module or activity
2. Instructor selects "View Submissions" for an assessment
3. System displays a list of student submissions
4. Instructor selects a submission to grade
5. System displays the student's work
6. Instructor reviews the submission and provides a grade
7. Instructor adds feedback comments
8. Instructor saves the grade
9. System notifies the student of the grade (optional)

### Grade Viewing (Student)

1. Student navigates to their course or dashboard
2. Student selects "Grades" or a specific assessment
3. System displays the student's grades for completed assessments
4. Student can view detailed feedback for each assessment
5. Student can see their overall course grade based on all assessments

## UI Components

- **Assessment Creator**: Interface for creating and editing assessments
- **Question Editor**: Component for creating different question types
- **Rubric Builder**: Tool for creating grading rubrics
- **Assessment Taker**: Interface for students to take assessments
- **File Uploader**: Component for submitting files
- **Submission Viewer**: Interface for viewing and grading submissions
- **Grade Display**: Component for displaying grades and feedback
- **Grade Book**: Interface for viewing all grades in a course

## Data Model

| Entity | Attributes | Relationships |
|--------|------------|---------------|
| Assessment | title, description, type, instructions, dueDate, availableDate, timeLimit, maxAttempts, totalPoints, status, activityId | Many-to-one with Activity |
| Question | text, type (multiple-choice, short answer, essay, etc.), options, correctAnswer, points | Many-to-one with Assessment |
| Submission | userId, assessmentId, submittedAt, status, attemptNumber, timeSpent | Many-to-one with Assessment, Many-to-one with User |
| Answer | questionId, submissionId, value, isCorrect, points | Many-to-one with Question, Many-to-one with Submission |
| Grade | submissionId, userId, assessmentId, score, feedback, gradedBy, gradedAt | One-to-one with Submission |
| Rubric | assessmentId, criteria, levels | Many-to-one with Assessment |
| RubricCriterion | rubricId, name, description, maxPoints | Many-to-one with Rubric |
| RubricLevel | criterionId, name, description, points | Many-to-one with RubricCriterion |

## API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/assessments` | GET | Retrieve all assessments |
| `/assessments` | POST | Create a new assessment |
| `/assessments/${id}` | GET | Retrieve a specific assessment |
| `/assessments/${id}` | PUT | Update a specific assessment |
| `/assessments/${id}` | DELETE | Delete a specific assessment |
| `/assessments/${id}/questions` | GET | Retrieve questions for an assessment |
| `/assessments/${id}/questions` | POST | Add a question to an assessment |
| `/submissions` | GET | Retrieve all submissions |
| `/submissions` | POST | Create a new submission |
| `/submissions/${id}` | GET | Retrieve a specific submission |
| `/submissions/${id}` | PUT | Update a specific submission |
| `/grades` | GET | Retrieve all grades |
| `/grades` | POST | Create a new grade |
| `/grades/${id}` | GET | Retrieve a specific grade |
| `/grades/${id}` | PUT | Update a specific grade |
| `/users/${userId}/grades` | GET | Retrieve grades for a specific user |
| `/assessments/${assessmentId}/submissions` | GET | Retrieve submissions for a specific assessment |

## Dependencies

- Firebase Firestore for data storage
- Firebase Storage for file submissions
- React for UI components
- Redux for state management
- Material-UI for UI components
- Date handling libraries for due dates and timestamps

## Testing Considerations

- Test assessment creation with various assessment types
- Test question creation with different question types
- Test assessment taking with different time limits and attempt restrictions
- Test file submission with various file types and sizes
- Test grading with different grading methods (points, rubrics)
- Test grade calculation and display
- Test assessment availability based on dates
- Test performance with large numbers of submissions
- Test concurrent submissions from multiple students

## Migration Notes

### Current Implementation Status

The assessment system in the legacy Hypatia LMS is partially implemented. The data model includes activities with grade dates, but the actual assessment functionality is limited. The "Grades" component exists but displays a placeholder message indicating that the feature will be available in the future. The current implementation has:

1. **Activity Entity**: Activities have grade dates but no specific assessment functionality
2. **Enrollment Records**: User enrollments track a finalGrade field, but it's not actively used
3. **Grades Component**: A placeholder component exists but is not fully implemented
4. **No Assessment Types**: No specific support for different assessment types
5. **No Submission System**: No system for submitting and tracking assessment responses
6. **Limited Grading**: No comprehensive grading system

### Migration Recommendations

1. **Complete Assessment System**: Implement a full-featured assessment system with various assessment types
2. **Submission Management**: Create a robust submission system for different assessment types
3. **Grading System**: Implement a comprehensive grading system with rubrics and feedback
4. **Grade Book**: Develop a grade book for instructors and students
5. **Automated Grading**: Add support for automated grading of objective assessments
6. **Analytics**: Implement assessment analytics for instructors
7. **Mobile Support**: Ensure assessments are accessible on mobile devices
8. **Offline Capabilities**: Consider offline assessment taking capabilities
9. **Integration with Activities**: Integrate assessments with the existing activity structure
10. **Notification System**: Add notifications for assessment deadlines and grade postings

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

### Activity Creation with Grade Date

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

    // ...
    
    for (let i = 0; i < this.state.selectedSubjects.length; i += 1) {
      this.props.firebase.set(`users/${this.props.user.uid}/courses/${courseID}/${this.state.selectedSubjects[i]}`, subjectData).then(() => {
        // ...
      });
    }
  }
}
```

## Modern Implementation Approach

### Assessment Service

```typescript
// Example of a modern implementation approach
export class AssessmentService {
  private db = getFirestore();
  private storage = getStorage();
  
  // Assessment methods
  async createAssessment(assessmentData: AssessmentData): Promise<string> {
    try {
      const assessmentRef = collection(this.db, 'assessments');
      
      const docRef = await addDoc(assessmentRef, {
        ...assessmentData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      return docRef.id;
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  async getAssessment(assessmentId: string): Promise<AssessmentData> {
    try {
      const assessmentRef = doc(this.db, 'assessments', assessmentId);
      const assessmentSnap = await getDoc(assessmentRef);
      
      if (assessmentSnap.exists()) {
        return { id: assessmentSnap.id, ...assessmentSnap.data() } as AssessmentData;
      } else {
        throw new Error('Assessment not found');
      }
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  async getAssessmentsByActivity(activityId: string): Promise<AssessmentData[]> {
    try {
      const assessmentsRef = collection(this.db, 'assessments');
      const q = query(assessmentsRef, where('activityId', '==', activityId));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as AssessmentData);
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  // Submission methods
  async createSubmission(submissionData: SubmissionData): Promise<string> {
    try {
      // Check if assessment is available
      const assessmentRef = doc(this.db, 'assessments', submissionData.assessmentId);
      const assessmentSnap = await getDoc(assessmentRef);
      
      if (!assessmentSnap.exists()) {
        throw new Error('Assessment not found');
      }
      
      const assessment = assessmentSnap.data() as AssessmentData;
      
      // Check if submission is allowed (due date, attempts, etc.)
      const now = new Date();
      if (assessment.dueDate && now > new Date(assessment.dueDate)) {
        throw new Error('Assessment due date has passed');
      }
      
      // Check previous attempts
      const submissionsRef = collection(this.db, 'submissions');
      const q = query(
        submissionsRef, 
        where('userId', '==', submissionData.userId),
        where('assessmentId', '==', submissionData.assessmentId)
      );
      const querySnapshot = await getDocs(q);
      
      if (assessment.maxAttempts && querySnapshot.size >= assessment.maxAttempts) {
        throw new Error('Maximum attempts reached');
      }
      
      // Create submission
      const submissionRef = collection(this.db, 'submissions');
      const docRef = await addDoc(submissionRef, {
        ...submissionData,
        attemptNumber: querySnapshot.size + 1,
        status: 'submitted',
        submittedAt: serverTimestamp()
      });
      
      return docRef.id;
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  async uploadSubmissionFile(submissionId: string, file: File): Promise<string> {
    try {
      const fileName = `submissions/${submissionId}/${Date.now()}_${file.name}`;
      const storageRef = ref(this.storage, fileName);
      
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      
      // Update submission with file reference
      const submissionRef = doc(this.db, 'submissions', submissionId);
      await updateDoc(submissionRef, {
        files: arrayUnion({
          name: file.name,
          url: downloadURL,
          type: file.type,
          size: file.size,
          uploadedAt: serverTimestamp()
        }),
        updatedAt: serverTimestamp()
      });
      
      return downloadURL;
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  // Grading methods
  async gradeSubmission(gradeData: GradeData): Promise<void> {
    try {
      const gradeRef = doc(this.db, 'grades', `${gradeData.submissionId}`);
      
      await setDoc(gradeRef, {
        ...gradeData,
        gradedAt: serverTimestamp()
      });
      
      // Update submission status
      const submissionRef = doc(this.db, 'submissions', gradeData.submissionId);
      await updateDoc(submissionRef, {
        status: 'graded',
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  async getUserGrades(userId: string, courseId?: string): Promise<GradeData[]> {
    try {
      let gradesQuery = collection(this.db, 'grades');
      gradesQuery = query(gradesQuery, where('userId', '==', userId));
      
      if (courseId) {
        // Get assessments for this course
        const assessmentsRef = collection(this.db, 'assessments');
        const assessmentsQuery = query(assessmentsRef, where('courseId', '==', courseId));
        const assessmentsSnapshot = await getDocs(assessmentsQuery);
        const assessmentIds = assessmentsSnapshot.docs.map(doc => doc.id);
        
        if (assessmentIds.length > 0) {
          gradesQuery = query(gradesQuery, where('assessmentId', 'in', assessmentIds));
        } else {
          return []; // No assessments in this course
        }
      }
      
      const querySnapshot = await getDocs(gradesQuery);
      
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as GradeData);
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  // Helper methods
  private handleError(error: any): Error {
    console.error('Assessment service error:', error);
    return new Error(`Assessment operation failed: ${error.message}`);
  }
}
```

## Additional Notes

- The assessment system is a critical component of any LMS
- The current implementation in Hypatia is minimal, with placeholder components
- The modern implementation should provide a comprehensive assessment system
- Integration with the existing activity structure is important
- Consider supporting various assessment types to accommodate different learning styles
- Automated grading can reduce instructor workload for objective assessments
- Analytics can provide valuable insights into student performance
- Mobile support is essential for modern learning environments
