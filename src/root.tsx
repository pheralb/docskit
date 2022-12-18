import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useTransition,
} from "@remix-run/react";
import { MetaFunction, LinksFunction } from "@remix-run/node";
import { useEffect } from "react";
import NProgress from "nprogress";
import { Toaster } from "react-hot-toast";

// Styles =>
import styles from "./styles/tailwind.css";
import fonts from "./styles/fonts.css";
import prism from "./styles/prism.css";
import nProgressStyles from "nprogress/nprogress.css";
import superkeyStyles from "superkey/styles.css";
import Header from "./layout/header";
import Footer from "./layout/footer";
import { IoAlertCircleOutline } from "react-icons/io5";

// Links =>
export const links: LinksFunction = () => {
  return [
    // Styles:
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: fonts },
    { rel: "stylesheet", href: superkeyStyles },
    { rel: "stylesheet", href: nProgressStyles },
    { rel: "stylesheet", href: prism },
    // Fonts:
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
    // Icons:
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/images/apple-touch-icon-180x180.png",
    },
    {
      rel: "icon",
      type: "image/svg+xml",
      href: "/img/logo_svg.svg",
    },
  ];
};

// Metas =>
export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Docskit - Create and share documentation effortlessly",
  description:
    "Create and share documentation effortlessly. Powered by Remix + Supabase & MDX.",
  viewport: "width=device-width,initial-scale=1",
  image: "https://docskit.vercel.app/img/og_img.jpg",
  "twitter:image": "https://docskit.vercel.app/img/og_img.jpg",
  "twitter:card": "summary_large_image",
  "twitter:creator": "@pheralb_",
  "twitter:site": "@pheralb_",
  "twitter:title": "Docskit",
  "twitter:description": "Create and share documentation effortlessly",
});

export default function App() {
  const transition = useTransition();

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
      <body className="font-sans text-white bg-midnight text-mini">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <Toaster position="bottom-right" reverseOrder={false} />
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <html>
      <head>
        <title>Oops - Docskit</title>
        <Meta />
        <Links />
      </head>
      <body className="font-sans text-white bg-midnight text-mini">
        <Header />
        <div className="flex flex-col items-center justify-center">
          <IoAlertCircleOutline className="mb-3" size={80} />
          <h1 className="mb-2 text-4xl font-medium">{caught.status}</h1>
          <p className="text-center">{caught.statusText}</p>
        </div>
        <Footer />
        <Scripts />
      </body>
    </html>
  );
}
