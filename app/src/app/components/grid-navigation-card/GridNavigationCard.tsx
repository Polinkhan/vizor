import { Grid, SxProps, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/system";

export type GridNavigationCardType = {
  to: string;
  label: string;
  logo: JSX.Element;
};

const GridNavigationCard = ({ data, active = true }: { data: GridNavigationCardType; active?: boolean }) => {
  // ------------------------------------------
  // Hooks
  // ------------------------------------------
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // ------------------------------------------
  // Variables
  // ------------------------------------------
  const defaultStyle: SxProps = {
    borderRadius: 1,
    boxShadow: 5,
    transition: "0.2s",
    "&:hover": { boxShadow: 20, mt: -0.5 },
    cursor: active ? "pointer" : "not-allowed",
  };

  // ------------------------------------------
  // Functions
  // ------------------------------------------
  const handleClick = () => {
    if (!active) {
      enqueueSnackbar("Aircarf is Offline", { variant: "warning" });
      return;
    }
    navigate(data.to);
  };

  return (
    <Grid item xs={12} sm={6} lg={4} xl={3}>
      <Stack component={"a"} gap={2} alignItems={"center"} sx={{ ...defaultStyle, p: 2 }} onClick={handleClick}>
        {data.logo}
        <Typography variant="body2">{data.label}</Typography>
      </Stack>
    </Grid>
  );
};

export default GridNavigationCard;
