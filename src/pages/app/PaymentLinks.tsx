
import { useState } from 'react';
import { Page, DemoBadge, FieldError } from '../../components/ui';
import { paymentLinkSchema, zodErrors } from '../../lib/validation';
import { useStore, addLink } from '../../lib/store';
import { uid } from '../../lib/format';
export default function PaymentLinks(){
 const {links}=useStore(); const [form,setForm]=useState({title:'',amount:'',asset:'USDC'}); const [errs,setErrs]=useState<Record<string,string>>({}); const [copied,setCopied]=useState('');
 const submit=(e:React.FormEvent)=>{e.preventDefault(); const r=paymentLinkSchema.safeParse({title:form.title,amount:Number(form.amount),asset:form.asset}); if(!r.success){setErrs(zodErrors(r.error)); return;} setErrs({}); addLink({id:uid('pl'),title:form.title,amount:Number(form.amount),asset:form.asset,url:`https://glowide.app/pay/${form.title.toLowerCase().replace(/[^a-z0-9]+/g,'-')}`,clicks:0,active:true}); setForm({title:'',amount:'',asset:'USDC'});};
 return <Page><div className="flex justify-between"><h1 className="text-2xl font-bold text-slate-900 dark:text-white">Payment Links</h1><DemoBadge/></div>
 <form onSubmit={submit} className="card mt-6 grid gap-4 p-6 sm:grid-cols-4"><div><label className="label">Title</label><input className="input" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/><FieldError msg={errs.title}/></div><div><label className="label">Amount</label><input className="input" type="number" value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})}/><FieldError msg={errs.amount}/></div><div><label className="label">Asset</label><select className="input" value={form.asset} onChange={e=>setForm({...form,asset:e.target.value})}><option>USDC</option><option>ETH</option><option>SOL</option></select></div><div className="flex items-end"><button className="btn-primary w-full">Create link</button></div></form>
 <div className="mt-4 grid gap-4">{links.map(l=>(<div key={l.id} className="card flex flex-wrap items-center justify-between gap-3 p-5"><div><p className="font-semibold text-slate-900 dark:text-white">{l.title} — ${l.amount} {l.asset}</p><p className="text-sm text-slate-400">{l.url} · {l.clicks} clicks · {l.active?'Active':'Paused'}</p></div><button className="btn-secondary" onClick={()=>{navigator.clipboard?.writeText(l.url).catch(()=>{}); setCopied(l.id);}}>Copy link</button>{copied===l.id&&<span className="text-xs text-green-600">Copied (demo URL)</span>}</div>))}</div></Page>;
}
