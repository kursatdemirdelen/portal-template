// Sidebar dimensions
import { spacing } from '@/shared/styles/tokens';

export const SIDEBAR_WIDTH = 220;
export const SIDEBAR_COLLAPSED_WIDTH = 64;
export const MOBILE_BREAKPOINT = 768;
export const TABLET_BREAKPOINT = 1024;

// Smooth transition timing
export const SIDEBAR_TRANSITION = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";

// Content layout styles for sidebar
export const contentStyles = {
  layout: {
    marginLeft: SIDEBAR_WIDTH,
    minHeight: "100vh",
    background: "#f8fafc",
    transition: SIDEBAR_TRANSITION,
  },
  layoutCollapsed: {
    marginLeft: SIDEBAR_COLLAPSED_WIDTH,
  },
  layoutMobile: {
    marginLeft: 0,
  },
  content: {
    padding: spacing.xl,
    minHeight: "100vh",
  },
};

// Overlay styles for mobile
export const overlayStyles = {
  overlay: {
    position: "fixed" as const,
    inset: 0,
    background: "rgba(0, 0, 0, 0.5)",
    zIndex: 99,
    opacity: 0,
    visibility: "hidden" as const,
    transition: "all 0.3s ease",
  },
  overlayVisible: {
    opacity: 1,
    visibility: "visible" as const,
  },
};
