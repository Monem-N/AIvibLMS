import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';

export type SelectSize = 'small' | 'medium' | 'large';
export type SelectVariant = 'outlined' | 'filled' | 'standard';

export interface SelectOption {
  /**
   * The value of the option
   */
  value: string;
  
  /**
   * The label to display for the option
   */
  label: string;
  
  /**
   * Whether the option is disabled
   */
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /**
   * The label for the select
   */
  label?: string;
  
  /**
   * Helper text to display below the select
   */
  helperText?: string;
  
  /**
   * Error message to display below the select
   */
  error?: string;
  
  /**
   * The size of the select
   * @default 'medium'
   */
  size?: SelectSize;
  
  /**
   * The variant of the select
   * @default 'outlined'
   */
  variant?: SelectVariant;
  
  /**
   * Whether the select should take up the full width of its container
   * @default false
   */
  fullWidth?: boolean;
  
  /**
   * The options to display in the select
   */
  options: SelectOption[];
  
  /**
   * Whether the select is required
   * @default false
   */
  required?: boolean;
  
  /**
   * Placeholder text to display when no option is selected
   */
  placeholder?: string;
}

interface StyledSelectContainerProps {
  size: SelectSize;
  variant: SelectVariant;
  fullWidth: boolean;
  hasError: boolean;
  disabled?: boolean;
}

const getSelectSizeStyles = (size: SelectSize) => {
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

const getSelectVariantStyles = (variant: SelectVariant, hasError: boolean) => {
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

const SelectContainer = styled.div<StyledSelectContainerProps>`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
`;

const SelectLabel = styled.label<{ required: boolean; hasError: boolean }>`
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

const SelectWrapper = styled.div<StyledSelectContainerProps>`
  display: flex;
  align-items: center;
  position: relative;
  border-radius: 4px;
  transition: all 0.2s ease;
  
  ${props => getSelectSizeStyles(props.size)}
  ${props => getSelectVariantStyles(props.variant, props.hasError)}
  
  ${props => props.disabled && css`
    opacity: 0.6;
    cursor: not-allowed;
  `}
`;

const StyledSelect = styled.select`
  width: 100%;
  height: 100%;
  padding: 0 12px;
  border: none;
  background: transparent;
  font-family: inherit;
  color: #333;
  appearance: none;
  cursor: pointer;
  
  &:focus {
    outline: none;
  }
  
  &:disabled {
    cursor: not-allowed;
  }
  
  /* Hide default arrow in IE */
  &::-ms-expand {
    display: none;
  }
`;

const HelperText = styled.div<{ hasError: boolean }>`
  margin-top: 4px;
  font-size: 0.75rem;
  color: ${props => props.hasError ? '#f44336' : '#666'};
`;

const ArrowIcon = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  
  &::before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #666;
  }
`;

/**
 * Select component for selecting from a list of options
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  helperText,
  error,
  size = 'medium',
  variant = 'outlined',
  fullWidth = false,
  options = [],
  required = false,
  disabled = false,
  placeholder,
  id,
  className,
  ...rest
}, ref) => {
  const selectId = id || `select-${Math.random().toString(36).substring(2, 9)}`;
  const hasError = !!error;
  const displayHelperText = error || helperText;
  
  return (
    <SelectContainer
      size={size}
      variant={variant}
      fullWidth={fullWidth}
      hasError={hasError}
      disabled={disabled}
      className={className}
    >
      {label && (
        <SelectLabel htmlFor={selectId} required={required} hasError={hasError}>
          {label}
        </SelectLabel>
      )}
      
      <SelectWrapper
        size={size}
        variant={variant}
        fullWidth={fullWidth}
        hasError={hasError}
        disabled={disabled}
      >
        <StyledSelect
          id={selectId}
          ref={ref}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={displayHelperText ? `${selectId}-helper-text` : undefined}
          required={required}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          
          {options.map(option => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </StyledSelect>
        
        <ArrowIcon />
      </SelectWrapper>
      
      {displayHelperText && (
        <HelperText
          id={`${selectId}-helper-text`}
          hasError={hasError}
        >
          {displayHelperText}
        </HelperText>
      )}
    </SelectContainer>
  );
});

Select.displayName = 'Select';

export default Select;
