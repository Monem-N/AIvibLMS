/**
 * ResetPassword Page
 * 
 * Page wrapper for the ResetPasswordModern component.
 */

import React from 'react';
import ResetPasswordModern from '../components/auth/ResetPasswordModern';
import AuthLayout from '../layouts/AuthLayout';

const ResetPassword: React.FC = () => {
  return (
    <AuthLayout>
      <ResetPasswordModern />
    </AuthLayout>
  );
};

export default ResetPassword;
