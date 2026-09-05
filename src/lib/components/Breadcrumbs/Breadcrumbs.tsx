import type { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import './Breadcrumbs.css';

export interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
  onClick?: () => void;
}
export interface BreadcrumbsProps { items: BreadcrumbItem[]; className?: string; }

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  return <nav className={`md-breadcrumbs ${className}`} aria-label="Breadcrumb"><ol>{items.map((item, index) => {
    const last = index === items.length - 1;
    return <li key={index}>{index > 0 && <ChevronRight size={13} aria-hidden="true"/>}{last ? <span aria-current="page">{item.label}</span> : item.href ? <a href={item.href}>{item.label}</a> : <button type="button" onClick={item.onClick}>{item.label}</button>}</li>;
  })}</ol></nav>;
}
