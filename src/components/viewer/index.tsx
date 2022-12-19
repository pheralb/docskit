import ReactMarkdown from "react-markdown";
import rehypePrism from "rehype-prism";

// Plugins =>
import remarkGfm from "remark-gfm";

interface ViewerProps {
  children: string | undefined;
}

const Viewer = (props: ViewerProps) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypePrism]}
      className="prose prose-invert max-w-none"
    >
      {props.children || ""}
    </ReactMarkdown>
  );
};

export default Viewer;
