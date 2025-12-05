import { defineConfig } from "vite";
import * as path from "path";

export default defineConfig({
  base: "/",
  resolve: {
    alias: {
      "@scripts": path.resolve(__dirname, "./scripts"),
      "@globals": path.resolve(__dirname, "./scripts/global"),
      "@components": path.resolve(__dirname, "./scripts/components"),
      "@anim": path.resolve(__dirname, "./scripts/animations"),
      "@sections": path.resolve(__dirname, "./scripts/sections"),
      "@pages": path.resolve(__dirname, "./scripts/pages"),
      "@styles": path.resolve(__dirname, "./styles"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },
  },
});
