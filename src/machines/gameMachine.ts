import { assign, setup } from 'xstate';
import { buildSolutionsArray, isSolutionCorrect } from '../utils/solutions';

export enum GameStates {
  editing = 'editing',
  incorrect = 'incorrect',
  resolved = 'resolved',
  advancing = 'advancing',
  completed = 'completed',
}

export type GameEvent =
  | { type: 'ANSWER_CHANGED'; answer: string }
  | { type: 'CHECK' }
  | { type: 'TOGGLE_PRESSMEN_TOOLS'; open: boolean }
  | { type: 'TUTORIAL_STATUS_CHANGED'; canCheck: boolean };

export interface GameInput {
  answer: string;
  solutions: string[][];
  hasNextLevel: boolean;
  canCheck: boolean;
}

export interface GameContext extends GameInput {
  isPressmenToolsOpen: boolean;
}

export const gameMachine = setup({
  types: {
    context: {} as GameContext,
    events: {} as GameEvent,
    input: {} as GameInput,
  },
  guards: {
    isAnswerCorrect: ({ context, event }) => {
      const answer = event.type === 'ANSWER_CHANGED' ? event.answer : context.answer;

      return isSolutionCorrect(buildSolutionsArray(context.solutions), answer);
    },
    canCheck: ({ context }) => context.canCheck,
    canAdvance: ({ context }) => context.canCheck && context.hasNextLevel,
  },
  actions: {
    setAnswer: assign({
      answer: ({ event }) => (event.type === 'ANSWER_CHANGED' ? event.answer : ''),
    }),
    setPressmenToolsOpen: assign({
      isPressmenToolsOpen: ({ event }) =>
        event.type === 'TOGGLE_PRESSMEN_TOOLS' ? event.open : false,
    }),
    setCanCheck: assign({
      canCheck: ({ event }) =>
        event.type === 'TUTORIAL_STATUS_CHANGED' ? event.canCheck : false,
    }),
  },
}).createMachine({
  id: 'game',
  initial: GameStates.editing,
  context: ({ input }) => ({
    ...input,
    isPressmenToolsOpen: false,
  }),
  states: {
    [GameStates.editing]: {
      always: [{ guard: 'isAnswerCorrect', target: GameStates.resolved }],
      on: {
        ANSWER_CHANGED: [
          {
            guard: 'isAnswerCorrect',
            target: GameStates.resolved,
            actions: 'setAnswer',
          },
          { actions: 'setAnswer' },
        ],
        CHECK: [{ guard: 'canCheck', target: GameStates.incorrect }],
        TOGGLE_PRESSMEN_TOOLS: { actions: 'setPressmenToolsOpen' },
        TUTORIAL_STATUS_CHANGED: { actions: 'setCanCheck' },
      },
    },
    [GameStates.incorrect]: {
      after: {
        800: GameStates.editing,
      },
      on: {
        ANSWER_CHANGED: [
          {
            guard: 'isAnswerCorrect',
            target: GameStates.resolved,
            actions: 'setAnswer',
          },
          { target: GameStates.editing, actions: 'setAnswer' },
        ],
        TOGGLE_PRESSMEN_TOOLS: { actions: 'setPressmenToolsOpen' },
        TUTORIAL_STATUS_CHANGED: { actions: 'setCanCheck' },
      },
    },
    [GameStates.resolved]: {
      on: {
        ANSWER_CHANGED: [
          { guard: 'isAnswerCorrect', actions: 'setAnswer' },
          { target: GameStates.editing, actions: 'setAnswer' },
        ],
        CHECK: [
          { guard: 'canAdvance', target: GameStates.advancing },
          { guard: 'canCheck', target: GameStates.completed },
        ],
        TOGGLE_PRESSMEN_TOOLS: { actions: 'setPressmenToolsOpen' },
        TUTORIAL_STATUS_CHANGED: { actions: 'setCanCheck' },
      },
    },
    [GameStates.advancing]: {
      on: {
        TOGGLE_PRESSMEN_TOOLS: { actions: 'setPressmenToolsOpen' },
        TUTORIAL_STATUS_CHANGED: { actions: 'setCanCheck' },
      },
    },
    [GameStates.completed]: {
      on: {
        TOGGLE_PRESSMEN_TOOLS: { actions: 'setPressmenToolsOpen' },
      },
    },
  },
});
