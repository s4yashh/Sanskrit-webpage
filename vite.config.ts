import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    proxy: {
      '/api/gita': {
        target: 'https://sanskrit.ie',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/gita/, '/api/geeta.php')
      }
    }
  }
})
