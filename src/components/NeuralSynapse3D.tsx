"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface SynapseNode3D {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  color: THREE.Color;
}

export function NeuralSynapse3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;

    // 1. Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 180;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // 2. Create 3D Nodes
    const NODE_COUNT = 120;
    const CONNECT_DIST = 38;
    const BOUNDS = { x: 140, y: 90, z: 80 };

    const nodes: SynapseNode3D[] = [];
    const positions = new Float32Array(NODE_COUNT * 3);
    const colors = new Float32Array(NODE_COUNT * 3);

    const cyanColor = new THREE.Color(0x9ed8ff);
    const goldColor = new THREE.Color(0xcfae6e);

    for (let i = 0; i < NODE_COUNT; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * BOUNDS.x * 2,
        (Math.random() - 0.5) * BOUNDS.y * 2,
        (Math.random() - 0.5) * BOUNDS.z * 2
      );
      const vel = new THREE.Vector3(
        (Math.random() - 0.5) * 0.18,
        (Math.random() - 0.5) * 0.18,
        (Math.random() - 0.5) * 0.12
      );
      const isGold = Math.random() > 0.75;
      const col = isGold ? goldColor : cyanColor;

      nodes.push({ position: pos, velocity: vel, color: col });

      positions[i * 3] = pos.x;
      positions[i * 3 + 1] = pos.y;
      positions[i * 3 + 2] = pos.z;

      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    // Points (Nodes)
    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    pointsGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const pointsMat = new THREE.PointsMaterial({
      size: 2.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const pointsMesh = new THREE.Points(pointsGeo, pointsMat);
    scene.add(pointsMesh);

    // Dynamic Connections (Lines)
    const maxLines = (NODE_COUNT * (NODE_COUNT - 1)) / 2;
    const linePositions = new Float32Array(maxLines * 6);
    const lineColors = new Float32Array(maxLines * 6);

    const linesGeo = new THREE.BufferGeometry();
    linesGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage));
    linesGeo.setAttribute("color", new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage));

    const linesMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const linesMesh = new THREE.LineSegments(linesGeo, linesMat);
    scene.add(linesMesh);

    // Mouse & Scroll Parallax Tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let scrollY = 0;
    let targetScrollY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY || window.pageYOffset;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Handle Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Render loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Smooth camera interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;
      scrollY += (targetScrollY - scrollY) * 0.05;

      camera.position.x = mouse.x * 25;
      camera.position.y = mouse.y * 20 - (scrollY * 0.04);
      camera.lookAt(0, -scrollY * 0.04, 0);

      // Update node positions
      const posAttr = pointsGeo.attributes.position as THREE.BufferAttribute;
      const posArr = posAttr.array as Float32Array;

      let lineVertexIndex = 0;
      let lineCount = 0;

      for (let i = 0; i < NODE_COUNT; i++) {
        const node = nodes[i];
        node.position.add(node.velocity);

        // Bounds bounce
        if (Math.abs(node.position.x) > BOUNDS.x) node.velocity.x *= -1;
        if (Math.abs(node.position.y) > BOUNDS.y) node.velocity.y *= -1;
        if (Math.abs(node.position.z) > BOUNDS.z) node.velocity.z *= -1;

        posArr[i * 3] = node.position.x;
        posArr[i * 3 + 1] = node.position.y;
        posArr[i * 3 + 2] = node.position.z;

        // Check distance to other nodes for connecting synapses
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const other = nodes[j];
          const dist = node.position.distanceTo(other.position);

          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.45;

            // Point A
            linePositions[lineVertexIndex * 3] = node.position.x;
            linePositions[lineVertexIndex * 3 + 1] = node.position.y;
            linePositions[lineVertexIndex * 3 + 2] = node.position.z;

            lineColors[lineVertexIndex * 3] = node.color.r * alpha;
            lineColors[lineVertexIndex * 3 + 1] = node.color.g * alpha;
            lineColors[lineVertexIndex * 3 + 2] = node.color.b * alpha;
            lineVertexIndex++;

            // Point B
            linePositions[lineVertexIndex * 3] = other.position.x;
            linePositions[lineVertexIndex * 3 + 1] = other.position.y;
            linePositions[lineVertexIndex * 3 + 2] = other.position.z;

            lineColors[lineVertexIndex * 3] = other.color.r * alpha;
            lineColors[lineVertexIndex * 3 + 1] = other.color.g * alpha;
            lineColors[lineVertexIndex * 3 + 2] = other.color.b * alpha;
            lineVertexIndex++;

            lineCount++;
          }
        }
      }

      posAttr.needsUpdate = true;

      // Update line segments geometry range
      linesGeo.setDrawRange(0, lineCount * 2);
      (linesGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      (linesGeo.attributes.color as THREE.BufferAttribute).needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);

      pointsGeo.dispose();
      pointsMat.dispose();
      linesGeo.dispose();
      linesMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-65"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="h-full w-full block" />
    </div>
  );
}
