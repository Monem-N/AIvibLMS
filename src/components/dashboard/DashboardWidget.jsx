import React from 'react';
import PropTypes from 'prop-types';
import './DashboardWidget.css';

/**
 * DashboardWidget component - Reusable widget for dashboard
 */
const DashboardWidget = ({ 
  title, 
  children, 
  color = '#2196f3',
  className = '',
  loading = false,
  error = null,
  onRefresh = null
}) => {
  return (
    <div className={`dashboard-widget ${className}`}>
      <div className="widget-header" style={{ borderTopColor: color }}>
        <h2 className="widget-title">{title}</h2>
        {onRefresh && (
          <button 
            className="widget-refresh" 
            onClick={onRefresh}
            aria-label="Refresh widget"
          >
            <svg viewBox="0 0 24 24" width="16" height="16">
              <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
            </svg>
          </button>
        )}
      </div>
      
      <div className="widget-content">
        {loading ? (
          <div className="widget-loading">
            <div className="widget-spinner" />
            <span>Loading...</span>
          </div>
        ) : error ? (
          <div className="widget-error">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
            <span>{error}</span>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

DashboardWidget.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  color: PropTypes.string,
  className: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.string,
  onRefresh: PropTypes.func
};

export default DashboardWidget;
