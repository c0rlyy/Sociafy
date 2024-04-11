import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5173,
    proxy: {
      "/login": {
        target: "http://localhost:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/login/, ""),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept, Authorization",
          "Access-Control-Allow-Credentials": "true",
        },
      },
    },
  },
});
