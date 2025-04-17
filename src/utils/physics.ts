import { GameState } from './gameState';

// Physics constants
export const GRAVITY = 0.05; // Reduced from 0.15 to make gravity less strong
export const THRUST_POWER = 0.15; // Reduced from 0.2 to make thrust more manageable
export const ROTATION_SPEED = 0.05;
export const TERRAIN_HEIGHT = 0;
export const FUEL_CONSUMPTION_RATE = 0.3; // Reduced from 0.5 to make fuel last longer
export const ALTITUDE_FACTOR = 0.05; // Reduced from 0.1 to make gravity decrease more gradually with altitude

// Calculate new position based on current position, velocity, and time delta
export const calculateNewPosition = (
  position: [number, number, number],
  velocity: [number, number, number],
  delta: number
): [number, number, number] => {
  return [
    position[0] + velocity[0] * delta,
    position[1] + velocity[1] * delta,
    position[2] + velocity[2] * delta,
  ];
};

// Calculate new velocity based on current velocity, thrust, rotation, and gravity
export const calculateNewVelocity = (
  velocity: [number, number, number],
  rotation: [number, number, number],
  thrusting: boolean,
  delta: number,
  altitude: number
): [number, number, number] => {
  // Apply gravity (reduced at higher altitudes)
  const altitudeMultiplier = Math.max(0.3, 1 - altitude * ALTITUDE_FACTOR);
  let newVelocity: [number, number, number] = [...velocity];
  newVelocity[1] -= GRAVITY * delta * altitudeMultiplier;

  // Apply thrust if thrusting
  if (thrusting) {
    const thrustX = Math.sin(rotation[2]) * THRUST_POWER * delta;
    const thrustY = Math.cos(rotation[2]) * THRUST_POWER * delta;
    newVelocity[0] += thrustX;
    newVelocity[1] += thrustY;
  }

  // Add some drag to make control more manageable
  const DRAG = 0.005; // Reduced from 0.01 to make movement more fluid
  newVelocity = [
    newVelocity[0] * (1 - DRAG * delta),
    newVelocity[1] * (1 - DRAG * delta),
    newVelocity[2] * (1 - DRAG * delta)
  ] as [number, number, number];

  return newVelocity;
};

// Check for collision with terrain
export const checkCollision = (position: [number, number, number]): boolean => {
  return position[1] <= TERRAIN_HEIGHT;
};

// Check for successful landing
export const checkLanding = (
  position: [number, number, number],
  velocity: [number, number, number],
  rotation: [number, number, number]
): boolean => {
  // Check if the rocket is close to the landing pad
  const isOverLandingPad = Math.abs(position[0]) < 1;
  
  // Check if the rocket is close to the ground
  const isCloseToGround = Math.abs(position[1] - TERRAIN_HEIGHT) < 0.1;
  
  // Check if the rocket is upright (rotation close to 0)
  const isUpright = Math.abs(rotation[2]) < 0.1;
  
  // Check if the velocity is low enough for a safe landing
  const isSlowEnough = 
    Math.abs(velocity[0]) < 0.2 && 
    Math.abs(velocity[1]) < 0.2;
  
  return isOverLandingPad && isCloseToGround && isUpright && isSlowEnough;
};

// Calculate fuel consumption
export const calculateFuelConsumption = (
  thrusting: boolean,
  delta: number
): number => {
  return thrusting ? FUEL_CONSUMPTION_RATE * delta : 0;
}; 