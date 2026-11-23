import { Link } from 'react-router-dom';
import { Page } from '../../components/ui';

export default function Terms(){
 return <Page><section className="mx-auto max-w-4xl px-4 py-16">
  <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Terms of Service</h1>
  <div className="mt-6 space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed"><p><strong>Demo terms.</strong> This is a demonstration build of GlowIDE. No real money, cryptoassets or regulated payment services are offered through this demo. All balances, transactions and statistics shown are simulated or testnet data and are labelled as such.</p><p>By using the demo you agree not to enter real credentials, real payment details or real private keys. Production terms, licensing, fees and disclosures will be published when regulated services are authorised and configured.</p><p>GlowIDE does not provide financial advice. Cryptocurrency and stablecoin activity carries risk; seek independent advice before using production services.</p></div>
  
 </section></Page>;
}
