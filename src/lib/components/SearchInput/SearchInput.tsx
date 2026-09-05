import { Search, X } from 'lucide-react'; import type { InputHTMLAttributes } from 'react'; import { Input } from '../Input/Input';
export interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>,'type'> { onClear?:()=>void; }
export function SearchInput({value,onClear,...props}:SearchInputProps){return <Input type="search" value={value} leadingIcon={<Search size={17}/>} trailing={value && onClear ? <button type="button" className="md-search-clear" onClick={onClear} aria-label="Clear search"><X size={15}/></button>:undefined} {...props}/>}
