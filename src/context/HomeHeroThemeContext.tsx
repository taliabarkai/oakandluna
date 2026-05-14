"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type HomeHeroTheme = "light" | "dark";

type Value = {
  theme: HomeHeroTheme;
  setTheme: (t: HomeHeroTheme) => void;
  toggleTheme: () => void;
};

const HomeHeroThemeContext = createContext<Value | null>(null);

export function HomeHeroThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<HomeHeroTheme>("light");

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }, []);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
    }),
    [theme, toggleTheme],
  );

  return <HomeHeroThemeContext.Provider value={value}>{children}</HomeHeroThemeContext.Provider>;
}

export function useHomeHeroTheme(): Value {
  const ctx = useContext(HomeHeroThemeContext);
  if (!ctx) {
    throw new Error("useHomeHeroTheme must be used within HomeHeroThemeProvider");
  }
  return ctx;
}
