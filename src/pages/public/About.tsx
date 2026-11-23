import { Link } from 'react-router-dom';
import { Page } from '../../components/ui';

export default function About(){
 return <Page><section className="mx-auto max-w-4xl px-4 py-16">
  <h1 className="text-4xl font-bold text-slate-900 dark:text-white">About GlowIDE</h1>
  <div className="mt-6 space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed"><p>GlowIDE is a premium global crypto fintech super-application built for people and businesses who want money to work across borders and blockchains — without needing to understand blockchain technicalities.</p><p>Our architecture is Arc-first: Arc is the primary chain, with Base, Ethereum and Solana adapters for multichain reach. Stablecoins — starting with USDC — are the everyday money of the platform.</p><p>This website and app are a demo build. Financial activity shown is simulated or on testnets, clearly labelled, and no real money moves. Production integrations (licensed payment providers, bank rails, card partners, Circle services) are enabled only when properly authorised and configured.</p><p>GlowIDE is built by Anointing Paschal and the GlowIDE team.</p></div>
  
 </section></Page>;
}
