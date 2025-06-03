import react from "@vitejs/plugin-react"
import * as path from "node:path"
import { defineConfig } from "vitest/config"
import packageJson from "./package.json" with { type: "json" }
import svgr from "vite-plugin-svgr"
import { nodePolyfills } from "vite-plugin-node-polyfills"

export default defineConfig({
  plugins: [react(), nodePolyfills(), svgr()],
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "src/app"),
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@icons": path.resolve(__dirname, "src/icons"),
    },
  },
  server: {
    open: true,
  },

  test: {
    root: import.meta.dirname,
    name: packageJson.name,
    environment: "jsdom",

    typecheck: {
      enabled: true,
      tsconfig: path.join(import.meta.dirname, "tsconfig.json"),
    },

    globals: true,
    watch: false,
    setupFiles: ["./src/setupTests.ts"],
  },
})
