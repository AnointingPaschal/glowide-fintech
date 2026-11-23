import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
export function Page({children}:{children:ReactNode}){ return <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:.35}}>{children}</motion.div>; }
export function SectionTitle({title,sub}:{title:string;sub?:string}){ return <div className="mb-6"><h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">{title}</h1>{sub&&<p className="mt-1 text-slate-600 dark:text-slate-400">{sub}</p>}</div>; }
export function DemoBadge(){ return <span className="badge bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300">DEMO MODE — simulated, no real money</span>; }
export function ModeBadge({mode}:{mode:string}){ const c=mode==='TESTNET'?'bg-sky-100 text-sky-800 dark:bg-sky-500/20 dark:text-sky-300':mode==='SIMULATED'?'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300':'bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-300'; return <span className={`badge ${c}`}>{mode}</span>; }
export function Stat({label,value,sub}:{label:string;value:string;sub?:string}){ return <div className="card p-5"><p className="text-sm text-slate-500 dark:text-slate-400">{label}</p><p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{value}</p>{sub&&<p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{sub}</p>}</div>; }
export function Empty({title,sub}:{title:string;sub?:string}){ return <div className="card p-10 text-center"><p className="font-semibold text-slate-900 dark:text-white">{title}</p>{sub&&<p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{sub}</p>}</div>; }
// Simple SVG bar chart — no chart dependency needed
export function BarChart({data}:{data:{label:string;value:number}[]}){
  const max=Math.max(...data.map(d=>d.value),1);
  return <div className="flex h-40 items-end gap-3">{data.map((d,i)=>(<div key={i} className="flex flex-1 flex-col items-center gap-2"><div className="w-full rounded-t-lg bg-gradient-to-t from-violet-600 to-violet-400" style={{height:`${(d.value/max)*120}px`}} title={`${d.label}: $${d.value}`} /><span className="text-xs text-slate-500 dark:text-slate-400">{d.label}</span></div>))}</div>;
}
export function FieldError({msg}:{msg?:string}){ return msg? <p className="mt-1 text-xs text-red-600">{msg}</p>:null; }
