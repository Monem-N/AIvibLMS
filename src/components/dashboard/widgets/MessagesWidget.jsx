import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DashboardWidget from '../DashboardWidget';

/**
 * MessagesWidget component - Displays user's messages
 */
const MessagesWidget = ({ messages, loading, error }) => {
  // For now, we'll use hardcoded messages
  const hardcodedMessages = [
    {
      id: 1,
      sender: 'John Smith',
      tags: ['maths', 'test1'],
      content: "I've uploaded the new formulas. Please let me know when you are available to...",
      timestamp: new Date(Date.now() - 3600000) // 1 hour ago
    },
    {
      id: 2,
      sender: 'Martin Lee',
      tags: ['french', 'assignment1'],
      content: "Hi Joan. In the 2nd question, you said 'trais bien' but the correct answer is 'très...",
      timestamp: new Date(Date.now() - 86400000) // 1 day ago
    },
    {
      id: 3,
      sender: 'Morgan Freeman, John Doe',
      tags: ['history', 'assignment2'],
      content: "Hi Joan and John, the result of your assignment is already published. Well done!",
      timestamp: new Date(Date.now() - 172800000) // 2 days ago
    }
  ];
  
  const displayMessages = messages || hardcodedMessages;
  
  return (
    <DashboardWidget 
      title="My Direct Messages" 
      color="#448cd3"
      loading={loading}
      error={error}
    >
      {displayMessages && displayMessages.length > 0 ? (
        <ul className="widget-list">
          {displayMessages.map(message => (
            <li key={message.id} className="widget-list-item">
              <div className="message-item">
                <div className="message-header">
                  <span className="message-sender">{message.sender}</span>
                  <span className="message-time">
                    {message.timestamp ? formatTime(message.timestamp) : ''}
                  </span>
                </div>
                
                {message.tags && message.tags.length > 0 && (
                  <div className="message-tags">
                    {message.tags.map(tag => (
                      <span key={tag} className="message-tag">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
                
                <p className="message-content">{message.content}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="widget-empty">
          <p>You don't have any messages.</p>
        </div>
      )}
      
      <div className="widget-footer">
        <Link to="/messages" className="widget-link">
          View all messages
        </Link>
      </div>
    </DashboardWidget>
  );
};

/**
 * Format timestamp to relative time
 * @param {Date} date - Date to format
 * @returns {string} - Formatted time
 */
const formatTime = (date) => {
  const now = new Date();
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  
  if (diffDay > 0) {
    return diffDay === 1 ? 'Yesterday' : `${diffDay} days ago`;
  }
  
  if (diffHour > 0) {
    return `${diffHour} ${diffHour === 1 ? 'hour' : 'hours'} ago`;
  }
  
  if (diffMin > 0) {
    return `${diffMin} ${diffMin === 1 ? 'minute' : 'minutes'} ago`;
  }
  
  return 'Just now';
};

MessagesWidget.propTypes = {
  messages: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.string
};

export default MessagesWidget;
