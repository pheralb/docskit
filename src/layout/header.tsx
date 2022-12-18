import Logo from "@/components/icons/logo";
import Button from "@/ui/button";
import { Link } from "@remix-run/react";
import { BiLinkExternal } from "react-icons/bi";
import { IoLogoGithub, IoLogoTwitter } from "react-icons/io5";

const Header = () => {
  return (
    <div className="sticky top-0 z-50 w-full py-5 pl-4 pr-6 bg-midnight">
      <div className="flex items-center justify-between">
        <Link to="/">
          <div className="flex items-center space-x-3 text-gray-300 transition-colors duration-150 cursor-pointer hover:text-white">
            <Logo className="w-8 border rounded-full border-neutral-800" />
            <p className="font-medium">docskit</p>
          </div>
        </Link>
        <div className="flex items-center">
          <Link
            to="/app"
            className="flex items-center mr-4 text-sm text-gray-300 transition-colors duration-150 cursor-pointer hover:text-white"
          >
            Go to app
            <BiLinkExternal size={14} className="ml-2" />
          </Link>
          <div className="flex items-center pl-4 space-x-5 border-l border-neutral-700">
            <a
              href="https://github.com/pheralb/docskit"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IoLogoGithub size={22} />
            </a>
            <a
              href="https://github.com/pheralb/docskit"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IoLogoTwitter size={22} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
