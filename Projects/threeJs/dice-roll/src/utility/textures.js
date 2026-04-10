import * as THREE from "three";

// Standard die dot positions (normalized to -1..1 grid)
const DOT_POSITIONS = {
  1: [[0, 0]],
  2: [
    [-1, -1],
    [1, 1],
  ],
  3: [
    [-1, -1],
    [0, 0],
    [1, 1],
  ],
  4: [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ],
  5: [
    [-1, -1],
    [-1, 1],
    [0, 0],
    [1, -1],
    [1, 1],
  ],
  6: [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ],
};

/**
 * Creates a canvas-based texture for one die face.
 *
 * Why canvas instead of image files?
 * - No external assets to manage
 * - Teaches the same concept (you end up with a THREE.Texture)
 * - Easy to tweak colors/sizes programmatically
 *
 * In a real project you might use:
 *   import { useTexture } from '@react-three/drei'
 *   const textures = useTexture(['/face1.png', '/face2.png', ...])
 *
 * @param {number} faceNumber - Die face (1-6)
 * @returns {THREE.CanvasTexture}
 */
export function createFaceTexture(faceNumber) {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  // --- Background ---
  ctx.fillStyle = "#f5f0e8";
  ctx.beginPath();
  ctx.roundRect(0, 0, size, size, 20);
  ctx.fill();

  // --- Border ---
  ctx.strokeStyle = "#d4c9b8";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.roundRect(4, 4, size - 8, size - 8, 18);
  ctx.stroke();

  // --- Dots ---
  const dotRadius = 18;
  const spacing = 52;
  const cx = size / 2;
  const cy = size / 2;

  ctx.fillStyle = "#1a1a2e";
  for (const [dx, dy] of DOT_POSITIONS[faceNumber]) {
    ctx.beginPath();
    ctx.arc(cx + dx * spacing, cy + dy * spacing, dotRadius, 0, Math.PI * 2);
    ctx.fill();
  }

  // --- Convert to Three.js texture ---
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
