import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/new/index.ts", "src/utils/index.ts"],
  minify: true,
  target: "es2018",
  external: ["react"],
  sourcemap: true,
  dts: true,
  format: ["esm", "cjs"],
  injectStyle: true,
});
