import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFirebase } from '../../hooks/useFirebase';
import SubjectWidget from './widgets/SubjectWidget';
import ActivityWidget from './widgets/ActivityWidget';
import MessagesWidget from './widgets/MessagesWidget';
import DashboardWidget from './DashboardWidget';
import Icon from '../../common/Icon';
import Info from '../../../assets/svg/info.svg';

// Import CSS
import './Dashboard.css';
import './widgets/Widgets.css';

/**
 * ModernDashboardPage component - Modern dashboard page with widgets
 */
const ModernDashboardPage = () => {
  // State
  const [subjects, setSubjects] = useState([]);
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Redux
  const user = useSelector(state => state.mainReducer.user);
  
  // Firebase data
  const { data: usersData, isLoaded: isUsersLoaded, error: usersError } = useFirebase('users');
  const { data: subjectsData, isLoaded: isSubjectsLoaded, error: subjectsError } = useFirebase('subjects');
  const { data: activitiesData, isLoaded: isActivitiesLoaded, error: activitiesError } = useFirebase('activities');
  
  // Colors for widgets
  const colors = [
    '#2ecc71',
    '#e8303f',
    '#122d59',
    '#448cd3',
    '#445f8c',
    '#ffdd00',
    '#f0ad4e',
    '#a83fd0'
  ];
  
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
    if (isUsersLoaded && isSubjectsLoaded && isActivitiesLoaded) {
      if (usersError || subjectsError || activitiesError) {
        setError(usersError || subjectsError || activitiesError);
        setIsLoading(false);
        return;
      }
      
      if (usersData && subjectsData && activitiesData && user) {
        try {
          // Process subjects
          const userCourses = usersData[user.uid]?.courses || {};
          const processedSubjects = [];
          const processedActivities = [];
          
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
              if (subject.activities) {
                subject.activities.forEach(activityId => {
                  const activity = activitiesData[activityId];
                  if (activity) {
                    processedActivities.push({
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
                color: colors[index % colors.length]
              });
            });
          });
          
          setSubjects(processedSubjects);
          setActivities(processedActivities);
          setIsLoading(false);
        } catch (err) {
          setError('Error processing dashboard data');
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    }
  }, [isUsersLoaded, isSubjectsLoaded, isActivitiesLoaded, usersData, subjectsData, activitiesData, user, colors, usersError, subjectsError, activitiesError]);
  
  return (
    <section className="dashboard page">
      <div className="page-wrapper">
        <div className="announcement">
          <Icon glyph={Info} />
          From August 15th 23:00pm until August 16th 8am, the website will be offline due to maintenance works. Apologies for the trouble.
        </div>
        
        <div className="dashboard-grid">
          {/* First row */}
          <div className="dashboard-row">
            <SubjectWidget 
              subjects={subjects} 
              loading={isLoading} 
              error={error} 
            />
            
            <ActivityWidget 
              activities={activities} 
              loading={isLoading} 
              error={error} 
            />
            
            <MessagesWidget 
              loading={isLoading} 
              error={error} 
            />
          </div>
          
          {/* Second row */}
          <div className="dashboard-row">
            <DashboardWidget 
              title="Upcoming Deadlines" 
              color="#f0ad4e"
              loading={isLoading}
              error={error}
            >
              <p>Coming soon...</p>
            </DashboardWidget>
            
            <DashboardWidget 
              title="Recent Grades" 
              color="#a83fd0"
              loading={isLoading}
              error={error}
            >
              <p>Coming soon...</p>
            </DashboardWidget>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernDashboardPage;
