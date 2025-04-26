import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import DashboardWidget from '../DashboardWidget';

/**
 * ActivityWidget component - Displays user's current activities
 */
const ActivityWidget = ({ activities, loading, error }) => {
  return (
    <DashboardWidget 
      title="My Current Activities" 
      color="#e8303f"
      loading={loading}
      error={error}
    >
      {activities && activities.length > 0 ? (
        <ul className="widget-list">
          {activities.map(activity => (
            <li key={activity.id} className="widget-list-item">
              <div className="activity-item">
                <Link to={`/activities/${activity.slug}`} className="activity-title">
                  {activity.title}
                </Link>
                <div className="activity-meta">
                  <span className="activity-date">
                    Due: {moment(activity.endDate).format('MMM D, YYYY')}
                  </span>
                  {activity.type && (
                    <span className={`activity-type activity-type-${activity.type}`}>
                      {activity.type}
                    </span>
                  )}
                </div>
                {activity.description && (
                  <p className="activity-description">{activity.description}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="widget-empty">
          <p>You don't have any current activities.</p>
        </div>
      )}
    </DashboardWidget>
  );
};

ActivityWidget.propTypes = {
  activities: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.string
};

export default ActivityWidget;
