import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
  useOutlet,
  useTransition,
} from "@remix-run/react";
import { MetaFunction, LinksFunction } from "@remix-run/node";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import NProgress from "nprogress";

// Styles =>
import styles from "./styles/tailwind.css";
import fonts from "./styles/fonts.css";
import nProgressStyles from "nprogress/nprogress.css";

// Links =>
export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: fonts },
    { rel: "stylesheet", href: nProgressStyles },
    {
      rel: "preload",
      as: "font",
      href: "/fonts/Inter-roman-latin.var.woff2",
      type: "font/woff2",
      crossOrigin: "anonymous",
    },
    {
      rel: "preload",
      as: "font",
      href: "/fonts/CascadiaCode.woff2",
      type: "font/woff2",
      crossOrigin: "anonymous",
    },
  ];
};

// Metas =>
export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  const outlet = useOutlet();
  const location = useLocation();
  const transition = useTransition();
  const data = useLoaderData();

  useEffect(() => {
    if (transition.state === "idle") NProgress.done();
    else NProgress.start();
  }, [transition.state]);

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="text-white bg-midnight text-mini">
        <AnimatePresence mode="wait">
          <motion.main key={location.pathname}>{outlet}</motion.main>
        </AnimatePresence>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
