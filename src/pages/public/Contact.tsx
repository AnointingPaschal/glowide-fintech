import { Link } from 'react-router-dom';
import { Page } from '../../components/ui';

import { useState } from 'react';
import { contactSchema, zodErrors } from '../../lib/validation';
export default function Contact(){ const [form,setForm]=useState({name:'',email:'',message:''}); const [errs,setErrs]=useState<Record<string,string>>({}); const [sent,setSent]=useState(false);
 const submit=(e:React.FormEvent)=>{e.preventDefault(); const r=contactSchema.safeParse(form); if(!r.success){setErrs(zodErrors(r.error)); return;} setErrs({}); setSent(true);};
 return <Page><section className="mx-auto max-w-2xl px-4 py-16"><h1 className="text-4xl font-bold text-slate-900 dark:text-white">Contact</h1><p className="mt-3 text-slate-600 dark:text-slate-300">Email: hello@glowide.app (demo address). We reply to demo enquiries within 2 business days.</p>
 {sent?<div className="card mt-8 p-6"><p className="font-semibold text-green-600">Message received (demo).</p><p className="text-sm text-slate-500">Your message was recorded locally in this demo — no email was actually sent.</p></div>:
 <form onSubmit={submit} className="card mt-8 space-y-4 p-6">
  <div><label className="label">Name</label><input className="input" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>{errs.name&&<p className="mt-1 text-xs text-red-600">{errs.name}</p>}</div>
  <div><label className="label">Email</label><input className="input" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>{errs.email&&<p className="mt-1 text-xs text-red-600">{errs.email}</p>}</div>
  <div><label className="label">Message</label><textarea className="input" rows={5} value={form.message} onChange={e=>setForm({...form,message:e.target.value})}/>{errs.message&&<p className="mt-1 text-xs text-red-600">{errs.message}</p>}</div>
  <button className="btn-primary w-full">Send message</button>
 </form>}</section></Page>; }
