import { useMemo, useState } from 'react';
import './Calendar.css';

export interface CalendarProps {
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  weekStartsOn?: 0 | 1;
  className?: string;
}
const sameDay=(a?:Date|null,b?:Date|null)=>!!a&&!!b&&a.getFullYear()===b.getFullYear()&&a.getMonth()===b.getMonth()&&a.getDate()===b.getDate();
const startOfDay=(d:Date)=>new Date(d.getFullYear(),d.getMonth(),d.getDate()).getTime();
const monthName=(d:Date)=>d.toLocaleDateString(undefined,{month:'long',year:'numeric'});
export function Calendar({value:controlled,defaultValue=null,onChange,minDate,maxDate,weekStartsOn=0,className=''}:CalendarProps){
  const initial=controlled !== undefined ? (controlled ?? new Date()) : (defaultValue ?? new Date());
  const [internal,setInternal]=useState<Date|null>(defaultValue);
  const [view,setView]=useState(()=>new Date(initial.getFullYear(),initial.getMonth(),1));
  const value=controlled !== undefined ? controlled : internal;
  const days=useMemo(()=>{
    const first=new Date(view.getFullYear(),view.getMonth(),1); const last=new Date(view.getFullYear(),view.getMonth()+1,0);
    const offset=(first.getDay()-weekStartsOn+7)%7; const total=Math.ceil((offset+last.getDate())/7)*7;
    return Array.from({length:total},(_,i)=>new Date(view.getFullYear(),view.getMonth(),i-offset+1));
  },[view,weekStartsOn]);
  const labels=weekStartsOn===1?['Mon','Tue','Wed','Thu','Fri','Sat','Sun']:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const disabled=(d:Date)=>(minDate&&startOfDay(d)<startOfDay(minDate))||(maxDate&&startOfDay(d)>startOfDay(maxDate));
  const select=(d:Date)=>{if(disabled(d))return;if(controlled===undefined)setInternal(d);onChange?.(d);if(d.getMonth()!==view.getMonth())setView(new Date(d.getFullYear(),d.getMonth(),1));};
  return <div className={`md-calendar ${className}`}>
    <div className="md-calendar__header"><button type="button" aria-label="Previous month" onClick={()=>setView(new Date(view.getFullYear(),view.getMonth()-1,1))}>‹</button><b>{monthName(view)}</b><button type="button" aria-label="Next month" onClick={()=>setView(new Date(view.getFullYear(),view.getMonth()+1,1))}>›</button></div>
    <div className="md-calendar__weekdays">{labels.map(l=><span key={l}>{l}</span>)}</div>
    <div className="md-calendar__grid">{days.map(d=>{const outside=d.getMonth()!==view.getMonth();const selected=sameDay(d,value);const today=sameDay(d,new Date());return <button type="button" key={d.toISOString()} disabled={!!disabled(d)} className={`${outside?'is-outside':''} ${selected?'is-selected':''} ${today?'is-today':''}`} onClick={()=>select(d)} aria-pressed={selected}>{d.getDate()}</button>})}</div>
  </div>;
}
