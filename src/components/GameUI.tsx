'use client';

import { useRef, useEffect } from 'react';
import useGameState from '../utils/gameState';

export default function GameUI() {
  const { 
    fuel, 
    altitude, 
    velocity, 
    gameOver, 
    gameWon, 
    score,
    resetGame
  } = useGameState();

  const fuelGaugeRef = useRef<HTMLCanvasElement>(null);

  // Calculate speed from velocity
  const speed = Math.sqrt(
    velocity[0] * velocity[0] + 
    velocity[1] * velocity[1]
  );

  // Draw the fuel gauge
  useEffect(() => {
    const canvas = fuelGaugeRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw gauge background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw gauge border
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 2;
    ctx.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);
    
    // Draw gauge segments
    const segmentCount = 10;
    const segmentWidth = (canvas.width - 10) / segmentCount;
    
    for (let i = 0; i < segmentCount; i++) {
      const x = 5 + i * segmentWidth;
      const height = 10;
      const y = canvas.height / 2 - height / 2;
      
      // Determine color based on fuel level
      const fuelPercentage = fuel / 100;
      const segmentThreshold = i / segmentCount;
      
      if (fuelPercentage >= segmentThreshold) {
        // Green for normal fuel levels
        if (fuelPercentage > 0.3) {
          ctx.fillStyle = '#00ff00';
        } 
        // Yellow for low fuel
        else if (fuelPercentage > 0.1) {
          ctx.fillStyle = '#ffff00';
        } 
        // Red for critical fuel
        else {
          ctx.fillStyle = '#ff0000';
        }
      } else {
        ctx.fillStyle = '#333333';
      }
      
      ctx.fillRect(x, y, segmentWidth - 2, height);
    }
    
    // Draw needle
    const needleX = 5 + (fuel / 100) * (canvas.width - 10);
    ctx.beginPath();
    ctx.moveTo(needleX, 5);
    ctx.lineTo(needleX, canvas.height - 5);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Draw fuel text
    ctx.fillStyle = '#ffffff';
    ctx.font = '10px "Courier New"';
    ctx.textAlign = 'center';
    ctx.fillText('FUEL', canvas.width / 2, canvas.height - 5);
  }, [fuel]);

  return (
    <div className="game-ui">
      <div className="game-stats">
        <div className="stat">
          <span className="label">ALTITUDE:</span>
          <span className="value">{altitude.toFixed(1)}</span>
          <div className="altitude-bar">
            <div 
              className="altitude-fill" 
              style={{ 
                height: `${Math.min(100, (altitude / 10) * 100)}%`,
                backgroundColor: altitude < 2 ? '#ff0000' : '#00ff00'
              }}
            ></div>
          </div>
        </div>
        <div className="stat">
          <span className="label">VELOCITY:</span>
          <span className="value">{speed.toFixed(1)}</span>
          <div className="velocity-bar">
            <div 
              className="velocity-fill" 
              style={{ 
                width: `${Math.min(100, (speed / 2) * 100)}%`,
                backgroundColor: speed > 1.5 ? '#ff0000' : '#00ff00'
              }}
            ></div>
          </div>
        </div>
        <div className="stat">
          <span className="label">FUEL:</span>
          <span className="value">{fuel.toFixed(0)}</span>
          <canvas 
            ref={fuelGaugeRef} 
            width={150} 
            height={30} 
            className="fuel-gauge"
          />
        </div>
        <div className="stat">
          <span className="label">SCORE:</span>
          <span className="value">{score}</span>
        </div>
      </div>

      {gameOver && (
        <div className="game-over">
          <h2>GAME OVER</h2>
          <p>Your score: {score}</p>
          <button onClick={resetGame}>TRY AGAIN</button>
        </div>
      )}

      {gameWon && (
        <div className="game-won">
          <h2>LANDING SUCCESSFUL!</h2>
          <p>Your score: {score}</p>
          <button onClick={resetGame}>PLAY AGAIN</button>
        </div>
      )}

      <style jsx>{`
        .game-ui {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          padding: 20px;
          color: white;
          font-family: 'Courier New', monospace;
          pointer-events: none;
        }

        .game-stats {
          display: flex;
          justify-content: space-between;
          background-color: rgba(0, 0, 0, 0.5);
          padding: 10px;
          border-radius: 5px;
        }

        .stat {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .label {
          font-size: 12px;
          color: #aaa;
        }

        .value {
          font-size: 18px;
          font-weight: bold;
        }

        .altitude-bar, .velocity-bar {
          width: 20px;
          height: 100px;
          background-color: #333;
          border: 1px solid #666;
          margin-top: 5px;
          position: relative;
        }

        .altitude-fill {
          position: absolute;
          bottom: 0;
          width: 100%;
          transition: height 0.2s, background-color 0.2s;
        }

        .velocity-bar {
          width: 100px;
          height: 20px;
          margin-top: 5px;
        }

        .velocity-fill {
          height: 100%;
          transition: width 0.2s, background-color 0.2s;
        }

        .fuel-gauge {
          margin-top: 5px;
          border: 1px solid #666;
        }

        .game-over, .game-won {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: rgba(0, 0, 0, 0.8);
          padding: 20px;
          border-radius: 5px;
          text-align: center;
          pointer-events: auto;
        }

        .game-over h2, .game-won h2 {
          color: #ff0000;
          margin-bottom: 10px;
        }

        .game-won h2 {
          color: #00ff00;
        }

        button {
          background-color: #00ff00;
          color: black;
          border: none;
          padding: 10px 20px;
          font-family: 'Courier New', monospace;
          font-size: 16px;
          cursor: pointer;
          margin-top: 10px;
        }

        button:hover {
          background-color: #00cc00;
        }
      `}</style>
    </div>
  );
} 