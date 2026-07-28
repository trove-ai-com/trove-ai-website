# Trove-AI Website

Marketing site for Trove-AI, including Resources & Insights with a Supabase-backed admin CMS.

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:5173/

## Admin CMS (Resources & Insights)

Signed-in admins can add, edit, and delete:

- Insights blog articles (with image upload)
- Resource guides
- Resources page copy (hero, about, CTA)
- Resources FAQs

### 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a free project
2. Open **SQL Editor** and run the full migration file:
   [`supabase/migrations/20260727_resources_insights_cms.sql`](supabase/migrations/20260727_resources_insights_cms.sql)
3. Confirm tables exist: `blog_posts`, `resource_guides`, `resources_page_copy`, `resource_faqs`
4. Confirm storage bucket `content-images` exists (created by the migration)

### 2. Create an admin user

In Supabase → **Authentication** → **Users** → **Add user**:

- **Email:** `{username}@trove-admin.local`  
  Example: username `admin` → email `admin@trove-admin.local`
- **Password:** choose a strong password
- Auto-confirm the user if prompted

On the site sign-in form, enter only the **username** (`admin`) and the password — the app maps username → `admin@trove-admin.local` automatically.

### 3. Configure environment variables

```bash
cp .env.example .env
```

Fill in from Supabase → **Project Settings** → **API**:

```
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

Restart the dev server after saving `.env`.

### 4. Sign in

- Footer → **Admin**, or Blog → **Manage content**
- Sign in with username + password
- Use the Blog / Guides / Page copy / FAQs tabs

Without Supabase env vars, the public site still works using local markdown/fallback content; admin write operations require Supabase.

## Build

```bash
npm run build
```
