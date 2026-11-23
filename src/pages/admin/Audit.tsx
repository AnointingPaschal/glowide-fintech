
import { Page } from '../../components/ui';
export default function Audit(){
 const logs=[{t:'2026-11-23 21:40',actor:'admin@glowide.app',action:'Approved business: Pneuma Domain Ministry',ip:'demo'},{t:'2026-11-23 21:12',actor:'admin@glowide.app',action:'Viewed integrations (no secret values logged)',ip:'demo'},{t:'2026-11-23 20:58',actor:'system',action:'Test connection: Arc RPC (simulated) — ok',ip:'—'},{t:'2026-11-23 20:31',actor:'anointing@glowide.app',action:'Login (demo)',ip:'demo'}];
 return <Page><h1 className="text-2xl font-bold text-slate-900 dark:text-white">Audit Logs</h1><p className="text-sm text-slate-500">Demo audit trail. Secret values are never recorded in audit logs.</p><div className="card mt-6 divide-y dark:divide-white/10">{logs.map((l,i)=>(<div key={i} className="px-5 py-4 text-sm"><p className="font-medium text-slate-900 dark:text-white">{l.action}</p><p className="text-xs text-slate-400">{l.t} · {l.actor} · {l.ip}</p></div>))}</div></Page>;
}
