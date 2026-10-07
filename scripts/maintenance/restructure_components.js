const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', '..', 'frontend', 'src', 'components');

const categories = {
  '3d': [
    'QuantumCore3DWebGL.tsx',
    'QuantumCore3D.tsx',
    'NeuralSynapse3D.tsx',
    'NeuralSynapse2D.tsx',
    'StarCanvas.tsx'
  ],
  'backgrounds': [
    'AnimatedBackground.tsx',
    'Grain.tsx',
    'GlowEffectInitializer.tsx'
  ],
  'motion': [
    'HoloTilt3D.tsx',
    'Magnetic.tsx',
    'Tilt.tsx',
    'Reveal.tsx',
    'EntranceAnimator.tsx',
    'CustomCursor.tsx',
    'SmoothScrollProvider.tsx',
    'ScrollProgress.tsx'
  ],
  'ui': [
    'CyberButton.tsx',
    'SectionHeading.tsx',
    'TextScramble.tsx',
    'Typewriter.tsx',
    'AnimatedCounter.tsx',
    'Marquee.tsx',
    'CyberRadar2D.tsx',
    'CommandPalette.tsx',
    'TerminalModal.tsx',
    'APIKeyManager.tsx'
  ],
  'layout': [
    'Navbar.tsx',
    'Footer.tsx',
    'Preloader.tsx'
  ]
};

// 1. Move files into category directories and create backward-compatible proxy files
for (const [cat, files] of Object.entries(categories)) {
  const catDir = path.join(baseDir, cat);
  if (!fs.existsSync(catDir)) fs.mkdirSync(catDir, { recursive: true });

  const barrelExports = [];
  for (const f of files) {
    const srcFile = path.join(baseDir, f);
    const destFile = path.join(catDir, f);
    if (fs.existsSync(srcFile)) {
      // Check if srcFile is already a proxy or the original
      const content = fs.readFileSync(srcFile, 'utf8');
      if (!content.startsWith(`export * from './${cat}/`)) {
        fs.renameSync(srcFile, destFile);
        console.log(`Moved ${f} -> ${cat}/${f}`);
      }
    }
    const name = f.replace('.tsx', '');
    barrelExports.push(`export * from './${name}';`);

    // Create backward-compatible proxy re-export file at baseDir
    fs.writeFileSync(srcFile, `export * from './${cat}/${name}';\n`);
  }

  // Write category barrel index.ts
  fs.writeFileSync(path.join(catDir, 'index.ts'), barrelExports.join('\n') + '\n');
  console.log(`Created index.ts for ${cat}`);
}

// 2. Write sections/index.ts
const sectionsDir = path.join(baseDir, 'sections');
if (fs.existsSync(sectionsDir)) {
  const sectionFiles = fs.readdirSync(sectionsDir).filter(f => f.endsWith('.tsx') && f !== 'index.ts');
  const sectionExports = sectionFiles.map(f => `export * from './${f.replace('.tsx', '')}';`);
  fs.writeFileSync(path.join(sectionsDir, 'index.ts'), sectionExports.join('\n') + '\n');
  console.log('Created index.ts for sections');
}

// 3. Write components/index.ts master barrel
const masterExports = [
  "export * from './3d';",
  "export * from './backgrounds';",
  "export * from './motion';",
  "export * from './ui';",
  "export * from './layout';",
  "export * from './sections';"
];
fs.writeFileSync(path.join(baseDir, 'index.ts'), masterExports.join('\n') + '\n');
console.log('Created master components/index.ts');
