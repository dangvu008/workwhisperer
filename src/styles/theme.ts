
export const lightTheme = {
  // Base colors
  background: '#F5F7FA',
  text: '#000000',
  
  // Components
  cardBackground: '#FFFFFF',
  sidebarBackground: '#FFFFFF',
  
  // Interactive elements
  primary: '#007AFF',
  secondary: '#5856D6',
  
  // Borders and lines
  border: '#E5E5EA',
  divider: '#E5E5EA',
  
  // Text variations
  textPrimary: '#000000',
  textSecondary: '#666666',
  
  // Status colors
  success: '#34C759',
  error: '#FF3B30',
  warning: '#FF9500',
};

export const darkTheme = {
  // Base colors
  background: '#1A2526',
  text: '#FFFFFF',
  
  // Components
  cardBackground: '#242F30',
  sidebarBackground: '#242F30',
  
  // Interactive elements
  primary: '#0A84FF',
  secondary: '#5E5CE6',
  
  // Borders and lines
  border: '#38383A',
  divider: '#38383A',
  
  // Text variations
  textPrimary: '#FFFFFF',
  textSecondary: '#EBEBF5',
  
  // Status colors
  success: '#32D74B',
  error: '#FF453A',
  warning: '#FF9F0A',
};

export type ThemeType = typeof lightTheme;
