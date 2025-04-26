/**
 * DashboardModern Component
 * 
 * Modern dashboard component using functional components and hooks.
 * Provides an overview of user's courses, activities, and progress.
 */

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../types/state';
import { useAuthContext } from '../../contexts/AuthContext';
import { useFirebase } from '../../hooks/useFirebase';
import DashboardHeader from './DashboardHeader';
import DashboardWidget from './DashboardWidget';
import CoursesWidget from './widgets/CoursesWidget';
import ActivitiesWidget from './widgets/ActivitiesWidget';
import ProgressWidget from './widgets/ProgressWidget';
import MessagesWidget from './widgets/MessagesWidget';
import CalendarWidget from './widgets/CalendarWidget';
import AnnouncementsWidget from './widgets/AnnouncementsWidget';

// Import CSS
import './Dashboard.css';

const DashboardModern: React.FC = () => {
  // State
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Hooks
  const { user } = useAuthContext();
  const { fetchUserData } = useFirebase();
  
  // Redux state
  const userData = useSelector((state: RootState) => state.user.userData);
  
  // Effect to fetch user data
  useEffect(() => {
    const loadUserData = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        await fetchUserData(user.uid);
        setError(null);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUserData();
  }, [user, fetchUserData]);
  
  // If loading, show loading state
  if (isLoading) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-loading">
          <div className="spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }
  
  // If error, show error state
  if (error) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-error">
          <div className="error-icon">!</div>
          <p>{error}</p>
          <button 
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="dashboard-container">
      <DashboardHeader 
        user={user} 
        lastLogin={user?.metadata?.lastLoginAt}
      />
      
      <div className="dashboard-content">
        <div className="dashboard-main">
          <div className="dashboard-row">
            <CoursesWidget 
              className="widget-large"
              courses={userData?.courses || []}
            />
          </div>
          
          <div className="dashboard-row">
            <ActivitiesWidget 
              className="widget-medium"
              activities={userData?.activities || []}
            />
            
            <ProgressWidget 
              className="widget-medium"
              progress={userData?.progress || {}}
            />
          </div>
        </div>
        
        <div className="dashboard-sidebar">
          <CalendarWidget 
            className="widget-full"
            events={userData?.events || []}
          />
          
          <MessagesWidget 
            className="widget-full"
            messages={userData?.messages || []}
          />
          
          <AnnouncementsWidget 
            className="widget-full"
            announcements={userData?.announcements || []}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardModern;
