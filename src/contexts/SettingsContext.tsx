
import * as React from "react";

interface SettingsContextType {
  language: string;
  isDarkMode: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  setLanguage: (value: string) => void;
  setDarkMode: (enabled: boolean) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setVibrationEnabled: (enabled: boolean) => void;
}

const SettingsContext = React.createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = React.useState(() => localStorage.getItem("language") || "vi");
  const [isDarkMode, setIsDarkMode] = React.useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode ? savedDarkMode === "true" : false;
  });
  const [soundEnabled, setSoundEnabled] = React.useState(() => {
    const savedSound = localStorage.getItem("soundEnabled");
    return savedSound ? savedSound === "true" : true;
  });
  const [vibrationEnabled, setVibrationEnabled] = React.useState(() => {
    const savedVibration = localStorage.getItem("vibrationEnabled");
    return savedVibration ? savedVibration === "true" : true;
  });

  // Apply dark mode to document when it changes
  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  // Update localStorage when settings change
  const setDarkMode = React.useCallback((enabled: boolean) => {
    setIsDarkMode(enabled);
    localStorage.setItem("darkMode", enabled.toString());
  }, []);

  const updateLanguage = React.useCallback((value: string) => {
    setLanguage(value);
    localStorage.setItem("language", value);
  }, []);

  const updateSoundEnabled = React.useCallback((enabled: boolean) => {
    setSoundEnabled(enabled);
    localStorage.setItem("soundEnabled", enabled.toString());
  }, []);

  const updateVibrationEnabled = React.useCallback((enabled: boolean) => {
    setVibrationEnabled(enabled);
    localStorage.setItem("vibrationEnabled", enabled.toString());
  }, []);

  // Create event to notify other components about settings changes
  React.useEffect(() => {
    window.dispatchEvent(new Event("settings-changed"));
  }, [language, isDarkMode, soundEnabled, vibrationEnabled]);

  const value = React.useMemo(
    () => ({
      language,
      isDarkMode,
      soundEnabled,
      vibrationEnabled,
      setLanguage: updateLanguage,
      setDarkMode,
      setSoundEnabled: updateSoundEnabled,
      setVibrationEnabled: updateVibrationEnabled,
    }),
    [language, isDarkMode, soundEnabled, vibrationEnabled, updateLanguage, setDarkMode, updateSoundEnabled, updateVibrationEnabled]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export const useSettings = () => {
  const context = React.useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
