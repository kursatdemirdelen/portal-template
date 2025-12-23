import React from "react";
import { Button, Result } from "antd";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    // Hata izleme servisi entegre edilebilir
    console.error("ErrorBoundary caught:", error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Result
            status="500"
            title="Bir şeyler ters gitti"
            subTitle={
              this.state.error?.message || "Beklenmeyen bir hata oluştu."
            }
            extra={
              <Button type="primary" onClick={this.handleReload}>
                Sayfayı Yenile
              </Button>
            }
          />
        </div>
      );
    }

    return this.props.children;
  }
}
