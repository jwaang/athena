import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/users': {
        target: 'https://pgf7hywzb5.execute-api.us-east-1.amazonaws.com/users',
        changeOrigin: true,
        // transforms /api/users/{num} to /{num}
        rewrite: (path) => path.replace(/^\/api\/users/, ''),
      }
    }
  }
})
