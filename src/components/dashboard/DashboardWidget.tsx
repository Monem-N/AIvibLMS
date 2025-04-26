/**
 * DashboardWidget Component
 * 
 * Base component for dashboard widgets.
 * Provides a consistent layout and styling for all widgets.
 */

import React, { ReactNode } from 'react';

// Import CSS
import './DashboardWidget.css';

interface DashboardWidgetProps {
  title: string;
  icon?: ReactNode;
  className?: string;
  children?: ReactNode;
  loading?: boolean;
  error?: string | null;
  onRefresh?: () => void;
  color?: string;
  footer?: ReactNode;
}

const DashboardWidget: React.FC<DashboardWidgetProps> = ({
  title,
  icon,
  className = '',
  children,
  loading = false,
  error = null,
  onRefresh,
  color = '#4a90e2',
  footer
}) => {
  return (
    <div className={`dashboard-widget ${className}`}>
      <div 
        className="widget-header"
        style={{ borderTopColor: color }}
      >
        <div className="widget-title">
          {icon && <span className="widget-icon">{icon}</span>}
          <h3>{title}</h3>
        </div>
        
        {onRefresh && (
          <button 
            className="widget-refresh"
            onClick={onRefresh}
            aria-label="Refresh widget"
          >
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
              <path d="M23 4v6h-6"></path>
              <path d="M1 20v-6h6"></path>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"></path>
              <path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14"></path>
            </svg>
          </button>
        )}
      </div>
      
      <div className="widget-content">
        {loading ? (
          <div className="widget-loading">
            <div className="widget-spinner"></div>
            <p>Loading...</p>
          </div>
        ) : error ? (
          <div className="widget-error">
            <div className="error-icon">!</div>
            <p>{error}</p>
          </div>
        ) : (
          children
        )}
      </div>
      
      {footer && (
        <div className="widget-footer">
          {footer}
        </div>
      )}
    </div>
  );
};

export default DashboardWidget;
