/**
 * ErrorMessage Component
 * 
 * Displays an error message with an optional retry button.
 */

import React from 'react';

// Import CSS
import './ErrorMessage.css';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="error-container">
      <div className="error-icon">!</div>
      <h3 className="error-title">Error</h3>
      <p className="error-message">{message}</p>
      {onRetry && (
        <button 
          className="btn btn-primary"
          onClick={onRetry}
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
