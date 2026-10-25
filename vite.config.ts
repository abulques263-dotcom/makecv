import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const projectRoot = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: resolve(projectRoot, "react-app"),
  base: "/makecv/cv-editor/",
  plugins: [react(), tailwindcss()],
  build: {
    outDir: resolve(projectRoot, "cv-editor"),
    emptyOutDir: true
  },
  server: {
    port: 5173,
    strictPort: true
  }
});
