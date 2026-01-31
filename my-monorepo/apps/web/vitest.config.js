import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
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
