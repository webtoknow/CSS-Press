import { createActor } from 'xstate';
import { chapters } from '../../src/const/chapters';
import { gameMachine } from '../../src/machines/gameMachine';
import type { ILevel } from '../../src/models/Game';

function buildAnswer(level: ILevel) {
  return level.solutions
    .map(([property, ...values]) => `${property}: ${values[0]};`)
    .join(' ');
}

function startLevel(level: ILevel) {
  return createActor(gameMachine, {
    input: {
      answer: '',
      solutions: level.solutions,
      hasNextLevel: true,
      canCheck: true,
    },
  }).start();
}

describe('gameMachine', () => {
  it('resolves every level with its first accepted solution', () => {
    for (const [chapterIndex, chapter] of chapters.entries()) {
      for (const [levelIndex, level] of chapter.levels.entries()) {
        const actor = startLevel(level);
        const answer = buildAnswer(level);

        actor.send({ type: 'ANSWER_CHANGED', answer });

        if (!actor.getSnapshot().matches('resolved')) {
          throw new Error(
            `Failed level ${chapterIndex + 1}-${levelIndex + 1}: ${answer}`
          );
        }
      }
    }
  });

  it('moves to incorrect on a wrong check and resolves on a correct answer', () => {
    const level = chapters[0].levels[0];
    const actor = startLevel(level);

    actor.send({ type: 'CHECK' });
    expect(actor.getSnapshot().matches('incorrect')).toBe(true);

    actor.send({ type: 'ANSWER_CHANGED', answer: buildAnswer(level) });
    expect(actor.getSnapshot().matches('resolved')).toBe(true);
  });

  it('advances or completes based on the next level', () => {
    const level = chapters[0].levels[0];
    const actor = startLevel(level);

    actor.send({ type: 'ANSWER_CHANGED', answer: buildAnswer(level) });
    actor.send({ type: 'CHECK' });
    expect(actor.getSnapshot().matches('advancing')).toBe(true);

    const lastChapter = chapters[chapters.length - 1];
    const lastLevel = lastChapter.levels[lastChapter.levels.length - 1];

    const lastActor = createActor(gameMachine, {
      input: {
        answer: '',
        solutions: lastLevel.solutions,
        hasNextLevel: false,
        canCheck: true,
      },
    }).start();

    lastActor.send({ type: 'ANSWER_CHANGED', answer: buildAnswer(lastLevel) });
    lastActor.send({ type: 'CHECK' });
    expect(lastActor.getSnapshot().matches('completed')).toBe(true);
  });
});
