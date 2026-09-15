"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Eye, Shield, Activity, RefreshCw, Layers, Zap, Compass } from "lucide-react";
import { sound } from "@/lib/sound";

export type GeometryStyle = "icosahedron" | "torusKnot" | "tesseract" | "helix" | "octahedron";
export type ShadingMode = "crystal" | "wireframe" | "synapse";

interface SatelliteNode {
  id: string;
  name: string;
  category: string;
  color: string;
  radius: number;
  speed: number;
  inclination: number;
  phase: number;
  mesh?: THREE.Mesh;
}

const SATELLITE_DATA: SatelliteNode[] = [
  { id: "langgraph", name: "LangGraph", category: "Multi-Agent", color: "#9ed8ff", radius: 4.8, speed: 0.018, inclination: 0.35, phase: 0.0 },
  { id: "yolov8", name: "YOLOv8", category: "Computer Vision", color: "#cfae6e", radius: 5.4, speed: -0.014, inclination: -0.45, phase: 1.1 },
  { id: "chromadb", name: "ChromaDB", category: "Vector RAG", color: "#a78bfa", radius: 6.0, speed: 0.012, inclination: 0.7, phase: 2.3 },
  { id: "fastapi", name: "FastAPI", category: "Async Backend", color: "#34d399", radius: 4.5, speed: -0.02, inclination: -0.2, phase: 3.4 },
  { id: "n8n", name: "n8n", category: "Workflows", color: "#f472b6", radius: 5.8, speed: 0.016, inclination: 0.55, phase: 4.5 },
  { id: "groq", name: "Groq LPU", category: "Ultra-Fast LLM", color: "#fb923c", radius: 5.1, speed: -0.015, inclination: -0.6, phase: 5.2 },
  { id: "pytorch", name: "PyTorch", category: "Deep Learning", color: "#f87171", radius: 6.3, speed: 0.011, inclination: 0.25, phase: 6.0 },
];

export function QuantumCore3DWebGL() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeGeometry, setActiveGeometry] = useState<GeometryStyle>("icosahedron");
  const [activeShading, setActiveShading] = useState<ShadingMode>("crystal");
  const [hoveredNode, setHoveredNode] = useState<SatelliteNode | null>(null);
  const [nodeScreenPos, setNodeScreenPos] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const [fps, setFps] = useState(60);

  // References to THREE objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const coreGroupRef = useRef<THREE.Group | null>(null);
  const innerMeshRef = useRef<THREE.Mesh | null>(null);
  const outerCageRef = useRef<THREE.LineSegments | null>(null);
  const ringsGroupRef = useRef<THREE.Group | null>(null);
  const satellitesGroupRef = useRef<THREE.Group | null>(null);
  const shockwaveMeshRef = useRef<THREE.Mesh | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);

  // Interaction tracking refs
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const dragStart = useRef({ x: 0, y: 0 });
  const rotationOffset = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isPointerDown = useRef(false);
  const isVisibleRef = useRef(true);
  const pulseStartTimeRef = useRef<number | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const frameCountRef = useRef(0);
  const lastFpsCheckRef = useRef(performance.now());

  // Build Geometry Generator
  const createCoreGeometry = useCallback((type: GeometryStyle) => {
    switch (type) {
      case "torusKnot":
        return {
          inner: new THREE.TorusKnotGeometry(1.4, 0.42, 100, 16, 2, 3),
          outer: new THREE.TorusKnotGeometry(1.6, 0.48, 64, 12, 2, 3),
        };
      case "octahedron":
        return {
          inner: new THREE.OctahedronGeometry(2.0, 1),
          outer: new THREE.OctahedronGeometry(2.4, 0),
        };
      case "tesseract": {
        // Compound geometry representing 4D hypercube projection
        const inner = new THREE.BoxGeometry(1.8, 1.8, 1.8);
        const outer = new THREE.BoxGeometry(2.8, 2.8, 2.8);
        return { inner, outer };
      }
      case "helix": {
        // Double helix curve geometry
        const pointsA: THREE.Vector3[] = [];
        const turns = 3;
        const count = 90;
        for (let i = 0; i <= count; i++) {
          const t = (i / count) * Math.PI * 2 * turns;
          const y = (i / count - 0.5) * 4.2;
          const r = 1.4;
          pointsA.push(new THREE.Vector3(Math.cos(t) * r, y, Math.sin(t) * r));
        }
        const curve = new THREE.CatmullRomCurve3(pointsA);
        const inner = new THREE.TubeGeometry(curve, 70, 0.22, 8, false);
        const outer = new THREE.IcosahedronGeometry(2.5, 0);
        return { inner, outer };
      }
      case "icosahedron":
      default:
        return {
          inner: new THREE.IcosahedronGeometry(1.9, 1),
          outer: new THREE.IcosahedronGeometry(2.4, 0),
        };
    }
  }, []);

  // Update Core Meshes when geometry or shading changes
  const updateCoreMeshes = useCallback((type: GeometryStyle, shading: ShadingMode) => {
    if (!coreGroupRef.current) return;

    // Remove existing meshes
    if (innerMeshRef.current) {
      coreGroupRef.current.remove(innerMeshRef.current);
      innerMeshRef.current.geometry.dispose();
      (innerMeshRef.current.material as THREE.Material).dispose();
      innerMeshRef.current = null;
    }
    if (outerCageRef.current) {
      coreGroupRef.current.remove(outerCageRef.current);
      outerCageRef.current.geometry.dispose();
      (outerCageRef.current.material as THREE.Material).dispose();
      outerCageRef.current = null;
    }

    const { inner, outer } = createCoreGeometry(type);

    let innerMat: THREE.Material;
    if (shading === "wireframe") {
      innerMat = new THREE.MeshBasicMaterial({
        color: 0x9ed8ff,
        wireframe: true,
        transparent: true,
        opacity: 0.65,
      });
    } else if (shading === "synapse") {
      innerMat = new THREE.MeshStandardMaterial({
        color: 0x0a1220,
        emissive: 0x224477,
        emissiveIntensity: 0.8,
        roughness: 0.3,
        metalness: 0.85,
        wireframe: false,
      });
    } else {
      // Crystal Shading
      innerMat = new THREE.MeshPhysicalMaterial({
        color: 0x11283c,
        emissive: 0x9ed8ff,
        emissiveIntensity: 0.35,
        roughness: 0.15,
        metalness: 0.8,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        transparent: true,
        opacity: 0.85,
      });
    }

    const innerMesh = new THREE.Mesh(inner, innerMat);
    innerMeshRef.current = innerMesh;
    coreGroupRef.current.add(innerMesh);

    // Outer Cage Lines
    const wireGeo = new THREE.WireframeGeometry(outer);
    const wireMat = new THREE.LineBasicMaterial({
      color: shading === "crystal" ? 0xcfae6e : 0x9ed8ff,
      transparent: true,
      opacity: shading === "wireframe" ? 0.9 : 0.45,
      linewidth: 1,
    });
    const outerCage = new THREE.LineSegments(wireGeo, wireMat);
    outerCageRef.current = outerCage;
    coreGroupRef.current.add(outerCage);
  }, [createCoreGeometry]);

  // Main Three.js Setup & Animation Lifecycle
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera setup
    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
    camera.position.set(0, 0, 15);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    rendererRef.current = renderer;

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0x223344, 1.8);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x9ed8ff, 4.5, 30);
    cyanLight.position.set(6, 6, 8);
    scene.add(cyanLight);

    const goldLight = new THREE.PointLight(0xcfae6e, 3.8, 30);
    goldLight.position.set(-7, -5, 6);
    scene.add(goldLight);

    const backLight = new THREE.PointLight(0x8a63d2, 2.5, 25);
    backLight.position.set(0, 7, -8);
    scene.add(backLight);

    // 5. Core Group
    const coreGroup = new THREE.Group();
    coreGroupRef.current = coreGroup;
    scene.add(coreGroup);

    // 6. Orbital Energy Rings (3 Counter-rotating rings)
    const ringsGroup = new THREE.Group();
    ringsGroupRef.current = ringsGroup;
    scene.add(ringsGroup);

    const ringConfigs = [
      { radius: 3.5, tube: 0.02, color: 0x9ed8ff, rotX: 1.1, rotY: 0.3 },
      { radius: 4.2, tube: 0.022, color: 0xcfae6e, rotX: -0.8, rotY: 0.9 },
      { radius: 4.9, tube: 0.018, color: 0xa78bfa, rotX: 0.4, rotY: -1.2 },
    ];

    ringConfigs.forEach((cfg) => {
      const ringGeo = new THREE.TorusGeometry(cfg.radius, cfg.tube, 16, 120);
      const ringMat = new THREE.MeshBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: 0.6,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = cfg.rotX;
      ringMesh.rotation.y = cfg.rotY;
      ringsGroup.add(ringMesh);
    });

    // 7. Orbiting Satellites
    const satellitesGroup = new THREE.Group();
    satellitesGroupRef.current = satellitesGroup;
    scene.add(satellitesGroup);

    SATELLITE_DATA.forEach((sat) => {
      const satGeo = new THREE.SphereGeometry(0.18, 20, 20);
      const satMat = new THREE.MeshStandardMaterial({
        color: sat.color,
        emissive: sat.color,
        emissiveIntensity: 0.8,
        metalness: 0.4,
        roughness: 0.2,
      });
      const satMesh = new THREE.Mesh(satGeo, satMat);
      satMesh.userData = sat;
      sat.mesh = satMesh;
      satellitesGroup.add(satMesh);
    });

    // 8. Shockwave Pulse Mesh (Expands on Energy Pulse trigger)
    const shockGeo = new THREE.RingGeometry(0.1, 0.25, 64);
    const shockMat = new THREE.MeshBasicMaterial({
      color: 0x9ed8ff,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    });
    const shockMesh = new THREE.Mesh(shockGeo, shockMat);
    shockwaveMeshRef.current = shockMesh;
    scene.add(shockMesh);

    // 9. 3D Stellar Nebula Field (350+ Star particles)
    const particleCount = 380;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(0x9ed8ff);
    const c2 = new THREE.Color(0xcfae6e);
    const c3 = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount; i++) {
      const radius = 7 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);

      const chosenColor = Math.random() > 0.6 ? c1 : Math.random() > 0.3 ? c2 : c3;
      particleColors[i * 3] = chosenColor.r;
      particleColors[i * 3 + 1] = chosenColor.g;
      particleColors[i * 3 + 2] = chosenColor.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    particlesRef.current = particles;
    scene.add(particles);

    // Initialize core meshes
    updateCoreMeshes(activeGeometry, activeShading);

    // 10. Viewport Intersection Observer (Performance Optimization)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // 11. Render Loop
    let lastTime = performance.now();
    const animate = (time: number) => {
      animationFrameId.current = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return;

      const delta = (time - lastTime) * 0.001;
      lastTime = time;

      // FPS tracking
      frameCountRef.current++;
      if (time - lastFpsCheckRef.current >= 1000) {
        setFps(Math.round((frameCountRef.current * 1000) / (time - lastFpsCheckRef.current)));
        frameCountRef.current = 0;
        lastFpsCheckRef.current = time;
      }

      // Smooth mouse parallax interpolation
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.08;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.08;

      // Smooth drag rotation interpolation
      rotationOffset.current.x += (rotationOffset.current.targetX - rotationOffset.current.x) * 0.1;
      rotationOffset.current.y += (rotationOffset.current.targetY - rotationOffset.current.y) * 0.1;

      // Rotate Core Group
      if (coreGroupRef.current) {
        coreGroupRef.current.rotation.y += 0.008 + (isPulsing ? 0.03 : 0);
        coreGroupRef.current.rotation.x = rotationOffset.current.y + mousePos.current.y * 0.25;
        coreGroupRef.current.rotation.z = rotationOffset.current.x + mousePos.current.x * 0.25;
      }

      // Counter-rotate Rings
      if (ringsGroupRef.current) {
        ringsGroupRef.current.children.forEach((ring, idx) => {
          const dir = idx % 2 === 0 ? 1 : -1;
          ring.rotation.z += 0.012 * dir * (idx + 1);
        });
      }

      // Update Satellite Positions in true 3D elliptical orbits
      SATELLITE_DATA.forEach((sat) => {
        if (sat.mesh) {
          sat.phase += sat.speed * (isPulsing ? 2.5 : 1);
          const x = Math.cos(sat.phase) * sat.radius;
          const z = Math.sin(sat.phase) * sat.radius;
          const y = Math.sin(sat.phase * 1.5) * Math.sin(sat.inclination) * sat.radius * 0.65;
          sat.mesh.position.set(x, y, z);

          // Rotate satellite itself
          sat.mesh.rotation.y += 0.02;
        }
      });

      // Update Shockwave Pulse
      if (pulseStartTimeRef.current !== null && shockwaveMeshRef.current) {
        const elapsed = (time - pulseStartTimeRef.current) / 1000;
        const duration = 1.6;
        if (elapsed < duration) {
          const progress = elapsed / duration;
          const scale = 1 + progress * 24;
          shockwaveMeshRef.current.scale.set(scale, scale, scale);
          (shockwaveMeshRef.current.material as THREE.MeshBasicMaterial).opacity = (1 - progress) * 0.8;
          shockwaveMeshRef.current.rotation.z += 0.04;
        } else {
          pulseStartTimeRef.current = null;
          (shockwaveMeshRef.current.material as THREE.MeshBasicMaterial).opacity = 0;
          setIsPulsing(false);
        }
      }

      // Slowly rotate stellar particles
      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.0006;
        particlesRef.current.rotation.x += 0.0003;
      }

      // Render scene
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animationFrameId.current = requestAnimationFrame(animate);

    // 12. Handle Resize
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      if (rendererRef.current) rendererRef.current.dispose();
    };
  }, [updateCoreMeshes, isPulsing, activeGeometry, activeShading]);

  // Handle Geometry Switcher
  const handleGeometryChange = (geom: GeometryStyle) => {
    setActiveGeometry(geom);
    updateCoreMeshes(geom, activeShading);
    sound.playHover();
  };

  // Handle Shading Switcher
  const handleShadingChange = (shading: ShadingMode) => {
    setActiveShading(shading);
    updateCoreMeshes(activeGeometry, shading);
    sound.playClick();
  };

  // Trigger 3D Energy Shockwave Pulse
  const triggerPulse = () => {
    setIsPulsing(true);
    pulseStartTimeRef.current = performance.now();
    sound.playSuccess();
  };

  // Mouse Interaction: Drag to Rotate 360°
  const handlePointerDown = (e: React.PointerEvent) => {
    isPointerDown.current = true;
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    // Normalized parallax coordinates (-1 to 1)
    const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    mousePos.current.targetX = normX;
    mousePos.current.targetY = normY;

    if (isPointerDown.current) {
      const deltaX = (e.clientX - dragStart.current.x) * 0.008;
      const deltaY = (e.clientY - dragStart.current.y) * 0.008;
      rotationOffset.current.targetX += deltaX;
      rotationOffset.current.targetY += deltaY;
      dragStart.current = { x: e.clientX, y: e.clientY };
    }

    // Raycast check for hover on satellites
    if (cameraRef.current && sceneRef.current) {
      const raycaster = new THREE.Raycaster();
      const mouseVec = new THREE.Vector2(normX, normY);
      raycaster.setFromCamera(mouseVec, cameraRef.current);

      const satelliteMeshes = SATELLITE_DATA.map((s) => s.mesh).filter(Boolean) as THREE.Mesh[];
      const intersects = raycaster.intersectObjects(satelliteMeshes);

      if (intersects.length > 0) {
        const hit = intersects[0].object.userData as SatelliteNode;
        if (hoveredNode?.id !== hit.id) {
          setHoveredNode(hit);
          sound.playHover();
        }
        setNodeScreenPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      } else if (hoveredNode) {
        setHoveredNode(null);
        setNodeScreenPos(null);
      }
    }
  };

  const handlePointerUp = () => {
    isPointerDown.current = false;
    setIsDragging(false);
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className="relative w-full aspect-square max-w-[460px] sm:max-w-[500px] lg:max-w-[540px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing touch-none"
    >
      {/* 3D WebGL Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block rounded-2xl" />

      {/* Futuristic HUD Top Overlay */}
      <div className="absolute top-3 left-4 right-4 flex items-center justify-between pointer-events-none text-[10px] font-mono tracking-wider">
        <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-white/80">
          <span className="w-1.5 h-1.5 rounded-full bg-[#9ed8ff] animate-pulse" />
          <span className="text-[#9ed8ff] font-semibold">WEBGL 3D</span>
          <span className="text-white/40">|</span>
          <span className="text-[#cfae6e]">{fps} FPS</span>
        </div>

        <div className="flex items-center gap-1.5 pointer-events-auto">
          <button
            onClick={triggerPulse}
            title="Expand 3D Quantum Energy Pulse"
            className="flex items-center gap-1.5 bg-[#9ed8ff]/10 hover:bg-[#9ed8ff]/25 border border-[#9ed8ff]/30 text-[#9ed8ff] px-2.5 py-1 rounded-full transition-all text-[10px] font-mono shadow-[0_0_12px_rgba(158,216,255,0.2)] hover:shadow-[0_0_18px_rgba(158,216,255,0.4)]"
          >
            <Zap className="w-3 h-3" />
            <span>PULSE</span>
          </button>
        </div>
      </div>

      {/* 3D Geometry Selector Dock */}
      <div className="absolute bottom-3 left-4 right-4 flex flex-col items-center gap-2 pointer-events-none">
        <div className="flex items-center justify-center gap-1.5 bg-black/75 backdrop-blur-md px-2.5 py-1.5 rounded-2xl border border-white/10 pointer-events-auto shadow-2xl">
          {(
            [
              { id: "icosahedron", label: "Seed", icon: Sparkles },
              { id: "torusKnot", label: "Nexus", icon: Activity },
              { id: "tesseract", label: "4D Cube", icon: Layers },
              { id: "helix", label: "Helix", icon: Compass },
              { id: "octahedron", label: "Prism", icon: Shield },
            ] as const
          ).map((g) => {
            const Icon = g.icon;
            const isActive = activeGeometry === g.id;
            return (
              <button
                key={g.id}
                onClick={() => handleGeometryChange(g.id)}
                className={`flex items-center gap-1 px-2 py-1 rounded-xl text-[10px] font-mono font-medium transition-all ${
                  isActive
                    ? "bg-[#9ed8ff]/20 text-[#9ed8ff] border border-[#9ed8ff]/40 shadow-[0_0_10px_rgba(158,216,255,0.25)]"
                    : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <Icon className="w-3 h-3" />
                <span className="hidden sm:inline">{g.label}</span>
              </button>
            );
          })}

          <div className="w-[1px] h-3.5 bg-white/20 mx-1" />

          {/* Shading Style Toggle */}
          <button
            onClick={() => {
              const modes: ShadingMode[] = ["crystal", "wireframe", "synapse"];
              const next = modes[(modes.indexOf(activeShading) + 1) % modes.length];
              handleShadingChange(next);
            }}
            title="Toggle Material: Crystal / Wireframe / Synapse"
            className="flex items-center gap-1 px-2 py-1 rounded-xl text-[10px] font-mono bg-white/[0.04] hover:bg-white/[0.08] text-[#cfae6e] border border-[#cfae6e]/30 transition-colors"
          >
            <Eye className="w-3 h-3" />
            <span className="capitalize">{activeShading}</span>
          </button>
        </div>

        {/* Drag Hint */}
        <div className="text-[9px] font-mono text-white/40 tracking-wider">
          {isDragging ? "ORBITING 360° SPATIAL CAMERA" : "DRAG TO ROTATE 360° · HOVER SATELLITES"}
        </div>
      </div>

      {/* Floating Tooltip for Hovered AI Satellite Node */}
      <AnimatePresence>
        {hoveredNode && nodeScreenPos && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "absolute",
              left: Math.min(Math.max(nodeScreenPos.x, 70), 380),
              top: Math.min(Math.max(nodeScreenPos.y - 45, 15), 450),
              pointerEvents: "none",
            }}
            className="z-30 flex items-center gap-2 bg-black/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#9ed8ff]/40 shadow-[0_0_20px_rgba(158,216,255,0.3)]"
          >
            <span
              className="w-2 h-2 rounded-full animate-ping"
              style={{ backgroundColor: hoveredNode.color }}
            />
            <div>
              <div className="text-[11px] font-mono font-bold text-white tracking-wide">
                {hoveredNode.name}
              </div>
              <div className="text-[9px] font-mono text-[#cfae6e]">
                {hoveredNode.category}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
