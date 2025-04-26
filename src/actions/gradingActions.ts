/**
 * Grading Actions
 * 
 * Redux actions for grading management.
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
  updateDoc,
  serverTimestamp
} from 'firebase/firestore';
import { Submission, Grade } from '../types/course';

// Action Types
export const FETCH_PENDING_SUBMISSIONS_REQUEST = 'FETCH_PENDING_SUBMISSIONS_REQUEST';
export const FETCH_PENDING_SUBMISSIONS_SUCCESS = 'FETCH_PENDING_SUBMISSIONS_SUCCESS';
export const FETCH_PENDING_SUBMISSIONS_FAILURE = 'FETCH_PENDING_SUBMISSIONS_FAILURE';
export const FETCH_SUBMISSION_REQUEST = 'FETCH_SUBMISSION_REQUEST';
export const FETCH_SUBMISSION_SUCCESS = 'FETCH_SUBMISSION_SUCCESS';
export const FETCH_SUBMISSION_FAILURE = 'FETCH_SUBMISSION_FAILURE';
export const GRADE_SUBMISSION_REQUEST = 'GRADE_SUBMISSION_REQUEST';
export const GRADE_SUBMISSION_SUCCESS = 'GRADE_SUBMISSION_SUCCESS';
export const GRADE_SUBMISSION_FAILURE = 'GRADE_SUBMISSION_FAILURE';

// Action Interfaces
interface FetchPendingSubmissionsRequestAction {
  type: typeof FETCH_PENDING_SUBMISSIONS_REQUEST;
}

interface FetchPendingSubmissionsSuccessAction {
  type: typeof FETCH_PENDING_SUBMISSIONS_SUCCESS;
  payload: Submission[];
}

interface FetchPendingSubmissionsFailureAction {
  type: typeof FETCH_PENDING_SUBMISSIONS_FAILURE;
  payload: string;
}

interface FetchSubmissionRequestAction {
  type: typeof FETCH_SUBMISSION_REQUEST;
}

interface FetchSubmissionSuccessAction {
  type: typeof FETCH_SUBMISSION_SUCCESS;
  payload: Submission;
}

interface FetchSubmissionFailureAction {
  type: typeof FETCH_SUBMISSION_FAILURE;
  payload: string;
}

interface GradeSubmissionRequestAction {
  type: typeof GRADE_SUBMISSION_REQUEST;
}

interface GradeSubmissionSuccessAction {
  type: typeof GRADE_SUBMISSION_SUCCESS;
  payload: Submission;
}

interface GradeSubmissionFailureAction {
  type: typeof GRADE_SUBMISSION_FAILURE;
  payload: string;
}

export type GradingActionTypes = 
  | FetchPendingSubmissionsRequestAction
  | FetchPendingSubmissionsSuccessAction
  | FetchPendingSubmissionsFailureAction
  | FetchSubmissionRequestAction
  | FetchSubmissionSuccessAction
  | FetchSubmissionFailureAction
  | GradeSubmissionRequestAction
  | GradeSubmissionSuccessAction
  | GradeSubmissionFailureAction;

// Action Creators
/**
 * Fetch pending submissions request action
 * @returns Action object
 */
export const fetchPendingSubmissionsRequest = (): FetchPendingSubmissionsRequestAction => ({
  type: FETCH_PENDING_SUBMISSIONS_REQUEST
});

/**
 * Fetch pending submissions success action
 * @param submissions Submissions array
 * @returns Action object
 */
export const fetchPendingSubmissionsSuccess = (submissions: Submission[]): FetchPendingSubmissionsSuccessAction => ({
  type: FETCH_PENDING_SUBMISSIONS_SUCCESS,
  payload: submissions
});

/**
 * Fetch pending submissions failure action
 * @param error Error message
 * @returns Action object
 */
export const fetchPendingSubmissionsFailure = (error: string): FetchPendingSubmissionsFailureAction => ({
  type: FETCH_PENDING_SUBMISSIONS_FAILURE,
  payload: error
});

/**
 * Fetch submission request action
 * @returns Action object
 */
export const fetchSubmissionRequest = (): FetchSubmissionRequestAction => ({
  type: FETCH_SUBMISSION_REQUEST
});

/**
 * Fetch submission success action
 * @param submission Submission object
 * @returns Action object
 */
export const fetchSubmissionSuccess = (submission: Submission): FetchSubmissionSuccessAction => ({
  type: FETCH_SUBMISSION_SUCCESS,
  payload: submission
});

/**
 * Fetch submission failure action
 * @param error Error message
 * @returns Action object
 */
export const fetchSubmissionFailure = (error: string): FetchSubmissionFailureAction => ({
  type: FETCH_SUBMISSION_FAILURE,
  payload: error
});

/**
 * Grade submission request action
 * @returns Action object
 */
export const gradeSubmissionRequest = (): GradeSubmissionRequestAction => ({
  type: GRADE_SUBMISSION_REQUEST
});

/**
 * Grade submission success action
 * @param submission Submission object
 * @returns Action object
 */
export const gradeSubmissionSuccess = (submission: Submission): GradeSubmissionSuccessAction => ({
  type: GRADE_SUBMISSION_SUCCESS,
  payload: submission
});

/**
 * Grade submission failure action
 * @param error Error message
 * @returns Action object
 */
export const gradeSubmissionFailure = (error: string): GradeSubmissionFailureAction => ({
  type: GRADE_SUBMISSION_FAILURE,
  payload: error
});

// Thunk Actions
/**
 * Fetch pending submissions
 * @param courseId Course ID
 * @param filters Filters object
 * @returns Thunk action
 */
export const fetchPendingSubmissions = (
  courseId: string,
  filters: {
    moduleId?: string;
    activityType?: string;
    status?: string;
    search?: string;
  } = {}
) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchPendingSubmissionsRequest());
    
    try {
      const db = getFirestore();
      
      // Build query
      let submissionsQuery = query(
        collection(db, 'submissions'),
        where('courseId', '==', courseId)
      );
      
      // Apply filters
      if (filters.moduleId) {
        submissionsQuery = query(
          submissionsQuery,
          where('moduleId', '==', filters.moduleId)
        );
      }
      
      if (filters.status && filters.status !== 'all') {
        submissionsQuery = query(
          submissionsQuery,
          where('status', '==', filters.status)
        );
      }
      
      // Get submissions
      const submissionsSnapshot = await getDocs(submissionsQuery);
      
      // Process submissions
      const submissions: Submission[] = [];
      
      for (const submissionDoc of submissionsSnapshot.docs) {
        const submissionData = submissionDoc.data();
        
        // Get activity data
        const activityDocRef = doc(db, 'activities', submissionData.activityId);
        const activityDoc = await getDoc(activityDocRef);
        
        if (!activityDoc.exists()) {
          continue;
        }
        
        const activityData = activityDoc.data();
        
        // Apply activity type filter
        if (filters.activityType && activityData.type !== filters.activityType) {
          continue;
        }
        
        // Get module data
        const moduleDocRef = doc(db, 'modules', activityData.moduleId);
        const moduleDoc = await getDoc(moduleDocRef);
        
        if (!moduleDoc.exists()) {
          continue;
        }
        
        const moduleData = moduleDoc.data();
        
        // Get student data
        const userDocRef = doc(db, 'users', submissionData.userId);
        const userDoc = await getDoc(userDocRef);
        
        if (!userDoc.exists()) {
          continue;
        }
        
        const userData = userDoc.data();
        
        // Apply search filter
        if (filters.search) {
          const searchTerm = filters.search.toLowerCase();
          const studentName = (userData.displayName || '').toLowerCase();
          const activityTitle = (activityData.title || '').toLowerCase();
          
          if (!studentName.includes(searchTerm) && !activityTitle.includes(searchTerm)) {
            continue;
          }
        }
        
        // Create submission object
        const submission: Submission = {
          id: submissionDoc.id,
          activityId: submissionData.activityId,
          userId: submissionData.userId,
          content: submissionData.content,
          attachments: submissionData.attachments || [],
          submittedAt: submissionData.submittedAt,
          grade: submissionData.grade,
          status: submissionData.status,
          activity: {
            id: activityDoc.id,
            title: activityData.title,
            type: activityData.type,
            points: activityData.points
          },
          module: {
            id: moduleDoc.id,
            title: moduleData.title
          },
          student: {
            id: userDoc.id,
            name: userData.displayName || 'Unknown User',
            email: userData.email || 'No email',
            avatar: userData.photoURL
          }
        };
        
        submissions.push(submission);
      }
      
      // Sort submissions by date (newest first)
      submissions.sort((a, b) => 
        new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      );
      
      dispatch(fetchPendingSubmissionsSuccess(submissions));
    } catch (error: any) {
      dispatch(fetchPendingSubmissionsFailure(error.message || 'Failed to fetch submissions'));
    }
  };
};

/**
 * Fetch submission
 * @param submissionId Submission ID
 * @param courseId Course ID
 * @returns Thunk action
 */
export const fetchSubmission = (
  submissionId: string,
  courseId: string
) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchSubmissionRequest());
    
    try {
      const db = getFirestore();
      
      // Get submission
      const submissionDocRef = doc(db, 'submissions', submissionId);
      const submissionDoc = await getDoc(submissionDocRef);
      
      if (!submissionDoc.exists()) {
        throw new Error('Submission not found');
      }
      
      const submissionData = submissionDoc.data();
      
      // Get activity data
      const activityDocRef = doc(db, 'activities', submissionData.activityId);
      const activityDoc = await getDoc(activityDocRef);
      
      if (!activityDoc.exists()) {
        throw new Error('Activity not found');
      }
      
      const activityData = activityDoc.data();
      
      // Get module data
      const moduleDocRef = doc(db, 'modules', activityData.moduleId);
      const moduleDoc = await getDoc(moduleDocRef);
      
      if (!moduleDoc.exists()) {
        throw new Error('Module not found');
      }
      
      const moduleData = moduleDoc.data();
      
      // Get course data
      const courseDocRef = doc(db, 'courses', courseId);
      const courseDoc = await getDoc(courseDocRef);
      
      if (!courseDoc.exists()) {
        throw new Error('Course not found');
      }
      
      const courseData = courseDoc.data();
      
      // Get student data
      const userDocRef = doc(db, 'users', submissionData.userId);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        throw new Error('Student not found');
      }
      
      const userData = userDoc.data();
      
      // Create submission object
      const submission: Submission = {
        id: submissionDoc.id,
        activityId: submissionData.activityId,
        userId: submissionData.userId,
        content: submissionData.content,
        attachments: submissionData.attachments || [],
        submittedAt: submissionData.submittedAt,
        grade: submissionData.grade,
        status: submissionData.status,
        activity: {
          id: activityDoc.id,
          title: activityData.title,
          description: activityData.description,
          type: activityData.type,
          content: activityData.content,
          points: activityData.points
        },
        module: {
          id: moduleDoc.id,
          title: moduleData.title
        },
        course: {
          id: courseDoc.id,
          title: courseData.title
        },
        student: {
          id: userDoc.id,
          name: userData.displayName || 'Unknown User',
          email: userData.email || 'No email',
          avatar: userData.photoURL
        }
      };
      
      dispatch(fetchSubmissionSuccess(submission));
    } catch (error: any) {
      dispatch(fetchSubmissionFailure(error.message || 'Failed to fetch submission'));
    }
  };
};

/**
 * Grade submission
 * @param submissionId Submission ID
 * @param courseId Course ID
 * @param grade Grade object
 * @param status Submission status
 * @returns Thunk action
 */
export const gradeSubmission = (
  submissionId: string,
  courseId: string,
  grade: Grade,
  status: string
) => {
  return async (dispatch: Dispatch) => {
    dispatch(gradeSubmissionRequest());
    
    try {
      const db = getFirestore();
      
      // Update submission
      const submissionDocRef = doc(db, 'submissions', submissionId);
      await updateDoc(submissionDocRef, {
        grade,
        status,
        updatedAt: serverTimestamp()
      });
      
      // Get updated submission
      const updatedSubmission = await fetchSubmission(submissionId, courseId)(dispatch as any) as any;
      
      dispatch(gradeSubmissionSuccess(updatedSubmission));
      
      return updatedSubmission;
    } catch (error: any) {
      dispatch(gradeSubmissionFailure(error.message || 'Failed to grade submission'));
      throw error;
    }
  };
};
