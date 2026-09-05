import type { ReactNode } from 'react';
import './Tooltip.css';

export type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left';

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  placement?: TooltipPlacement;
  className?: string;
  disabled?: boolean;
}

export function Tooltip({ content, children, placement = 'top', className = '', disabled = false }: TooltipProps) {
  if (disabled) return <>{children}</>;
  return (
    <span className={`md-tooltip md-tooltip--${placement} ${className}`}>
      <span className="md-tooltip__trigger">{children}</span>
      <span className="md-tooltip__content" role="tooltip">{content}</span>
    </span>
  );
}
