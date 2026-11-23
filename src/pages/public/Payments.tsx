import { Link } from 'react-router-dom';
import { Page } from '../../components/ui';

export default function Payments(){
 return <Page><section className="mx-auto max-w-4xl px-4 py-16">
  <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Payments</h1>
  <div className="mt-6 space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed"><p>Payments on GlowIDE use one abstraction layer: internal user-to-user transfers, stablecoin payments, blockchain transfers, and — when authorised — licensed payment providers, bank transfers and card partners.</p><p>Every payment carries an idempotency key, is validated server-side, reconciled, and only marked successful when settlement evidence is verified. Simulated payments are always labelled SIMULATED.</p><p>Features: payment requests, payment links, QR payments, recurring and scheduled payments, receipts, refunds and full search/filter.</p></div>
  
 </section></Page>;
}
