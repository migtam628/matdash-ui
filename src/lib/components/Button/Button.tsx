import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css';
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { variant?: ButtonVariant; size?: ButtonSize; leadingIcon?: ReactNode; trailingIcon?: ReactNode; loading?: boolean; }
export function Button({ variant='primary', size='md', leadingIcon, trailingIcon, loading=false, className='', children, disabled, ...props }: ButtonProps) {
  return <button className={`md-button md-button--${variant} md-button--${size} ${className}`} disabled={disabled || loading} {...props}>
    {loading ? <span className="md-button__spinner" aria-hidden="true"/> : leadingIcon}
    <span>{children}</span>{trailingIcon}
  </button>;
}
