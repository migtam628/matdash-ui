import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Pagination.css';
export interface PaginationProps { page: number; totalPages: number; onPageChange: (page: number) => void; siblingCount?: number; className?: string; }
function pagesFor(page:number,total:number,siblings:number){
  const values=new Set<number>([1,total,page]);
  for(let i=1;i<=siblings;i++){values.add(page-i);values.add(page+i)}
  return [...values].filter(v=>v>=1&&v<=total).sort((a,b)=>a-b);
}
export function Pagination({ page, totalPages, onPageChange, siblingCount = 1, className = '' }: PaginationProps) {
  const total=Math.max(1,totalPages); const current=Math.min(Math.max(1,page),total); const pages=pagesFor(current,total,siblingCount);
  return <nav className={`md-pagination ${className}`} aria-label="Pagination"><button type="button" aria-label="Previous page" disabled={current<=1} onClick={()=>onPageChange(current-1)}><ChevronLeft size={16}/></button>{pages.map((p,i)=><span className="md-pagination__slot" key={p}>{i>0&&p-pages[i-1]>1&&<em aria-hidden="true">…</em>}<button type="button" aria-current={p===current?'page':undefined} onClick={()=>onPageChange(p)}>{p}</button></span>)}<button type="button" aria-label="Next page" disabled={current>=total} onClick={()=>onPageChange(current+1)}><ChevronRight size={16}/></button></nav>;
}
