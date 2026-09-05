import { useEffect, useRef, type InputHTMLAttributes, type ReactNode } from 'react';
import './Checkbox.css';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode;
  description?: ReactNode;
  indeterminate?: boolean;
}
export function Checkbox({ label, description, indeterminate = false, className = '', ...props }: CheckboxProps) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => { if (ref.current) ref.current.indeterminate = indeterminate; }, [indeterminate]);
  return <label className={`md-checkbox ${className}`}><input ref={ref} type="checkbox" {...props}/><span className="md-checkbox__box" aria-hidden="true"><i/></span>{(label || description) && <span className="md-checkbox__copy">{label && <b>{label}</b>}{description && <small>{description}</small>}</span>}</label>;
}
