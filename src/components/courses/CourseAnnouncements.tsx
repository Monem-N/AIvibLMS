/**
 * CourseAnnouncements Component
 * 
 * Displays the course announcements.
 */

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../types/state';
import { fetchAnnouncements } from '../../actions/announcementActions';
import { formatDate, getRelativeTime } from '../../utils/dateUtils';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

// Import CSS
import './CourseAnnouncements.css';

interface CourseAnnouncementsProps {
  courseId: string;
}

const CourseAnnouncements: React.FC<CourseAnnouncementsProps> = ({ courseId }) => {
  // State
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  
  // Redux
  const dispatch = useDispatch();
  const { announcements, loading, error } = useSelector(
    (state: RootState) => state.announcements
  );
  
  // Effect to fetch announcements
  useEffect(() => {
    dispatch(fetchAnnouncements(courseId));
  }, [courseId, dispatch]);
  
  // Filter announcements
  const filteredAnnouncements = announcements.filter(announcement => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !announcement.read;
    return true;
  });
  
  // If loading, show loading state
  if (loading) {
    return <LoadingSpinner message="Loading announcements..." />;
  }
  
  // If error, show error state
  if (error) {
    return (
      <ErrorMessage 
        message={error} 
        onRetry={() => dispatch(fetchAnnouncements(courseId))}
      />
    );
  }
  
  // If no announcements, show empty state
  if (announcements.length === 0) {
    return (
      <div className="course-announcements">
        <div className="announcements-empty">
          <h3>No Announcements</h3>
          <p>There are no announcements for this course yet.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="course-announcements">
      <div className="announcements-header">
        <h2 className="announcements-title">Announcements</h2>
        <div className="announcements-filter">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${filter === 'unread' ? 'active' : ''}`}
            onClick={() => setFilter('unread')}
          >
            Unread
          </button>
        </div>
      </div>
      
      {filteredAnnouncements.length === 0 ? (
        <div className="announcements-empty">
          <h3>No Unread Announcements</h3>
          <p>You have read all announcements for this course.</p>
          <button 
            className="btn btn-primary"
            onClick={() => setFilter('all')}
          >
            View All Announcements
          </button>
        </div>
      ) : (
        <div className="announcements-list">
          {filteredAnnouncements.map(announcement => (
            <div 
              key={announcement.id}
              className={`announcement-item ${!announcement.read ? 'unread' : ''}`}
            >
              <div className="announcement-header">
                <h3 className="announcement-title">{announcement.title}</h3>
                {!announcement.read && <div className="unread-indicator"></div>}
              </div>
              
              <div className="announcement-content">
                <p>{announcement.content}</p>
              </div>
              
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
                
                <div className="announcement-date">
                  <span className="date-absolute">
                    {formatDate(announcement.date)}
                  </span>
                  <span className="date-relative">
                    {getRelativeTime(announcement.date)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseAnnouncements;
