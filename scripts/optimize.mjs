// Minifie global.css et main.js (esbuild) vers .build/ pour un HTML allégé.
import { createRequire } from 'node:module';
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const require = createRequire(import.meta.url);
const esbuild = require('esbuild');

const root = process.cwd();
const outDir = join(root, '.build');

const cssIn = join(root, 'public', 'css', 'global.css');
const jsIn = join(root, 'public', 'js', 'main.js');
if (!existsSync(cssIn) || !existsSync(jsIn)) {
  console.error('❌ Sources CSS/JS introuvables (public/css/global.css, public/js/main.js).');
  process.exit(1);
}

mkdirSync(join(outDir, 'css'), { recursive: true });
mkdirSync(join(outDir, 'js'), { recursive: true });

const cssSrc = readFileSync(cssIn, 'utf8');
const jsSrc = readFileSync(jsIn, 'utf8');

const css = esbuild.transformSync(cssSrc, { loader: 'css', minify: true });
const js = esbuild.transformSync(jsSrc, { loader: 'js', minify: true });

writeFileSync(join(outDir, 'css', 'global.css'), css.code);
writeFileSync(join(outDir, 'js', 'main.js'), js.code);

console.log('✅ Optimisation CSS/JS (esbuild) :');
console.log(`   global.css : ${cssSrc.length} → ${css.code.length} octets`);
console.log(`   main.js    : ${jsSrc.length} → ${js.code.length} octets`);