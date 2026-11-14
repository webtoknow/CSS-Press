import { useRef, type JSX, type MouseEvent } from "react";
import Style from "../../utils/styleIt";
import parse, {
  DOMNode,
  HTMLReactParserOptions,
  Element,
  attributesToProps,
} from "html-react-parser";
import { updateImage } from "../../utils/helpers";

type Props = {
  articleContent: string;
  tipInfo: string;
  tipSelector: string;
  isPressmenToolsOpen: boolean;
  onMisprintHoverChange: (isHovered: boolean) => void;
};

const createParserOptions = (tipInfo: string, tipSelector: string) =>
({
  replace: (domNode: DOMNode) => {

    if (domNode instanceof Element && domNode.name === 'img') {
      // For ripped effect, if the tag is an image, we should wrap it in a div with ripped-effect class
      if (domNode.attribs.class === 'misprint') {
        const rippedContent = (
          <div className="ripped-effect">
            {updateImage(domNode)}
          </div>
        );
        return rippedContent;
      }
      return updateImage(domNode);
    }

    if (domNode instanceof Element && domNode.name === tipSelector && tipInfo && domNode.attribs.class !== 'misprint' && domNode.attribs.class !== 'misprint ripped-effect' && domNode.attribs.class !== 'ripped-effect') {
      const CustomTag = `${tipSelector}` as keyof JSX.IntrinsicElements;
      const props = attributesToProps(domNode.attribs);

      // Tags with text inside
      if (domNode.firstChild && domNode.children[0].type === "text" && domNode.children.length === 1) {
        const content = (
          <CustomTag className="article__reference" {...props}>
            {domNode.children[0].data}
          </CustomTag>
        );
        return content
      }
      return (<CustomTag className="article__reference" {...props}></CustomTag>)
    }

    // For ripped effect, if the tag is not an image, we should add ripped-effect class on it
    if (domNode instanceof Element && domNode.name !== 'img' && domNode.attribs.class === 'misprint'
      && domNode.firstChild && domNode.children[0].type === "text" && domNode.children.length === 1) {
      const props = attributesToProps(domNode.attribs);
      const classes = domNode.attribs.class + ' ripped-effect';
      const Tag = `${domNode.name}` as keyof JSX.IntrinsicElements;
      return (<Tag {...props} className={classes}>{domNode.children[0].data}</Tag>)
    }
  },
} as HTMLReactParserOptions);

function createArticleContent(
  articleContent: string,
  tipInfo: string,
  tipSelector: string
) {
  return parse(articleContent, createParserOptions(tipInfo, tipSelector));
}

export const ArticleContent = ({ articleContent, tipInfo, tipSelector, isPressmenToolsOpen, onMisprintHoverChange }: Props) => {

  const parentRef = useRef<HTMLInputElement>(null);
  const content = createArticleContent(articleContent, tipInfo, tipSelector);

  const handleMisprintMouseOver = (event: MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest(".misprint")) {
      onMisprintHoverChange(true);
    }
  };

  const handleMisprintMouseOut = (event: MouseEvent<HTMLElement>) => {
    const misprint = (event.target as HTMLElement).closest(".misprint");
    const relatedTarget = event.relatedTarget as Node | null;

    if (misprint && !(relatedTarget && misprint.contains(relatedTarget))) {
      onMisprintHoverChange(false);
    }
  };

  return (
    <section
      ref={parentRef}
      className="article__body"
      onMouseOver={handleMisprintMouseOver}
      onMouseOut={handleMisprintMouseOut}
    >
      {isPressmenToolsOpen && <Style>{'.article__reference { background: #ffca9b }'}</Style>}
      {content}
    </section>
  );
};
