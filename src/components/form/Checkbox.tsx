import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';

export type CheckboxSize = 'small' | 'medium' | 'large';
export type CheckboxVariant = 'outlined' | 'filled';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * The label for the checkbox
   */
  label?: string;
  
  /**
   * Helper text to display below the checkbox
   */
  helperText?: string;
  
  /**
   * Error message to display below the checkbox
   */
  error?: string;
  
  /**
   * The size of the checkbox
   * @default 'medium'
   */
  size?: CheckboxSize;
  
  /**
   * The variant of the checkbox
   * @default 'outlined'
   */
  variant?: CheckboxVariant;
  
  /**
   * Whether the checkbox is indeterminate
   * @default false
   */
  indeterminate?: boolean;
  
  /**
   * Whether the checkbox should take up the full width of its container
   * @default false
   */
  fullWidth?: boolean;
}

interface StyledCheckboxContainerProps {
  size: CheckboxSize;
  variant: CheckboxVariant;
  fullWidth: boolean;
  hasError: boolean;
  disabled?: boolean;
}

const getCheckboxSizeStyles = (size: CheckboxSize) => {
  switch (size) {
    case 'small':
      return css`
        --checkbox-size: 16px;
        font-size: 0.875rem;
      `;
    case 'medium':
      return css`
        --checkbox-size: 20px;
        font-size: 1rem;
      `;
    case 'large':
      return css`
        --checkbox-size: 24px;
        font-size: 1.125rem;
      `;
    default:
      return '';
  }
};

const getCheckboxVariantStyles = (variant: CheckboxVariant, hasError: boolean) => {
  const errorColor = '#f44336';
  const borderColor = hasError ? errorColor : '#ddd';
  const focusBorderColor = hasError ? errorColor : '#4a6cf7';
  
  switch (variant) {
    case 'outlined':
      return css`
        .checkbox-control {
          border: 2px solid ${borderColor};
          background-color: transparent;
          
          &:focus-within {
            border-color: ${focusBorderColor};
            box-shadow: 0 0 0 2px rgba(74, 108, 247, 0.2);
          }
        }
      `;
    case 'filled':
      return css`
        .checkbox-control {
          border: 2px solid ${borderColor};
          background-color: #f5f5f5;
          
          &:focus-within {
            border-color: ${focusBorderColor};
            background-color: #eeeeee;
          }
        }
      `;
    default:
      return '';
  }
};

const CheckboxContainer = styled.div<StyledCheckboxContainerProps>`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  ${props => getCheckboxSizeStyles(props.size)}
  ${props => getCheckboxVariantStyles(props.variant, props.hasError)}
  
  ${props => props.disabled && css`
    opacity: 0.6;
    cursor: not-allowed;
  `}
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const StyledCheckbox = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  border-radius: 4px;
  margin-right: 8px;
  transition: all 0.2s ease;
  cursor: pointer;
`;

const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  
  &:checked + .checkbox-control {
    background-color: #4a6cf7;
    border-color: #4a6cf7;
    
    &::after {
      opacity: 1;
    }
  }
  
  &:indeterminate + .checkbox-control {
    background-color: #4a6cf7;
    border-color: #4a6cf7;
    
    &::after {
      opacity: 1;
      transform: scale(1) translate(-50%, -50%);
      width: 8px;
      height: 2px;
    }
  }
  
  &:focus + .checkbox-control {
    box-shadow: 0 0 0 2px rgba(74, 108, 247, 0.2);
  }
  
  &:disabled + .checkbox-control {
    cursor: not-allowed;
  }
`;

const CheckboxControl = styled.div`
  position: relative;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  border-radius: 4px;
  transition: all 0.2s ease;
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: scale(0.8) translate(-50%, -50%) rotate(45deg);
    transform-origin: top left;
    width: 25%;
    height: 50%;
    border-right: 2px solid white;
    border-bottom: 2px solid white;
    opacity: 0;
    transition: all 0.2s ease;
  }
`;

const CheckboxLabel = styled.label<{ hasError: boolean }>`
  font-size: inherit;
  color: ${props => props.hasError ? '#f44336' : '#333'};
  cursor: pointer;
  user-select: none;
`;

const HelperText = styled.div<{ hasError: boolean }>`
  margin-top: 4px;
  margin-left: calc(var(--checkbox-size) + 8px);
  font-size: 0.75rem;
  color: ${props => props.hasError ? '#f44336' : '#666'};
`;

/**
 * Checkbox component for boolean input
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  label,
  helperText,
  error,
  size = 'medium',
  variant = 'outlined',
  indeterminate = false,
  fullWidth = false,
  disabled = false,
  id,
  className,
  ...rest
}, ref) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substring(2, 9)}`;
  const hasError = !!error;
  const displayHelperText = error || helperText;
  
  // Handle indeterminate state
  React.useEffect(() => {
    if (ref && 'current' in ref && ref.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate, ref]);
  
  return (
    <CheckboxContainer
      size={size}
      variant={variant}
      fullWidth={fullWidth}
      hasError={hasError}
      disabled={disabled}
      className={className}
    >
      <CheckboxWrapper>
        <HiddenInput
          type="checkbox"
          id={checkboxId}
          ref={ref}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={displayHelperText ? `${checkboxId}-helper-text` : undefined}
          {...rest}
        />
        <CheckboxControl className="checkbox-control" />
        {label && (
          <CheckboxLabel htmlFor={checkboxId} hasError={hasError}>
            {label}
          </CheckboxLabel>
        )}
      </CheckboxWrapper>
      
      {displayHelperText && (
        <HelperText
          id={`${checkboxId}-helper-text`}
          hasError={hasError}
        >
          {displayHelperText}
        </HelperText>
      )}
    </CheckboxContainer>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
