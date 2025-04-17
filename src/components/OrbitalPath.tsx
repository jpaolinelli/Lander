import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import useGameState from '../utils/gameState';
import * as THREE from 'three';

const OrbitalPath = () => {
  const {
    position,
    velocity,
    gamePhase,
    gameOver,
    gameWon
  } = useGameState();

  const [points, setPoints] = useState<[number, number, number][]>([]);
  const lineRef = useRef<THREE.Line>(null);

  useEffect(() => {
    if (gameOver || gameWon) {
      setPoints([]);
      return;
    }

    setPoints(prevPoints => {
      const newPoints = [...prevPoints, position];
      if (newPoints.length > 100) {
        return newPoints.slice(-100);
      }
      return newPoints;
    });
  }, [position, gameOver, gameWon]);

  useEffect(() => {
    if (lineRef.current && points.length > 0) {
      const positions = new Float32Array(points.length * 3);
      points.forEach((point, i) => {
        positions[i * 3] = point[0];
        positions[i * 3 + 1] = point[1];
        positions[i * 3 + 2] = point[2];
      });
      lineRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    }
  }, [points]);

  if (points.length < 2) return null;

  return (
    <primitive object={new THREE.Line(
      new THREE.BufferGeometry(),
      new THREE.LineBasicMaterial({ color: '#00ff00', opacity: 0.5, transparent: true })
    )} ref={lineRef} />
  );
};

export default OrbitalPath; 