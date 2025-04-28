/**
 * ForgotPassword Page
 * 
 * Page wrapper for the ForgotPasswordModern component.
 */

import React from 'react';
import ForgotPasswordModern from '../components/auth/ForgotPasswordModern';
import AuthLayout from '../layouts/AuthLayout';

const ForgotPassword: React.FC = () => {
  return (
    <AuthLayout>
      <ForgotPasswordModern />
    </AuthLayout>
  );
};

export default ForgotPassword;
