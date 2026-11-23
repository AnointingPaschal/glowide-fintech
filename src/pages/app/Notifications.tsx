
import { Page } from '../../components/ui';
export default function Notifications(){
 const items=[{t:'Payment received',d:'$1,250 USDC from Amara O. — Arc (simulated)',time:'Nov 22'},{t:'Invoice paid',d:'INV-1001 paid by Pneuma Domain Ministry — $450',time:'Nov 21'},{t:'Network update',d:'Arc Testnet is healthy. Base Sepolia adapter ready.',time:'Nov 20'},{t:'Security',d:'New login from this browser (demo).',time:'Nov 19'}];
 return <Page><h1 className="text-2xl font-bold text-slate-900 dark:text-white">Notifications</h1><div className="mt-6 space-y-3">{items.map((n,i)=>(<div key={i} className="card p-5"><p className="font-semibold text-slate-900 dark:text-white">{n.t}</p><p className="text-sm text-slate-500">{n.d}</p><p className="text-xs text-slate-400">{n.time}</p></div>))}</div></Page>;
}
