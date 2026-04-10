import { useState, useRef, useCallback, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createFaceTexture } from "../utility/textures";
import { easeOutCubic } from "../utility/easing";
import {
  FACE_ROTATIONS,
  FACE_ORDER,
  EXTRA_SPINS,
  ROLL_DURATION,
} from "../dice";

export default function Die() {
  const meshRef = useRef();

  // --- State (changes on user action → triggers re-render) ---
  const [isRolling, setIsRolling] = useState(false);
  const [currentFace, setCurrentFace] = useState(1);

  // --- Refs (change every frame → must NOT trigger re-render) ---
  // This is the #1 R3F pattern to internalize.
  // If you put animProgress in useState, React would try to
  // re-render 60 times per second and everything would stutter.
  const animProgress = useRef(0);
  const startRotation = useRef([0, 0, 0]);
  const targetRotation = useRef([0, 0, 0]);

  // --- Materials: one per face, memoized ---
  // Three.js lets you pass an array of 6 materials to a box mesh.
  // Each material maps to a face: +X, -X, +Y, -Y, +Z, -Z
  // FACE_ORDER tells us which die number goes on which face.
  const materials = useMemo(() => {
    return FACE_ORDER.map((num) => {
      const texture = createFaceTexture(num);
      return new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.35,
        metalness: 0.0,
      });
    });
  }, []);

  // --- Roll handler ---
  const roll = useCallback(() => {
    if (isRolling) return; // prevent clicks during animation

    // Pick random face 1-6
    const face = Math.floor(Math.random() * 6) + 1;
    setCurrentFace(face);
    setIsRolling(true);

    // Capture current rotation as start point
    const mesh = meshRef.current;
    startRotation.current = [mesh.rotation.x, mesh.rotation.y, mesh.rotation.z];

    // Target = correct face rotation + extra spins for visual flair
    const [tx, ty, tz] = FACE_ROTATIONS[face];
    targetRotation.current = [
      tx + Math.PI * 2 * EXTRA_SPINS,
      ty + Math.PI * 2 * EXTRA_SPINS * 0.7, // different speed per axis
      tz,
    ];

    animProgress.current = 0;
  }, [isRolling]);

  // --- Animation loop (runs every frame ~60fps) ---
  // useFrame is the R3F equivalent of requestAnimationFrame.
  // `delta` is time since last frame in seconds.
  useFrame((_, delta) => {
    if (!isRolling) return;

    const mesh = meshRef.current;
    animProgress.current += delta / ROLL_DURATION;

    if (animProgress.current >= 1) {
      // Done — snap to exact target (no floating point drift)
      const [tx, ty, tz] = FACE_ROTATIONS[currentFace];
      mesh.rotation.set(tx, ty, tz);
      setIsRolling(false);
      return;
    }

    // Interpolate with easing
    const t = easeOutCubic(animProgress.current);
    const [sx, sy, sz] = startRotation.current;
    const [tx, ty, tz] = targetRotation.current;

    mesh.rotation.x = sx + (tx - sx) * t;
    mesh.rotation.y = sy + (ty - sy) * t;
    mesh.rotation.z = sz + (tz - sz) * t;
  });

  return (
    <mesh
      ref={meshRef}
      material={materials}
      onClick={roll}
      castShadow
      position={[0, 0.8, 0]}
      // Cursor change on hover — small UX touch
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "default")}
    >
      <boxGeometry args={[1.5, 1.5, 1.5]} />
    </mesh>
  );
}
