/**
 * CourseEditorForm Component
 * 
 * Form for editing course details.
 */

import React from 'react';
import { Course } from '../../../types/course';

// Import CSS
import './CourseEditorForm.css';

interface CourseEditorFormProps {
  courseData: Partial<Course>;
  onChange: (field: string, value: any) => void;
}

const CourseEditorForm: React.FC<CourseEditorFormProps> = ({ 
  courseData, 
  onChange 
}) => {
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange(name, value);
  };
  
  // Handle date change
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange(name, value ? new Date(value).toISOString() : '');
  };
  
  // Format date for input
  const formatDateForInput = (dateString?: string): string => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    } catch (error) {
      return '';
    }
  };
  
  return (
    <div className="course-editor-form">
      <div className="form-section">
        <h2 className="section-title">Basic Information</h2>
        
        <div className="form-group">
          <label htmlFor="title">Course Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={courseData.title || ''}
            onChange={handleInputChange}
            placeholder="Enter course title"
            required
          />
          <div className="form-hint">
            A clear, descriptive title for your course
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Course Description *</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={courseData.description || ''}
            onChange={handleInputChange}
            placeholder="Enter course description"
            rows={5}
            required
          ></textarea>
          <div className="form-hint">
            Provide a detailed description of what students will learn
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              className="form-control"
              value={courseData.category || ''}
              onChange={handleInputChange}
            >
              <option value="">Select a category</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science</option>
              <option value="Humanities">Humanities</option>
              <option value="Business">Business</option>
              <option value="Arts">Arts</option>
              <option value="Language">Language</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="level">Difficulty Level</label>
            <select
              id="level"
              name="level"
              className="form-control"
              value={courseData.level || 'beginner'}
              onChange={handleInputChange}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="form-section">
        <h2 className="section-title">Schedule</h2>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              className="form-control"
              value={formatDateForInput(courseData.startDate)}
              onChange={handleDateChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              className="form-control"
              value={formatDateForInput(courseData.endDate)}
              onChange={handleDateChange}
            />
          </div>
        </div>
        
        <div className="form-hint">
          Leave dates empty for self-paced courses
        </div>
      </div>
      
      <div className="form-section">
        <h2 className="section-title">Additional Information</h2>
        
        <div className="form-group">
          <label htmlFor="thumbnail">Thumbnail URL</label>
          <input
            type="url"
            id="thumbnail"
            name="thumbnail"
            className="form-control"
            value={courseData.thumbnail || ''}
            onChange={handleInputChange}
            placeholder="Enter thumbnail URL"
          />
          <div className="form-hint">
            URL to an image that represents your course
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="duration">Duration</label>
            <input
              type="text"
              id="duration"
              name="duration"
              className="form-control"
              value={courseData.duration || ''}
              onChange={handleInputChange}
              placeholder="e.g., 8 weeks"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="credits">Credits</label>
            <input
              type="number"
              id="credits"
              name="credits"
              className="form-control"
              value={courseData.credits || ''}
              onChange={handleInputChange}
              placeholder="e.g., 3"
              min="0"
              step="1"
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="syllabus">Syllabus</label>
          <textarea
            id="syllabus"
            name="syllabus"
            className="form-control"
            value={courseData.syllabus || ''}
            onChange={handleInputChange}
            placeholder="Enter course syllabus"
            rows={5}
          ></textarea>
          <div className="form-hint">
            Outline the topics covered in your course
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="prerequisites">Prerequisites</label>
          <textarea
            id="prerequisites"
            name="prerequisites"
            className="form-control"
            value={Array.isArray(courseData.prerequisites) ? courseData.prerequisites.join('\n') : ''}
            onChange={(e) => {
              const value = e.target.value;
              const prerequisites = value ? value.split('\n').filter(item => item.trim()) : [];
              onChange('prerequisites', prerequisites);
            }}
            placeholder="Enter prerequisites (one per line)"
            rows={3}
          ></textarea>
          <div className="form-hint">
            List any knowledge or courses required before taking this course
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseEditorForm;
