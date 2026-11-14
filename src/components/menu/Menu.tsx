import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMachine } from "@xstate/react";
import "./Menu.scss";
import iconSquare from "./4-square.svg";
import openBook from "./open-book.svg";
import reset from "./reset.svg";
import iconX from "./x.svg";

import { chapters } from "../../const/chapters";
import { getStorageValue } from "../../hooks/useLocalStorage";
import { TutorialMachineStates } from './../../machines/tutorialMachine';
import { localStorageNames } from "../../utils/constants";
import { getChapterProgress } from "../../utils/helpers";
import { TutorialMachineContext } from "../../machines/TutorialMachineContext";
import { MenuStates, menuMachine } from "../../machines/menuMachine";

export default function Menu() {
  const { send: sendTutorial } = TutorialMachineContext.useActorRef();
  const currentTutorialState = TutorialMachineContext.useSelector((state) => state);
  const { chapterNumberParam, levelNumberParam } = useParams();
  const navigate = useNavigate();

  const isTutorialFinished = currentTutorialState.matches(TutorialMachineStates.finished);
  const [snapshot, send] = useMachine(menuMachine, {
    input: { isTutorialFinished },
  });

  useEffect(() => {
    send({ type: 'TUTORIAL_STATUS_CHANGED', isTutorialFinished });
  }, [isTutorialFinished, send]);

  useEffect(() => {
    if (
      currentTutorialState.matches(TutorialMachineStates.menu) &&
      snapshot.matches(MenuStates.open)
    ) {
      sendTutorial({ type: 'NEXT' });
    }
  }, [currentTutorialState, snapshot, sendTutorial]);

  useEffect(() => {
    const intent = snapshot.context.intent;

    if (!intent) {
      return;
    }

    if (intent.type === 'selectLevel') {
      navigate(
        `/chapter/${intent.chapterNumber}/level/${intent.levelNumber}`,
        { replace: true }
      );
    } else if (intent.type === 'playWalkthrough') {
      navigate(`/chapter/1/level/1`);
      sendTutorial({ type: 'PLAY' });
    } else {
      navigate(`/`);
      sendTutorial({ type: 'RESET' });
      localStorage.clear();
    }

    send({ type: 'INTENT_HANDLED' });
  }, [snapshot.context.intent, navigate, sendTutorial, send]);

  const chapterItems = chapters.map((chapter, chapterIndex) => (
    <li key={chapterIndex + chapter.chapterName} className="menu__chapter">
      {chapter.chapterName} | {getChapterProgress(chapter, chapterIndex)}%
      <ul>
        {chapter.levels.map((level, levelIndex) => (
          <li
            key={chapterIndex + levelIndex}
            className="menu__level"
            onClick={() =>
              send({
                type: 'SELECT_LEVEL',
                chapterNumber: chapterIndex + 1,
                levelNumber: levelIndex + 1,
              })
            }
          >
            <span
              className={`menu__number ${getStorageValue(localStorageNames.getIsLevelSolved(chapterIndex + 1, levelIndex + 1), "") === "true" &&
                "menu__number--light"
                }
              ${chapterNumberParam === (chapterIndex + 1).toString() &&
                levelNumberParam === (levelIndex + 1).toString() &&
                "menu__number--orange"
                } 
              `}
            >
              {levelIndex + 1}
            </span>
            {level.levelName}
          </li>
        ))}
      </ul>
    </li>
  ));

  return (
    <nav className="menu">
      <button className="menu__open" onClick={() => send({ type: 'OPEN' })} type="button">
        <img src={iconSquare} alt="Open menu" />
      </button>
      <section
        className={
          snapshot.matches(MenuStates.open)
            ? "menu__list menu__list--open"
            : "menu__list"
        }
      >
        <button className="menu__close" onClick={() => send({ type: 'CLOSE' })} type="button">
          <img src={iconX} alt="Close menu" />
        </button>
        <ul className="menu__items">
          {chapterItems}
          <li className="menu__actions">
            <button
              className="menu__action"
              type="button"
              onClick={() => send({ type: 'PLAY_WALKTHROUGH' })}
            >
              <img className="menu__icon" src={openBook} alt="Open Book" /> Play Walkthrough
            </button>
            <button
              className="menu__action"
              type="button"
              onClick={() => send({ type: 'RESET_GAME' })}
            >
              <img className="menu__icon" src={reset} alt="Open Book" /> Reset Game
            </button>
          </li>
        </ul>
      </section>
    </nav>
  );
}
