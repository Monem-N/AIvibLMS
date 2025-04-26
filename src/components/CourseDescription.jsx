import React from 'react';

/**
 * VULNERABLE COMPONENT - DO NOT USE IN PRODUCTION
 * This component has XSS vulnerabilities and is for demonstration purposes only.
 */
const CourseDescription = ({ course }) => {
  if (!course) return null;

  return (
    <div className="course-description">
      <h2>{course.title}</h2>
      
      {/* XSS Vulnerability: Directly inserting HTML from user input */}
      <div dangerouslySetInnerHTML={{ __html: course.description }} />
      
      <div className="course-meta">
        <p>Instructor: {course.instructor}</p>
        <p>Duration: {course.duration}</p>
        
        {/* XSS Vulnerability: Using innerHTML via ref */}
        <div ref={(el) => {
          if (el) {
            el.innerHTML = course.requirements;
          }
        }} />
      </div>
      
      {/* XSS Vulnerability: Evaluating user input */}
      <button onClick={() => {
        // eslint-disable-next-line no-eval
        eval(`alert('${course.title} clicked!')`);
      }}>
        Enroll Now
      </button>
    </div>
  );
};

export default CourseDescription;
