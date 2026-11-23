export const fmtUSD = (n:number)=> new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(n);
export const fmtNum = (n:number,d=2)=> n.toLocaleString('en-US',{minimumFractionDigits:d,maximumFractionDigits:d});
export const shortAddr=(a:string)=> a.length>13? `${a.slice(0,6)}…${a.slice(-4)}`:a;
export const uid=(p='tx')=> `${p}_${Date.now().toString(36)}${Math.random().toString(36).slice(2,8)}`;
export const today=()=> new Date().toISOString().slice(0,10);
export function maskKey(k:string){ if(!k) return '—'; if(k.length<=8) return '••••••••'; return k.slice(0,4)+'••••••••'+k.slice(-4); }
