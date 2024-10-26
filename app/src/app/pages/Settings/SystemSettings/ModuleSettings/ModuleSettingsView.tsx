import { useState } from "react";
import { ModuleType } from "../../../../common/types/types.ui";
import { Box, Divider, Stack, Typography } from "@mui/material";
import CustomTree from "../../../../components/customTree/CustomTree";
import { ModuleSettingsComponent } from "./Components";

interface ModuleSettingsViewProps {
  data: ModuleType[];
  reRender: any;
}

const ModuleSettingsView = ({ data, reRender }: ModuleSettingsViewProps) => {
  // ------------------------------------------
  // State
  // ------------------------------------------
  const [selectedModule, setSelectedModule] = useState();

  return (
    <Box height={1} p={4}>
      <Stack
        p={3}
        gap={2}
        height={1}
        boxShadow={5}
        borderRadius={3}
        overflow={"auto"}
        flexDirection={{ sm: "row" }}
      >
        <Stack flex={2} gap={1}>
          <Typography px={1} pb={1} borderBottom={"1px dashed #ddd"}>
            Module List
          </Typography>
          <Stack flex={1} overflow={"auto"}>
            <CustomTree data={data} setSelected={setSelectedModule} />
          </Stack>
        </Stack>

        <Divider orientation="vertical" />

        <Stack flex={3}>
          <Stack flex={1} gap={1}>
            <Typography px={1} pb={1} borderBottom={"1px dashed #ddd"}>
              Module Settings
            </Typography>
            <Stack p={2} flex={1} overflow={"auto"}>
              <ModuleSettingsComponent
                key={Math.random()}
                reRender={reRender}
                module={selectedModule}
                setSelected={setSelectedModule}
              />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ModuleSettingsView;
