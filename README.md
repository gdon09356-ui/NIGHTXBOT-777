# UBAID EDITS — Personal Portfolio Website

> EDIT • CREATE • INSPIRE
> Video Editor | Motion Graphics Designer | Creative Content Specialist

A high-class, light **WHITE + RED** portfolio built with **Next.js 16,
TypeScript, Tailwind CSS 4, Prisma (SQLite) and Framer Motion**.
Trilingual UI: English / العربية / اردو (switcher in the navbar).

---

## 1. Quick start

```bash
bun install        # install dependencies
bun run db:push    # create/update the SQLite database
bun run dev        # start the dev server (http://localhost:3000)
bun run lint       # code quality check
```

---

## 2. Admin panel — manage everything without touching code

Open **`/admin`** (a discreet "Admin" link also sits in the site footer).

- **Default password:** `ubaid2026` — change it by setting the `ADMIN_PASSWORD`
  environment variable (e.g. in `.env`: `ADMIN_PASSWORD=my-new-password`).

Four tabs:

| Tab | What you can do |
| --- | --- |
| **Videos** | Upload portfolio videos (mp4/webm/mov/mkv up to 600 MB) with title, description, category, optional thumbnail. Files are auto-optimized for web and auto-thumbnails are extracted. Edit / delete / pin-to-top ("Feature"). |
| **Reviews** | Add, edit and delete the client testimonials shown on the site (name, company, country, service tag, rating, quote, optional client photo). |
| **Profile** | Edit phone, WhatsApp, email (empty = hidden), location, social links and the About bio — updates the public Contact section + footer instantly. |
| **Messages** | The project-brief inbox: every contact-form submission lands here; delete entries anytime. |

Everything published appears **instantly** on the public site.

> Tip: short edits around **30 seconds** load fast on mobile and perform best.

---

## 3. What is on the site

1. **Hero** — real photo of Ubaid in his editing suite + CTAs
2. **About** — bio (editable in Admin → Profile) + expertise
3. **Services** — "WHAT I CREATE": six services with professional Lucide icons
4. **Portfolio** — real client videos from the Admin panel, category filters, hover preview, click-to-play lightbox
5. **Workflow** — 4-step creative process
6. **Testimonials** — client reviews managed in Admin → Reviews
7. **Contact** — working form (stored in DB → Admin → Messages) + phone / WhatsApp / social channels

All personal details (phone `+92 345 3834605`, WhatsApp `923453834605`) are
managed from **Admin → Profile**; the fallback defaults live in
`src/content/site.ts`.

---

## 4. Project layout

```
prisma/schema.prisma        Video / Testimonial / SiteProfile / ContactSubmission models
src/app/page.tsx            Landing page (lazy-loaded sections for fast mobile load)
src/app/admin/              Admin panel (videos / reviews / profile / messages tabs)
src/app/api/                REST endpoints (public + admin, cookie-authenticated)
src/components/sections/    Site sections
src/i18n/dictionaries.ts    All UI text (EN / AR / UR)
src/content/site.ts         Brand constants + contact fallbacks
public/uploads/             Uploaded videos, thumbnails, client avatars
public/media/images/        Real photos + neutral placeholder thumb
scripts/                    seed_cms.mjs (testimonials + profile), gen_clients.mjs (avatars)
```

---

## 5. Notes

- **12 starter testimonials** are seeded with AI-generated client photos —
  edit or replace them with real client feedback from **Admin → Reviews**.
- The trilingual switcher (EN / العربية / اردو) lives in the navbar; DB content
  (video titles, review quotes) is displayed in its original language.
- `prefers-reduced-motion` is respected globally; sections mount lazily for a
  fast first paint on mobile.
