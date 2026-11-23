import { Link } from 'react-router-dom';
import { Page } from '../../components/ui';

export default function Personal(){
 return <Page><section className="mx-auto max-w-4xl px-4 py-16">
  <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Personal Finance</h1>
  <div className="mt-6 space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed"><p>Your money, in one place. See total portfolio value, available and pending balances, supported assets and recent transactions. Send money to a GlowIDE username, receive via QR or payment link, request money, deposit (sandbox), withdraw (testnet) and exchange — every operation labelled SIMULATED, TESTNET or DEMO so you always know what is real.</p><p>GlowIDE AI can explain a transaction, categorise expenses and summarise your month — without ever executing a transaction on its own.</p></div>
  <div className="flex gap-3"><a href="/register" className="btn-primary">Create personal account</a><a href="/app" className="btn-secondary">Open demo dashboard</a></div>
 </section></Page>;
}
