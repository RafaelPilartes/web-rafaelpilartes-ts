import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppProvider } from './provider/AppProvider'
import { Router } from './routes/Routes'
import { Toaster } from 'sonner'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <Toaster richColors position="top-right" theme="system" />
        <Router />
      </AppProvider>
    </QueryClientProvider>
  )
}

export default App
