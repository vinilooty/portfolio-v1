import { defineConfig } from "vite";
import * as path from "path";

export default defineConfig({
	resolve: {
		alias: {
			"@scripts": path.resolve(__dirname, "./scripts"),
			"@globals": path.resolve(__dirname, "./scripts/global"),
			"@components": path.resolve(__dirname, "./scripts/components"),
			"@anim": path.resolve(__dirname, "./scripts/animations"),
			"@sections": path.resolve(__dirname, "./scripts/sections"),
			"@pages": path.resolve(__dirname, "./scripts/pages"),
		},
	},
	build: {
		outDir: "dist",
		rollupOptions: {
			output: {
				entryFileNames: "[name].js",
				chunkFileNames: "[name].js",
				assetFileNames: "[name].[ext]",
			},
		},
	},
});
