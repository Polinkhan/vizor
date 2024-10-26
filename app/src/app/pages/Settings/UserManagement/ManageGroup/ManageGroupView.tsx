import { Container, Divider, Stack, Typography } from "@mui/material";
import CustomTree from "../../../../components/customTree/CustomTree";
import { useState } from "react";
import { ModuleType } from "../../../../common/types/types.ui";
import { GroupType } from "../../../../common/types/types.group";
import { getClient } from "../../../../common/config/client";
import { useSnackbar } from "notistack";
import { GroupProfileCover, GroupProfileCoverProps, PermissionView } from "./Components";

const ManageGroupView = ({ data }: any) => {
  // ------------------------------------------
  // Data
  // ------------------------------------------
  const group: GroupType = data[0];
  const modules: ModuleType[] = data[1];

  // ------------------------------------------
  // Hooks
  // ------------------------------------------
  // const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // ------------------------------------------
  // State
  // ------------------------------------------
  const [selectedModule, setSelectedModule] = useState();
  const [permissions, setPermissions] = useState(group.permissions);

  // ------------------------------------------
  // Functions
  // ------------------------------------------
  const onSave = async () => {
    const client = getClient("group");
    try {
      const { data } = await client.put(`${group.id}`, { permissions });
      enqueueSnackbar(data?.message, { variant: "success" });
      // navigate("/app/settings/user_management?tab=Group");
    } catch (err: any) {
      enqueueSnackbar(err?.message, { variant: "error" });
    }
  };

  // ------------------------------------------
  // Props
  // ------------------------------------------
  const GroupProfileCoverProps: GroupProfileCoverProps = {
    onSave,
    primaryText: group.name,
    secondaryText: group.description,
  };

  // ------------------------------------------
  // Render Component
  // ------------------------------------------
  return (
    <Stack sx={{ height: 1 }}>
      <Container sx={{ height: 1, overflow: "auto" }}>
        <Stack pb={2} gap={2} height={1}>
          <GroupProfileCover {...GroupProfileCoverProps} />

          <Stack
            p={2}
            gap={2}
            flex={1}
            boxShadow={5}
            borderRadius={3}
            overflow={"auto"}
            flexDirection={{ sm: "row" }}
          >
            <Stack flex={3} gap={0.5}>
              <Typography px={1} pb={0.5} borderBottom={"1px dashed #ddd"}>
                Module List
              </Typography>
              <Stack flex={1} overflow={"auto"}>
                <CustomTree data={modules} setSelected={setSelectedModule} />
              </Stack>
            </Stack>

            <Divider orientation="vertical" />

            <Stack flex={2}>
              <Stack flex={1} gap={0.5}>
                <Typography px={1} pb={0.5} borderBottom={"1px dashed #ddd"}>
                  Permissions
                </Typography>
                <Stack p={2} flex={1} overflow={"auto"}>
                  <PermissionView
                    module={selectedModule}
                    permissions={permissions}
                    setPermissions={setPermissions}
                  />
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
};

export default ManageGroupView;
