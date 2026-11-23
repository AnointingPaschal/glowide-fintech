import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Building2, History, Network, KeyRound, Sparkles, Settings, ScrollText, Shield, LogOut } from 'lucide-react';
import { useStore, logout } from '../lib/store';
import { Logo } from './Layout';
const LINKS:[string,string,typeof LayoutDashboard][]=[
 ['/admin','Overview',LayoutDashboard],['/admin/users','Users',Users],['/admin/businesses','Businesses',Building2],['/admin/transactions','Transactions',History],['/admin/blockchain','Blockchain',Network],['/admin/integrations','API & Integrations',KeyRound],['/admin/ai','AI Management',Sparkles],['/admin/settings','System Settings',Settings],['/admin/audit','Audit Logs',ScrollText],['/admin/security','Admin Security',Shield],
];
export default function AdminLayout(){
  const {user}=useStore(); const nav=useNavigate();
  if(!user || user.role!=='admin') return <div className="flex min-h-screen items-center justify-center bg-midnight-950 p-6 text-center"><div><h1 className="text-2xl font-bold text-white">Admin access required</h1><p className="mt-2 text-slate-400">Sign in with the demo admin account (admin@glowide.app / admin1234) to view the admin portal.</p><Link to="/login" className="btn-primary mt-6">Go to Login</Link></div></div>;
  return <div className="min-h-screen bg-slate-50 dark:bg-midnight-950">
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r bg-midnight-900 p-4 lg:flex">
      <Logo/>
      <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-violet-300">Admin Portal · Demo</p>
      <nav className="mt-4 flex-1 space-y-1 overflow-y-auto">{LINKS.map(([to,l,Icon])=>(<NavLink key={to} to={to} end={to==='/admin'} className={({isActive})=>`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium ${isActive?'bg-violet-600 text-white':'text-slate-300 hover:bg-white/10'}`}><Icon size={18}/>{l}</NavLink>))}</nav>
      <Link to="/app" className="rounded-xl px-3 py-2.5 text-sm text-slate-300 hover:bg-white/10">← Back to App</Link>
      <button onClick={()=>{logout(); nav('/');}} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10"><LogOut size={18}/>Log out</button>
    </aside>
    <div className="lg:pl-64">
      <header className="sticky top-0 z-20 border-b bg-white/80 px-4 py-3 backdrop-blur dark:border-white/10 dark:bg-midnight-950/80"><p className="text-sm font-semibold text-slate-900 dark:text-white">GlowIDE Admin <span className="badge ml-2 bg-amber-100 text-amber-800">DEMO DATA</span></p></header>
      <main className="mx-auto max-w-6xl px-4 py-6"><Outlet/></main>
      <nav className="flex gap-2 overflow-x-auto px-4 pb-6 lg:hidden">{LINKS.map(([to,l])=>(<NavLink key={to} to={to} end={to==='/admin'} className={({isActive})=>`whitespace-nowrap rounded-full px-4 py-2 text-sm ${isActive?'bg-violet-600 text-white':'bg-white dark:bg-white/10'}`}>{l}</NavLink>))}</nav>
    </div>
  </div>;
}
