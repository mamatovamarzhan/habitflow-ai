# HabitFlow AI — Setup Guide

A full-stack habit tracker with a React (Vite + Tailwind) frontend and a Node.js (Express + MongoDB) backend.

## 1. Prerequisites

Install these before running the project:

- **Node.js** 18 or newer — https://nodejs.org
- **npm** (bundled with Node) or yarn / pnpm
- **MongoDB** — either:
  - a local install (https://www.mongodb.com/try/download/community), or
  - a free Atlas cluster (https://www.mongodb.com/atlas) and grab its connection string

Verify Node is available:

```bash
node --version
npm --version
```

## 2. Project layout

```
my-site/
├── server/    # Express API
├── client/    # Vite + React app
└── SETUP.md
```

## 3. Configure the backend

```bash
cd server
cp .env.example .env       # on Windows PowerShell: Copy-Item .env.example .env
```

Open `server/.env` and fill in:

| Variable        | Example                                  | Notes                                    |
| --------------- | ---------------------------------------- | ---------------------------------------- |
| `MONGODB_URI`   | `mongodb://localhost:27017/habitflow`    | Local Mongo or Atlas connection string   |
| `JWT_SECRET`    | `a-long-random-string-please-change-me`  | Used to sign JWT tokens                  |
| `PORT`          | `5000`                                   | API port                                 |
| `CLIENT_ORIGIN` | `http://localhost:5173`                  | Vite dev server origin (for CORS)        |

## 4. Install backend dependencies and run

From the `server/` folder:

```bash
npm install
npm run dev        # auto-reload via nodemon
# or: npm start    # plain node
```

You should see:

```
Connected to MongoDB
HabitFlow API running on http://localhost:5000
```

Smoke test (in a second terminal):

```bash
curl http://localhost:5000/api/health
# => {"status":"ok"}
```

## 5. Install frontend dependencies and run

Open a **new terminal**, from the `client/` folder:

```bash
cd client
npm install
npm run dev
```

Vite will print a URL — open it (default: http://localhost:5173).

> The Vite dev server proxies `/api/*` to `http://localhost:5000` (configured in `client/vite.config.js`), so the frontend talks to the backend without CORS issues during development.

## 6. Using the app

1. Go to http://localhost:5173 — you'll be redirected to **Sign up**.
2. Create an account (email + password, min 6 chars).
3. On the dashboard:
   - Add a habit using the form at the top.
   - Click the circle on a habit card to mark today as completed (click again to undo).
   - Watch your **streak**, **completion rate**, **weekly chart**, and **AI insights** update.
   - Use the trash icon (Delete) to remove a habit.

## 7. API endpoints

All habit endpoints require an `Authorization: Bearer <token>` header. Tokens are returned by `/auth/login` and `/auth/register`.

| Method | Path                          | Description                              |
| ------ | ----------------------------- | ---------------------------------------- |
| POST   | `/api/auth/register`          | Create user — body `{ email, password }` |
| POST   | `/api/auth/login`             | Login — body `{ email, password }`       |
| GET    | `/api/habits`                 | List habits + stats + insights           |
| POST   | `/api/habits`                 | Create habit                             |
| PUT    | `/api/habits/:id/complete`    | Toggle today's completion                |
| DELETE | `/api/habits/:id`             | Delete habit                             |

## 8. Production build (optional)

```bash
cd client
npm run build      # outputs static files to client/dist/
npm run preview    # serve the build locally on port 4173
```

For real deployment serve `client/dist/` from any static host (Vercel, Netlify, nginx, …) and deploy the `server/` directory to Node-friendly hosting (Render, Railway, Fly.io, …). Set the env vars from step 3 on the host and point `CLIENT_ORIGIN` at your deployed frontend URL.

## 9. Common issues

- **`MONGODB_URI is not set`** — you forgot to copy `.env.example` to `.env` or didn't `cd` into `server/` before running.
- **`MongoServerError: Authentication failed`** — wrong username/password in the Atlas connection string. Re-copy it from the Atlas UI.
- **CORS errors in the browser** — make sure the API is running, and check that `CLIENT_ORIGIN` in `server/.env` matches the URL Vite is using (default `http://localhost:5173`).
- **Port 5000 already in use** — change `PORT` in `server/.env` and update the proxy target in `client/vite.config.js` to match.
- **Frontend logged out unexpectedly** — JWT expired (default 7 days) or `JWT_SECRET` changed; log in again.

Happy habit-building 🚀
