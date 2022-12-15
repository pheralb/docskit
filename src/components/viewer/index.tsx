import ReactMarkdown from "react-markdown";

// Plugins =>
import remarkGfm from "remark-gfm";

interface ViewerProps {
  children: string | undefined;
}

const Viewer = (props: ViewerProps) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      className="mx-auto prose prose-invert"
    >
      {props.children || ""}
    </ReactMarkdown>
  );
};

export default Viewer;
