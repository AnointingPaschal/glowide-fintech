// GlowIDE multichain adapters — testnet only in this demo build.
// Do NOT claim an asset/bridge/service exists on a network without verifying its deployment.
// Arc is the primary chain. Others are testnet-ready adapters.
export type ChainId='arc'|'base'|'ethereum'|'solana';
export interface ChainConfig{ id:ChainId; name:string; chainId?:number; symbol:string; rpc:string; explorer:string; testnet:boolean; status:'testnet'|'testnet-ready'|'disabled'; primary?:boolean; color:string; description:string }
export const CHAINS: ChainConfig[]=[
 {id:'arc',name:'Arc',chainId:5042002,symbol:'USDC',rpc:'https://rpc.testnet.arc.network',explorer:'https://testnet.arcscan.app',testnet:true,status:'testnet',primary:true,color:'#8B5CF6',description:'Primary chain for GlowIDE. Arc Testnet — USDC is the native gas token on Arc Testnet.'},
 {id:'base',name:'Base',chainId:84532,symbol:'ETH',rpc:'https://sepolia.base.org',explorer:'https://sepolia.basescan.org',testnet:true,status:'testnet-ready',color:'#0052FF',description:'Base Sepolia testnet adapter. Verify contract deployments before enabling production.'},
 {id:'ethereum',name:'Ethereum',chainId:11155111,symbol:'ETH',rpc:'https://rpc.sepolia.org',explorer:'https://sepolia.etherscan.io',testnet:true,status:'testnet-ready',color:'#627EEA',description:'Ethereum Sepolia testnet adapter.'},
 {id:'solana',name:'Solana',symbol:'SOL',rpc:'https://api.devnet.solana.com',explorer:'https://explorer.solana.com/?cluster=devnet',testnet:true,status:'testnet-ready',color:'#14F195',description:'Solana Devnet adapter (non-EVM). Separate adapter — no EVM calls.'},
];
export const getChain=(id:ChainId)=> CHAINS.find(c=>c.id===id) ?? CHAINS[0];
export interface FeeEstimate{ slow:string; standard:string; fast:string; unit:string; note:string }
export function estimateFee(chainId:ChainId):FeeEstimate{
  if(chainId==='arc') return {slow:'0.001 USDC',standard:'0.002 USDC',fast:'0.005 USDC',unit:'USDC',note:'Arc Testnet estimate — demo only, not a live quote.'};
  if(chainId==='solana') return {slow:'0.000005 SOL',standard:'0.00001 SOL',fast:'0.00005 SOL',unit:'SOL',note:'Solana Devnet estimate — demo only.'};
  return {slow:'0.0001 ETH',standard:'0.0005 ETH',fast:'0.001 ETH',unit:'ETH',note:'Testnet estimate — demo only, not a live quote.'};
}
// Balance query interface — in production this calls the Worker /api/blockchain/balances
// which uses server-side RPC keys. In demo it returns labelled demo balances.
export async function queryBalance(chainId:ChainId, address:string):Promise<{chain:ChainId;address:string;balance:string;source:string}>{
  await new Promise(r=>setTimeout(r,400));
  const demo:Record<ChainId,string>={arc:'1,284.50 USDC',base:'0.42 ETH',ethereum:'0.18 ETH',solana:'12.40 SOL'};
  return {chain:chainId,address,balance:demo[chainId],source:'DEMO — simulated testnet balance, not a live RPC result'};
}
export const SUPPORTED_ASSETS=[
 {symbol:'USDC',name:'USD Coin',networks:['arc','base','ethereum','solana'],type:'stablecoin'},
 {symbol:'ETH',name:'Ether',networks:['base','ethereum'],type:'native'},
 {symbol:'SOL',name:'Solana',networks:['solana'],type:'native'},
 {symbol:'GLOW',name:'GlowIDE Token (testnet)',networks:['arc'],type:'testnet-only'},
];
