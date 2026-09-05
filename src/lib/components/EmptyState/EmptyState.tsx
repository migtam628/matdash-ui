import type { ReactNode } from 'react'; import './EmptyState.css';
export interface EmptyStateProps{icon?:ReactNode;title:ReactNode;description?:ReactNode;action?:ReactNode}
export function EmptyState({icon,title,description,action}:EmptyStateProps){return <div className="md-empty">{icon&&<span>{icon}</span>}<h3>{title}</h3>{description&&<p>{description}</p>}{action&&<div>{action}</div>}</div>}
