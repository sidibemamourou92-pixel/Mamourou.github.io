import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // base './' => chemins relatifs (fonctionne partout : fichier local, GitHub Pages, Netlify…)
  base: './',
  build: {
    format: 'file'
  },
});