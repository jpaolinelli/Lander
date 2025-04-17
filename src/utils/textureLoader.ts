import * as THREE from 'three';

/**
 * Creates a pixelated material with a retro look
 * @param color Base color for the material
 * @param pixelSize Size of the pixels (higher = more pixelated)
 * @param pattern Type of pattern to apply ('earth', 'moon', 'default')
 * @returns A THREE.MeshStandardMaterial with pixelated texture
 */
export const createPixelatedMaterial = (
  color: string, 
  pixelSize: number = 8, 
  pattern: 'earth' | 'moon' | 'default' = 'default'
): THREE.MeshStandardMaterial => {
  // Create a canvas to generate the texture
  const canvas = document.createElement('canvas');
  const size = 128; // Larger texture size for better detail
  canvas.width = size;
  canvas.height = size;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Could not get canvas context');
  }
  
  // Fill with base color
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, size, size);
  
  // Apply different patterns based on the type
  if (pattern === 'earth') {
    // Create a more detailed Earth texture with continents
    const continentColor = '#2a6d3a'; // Dark green for continents
    
    // Draw continents as simple pixelated shapes
    for (let i = 0; i < size; i += pixelSize) {
      for (let j = 0; j < size; j += pixelSize) {
        // Create a simple continent pattern
        const x = i / size;
        const y = j / size;
        
        // Simple continent pattern based on position
        if (
          (x > 0.2 && x < 0.4 && y > 0.3 && y < 0.7) || // North America
          (x > 0.5 && x < 0.7 && y > 0.2 && y < 0.5) || // Europe/Asia
          (x > 0.6 && x < 0.8 && y > 0.6 && y < 0.8) || // Africa
          (x > 0.1 && x < 0.3 && y > 0.7 && y < 0.9)    // South America
        ) {
          ctx.fillStyle = continentColor;
          ctx.fillRect(i, j, pixelSize, pixelSize);
        }
      }
    }
    
    // Add some ice caps
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < size; i += pixelSize) {
      if (i < size * 0.2 || i > size * 0.8) {
        for (let j = 0; j < size; j += pixelSize) {
          if (Math.random() > 0.7) {
            ctx.fillRect(i, j, pixelSize, pixelSize);
          }
        }
      }
    }
  } else if (pattern === 'moon') {
    // Create a more detailed Moon texture with craters
    const craterColor = '#999999'; // Light gray for craters
    
    // Draw craters as simple pixelated circles
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const radius = Math.random() * 10 + 5;
      
      ctx.fillStyle = craterColor;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
      
      // Add crater rim
      ctx.fillStyle = '#bbbbbb';
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.stroke();
    }
  } else {
    // Default pattern - just add some noise
    for (let i = 0; i < size; i += pixelSize) {
      for (let j = 0; j < size; j += pixelSize) {
        const brightness = 0.8 + Math.random() * 0.4;
        ctx.fillStyle = `rgba(255, 255, 255, ${brightness * 0.1})`;
        ctx.fillRect(i, j, pixelSize, pixelSize);
      }
    }
  }
  
  // Create texture from canvas
  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.needsUpdate = true;
  
  // Create material with the texture
  return new THREE.MeshStandardMaterial({
    map: texture,
    roughness: 0.8,
    metalness: 0.2,
  });
};

/**
 * Loads a texture with pixelated filtering
 * @param url URL of the texture to load
 * @returns A promise that resolves to a THREE.Texture
 */
export const loadPixelatedTexture = (url: string): Promise<THREE.Texture> => {
  return new Promise((resolve, reject) => {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      url,
      (texture) => {
        texture.minFilter = THREE.NearestFilter;
        texture.magFilter = THREE.NearestFilter;
        texture.needsUpdate = true;
        resolve(texture);
      },
      undefined,
      reject
    );
  });
};

/**
 * Creates a simple starfield texture
 * @param width Width of the texture
 * @param height Height of the texture
 * @param starCount Number of stars to generate
 * @returns A THREE.CanvasTexture with stars
 */
export const createStarfieldTexture = (width: number = 512, height: number = 512, starCount: number = 1000): THREE.CanvasTexture => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Could not get canvas context');
  }
  
  // Fill with black background
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, width, height);
  
  // Add stars
  for (let i = 0; i < starCount; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const size = Math.random() * 2 + 1;
    const brightness = Math.random() * 0.5 + 0.5;
    
    ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
    ctx.fillRect(x, y, size, size);
  }
  
  // Create texture from canvas
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  
  return texture;
}; 