import { useRef } from 'react';
import * as THREE from 'three';

interface LandingPadProps {
  position: [number, number, number];
  scale?: [number, number, number];
}

export default function LandingPad({ position, scale = [1, 1, 1] }: LandingPadProps) {
  const padRef = useRef<THREE.Group>(null);

  return (
    <group ref={padRef} position={position} scale={scale}>
      {/* Landing pad base */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[2, 0.1, 0.5]} />
        <meshBasicMaterial color={0x333333} />
      </mesh>

      {/* Landing pad legs */}
      <mesh position={[-0.9, -0.3, 0]}>
        <boxGeometry args={[0.1, 0.5, 0.1]} />
        <meshBasicMaterial color={0x666666} />
      </mesh>
      <mesh position={[0.9, -0.3, 0]}>
        <boxGeometry args={[0.1, 0.5, 0.1]} />
        <meshBasicMaterial color={0x666666} />
      </mesh>

      {/* Landing pad lights */}
      <mesh position={[-0.8, 0, 0.3]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshBasicMaterial color={0x00ff00} />
      </mesh>
      <mesh position={[0.8, 0, 0.3]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshBasicMaterial color={0x00ff00} />
      </mesh>
    </group>
  );
} 