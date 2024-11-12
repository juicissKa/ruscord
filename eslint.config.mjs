import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import importPlugin from "eslint-plugin-import";

export default [
  importPlugin.flatConfigs.recommended,
  {
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: { project: "./tsconfig.json" },
        node: true,
      },
    },
  },
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  { rules: { "@typescript-eslint/no-explicit-any": "off" } },
];
