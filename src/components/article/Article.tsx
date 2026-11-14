

import "./Article.scss";
import Style from "../../utils/styleIt";
import { ArticleContent } from "../article-content/ArticleContent";
import { useEffect, useState, type ChangeEvent } from "react";
import Toggle from "../toggle/Toggle";
import { PressmenTools } from "../pressmen-tools/PressmenTools";
import { TutorialMachineContext } from "../../machines/TutorialMachineContext";
import { TutorialMachineStates } from "../../machines/tutorialMachine";

interface ArticleProps {
  articleContent: string;
  answerStyle: string;
  errorStyle: string;
  hoveredSelector: string;
  isArticleSliding: boolean;
  isLevelResolved: boolean;
  tipInfo: string;
  tipSelector: string;
  extraStyle?: string;
  onMisprintHoverChange: (isHovered: boolean) => void;
}


const Article = function Article(props: ArticleProps) {
  const {
    articleContent,
    answerStyle,
    errorStyle,
    hoveredSelector,
    isArticleSliding,
    isLevelResolved,
    tipInfo,
    tipSelector,
    extraStyle,
    onMisprintHoverChange
  } = props;

  const highlighted = hoveredSelector === "misprint" ? "box-shadow: 0 0 5px 2px #f78d2e; border-color: #f78d2e;" : "";
  const highlightedBefore = hoveredSelector === "misprint" ? "background-color: #f78d2e;" : "";
  const style = `.article__body .misprint { ${errorStyle} ${answerStyle}} .article__body .ripped-effect {${highlighted}} .article__body .ripped-effect:before {${highlightedBefore}}`
  const additionalStyle = `.article__body ${extraStyle}`
  const unrippedStyle = `.article__body .ripped-effect { position: static; background: none; box-shadow: none; padding: 0; } .article__body .ripped-effect:after { content: none; } .ripped-effect:before { content: none; }`;

  const [isPressmenToolsOpen, setIsPressmenToolsOpen] = useState(false);

  const { send } = TutorialMachineContext.useActorRef();
  const currentTutorialState = TutorialMachineContext.useSelector((state) => state);

  useEffect(() => {
    setIsPressmenToolsOpen(false);
  },[articleContent])

  useEffect(() => {
    if (isPressmenToolsOpen && currentTutorialState.matches(TutorialMachineStates.correct)) {
      send({ type: 'NEXT' });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isPressmenToolsOpen])
  return (
    <>
      <Style>{style}</Style>
      <Style>{extraStyle && additionalStyle}</Style>
      <Style>{isLevelResolved && unrippedStyle}</Style>
      <section
        className={
          isArticleSliding
            ? "article animate__animated animate__fadeOut animate__fast"
            : "article"
        }
      >
        <div className="dummy">
          <div className="dummy__content dummy__content--rotated"></div>
          <div className="dummy__img"></div>
          <label className="article__toggle">
            <Toggle
              checked={isPressmenToolsOpen}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setIsPressmenToolsOpen(e.target.checked)} />
          </label>
        </div>
        <ArticleContent
          articleContent={articleContent}
          tipInfo={tipInfo}
          tipSelector={tipSelector}
          isPressmenToolsOpen={isPressmenToolsOpen}
          onMisprintHoverChange={onMisprintHoverChange}
        />
        {isPressmenToolsOpen && <PressmenTools tipInfo={tipInfo} tipSelector={tipSelector} />}
        {!isPressmenToolsOpen && <div className="dummy">
          <div className="dummy__content"></div>
          <div className="dummy__img"></div>
        </div>}
      </section>
    </>
  );
};

export default Article;
