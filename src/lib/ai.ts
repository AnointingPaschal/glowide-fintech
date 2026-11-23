// GlowIDE AI — demo knowledge base.
// Production: the chat UI POSTs to Worker /api/ai/chat, which calls OpenRouter server-side.
// The browser never sees an OpenRouter key. This local KB answers without any key.
export interface AiAnswer{ answer:string; source:string }
const KB:[RegExp,string][]=[
 [/fee/i,'GlowIDE demo fees: internal GlowIDE-to-GlowIDE transfers are simulated at $0 in demo mode. On Arc Testnet, gas is paid in USDC and is typically a fraction of a cent. Production fees depend on the network and the payment provider — always check the fee shown before confirming a payment.'],
 [/arc/i,'Arc is GlowIDE\u2019s primary chain. On Arc Testnet, USDC is the native gas token. GlowIDE connects to Arc via a server-side RPC in production; this demo uses labelled testnet/simulated data only.'],
 [/usdc|stablecoin/i,'USDC is a US-dollar stablecoin. GlowIDE supports USDC on Arc, Base, Ethereum and Solana in its architecture — always verify a token contract is actually deployed on a given network before sending funds.'],
 [/invoice/i,'To create an invoice: go to Business Portal → Invoices → New Invoice, add the customer, amount and due date, then send it. The customer gets a payment link; when paid, the invoice status updates and a receipt is available.'],
 [/refund/i,'Refunds in GlowIDE: open Transactions, select the transaction, choose Request refund. Refunds require authorisation and are only marked complete when settlement evidence is verified — a simulated refund is labelled SIMULATED.'],
 [/solana|base|ethereum/i,'GlowIDE is multichain: Arc (primary, testnet), Base Sepolia, Ethereum Sepolia and Solana Devnet. Each network has its own adapter in src/lib/chains.ts. Production use requires verified RPC endpoints and contract deployments per network.'],
 [/security|2fa|two.factor/i,'Protect your account with a strong unique password, enable two-factor authentication in Settings → Security, review active sessions, and never share a recovery code or private key. GlowIDE never asks for your private key.'],
 [/kyc|verif/i,'Business verification: submit your business registration documents in Business Portal → Verification. An admin reviews the submission and approves or rejects it. Personal accounts use email verification in this demo.'],
 [/exchange|swap/i,'Exchange in demo mode is simulated at a labelled demo rate — no real assets move. Production exchange uses a licensed provider or on-chain swap, with the rate and fee shown before you confirm.'],
];
export function localAiAnswer(q:string):AiAnswer{
  for(const [re,a] of KB) if(re.test(q)) return {answer:a,source:'GlowIDE knowledge base (demo — production answers come from OpenRouter via the Worker)'};
  return {answer:'I can help with GlowIDE fees, Arc/USDC, invoices, refunds, security, verification and exchange. In production I answer via OpenRouter (configured by an admin in Admin → AI Management) through the Worker /api/ai/chat endpoint — I never execute transactions on my own. Try asking about fees, Arc, or invoices.',source:'GlowIDE knowledge base (demo)'};
}
export const AI_MODELS=[
 {id:'meta-llama/llama-3.3-70b-instruct:free',name:'Llama 3.3 70B Instruct (free)',provider:'OpenRouter',enabled:true,def:true},
 {id:'google/gemma-2-9b-it:free',name:'Gemma 2 9B IT (free)',provider:'OpenRouter',enabled:true,def:false},
 {id:'qwen/qwen-2.5-7b-instruct:free',name:'Qwen 2.5 7B Instruct (free)',provider:'OpenRouter',enabled:false,def:false},
];
