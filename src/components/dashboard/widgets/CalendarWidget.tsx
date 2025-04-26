/**
 * CalendarWidget Component
 * 
 * Widget for displaying user's upcoming events on the dashboard.
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardWidget from '../DashboardWidget';
import { formatDate, formatTime } from '../../../utils/dateUtils';

// Import CSS
import './CalendarWidget.css';

interface Event {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate?: string;
  location?: string;
  type: 'class' | 'assignment' | 'exam' | 'meeting' | 'other';
  courseId?: string;
  courseName?: string;
}

interface CalendarWidgetProps {
  events: Event[];
  className?: string;
}

const CalendarWidget: React.FC<CalendarWidgetProps> = ({ events, className = '' }) => {
  // State
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Get today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Get upcoming events (starting from today, sorted by date)
  const upcomingEvents = events
    .filter(event => new Date(event.startDate) >= today)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, 5);
  
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
      console.error('Error refreshing calendar:', error);
      setError('Failed to refresh calendar. Please try again later.');
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
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  );
  
  // Widget footer
  const footer = (
    <Link to="/calendar" className="widget-link">
      View Full Calendar
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
      title="Upcoming Events"
      icon={icon}
      className={`calendar-widget ${className}`}
      loading={isLoading}
      error={error}
      onRefresh={handleRefresh}
      footer={footer}
      color="#9b59b6"
    >
      {upcomingEvents.length === 0 ? (
        <div className="events-empty">
          <p>No upcoming events.</p>
          <Link to="/calendar/add" className="btn btn-primary">
            Add Event
          </Link>
        </div>
      ) : (
        <div className="events-list">
          {upcomingEvents.map(event => (
            <EventItem key={event.id} event={event} />
          ))}
        </div>
      )}
    </DashboardWidget>
  );
};

interface EventItemProps {
  event: Event;
}

const EventItem: React.FC<EventItemProps> = ({ event }) => {
  // Format date and time
  const formattedDate = formatDate(event.startDate);
  const formattedTime = event.endDate 
    ? `${formatTime(event.startDate)} - ${formatTime(event.endDate)}`
    : formatTime(event.startDate);
  
  // Get event type icon
  const getEventTypeIcon = () => {
    switch (event.type) {
      case 'class':
        return (
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
            className="event-icon class"
          >
            <path d="M3 3v18h18"></path>
            <path d="M18.4 3a9 9 0 0 1 0 18"></path>
            <path d="M13 3a5 5 0 0 1 0 10"></path>
          </svg>
        );
      case 'assignment':
        return (
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
            className="event-icon assignment"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        );
      case 'exam':
        return (
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
            className="event-icon exam"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
        );
      case 'meeting':
        return (
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
            className="event-icon meeting"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        );
      default:
        return (
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
            className="event-icon other"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        );
    }
  };
  
  return (
    <Link to={`/calendar/event/${event.id}`} className="event-item">
      <div className="event-date">
        <div className="date-day">
          {new Date(event.startDate).getDate()}
        </div>
        <div className="date-month">
          {new Date(event.startDate).toLocaleString('default', { month: 'short' })}
        </div>
      </div>
      
      <div className="event-details">
        <div className="event-header">
          <h4 className="event-title">{event.title}</h4>
          <div className="event-type">
            {getEventTypeIcon()}
            <span className="event-type-text">{event.type}</span>
          </div>
        </div>
        
        <div className="event-meta">
          <div className="event-time">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>{formattedTime}</span>
          </div>
          
          {event.location && (
            <div className="event-location">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>{event.location}</span>
            </div>
          )}
          
          {event.courseName && (
            <div className="event-course">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
              <span>{event.courseName}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CalendarWidget;
