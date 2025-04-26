/**
 * GradingDashboardModern Component Tests
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import GradingDashboardModern from '../GradingDashboardModern';
import { AuthProvider } from '../../../contexts/AuthContext';
import { NotificationProvider } from '../../../contexts/NotificationContext';

// Mock the useParams hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    courseId: 'test-course-id'
  }),
  useNavigate: () => jest.fn()
}));

// Mock the useAuthContext hook
jest.mock('../../../contexts/AuthContext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useAuthContext: () => ({
    user: { uid: 'test-user-id', displayName: 'Test User' },
    isAuthenticated: () => true,
    hasRole: () => true
  })
}));

// Mock the useNotification hook
jest.mock('../../../hooks/useNotification', () => ({
  useNotification: () => ({
    showSuccess: jest.fn(),
    showError: jest.fn()
  })
}));

// Create mock store
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('GradingDashboardModern Component', () => {
  let store: any;
  
  beforeEach(() => {
    store = mockStore({
      courses: {
        currentCourse: {
          id: 'test-course-id',
          title: 'Test Course',
          modules: [
            {
              id: 'module-1',
              title: 'Module 1'
            },
            {
              id: 'module-2',
              title: 'Module 2'
            }
          ]
        },
        loading: false,
        error: null
      },
      grading: {
        submissions: [
          {
            id: 'submission-1',
            activityId: 'activity-1',
            userId: 'user-1',
            submittedAt: '2023-01-01T00:00:00.000Z',
            status: 'submitted',
            activity: {
              id: 'activity-1',
              title: 'Assignment 1',
              type: 'assignment',
              points: 100
            },
            module: {
              id: 'module-1',
              title: 'Module 1'
            },
            student: {
              id: 'user-1',
              name: 'John Doe',
              email: 'john@example.com'
            }
          },
          {
            id: 'submission-2',
            activityId: 'activity-2',
            userId: 'user-2',
            submittedAt: '2023-01-02T00:00:00.000Z',
            status: 'submitted',
            activity: {
              id: 'activity-2',
              title: 'Quiz 1',
              type: 'quiz',
              points: 50
            },
            module: {
              id: 'module-2',
              title: 'Module 2'
            },
            student: {
              id: 'user-2',
              name: 'Jane Smith',
              email: 'jane@example.com'
            }
          }
        ],
        loading: false,
        error: null
      }
    });
    
    // Mock dispatch
    store.dispatch = jest.fn();
  });
  
  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AuthProvider>
            <NotificationProvider>
              <GradingDashboardModern />
            </NotificationProvider>
          </AuthProvider>
        </BrowserRouter>
      </Provider>
    );
    
    expect(screen.getByText('Grading Dashboard')).toBeInTheDocument();
  });
  
  it('displays course title in header', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AuthProvider>
            <NotificationProvider>
              <GradingDashboardModern />
            </NotificationProvider>
          </AuthProvider>
        </BrowserRouter>
      </Provider>
    );
    
    expect(screen.getByText('Test Course')).toBeInTheDocument();
  });
  
  it('displays submission count', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AuthProvider>
            <NotificationProvider>
              <GradingDashboardModern />
            </NotificationProvider>
          </AuthProvider>
        </BrowserRouter>
      </Provider>
    );
    
    expect(screen.getByText('2 submissions to grade')).toBeInTheDocument();
  });
  
  it('displays submissions list', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AuthProvider>
            <NotificationProvider>
              <GradingDashboardModern />
            </NotificationProvider>
          </AuthProvider>
        </BrowserRouter>
      </Provider>
    );
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Assignment 1')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Quiz 1')).toBeInTheDocument();
  });
  
  it('displays loading state when loading course', () => {
    const loadingStore = mockStore({
      courses: {
        currentCourse: null,
        loading: true,
        error: null
      },
      grading: {
        submissions: [],
        loading: false,
        error: null
      }
    });
    
    render(
      <Provider store={loadingStore}>
        <BrowserRouter>
          <AuthProvider>
            <NotificationProvider>
              <GradingDashboardModern />
            </NotificationProvider>
          </AuthProvider>
        </BrowserRouter>
      </Provider>
    );
    
    expect(screen.getByText('Loading course...')).toBeInTheDocument();
  });
  
  it('displays error state when there is an error', () => {
    const errorStore = mockStore({
      courses: {
        currentCourse: null,
        loading: false,
        error: 'Failed to load course'
      },
      grading: {
        submissions: [],
        loading: false,
        error: null
      }
    });
    
    render(
      <Provider store={errorStore}>
        <BrowserRouter>
          <AuthProvider>
            <NotificationProvider>
              <GradingDashboardModern />
            </NotificationProvider>
          </AuthProvider>
        </BrowserRouter>
      </Provider>
    );
    
    expect(screen.getByText('Failed to load course')).toBeInTheDocument();
  });
  
  it('displays empty state when there are no submissions', () => {
    const emptyStore = mockStore({
      courses: {
        currentCourse: {
          id: 'test-course-id',
          title: 'Test Course',
          modules: []
        },
        loading: false,
        error: null
      },
      grading: {
        submissions: [],
        loading: false,
        error: null
      }
    });
    
    render(
      <Provider store={emptyStore}>
        <BrowserRouter>
          <AuthProvider>
            <NotificationProvider>
              <GradingDashboardModern />
            </NotificationProvider>
          </AuthProvider>
        </BrowserRouter>
      </Provider>
    );
    
    expect(screen.getByText('No Submissions to Grade')).toBeInTheDocument();
  });
  
  it('dispatches fetchCourse action on mount', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AuthProvider>
            <NotificationProvider>
              <GradingDashboardModern />
            </NotificationProvider>
          </AuthProvider>
        </BrowserRouter>
      </Provider>
    );
    
    expect(store.dispatch).toHaveBeenCalledTimes(2);
  });
});
