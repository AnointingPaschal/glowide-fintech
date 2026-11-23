
import { useState } from 'react';
import { Page, ModeBadge } from '../../components/ui';
import { useStore } from '../../lib/store';
import { fmtUSD } from '../../lib/format';
export default function AdminTransactions(){
 const {txs}=useStore(); const [q,setQ]=useState(''); const [net,setNet]=useState('all'); const [msg,setMsg]=useState('');
 const list=txs.filter(t=>(net==='all'||t.network===net)&&(t.id.includes(q)||t.counterparty.toLowerCase().includes(q.toLowerCase())));
 return <Page><h1 className="text-2xl font-bold text-slate-900 dark:text-white">Transaction Management</h1><p className="text-sm text-slate-500">Demo transactions. Reconciliation: demo ledger balances — no real settlement.</p>
 {msg&&<p className="mt-3 rounded-xl bg-green-50 p-3 text-sm text-green-700">{msg}</p>}
 <div className="mt-4 flex gap-2"><input className="input !w-64" placeholder="Search ID or counterparty…" value={q} onChange={e=>setQ(e.target.value)}/><select className="input !w-40" value={net} onChange={e=>setNet(e.target.value)}><option value="all">All networks</option><option>Arc</option><option>Base</option><option>Ethereum</option><option>Solana</option><option>Sandbox</option></select></div>
 <div className="card mt-4 divide-y dark:divide-white/10">{list.map(t=>(<div key={t.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"><div><p className="font-medium text-slate-900 dark:text-white">{t.type} · {t.counterparty} — {fmtUSD(t.amount)} {t.asset}</p><p className="text-xs text-slate-400">{t.id} · {t.network} · {t.status} · {t.date}</p></div><div className="flex items-center gap-2"><ModeBadge mode={t.mode}/>{t.status==='completed'&&<button className="btn-ghost text-red-600" onClick={()=>setMsg(`Refund requested for ${t.id} (demo). In production this requires finance-operator authorisation and verified settlement evidence.`)}>Refund</button>}</div></div>))}</div>
 <div className="card mt-4 p-5"><h2 className="font-bold text-slate-900 dark:text-white">Reconciliation report (demo)</h2><p className="mt-2 text-sm text-slate-500">Ledger entries: {txs.length} demo transactions · Double-entry balanced: Yes (demo) · Failed: {txs.filter(t=>t.status==='failed').length} · Pending: {txs.filter(t=>t.status==='pending').length}</p></div></Page>;
}
