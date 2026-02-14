'use client';

import React, { forwardRef } from 'react';
import { colors, transitions, borderRadius } from '@/styles/design-tokens';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = false, className = '', ...props }, ref) => {
    return (
      <div style={{ width: fullWidth ? '100%' : 'auto', marginBottom: '1rem' }}>
        {label && (
          <label
            style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: colors.lightGray,
              marginBottom: '0.5rem',
            }}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            backgroundColor: colors.darkerGray,
            border: `1px solid ${error ? colors.error : colors.border}`,
            borderRadius: borderRadius.base,
            color: colors.white,
            fontSize: '1rem',
            transition: transitions.base,
            outline: 'none',
          }}
          className={className}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = error ? colors.error : colors.primary;
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = error ? colors.error : colors.border;
          }}
          {...props}
        />
        {error && (
          <p
            style={{
              fontSize: '0.875rem',
              color: colors.error,
              marginTop: '0.25rem',
            }}
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, fullWidth = false, className = '', ...props }, ref) => {
    return (
      <div style={{ width: fullWidth ? '100%' : 'auto', marginBottom: '1rem' }}>
        {label && (
          <label
            style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: colors.lightGray,
              marginBottom: '0.5rem',
            }}
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            backgroundColor: colors.darkerGray,
            border: `1px solid ${error ? colors.error : colors.border}`,
            borderRadius: borderRadius.base,
            color: colors.white,
            fontSize: '1rem',
            transition: transitions.base,
            outline: 'none',
            minHeight: '120px',
            resize: 'vertical',
          }}
          className={className}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = error ? colors.error : colors.primary;
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = error ? colors.error : colors.border;
          }}
          {...props}
        />
        {error && (
          <p
            style={{
              fontSize: '0.875rem',
              color: colors.error,
              marginTop: '0.25rem',
            }}
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, fullWidth = false, options, className = '', ...props }, ref) => {
    return (
      <div style={{ width: fullWidth ? '100%' : 'auto', marginBottom: '1rem' }}>
        {label && (
          <label
            style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: colors.lightGray,
              marginBottom: '0.5rem',
            }}
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            backgroundColor: colors.darkerGray,
            border: `1px solid ${error ? colors.error : colors.border}`,
            borderRadius: borderRadius.base,
            color: colors.white,
            fontSize: '1rem',
            transition: transitions.base,
            outline: 'none',
            cursor: 'pointer',
          }}
          className={className}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = error ? colors.error : colors.primary;
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = error ? colors.error : colors.border;
          }}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p
            style={{
              fontSize: '0.875rem',
              color: colors.error,
              marginTop: '0.25rem',
            }}
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
