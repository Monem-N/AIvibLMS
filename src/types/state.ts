/**
 * Redux state types for the Hypatia LMS
 */

import { User } from './user';
import { Course, Module, Activity, Submission } from './course';
import { Breadcrumb } from './navigation';

/**
 * Root state
 */
export interface RootState {
  mainReducer: MainReducerState;
  user: AuthState;
  courses: CoursesState;
  activities: {
    activities: Activity[];
    currentActivity: Activity | null;
    loading: boolean;
    error: string | null;
  };
  grading: GradingState;
  [key: string]: any;
}

/**
 * Main reducer state
 */
export interface MainReducerState {
  user: User | null;
  userData: any | null;
  panel: string;
  isDesktop: boolean;
  isLoading: boolean;
  error: string | null;
  notification: Notification | null;
  breadcrumbs: Breadcrumb[];
}

/**
 * Notification
 */
export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  visible: boolean;
  duration?: number;
}

/**
 * Auth state
 */
export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

/**
 * Courses state
 */
export interface CoursesState {
  items: Course[];
  current: Course | null;
  modules: Record<string, Module[]>;
  activities: Record<string, Activity[]>;
  loading: boolean;
  error: string | null;
}

/**
 * Users state
 */
export interface UsersState {
  items: User[];
  loading: boolean;
  error: string | null;
}

/**
 * UI state
 */
export interface UIState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  notifications: Notification[];
}

/**
 * Grading state
 */
export interface GradingState {
  submissions: Submission[];
  currentSubmission: Submission | null;
  loading: boolean;
  error: string | null;
}
