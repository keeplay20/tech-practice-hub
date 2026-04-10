import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import { Die, Floor, Lights } from "./components";

/**
 * App is the scene composer.
 *
 * Think of Canvas like the <html> of a 3D scene:
 * - It creates the WebGL renderer
 * - It sets up a default scene and camera
 * - Everything inside it is a Three.js object, not DOM
 *
 * The `shadows` prop enables shadow mapping on the renderer.
 * Without it, castShadow/receiveShadow on meshes do nothing.
 */
export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "#12121f" }}>
      <Canvas
        shadows
        camera={{ position: [3, 4, 5], fov: 40 }}
        gl={{ antialias: true }}
      >
        <Lights />
        <Die />
        <Floor />

        {/* Soft shadow blob under the die — cheaper than real shadows */}
        <ContactShadows
          position={[0, -0.49, 0]}
          opacity={0.6}
          scale={10}
          blur={2}
          far={4}
        />

        {/* Camera controls with sensible limits */}
        <OrbitControls
          enablePan={false}
          minDistance={4}
          maxDistance={12}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.5}
        />
      </Canvas>
    </div>
  );
}
