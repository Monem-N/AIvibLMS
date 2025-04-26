// Authentication constants
export const USER_CONFIRM_EMAIL = 'Please check your email to confirm your account.';
export const PASSWORD_MATCH_ERROR = 'Passwords do not match.';
export const PASSWORD_RESET_SENT = 'Password reset email has been sent.';
export const ACCOUNT_CREATED = 'Your account has been created successfully.';
export const LOGIN_SUCCESS = 'You have been logged in successfully.';
export const LOGOUT_SUCCESS = 'You have been logged out successfully.';

// User roles and levels
export const ADMIN_LEVEL = 5;
export const INSTRUCTOR_LEVEL = 4;
export const ASSISTANT_LEVEL = 3;
export const MODERATOR_LEVEL = 2;
export const STUDENT_LEVEL = 1;

// User roles
export const ROLES = {
  ADMIN: 'admin',
  INSTRUCTOR: 'instructor',
  ASSISTANT: 'assistant',
  MODERATOR: 'moderator',
  STUDENT: 'student',
  GUEST: 'guest'
};

// Permissions
export const PERMISSIONS = {
  READ_ALL: 'read:all',
  WRITE_ALL: 'write:all',
  MANAGE_USERS: 'manage:users',
  MANAGE_COURSES: 'manage:courses',
  MANAGE_CONTENT: 'manage:content',
  MANAGE_SYSTEM: 'manage:system',
  WRITE_COURSES: 'write:courses',
  GRADE_ASSIGNMENTS: 'grade:assignments',
  CREATE_COURSES: 'create:courses',
  WRITE_CONTENT: 'write:content',
  MODERATE_CONTENT: 'moderate:content',
  READ_OWN: 'read:own'
};

// Redux action types
export const SET_USER = 'SET_USER';
export const SET_USER_DATA = 'SET_USER_DATA';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const SET_NOTIFICATION = 'SET_NOTIFICATION';
export const SET_BREADCRUMBS = 'SET_BREADCRUMBS';
export const SET_PANEL = 'SET_PANEL';
export const SET_DESKTOP = 'SET_DESKTOP';
