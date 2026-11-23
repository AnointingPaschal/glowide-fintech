import { Link } from 'react-router-dom';
import { Page } from '../../components/ui';

export default function Business(){
 return <Page><section className="mx-auto max-w-4xl px-4 py-16">
  <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Business Finance</h1>
  <div className="mt-6 space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed"><p>GlowIDE for business: register and verify your business, manage balances, create professional invoices, manage customers, track revenue and expenses, export transactions to CSV, manage team members and roles, require payment approvals, and set up recurring billing.</p><p>Verification is reviewed by an admin in the admin portal — approve or reject with a reason. Nothing is auto-approved in production without proper checks.</p></div>
  <div className="flex gap-3"><a href="/register" className="btn-primary">Register a business</a><a href="/business-portal" className="btn-secondary">Open business portal (demo)</a></div>
 </section></Page>;
}
