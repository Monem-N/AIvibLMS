/**
 * MessagesWidget Component
 * 
 * Widget for displaying user's messages on the dashboard.
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardWidget from '../DashboardWidget';
import { formatDate } from '../../../utils/dateUtils';

// Import CSS
import './MessagesWidget.css';

interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  subject: string;
  content: string;
  date: string;
  read: boolean;
}

interface MessagesWidgetProps {
  messages: Message[];
  className?: string;
}

const MessagesWidget: React.FC<MessagesWidgetProps> = ({ messages, className = '' }) => {
  // State
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Sort messages by date (newest first)
  const sortedMessages = [...messages].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  // Get unread messages count
  const unreadCount = messages.filter(message => !message.read).length;
  
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
      console.error('Error refreshing messages:', error);
      setError('Failed to refresh messages. Please try again later.');
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
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  );
  
  // Widget footer
  const footer = (
    <Link to="/messages" className="widget-link">
      View All Messages
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
      title={`Messages ${unreadCount > 0 ? `(${unreadCount})` : ''}`}
      icon={icon}
      className={`messages-widget ${className}`}
      loading={isLoading}
      error={error}
      onRefresh={handleRefresh}
      footer={footer}
      color="#3498db"
    >
      {sortedMessages.length === 0 ? (
        <div className="messages-empty">
          <p>No messages.</p>
          <Link to="/messages/compose" className="btn btn-primary">
            Compose Message
          </Link>
        </div>
      ) : (
        <div className="messages-list">
          {sortedMessages.slice(0, 5).map(message => (
            <MessageItem key={message.id} message={message} />
          ))}
        </div>
      )}
    </DashboardWidget>
  );
};

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  // Format date
  const formattedDate = formatDate(message.date);
  
  // Truncate content
  const truncateContent = (content: string, maxLength: number = 60) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };
  
  return (
    <Link to={`/messages/${message.id}`} className={`message-item ${!message.read ? 'unread' : ''}`}>
      <div className="message-sender">
        {message.sender.avatar ? (
          <img 
            src={message.sender.avatar} 
            alt={message.sender.name} 
            className="sender-avatar" 
          />
        ) : (
          <div className="sender-avatar-placeholder">
            {message.sender.name.charAt(0)}
          </div>
        )}
      </div>
      
      <div className="message-content">
        <div className="message-header">
          <span className="sender-name">{message.sender.name}</span>
          <span className="message-date">{formattedDate}</span>
        </div>
        
        <h4 className="message-subject">{message.subject}</h4>
        <p className="message-preview">{truncateContent(message.content)}</p>
      </div>
      
      {!message.read && <div className="unread-indicator"></div>}
    </Link>
  );
};

export default MessagesWidget;
