/**
 * ForgotPasswordModern Component
 * 
 * Modern forgot password component using functional components and hooks.
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../hooks/useNotification';

// Import CSS
import './ForgotPassword.css';

interface ForgotPasswordProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const ForgotPasswordModern: React.FC<ForgotPasswordProps> = ({ onSuccess, onCancel }) => {
  // State
  const [email, setEmail] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  
  // Hooks
  const { resetPassword } = useAuth();
  const { showError } = useNotification();
  
  /**
   * Handle form submission
   * @param e Form event
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form
    if (!email) {
      showError('Please enter your email address');
      return;
    }
    
    // Submit form
    setIsSubmitting(true);
    
    try {
      await resetPassword(email);
      
      // Set submitted state
      setIsSubmitted(true);
      
      // Call success callback
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      // Error is handled by useAuth hook
      console.error('Reset password error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  /**
   * Handle cancel button click
   */
  const handleCancel = () => {
    // Clear form
    setEmail('');
    setIsSubmitted(false);
    
    // Call cancel callback
    if (onCancel) {
      onCancel();
    }
  };
  
  /**
   * Handle try again button click
   */
  const handleTryAgain = () => {
    setIsSubmitted(false);
  };
  
  // If form is submitted, show success message
  if (isSubmitted) {
    return (
      <div className="auth-container forgot-password-container">
        <h2 className="auth-title">Reset Password</h2>
        
        <div className="success-message">
          <p>
            We've sent a password reset link to <strong>{email}</strong>.
            Please check your email and follow the instructions to reset your password.
          </p>
          
          <p>
            If you don't receive the email within a few minutes, please check your spam folder.
          </p>
          
          <div className="form-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleTryAgain}
            >
              Try Again
            </button>
            
            <Link to="/signin" className="btn btn-secondary">
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="auth-container forgot-password-container">
      <h2 className="auth-title">Reset Password</h2>
      
      <p className="auth-description">
        Enter your email address and we'll send you a link to reset your password.
      </p>
      
      <form className="auth-form forgot-password-form" onSubmit={handleSubmit} role="form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
            required
          />
        </div>
        
        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Reset Link'}
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
            Remember your password?{' '}
            <Link to="/signin">Sign in</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordModern;
