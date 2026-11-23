# GlowIDE — Global Crypto Fintech Super Application

Premium, Arc-first multichain fintech: personal + business finance, payments, invoices, multichain wallets (Arc, Base, Ethereum, Solana), GlowIDE AI (OpenRouter, server-side only) and a full admin portal.

> **Demo build.** All balances, transactions and statistics in the frontend are **simulated / testnet data stored locally in your browser**. No real money moves. Simulated transactions are labelled `SIMULATED` / `TESTNET` / `DEMO` and are never presented as real blockchain transactions.

## Stack
- Frontend: Vite + React + TypeScript, Tailwind CSS v3, Framer Motion, Lucide React, Zod, react-router-dom
- Backend: Cloudflare Workers (`workers/index.ts`), REST `/api/*`
- Database: Cloudflare D1 (`migrations/0001_init.sql`, `migrations/seed.sql`) — double-entry ledger, immutable entries
- Storage/Cache/Queues: R2 / KV / Queues bindings in `wrangler.toml` (placeholders until created)
- Chains: Arc (primary, testnet), Base Sepolia, Ethereum Sepolia, Solana Devnet — see `src/lib/chains.ts`
- Contracts: `contracts/GlowToken.sol`, `contracts/GlowPayments.sol` (testnet only, unaudited)
- AI: OpenRouter via Worker secret only — never in the browser

## Quick start
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc + vite build
npm run typecheck
```

## Demo accounts
- **User:** any email + password (8+ chars) on `/login`
- **Admin:** `admin@glowide.app` / `admin1234` → `/admin`

## Routes
Public: `/` `/about` `/features` `/personal` `/business` `/payments` `/multichain` `/developers` `/security` `/help` `/contact` `/terms` `/privacy` `/login` `/register`
App: `/app` `/app/send` `/app/receive` `/app/request` `/app/deposit` `/app/withdraw` `/app/exchange` `/app/transactions` `/app/payment-links` `/app/qr` `/app/scheduled` `/app/wallet` `/app/address-book` `/app/ai` `/app/business` `/app/settings` `/app/security` `/app/notifications`
Business portal: `/business-portal` (also `/app/business`)
Admin: `/admin` `/admin/users` `/admin/businesses` `/admin/transactions` `/admin/blockchain` `/admin/integrations` `/admin/ai` `/admin/settings` `/admin/audit` `/admin/security`

## Cloudflare deployment
See `DEPLOY.md`. Summary:
```bash
npx wrangler d1 create glowide_db
npx wrangler d1 execute glowide_db --local --file=migrations/0001_init.sql
npx wrangler d1 execute glowide_db --local --file=migrations/seed.sql
npx wrangler secret put OPENROUTER_API_KEY   # never in .env / VITE_ vars
npx wrangler deploy
# Pages: connect this repo, build command `npm run build`, output `dist`
```

## Security notes
- No secrets in `VITE_*` vars or frontend code. `.env.example` has placeholders only.
- `encrypted_credentials` stores AES-GCM ciphertext only; the master key is a Worker secret (`ENCRYPTION_KEY`), never in the DB.
- Never trust client-submitted balances/statuses; the server ledger is the source of truth.
- Never mark a payment successful without independently verified settlement evidence.
- Do not enter real private keys or seed phrases anywhere in GlowIDE.

## What is demo vs real (honest)
| Area | Status |
|---|---|
| Frontend UI, routing, forms (Zod), theme, responsive layouts | Real, working |
| Demo auth, balances, transactions, invoices, links | Simulated, localStorage |
| Worker REST shape, validation, auth stubs, rate-limit stub | Real code, D1 not yet wired |
| D1 schema + seed (double-entry ledger) | Real SQL, not yet applied to a live D1 |
| Chain adapters, testnet RPC configs, fee estimates | Real config; balances are simulated in demo |
| GlowIDE AI chat | Local knowledge base in demo; production via Worker + OpenRouter secret |
| Contracts | Real Solidity, testnet only, unaudited |
| Payments / Circle / bank / card providers | Not connected — sandbox/testnet only until authorised |
