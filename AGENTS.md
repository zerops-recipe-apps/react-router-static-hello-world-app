# react-router-static-hello-world-app

React Router v8 SPA (`ssr: false`) built with Vite — static build served by nginx in prod; dev container runs the Vite dev server over SSH.

## Zerops service facts

- HTTP port: dev `5173` (Vite) / prod `80` (nginx)
- Siblings: —
- Runtime base: dev `nodejs@24` / prod `static`

## Zerops dev

`setup: dev` idles on `zsc noop --silent`; the agent starts the dev server.

- Dev command: `npm run dev`
- In-container rebuild without deploy: `npm run build`

**All platform operations (start/stop/status/logs of the dev server, deploy, env / scaling / storage / domains) go through the Zerops development workflow via `zcp` MCP tools. Don't shell out to `zcli`.**

## Notes

- `react-router.config.ts` sets `ssr: false` — SPA/static mode; build output lives in `build/client/` and is deployed flattened (`build/client/~`) as the nginx document root.
- `VITE_*` env vars are baked into the bundle at build time. Set defaults in `build.envVariables` in `zerops.yaml`; override at build time via the `RUNTIME_` prefix pattern (e.g. `VITE_APP_ENV=${RUNTIME_APP_ENV:-production} npm run build`) — there is no runtime process in static serving.
- Prod build uses `npm ci --include=dev` — Zerops sets `NODE_ENV=production`, which omits devDependencies (TypeScript, Vite) unless explicitly included.
- Static assets (favicon) live in `public/` and are copied to the build root by Vite.
