import { useState, type ReactNode } from 'react';
import './Accordion.css';
export interface AccordionItem { value:string; title:ReactNode; content:ReactNode; disabled?:boolean; }
export interface AccordionProps { items:AccordionItem[]; value?:string[]; defaultValue?:string[]; onValueChange?:(value:string[])=>void; multiple?:boolean; className?:string; }
export function Accordion({items,value:controlled,defaultValue=[],onValueChange,multiple=false,className=''}:AccordionProps){
  const [internal,setInternal]=useState(defaultValue); const value=controlled??internal;
  const toggle=(key:string)=>{const isOpen=value.includes(key);let next:string[];if(multiple)next=isOpen?value.filter(v=>v!==key):[...value,key];else next=isOpen?[]:[key];if(controlled===undefined)setInternal(next);onValueChange?.(next)};
  return <div className={`md-accordion ${className}`}>{items.map(item=>{const open=value.includes(item.value);return <div className={`md-accordion__item ${open?'is-open':''}`} key={item.value}><button type="button" className="md-accordion__trigger" onClick={()=>toggle(item.value)} disabled={item.disabled} aria-expanded={open}><span>{item.title}</span><span className="md-accordion__chevron" aria-hidden>⌄</span></button>{open&&<div className="md-accordion__content">{item.content}</div>}</div>})}</div>
}
