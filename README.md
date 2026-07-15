# Learnify — Client (Frontend)

## Project Description

Learnify is an online learning marketplace. This app is the **frontend**: the public website (home, course catalog, course details, about, contact) plus an admin dashboard for managing categories, courses, users, and contact messages.

### Problem it solves
- Learners have no single place to discover, browse, and read details about courses across topics — Learnify gives them a searchable catalog with categories and course detail pages.
- Course providers/admins need a way to publish and maintain course content without touching a database directly — the admin dashboard lets them create/edit/delete categories and courses, manage users, and read/respond-to visitor inquiries, all through a UI.
- Visitors need a way to reach the team with questions — the contact page collects and stores messages for admin follow-up.
- Users need accounts to access personalized areas — email/password authentication (via Better Auth) handles sign-up, login, and session state across the site.

### Key features
- Public marketing pages: home, about, contact (with a working contact form)
- Course catalog with listing and detail pages
- Email/password authentication with session-aware navbar
- Admin dashboard: categories, courses, users, and messages management (search, pagination, create/edit/delete)
- Responsive, Tailwind-based UI with toast notifications for user feedback

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI library | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4, HeroUI component library |
| Animation | Framer Motion |
| Icons | React Icons |
| Charts | Recharts (admin dashboard stats) |
| Auth | Better Auth (email/password) with MongoDB adapter |
| Notifications | react-hot-toast |
| Database driver | MongoDB Node.js driver (used by the Better Auth adapter) |

## Project Structure (high level)

```
client/
├─ src/
│  ├─ app/
│  │  ├─ (main)/          # public pages: /, /about, /contact, /courses, /courses/[id]
│  │  ├─ (auth)/           # /login, /register
│  │  └─ (dashboard)/      # /dashboard and /dashboard/admin/* (categories, courses, users, messages, settings)
│  ├─ components/          # shared UI + feature components (grouped by admin resource)
│  ├─ lib/                 # API clients (categories, courses, users, messages), auth client/server setup
│  ├─ types/                # shared TypeScript types
│  └─ constants/            # nav links, admin menu, etc.
```

## Prerequisites

- Node.js 20+ and npm
- A running instance of the companion **server** (see `../server/README.md`) — the frontend calls it for categories, courses, users, and messages
- A MongoDB database (Atlas or self-hosted) — used both by this app (Better Auth) and by the server

## Getting Started (from a fresh GitHub clone)

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd <repo-name>/client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in `client/` with:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
   NEXT_PUBLIC_API_URL=http://localhost:8000
   SESSION_SECRET=your_session_secret
   ```
   - `MONGODB_URI` — used by the Better Auth MongoDB adapter (same database the server uses is fine).
   - `NEXT_PUBLIC_BETTER_AUTH_URL` — the URL this frontend is served from.
   - `NEXT_PUBLIC_API_URL` — the URL of the running backend API (see `server/README.md`).
   - `SESSION_SECRET` — a random secret string for signing sessions.

4. **Start the backend first** (in a separate terminal) — see `server/README.md`. The frontend depends on it for all course/category/user/message data.

5. **Run the frontend in development mode**
   ```bash
   npm run dev
   ```
   The app runs on `http://localhost:3000` by default (pass `-p <port>` to change it, e.g. `npm run dev -- -p 5000`).

6. **Build and run for production**
   ```bash
   npm run build
   npm run start
   ```

## Available Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the Next.js dev server with hot reload |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Notes

- The frontend never calls the backend from the browser using a hardcoded `localhost` URL in committed code — it always reads `NEXT_PUBLIC_API_URL`, so update that variable per environment (local, staging, production).
- Admin dashboard routes (`/dashboard/admin/*`) currently have no role-based access restriction — see the root `PROJECT_REQUIREMENTS.md` for known gaps before deploying to production.
