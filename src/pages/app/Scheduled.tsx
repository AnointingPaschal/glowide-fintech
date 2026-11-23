
import { useState } from 'react';
import { Page, DemoBadge } from '../../components/ui';
export default function Scheduled(){
 const [items,setItems]=useState([{id:'sch1',to:'@amara',amount:50,asset:'USDC',freq:'Monthly',next:'2026-12-01',active:true},{id:'sch2',to:'Glow Store',amount:25,asset:'USDC',freq:'Weekly',next:'2026-11-30',active:true}]);
 const [form,setForm]=useState({to:'',amount:'',freq:'Monthly'});
 return <Page><div className="flex justify-between"><h1 className="text-2xl font-bold text-slate-900 dark:text-white">Scheduled & Recurring Payments</h1><DemoBadge/></div>
 <form onSubmit={e=>{e.preventDefault(); if(!form.to||!form.amount) return; setItems([...items,{id:'sch'+Date.now(),to:form.to,amount:Number(form.amount),asset:'USDC',freq:form.freq,next:'2026-12-01',active:true}]); setForm({to:'',amount:'',freq:'Monthly'});}} className="card mt-6 grid gap-4 p-6 sm:grid-cols-4"><input className="input" placeholder="Recipient" value={form.to} onChange={e=>setForm({...form,to:e.target.value})}/><input className="input" type="number" placeholder="Amount" value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})}/><select className="input" value={form.freq} onChange={e=>setForm({...form,freq:e.target.value})}><option>Weekly</option><option>Monthly</option><option>Quarterly</option></select><button className="btn-primary">Schedule (simulated)</button></form>
 <div className="mt-4 space-y-3">{items.map(i=>(<div key={i.id} className="card flex flex-wrap items-center justify-between gap-3 p-5"><div><p className="font-semibold text-slate-900 dark:text-white">${i.amount} {i.asset} → {i.to}</p><p className="text-sm text-slate-400">{i.freq} · next {i.next} · {i.active?'Active':'Paused'}</p></div><button className="btn-ghost" onClick={()=>setItems(items.map(x=>x.id===i.id?{...x,active:!x.active}:x))}>{i.active?'Pause':'Resume'}</button></div>))}</div>
 <p className="mt-3 text-xs text-slate-400">Scheduled payments in demo do not execute. In production they run via Cloudflare Queues / scheduled Workers with idempotency and settlement verification.</p></Page>;
}
