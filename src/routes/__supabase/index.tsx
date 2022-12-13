import Down from "@/components/animations/down";
import Up from "@/components/animations/up";
import Feature from "@/components/feature";
import Footer from "@/layout/footer";
import {
  IoHeartOutline,
  IoLogoMarkdown,
  IoShareOutline,
} from "react-icons/io5";
import { RoughNotation } from "react-rough-notation";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="pt-32 mx-auto text-center">
        <Up>
          <div className="flex items-center justify-center mb-8 space-x-3 text-5xl font-bold">
            <h1>✍️ Write</h1>
            <RoughNotation
              type="underline"
              show={true}
              brackets="top"
              animationDelay={399}
            >
              beautiful
            </RoughNotation>
            <h1>docs</h1>
          </div>
        </Up>
        <Down delay={0.7}>
          <div className="flex items-center justify-center w-full max-w-3xl mx-auto space-x-4 mb-7">
            <Feature
              icon={<IoLogoMarkdown size={40} />}
              title="using Markdown"
            />
            <Feature icon={<IoShareOutline size={40} />} title="Share" />
            <Feature icon={<IoHeartOutline size={40} />} title="Save" />
          </div>
        </Down>
        <Down delay={1}>
          <Link to="/write">Start writing</Link>
        </Down>
      </div>
      <Footer />
    </>
  );
};

export default Home;
