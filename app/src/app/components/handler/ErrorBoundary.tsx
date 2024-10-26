/*
 * Project Name : "Aerosphare Suit"
 *
 * Author: Abu Sayed Polin
 * Copyright : "Brotecs Technologies Limited"
 *
 * Created: 2023-09-28 23:46:42
 * Modified: 2023-09-28 23:46:42
 *
 * Component: App
 * Description: Custom ErrorBoundary component for handling errors and displaying error information.
 */

import { Component, ReactNode } from "react";
import { Card, Stack, Typography } from "@mui/material";

// -----------------------------------------------------------------------------
// Class: ErrorBoundary
// Purpose: A custom ErrorBoundary component for handling errors and displaying error information.
// Parameters:
// - fallback: The fallback UI to display when an error occurs.
// - children: The child components wrapped by the ErrorBoundary.
// -----------------------------------------------------------------------------
class ErrorBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { hasError: boolean; error?: Error }> {
  constructor(props: { fallback: ReactNode; children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): { hasError: boolean; error?: Error } {
    return { hasError: true, error };
  }

  // componentDidCatch(error: Error, info: ErrorInfo): void {
  // Example "componentStack":
  //   in ComponentThatThrows (created by App)
  //   in ErrorBoundary (created by App)
  //   in div (created by App)
  //   in App
  // }

  render(): ReactNode {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <ErrorComponent error={this.state.error} />;
    }

    return this.props.children;
  }
}

// -----------------------------------------------------------------------------
// Component: ErrorComponent
// Purpose: A component for displaying detailed error information.
// Parameters:
// - error: The error object containing name, message, and stack.
// -----------------------------------------------------------------------------
const ErrorComponent = ({ error }: { error: Error | undefined }) => {
  const bg = { p: 1, borderRadius: 0.8, bgcolor: "#f2f2f2", gap: 2, overflow: "auto" };
  const label = { fontWeight: 700, width: 120 };

  return (
    <Card sx={{ overflow: "auto" }}>
      <Stack gap={1} sx={{ p: 1, borderRadius: 1, overflow: "auto" }}>
        <Stack {...bg} direction={"row"}>
          <Typography {...label}>Error Name</Typography>
          <Typography>:</Typography>
          <Typography component={"pre"}>{error?.name} </Typography>
        </Stack>

        <Stack {...bg} direction={"row"}>
          <Typography {...label}>Error Message</Typography>
          <Typography>:</Typography>
          <Typography component={"pre"}>{error?.message} </Typography>
        </Stack>

        <Stack {...bg} direction={"row"}>
          <Typography {...label}>Error Stack</Typography>
          <Typography>:</Typography>
          <Typography component={"pre"}>{error?.stack} </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

export default ErrorBoundary;
