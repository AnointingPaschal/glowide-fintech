
import { useState } from 'react';
import { Page } from '../../components/ui';
export default function Security(){
 const [two,setTwo]=useState(false); const [sessions,setSessions]=useState([{id:'s1',device:'This browser — Lagos, Nigeria',current:true},{id:'s2',device:'Chrome on Windows — Lagos',current:false}]);
 return <Page><h1 className="text-2xl font-bold text-slate-900 dark:text-white">Account Security</h1>
 <div className="card mt-6 space-y-4 p-6"><div className="flex justify-between"><div><p className="font-semibold text-slate-900 dark:text-white">Two-factor authentication</p><p className="text-sm text-slate-500">Add an authenticator app code at login. Demo toggle only.</p></div><button onClick={()=>setTwo(!two)} className={`rounded-full px-4 py-2 text-sm font-semibold ${two?'bg-green-600 text-white':'bg-slate-200 dark:bg-white/10'}`}>{two?'Enabled':'Enable'}</button></div>
 <div><p className="font-semibold text-slate-900 dark:text-white">Change password</p><p className="text-sm text-slate-500">Password reset in production is emailed via a secure Worker endpoint. In demo, use the login page with a new password.</p></div>
 <div><p className="font-semibold text-slate-900 dark:text-white">Active sessions</p>{sessions.map(s=>(<div key={s.id} className="mt-2 flex justify-between rounded-xl bg-slate-50 p-3 text-sm dark:bg-white/5"><span>{s.device} {s.current&&'(current)'}</span>{!s.current&&<button className="text-red-600" onClick={()=>setSessions(sessions.filter(x=>x.id!==s.id))}>Revoke</button>}</div>))}</div>
 <p className="text-xs text-slate-400">GlowIDE never asks for your private key or seed phrase. Report phishing to hello@glowide.app.</p></div></Page>;
}
