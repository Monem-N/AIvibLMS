/**
 * CourseEditorSettings Component
 * 
 * Component for editing course settings.
 */

import React from 'react';
import { Course } from '../../../types/course';

// Import CSS
import './CourseEditorSettings.css';

interface CourseEditorSettingsProps {
  courseData: Partial<Course>;
  onChange: (field: string, value: any) => void;
}

const CourseEditorSettings: React.FC<CourseEditorSettingsProps> = ({ 
  courseData, 
  onChange 
}) => {
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange(name, value);
  };
  
  // Handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    onChange(name, checked);
  };
  
  return (
    <div className="course-editor-settings">
      <div className="form-section">
        <h2 className="section-title">Enrollment Settings</h2>
        
        <div className="form-group">
          <label htmlFor="enrollmentType">Enrollment Type</label>
          <select
            id="enrollmentType"
            name="enrollmentType"
            className="form-control"
            value={courseData.enrollmentType || 'open'}
            onChange={handleInputChange}
          >
            <option value="open">Open (Anyone can enroll)</option>
            <option value="invite">Invite Only</option>
            <option value="approval">Requires Approval</option>
          </select>
          <div className="form-hint">
            Control how students can enroll in your course
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="maxEnrollment">Maximum Enrollment</label>
          <input
            type="number"
            id="maxEnrollment"
            name="maxEnrollment"
            className="form-control"
            value={courseData.maxEnrollment || ''}
            onChange={handleInputChange}
            placeholder="Leave empty for unlimited"
            min="1"
          />
          <div className="form-hint">
            Set a limit on the number of students who can enroll
          </div>
        </div>
        
        <div className="form-check">
          <input
            type="checkbox"
            id="selfPaced"
            name="selfPaced"
            className="form-check-input"
            checked={courseData.selfPaced || false}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="selfPaced" className="form-check-label">
            Self-Paced Course
          </label>
          <div className="form-hint">
            Students can progress through the course at their own pace
          </div>
        </div>
      </div>
      
      <div className="form-section">
        <h2 className="section-title">Visibility Settings</h2>
        
        <div className="form-group">
          <label htmlFor="visibility">Course Visibility</label>
          <select
            id="visibility"
            name="visibility"
            className="form-control"
            value={courseData.visibility || 'public'}
            onChange={handleInputChange}
          >
            <option value="public">Public (Visible to everyone)</option>
            <option value="unlisted">Unlisted (Accessible with link)</option>
            <option value="private">Private (Visible to enrolled students only)</option>
          </select>
          <div className="form-hint">
            Control who can see your course in the course catalog
          </div>
        </div>
        
        <div className="form-check">
          <input
            type="checkbox"
            id="featured"
            name="featured"
            className="form-check-input"
            checked={courseData.featured || false}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="featured" className="form-check-label">
            Featured Course
          </label>
          <div className="form-hint">
            Feature this course on the homepage (requires admin approval)
          </div>
        </div>
      </div>
      
      <div className="form-section">
        <h2 className="section-title">Completion Settings</h2>
        
        <div className="form-group">
          <label htmlFor="completionCriteria">Completion Criteria</label>
          <select
            id="completionCriteria"
            name="completionCriteria"
            className="form-control"
            value={courseData.completionCriteria || 'all-activities'}
            onChange={handleInputChange}
          >
            <option value="all-activities">Complete All Activities</option>
            <option value="required-activities">Complete Required Activities Only</option>
            <option value="percentage">Complete Percentage of Activities</option>
            <option value="final-exam">Pass Final Exam</option>
          </select>
          <div className="form-hint">
            Define how students complete this course
          </div>
        </div>
        
        {courseData.completionCriteria === 'percentage' && (
          <div className="form-group">
            <label htmlFor="completionPercentage">Completion Percentage</label>
            <input
              type="number"
              id="completionPercentage"
              name="completionPercentage"
              className="form-control"
              value={courseData.completionPercentage || 80}
              onChange={handleInputChange}
              min="1"
              max="100"
            />
            <div className="form-hint">
              Percentage of activities that must be completed
            </div>
          </div>
        )}
        
        <div className="form-check">
          <input
            type="checkbox"
            id="certificateEnabled"
            name="certificateEnabled"
            className="form-check-input"
            checked={courseData.certificateEnabled || false}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="certificateEnabled" className="form-check-label">
            Enable Course Certificate
          </label>
          <div className="form-hint">
            Students will receive a certificate upon course completion
          </div>
        </div>
      </div>
      
      <div className="form-section">
        <h2 className="section-title">Advanced Settings</h2>
        
        <div className="form-group">
          <label htmlFor="language">Course Language</label>
          <select
            id="language"
            name="language"
            className="form-control"
            value={courseData.language || 'en'}
            onChange={handleInputChange}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="it">Italian</option>
            <option value="pt">Portuguese</option>
            <option value="ru">Russian</option>
            <option value="zh">Chinese</option>
            <option value="ja">Japanese</option>
            <option value="ko">Korean</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="tags">Course Tags</label>
          <input
            type="text"
            id="tags"
            name="tags"
            className="form-control"
            value={Array.isArray(courseData.tags) ? courseData.tags.join(', ') : ''}
            onChange={(e) => {
              const value = e.target.value;
              const tags = value ? value.split(',').map(tag => tag.trim()).filter(tag => tag) : [];
              onChange('tags', tags);
            }}
            placeholder="Enter tags separated by commas"
          />
          <div className="form-hint">
            Tags help students find your course
          </div>
        </div>
        
        <div className="form-check">
          <input
            type="checkbox"
            id="discussionEnabled"
            name="discussionEnabled"
            className="form-check-input"
            checked={courseData.discussionEnabled || true}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="discussionEnabled" className="form-check-label">
            Enable Course Discussions
          </label>
          <div className="form-hint">
            Allow students to participate in discussions
          </div>
        </div>
        
        <div className="form-check">
          <input
            type="checkbox"
            id="peerReviewEnabled"
            name="peerReviewEnabled"
            className="form-check-input"
            checked={courseData.peerReviewEnabled || false}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="peerReviewEnabled" className="form-check-label">
            Enable Peer Reviews
          </label>
          <div className="form-hint">
            Allow students to review each other's work
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseEditorSettings;
