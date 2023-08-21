import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";
import "../../styles/themes/base.css";
import "../../styles/themes/prism-night-owl.css";
import "../../styles/template/plugin-line-numbers.css";

function textContentAsID(textContent: string) {
  return textContent.replace(/ /g, "-").toLocaleLowerCase();
}
export default async function Markdown({ children, githubRepoUrl }) {
  if (typeof children !== "string")
    throw new Error("Markdown component must have a string as children");
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      //https://github.com/PrismJS/prism-themes
      rehypePlugins={[[rehypePrism, { showLineNumbers: true }]]}
      components={{
        img: ({ src, ...props }) => {
          const imageSource =
            src?.startsWith("http") || src?.startsWith("https")
              ? src
              : src?.startsWith("/")
              ? githubRepoUrl + src
              : `${githubRepoUrl}/blob/main/${src}?raw=true`;
          console.log(imageSource);
          return (
            <a href={imageSource} target="_blank">
              <img
                {...(props as any)}
                src={imageSource}
                width={800}
                height={400}
                className="relative w-full transition-transform rounded-md cursor-pointer hover:scale-105 hover:transition-transform"
              />
            </a>
          );
        },
        h1: (props: any) => {
          const childrenAsText = textContentAsID(String(props.children));
          return (
            <a href={"#" + childrenAsText} className="no-underline">
              <h1 {...props} id={childrenAsText} />
            </a>
          );
        },
        h2: (props: any) => {
          const childrenAsText = textContentAsID(String(props.children));
          return (
            <a href={"#" + childrenAsText} className="no-underline">
              <h2 {...props} id={childrenAsText} />
            </a>
          );
        },
        h3: (props: any) => {
          const childrenAsText = textContentAsID(String(props.children));
          return (
            <a href={"#" + childrenAsText} className="no-underline">
              <h3 {...props} id={childrenAsText} />
            </a>
          );
        },
        h4: (props: any) => {
          const childrenAsText = textContentAsID(String(props.children));
          return (
            <a href={"#" + childrenAsText} className="no-underline">
              <h4 {...props} id={childrenAsText} />
            </a>
          );
        },
        h5: (props: any) => {
          const childrenAsText = textContentAsID(String(props.children));
          return (
            <a href={"#" + childrenAsText} className="no-underline">
              <h5 {...props} id={childrenAsText} />
            </a>
          );
        },
        h6: (props: any) => {
          const childrenAsText = textContentAsID(String(props.children));
          return (
            <a href={"#" + childrenAsText} className="no-underline">
              <h6 {...props} id={childrenAsText} />
            </a>
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
