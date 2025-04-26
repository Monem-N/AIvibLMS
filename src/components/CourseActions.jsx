import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { hasPermission, isOwner } from '../utils/auth';

/**
 * CourseActions component that displays actions based on user permissions
 * 
 * @param {Object} props - Component props
 * @param {Object} props.course - The course object
 * @returns {React.ReactNode} - The component
 */
const CourseActions = ({ course }) => {
  const { user } = useAuth();
  
  // If no user or no course, don't render anything
  if (!user || !course) return null;
  
  // Check if user can edit the course
  const canEdit = hasPermission(user, 'write:courses') || isOwner(user, course.createdBy);
  
  // Check if user can delete the course
  const canDelete = hasPermission(user, 'manage:courses');
  
  // Check if user can enroll students
  const canEnrollStudents = hasPermission(user, 'manage:courses') || isOwner(user, course.createdBy);
  
  return (
    <div className="course-actions">
      {canEdit && (
        <Link to={`/courses/${course.id}/edit`} className="btn btn-primary">
          Edit Course
        </Link>
      )}
      
      {canDelete && (
        <button 
          className="btn btn-danger"
          onClick={() => {
            if (window.confirm('Are you sure you want to delete this course?')) {
              // Delete course logic here
              console.log('Deleting course:', course.id);
            }
          }}
        >
          Delete Course
        </button>
      )}
      
      {canEnrollStudents && (
        <Link to={`/courses/${course.id}/students`} className="btn btn-secondary">
          Manage Students
        </Link>
      )}
    </div>
  );
};

export default CourseActions;
