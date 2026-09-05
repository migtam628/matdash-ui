import type { ReactNode } from 'react';
import './SegmentedControl.css';
export interface SegmentedOption { value: string; label: ReactNode; disabled?: boolean; }
export interface SegmentedControlProps { value: string; onChange: (value: string) => void; options: SegmentedOption[]; size?: 'sm' | 'md'; className?: string; ariaLabel?: string; }
export function SegmentedControl({ value, onChange, options, size = 'md', className = '', ariaLabel = 'Choose option' }: SegmentedControlProps) {
  return <div className={`md-segmented md-segmented--${size} ${className}`} role="group" aria-label={ariaLabel}>{options.map(o => <button type="button" key={o.value} className={value === o.value ? 'is-active' : ''} aria-pressed={value === o.value} disabled={o.disabled} onClick={() => onChange(o.value)}>{o.label}</button>)}</div>;
}
