import { defineConfig, transformWithOxc } from 'vite';
import react from '@vitejs/plugin-react';

// JSX jest w plikach .js (spadek po Create React App), a Vite 8 czyta JSX tylko
// w .jsx/.tsx. Ten plugin zamienia JSX w plikach .js z src/ na zwykły JS,
// zanim zajmie się nimi reszta Vite.
function jsxInJs() {
  let dev = true;
  return {
    name: 'hbra:jsx-w-js',
    enforce: 'pre',
    configResolved(config) {
      dev = config.command === 'serve';
    },
    transform: {
      filter: { id: /\/src\/.*\.js$/ },
      async handler(code, id) {
        if (!code.includes('<')) return null;
        const result = await transformWithOxc(code, id, {
          lang: 'jsx',
          jsx: { runtime: 'automatic', development: dev },
        });
        return { code: result.code, map: result.map };
      },
    },
  };
}

// Build idzie do build/, jak w CRA, żeby `npm run deploy` (gh-pages -d build) się nie zmienił.
export default defineConfig({
  plugins: [jsxInJs(), react()],
  // Stare hacki CSS dla IE (np. *vertical-align) Lightning CSS odrzuca; przeglądarki i tak je pomijają.
  css: { lightningcss: { errorRecovery: true } },
  build: { outDir: 'build' },
  server: { port: 3005, strictPort: true },
  preview: { port: 3005, strictPort: true },
});
