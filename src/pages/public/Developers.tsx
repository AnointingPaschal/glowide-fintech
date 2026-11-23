import { Link } from 'react-router-dom';
import { Page } from '../../components/ui';

export default function Developers(){
 return <Page><section className="mx-auto max-w-4xl px-4 py-16">
  <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Developer API</h1>
  <div className="mt-6 space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed"><p>GlowIDE exposes REST APIs under /api: /api/auth, /api/users, /api/accounts, /api/wallets, /api/balances, /api/payments, /api/transfers, /api/transactions, /api/business, /api/invoices, /api/ai, /api/blockchain, /api/notifications and /api/admin.</p><p>All protected endpoints require authentication and permission checks, validate input with Zod, rate-limit, return structured errors and write audit logs. API keys for third-party services are managed server-side in Admin → API &amp; Integrations and are never exposed to the browser.</p><p>Full endpoint reference and the Worker source live in workers/ in the repository. Production API access requires an authorised integration — contact us to request access.</p></div>
  
 </section></Page>;
}
