import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Moon, Sun, Menu, X, LayoutDashboard, Send, ArrowDownToLine, ArrowUpFromLine, Repeat, History, Link2, QrCode, CalendarClock, Wallet, BookUser, Settings, Shield, Bell, Sparkles, Briefcase, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useStore, logout } from '../lib/store';

export function Logo({size=32}:{size?:number}){ return <Link to="/" className="flex items-center gap-2"><img src="/logo.svg" alt="GlowIDE logo" width={size} height={size} className="rounded-xl" /><span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">Glow<span className="text-violet-500">IDE</span></span></Link>; }

const PUBLIC_LINKS=[['/about','About'],['/features','Features'],['/personal','Personal'],['/business','Business'],['/payments','Payments'],['/multichain','Multichain'],['/developers','Developers'],['/security','Security'],['/help','Help Center']];

export function PublicLayout(){
  const {dark,toggle}=useTheme(); const [open,setOpen]=useState(false); const {user}=useStore();
  return <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-midnight-950 dark:text-slate-100">
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-midnight-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Logo/>
        <nav className="hidden items-center gap-1 lg:flex">{PUBLIC_LINKS.map(([to,l])=>(<NavLink key={to} to={to} className={({isActive})=>`rounded-lg px-3 py-2 text-sm font-medium ${isActive?'text-violet-600 dark:text-violet-300 bg-violet-50 dark:bg-white/10':'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'}`}>{l}</NavLink>))}</nav>
        <div className="flex items-center gap-2">
          <button onClick={toggle} aria-label="Toggle theme" className="btn-ghost">{dark?<Sun size={18}/>:<Moon size={18}/>}</button>
          {user? <Link to="/app" className="btn-primary !px-4 !py-2">Open App</Link> : <><Link to="/login" className="btn-ghost hidden sm:inline-flex">Login</Link><Link to="/register" className="btn-primary !px-4 !py-2">Get Started</Link></>}
          <button className="btn-ghost lg:hidden" aria-label="Menu" onClick={()=>setOpen(!open)}>{open?<X size={20}/>:<Menu size={20}/>}</button>
        </div>
      </div>
      {open&&<nav className="border-t px-4 py-3 lg:hidden dark:border-white/10">{PUBLIC_LINKS.map(([to,l])=>(<NavLink key={to} to={to} onClick={()=>setOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-white/10">{l}</NavLink>))}<Link to="/contact" className="block rounded-lg px-3 py-2 text-sm">Contact</Link><Link to="/terms" className="block rounded-lg px-3 py-2 text-sm">Terms</Link><Link to="/privacy" className="block rounded-lg px-3 py-2 text-sm">Privacy</Link></nav>}
    </header>
    <main><Outlet/></main>
    <footer className="border-t border-slate-200 bg-white dark:border-white/10 dark:bg-midnight-900">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div><Logo/><p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Premium global crypto fintech. Arc-first multichain money — simulated demo build, no real funds.</p></div>
        <div><h4 className="font-semibold">Product</h4><div className="mt-3 flex flex-col gap-2 text-sm text-slate-500">{[['/features','Features'],['/personal','Personal'],['/business','Business'],['/payments','Payments'],['/multichain','Multichain']].map(([t,l])=>(<Link key={t} to={t} className="hover:text-violet-500">{l}</Link>))}</div></div>
        <div><h4 className="font-semibold">Company</h4><div className="mt-3 flex flex-col gap-2 text-sm text-slate-500">{[['/about','About'],['/developers','Developers'],['/security','Security'],['/help','Help Center'],['/contact','Contact']].map(([t,l])=>(<Link key={t} to={t} className="hover:text-violet-500">{l}</Link>))}</div></div>
        <div><h4 className="font-semibold">Legal</h4><div className="mt-3 flex flex-col gap-2 text-sm text-slate-500">{[['/terms','Terms of Service'],['/privacy','Privacy Policy'],['/login','Login'],['/register','Register']].map(([t,l])=>(<Link key={t} to={t} className="hover:text-violet-500">{l}</Link>))}</div></div>
      </div>
      <div className="border-t py-4 text-center text-xs text-slate-400 dark:border-white/10">© 2026 GlowIDE. Demo build — all financial activity is simulated/testnet. No real money moves.</div>
    </footer>
  </div>;
}

const APP_LINKS:[string,string,typeof LayoutDashboard][]=[
 ['/app','Dashboard',LayoutDashboard],['/app/send','Send',Send],['/app/receive','Receive',ArrowDownToLine],['/app/request','Request',ArrowUpFromLine],['/app/exchange','Exchange',Repeat],['/app/transactions','Transactions',History],['/app/payment-links','Payment Links',Link2],['/app/qr','QR Payments',QrCode],['/app/scheduled','Scheduled',CalendarClock],['/app/wallet','Wallet',Wallet],['/app/address-book','Address Book',BookUser],['/app/ai','GlowIDE AI',Sparkles],['/app/business','Business',Briefcase],['/app/notifications','Notifications',Bell],['/app/settings','Settings',Settings],['/app/security','Security',Shield],
];
export function AppLayout(){
  const {dark,toggle}=useTheme(); const {user}=useStore(); const nav=useNavigate();
  if(!user) return <div className="flex min-h-screen items-center justify-center bg-midnight-950 p-6 text-center"><div><h1 className="text-2xl font-bold text-white">Login required</h1><p className="mt-2 text-slate-400">This is the demo app. Use the demo login to continue.</p><Link to="/login" className="btn-primary mt-6">Go to Login</Link></div></div>;
  const doLogout=()=>{logout(); nav('/');};
  return <div className="min-h-screen bg-slate-50 dark:bg-midnight-950">
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-midnight-900 lg:flex">
      <Logo/>
      <div className="mt-4 rounded-xl bg-violet-50 p-3 text-sm dark:bg-white/5"><p className="font-semibold text-slate-900 dark:text-white">{user.name}</p><p className="text-xs text-slate-500">@{user.username} · {user.accountType}</p><span className="badge mt-2 bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300">DEMO</span></div>
      <nav className="mt-4 flex-1 space-y-1 overflow-y-auto">{APP_LINKS.map(([to,l,Icon])=>(<NavLink key={to} to={to} end={to==='/app'} className={({isActive})=>`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium ${isActive?'bg-violet-600 text-white':'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10'}`}><Icon size={18}/>{l}</NavLink>))}</nav>
      <button onClick={doLogout} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10"><LogOut size={18}/>Log out</button>
    </aside>
    <div className="lg:pl-64">
      <header className="sticky top-0 z-20 flex items-center justify-between border-b bg-white/80 px-4 py-3 backdrop-blur dark:border-white/10 dark:bg-midnight-950/80"><div className="lg:hidden"><Logo size={26}/></div><div className="hidden text-sm text-slate-500 lg:block dark:text-slate-400">GlowIDE App · <span className="font-semibold text-amber-600">Demo mode — simulated, no real money</span></div><button onClick={toggle} aria-label="Toggle theme" className="btn-ghost">{dark?<Sun size={18}/>:<Moon size={18}/>}</button></header>
      <main className="mx-auto max-w-6xl px-4 pb-28 pt-6 lg:pb-10"><Outlet/></main>
    </div>
    <nav className="fixed inset-x-0 bottom-0 z-30 flex justify-around border-t bg-white/95 px-2 py-2 backdrop-blur dark:border-white/10 dark:bg-midnight-900/95 lg:hidden">
      {APP_LINKS.slice(0,5).map(([to,l,Icon])=>(<NavLink key={to} to={to} end={to==='/app'} className={({isActive})=>`flex flex-col items-center gap-1 rounded-lg px-3 py-1 text-[11px] ${isActive?'text-violet-600 dark:text-violet-300':'text-slate-500'}`}><Icon size={20}/>{l.split(' ')[0]}</NavLink>))}
    </nav>
  </div>;
}
