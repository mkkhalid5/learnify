// Base URL for the Express API.
//
// - In the browser, requests must go through the Next.js server's
//   `/backend-api` rewrite (see next.config.ts) since the Express server
//   itself is only reachable inside this container, not publicly.
// - On the server (SSR/server components/route handlers), `fetch` needs an
//   absolute URL, and the Next.js server can reach the Express API directly
//   over the loopback interface, so we skip the rewrite there.
export const API_BASE_URL =
    typeof window === "undefined"
        ? (process.env.INTERNAL_API_URL ?? "https://learnify-server-phi.vercel.app")
        : (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000");
