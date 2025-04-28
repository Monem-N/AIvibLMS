/**
 * Dashboard Page
 * 
 * Page wrapper for the DashboardModern component.
 */

import React from 'react';
import DashboardModern from '../components/dashboard/DashboardModern';
import MainLayout from '../layouts/MainLayout';

const Dashboard: React.FC = () => {
  return (
    <MainLayout>
      <DashboardModern />
    </MainLayout>
  );
};

export default Dashboard;
