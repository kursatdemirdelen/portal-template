import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface UiState {
  sidebarCollapsed: boolean;
  sidebarMobileOpen: boolean;
  logoUrl: string | null;
  themeMode: 'light' | 'dark';
}

// Load persisted values from localStorage
const savedLogo = localStorage.getItem("appLogo");
const savedTheme = (localStorage.getItem("appThemeMode") as 'light' | 'dark' | null) || 'light';

const initialState: UiState = {
  sidebarCollapsed: false,
  sidebarMobileOpen: false,
  logoUrl: savedLogo || null,
  themeMode: savedTheme,
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
    setThemeMode(state, action: PayloadAction<'light' | 'dark'>) {
      state.themeMode = action.payload;
      localStorage.setItem("appThemeMode", action.payload);
    },
    toggleThemeMode(state) {
      state.themeMode = state.themeMode === 'light' ? 'dark' : 'light';
      localStorage.setItem("appThemeMode", state.themeMode);
    },
  },
});

export const { setSidebarCollapsed, toggleSidebar, setSidebarMobileOpen, toggleSidebarMobile, setLogoUrl, setThemeMode, toggleThemeMode } = uiSlice.actions;
export default uiSlice.reducer;
