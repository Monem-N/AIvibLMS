# TypeScript Implementation Guide

This guide provides a comprehensive approach for implementing TypeScript in the Hypatia LMS project. TypeScript adds static typing to JavaScript, which helps catch errors earlier in the development process, improves code quality, and enhances developer productivity.

## Why TypeScript?

1. **Type Safety**: Catch type-related errors at compile time instead of runtime
2. **Better IDE Support**: Enhanced autocompletion, navigation, and refactoring
3. **Self-Documenting Code**: Types serve as documentation for your code
4. **Improved Maintainability**: Easier to understand and refactor code
5. **Better Team Collaboration**: Clear interfaces between components

## Implementation Strategy

We'll follow a gradual approach to implementing TypeScript:

1. **Setup TypeScript Configuration**
2. **Create Type Definitions for Core Models**
3. **Add TypeScript to New Components**
4. **Gradually Convert Existing Components**
5. **Implement Strict Type Checking**

## 1. TypeScript Configuration

### Basic Setup

First, install TypeScript and related dependencies:

```bash
npm install --save-dev typescript @types/react @types/react-dom @types/node
```

Create a `tsconfig.json` file in the project root:

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": false,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": "src"
  },
  "include": ["src"]
}
```

Note that we're starting with `"strict": false` to allow for a gradual transition.

### Configure Build Tools

Update Vite configuration to support TypeScript:

```js
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});
```

## 2. Core Model Type Definitions

Create a `types` directory to store type definitions:

```bash
mkdir -p src/types
```

### User Types

```typescript
// src/types/user.ts
export interface User {
  id: string;
  email: string;
  info: UserInfo;
  status: 'active' | 'inactive' | 'pending';
  createdAt?: string;
  updatedAt?: string;
}

export interface UserInfo {
  firstName: string;
  lastName1: string;
  lastName2?: string;
  displayName: string;
  level: number;
  address?: string;
  city?: string;
  country?: string;
  postcode?: string;
  language?: string;
}

export type UserRole = 'admin' | 'instructor' | 'assistant' | 'student' | 'guest';

export interface UserPermissions {
  role: UserRole;
  level: number;
  permissions: string[];
}
```

### Course Types

```typescript
// src/types/course.ts
export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  status: 'draft' | 'published' | 'archived';
  createdBy: string;
  instructors: string[];
  startDate?: string;
  endDate?: string;
  subjects?: string[];
  modules?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  courseId: string;
  order: number;
  activities: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  moduleId: string;
  type: 'content' | 'assignment' | 'quiz' | 'discussion';
  content?: string;
  dueDate?: string;
  points?: number;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}
```

### State Types

```typescript
// src/types/state.ts
import { User } from './user';
import { Course, Module, Activity } from './course';

export interface RootState {
  auth: AuthState;
  courses: CoursesState;
  users: UsersState;
  ui: UIState;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface CoursesState {
  items: Course[];
  current: Course | null;
  modules: Record<string, Module[]>;
  activities: Record<string, Activity[]>;
  loading: boolean;
  error: string | null;
}

export interface UsersState {
  items: User[];
  loading: boolean;
  error: string | null;
}

export interface UIState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  notifications: Notification[];
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  read: boolean;
  createdAt: string;
}
```

### API Types

```typescript
// src/types/api.ts
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}
```

## 3. Adding TypeScript to New Components

When creating new components, use TypeScript from the start:

```tsx
// src/components/CourseCard.tsx
import React, { useState } from 'react';
import { Course } from '../types/course';

interface CourseCardProps {
  course: Course;
  onEnroll?: (courseId: string) => void;
  className?: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ 
  course, 
  onEnroll,
  className = ''
}) => {
  const [expanded, setExpanded] = useState(false);
  
  const handleEnroll = () => {
    if (onEnroll) {
      onEnroll(course.id);
    }
  };
  
  return (
    <div className={`course-card ${className}`}>
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      
      <button onClick={() => setExpanded(!expanded)}>
        {expanded ? 'Show Less' : 'Show More'}
      </button>
      
      {expanded && (
        <div className="course-details">
          <p>Status: {course.status}</p>
          <p>Start Date: {course.startDate || 'Not set'}</p>
          <p>End Date: {course.endDate || 'Not set'}</p>
          
          <button onClick={handleEnroll}>Enroll</button>
        </div>
      )}
    </div>
  );
};

export default CourseCard;
```

## 4. Converting Existing Components to TypeScript

### Step 1: Rename Files

Rename `.js` and `.jsx` files to `.ts` and `.tsx`:

```bash
mv src/components/CourseList.jsx src/components/CourseList.tsx
```

### Step 2: Add Type Annotations

Add types to props, state, and functions:

```tsx
// Before
const CourseList = ({ courses, loading, error, fetchCourses }) => {
  // Component code
};

// After
import { Course } from '../types/course';

interface CourseListProps {
  courses: Course[];
  loading: boolean;
  error: string | null;
  fetchCourses: () => Promise<void>;
}

const CourseList: React.FC<CourseListProps> = ({ 
  courses, 
  loading, 
  error, 
  fetchCourses 
}) => {
  // Component code
};
```

### Step 3: Fix Type Errors

Address any type errors that TypeScript identifies:

```tsx
// Before
const handleSearch = (e) => {
  setSearchTerm(e.target.value);
};

// After
const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  setSearchTerm(e.target.value);
};
```

### Step 4: Add Return Types

Add return types to functions:

```tsx
// Before
const filterCourses = (courses, term) => {
  return courses.filter(course => 
    course.title.toLowerCase().includes(term.toLowerCase())
  );
};

// After
const filterCourses = (courses: Course[], term: string): Course[] => {
  return courses.filter(course => 
    course.title.toLowerCase().includes(term.toLowerCase())
  );
};
```

## 5. Converting Redux to TypeScript

### Actions

```typescript
// src/actions/courseActions.ts
import { Course } from '../types/course';
import { AppThunk } from '../store';

export const FETCH_COURSES_REQUEST = 'FETCH_COURSES_REQUEST';
export const FETCH_COURSES_SUCCESS = 'FETCH_COURSES_SUCCESS';
export const FETCH_COURSES_FAILURE = 'FETCH_COURSES_FAILURE';

interface FetchCoursesRequestAction {
  type: typeof FETCH_COURSES_REQUEST;
}

interface FetchCoursesSuccessAction {
  type: typeof FETCH_COURSES_SUCCESS;
  payload: Course[];
}

interface FetchCoursesFailureAction {
  type: typeof FETCH_COURSES_FAILURE;
  payload: string;
}

export type CourseActionTypes = 
  | FetchCoursesRequestAction
  | FetchCoursesSuccessAction
  | FetchCoursesFailureAction;

export const fetchCoursesRequest = (): FetchCoursesRequestAction => ({
  type: FETCH_COURSES_REQUEST
});

export const fetchCoursesSuccess = (courses: Course[]): FetchCoursesSuccessAction => ({
  type: FETCH_COURSES_SUCCESS,
  payload: courses
});

export const fetchCoursesFailure = (error: string): FetchCoursesFailureAction => ({
  type: FETCH_COURSES_FAILURE,
  payload: error
});

export const fetchCourses = (): AppThunk => async dispatch => {
  try {
    dispatch(fetchCoursesRequest());
    const response = await fetch('/api/courses');
    const data = await response.json();
    dispatch(fetchCoursesSuccess(data));
  } catch (error) {
    dispatch(fetchCoursesFailure(error.message));
  }
};
```

### Reducers

```typescript
// src/reducers/courseReducer.ts
import { 
  FETCH_COURSES_REQUEST,
  FETCH_COURSES_SUCCESS,
  FETCH_COURSES_FAILURE,
  CourseActionTypes
} from '../actions/courseActions';
import { CoursesState } from '../types/state';

const initialState: CoursesState = {
  items: [],
  current: null,
  modules: {},
  activities: {},
  loading: false,
  error: null
};

const courseReducer = (
  state = initialState,
  action: CourseActionTypes
): CoursesState => {
  switch (action.type) {
    case FETCH_COURSES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_COURSES_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload
      };
    case FETCH_COURSES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default courseReducer;
```

### Store

```typescript
// src/store/index.ts
import { createStore, applyMiddleware, combineReducers, Action } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import courseReducer from '../reducers/courseReducer';
import authReducer from '../reducers/authReducer';
import userReducer from '../reducers/userReducer';
import uiReducer from '../reducers/uiReducer';
import { RootState } from '../types/state';

const rootReducer = combineReducers({
  courses: courseReducer,
  auth: authReducer,
  users: userReducer,
  ui: uiReducer
});

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
```

## 6. Implementing Strict Type Checking

Once most of the codebase has been converted to TypeScript, enable strict mode in `tsconfig.json`:

```json
{
  "compilerOptions": {
    // Other options...
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true
  }
}
```

This will catch additional type errors and ensure more robust type safety.

## 7. Type Definitions for Third-Party Libraries

For third-party libraries without TypeScript definitions, install community-provided types:

```bash
npm install --save-dev @types/library-name
```

If types aren't available, create custom type definitions:

```typescript
// src/types/custom.d.ts
declare module 'untyped-library' {
  export function someFunction(param: string): void;
  export class SomeClass {
    constructor(options: { key: string });
    method(): void;
  }
}
```

## Best Practices

### 1. Use Interfaces for Objects

```typescript
// Prefer this
interface User {
  id: string;
  name: string;
}

// Over this
type User = {
  id: string;
  name: string;
};
```

### 2. Use Type for Unions and Intersections

```typescript
type Status = 'pending' | 'active' | 'inactive';

type UserWithRole = User & { role: string };
```

### 3. Use Enums for Related Constants

```typescript
enum UserRole {
  Admin = 'admin',
  Instructor = 'instructor',
  Student = 'student'
}
```

### 4. Use Function Types

```typescript
type FetchFunction = (id: string) => Promise<User>;

const fetchUser: FetchFunction = async (id) => {
  // Implementation
};
```

### 5. Use Generics for Reusable Components

```typescript
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

// Usage
<List<User> 
  items={users} 
  renderItem={user => <span>{user.name}</span>} 
/>
```

### 6. Use Type Guards

```typescript
function isUser(obj: any): obj is User {
  return obj && typeof obj === 'object' && 'id' in obj && 'name' in obj;
}

function processItem(item: User | Course) {
  if (isUser(item)) {
    // TypeScript knows item is User here
    console.log(item.name);
  } else {
    // TypeScript knows item is Course here
    console.log(item.title);
  }
}
```

### 7. Use Utility Types

```typescript
// Partial - all properties optional
type PartialUser = Partial<User>;

// Required - all properties required
type RequiredUser = Required<User>;

// Pick - select specific properties
type UserCredentials = Pick<User, 'id' | 'email' | 'password'>;

// Omit - exclude specific properties
type PublicUser = Omit<User, 'password' | 'token'>;

// Record - key-value mapping
type UserMap = Record<string, User>;
```

## Tracking TypeScript Conversion Progress

Use the component inventory tool to track TypeScript conversion progress:

```bash
node tools/component-inventory/generate-inventory.js
```

## Conclusion

Implementing TypeScript in the Hypatia LMS project will significantly improve code quality, maintainability, and developer productivity. By following this guide, you can gradually introduce TypeScript to the codebase while minimizing disruption to ongoing development.

Remember to:
1. Start with core type definitions
2. Use TypeScript for new components
3. Gradually convert existing components
4. Enable strict mode once most of the codebase is converted
5. Use TypeScript best practices

For any questions or assistance with TypeScript implementation, please contact the Technical Lead.
