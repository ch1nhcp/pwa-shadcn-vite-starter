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
          display_override: ["window-controls-overlay", "standalone", "browser"],
          scope: "/",
          start_url: "/",
          orientation: "portrait-primary",
          categories: ["productivity", "utilities"],
          shortcuts: [
            {
              name: "Dashboard",
              short_name: "Home",
              url: "/",
              icons: [{ src: "pwa-192x192.svg", sizes: "192x192" }],
            },
            {
              name: "Contact",
              short_name: "Contact",
              url: "/pages/contact",
              icons: [{ src: "pwa-192x192.svg", sizes: "192x192" }],
            },
          ],
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
          navigateFallback: "index.html",
          navigateFallbackDenylist: [/^\/api/],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/jsonplaceholder\.typicode\.com\/.*/i,
              handler: "NetworkFirst",
              options: {
                cacheName: "api-cache",
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 60 * 60 * 24,
                },
                networkTimeoutSeconds: 10,
                cacheableResponse: { statuses: [0, 200] },
              },
            },
            {
              urlPattern: /\.(?:png|jpg|jpeg|gif|webp|ico)$/i,
              handler: "CacheFirst",
              options: {
                cacheName: "images-cache",
                expiration: {
                  maxEntries: 60,
                  maxAgeSeconds: 60 * 60 * 24 * 30,
                },
                cacheableResponse: { statuses: [0, 200] },
              },
            },
            {
              urlPattern: /\.(?:woff|woff2|ttf|eot)$/i,
              handler: "CacheFirst",
              options: {
                cacheName: "fonts-cache",
                expiration: {
                  maxEntries: 20,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: { statuses: [0, 200] },
              },
            },
          ],
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
