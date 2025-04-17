import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const AtmosphereEffect = () => {
  const atmosphereRef = useRef<THREE.Mesh>(null);
  
  // Create atmosphere material
  useEffect(() => {
    if (atmosphereRef.current) {
      const material = atmosphereRef.current.material as THREE.ShaderMaterial;
      
      // Custom shader for the atmosphere glow effect
      material.vertexShader = `
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `;
      
      material.fragmentShader = `
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
        }
      `;
      
      material.transparent = true;
      material.blending = THREE.AdditiveBlending;
      material.side = THREE.BackSide;
    }
  }, []);
  
  // Animate the atmosphere
  useFrame((state) => {
    if (atmosphereRef.current) {
      // Rotate slightly slower than the Earth
      atmosphereRef.current.rotation.y += 0.0001;
    }
  });
  
  return (
    <mesh ref={atmosphereRef} scale={[5.2, 5.2, 5.2]}>
      <sphereGeometry args={[1, 32, 32]} />
      <shaderMaterial />
    </mesh>
  );
};

export default AtmosphereEffect; 