import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  if (mode === "production" && !process.env.DEFAULT_SITE_URL) {
    throw new Error(
      "DEFAULT_SITE_URL is required for production builds (e.g. https://app.adamzagorski.pl).",
    );
  }

  return {
    plugins: [react()],
    envPrefix: ["VITE_", "DEFAULT_"],
    resolve: {
      alias: {
        "@packages": resolve(__dirname, "../../packages"),
        "@assets": resolve(__dirname, "./src/assets"),
        "@components": resolve(__dirname, "./src/components"),
        "@constans": resolve(__dirname, "./src/constans"),
        "@features": resolve(__dirname, "./src/features"),
        "@leyouts": resolve(__dirname, "./src/leyouts"),
        "@app-types": resolve(__dirname, "./src/types"),
      },
      dedupe: ["react", "react-dom"],
    },
    server: {
      fs: {
        allow: [resolve(__dirname, "../..")],
      },
    },
    optimizeDeps: {
      exclude: ["@my-monorepo/components"],
    },
  };
});
