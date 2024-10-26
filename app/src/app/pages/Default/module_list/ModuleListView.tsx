import { Container, Divider, Stack, Typography } from "@mui/material";
import { FetchApiType } from "../../../common/types/types.api";
import { ModuleType } from "../../../common/types/types.ui";
import useFetch from "../../../hooks/fetch/use-fetch";
import ModuleButton from "../../../components/Buttons/ModuleButton";
import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import ComponentLoader from "../../../components/lodaer/ComponentLoader";

const ModuleListView = ({ id }: { id?: number }) => {
  // apis
  const api: FetchApiType = { type: "ui", method: "GET", url: `modules/${id}` };

  // hooks
  const { data }: { data: ModuleType[] } = useFetch({ api, dependency: [id] });

  const sections = [...new Set(data?.map((_item) => _item.section))];
  const modules = sections.map((section) => ({
    section,
    modules: data?.filter((module) => module.section === section),
  }));

  return (
    <ComponentLoader data={data}>
      <Container maxWidth={"xl"} sx={{ py: 2 }}>
        <Stack gap={2}>
          {modules.map((props, i) => (
            <CollapseableModule key={i} {...props} />
          ))}
        </Stack>
      </Container>
    </ComponentLoader>
  );
};

interface CollapseableModuleProps {
  section: string | undefined;
  modules: ModuleType[];
}

const CollapseableModule = ({ section, modules }: CollapseableModuleProps) => {
  // ---------------------------------------
  // Hooks
  // ---------------------------------------
  const onToggle = () => setOpen((prev) => !prev);

  // ---------------------------------------
  // States
  // ---------------------------------------
  const [open, setOpen] = useState(true);

  return (
    <Stack gap={1}>
      <Stack
        onClick={onToggle}
        pt={0.6}
        px={0.5}
        gap={0.5}
        sx={{ cursor: "pointer", "&:hover": { "& .section_name": { color: "grey.800" } } }}
      >
        <Stack gap={1} direction={"row"} alignItems={"center"}>
          <FaChevronRight
            size={12}
            style={{
              marginBottom: 2,
              transform: open ? "rotate(0deg)" : "rotate(-90deg)",
              transition: "0.3s",
            }}
          />
          <Typography className="section_name" fontWeight={500} color={"grey.600"}>
            {section}
          </Typography>
        </Stack>
        <Divider />
      </Stack>
      <Stack pb={2} flexDirection={"row"} gap={1} flexWrap={"wrap"}>
        {modules.map((_, i) => (
          <ModuleButton key={i} module={_} />
        ))}
      </Stack>
    </Stack>
  );
};

export default ModuleListView;
