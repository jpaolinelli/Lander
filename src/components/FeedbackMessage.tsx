import { useEffect, useState } from 'react';
import useGameState from '../utils/gameState';

const FeedbackMessage = () => {
  const {
    position,
    velocity,
    fuel,
    gamePhase,
    gameOver,
    gameWon
  } = useGameState();

  const [message, setMessage] = useState('');
  const [type, setType] = useState<'info' | 'warning' | 'success' | 'error'>('info');
  const [show, setShow] = useState(false);

  useEffect(() => {
    const speed = Math.sqrt(
      velocity[0] * velocity[0] + 
      velocity[1] * velocity[1] + 
      velocity[2] * velocity[2]
    );

    if (gameOver) {
      setMessage('MISSION FAILED');
      setType('error');
      setShow(true);
      return;
    }

    if (gameWon) {
      setMessage('MISSION ACCOMPLISHED');
      setType('success');
      setShow(true);
      return;
    }

    if (fuel < 20) {
      setMessage('LOW FUEL WARNING');
      setType('warning');
      setShow(true);
      return;
    }

    if (speed > 10) {
      setMessage('VELOCITY TOO HIGH');
      setType('warning');
      setShow(true);
      return;
    }

    if (gamePhase === 'orbit' && speed > 5 && speed < 8) {
      setMessage('ORBIT ACHIEVED');
      setType('success');
      setShow(true);
      return;
    }

    setShow(false);
  }, [position, velocity, fuel, gamePhase, gameOver, gameWon]);

  if (!show) return null;

  return (
    <div style={{
      position: 'absolute',
      top: '20%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      padding: '20px',
      backgroundColor: type === 'error' ? '#ff0000' : 
                      type === 'warning' ? '#ffff00' : 
                      type === 'success' ? '#00ff00' : '#ffffff',
      color: type === 'warning' ? '#000000' : '#ffffff',
      fontFamily: 'monospace',
      fontSize: '24px',
      textAlign: 'center',
      animation: 'fadeIn 0.5s ease-in-out',
      zIndex: 1000
    }}>
      {message}
    </div>
  );
};

export default FeedbackMessage; 