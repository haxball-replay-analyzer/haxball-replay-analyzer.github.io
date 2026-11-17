// ESLint 10 (konfiguracja płaska). `npm run lint`; ten sam krok jest w CI.
// Kod obcy bez reguł stylu: src/vendor/ (biblioteki), src/game2.js i haxball.js (przerobiony klient HaxBall).
const js = require('@eslint/js');
const globals = require('globals');
const reactHooks = require('eslint-plugin-react-hooks');

module.exports = [
  {
    ignores: ['build/**', 'src/vendor/**', 'src/game2.js', 'src/game-min-*.js']
  },

  // Strona (React, przeglądarka).
  {
    files: ['src/**/*.js'],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser }
    },
    plugins: { 'react-hooks': reactHooks },
    rules: {
      ...js.configs.recommended.rules,
      // Tylko klasyczne reguły hooków; reguły React Compilera (reszta `recommended`) nie dotyczą tego kodu.
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn'
    }
  },
  {
    files: ['src/analysis/*.worker.js'],
    languageOptions: { globals: { ...globals.worker } }
  },

  // Rdzeń dekodera: bez DOM i bez Node. Wolno tylko ES2022, `performance` i `console`.
  {
    files: ['packages/replay-core/src/**/*.js'],
    ignores: ['packages/replay-core/src/haxball.js'],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.es2021, performance: 'readonly', console: 'readonly' }
    }
  },
  // haxball.js (kod obcy): tylko dowód braku DOM, czyli `no-undef`.
  {
    files: ['packages/replay-core/src/haxball.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.es2021, performance: 'readonly', console: 'readonly' }
    },
    linterOptions: { reportUnusedDisableDirectives: 'off' },
    rules: { 'no-undef': 'error' }
  },

  // Node: testy, skrypty, konfiguracje.
  {
    files: ['test/**/*.js', 'scripts/**/*.js', 'vite.config.mjs'],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.node }
    }
  },
  {
    files: ['eslint.config.js'],
    ...js.configs.recommended,
    languageOptions: { sourceType: 'commonjs', globals: { ...globals.node } }
  }
];
