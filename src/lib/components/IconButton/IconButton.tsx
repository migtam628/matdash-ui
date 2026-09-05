import type { ButtonHTMLAttributes, ReactNode } from 'react'; import './IconButton.css';
export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { icon: ReactNode; label: string; size?: 'sm'|'md'|'lg'; variant?: 'ghost'|'surface'|'primary'; }
export function IconButton({ icon, label, size='md', variant='ghost', className='', ...props }: IconButtonProps) { return <button className={`md-icon-button md-icon-button--${size} md-icon-button--${variant} ${className}`} aria-label={label} title={label} {...props}>{icon}</button>; }
