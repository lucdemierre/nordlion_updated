'use client'

import Link from 'next/link'
import { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type ButtonBaseProps = {
  variant?: 'primary' | 'secondary' | 'text'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
}

type ButtonAsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: never
  }

type ButtonAsLink = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string
  }

type ButtonProps = ButtonAsButton | ButtonAsLink

const buttonVariants = {
  primary: 'bg-[#ff6b35] hover:bg-[#ff6b35]/90 text-white border-transparent',
  secondary: 'bg-transparent hover:bg-white/5 text-white border-white/20',
  text: 'bg-transparent hover:bg-white/5 text-white border-transparent',
}

const buttonSizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  href,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-light tracking-wide border transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-none'

  const classes = cn(
    baseStyles,
    buttonVariants[variant],
    buttonSizes[size],
    className
  )

  if (href) {
    return (
      <Link href={href} className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  )
}
