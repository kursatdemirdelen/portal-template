import React from "react";
import { AppProviders } from "@/app/providers/AppProviders";
import { AppRouter } from "@/app/router/AppRouter";
import { ErrorBoundary } from "@/shared/ui/ErrorBoundary";

const App: React.FC = () => {
  return (
    <AppProviders>
      <ErrorBoundary>
        <AppRouter />
      </ErrorBoundary>
    </AppProviders>
  );
};

export default App;
