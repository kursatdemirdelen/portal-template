import { useEffect } from "react";
import { useAppSelector } from "@/shared/hooks/useAppStore";

export const ThemeModeEffect = () => {
  const mode = useAppSelector((s) => s.ui.themeMode);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  return null;
};
