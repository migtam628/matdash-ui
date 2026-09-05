import { cloneElement, isValidElement, useEffect, useId, useRef, useState, type ReactElement, type ReactNode } from 'react';
import './Popover.css';

export type PopoverPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
export interface PopoverProps {
  trigger: ReactElement;
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: PopoverPlacement;
  width?: number | string;
  className?: string;
  closeOnSelect?: boolean;
}

export function Popover({ trigger, children, open: controlled, defaultOpen=false, onOpenChange, placement='bottom-start', width, className='', closeOnSelect=false }: PopoverProps) {
  const [internal, setInternal] = useState(defaultOpen);
  const open = controlled ?? internal;
  const rootRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const setOpen = (next:boolean) => { if (controlled === undefined) setInternal(next); onOpenChange?.(next); };
  useEffect(() => {
    if (!open) return;
    const onPointer = (e:PointerEvent) => { if (!rootRef.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e:KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('pointerdown', onPointer); document.removeEventListener('keydown', onKey); };
  }, [open]);
  const triggerNode = isValidElement(trigger) ? cloneElement(trigger as ReactElement<Record<string, unknown>>, {
    'aria-expanded': open,
    'aria-controls': id,
    onClick: (e: unknown) => {
      const original = (trigger.props as {onClick?: (e:unknown)=>void}).onClick;
      original?.(e);
      setOpen(!open);
    },
  }) : trigger;
  return <div className={`md-popover ${className}`} ref={rootRef}>
    {triggerNode}
    {open && <div id={id} className={`md-popover__content md-popover__content--${placement}`} role="dialog" style={{width}} onClick={()=>{if(closeOnSelect)setOpen(false)}}>{children}</div>}
  </div>;
}
