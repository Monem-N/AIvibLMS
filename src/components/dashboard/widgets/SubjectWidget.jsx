import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Icon from '../../../common/Icon';
import Teacher from '../../../../assets/svg/professor.svg';
import DashboardWidget from '../DashboardWidget';

/**
 * SubjectWidget component - Displays user's subjects
 */
const SubjectWidget = ({ subjects, loading, error }) => {
  return (
    <DashboardWidget 
      title="My Subjects" 
      color="#2ecc71"
      loading={loading}
      error={error}
    >
      {subjects && subjects.length > 0 ? (
        <ul className="widget-list">
          {subjects.map(subject => (
            <li 
              key={subject.id} 
              className="widget-list-item"
              style={{ borderLeftColor: subject.color }}
            >
              <div className="subject-item">
                <Link to={`/subjects/${subject.slug}`} className="subject-title">
                  {subject.title}
                </Link>
                {subject.teachers && (
                  <div className="subject-teachers">
                    <Icon glyph={Teacher} className="teacher-icon" />
                    <span>{subject.teachers}</span>
                  </div>
                )}
                {subject.description && (
                  <p className="subject-description">{subject.description}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="widget-empty">
          <p>You are not enrolled in any subjects.</p>
        </div>
      )}
    </DashboardWidget>
  );
};

SubjectWidget.propTypes = {
  subjects: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.string
};

export default SubjectWidget;
