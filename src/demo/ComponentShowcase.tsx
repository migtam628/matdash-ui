import { useMemo, useState } from 'react';
import { Activity, Bell, CalendarDays, Command, Copy, FileText, Folder, FolderOpen, LayoutGrid, Plus, Search, Settings, Share2, Trash2, User, Users } from 'lucide-react';
import { Accordion, AreaChart, Badge, Button, Calendar, Card, CardHeader, Combobox, CommandPalette, ContextMenu, DatePicker, FormField, IconButton, Popover, RadioGroup, RadialProgress, Separator, Slider, Stepper, Textarea, Toolbar, TreeView, useMatDashTheme, useToast, type CommandPaletteItem, type TreeNode } from '../lib';

export function ComponentShowcase(){
  const {theme,toggleTheme}=useMatDashTheme(); const {toast}=useToast();
  const [palette,setPalette]=useState(false); const [team,setTeam]=useState('ops'); const [date,setDate]=useState<Date|null>(new Date(2026,7,30)); const [step,setStep]=useState(1); const [range,setRange]=useState(72); const [plan,setPlan]=useState('pro');
  const commands:CommandPaletteItem[]=useMemo(()=>[
    {id:'new-report',label:'Create report',description:'Start a new executive report',group:'Actions',icon:<Plus size={16}/>,shortcut:'R',onSelect:()=>toast({title:'Report action selected',tone:'success'})},
    {id:'search-customer',label:'Search customers',description:'Open global customer search',group:'Actions',icon:<Search size={16}/>,shortcut:'C'},
    {id:'settings',label:'Workspace settings',description:'Manage themes and preferences',group:'Navigation',icon:<Settings size={16}/>},
    {id:'activity',label:'Activity center',description:'Review recent workspace events',group:'Navigation',icon:<Activity size={16}/>},
  ],[toast]);
  const tree:TreeNode[]=[{id:'workspace',label:'Workspace',icon:<FolderOpen size={15}/>,children:[{id:'dashboards',label:'Dashboards',icon:<LayoutGrid size={15}/>,meta:'6'},{id:'reports',label:'Reports',icon:<FileText size={15}/>,meta:'12'},{id:'teams',label:'Teams',icon:<Users size={15}/>,children:[{id:'ops',label:'Operations',icon:<User size={14}/>},{id:'sales',label:'Sales',icon:<User size={14}/>}]}]},{id:'archive',label:'Archive',icon:<Folder size={15}/>,meta:'24'}];
  return <div className="showcase-page">
    <header className="showcase-head"><div><Badge tone="primary">v0.2.0</Badge><h1>MatDash Component Lab</h1><p>Interactive examples for the expanded TSX + CSS design system.</p></div><Toolbar end={<><Button variant="secondary" onClick={toggleTheme}>{theme==='dark'?'Light':'Dark'} theme</Button><Button leadingIcon={<Command size={15}/>} onClick={()=>setPalette(true)}>Command palette</Button></>}/></header>

    <section className="showcase-grid showcase-grid--2">
      <Card padding="lg"><CardHeader title="Selection & input" description="Composable form controls with controlled/uncontrolled state."/><div className="showcase-stack"><Combobox label="Team" value={team} onChange={setTeam} options={[{value:'ops',label:'Operations',description:'Field and delivery teams'},{value:'sales',label:'Sales',description:'Revenue organization'},{value:'support',label:'Support',description:'Customer success and help desk'}]}/><DatePicker label="Reporting date" value={date} onChange={setDate}/><RadioGroup label="Workspace plan" value={plan} onChange={setPlan} orientation="horizontal" options={[{value:'starter',label:'Starter'},{value:'pro',label:'Pro'},{value:'enterprise',label:'Enterprise'}]}/><Slider label="Capacity threshold" min={0} max={100} value={range} onChange={e=>setRange(Number(e.target.value))} formatValue={v=>`${v}%`}/><FormField label="Report notes" description="Visible to workspace administrators."><Textarea placeholder="Add a short note..."/></FormField></div></Card>
      <Card padding="lg"><CardHeader title="Calendar" description="Standalone calendar and date selection primitive."/><div className="showcase-calendar"><Calendar value={date} onChange={setDate}/></div></Card>
    </section>

    <section className="showcase-grid showcase-grid--3">
      <Card padding="lg"><CardHeader title="Radial progress" description="Compact health and goal visualization."/><div className="showcase-radials"><RadialProgress value={92} tone="success" label="Health"/><RadialProgress value={68} tone="info" size={110} label="Capacity"/><RadialProgress value={41} tone="warning" size={96} label="Risk"/></div></Card>
      <Card padding="lg"><CardHeader title="Workflow stepper" description="Horizontal or vertical multi-step flows."/><Stepper activeStep={step} onStepClick={setStep} steps={[{label:'Configure',description:'Report settings'},{label:'Review',description:'Confirm data'},{label:'Publish',description:'Share output'}]}/><div className="showcase-step-actions"><Button variant="secondary" size="sm" disabled={step===0} onClick={()=>setStep(s=>Math.max(0,s-1))}>Back</Button><Button size="sm" disabled={step===2} onClick={()=>setStep(s=>Math.min(2,s+1))}>Continue</Button></div></Card>
      <Card padding="lg"><CardHeader title="Navigation tree" description="Nested workspace structures and metadata."/><TreeView nodes={tree} defaultExpanded={['workspace','teams']} defaultSelectedId="dashboards" onSelect={node=>toast({title:`Selected ${String(node.label)}`,tone:'info'})}/></Card>
    </section>

    <Card padding="lg"><CardHeader title="Area chart" description="Multi-series SVG visualization without a charting dependency."/><AreaChart labels={['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug']} series={[{name:'Revenue',values:[42,56,51,68,74,86,92,108]},{name:'Forecast',values:[48,59,63,71,80,90,104,118]},{name:'Recurring',values:[29,32,36,39,44,48,53,57]}]} maxValue={120}/></Card>

    <section className="showcase-grid showcase-grid--2">
      <Card padding="lg"><CardHeader title="Disclosure" description="Accordion and generic popover building blocks."/><Accordion defaultValue={['access']} items={[{value:'access',title:'Accessible by default',content:'Semantic buttons, ARIA state, focus-visible treatments, and keyboard-aware interaction are included in the primitives.'},{value:'tokens',title:'Token driven',content:'Spacing, surfaces, borders, status colors, radii, and control heights are backed by CSS custom properties.'},{value:'composition',title:'Designed for composition',content:'Low-level controls can be combined with Card, Toolbar, FormField, Popover, and layout primitives without a CSS-in-JS runtime.'}]}/><Separator/><Popover trigger={<Button variant="secondary" leadingIcon={<Bell size={15}/>}>Open popover</Button>} width={280}><div className="showcase-popover"><b>Notifications</b><p>Popover content can contain any React content.</p><Button size="sm" onClick={()=>toast({title:'Notification marked as read',tone:'success'})}>Mark read</Button></div></Popover></Card>
      <Card padding="lg"><CardHeader title="Context actions" description="Right-click the surface below to open a context menu."/><ContextMenu items={[{key:'copy',label:'Duplicate component',icon:<Copy size={15}/>,shortcut:'⌘D',onSelect:()=>toast({title:'Component duplicated',tone:'success'})},{key:'share',label:'Share',icon:<Share2 size={15}/>},{key:'delete',label:'Delete',icon:<Trash2 size={15}/>,danger:true,separatorBefore:true,onSelect:()=>toast({title:'Delete action selected',tone:'danger'})}]}><div className="showcase-context"><LayoutGrid size={30}/><b>Right-click this component surface</b><span>ContextMenu positions itself at the pointer.</span></div></ContextMenu></Card>
    </section>

    <CommandPalette open={palette} onClose={()=>setPalette(false)} items={commands}/>
  </div>
}
