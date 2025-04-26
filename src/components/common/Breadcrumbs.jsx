import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Import CSS
import './Breadcrumbs.css';

/**
 * Breadcrumbs component - Displays navigation breadcrumbs
 */
const Breadcrumbs = ({ location }) => {
  const breadcrumbs = useSelector((state) => state.mainReducer.breadcrumbs);
  
  // If no breadcrumbs, return null
  if (!breadcrumbs || breadcrumbs.length === 0) {
    return null;
  }
  
  return (
    <div className="breadcrumbs">
      <ul className="breadcrumb-list">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          
          return (
            <li key={index} className="breadcrumb-item">
              {isLast ? (
                <span className="breadcrumb-text current">{crumb.name}</span>
              ) : (
                <Link to={crumb.path} className="breadcrumb-link">
                  {crumb.name}
                </Link>
              )}
              {!isLast && <span className="breadcrumb-separator">/</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

Breadcrumbs.propTypes = {
  location: PropTypes.object
};

export default Breadcrumbs;
