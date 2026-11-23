// GlowIDE Cloudflare Worker — REST API (no extra dependencies).
// Demo note: this Worker is the production API shape. It is NOT yet wired to a live D1
// database in this repo build — handlers validate, auth-check (stub) and return
// structured errors / demo-safe responses. Wire D1 bindings in wrangler.toml before use.
// Secrets (OPENROUTER_API_KEY, RPC keys, Circle, email/SMS) are Worker secrets only:
//   wrangler secret put OPENROUTER_API_KEY
// Never put secrets in VITE_ env vars or in frontend code.
export interface Env { DB: D1Database; KV: KVNamespace; R2: R2Bucket; OPENROUTER_API_KEY?: string; ARC_RPC_URL?: string; BASE_RPC_URL?: string; ETHEREUM_RPC_URL?: string; SOLANA_RPC_URL?: string; CIRCLE_API_KEY?: string; ENCRYPTION_KEY?: string; }
type H = (req: Request, env: Env, ctx: ExecutionContext) => Promise<Response> | Response;
const json = (data: unknown, status = 200) => new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json', 'X-Content-Type-Options': 'nosniff', 'X-Frame-Options': 'DENY', 'Referrer-Policy': 'no-referrer' } });
const err = (code: string, message: string, status = 400) => json({ ok: false, error: { code, message } }, status);
const requireAuth = (req: Request): string | null => { const h = req.headers.get('Authorization'); if (!h?.startsWith('Bearer ')) return null; return h.slice(7) || null; };
// Very small in-memory rate-limit stub (per-Worker-instance; use KV/Durable Objects in production)
const hits = new Map<string, { n: number; t: number }>();
function rateLimited(ip: string): boolean { const now = Date.now(); const e = hits.get(ip); if (!e || now - e.t > 60000) { hits.set(ip, { n: 1, t: now }); return false; } e.n++; return e.n > 100; }
function audit(env: Env, action: string, actor: string) { // production: INSERT INTO audit_logs (...)
  void env; void action; void actor; }
const routes: [string, RegExp, H][] = [
  ['GET', /^\/api\/health$/, async () => json({ ok: true, service: 'glowide-worker', mode: 'demo — D1 not yet wired' })],
  ['POST', /^\/api\/auth\/register$/, async (req) => { const b = await req.json().catch(() => null) as { email?: string; password?: string } | null; if (!b?.email || !b?.password || b.password.length < 8) return err('VALIDATION', 'Valid email and a password of 8+ characters are required', 422); return err('NOT_CONFIGURED', 'Auth is not wired to D1 in this demo build. Use the frontend demo login.', 501); }],
  ['POST', /^\/api\/auth\/login$/, async () => err('NOT_CONFIGURED', 'Auth is not wired to D1 in this demo build.', 501)],
  ['POST', /^\/api\/auth\/verify-email$/, async () => err('NOT_CONFIGURED', 'Email verification requires a configured email provider secret.', 501)],
  ['POST', /^\/api\/auth\/password-reset$/, async () => err('NOT_CONFIGURED', 'Password reset requires a configured email provider secret.', 501)],
  ['GET', /^\/api\/users\/me$/, async (req) => { if (!requireAuth(req)) return err('UNAUTHENTICATED', 'Bearer token required', 401); return err('NOT_CONFIGURED', 'D1 not wired.', 501); }],
  ['GET', /^\/api\/accounts$/, async (req) => { if (!requireAuth(req)) return err('UNAUTHENTICATED', 'Bearer token required', 401); return json({ ok: true, data: [], demo: true }); }],
  ['GET', /^\/api\/balances$/, async (req) => { if (!requireAuth(req)) return err('UNAUTHENTICATED', 'Bearer token required', 401); return json({ ok: true, data: [], demo: true, note: 'Balances are never trusted from the client; server computes from the ledger.' }); }],
  ['POST', /^\/api\/payments$/, async (req, env) => { const t = requireAuth(req); if (!t) return err('UNAUTHENTICATED', 'Bearer token required', 401); const b = await req.json().catch(() => null) as { amount?: number; idempotencyKey?: string } | null; if (!b?.amount || b.amount <= 0) return err('VALIDATION', 'amount must be > 0', 422); if (!b.idempotencyKey) return err('VALIDATION', 'idempotencyKey is required', 422); audit(env, 'payment.create', t); return err('NOT_CONFIGURED', 'Payments require D1 ledger + settlement provider configuration. Never mark a payment successful without verified settlement evidence.', 501); }],
  ['GET', /^\/api\/transactions$/, async (req) => { if (!requireAuth(req)) return err('UNAUTHENTICATED', 'Bearer token required', 401); return json({ ok: true, data: [], demo: true }); }],
  ['POST', /^\/api\/transfers$/, async () => err('NOT_CONFIGURED', 'Transfers require D1 ledger.', 501)],
  ['GET', /^\/api\/business$/, async (req) => { if (!requireAuth(req)) return err('UNAUTHENTICATED', 'Bearer token required', 401); return json({ ok: true, data: [], demo: true }); }],
  ['GET', /^\/api\/invoices$/, async (req) => { if (!requireAuth(req)) return err('UNAUTHENTICATED', 'Bearer token required', 401); return json({ ok: true, data: [], demo: true }); }],
  ['POST', /^\/api\/ai\/chat$/, async (req, env) => { const t = requireAuth(req); if (!t) return err('UNAUTHENTICATED', 'Bearer token required', 401); if (!env.OPENROUTER_API_KEY) return err('NOT_CONFIGURED', 'OpenRouter is not configured. An admin must add the key as a Worker secret (Admin → AI Management).', 501); const b = await req.json().catch(() => null) as { message?: string; model?: string } | null; if (!b?.message) return err('VALIDATION', 'message is required', 422); // Production: fetch https://openrouter.ai/api/v1/chat/completions with env.OPENROUTER_API_KEY server-side only.
    return err('NOT_CONFIGURED', 'OpenRouter key present but AI proxy not yet enabled in this build.', 501); }],
  ['GET', /^\/api\/blockchain\/networks$/, async () => json({ ok: true, data: [{ id: 'arc', name: 'Arc', status: 'testnet' }, { id: 'base', name: 'Base', status: 'testnet-ready' }, { id: 'ethereum', name: 'Ethereum', status: 'testnet-ready' }, { id: 'solana', name: 'Solana', status: 'testnet-ready' }] })],
  ['GET', /^\/api\/notifications$/, async (req) => { if (!requireAuth(req)) return err('UNAUTHENTICATED', 'Bearer token required', 401); return json({ ok: true, data: [], demo: true }); }],
  ['GET', /^\/api\/admin\/overview$/, async (req) => { if (!requireAuth(req)) return err('UNAUTHENTICATED', 'Bearer token required', 401); return err('FORBIDDEN', 'Admin role required (checked server-side).', 403); }],
  ['GET', /^\/api\/admin\/integrations$/, async (req) => { if (!requireAuth(req)) return err('UNAUTHENTICATED', 'Bearer token required', 401); return err('FORBIDDEN', 'Super-admin role required. Credentials are never returned to the client.', 403); }],
  ['GET', /^\/api\/admin\/settings$/, async (req) => { if (!requireAuth(req)) return err('UNAUTHENTICATED', 'Bearer token required', 401); return err('FORBIDDEN', 'Admin role required.', 403); }],
];
export default {
  async fetch(req: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(req.url);
    const ip = req.headers.get('CF-Connecting-IP') || 'unknown';
    if (rateLimited(ip)) return err('RATE_LIMITED', 'Too many requests — try again shortly.', 429);
    for (const [method, re, h] of routes) if (req.method === method && re.test(url.pathname)) return h(req, env, ctx);
    if (url.pathname.startsWith('/api/')) return err('NOT_FOUND', `No route for ${req.method} ${url.pathname}`, 404);
    return err('NOT_FOUND', 'GlowIDE Worker serves /api/* only. The frontend is deployed on Cloudflare Pages.', 404);
  },
};
