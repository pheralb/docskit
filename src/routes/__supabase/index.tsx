import Header from "@/layout/header";
import Footer from "@/layout/footer";

import { FaMarkdown } from "react-icons/fa";
import { SiSupabase } from "react-icons/si";
import { Link } from "@remix-run/react";
import Up from "@/components/animations/up";
import Down from "@/components/animations/down";

export default function Index() {
  return (
    <>
      <Header />
      <div className="max-w-screen-xl px-10 mx-auto xl:px-16">
        <div className="mx-auto mt-24 md:px-24">
          <Up>
            <h2 className="text-4xl font-medium text-center">
              Create and share documentation effortlessly
            </h2>
          </Up>
          <Down delay={0.2}>
            <p className="mt-4 mb-2 text-xl text-center">
              using Markdown & Supabase
            </p>
          </Down>
        </div>
        <Down delay={0.4}>
          <div className="flex items-center justify-center mb-2 space-x-6">
            <FaMarkdown
              size={60}
              className="transition-colors duration-150 text-neutral-500 hover:text-yellow-500"
            />
            <SiSupabase
              size={35}
              className="transition-colors duration-150 text-neutral-500 hover:text-green-500"
            />
          </div>
          <Link
            to="/app"
            className="flex items-center justify-center px-4 py-3 text-lg font-medium text-white hover:text-gray-200"
          >
            ✍️ Get started
          </Link>
        </Down>
      </div>
      <Footer />
    </>
  );
}
