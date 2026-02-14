'use client';

import React from 'react';
import Link from 'next/link';
import { colors, transitions, borderRadius } from '@/styles/design-tokens';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'text';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  disabled = false,
  fullWidth = false,
  className = '',
  type = 'button',
}) => {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'inherit',
    fontWeight: '500',
    textAlign: 'center' as const,
    textDecoration: 'none',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: transitions.base,
    borderRadius: borderRadius.base,
    opacity: disabled ? 0.5 : 1,
    width: fullWidth ? '100%' : 'auto',
  };

  const variantStyles = {
    primary: {
      backgroundColor: colors.primary,
      color: colors.white,
      padding: size === 'sm' ? '0.5rem 1rem' : size === 'lg' ? '1rem 2rem' : '0.75rem 1.5rem',
      fontSize: size === 'sm' ? '0.875rem' : size === 'lg' ? '1.125rem' : '1rem',
      ':hover': {
        backgroundColor: colors.primaryHover,
      },
    },
    secondary: {
      backgroundColor: 'transparent',
      color: colors.white,
      border: `1px solid ${colors.white}`,
      padding: size === 'sm' ? '0.5rem 1rem' : size === 'lg' ? '1rem 2rem' : '0.75rem 1.5rem',
      fontSize: size === 'sm' ? '0.875rem' : size === 'lg' ? '1.125rem' : '1rem',
      ':hover': {
        backgroundColor: colors.white,
        color: colors.black,
      },
    },
    text: {
      backgroundColor: 'transparent',
      color: colors.lightGray,
      padding: size === 'sm' ? '0.25rem 0.5rem' : size === 'lg' ? '0.5rem 1rem' : '0.375rem 0.75rem',
      fontSize: size === 'sm' ? '0.875rem' : size === 'lg' ? '1.125rem' : '1rem',
      ':hover': {
        color: colors.white,
      },
    },
  };

  const combinedStyles = {
    ...baseStyles,
    ...variantStyles[variant],
  };

  const content = (
    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      {children}
    </span>
  );

  if (href && !disabled) {
    return (
      <Link
        href={href}
        style={combinedStyles}
        className={className}
        onMouseEnter={(e) => {
          if (variant === 'primary') {
            e.currentTarget.style.backgroundColor = colors.primaryHover;
          } else if (variant === 'secondary') {
            e.currentTarget.style.backgroundColor = colors.white;
            e.currentTarget.style.color = colors.black;
          } else if (variant === 'text') {
            e.currentTarget.style.color = colors.white;
          }
        }}
        onMouseLeave={(e) => {
          if (variant === 'primary') {
            e.currentTarget.style.backgroundColor = colors.primary;
          } else if (variant === 'secondary') {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = colors.white;
          } else if (variant === 'text') {
            e.currentTarget.style.color = colors.lightGray;
          }
        }}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      style={combinedStyles}
      onClick={onClick}
      disabled={disabled}
      className={className}
      onMouseEnter={(e) => {
        if (!disabled) {
          if (variant === 'primary') {
            e.currentTarget.style.backgroundColor = colors.primaryHover;
          } else if (variant === 'secondary') {
            e.currentTarget.style.backgroundColor = colors.white;
            e.currentTarget.style.color = colors.black;
          } else if (variant === 'text') {
            e.currentTarget.style.color = colors.white;
          }
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          if (variant === 'primary') {
            e.currentTarget.style.backgroundColor = colors.primary;
          } else if (variant === 'secondary') {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = colors.white;
          } else if (variant === 'text') {
            e.currentTarget.style.color = colors.lightGray;
          }
        }
      }}
    >
      {content}
    </button>
  );
};
