/*
 * Project Name: "Aerosphere Suit"
 * Author: [Author Name]
 * Created: [Creation Date]
 * Modified: [Last Modification Date]
 * Component: NotFound
 * Description: Component for displaying a "Not Found" page.
 */

// Import necessary dependencies and components.
import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Iconify from "../../../components/iconify/Iconify";
import { DEFAULT_ROUTE } from "../../../common/config/config";

// Define the NotFound component.
const NotFound = () => {
  // Initialize navigation function to navigate between pages.
  const navigate = useNavigate();

  return (
    <Stack height={"80vh"} justifyContent={"center"} alignItems={"center"} gap={10}>
      <Typography variant="h2" color={"inherit"}>
        Your requested page was not found
      </Typography>

      <Stack gap={5} direction={"row"}>
        {/* Render a "Go Back" button */}
        <Button
          sx={{ fontWeight: 400 }}
          color="error"
          onClick={() => navigate(-1)} // Navigate back one step in the history
          startIcon={<Iconify icon={"eva:arrow-left-fill"} />}
        >
          Go Back
        </Button>

        {/* Render a "Go Home" button */}
        <Button
          sx={{ fontWeight: 400 }}
          onClick={() => navigate(DEFAULT_ROUTE, { replace: true })} // Navigate to the dashboard, replacing the current entry in the history
          endIcon={<Iconify icon={"heroicons:home-solid"} />}
        >
          Go Home
        </Button>
      </Stack>
    </Stack>
  );
};

export default NotFound;
