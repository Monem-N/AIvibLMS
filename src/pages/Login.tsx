/**
 * Login Page
 * 
 * Page wrapper for the SignInModern component.
 */

import React from 'react';
import SignInModern from '../components/auth/SignInModern';
import AuthLayout from '../layouts/AuthLayout';

const Login: React.FC = () => {
  return (
    <AuthLayout>
      <SignInModern />
    </AuthLayout>
  );
};

export default Login;
