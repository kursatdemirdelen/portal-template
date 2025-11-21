import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "@/shared/store/uiSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
  },
  middleware: (gDM) => gDM(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
