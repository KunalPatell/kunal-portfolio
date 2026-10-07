# 🎨 Modern UI & 3D Interactive Design System Reference

This document maps out the design principles, visual patterns, and component inspirations guiding Kunal Patel's portfolio. The design language fuses cyberpunk neon aesthetics with high-performance 3D WebGL scenes, physics-driven micro-interactions, and dark mode typography.

---

## 🌟 Curated Design Inspo Matrix

### 1. [21st.dev](https://www.21st.dev) — Component Registry for Modern React
* **Key Patterns**:
  * Shadcn/ui-compatible interactive cards, bento grids, dock navigation, animated tabs.
  * Neon border beams, gradient text masks, glowing action buttons.
  * Command palette (`Ctrl+K`) with fuzzy search and quick execution.
* **Portfolio Implementation**:
  * Located in `components/ui/`: `CommandPalette.tsx`, `CyberButton.tsx`, `SectionHeading.tsx`, `Marquee.tsx`.

---

### 2. [Unicorn Studio](https://www.unicorn.studio) — Interactive WebGL & Shader Backgrounds
* **Key Patterns**:
  * Fluid mouse-following canvas deformations and liquid chromatic dispersion.
  * Layered ambient noise, subtle film grain, radial aura glows that breathe with time.
* **Portfolio Implementation**:
  * Located in `components/backgrounds/`: `AnimatedBackground.tsx` (ambient floating gradient orbs), `Grain.tsx` (CSS SVG noise overlay), `GlowEffectInitializer.tsx` (mouse-following cursor glow).

---

### 3. [MotionSites.ai](https://www.motionsites.ai) — Kinetic Web Animation & Physics
* **Key Patterns**:
  * Inertial smooth scrolling (Lenis scroll), viewport-triggered progressive reveals.
  * Magnetic buttons that pull toward the cursor, 3D card tilt on hover.
  * Dynamic scroll progress trackers, kinetic typography and staggered entrance animations.
* **Portfolio Implementation**:
  * Located in `components/motion/`: `Magnetic.tsx`, `Tilt.tsx`, `HoloTilt3D.tsx`, `Reveal.tsx`, `EntranceAnimator.tsx`, `SmoothScrollProvider.tsx`, `ScrollProgress.tsx`, `CustomCursor.tsx`.

---

### 4. [Uiverse.io](https://www.uiverse.io) — Creative CSS & Micro-Interactions
* **Key Patterns**:
  * Cyberpunk angled clip-path buttons, glowing scanner lines, pulsing radar badges.
  * Retro-futuristic terminal CLI interfaces, hacker text scramble decoders.
* **Portfolio Implementation**:
  * Located in `components/ui/`: `CyberRadar2D.tsx` (real-time angle radar sweeper), `TextScramble.tsx` (matrix decryptor), `Typewriter.tsx`, `TerminalModal.tsx` (interactive bash terminal), `AnimatedCounter.tsx`.

---

### 5. [Aceternity UI](https://ui.aceternity.com) — Modern Dark Mode Visuals
* **Key Patterns**:
  * 3D Pin cards, Lamp effect hero headers, Tracing Beam page containers.
  * Sparkles, Aurora backgrounds, Canvas reveal effects, moving gradient borders.
* **Portfolio Implementation**:
  * Integrated across `components/sections/Hero.tsx`, `components/sections/Projects.tsx`, `components/sections/AtsMatcher.tsx`, and `components/sections/VentureStudio.tsx`.

---

### 6. [Spline](https://www.spline.com) & [Community Spline](https://community.spline.design) — 3D Real-Time Graphics
* **Key Patterns**:
  * Real-time 3D interactive mesh objects, lighting shaders, mouse parallax rotation.
  * Floating orbital cores, particle constellations, dynamic camera zooms on hover.
* **Portfolio Implementation**:
  * Located in `components/3d/`:
    * `QuantumCore3DWebGL.tsx`: Full Three.js 3D Icosahedron Core with nested ring orbits, particle halo, and mouse-track physics.
    * `NeuralSynapse3D.tsx` & `NeuralSynapse2D.tsx`: Interactive neural network graph with pulse waves.
    * `StarCanvas.tsx`: Interactive 3D particle constellation.

---

### 7. [Aura.build](https://www.aura.build/browse/components) — AI-Native Aesthetic
* **Key Patterns**:
  * Minimalist dark obsidian surfaces (`#09090b`), glassmorphism overlays with `backdrop-blur-md`.
  * AI Thought Stream logs, live streaming badges, status pill chips, clean drawer/modals.
* **Portfolio Implementation**:
  * Located in `components/sections/AIAssistant.tsx` ("Ask Kunal AI" assistant with streaming tokens and model switcher), `components/ui/APIKeyManager.tsx`.

---

## 📐 Component Directory Architecture

```
src/components/
├── 3d/            # Spline, Three.js & Canvas 3D models
├── backgrounds/   # Ambient shaders, grain & lighting (Unicorn.studio style)
├── motion/        # Kinetic physics, tilt & scroll (MotionSites.ai style)
├── ui/            # Atomic buttons, radars, counters (21st.dev / Uiverse / Aura)
├── layout/        # Navbar, footer, preloader
└── sections/      # Hero, Projects, About, AIAssistant, Experience, etc.
```
