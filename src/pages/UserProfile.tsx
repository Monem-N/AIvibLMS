/**
 * UserProfile Page
 * 
 * Page wrapper for the ProfileModern component.
 */

import React from 'react';
import ProfileModern from '../components/users/ProfileModern';
import MainLayout from '../layouts/MainLayout';

const UserProfile: React.FC = () => {
  return (
    <MainLayout>
      <ProfileModern />
    </MainLayout>
  );
};

export default UserProfile;
