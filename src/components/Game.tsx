'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useRef, useEffect, useState } from 'react';
import useGameState from '../utils/gameState';
import { calculateNewPosition, calculateNewVelocity, checkCollision, checkLanding, calculateFuelConsumption } from '@/utils/physics';
import Rocket from './Rocket';
import Earth from './Earth';
import Moon from './Moon';
import LandingPad from './LandingPad';
import GameUI from './GameUI';
import KeyboardController from './KeyboardController';
import LandingSequence from './LandingSequence';
import MissionStatus from './MissionStatus';
import AudioControls from './AudioControls';
import audioManager, { SoundEffect } from '../utils/audioManager';
import Starfield from './Starfield';
import OrbitalPath from './OrbitalPath';
import AtmosphereEffect from './AtmosphereEffect';
import OrbitGuidance from './OrbitGuidance';
import FeedbackMessage from './FeedbackMessage';
import StartMenu from './StartMenu';

const EARTH_SCALE: [number, number, number] = [5, 5, 5];
const DEFAULT_SCALE: [number, number, number] = [1, 1, 1];

const Game = () => {
  const {
    position,
    velocity,
    rotation,
    thrusting,
    fuel,
    altitude,
    gameOver,
    gameWon,
    showMenu,
    gamePhase,
    setRocketPosition,
    setRocketVelocity,
    setRocketRotation,
    setThrusting,
    setFuel,
    setAltitude,
    setGameOver,
    setGameWon,
    updateShowMenu,
    updateGamePhase,
    setMissionSettings,
    resetGame
  } = useGameState();

  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([0, 10, 15]);
  const [countdown, setCountdown] = useState<number>(3);
  const [countdownActive, setCountdownActive] = useState<boolean>(false);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  // Handle countdown and launch sequence
  useEffect(() => {
    if (showMenu || gameOver || gameWon) return;
    
    if (countdownActive && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCountdownActive(false);
      // Start with a small initial thrust
      setThrusting(true);
      setTimeout(() => {
        setThrusting(false);
      }, 500);
    }
  }, [countdown, countdownActive, showMenu, gameOver, gameWon]);

  // Start countdown when game starts
  useEffect(() => {
    if (!showMenu && !gameOver && !gameWon && !countdownActive && countdown === 3) {
      setCountdownActive(true);
    }
  }, [showMenu, gameOver, gameWon, countdownActive, countdown]);

  // Update camera position based on rocket position
  useEffect(() => {
    if (cameraRef.current) {
      // Follow the rocket with a slight delay
      const targetY = Math.max(10, position[1] + 5);
      const targetZ = Math.max(15, 20 - position[1] / 2);
      
      cameraRef.current.position.y = targetY;
      cameraRef.current.position.z = targetZ;
      
      // Look at the rocket
      cameraRef.current.lookAt(position[0], position[1], position[2]);
    }
  }, [position]);

  // Game loop
  useEffect(() => {
    const gameLoop = setInterval(() => {
      if (gameOver || gameWon || showMenu || countdownActive) return;

      // Update position based on velocity
      const newPosition: [number, number, number] = [
        position[0] + velocity[0],
        position[1] + velocity[1],
        position[2] + velocity[2]
      ];
      setRocketPosition(newPosition);

      // Apply gravity based on game phase
      let gravity = 0.05; // Base gravity
      if (gamePhase === 'orbit') {
        gravity = 0.02; // Less gravity in orbit
      } else if (gamePhase === 'landing') {
        gravity = 0.08; // More gravity when landing
      }
      
      const newVelocity: [number, number, number] = [
        velocity[0],
        velocity[1] - gravity,
        velocity[2]
      ];

      // Apply thrust if thrusting
      if (thrusting && fuel > 0) {
        const thrust = 0.15; // Reduced thrust for better control
        // Apply thrust in the direction the rocket is facing
        const thrustX = Math.sin(rotation) * thrust;
        const thrustY = Math.cos(rotation) * thrust;
        
        newVelocity[0] += thrustX;
        newVelocity[1] += thrustY;
        setFuel(fuel - 0.1);
      }

      setRocketVelocity(newVelocity);

      // Check for orbit achievement
      if (gamePhase === 'launch' && newPosition[1] > 30 && Math.abs(newVelocity[1]) < 0.5) {
        // Transition to orbit phase
        updateGamePhase('orbit');
        
        // Add a small delay before showing the cutscene
        setTimeout(() => {
          // Show a cutscene message
          const cutsceneMessage = document.createElement('div');
          cutsceneMessage.style.position = 'absolute';
          cutsceneMessage.style.top = '50%';
          cutsceneMessage.style.left = '50%';
          cutsceneMessage.style.transform = 'translate(-50%, -50%)';
          cutsceneMessage.style.color = '#00ff00';
          cutsceneMessage.style.fontFamily = 'monospace';
          cutsceneMessage.style.fontSize = '24px';
          cutsceneMessage.style.textAlign = 'center';
          cutsceneMessage.style.zIndex = '1000';
          cutsceneMessage.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
          cutsceneMessage.style.padding = '20px';
          cutsceneMessage.style.borderRadius = '5px';
          cutsceneMessage.innerHTML = 'ORBIT ACHIEVED!<br>Preparing for landing sequence...';
          document.body.appendChild(cutsceneMessage);
          
          // Remove the message after 3 seconds and transition to landing phase
          setTimeout(() => {
            document.body.removeChild(cutsceneMessage);
            updateGamePhase('landing');
            
            // Reset position for landing phase (on the moon)
            setRocketPosition([0, 50, 0]);
            setRocketVelocity([0, -0.5, 0]);
          }, 3000);
        }, 1000);
      }

      // Check for landing phase
      if (gamePhase === 'landing' && newPosition[1] <= 0) {
        // Check for successful landing
        const speed = Math.sqrt(
          newVelocity[0] * newVelocity[0] + 
          newVelocity[1] * newVelocity[1] + 
          newVelocity[2] * newVelocity[2]
        );
        
        if (speed > 2 || Math.abs(rotation) > 0.3) {
          setGameOver(true);
        } else {
          setGameWon(true);
          updateGamePhase('complete');
        }
      }

      // Update altitude
      setAltitude(newPosition[1] as number);
    }, 1000 / 60);

    return () => clearInterval(gameLoop);
  }, [position, velocity, rotation, thrusting, fuel, gameOver, gameWon, showMenu, countdownActive, gamePhase]);

  // Add sound effects for game events
  useEffect(() => {
    if (thrusting) {
      audioManager.playSound(SoundEffect.THRUST);
    } else {
      audioManager.stopSound(SoundEffect.THRUST);
    }
  }, [thrusting]);

  useEffect(() => {
    if (gameOver) {
      audioManager.playSound(SoundEffect.EXPLOSION);
      audioManager.stopSound(SoundEffect.THRUST);
    }
  }, [gameOver]);

  useEffect(() => {
    if (gameWon) {
      audioManager.playSound(SoundEffect.SUCCESS);
      audioManager.stopSound(SoundEffect.THRUST);
    }
  }, [gameWon]);

  useEffect(() => {
    if (fuel < 20) {
      audioManager.playSound(SoundEffect.WARNING);
    } else {
      audioManager.stopSound(SoundEffect.WARNING);
    }
  }, [fuel]);

  return (
    <div className="game-container">
      {showMenu && <StartMenu />}
      {countdownActive && (
        <div className="countdown">
          {countdown}
        </div>
      )}
      <Canvas
        camera={{ position: cameraPosition, fov: 60 }}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        dpr={[1, 2]} // Limit pixel ratio for better performance
      >
        <PerspectiveCamera ref={cameraRef} makeDefault position={cameraPosition} fov={60} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Starfield />
        <Earth position={[0, 0, 0]} scale={EARTH_SCALE} />
        <AtmosphereEffect />
        <Moon position={[30, 20, 0]} scale={[5, 5, 5]} />
        <LandingPad position={[0, 0, 0]} scale={DEFAULT_SCALE} />
        <Rocket 
          position={position} 
          rotation={[0, rotation, 0]}
          scale={[0.5, 0.5, 0.5]}
          thrusting={thrusting}
        />
        <OrbitalPath />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          target={[position[0], position[1], position[2]]}
        />
      </Canvas>
      <GameUI />
      <OrbitGuidance />
      <FeedbackMessage />
      <LandingSequence />
      <MissionStatus />
      <KeyboardController />
      <AudioControls />
      <style jsx>{`
        .countdown {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 72px;
          font-weight: bold;
          color: #00ff00;
          text-shadow: 0 0 10px #00ff00;
          z-index: 100;
          font-family: 'Press Start 2P', monospace;
        }
      `}</style>
    </div>
  );
};

export default Game; 