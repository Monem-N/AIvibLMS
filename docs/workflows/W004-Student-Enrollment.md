# User Workflow: Student Enrollment

## Workflow Information

| Attribute | Description |
|-----------|-------------|
| **Workflow Name** | Student Enrollment |
| **Workflow ID** | W004 |
| **User Role(s)** | Student, Administrator |
| **Related Features** | Course Management (F003), User Authentication (F001) |
| **Frequency** | High (typically at the beginning of each term) |
| **Criticality** | Critical |

## Workflow Overview

This workflow describes the process of student enrollment in courses within the Hypatia LMS. It includes browsing available courses, selecting subjects for enrollment, completing the enrollment process, and managing enrollments. The enrollment process is time-sensitive, with courses having defined enrollment periods.

## Preconditions

- User is authenticated and has a student role
- Courses and subjects are created and published in the system
- Course enrollment period is open (current date is between course start and end dates)
- User has not already enrolled in the selected subjects

## Workflow Steps

### Self-Enrollment Flow

#### Step 1: Browse Available Courses

**Actor**: Student

**Action**: Student navigates to the course listing page to browse available courses.

**System Response**: System displays a list of available courses with basic information (title, level, featured image).

**UI Components**: Course listing page, Course cards, Search/filter controls

**Alternative Flows**: 
- Student can use search or filters to find specific courses
- If no courses are available, system displays an appropriate message

#### Step 2: View Course Details

**Actor**: Student

**Action**: Student selects a course to view more details.

**System Response**: System displays the course details page with comprehensive information about the course, including description, level, credits, enrollment dates, and requirements.

**UI Components**: Course detail page, Course navigation tabs, Enrollment button

**Alternative Flows**: 
- If course enrollment is not open, the enrollment button is disabled or not shown
- If student is already enrolled in the course, system shows enrollment status instead of enrollment button

#### Step 3: Navigate to Subjects Tab

**Actor**: Student

**Action**: Student clicks on the "Subjects" tab or the "Enroll now" button.

**System Response**: System displays the list of subjects available in the course, including code, title, teachers, and credits.

**UI Components**: Subjects tab, Subject list table, Enrollment checkboxes

**Alternative Flows**: 
- If student is not authenticated, system prompts to sign in
- If course has no subjects, system displays an appropriate message

#### Step 4: Select Subjects for Enrollment

**Actor**: Student

**Action**: Student selects subjects to enroll in by checking the checkboxes next to desired subjects.

**System Response**: System enables the "Proceed with the registration" button when at least one subject is selected.

**UI Components**: Subject checkboxes, Enrollment button

**Alternative Flows**: 
- If a subject is not available for enrollment (inactive or full), it cannot be selected
- If student is already enrolled in a subject, it shows the enrollment status instead of a checkbox

#### Step 5: Confirm Enrollment

**Actor**: Student

**Action**: Student clicks the "Proceed with the registration" button.

**System Response**: System displays a confirmation dialog asking the student to confirm the enrollment.

**UI Components**: Confirmation dialog, Accept/Cancel buttons

**Alternative Flows**: 
- Student can cancel the enrollment process at this point

#### Step 6: Complete Enrollment

**Actor**: Student

**Action**: Student confirms the enrollment by clicking "Accept" in the confirmation dialog.

**System Response**: 
1. System shows a loading indicator
2. System creates enrollment records for each selected subject
3. System displays a success message when enrollment is complete

**UI Components**: Loading indicator, Success notification

**Alternative Flows**:
- If enrollment fails for any reason, system displays an error message
- If some subjects were successfully enrolled but others failed, system provides details

### Administrative Enrollment Flow

#### Step 1: Access User Management

**Actor**: Administrator

**Action**: Administrator navigates to the Admin section and selects "Users".

**System Response**: System displays the user management interface with a list of users.

**UI Components**: Admin navigation, User list

**Alternative Flows**: None

#### Step 2: Select Student

**Actor**: Administrator

**Action**: Administrator selects a student from the list or searches for a specific student.

**System Response**: System displays the student's profile and enrollment information.

**UI Components**: User search, User profile, Enrollment section

**Alternative Flows**: 
- If student doesn't exist, administrator can create a new user account

#### Step 3: Add Course Enrollment

**Actor**: Administrator

**Action**: Administrator clicks "Add Enrollment" or a similar button.

**System Response**: System displays a form or dialog to select a course and subjects for enrollment.

**UI Components**: Course selector, Subject selector, Enrollment form

**Alternative Flows**: None

#### Step 4: Select Course and Subjects

**Actor**: Administrator

**Action**: Administrator selects a course and one or more subjects for the student to be enrolled in.

**System Response**: System validates the selections and enables the submit button.

**UI Components**: Course dropdown, Subject checkboxes, Submit button

**Alternative Flows**: 
- If no courses are available, system displays an appropriate message
- If student is already enrolled in all subjects of a course, system indicates this

#### Step 5: Complete Administrative Enrollment

**Actor**: Administrator

**Action**: Administrator submits the enrollment form.

**System Response**: 
1. System creates enrollment records for the selected subjects
2. System displays a success message
3. System updates the student's enrollment information

**UI Components**: Success notification, Updated enrollment list

**Alternative Flows**:
- If enrollment fails, system displays an error message with details

### Enrollment Management Flow

#### Step 1: View Enrolled Courses

**Actor**: Student

**Action**: Student navigates to their dashboard or profile page.

**System Response**: System displays a list of courses the student is enrolled in.

**UI Components**: Dashboard, Enrolled courses list

**Alternative Flows**: 
- If student is not enrolled in any courses, system displays an appropriate message

#### Step 2: View Enrollment Details

**Actor**: Student

**Action**: Student selects an enrolled course to view details.

**System Response**: System displays the course details with enrollment status for each subject.

**UI Components**: Course detail page, Enrollment status indicators

**Alternative Flows**: None

#### Step 3: Drop Enrollment (Optional)

**Actor**: Student

**Action**: Student clicks a "Drop" or "Unenroll" button for a specific subject or course.

**System Response**: System displays a confirmation dialog.

**UI Components**: Drop button, Confirmation dialog

**Alternative Flows**: 
- If dropping is not allowed (e.g., past the drop deadline), the button is disabled or not shown

#### Step 4: Confirm Dropping Enrollment

**Actor**: Student

**Action**: Student confirms dropping the enrollment.

**System Response**: 
1. System updates the enrollment status to "dropped"
2. System displays a success message
3. System updates the enrollment list

**UI Components**: Success notification, Updated enrollment list

**Alternative Flows**:
- If dropping fails, system displays an error message

## Postconditions

- For successful enrollment: Student is enrolled in selected subjects with "enrolled" status
- For administrative enrollment: Student is enrolled in subjects selected by the administrator
- For dropping enrollment: Student's enrollment status is updated to "dropped" for the selected subjects
- Enrollment records are created or updated in the system
- Student can access enrolled course content

## Error Conditions and Recovery

| Error Condition | Recovery Path |
|-----------------|---------------|
| Course enrollment period closed | Wait for next enrollment period or contact administrator |
| Subject is full | Select different subjects or contact administrator |
| Network connectivity issues | Retry when connection is restored |
| Student already enrolled in subject | No action needed or drop and re-enroll if necessary |
| Insufficient permissions | Contact administrator for assistance |
| System error during enrollment | Retry or contact administrator with error details |

## Performance Expectations

- Course listing should load within 3 seconds
- Subject selection and enrollment should complete within 5 seconds
- Enrollment status updates should be reflected immediately in the UI

## User Experience Considerations

- Clear indication of enrollment periods for each course
- Visual feedback for enrollment status (enrolled, not enrolled, dropped)
- Intuitive subject selection interface
- Clear confirmation before completing enrollment
- Accessible enrollment process for users with disabilities
- Mobile-friendly enrollment interface

## Testing Scenarios

1. Enroll in a course with multiple subjects
2. Attempt to enroll in a course outside enrollment period
3. Attempt to enroll in subjects already enrolled in
4. Drop enrollment from a subject
5. Administrative enrollment of a student in a course
6. Enroll in multiple courses simultaneously
7. Test enrollment with network interruptions
8. Verify enrollment status display after enrollment
9. Test enrollment with various course configurations
10. Verify access to course content after enrollment

## Workflow Diagram

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Browse         │     │  View           │     │  Navigate to    │
│  Available      │────▶│  Course         │────▶│  Subjects Tab   │
│  Courses        │     │  Details        │     │                 │
└─────────────────┘     └─────────────────┘     └────────┬────────┘
                                                         │
                                                         ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Complete       │     │  Confirm        │     │  Select         │
│  Enrollment     │◀────│  Enrollment     │◀────│  Subjects for   │
│                 │     │                 │     │  Enrollment     │
└─────────────────┘     └─────────────────┘     └─────────────────┘


Administrative Enrollment:
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Access User    │     │  Select         │     │  Add Course     │
│  Management     │────▶│  Student        │────▶│  Enrollment     │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └────────┬────────┘
                                                         │
                                                         ▼
┌─────────────────┐     ┌─────────────────┐
│  Complete       │     │  Select Course  │
│  Administrative │◀────│  and Subjects   │
│  Enrollment     │     │                 │
└─────────────────┘     └─────────────────┘


Enrollment Management:
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  View           │     │  View           │     │  Drop           │
│  Enrolled       │────▶│  Enrollment     │────▶│  Enrollment     │
│  Courses        │     │  Details        │     │  (Optional)     │
└─────────────────┘     └─────────────────┘     └────────┬────────┘
                                                         │
                                                         ▼
                                                ┌─────────────────┐
                                                │  Confirm        │
                                                │  Dropping       │
                                                │  Enrollment     │
                                                └─────────────────┘
```

## Code References from Legacy System

### Enrollment Button Display

```javascript
// From src/app/themes/nekomy/pages/course/course.jsx
render() {
  // ...
  
  // Check if enrollment is open
  if (moment().isBetween(moment(course.startDate), moment(course.endDate), 'days', '[]')) {
    enrollmentOpened = true;
  }
  
  // Display enrollment button if appropriate
  return (
    <section className="page course">
      {course
        ? <div className="page-wrapper">
          {/* ... */}
          {section !== 'subjects' && subjects && enrollmentOpened
            ? <button className="btn btn-primary btn-enroll">
              <Link to={`/courses/${course.slug}/subjects`}>Enrol now!</Link>
            </button>
            : ''}
          {/* ... */}
        </div>
        : <div className="loader-small" />}
    </section>
  );
}
```

### Subject Selection for Enrollment

```javascript
// From src/app/themes/nekomy/pages/course/course.jsx
handleChange(event) {
  const selectedSubjects = this.state.selectedSubjects;

  if (event.target.checked) {
    selectedSubjects.push(event.target.value);
  } else {
    let index = -1;
    for (let i = 0; i < selectedSubjects.length; i += 1) {
      if (selectedSubjects[i] === event.target.value) {
        index = i;
      }
    }
    if (index >= 0) {
      selectedSubjects.splice(index, 1);
    }
  }
  this.setState({ selectedSubjects });
}

render() {
  // ...
  
  // Display subject enrollment checkboxes
  if (isLoaded(this.props.subjects) && !isEmpty(this.props.subjects)) {
    subjects = Object.keys(this.props.subjects).map((item) => {
      const subject = this.props.subjects[item];
      
      // Check if subject belongs to this course
      if (subject.course === courseID) {
        totalCredits += parseInt(subject.credits, 10);
        
        // Determine enrollment status/options
        let itemEnrol = 'unavailable';
        if (isLoaded(this.props.userData) && !isEmpty(this.props.userData)) {
          if (this.props.userData.courses && this.props.userData.courses[courseID][item]) {
            itemEnrol = this.props.userData.courses[courseID][item].status;
          } else if (subject.status === 'active' && enrollmentOpened) {
            itemEnrol = <span><input type="checkbox" value={item} onChange={event => this.handleChange(event)} />Enrol now</span>;
          }
        }
        
        return (
          <tr key={item}>
            <td>{subject.code}</td>
            <td>
              <Link to={`/subjects/${subject.slug}`}>{subject.title}</Link>
            </td>
            <td>{teachers}</td>
            <td>{subject.credits}</td>
            <td>{itemEnrol}</td>
          </tr>
        );
      }
      return null;
    });
  }
}
```

### Enrollment Confirmation and Processing

```javascript
// From src/app/themes/nekomy/pages/course/course.jsx
enrolConfirmation() {
  this.setState({
    modalTitle: CONSTANTS.CONFIRM_ENROL
  }, () => {
    $('.js-modal-box-wrapper').show().animateCss('fade-in');
  });
}

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

## Migration Notes

### Current Implementation Issues

1. **Direct Firebase Integration**: Components directly call Firebase methods for enrollment
2. **jQuery Dependency**: Uses jQuery for DOM manipulation (show/hide elements)
3. **String Refs**: Uses deprecated string refs for form elements
4. **Limited Error Handling**: Basic error handling without specific user guidance
5. **No Enrollment Validation**: Limited validation of enrollment eligibility
6. **No Waitlist Support**: No support for waitlists when courses are full
7. **Limited Enrollment Management**: Basic enrollment functionality without advanced features
8. **No Bulk Enrollment**: No ability to enroll in multiple courses at once

### Migration Recommendations

1. **Enrollment Service Layer**: Create a service to abstract enrollment operations
2. **React State Management**: Use React state for UI changes instead of jQuery
3. **Enhanced Validation**: Implement comprehensive enrollment validation
4. **Improved Error Handling**: Provide more specific error messages and recovery paths
5. **Waitlist Support**: Add support for waitlists when courses are full
6. **Enhanced Enrollment Management**: Improve enrollment tracking and management
7. **Bulk Enrollment**: Support enrolling in multiple courses at once
8. **Enrollment Analytics**: Add analytics for enrollment patterns and trends

## Modern Implementation Approach

### Enrollment Service

```typescript
// Example of a modern implementation approach
export class EnrollmentService {
  private db = getFirestore();
  
  // Enroll in subjects
  async enrollInSubjects(userId: string, courseId: string, subjectIds: string[]): Promise<EnrollmentResult> {
    try {
      // Validate enrollment eligibility
      const validationResult = await this.validateEnrollment(userId, courseId, subjectIds);
      if (!validationResult.isValid) {
        return {
          success: false,
          message: validationResult.message,
          failedSubjects: validationResult.invalidSubjects
        };
      }
      
      // Create batch write for all enrollments
      const batch = writeBatch(this.db);
      const timestamp = serverTimestamp();
      
      // Process each subject enrollment
      for (const subjectId of subjectIds) {
        const enrollmentRef = doc(this.db, 'enrollments', `${userId}_${courseId}_${subjectId}`);
        batch.set(enrollmentRef, {
          userId,
          courseId,
          subjectId,
          status: 'enrolled',
          finalGrade: null,
          enrolledAt: timestamp,
          updatedAt: timestamp
        });
      }
      
      // Commit all enrollments
      await batch.commit();
      
      // Return success result
      return {
        success: true,
        message: 'Successfully enrolled in selected subjects',
        enrolledSubjects: subjectIds
      };
    } catch (error) {
      console.error('Enrollment error:', error);
      return {
        success: false,
        message: `Enrollment failed: ${error.message}`,
        failedSubjects: subjectIds
      };
    }
  }
  
  // Validate enrollment eligibility
  private async validateEnrollment(userId: string, courseId: string, subjectIds: string[]): Promise<ValidationResult> {
    try {
      // Get course data
      const courseRef = doc(this.db, 'courses', courseId);
      const courseSnap = await getDoc(courseRef);
      
      if (!courseSnap.exists()) {
        return {
          isValid: false,
          message: 'Course not found',
          invalidSubjects: subjectIds
        };
      }
      
      const courseData = courseSnap.data();
      
      // Check if enrollment is open
      const now = new Date();
      const startDate = courseData.startDate?.toDate() || null;
      const endDate = courseData.endDate?.toDate() || null;
      
      if (!startDate || !endDate || now < startDate || now > endDate) {
        return {
          isValid: false,
          message: 'Course enrollment is not open',
          invalidSubjects: subjectIds
        };
      }
      
      // Check if course is active
      if (courseData.status !== 'active') {
        return {
          isValid: false,
          message: 'Course is not active',
          invalidSubjects: subjectIds
        };
      }
      
      // Check existing enrollments
      const invalidSubjects: string[] = [];
      const existingEnrollments: string[] = [];
      
      for (const subjectId of subjectIds) {
        // Check if subject exists and is active
        const subjectRef = doc(this.db, 'subjects', subjectId);
        const subjectSnap = await getDoc(subjectRef);
        
        if (!subjectSnap.exists() || subjectSnap.data().status !== 'active') {
          invalidSubjects.push(subjectId);
          continue;
        }
        
        // Check if already enrolled
        const enrollmentRef = doc(this.db, 'enrollments', `${userId}_${courseId}_${subjectId}`);
        const enrollmentSnap = await getDoc(enrollmentRef);
        
        if (enrollmentSnap.exists()) {
          existingEnrollments.push(subjectId);
        }
      }
      
      if (invalidSubjects.length > 0) {
        return {
          isValid: false,
          message: 'Some subjects are not available for enrollment',
          invalidSubjects
        };
      }
      
      if (existingEnrollments.length > 0) {
        return {
          isValid: false,
          message: 'Already enrolled in some subjects',
          invalidSubjects: existingEnrollments
        };
      }
      
      return {
        isValid: true,
        message: 'Enrollment validation successful',
        invalidSubjects: []
      };
    } catch (error) {
      console.error('Validation error:', error);
      return {
        isValid: false,
        message: `Validation failed: ${error.message}`,
        invalidSubjects: subjectIds
      };
    }
  }
  
  // Get user enrollments
  async getUserEnrollments(userId: string): Promise<EnrollmentData[]> {
    try {
      const enrollmentsRef = collection(this.db, 'enrollments');
      const q = query(enrollmentsRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as EnrollmentData);
    } catch (error) {
      console.error('Get enrollments error:', error);
      throw new Error(`Failed to get enrollments: ${error.message}`);
    }
  }
  
  // Drop enrollment
  async dropEnrollment(userId: string, courseId: string, subjectId: string): Promise<boolean> {
    try {
      const enrollmentRef = doc(this.db, 'enrollments', `${userId}_${courseId}_${subjectId}`);
      const enrollmentSnap = await getDoc(enrollmentRef);
      
      if (!enrollmentSnap.exists()) {
        throw new Error('Enrollment not found');
      }
      
      await updateDoc(enrollmentRef, {
        status: 'dropped',
        updatedAt: serverTimestamp()
      });
      
      return true;
    } catch (error) {
      console.error('Drop enrollment error:', error);
      throw new Error(`Failed to drop enrollment: ${error.message}`);
    }
  }
}
```

## Additional Notes

- Enrollment is a critical workflow that directly impacts student experience
- The current implementation has basic functionality but lacks advanced features
- Enrollment is managed at the subject level within courses
- The enrollment period is controlled by course start and end dates
- The modern implementation should enhance enrollment validation, management, and analytics
