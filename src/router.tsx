import { createRouter } from '@tanstack/react-router'
import { supabase } from './utils/supabase'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
export const getRouter = () => {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  })

  loader: async () => {
    const { data: testValues } = await supabase.from('test').select()
    console.log(testValues)
    return { testValues }
  }
  return router
}
