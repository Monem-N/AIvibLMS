/**
 * SignInModern Component
 *
 * Modern sign in component using functional components and hooks.
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNotification } from '../../hooks/useNotification';

// Import CSS
import './Auth.css';

interface SignInProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const SignInModern: React.FC<SignInProps> = ({ onSuccess, onCancel }) => {
  // State
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Hooks
  const { signIn } = useAuthContext();
  const { showError } = useNotification();

  /**
   * Handle form submission
   * @param e Form event
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form
    if (!email || !password) {
      showError('Please enter both email and password');
      return;
    }

    // Submit form
    setIsSubmitting(true);

    try {
      await signIn(email, password);

      // Clear form
      setEmail('');
      setPassword('');

      // Call success callback
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      // Error is handled by useAuth hook
      console.error('Sign in error:', error);
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
    setPassword('');

    // Call cancel callback
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="auth-form">
      <h2>Sign In</h2>

      <form onSubmit={handleSubmit} role="form">
        <div className="form-group">
          <label className="form-label" htmlFor="email">Email</label>
          <input
            className="form-control"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="password">Password</label>
          <input
            className="form-control"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            {isSubmitting ? 'Signing in...' : 'Sign in'}
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

        <div className="form-footer">
          <Link to="/forgot-password" className="form-link">
            Forgot password?
          </Link>

          <div className="form-text">
            Don't have an account?{' '}
            <Link to="/signup" className="form-link">Sign up</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignInModern;
