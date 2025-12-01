import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface UiState {
  sidebarCollapsed: boolean;
  sidebarMobileOpen: boolean;
  logoUrl: string | null;
  themePreset: 'default' | 'slate' | 'midnight' | 'ocean';
}

// Load persisted values from localStorage
const savedLogo = localStorage.getItem("appLogo");
const savedPreset = (localStorage.getItem("appThemePreset") as UiState['themePreset'] | null) || 'default';

const initialState: UiState = {
  sidebarCollapsed: false,
  sidebarMobileOpen: false,
  logoUrl: savedLogo || null,
  themePreset: savedPreset,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSidebarCollapsed(state, action: PayloadAction<boolean>) {
      state.sidebarCollapsed = action.payload;
    },
    toggleSidebar(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setSidebarMobileOpen(state, action: PayloadAction<boolean>) {
      state.sidebarMobileOpen = action.payload;
    },
    toggleSidebarMobile(state) {
      state.sidebarMobileOpen = !state.sidebarMobileOpen;
    },
    setLogoUrl(state, action: PayloadAction<string | null>) {
      state.logoUrl = action.payload;
      // Persist to localStorage
      if (action.payload) {
        localStorage.setItem("appLogo", action.payload);
      } else {
        localStorage.removeItem("appLogo");
      }
    },
    setThemePreset(state, action: PayloadAction<UiState['themePreset']>) {
      state.themePreset = action.payload;
      localStorage.setItem("appThemePreset", action.payload);
    },
  },
});

export const { setSidebarCollapsed, toggleSidebar, setSidebarMobileOpen, toggleSidebarMobile, setLogoUrl, setThemePreset } = uiSlice.actions;
export default uiSlice.reducer;
