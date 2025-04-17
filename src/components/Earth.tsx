import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createPixelatedMaterial } from '../utils/textureLoader';

interface EarthProps {
  position: [number, number, number];
  scale: [number, number, number];
}

const Earth = ({ position, scale }: EarthProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [material, setMaterial] = useState<THREE.Material | null>(null);

  useEffect(() => {
    // Create a pixelated Earth texture with the 'earth' pattern
    const earthMaterial = createPixelatedMaterial('#1a4d8f', 6, 'earth');
    setMaterial(earthMaterial);
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      // Slowly rotate the Earth
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      {material ? (
        <primitive object={material} />
      ) : (
        <meshStandardMaterial color="#1a4d8f" />
      )}
    </mesh>
  );
};

export default Earth; 