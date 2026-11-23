
import { useState } from 'react';
import { Page, DemoBadge } from '../../components/ui';
import { localAiAnswer } from '../../lib/ai';
export default function Ai(){
 const [msgs,setMsgs]=useState<{q:string;a:string;s:string}[]>([{q:'What can you do?',a:'I can explain transactions and fees, help with invoices, summarise activity and explain blockchain concepts. I never execute transactions.',s:'GlowIDE knowledge base (demo)'}]);
 const [input,setInput]=useState('');
 const ask=(e:React.FormEvent)=>{e.preventDefault(); if(!input.trim()) return; const r=localAiAnswer(input); setMsgs([...msgs,{q:input,a:r.answer,s:r.source}]); setInput('');};
 return <Page><div className="flex justify-between"><h1 className="text-2xl font-bold text-slate-900 dark:text-white">GlowIDE AI</h1><DemoBadge/></div><p className="mt-1 text-slate-500">Demo answers come from a local knowledge base. In production, requests go to the Worker <code>/api/ai/chat</code> endpoint, which calls OpenRouter server-side — the browser never sees an API key.</p>
 <div className="card mt-6 space-y-4 p-6">{msgs.map((m,i)=>(<div key={i}><p className="text-right"><span className="inline-block rounded-2xl bg-violet-600 px-4 py-2 text-sm text-white">{m.q}</span></p><p className="mt-2 rounded-2xl bg-slate-100 p-4 text-sm dark:bg-white/5">{m.a}</p><p className="mt-1 text-xs text-slate-400">{m.s}</p></div>))}</div>
 <form onSubmit={ask} className="mt-4 flex gap-2"><input className="input" placeholder="Ask about fees, Arc, invoices, refunds…" value={input} onChange={e=>setInput(e.target.value)}/><button className="btn-primary">Ask</button></form>
 <div className="mt-3 flex flex-wrap gap-2">{['What are the fees?','Explain Arc','How do I create an invoice?','How do refunds work?'].map(q=><button key={q} onClick={()=>{const r=localAiAnswer(q); setMsgs([...msgs,{q,a:r.answer,s:r.source}]);}} className="rounded-full bg-slate-100 px-3 py-1 text-xs dark:bg-white/10">{q}</button>)}</div></Page>;
}
