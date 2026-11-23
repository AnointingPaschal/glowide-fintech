
import { useState } from 'react';
import { Page } from '../../components/ui';
export default function AdminUsers(){
 const [users,setUsers]=useState([{name:'Anointing Paschal',email:'anointing@glowide.app',type:'personal',status:'active',verified:true},{name:'Amara O.',email:'amara@example.com',type:'personal',status:'active',verified:true},{name:'Glow Store Ltd',email:'billing@glowstore.example',type:'business',status:'active',verified:false},{name:'Test User',email:'test@example.com',type:'personal',status:'suspended',verified:false}]);
 const [q,setQ]=useState('');
 return <Page><h1 className="text-2xl font-bold text-slate-900 dark:text-white">User Management</h1><p className="text-sm text-slate-500">Demo users only.</p>
 <input className="input mt-4 !w-72" placeholder="Search users…" value={q} onChange={e=>setQ(e.target.value)}/>
 <div className="mt-4 space-y-3">{users.filter(u=>u.name.toLowerCase().includes(q.toLowerCase())||u.email.includes(q)).map((u,i)=>(<div key={i} className="card flex flex-wrap items-center justify-between gap-3 p-5"><div><p className="font-semibold text-slate-900 dark:text-white">{u.name}</p><p className="text-sm text-slate-400">{u.email} · {u.type} · {u.verified?'Verified':'Unverified'}</p></div><div className="flex gap-2"><span className={`badge ${u.status==='active'?'bg-green-100 text-green-700':'bg-red-100 text-red-700'}`}>{u.status}</span><button className="btn-ghost" onClick={()=>setUsers(users.map((x,j)=>j===i?{...x,status:x.status==='active'?'suspended':'active'}:x))}>{u.status==='active'?'Suspend':'Activate'}</button></div></div>))}</div></Page>;
}
