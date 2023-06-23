import React, { useEffect, useMemo, useRef, useState } from "react";
import { Navigate, useLocation, useParams, useNavigate } from "react-router-dom";

import Instructions from "../../components/instructions/Instructions";
import Code from "../../components/code/Code";
import Article from "../../components/article/Article";

import "./GamePage.scss";
import { getGameInfo } from "../../utils/helpers";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import Modal from "../../components/modal/Modal";
import { createPortal } from "react-dom";
import { localStorageNames, tutorialStates } from "../../utils/constants";
import GameTutorial from "../../components/tutorial/game-tutorial/GameTutorial";


function GamePage() {

  const location = useLocation();
  const navigate = useNavigate();
  const storedPathname = useRef(location.pathname);

  const { chapterId, levelId } = useParams();

  const { currentChapter, currentLevel, nextChapterId, nextLevelId } = useMemo(
    () => getGameInfo(chapterId, levelId),
    [chapterId, levelId]
  );

  const [answer, setAnswer] = useLocalStorage<string>(`answer-${chapterId}-${levelId}`, "");

  const [selector, setSelector] = useState("");
  const [isArticleSliding, setIsArticleSliding] = useState(false);
  // To fix useLocalStorage not getting the value from localStorage on not first render
  const initialTutorialState = JSON.parse(localStorage.getItem(localStorageNames.tutorialState) || '""');
  const [tutorialState, setTutorialState] = useLocalStorage<string>(localStorageNames.tutorialState, initialTutorialState);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    console.log(location,tutorialState,  isModalOpen);
    if (!tutorialState && !isModalOpen) {
      if (location.pathname === '/chapter/1/level/1') {
        setIsModalOpen(true);
      } else {
        navigate('/chapter/1/level/1');
      }
    }
    
   }, [location, tutorialState]);


  const startTutorial = () => {
    setIsModalOpen(false);
    setTutorialState(tutorialStates.running);
  }

  const closeTutorialModal = () => {
    setIsModalOpen(false);
    navigate(storedPathname.current);
    setTutorialState(tutorialStates.finished);
  }
  
  if (currentChapter === null || currentLevel === null) {
    return <Navigate replace to="/not-found" />;
  }

  const { chapterName } = currentChapter;
  const {
    levelName,
    instructions,
    beforeCode,
    afterCode,
    linesOfCode,
    startHighlightCode,
    articleContent,
    error,
    solutions,
    tipInfo,
    tipSelector
  } = currentLevel;


  return (
    <main className="game">
      <Instructions
        chapterName={chapterName}
        levelName={levelName}
        instructionsContent={instructions}
      />
      <Code
        beforeCode={beforeCode}
        afterCode={afterCode}
        linesOfCode={linesOfCode}
        startHighlightCode={startHighlightCode}
        answer={answer}
        setAnswer={setAnswer}
        setSelector={setSelector}
        solutions={solutions}
        chapterId={chapterId || null}
        levelId={levelId || null}
        nextChapterId={nextChapterId}
        nextLevelId={nextLevelId}
        setIsArticleSliding={setIsArticleSliding}
        isArticleSliding={isArticleSliding}
      />
      <Article
        articleContent={articleContent}
        answer={answer}
        error={error}
        selector={selector}
        isArticleSliding={isArticleSliding}
        tipInfo={tipInfo}
        tipSelector={tipSelector}
      />
      {createPortal(
        <Modal open={isModalOpen}>
          <h2>Hi, Wanderer</h2>
          <p>
            Welcome to CSS Press, where you will learn the basics of CSS while having fun along the way. Whould you like to play through the <strong>basics</strong> of the game?
          </p>
          <button onClick={startTutorial}>Play through</button>
          <button onClick={closeTutorialModal}>Skip</button>
      </Modal>, document.body as HTMLBodyElement)}
      { tutorialState === tutorialStates.running && createPortal(<GameTutorial setTutorialState={setTutorialState}/>, document.body as HTMLBodyElement)}
    </main>
  );
}

export default GamePage;
