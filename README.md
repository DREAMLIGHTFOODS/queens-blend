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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## SEO Guard

Run the SEO guard to validate metadata and JSON-LD coverage on key B2C and B2B routes:

```bash
npm run seo:guard
```

Canonical strict mode options:

- Local relaxed (default):

```bash
npm run seo:guard
```

- Explicit relaxed mode:

```bash
node scripts/seo-guard.mjs --strict-canonical=false
```

- Explicit strict mode:

```bash
node scripts/seo-guard.mjs --strict-canonical=true
```

CI behavior:

- When `CI=true`, strict canonical mode is enabled by default.
- Equivalent CI command:

```bash
CI=true npm run seo:guard
```

Accepted strict mode values are `true/false`, `1/0`, `yes/no`, and `on/off`.

## Performance Snapshot

Run a lightweight performance regression snapshot for CI. The script can build, start the app, capture bundle totals, and measure route response timings.

```bash
npm run perf:snapshot
```

Baseline workflow for relative regressions:

```bash
npm run perf:baseline:update
npm run perf:compare
```

How it works:

- `perf:baseline:update` writes a committed baseline file at `docs/reports/perf-baseline.json`.
- `perf:baseline:update` includes `--require-clean-git`, so baseline refresh only runs from a clean git worktree.
- `perf:compare` uses tuned defaults: stricter bundle growth (`20KB`) and looser route jitter (`80ms`) relative to baseline.
- `perf:compare` measures current performance and fails only when relative regressions exceed configured growth budgets.

Common CI budget usage:

```bash
node scripts/perf-snapshot.mjs --build --max-total-js-kb=900 --max-route-avg-ms=350
```

Relative comparison usage:

```bash
node scripts/perf-snapshot.mjs --build --compare-baseline --baseline=docs/reports/perf-baseline.json --max-total-js-growth-kb=30 --max-route-avg-regression-ms=50
```

Optional flags:

- `--routes=/,/products,/products/category/heritage,/products/assam`
- `--routes=/,/products,/products/category/heritage,/tea-guide`
- `--runs=3`
- `--host=127.0.0.1`
- `--port=3107`
- `--update-baseline`
- `--compare-baseline`
- `--require-clean-git`
- `--baseline=docs/reports/perf-baseline.json`
- `--max-total-js-growth-kb=20`
- `--max-total-js-growth-pct=5`
- `--max-route-avg-regression-ms=80`
- `--max-route-avg-regression-pct=10`

The snapshot report is written to `docs/reports/perf-snapshot.json`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
