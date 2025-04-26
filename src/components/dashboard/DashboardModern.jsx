import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useFirebase } from '../../hooks/useFirebase';
import Icon from '../../common/Icon';

// Import SVG icons
import Info from '../../../assets/svg/info.svg';
import Teacher from '../../../assets/svg/professor.svg';
import Chat from '../../../assets/svg/chat.svg';

// Import CSS
import './Dashboard.css';

/**
 * DashboardModern component - User dashboard page
 * Modernized version without jQuery dependencies
 */
const DashboardModern = ({ colors }) => {
  // State
  const [subjects, setSubjects] = useState([]);
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Redux
  const user = useSelector(state => state.mainReducer.user);
  
  // Firebase data
  const { data: usersData, isLoaded: isUsersLoaded } = useFirebase('users');
  const { data: subjectsData, isLoaded: isSubjectsLoaded } = useFirebase('subjects');
  const { data: activitiesData, isLoaded: isActivitiesLoaded } = useFirebase('activities');
  
  // Effect to set page class
  useEffect(() => {
    // Update page class
    const mainElement = document.querySelector('.js-main');
    if (mainElement) {
      mainElement.className = 'main js-main dashboard-page';
    }
    
    // Cleanup function
    return () => {
      // Reset class if needed
    };
  }, []);
  
  // Effect to process data when loaded
  useEffect(() => {
    if (isUsersLoaded && isSubjectsLoaded && isActivitiesLoaded && 
        usersData && subjectsData && activitiesData && user) {
      
      // Process subjects
      const userCourses = usersData[user.uid]?.courses || {};
      const processedSubjects = [];
      
      Object.keys(userCourses).forEach(courseKey => {
        const course = userCourses[courseKey];
        
        Object.keys(course).forEach((subjectKey, index) => {
          const subject = subjectsData[subjectKey];
          if (!subject) return;
          
          // Process teachers
          let teachersText = '';
          if (subject.teachers) {
            teachersText = subject.teachers.map(teacherId => {
              const teacher = usersData[teacherId];
              if (teacher) {
                return `${teacher.info.firstName} ${teacher.info.lastName1}`;
              }
              return '';
            }).filter(Boolean).join(', ');
          }
          
          // Process activities
          const subjectActivities = [];
          if (subject.activities) {
            subject.activities.forEach(activityId => {
              const activity = activitiesData[activityId];
              if (activity) {
                subjectActivities.push({
                  id: activityId,
                  ...activity,
                  color: colors[index % colors.length]
                });
              }
            });
          }
          
          // Add to processed subjects
          processedSubjects.push({
            id: subjectKey,
            ...subject,
            teachers: teachersText,
            activities: subjectActivities,
            color: colors[index % colors.length]
          });
          
          // Add activities to the activities list
          setActivities(prev => [...prev, ...subjectActivities]);
        });
      });
      
      setSubjects(processedSubjects);
      setIsLoading(false);
    }
  }, [isUsersLoaded, isSubjectsLoaded, isActivitiesLoaded, usersData, subjectsData, activitiesData, user, colors]);
  
  return (
    <section className="dashboard page">
      {isLoading ? (
        <div className="loader-small" />
      ) : (
        <div className="page-wrapper">
          <div className="announcement">
            <Icon glyph={Info} />
            From August 15th 23:00pm until August 16th 8am, the website will be offline due to maintenance works. Apologies for the trouble. (Hardcoded)
          </div>
          
          <div className="columns">
            {/* Subjects Column */}
            <div className="column">
              <h1 className="dashboard-title">My subjects</h1>
              <ul className="items-list">
                {subjects.length > 0 ? (
                  subjects.map(subject => (
                    <li
                      key={subject.id}
                      className="item"
                      style={{ borderLeftColor: subject.color }}
                    >
                      <Link to={`/subjects/${subject.slug}`}>{subject.title}</Link>
                      <div className="teachers">
                        <Icon glyph={Teacher} />
                        {subject.teachers}
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="empty-list">None</li>
                )}
              </ul>
            </div>
            
            {/* Activities Column */}
            <div className="column">
              <h1 className="dashboard-title">My current activities</h1>
              <ul className="items-list">
                {activities.length > 0 ? (
                  activities.map(activity => (
                    <li
                      key={activity.id}
                      className="item"
                      style={{ borderLeftColor: activity.color }}
                    >
                      <Link to={`/activities/${activity.slug}`}>{activity.title}</Link>
                      <div className="date">
                        {moment(activity.endDate).format('D MMMM YYYY')}
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="empty-list">None</li>
                )}
              </ul>
            </div>
            
            {/* Messages Column (Hardcoded) */}
            <div className="column">
              <h1 className="dashboard-title">My direct messages (Hardcoded)</h1>
              <ul className="items-list">
                <li className="item">
                  <div>John Smith</div>
                  <div>#maths #test1</div>
                  <div>I've uploaded the new formulas. Please let me know when you are available to...</div>
                </li>
                <li className="item">
                  <div>Martin Lee</div>
                  <div>#french #assignment1</div>
                  <div>Hi Joan. In the 2nd question, you said 'trais bien' but the correct answer is 'très...</div>
                </li>
                <li className="item">
                  <div>Morgan Freeman, John Doe</div>
                  <div>#history #assignment2</div>
                  <div>Hi Joan and John, the result of your assignment is already published. Well done!</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

DashboardModern.propTypes = {
  colors: PropTypes.array
};

DashboardModern.defaultProps = {
  colors: [
    '#2ecc71',
    '#e8303f',
    '#122d59',
    '#448cd3',
    '#445f8c',
    '#ffdd00',
    '#f0ad4e',
    '#a83fd0'
  ]
};

export default DashboardModern;
