import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppProvider } from './provider/AppProvider'
import { Router } from './routes/Routes'

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
        <Router />
      </AppProvider>
    </QueryClientProvider>
  )
}

export default App
