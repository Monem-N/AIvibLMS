import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';

export type InputSize = 'small' | 'medium' | 'large';
export type InputVariant = 'outlined' | 'filled' | 'standard';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * The label for the input
   */
  label?: string;
  
  /**
   * Helper text to display below the input
   */
  helperText?: string;
  
  /**
   * Error message to display below the input
   */
  error?: string;
  
  /**
   * The size of the input
   * @default 'medium'
   */
  size?: InputSize;
  
  /**
   * The variant of the input
   * @default 'outlined'
   */
  variant?: InputVariant;
  
  /**
   * Whether the input should take up the full width of its container
   * @default false
   */
  fullWidth?: boolean;
  
  /**
   * Icon to display at the start of the input
   */
  startIcon?: React.ReactNode;
  
  /**
   * Icon to display at the end of the input
   */
  endIcon?: React.ReactNode;
  
  /**
   * Whether the input is required
   * @default false
   */
  required?: boolean;
}

interface StyledInputContainerProps {
  size: InputSize;
  variant: InputVariant;
  fullWidth: boolean;
  hasError: boolean;
  disabled?: boolean;
}

const getInputSizeStyles = (size: InputSize) => {
  switch (size) {
    case 'small':
      return css`
        height: 32px;
        font-size: 0.875rem;
      `;
    case 'medium':
      return css`
        height: 40px;
        font-size: 1rem;
      `;
    case 'large':
      return css`
        height: 48px;
        font-size: 1.125rem;
      `;
    default:
      return '';
  }
};

const getInputVariantStyles = (variant: InputVariant, hasError: boolean) => {
  const errorColor = '#f44336';
  const borderColor = hasError ? errorColor : '#ddd';
  const focusBorderColor = hasError ? errorColor : '#4a6cf7';
  
  switch (variant) {
    case 'outlined':
      return css`
        border: 1px solid ${borderColor};
        background-color: transparent;
        
        &:focus-within {
          border-color: ${focusBorderColor};
          box-shadow: 0 0 0 2px rgba(74, 108, 247, 0.2);
        }
      `;
    case 'filled':
      return css`
        border: none;
        border-bottom: 1px solid ${borderColor};
        background-color: #f5f5f5;
        
        &:focus-within {
          border-bottom-color: ${focusBorderColor};
          background-color: #eeeeee;
        }
      `;
    case 'standard':
      return css`
        border: none;
        border-bottom: 1px solid ${borderColor};
        background-color: transparent;
        border-radius: 0;
        
        &:focus-within {
          border-bottom-color: ${focusBorderColor};
          border-bottom-width: 2px;
        }
      `;
    default:
      return '';
  }
};

const InputContainer = styled.div<StyledInputContainerProps>`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
`;

const InputLabel = styled.label<{ required: boolean; hasError: boolean }>`
  margin-bottom: 4px;
  font-size: 0.875rem;
  color: ${props => props.hasError ? '#f44336' : '#333'};
  
  ${props => props.required && css`
    &::after {
      content: ' *';
      color: #f44336;
    }
  `}
`;

const InputWrapper = styled.div<StyledInputContainerProps>`
  display: flex;
  align-items: center;
  position: relative;
  border-radius: 4px;
  transition: all 0.2s ease;
  
  ${props => getInputSizeStyles(props.size)}
  ${props => getInputVariantStyles(props.variant, props.hasError)}
  
  ${props => props.disabled && css`
    opacity: 0.6;
    cursor: not-allowed;
  `}
`;

const StyledInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 0 12px;
  border: none;
  background: transparent;
  font-family: inherit;
  color: #333;
  
  &:focus {
    outline: none;
  }
  
  &::placeholder {
    color: #999;
  }
  
  &:disabled {
    cursor: not-allowed;
  }
`;

const HelperText = styled.div<{ hasError: boolean }>`
  margin-top: 4px;
  font-size: 0.75rem;
  color: ${props => props.hasError ? '#f44336' : '#666'};
`;

const IconWrapper = styled.div<{ position: 'start' | 'end' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  color: #666;
  
  ${props => props.position === 'start' && css`
    margin-right: 4px;
  `}
  
  ${props => props.position === 'end' && css`
    margin-left: 4px;
  `}
`;

/**
 * Input component for collecting user input
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  helperText,
  error,
  size = 'medium',
  variant = 'outlined',
  fullWidth = false,
  startIcon,
  endIcon,
  required = false,
  disabled = false,
  id,
  className,
  ...rest
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
  const hasError = !!error;
  const displayHelperText = error || helperText;
  
  return (
    <InputContainer
      size={size}
      variant={variant}
      fullWidth={fullWidth}
      hasError={hasError}
      disabled={disabled}
      className={className}
    >
      {label && (
        <InputLabel htmlFor={inputId} required={required} hasError={hasError}>
          {label}
        </InputLabel>
      )}
      
      <InputWrapper
        size={size}
        variant={variant}
        fullWidth={fullWidth}
        hasError={hasError}
        disabled={disabled}
      >
        {startIcon && (
          <IconWrapper position="start">
            {startIcon}
          </IconWrapper>
        )}
        
        <StyledInput
          id={inputId}
          ref={ref}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={displayHelperText ? `${inputId}-helper-text` : undefined}
          required={required}
          {...rest}
        />
        
        {endIcon && (
          <IconWrapper position="end">
            {endIcon}
          </IconWrapper>
        )}
      </InputWrapper>
      
      {displayHelperText && (
        <HelperText
          id={`${inputId}-helper-text`}
          hasError={hasError}
        >
          {displayHelperText}
        </HelperText>
      )}
    </InputContainer>
  );
});

Input.displayName = 'Input';

export default Input;
