import { Link } from 'react-router-dom';
import { Page } from '../../components/ui';

export default function Security(){
 return <Page><section className="mx-auto max-w-4xl px-4 py-16">
  <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Security</h1>
  <div className="mt-6 space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed"><p>Security is fundamental at GlowIDE: secure password hashing, secure sessions, CSRF/XSS/SQL-injection protections, input validation, rate limiting, secure HTTP headers, permission checks, audit logging, secret encryption, transaction authorisation, idempotency keys, webhook signature verification and replay protection.</p><p>We never store private keys insecurely, never expose API keys to the frontend, and never mark a payment successful until settlement is independently verified. Simulated transactions are never presented as real blockchain transactions.</p></div>
  
 </section></Page>;
}
