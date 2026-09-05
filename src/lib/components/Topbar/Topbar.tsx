import type { ReactNode } from 'react'; import './Topbar.css';
export interface TopbarProps{left?:ReactNode;center?:ReactNode;right?:ReactNode;sticky?:boolean;className?:string}
export function Topbar({left,center,right,sticky=false,className=''}:TopbarProps){return <header className={`md-topbar ${sticky?'is-sticky':''} ${className}`}><div>{left}</div><div className="md-topbar__center">{center}</div><div className="md-topbar__right">{right}</div></header>}
