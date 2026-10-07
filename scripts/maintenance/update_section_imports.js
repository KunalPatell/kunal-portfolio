const fs = require('fs');
const path = require('path');

const sectionsDir = path.join(__dirname, '..', '..', 'frontend', 'src', 'components', 'sections');
const files = fs.readdirSync(sectionsDir).filter(f => f.endsWith('.tsx') && f !== 'index.ts');

for (const file of files) {
  const filePath = path.join(sectionsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace component imports with category imports
  content = content.replace(/import\s*\{\s*SectionHeading\s*\}\s*from\s*["']@\/components\/SectionHeading["'];?/g, 'import { SectionHeading } from "@/components/ui";');
  content = content.replace(/import\s*\{\s*CyberButton\s*\}\s*from\s*["']@\/components\/CyberButton["'];?/g, 'import { CyberButton } from "@/components/ui";');
  content = content.replace(/import\s*\{\s*CyberRadar2D\s*\}\s*from\s*["']@\/components\/CyberRadar2D["'];?/g, 'import { CyberRadar2D } from "@/components/ui";');
  content = content.replace(/import\s*\{\s*HoloTilt3D\s*\}\s*from\s*["']@\/components\/HoloTilt3D["'];?/g, 'import { HoloTilt3D } from "@/components/motion";');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated imports in section:', file);
}
