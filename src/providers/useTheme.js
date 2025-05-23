import { useContext } from 'react';
import { ThemeContext } from './themeProvider';

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    return new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
