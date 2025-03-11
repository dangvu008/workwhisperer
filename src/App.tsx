
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { GlobalStyles } from './types/GlobalStyles';
import Index from "./pages/Index";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Wrapper component to handle theme selection
const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { themeObject } = useTheme();
  return (
    <StyledThemeProvider theme={themeObject}>
      <GlobalStyles />
      {children}
    </StyledThemeProvider>
  );
};

// Import useTheme after defining ThemeWrapper to avoid circular dependency
import { useTheme } from './context/ThemeContext';

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <SettingsProvider>
            <LanguageProvider>
              <ThemeWrapper>
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
              </ThemeWrapper>
            </LanguageProvider>
          </SettingsProvider>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
