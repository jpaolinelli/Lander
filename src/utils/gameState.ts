import { create } from 'zustand';

export interface GameState {
  // Rocket state
  position: [number, number, number];
  velocity: [number, number, number];
  rotation: number;
  thrusting: boolean;
  fuel: number;
  altitude: number;
  
  // Game state
  gameOver: boolean;
  gameWon: boolean;
  showMenu: boolean;
  gamePhase: 'launch' | 'orbit' | 'landing' | 'complete';
  score: number;
  
  // Mission settings
  gravity: number;
  initialAltitude: number;
  
  // Actions
  setRocketPosition: (position: [number, number, number]) => void;
  setRocketVelocity: (velocity: [number, number, number]) => void;
  setRocketRotation: (rotation: number) => void;
  setThrusting: (thrusting: boolean) => void;
  setFuel: (fuel: number) => void;
  setAltitude: (altitude: number) => void;
  setGameOver: (gameOver: boolean) => void;
  setGameWon: (gameWon: boolean) => void;
  updateShowMenu: (showMenu: boolean) => void;
  updateGamePhase: (phase: 'launch' | 'orbit' | 'landing' | 'complete') => void;
  setMissionSettings: (settings: { gravity: number; initialAltitude: number; fuel: number }) => void;
  setScore: (score: number) => void;
  resetGame: () => void;
}

const useGameState = create<GameState>((set) => ({
  // Initial rocket state
  position: [0, 0, 0], // Start from ground level
  velocity: [0, 0, 0],
  rotation: 0,
  thrusting: false,
  fuel: 100,
  altitude: 0,
  
  // Initial game state
  gameOver: false,
  gameWon: false,
  showMenu: true,
  gamePhase: 'launch',
  score: 0,
  
  // Initial mission settings
  gravity: 0.05, // Reduced gravity
  initialAltitude: 0, // Start from ground
  
  // Actions
  setRocketPosition: (position) => set((state) => ({
    position,
    altitude: position[1], // Update altitude based on y position
  })),
  
  setRocketVelocity: (velocity) => set({ velocity }),
  
  setRocketRotation: (rotation) => set({ rotation }),
  
  setThrusting: (thrusting) => set({ thrusting }),
  
  setFuel: (fuel) => set({ fuel }),
  
  setAltitude: (altitude) => set({ altitude }),
  
  setGameOver: (gameOver) => set({ gameOver }),
  
  setGameWon: (gameWon) => set({ gameWon }),
  
  updateShowMenu: (showMenu) => set({ showMenu }),
  
  updateGamePhase: (gamePhase) => set({ gamePhase }),
  
  setMissionSettings: (settings) => set({
    gravity: settings.gravity,
    initialAltitude: settings.initialAltitude,
    fuel: settings.fuel,
    position: [0, settings.initialAltitude, 0],
    altitude: settings.initialAltitude,
  }),
  
  setScore: (score) => set({ score }),
  
  resetGame: () => set((state) => ({
    position: [0, state.initialAltitude, 0],
    velocity: [0, 0, 0],
    rotation: 0,
    thrusting: false,
    fuel: state.fuel,
    altitude: state.initialAltitude,
    gameOver: false,
    gameWon: false,
    gamePhase: 'launch',
    score: 0,
  })),
}));

export default useGameState; 