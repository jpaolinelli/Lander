'use client';

import { useEffect } from 'react';
import useGameState from '../utils/gameState';

const KeyboardController = () => {
  const {
    setRocketRotation,
    setThrusting,
    setFuel,
    gameOver,
    gameWon,
    resetGame
  } = useGameState();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver || gameWon) {
        if (e.key.toLowerCase() === 'r') {
          resetGame();
        }
        return;
      }

      switch (e.key) {
        case ' ':
          setThrusting(true);
          break;
        case 'ArrowLeft':
          setRocketRotation(-0.1);
          break;
        case 'ArrowRight':
          setRocketRotation(0.1);
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (gameOver || gameWon) return;

      switch (e.key) {
        case ' ':
          setThrusting(false);
          break;
        case 'ArrowLeft':
        case 'ArrowRight':
          setRocketRotation(0);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameOver, gameWon, resetGame, setRocketRotation, setThrusting]);

  return null;
};

export default KeyboardController; 