# Feature Documentation: Course Management

## Feature Information

| Attribute | Description |
|-----------|-------------|
| **Feature Name** | Course Management |
| **Feature ID** | F003 |
| **Category** | Course Management |
| **Priority** | Critical |
| **Status in Legacy System** | Fully Implemented |

## Functional Description

The Course Management feature allows administrators and instructors to create, edit, organize, and publish educational courses within the Hypatia LMS. Courses are the top-level organizational unit for educational content and serve as containers for subjects, modules, and activities. The feature includes course creation, enrollment management, course display, and course navigation. Students can browse available courses, enroll in courses during enrollment periods, and access course content.

## User Roles and Permissions

| Role | Permissions |
|------|-------------|
| Administrator | Can create, edit, and delete all courses; can manage course enrollment; can publish/unpublish courses |
| Instructor | Can create and edit assigned courses; can manage content within their courses; can view enrollment data |
| Student | Can view published courses; can enroll in courses during enrollment periods; can access enrolled course content |
| Anonymous User | Can view public course listings but cannot access course content or enroll |

## User Workflows

### Course Creation

1. Administrator or instructor navigates to the Admin section
2. User selects "Courses" and clicks "New" to create a new course
3. User enters course details (title, code, description, level, price, etc.)
4. User sets enrollment dates and course status
5. User uploads a featured image for the course
6. User saves the course
7. User adds subjects, modules, and activities to the course

### Course Enrollment

1. Student navigates to a course page
2. If enrollment is open, student clicks "Enroll now" button
3. Student is directed to the subjects page to select subjects
4. Student selects subjects to enroll in by checking checkboxes
5. Student clicks "Proceed with the registration" button
6. System displays a confirmation dialog
7. Student confirms enrollment
8. System enrolls the student in the selected subjects
9. System displays a success message

### Course Management

1. Administrator or instructor navigates to the Admin section
2. User selects "Courses" to view all courses
3. User can filter and search for specific courses
4. User can edit existing courses by clicking on them
5. User can update course details, content, and status
6. User can manage subjects, modules, and activities within the course
7. User can view enrollment data for the course

### Course Navigation

1. Student navigates to the course listing page
2. Student selects a course to view
3. System displays the course summary page
4. Student can navigate between course sections (summary, subjects, fees, requirements)
5. Student can access enrolled subjects and their content
6. Student can track progress through the course

## UI Components

- **Course Listing**: Grid or list view of available courses
- **Course Creation Form**: Form for creating and editing courses
- **Course Detail Page**: Page displaying course information and content
- **Course Navigation**: Tabs or menu for navigating course sections
- **Enrollment Interface**: Interface for selecting and enrolling in subjects
- **Course Administration**: Interface for managing courses in the admin section
- **Enrollment Status Display**: Component showing enrollment status and dates

## Data Model

| Entity | Attributes | Relationships |
|--------|------------|---------------|
| Course | title, code, slug, content1, content2, content3, requirements, status, featuredImage, level, price, startDate, endDate | One-to-many with Subjects |
| Subject | title, code, slug, content1, content2, content3, status, featuredImage, course, credits | One-to-many with Modules, Many-to-one with Course |
| Level | title, code, status | Referenced by Courses |
| UserCourse | finalGrade, status (enrolled, completed, etc.) | Many-to-many between Users and Courses |

## API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/courses` | GET | Retrieve all courses |
| `/courses` | PUSH | Create a new course |
| `/courses/${id}` | GET | Retrieve a specific course |
| `/courses/${id}` | SET | Update a specific course |
| `/courses/${id}` | REMOVE | Delete a specific course |
| `/courses#orderByChild=slug&equalTo=${slug}` | GET | Retrieve a course by slug |
| `/users/${userId}/courses/${courseId}/${subjectId}` | SET | Enroll a user in a subject within a course |
| `/users/${userId}/courses/${courseId}/${subjectId}` | GET | Check enrollment status |

## Dependencies

- Firebase Realtime Database for course data storage
- Firebase Storage for course images
- Redux for state management
- React for UI components
- Moment.js for date handling
- Markdown conversion for course content display

## Testing Considerations

- Test course creation with various course details
- Test course enrollment during and outside enrollment periods
- Test course display for different user roles
- Test course navigation and content access
- Test enrollment status tracking
- Test course updates and their effect on enrolled students
- Test course listing and filtering
- Test performance with large numbers of courses and enrollments

## Migration Notes

### Current Implementation Issues

1. **Fragmented Course Management**: Course creation and subject/module/activity association is split across different admin sections
2. **Limited Enrollment Management**: Basic enrollment functionality without advanced features
3. **jQuery Dependency**: Uses jQuery for UI interactions
4. **Direct Firebase Integration**: Direct calls to Firebase in components
5. **Limited Course Analytics**: Basic enrollment tracking without detailed analytics
6. **No Bulk Operations**: No ability to perform bulk operations on courses
7. **Limited Search and Filter**: Basic search functionality
8. **Manual Date Handling**: Manual conversion of dates using Moment.js

### Migration Recommendations

1. **Unified Course Management**: Create a unified interface for managing courses and their content
2. **Enhanced Enrollment System**: Implement more robust enrollment features (waitlists, prerequisites, enrollment codes)
3. **Remove jQuery Dependency**: Use React state and effects for UI interactions
4. **Service Layer Abstraction**: Create a service layer to abstract Firebase interactions
5. **Course Analytics**: Add detailed analytics for course engagement and completion
6. **Bulk Operations**: Implement bulk creation, editing, and enrollment features
7. **Advanced Search and Filter**: Enhance search and filtering capabilities
8. **Improved Date Handling**: Use modern date libraries and consistent date formatting

## Code References from Legacy System

### Course Creation

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

    if (item && (item.title || this.state.type === 'users')) {
      if (this.state.type !== 'files' && this.state.type !== 'users') {
        item.slug = Helpers.slugify(item.title);
      } else if (this.tempFile) {
        item.file = this.tempFile.name;
        uploadFile = true;
        this.uploadFile(this.tempFile);
      }

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

      item.status = this.refs['status-checkbox'].checked
        ? 'active'
        : 'inactive';

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

### Course Enrollment

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

### Course Display

```javascript
// From src/app/themes/nekomy/pages/course/course.jsx
render() {
  let course = null;
  let featuredImage = null;
  let enrollmentOpened = false;
  let courseID = null;
  let subjects = null;
  let totalCredits = 0;
  const section = this.props.location.pathname.substr(this.props.location.pathname.lastIndexOf('/') + 1);

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

## Modern Implementation Approach

### Course Service

```typescript
// Example of a modern implementation approach
export class CourseService {
  private db = getFirestore();
  
  // Course methods
  async createCourse(courseData: CourseData): Promise<string> {
    try {
      const courseRef = collection(this.db, 'courses');
      const slug = this.generateSlug(courseData.title);
      
      // Format dates
      const formattedData = {
        ...courseData,
        slug,
        startDate: courseData.startDate ? new Date(courseData.startDate) : null,
        endDate: courseData.endDate ? new Date(courseData.endDate) : null,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      const docRef = await addDoc(courseRef, formattedData);
      return docRef.id;
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  async updateCourse(courseId: string, courseData: Partial<CourseData>): Promise<void> {
    try {
      const courseRef = doc(this.db, 'courses', courseId);
      
      // Format dates if provided
      const formattedData = { ...courseData };
      if (courseData.startDate) formattedData.startDate = new Date(courseData.startDate);
      if (courseData.endDate) formattedData.endDate = new Date(courseData.endDate);
      formattedData.updatedAt = serverTimestamp();
      
      await updateDoc(courseRef, formattedData);
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  async getCourse(courseId: string): Promise<CourseData> {
    try {
      const courseRef = doc(this.db, 'courses', courseId);
      const courseSnap = await getDoc(courseRef);
      
      if (courseSnap.exists()) {
        return { id: courseSnap.id, ...courseSnap.data() } as CourseData;
      } else {
        throw new Error('Course not found');
      }
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  async getCourseBySlug(slug: string): Promise<CourseData> {
    try {
      const coursesRef = collection(this.db, 'courses');
      const q = query(coursesRef, where('slug', '==', slug), limit(1));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const courseDoc = querySnapshot.docs[0];
        return { id: courseDoc.id, ...courseDoc.data() } as CourseData;
      } else {
        throw new Error('Course not found');
      }
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  async enrollUserInCourse(userId: string, courseId: string, subjectIds: string[]): Promise<void> {
    try {
      const batch = writeBatch(this.db);
      
      for (const subjectId of subjectIds) {
        const enrollmentRef = doc(this.db, 'enrollments', `${userId}_${courseId}_${subjectId}`);
        batch.set(enrollmentRef, {
          userId,
          courseId,
          subjectId,
          status: 'enrolled',
          finalGrade: null,
          enrolledAt: serverTimestamp()
        });
      }
      
      await batch.commit();
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  async getUserEnrollments(userId: string): Promise<EnrollmentData[]> {
    try {
      const enrollmentsRef = collection(this.db, 'enrollments');
      const q = query(enrollmentsRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as EnrollmentData);
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  // Helper methods
  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  }
  
  private handleError(error: any): Error {
    console.error('Course service error:', error);
    return new Error(`Course operation failed: ${error.message}`);
  }
}
```

## Additional Notes

- Course management is a core feature of the LMS platform
- Courses are organized hierarchically with subjects, modules, and activities
- Enrollment is managed at the subject level within courses
- Course visibility and access is controlled by status and enrollment
- The current implementation has limited analytics and reporting capabilities
- The modern implementation should provide better course management, enrollment, and analytics features
