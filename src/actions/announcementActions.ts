/**
 * Announcement Actions
 * 
 * Redux actions for announcement management.
 */

import { Dispatch } from 'redux';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { Announcement } from '../types/state';

// Action Types
export const FETCH_ANNOUNCEMENTS_REQUEST = 'FETCH_ANNOUNCEMENTS_REQUEST';
export const FETCH_ANNOUNCEMENTS_SUCCESS = 'FETCH_ANNOUNCEMENTS_SUCCESS';
export const FETCH_ANNOUNCEMENTS_FAILURE = 'FETCH_ANNOUNCEMENTS_FAILURE';
export const MARK_ANNOUNCEMENT_READ = 'MARK_ANNOUNCEMENT_READ';
export const MARK_ALL_ANNOUNCEMENTS_READ = 'MARK_ALL_ANNOUNCEMENTS_READ';

// Action Interfaces
interface FetchAnnouncementsRequestAction {
  type: typeof FETCH_ANNOUNCEMENTS_REQUEST;
}

interface FetchAnnouncementsSuccessAction {
  type: typeof FETCH_ANNOUNCEMENTS_SUCCESS;
  payload: Announcement[];
}

interface FetchAnnouncementsFailureAction {
  type: typeof FETCH_ANNOUNCEMENTS_FAILURE;
  payload: string;
}

interface MarkAnnouncementReadAction {
  type: typeof MARK_ANNOUNCEMENT_READ;
  payload: string; // announcement id
}

interface MarkAllAnnouncementsReadAction {
  type: typeof MARK_ALL_ANNOUNCEMENTS_READ;
}

export type AnnouncementActionTypes = 
  | FetchAnnouncementsRequestAction
  | FetchAnnouncementsSuccessAction
  | FetchAnnouncementsFailureAction
  | MarkAnnouncementReadAction
  | MarkAllAnnouncementsReadAction;

// Action Creators
/**
 * Fetch announcements request action
 * @returns Action object
 */
export const fetchAnnouncementsRequest = (): FetchAnnouncementsRequestAction => ({
  type: FETCH_ANNOUNCEMENTS_REQUEST
});

/**
 * Fetch announcements success action
 * @param announcements Announcements array
 * @returns Action object
 */
export const fetchAnnouncementsSuccess = (announcements: Announcement[]): FetchAnnouncementsSuccessAction => ({
  type: FETCH_ANNOUNCEMENTS_SUCCESS,
  payload: announcements
});

/**
 * Fetch announcements failure action
 * @param error Error message
 * @returns Action object
 */
export const fetchAnnouncementsFailure = (error: string): FetchAnnouncementsFailureAction => ({
  type: FETCH_ANNOUNCEMENTS_FAILURE,
  payload: error
});

/**
 * Mark announcement read action
 * @param id Announcement ID
 * @returns Action object
 */
export const markAnnouncementRead = (id: string): MarkAnnouncementReadAction => ({
  type: MARK_ANNOUNCEMENT_READ,
  payload: id
});

/**
 * Mark all announcements read action
 * @returns Action object
 */
export const markAllAnnouncementsRead = (): MarkAllAnnouncementsReadAction => ({
  type: MARK_ALL_ANNOUNCEMENTS_READ
});

// Thunk Actions
/**
 * Fetch announcements
 * @param courseId Course ID
 * @returns Thunk action
 */
export const fetchAnnouncements = (courseId: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchAnnouncementsRequest());
    
    try {
      const db = getFirestore();
      
      // Get course announcements
      const announcementsQuery = query(
        collection(db, 'announcements'),
        where('courseId', '==', courseId)
      );
      const announcementsSnapshot = await getDocs(announcementsQuery);
      
      const announcements = announcementsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Announcement[];
      
      // Sort announcements by date (newest first)
      announcements.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      
      dispatch(fetchAnnouncementsSuccess(announcements));
    } catch (error: any) {
      dispatch(fetchAnnouncementsFailure(error.message || 'Failed to fetch announcements'));
    }
  };
};
