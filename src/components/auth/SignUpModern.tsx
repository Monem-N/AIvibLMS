/**
 * SignUpModern Component
 * 
 * Modern sign up component using functional components and hooks.
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../hooks/useNotification';
import { UserInfo } from '../../types/user';

// Import CSS
import './SignUp.css';

interface SignUpProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const SignUpModern: React.FC<SignUpProps> = ({ onSuccess, onCancel }) => {
  // State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName1: '',
    lastName2: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Hooks
  const { signUp } = useAuth();
  const { showError } = useNotification();
  
  /**
   * Handle input change
   * @param e Input change event
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };
  
  /**
   * Validate form
   * @returns True if form is valid
   */
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Validate first name
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    // Validate last name
    if (!formData.lastName1.trim()) {
      newErrors.lastName1 = 'Last name is required';
    }
    
    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    // Validate confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    
    return Object.keys(newErrors).length === 0;
  };
  
  /**
   * Handle form submission
   * @param e Form event
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    // Prepare user info
    const userInfo: UserInfo = {
      firstName: formData.firstName,
      lastName1: formData.lastName1,
      lastName2: formData.lastName2 || '',
      displayName: `${formData.firstName} ${formData.lastName1}`,
      level: 1 // Default level for new users
    };
    
    // Submit form
    setIsSubmitting(true);
    
    try {
      await signUp(formData.email, formData.password, userInfo);
      
      // Clear form
      setFormData({
        firstName: '',
        lastName1: '',
        lastName2: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      
      // Call success callback
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      // Error is handled by useAuth hook
      console.error('Sign up error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  /**
   * Handle cancel button click
   */
  const handleCancel = () => {
    // Clear form
    setFormData({
      firstName: '',
      lastName1: '',
      lastName2: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    
    // Clear errors
    setErrors({});
    
    // Call cancel callback
    if (onCancel) {
      onCancel();
    }
  };
  
  return (
    <div className="auth-container signup-container">
      <h2 className="auth-title">Create Account</h2>
      
      <form className="auth-form signup-form" onSubmit={handleSubmit} role="form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name*</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              disabled={isSubmitting}
              required
            />
            {errors.firstName && <div className="error-message">{errors.firstName}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="lastName1">Last Name*</label>
            <input
              type="text"
              id="lastName1"
              name="lastName1"
              value={formData.lastName1}
              onChange={handleChange}
              disabled={isSubmitting}
              required
            />
            {errors.lastName1 && <div className="error-message">{errors.lastName1}</div>}
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="lastName2">Second Last Name (Optional)</label>
          <input
            type="text"
            id="lastName2"
            name="lastName2"
            value={formData.lastName2}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email*</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
            required
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password*</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            disabled={isSubmitting}
            required
          />
          {errors.password && <div className="error-message">{errors.password}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password*</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={isSubmitting}
            required
          />
          {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
        </div>
        
        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
          
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>
        
        <div className="form-links">
          <div className="signin-link">
            Already have an account?{' '}
            <Link to="/signin">Sign in</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpModern;
