import Logo from "@/components/icons/logo";
import { MaybeSession, TypedSupabaseClient } from "@/types/supabase";
import Button from "@/ui/button";
import { Link } from "@remix-run/react";
import { IoLogoGithub, IoLogoTwitter } from "react-icons/io5";

const Header = ({
  supabase,
  session,
}: {
  supabase: TypedSupabaseClient;
  session: MaybeSession;
}) => {
  // Sign in with Github =>
  const handleGitHubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });

    if (error) {
      console.log({ error });
    }
  };

  return (
    <div className="sticky top-0 w-full pt-3 pl-4 pr-6">
      <div className="flex items-center justify-between">
        <Link to="/">
          <div className="flex items-center space-x-3 text-gray-300 transition-colors duration-150 cursor-pointer hover:text-white">
            <Logo className="w-8 border rounded-full border-neutral-700" />
            <p className="font-medium">
              {session ? (
                <Button onClick={() => supabase.auth.signOut()}>
                  Sign out
                </Button>
              ) : (
                <p>docskit</p>
              )}
            </p>
          </div>
        </Link>
        <div className="flex items-center">
          <div className="pr-4 ">
            {session ? (
              <Button onClick={() => supabase.auth.signOut()}>Sign out</Button>
            ) : (
              <Button onClick={handleGitHubLogin}>Sign in</Button>
            )}
          </div>
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
