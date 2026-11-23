
import { useState } from 'react';
import { Page, DemoBadge, FieldError, ModeBadge } from '../../components/ui';
import { sendSchema, zodErrors } from '../../lib/validation';
import { addTx, useStore, getState, setState } from '../../lib/store';
import { fmtUSD, uid } from '../../lib/format';
import { CHAINS } from '../../lib/chains';
export type Kind='send'|'receive'|'request'|'deposit'|'withdraw'|'exchange';
const META:Record<Kind,{title:string;sub:string;cta:string;type:string}>={
 send:{title:'Send money',sub:'Send to a GlowIDE username, email or wallet address. Simulated in demo.',cta:'Send (simulated)',type:'Send'},
 receive:{title:'Receive money',sub:'Share your GlowIDE username or QR code to get paid.',cta:'Generate request',type:'Receive'},
 request:{title:'Request money',sub:'Ask someone to pay you. They get a payment link.',cta:'Send request (simulated)',type:'Request'},
 deposit:{title:'Deposit',sub:'Sandbox bank deposit — simulated, no real funds.',cta:'Deposit (simulated)',type:'Deposit'},
 withdraw:{title:'Withdraw',sub:'Withdraw to an external wallet on a testnet. Simulated in demo.',cta:'Withdraw (simulated)',type:'Withdraw'},
 exchange:{title:'Exchange',sub:'Swap assets at a labelled demo rate. No real assets move.',cta:'Exchange (simulated)',type:'Exchange'},
};
export default function Money({kind}:{kind:Kind}){
 const m=META[kind]; const {balance}=useStore();
 const [form,setForm]=useState({recipient:'',amount:'',asset:'USDC',network:'arc',note:''});
 const [errs,setErrs]=useState<Record<string,string>>({}); const [done,setDone]=useState<string|null>(null);
 const submit=(e:React.FormEvent)=>{e.preventDefault(); const amt=Number(form.amount);
   if(kind==='receive'){ setDone(`Share: glowide.app/u/${getState().user?.username||'you'} — request for ${fmtUSD(amt||0)} ${form.asset}. QR is on the QR page.`); return; }
   const r=sendSchema.safeParse({recipient:form.recipient||'demo',amount:amt,asset:form.asset,network:form.network,note:form.note});
   if(!r.success){setErrs(zodErrors(r.error)); return;} setErrs({});
   const idem=uid('idem'); const id=uid('tx');
   addTx({id,type:m.type,counterparty:form.recipient,amount:amt,asset:form.asset,network:CHAINS.find(c=>c.id===form.network)?.name||form.network,status:'completed',date:new Date().toISOString().slice(0,10),note:form.note||undefined,idempotencyKey:idem,mode:kind==='exchange'?'SIMULATED':'SIMULATED'});
   if(kind==='send'||kind==='withdraw') setState({balance:Math.max(0,balance-amt)});
   if(kind==='deposit') setState({balance:balance+amt});
   setDone(`${m.type} of ${fmtUSD(amt)} ${form.asset} recorded as SIMULATED. Transaction ${id} · Idempotency key ${idem}. See Transactions for the receipt.`);
 };
 return <Page><div className="mx-auto max-w-xl"><div className="flex items-center justify-between"><h1 className="text-2xl font-bold text-slate-900 dark:text-white">{m.title}</h1><DemoBadge/></div><p className="mt-1 text-slate-500 dark:text-slate-400">{m.sub}</p>
 {done? <div className="card mt-6 p-6"><p className="font-semibold text-green-600">Done — simulated</p><p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{done}</p><button onClick={()=>{setDone(null); setForm({recipient:'',amount:'',asset:'USDC',network:'arc',note:''});}} className="btn-primary mt-4">Make another</button></div>:
 <form onSubmit={submit} className="card mt-6 space-y-4 p-6">
  {kind!=='receive'&&<div><label className="label">{kind==='deposit'?'Source (sandbox bank)':kind==='withdraw'?'Destination wallet address':'Recipient (username, email or address)'}</label><input className="input" value={form.recipient} onChange={e=>setForm({...form,recipient:e.target.value})} placeholder="@username or 0x…"/><FieldError msg={errs.recipient}/></div>}
  <div><label className="label">Amount (USD)</label><input className="input" type="number" step="0.01" min="0" value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})}/><FieldError msg={errs.amount}/><p className="mt-1 text-xs text-slate-400">Available (demo): {fmtUSD(balance)}</p></div>
  <div className="grid grid-cols-2 gap-4"><div><label className="label">Asset</label><select className="input" value={form.asset} onChange={e=>setForm({...form,asset:e.target.value})}><option>USDC</option><option>ETH</option><option>SOL</option><option>USD</option></select></div>
  <div><label className="label">Network</label><select className="input" value={form.network} onChange={e=>setForm({...form,network:e.target.value})}>{CHAINS.map(c=><option key={c.id} value={c.id}>{c.name} — {c.status}</option>)}</select></div></div>
  <div><label className="label">Note (optional)</label><input className="input" value={form.note} onChange={e=>setForm({...form,note:e.target.value})} maxLength={140}/></div>
  <p className="text-xs text-slate-400">Idempotency: a unique key is generated per submission so a double-click cannot create a duplicate payment. <ModeBadge mode="SIMULATED"/></p>
  <button className="btn-primary w-full">{m.cta}</button>
 </form>}</div></Page>;
}
