import { useEffect, useState } from 'react';
import useGameState from '../utils/gameState';

const OrbitGuidance = () => {
  const { position, velocity, altitude, gameOver, gameWon, gamePhase } = useGameState();
  const [orbitStatus, setOrbitStatus] = useState<string>('');
  const [guidance, setGuidance] = useState<string>('');
  
  useEffect(() => {
    if (gameOver || gameWon) {
      setOrbitStatus('');
      setGuidance('');
      return;
    }
    
    if (gamePhase === 'orbit') {
      setOrbitStatus('ORBIT ACHIEVED!');
      setGuidance('Maintain current trajectory');
    } else if (gamePhase === 'landing') {
      setOrbitStatus('LANDING PHASE');
      setGuidance('Control your descent to the landing pad');
    } else {
      setOrbitStatus('LAUNCH PHASE');
      
      // Calculate horizontal velocity (ignoring y component)
      const horizontalVelocity = Math.sqrt(
        velocity[0] * velocity[0] + 
        velocity[2] * velocity[2]
      );
      
      // Provide guidance based on current conditions
      if (altitude < 15) {
        setGuidance('Increase altitude to 15-30 units');
      } else if (altitude > 30) {
        setGuidance('Decrease altitude to 15-30 units');
      } else {
        // In the target altitude range, focus on velocity
        if (horizontalVelocity < 1.5) {
          setGuidance('Increase horizontal velocity');
        } else if (Math.abs(velocity[1]) > 1) {
          setGuidance('Reduce vertical velocity for stable orbit');
        } else {
          setGuidance('Adjust trajectory to match target orbit');
        }
      }
    }
  }, [position, velocity, altitude, gameOver, gameWon, gamePhase]);
  
  if (gameOver || gameWon || gamePhase === 'landing') return null;

  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      right: '20px',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      border: '2px solid #00ff00',
      borderRadius: '5px',
      padding: '10px',
      color: '#00ff00',
      fontFamily: 'monospace',
      fontSize: '14px',
      width: '250px'
    }}>
      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{orbitStatus}</div>
      <div>{guidance}</div>
      <div style={{ marginTop: '10px', fontSize: '12px' }}>
        <div>ALTITUDE: {altitude.toFixed(2)}</div>
        <div>HORIZONTAL VELOCITY: {Math.sqrt(velocity[0] * velocity[0] + velocity[2] * velocity[2]).toFixed(2)}</div>
        <div>VERTICAL VELOCITY: {velocity[1].toFixed(2)}</div>
      </div>
    </div>
  );
};

export default OrbitGuidance; 