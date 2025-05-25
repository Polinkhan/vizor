import { ReactNode } from "react";
import Title from "../components/title/Title";
import Suspense from "../components/handler/Suspense";
import { Stack } from "@mui/material";

// ------------------------------------------------------------------
// Interface for the BodyLayout component props.
// Parameters:
// - children: The content to be displayed within the layout.
// - header: The header or title for the body layout.
// ------------------------------------------------------------------

interface BodyLayoutProps {
  id: number;
  icon: any;
  name?: string;
  children: ReactNode;
}

// Body Layout
// |--------------------------------------------------|
// |   Content Header                                 |
// |--------------------------------------------------|
// |                                                  |
// |                                                  |
// |                                                  |
// |                                                  |
// |                                                  |
// |                                                  |
// |               Content (Scrollable)               |
// |                                                  |
// |                                                  |
// |                                                  |
// |                                                  |
// |                                                  |
// |                                                  |
// |--------------------------------------------------|

// ------------------------------------------------------------------
// BodyLayout component for creating a layout for the main content body.
// It includes a header, divider, and a content area.
// Parameters:
// - children: The content to be displayed within the layout.
// - header: The header or title for the body layout.
// ------------------------------------------------------------------

const BodyLayout = ({ children, name }: BodyLayoutProps) => {
  return (
    <Stack width={1} height={1} overflow={"hidden"}>
      {/*------------ Header -----------*/}

      <Title name={name || ""} />

      {/*------------ Content -----------*/}
      <Suspense>
        <Stack width={1} height={1} sx={{ overflowY: "auto", overflowX: "hidden" }}>
          {children}
        </Stack>
      </Suspense>
    </Stack>
  );
};

export default BodyLayout;
