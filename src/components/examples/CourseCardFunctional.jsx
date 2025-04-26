import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourseDetails } from '../../actions/courseActions';

/**
 * CourseCard component (Functional)
 * This is the converted version of the class-based CourseCardClass component.
 */
const CourseCardFunctional = ({ courseId, title, description }) => {
  // State
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);
  const [visible, setVisible] = useState(false);
  
  // Refs
  const cardRef = useRef(null);
  const timerRef = useRef(null);
  
  // Redux
  const details = useSelector(state => state.courses.details[courseId]);
  const dispatch = useDispatch();
  
  // Effects
  useEffect(() => {
    // Fetch course details on mount
    fetchDetails();
    
    // Replace jQuery fadeIn with CSS transition
    setVisible(true);
    
    // Cleanup function (componentWillUnmount)
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);
  
  // Fetch details when courseId changes (componentDidUpdate)
  useEffect(() => {
    fetchDetails();
  }, [courseId]);
  
  // Methods
  const fetchDetails = () => {
    setLoading(true);
    dispatch(fetchCourseDetails(courseId))
      .then(() => {
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching course details:', error);
        setLoading(false);
      });
  };
  
  const toggleExpanded = () => {
    setExpanded(prevExpanded => !prevExpanded);
  };
  
  const handleEnroll = () => {
    // Replace jQuery addClass with React state
    setEnrolled(true);
    
    // Set a timer to hide the confirmation
    timerRef.current = setTimeout(() => {
      setEnrolled(false);
    }, 3000);
  };
  
  // Render
  return (
    <div 
      ref={cardRef}
      className={`course-card ${expanded ? 'expanded' : 'collapsed'} ${visible ? 'visible' : ''} ${enrolled ? 'enrolled' : ''}`}
    >
      <div className="card-header" onClick={toggleExpanded}>
        <h3>{title}</h3>
        <span className="expand-icon">{expanded ? '▼' : '►'}</span>
      </div>
      
      <p className="description">{description}</p>
      
      {expanded && (
        <div className="card-details">
          {loading ? (
            <div className="loading">Loading details...</div>
          ) : details && (
            <>
              <div className="details-row">
                <span className="label">Instructor:</span>
                <span className="value">{details.instructor}</span>
              </div>
              <div className="details-row">
                <span className="label">Duration:</span>
                <span className="value">{details.duration}</span>
              </div>
              <div className="details-row">
                <span className="label">Level:</span>
                <span className="value">{details.level}</span>
              </div>
              <div className="details-row">
                <span className="label">Rating:</span>
                <span className="value">{details.rating} / 5</span>
              </div>
              
              <button 
                className="enroll-button"
                onClick={handleEnroll}
              >
                Enroll Now
              </button>
              
              {enrolled && (
                <div className="enrollment-confirmation">
                  You have successfully enrolled in this course!
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

CourseCardFunctional.propTypes = {
  courseId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string
};

export default CourseCardFunctional;
