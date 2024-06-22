import { PropsWithChildren, createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

type DarkModeContextProps = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

const DarkModeContext = createContext<DarkModeContextProps | undefined>(
  undefined
);

const DarkModeProvider = ({ children }: PropsWithChildren) => {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDarkMode");

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () =>
    setIsDarkMode((isDarkMode: boolean) => !isDarkMode);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

const useDarkModeContext = () => {
  const context = useContext(DarkModeContext);

  if (!context) {
    throw new Error("DarkModeContext should be used within DarkModeProvider.");
  }
  return context;
};

export { DarkModeProvider, useDarkModeContext };
