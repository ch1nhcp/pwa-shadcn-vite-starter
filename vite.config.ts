import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { VitePWA } from "vite-plugin-pwa"
import { defineConfig, loadEnv } from "vite"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const appName = env.VITE_APP_NAME ?? "PWA Starter"

  return {
    base: env.VITE_BASE_URL ?? "/",
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: "prompt",
        includeAssets: ["favicon.svg", "apple-touch-icon.svg"],
        manifest: {
          name: appName,
          short_name: appName,
          description: "A Progressive Web App built with React, Vite, and shadcn/ui",
          theme_color: "#0F172A",
          background_color: "#0F172A",
          display: "standalone",
          scope: "/",
          start_url: "/",
          icons: [
            {
              src: "pwa-192x192.svg",
              sizes: "192x192",
              type: "image/svg+xml",
              purpose: "any",
            },
            {
              src: "pwa-512x512.svg",
              sizes: "512x512",
              type: "image/svg+xml",
              purpose: "any",
            },
            {
              src: "pwa-512x512.svg",
              sizes: "512x512",
              type: "image/svg+xml",
              purpose: "maskable",
            },
          ],
        },
        workbox: {
          globPatterns: ["**/*.{js,css,html,svg,png,ico,woff2}"],
          cleanupOutdatedCaches: true,
          clientsClaim: true,
        },
        devOptions: {
          enabled: true,
        },
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }
})
