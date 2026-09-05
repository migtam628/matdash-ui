import type { HTMLAttributes, ReactNode } from 'react'; import './Toolbar.css';
export interface ToolbarProps extends HTMLAttributes<HTMLDivElement>{label?:string;start?:ReactNode;end?:ReactNode;wrap?:boolean}
export function Toolbar({label='Toolbar',start,end,children,className='',wrap=true,...props}:ToolbarProps){return <div className={`md-toolbar ${wrap?'md-toolbar--wrap':''} ${className}`} role="toolbar" aria-label={label} {...props}><div className="md-toolbar__group">{start}{children}</div>{end&&<div className="md-toolbar__group md-toolbar__group--end">{end}</div>}</div>}
