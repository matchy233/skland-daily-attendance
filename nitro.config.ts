import { defineConfig } from 'nitro'

export default defineConfig({
  serverDir: './',
  experimental: {
    tasks: true,
  },
  scheduledTasks: {
    '0 8,20 * * *': ['attendance'],
  },
  runtimeConfig: {
    tokens: '',
    notificationUrls: '',
    maxRetries: '3',
    skipEndfield: '',
    noMask: '',
    nitro: {
      envPrefix: 'SKLAND_',
    },
  },
  rolldownConfig: {
    output: {
      codeSplitting: {
        groups: [
          {
            name: 'unstorage',
            test: /node_modules\/unstorage\/dist\/drivers\/(?!redis)/,
          },
          {
            name: 'unstorage-drivers-redis',
            test: /node_modules\/unstorage\/dist\/drivers\/redis/,
          },
        ],
      },
    },
  },
})
