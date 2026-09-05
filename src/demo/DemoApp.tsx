import { useState } from 'react';
import { DashboardDemo } from './DashboardDemo';
import { ComponentShowcase } from './ComponentShowcase';
import './showcase.css';

export function DemoApp(){
  const [view,setView]=useState<'dashboard'|'components'>('dashboard');
  return <>
    <div className="demo-view-switch" role="navigation" aria-label="Demo view">
      <span>MatDash UI <b>v0.2.0</b></span>
      <button type="button" className={view==='dashboard'?'is-active':''} onClick={()=>setView('dashboard')}>Dashboard</button>
      <button type="button" className={view==='components'?'is-active':''} onClick={()=>setView('components')}>Component Lab</button>
    </div>
    {view==='dashboard'?<DashboardDemo/>:<ComponentShowcase/>}
  </>;
}
