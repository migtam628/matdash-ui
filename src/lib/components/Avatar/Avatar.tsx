import './Avatar.css';
export interface AvatarProps { name: string; src?: string; size?: 'sm'|'md'|'lg'; status?: 'online'|'away'|'offline'; className?: string; }
export function Avatar({ name, src, size='md', status, className='' }: AvatarProps) { const initials=name.split(/\s+/).slice(0,2).map(x=>x[0]?.toUpperCase()).join(''); return <span className={`md-avatar md-avatar--${size} ${className}`} title={name}>{src ? <img src={src} alt={name}/> : <span>{initials}</span>}{status && <i className={`md-avatar__status md-avatar__status--${status}`}/>}</span>; }
