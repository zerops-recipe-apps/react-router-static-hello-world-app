// Build-time constants injected by Vite define (vite.config.ts).
// These are NOT runtime values — they are replaced with literal
// strings in the compiled bundle during 'react-router build'.
declare const __BUILD_TIME__: string;
declare const __REACT_ROUTER_VERSION__: string;

export function meta() {
  return [
    { title: "React Router v7 — Zerops Hello World" },
    { name: "description", content: "React Router v7 static SPA on Zerops" },
  ];
}

export default function Home() {
  // VITE_APP_ENV is set via RUNTIME_APP_ENV in the zerops.yaml
  // buildCommands. It is baked into this bundle at build time —
  // there is no runtime process to read env vars in static deploys.
  const env = import.meta.env.VITE_APP_ENV ?? "production";

  return (
    <main style={styles.main}>
      <header style={styles.header}>
        <p style={styles.badge}>React Router v{__REACT_ROUTER_VERSION__}</p>
        <h1 style={styles.heading}>Hello from Zerops!</h1>
        <p style={styles.sub}>
          Static SPA deployed on Zerops via React Router v7 in SPA mode.
        </p>
      </header>

      <dl style={styles.card}>
        <dt style={styles.dt}>Environment</dt>
        <dd style={{ ...styles.dd, ...styles.mono, color: "#0066cc" }}>
          {env}
        </dd>
        <dt style={styles.dt}>Build time</dt>
        <dd style={{ ...styles.dd, ...styles.mono }}>{__BUILD_TIME__}</dd>
        <dt style={styles.dt}>React Router</dt>
        <dd style={{ ...styles.dd, ...styles.mono }}>
          v{__REACT_ROUTER_VERSION__}
        </dd>
      </dl>

      <p style={styles.hint}>
        <strong>How it works:</strong> The environment name above comes from a
        build-time env var (<code>VITE_APP_ENV</code>), injected via{" "}
        <code>RUNTIME_APP_ENV</code> in the Zerops build pipeline. There is no
        runtime process in a static deploy — all configuration is baked in at
        build time.
      </p>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  main: {
    fontFamily: "system-ui, -apple-system, sans-serif",
    maxWidth: "580px",
    margin: "5rem auto",
    padding: "0 1.5rem",
    color: "#1a1a2e",
  },
  header: {
    marginBottom: "2rem",
  },
  badge: {
    fontSize: "0.8rem",
    fontWeight: 700,
    color: "#ca4246",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    margin: "0 0 0.5rem",
  },
  heading: {
    fontSize: "2.25rem",
    fontWeight: 800,
    margin: "0 0 0.5rem",
    lineHeight: 1.15,
  },
  sub: {
    color: "#555",
    margin: 0,
    lineHeight: 1.6,
  },
  card: {
    display: "grid",
    gridTemplateColumns: "max-content 1fr",
    gap: "0.6rem 2rem",
    background: "#f8f8fc",
    border: "1px solid #e4e4f0",
    borderRadius: "10px",
    padding: "1.25rem 1.5rem",
    margin: "0 0 1.5rem",
    fontSize: "0.9rem",
  },
  dt: {
    fontWeight: 600,
    color: "#666",
  },
  dd: {
    margin: 0,
  },
  mono: {
    fontFamily: "ui-monospace, monospace",
    fontSize: "0.85rem",
  },
  hint: {
    fontSize: "0.85rem",
    color: "#555",
    lineHeight: 1.65,
    background: "#fffbea",
    border: "1px solid #f0e6a0",
    borderRadius: "8px",
    padding: "1rem 1.25rem",
    margin: 0,
  },
};
