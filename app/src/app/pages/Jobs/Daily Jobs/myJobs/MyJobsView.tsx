import { Container, Stack, Typography } from "@mui/material";
import { MyJobsType } from "../../../../common/types/types.services";
import MyJobButton from "./components/MyJobButton";
import { SVG } from "../../../../components/images/Image";

const MyJobsView = ({ data, reRender }: { data: MyJobsType[]; reRender: any }) => {
  return (
    <Container maxWidth={"xl"} sx={{ height: 1, py: 6 }}>
      <Stack gap={2} direction={"row"} flexWrap={"wrap"} justifyContent={{ xs: "center", sm: "start" }}>
        {data.map((props, i) => (
          <MyJobButton key={i} reRender={reRender} {...props} />
        ))}
      </Stack>
      {data.length === 0 && <NoJobs />}
    </Container>
  );
};

const NoJobs = () => {
  return (
    <Stack gap={2} height={0.9} justifyContent={"center"} alignItems={"center"}>
      <SVG.check_round size={200} sx={{ bgcolor: "grey.400" }} />
      <Typography variant="h3" color={"grey.600"}>
        You have no job for now
      </Typography>
    </Stack>
  );
};

export default MyJobsView;
