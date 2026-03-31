import React, { useState, useEffect, useRef, useCallback } from "react";
import { createRoot } from "react-dom/client";

const THREE_CDN =
  "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";

function useThree() {
  const [ready, setReady] = useState(!!window.THREE);
  useEffect(() => {
    if (window.THREE) {
      setReady(true);
      return;
    }
    const s = document.createElement("script");
    s.src = THREE_CDN;
    s.onload = () => setReady(true);
    document.head.appendChild(s);
  }, []);
  return ready;
}

const COLORS = {
  "Midnight Black": {
    band: 0x1a1a1a,
    face: 0x111111,
    accent: 0xc9a84c,
    bg: "#1a1a1a",
  },
  "Ocean Blue": {
    band: 0x1a3a5c,
    face: 0x0d2137,
    accent: 0x88ccff,
    bg: "#1a3a5c",
  },
  "Rose Gold": {
    band: 0x8b5e3c,
    face: 0x2a1a0e,
    accent: 0xe8b4b8,
    bg: "#8b5e3c",
  },
  "Arctic Silver": {
    band: 0xb0b0b0,
    face: 0x1a1a2e,
    accent: 0xffffff,
    bg: "#b0b0b0",
  },
  "Forest Green": {
    band: 0x2d4a2d,
    face: 0x0f1f0f,
    accent: 0x7dcc7d,
    bg: "#2d4a2d",
  },
};

const FACES = ["Classic", "Minimal", "Digital"];
const BANDS = ["Leather", "Metal", "Sport"];

export default function ProductConfigurator() {
  const ready = useThree();
  const mountRef = useRef(null);
  const sceneRef = useRef({});
  const [colorName, setColorName] = useState("Midnight Black");
  const [faceStyle, setFaceStyle] = useState("Classic");
  const [bandStyle, setBandStyle] = useState("Leather");
  const [rotating, setRotating] = useState(true);
  const [exploded, setExploded] = useState(false);
  const [zoom, setZoom] = useState(false);

  const buildWatch = useCallback(
    (T, scene) => {
      const c = COLORS[colorName];
      const prev = scene.getObjectByName("watchGroup");
      if (prev) scene.remove(prev);

      const g = new T.Group();
      g.name = "watchGroup";

      // Case (main body)
      const caseMat = new T.MeshStandardMaterial({
        color: 0x888888,
        metalness: 0.9,
        roughness: 0.15,
      });
      const caseGeo = new T.CylinderGeometry(1.5, 1.5, 0.45, 64);
      const watchCase = new T.Mesh(caseGeo, caseMat);
      watchCase.name = "case";
      g.add(watchCase);

      // Bezel ring
      const bezelGeo = new T.TorusGeometry(1.52, 0.06, 16, 64);
      const bezelMat = new T.MeshStandardMaterial({
        color: c.accent,
        metalness: 0.95,
        roughness: 0.1,
      });
      const bezel = new T.Mesh(bezelGeo, bezelMat);
      bezel.rotation.x = Math.PI / 2;
      bezel.position.y = 0.15;
      bezel.name = "bezel";
      g.add(bezel);

      const bezel2 = bezel.clone();
      bezel2.position.y = -0.15;
      g.add(bezel2);

      // Watch face
      const faceGeo = new T.CylinderGeometry(1.35, 1.35, 0.02, 64);
      const faceMat = new T.MeshStandardMaterial({
        color: c.face,
        metalness: 0.3,
        roughness: 0.6,
      });
      const face = new T.Mesh(faceGeo, faceMat);
      face.position.y = 0.24;
      face.name = "face";
      g.add(face);

      // Hour markers
      for (let i = 0; i < 12; i++) {
        const ang = (i / 12) * Math.PI * 2;
        const isMain = i % 3 === 0;
        const len = isMain ? 0.2 : 0.1;
        const w = isMain ? 0.06 : 0.03;
        const markerGeo = new T.BoxGeometry(w, 0.015, len);
        const markerMat = new T.MeshStandardMaterial({
          color: c.accent,
          metalness: 0.8,
          roughness: 0.2,
        });
        const marker = new T.Mesh(markerGeo, markerMat);
        const r = 1.1;
        marker.position.set(Math.sin(ang) * r, 0.255, Math.cos(ang) * r);
        marker.rotation.y = -ang;
        g.add(marker);
      }

      // Hands
      if (faceStyle === "Classic" || faceStyle === "Minimal") {
        const now = new Date();
        const hourAng = ((now.getHours() % 12) / 12) * Math.PI * 2;
        const minAng = (now.getMinutes() / 60) * Math.PI * 2;

        const hourHand = new T.Mesh(
          new T.BoxGeometry(0.06, 0.015, 0.7),
          new T.MeshStandardMaterial({
            color: c.accent,
            metalness: 0.9,
            roughness: 0.1,
          }),
        );
        hourHand.position.set(
          Math.sin(hourAng) * 0.3,
          0.27,
          Math.cos(hourAng) * 0.3,
        );
        hourHand.rotation.y = -hourAng;
        g.add(hourHand);

        const minHand = new T.Mesh(
          new T.BoxGeometry(0.04, 0.012, 0.95),
          new T.MeshStandardMaterial({
            color: 0xffffff,
            metalness: 0.8,
            roughness: 0.15,
          }),
        );
        minHand.position.set(
          Math.sin(minAng) * 0.4,
          0.28,
          Math.cos(minAng) * 0.4,
        );
        minHand.rotation.y = -minAng;
        g.add(minHand);

        // Center pin
        const pin = new T.Mesh(
          new T.CylinderGeometry(0.05, 0.05, 0.06, 16),
          new T.MeshStandardMaterial({
            color: c.accent,
            metalness: 1,
            roughness: 0,
          }),
        );
        pin.position.y = 0.28;
        g.add(pin);
      }

      if (faceStyle === "Digital") {
        const screenGeo = new T.CylinderGeometry(1.0, 1.0, 0.015, 64);
        const screenMat = new T.MeshStandardMaterial({
          color: 0x001a00,
          emissive: 0x003300,
          emissiveIntensity: 0.5,
          metalness: 0.1,
          roughness: 0.8,
        });
        const screen = new T.Mesh(screenGeo, screenMat);
        screen.position.y = 0.255;
        g.add(screen);

        for (let i = 0; i < 4; i++) {
          const dot = new T.Mesh(
            new T.CylinderGeometry(0.03, 0.03, 0.016, 8),
            new T.MeshStandardMaterial({
              color: c.accent,
              emissive: c.accent,
              emissiveIntensity: 0.8,
            }),
          );
          dot.position.set(-0.3 + i * 0.2, 0.265, 0);
          g.add(dot);
        }
      }

      // Crown (button on side)
      const crownGeo = new T.CylinderGeometry(0.12, 0.12, 0.3, 16);
      const crownMat = new T.MeshStandardMaterial({
        color: c.accent,
        metalness: 0.95,
        roughness: 0.05,
      });
      const crown = new T.Mesh(crownGeo, crownMat);
      crown.rotation.z = Math.PI / 2;
      crown.position.set(1.65, 0.05, 0);
      crown.name = "crown";
      g.add(crown);

      // Band — top
      const bandTopGeo = new T.BoxGeometry(
        bandStyle === "Metal" ? 1.1 : 0.9,
        0.15,
        2.5,
      );
      const bandRough =
        bandStyle === "Leather" ? 0.9 : bandStyle === "Sport" ? 0.7 : 0.15;
      const bandMetal = bandStyle === "Metal" ? 0.85 : 0;
      const bandMat = new T.MeshStandardMaterial({
        color: c.band,
        metalness: bandMetal,
        roughness: bandRough,
      });
      const bandTop = new T.Mesh(bandTopGeo, bandMat);
      bandTop.position.set(0, 0, -2.0);
      bandTop.name = "bandTop";
      g.add(bandTop);

      if (bandStyle === "Metal") {
        for (let i = 0; i < 6; i++) {
          const link = new T.Mesh(
            new T.BoxGeometry(1.05, 0.14, 0.02),
            new T.MeshStandardMaterial({
              color: 0x666666,
              metalness: 0.9,
              roughness: 0.2,
            }),
          );
          link.position.set(0, 0, -1.0 - i * 0.4);
          g.add(link);
        }
      }

      // Band — bottom
      const bandBot = new T.Mesh(bandTopGeo, bandMat);
      bandBot.position.set(0, 0, 2.0);
      bandBot.name = "bandBot";
      g.add(bandBot);

      if (bandStyle === "Metal") {
        for (let i = 0; i < 6; i++) {
          const link = new T.Mesh(
            new T.BoxGeometry(1.05, 0.14, 0.02),
            new T.MeshStandardMaterial({
              color: 0x666666,
              metalness: 0.9,
              roughness: 0.2,
            }),
          );
          link.position.set(0, 0, 1.0 + i * 0.4);
          g.add(link);
        }
      }

      // Lugs (connectors between case and band)
      const lugGeo = new T.BoxGeometry(0.15, 0.2, 0.5);
      const lugMat = new T.MeshStandardMaterial({
        color: 0x888888,
        metalness: 0.9,
        roughness: 0.15,
      });
      [
        [-0.55, 0, -1.15],
        [0.55, 0, -1.15],
        [-0.55, 0, 1.15],
        [0.55, 0, 1.15],
      ].forEach((p) => {
        const lug = new T.Mesh(lugGeo, lugMat);
        lug.position.set(...p);
        g.add(lug);
      });

      g.rotation.x = -Math.PI / 6;
      scene.add(g);
      sceneRef.current.watchGroup = g;
    },
    [colorName, faceStyle, bandStyle],
  );

  useEffect(() => {
    if (!ready || !mountRef.current) return;
    const T = window.THREE;
    const w = mountRef.current.clientWidth,
      h = 520;

    const renderer = new T.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = T.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    mountRef.current.innerHTML = "";
    mountRef.current.appendChild(renderer.domElement);

    const scene = new T.Scene();
    scene.background = new T.Color(0x0a0a0f);

    const camera = new T.PerspectiveCamera(40, w / h, 0.1, 100);
    camera.position.set(0, 3, 8);
    camera.lookAt(0, 0, 0);

    // Lighting — 5 lights for premium look
    const amb = new T.AmbientLight(0xffffff, 0.3);
    scene.add(amb);

    const key = new T.DirectionalLight(0xffffff, 1.2);
    key.position.set(5, 8, 5);
    scene.add(key);

    const fill = new T.DirectionalLight(0x8888ff, 0.4);
    fill.position.set(-5, 3, -3);
    scene.add(fill);

    const rim = new T.DirectionalLight(0xffffff, 0.6);
    rim.position.set(0, -2, -5);
    scene.add(rim);

    const accent = new T.PointLight(0xc9a84c, 0.8, 15);
    accent.position.set(3, 2, 3);
    scene.add(accent);

    // Reflective ground plane
    const groundGeo = new T.PlaneGeometry(30, 30);
    const groundMat = new T.MeshStandardMaterial({
      color: 0x0a0a0f,
      metalness: 0.9,
      roughness: 0.4,
    });
    const ground = new T.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -2.5;
    scene.add(ground);

    sceneRef.current = { scene, camera, renderer, T };
    buildWatch(T, scene);

    // Mouse orbit
    let mx = 0,
      my = 0,
      isDrag = false,
      prevX = 0,
      prevY = 0,
      rotY = 0,
      rotX = -0.3;
    const cvs = renderer.domElement;
    cvs.addEventListener("mousedown", (e) => {
      isDrag = true;
      prevX = e.clientX;
      prevY = e.clientY;
    });
    window.addEventListener("mouseup", () => (isDrag = false));
    window.addEventListener("mousemove", (e) => {
      if (!isDrag) return;
      rotY += (e.clientX - prevX) * 0.008;
      rotX += (e.clientY - prevY) * 0.005;
      rotX = Math.max(-1, Math.min(0.5, rotX));
      prevX = e.clientX;
      prevY = e.clientY;
    });
    cvs.addEventListener(
      "touchstart",
      (e) => {
        isDrag = true;
        prevX = e.touches[0].clientX;
        prevY = e.touches[0].clientY;
      },
      { passive: true },
    );
    window.addEventListener("touchend", () => (isDrag = false));
    window.addEventListener(
      "touchmove",
      (e) => {
        if (!isDrag || !e.touches[0]) return;
        rotY += (e.touches[0].clientX - prevX) * 0.008;
        rotX += (e.touches[0].clientY - prevY) * 0.005;
        rotX = Math.max(-1, Math.min(0.5, rotX));
        prevX = e.touches[0].clientX;
        prevY = e.touches[0].clientY;
      },
      { passive: true },
    );

    let raf;
    const clock = new T.Clock();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const wg = sceneRef.current.watchGroup;
      if (wg) {
        if (sceneRef.current.rotating) rotY += 0.005;
        wg.rotation.y = rotY;
        wg.rotation.x = -Math.PI / 6 + rotX;
        // Exploded view
        const tgt = sceneRef.current.exploded ? 1 : 0;
        wg.children.forEach((c) => {
          if (c.name === "bandTop")
            c.position.z += (-2 - tgt * 1.5 - c.position.z) * 0.08;
          if (c.name === "bandBot")
            c.position.z += (2 + tgt * 1.5 - c.position.z) * 0.08;
          if (c.name === "face")
            c.position.y += (0.24 + tgt * 0.6 - c.position.y) * 0.08;
          if (c.name === "bezel")
            c.position.y += (0.15 + tgt * 0.4 - c.position.y) * 0.08;
          if (c.name === "crown")
            c.position.x += (1.65 + tgt * 0.5 - c.position.x) * 0.08;
        });
        // Zoom
        const zDist = sceneRef.current.zoom ? 5 : 8;
        camera.position.z += (zDist - camera.position.z) * 0.05;
        // Floating animation
        wg.position.y = Math.sin(t * 0.8) * 0.15;
      }
      accent.position.x = Math.sin(t * 0.5) * 4;
      accent.position.z = Math.cos(t * 0.5) * 4;
      renderer.render(scene, camera);
    };
    animate();
    return () => {
      cancelAnimationFrame(raf);
      renderer.dispose();
    };
  }, [ready]);

  useEffect(() => {
    if (!sceneRef.current.scene) return;
    buildWatch(sceneRef.current.T, sceneRef.current.scene);
  }, [colorName, faceStyle, bandStyle, buildWatch]);

  useEffect(() => {
    sceneRef.current.rotating = rotating;
  }, [rotating]);
  useEffect(() => {
    sceneRef.current.exploded = exploded;
  }, [exploded]);
  useEffect(() => {
    sceneRef.current.zoom = zoom;
  }, [zoom]);

  if (!ready)
    return (
      <div
        style={{
          background: "#0a0a0f",
          color: "#555",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui",
        }}
      >
        Loading...
      </div>
    );

  return (
    <div
      style={{
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
        background: "#0a0a0f",
        color: "#e0e0e0",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "24px 28px 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 11,
              letterSpacing: 3,
              color: "#666",
              textTransform: "uppercase",
            }}
          >
            Configure your
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 300,
              color: "#fff",
              letterSpacing: -0.5,
            }}
          >
            Chronos<span style={{ color: "#c9a84c" }}>.</span> Pro
          </div>
        </div>
        <div style={{ fontSize: 11, color: "#666", textAlign: "right" }}>
          <div style={{ color: "#c9a84c", fontSize: 20, fontWeight: 300 }}>
            $2,499
          </div>
          <div>Starting price</div>
        </div>
      </div>

      {/* 3D viewport */}
      <div
        ref={mountRef}
        style={{
          width: "100%",
          height: 520,
          cursor: "grab",
          touchAction: "none",
        }}
      />

      {/* View controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 8,
          margin: "-12px 0 16px",
        }}
      >
        {[
          {
            label: rotating ? "Pause" : "Rotate",
            fn: () => setRotating(!rotating),
          },
          {
            label: exploded ? "Assemble" : "Explode",
            fn: () => setExploded(!exploded),
          },
          { label: zoom ? "Zoom out" : "Zoom in", fn: () => setZoom(!zoom) },
        ].map((b, i) => (
          <button
            key={i}
            onClick={b.fn}
            style={{
              padding: "8px 18px",
              fontSize: 11,
              letterSpacing: 1,
              textTransform: "uppercase",
              background: "transparent",
              border: "1px solid #333",
              color: "#aaa",
              borderRadius: 4,
              cursor: "pointer",
              transition: "all .2s",
            }}
          >
            {b.label}
          </button>
        ))}
      </div>

      {/* Configurator panel */}
      <div style={{ padding: "0 28px 32px" }}>
        {/* Color */}
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: 2,
              color: "#666",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Color — {colorName}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {Object.entries(COLORS).map(([name, c]) => (
              <div
                key={name}
                onClick={() => setColorName(name)}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: c.bg,
                  cursor: "pointer",
                  border:
                    name === colorName ? "2px solid #c9a84c" : "2px solid #333",
                  transition: "all .2s",
                  transform: name === colorName ? "scale(1.15)" : "scale(1)",
                }}
                title={name}
              />
            ))}
          </div>
        </div>

        {/* Face style */}
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: 2,
              color: "#666",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Watch face
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {FACES.map((f) => (
              <button
                key={f}
                onClick={() => setFaceStyle(f)}
                style={{
                  padding: "10px 24px",
                  fontSize: 12,
                  background: f === faceStyle ? "#c9a84c" : "transparent",
                  color: f === faceStyle ? "#000" : "#888",
                  border: f === faceStyle ? "none" : "1px solid #333",
                  borderRadius: 4,
                  cursor: "pointer",
                  fontWeight: f === faceStyle ? 600 : 400,
                  transition: "all .2s",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Band */}
        <div style={{ marginBottom: 28 }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: 2,
              color: "#666",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Band type
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {BANDS.map((b) => (
              <button
                key={b}
                onClick={() => setBandStyle(b)}
                style={{
                  padding: "10px 24px",
                  fontSize: 12,
                  background: b === bandStyle ? "#c9a84c" : "transparent",
                  color: b === bandStyle ? "#000" : "#888",
                  border: b === bandStyle ? "none" : "1px solid #333",
                  borderRadius: 4,
                  cursor: "pointer",
                  fontWeight: b === bandStyle ? 600 : 400,
                  transition: "all .2s",
                }}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button
          style={{
            width: "100%",
            padding: "16px",
            fontSize: 13,
            letterSpacing: 2,
            textTransform: "uppercase",
            background: "#c9a84c",
            color: "#000",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
            fontWeight: 600,
            transition: "all .2s",
          }}
        >
          Add to bag — ${(2499).toLocaleString()}
        </button>
      </div>
    </div>
  );
}

const appEl = document.getElementById("app");
if (appEl) {
  createRoot(appEl).render(<ProductConfigurator />);
}
