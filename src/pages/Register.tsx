/**
 * Register Page
 * 
 * Page wrapper for the SignUpModern component.
 */

import React from 'react';
import SignUpModern from '../components/auth/SignUpModern';
import AuthLayout from '../layouts/AuthLayout';

const Register: React.FC = () => {
  return (
    <AuthLayout>
      <SignUpModern />
    </AuthLayout>
  );
};

export default Register;
