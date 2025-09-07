import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/social-media/index.ts"],
  minify: true,
  target: "es2018",
  external: ["react"],
  sourcemap: true,
  dts: true,
  format: ["esm", "cjs"],
  injectStyle: true,
});
