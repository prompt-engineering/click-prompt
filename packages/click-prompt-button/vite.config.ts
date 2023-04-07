import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsConfigPaths from "vite-tsconfig-paths";
import * as packageJson from "./package.json";
import url from "@rollup/plugin-url";
import svgr from "@svgr/rollup";

// https://vitejs.dev/config/
export default defineConfig((configEnv) => ({
  plugins: [
    url(),
    svgr(),
    dts({
      include: ["src/"],
    }),
    react(),
    tsConfigPaths(),
  ],
  build: {
    lib: {
      entry: resolve("src", "index.ts"),
      name: "ClickPromptButton",
      formats: ["es"],
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
    },
  },
}));
