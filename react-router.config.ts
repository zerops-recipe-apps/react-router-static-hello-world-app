import type { Config } from "@react-router/dev/config";

export default {
  // SPA mode: no server-side rendering. React Router compiles
  // a fully static bundle to build/client/ — served by Nginx.
  ssr: false,
} satisfies Config;
