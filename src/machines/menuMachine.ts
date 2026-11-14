import { assign, setup } from 'xstate';

export enum MenuStates {
  closed = 'closed',
  open = 'open',
}

export type MenuIntent =
  | { type: 'selectLevel'; chapterNumber: number; levelNumber: number }
  | { type: 'playWalkthrough' }
  | { type: 'resetGame' };

export interface MenuContext {
  isTutorialFinished: boolean;
  intent: MenuIntent | null;
}

export type MenuEvent =
  | { type: 'OPEN' }
  | { type: 'CLOSE' }
  | { type: 'SELECT_LEVEL'; chapterNumber: number; levelNumber: number }
  | { type: 'PLAY_WALKTHROUGH' }
  | { type: 'RESET_GAME' }
  | { type: 'TUTORIAL_STATUS_CHANGED'; isTutorialFinished: boolean }
  | { type: 'INTENT_HANDLED' };

export interface MenuInput {
  isTutorialFinished: boolean;
}

export const menuMachine = setup({
  types: {
    context: {} as MenuContext,
    events: {} as MenuEvent,
    input: {} as MenuInput,
  },
  guards: {
    canSelectLevel: ({ context }) => context.isTutorialFinished,
    tutorialIsFinished: ({ context, event }) =>
      event.type === 'TUTORIAL_STATUS_CHANGED'
        ? event.isTutorialFinished
        : context.isTutorialFinished,
  },
  actions: {
    setTutorialStatus: assign({
      isTutorialFinished: ({ event }) =>
        event.type === 'TUTORIAL_STATUS_CHANGED'
          ? event.isTutorialFinished
          : false,
    }),
    setSelectLevelIntent: assign({
      intent: ({ event }) => {
        if (event.type !== 'SELECT_LEVEL') {
          return null;
        }

        return {
          type: 'selectLevel' as const,
          chapterNumber: event.chapterNumber,
          levelNumber: event.levelNumber,
        };
      },
    }),
    setTutorialRedirectIntent: assign({
      intent: () => ({
        type: 'selectLevel' as const,
        chapterNumber: 1,
        levelNumber: 1,
      }),
    }),
    setPlayWalkthroughIntent: assign({
      intent: () => ({ type: 'playWalkthrough' as const }),
    }),
    setResetGameIntent: assign({
      intent: () => ({ type: 'resetGame' as const }),
    }),
    clearIntent: assign({
      intent: null,
    }),
  },
}).createMachine({
  id: 'menu',
  initial: MenuStates.closed,
  context: ({ input }) => ({
    isTutorialFinished: input.isTutorialFinished,
    intent: null,
  }),
  states: {
    [MenuStates.closed]: {
      on: {
        OPEN: MenuStates.open,
        TUTORIAL_STATUS_CHANGED: { actions: 'setTutorialStatus' },
        INTENT_HANDLED: { actions: 'clearIntent' },
      },
    },
    [MenuStates.open]: {
      on: {
        CLOSE: { target: MenuStates.closed, actions: 'clearIntent' },
        SELECT_LEVEL: [
          {
            guard: 'canSelectLevel',
            target: MenuStates.closed,
            actions: 'setSelectLevelIntent',
          },
          { actions: 'setTutorialRedirectIntent' },
        ],
        PLAY_WALKTHROUGH: {
          target: MenuStates.closed,
          actions: 'setPlayWalkthroughIntent',
        },
        RESET_GAME: {
          target: MenuStates.closed,
          actions: 'setResetGameIntent',
        },
        TUTORIAL_STATUS_CHANGED: [
          {
            guard: 'tutorialIsFinished',
            target: MenuStates.closed,
            actions: 'setTutorialStatus',
          },
          { actions: 'setTutorialStatus' },
        ],
        INTENT_HANDLED: { actions: 'clearIntent' },
      },
    },
  },
});
