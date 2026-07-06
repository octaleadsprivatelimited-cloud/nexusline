import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  define: {
    __FIREBASE_GOOGLE_API_KEY__: JSON.stringify(process.env.GOOGLE_API_KEY ?? ""),
  },
  plugins: [
    TanStackRouterVite(),
    tailwindcss(),
    tsconfigPaths(),
    react(),
  ],
  build: {
    chunkSizeWarningLimit: 1000,
  },
});
