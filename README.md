# 🎮 P3RK Games Hub

A modern web platform for discovering, rating, and publishing indie and web games. Built with **Nuxt 4**, **Vue 3**, **Prisma**, and **Tailwind CSS**, P3RK Games connects players, creators, and game publishers in a unified community gaming ecosystem.

---

## 🌟 Key Features

- **Game Discovery & Search**: Browse trending games, search by keyword, and filter games by categories/tags, age rating, or user reviews.
- **Game Profiles & Details**: Dedicated game pages featuring thumbnails, descriptions, publisher metadata, and community ratings.
- **Rating System**: Interactive 1–5 star rating system for registered players.
- **Publisher Directory & Management**: Dedicated publisher profiles with branding, bio, official website links, and game catalogs.
- **Role-Based Authentication**: Custom authentication with bcrypt password hashing, JWT sessions, and three distinct roles:
  - `player`: Discover, play, and rate games.
  - `publisher`: Manage publisher profile and catalog.
  - `admin`: Monitor platform metrics (total games, publishers, registered players) via the Admin Dashboard.
- **RESTful API**: Full-stack backend powered by Nuxt Nitro server endpoints.

---

## 🛠️ Tech Stack

### Frontend & Framework
- **Framework**: [Nuxt 4](https://nuxt.com/) (Vue 3, Vue Router)
- **UI & Styling**: [Nuxt UI](https://ui.nuxt.com/) & [Tailwind CSS](https://tailwindcss.com/)
- **Language**: TypeScript / Modern JavaScript

### Backend & Database
- **Server Engine**: [Nuxt Nitro](https://nitro.unjs.io/) (Server API routes in `server/api/`)
- **ORM**: [Prisma](https://www.prisma.io/) via `@prisma/nuxt`
- **Database**: PostgreSQL (compatible with [Supabase](https://supabase.com/))
- **Auth & Security**: [bcrypt](https://www.npmjs.com/package/bcrypt) & [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

---

## 📁 Project Structure

```text
p3rk-games/
├── app/
│   ├── app.vue               # Main application entry
│   ├── assets/css/           # Tailwind CSS and global style imports
│   ├── middleware/           # Route guards (auth and role verification)
│   └── pages/                # Nuxt file-based routing
│       ├── index.vue         # Landing page (search, trending, categories)
│       ├── login.vue         # User sign-in
│       ├── register.vue      # User registration (player/publisher)
│       ├── admin.vue         # Administrator analytics dashboard
│       ├── trending.vue      # Trending games view
│       ├── ratings.vue       # Games sorted/filtered by ratings
│       ├── ages.vue          # Games filtered by age groups
│       ├── games/            # Games catalog and individual game views
│       └── publishers/       # Publisher directory and publisher management
├── prisma/
│   ├── schema.prisma         # Database schema (User, Publisher, Game, Rating)
│   └── migrations/           # Version-controlled database migrations
├── server/
│   ├── api/                  # Nitro API endpoints (games, publishers, auth, admin)
│   └── utils/                # Server utility helpers (Prisma client singleton)
├── nuxt.config.ts            # Nuxt configuration and module registration
└── package.json              # Project scripts and dependencies
```

---

## 🚀 Getting Started

Follow these steps to set up and run P3RK Games locally.

### Prerequisites

- **Node.js**: `v18.x` or `v20.x+`
- **Package Manager**: `npm`, `pnpm`, `yarn`, or `bun`
- **PostgreSQL Database**: A local PostgreSQL instance or a hosted database (such as Supabase or Neon).

### 1. Clone the Repository

```bash
git clone https://github.com/p8kaushal/p3rk-games.git
cd p3rk-games
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Add your database connection URLs and JWT secret:

```env
# PostgreSQL connection string (pooled connection if using Supabase)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=games"

# Direct connection string (required for Prisma migrations)
DIRECT_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=games"

# Secret key used to sign JWT session tokens
JWT_SECRET="your-super-secret-jwt-key"
```

### 4. Run Database Migrations

Apply database migrations to sync your schema with PostgreSQL:

```bash
npx prisma migrate dev
```

Generate the Prisma Client:

```bash
npx prisma generate
```

### 5. Start the Development Server

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000`.

---

## 📜 Available Scripts

| Script | Command | Description |
|---|---|---|
| **Development** | `npm run dev` | Starts the Nuxt development server with hot-module replacement |
| **Build** | `npm run build` | Builds the application for production deployment |
| **Preview** | `npm run preview` | Previews the production build locally |
| **Generate** | `npm run generate` | Pre-renders static pages for static hosting |
| **Prepare** | `npm run postinstall` | Generates Nuxt type definitions and hooks (`nuxt prepare`) |

---

## 🗄️ Database Schema Overview

- **User**: Stores player, publisher, and admin credentials, hashed passwords, and profile roles.
- **Publisher**: Represents gaming studios/publishers with name, logo, bio, website, and related games.
- **Game**: Stores game metadata including title, description, thumbnail URL, tags, age rating, and publisher relation.
- **Rating**: Stores user ratings (1 to 5) linked to a user and game.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/p8kaushal/p3rk-games/issues).

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
