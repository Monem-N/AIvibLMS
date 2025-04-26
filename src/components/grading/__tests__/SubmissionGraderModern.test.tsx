/**
 * SubmissionGraderModern Component Tests
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import SubmissionGraderModern from '../SubmissionGraderModern';
import { AuthProvider } from '../../../contexts/AuthContext';
import { NotificationProvider } from '../../../contexts/NotificationContext';

// Mock the useParams hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    courseId: 'test-course-id',
    submissionId: 'test-submission-id'
  }),
  useNavigate: () => jest.fn()
}));

// Mock the useAuthContext hook
jest.mock('../../../contexts/AuthContext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useAuthContext: () => ({
    user: { uid: 'test-user-id', displayName: 'Test Instructor' },
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

describe('SubmissionGraderModern Component', () => {
  let store: any;
  
  beforeEach(() => {
    store = mockStore({
      grading: {
        currentSubmission: {
          id: 'test-submission-id',
          activityId: 'activity-1',
          userId: 'user-1',
          content: 'This is my submission.',
          attachments: [
            {
              id: 'attachment-1',
              name: 'assignment.pdf',
              type: 'application/pdf',
              url: 'https://example.com/assignment.pdf',
              size: 1024000,
              uploadedAt: '2023-01-01T00:00:00.000Z'
            }
          ],
          submittedAt: '2023-01-01T00:00:00.000Z',
          status: 'submitted',
          activity: {
            id: 'activity-1',
            title: 'Assignment 1',
            description: 'Complete the assignment.',
            type: 'assignment',
            content: 'Please submit your work.',
            points: 100
          },
          module: {
            id: 'module-1',
            title: 'Module 1'
          },
          course: {
            id: 'test-course-id',
            title: 'Test Course'
          },
          student: {
            id: 'user-1',
            name: 'John Doe',
            email: 'john@example.com'
          }
        },
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
              <SubmissionGraderModern />
            </NotificationProvider>
          </AuthProvider>
        </BrowserRouter>
      </Provider>
    );
    
    expect(screen.getByText('Assignment 1')).toBeInTheDocument();
  });
  
  it('displays submission content', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AuthProvider>
            <NotificationProvider>
              <SubmissionGraderModern />
            </NotificationProvider>
          </AuthProvider>
        </BrowserRouter>
      </Provider>
    );
    
    expect(screen.getByText('This is my submission.')).toBeInTheDocument();
  });
  
  it('displays student information', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AuthProvider>
            <NotificationProvider>
              <SubmissionGraderModern />
            </NotificationProvider>
          </AuthProvider>
        </BrowserRouter>
      </Provider>
    );
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });
  
  it('displays activity information', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AuthProvider>
            <NotificationProvider>
              <SubmissionGraderModern />
            </NotificationProvider>
          </AuthProvider>
        </BrowserRouter>
      </Provider>
    );
    
    expect(screen.getByText('Please submit your work.')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });
  
  it('displays attachments', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AuthProvider>
            <NotificationProvider>
              <SubmissionGraderModern />
            </NotificationProvider>
          </AuthProvider>
        </BrowserRouter>
      </Provider>
    );
    
    expect(screen.getByText('assignment.pdf')).toBeInTheDocument();
  });
  
  it('displays grading form', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AuthProvider>
            <NotificationProvider>
              <SubmissionGraderModern />
            </NotificationProvider>
          </AuthProvider>
        </BrowserRouter>
      </Provider>
    );
    
    expect(screen.getByText('Grade Submission')).toBeInTheDocument();
    expect(screen.getByLabelText('Feedback')).toBeInTheDocument();
    expect(screen.getByText('Submit Grade')).toBeInTheDocument();
  });
  
  it('displays loading state when loading submission', () => {
    const loadingStore = mockStore({
      grading: {
        currentSubmission: null,
        loading: true,
        error: null
      }
    });
    
    render(
      <Provider store={loadingStore}>
        <BrowserRouter>
          <AuthProvider>
            <NotificationProvider>
              <SubmissionGraderModern />
            </NotificationProvider>
          </AuthProvider>
        </BrowserRouter>
      </Provider>
    );
    
    expect(screen.getByText('Loading submission...')).toBeInTheDocument();
  });
  
  it('displays error state when there is an error', () => {
    const errorStore = mockStore({
      grading: {
        currentSubmission: null,
        loading: false,
        error: 'Failed to load submission'
      }
    });
    
    render(
      <Provider store={errorStore}>
        <BrowserRouter>
          <AuthProvider>
            <NotificationProvider>
              <SubmissionGraderModern />
            </NotificationProvider>
          </AuthProvider>
        </BrowserRouter>
      </Provider>
    );
    
    expect(screen.getByText('Failed to load submission')).toBeInTheDocument();
  });
  
  it('displays not found state when submission is not found', () => {
    const notFoundStore = mockStore({
      grading: {
        currentSubmission: null,
        loading: false,
        error: null
      }
    });
    
    render(
      <Provider store={notFoundStore}>
        <BrowserRouter>
          <AuthProvider>
            <NotificationProvider>
              <SubmissionGraderModern />
            </NotificationProvider>
          </AuthProvider>
        </BrowserRouter>
      </Provider>
    );
    
    expect(screen.getByText('Submission Not Found')).toBeInTheDocument();
  });
  
  it('dispatches fetchSubmission action on mount', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AuthProvider>
            <NotificationProvider>
              <SubmissionGraderModern />
            </NotificationProvider>
          </AuthProvider>
        </BrowserRouter>
      </Provider>
    );
    
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
