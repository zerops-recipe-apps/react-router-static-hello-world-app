import { reactRouter } from "@react-router/dev/vite";
import { readFileSync } from "node:fs";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Read the installed react-router version from node_modules
// so it can be baked into the static bundle at build time.
const { version: rrVersion } = JSON.parse(
  readFileSync("./node_modules/react-router/package.json", "utf-8"),
);

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths()],
  define: {
    // Injected as compile-time constants — not runtime values.
    // These are replaced by their literal string values in the
    // output bundle by Vite's define transform.
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    __REACT_ROUTER_VERSION__: JSON.stringify(rrVersion),
  },
});
