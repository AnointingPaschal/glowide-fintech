
import { Page, Stat } from '../../components/ui';
import { CHAINS } from '../../lib/chains';
export default function AdminOverview(){
 return <Page><h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Overview</h1><p className="mt-1 text-sm text-slate-500">All figures below are <strong>demo data</strong> stored locally — not real platform statistics.</p>
 <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
  <Stat label="Registered users (demo)" value="1,284" sub="Active (30d): 342"/><Stat label="Business accounts (demo)" value="86" sub="Pending verification: 3"/><Stat label="Transaction volume (demo)" value="$48,210" sub="Success rate: 96.4%"/><Stat label="AI requests (demo)" value="1,902" sub="This month"/>
 </div>
 <div className="mt-4 grid gap-4 lg:grid-cols-2">
  <div className="card p-6"><h2 className="font-bold text-slate-900 dark:text-white">Blockchain network status</h2>{CHAINS.map(c=>(<div key={c.id} className="mt-2 flex justify-between text-sm"><span>{c.name} ({c.status})</span><span className="text-green-600 font-semibold">● Healthy (demo)</span></div>))}</div>
  <div className="card p-6"><h2 className="font-bold text-slate-900 dark:text-white">System alerts</h2><ul className="mt-2 space-y-2 text-sm text-slate-500"><li>• 3 business verifications awaiting review.</li><li>• 1 failed testnet transaction to review (tx_demo_005).</li><li>• No production integrations configured — see API &amp; Integrations.</li></ul></div>
 </div></Page>;
}
