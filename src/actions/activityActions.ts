/**
 * Activity Actions
 * 
 * Redux actions for activity management.
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
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from 'firebase/storage';
import { Activity, Submission } from '../types/course';

// Action Types
export const FETCH_ACTIVITY_REQUEST = 'FETCH_ACTIVITY_REQUEST';
export const FETCH_ACTIVITY_SUCCESS = 'FETCH_ACTIVITY_SUCCESS';
export const FETCH_ACTIVITY_FAILURE = 'FETCH_ACTIVITY_FAILURE';
export const FETCH_MODULE_ACTIVITIES_REQUEST = 'FETCH_MODULE_ACTIVITIES_REQUEST';
export const FETCH_MODULE_ACTIVITIES_SUCCESS = 'FETCH_MODULE_ACTIVITIES_SUCCESS';
export const FETCH_MODULE_ACTIVITIES_FAILURE = 'FETCH_MODULE_ACTIVITIES_FAILURE';
export const SUBMIT_ACTIVITY_REQUEST = 'SUBMIT_ACTIVITY_REQUEST';
export const SUBMIT_ACTIVITY_SUCCESS = 'SUBMIT_ACTIVITY_SUCCESS';
export const SUBMIT_ACTIVITY_FAILURE = 'SUBMIT_ACTIVITY_FAILURE';

// Action Interfaces
interface FetchActivityRequestAction {
  type: typeof FETCH_ACTIVITY_REQUEST;
}

interface FetchActivitySuccessAction {
  type: typeof FETCH_ACTIVITY_SUCCESS;
  payload: Activity;
}

interface FetchActivityFailureAction {
  type: typeof FETCH_ACTIVITY_FAILURE;
  payload: string;
}

interface FetchModuleActivitiesRequestAction {
  type: typeof FETCH_MODULE_ACTIVITIES_REQUEST;
}

interface FetchModuleActivitiesSuccessAction {
  type: typeof FETCH_MODULE_ACTIVITIES_SUCCESS;
  payload: Activity[];
}

interface FetchModuleActivitiesFailureAction {
  type: typeof FETCH_MODULE_ACTIVITIES_FAILURE;
  payload: string;
}

interface SubmitActivityRequestAction {
  type: typeof SUBMIT_ACTIVITY_REQUEST;
}

interface SubmitActivitySuccessAction {
  type: typeof SUBMIT_ACTIVITY_SUCCESS;
  payload: {
    activityId: string;
    submission: Submission;
  };
}

interface SubmitActivityFailureAction {
  type: typeof SUBMIT_ACTIVITY_FAILURE;
  payload: string;
}

export type ActivityActionTypes = 
  | FetchActivityRequestAction
  | FetchActivitySuccessAction
  | FetchActivityFailureAction
  | FetchModuleActivitiesRequestAction
  | FetchModuleActivitiesSuccessAction
  | FetchModuleActivitiesFailureAction
  | SubmitActivityRequestAction
  | SubmitActivitySuccessAction
  | SubmitActivityFailureAction;

// Action Creators
/**
 * Fetch activity request action
 * @returns Action object
 */
export const fetchActivityRequest = (): FetchActivityRequestAction => ({
  type: FETCH_ACTIVITY_REQUEST
});

/**
 * Fetch activity success action
 * @param activity Activity object
 * @returns Action object
 */
export const fetchActivitySuccess = (activity: Activity): FetchActivitySuccessAction => ({
  type: FETCH_ACTIVITY_SUCCESS,
  payload: activity
});

/**
 * Fetch activity failure action
 * @param error Error message
 * @returns Action object
 */
export const fetchActivityFailure = (error: string): FetchActivityFailureAction => ({
  type: FETCH_ACTIVITY_FAILURE,
  payload: error
});

/**
 * Fetch module activities request action
 * @returns Action object
 */
export const fetchModuleActivitiesRequest = (): FetchModuleActivitiesRequestAction => ({
  type: FETCH_MODULE_ACTIVITIES_REQUEST
});

/**
 * Fetch module activities success action
 * @param activities Activities array
 * @returns Action object
 */
export const fetchModuleActivitiesSuccess = (activities: Activity[]): FetchModuleActivitiesSuccessAction => ({
  type: FETCH_MODULE_ACTIVITIES_SUCCESS,
  payload: activities
});

/**
 * Fetch module activities failure action
 * @param error Error message
 * @returns Action object
 */
export const fetchModuleActivitiesFailure = (error: string): FetchModuleActivitiesFailureAction => ({
  type: FETCH_MODULE_ACTIVITIES_FAILURE,
  payload: error
});

/**
 * Submit activity request action
 * @returns Action object
 */
export const submitActivityRequest = (): SubmitActivityRequestAction => ({
  type: SUBMIT_ACTIVITY_REQUEST
});

/**
 * Submit activity success action
 * @param activityId Activity ID
 * @param submission Submission object
 * @returns Action object
 */
export const submitActivitySuccess = (
  activityId: string,
  submission: Submission
): SubmitActivitySuccessAction => ({
  type: SUBMIT_ACTIVITY_SUCCESS,
  payload: {
    activityId,
    submission
  }
});

/**
 * Submit activity failure action
 * @param error Error message
 * @returns Action object
 */
export const submitActivityFailure = (error: string): SubmitActivityFailureAction => ({
  type: SUBMIT_ACTIVITY_FAILURE,
  payload: error
});

// Thunk Actions
/**
 * Fetch activity
 * @param activityId Activity ID
 * @param moduleId Module ID
 * @param courseId Course ID
 * @returns Thunk action
 */
export const fetchActivity = (
  activityId: string,
  moduleId: string,
  courseId: string
) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchActivityRequest());
    
    try {
      const db = getFirestore();
      const activityDocRef = doc(db, 'activities', activityId);
      const activityDoc = await getDoc(activityDocRef);
      
      if (!activityDoc.exists()) {
        throw new Error('Activity not found');
      }
      
      const activityData = {
        id: activityDoc.id,
        ...activityDoc.data()
      } as Activity;
      
      // Get module title
      const moduleDocRef = doc(db, 'modules', moduleId);
      const moduleDoc = await getDoc(moduleDocRef);
      
      if (moduleDoc.exists()) {
        activityData.moduleTitle = moduleDoc.data().title;
      }
      
      // Get activity submissions
      const submissionsQuery = query(
        collection(db, 'submissions'),
        where('activityId', '==', activityId)
      );
      const submissionsSnapshot = await getDocs(submissionsQuery);
      
      const submissions = submissionsSnapshot.docs.map(doc => ({
        ...(doc.data() as Submission),
        id: doc.id
      }));
      
      // Sort submissions by date (newest first)
      submissions.sort((a, b) => 
        new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      );
      
      activityData.submissions = submissions;
      
      dispatch(fetchActivitySuccess(activityData));
    } catch (error: any) {
      dispatch(fetchActivityFailure(error.message || 'Failed to fetch activity'));
    }
  };
};

/**
 * Fetch module activities
 * @param moduleId Module ID
 * @param courseId Course ID
 * @returns Thunk action
 */
export const fetchModuleActivities = (
  moduleId: string,
  courseId: string
) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchModuleActivitiesRequest());
    
    try {
      const db = getFirestore();
      
      // Get module activities
      const activitiesQuery = query(
        collection(db, 'activities'),
        where('moduleId', '==', moduleId)
      );
      const activitiesSnapshot = await getDocs(activitiesQuery);
      
      const activities = activitiesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Activity[];
      
      dispatch(fetchModuleActivitiesSuccess(activities));
    } catch (error: any) {
      dispatch(fetchModuleActivitiesFailure(error.message || 'Failed to fetch module activities'));
    }
  };
};

/**
 * Submit activity
 * @param activityId Activity ID
 * @param moduleId Module ID
 * @param courseId Course ID
 * @param submission Submission object
 * @param files Files to upload
 * @returns Thunk action
 */
export const submitActivity = (
  activityId: string,
  moduleId: string,
  courseId: string,
  submission: Partial<Submission>,
  files: File[]
) => {
  return async (dispatch: Dispatch) => {
    dispatch(submitActivityRequest());
    
    try {
      const db = getFirestore();
      const storage = getStorage();
      
      // Upload files if any
      const attachments: {
        id: string;
        name: string;
        type: string;
        url: string;
        size: number;
        uploadedAt: string;
      }[] = [];
      
      if (files.length > 0) {
        for (const file of files) {
          // Create a storage reference
          const storageRef = ref(storage, `submissions/${activityId}/${Date.now()}_${file.name}`);
          
          // Upload file
          const snapshot = await uploadBytes(storageRef, file);
          
          // Get download URL
          const downloadURL = await getDownloadURL(snapshot.ref);
          
          // Add attachment
          attachments.push({
            id: Date.now().toString(),
            name: file.name,
            type: file.type,
            url: downloadURL,
            size: file.size,
            uploadedAt: new Date().toISOString()
          });
        }
      }
      
      // Add attachments to submission
      const submissionWithAttachments = {
        ...submission,
        attachments
      };
      
      // Add submission to Firestore
      const submissionRef = await addDoc(collection(db, 'submissions'), {
        ...submissionWithAttachments,
        createdAt: serverTimestamp()
      });
      
      // Update activity status
      const activityDocRef = doc(db, 'activities', activityId);
      await updateDoc(activityDocRef, {
        status: 'in-progress',
        updatedAt: serverTimestamp()
      });
      
      // Get the created submission
      const submissionDoc = await getDoc(submissionRef);
      
      const createdSubmission = {
        id: submissionDoc.id,
        ...submissionDoc.data()
      } as Submission;
      
      dispatch(submitActivitySuccess(activityId, createdSubmission));
      
      return createdSubmission;
    } catch (error: any) {
      dispatch(submitActivityFailure(error.message || 'Failed to submit activity'));
      throw error;
    }
  };
};
