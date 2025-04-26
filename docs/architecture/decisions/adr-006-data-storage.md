# ADR 006: Data Storage Strategy

## Status
Proposed

## Context
The modernization of the Hypatia LMS requires selecting an appropriate data storage strategy for the new system. The current implementation uses Firebase Realtime Database for storing application data. We need to decide whether to continue with Realtime Database, migrate to Firestore, or adopt a different storage solution.

Key considerations include:
- Data model complexity and relationships
- Query capabilities and performance
- Scalability and cost
- Real-time synchronization needs
- Offline capabilities
- Security rules and access control
- Migration path from the current system
- Integration with other Firebase services

## Decision
We will migrate from Firebase Realtime Database to Firestore for data storage in the modernized Hypatia LMS.

Specifically:
1. We will design a Firestore data model optimized for the application's access patterns
2. We will implement a service layer to abstract Firestore interactions
3. We will use Firestore's security rules for fine-grained access control
4. We will leverage Firestore's real-time capabilities for collaborative features
5. We will implement a data migration strategy from Realtime Database to Firestore

## Rationale
Firestore was selected for the following reasons:

1. **Improved Data Model**: Firestore's document-collection model is better suited for the hierarchical and relational nature of educational content than Realtime Database's JSON tree structure. This allows for more intuitive modeling of courses, subjects, modules, activities, and their relationships.

2. **Advanced Query Capabilities**: Firestore provides more powerful querying capabilities, including compound queries, array contains filters, and pagination, which are essential for efficiently retrieving educational content and user data.

3. **Better Scalability**: Firestore is designed to scale automatically with application growth, handling large numbers of users and content without performance degradation. This is crucial for an LMS that may need to support many concurrent users.

4. **Offline Support**: Firestore has robust offline capabilities, allowing users to access and interact with content even when temporarily disconnected, which is valuable for mobile learning scenarios.

5. **Structured Data Validation**: Firestore allows for more structured data validation through security rules, ensuring data integrity across the application.

6. **Real-time Updates**: While both databases offer real-time capabilities, Firestore's approach to real-time updates is more efficient for the types of real-time features needed in an LMS (e.g., collaborative editing, notifications).

7. **Cost Model**: Firestore's pricing model is based on operations rather than storage size and bandwidth, which typically aligns better with LMS usage patterns where reads are more frequent than writes.

8. **Future Direction**: Firestore represents Google's strategic direction for Firebase database solutions, ensuring better long-term support and feature development.

Alternative approaches considered:

1. **Continue with Realtime Database**: While this would minimize migration effort, it would perpetuate the limitations of the current data model and querying capabilities.

2. **Use a Traditional SQL Database**: A relational database would provide strong consistency and complex query capabilities but would require significant changes to the application architecture and lose real-time synchronization benefits.

3. **Adopt a Different NoSQL Solution**: Other NoSQL databases (MongoDB, DynamoDB, etc.) would require moving away from the Firebase ecosystem, increasing complexity and potentially requiring server-side code.

4. **Hybrid Approach**: Using both Realtime Database and Firestore for different parts of the application would add unnecessary complexity to the architecture.

## Consequences

### Positive
- More intuitive and flexible data modeling
- Enhanced query capabilities for complex data retrieval
- Better performance for typical LMS access patterns
- Improved offline support for mobile users
- More granular security rules and data validation
- Better scalability for growing user base and content
- Alignment with Firebase's strategic direction

### Negative
- Migration effort required to move data from Realtime Database to Firestore
- Learning curve for developers not familiar with Firestore
- Potential increase in operational costs depending on usage patterns
- Need to redesign security rules and access patterns
- Some Firebase libraries and integrations may need updates

## Implementation Strategy

1. **Design Firestore Data Model**: Create a comprehensive data model that maps the current Realtime Database structure to Firestore collections and documents.

2. **Implement Service Layer**: Develop a service abstraction layer that encapsulates all Firestore operations, following the pattern defined in ADR-005 (API Layer Design).

3. **Define Security Rules**: Create Firestore security rules that enforce appropriate access control based on user roles and permissions.

4. **Develop Migration Scripts**: Create scripts to migrate existing data from Realtime Database to Firestore, ensuring data integrity and relationship preservation.

5. **Implement Caching Strategy**: Define a caching strategy using Firestore's offline capabilities and RTK Query for optimal performance.

6. **Test Migration**: Thoroughly test the migration process in a staging environment before applying to production.

## Example Implementation

### Firestore Data Model

```typescript
// Example Firestore data model

// Collections
- users/{userId}
- courses/{courseId}
- subjects/{subjectId}
- modules/{moduleId}
- activities/{activityId}
- assessments/{assessmentId}
- submissions/{submissionId}
- enrollments/{enrollmentId}
- files/{fileId}
- grades/{gradeId}

// Document structure examples
// User document
{
  id: string,
  email: string,
  firstName: string,
  lastName: string,
  displayName: string,
  role: 'admin' | 'instructor' | 'student',
  status: 'active' | 'inactive',
  createdAt: timestamp,
  updatedAt: timestamp
}

// Course document
{
  id: string,
  title: string,
  code: string,
  slug: string,
  content: string,
  status: 'active' | 'inactive' | 'draft',
  featuredImage: string,
  level: string,
  price: number,
  startDate: timestamp,
  endDate: timestamp,
  createdAt: timestamp,
  updatedAt: timestamp
}

// Subject document
{
  id: string,
  title: string,
  code: string,
  slug: string,
  content: string,
  status: 'active' | 'inactive' | 'draft',
  featuredImage: string,
  courseId: string, // Reference to parent course
  credits: number,
  createdAt: timestamp,
  updatedAt: timestamp
}

// Enrollment document
{
  id: string, // userId_courseId_subjectId
  userId: string,
  courseId: string,
  subjectId: string,
  status: 'enrolled' | 'completed' | 'dropped',
  finalGrade: number,
  enrolledAt: timestamp,
  updatedAt: timestamp
}
```

### Firestore Service Implementation

```typescript
// src/services/firebaseService.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };
```

```typescript
// src/services/courseService.ts
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebaseService';
import { Course } from '../types/course';

export class CourseService {
  async getCourse(courseId: string): Promise<Course> {
    try {
      const courseRef = doc(db, 'courses', courseId);
      const courseSnap = await getDoc(courseRef);
      
      if (courseSnap.exists()) {
        return { id: courseSnap.id, ...courseSnap.data() } as Course;
      } else {
        throw new Error('Course not found');
      }
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  async getCourses(options?: { status?: string, limit?: number, orderBy?: string }): Promise<Course[]> {
    try {
      let coursesQuery = collection(db, 'courses');
      
      // Apply query options
      if (options) {
        if (options.status) {
          coursesQuery = query(coursesQuery, where('status', '==', options.status));
        }
        
        if (options.orderBy) {
          coursesQuery = query(coursesQuery, orderBy(options.orderBy));
        }
        
        if (options.limit) {
          coursesQuery = query(coursesQuery, limit(options.limit));
        }
      }
      
      const querySnapshot = await getDocs(coursesQuery);
      
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Course);
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  async createCourse(courseData: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const courseRef = collection(db, 'courses');
      
      const docRef = await addDoc(courseRef, {
        ...courseData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      return docRef.id;
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  async updateCourse(courseId: string, courseData: Partial<Course>): Promise<void> {
    try {
      const courseRef = doc(db, 'courses', courseId);
      
      await updateDoc(courseRef, {
        ...courseData,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  async deleteCourse(courseId: string): Promise<void> {
    try {
      const courseRef = doc(db, 'courses', courseId);
      await deleteDoc(courseRef);
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  private handleError(error: any): Error {
    console.error('Course service error:', error);
    return new Error(`Course operation failed: ${error.message}`);
  }
}
```

### Firestore Security Rules

```
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isAdmin() {
      return isAuthenticated() && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    function isInstructor() {
      return isAuthenticated() && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'instructor';
    }
    
    function isStudent() {
      return isAuthenticated() && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'student';
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    function isInstructorForCourse(courseId) {
      return isInstructor() && 
        exists(/databases/$(database)/documents/courses/$(courseId)/instructors/$(request.auth.uid));
    }
    
    function isEnrolledInCourse(courseId) {
      return isStudent() && 
        exists(/databases/$(database)/documents/enrollments/$(request.auth.uid + '_' + courseId + '_*'));
    }
    
    // User rules
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow create: if isAdmin();
      allow update: if isAdmin() || isOwner(userId);
      allow delete: if isAdmin();
    }
    
    // Course rules
    match /courses/{courseId} {
      allow read: if true; // Public read for course listings
      allow create: if isAdmin() || isInstructor();
      allow update: if isAdmin() || isInstructorForCourse(courseId);
      allow delete: if isAdmin();
    }
    
    // Subject rules
    match /subjects/{subjectId} {
      allow read: if true; // Public read for subject listings
      allow create, update, delete: if isAdmin() || 
        isInstructorForCourse(resource.data.courseId);
    }
    
    // Module rules
    match /modules/{moduleId} {
      allow read: if true; // Public read for module listings
      allow create, update, delete: if isAdmin() || 
        isInstructorForCourse(get(/databases/$(database)/documents/subjects/$(resource.data.subjectId)).data.courseId);
    }
    
    // Activity rules
    match /activities/{activityId} {
      allow read: if true; // Public read for activity listings
      allow create, update, delete: if isAdmin() || 
        isInstructorForCourse(get(/databases/$(database)/documents/modules/$(resource.data.moduleId)).data.subjectId).data.courseId);
    }
    
    // Enrollment rules
    match /enrollments/{enrollmentId} {
      allow read: if isAdmin() || 
        isInstructorForCourse(resource.data.courseId) || 
        isOwner(resource.data.userId);
      allow create: if isAdmin() || 
        (isStudent() && isOwner(resource.data.userId));
      allow update: if isAdmin() || 
        isInstructorForCourse(resource.data.courseId);
      allow delete: if isAdmin();
    }
    
    // Assessment rules
    match /assessments/{assessmentId} {
      allow read: if isAuthenticated();
      allow create, update, delete: if isAdmin() || 
        isInstructorForCourse(resource.data.courseId);
    }
    
    // Submission rules
    match /submissions/{submissionId} {
      allow read: if isAdmin() || 
        isInstructorForCourse(resource.data.courseId) || 
        isOwner(resource.data.userId);
      allow create: if isAuthenticated() && isOwner(request.resource.data.userId);
      allow update: if isAdmin() || 
        isInstructorForCourse(resource.data.courseId) || 
        (isOwner(resource.data.userId) && resource.data.status != 'submitted');
      allow delete: if isAdmin();
    }
    
    // File rules
    match /files/{fileId} {
      allow read: if true; // Public read for files
      allow create: if isAuthenticated();
      allow update, delete: if isAdmin() || 
        isOwner(resource.data.uploadedBy);
    }
  }
}
```

### Data Migration Script

```typescript
// scripts/migrateToFirestore.ts
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';
import { getFirestore, collection, doc, setDoc, writeBatch } from 'firebase/firestore';

const firebaseConfig = {
  // Firebase configuration
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const rtdb = getDatabase(app);
const db = getFirestore(app);

async function migrateCollection(collectionName: string) {
  console.log(`Migrating collection: ${collectionName}`);
  
  try {
    // Get data from Realtime Database
    const rtdbRef = ref(rtdb, collectionName);
    const snapshot = await get(rtdbRef);
    
    if (!snapshot.exists()) {
      console.log(`No data found for collection: ${collectionName}`);
      return;
    }
    
    const data = snapshot.val();
    const items = Object.entries(data);
    
    // Use batched writes for efficiency
    const batchSize = 500; // Firestore batch limit is 500
    let batchCount = 0;
    
    for (let i = 0; i < items.length; i += batchSize) {
      const batch = writeBatch(db);
      const chunk = items.slice(i, i + batchSize);
      
      for (const [id, item] of chunk) {
        const docRef = doc(db, collectionName, id);
        batch.set(docRef, {
          ...item,
          // Add any transformations needed
          // Convert timestamps, restructure data, etc.
        });
      }
      
      await batch.commit();
      batchCount++;
      console.log(`Committed batch ${batchCount} for ${collectionName}`);
    }
    
    console.log(`Migration completed for ${collectionName}: ${items.length} items`);
  } catch (error) {
    console.error(`Error migrating ${collectionName}:`, error);
    throw error;
  }
}

async function migrateData() {
  try {
    // Migrate collections in order of dependencies
    await migrateCollection('users');
    await migrateCollection('levels');
    await migrateCollection('courses');
    await migrateCollection('subjects');
    await migrateCollection('modules');
    await migrateCollection('activities');
    await migrateCollection('files');
    
    // Handle special cases and relationships
    await migrateEnrollments();
    
    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

async function migrateEnrollments() {
  console.log('Migrating enrollments');
  
  try {
    // Get users data from Realtime Database
    const usersRef = ref(rtdb, 'users');
    const snapshot = await get(usersRef);
    
    if (!snapshot.exists()) {
      console.log('No users found');
      return;
    }
    
    const users = snapshot.val();
    const batch = writeBatch(db);
    let enrollmentCount = 0;
    
    for (const [userId, userData] of Object.entries(users)) {
      // Check if user has courses
      if (userData.courses) {
        for (const [courseId, courseData] of Object.entries(userData.courses)) {
          for (const [subjectId, subjectData] of Object.entries(courseData)) {
            const enrollmentId = `${userId}_${courseId}_${subjectId}`;
            const enrollmentRef = doc(db, 'enrollments', enrollmentId);
            
            batch.set(enrollmentRef, {
              userId,
              courseId,
              subjectId,
              status: subjectData.status || 'enrolled',
              finalGrade: subjectData.finalGrade || null,
              enrolledAt: new Date(), // Use current date as fallback
              updatedAt: new Date()
            });
            
            enrollmentCount++;
            
            // Commit batch if approaching limit
            if (enrollmentCount % 500 === 0) {
              await batch.commit();
              console.log(`Committed ${enrollmentCount} enrollments`);
            }
          }
        }
      }
    }
    
    // Commit any remaining enrollments
    if (enrollmentCount % 500 !== 0) {
      await batch.commit();
    }
    
    console.log(`Migration completed for enrollments: ${enrollmentCount} items`);
  } catch (error) {
    console.error('Error migrating enrollments:', error);
    throw error;
  }
}

// Run the migration
migrateData();
```

## Related Decisions
- ADR 001: Frontend Framework Selection
- ADR 002: State Management Approach
- ADR 005: API Layer Design
- ADR 007: Authentication and Authorization (Upcoming)
