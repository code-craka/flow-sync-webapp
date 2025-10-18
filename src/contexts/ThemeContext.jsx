import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext({
  theme: 'light',
  setTheme: () => {},
});

export const ThemeProvider = ({ children, defaultTheme = 'light', storageKey = 'vite-ui-theme' }) => {
  const [theme, setThemeState] = useState(() => localStorage.getItem(storageKey) || defaultTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
  };

  const value = {
    theme,
    setTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};