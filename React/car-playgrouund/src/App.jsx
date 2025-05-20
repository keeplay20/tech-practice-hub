import React, { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

function Model() {
  const gltf = useGLTF("./car_model.glb");
  const wheelsPivotRefs = useRef([]);

  useEffect(() => {
    wheelsPivotRefs.current = [];

    // Collect all wheel meshes first
    const wheelMeshes = [];
    gltf.scene.traverse((child) => {
      if (child.isMesh && child.name.includes("Wheel")) {
        wheelMeshes.push(child);
      }
    });

    // Create pivot for each wheel
    wheelMeshes.forEach((wheel) => {
      const worldPos = wheel.getWorldPosition(new THREE.Vector3());

      const pivot = new THREE.Group();
      pivot.position.copy(worldPos);

      // Add pivot to wheel's current parent
      wheel.parent.add(pivot);

      // Parent wheel under pivot and reset wheel's local position
      pivot.add(wheel);
      wheel.position.set(0, 0, 0);

      wheelsPivotRefs.current.push(pivot);

      // Debug: add small axes helper to each pivot
      const axesHelper = new THREE.AxesHelper(2);
      pivot.add(axesHelper);
    });

    // Debug: add axes helper at car origin
    const carAxesHelper = new THREE.AxesHelper(10);
    gltf.scene.add(carAxesHelper);
  }, [gltf.scene]);

  // Animate wheels' pivots
  useFrame(() => {
    wheelsPivotRefs.current.forEach((pivot) => {
      pivot.rotation.x += 0.1;
    });
  });

  return <primitive object={gltf.scene} scale={50} />;
}

export default function App() {
  return (
    <Canvas
      style={{ width: "100vw", height: "100vh" }}
      camera={{ position: [0, 20, 50], fov: 50 }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[50, 100, 50]} intensity={0.8} />
      <Model />
      <OrbitControls />
    </Canvas>
  );
}
