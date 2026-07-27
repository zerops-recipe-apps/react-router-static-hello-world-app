import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

export function links() {
  return [{ rel: "icon", href: "/favicon.ico", type: "image/x-icon" }];
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// Shown while JS is loading in SPA mode (ssr: false).
// <Scripts /> is required here so the page can hydrate once
// the JS bundle finishes loading.
export function HydrateFallback() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Loading…</title>
        <Scripts />
      </head>
      <body>
        <main
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            maxWidth: "580px",
            margin: "5rem auto",
            padding: "0 1.5rem",
            color: "#999",
          }}
        >
          Loading…
        </main>
      </body>
    </html>
  );
}
