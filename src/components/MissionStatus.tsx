'use client';

import { useEffect, useState } from 'react';
import useGameState from '../utils/gameState';

const MissionStatus = () => {
  const {
    gamePhase,
    velocity,
    gameOver,
    gameWon
  } = useGameState();

  const [status, setStatus] = useState<string>('');
  const [objective, setObjective] = useState<string>('');

  useEffect(() => {
    if (gameOver) {
      setStatus('MISSION FAILED');
      setObjective('Press R to try again');
      return;
    }

    if (gameWon) {
      setStatus('MISSION SUCCESSFUL');
      setObjective('Press R to play again');
      return;
    }

    // Calculate speed from velocity
    const speed = Math.sqrt(
      velocity[0] * velocity[0] + 
      velocity[1] * velocity[1] + 
      velocity[2] * velocity[2]
    );

    switch (gamePhase) {
      case 'launch':
        setStatus('LAUNCH PHASE');
        setObjective('Achieve orbit by reaching altitude 15-25 units');
        break;
      case 'orbit':
        setStatus('ORBIT ACHIEVED');
        setObjective('Maintain orbit and prepare for landing');
        break;
      case 'landing':
        setStatus('LANDING PHASE');
        setObjective('Land safely on the landing pad');
        break;
      case 'complete':
        setStatus('MISSION COMPLETE');
        setObjective('Press R to play again');
        break;
      default:
        setStatus('UNKNOWN PHASE');
        setObjective('Error: Invalid game phase');
    }
  }, [gamePhase, velocity, gameOver, gameWon]);

  return (
    <div className="mission-status">
      <div className="status">{status}</div>
      <div className="objective">{objective}</div>
      <style jsx>{`
        .mission-status {
          position: absolute;
          top: 20px;
          left: 20px;
          background-color: rgba(0, 0, 0, 0.7);
          border: 2px solid #00ff00;
          border-radius: 5px;
          padding: 10px;
          color: #00ff00;
          font-family: 'Courier New', monospace;
          font-size: 14px;
          text-align: center;
          width: 200px;
        }
        
        .status {
          font-weight: bold;
          margin-bottom: 5px;
        }
        
        .objective {
          font-size: 12px;
        }
      `}</style>
    </div>
  );
};

export default MissionStatus; 