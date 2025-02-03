"use client";

import { ThemeProvider, ThemeProviderProps } from "next-themes";


const ThemesProvider = ({children, ...props}: ThemeProviderProps) => {
  return <ThemeProvider {...props}>{children}</ThemeProvider>
}

export default ThemesProvider;