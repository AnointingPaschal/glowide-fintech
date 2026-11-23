
import { useState } from 'react';
import { Page } from '../../components/ui';
export default function AdminBusinesses(){
 const [items,setItems]=useState([{name:'Glow Store Ltd',email:'billing@glowstore.example',status:'pending'},{name:'Pneuma Domain Ministry',email:'hello@pneumadomain.org',status:'approved'},{name:'Adaeze Consulting',email:'ada@example.com',status:'pending'}]);
 return <Page><h1 className="text-2xl font-bold text-slate-900 dark:text-white">Business Management</h1><p className="text-sm text-slate-500">Review verification submissions. Demo decisions only.</p>
 <div className="mt-6 space-y-3">{items.map((b,i)=>(<div key={i} className="card flex flex-wrap items-center justify-between gap-3 p-5"><div><p className="font-semibold text-slate-900 dark:text-white">{b.name}</p><p className="text-sm text-slate-400">{b.email} · Documents: registration certificate (demo) · Status: {b.status}</p></div><div className="flex gap-2">{b.status==='pending'&&<><button className="btn-primary !px-4 !py-2" onClick={()=>setItems(items.map((x,j)=>j===i?{...x,status:'approved'}:x))}>Approve</button><button className="btn-secondary !px-4 !py-2" onClick={()=>setItems(items.map((x,j)=>j===i?{...x,status:'rejected'}:x))}>Reject</button></>}{b.status!=='pending'&&<span className="badge bg-slate-100 text-slate-600">{b.status}</span>}</div></div>))}</div></Page>;
}
