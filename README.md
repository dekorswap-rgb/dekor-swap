This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.


This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load fonts.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy to GitHub Pages

This project is configured to deploy automatically to GitHub Pages when you push to the `main` branch.

**Deployment is handled by GitHub Actions** - see `.github/workflows/deploy-gh-pages.yml`

Your site will be available at: `https://dekorswap-rgb.github.io/dekor-swap/`

For more details, check out the [DEPLOYMENT.md](DEPLOYMENT.md) file.

## Deploy to GitHub Pages (static export)

This project can be exported to static HTML and hosted on GitHub Pages if it doesn't rely on server-only features.

1. Ensure your site is static-compatible (no API routes or server-only code).
2. Optionally set `basePath`/`assetPrefix` in `next.config.ts` if hosting at `username.github.io/REPO_NAME`.
3. Build and export locally:

```bash
npm ci
npm run export
```

4. Publish with the included GitHub Action (push to `main`) or run:

```bash
npm run deploy:gh
```

If `deploy:gh` is used, enable GitHub Pages to serve from the `gh-pages` branch in repository settings.
