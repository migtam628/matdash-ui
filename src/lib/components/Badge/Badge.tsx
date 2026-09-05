import type { ReactNode } from 'react'; import './Badge.css';
export type BadgeTone='neutral'|'primary'|'success'|'warning'|'danger'|'info';
export interface BadgeProps { children: ReactNode; tone?: BadgeTone; dot?: boolean; className?: string; }
export function Badge({ children, tone='neutral', dot=false, className='' }: BadgeProps) { return <span className={`md-badge md-badge--${tone} ${className}`}>{dot && <i/>}{children}</span>; }
