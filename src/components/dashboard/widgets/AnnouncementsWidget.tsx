/**
 * AnnouncementsWidget Component
 * 
 * Widget for displaying announcements on the dashboard.
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardWidget from '../DashboardWidget';
import { formatDate } from '../../../utils/dateUtils';

// Import CSS
import './AnnouncementsWidget.css';

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  courseId?: string;
  courseName?: string;
  read: boolean;
}

interface AnnouncementsWidgetProps {
  announcements: Announcement[];
  className?: string;
}

const AnnouncementsWidget: React.FC<AnnouncementsWidgetProps> = ({ announcements, className = '' }) => {
  // State
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Sort announcements by date (newest first)
  const sortedAnnouncements = [...announcements].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  // Get unread announcements count
  const unreadCount = announcements.filter(announcement => !announcement.read).length;
  
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
      console.error('Error refreshing announcements:', error);
      setError('Failed to refresh announcements. Please try again later.');
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
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
      <line x1="12" y1="9" x2="12" y2="13"></line>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
  );
  
  // Widget footer
  const footer = (
    <Link to="/announcements" className="widget-link">
      View All Announcements
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
      title={`Announcements ${unreadCount > 0 ? `(${unreadCount})` : ''}`}
      icon={icon}
      className={`announcements-widget ${className}`}
      loading={isLoading}
      error={error}
      onRefresh={handleRefresh}
      footer={footer}
      color="#e74c3c"
    >
      {sortedAnnouncements.length === 0 ? (
        <div className="announcements-empty">
          <p>No announcements.</p>
        </div>
      ) : (
        <div className="announcements-list">
          {sortedAnnouncements.slice(0, 3).map(announcement => (
            <AnnouncementItem key={announcement.id} announcement={announcement} />
          ))}
        </div>
      )}
    </DashboardWidget>
  );
};

interface AnnouncementItemProps {
  announcement: Announcement;
}

const AnnouncementItem: React.FC<AnnouncementItemProps> = ({ announcement }) => {
  // Format date
  const formattedDate = formatDate(announcement.date);
  
  // Truncate content
  const truncateContent = (content: string, maxLength: number = 100) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };
  
  return (
    <Link 
      to={`/announcements/${announcement.id}`} 
      className={`announcement-item ${!announcement.read ? 'unread' : ''}`}
    >
      <div className="announcement-header">
        <h4 className="announcement-title">{announcement.title}</h4>
        {!announcement.read && <div className="unread-indicator"></div>}
      </div>
      
      <p className="announcement-content">
        {truncateContent(announcement.content)}
      </p>
      
      <div className="announcement-meta">
        <div className="announcement-author">
          {announcement.author.avatar ? (
            <img 
              src={announcement.author.avatar} 
              alt={announcement.author.name} 
              className="author-avatar" 
            />
          ) : (
            <div className="author-avatar-placeholder">
              {announcement.author.name.charAt(0)}
            </div>
          )}
          <span className="author-name">{announcement.author.name}</span>
        </div>
        
        <div className="announcement-info">
          <span className="announcement-date">{formattedDate}</span>
          
          {announcement.courseName && (
            <span className="announcement-course">
              {announcement.courseName}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default AnnouncementsWidget;
