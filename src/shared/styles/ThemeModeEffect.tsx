import { useEffect } from "react";
import { useAppSelector } from "@/shared/hooks/useAppStore";

// Applies simple theme preset by setting CSS variables.
export const ThemeModeEffect = () => {
  const preset = useAppSelector((s) => s.ui.themePreset);

  useEffect(() => {
    const root = document.documentElement;
    // Defaults (light gray app, slate sidebar)
    let appBg = "#f8f9fa";
    let sidebarBg = "#0f172a"; // deep slate
    let sidebarBorder = "rgba(255,255,255,0.06)";

    if (preset === "slate") {
      // Slightly darker app with slate sidebar
      appBg = "#eef2f7";
      sidebarBg = "#1f2937";
      sidebarBorder = "rgba(255,255,255,0.08)";
    } else if (preset === "midnight") {
      // True midnight: darker app and sidebar
      appBg = "#0a0f1a";
      sidebarBg = "#0b1220";
      sidebarBorder = "rgba(255,255,255,0.08)";
    } else if (preset === "ocean") {
      // Blue-toned preset matching brand primary
      appBg = "#e8eefb"; // primary-lighter
      sidebarBg = "#203a8c"; // deep ocean blue
      sidebarBorder = "rgba(255,255,255,0.12)";
    }

    root.style.setProperty("--app-bg", appBg);
    root.style.setProperty("--sidebar-bg", sidebarBg);
    root.style.setProperty("--sidebar-border", sidebarBorder);
  }, [preset]);

  return null;
};
