"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = { children: ReactNode };

type State = { hasError: boolean; message?: string };

/**
 * Catches client render errors in route content (inside {@link AppChrome} main).
 * Next.js `app/error.tsx` does not wrap the root layout shell, so failures there
 * can otherwise surface as a blank page.
 */
export class RouteErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[RouteErrorBoundary]", error.message, info.componentStack);
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "24px 16px",
            maxWidth: 560,
            margin: "0 auto",
            fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
          }}
        >
          <h1 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 12px" }}>This page could not be shown</h1>
          <p style={{ margin: "0 0 8px", color: "#444", fontSize: 14, lineHeight: 1.5 }}>
            {this.state.message ?? "An unexpected error occurred."}
          </p>
          <button
            type="button"
            style={{
              marginTop: 12,
              padding: "10px 16px",
              fontSize: 14,
              cursor: "pointer",
              border: "1px solid #ccc",
              borderRadius: 4,
              background: "#fff",
            }}
            onClick={() => this.setState({ hasError: false, message: undefined })}
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
