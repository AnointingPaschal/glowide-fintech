import { useSyncExternalStore } from 'react';
export type TxStatus='completed'|'pending'|'failed'|'refunded';
export interface Tx{ id:string; type:string; counterparty:string; amount:number; asset:string; network:string; status:TxStatus; date:string; note?:string; idempotencyKey:string; mode:'SIMULATED'|'TESTNET'|'DEMO' }
export interface User{ name:string; username:string; email:string; accountType:'personal'|'business'; role:'user'|'admin'; verified:boolean }
export interface Invoice{ id:string; customer:string; email:string; amount:number; description:string; dueDate:string; status:'draft'|'sent'|'paid'|'overdue'; date:string }
export interface PaymentLink{ id:string; title:string; amount:number; asset:string; url:string; clicks:number; active:boolean }
const DEMO_TXS:Tx[]=[
 {id:'tx_demo_001',type:'Receive',counterparty:'Amara O.',amount:1250,asset:'USDC',network:'Arc',status:'completed',date:'2026-11-22',note:'Invoice payment',idempotencyKey:'idem_demo_001',mode:'SIMULATED'},
 {id:'tx_demo_002',type:'Send',counterparty:'@glowstore',amount:84.5,asset:'USDC',network:'Arc',status:'completed',date:'2026-11-21',idempotencyKey:'idem_demo_002',mode:'SIMULATED'},
 {id:'tx_demo_003',type:'Exchange',counterparty:'USDC → ETH',amount:320,asset:'USDC',network:'Base',status:'pending',date:'2026-11-23',idempotencyKey:'idem_demo_003',mode:'TESTNET'},
 {id:'tx_demo_004',type:'Deposit',counterparty:'Bank transfer (sandbox)',amount:500,asset:'USD',network:'Sandbox',status:'completed',date:'2026-11-20',idempotencyKey:'idem_demo_004',mode:'SIMULATED'},
 {id:'tx_demo_005',type:'Withdraw',counterparty:'External wallet',amount:150,asset:'USDC',network:'Solana',status:'failed',date:'2026-11-19',note:'Insufficient testnet funds (demo)',idempotencyKey:'idem_demo_005',mode:'TESTNET'},
];
const DEMO_INVOICES:Invoice[]=[
 {id:'INV-1001',customer:'Pneuma Domain Ministry',email:'hello@pneumadomain.org',amount:450,description:'Website hosting & support — Nov 2026',dueDate:'2026-12-06',status:'paid',date:'2026-11-10'},
 {id:'INV-1002',customer:'Glow Store Ltd',email:'billing@glowstore.example',amount:1290,description:'Design services',dueDate:'2026-12-15',status:'sent',date:'2026-11-18'},
 {id:'INV-1003',customer:'Adaeze Consulting',email:'ada@example.com',amount:275,description:'Consulting — 5 hrs',dueDate:'2026-11-30',status:'draft',date:'2026-11-22'},
];
interface State{ user:User|null; txs:Tx[]; invoices:Invoice[]; links:PaymentLink[]; balance:number; pending:number }
let state:State={ user:null, txs:DEMO_TXS, invoices:DEMO_INVOICES, links:[{id:'pl_1',title:'Night of Grace — donation',amount:25,asset:'USDC',url:'https://glowide.app/pay/night-of-grace',clicks:42,active:true}], balance:4820.75, pending:320 };
try{ const raw=localStorage.getItem('glowide_state'); if(raw){ const p=JSON.parse(raw); state={...state,...p}; } }catch{/* ignore */}
const listeners=new Set<()=>void>();
function persist(){ try{ localStorage.setItem('glowide_state',JSON.stringify(state)); }catch{/* ignore */} }
export function setState(p:Partial<State>){ state={...state,...p}; persist(); listeners.forEach(l=>l()); }
export function addTx(t:Tx){ setState({txs:[t,...state.txs]}); }
export function addInvoice(i:Invoice){ setState({invoices:[i,...state.invoices]}); }
export function updateInvoice(id:string,p:Partial<Invoice>){ setState({invoices:state.invoices.map(x=>x.id===id?{...x,...p}:x)}); }
export function addLink(l:PaymentLink){ setState({links:[l,...state.links]}); }
export function login(u:User){ setState({user:u}); }
export function logout(){ setState({user:null}); }
export function useStore(){ return useSyncExternalStore((cb)=>{listeners.add(cb); return ()=>{listeners.delete(cb)}},()=>state); }
export function getState(){ return state; }
export const DEMO_ADMIN:User={name:'GlowIDE Admin',username:'admin',email:'admin@glowide.app',accountType:'business',role:'admin',verified:true};
export const DEMO_USER:User={name:'Anointing Paschal',username:'anointing',email:'anointing@glowide.app',accountType:'personal',role:'user',verified:true};
