import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import dotenv from "dotenv";
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  server: {
    port: 5000,
  },
  build: {
    outDir: "build",
  },
  define: {
    "process.env.VITE_API_KEY": `"${process.env.VITE_API_KEY}"`,
  },
});
