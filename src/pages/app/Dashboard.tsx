
import { Link } from 'react-router-dom';
import { Send, ArrowDownToLine, ArrowUpFromLine, Repeat, Plus, Bell } from 'lucide-react';
import { Page, Stat, BarChart, DemoBadge, ModeBadge } from '../../components/ui';
import { useStore, getState } from '../../lib/store';
import { fmtUSD } from '../../lib/format';
export default function Dashboard(){
 const {txs,balance,pending,user}=useStore();
 const income=txs.filter(t=>t.type==='Receive'||t.type==='Deposit').reduce((s,t)=>s+t.amount,0);
 const spent=txs.filter(t=>t.type==='Send'||t.type==='Withdraw').reduce((s,t)=>s+t.amount,0);
 return <Page>
  <div className="flex flex-wrap items-center justify-between gap-3"><div><h1 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome back, {user?.name.split(' ')[0]||'there'}</h1><p className="text-slate-500 dark:text-slate-400">@{user?.username} · {user?.accountType} account</p></div><DemoBadge/></div>
  <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
   <Stat label="Total portfolio" value={fmtUSD(balance+pending)} sub="Available + pending"/>
   <Stat label="Available balance" value={fmtUSD(balance)} sub="USDC · Arc (simulated)"/>
   <Stat label="Pending balance" value={fmtUSD(pending)} sub="1 incoming transfer"/>
   <Stat label="Income (demo txs)" value={fmtUSD(income)} sub={`Spent ${fmtUSD(spent)}`}/>
  </div>
  <div className="mt-4 grid gap-4 lg:grid-cols-3">
   <div className="card p-6 lg:col-span-2"><h2 className="font-bold text-slate-900 dark:text-white">Income & expenditure — demo week</h2><div className="mt-4"><BarChart data={[{label:'Mon',value:420},{label:'Tue',value:680},{label:'Wed',value:510},{label:'Thu',value:890},{label:'Fri',value:740},{label:'Sat',value:620},{label:'Sun',value:480}]}/></div><p className="mt-2 text-xs text-slate-400">Chart from demo transactions in this browser. No real financial data.</p></div>
   <div className="card p-6"><h2 className="font-bold text-slate-900 dark:text-white">Quick actions</h2><div className="mt-4 grid grid-cols-2 gap-2">
    {[[ '/app/send','Send',Send],['/app/receive','Receive',ArrowDownToLine],['/app/request','Request',ArrowUpFromLine],['/app/exchange','Exchange',Repeat]].map(([to,l,Icon]:any)=>(<Link key={to as string} to={to as string} className="flex flex-col items-center gap-2 rounded-xl bg-violet-50 p-4 text-sm font-medium text-violet-700 hover:bg-violet-100 dark:bg-white/5 dark:text-violet-300"><Icon size={20}/>{l}</Link>))}
   </div><div className="mt-4 rounded-xl bg-slate-50 p-3 text-sm dark:bg-white/5"><p className="font-semibold text-slate-900 dark:text-white flex gap-2"><Bell size={16}/> Insights</p><p className="mt-1 text-slate-500 dark:text-slate-400">Your largest demo inflow this week was $1,250 (USDC, Arc). Spending is 19% below your demo average.</p></div></div>
  </div>
  <div className="card mt-4 p-6"><div className="flex items-center justify-between"><h2 className="font-bold text-slate-900 dark:text-white">Recent transactions</h2><Link to="/app/transactions" className="text-sm text-violet-600 font-semibold">View all →</Link></div>
   <div className="mt-4 space-y-2">{txs.slice(0,5).map(t=>(<Link key={t.id} to="/app/transactions" className="flex items-center justify-between rounded-xl px-3 py-3 hover:bg-slate-50 dark:hover:bg-white/5"><div><p className="font-medium text-slate-900 dark:text-white">{t.type} · {t.counterparty}</p><p className="text-xs text-slate-400">{t.date} · {t.network} · {t.asset}</p></div><div className="text-right"><p className="font-semibold text-slate-900 dark:text-white">{fmtUSD(t.amount)}</p><ModeBadge mode={t.mode}/></div></Link>))}</div>
   <p className="mt-3 text-xs text-slate-400">Balances are demo values stored locally. State: {JSON.stringify({txCount:getState().txs.length})}</p>
  </div>
 </Page>;
}
