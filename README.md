# All of Us: Social Development Events Platform

**Together for a Better Community.**

**Live Site:** [https://all-of-us-client.vercel.app](https://all-of-us-client.vercel.app)

All of Us is a community-driven event management platform where people can create, join and track social service events in their local area, from winter clothes distribution in Mirpur to tree plantation drives in Dhanmondi.

---

## Key Features

- **Create and manage events:** logged-in users can publish social service events (cleanup, plantation, donation, food distribution, health camp, blood donation, education and more). Past dates are rejected, and users can update or delete only the events they created.
- **Upcoming events with live search and filter:** browse every upcoming event in a responsive grid, filter by event type instantly and search by title or location. Events whose date has passed never appear.
- **One-click join system:** anyone can read the event details without logging in, but joining requires an account. Each user can join an event only once, and the participant count updates right away.
- **Joined events dashboard:** see every event you have joined, sorted by event date, with a clear Joined or Completed status.
- **Secure authentication:** email and password login with validation (uppercase letter, lowercase letter and at least 6 characters) plus Google sign-in, powered by Better Auth with the MongoDB adapter.
- **JWT-protected API:** private API routes verify a JWT against the client's JWKS endpoint, so only the owner of an event can update or delete it.
- **Protected routes that survive reload:** private pages are guarded on the server, so a logged-in user is never sent back to the login page when reloading.
- **Light and dark theme:** one-click theme toggle that switches the whole interface.
- **Profile view and update:** users can change their display name and profile photo.
- **Polished user experience:** loading skeletons, toast notifications instead of browser alerts, form validation on every form, and a fully responsive layout for mobile, tablet and desktop.

---

## Pages

| Route | Access | Description |
|---|---|---|
| `/` | Public | Banner, features, 6 recent upcoming events, gallery and newsletter |
| `/events` | Public | All upcoming events with search and type filter |
| `/events/[id]` | Public | Event details and Join Event button (login required to join) |
| `/login` | Public | Email/password and Google login |
| `/register` | Public | Registration with name, email, photo URL and password |
| `/create-event` | Private | Create a new event |
| `/manage-events` | Private | View, update and delete your own events |
| `/manage-events/[id]/edit` | Private | Update an event |
| `/joined-events` | Private | Events you have joined, sorted by date |
| `/profile` | Private | View and update your name and photo |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) with TypeScript |
| UI | Tailwind CSS, shadcn/ui, Lucide icons |
| Authentication | Better Auth, MongoDB adapter, JWT plugin |
| Notifications | Sonner toasts |
| Theming | next-themes |
| Backend | Express.js and MongoDB (separate repository) |
| Hosting | Vercel |

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/DibajitRoy/all-of-us-client.git
cd all-of-us-client
npm install
```

### 2. Add environment variables

Create a `.env` file in the project root:

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=a_long_random_string
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:8000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

For Google login, add `http://localhost:3000` as an authorised JavaScript origin and `http://localhost:3000/api/auth/callback/google` as an authorised redirect URI in the Google Cloud Console.

### 3. Run the server

The API lives in a separate repository: [all-of-us-server](https://github.com/DibajitRoy/all-of-us-server). Start it first, because private routes depend on it.

### 4. Start the client

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
src/
  app/            Pages and routes (App Router) and the Better Auth API route
  components/     Navbar, footer, logo, home sections, event cards, forms
  lib/            Auth config, API helpers, types and date formatting
  proxy.ts        Server-side protection for private routes
public/           Logo, hero image and gallery photos
```

---

## Deployment

The client is deployed on Vercel and updates automatically on every push to the `main` branch. Set the same environment variables in the Vercel project settings, using the live URLs for `BETTER_AUTH_URL` and `NEXT_PUBLIC_API_URL`.

---

## Author

Built by **Dibajit Roy** as part of the Social Development Events Platform assignment.

- GitHub: [DibajitRoy](https://github.com/DibajitRoy)
