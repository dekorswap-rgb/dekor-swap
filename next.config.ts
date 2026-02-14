import type { NextConfig } from "next";
import path from "node:path";

// Node may be started with an experimental `--localstorage-file` flag
// which can leave `globalThis.localStorage` present but missing the
// standard Storage methods. Defensive shim: if `localStorage` exists
// but `getItem` is not a function, replace it with an in-memory shim
// so server-side code that checks for `localStorage` won't throw.
try {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const g: any = globalThis as any;
  if (g && g.localStorage && typeof g.localStorage.getItem !== "function") {
    const _map = new Map<string, string>();
    g.localStorage = {
      getItem(key: string) {
        return _map.has(key) ? _map.get(key) ?? null : null;
      },
      setItem(key: string, value: string) {
        _map.set(key, String(value));
      },
      removeItem(key: string) {
        _map.delete(key);
      },
      clear() {
        _map.clear();
      },
    };
  }
} catch {
  // ignore
}

const LOADER = path.resolve(__dirname, 'src/visual-edits/component-tagger-loader.js');

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  outputFileTracingRoot: path.resolve(__dirname, '../../'),
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  turbopack: {
    rules: {
      "*.{jsx,tsx}": {
        loaders: [LOADER]
      }
    }
  },
  // Produce a static export when running `next build`.
  // This replaces the removed `next export` CLI in Next 15+.
  output: 'export',
  // Custom domain configuration (dekorswap.com)
  // No basePath needed - site is served from root of custom domain
  trailingSlash: true,

  // Security Headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: https: http:",
              "font-src 'self' data: https://fonts.gstatic.com",
              "connect-src 'self' https://vercel.live wss://ws-us3.pusher.com",
              "frame-src 'self' https://vercel.live",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
              "upgrade-insecure-requests"
            ].join('; ')
          }
        ],
      },
    ];
  },
};

export default nextConfig;
// Orchids restart: 1769363925184
