import React, { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import StoryScene from "./StoryScene";
import StoryUI from "./StoryUI";
import "./ResumeStory3D.css";

export interface StoryNode {
  id: string;
  title: string;
  description: string;
  type: "project" | "skill" | "experience" | "contact";
  position: [number, number, number];
  color: string;
  icon: string;
  details?: any;
}

const ResumeStory3D: React.FC = () => {
  const [currentNode, setCurrentNode] = useState<StoryNode | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const storyNodes: StoryNode[] = [
    {
      id: "start",
      title: "Welcome",
      description: "My Journey as a Developer",
      type: "experience",
      position: [0, 0, 0],
      color: "#667eea",
      icon: "👋",
    },
    {
      id: "moviebuzz",
      title: "MovieBuzz",
      description: "React Native Movie Discovery App",
      type: "project",
      position: [-3, 2, -2],
      color: "#60a5fa",
      icon: "🎬",
      details: {
        technologies: ["React Native", "TypeScript", "TMDB API"],
        link: "https://expo.dev/accounts/mandarvyas/projects/movie-buzz-app",
      },
    },
    {
      id: "sudoku",
      title: "Sudoku Game",
      description: "Create & Solve Puzzle Game",
      type: "project",
      position: [3, 2, -2],
      color: "#a78bfa",
      icon: "🧩",
      details: {
        technologies: ["React Native", "TypeScript", "Expo"],
        link: "https://expo.dev/accounts/mandarvyas/projects/sudoku",
      },
    },
    {
      id: "skills",
      title: "Skills",
      description: "React Native, TypeScript, React",
      type: "skill",
      position: [0, 3, -3],
      color: "#f472b6",
      icon: "⚡",
      details: {
        skills: ["React Native", "TypeScript", "React", "JavaScript", "CSS"],
      },
    },
    {
      id: "contact",
      title: "Let's Connect",
      description: "Start a conversation",
      type: "contact",
      position: [0, -2, -1],
      color: "#34d399",
      icon: "📧",
    },
  ];

  const handleNodeClick = (node: StoryNode) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentNode(node);
      setIsTransitioning(false);
    }, 300);
  };

  const handleClose = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentNode(null);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className="resume-story-3d">
      <Canvas shadows>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={50} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
          <pointLight position={[-5, 5, -5]} intensity={0.5} color="#667eea" />
          
          <StoryScene
            nodes={storyNodes}
            onNodeClick={handleNodeClick}
            selectedNodeId={currentNode?.id}
          />
          
          <OrbitControls
            enablePan={false}
            minDistance={5}
            maxDistance={15}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>

      <StoryUI
        currentNode={currentNode}
        onClose={handleClose}
        isTransitioning={isTransitioning}
      />

      <div className="story-instructions">
        <p>🖱️ Click on the floating cards to explore</p>
        <p>🔄 Drag to rotate • Scroll to zoom</p>
      </div>
    </div>
  );
};

export default ResumeStory3D;
