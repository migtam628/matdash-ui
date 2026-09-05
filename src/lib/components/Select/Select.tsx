import type { SelectHTMLAttributes, ReactNode } from 'react'; import './Select.css';
export interface SelectOption{label:string;value:string}
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>{label?:string;options:SelectOption[];leadingIcon?:ReactNode}
export function Select({label,options,leadingIcon,className='',id,...props}:SelectProps){const selectId=id??`md-select-${label?.toLowerCase().replace(/[^a-z0-9]+/g,'-')??'field'}`;return <label className={`md-select-field ${className}`} htmlFor={selectId}>{label&&<span>{label}</span>}<div className="md-select-wrap">{leadingIcon&&<i>{leadingIcon}</i>}<select id={selectId} {...props}>{options.map(o=><option value={o.value} key={o.value}>{o.label}</option>)}</select></div></label>}
