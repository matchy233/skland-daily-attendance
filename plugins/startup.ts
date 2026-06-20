import { definePlugin } from 'nitro'
import { runTask } from 'nitro/task'

export default definePlugin(async () => {
  console.log('Running attendance task on startup...')
  // run the task asynchronously in the background so it doesn't block startup
  runTask('attendance').catch(console.error)
})
