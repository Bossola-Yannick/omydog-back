import globals from "globals";
import pluginJs from "@eslint/js";
import jest from 'eslint-plugin-jest';

export default [
  {
    plugins: { jest },
    rules: {
      ...jest.configs.recommended.rules,
      indent: ["error", 2],
      "comma-dangle": ["error", "always-multiline"],
      "eol-last": ["error", "always"],
      semi: ["error", "always"],
      "semi-style": ["error", "last"],
      "no-trailing-spaces": "error",
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.jest,
      },
    },
  },
  pluginJs.configs.recommended,
];
