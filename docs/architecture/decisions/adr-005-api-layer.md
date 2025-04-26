# ADR 005: API Layer Design

## Status
Proposed

## Context
The modernization of the Hypatia LMS requires designing an API layer that will serve as the interface between the frontend components and the backend services (Firebase). The current implementation directly integrates Firebase into React components using redux-react-firebase, which tightly couples the application to Firebase and makes testing and future migrations difficult.

Key considerations include:
- Decoupling the application from Firebase
- Providing a consistent interface for data operations
- Supporting efficient data fetching and caching
- Enabling comprehensive error handling
- Facilitating testing and mocking
- Supporting future backend migrations
- Maintaining type safety with TypeScript

## Decision
We will implement a service-based API layer with RTK Query for data fetching and caching.

Specifically:
1. We will create domain-specific service classes that abstract Firebase interactions
2. We will use RTK Query for data fetching, caching, and real-time updates
3. We will implement a custom Firebase adapter for RTK Query
4. We will define TypeScript interfaces for all data models
5. We will implement comprehensive error handling in the service layer

## Rationale
This approach was selected for the following reasons:

1. **Decoupling from Firebase**: Service classes abstract Firebase-specific code, making it easier to test components and potentially migrate to different backend services in the future.

2. **Consistent Interface**: Service classes provide a consistent interface for data operations, regardless of the underlying implementation details.

3. **Efficient Data Fetching and Caching**: RTK Query provides powerful data fetching, caching, and invalidation capabilities, reducing unnecessary network requests and improving performance.

4. **Type Safety**: TypeScript interfaces ensure type safety throughout the application, reducing runtime errors and improving developer experience.

5. **Comprehensive Error Handling**: Centralizing error handling in the service layer allows for consistent error messages and recovery strategies.

6. **Testing and Mocking**: Service abstractions make it easier to mock API calls for testing purposes, improving test coverage and reliability.

7. **Real-time Updates**: RTK Query can be extended to support Firebase's real-time capabilities, maintaining this important feature while adding structure.

Alternative approaches considered:

1. **Continue with redux-react-firebase**: While this would provide continuity with the existing codebase, it would perpetuate the tight coupling to Firebase and make testing difficult.

2. **Custom Hooks Only**: Using custom hooks without RTK Query would require implementing caching and state management manually, increasing complexity.

3. **GraphQL Layer**: Adding a GraphQL layer (with Apollo or Relay) would provide powerful querying capabilities but would add significant complexity for a Firebase backend.

4. **REST API Wrapper**: Building a REST API wrapper around Firebase would add unnecessary indirection for a client-side application.

## Consequences

### Positive
- Clear separation of concerns between UI components and data access
- Improved testability through service abstractions
- Consistent error handling across the application
- Efficient data fetching and caching with RTK Query
- Type safety with TypeScript interfaces
- Easier future migration to different backend services

### Negative
- Additional code compared to direct Firebase integration
- Learning curve for developers not familiar with RTK Query
- Potential for inconsistent patterns if not properly documented and enforced
- Need to maintain Firebase-specific adapters for RTK Query

## Implementation Strategy

1. **Define Data Models**: Create TypeScript interfaces for all data entities
2. **Implement Service Classes**: Create service classes for each domain (auth, courses, users, etc.)
3. **Create RTK Query API**: Set up RTK Query with Firebase adapters
4. **Implement Error Handling**: Create consistent error handling patterns
5. **Create Custom Hooks**: Build custom hooks that leverage the services and RTK Query

## Example Implementation

### Data Models

```typescript
// src/types/course.ts
export interface Course {
  id: string;
  title: string;
  code: string;
  slug: string;
  content1?: string;
  content2?: string;
  content3?: string;
  status: 'active' | 'inactive' | 'draft';
  featuredImage?: string;
  level: string;
  price?: number;
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Subject {
  id: string;
  title: string;
  code: string;
  slug: string;
  content1?: string;
  content2?: string;
  content3?: string;
  status: 'active' | 'inactive' | 'draft';
  featuredImage?: string;
  courseId: string;
  credits: number;
  createdAt: Date;
  updatedAt: Date;
}

// Additional interfaces for other entities...
```

### Service Classes

```typescript
// src/services/courseService.ts
import { 
  getFirestore, 
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
import { Course, Subject } from '../types/course';

export class CourseService {
  private db = getFirestore();
  
  async getCourse(courseId: string): Promise<Course> {
    try {
      const courseRef = doc(this.db, 'courses', courseId);
      const courseSnap = await getDoc(courseRef);
      
      if (courseSnap.exists()) {
        return this.mapDocumentToCourse(courseSnap);
      } else {
        throw new Error('Course not found');
      }
    } catch (error) {
      throw this.handleError(error, 'Failed to get course');
    }
  }
  
  async getCourseBySlug(slug: string): Promise<Course> {
    try {
      const coursesRef = collection(this.db, 'courses');
      const q = query(coursesRef, where('slug', '==', slug), limit(1));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        return this.mapDocumentToCourse(querySnapshot.docs[0]);
      } else {
        throw new Error('Course not found');
      }
    } catch (error) {
      throw this.handleError(error, 'Failed to get course by slug');
    }
  }
  
  async getCourses(options?: { status?: string, limit?: number, orderBy?: string }): Promise<Course[]> {
    try {
      let coursesQuery = collection(this.db, 'courses');
      
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
      
      return querySnapshot.docs.map(doc => this.mapDocumentToCourse(doc));
    } catch (error) {
      throw this.handleError(error, 'Failed to get courses');
    }
  }
  
  async createCourse(courseData: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>): Promise<Course> {
    try {
      const courseRef = collection(this.db, 'courses');
      
      const docRef = await addDoc(courseRef, {
        ...courseData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      const courseSnap = await getDoc(docRef);
      return this.mapDocumentToCourse(courseSnap);
    } catch (error) {
      throw this.handleError(error, 'Failed to create course');
    }
  }
  
  async updateCourse(courseId: string, courseData: Partial<Course>): Promise<void> {
    try {
      const courseRef = doc(this.db, 'courses', courseId);
      
      await updateDoc(courseRef, {
        ...courseData,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      throw this.handleError(error, 'Failed to update course');
    }
  }
  
  async deleteCourse(courseId: string): Promise<void> {
    try {
      const courseRef = doc(this.db, 'courses', courseId);
      await deleteDoc(courseRef);
    } catch (error) {
      throw this.handleError(error, 'Failed to delete course');
    }
  }
  
  // Helper methods
  private mapDocumentToCourse(doc: any): Course {
    const data = doc.data();
    
    return {
      id: doc.id,
      title: data.title,
      code: data.code,
      slug: data.slug,
      content1: data.content1,
      content2: data.content2,
      content3: data.content3,
      status: data.status,
      featuredImage: data.featuredImage,
      level: data.level,
      price: data.price,
      startDate: data.startDate?.toDate(),
      endDate: data.endDate?.toDate(),
      createdAt: data.createdAt?.toDate(),
      updatedAt: data.updatedAt?.toDate()
    };
  }
  
  private handleError(error: any, defaultMessage: string): Error {
    console.error('Course service error:', error);
    
    // Return user-friendly error message
    return new Error(defaultMessage + (error.message ? `: ${error.message}` : ''));
  }
}
```

### RTK Query API

```typescript
// src/api/apiSlice.ts
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { CourseService } from '../services/courseService';
import { Course } from '../types/course';

// Create service instances
const courseService = new CourseService();

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Course', 'Subject', 'Module', 'Activity', 'User'],
  endpoints: (builder) => ({
    getCourse: builder.query<Course, string>({
      queryFn: async (courseId) => {
        try {
          const course = await courseService.getCourse(courseId);
          return { data: course };
        } catch (error) {
          return { error: { status: 'CUSTOM_ERROR', data: error.message } };
        }
      },
      providesTags: (result, error, courseId) => [{ type: 'Course', id: courseId }],
    }),
    
    getCourseBySlug: builder.query<Course, string>({
      queryFn: async (slug) => {
        try {
          const course = await courseService.getCourseBySlug(slug);
          return { data: course };
        } catch (error) {
          return { error: { status: 'CUSTOM_ERROR', data: error.message } };
        }
      },
      providesTags: (result) => result ? [{ type: 'Course', id: result.id }] : [],
    }),
    
    getCourses: builder.query<Course[], { status?: string, limit?: number, orderBy?: string }>({
      queryFn: async (options) => {
        try {
          const courses = await courseService.getCourses(options);
          return { data: courses };
        } catch (error) {
          return { error: { status: 'CUSTOM_ERROR', data: error.message } };
        }
      },
      providesTags: (result) => 
        result
          ? [
              ...result.map(course => ({ type: 'Course' as const, id: course.id })),
              { type: 'Course', id: 'LIST' },
            ]
          : [{ type: 'Course', id: 'LIST' }],
    }),
    
    createCourse: builder.mutation<Course, Omit<Course, 'id' | 'createdAt' | 'updatedAt'>>({
      queryFn: async (courseData) => {
        try {
          const course = await courseService.createCourse(courseData);
          return { data: course };
        } catch (error) {
          return { error: { status: 'CUSTOM_ERROR', data: error.message } };
        }
      },
      invalidatesTags: [{ type: 'Course', id: 'LIST' }],
    }),
    
    updateCourse: builder.mutation<void, { courseId: string, courseData: Partial<Course> }>({
      queryFn: async ({ courseId, courseData }) => {
        try {
          await courseService.updateCourse(courseId, courseData);
          return { data: undefined };
        } catch (error) {
          return { error: { status: 'CUSTOM_ERROR', data: error.message } };
        }
      },
      invalidatesTags: (result, error, { courseId }) => [
        { type: 'Course', id: courseId },
        { type: 'Course', id: 'LIST' }
      ],
    }),
    
    deleteCourse: builder.mutation<void, string>({
      queryFn: async (courseId) => {
        try {
          await courseService.deleteCourse(courseId);
          return { data: undefined };
        } catch (error) {
          return { error: { status: 'CUSTOM_ERROR', data: error.message } };
        }
      },
      invalidatesTags: (result, error, courseId) => [
        { type: 'Course', id: courseId },
        { type: 'Course', id: 'LIST' }
      ],
    }),
    
    // Additional endpoints for other entities...
  }),
});

export const {
  useGetCourseQuery,
  useGetCourseBySlugQuery,
  useGetCoursesQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = apiSlice;
```

### Custom Hooks

```typescript
// src/hooks/useCourses.ts
import { useState, useCallback } from 'react';
import { 
  useGetCoursesQuery, 
  useCreateCourseMutation, 
  useUpdateCourseMutation, 
  useDeleteCourseMutation 
} from '../api/apiSlice';
import { Course } from '../types/course';

export const useCourses = (options?: { status?: string, limit?: number, orderBy?: string }) => {
  const [filter, setFilter] = useState(options || {});
  
  const {
    data: courses,
    isLoading,
    isError,
    error,
    refetch
  } = useGetCoursesQuery(filter);
  
  const [createCourse, { isLoading: isCreating }] = useCreateCourseMutation();
  const [updateCourse, { isLoading: isUpdating }] = useUpdateCourseMutation();
  const [deleteCourse, { isLoading: isDeleting }] = useDeleteCourseMutation();
  
  const handleCreateCourse = useCallback(async (courseData: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const result = await createCourse(courseData).unwrap();
      return result;
    } catch (error) {
      throw error;
    }
  }, [createCourse]);
  
  const handleUpdateCourse = useCallback(async (courseId: string, courseData: Partial<Course>) => {
    try {
      await updateCourse({ courseId, courseData }).unwrap();
    } catch (error) {
      throw error;
    }
  }, [updateCourse]);
  
  const handleDeleteCourse = useCallback(async (courseId: string) => {
    try {
      await deleteCourse(courseId).unwrap();
    } catch (error) {
      throw error;
    }
  }, [deleteCourse]);
  
  const updateFilter = useCallback((newFilter: typeof filter) => {
    setFilter(prev => ({ ...prev, ...newFilter }));
  }, []);
  
  return {
    courses,
    isLoading: isLoading || isCreating || isUpdating || isDeleting,
    isError,
    error,
    filter,
    updateFilter,
    createCourse: handleCreateCourse,
    updateCourse: handleUpdateCourse,
    deleteCourse: handleDeleteCourse,
    refetch
  };
};
```

### Usage in Components

```typescript
// src/components/CourseList.tsx
import React, { useState } from 'react';
import { useCourses } from '../hooks/useCourses';
import { CourseCard } from './CourseCard';
import { Button, TextField, CircularProgress, Alert, Grid, Box } from '@mui/material';

export const CourseList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { 
    courses, 
    isLoading, 
    isError, 
    error, 
    filter, 
    updateFilter 
  } = useCourses({ status: 'active', orderBy: 'title' });
  
  const handleSearch = () => {
    // In a real implementation, you would use a proper search endpoint
    // This is just for demonstration
    updateFilter({ ...filter, searchTerm });
  };
  
  if (isLoading) {
    return <CircularProgress />;
  }
  
  if (isError) {
    return <Alert severity="error">{error?.data || 'Failed to load courses'}</Alert>;
  }
  
  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <TextField
          label="Search Courses"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          variant="outlined"
          size="small"
        />
        <Button variant="contained" onClick={handleSearch}>Search</Button>
      </Box>
      
      <Grid container spacing={3}>
        {courses?.map(course => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <CourseCard course={course} />
          </Grid>
        ))}
        
        {courses?.length === 0 && (
          <Grid item xs={12}>
            <Alert severity="info">No courses found</Alert>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
```

## Related Decisions
- ADR 001: Frontend Framework Selection
- ADR 002: State Management Approach
- ADR 004: Build System Selection
- ADR 006: Data Storage Strategy (Upcoming)
