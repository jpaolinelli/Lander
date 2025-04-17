import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createPixelatedMaterial } from '../utils/textureLoader';

interface MoonProps {
  position: [number, number, number];
  scale: [number, number, number];
}

const Moon = ({ position, scale }: MoonProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [material, setMaterial] = useState<THREE.Material | null>(null);

  useEffect(() => {
    // Create a pixelated Moon texture with the 'moon' pattern
    const moonMaterial = createPixelatedMaterial('#cccccc', 5, 'moon');
    setMaterial(moonMaterial);
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      // Slowly rotate the Moon
      meshRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      {material ? (
        <primitive object={material} />
      ) : (
        <meshStandardMaterial color="#cccccc" />
      )}
    </mesh>
  );
};

export default Moon; 