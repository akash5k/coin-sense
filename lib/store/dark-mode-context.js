import React, { createContext, useContext, useState ,useEffect} from "react";
import { useTheme } from "next-themes";


export const DarkModeContext = createContext();

export default function DarkModeProvider({ children }) {
  const [isDarkMode, setDarkMode] = useState(false);
  const { theme, setTheme } = useTheme("light");
  const [mounted, setMounted] = useState(false)
  // const { theme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
    setTheme(isDarkMode ? "light" : "dark");
  };

  const contextValue = {
    isDarkMode,
    toggleDarkMode,
    theme,
  };

  return (
    <DarkModeContext.Provider value={contextValue}>
      {children}
    </DarkModeContext.Provider>
  );
}
