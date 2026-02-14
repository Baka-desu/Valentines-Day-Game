import { createContext, useReducer, useEffect, type ReactNode } from 'react';

export interface GameState {
  happinessMeter: number;
  meganFoxesFound: number;
  rizzLinesGenerated: number;
  chatMessagesSent: number;
  datesGenerated: number;
  loveCalculations: number;
  gameCompleted: boolean;
  currentLevel: number;
  foundMegans: string[];
}

export type GameAction =
  | { type: 'INCREASE_HAPPINESS'; amount: number }
  | { type: 'FIND_MEGAN'; meganId: string }
  | { type: 'GENERATE_RIZZ' }
  | { type: 'SEND_MESSAGE' }
  | { type: 'GENERATE_DATE' }
  | { type: 'CALCULATE_LOVE' }
  | { type: 'COMPLETE_GAME' }
  | { type: 'NEXT_LEVEL' }
  | { type: 'RESET' };

const initialState: GameState = {
  happinessMeter: 0,
  meganFoxesFound: 0,
  rizzLinesGenerated: 0,
  chatMessagesSent: 0,
  datesGenerated: 0,
  loveCalculations: 0,
  gameCompleted: false,
  currentLevel: 0,
  foundMegans: [],
};

function loadState(): GameState {
  try {
    const saved = localStorage.getItem('valentine-game-state');
    if (saved) return JSON.parse(saved) as GameState;
  } catch { /* ignore */ }
  return initialState;
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'INCREASE_HAPPINESS':
      return {
        ...state,
        happinessMeter: Math.min(100, state.happinessMeter + action.amount),
      };
    case 'FIND_MEGAN':
      if (state.foundMegans.includes(action.meganId)) return state;
      return {
        ...state,
        meganFoxesFound: state.meganFoxesFound + 1,
        foundMegans: [...state.foundMegans, action.meganId],
        happinessMeter: Math.min(100, state.happinessMeter + 15),
      };
    case 'GENERATE_RIZZ':
      return {
        ...state,
        rizzLinesGenerated: state.rizzLinesGenerated + 1,
        happinessMeter: Math.min(100, state.happinessMeter + 5),
      };
    case 'SEND_MESSAGE':
      return {
        ...state,
        chatMessagesSent: state.chatMessagesSent + 1,
        happinessMeter: Math.min(100, state.happinessMeter + 3),
      };
    case 'GENERATE_DATE':
      return {
        ...state,
        datesGenerated: state.datesGenerated + 1,
        happinessMeter: Math.min(100, state.happinessMeter + 10),
      };
    case 'CALCULATE_LOVE':
      return {
        ...state,
        loveCalculations: state.loveCalculations + 1,
        happinessMeter: Math.min(100, state.happinessMeter + 5),
      };
    case 'COMPLETE_GAME':
      return { ...state, gameCompleted: true };
    case 'NEXT_LEVEL':
      return { ...state, currentLevel: state.currentLevel + 1 };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

export const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, undefined, loadState);

  useEffect(() => {
    localStorage.setItem('valentine-game-state', JSON.stringify(state));
  }, [state]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}
