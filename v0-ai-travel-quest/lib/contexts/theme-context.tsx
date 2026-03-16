'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeName, themes } from '@/lib/themes';

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => Promise<void>;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>('ocean');
  const [isLoading, setIsLoading] = useState(true);

  // Load theme from localStorage on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme') as ThemeName | null;
      setThemeState(savedTheme || 'ocean');
    } catch {
      setThemeState('ocean');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Apply theme colors to CSS variables
  useEffect(() => {
    const selectedTheme = themes[theme];
    if (!selectedTheme) return;
    const root = document.documentElement;
    root.style.setProperty('--background', selectedTheme.background);
    root.style.setProperty('--foreground', selectedTheme.foreground);
    root.style.setProperty('--card', selectedTheme.card);
    root.style.setProperty('--primary', selectedTheme.primary);
    root.style.setProperty('--secondary', selectedTheme.secondary);
    root.style.setProperty('--accent', selectedTheme.accent);
    root.style.setProperty('--border', selectedTheme.border);
    root.style.setProperty('--muted', selectedTheme.muted);
  }, [theme]);

  const setTheme = async (newTheme: ThemeName) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('theme', newTheme);
    } catch {
      // ignore storage errors
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isLoading }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
