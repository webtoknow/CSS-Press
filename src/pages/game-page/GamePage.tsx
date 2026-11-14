import { useEffect, useMemo, useRef, useState } from "react";
import { Navigate, useLocation, useParams, useNavigate } from "react-router-dom";

import "./GamePage.scss";
import { getGameInfo } from "../../utils/helpers";
import Modal from "../../components/modal/Modal";
import { createPortal } from "react-dom";
import GameTutorial from "../../components/tutorial/game-tutorial/GameTutorial";
import CssPressNews from "../../components/tutorial/css-press-news/CssPressNews";
import { TutorialMachineStates } from "../../machines/tutorialMachine";
import { localStorageNames } from "../../utils/constants";
import { chapters } from "../../const/chapters";
import { TutorialMachineContext } from "../../machines/TutorialMachineContext";
import GameLevel from "./GameLevel";

function GamePage() {
  const { send } = TutorialMachineContext.useActorRef();
  const currentTutorialState = TutorialMachineContext.useSelector((state) => state);

  const location = useLocation();
  const navigate = useNavigate();
  const storedPathname = useRef(location.pathname);

  const { chapterNumberParam, levelNumberParam } = useParams();

  const { currentChapter, currentLevel, chapterNumber, levelNumber, nextChapterNumber, nextLevelNumber } = useMemo(
    () => getGameInfo(chapterNumberParam, levelNumberParam, chapters),
    [chapterNumberParam, levelNumberParam]
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Save tutorial state to local storage
  useEffect(() => {
    localStorage.setItem(localStorageNames.tutorialState, JSON.stringify(currentTutorialState));
  }, [currentTutorialState]);

  useEffect(() => {
    if (currentTutorialState.matches(TutorialMachineStates.starting) && !isModalOpen) {
      if (location.pathname === '/chapter/1/level/1') {
        showTutorialModal();
      } else {
        navigate('/chapter/1/level/1');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, currentTutorialState, isModalOpen]);

  const showTutorialModal = () => {
    window.setTimeout(() => {
      setIsModalOpen(true);
    }, 3100);
  }

  const startTutorial = () => {
    setIsModalOpen(false);
    send({ type: 'NEXT' });
  }

  const closeTutorialModal = () => {
    setIsModalOpen(false);
    navigate(storedPathname.current);
    send({ type: 'FINISHED' });
  }

  if (
    currentChapter === null ||
    currentLevel === null ||
    chapterNumber === null ||
    levelNumber === null
  ) {
    return <Navigate replace to="/not-found" />;
  }

  const { chapterName } = currentChapter;

  return (
    <section className="game">
      <GameLevel
        key={`${chapterNumber}-${levelNumber}`}
        level={currentLevel}
        chapterName={chapterName}
        chapterNumber={chapterNumber}
        levelNumber={levelNumber}
        nextChapterNumber={nextChapterNumber}
        nextLevelNumber={nextLevelNumber}
      />

      {/* Tutorial */}
      {currentTutorialState.matches(TutorialMachineStates.starting) && <CssPressNews isModalOpen={isModalOpen} />}
      {createPortal(
        <Modal open={isModalOpen} className="modal modal--tutorial">
          <h2 className="modal__title">Hi, Wanderer</h2>
          <p>
            Welcome to CSS Press, where you will learn the basics of CSS while having fun along the way. Whould you like to play through the <strong>basics</strong> of the game?
          </p>
          <footer className="modal__footer">
            <button className="button mr-20" type="button" onClick={startTutorial}>Play through</button>
            <button className="button button--secondary" type="button" id="skip-tutorial" onClick={closeTutorialModal}>Skip</button>
          </footer>
        </Modal>, document.body as HTMLBodyElement)}
      {!currentTutorialState.matches(TutorialMachineStates.finished) && createPortal(
        <GameTutorial />, document.body as HTMLBodyElement)}
    </section>
  );
}

export default GamePage;
