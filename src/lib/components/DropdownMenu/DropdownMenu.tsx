import { cloneElement, useEffect, useRef, useState, type MouseEvent as ReactMouseEvent, type ReactElement, type ReactNode } from 'react';
import './DropdownMenu.css';

export interface DropdownMenuItem {
  key: string;
  label: ReactNode;
  icon?: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
  danger?: boolean;
  onSelect?: () => void;
  separatorBefore?: boolean;
}

export interface DropdownMenuProps {
  trigger: ReactElement;
  items: DropdownMenuItem[];
  align?: 'left' | 'right';
  width?: number;
  className?: string;
}

export function DropdownMenu({ trigger, items, align = 'right', width = 220, className = '' }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const click = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    };
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', click);
    window.addEventListener('keydown', key);
    return () => {
      document.removeEventListener('mousedown', click);
      window.removeEventListener('keydown', key);
    };
  }, [open]);

  const source = trigger as ReactElement<any>;
  const triggerElement = cloneElement(source, {
    'aria-haspopup': 'menu',
    'aria-expanded': open,
    onClick: (event: ReactMouseEvent<HTMLElement>) => {
      source.props.onClick?.(event);
      if (!event.defaultPrevented) setOpen(value => !value);
    },
  });

  return (
    <div className={`md-dropdown ${className}`} ref={ref}>
      {triggerElement}
      {open && (
        <div className={`md-dropdown__menu md-dropdown__menu--${align}`} role="menu" style={{ width }}>
          {items.map(item => (
            <div key={item.key}>
              {item.separatorBefore && <div className="md-dropdown__separator" />}
              <button
                type="button"
                role="menuitem"
                disabled={item.disabled}
                className={item.danger ? 'is-danger' : ''}
                onClick={() => {
                  if (item.disabled) return;
                  item.onSelect?.();
                  setOpen(false);
                }}
              >
                {item.icon && <span className="md-dropdown__icon">{item.icon}</span>}
                <span className="md-dropdown__copy">
                  <b>{item.label}</b>
                  {item.description && <small>{item.description}</small>}
                </span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
