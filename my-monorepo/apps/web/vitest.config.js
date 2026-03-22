import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@packages": resolve(__dirname, "../../packages"),
      "@assets": resolve(__dirname, "./src/assets"),
      "@components": resolve(__dirname, "./src/components"),
      "@constans": resolve(__dirname, "./src/constans"),
      "@features": resolve(__dirname, "./src/features"),
      "@leyouts": resolve(__dirname, "./src/leyouts"),
      "@app-types": resolve(__dirname, "./src/types"),
      "@utils": resolve(__dirname, "./src/utils"),
    },
    dedupe: ["react", "react-dom"],
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: [],
    coverage: {
      enabled: false,
      provider: "v8",
      reporter: ["text", "json", "html"],
      reportsDirectory: "./coverage",
      thresholds: {
        lines: 80,
        branches: 80,
        functions: 80,
        statements: 80,
      },
      include: ["src/**"],
      exclude: [
        "node_modules",
        "dist",
        "**/main.tsx",
        "**/types/**",
        "**/*.css",
        "**/*.module.css",
        "**/*.scss",
      ],
    },
  },
});
