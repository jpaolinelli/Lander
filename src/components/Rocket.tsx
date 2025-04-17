import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface RocketProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: [number, number, number];
  thrusting?: boolean;
}

export default function Rocket({ position, rotation, scale = [1, 1, 1], thrusting = false }: RocketProps) {
  const rocketRef = useRef<THREE.Group>(null);
  const exhaustRef = useRef<THREE.Mesh>(null);

  // Animate exhaust when thrusting
  useFrame((state, delta) => {
    if (exhaustRef.current && thrusting) {
      // Pulse the exhaust size
      const scale = 1 + Math.sin(state.clock.elapsedTime * 10) * 0.1;
      exhaustRef.current.scale.set(scale, scale, scale);
      
      // Add some flickering to the exhaust color
      const flicker = 0.8 + Math.random() * 0.4;
      const color = new THREE.Color(0xff6600);
      color.multiplyScalar(flicker);
      (exhaustRef.current.material as THREE.MeshBasicMaterial).color = color;
    }
  });

  return (
    <group ref={rocketRef} position={position} rotation={rotation} scale={scale}>
      {/* Rocket body */}
      <mesh>
        <cylinderGeometry args={[0.2, 0.2, 1, 8]} />
        <meshBasicMaterial color={0xcccccc} />
      </mesh>

      {/* Rocket nose cone */}
      <mesh position={[0, 0.6, 0]}>
        <coneGeometry args={[0.2, 0.4, 8]} />
        <meshBasicMaterial color={0xff0000} />
      </mesh>

      {/* Rocket fins */}
      <mesh position={[0, -0.6, 0]}>
        <boxGeometry args={[0.6, 0.1, 0.6]} />
        <meshBasicMaterial color={0x666666} />
      </mesh>

      {/* Rocket exhaust */}
      <mesh ref={exhaustRef} position={[0, -0.8, 0]}>
        <cylinderGeometry args={[0.15, 0.3, 0.4, 8]} />
        <meshBasicMaterial color={thrusting ? 0xff6600 : 0x333333} />
      </mesh>
      
      {/* Rocket windows */}
      <mesh position={[0, 0.2, 0.21]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color={0x88ccff} />
      </mesh>
      
      {/* Rocket details */}
      <mesh position={[0, 0, 0.21]}>
        <boxGeometry args={[0.3, 0.1, 0.01]} />
        <meshBasicMaterial color={0x333333} />
      </mesh>
    </group>
  );
} 