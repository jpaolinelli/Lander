import { useFrame } from '@react-three/fiber';
import useStore from '../utils/gameState';

export default function Physics() {
  const {
    position,
    velocity,
    rotation,
    thrusting,
    fuel,
    gravity,
    setRocketPosition,
    setRocketVelocity,
    setFuel,
    setGameOver,
  } = useStore();

  useFrame((state, delta) => {
    // Apply gravity
    const newVelocity: [number, number, number] = [
      velocity[0],
      velocity[1] - gravity * delta,
      velocity[2],
    ];

    // Apply thrust if thrusting and has fuel
    if (thrusting && fuel > 0) {
      const thrustForce = 0.2;
      const thrustX = Math.sin(rotation) * thrustForce;
      const thrustY = Math.cos(rotation) * thrustForce;
      
      newVelocity[0] += thrustX * delta;
      newVelocity[1] += thrustY * delta;
      
      // Consume fuel
      setFuel(Math.max(0, fuel - delta * 10));
    }

    // Update position based on velocity
    const newPosition: [number, number, number] = [
      position[0] + newVelocity[0] * delta,
      position[1] + newVelocity[1] * delta,
      position[2] + newVelocity[2] * delta,
    ];

    // Check for ground collision
    if (newPosition[1] <= 0) {
      // Game over if velocity is too high
      const speed = Math.sqrt(
        newVelocity[0] * newVelocity[0] + 
        newVelocity[1] * newVelocity[1] + 
        newVelocity[2] * newVelocity[2]
      );
      
      if (speed > 2) {
        setGameOver(true);
      }
      
      // Stop at ground
      newPosition[1] = 0;
      newVelocity[1] = 0;
    }

    // Update state
    setRocketVelocity(newVelocity);
    setRocketPosition(newPosition);
  });

  return null;
} 