# GlowIDE Deployment — Cloudflare Pages + Workers

## Prerequisites
- Node 20+, npm, a Cloudflare account, `wrangler` (`npx wrangler login`).

## 1. Database (D1)
```bash
npx wrangler d1 create glowide_db
# paste the returned database_id into wrangler.toml under [[d1_databases]]
npx wrangler d1 execute glowide_db --local --file=migrations/0001_init.sql
npx wrangler d1 execute glowide_db --local --file=migrations/seed.sql
npx wrangler d1 execute glowide_db --remote --file=migrations/0001_init.sql
npx wrangler d1 execute glowide_db --remote --file=migrations/seed.sql
```

## 2. KV / R2 / Queues (optional until needed)
```bash
npx wrangler kv namespace create glowide_kv
npx wrangler r2 bucket create glowide-files
# Uncomment the matching bindings in wrangler.toml and paste the IDs.
```

## 3. Secrets — never commit these
```bash
npx wrangler secret put OPENROUTER_API_KEY
npx wrangler secret put ENCRYPTION_KEY
npx wrangler secret put ARC_RPC_URL
npx wrangler secret put CIRCLE_API_KEY   # only when Circle is authorised/configured
```

## 4. Worker
```bash
npx wrangler deploy
# Verify: curl https://glowide-worker.<subdomain>.workers.dev/api/health
```

## 5. Pages (frontend)
- Connect the GitHub repo in Cloudflare Pages.
- Build command: `npm run build`
- Output directory: `dist`
- No environment variables with secrets. If the frontend needs the Worker URL, set `VITE_API_URL` to the Worker origin only (no keys).

## 6. Post-deploy checks
- `npm run build` passes locally; Pages build succeeds.
- Visit `/`, `/login` (demo), `/app`, `/admin` — all routes render.
- Confirm no `VITE_*` secret exists in the Pages dashboard.
- Apply migrations to remote D1 before enabling real auth/payments in the Worker.
- Contracts: deploy to Arc Testnet only after review; never mainnet without audit.
