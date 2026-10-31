import { useEffect, useState } from "react";

export function useTheme() {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.dataset.theme !== "light",
  );

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
    try {
      localStorage.setItem("picklePi-theme", isDark ? "dark" : "light");
    } catch {
      /* The theme still works when browser storage is unavailable. */
    }
  }, [isDark]);

  return { isDark, toggleTheme: () => setIsDark((previous) => !previous) };
}
