/**
 * Announcement Reducer
 * 
 * Redux reducer for announcement state management.
 */

import { Announcement } from '../types/state';
import { 
  AnnouncementActionTypes,
  FETCH_ANNOUNCEMENTS_REQUEST,
  FETCH_ANNOUNCEMENTS_SUCCESS,
  FETCH_ANNOUNCEMENTS_FAILURE,
  MARK_ANNOUNCEMENT_READ,
  MARK_ALL_ANNOUNCEMENTS_READ
} from '../actions/announcementActions';

interface AnnouncementState {
  announcements: Announcement[];
  loading: boolean;
  error: string | null;
}

const initialState: AnnouncementState = {
  announcements: [],
  loading: false,
  error: null
};

/**
 * Announcement reducer
 * @param state Current state
 * @param action Action object
 * @returns New state
 */
const announcementReducer = (
  state = initialState,
  action: AnnouncementActionTypes
): AnnouncementState => {
  switch (action.type) {
    case FETCH_ANNOUNCEMENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case FETCH_ANNOUNCEMENTS_SUCCESS:
      return {
        ...state,
        announcements: action.payload,
        loading: false,
        error: null
      };
    
    case FETCH_ANNOUNCEMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    
    case MARK_ANNOUNCEMENT_READ:
      return {
        ...state,
        announcements: state.announcements.map(announcement => 
          announcement.id === action.payload
            ? { ...announcement, read: true }
            : announcement
        )
      };
    
    case MARK_ALL_ANNOUNCEMENTS_READ:
      return {
        ...state,
        announcements: state.announcements.map(announcement => ({
          ...announcement,
          read: true
        }))
      };
    
    default:
      return state;
  }
};

export default announcementReducer;
