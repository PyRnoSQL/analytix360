# Analytix360

**Enterprise Digital Experience Platform for Analytix Engineering**

Corporate Website · Customer Portal · Professional Training · Secure Payments · Analytics Dashboard

---

## Architecture

```
Internet → Railway → Express Server
                       ├── /api/*       → API Routes (payments, contact, webhooks)
                       └── /*           → React SPA (client/dist)
                                           └── Supabase (auth, database, storage)
```

**Single Railway service** — one build, one deployment.

## Tech Stack

| Layer    | Technology                                                   |
| -------- | ------------------------------------------------------------ |
| Frontend | React 19 · Vite · TypeScript · Tailwind CSS · Framer Motion |
| Backend  | Express 5 · Node.js · Helmet · CORS · Rate Limiting         |
| Database | Supabase (PostgreSQL + Auth + Storage + RLS)                 |
| Payments | CinetPay (MTN MoMo · Orange Money · Visa/MC)                |
| Deploy   | Railway (mono-service) · GitHub Actions CI                   |

## Project Structure

```
analytix360/
├── client/          # React + Vite + TypeScript frontend
├── server/          # Express API + SPA server
├── shared/          # Shared types, constants, schemas
├── database/        # SQL migrations and seed data
├── docs/            # Architecture documentation
├── scripts/         # Automation scripts
├── .github/         # GitHub Actions workflows
├── railway.json     # Railway deployment config
└── .env.example     # Environment variables template
```

## Quick Start

```bash
# Clone
git clone https://github.com/PyRnoSQL/analytix360.git
cd analytix360

# Setup
cp .env.example .env
# Edit .env with your Supabase and CinetPay credentials

# Install
npm install

# Development (client + server concurrently)
npm run dev

# Production build
npm run build

# Start production server
npm start
```

## Deployment (Railway)

1. Connect your GitHub repo to Railway
2. Set environment variables in Railway dashboard
3. Railway auto-detects `railway.json` and deploys

Every push to `main` triggers automatic deployment.

## Environment Variables

See `.env.example` for the full list. Required for production:

- `SUPABASE_URL` / `SUPABASE_ANON_KEY` / `SUPABASE_SERVICE_KEY`
- `CINETPAY_API_KEY` / `CINETPAY_SITE_ID` / `CINETPAY_SECRET_KEY`
- `CORS_ORIGIN` / `APP_URL`

## Database

Run the migration in your Supabase SQL editor:

```bash
# Located at:
database/migrations/001_initial_schema.sql
```

This creates all tables (profiles, invoices, payments, projects, trainings, enrollments, documents, messages, audit_logs) with Row Level Security policies.

## License

MIT
