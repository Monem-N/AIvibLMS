import React from 'react';
import styled, { css } from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The visual style of the button
   * @default 'primary'
   */
  variant?: ButtonVariant;
  
  /**
   * The size of the button
   * @default 'medium'
   */
  size?: ButtonSize;
  
  /**
   * Whether the button should take up the full width of its container
   * @default false
   */
  fullWidth?: boolean;
  
  /**
   * Whether the button is in a loading state
   * @default false
   */
  loading?: boolean;
  
  /**
   * Icon to display before the button text
   */
  startIcon?: React.ReactNode;
  
  /**
   * Icon to display after the button text
   */
  endIcon?: React.ReactNode;
  
  /**
   * The content of the button
   */
  children: React.ReactNode;
}

interface ButtonStyleProps {
  variant: ButtonVariant;
  size: ButtonSize;
  fullWidth: boolean;
  disabled?: boolean;
}

const getVariantStyles = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
      return css`
        background-color: #4a6cf7;
        color: white;
        border: none;
        
        &:hover:not(:disabled) {
          background-color: #3a5ce5;
        }
        
        &:active:not(:disabled) {
          background-color: #2a4cd3;
        }
      `;
    case 'secondary':
      return css`
        background-color: #f0f0f0;
        color: #333;
        border: 1px solid #ddd;
        
        &:hover:not(:disabled) {
          background-color: #e0e0e0;
        }
        
        &:active:not(:disabled) {
          background-color: #d0d0d0;
        }
      `;
    case 'tertiary':
      return css`
        background-color: transparent;
        color: #4a6cf7;
        border: none;
        
        &:hover:not(:disabled) {
          background-color: rgba(74, 108, 247, 0.1);
        }
        
        &:active:not(:disabled) {
          background-color: rgba(74, 108, 247, 0.2);
        }
      `;
    case 'danger':
      return css`
        background-color: #f44336;
        color: white;
        border: none;
        
        &:hover:not(:disabled) {
          background-color: #e53935;
        }
        
        &:active:not(:disabled) {
          background-color: #d32f2f;
        }
      `;
    default:
      return '';
  }
};

const getSizeStyles = (size: ButtonSize) => {
  switch (size) {
    case 'small':
      return css`
        padding: 6px 12px;
        font-size: 0.875rem;
      `;
    case 'medium':
      return css`
        padding: 8px 16px;
        font-size: 1rem;
      `;
    case 'large':
      return css`
        padding: 12px 24px;
        font-size: 1.125rem;
      `;
    default:
      return '';
  }
};

const StyledButton = styled.button<ButtonStyleProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  
  /* Size styles */
  ${props => getSizeStyles(props.size)}
  
  /* Variant styles */
  ${props => getVariantStyles(props.variant)}
  
  /* Full width styles */
  ${props => props.fullWidth && css`
    width: 100%;
  `}
  
  /* Disabled styles */
  ${props => props.disabled && css`
    opacity: 0.6;
    cursor: not-allowed;
  `}
  
  /* Focus styles */
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(74, 108, 247, 0.3);
  }
  
  /* Icon spacing */
  .start-icon {
    margin-right: 8px;
  }
  
  .end-icon {
    margin-left: 8px;
  }
`;

/**
 * Button component for user interactions
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  loading = false,
  type = 'button',
  onClick,
  className,
  startIcon,
  endIcon,
  ...rest
}) => {
  return (
    <StyledButton
      type={type}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      onClick={onClick}
      className={className}
      {...rest}
    >
      {loading ? (
        <span className="loading-spinner">Loading...</span>
      ) : (
        <>
          {startIcon && <span className="start-icon">{startIcon}</span>}
          {children}
          {endIcon && <span className="end-icon">{endIcon}</span>}
        </>
      )}
    </StyledButton>
  );
};

export default Button;
