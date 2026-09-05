import type { ReactNode } from 'react'; import './Tabs.css';
export interface TabItem{value:string;label:ReactNode;badge?:ReactNode}
export interface TabsProps{items:TabItem[];value:string;onChange:(value:string)=>void;variant?:'underline'|'pills';className?:string}
export function Tabs({items,value,onChange,variant='pills',className=''}:TabsProps){return <div className={`md-tabs md-tabs--${variant} ${className}`} role="tablist">{items.map(item=><button type="button" role="tab" aria-selected={value===item.value} className={value===item.value?'is-active':''} key={item.value} onClick={()=>onChange(item.value)}><span>{item.label}</span>{item.badge}</button>)}</div>}
