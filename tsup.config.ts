import { defineConfig } from "tsup";

export default defineConfig({
    entry: {
        index: "src/index.ts",
        arktype: "src/validation/arktype.ts",
    },
    format: ["cjs", "esm"],
    outDir: "dist",
    splitting: false,
    external: ["arktype"],
    esbuildOptions: (options, context) => {
        if (context.format === "esm") {
            options.outExtension = { ".js": ".mjs" };
        } else if (context.format === "cjs") {
            options.outExtension = { ".js": ".cjs" };
        }
    },
});
