'use client'

import { ReactNode, useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  title?: string
  className?: string
}

const modalSizes = {
  sm: 'max-w-md',
  md: 'max-w-2xl',
  lg: 'max-w-4xl',
  xl: 'max-w-6xl',
  full: 'max-w-full mx-4',
}

export function Modal({
  isOpen,
  onClose,
  children,
  size = 'md',
  title,
  className,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6',
        'bg-black/90 backdrop-blur-sm',
        'transition-opacity duration-300',
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
      onClick={onClose}
    >
      <div
        className={cn(
          'relative w-full bg-[#0a0a0a] border border-white/10',
          modalSizes[size],
          'max-h-[90vh] overflow-y-auto scrollbar-elita',
          'transform transition-all duration-300',
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {title && (
          <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-[#0a0a0a] border-b border-white/10">
            <h2 className="text-2xl font-light text-white">{title}</h2>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        )}

        {/* Close button (when no title) */}
        {!title && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        )}

        {/* Content */}
        <div className={title ? 'p-6' : 'p-6 pt-14'}>
          {children}
        </div>
      </div>
    </div>
  )
}

// Slide-in Panel variant
export function SlidePanel({
  isOpen,
  onClose,
  children,
  title,
  side = 'right',
}: ModalProps & { side?: 'left' | 'right' }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 bg-black/90 backdrop-blur-sm',
        'transition-opacity duration-300',
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
      onClick={onClose}
    >
      <div
        className={cn(
          'fixed top-0 bottom-0 w-full max-w-md bg-black border-white/10',
          'transform transition-transform duration-300 overflow-y-auto',
          side === 'right' ? 'right-0 border-l' : 'left-0 border-r',
          isOpen
            ? 'translate-x-0'
            : side === 'right'
            ? 'translate-x-full'
            : '-translate-x-full'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-black border-b border-white/10">
          <h2 className="text-2xl font-light text-white">{title}</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Close panel"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}
