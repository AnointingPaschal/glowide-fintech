import { Link } from 'react-router-dom';
import { Page } from '../../components/ui';

export default function Privacy(){
 return <Page><section className="mx-auto max-w-4xl px-4 py-16">
  <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Privacy Policy</h1>
  <div className="mt-6 space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed"><p><strong>Demo privacy notice.</strong> This demo stores account and transaction data locally in your browser (localStorage) for demonstration purposes. No data is sent to a production server in this build.</p><p>In production, GlowIDE will collect only the data needed to operate accounts, verify identity where required by law, prevent fraud and comply with regulation — and will publish a full privacy policy, data-retention schedule and contact for data requests before launch.</p><p>We never sell personal data. API keys and secrets are encrypted server-side and never exposed to the browser.</p></div>
  
 </section></Page>;
}
