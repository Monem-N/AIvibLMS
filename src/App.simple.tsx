/**
 * Simple App Component
 *
 * A simplified version of the App component for testing.
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SimpleTest from './components/test/SimpleTest';
import HybridTest from './components/test/HybridTest';
import RealStorageTest from './components/test/RealStorageTest';
import SimpleStorageTest from './components/test/SimpleStorageTest';
import DirectUploadTest from './components/test/DirectUploadTest';
import FirebaseAuthTest from './components/test/FirebaseAuthTest';
import TestDashboard from './components/test/TestDashboard';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TestDashboard />} />
        <Route path="/simple" element={<SimpleTest />} />
        <Route path="/hybrid" element={<HybridTest />} />
        <Route path="/real-storage" element={<RealStorageTest />} />
        <Route path="/simple-storage" element={<SimpleStorageTest />} />
        <Route path="/direct-upload" element={<DirectUploadTest />} />
        <Route path="/firebase-auth" element={<FirebaseAuthTest />} />
      </Routes>
    </Router>
  );
};

export default App;
