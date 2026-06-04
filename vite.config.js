import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({

  plugins: [

    react(),

    tailwindcss(),

    VitePWA({

      registerType: "autoUpdate",

      includeAssets: [

        "favicon.ico",
        "logo.png"

      ],

      manifest: {

        name: "STEPify",

        short_name: "STEPify",

        description:
          "WiFi Management Platform",

        theme_color: "#06b6d4",

        background_color:
          "#020617",

        display: "standalone",

        orientation: "portrait",

        start_url: "/",

        icons: [

          {
            src: "logo.png",
            sizes: "192x192",
            type: "image/png"
          },

          {
            src: "logo.png",
            sizes: "512x512",
            type: "image/png"
          }

        ]

      }

    })

  ]

});