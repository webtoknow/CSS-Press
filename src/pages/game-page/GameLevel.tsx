import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMachine } from "@xstate/react";
import { createPortal } from "react-dom";

import Instructions from "../../components/instructions/Instructions";
import Code from "../../components/code/Code";
import Article from "../../components/article/Article";
import Modal from "../../components/modal/Modal";
import { gameMachine, GameStates } from "../../machines/gameMachine";
import { TutorialMachineContext } from "../../machines/TutorialMachineContext";
import { TutorialMachineStates } from "../../machines/tutorialMachine";
import { localStorageNames } from "../../utils/constants";
import { getStorageValue } from "../../hooks/useLocalStorage";
import type { ILevel } from "../../models/Game";

interface GameLevelProps {
  level: ILevel;
  chapterName: string;
  chapterNumber: number;
  levelNumber: number;
  nextChapterNumber: number | null;
  nextLevelNumber: number | null;
}

function GameLevel({
  level,
  chapterName,
  chapterNumber,
  levelNumber,
  nextChapterNumber,
  nextLevelNumber,
}: GameLevelProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const { send: sendTutorial } = TutorialMachineContext.useActorRef();
  const tutorialState = TutorialMachineContext.useSelector((state) => state);
  const isTutorialComplete =
    tutorialState.matches(TutorialMachineStates.finished) ||
    tutorialState.matches(TutorialMachineStates.complete);

  const answerKey = localStorageNames.getLevelAnswer(chapterNumber, levelNumber);
  const solvedKey = localStorageNames.getIsLevelSolved(chapterNumber, levelNumber);
  const [initialAnswer] = useState(() => getStorageValue(answerKey, ""));

  const [snapshot, send] = useMachine(gameMachine, {
    input: {
      answer: initialAnswer,
      solutions: level.solutions,
      hasNextLevel: nextChapterNumber !== null && nextLevelNumber !== null,
      canCheck: isTutorialComplete,
    },
  });

  const [hoveredSelector, setHoveredSelector] = useState("");
  const [isArticleMisprintHovered, setIsArticleMisprintHovered] = useState(false);

  const isArticleSliding = snapshot.matches(GameStates.advancing);
  const isLevelResolved =
    snapshot.matches(GameStates.resolved) ||
    snapshot.matches(GameStates.advancing) ||
    snapshot.matches(GameStates.completed);

  useEffect(() => {
    send({ type: "TUTORIAL_STATUS_CHANGED", canCheck: isTutorialComplete });
  }, [isTutorialComplete, send]);

  useEffect(() => {
    localStorage.setItem(answerKey, JSON.stringify(snapshot.context.answer));
  }, [answerKey, snapshot.context.answer]);

  useEffect(() => {
    localStorage.setItem(solvedKey, JSON.stringify(isLevelResolved));
  }, [solvedKey, isLevelResolved]);

  useEffect(() => {
    if (
      snapshot.matches(GameStates.resolved) &&
      chapterNumber === 1 &&
      levelNumber === 1 &&
      tutorialState.matches(TutorialMachineStates.write)
    ) {
      sendTutorial({ type: "NEXT" });
    }
  }, [snapshot, chapterNumber, levelNumber, tutorialState, sendTutorial]);

  useEffect(() => {
    if (
      snapshot.context.isPressmenToolsOpen &&
      tutorialState.matches(TutorialMachineStates.correct)
    ) {
      sendTutorial({ type: "NEXT" });
    }
  }, [snapshot.context.isPressmenToolsOpen, tutorialState, sendTutorial]);

  useEffect(() => {
    if (isArticleSliding && location.pathname === "/chapter/1/level/2") {
      sendTutorial({ type: "NEXT" });
    }
  }, [isArticleSliding, location.pathname, sendTutorial]);

  useEffect(() => {
    if (!isArticleSliding || nextChapterNumber === null || nextLevelNumber === null) {
      return;
    }

    const timer = window.setTimeout(() => {
      navigate(`/chapter/${nextChapterNumber}/level/${nextLevelNumber}`);
    }, 800);

    return () => window.clearTimeout(timer);
  }, [isArticleSliding, nextChapterNumber, nextLevelNumber, navigate]);

  const handleAnswerChange = (answer: string) => {
    send({ type: "ANSWER_CHANGED", answer });
  };

  const handleCheck = () => {
    send({ type: "CHECK" });
  };

  const handleTogglePressmenTools = (isOpen: boolean) => {
    send({ type: "TOGGLE_PRESSMEN_TOOLS", open: isOpen });
  };

  const handleEditorHoverChange = (isHovered: boolean) => {
    setHoveredSelector(isHovered ? "misprint" : "");
  };

  return (
    <>
      <Instructions
        chapterName={chapterName}
        levelName={level.levelName}
        instructionsContent={level.instructions}
      />
      <Code
        beforeCode={level.beforeCode}
        afterCode={level.afterCode}
        linesOfCode={level.linesOfCode}
        startHighlightCode={level.startHighlightCode}
        answer={snapshot.context.answer}
        onAnswerChange={handleAnswerChange}
        onCheck={handleCheck}
        isWrongAnswer={snapshot.matches(GameStates.incorrect)}
        isCodeShaking={snapshot.matches(GameStates.incorrect)}
        isNextButtonPulsing={
          snapshot.matches(GameStates.resolved) ||
          snapshot.matches(GameStates.advancing)
        }
        isSelectorHighlighted={isArticleMisprintHovered}
        onEditorHoverChange={handleEditorHoverChange}
        isLastLevel={nextChapterNumber === null || nextLevelNumber === null}
      />
      <Article
        articleContent={level.articleContent}
        answerStyle={snapshot.context.answer}
        errorStyle={level.error}
        hoveredSelector={hoveredSelector}
        isArticleSliding={isArticleSliding}
        isLevelResolved={isLevelResolved}
        tipInfo={level.tipInfo}
        tipSelector={level.tipSelector}
        extraStyle={level.extraStyle}
        isPressmenToolsOpen={snapshot.context.isPressmenToolsOpen}
        onTogglePressmenTools={handleTogglePressmenTools}
        onMisprintHoverChange={setIsArticleMisprintHovered}
      />

      {createPortal(
        <Modal
          open={snapshot.matches(GameStates.completed)}
          className="modal"
        >
          <h2 className="modal__title">Wanderer,</h2>
          <p>
            Congratulations!
            <br />
            You've completed the CSS Press game with skill and determination.
            You've conquered all the challenges and emerged as a true CSS
            master. Well done!
          </p>
          <p>
            Feel free to replay the game to sharpen your skills even further.
            Keep up the fantastic work!
          </p>
          <footer className="modal__footer">
            <button className="button" onClick={() => navigate("/")}>
              Go to Dashboard
            </button>
          </footer>
        </Modal>,
        document.body as HTMLBodyElement
      )}
    </>
  );
}

export default GameLevel;
