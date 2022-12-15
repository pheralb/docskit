import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
  useLocation,
  useOutlet,
  useTransition,
} from "@remix-run/react";
import type { MetaFunction, LinksFunction } from "@remix-run/node";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import NProgress from "nprogress";

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

  useEffect(() => {
    // when the state is idle then we can to complete the progress bar
    if (transition.state === "idle") NProgress.done();
    // and when it's something else it means it's either submitting a form or
    // waiting for the loaders of the next location so we start it
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
          <motion.main key={location.pathname}>
            {outlet}
          </motion.main>
        </AnimatePresence>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
