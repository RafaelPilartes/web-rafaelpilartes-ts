import React, { createContext, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { IChildren } from '../interfaces/children'

interface AppContextInterface {
  menuIsVisible: boolean
  setMenuIsVisible: (value: any) => void
  searchIsVisible: boolean
  setSearchIsVisible: (value: any) => void
  isDarkMode: boolean
  setIsDarkMode: (value: any) => void
}

const AppContext = createContext<AppContextInterface>({} as AppContextInterface)

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
})

const AppProvider: React.FC<IChildren> = ({ children }): JSX.Element => {
  const [menuIsVisible, setMenuIsVisible] = useState<boolean>(false)
  const [searchIsVisible, setSearchIsVisible] = useState<boolean>(false)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider
        value={{
          menuIsVisible,
          setMenuIsVisible,
          searchIsVisible,
          setSearchIsVisible,
          isDarkMode,
          setIsDarkMode
        }}
      >
        {children}
      </AppContext.Provider>
    </QueryClientProvider>
  )
}

export { AppContext, AppProvider }
