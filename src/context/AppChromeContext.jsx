import { createContext, useCallback, useContext, useMemo, useState } from "react";

const AppChromeContext = createContext(null);

export function AppChromeProvider({ children }) {
  const [navHidden, setNavHidden] = useState(false);

  const toggleNavHidden = useCallback(() => {
    setNavHidden((v) => !v);
  }, []);

  const value = useMemo(
    () => ({
      navHidden,
      setNavHidden,
      toggleNavHidden
    }),
    [navHidden, toggleNavHidden]
  );

  return <AppChromeContext.Provider value={value}>{children}</AppChromeContext.Provider>;
}

export function useAppChrome() {
  const ctx = useContext(AppChromeContext);
  if (!ctx) {
    throw new Error("useAppChrome must be used within AppChromeProvider");
  }
  return ctx;
}
