# ADR 002: State Management Approach

## Status
Proposed

## Context
The modernization of the Hypatia LMS requires selecting an appropriate state management approach for the new system. The current implementation uses Redux with redux-react-firebase for state management, which directly integrates Firebase with the Redux store. We need to decide whether to continue with Redux, adopt a different state management library, or use a combination of approaches.

Key considerations include:
- Developer experience and productivity
- Performance characteristics
- Complexity and learning curve
- Integration with Firebase
- Testability
- Scalability as the application grows

## Decision
We will use a combination of Redux Toolkit and React Context for state management in the modernized Hypatia LMS.

Specifically:
1. We will use Redux Toolkit for global application state
2. We will use RTK Query for data fetching and caching
3. We will use React Context for UI-specific state and theme management
4. We will create a service layer to abstract Firebase interactions
5. We will implement custom hooks for common state operations

## Rationale
This combined approach was selected for the following reasons:

1. **Redux Toolkit Simplifies Redux**: Redux Toolkit significantly reduces the boilerplate code associated with traditional Redux, making it more developer-friendly while maintaining the benefits of Redux.

2. **RTK Query for Data Fetching**: RTK Query provides a powerful and consistent way to handle API requests, caching, and loading states, which is particularly valuable for interacting with Firebase.

3. **Service Layer Abstraction**: Creating a service layer to abstract Firebase interactions will decouple the application from Firebase, making it easier to test and potentially migrate to different backend services in the future.

4. **Context for UI State**: React Context is well-suited for UI-specific state that doesn't need to be globally accessible, such as theme preferences, modal states, and form state.

5. **Custom Hooks for Reusability**: Custom hooks will encapsulate common state operations, making them reusable across components and improving code organization.

6. **Improved Testability**: This approach makes it easier to test components in isolation by mocking the service layer and Redux store.

7. **Scalability**: The combination of Redux Toolkit for global state and Context for local state provides a scalable solution that can grow with the application.

Alternative approaches considered:

1. **Continue with Traditional Redux**: While this would provide continuity with the existing codebase, it would perpetuate the verbose boilerplate and direct Firebase integration.

2. **Use Context API Only**: While simpler for small applications, this approach doesn't scale well for complex state management needs and lacks the powerful developer tools available for Redux.

3. **Adopt a Different State Management Library**: Libraries like MobX, Zustand, or Recoil offer alternative approaches, but Redux Toolkit provides the best balance of power, ecosystem support, and familiarity.

## Consequences

### Positive
- Reduced boilerplate code compared to traditional Redux
- Improved developer experience with Redux Toolkit and RTK Query
- Better separation of concerns with service layer abstraction
- More flexible state management with the combination of Redux and Context
- Improved testability with clearer boundaries between components and state
- Better performance through optimized rendering and caching

### Negative
- Learning curve for developers not familiar with Redux Toolkit and RTK Query
- Slightly more complex architecture than using a single state management approach
- Potential for inconsistent patterns if not properly documented and enforced
- Migration effort to move from direct Firebase integration to service layer abstraction

## Implementation Strategy

1. **Create Core Redux Store**: Set up the Redux store using Redux Toolkit's `configureStore`
2. **Implement Service Layer**: Create Firebase service abstractions for authentication, data fetching, etc.
3. **Define Core Slices**: Create Redux slices for global state (user, settings, etc.)
4. **Set Up RTK Query**: Configure RTK Query for data fetching operations
5. **Create Context Providers**: Implement context providers for UI-specific state
6. **Develop Custom Hooks**: Create custom hooks that encapsulate common state operations

## Example Implementation

### Redux Store Configuration

```typescript
// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userReducer } from './slices/userSlice';
import { uiReducer } from './slices/uiSlice';
import { apiSlice } from './api/apiSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    ui: uiReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### Service Layer

```typescript
// services/authService.ts
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  User
} from 'firebase/auth';

export class AuthService {
  private auth = getAuth();
  
  async signIn(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }
  
  async signUp(email: string, password: string): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }
  
  async signOut(): Promise<void> {
    return signOut(this.auth);
  }
  
  private handleAuthError(error: any): Error {
    // Handle specific error codes and provide user-friendly messages
    return new Error(`Authentication error: ${error.message}`);
  }
}
```

### Redux Slice

```typescript
// slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';

interface UserState {
  currentUser: User | null;
  userProfile: any | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  userProfile: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
    setUserProfile: (state, action: PayloadAction<any | null>) => {
      state.userProfile = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearUser: (state) => {
      state.currentUser = null;
      state.userProfile = null;
    },
  },
});

export const { setUser, setUserProfile, setLoading, setError, clearUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
```

### RTK Query API

```typescript
// api/apiSlice.ts
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { getFirestore, doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';

const db = getFirestore();

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Course', 'Subject', 'Module', 'Activity', 'User'],
  endpoints: (builder) => ({
    getCourse: builder.query({
      queryFn: async (courseId) => {
        try {
          const courseRef = doc(db, 'courses', courseId);
          const courseSnap = await getDoc(courseRef);
          
          if (courseSnap.exists()) {
            return { data: { id: courseSnap.id, ...courseSnap.data() } };
          } else {
            return { error: { status: 404, data: 'Course not found' } };
          }
        } catch (error) {
          return { error: { status: 500, data: error.message } };
        }
      },
      providesTags: (result, error, courseId) => [{ type: 'Course', id: courseId }],
    }),
    // Additional endpoints for other entities
  }),
});

export const { useGetCourseQuery } = apiSlice;
```

### Context Provider

```typescript
// contexts/ThemeContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');
  
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
```

### Custom Hook

```typescript
// hooks/useAuth.ts
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthService } from '../services/authService';
import { setUser, setLoading, setError, clearUser } from '../slices/userSlice';
import { RootState } from '../store';

export const useAuth = () => {
  const dispatch = useDispatch();
  const authService = new AuthService();
  const { currentUser, isLoading, error } = useSelector((state: RootState) => state.user);
  
  const signIn = useCallback(async (email: string, password: string) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      const user = await authService.signIn(email, password);
      dispatch(setUser(user));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, authService]);
  
  const signOut = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      await authService.signOut();
      dispatch(clearUser());
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, authService]);
  
  return {
    currentUser,
    isLoading,
    error,
    signIn,
    signOut,
  };
};
```

## Related Decisions
- ADR 001: Frontend Framework Selection
- ADR 003: UI Component Library Selection (Upcoming)
- ADR 005: API Layer Design (Upcoming)
