/**
 * CourseParticipants Component
 * 
 * Displays the course participants.
 */

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../types/state';
import { fetchParticipants } from '../../actions/courseActions';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

// Import CSS
import './CourseParticipants.css';

interface CourseParticipantsProps {
  courseId: string;
}

interface Participant {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'instructor' | 'assistant' | 'student';
  lastActive?: string;
  progress?: number;
}

const CourseParticipants: React.FC<CourseParticipantsProps> = ({ courseId }) => {
  // State
  const [filter, setFilter] = useState<'all' | 'instructors' | 'students'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Redux
  const dispatch = useDispatch();
  const { participants, loading, error } = useSelector(
    (state: RootState) => state.courses.participants
  );
  
  // Effect to fetch participants
  useEffect(() => {
    dispatch(fetchParticipants(courseId));
  }, [courseId, dispatch]);
  
  // Filter and search participants
  const filteredParticipants = participants.filter(participant => {
    // Filter by role
    if (filter === 'instructors' && participant.role !== 'instructor' && participant.role !== 'assistant') {
      return false;
    }
    if (filter === 'students' && participant.role !== 'student') {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      return (
        participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        participant.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return true;
  });
  
  // Group participants by role
  const instructors = filteredParticipants.filter(
    p => p.role === 'instructor' || p.role === 'assistant'
  );
  const students = filteredParticipants.filter(p => p.role === 'student');
  
  // If loading, show loading state
  if (loading) {
    return <LoadingSpinner message="Loading participants..." />;
  }
  
  // If error, show error state
  if (error) {
    return (
      <ErrorMessage 
        message={error} 
        onRetry={() => dispatch(fetchParticipants(courseId))}
      />
    );
  }
  
  // If no participants, show empty state
  if (participants.length === 0) {
    return (
      <div className="course-participants">
        <div className="participants-empty">
          <h3>No Participants</h3>
          <p>There are no participants in this course yet.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="course-participants">
      <div className="participants-header">
        <h2 className="participants-title">Participants</h2>
        <div className="participants-actions">
          <div className="participants-search">
            <input
              type="text"
              placeholder="Search participants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="search-icon"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          
          <div className="participants-filter">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={`filter-btn ${filter === 'instructors' ? 'active' : ''}`}
              onClick={() => setFilter('instructors')}
            >
              Instructors
            </button>
            <button 
              className={`filter-btn ${filter === 'students' ? 'active' : ''}`}
              onClick={() => setFilter('students')}
            >
              Students
            </button>
          </div>
        </div>
      </div>
      
      {filteredParticipants.length === 0 ? (
        <div className="participants-empty">
          <h3>No Participants Found</h3>
          <p>No participants match your search criteria.</p>
          <button 
            className="btn btn-primary"
            onClick={() => {
              setSearchQuery('');
              setFilter('all');
            }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="participants-content">
          {(filter === 'all' || filter === 'instructors') && instructors.length > 0 && (
            <div className="participant-group">
              <h3 className="participant-group-title">Instructors</h3>
              <div className="participant-list">
                {instructors.map(participant => (
                  <ParticipantCard 
                    key={participant.id}
                    participant={participant}
                  />
                ))}
              </div>
            </div>
          )}
          
          {(filter === 'all' || filter === 'students') && students.length > 0 && (
            <div className="participant-group">
              <h3 className="participant-group-title">Students</h3>
              <div className="participant-list">
                {students.map(participant => (
                  <ParticipantCard 
                    key={participant.id}
                    participant={participant}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

interface ParticipantCardProps {
  participant: Participant;
}

const ParticipantCard: React.FC<ParticipantCardProps> = ({ participant }) => {
  // Format last active date
  const formatLastActive = (dateString?: string): string => {
    if (!dateString) return 'Never';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    
    return date.toLocaleDateString();
  };
  
  // Get role label
  const getRoleLabel = (role: string): string => {
    switch (role) {
      case 'instructor':
        return 'Instructor';
      case 'assistant':
        return 'Teaching Assistant';
      case 'student':
        return 'Student';
      default:
        return role;
    }
  };
  
  return (
    <div className="participant-card">
      <div className="participant-avatar">
        {participant.avatar ? (
          <img 
            src={participant.avatar} 
            alt={participant.name} 
            className="avatar-image" 
          />
        ) : (
          <div className="avatar-placeholder">
            {participant.name.charAt(0)}
          </div>
        )}
      </div>
      
      <div className="participant-info">
        <h4 className="participant-name">{participant.name}</h4>
        <p className="participant-email">{participant.email}</p>
        
        <div className="participant-meta">
          <span className="participant-role">
            {getRoleLabel(participant.role)}
          </span>
          
          {participant.role === 'student' && participant.progress !== undefined && (
            <span className="participant-progress">
              Progress: {participant.progress}%
            </span>
          )}
          
          {participant.lastActive && (
            <span className="participant-last-active">
              Last active: {formatLastActive(participant.lastActive)}
            </span>
          )}
        </div>
      </div>
      
      <div className="participant-actions">
        <button className="btn btn-icon" title="Send message">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CourseParticipants;
