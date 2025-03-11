
import React, { createContext, useContext, useState, useEffect } from 'react';
import { lightTheme, darkTheme } from '../types/theme';

type ThemeContextType = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  themeObject: typeof lightTheme | typeof darkTheme;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Get theme from localStorage or default to 'light'
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme === 'true' ? 'dark' : 'light';
  });

  // Get the appropriate theme object based on current theme
  const themeObject = theme === 'light' ? lightTheme : darkTheme;

  // Toggle theme function
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('darkMode', newTheme === 'dark' ? 'true' : 'false');
      return newTheme;
    });
  };

  // Apply dark mode class to document when it changes
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Dispatch a custom event when dark mode changes
    window.dispatchEvent(new CustomEvent('darkmode-changed', { detail: { isDarkMode: theme === 'dark' } }));
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeObject }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
