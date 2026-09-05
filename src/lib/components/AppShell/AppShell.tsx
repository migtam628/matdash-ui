import type { ReactNode } from 'react'; import './AppShell.css';
export interface AppShellProps{sidebar?:ReactNode;topbar?:ReactNode;children:ReactNode;sidebarCollapsed?:boolean;className?:string}
export function AppShell({sidebar,topbar,children,sidebarCollapsed=false,className=''}:AppShellProps){return <div className={`md-app-shell ${sidebarCollapsed?'is-collapsed':''} ${className}`}>{sidebar&&<div className="md-app-shell__sidebar">{sidebar}</div>}<div className="md-app-shell__workspace">{topbar}<main className="md-app-shell__main">{children}</main></div></div>}
