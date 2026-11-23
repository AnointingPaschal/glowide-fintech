// API client — calls the Cloudflare Worker in production.
// In this demo build the Worker is not deployed, so calls fall back to local demo data.
// Never send secrets from the browser; OpenRouter keys live only in Worker secrets.
const BASE = (import.meta as unknown as {env?:Record<string,string>}).env?.VITE_API_URL || '/api';
export interface ApiResult<T>{ ok:boolean; data?:T; error?:string; demo?:boolean }
export async function api<T>(path:string, init?:RequestInit):Promise<ApiResult<T>>{
  try{
    const r=await fetch(`${BASE}${path}`,{headers:{'Content-Type':'application/json',...(init?.headers||{})},...init});
    if(!r.ok) return {ok:false,error:`${r.status} ${r.statusText}`,demo:true};
    const j=await r.json() as T; return {ok:true,data:j};
  }catch(e){ return {ok:false,error:e instanceof Error?e.message:'Network unavailable — demo mode',demo:true}; }
}
export const apiGet=<T,>(p:string)=>api<T>(p);
export const apiPost=<T,>(p:string,body:unknown)=>api<T>(p,{method:'POST',body:JSON.stringify(body)});
