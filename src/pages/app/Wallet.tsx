
import { useState } from 'react';
import { Page, DemoBadge } from '../../components/ui';
import { CHAINS, queryBalance, estimateFee, SUPPORTED_ASSETS } from '../../lib/chains';
import { useStore } from '../../lib/store';
export default function Wallet(){
 const {user}=useStore(); const [chain,setChain]=useState('arc'); const [bal,setBal]=useState<string|null>(null); const [loading,setLoading]=useState(false);
 const check=async()=>{setLoading(true); const r=await queryBalance(chain as never,'0xDemo'+(user?.username||'user')); setBal(`${r.balance} — ${r.source}`); setLoading(false);};
 const fee=estimateFee(chain as never);
 return <Page><div className="flex justify-between"><h1 className="text-2xl font-bold text-slate-900 dark:text-white">Universal Wallet</h1><DemoBadge/></div>
 <div className="card mt-6 p-6"><p className="text-sm text-slate-500">GlowIDE username <span className="font-semibold text-slate-900 dark:text-white">@{user?.username}</span> · Account ID <span className="font-mono">glow_acct_demo_{user?.username||'user'}</span></p><p className="mt-2 text-sm text-slate-500">Non-custodial and partner-custody are separate account models in production. This demo stores no private keys — never enter a real private key or seed phrase anywhere in GlowIDE.</p>
 <div className="mt-4 flex flex-wrap gap-2">{CHAINS.map(c=><button key={c.id} onClick={()=>setChain(c.id)} className={`rounded-full px-4 py-2 text-sm font-medium ${chain===c.id?'bg-violet-600 text-white':'bg-slate-100 dark:bg-white/10'}`}>{c.name} {c.primary?'· Primary':''}</button>)}</div>
 <div className="mt-4 flex gap-2"><button onClick={check} className="btn-primary" disabled={loading}>{loading?'Checking…':'Check demo balance'}</button></div>
 {bal&&<p className="mt-3 rounded-xl bg-violet-50 p-3 text-sm dark:bg-white/5">{bal}</p>}
 <p className="mt-3 text-sm text-slate-500">Fee estimate ({fee.unit}): slow {fee.slow} · standard {fee.standard} · fast {fee.fast}. {fee.note}</p></div>
 <h2 className="mt-6 text-lg font-bold text-slate-900 dark:text-white">Supported assets</h2><div className="mt-3 grid gap-3 sm:grid-cols-2">{SUPPORTED_ASSETS.map(a=>(<div key={a.symbol} className="card p-4"><p className="font-semibold text-slate-900 dark:text-white">{a.symbol} — {a.name}</p><p className="text-sm text-slate-400">{a.type} · Networks: {a.networks.join(', ')}</p></div>))}</div></Page>;
}
