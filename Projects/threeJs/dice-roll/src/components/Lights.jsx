export default function Lights() {
  return (
    <>
      {/* Base ambient — fills in shadows so nothing is pure black */}
      <ambientLight intensity={0.4} />

      {/* Main directional — this is your "sun". Casts shadows. */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Accent point light — adds subtle color interest */}
      <pointLight position={[-3, 3, -3]} intensity={0.3} color="#6366f1" />
    </>
  );
}
