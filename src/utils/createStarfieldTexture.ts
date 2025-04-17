export const createStarfieldTexture = (width: number = 512, height: number = 512): HTMLCanvasElement => {
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
  const numStars = Math.floor(width * height * 0.001); // Adjust density as needed
  ctx.fillStyle = '#FFFFFF';
  
  for (let i = 0; i < numStars; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const size = Math.random() * 2 + 1;
    
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }

  return canvas;
}; 