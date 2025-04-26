/**
 * VerifyEmailModern Component
 * 
 * Modern verify email component using functional components and hooks.
 */

import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

// Import CSS
import './VerifyEmail.css';

const VerifyEmailModern: React.FC = () => {
  // State
  const [isSending, setIsSending] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<boolean>(false);
  
  // Hooks
  const { user, isAuthenticated, isVerified, sendVerificationEmail, signOut } = useAuthContext();
  
  // If user is not authenticated, redirect to sign in page
  if (!isAuthenticated()) {
    return <Navigate to="/signin" replace />;
  }
  
  // If user is already verified, redirect to dashboard
  if (isVerified()) {
    return <Navigate to="/dashboard" replace />;
  }
  
  /**
   * Handle resend verification email
   */
  const handleResendEmail = async () => {
    setIsSending(true);
    
    try {
      await sendVerificationEmail();
      setEmailSent(true);
    } catch (error) {
      console.error('Error sending verification email:', error);
    } finally {
      setIsSending(false);
    }
  };
  
  /**
   * Handle sign out
   */
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  
  return (
    <div className="auth-container verify-email-container">
      <h2 className="auth-title">Verify Your Email</h2>
      
      <div className="verify-email-content">
        <p>
          We've sent a verification email to <strong>{user?.email}</strong>.
          Please check your email and click the verification link to activate your account.
        </p>
        
        {emailSent ? (
          <div className="success-message">
            <p>
              A new verification email has been sent to your email address.
              Please check your inbox and spam folder.
            </p>
          </div>
        ) : (
          <p>
            If you didn't receive the email, you can resend it by clicking the button below.
          </p>
        )}
        
        <div className="form-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleResendEmail}
            disabled={isSending || emailSent}
          >
            {isSending ? 'Sending...' : emailSent ? 'Email Sent' : 'Resend Verification Email'}
          </button>
          
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
        
        <div className="form-links">
          <div className="signin-link">
            Already verified?{' '}
            <Link to="/signin">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailModern;
