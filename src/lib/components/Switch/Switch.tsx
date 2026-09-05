import type { InputHTMLAttributes } from 'react'; import './Switch.css';
export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>,'type'>{label:string;description?:string}
export function Switch({label,description,className='',...props}:SwitchProps){return <label className={`md-switch ${className}`}><input type="checkbox" {...props}/><span className="md-switch__control"><i/></span><span className="md-switch__copy"><b>{label}</b>{description&&<small>{description}</small>}</span></label>}
