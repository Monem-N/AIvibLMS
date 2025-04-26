/**
 * Course Actions
 *
 * Redux actions for course management.
 */

import { Dispatch } from 'redux';
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  serverTimestamp
} from 'firebase/firestore';
import { Course } from '../types/course';

// Action Types
export const FETCH_COURSES_REQUEST = 'FETCH_COURSES_REQUEST';
export const FETCH_COURSES_SUCCESS = 'FETCH_COURSES_SUCCESS';
export const FETCH_COURSES_FAILURE = 'FETCH_COURSES_FAILURE';
export const FETCH_COURSE_REQUEST = 'FETCH_COURSE_REQUEST';
export const FETCH_COURSE_SUCCESS = 'FETCH_COURSE_SUCCESS';
export const FETCH_COURSE_FAILURE = 'FETCH_COURSE_FAILURE';
export const FETCH_PARTICIPANTS_REQUEST = 'FETCH_PARTICIPANTS_REQUEST';
export const FETCH_PARTICIPANTS_SUCCESS = 'FETCH_PARTICIPANTS_SUCCESS';
export const FETCH_PARTICIPANTS_FAILURE = 'FETCH_PARTICIPANTS_FAILURE';
export const CREATE_COURSE_REQUEST = 'CREATE_COURSE_REQUEST';
export const CREATE_COURSE_SUCCESS = 'CREATE_COURSE_SUCCESS';
export const CREATE_COURSE_FAILURE = 'CREATE_COURSE_FAILURE';
export const UPDATE_COURSE_REQUEST = 'UPDATE_COURSE_REQUEST';
export const UPDATE_COURSE_SUCCESS = 'UPDATE_COURSE_SUCCESS';
export const UPDATE_COURSE_FAILURE = 'UPDATE_COURSE_FAILURE';

// Action Interfaces
interface FetchCoursesRequestAction {
  type: typeof FETCH_COURSES_REQUEST;
}

interface FetchCoursesSuccessAction {
  type: typeof FETCH_COURSES_SUCCESS;
  payload: Course[];
}

interface FetchCoursesFailureAction {
  type: typeof FETCH_COURSES_FAILURE;
  payload: string;
}

interface FetchCourseRequestAction {
  type: typeof FETCH_COURSE_REQUEST;
}

interface FetchCourseSuccessAction {
  type: typeof FETCH_COURSE_SUCCESS;
  payload: Course;
}

interface FetchCourseFailureAction {
  type: typeof FETCH_COURSE_FAILURE;
  payload: string;
}

interface FetchParticipantsRequestAction {
  type: typeof FETCH_PARTICIPANTS_REQUEST;
}

interface FetchParticipantsSuccessAction {
  type: typeof FETCH_PARTICIPANTS_SUCCESS;
  payload: any[];
}

interface FetchParticipantsFailureAction {
  type: typeof FETCH_PARTICIPANTS_FAILURE;
  payload: string;
}

interface CreateCourseRequestAction {
  type: typeof CREATE_COURSE_REQUEST;
}

interface CreateCourseSuccessAction {
  type: typeof CREATE_COURSE_SUCCESS;
  payload: Course;
}

interface CreateCourseFailureAction {
  type: typeof CREATE_COURSE_FAILURE;
  payload: string;
}

interface UpdateCourseRequestAction {
  type: typeof UPDATE_COURSE_REQUEST;
}

interface UpdateCourseSuccessAction {
  type: typeof UPDATE_COURSE_SUCCESS;
  payload: Course;
}

interface UpdateCourseFailureAction {
  type: typeof UPDATE_COURSE_FAILURE;
  payload: string;
}

export type CourseActionTypes =
  | FetchCoursesRequestAction
  | FetchCoursesSuccessAction
  | FetchCoursesFailureAction
  | FetchCourseRequestAction
  | FetchCourseSuccessAction
  | FetchCourseFailureAction
  | FetchParticipantsRequestAction
  | FetchParticipantsSuccessAction
  | FetchParticipantsFailureAction
  | CreateCourseRequestAction
  | CreateCourseSuccessAction
  | CreateCourseFailureAction
  | UpdateCourseRequestAction
  | UpdateCourseSuccessAction
  | UpdateCourseFailureAction;

// Action Creators
/**
 * Fetch courses request action
 * @returns Action object
 */
export const fetchCoursesRequest = (): FetchCoursesRequestAction => ({
  type: FETCH_COURSES_REQUEST
});

/**
 * Fetch courses success action
 * @param courses Courses array
 * @returns Action object
 */
export const fetchCoursesSuccess = (courses: Course[]): FetchCoursesSuccessAction => ({
  type: FETCH_COURSES_SUCCESS,
  payload: courses
});

/**
 * Fetch courses failure action
 * @param error Error message
 * @returns Action object
 */
export const fetchCoursesFailure = (error: string): FetchCoursesFailureAction => ({
  type: FETCH_COURSES_FAILURE,
  payload: error
});

/**
 * Fetch course request action
 * @returns Action object
 */
export const fetchCourseRequest = (): FetchCourseRequestAction => ({
  type: FETCH_COURSE_REQUEST
});

/**
 * Fetch course success action
 * @param course Course object
 * @returns Action object
 */
export const fetchCourseSuccess = (course: Course): FetchCourseSuccessAction => ({
  type: FETCH_COURSE_SUCCESS,
  payload: course
});

/**
 * Fetch course failure action
 * @param error Error message
 * @returns Action object
 */
export const fetchCourseFailure = (error: string): FetchCourseFailureAction => ({
  type: FETCH_COURSE_FAILURE,
  payload: error
});

/**
 * Fetch participants request action
 * @returns Action object
 */
export const fetchParticipantsRequest = (): FetchParticipantsRequestAction => ({
  type: FETCH_PARTICIPANTS_REQUEST
});

/**
 * Fetch participants success action
 * @param participants Participants array
 * @returns Action object
 */
export const fetchParticipantsSuccess = (participants: any[]): FetchParticipantsSuccessAction => ({
  type: FETCH_PARTICIPANTS_SUCCESS,
  payload: participants
});

/**
 * Fetch participants failure action
 * @param error Error message
 * @returns Action object
 */
export const fetchParticipantsFailure = (error: string): FetchParticipantsFailureAction => ({
  type: FETCH_PARTICIPANTS_FAILURE,
  payload: error
});

/**
 * Create course request action
 * @returns Action object
 */
export const createCourseRequest = (): CreateCourseRequestAction => ({
  type: CREATE_COURSE_REQUEST
});

/**
 * Create course success action
 * @param course Course object
 * @returns Action object
 */
export const createCourseSuccess = (course: Course): CreateCourseSuccessAction => ({
  type: CREATE_COURSE_SUCCESS,
  payload: course
});

/**
 * Create course failure action
 * @param error Error message
 * @returns Action object
 */
export const createCourseFailure = (error: string): CreateCourseFailureAction => ({
  type: CREATE_COURSE_FAILURE,
  payload: error
});

/**
 * Update course request action
 * @returns Action object
 */
export const updateCourseRequest = (): UpdateCourseRequestAction => ({
  type: UPDATE_COURSE_REQUEST
});

/**
 * Update course success action
 * @param course Course object
 * @returns Action object
 */
export const updateCourseSuccess = (course: Course): UpdateCourseSuccessAction => ({
  type: UPDATE_COURSE_SUCCESS,
  payload: course
});

/**
 * Update course failure action
 * @param error Error message
 * @returns Action object
 */
export const updateCourseFailure = (error: string): UpdateCourseFailureAction => ({
  type: UPDATE_COURSE_FAILURE,
  payload: error
});

// Thunk Actions
/**
 * Fetch courses
 * @param userId User ID
 * @returns Thunk action
 */
export const fetchCourses = (userId: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchCoursesRequest());

    try {
      const db = getFirestore();

      // Get user enrollments
      const enrollmentsQuery = query(
        collection(db, 'enrollments'),
        where('userId', '==', userId)
      );
      const enrollmentsSnapshot = await getDocs(enrollmentsQuery);

      const courseIds = enrollmentsSnapshot.docs.map(doc => doc.data().courseId);
      const courses: Course[] = [];

      // Get course details
      for (const courseId of courseIds) {
        const courseDocRef = doc(db, 'courses', courseId);
        const courseDoc = await getDoc(courseDocRef);

        if (courseDoc.exists()) {
          courses.push({
            id: courseDoc.id,
            ...courseDoc.data()
          } as Course);
        }
      }

      dispatch(fetchCoursesSuccess(courses));
    } catch (error: any) {
      dispatch(fetchCoursesFailure(error.message || 'Failed to fetch courses'));
    }
  };
};

/**
 * Fetch course
 * @param courseId Course ID
 * @returns Thunk action
 */
export const fetchCourse = (courseId: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchCourseRequest());

    try {
      const db = getFirestore();
      const courseDocRef = doc(db, 'courses', courseId);
      const courseDoc = await getDoc(courseDocRef);

      if (!courseDoc.exists()) {
        throw new Error('Course not found');
      }

      const courseData = {
        id: courseDoc.id,
        ...courseDoc.data()
      } as Course;

      // Get course modules
      const modulesQuery = query(
        collection(db, 'modules'),
        where('courseId', '==', courseId)
      );
      const modulesSnapshot = await getDocs(modulesQuery);

      const modules = modulesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Get module activities
      for (const module of modules) {
        const activitiesQuery = query(
          collection(db, 'activities'),
          where('moduleId', '==', module.id)
        );
        const activitiesSnapshot = await getDocs(activitiesQuery);

        module.activities = activitiesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
      }

      // Get course resources
      const resourcesQuery = query(
        collection(db, 'resources'),
        where('courseId', '==', courseId)
      );
      const resourcesSnapshot = await getDocs(resourcesQuery);

      const resources = resourcesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Get course announcements
      const announcementsQuery = query(
        collection(db, 'announcements'),
        where('courseId', '==', courseId)
      );
      const announcementsSnapshot = await getDocs(announcementsQuery);

      const announcements = announcementsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Combine all data
      const course = {
        ...courseData,
        modules,
        resources,
        announcements
      };

      dispatch(fetchCourseSuccess(course));
    } catch (error: any) {
      dispatch(fetchCourseFailure(error.message || 'Failed to fetch course'));
    }
  };
};

/**
 * Fetch participants
 * @param courseId Course ID
 * @returns Thunk action
 */
export const fetchParticipants = (courseId: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchParticipantsRequest());

    try {
      const db = getFirestore();

      // Get course enrollments
      const enrollmentsQuery = query(
        collection(db, 'enrollments'),
        where('courseId', '==', courseId)
      );
      const enrollmentsSnapshot = await getDocs(enrollmentsQuery);

      const participants: any[] = [];

      // Get user details for each enrollment
      for (const enrollmentDoc of enrollmentsSnapshot.docs) {
        const enrollment = enrollmentDoc.data();
        const userDocRef = doc(db, 'users', enrollment.userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();

          participants.push({
            id: userDoc.id,
            name: userData.info?.displayName || userData.displayName || 'Unknown User',
            email: userData.email || 'No email',
            avatar: userData.photoURL,
            role: enrollment.role || 'student',
            lastActive: userData.lastActive,
            progress: enrollment.progress
          });
        }
      }

      dispatch(fetchParticipantsSuccess(participants));
    } catch (error: any) {
      dispatch(fetchParticipantsFailure(error.message || 'Failed to fetch participants'));
    }
  };
};

/**
 * Create course
 * @param courseData Course data
 * @returns Thunk action
 */
export const createCourse = (courseData: Partial<Course>) => {
  return async (dispatch: Dispatch) => {
    dispatch(createCourseRequest());

    try {
      const db = getFirestore();

      // Add course to Firestore
      const courseRef = await addDoc(collection(db, 'courses'), {
        ...courseData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      // Get the created course
      const courseDoc = await getDoc(courseRef);

      if (!courseDoc.exists()) {
        throw new Error('Failed to create course');
      }

      const createdCourse = {
        id: courseDoc.id,
        ...courseDoc.data()
      } as Course;

      // Create modules if any
      if (courseData.modules && courseData.modules.length > 0) {
        for (const module of courseData.modules) {
          // Add module to Firestore
          const moduleRef = await addDoc(collection(db, 'modules'), {
            ...module,
            courseId: courseDoc.id,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          });

          // Create activities if any
          if (module.activities && module.activities.length > 0) {
            for (const activity of module.activities) {
              // Add activity to Firestore
              await addDoc(collection(db, 'activities'), {
                ...activity,
                moduleId: moduleRef.id,
                courseId: courseDoc.id,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
              });
            }
          }
        }
      }

      // Create resources if any
      if (courseData.resources && courseData.resources.length > 0) {
        for (const resource of courseData.resources) {
          // Add resource to Firestore
          await addDoc(collection(db, 'resources'), {
            ...resource,
            courseId: courseDoc.id,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          });
        }
      }

      dispatch(createCourseSuccess(createdCourse));

      return createdCourse;
    } catch (error: any) {
      dispatch(createCourseFailure(error.message || 'Failed to create course'));
      throw error;
    }
  };
};

/**
 * Update course
 * @param courseId Course ID
 * @param courseData Course data
 * @returns Thunk action
 */
export const updateCourse = (courseId: string, courseData: Partial<Course>) => {
  return async (dispatch: Dispatch) => {
    dispatch(updateCourseRequest());

    try {
      const db = getFirestore();

      // Update course in Firestore
      const courseRef = doc(db, 'courses', courseId);
      await updateDoc(courseRef, {
        ...courseData,
        updatedAt: serverTimestamp()
      });

      // Get the updated course
      const courseDoc = await getDoc(courseRef);

      if (!courseDoc.exists()) {
        throw new Error('Course not found');
      }

      const updatedCourse = {
        id: courseDoc.id,
        ...courseDoc.data()
      } as Course;

      // Update modules if any
      if (courseData.modules) {
        // Get existing modules
        const modulesQuery = query(
          collection(db, 'modules'),
          where('courseId', '==', courseId)
        );
        const modulesSnapshot = await getDocs(modulesQuery);

        // Create a map of existing modules
        const existingModules = new Map();
        modulesSnapshot.docs.forEach(doc => {
          existingModules.set(doc.id, doc.data());
        });

        // Update or create modules
        for (const module of courseData.modules) {
          if (module.id && module.id.startsWith('temp-')) {
            // Create new module
            const moduleRef = await addDoc(collection(db, 'modules'), {
              ...module,
              id: undefined, // Remove temp ID
              courseId,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            });

            // Create activities if any
            if (module.activities && module.activities.length > 0) {
              for (const activity of module.activities) {
                // Add activity to Firestore
                await addDoc(collection(db, 'activities'), {
                  ...activity,
                  id: undefined, // Remove temp ID
                  moduleId: moduleRef.id,
                  courseId,
                  createdAt: serverTimestamp(),
                  updatedAt: serverTimestamp()
                });
              }
            }
          } else if (module.id) {
            // Update existing module
            const moduleRef = doc(db, 'modules', module.id);
            await updateDoc(moduleRef, {
              ...module,
              updatedAt: serverTimestamp()
            });

            // Remove from map to track deleted modules
            existingModules.delete(module.id);

            // Update or create activities if any
            if (module.activities && module.activities.length > 0) {
              // Get existing activities
              const activitiesQuery = query(
                collection(db, 'activities'),
                where('moduleId', '==', module.id)
              );
              const activitiesSnapshot = await getDocs(activitiesQuery);

              // Create a map of existing activities
              const existingActivities = new Map();
              activitiesSnapshot.docs.forEach(doc => {
                existingActivities.set(doc.id, doc.data());
              });

              // Update or create activities
              for (const activity of module.activities) {
                if (activity.id && activity.id.startsWith('temp-')) {
                  // Create new activity
                  await addDoc(collection(db, 'activities'), {
                    ...activity,
                    id: undefined, // Remove temp ID
                    moduleId: module.id,
                    courseId,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp()
                  });
                } else if (activity.id) {
                  // Update existing activity
                  const activityRef = doc(db, 'activities', activity.id);
                  await updateDoc(activityRef, {
                    ...activity,
                    updatedAt: serverTimestamp()
                  });

                  // Remove from map to track deleted activities
                  existingActivities.delete(activity.id);
                }
              }

              // TODO: Handle deleted activities if needed
            }
          }
        }

        // TODO: Handle deleted modules if needed
      }

      // Update resources if any
      if (courseData.resources) {
        // Get existing resources
        const resourcesQuery = query(
          collection(db, 'resources'),
          where('courseId', '==', courseId)
        );
        const resourcesSnapshot = await getDocs(resourcesQuery);

        // Create a map of existing resources
        const existingResources = new Map();
        resourcesSnapshot.docs.forEach(doc => {
          existingResources.set(doc.id, doc.data());
        });

        // Update or create resources
        for (const resource of courseData.resources) {
          if (resource.id && resource.id.startsWith('temp-')) {
            // Create new resource
            await addDoc(collection(db, 'resources'), {
              ...resource,
              id: undefined, // Remove temp ID
              courseId,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            });
          } else if (resource.id) {
            // Update existing resource
            const resourceRef = doc(db, 'resources', resource.id);
            await updateDoc(resourceRef, {
              ...resource,
              updatedAt: serverTimestamp()
            });

            // Remove from map to track deleted resources
            existingResources.delete(resource.id);
          }
        }

        // TODO: Handle deleted resources if needed
      }

      dispatch(updateCourseSuccess(updatedCourse));

      return updatedCourse;
    } catch (error: any) {
      dispatch(updateCourseFailure(error.message || 'Failed to update course'));
      throw error;
    }
  };
};
