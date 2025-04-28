/**
 * Settings Page
 * 
 * Page wrapper for the SettingsModern component.
 */

import React from 'react';
import SettingsModern from '../components/users/SettingsModern';
import MainLayout from '../layouts/MainLayout';

const Settings: React.FC = () => {
  return (
    <MainLayout>
      <SettingsModern />
    </MainLayout>
  );
};

export default Settings;
