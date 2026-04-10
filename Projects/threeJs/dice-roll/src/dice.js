// -------------------------------------------------------
// FACE-TO-ROTATION MAP
// -------------------------------------------------------
// A standard die: 1 opposite 6, 2 opposite 5, 3 opposite 4.
//
// Three.js boxGeometry face order (material index):
//   0 → +X   (right)
//   1 → -X   (left)
//   2 → +Y   (top)
//   3 → -Y   (bottom)
//   4 → +Z   (front)
//   5 → -Z   (back)
//
// Each entry is the Euler rotation [x, y, z] in radians
// that puts that face number on top (+Y direction).
// Work these out with a real die or test in the scene.

export const FACE_ROTATIONS = {
  1: [0, 0, 0], // default: face 1 already on +Y
  2: [Math.PI / 2, 0, 0], // tilt forward
  3: [0, 0, -Math.PI / 2], // tilt right
  4: [0, 0, Math.PI / 2], // tilt left
  5: [-Math.PI / 2, 0, 0], // tilt backward
  6: [Math.PI, 0, 0], // flip upside down
};

// -------------------------------------------------------
// THREE.JS FACE ORDER → DIE NUMBER
// -------------------------------------------------------
// This maps the 6 material-array slots to die face numbers.
// Slot 0 (+X) gets face 4, slot 1 (-X) gets face 3, etc.
// This must be consistent with FACE_ROTATIONS above.

export const FACE_ORDER = [4, 3, 1, 6, 2, 5];

// -------------------------------------------------------
// ANIMATION CONFIG
// -------------------------------------------------------

export const EXTRA_SPINS = 3; // full rotations added for drama
export const ROLL_DURATION = 1.2; // seconds
