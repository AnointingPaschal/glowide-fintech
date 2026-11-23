
import { Page, DemoBadge } from '../../components/ui';
import { useStore } from '../../lib/store';
import { CHAINS } from '../../lib/chains';
export default function Qr(){
 const {user}=useStore();
 // QR is rendered as a deterministic SVG pattern (demo) — not a real payment QR payload.
 return <Page><div className="mx-auto max-w-xl text-center"><h1 className="text-2xl font-bold text-slate-900 dark:text-white">QR Payments</h1><p className="mt-1 text-slate-500">Scan to pay @{user?.username||'you'}. Demo QR pattern — not a live payment code.</p><DemoBadge/>
 <div className="card mx-auto mt-6 max-w-xs p-6"><svg viewBox="0 0 100 100" className="w-full" aria-label="Demo QR pattern"><rect width="100" height="100" fill="white"/><g fill="#120A26">{Array.from({length:64}).map((_,i)=>{const x=(i%8)*12+2, y=Math.floor(i/8)*12+2; const on=(i*7+3)%3!==0; return on?<rect key={i} x={x} y={y} width="9" height="9" rx="1"/>:null;})}</g><rect x="2" y="2" width="24" height="24" fill="none" stroke="#7C3AED" strokeWidth="3"/><rect x="74" y="2" width="24" height="24" fill="none" stroke="#7C3AED" strokeWidth="3"/><rect x="2" y="74" width="24" height="24" fill="none" stroke="#7C3AED" strokeWidth="3"/></svg><p className="mt-3 font-mono text-sm">glowide.app/u/{user?.username||'you'}</p></div>
 <div className="mt-6 grid gap-3 text-left">{CHAINS.map(c=><div key={c.id} className="card flex justify-between p-4"><span className="font-medium text-slate-900 dark:text-white">{c.name}</span><span className="text-sm text-slate-400">{c.status} · {c.symbol}</span></div>)}</div></div></Page>;
}
