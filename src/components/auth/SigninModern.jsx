import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../hooks/useNotification';

// Import CSS
import './Auth.css';

/**
 * SigninModern component - User sign-in form
 * Modernized version without jQuery dependencies
 */
const SigninModern = ({ onSuccess, className = '' }) => {
  // State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Hooks
  const { signIn } = useAuth();
  const { showNotification } = useNotification();
  
  /**
   * Handle form submission
   * @param {React.FormEvent} e - Form event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      showNotification({
        message: 'Please enter both email and password',
        type: 'error'
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      await signIn(email, password);
      
      // Clear form
      setEmail('');
      setPassword('');
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      showNotification({
        message: error.message || 'Failed to sign in',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <form 
      className={`auth-form signin-form ${className}`} 
      onSubmit={handleSubmit}
    >
      <div className="form-group">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          id="email"
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          disabled={isLoading}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="password" className="form-label">Password</label>
        <input
          id="password"
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
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
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>
        
        {isLoading && (
          <div className="spinner" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </div>
      
      <div className="form-footer">
        <a href="/forgot-password" className="form-link">
          Forgot password?
        </a>
      </div>
    </form>
  );
};

SigninModern.propTypes = {
  onSuccess: PropTypes.func,
  className: PropTypes.string
};

export default SigninModern;
