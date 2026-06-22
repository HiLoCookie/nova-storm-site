# Nova Storm — Author Website

A simple, fast, static website for Nova Storm: fantasy author of trauma, morally
gray characters, and cunning heroines.

No build tools, no frameworks, no dependencies — just HTML, CSS, and a little
vanilla JS. This is deliberate: it makes the site fast, cheap to host, and easy
for you to edit yourself later, even without a developer.

---

## File structure

```
nova-storm-site/
├── index.html          ← Home page (hero, about teaser, books, newsletter, where to buy)
├── about.html           ← Full About page
├── books.html           ← Books page (currently: The Scales)
├── css/
│   ├── tokens.css        ← Colors, fonts, spacing — change the look here
│   ├── base.css          ← Reset, typography, buttons, the claw-mark divider
│   └── site.css          ← Page layout & components
├── js/
│   └── site.js           ← Mobile menu, footer year, newsletter form logic
└── README.md             ← You are here
```

## Design notes

- **Colors** live in `css/tokens.css` as CSS variables (`--sage`, `--clay`,
  `--pine`, etc). Change a hex value there and it updates everywhere.
- **Fonts**: Fraunces (display/headlines) + Source Sans 3 (body text), loaded
  from Google Fonts.
- **The claw-mark divider** (the small scratch-like lines between sections) is
  the one signature visual motif — a nod to the dragon-blood world without
  being a literal illustration.
- **The cat easter egg** lives in the footer — hover or tab to the paw print.

---

## 1. Adding real content (do this before launch)

Right now several things are intentional placeholders:

| What | Where | Replace with |
|---|---|---|
| Hero image block | `index.html`, `.hero__art` | A photo of you, or branded art |
| About portrait | `index.html` + `about.html`, `.about__portrait` | A real author photo |
| Book covers | `index.html` + `books.html`, `.book-cover` | Actual cover art (`<img>` tag) |
| Social links (`href="#"`) | All pages, social/footer links | Your real TikTok/Instagram/Goodreads/Amazon URLs |
| "Where to Buy" links | `index.html`, `.buy-card` | Real Amazon/Goodreads links |

To swap a placeholder block for a real image, replace the `<div>` with an
`<img src="images/your-photo.jpg" alt="...">` — the surrounding CSS (aspect
ratio, border) will still apply if you keep the same class names, or just ask
me and I'll wire it in directly once you upload the image.

---

## 2. Connecting the newsletter & ARC sign-up (Kit)

I'd recommend **Kit** (formerly ConvertKit) — its free plan covers up to
10,000 subscribers with unlimited sends, and it has the best tagging/segmentation
of the free options, which matters since you'll want to separate "newsletter
only" subscribers from "ARC reader" subscribers.

**Steps:**

1. Create a free account at [kit.com](https://kit.com).
2. In Kit, create a **Form** (not a landing page — you already have a landing
   page, this site). Name it something like "Website Signup."
3. Create two **tags**: `newsletter` and `arc-reader`.
4. Get your **Form ID** and **API Key** from Kit's settings (Account → Developer Settings).
5. Open `js/site.js` in this project and find the commented-out block under
   `signupForm`. Replace the placeholder `fetch()` call with your real Kit
   form endpoint, using your Form ID — Kit's docs will give you the exact
   request shape for their current API version.
6. Test it: submit the form on your live site with a real email and confirm
   it shows up in Kit with the right tag.

If this step feels fiddly when you get there, send me your Kit Form ID and
I'll wire up the exact `fetch()` call for you — it's a five-minute fix once
the account exists.

**For ARC delivery later** (actually sending manuscript files securely and
tracking downloads), the standard tool is **BookFunnel** — but you don't need
that until you have a manuscript ready to send. The sign-up form on this site
will be ready to feed into it whenever you are.

---

## 3. Deploying to Cloudflare Pages via Git

This is the part you mentioned wanting help with — here's the full path,
step by step, for when you're ready.

### Step 1 — Put the site in a Git repository

If you don't already have one:

```bash
cd nova-storm-site
git init
git add .
git commit -m "Initial Nova Storm site"
```

Then create a new repository on GitHub (or GitLab/Bitbucket — Cloudflare
Pages supports all three), and push:

```bash
git remote add origin https://github.com/YOUR-USERNAME/nova-storm-site.git
git branch -M main
git push -u origin main
```

### Step 2 — Connect Cloudflare Pages

1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com).
2. Go to **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
3. Authorize Cloudflare to access your GitHub account, and select the
   `nova-storm-site` repository.
4. Build settings — since this is a plain static site with no build step:
   - **Framework preset**: None
   - **Build command**: *(leave blank)*
   - **Build output directory**: `/` (the root)
5. Click **Save and Deploy**. Cloudflare will give you a `*.pages.dev` URL
   within a minute or two.

### Step 3 — Connect your domain (novastormauthor.com)

1. In the Pages project, go to **Custom domains** → **Set up a custom domain**.
2. Enter `novastormauthor.com` (and optionally `www.novastormauthor.com`).
3. If your domain's DNS is already on Cloudflare, this is automatic. If it's
   registered elsewhere, Cloudflare will give you the DNS records to add at
   your registrar (usually a CNAME).
4. Wait for DNS propagation (usually minutes, sometimes up to 24 hours).

### From now on

Every time you (or I) push a change to the `main` branch on Git, Cloudflare
automatically rebuilds and redeploys the live site — no manual upload step,
ever again.

When you're ready for this step, tell me and I'll walk through it with you
live, including troubleshooting any DNS hiccups.

---

## 4. Phase 2 ideas (not built yet, but the site is structured to support them)

- **Reading order & character profiles** — would slot in as a new page
  (`world.html` or similar), linked from the nav.
- **Art gallery** — same pattern, a new page with an image grid.
- **Direct sales / special editions** — the "Direct from Nova" card on the
  homepage is already there as a placeholder; when you're ready, this becomes
  either a Stripe Checkout integration or simply a link to wherever you sell
  signed copies (Etsy, etc.).

Just let me know when you want to tackle any of these and we'll build them
into the existing structure.
