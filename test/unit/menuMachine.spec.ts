import { createActor } from 'xstate';
import { MenuStates, menuMachine } from '../../src/machines/menuMachine';

function startMenu(isTutorialFinished = true) {
  return createActor(menuMachine, {
    input: { isTutorialFinished },
  }).start();
}

describe('menuMachine', () => {
  it('opens and closes', () => {
    const actor = startMenu();

    expect(actor.getSnapshot().matches(MenuStates.closed)).toBe(true);

    actor.send({ type: 'OPEN' });
    expect(actor.getSnapshot().matches(MenuStates.open)).toBe(true);

    actor.send({ type: 'CLOSE' });
    expect(actor.getSnapshot().matches(MenuStates.closed)).toBe(true);
  });

  it('selects a level when the tutorial is finished', () => {
    const actor = startMenu(true);

    actor.send({ type: 'OPEN' });
    actor.send({ type: 'SELECT_LEVEL', chapterNumber: 2, levelNumber: 3 });

    expect(actor.getSnapshot().matches(MenuStates.closed)).toBe(true);
    expect(actor.getSnapshot().context.intent).toEqual({
      type: 'selectLevel',
      chapterNumber: 2,
      levelNumber: 3,
    });
  });

  it('redirects to the first level while the tutorial is running', () => {
    const actor = startMenu(false);

    actor.send({ type: 'OPEN' });
    actor.send({ type: 'SELECT_LEVEL', chapterNumber: 2, levelNumber: 3 });

    expect(actor.getSnapshot().matches(MenuStates.open)).toBe(true);
    expect(actor.getSnapshot().context.intent).toEqual({
      type: 'selectLevel',
      chapterNumber: 1,
      levelNumber: 1,
    });
  });

  it('creates walkthrough and reset intents', () => {
    const walkthroughActor = startMenu(true);
    walkthroughActor.send({ type: 'OPEN' });
    walkthroughActor.send({ type: 'PLAY_WALKTHROUGH' });

    expect(walkthroughActor.getSnapshot().matches(MenuStates.closed)).toBe(true);
    expect(walkthroughActor.getSnapshot().context.intent).toEqual({
      type: 'playWalkthrough',
    });

    const resetActor = startMenu(true);
    resetActor.send({ type: 'OPEN' });
    resetActor.send({ type: 'RESET_GAME' });

    expect(resetActor.getSnapshot().matches(MenuStates.closed)).toBe(true);
    expect(resetActor.getSnapshot().context.intent).toEqual({
      type: 'resetGame',
    });
  });

  it('closes when the tutorial finishes', () => {
    const actor = startMenu(false);

    actor.send({ type: 'OPEN' });
    actor.send({ type: 'TUTORIAL_STATUS_CHANGED', isTutorialFinished: true });

    expect(actor.getSnapshot().matches(MenuStates.closed)).toBe(true);
    expect(actor.getSnapshot().context.isTutorialFinished).toBe(true);
  });

  it('clears the handled intent', () => {
    const actor = startMenu(true);

    actor.send({ type: 'OPEN' });
    actor.send({ type: 'PLAY_WALKTHROUGH' });
    actor.send({ type: 'INTENT_HANDLED' });

    expect(actor.getSnapshot().context.intent).toBeNull();
  });
});
