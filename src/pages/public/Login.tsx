
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Page, FieldError } from '../../components/ui';
import { loginSchema, zodErrors } from '../../lib/validation';
import { login, DEMO_USER, DEMO_ADMIN } from '../../lib/store';
export default function Login(){
 const nav=useNavigate(); const [form,setForm]=useState({email:'',password:''}); const [errs,setErrs]=useState<Record<string,string>>({}); const [err,setErr]=useState('');
 const submit=(e:React.FormEvent)=>{e.preventDefault(); const r=loginSchema.safeParse(form); if(!r.success){setErrs(zodErrors(r.error)); return;}
   if(form.email==='admin@glowide.app'&&form.password==='admin1234'){login(DEMO_ADMIN); nav('/admin'); return;}
   if(form.password.length>=8){login({...DEMO_USER,email:form.email}); nav('/app'); return;}
   setErr('Demo login failed. Use any email with a password of 8+ characters, or admin@glowide.app / admin1234 for admin.');};
 return <Page><section className="mx-auto max-w-md px-4 py-16"><div className="card p-8">
  <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome back</h1><p className="mt-1 text-sm text-slate-500">Demo login — no real authentication server in this build.</p>
  <form onSubmit={submit} className="mt-6 space-y-4">
   <div><label className="label">Email</label><input className="input" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/><FieldError msg={errs.email}/></div>
   <div><label className="label">Password</label><input className="input" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/><FieldError msg={errs.password}/></div>
   {err&&<p className="text-sm text-red-600">{err}</p>}
   <button className="btn-primary w-full">Log in</button>
  </form>
  <div className="mt-4 rounded-xl bg-violet-50 p-3 text-xs text-slate-600 dark:bg-white/5 dark:text-slate-300">Demo accounts:<br/>User — any email + password (8+ chars)<br/>Admin — admin@glowide.app / admin1234</div>
  <p className="mt-4 text-center text-sm text-slate-500">No account? <Link to="/register" className="text-violet-600 font-semibold">Register</Link></p>
  <p className="mt-2 text-center text-xs"><Link to="/app" className="text-slate-400 underline">Forgot password? (demo reset)</Link></p>
 </div></section></Page>;
}
