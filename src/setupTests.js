// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock SVG imports
jest.mock('../assets/svg/logo.svg', () => 'logo-mock');
jest.mock('../assets/svg/logo-wording.svg', () => 'logo-wording-mock');
jest.mock('../assets/svg/avatar.svg', () => 'avatar-mock');
jest.mock('../assets/svg/trophy.svg', () => 'trophy-mock');
jest.mock('../assets/svg/calendar.svg', () => 'calendar-mock');
jest.mock('../assets/svg/question.svg', () => 'question-mock');
jest.mock('../assets/svg/search.svg', () => 'search-mock');
jest.mock('../assets/svg/x.svg', () => 'x-mock');
jest.mock('../assets/svg/logout.svg', () => 'logout-mock');
jest.mock('../assets/svg/chat.svg', () => 'chat-mock');
jest.mock('../assets/svg/forward.svg', () => 'forward-mock');
jest.mock('../assets/svg/course.svg', () => 'course-mock');
jest.mock('../assets/svg/subject.svg', () => 'subject-mock');
jest.mock('../assets/svg/module.svg', () => 'module-mock');
jest.mock('../assets/svg/activity.svg', () => 'activity-mock');
jest.mock('../assets/svg/post.svg', () => 'post-mock');
jest.mock('../assets/svg/cog.svg', () => 'cog-mock');
jest.mock('../assets/svg/dashboard.svg', () => 'dashboard-mock');
jest.mock('../assets/svg/team.svg', () => 'team-mock');
jest.mock('../assets/svg/account.svg', () => 'account-mock');
jest.mock('../assets/svg/info.svg', () => 'info-mock');
jest.mock('../assets/svg/professor.svg', () => 'professor-mock');

// Mock Firebase
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
}));

jest.mock('firebase/database', () => ({
  getDatabase: jest.fn(),
  ref: jest.fn(),
  onValue: jest.fn(),
  query: jest.fn(),
  orderByChild: jest.fn(),
  equalTo: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  doc: jest.fn(),
  setDoc: jest.fn(),
  getDoc: jest.fn(),
  updateDoc: jest.fn(),
  serverTimestamp: jest.fn(),
}));

// Mock Redux
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
  Provider: ({ children }) => children,
}));

// Mock React Router
jest.mock('react-router-dom', () => ({
  Link: ({ children, to }) => <a href={to}>{children}</a>,
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/' }),
  BrowserRouter: ({ children }) => children,
  Routes: ({ children }) => children,
  Route: ({ children }) => children,
  Navigate: ({ to }) => <div>Navigate to {to}</div>,
}));

// Mock md5
jest.mock('md5', () => jest.fn(() => 'md5hash'));

// Mock moment
jest.mock('moment', () => {
  const moment = jest.requireActual('moment');
  return jest.fn(() => ({
    format: jest.fn(() => 'formatted-date'),
  }));
});
