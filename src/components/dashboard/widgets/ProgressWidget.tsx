/**
 * ProgressWidget Component
 * 
 * Widget for displaying user's progress on the dashboard.
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardWidget from '../DashboardWidget';

// Import CSS
import './ProgressWidget.css';

interface ProgressWidgetProps {
  progress: {
    overall?: number;
    courses?: Record<string, number>;
    grades?: Record<string, number>;
    achievements?: string[];
  };
  className?: string;
}

const ProgressWidget: React.FC<ProgressWidgetProps> = ({ progress, className = '' }) => {
  // State
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Get overall progress
  const overallProgress = progress.overall || 0;
  
  // Get course progress
  const courseProgress = progress.courses || {};
  
  // Get top courses by progress (limit to 3)
  const topCourses = Object.entries(courseProgress)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);
  
  // Handle refresh
  const handleRefresh = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success
      setIsLoading(false);
    } catch (error) {
      console.error('Error refreshing progress:', error);
      setError('Failed to refresh progress. Please try again later.');
      setIsLoading(false);
    }
  };
  
  // Widget icon
  const icon = (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M18 20V10"></path>
      <path d="M12 20V4"></path>
      <path d="M6 20v-6"></path>
    </svg>
  );
  
  // Widget footer
  const footer = (
    <Link to="/progress" className="widget-link">
      View Detailed Progress
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
      </svg>
    </Link>
  );
  
  return (
    <DashboardWidget
      title="My Progress"
      icon={icon}
      className={`progress-widget ${className}`}
      loading={isLoading}
      error={error}
      onRefresh={handleRefresh}
      footer={footer}
      color="#27ae60"
    >
      <div className="progress-overview">
        <div className="progress-chart">
          <svg viewBox="0 0 36 36" className="circular-chart">
            <path
              className="circle-bg"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="circle"
              strokeDasharray={`${overallProgress}, 100`}
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <text x="18" y="20.35" className="percentage">
              {overallProgress}%
            </text>
          </svg>
        </div>
        
        <div className="progress-stats">
          <div className="stat-item">
            <span className="stat-label">Courses Completed</span>
            <span className="stat-value">
              {Object.values(courseProgress).filter(p => p === 100).length}
            </span>
          </div>
          
          <div className="stat-item">
            <span className="stat-label">Courses In Progress</span>
            <span className="stat-value">
              {Object.values(courseProgress).filter(p => p > 0 && p < 100).length}
            </span>
          </div>
          
          <div className="stat-item">
            <span className="stat-label">Achievements</span>
            <span className="stat-value">
              {progress.achievements?.length || 0}
            </span>
          </div>
        </div>
      </div>
      
      <div className="course-progress-list">
        <h4 className="section-title">Top Courses</h4>
        
        {topCourses.length === 0 ? (
          <div className="courses-empty">
            <p>No course progress available.</p>
          </div>
        ) : (
          topCourses.map(([courseId, progressValue]) => (
            <div key={courseId} className="course-progress-item">
              <div className="course-info">
                <span className="course-name">
                  {courseId.split('-').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                </span>
                <span className="progress-value">{progressValue}%</span>
              </div>
              
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${progressValue}%` }}
                ></div>
              </div>
            </div>
          ))
        )}
      </div>
    </DashboardWidget>
  );
};

export default ProgressWidget;
