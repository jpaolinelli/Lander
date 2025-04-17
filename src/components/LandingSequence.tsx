'use client';

import { useEffect, useState } from 'react';
import useGameState from '../utils/gameState';

const LandingSequence = () => {
  const {
    position,
    velocity,
    gamePhase,
    gameOver,
    gameWon
  } = useGameState();

  const [altitude, setAltitude] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [landingStatus, setLandingStatus] = useState<'safe' | 'warning' | 'danger'>('safe');

  useEffect(() => {
    if (gamePhase !== 'landing' || gameOver || gameWon) return;

    // Calculate altitude (assuming y is up)
    const currentAltitude = Math.max(0, position[1]);
    setAltitude(currentAltitude);

    // Calculate speed from velocity (with null check)
    const currentSpeed = velocity ? Math.sqrt(
      velocity[0] * velocity[0] + 
      velocity[1] * velocity[1] + 
      velocity[2] * velocity[2]
    ) : 0;
    setSpeed(currentSpeed);

    // Determine landing status
    if (currentSpeed > 2) {
      setLandingStatus('danger');
    } else if (currentSpeed > 1) {
      setLandingStatus('warning');
    } else {
      setLandingStatus('safe');
    }
  }, [position, velocity, gamePhase, gameOver, gameWon]);

  if (gamePhase !== 'landing' || gameOver || gameWon) return null;

  return (
    <div style={{
      position: 'absolute',
      bottom: '20px',
      left: '20px',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      border: `2px solid ${
        landingStatus === 'safe' ? '#00ff00' : 
        landingStatus === 'warning' ? '#ffff00' : '#ff0000'
      }`,
      borderRadius: '5px',
      padding: '10px',
      color: '#ffffff',
      fontFamily: 'monospace',
      fontSize: '14px',
      width: '200px'
    }}>
      <div>ALTITUDE: {altitude.toFixed(2)}</div>
      <div>SPEED: {speed.toFixed(2)}</div>
      <div style={{
        color: landingStatus === 'safe' ? '#00ff00' : 
               landingStatus === 'warning' ? '#ffff00' : '#ff0000',
        fontWeight: 'bold',
        marginTop: '5px'
      }}>
        {landingStatus === 'safe' ? 'SAFE TO LAND' : 
         landingStatus === 'warning' ? 'APPROACHING TOO FAST' : 'DANGER - TOO FAST'}
      </div>
    </div>
  );
};

export default LandingSequence; 