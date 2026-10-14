import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { fetchContributionCalendar } from './api/contributions.ts'

function contributionCalendarApi(token: string | undefined): Plugin {
  return {
    name: 'contribution-calendar-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const requestPath = req.url?.split('?')[0]
        if (requestPath !== '/api/contributions') {
          next()
          return
        }

        if (req.method !== 'GET') {
          res.statusCode = 405
          res.end()
          return
        }

        void (async () => {
          if (!token) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'GitHub token is not configured.' }))
            return
          }

          try {
            const calendar = await fetchContributionCalendar(token)
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.setHeader('Cache-Control', 'no-store')
            res.end(JSON.stringify(calendar))
          } catch (error) {
            console.error(error instanceof Error ? error.message : 'Contribution calendar request failed')
            res.statusCode = 502
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'GitHub contributions are unavailable right now.' }))
          }
        })()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss(), contributionCalendarApi(env.GITHUB_TOKEN)],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }
})
