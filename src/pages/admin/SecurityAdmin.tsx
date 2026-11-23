
import { Page } from '../../components/ui';
export default function SecurityAdmin(){
 return <Page><h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Security</h1>
 <div className="card mt-6 space-y-3 p-6 text-sm text-slate-600 dark:text-slate-300">
  <p><strong className="text-slate-900 dark:text-white">Roles:</strong> Super administrator, Administrator, Support agent, Finance operator, Compliance reviewer — assigned server-side only, never via frontend fields.</p>
  <p><strong className="text-slate-900 dark:text-white">Admin authentication:</strong> separate admin login, strong password + 2FA required in production. Demo admin: admin@glowide.app / admin1234.</p>
  <p><strong className="text-slate-900 dark:text-white">Sensitive actions:</strong> refunds, secret rotation, role changes and verification decisions require confirmation and are audit-logged.</p>
  <p><strong className="text-slate-900 dark:text-white">Sessions:</strong> 1 active admin session (this browser, demo). Revoke from Account Security in production.</p>
  <p className="text-xs text-slate-400">Never grant admin permissions through frontend-controlled fields.</p>
 </div></Page>;
}
