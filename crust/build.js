import { buildSync } from "esbuild";

buildSync({
	entryPoints: ["server.ts"],
	outfile: "build/server.js",
	bundle: true,
	minify: true,
	platform: "node",
	sourcemap: true,
	target: "node14",
	"format": "esm",
	external: ["./node_modules/*"],
	// minify: true,
});
