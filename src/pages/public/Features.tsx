import { Link } from 'react-router-dom';
import { Page } from '../../components/ui';

export default function Features(){
 return <Page><section className="mx-auto max-w-4xl px-4 py-16">
  <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Features</h1>
  <div className="mt-6 space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed"><p>GlowIDE combines digital banking, payments, business finance, multichain wallets and AI in one coherent product.</p></div>
  <div className="grid gap-4 sm:grid-cols-2">{['Universal account & wallet','Send / receive / request','Payment links & QR','Scheduled & recurring payments','Exchange (simulated in demo)','Invoices & receipts','Business analytics & exports','Team roles & approvals','GlowIDE AI assistant','Admin & audit controls','Multichain: Arc, Base, Ethereum, Solana','Light & dark themes, mobile-first'].map(f=><div key={f} className="card p-4 flex gap-2"><span className="text-violet-600">✓</span><span className="text-slate-900 dark:text-white text-sm font-medium">{f}</span></div>)}</div><p className="text-sm text-slate-500">Every feature above has a working screen in the demo app — open <a className="text-violet-600 underline" href="/app">/app</a> after logging in.</p>
 </section></Page>;
}
