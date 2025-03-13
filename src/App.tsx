
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { useTheme } from './context/ThemeContext';

const queryClient = new QueryClient();

// Wrapper component to handle theme selection
const ThemeWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useTheme();
  return (
    <StyledThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles theme={theme === 'light' ? lightTheme : darkTheme} />
      {children}
    </StyledThemeProvider>
  );
};

const App: React.FC = () => {
  // Check initial dark mode from localStorage on app load
  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <ThemeProvider>
      <ThemeWrapper>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <SettingsProvider>
              <LanguageProvider>
                <div className="min-h-screen transition-colors duration-300">
                  <Toaster />
                  <Sonner />
                  <BrowserRouter>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/settings" element={<Settings />} />
                      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </BrowserRouter>
                </div>
              </LanguageProvider>
            </SettingsProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeWrapper>
    </ThemeProvider>
  );
};

export default App;
