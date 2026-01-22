import { createFileRoute } from '@tanstack/react-router'
import { supabase } from '@/utils/supabase'
import { ComponentExample } from '@/components/component-example'

export const Route = createFileRoute('/')({
  component: App,
  loader: async () => {
    const { data: testValues } = await supabase.from('test').select()
    console.log(testValues)
    return { testValues }
  },
})

function App() {
  return <ComponentExample />
}
