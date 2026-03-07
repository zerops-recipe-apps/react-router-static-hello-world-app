# React Router v7 Hello World Recipe App

<!-- #ZEROPS_EXTRACT_START:intro# -->
A minimal React Router v7 application running in SPA mode (no SSR), deployed as a static site on Zerops — built with Node.js, served by Nginx, with build-time environment variable injection via Vite.
Used within [React Router v7 Hello World recipe](https://app.zerops.io/recipes/react-router-hello-world) for [Zerops](https://zerops.io) platform.
<!-- #ZEROPS_EXTRACT_END:intro# -->

⬇️ **Full recipe page and deploy with one-click**

[![Deploy on Zerops](https://github.com/zeropsio/recipe-shared-assets/blob/main/deploy-button/light/deploy-button.svg)](https://app.zerops.io/recipes/react-router-hello-world?environment=small-production)

![react-router cover](https://github.com/zeropsio/recipe-shared-assets/blob/main/covers/svg/cover-react-router.svg)

## Integration Guide

<!-- #ZEROPS_EXTRACT_START:integration-guide# -->

### 1. Adding `zerops.yaml`

The main application configuration file you place at the root of your repository. It tells Zerops how to build, deploy, and run your application.

```yaml
zerops:
  # Production setup: build static assets with Node.js,
  # serve with Nginx. Node.js is NOT present at runtime.
  - setup: prod
    build:
      # Build with Node.js (npm/npx); Nginx serves the output.
      # The build container compiles the React Router app into
      # static HTML/CSS/JS, then is deleted after deploy.
      base: nodejs@22

      buildCommands:
        - npm ci
        # Inject VITE_APP_ENV at build time so the compiled JS
        # bundle carries the environment name. RUNTIME_APP_ENV
        # is the service's runtime env var, auto-prefixed by
        # Zerops and injected into the build shell environment.
        # Falls back to 'production' when unset.
        - VITE_APP_ENV=${RUNTIME_APP_ENV:-production} npm run build

      # Strip the 'build/client/' prefix so that the directory
      # contents become the Nginx document root directly
      # (build/client/index.html → /index.html, etc.).
      deployFiles:
        - build/client/~

      cache:
        - node_modules

    run:
      # Nginx serves the compiled static assets automatically —
      # no start command needed; Zerops manages Nginx.
      base: static
      # Built-in SPA fallback: any path that does not match a
      # file is served index.html, so React Router's client-side
      # routing (useNavigate, <Link>, etc.) works out of the box.

  # Dev setup: deploy full source to a Node.js container for
  # SSH-based development. Zerops prepares the workspace;
  # the developer drives via SSH.
  - setup: dev
    build:
      base: nodejs@22
      os: ubuntu
      buildCommands:
        # npm install (not npm ci) — dev environments may not
        # have a lock file yet; flexible installs are appropriate.
        - npm install

      # Deploy the entire working directory (source + deps) so
      # the developer has a ready workspace on SSH login.
      deployFiles: ./

      cache:
        - node_modules

    run:
      # Node.js runtime — developer can run 'npm run dev' or
      # any React Router / Vite CLI command via SSH.
      base: nodejs@22
      os: ubuntu
      # zsc noop keeps the container alive without starting a
      # server. The developer starts their own dev server via SSH.
      start: zsc noop --silent
```

### 2. Key configuration — `react-router.config.ts`

React Router v7 supports both SSR and SPA modes. For static deployment on Zerops, set `ssr: false` to enable SPA mode — no server rendering, output goes to `build/client/`.

```ts
import type { Config } from "@react-router/dev/config";

export default {
  ssr: false,
} satisfies Config;
```

### 3. Build-time environment variables

Static deployments have **no runtime process** — env vars must be injected at build time and baked into the compiled JS bundle.

Zerops automatically exposes a service's runtime env vars to the build shell with a `RUNTIME_` prefix. Set `APP_ENV` on the service, and read `RUNTIME_APP_ENV` in your build command:

```yaml
# In import.yaml — sets the service runtime env var
envVariables:
  APP_ENV: production

# In zerops.yaml buildCommands — injects it into the Vite build
- VITE_APP_ENV=${RUNTIME_APP_ENV:-production} npm run build
```

In your app, read it as a compile-time constant:

```ts
const env = import.meta.env.VITE_APP_ENV;
```

<!-- #ZEROPS_EXTRACT_END:integration-guide# -->
