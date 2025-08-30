import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/hooks/index.ts", "src/utils/index.ts"],
  minify: true,
  target: "es2018",
  external: ["react"],
  sourcemap: true,
  dts: true,
  format: ["esm", "cjs"],
  injectStyle: true,
});
