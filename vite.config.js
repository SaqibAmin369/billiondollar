import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://api.billiondollarhomepage.io/",
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react(),
    nodePolyfills({
      include: ["buffer", "process"], // Add polyfills for Buffer and process
    }),
  ],
  define: {
    "process.env": {}, // Define process.env to avoid errors
  },
  resolve: {
    alias: {
      buffer: "buffer", // Alias buffer to the polyfill
      process: "process/browser", // Alias process to the browser polyfill
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis", // Define global to globalThis for compatibility
      },
    },
  },
});
