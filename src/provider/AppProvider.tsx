import React, { createContext, useState } from 'react'
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

const AppProvider: React.FC<IChildren> = ({ children }): JSX.Element => {
  const [menuIsVisible, setMenuIsVisible] = useState<boolean>(false)
  const [searchIsVisible, setSearchIsVisible] = useState<boolean>(false)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

  return (
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
  )
}

export { AppContext, AppProvider }
