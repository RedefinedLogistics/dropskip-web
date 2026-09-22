# DropSkip website

Two applications in one repository:

```
/          Next.js website (the public site)
/cms       Strapi CMS (blogs + contact inquiries + Amazon SES)
```

The website reads blogs from Strapi and posts the contact form to it. Strapi
stores the inquiry and sends the email notification through Amazon SES.
**No AWS credential exists anywhere in the Next.js application** — it never
talks to AWS at all.

```
Next.js contact form
        ↓  POST /api/contact  (server-side route, hides the CMS URL)
Strapi  POST /api/inquiries
        ↓  inquiry saved
        ↓  afterCreate lifecycle
Amazon SES
        ↓
Business inbox (SES_TO_EMAIL)
```

## Running it locally

Two terminals:

```bash
# Terminal 1 — the CMS
cd cms
npm install
npm run develop          # http://localhost:1337/admin

# Terminal 2 — the website
npm install
npm run dev              # http://localhost:3000
```

The first time Strapi starts it creates the Blog and Inquiry types, grants the
public role the permissions the site needs, and seeds the six existing posts. The
first visit to `/admin` asks you to create the admin account.

Copy `.env.example` to `.env.local` (website) and `cms/.env.example` to
`cms/.env` (CMS), and fill in what you need.

## Blog management

Everything is done in the Strapi admin panel under **Content Manager → Blog**.
Create, edit, delete, publish and unpublish. Unpublishing takes a post off the
website within a minute — the pages revalidate every 60 seconds, so nothing
needs a redeploy.

| Field | Notes |
|---|---|
| Title | |
| Slug | Generated from the title; it is the URL |
| Featured Image | Optional. Without one the post uses the drawn artwork |
| Short Description | Shown on the cards, and used as the meta description |
| Content | Rich text: headings, lists, bold, italic, links |
| Author | |
| Category | Drives the filter pills on `/blogs` |
| Tags | **Comma separated**, e.g. `tariffs, sourcing, cash` |
| Published Date | Sorts the blog, newest first |
| SEO Title / SEO Description | Fall back to Title and Short Description |
| Read Time | Free text, e.g. `4 min read` |
| Cover | Fallback artwork: `trend`, `network` or `bars` |

**There is no separate Status field.** Strapi reserves the name `status`, because
it collides with its own publish state in the API. The built-in **Draft /
Published** control is the status, and it is what the publish and unpublish
buttons drive.

### Pages

| URL | What it is |
|---|---|
| `/blogs` | The blog: hero, category filter pills, card grid |
| `/blogs/{slug}` | One article, with related articles below |

`/blog`, `/blog/all` and `/blog/{slug}` permanently redirect to these, so existing
links and anything already indexed keep working. The navigation still points at
`/blog` and lands correctly.

Each post page carries a canonical URL, Open Graph and Twitter tags, and
`BlogPosting` structured data built from the SEO fields.

## Contact form and Amazon SES

The form at `/contact` and the one at `/book-demo` both post to `/api/contact`,
a server-side route in the website. It validates, then forwards to Strapi. The
browser never sees the CMS URL or token.

Submissions appear in the Strapi admin under **Content Manager → Inquiry**, with
a `notified` flag showing whether the SES email went out.

The Inquiry type still has a `phone` column and the API still accepts one, but no
form collects it today — the email leaves out any field that is empty.

### Configuring SES

Set these in `cms/.env` — this is the only place AWS credentials exist:

```
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=us-east-1
SES_FROM_EMAIL=no-reply@dropskip.ai
SES_TO_EMAIL=support@dropskip.ai
```

On EC2, ECS or App Runner, leave the key and secret blank and attach an IAM role
with the `ses:SendEmail` permission instead — then there is no secret to store or
rotate.

**Verifying the sender**, in the SES console, in the same region as `AWS_REGION`:

1. **Identities → Create identity.** Verify either a single email address (a
   confirmation link arrives at it) or your whole domain.
2. A **domain** is the better choice: it lets you send from any address on it and
   it is what makes DKIM signing possible. Add the CNAME records SES gives you to
   your DNS, and wait for the status to become *Verified*.
3. `SES_FROM_EMAIL` must be that verified identity. SES rejects anything else.

**The sandbox.** A new SES account can only send *to* verified addresses, and is
rate limited. Until you request production access (SES console → Account
dashboard → Request production access), notifications only arrive if
`SES_TO_EMAIL` is verified too. Do this before launch.

**Reply-To, not From.** The email is sent from your verified address, with the
visitor's address as `Reply-To`, so replying in your mail client answers them
directly. Sending *as* the visitor would be rejected, and would fail SPF/DKIM.

The email that arrives:

```
Subject: New Website Inquiry - {Name}

Name:
Email:
Company:
Subject:
Message:
```

### When something goes wrong

The inquiry is saved *before* the email is attempted, and the SES call never
throws. A mail failure is logged with the cause spelled out and the submission is
still in the admin panel, so a bounced notification never loses a lead. The
visitor sees a success message; a genuine storage failure shows an error instead.

## Deploying

**Next.js on Vercel.** Set `STRAPI_URL` to the public CMS URL (and `STRAPI_TOKEN`
if you lock the Blog collection behind a token). Nothing else. Because blog pages
revalidate on a timer, the build does not fail if Strapi is briefly unavailable —
pages keep serving the last good render.

**Strapi anywhere with a persistent disk** — Railway, Render, Fly, EC2. It needs:

- the secrets in `cms/.env` (`APP_KEYS`, `ADMIN_JWT_SECRET`, and the rest),
- the AWS/SES variables above,
- a real database for production. The default SQLite file is fine for
  development; switch `DATABASE_CLIENT` to `postgres` and set the
  `DATABASE_*` variables in `cms/config/database.js` for production,
- persistent storage for uploaded images, or an upload provider such as S3.

## Where things live

```
src/lib/strapi.js                    Every call to the CMS: blogs and inquiries
src/app/api/contact/route.js         The form endpoint; forwards to Strapi
src/lib/validate-inquiry.js          Field checks before the CMS round trip
src/app/(site)/blogs/page.js         The blog: hero, filter pills, card grid
src/app/(site)/blogs/[slug]/page.js  One article, with the SEO tags
src/components/blog/                 Cards, grid, artwork, rich text
src/styles/blog.css                  All blog styling, on the homepage tokens

cms/src/api/blog/                    Blog content type
cms/src/api/inquiry/                 Inquiry content type
cms/src/api/inquiry/controllers/     Validation and sanitisation
cms/src/api/inquiry/services/ses.js  Amazon SES — the only AWS code
cms/src/api/inquiry/content-types/inquiry/lifecycles.js
                                     Sends the email after an inquiry is saved
cms/src/index.js                     Public permissions + first-run seed
cms/data/seed-blogs.json             The six original posts
```
