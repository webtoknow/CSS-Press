

import "./Article.scss";
import Style from "../../utils/styleIt";
import { ArticleContent } from "../article-content/ArticleContent";
import { useEffect, useState, type ChangeEvent } from "react";
import Toggle from "../toggle/Toggle";
import { PressmenTools } from "../pressmentools/PressmenTools";
import { TutorialMachineContext } from "../../machines/TutorialMachineContext";
import { TutorialMachineStates } from "../../machines/tutorialMachine";

interface ArticleProps {
  articleContent: string;
  answer: string;
  error: string;
  selector: string;
  isArticleSliding: boolean;
  isLevelResolved: boolean;
  tipInfo: string;
  tipSelector: string;
  extraStyle?: string;
}


const Article = function Article(props: ArticleProps) {
  const {
    articleContent,
    answer,
    error,
    selector,
    isArticleSliding,
    isLevelResolved,
    tipInfo,
    tipSelector,
    extraStyle
  } = props;

  const highlighted = selector === "misprint" ? "box-shadow: 0 0 5px 2px #ffca9b;" : "";
  const highlightedBefore = selector === "misprint" ? "background-color: #ffca9b;" : "";
  const style = `.article__body .misprint { ${error} ${answer}} .article__body .ripped-effect {${highlighted}} .article__body .ripped-effect:before {${highlightedBefore}}`
  const additionalStyle = `.article__body ${extraStyle}`
  const unrippedStyle = `.article__body .ripped-effect { position: static; background: none; box-shadow: none; padding: 0; } .article__body .ripped-effect:after { content: none; } .ripped-effect:before { content: none; }`;

  const [isPressmentoolsOpen, setIsPressmentoolsOpen] = useState(false);

  const { send } = TutorialMachineContext.useActorRef();
  const currentTutorialState = TutorialMachineContext.useSelector((state) => state);

  useEffect(() => {
    setIsPressmentoolsOpen(false);
  },[articleContent])

  useEffect(() => {
    if (isPressmentoolsOpen && currentTutorialState.matches(TutorialMachineStates.correct)) {
      send({ type: 'NEXT' });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isPressmentoolsOpen])
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
              checked={isPressmentoolsOpen}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setIsPressmentoolsOpen(e.target.checked)} />
          </label>
        </div>
        <ArticleContent articleContent={articleContent} tipInfo={tipInfo} tipSelector={tipSelector} isPressmentoolsOpen={isPressmentoolsOpen} />
        {isPressmentoolsOpen && <PressmenTools tipInfo={tipInfo} tipSelector={tipSelector} />}
        {!isPressmentoolsOpen && <div className="dummy">
          <div className="dummy__content"></div>
          <div className="dummy__img"></div>
        </div>}
      </section>
    </>
  );
};

export default Article;
