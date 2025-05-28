// This is the root vite.config.ts file
// The client has its own vite.config.ts file for building
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  // This config is only used for development
  // The client build uses its own vite.config.ts
  resolve: {
    alias: {
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  // Point to the client directory for development
  root: path.resolve(import.meta.dirname, "client"),
});
