import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type MatDashTheme = 'dark' | 'light';

type ThemeContextValue = { theme: MatDashTheme; setTheme: (theme: MatDashTheme) => void; toggleTheme: () => void };
const ThemeContext = createContext<ThemeContextValue | null>(null);

export interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: MatDashTheme;
  theme?: MatDashTheme;
  onThemeChange?: (theme: MatDashTheme) => void;
  className?: string;
}

export function ThemeProvider({ children, defaultTheme = 'dark', theme: controlledTheme, onThemeChange, className = '' }: ThemeProviderProps) {
  const [internalTheme, setInternalTheme] = useState<MatDashTheme>(defaultTheme);
  const theme = controlledTheme ?? internalTheme;
  const setTheme = (next: MatDashTheme) => { if (controlledTheme === undefined) setInternalTheme(next); onThemeChange?.(next); };
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme]);
  useEffect(() => { document.documentElement.style.colorScheme = theme; }, [theme]);
  return <ThemeContext.Provider value={value}><div className={`md-root ${className}`} data-md-theme={theme}>{children}</div></ThemeContext.Provider>;
}

export function useMatDashTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useMatDashTheme must be used inside ThemeProvider');
  return context;
}
