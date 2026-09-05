import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react';
import { CheckCircle2, Info, TriangleAlert, X, XCircle } from 'lucide-react';
import './Toast.css';
export type ToastTone='default'|'success'|'info'|'warning'|'danger';
export interface ToastInput { title: ReactNode; description?: ReactNode; tone?: ToastTone; duration?: number; }
type ToastRecord=ToastInput&{id:number};
type ToastContextValue={toast:(input:ToastInput)=>number;dismiss:(id:number)=>void};
const ToastContext=createContext<ToastContextValue|null>(null);
export interface ToastProviderProps{children:ReactNode;position?:'top-right'|'top-left'|'bottom-right'|'bottom-left'}
const icons={default:Info,success:CheckCircle2,info:Info,warning:TriangleAlert,danger:XCircle};
export function ToastProvider({children,position='bottom-right'}:ToastProviderProps){
  const [items,setItems]=useState<ToastRecord[]>([]); const nextId=useRef(1); const timers=useRef(new Map<number,number>());
  const dismiss=useCallback((id:number)=>{setItems(v=>v.filter(t=>t.id!==id));const timer=timers.current.get(id);if(timer){window.clearTimeout(timer);timers.current.delete(id)}},[]);
  const toast=useCallback((input:ToastInput)=>{const id=nextId.current++;setItems(v=>[...v,{...input,id}]);const duration=input.duration??4200;if(duration>0){const timer=window.setTimeout(()=>dismiss(id),duration);timers.current.set(id,timer)}return id},[dismiss]);
  const value=useMemo(()=>({toast,dismiss}),[toast,dismiss]);
  return <ToastContext.Provider value={value}>{children}<div className={`md-toasts md-toasts--${position}`} aria-live="polite">{items.map(item=>{const tone=item.tone??'default';const Icon=icons[tone];return <div className={`md-toast md-toast--${tone}`} key={item.id}><span className="md-toast__icon"><Icon size={18}/></span><div className="md-toast__copy"><b>{item.title}</b>{item.description&&<span>{item.description}</span>}</div><button type="button" aria-label="Dismiss notification" onClick={()=>dismiss(item.id)}><X size={16}/></button></div>})}</div></ToastContext.Provider>;
}
export function useToast(){const ctx=useContext(ToastContext);if(!ctx)throw new Error('useToast must be used inside ToastProvider');return ctx;}
