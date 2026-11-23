
import { useState } from 'react';
import { Page } from '../../components/ui';
import { CHAINS, SUPPORTED_ASSETS } from '../../lib/chains';
export default function AdminBlockchain(){
 const [rpc,setRpc]=useState<Record<string,string>>(Object.fromEntries(CHAINS.map(c=>[c.id,c.rpc])));
 const [saved,setSaved]=useState('');
 return <Page><h1 className="text-2xl font-bold text-slate-900 dark:text-white">Blockchain Management</h1><p className="text-sm text-slate-500">Configure networks and RPC endpoints. Demo only — production RPC keys are Worker secrets.</p>
 <div className="mt-6 space-y-4">{CHAINS.map(c=>(<div key={c.id} className="card p-5"><div className="flex justify-between"><p className="font-semibold text-slate-900 dark:text-white">{c.name} {c.primary&&<span className="badge bg-violet-100 text-violet-700">Primary</span>}</p><span className="text-sm text-green-600">● Healthy (demo)</span></div><label className="label mt-3">RPC endpoint (testnet)</label><input className="input" value={rpc[c.id]} onChange={e=>setRpc({...rpc,[c.id]:e.target.value})}/><p className="mt-1 text-xs text-slate-400">Explorer: {c.explorer} · Status: {c.status}</p></div>))}</div>
 <button className="btn-primary mt-4" onClick={()=>setSaved('Network configuration saved locally (demo). Production: saved via Worker /api/admin/blockchain with audit logging.')}>Save network configuration</button>{saved&&<p className="mt-2 text-sm text-green-600">{saved}</p>}
 <h2 className="mt-8 text-lg font-bold text-slate-900 dark:text-white">Supported assets</h2><div className="mt-3 grid gap-3 sm:grid-cols-2">{SUPPORTED_ASSETS.map(a=>(<div key={a.symbol} className="card p-4"><p className="font-semibold">{a.symbol} — {a.name}</p><p className="text-sm text-slate-400">{a.type} · {a.networks.join(', ')}</p></div>))}</div></Page>;
}
