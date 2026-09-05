import { useMemo, useState } from 'react';
import { Activity, Bell, BriefcaseBusiness, Building2, CalendarDays, ChevronDown, CircleDollarSign, Command, CreditCard, Download, FileBarChart, FolderKanban, Gauge, HelpCircle, LayoutDashboard, Menu, MessageSquareText, Moon, MoreHorizontal, Plus, RefreshCw, Search, Settings, Share2, ShieldCheck, Sparkles, Sun, TrendingUp, Users, WalletCards, Zap } from 'lucide-react';
import { ActivityFeed, Alert, AppShell, Avatar, Badge, BarChart, Breadcrumbs, Button, Card, CardHeader, Checkbox, DataTable, DonutChart, Drawer, DropdownMenu, IconButton, LineChart, Modal, PageHeader, Pagination, Progress, SearchInput, SegmentedControl, Select, Sidebar, StatCard, Switch, Tabs, Tooltip, Topbar, useMatDashTheme, useToast, type DataTableColumn } from '../lib';

type Project = { id:number; name:string; owner:string; status:'Active'|'Review'|'At risk'; progress:number; revenue:string; due:string };

const projects:Project[]=[
  {id:1,name:'Northstar Commerce',owner:'Olivia Chen',status:'Active',progress:82,revenue:'$24,850',due:'Sep 04'},
  {id:2,name:'Atlas Migration',owner:'Noah Williams',status:'Review',progress:64,revenue:'$18,240',due:'Sep 11'},
  {id:3,name:'Pulse Analytics',owner:'Maya Patel',status:'Active',progress:91,revenue:'$16,780',due:'Aug 31'},
  {id:4,name:'Helix Portal',owner:'Liam Brooks',status:'At risk',progress:43,revenue:'$13,420',due:'Sep 02'},
];

export function DashboardDemo(){
  const {theme,toggleTheme}=useMatDashTheme();
  const {toast}=useToast();
  const [active,setActive]=useState('overview');
  const [period,setPeriod]=useState('8m');
  const [query,setQuery]=useState('');
  const [tab,setTab]=useState('overview');
  const [modal,setModal]=useState(false);
  const [drawer,setDrawer]=useState(false);
  const [compact,setCompact]=useState(false);
  const [page,setPage]=useState(1);

  const columns:DataTableColumn<Project>[]=useMemo(()=>[
    {key:'name',header:'Project',sortable:true,sortValue:r=>r.name,render:r=><div className="demo-project-name"><span>{r.name[0]}</span><div><b>{r.name}</b><small>#{String(r.id).padStart(4,'0')}</small></div></div>,width:'30%'},
    {key:'owner',header:'Owner',sortable:true,sortValue:r=>r.owner,render:r=><span>{r.owner}</span>},
    {key:'status',header:'Status',render:r=><Badge tone={r.status==='Active'?'success':r.status==='Review'?'warning':'danger'} dot>{r.status}</Badge>},
    {key:'progress',header:'Progress',sortable:true,sortValue:r=>r.progress,render:r=><div style={{minWidth:110}}><Progress value={r.progress}/></div>},
    {key:'revenue',header:'Revenue',render:r=><b>{r.revenue}</b>,align:'right'},
    {key:'due',header:'Due',sortable:true,sortValue:r=>r.due,render:r=>r.due,align:'right'},
  ],[]);

  const filtered=projects.filter(p=>p.name.toLowerCase().includes(query.toLowerCase())||p.owner.toLowerCase().includes(query.toLowerCase()));
  const sidebar=<Sidebar activeKey={active} onSelect={setActive} brand={<div className="demo-brand"><span className="demo-brand-mark"><i/><i/><i/></span><b>MatDash</b></div>} items={[
    {key:'overview',label:'Overview',icon:<LayoutDashboard size={18}/>},
    {key:'analytics',label:'Analytics',icon:<FileBarChart size={18}/>,badge:<Badge tone="primary">12</Badge>},
    {key:'customers',label:'Customers',icon:<Users size={18}/>},
    {key:'projects',label:'Projects',icon:<FolderKanban size={18}/>},
    {key:'finance',label:'Finance',icon:<WalletCards size={18}/>},
    {key:'messages',label:'Messages',icon:<MessageSquareText size={18}/>,badge:<Badge tone="danger">4</Badge>},
    {key:'settings',label:'Settings',icon:<Settings size={18}/>},
  ]} footer={<div className="demo-sidebar-foot"><div className="demo-workspace"><Building2 size={17}/><div><b>MatDash Inc.</b><small>Business workspace</small></div></div><Button variant="ghost" size="sm" leadingIcon={<HelpCircle size={16}/>}>Help center</Button></div>}/>;

  const topbar=<Topbar left={<div className="demo-mobile-title"><Menu size={18}/><span>Command Center</span></div>} center={<div className="demo-command"><Search size={17}/><span>Search anything...</span><kbd><Command size={12}/> K</kbd></div>} right={<div className="demo-top-actions"><Tooltip content={theme==='dark'?'Use light theme':'Use dark theme'}><IconButton label="Theme" icon={theme==='dark'?<Sun size={18}/>:<Moon size={18}/>} onClick={toggleTheme}/></Tooltip><Tooltip content="Notifications"><IconButton label="Notifications" icon={<Bell size={18}/>} onClick={()=>toast({title:'You’re all caught up',description:'No new critical notifications.',tone:'success'})}/></Tooltip><Avatar name="David Morgan" status="online"/><div className="demo-user"><b>David</b><small>Administrator</small></div><DropdownMenu trigger={<span className="demo-user-menu-trigger"><ChevronDown size={15}/></span>} items={[{key:'profile',label:'Account settings',icon:<Settings size={15}/>},{key:'share',label:'Share dashboard',icon:<Share2 size={15}/>,onSelect:()=>toast({title:'Share link prepared',description:'Demo action completed locally.',tone:'info'})},{key:'refresh',label:'Refresh data',icon:<RefreshCw size={15}/>,separatorBefore:true,onSelect:()=>toast({title:'Dashboard refreshed',description:'All demo metrics are up to date.',tone:'success'})}]}/></div>} sticky/>;

  return <AppShell sidebar={sidebar} topbar={topbar}>
    <Breadcrumbs className="demo-breadcrumbs" items={[{label:'Workspace',onClick:()=>setActive('overview')},{label:'Analytics',onClick:()=>setActive('analytics')},{label:'Command Center'}]}/>
    <PageHeader eyebrow="Business intelligence" title="Operations Command Center" description="A redesigned dashboard built entirely from reusable MatDash UI components." actions={<><Button variant="secondary" leadingIcon={<Download size={16}/>}>Export</Button><Button leadingIcon={<Plus size={16}/>} onClick={()=>setModal(true)}>New report</Button></>}/>

    <div className="demo-toolbar">
      <Tabs value={tab} onChange={setTab} items={[{value:'overview',label:'Overview'},{value:'revenue',label:'Revenue'},{value:'operations',label:'Operations'},{value:'customers',label:'Customers'}]}/>
      <div className="demo-toolbar-actions"><SegmentedControl size="sm" value={period} onChange={setPeriod} options={[{value:'30d',label:'30D'},{value:'90d',label:'90D'},{value:'8m',label:'8M'},{value:'1y',label:'1Y'}]} ariaLabel="Dashboard period"/><DropdownMenu trigger={<IconButton label="More" variant="surface" icon={<MoreHorizontal size={18}/>}/>} items={[{key:'export',label:'Export dashboard',description:'Download the current view',icon:<Download size={15}/>,onSelect:()=>toast({title:'Export queued',description:'Your dashboard export is being prepared.',tone:'info'})},{key:'refresh',label:'Refresh metrics',icon:<RefreshCw size={15}/>,onSelect:()=>toast({title:'Metrics refreshed',tone:'success'})}]}/></div>
    </div>

    <section className="demo-hero">
      <div className="demo-hero-copy"><div className="demo-hero-chip"><Sparkles size={14}/> Executive pulse</div><h2>Momentum is up across revenue, delivery, and customer retention.</h2><p>Your strongest driver this period is project conversion. Four active engagements are forecast to close above target.</p><div className="demo-hero-actions"><Button size="sm" leadingIcon={<Zap size={15}/>}>View insights</Button><Button size="sm" variant="ghost">Open forecast</Button></div></div>
      <div className="demo-hero-score"><span>Business score</span><b>92</b><small>/100</small><Progress value={92} tone="success"/><em>+7 points this month</em></div>
    </section>

    <section className="demo-stat-grid">
      <StatCard label="Net revenue" value="$98,450" change={12.4} icon={<CircleDollarSign size={19}/>} trend={[42,48,45,58,62,70,68,81]} />
      <StatCard label="Active customers" value="36,358" change={8.1} tone="info" icon={<Users size={19}/>} trend={[24,31,29,35,34,42,46,49]} />
      <StatCard label="Project pipeline" value="$412K" change={31.8} tone="success" icon={<BriefcaseBusiness size={19}/>} trend={[20,30,29,41,39,49,57,64]} />
      <StatCard label="Conversion rate" value="18.6%" change={4.2} tone="warning" icon={<TrendingUp size={19}/>} trend={[34,31,36,38,37,42,40,47]} />
    </section>

    <section className="demo-primary-grid">
      <Card className="demo-revenue-card" padding="lg"><CardHeader title="Revenue intelligence" description="Actual revenue, forecast, and recurring baseline" action={<Badge tone="success" dot>On track</Badge>}/><LineChart labels={['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug']} series={[{name:'Actual',values:[54,62,58,73,79,88,93,108]},{name:'Forecast',values:[58,64,68,76,83,91,102,118]},{name:'Recurring',values:[38,41,44,47,49,54,57,61]}]} maxValue={120}/><div className="demo-chart-summary"><div><span>Forecast close</span><b>$118.2K</b></div><div><span>Recurring mix</span><b>51.6%</b></div><div><span>MoM growth</span><b className="demo-positive">+12.4%</b></div></div></Card>
      <Card padding="lg"><CardHeader title="Revenue mix" description="Share by channel"/><div className="demo-donut"><DonutChart centerValue="$98K" centerLabel="total" segments={[{label:'Direct',value:42},{label:'Partner',value:26},{label:'Recurring',value:21},{label:'Other',value:11}]}/></div></Card>
    </section>

    <section className="demo-secondary-grid">
      <Card padding="lg"><CardHeader title="Pipeline velocity" description="Value by deal stage" action={<Badge tone="info">$412K total</Badge>}/><div className="demo-bars"><BarChart horizontal showValues data={[{label:'Qualified',value:124},{label:'Proposal',value:96},{label:'Negotiation',value:72},{label:'Closing',value:58}]}/></div></Card>
      <Card padding="lg"><CardHeader title="Team capacity" description="Current workload distribution"/><div className="demo-capacity"><div><span>Engineering</span><b>84%</b><Progress value={84} tone="primary"/></div><div><span>Field operations</span><b>71%</b><Progress value={71} tone="info"/></div><div><span>Client success</span><b>63%</b><Progress value={63} tone="success"/></div><div><span>Finance</span><b>48%</b><Progress value={48} tone="warning"/></div></div></Card>
      <Card padding="lg"><CardHeader title="Risk monitor" description="Items requiring attention"/><Alert tone="warning" title="2 projects need review">Helix Portal and Atlas Migration have schedule risk.</Alert><div className="demo-risk-list"><div><ShieldCheck size={17}/><span><b>Security posture</b><small>No critical findings</small></span><Badge tone="success">Healthy</Badge></div><div><CreditCard size={17}/><span><b>Collections</b><small>3 invoices aging &gt; 30d</small></span><Badge tone="warning">Watch</Badge></div><div><Gauge size={17}/><span><b>SLA performance</b><small>97.8% within target</small></span><Badge tone="success">Healthy</Badge></div></div></Card>
    </section>

    <section className="demo-table-grid">
      <Card padding="none"><div className="demo-table-head"><div><h3>Project portfolio</h3><p>Delivery, revenue, and project health in one view.</p></div><div className="demo-table-actions"><SearchInput placeholder="Search projects..." value={query} onChange={e=>{setQuery(e.target.value);setPage(1)}} onClear={()=>{setQuery('');setPage(1)}}/><Switch label="Compact" checked={compact} onChange={e=>setCompact(e.target.checked)}/></div></div><DataTable columns={columns} rows={filtered} getRowKey={r=>r.id} compact={compact} striped selectable stickyHeader/><div className="demo-table-footer"><span>Showing {filtered.length} of 24 projects</span><Pagination page={page} totalPages={4} onPageChange={setPage}/></div></Card>
      <Card padding="lg"><CardHeader title="Live activity" description="Latest workspace changes" action={<IconButton label="Open activity panel" icon={<MoreHorizontal size={17}/>} onClick={()=>setDrawer(true)}/>} /><ActivityFeed items={[{id:1,title:'Revenue forecast updated',description:'Model refreshed using August performance.',time:'2m',icon:<TrendingUp size={16}/>,tone:'success'},{id:2,title:'New enterprise customer',description:'Nova Retail moved to active onboarding.',time:'14m',icon:<Users size={16}/>,tone:'primary'},{id:3,title:'Project milestone reached',description:'Pulse Analytics passed UAT.',time:'38m',icon:<FolderKanban size={16}/>,tone:'info'},{id:4,title:'Invoice requires review',description:'Invoice #INV-2481 is 32 days outstanding.',time:'1h',icon:<CreditCard size={16}/>,tone:'warning'}]}/></Card>
    </section>

    <Modal open={modal} onClose={()=>setModal(false)} title="Create executive report" description="Configure a new dashboard report." footer={<><Button variant="ghost" onClick={()=>setModal(false)}>Cancel</Button><Button onClick={()=>{setModal(false);toast({title:'Report created',description:'Executive summary is ready in your reports workspace.',tone:'success'})}}>Create report</Button></>}><div className="demo-form"><Select label="Report type" options={[{value:'exec',label:'Executive summary'},{value:'rev',label:'Revenue report'},{value:'ops',label:'Operations report'}]}/><Select label="Time range" options={[{value:'30',label:'Last 30 days'},{value:'90',label:'Last 90 days'},{value:'365',label:'Last year'}]}/><Switch label="Include commentary" description="Add a short written performance summary." defaultChecked/><Checkbox label="Attach supporting tables" description="Include project and pipeline detail in the generated report." defaultChecked/></div></Modal>

    <Drawer open={drawer} onClose={()=>setDrawer(false)} title="Activity center"><ActivityFeed items={[{id:'a',title:'Dashboard viewed',description:'Operations Command Center opened by David.',time:'Now',icon:<Activity size={16}/>,tone:'primary'},{id:'b',title:'Data sync complete',description:'Revenue and project data refreshed successfully.',time:'3m',icon:<Zap size={16}/>,tone:'success'},{id:'c',title:'Monthly close scheduled',description:'Finance close is scheduled for Aug 31.',time:'21m',icon:<CalendarDays size={16}/>,tone:'info'}]}/></Drawer>
  </AppShell>;
}
