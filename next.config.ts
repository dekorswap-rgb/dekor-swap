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
  }
  ,
  // Produce a static export when running `next build`.
  // This replaces the removed `next export` CLI in Next 15+.
  output: 'export',
  // If you plan to host the static export at a repository path
  // set `basePath` and `assetPrefix` to the repo name, e.g. '/dekor-swap'.
  // Leave commented unless you host under username.github.io/REPO_NAME
  // basePath: '/REPO_NAME',
  // assetPrefix: '/REPO_NAME/',
  trailingSlash: true
};

export default nextConfig;
// Orchids restart: 1769363925184
