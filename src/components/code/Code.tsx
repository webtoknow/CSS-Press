import "./Code.scss";
import { maxCodeLineNumbers } from "../../const/chapters";
import { type ChangeEvent, type JSX, type KeyboardEvent } from "react";
import { getCodeLineNumbers } from "../../utils/helpers";

interface CodeProps {
  beforeCode: string;
  afterCode: string;
  linesOfCode: number;
  startHighlightCode: number;
  answer: string;
  onAnswerChange: (answer: string) => void;
  onCheck: () => void;
  isWrongAnswer: boolean;
  isCodeShaking: boolean;
  isNextButtonPulsing: boolean;
  isSelectorHighlighted: boolean;
  onEditorHoverChange: (isHovered: boolean) => void;
  isLastLevel: boolean;
}

function Code({
  beforeCode,
  afterCode,
  linesOfCode,
  startHighlightCode,
  answer,
  onAnswerChange,
  onCheck,
  isWrongAnswer,
  isCodeShaking,
  isNextButtonPulsing,
  isSelectorHighlighted,
  onEditorHoverChange,
  isLastLevel,
}: CodeProps) {
  const codeLineNumbers: JSX.Element[] = getCodeLineNumbers(
    startHighlightCode,
    linesOfCode,
    maxCodeLineNumbers
  );

  const calculatedCodeHeight = linesOfCode * 24;

  const handleChangeAnswer = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onAnswerChange(event.target.value);
  };

  const handleKeyDownCheckAnswer = (
    event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.key !== "Enter") {
      return;
    }

    const noLinesInTextarea = answer
      .split(/\r|\r\n|\n/)
      .filter((line) => line !== "").length;

    if (noLinesInTextarea >= linesOfCode) {
      onCheck();
      event.preventDefault();
    }
  };

  return (
    <section
      className={
        isCodeShaking
          ? "code animate__animated animate__shakeX animate__faster"
          : "code"
      }
    >
      <ul className="code__numbers">{codeLineNumbers}</ul>
      <article
        className="code__focus"
        onMouseEnter={() => onEditorHoverChange(true)}
        onMouseLeave={() => onEditorHoverChange(false)}
      >
        <p
          className={
            isSelectorHighlighted
              ? "code__before code__before--highlight"
              : "code__before"
          }
          dangerouslySetInnerHTML={{ __html: beforeCode }}
        ></p>
        {linesOfCode === 1 ? (
          <input
            id="code"
            className={
              isWrongAnswer ? "code__input code__input--error" : "code__input"
            }
            type="text"
            style={{ height: calculatedCodeHeight + "px" }}
            value={answer}
            onChange={handleChangeAnswer}
            onKeyDown={handleKeyDownCheckAnswer}
          ></input>
        ) : (
          <textarea
            id="code"
            className={
              isWrongAnswer
                ? "code__textarea code__textarea--error"
                : "code__textarea"
            }
            style={{ height: calculatedCodeHeight + "px" }}
            value={answer}
            rows={linesOfCode}
            onChange={handleChangeAnswer}
            onKeyDown={handleKeyDownCheckAnswer}
          ></textarea>
        )}
        <p
          className={
            isSelectorHighlighted
              ? "code__after code__after--highlight"
              : "code__after"
          }
          dangerouslySetInnerHTML={{ __html: afterCode }}
        ></p>
      </article>
      <button
        id="next"
        type="button"
        className={
          isNextButtonPulsing
            ? "code__button button animate__animated animate__pulse animate__infinite"
            : "code__button button"
        }
        onClick={onCheck}
      >
        {isLastLevel ? "Finish" : "Next Level"}
      </button>
    </section>
  );
}

export default Code;
