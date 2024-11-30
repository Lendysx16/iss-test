import pluginJs from '@eslint/js';
import eslintPerfectionist from 'eslint-plugin-perfectionist';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import eslintPluginTailwindCSS from 'eslint-plugin-tailwindcss';
import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,vue}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
  },
  eslintPluginPrettier,
  eslintPerfectionist.configs['recommended-natural'],
  ...eslintPluginTailwindCSS.configs['flat/recommended'],
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/prefer-namespace-keyword': 'off',
      'no-duplicate-imports': 'error',
    },
  },
];
