# Peblo — AI-Powered Note Taking

> Turn your unstructured notes into actionable insights with NVIDIA NIM AI.

🌐 **Live Demo**: [peblo-six.vercel.app](https://peblo-six.vercel.app)

Peblo is a full-stack productivity app that automatically summarizes your notes, extracts action items, and tracks your activity — powered by **Llama 3.1 via NVIDIA NIM**.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16, Tailwind CSS, TypeScript |
| Backend | Node.js, Express.js |
| Database | PostgreSQL (prod) / SQLite (dev) via Prisma ORM |
| AI | NVIDIA NIM — `meta/llama-3.1-8b-instruct` |
| Auth | JWT (bcrypt + jsonwebtoken) |

---

## Project Structure

```
peblo/
├── peblo-backend/        # Express REST API
│   ├── routes/
│   │   ├── auth.js       # POST /auth/signup, /auth/login
│   │   ├── notes.js      # CRUD + AI summarization
│   │   └── dashboard.js  # Productivity metrics
│   ├── middleware/
│   │   └── auth.js       # JWT verification middleware
│   └── prisma/
│       └── schema.prisma # DB schema
│
└── peblo-frontend/       # Next.js App Router
    ├── app/
    │   ├── page.tsx          # Landing page
    │   ├── login/page.tsx    # Auth page
    │   ├── dashboard/page.tsx
    │   └── notes/            # Note list, detail, new
    └── lib/
        └── auth.ts           # JWT token utilities
```

---

## Features

- ✍️ **Rich Note Editor** — distraction-free writing experience
- 🤖 **AI Analysis** — one-click summary + action item extraction via Llama 3.1
- 📊 **Productivity Dashboard** — total notes, AI tasks, weekly activity
- 🔐 **JWT Authentication** — secure signup/login with hashed passwords
- 🌙 **Glassmorphic UI** — dark mode with ambient effects and micro-animations

---

## Local Development

### Prerequisites
- Node.js 18+
- An [NVIDIA NIM API key](https://build.nvidia.com)

### Backend

```bash
cd peblo-backend
npm install
```

Create `.env`:
```env
DATABASE_URL="file:dev.db"
LLM_API_KEY="your-nvidia-nim-key"
LLM_BASE_URL="https://integrate.api.nvidia.com/v1"
JWT_SECRET="your-secret"
```

```bash
npx prisma migrate dev --name init
node index.js
# → Running on http://localhost:5000
```

### Frontend

```bash
cd peblo-frontend
npm install
```

Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

```bash
npm run dev
# → Running on http://localhost:3000
```

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/auth/signup` | ❌ | Create account |
| POST | `/auth/login` | ❌ | Login, get JWT |
| GET | `/notes` | ✅ | Get all user notes |
| POST | `/notes` | ✅ | Create a note |
| GET | `/notes/:id` | ✅ | Get single note |
| POST | `/notes/:id/generate-summary` | ✅ | AI analysis |
| GET | `/dashboard/insights` | ✅ | Productivity metrics |

---

## Deployment

### Backend → Railway

1. Go to [railway.app](https://railway.app) → **New Project**
2. Click **Deploy from GitHub repo** → select `msrushti668-bit/peblo`
3. Set **Root Directory** → `peblo-backend`
4. Click **+ New** → **Database** → **Add PostgreSQL** (auto-sets `DATABASE_URL`)
5. Go to **Variables** tab and add:
   ```
   LLM_API_KEY   = your-nvidia-nim-key
   LLM_BASE_URL  = https://integrate.api.nvidia.com/v1
   JWT_SECRET    = your-64-char-secret
   ```
6. Railway will auto-deploy. Copy your **Public URL** from Settings.

### Frontend → Vercel

1. Go to [vercel.com](https://vercel.com) → **New Project**
2. Import `msrushti668-bit/peblo` from GitHub
3. Set **Root Directory** → `peblo-frontend`
4. Under **Environment Variables**, add:
   ```
   NEXT_PUBLIC_API_URL = https://peblo-production-9339.up.railway.app
   ```
5. Click **Deploy**

> The database schema is applied automatically on first startup via `prisma migrate deploy`.
