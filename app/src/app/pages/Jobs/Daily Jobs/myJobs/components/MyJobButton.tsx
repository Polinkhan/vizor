import { Divider, Stack, Typography } from "@mui/material";
import { MyJobsType } from "../../../../../common/types/types.services";
import { useEffect, useState } from "react";
import { ConvertTime } from "../../../../../common/common";
import { SVG } from "../../../../../components/images/Image";
import RunningProgress from "../../../../../components/Loading/RunningProgress";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const MyJobButton = ({ name, assignee, job, endTime, reRender }: MyJobsType & { reRender: any }) => {
  const [end, setEnd] = useState("");
  const [intervalId, setIntervalId] = useState();

  const update = () => {
    const CurrentTime = new Date().getTime();
    const EndTime = new Date(endTime).getTime();
    const timeDiff = ((EndTime - CurrentTime) / 1000).toFixed(0);

    if (timeDiff === "0" || timeDiff === "-0") {
      reRender();
      clearInterval(intervalId);
    } else setEnd(ConvertTime(timeDiff));
  };

  useEffect(() => {
    const interval_id = setInterval(update, 1000);
    setIntervalId(intervalId);
    return () => {
      clearInterval(interval_id);
    };
  }, []);

  return (
    <Link to={job.name} style={{ textDecoration: "none" }}>
      <Stack py={2.5} gap={1.5} width={300} borderRadius={1.5} boxShadow={5}>
        <Stack gap={5} direction={"row"} px={3}>
          <Stack gap={1} direction={"row"} alignItems={"center"} color={"grey.800"}>
            <SVG.job size={32} />
            <Typography fontWeight={500}>{name}</Typography>
          </Stack>
          <RunningProgress />
        </Stack>

        <Divider />

        <Stack gap={1} px={3}>
          <Typography variant="caption" color={"grey.800"} fontWeight={600}>
            Job Details
          </Typography>
          <Typography component={"li"} variant="caption" color={"grey.600"} fontWeight={500}>
            Assign : {assignee}
          </Typography>
          <Typography component={"li"} variant="caption" color={"grey.600"} fontWeight={500}>
            Title : {job.name}
          </Typography>
        </Stack>

        <Divider />

        <Stack gap={1} px={3}>
          <Typography variant="caption" color={"grey.800"} fontWeight={600}>
            Status
          </Typography>
          <Typography component={"li"} variant="caption" color={"grey.600"} fontWeight={500}>
            Progress : 25%
          </Typography>
          <Typography component={"li"} variant="caption" color={"grey.600"} fontWeight={500}>
            Ends in : {end}
          </Typography>
        </Stack>

        <Stack gap={1} color={"grey.700"} px={3} pt={1} direction={"row"} alignItems={"center"} justifyContent={"end"}>
          <Typography variant="body2" fontWeight={600}>
            View Job
          </Typography>
          <FaAngleRight />
        </Stack>
      </Stack>
    </Link>
  );
};

export default MyJobButton;
