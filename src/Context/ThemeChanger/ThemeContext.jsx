import React, { useContext, useState } from 'react'

const ThemeContext = React.createContext();

export function useDarkTheme(){

    return useContext(ThemeContext);
}

function ThemeWrapper({children}) {

    const [isDark, updateTheme] = useState(false);
  const handleToggleTheme = () => {
    updateTheme(!isDark);
  }

  return (
    <ThemeContext.Provider value={{isDark, handleToggleTheme}}>
        {children}
    </ThemeContext.Provider>
  )
}

export default ThemeWrapper