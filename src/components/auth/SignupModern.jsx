import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../hooks/useNotification';
import { saveUserProfile } from '../../services/userService';

// Import constants
import { USER_CONFIRM_EMAIL, PASSWORD_MATCH_ERROR } from '../../constants/constants';

// Import CSS
import './Auth.css';

/**
 * SignupModern component - User registration form
 * Modernized version without jQuery dependencies
 */
const SignupModern = ({ onSuccess, className = '' }) => {
  // State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  
  // Hooks
  const { signUp } = useAuth();
  const { showNotification } = useNotification();
  
  /**
   * Handle input change
   * @param {React.ChangeEvent} e - Change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  /**
   * Save user profile data after successful registration
   * @param {Object} user - Firebase user object
   */
  const saveUser = async (user) => {
    try {
      await saveUserProfile(user.uid, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        displayName: `${formData.firstName} ${formData.lastName}`,
        createdAt: new Date().toISOString()
      });
      
      showNotification({
        message: USER_CONFIRM_EMAIL,
        type: 'success'
      });
      
      // Clear form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      showNotification({
        message: error.message || 'Failed to save user profile',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  /**
   * Handle form submission
   * @param {React.FormEvent} e - Form event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { firstName, lastName, email, password, confirmPassword } = formData;
    
    // Validate form
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      showNotification({
        message: 'Please fill in all fields',
        type: 'error'
      });
      return;
    }
    
    // Check if passwords match
    if (password !== confirmPassword) {
      showNotification({
        message: PASSWORD_MATCH_ERROR,
        type: 'error'
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Create user in Firebase
      const userCredential = await signUp(email, password);
      
      // Save user profile data
      await saveUser(userCredential.user);
    } catch (error) {
      showNotification({
        message: error.message || 'Failed to sign up',
        type: 'error'
      });
      setIsLoading(false);
    }
  };
  
  return (
    <form 
      className={`auth-form signup-form ${className}`} 
      onSubmit={handleSubmit}
    >
      <div className="form-group">
        <label htmlFor="firstName" className="form-label">First Name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          className="form-control"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Enter your first name"
          disabled={isLoading}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="lastName" className="form-label">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          className="form-control"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Enter your last name"
          disabled={isLoading}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          className="form-control"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          disabled={isLoading}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="password" className="form-label">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          className="form-control"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          disabled={isLoading}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          className="form-control"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          disabled={isLoading}
          required
        />
      </div>
      
      <div className="form-actions">
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? 'Signing up...' : 'Sign up'}
        </button>
        
        {isLoading && (
          <div className="spinner" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </div>
      
      <div className="form-footer">
        <p className="form-text">
          By signing up, you agree to our{' '}
          <a href="/terms" className="form-link">Terms of Service</a>{' '}
          and{' '}
          <a href="/privacy" className="form-link">Privacy Policy</a>.
        </p>
      </div>
    </form>
  );
};

SignupModern.propTypes = {
  onSuccess: PropTypes.func,
  className: PropTypes.string
};

export default SignupModern;
