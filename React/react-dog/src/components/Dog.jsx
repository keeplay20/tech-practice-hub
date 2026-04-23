import React, { useEffect } from "react";
import { OrbitControls, useGLTF, useTexture } from "@react-three/drei";

const Dog = () => {
  const dog = useGLTF("/models/dog.drc.glb");

  const { nodes } = dog;

  const texture = useTexture({
    normalMap: "/textures/dog_normals.jpg",
  });

  useEffect(() => {
    const body = nodes.DOGSTUDIO_RIGDOG_BODY_msh;

    if (body?.material) {
      const normalMap = texture.normalMap.clone();

      normalMap.flipY = false;
      body.material.normalMap = texture.normalMap;
      body.material.normalScale.set(1, 1);
      body.material.needsUpdate = true;
    }
  }, [nodes, texture]);

  return (
    <>
      <primitive
        object={dog.scene}
        position={[1.6, -4.5, 0.25]}
        scale={8}
        rotation={[0, Math.PI / 5, 0]}
      />
      <ambientLight intensity={1} />
      <directionalLight position={[0, 5, 5]} intensity={10} />
      <OrbitControls />
    </>
  );
};

export default Dog;
