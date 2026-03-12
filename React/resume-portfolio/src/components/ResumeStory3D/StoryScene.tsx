// @ts-nocheck
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { StoryNode } from "./ResumeStory3D";

interface StorySceneProps {
  nodes: StoryNode[];
  onNodeClick: (node: StoryNode) => void;
  selectedNodeId?: string;
}

const StoryNodeCard: React.FC<{
  node: StoryNode;
  onClick: () => void;
  isSelected: boolean;
}> = ({ node, onClick, isSelected }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    // @ts-ignore
    <group ref={groupRef} position={node.position}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* @ts-ignore */}
        <mesh
          ref={meshRef}
          onClick={onClick}
          onPointerOver={(e) => {
            e.stopPropagation();
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            document.body.style.cursor = "default";
          }}
        >
          {/* @ts-ignore */}
          <boxGeometry args={[2, 2.5, 0.2]} />
          <MeshDistortMaterial
            color={node.color}
            distort={0.3}
            speed={2}
            roughness={0.1}
            metalness={0.8}
            transparent
            opacity={isSelected ? 0.9 : 0.7}
          />
        </mesh>

        {/* Icon */}
        <Text
          position={[0, 0.8, 0.15]}
          fontSize={1.2}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {node.icon}
        </Text>

        {/* Title */}
        <Text
          position={[0, 0.2, 0.15]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.8}
        >
          {node.title}
        </Text>

        {/* Description */}
        <Text
          position={[0, -0.3, 0.15]}
          fontSize={0.15}
          color="rgba(255,255,255,0.8)"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.6}
        >
          {node.description}
        </Text>

        {/* Glow effect */}
        {isSelected && (
          <>
            {/* @ts-ignore */}
            <mesh position={[0, 0, 0.1]}>
              {/* @ts-ignore */}
              <boxGeometry args={[2.2, 2.7, 0.1]} />
              {/* @ts-ignore */}
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={0.5}
                transparent
                opacity={0.3}
              />
            </mesh>
          </>
        )}
      </Float>
    </group>
  );
};

const StoryScene: React.FC<StorySceneProps> = ({
  nodes,
  onNodeClick,
  selectedNodeId,
}) => {
  return (
    <>
      {nodes.map((node) => (
        <StoryNodeCard
          key={node.id}
          node={node}
          onClick={() => onNodeClick(node)}
          isSelected={selectedNodeId === node.id}
        />
      ))}

      {/* Connecting lines - removed for simplicity */}
    </>
  );
};

export default StoryScene;
