import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {},
  middleware: (gDM) => gDM(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
