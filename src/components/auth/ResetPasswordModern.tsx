/**
 * ResetPasswordModern Component
 * 
 * Modern reset password component using functional components and hooks.
 */

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../hooks/useNotification';

// Import CSS
import './ResetPassword.css';

interface ResetPasswordProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const ResetPasswordModern: React.FC<ResetPasswordProps> = ({ onSuccess, onCancel }) => {
  // State
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [oobCode, setOobCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Hooks
  const { confirmPasswordReset } = useAuth();
  const { showError, showSuccess } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Effect to get oobCode from URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('oobCode');
    
    if (!code) {
      setError('Invalid password reset link. Please request a new one.');
      return;
    }
    
    setOobCode(code);
  }, [location]);
  
  /**
   * Handle form submission
   * @param e Form event
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form
    if (!password || !confirmPassword) {
      showError('Please enter both password fields');
      return;
    }
    
    if (password !== confirmPassword) {
      showError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      showError('Password must be at least 6 characters');
      return;
    }
    
    if (!oobCode) {
      showError('Invalid password reset link. Please request a new one.');
      return;
    }
    
    // Submit form
    setIsSubmitting(true);
    
    try {
      await confirmPasswordReset(oobCode, password);
      
      // Set submitted state
      setIsSubmitted(true);
      showSuccess('Your password has been reset successfully');
      
      // Call success callback
      if (onSuccess) {
        onSuccess();
      }
      
      // Redirect to sign in page after 3 seconds
      setTimeout(() => {
        navigate('/signin');
      }, 3000);
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
    setPassword('');
    setConfirmPassword('');
    
    // Call cancel callback
    if (onCancel) {
      onCancel();
    } else {
      navigate('/signin');
    }
  };
  
  // If error, show error state
  if (error) {
    return (
      <div className="auth-container reset-password-container">
        <h2 className="auth-title">Reset Password</h2>
        
        <div className="error-message">
          <p>{error}</p>
          
          <div className="form-actions">
            <Link to="/forgot-password" className="btn btn-primary">
              Request New Link
            </Link>
            
            <Link to="/signin" className="btn btn-secondary">
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  // If form is submitted, show success message
  if (isSubmitted) {
    return (
      <div className="auth-container reset-password-container">
        <h2 className="auth-title">Password Reset</h2>
        
        <div className="success-message">
          <p>
            Your password has been reset successfully.
            You will be redirected to the sign in page shortly.
          </p>
          
          <div className="form-actions">
            <Link to="/signin" className="btn btn-primary">
              Sign In Now
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="auth-container reset-password-container">
      <h2 className="auth-title">Reset Password</h2>
      
      <p className="auth-description">
        Enter your new password below.
      </p>
      
      <form className="auth-form reset-password-form" onSubmit={handleSubmit} role="form">
        <div className="form-group">
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isSubmitting}
            required
            minLength={6}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            {isSubmitting ? 'Resetting...' : 'Reset Password'}
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
      </form>
    </div>
  );
};

export default ResetPasswordModern;
