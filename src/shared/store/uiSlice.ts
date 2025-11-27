import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface UiState {
  sidebarCollapsed: boolean;
  sidebarMobileOpen: boolean;
  logoUrl: string | null;
}

// Load logo from localStorage
const savedLogo = localStorage.getItem("appLogo");

const initialState: UiState = {
  sidebarCollapsed: false,
  sidebarMobileOpen: false,
  logoUrl: savedLogo || null,
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
  },
});

export const { setSidebarCollapsed, toggleSidebar, setSidebarMobileOpen, toggleSidebarMobile, setLogoUrl } = uiSlice.actions;
export default uiSlice.reducer;
