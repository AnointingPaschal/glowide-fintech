
import { useState } from 'react';
import { Page } from '../../components/ui';
export default function SettingsAdmin(){
 const [s,setS]=useState({brand:'GlowIDE',maintenance:false,registration:true,currencies:'USD, EUR, GBP, NGN',assets:'USDC, ETH, SOL, GLOW (testnet)'});
 return <Page><h1 className="text-2xl font-bold text-slate-900 dark:text-white">System Settings</h1>
 <div className="card mt-6 space-y-4 p-6">
  <div><label className="label">Platform brand name</label><input className="input" value={s.brand} onChange={e=>setS({...s,brand:e.target.value})}/></div>
  <div><label className="label">Supported currencies</label><input className="input" value={s.currencies} onChange={e=>setS({...s,currencies:e.target.value})}/></div>
  <div><label className="label">Supported assets</label><input className="input" value={s.assets} onChange={e=>setS({...s,assets:e.target.value})}/></div>
  <label className="flex gap-2 text-sm"><input type="checkbox" checked={s.maintenance} onChange={e=>setS({...s,maintenance:e.target.checked})}/> Maintenance mode</label>
  <label className="flex gap-2 text-sm"><input type="checkbox" checked={s.registration} onChange={e=>setS({...s,registration:e.target.checked})}/> Registration open</label>
  <button className="btn-primary" onClick={()=>alert('Settings saved locally (demo). Production: Worker /api/admin/settings with audit log.')}>Save settings</button>
  <p className="text-xs text-slate-400">Logo/favicon: public/logo.svg. Email templates and notification settings are managed in production via the Worker.</p>
 </div></Page>;
}
