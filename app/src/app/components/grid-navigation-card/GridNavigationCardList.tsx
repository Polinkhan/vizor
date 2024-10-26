import { Box, Grid } from "@mui/material";
import GridNavigationCard, { GridNavigationCardType } from "./GridNavigationCard";
import Fade from "../animate/Fade";

interface GridNavigationCardListProps {
  CardList: Array<GridNavigationCardType>;
  active?: boolean;
  border?: boolean;
}

const GridNavigationCardList = ({ CardList, active, border = true }: GridNavigationCardListProps) => {
  return (
    <Box flex={1} sx={{ width: 1, border: (theme) => (border ? `1px solid ${theme.palette.primary.main}` : ``), borderRadius: 1 }}>
      <Fade value={0.5} duration={0.5}>
        <Grid p={2} container spacing={2}>
          {CardList.map((data, i) => (
            <GridNavigationCard data={data} key={i} active={active} />
          ))}
        </Grid>
      </Fade>
    </Box>
  );
};

export default GridNavigationCardList;
