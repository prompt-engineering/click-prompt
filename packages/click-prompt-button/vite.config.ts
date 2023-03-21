import { resolve } from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import EsLint from "vite-plugin-linter";
import tsConfigPaths from "vite-tsconfig-paths";
import * as packageJson from "./package.json";

const { EsLinter, linterPlugin } = EsLint;

// https://vitejs.dev/config/
export default defineConfig((configEnv) => ({
  plugins: [
    dts({
      include: ["src/component/"],
    }),
    react(),
    tsConfigPaths(),
    linterPlugin({
      include: ["./src}/**/*.{ts,tsx}"],
      linters: [new EsLinter({ configEnv })],
    }),
  ],
  build: {
    lib: {
      entry: resolve("src", "component/index.ts"),
      name: "ReactViteLibrary",
      formats: ["es", "umd"],
      fileName: (format) => `react-vite-library.${format}.js`,
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
    },
  },
}));
