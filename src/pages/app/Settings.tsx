
import { useState } from 'react';
import { Page } from '../../components/ui';
import { useStore } from '../../lib/store';
export default function Settings(){
 const {user}=useStore(); const [saved,setSaved]=useState(false); const [prefs,setPrefs]=useState({currency:'USD',theme:'dark',emailNotif:true,pushNotif:true,language:'English'});
 return <Page><h1 className="text-2xl font-bold text-slate-900 dark:text-white">Account Settings</h1>
 <div className="card mt-6 space-y-4 p-6"><p className="text-sm text-slate-500">Signed in as <strong>{user?.name}</strong> · @{user?.username} · {user?.email} · {user?.accountType}</p>
 <div><label className="label">Preferred currency</label><select className="input" value={prefs.currency} onChange={e=>setPrefs({...prefs,currency:e.target.value})}><option>USD</option><option>EUR</option><option>GBP</option><option>NGN</option></select></div>
 <div><label className="label">Language</label><select className="input" value={prefs.language} onChange={e=>setPrefs({...prefs,language:e.target.value})}><option>English</option><option>French</option><option>Spanish</option></select></div>
 <label className="flex gap-2 text-sm"><input type="checkbox" checked={prefs.emailNotif} onChange={e=>setPrefs({...prefs,emailNotif:e.target.checked})}/> Email notifications</label>
 <label className="flex gap-2 text-sm"><input type="checkbox" checked={prefs.pushNotif} onChange={e=>setPrefs({...prefs,pushNotif:e.target.checked})}/> Push notifications</label>
 <button className="btn-primary" onClick={()=>setSaved(true)}>Save preferences</button>{saved&&<p className="text-sm text-green-600">Preferences saved locally (demo).</p>}</div></Page>;
}
