import { useRef, useState } from "react";
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
};
// eslint-disable-next-line
const options = (tipInfo: string, tipSelector: string, handleMouseOver: (e: any) => void) =>
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
          <CustomTag className="article__reference" {...props} onMouseOver={handleMouseOver}>
            {domNode.children[0].data}
          </CustomTag>
        );
        return content
      }
      return (<CustomTag className="article__reference" {...props} onMouseOver={handleMouseOver}></CustomTag>)
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
  tipSelector: string,
  // eslint-disable-next-line
  handleMouseOver: (e: any) => void,
) {
  return parse(articleContent, options(tipInfo, tipSelector, handleMouseOver));
}

export const ArticleContent = ({ articleContent, tipInfo, tipSelector }: Props) => {

  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const parentRef = useRef<HTMLInputElement>(null);
  // eslint-disable-next-line
  const handleMouseOver = (e: any) => {
    const parentRect = parentRef?.current?.getBoundingClientRect();
    const node = e?.target as HTMLElement;
    const childRect = node.getBoundingClientRect();

    const topTooltip = Math.round(childRect.top - (parentRect?.top || 0)) + childRect.height + 5;
    const leftTooltip = Math.round(childRect.left - (parentRect?.left || 0));

    setTop(topTooltip);
    setLeft(leftTooltip);
  };

  const content = createArticleContent(articleContent, tipInfo, tipSelector, handleMouseOver);
  return (
    <section ref={parentRef} className="article__body">
      <Style>
        {`.article__tooltip {top: ${top}px; left: ${left}px;} `}
      </Style>
      {content}
      <details className="article__tooltip">
        <summary dangerouslySetInnerHTML={{__html: tipInfo}}></summary>
      </details>
    </section>
  );
};
