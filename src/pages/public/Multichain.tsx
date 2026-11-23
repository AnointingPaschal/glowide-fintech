import { Link } from 'react-router-dom';
import { Page } from '../../components/ui';

export default function Multichain(){
 return <Page><section className="mx-auto max-w-4xl px-4 py-16">
  <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Multichain Infrastructure</h1>
  <div className="mt-6 space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed"><p>Arc is GlowIDE's primary blockchain. Base, Ethereum and Solana are integrated through separate adapters — EVM adapters for Arc/Base/Ethereum and a distinct Solana adapter.</p><p>Each network has configuration, RPC management, balance queries, transaction monitoring, fee estimation and health checks. We do not assume an asset, bridge or service exists on a network without verifying its actual deployment.</p><p>Circle infrastructure (USDC and cross-chain services) is prepared in the architecture and enabled only when configured with real credentials in the admin portal.</p></div>
  <div className="card p-5"><p className="font-semibold text-slate-900 dark:text-white">Network status (demo)</p><ul className="mt-2 text-sm text-slate-500 space-y-1"><li>Arc Testnet — integrated (testnet)</li><li>Base Sepolia — adapter ready (testnet)</li><li>Ethereum Sepolia — adapter ready (testnet)</li><li>Solana Devnet — adapter ready (testnet)</li></ul></div>
 </section></Page>;
}
