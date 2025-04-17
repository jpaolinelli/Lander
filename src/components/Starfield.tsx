import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createStarfieldTexture } from '../utils/textureLoader';

const Starfield = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [material, setMaterial] = useState<THREE.Material | null>(null);

  useEffect(() => {
    // Create a starfield texture
    const starfieldTexture = createStarfieldTexture(1024, 1024, 2000);
    
    // Create material with the texture
    const starfieldMaterial = new THREE.MeshBasicMaterial({
      map: starfieldTexture,
      side: THREE.BackSide,
    });
    
    setMaterial(starfieldMaterial);
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      // Slowly rotate the starfield for a subtle parallax effect
      meshRef.current.rotation.y += 0.0001;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[100, 32, 32]} />
      {material ? (
        <primitive object={material} />
      ) : (
        <meshBasicMaterial color="#000000" />
      )}
    </mesh>
  );
};

export default Starfield; 