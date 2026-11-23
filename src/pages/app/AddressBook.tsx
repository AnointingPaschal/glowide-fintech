
import { useState } from 'react';
import { Page, DemoBadge } from '../../components/ui';
export default function AddressBook(){
 const [items,setItems]=useState([{name:'Amara O.',handle:'@amara',address:'0xAmaraDemo0000000000000000000001'},{name:'Glow Store',handle:'@glowstore',address:'0xGlowStoreDemo000000000000000002'}]);
 const [form,setForm]=useState({name:'',handle:'',address:''});
 return <Page><div className="flex justify-between"><h1 className="text-2xl font-bold text-slate-900 dark:text-white">Address Book</h1><DemoBadge/></div>
 <form onSubmit={e=>{e.preventDefault(); if(!form.name||!form.address) return; setItems([...items,form]); setForm({name:'',handle:'',address:''});}} className="card mt-6 grid gap-3 p-6 sm:grid-cols-4"><input className="input" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/><input className="input" placeholder="@handle" value={form.handle} onChange={e=>setForm({...form,handle:e.target.value})}/><input className="input" placeholder="Address" value={form.address} onChange={e=>setForm({...form,address:e.target.value})}/><button className="btn-primary">Add contact</button></form>
 <div className="mt-4 space-y-3">{items.map((c,i)=>(<div key={i} className="card p-5"><p className="font-semibold text-slate-900 dark:text-white">{c.name} {c.handle}</p><p className="font-mono text-sm text-slate-400 break-all">{c.address}</p></div>))}</div></Page>;
}
