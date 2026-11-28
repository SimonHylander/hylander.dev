import pluginRouter from "@tanstack/eslint-plugin-router";
import { defineConfig, globalIgnores } from "eslint/config";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

export default defineConfig([
  ...tseslint.configs.recommended,
  reactHooks.configs.flat.recommended,
  ...pluginRouter.configs["flat/recommended"],
  globalIgnores([".output/**", ".vercel/**", ".nitro/**", ".tanstack/**", "src/routeTree.gen.ts", ".agents/**", ".impeccable/**"]),
]);
