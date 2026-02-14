'use client'

import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="label-elita">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'input-elita',
            error && 'border-red-500',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-400 font-light">
            {error}
          </p>
        )}
      </div>
    )
  }
)

FormInput.displayName = 'FormInput'

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="label-elita">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            'textarea-elita',
            error && 'border-red-500',
            className
          )}
          rows={4}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-400 font-light">
            {error}
          </p>
        )}
      </div>
    )
  }
)

FormTextarea.displayName = 'FormTextarea'

interface FormSelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, error, options, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="label-elita">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={cn(
            'input-elita',
            error && 'border-red-500',
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="mt-1 text-sm text-red-400 font-light">
            {error}
          </p>
        )}
      </div>
    )
  }
)

FormSelect.displayName = 'FormSelect'
