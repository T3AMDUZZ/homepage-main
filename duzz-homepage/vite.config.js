import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { copyFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

// GitHub Pages has no SPA server, so deep links normally fall back to 404.html
// (returns HTTP 404, then JS-redirects). For specific standalone landing routes
// we instead emit a real index.html at that path so the server answers 200
// directly — no console 404, no redirect flash. 404.html stays as a safety net.
function prerenderRoutes(paths) {
  return {
    name: 'prerender-static-routes',
    apply: 'build',
    closeBundle() {
      const src = resolve('dist', 'index.html')
      for (const p of paths) {
        const dir = resolve('dist', p)
        mkdirSync(dir, { recursive: true })
        copyFileSync(src, resolve(dir, 'index.html'))
      }
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    prerenderRoutes(['aoisfjkflkmgfgsd0-fo032324/260625-2']),
  ],
})
