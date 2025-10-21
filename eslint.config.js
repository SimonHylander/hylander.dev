// This configuration only applies to the package manager root.
import { config as baseConfig } from "./packages/eslint-config/base.js"

export default [
  ...baseConfig,
  {
    ignores: ["apps/**", "packages/**"],
  },
]
