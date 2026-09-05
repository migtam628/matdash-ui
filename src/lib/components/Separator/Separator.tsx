import './Separator.css';
export interface SeparatorProps { orientation?:'horizontal'|'vertical'; className?:string; decorative?:boolean; }
export function Separator({orientation='horizontal',className='',decorative=true}:SeparatorProps){return <div className={`md-separator md-separator--${orientation} ${className}`} role={decorative?'none':'separator'} aria-orientation={decorative?undefined:orientation}/>}
