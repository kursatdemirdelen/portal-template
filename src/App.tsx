import React from "react";
import { AppProviders, AppRouter } from "@/app";

const App: React.FC = () => {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
};

export default App;
