import { Link as ReactLink, useLocation, useParams } from "react-router-dom";
import { Breadcrumbs, Link, Stack, Typography } from "@mui/material";
import { ModuleType } from "../../common/types/types.ui";
import { IoHome } from "react-icons/io5";

const CustomBreadcrumb = ({ data }: { data: ModuleType[] }) => {
  const { id } = useParams();
  const { pathname } = useLocation();

  const modules = ["my_jobs"];
  const shouldSeeId = pathname.split("/").some((path) => modules.includes(path)) && !!id;

  const breadcrumbs: any = [];
  const len = data?.length;

  data?.forEach((_, i) => {
    if (i == 0) {
      breadcrumbs.push(
        <Link key={i} component={ReactLink} to={_.url} underline="hover" color="inherit">
          <Stack gap={0.5} direction={"row"} alignItems={"center"}>
            <IoHome size={16} style={{ marginBottom: 2 }} />
            <Typography component={"span"} variant="caption" fontWeight={500}>
              {_.name}
            </Typography>
          </Stack>
        </Link>
      );
    } else if (len == i + 1) {
      breadcrumbs.push(
        <Stack key={i}>
          <Typography variant="caption" fontWeight={500} color={"black"}>
            {_.name} {shouldSeeId && `(${id})`}
          </Typography>
        </Stack>
      );
    } else {
      breadcrumbs.push(
        <Link key={i} component={ReactLink} to={_.url} underline="hover" color="inherit">
          <Stack>
            <Typography key={i} variant="caption" fontWeight={500}>
              {_.name}
            </Typography>
          </Stack>
        </Link>
      );
    }
  });

  return (
    <Stack py={1} gap={1} direction={"row"} alignItems={"center"} sx={{}}>
      <Breadcrumbs separator={<Saparator />} aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
};

const Saparator = () => {
  return <Typography fontSize={13}>/</Typography>;
};

export default CustomBreadcrumb;
