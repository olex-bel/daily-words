import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useParams,
} from "react-router";

import { useTranslation } from "react-i18next";
import { RiLoader4Line } from "react-icons/ri";
import type { Route } from "./+types/root";
import "./app.css";
import './i18n';

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,800;1,400&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&display=swap",
  },
];

export function HydrateFallback() {
  return <div className="min-h-screen flex justify-center items-center animate-spin text-ink">
    <RiLoader4Line className="h-12 w-12" />
  </div>;
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { lang } = useParams<{ lang: string }>();

  return (
    <html lang={lang || "uk"}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full min-h-dvh grid grid-rows-[auto_1fr_auto]">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const { t } = useTranslation();
  let message = t("error.generic.title");
  let details = t("error.generic.message");
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? t("error.notFound.message")
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <title>{t("error.meta.title")}</title>
      <meta name="description" content={t("error.meta.description")}/>
      <meta name="keywords" content={t("error.meta.keywords")}/>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
