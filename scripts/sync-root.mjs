// Synchronise le build (dist/) vers la racine du projet afin que
// l'ouverture directe de index.html affiche le vrai site (pas une redirection).
import { cp, mkdir, readdir, lstat, rm } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { existsSync } from 'node:fs';

const root = process.cwd();
const dist = join(root, 'dist');
if (!existsSync(join(dist, 'index.html'))) {
  console.error('❌ dist/index.html introuvable — lancez `npm run build` d’abord.');
  process.exit(1);
}

// Éléments à synchroniser depuis dist/ vers la racine
const items = ['index.html', 'favicon.svg', '404.html', 'css', 'js', 'logo-tangade.png', 'logo-tangade.webp', 'cv-photo.jpg', 'cv-photo.webp'];

async function copyTree(src, dst) {
  await mkdir(dst, { recursive: true });
  const entries = await readdir(src, { withFileTypes: true });
  for (const ent of entries) {
    const s = join(src, ent.name);
    const d = join(dst, ent.name);
    if (ent.isDirectory()) {
      await copyTree(s, d);
    } else {
      await mkdir(dirname(d), { recursive: true });
      await cp(s, d);
    }
  }
}

for (const name of items) {
  const src = join(dist, name);
  if (!existsSync(src)) continue;
  const dst = join(root, name);
  if ((await lstat(src)).isDirectory()) {
    // Purge la destination avant copie pour ne laisser aucun fichier orphelin
    await rm(dst, { recursive: true, force: true });
    await copyTree(src, dst);
  } else {
    await cp(src, dst);
  }
}

console.log('✅ Site synchronisé vers la racine : index.html, favicon.svg, css/, js/, logo.');
console.log('   Ouvrez « index.html » pour voir le portfolio directement.');