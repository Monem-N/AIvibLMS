# ADR 004: Build System Selection

## Status
Proposed

## Context
The modernization of the Hypatia LMS requires selecting a build system that will compile, bundle, and optimize the application for development and production. The current implementation uses Webpack for bundling. We need to decide on a modern build system that will provide fast development experience, efficient production builds, and support for modern JavaScript features.

Key considerations include:
- Development experience and speed
- Production build performance and optimization
- Support for TypeScript, React, and other modern technologies
- Hot module replacement (HMR) capabilities
- Code splitting and lazy loading support
- Plugin ecosystem and extensibility
- Learning curve and documentation
- Community support and longevity

## Decision
We will use Vite as the build system for the modernized Hypatia LMS.

Specifically:
1. We will use Vite for both development and production builds
2. We will configure Vite for TypeScript and React support
3. We will implement code splitting for optimized loading
4. We will use Vite's built-in HMR for fast development
5. We will extend Vite with plugins as needed for specific requirements

## Rationale
Vite was selected for the following reasons:

1. **Development Speed**: Vite provides an extremely fast development experience by leveraging native ES modules and avoiding bundling during development. This results in near-instantaneous server start and hot module replacement.

2. **Modern Architecture**: Vite is built from the ground up for modern JavaScript, with native support for ES modules, TypeScript, JSX, CSS modules, and other modern features.

3. **Production Optimization**: Vite uses Rollup for production builds, which produces highly optimized bundles with efficient code splitting and tree shaking.

4. **TypeScript Integration**: Vite has excellent TypeScript support out of the box, with fast type checking and seamless integration.

5. **React Support**: Vite provides first-class support for React, including fast refresh for a better development experience than traditional hot module replacement.

6. **Plugin Ecosystem**: Vite has a growing ecosystem of plugins and is compatible with many Rollup plugins, providing extensibility for specific needs.

7. **Simplicity**: Vite requires minimal configuration for most use cases, reducing the complexity of the build system.

8. **Active Development**: Vite is actively maintained by Evan You (creator of Vue.js) and has a growing community and ecosystem.

Alternative build systems considered:

1. **Webpack**: While widely used and powerful, Webpack has a steeper learning curve, more complex configuration, and slower development experience compared to Vite.

2. **Next.js**: Next.js provides an excellent build system with server-side rendering capabilities, but it's more opinionated and would require adopting the Next.js framework, which may be more than we need for this project.

3. **Parcel**: Parcel offers a zero-configuration approach, but has less optimization capabilities and a smaller ecosystem compared to Vite.

4. **Snowpack**: Similar to Vite in its ESM-based approach, but has less active development and a smaller community.

## Consequences

### Positive
- Significantly faster development experience
- Simpler configuration compared to Webpack
- Better developer experience with fast refresh
- Optimized production builds with code splitting
- Native support for modern JavaScript features
- Reduced build times for both development and production

### Negative
- Less mature than Webpack with a smaller (but growing) ecosystem
- May require learning new concepts for developers familiar with Webpack
- Some Webpack plugins may not have Vite equivalents
- Potential migration challenges for existing Webpack-specific code

## Implementation Strategy

1. **Initial Setup**: Create a new Vite project with React and TypeScript template
2. **Configuration**: Set up Vite configuration for development and production
3. **Code Splitting**: Implement dynamic imports for route-based code splitting
4. **Asset Optimization**: Configure asset handling and optimization
5. **Environment Variables**: Set up environment variable handling
6. **Plugin Integration**: Add necessary Vite plugins for specific requirements

## Example Implementation

### Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@services': path.resolve(__dirname, './src/services'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    // Configure chunk size warnings
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Configure code splitting
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore', 'firebase/storage'],
          ui: ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
    cors: true,
  },
});
```

### Package.json Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext .ts,.tsx",
    "test": "vitest run"
  }
}
```

### Code Splitting with React Router

```typescript
// src/App.tsx
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import MainLayout from './layouts/MainLayout';

// Lazy-loaded components
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const CourseList = lazy(() => import('./pages/CourseList'));
const CourseDetail = lazy(() => import('./pages/CourseDetail'));
const Profile = lazy(() => import('./pages/Profile'));
const NotFound = lazy(() => import('./pages/NotFound'));

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Suspense fallback={<div className="loader"><CircularProgress /></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/courses" element={<CourseList />} />
            <Route path="/courses/:courseId" element={<CourseDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
```

### Environment Variables

```typescript
// .env.development
VITE_FIREBASE_API_KEY=your_development_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_development_auth_domain
VITE_FIREBASE_PROJECT_ID=your_development_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_development_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_development_messaging_sender_id
VITE_FIREBASE_APP_ID=your_development_app_id

// .env.production
VITE_FIREBASE_API_KEY=your_production_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_production_auth_domain
VITE_FIREBASE_PROJECT_ID=your_production_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_production_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_production_messaging_sender_id
VITE_FIREBASE_APP_ID=your_production_app_id
```

### Accessing Environment Variables

```typescript
// src/config/firebase.ts
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
```

## Related Decisions
- ADR 001: Frontend Framework Selection
- ADR 002: State Management Approach
- ADR 003: UI Component Library Selection
- ADR 005: API Layer Design (Upcoming)
