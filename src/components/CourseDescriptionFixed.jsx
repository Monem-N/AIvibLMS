import React from 'react';
import DOMPurify from 'dompurify';

/**
 * FIXED COMPONENT - Safe to use in production
 * This component addresses the XSS vulnerabilities in the original CourseDescription component.
 */
const CourseDescriptionFixed = ({ course }) => {
  if (!course) return null;

  // Function to safely handle click events
  const handleEnrollClick = () => {
    // Safe way to handle user input in event handlers
    console.log(`${course.title} clicked!`);
    // Perform enrollment logic here
  };

  return (
    <div className="course-description">
      <h2>{course.title}</h2>
      
      {/* FIXED: Sanitize HTML before rendering */}
      <div 
        dangerouslySetInnerHTML={{ 
          __html: DOMPurify.sanitize(course.description, { 
            ALLOWED_TAGS: ['p', 'b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li'],
            ALLOWED_ATTR: ['href', 'target', 'rel']
          }) 
        }} 
      />
      
      <div className="course-meta">
        <p>Instructor: {course.instructor}</p>
        <p>Duration: {course.duration}</p>
        
        {/* FIXED: Sanitize HTML and use dangerouslySetInnerHTML properly */}
        <div 
          dangerouslySetInnerHTML={{ 
            __html: DOMPurify.sanitize(course.requirements, {
              ALLOWED_TAGS: ['p', 'ul', 'ol', 'li'],
              ALLOWED_ATTR: []
            })
          }} 
        />
      </div>
      
      {/* FIXED: Don't use eval, use proper event handlers */}
      <button onClick={handleEnrollClick}>
        Enroll Now
      </button>
    </div>
  );
};

export default CourseDescriptionFixed;
