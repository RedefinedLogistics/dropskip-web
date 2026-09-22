import { Fragment } from "react";

/**
 * Renders the inline nodes the Markdown parser produces. Links that leave the
 * site open in a new tab and carry rel="noreferrer", so a post can cite a
 * source without handing it the referrer.
 */
export default function RichText({ nodes }) {
  return nodes.map((node, index) => {
    switch (node.type) {
      case "strong":
        return <strong key={index}>{node.text}</strong>;
      case "em":
        return <em key={index}>{node.text}</em>;
      case "code":
        return <code key={index}>{node.text}</code>;
      case "link": {
        const external = /^https?:\/\//.test(node.href);
        return (
          <a
            key={index}
            href={node.href}
            {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
          >
            {node.text}
          </a>
        );
      }
      default:
        return <Fragment key={index}>{node.text}</Fragment>;
    }
  });
}
