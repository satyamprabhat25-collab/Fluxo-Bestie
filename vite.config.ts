import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  // Yahan "./" ko hata kar "/" kar diya hai
  base: "/", 
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    // componentTagger() ko yahan se hata diya hai
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
