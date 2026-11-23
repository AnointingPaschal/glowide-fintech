import { Link } from 'react-router-dom';
import { Page } from '../../components/ui';

import { ArrowRight, Shield, Zap, Globe, Wallet, Sparkles, Check } from 'lucide-react';
import { CHAINS } from '../../lib/chains';
import { BarChart } from '../../components/ui';
export default function Home(){
 return <Page>
  <section className="bg-midnight-950 text-white">
   <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-2 lg:py-24">
    <div>
     <span className="badge bg-violet-500/20 text-violet-300">Arc-first · Multichain · Demo build</span>
     <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-6xl">Money that moves<br/><span className="bg-gradient-to-r from-violet-400 via-lavender-300 to-amber-300 bg-clip-text text-transparent" style={{backgroundImage:'linear-gradient(90deg,#A78BFA,#F5C400)'}}>at the speed of light.</span></h1>
     <p className="mt-4 max-w-lg text-lg text-slate-300">GlowIDE is a premium global fintech super-app: send, receive, exchange and manage money across Arc, Base, Ethereum and Solana — with business tools and GlowIDE AI built in.</p>
     <div className="mt-6 flex flex-wrap gap-3"><Link to="/register" className="btn-primary">Create free account <ArrowRight size={16}/></Link><Link to="/features" className="btn-secondary !bg-white/10 !text-white">Explore features</Link></div>
     <p className="mt-4 text-xs text-slate-400">Demo build — all balances and transactions shown are simulated / testnet. No real money moves.</p>
     <div className="mt-8 grid grid-cols-3 gap-4 text-center">
       <div><p className="text-2xl font-bold">4</p><p className="text-xs text-slate-400">Networks in architecture</p></div>
       <div><p className="text-2xl font-bold">Arc</p><p className="text-xs text-slate-400">Primary chain (testnet)</p></div>
       <div><p className="text-2xl font-bold">USDC</p><p className="text-xs text-slate-400">Primary stablecoin</p></div>
     </div>
    </div>
    <div className="card !bg-white/5 !border-white/10 p-6 text-white shadow-glow">
     <div className="flex items-center justify-between"><p className="font-semibold">Live product preview — demo data</p><span className="badge bg-amber-500/20 text-amber-300">SIMULATED</span></div>
     <p className="mt-1 text-3xl font-bold">$4,820.75</p><p className="text-sm text-slate-400">Total portfolio · available $4,500.75 · pending $320.00</p>
     <div className="mt-4"><BarChart data={[{label:'Mon',value:420},{label:'Tue',value:680},{label:'Wed',value:510},{label:'Thu',value:890},{label:'Fri',value:740},{label:'Sat',value:620},{label:'Sun',value:480}]}/></div>
     <div className="mt-4 space-y-2 text-sm">{['USDC · Arc — $2,410.25','ETH · Base — $1,180.50','SOL · Solana — $930.00','USD · Sandbox — $300.00'].map(x=><div key={x} className="flex justify-between rounded-xl bg-white/5 px-3 py-2"><span>{x.split(' — ')[0]}</span><span className="font-semibold">{x.split(' — ')[1]}</span></div>)}</div>
     <Link to="/app" className="btn-primary mt-5 w-full">Open the demo dashboard</Link>
    </div>
   </div>
  </section>
  <section className="mx-auto max-w-7xl px-4 py-16">
   <h2 className="text-3xl font-bold text-slate-900 dark:text-white">One app. Every kind of money.</h2>
   <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    {[{i:Wallet,t:'Universal wallet',d:'One GlowIDE username, many networks. No blockchain jargon required.'},{i:Zap,t:'Instant payments',d:'Internal transfers, payment links, QR and scheduled payments.'},{i:Shield,t:'Security first',d:'2FA, session management, audit logs and encrypted secrets.'},{i:Sparkles,t:'GlowIDE AI',d:'Understand transactions, fees and reports — via the Worker, never in the browser.'}].map(c=><div key={c.t} className="card p-6"><c.i className="text-violet-600"/><h3 className="mt-3 font-bold text-slate-900 dark:text-white">{c.t}</h3><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{c.d}</p></div>)}
   </div>
   <h3 className="mt-12 text-xl font-bold text-slate-900 dark:text-white">Networks</h3>
   <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{CHAINS.map(c=><div key={c.id} className="card p-5"><p className="font-bold text-slate-900 dark:text-white">{c.name} {c.primary&&<span className="badge bg-violet-100 text-violet-700">Primary</span>}</p><p className="mt-1 text-sm text-slate-500">{c.description}</p><p className="mt-2 text-xs text-slate-400">Status: {c.status} · {c.explorer}</p></div>)}</div>
   <div className="mt-12 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 p-8 text-center text-white"><h3 className="text-2xl font-bold">Ready to glow?</h3><p className="mt-2 text-violet-100">Create a demo account in seconds. No real funds, no real keys.</p><Link to="/register" className="mt-5 inline-flex btn-primary !bg-white !text-violet-700">Get started free</Link></div>
  </section>
 </Page>;
}
