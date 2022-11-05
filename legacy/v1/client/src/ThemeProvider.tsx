import React, { useState, createContext, useEffect } from "react";

export interface Theme {
  mode: string,
  toggle: () => void
}

export const ThemeContext = createContext<Theme | null>(null);

const ThemeProvider = ({ children }: any) => {
  const [mode, setTheme] = useState("light");

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const doc = document.documentElement;

    if (mode === "light") {
        doc.classList.add("dark");
        setTheme("dark")
        localStorage.setItem("theme", "dark");
    } else {
        doc.classList.remove("dark");
        setTheme("light")
        localStorage.setItem("theme", "light");
    }
  };
  
  return (
    <ThemeContext.Provider
      value={{
        mode,
        toggle: () => toggleDarkMode()
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;