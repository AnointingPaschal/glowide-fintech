
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Page, FieldError } from '../../components/ui';
import { registerSchema, zodErrors } from '../../lib/validation';
import { login } from '../../lib/store';
export default function Register(){
 const nav=useNavigate(); const [form,setForm]=useState({name:'',username:'',email:'',password:'',accountType:'personal' as 'personal'|'business',terms:false}); const [errs,setErrs]=useState<Record<string,string>>({}); const [done,setDone]=useState(false);
 const submit=(e:React.FormEvent)=>{e.preventDefault(); const r=registerSchema.safeParse(form); if(!r.success){setErrs(zodErrors(r.error)); return;} setErrs({}); setDone(true);};
 const enter=()=>{login({name:form.name,username:form.username,email:form.email,accountType:form.accountType,role:'user',verified:false}); nav('/app');};
 return <Page><section className="mx-auto max-w-md px-4 py-16"><div className="card p-8">
  <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Create your GlowIDE account</h1><p className="mt-1 text-sm text-slate-500">Demo registration — stored locally, email verification simulated.</p>
  {done? <div><p className="mt-4 rounded-xl bg-green-50 p-4 text-sm text-green-800 dark:bg-green-500/10 dark:text-green-300">Account created (demo). A verification email would be sent in production — here verification is simulated and your account is ready.</p><button onClick={enter} className="btn-primary mt-4 w-full">Continue to dashboard</button></div>:
  <form onSubmit={submit} className="mt-6 space-y-4">
   <div><label className="label">Full name</label><input className="input" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/><FieldError msg={errs.name}/></div>
   <div><label className="label">GlowIDE username</label><input className="input" placeholder="e.g. anointing" value={form.username} onChange={e=>setForm({...form,username:e.target.value})}/><FieldError msg={errs.username}/></div>
   <div><label className="label">Email</label><input className="input" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/><FieldError msg={errs.email}/></div>
   <div><label className="label">Password</label><input className="input" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/><FieldError msg={errs.password}/></div>
   <div><label className="label">Account type</label><select className="input" value={form.accountType} onChange={e=>setForm({...form,accountType:e.target.value as 'personal'|'business'})}><option value="personal">Personal</option><option value="business">Business</option></select></div>
   <label className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300"><input type="checkbox" checked={form.terms} onChange={e=>setForm({...form,terms:e.target.checked})} className="mt-1"/> I accept the <Link to="/terms" className="text-violet-600 underline">Terms of Service</Link> and <Link to="/privacy" className="text-violet-600 underline">Privacy Policy</Link>.</label><FieldError msg={errs.terms}/>
   <button className="btn-primary w-full">Create account</button>
  </form>}
  <p className="mt-4 text-center text-sm text-slate-500">Already have an account? <Link to="/login" className="text-violet-600 font-semibold">Log in</Link></p>
 </div></section></Page>;
}
