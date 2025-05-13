import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// Scene setup
const scene = new THREE.Scene();
scene.background = null; // Transparent background for the scene

// Camera setup
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  500
);
camera.position.set(0, 2, 20); // Set the camera further back to fit the model

// Renderer setup with transparent background
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
(document.getElementById("viewer") as HTMLElement).appendChild(
  renderer.domElement
);

// Lights setup
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.5);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 7.5);
scene.add(dirLight);

// GLTFLoader setup
const loader = new GLTFLoader();
loader.load(
  "/car_model.glb", // Ensure this file is located in the public folder
  (gltf) => {
    const model = gltf.scene;

    // Log the original bounding box of the model
    const box = new THREE.Box3().setFromObject(model);
    const size = new THREE.Vector3();
    box.getSize(size);
    console.log("Model size:", size);

    // Scale model (increase size significantly)
    model.scale.set(20, 20, 20); // Increase size further

    // Optional: Center model's rotation to the front
    model.rotation.y = Math.PI;

    // Add the model to the scene
    scene.add(model);

    // Adjust camera to focus on the model's center
    const center = box.getCenter(new THREE.Vector3());
    controls.target.copy(center); // Focus camera on model center
    controls.update();
  },
  (xhr) => {
    // Progress reporting during loading
    const percent = (xhr.loaded / xhr.total) * 100;
    console.log(`📦 Model loading: ${percent.toFixed(2)}%`);
  },
  (error) => {
    // Error handling if model fails to load
    console.error("❌ Failed to load GLB model:", error);
  }
);

// OrbitControls setup
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth controls
controls.enableZoom = true; // Allow zooming

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update(); // Update controls for smooth damping
  renderer.render(scene, camera); // Render the scene from the camera's perspective
}
animate();

// Handle window resizing
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix(); // Update projection matrix when resized
  renderer.setSize(window.innerWidth, window.innerHeight); // Adjust renderer size
});
