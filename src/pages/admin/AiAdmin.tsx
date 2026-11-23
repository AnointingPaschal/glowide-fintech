
import { useState } from 'react';
import { Page } from '../../components/ui';
import { AI_MODELS } from '../../lib/ai';
export default function AiAdmin(){
 const [models,setModels]=useState(AI_MODELS); const [def,setDef]=useState(AI_MODELS[0].id); const [fallback,setFallback]=useState(AI_MODELS[1].id); const [limit,setLimit]=useState(1000);
 return <Page><h1 className="text-2xl font-bold text-slate-900 dark:text-white">AI Management</h1><p className="text-sm text-slate-500">OpenRouter configuration is server-side only. Demo model list — free models shown are illustrative; verify availability on OpenRouter before production use.</p>
 <div className="mt-6 space-y-3">{models.map(m=>(<div key={m.id} className="card flex flex-wrap items-center justify-between gap-3 p-5"><div><p className="font-semibold text-slate-900 dark:text-white">{m.name}</p><p className="font-mono text-xs text-slate-400">{m.id}</p></div><div className="flex items-center gap-2"><button className="btn-ghost" onClick={()=>setDef(m.id)}>{def===m.id?'★ Default':'Set default'}</button><button className="btn-ghost" onClick={()=>setFallback(m.id)}>{fallback===m.id?'Fallback ✓':'Set fallback'}</button><button className="btn-ghost" onClick={()=>setModels(models.map(x=>x.id===m.id?{...x,enabled:!x.enabled}:x))}>{m.enabled?'Disable':'Enable'}</button></div></div>))}</div>
 <div className="card mt-4 p-6"><label className="label">Monthly request limit (demo)</label><input className="input !w-48" type="number" value={limit} onChange={e=>setLimit(Number(e.target.value))}/><p className="mt-3 text-sm text-slate-500">Usage (demo): 1,902 requests this month · Errors: 3 · Provider health: OpenRouter reachable (simulated check) · Default: {def} · Fallback: {fallback}</p><p className="mt-2 text-xs text-slate-400">AI features: transaction explanations, fee explanations, expense categorisation, business reports, invoice help, financial education. AI never executes transactions.</p></div></Page>;
}
