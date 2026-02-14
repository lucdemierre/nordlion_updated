'use client';

import React, { useEffect } from 'react';
import { colors, transitions, borderRadius } from '@/styles/design-tokens';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  size = 'md',
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeStyles = {
    sm: { maxWidth: '400px' },
    md: { maxWidth: '600px' },
    lg: { maxWidth: '800px' },
    xl: { maxWidth: '1200px' },
    full: { maxWidth: '100%', width: '100%', height: '100%', borderRadius: '0' },
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: size === 'full' ? '0' : '1rem',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: colors.darkGray,
          borderRadius: size === 'full' ? '0' : borderRadius.xl,
          width: '100%',
          ...sizeStyles[size],
          maxHeight: size === 'full' ? '100%' : '90vh',
          overflow: 'auto',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            position: 'sticky',
            top: 0,
            backgroundColor: colors.darkGray,
            padding: '1.5rem',
            borderBottom: `1px solid ${colors.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 10,
          }}
        >
          {title && (
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: colors.white,
              }}
            >
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: colors.gray,
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: '0.5rem',
              marginLeft: 'auto',
              transition: transitions.base,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = colors.white;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = colors.gray;
            }}
          >
            ×
          </button>
        </div>
        <div style={{ padding: '1.5rem' }}>{children}</div>
      </div>
    </div>
  );
};

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  children,
  title,
}) => {
  return <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">{children}</Modal>;
};

interface SlideInPanelProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  side?: 'left' | 'right';
}

export const SlideInPanel: React.FC<SlideInPanelProps> = ({
  isOpen,
  onClose,
  children,
  title,
  side = 'right',
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          [side]: 0,
          width: '100%',
          maxWidth: '500px',
          backgroundColor: colors.darkGray,
          boxShadow: side === 'right' ? '-4px 0 20px rgba(0, 0, 0, 0.5)' : '4px 0 20px rgba(0, 0, 0, 0.5)',
          overflow: 'auto',
          animation: `slideIn${side === 'right' ? 'Right' : 'Left'} ${transitions.slow}`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            position: 'sticky',
            top: 0,
            backgroundColor: colors.darkGray,
            padding: '1.5rem',
            borderBottom: `1px solid ${colors.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 10,
          }}
        >
          {title && (
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: colors.white,
              }}
            >
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: colors.gray,
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: '0.5rem',
              marginLeft: 'auto',
              transition: transitions.base,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = colors.white;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = colors.gray;
            }}
          >
            ×
          </button>
        </div>
        <div style={{ padding: '1.5rem' }}>{children}</div>
      </div>
    </div>
  );
};
