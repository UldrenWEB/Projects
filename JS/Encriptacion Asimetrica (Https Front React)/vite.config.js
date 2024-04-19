import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'node:path'
import fs from 'node:fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'cert', 'key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'cert', 'cert.pem'))
    }
  }
})
