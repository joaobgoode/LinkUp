const { globalIgnores } = require('eslint/config');
const globals = require('globals');
const js = require('@eslint/js');

module.exports = [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    ...js.configs.recommended,
  },

  {
    files: ['eslint.config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    rules: {
      "no-unused-vars": [
        "error",
        {
          "vars": "all",
          "args": "after-used",
          "ignoreRestSiblings": false
        }
      ],

      "no-unsafe-optional-chaining": "error",
    }
  }
];


