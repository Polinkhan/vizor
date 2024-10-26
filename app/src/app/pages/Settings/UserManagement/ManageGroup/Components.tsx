import { Dispatch, ReactNode, SetStateAction } from "react";
import { SVG } from "../../../../components/images/Image";
import { Divider, FormGroup, ListItemIcon, MenuItem, Stack, Typography } from "@mui/material";
import { ModuleType } from "../../../../common/types/types.ui";
import { GroupPermissionType } from "../../../../common/types/types.group";
import { TiInfo } from "react-icons/ti";
import CustomButton from "../../../../components/Buttons/LoadingButton";
import { FaSave } from "react-icons/fa";
import BackgroundCover, {
  BackgroundCoverProps,
} from "../../../../components/cover/BackgroundCover";

// ------------------------------------------
// Interface for PermissionView
// ------------------------------------------
interface PermissionViewProps {
  module: ModuleType | undefined;
  permissions: GroupPermissionType;
  setPermissions: Dispatch<SetStateAction<GroupPermissionType>>;
}

export const PermissionView = ({ module, permissions, setPermissions }: PermissionViewProps) => {
  // ------------------------------------------------------
  // A warning message that no module is selected to modify
  // ------------------------------------------------------
  if (module === undefined) {
    return (
      <Stack height={0.8} justifyContent={"center"} alignItems={"center"}>
        <TiInfo size={200} color="#eee" />
        <Typography color={"grey"}>Please select a module to view permission</Typography>
      </Stack>
    );
  }

  // ------------------------------------------
  // Variables
  // ------------------------------------------
  const hasViewPermission = permissions.view.includes(module.id);
  const hasEditPermission = permissions.edit.includes(module.id);
  const hasDeletePermission = permissions.delete.includes(module.id);

  // ------------------------------------------
  // Functions
  // ------------------------------------------
  const handleClickView = () => {
    if (hasViewPermission)
      setPermissions((prev) => ({ ...prev, view: prev.view.filter((id) => id !== module.id) }));
    else setPermissions((prev) => ({ ...prev, view: [...prev.view, module.id] }));
  };
  const handleClickEdit = () => {
    if (hasEditPermission)
      setPermissions((prev) => ({ ...prev, edit: prev.edit.filter((id) => id !== module.id) }));
    else setPermissions((prev) => ({ ...prev, edit: [...prev.edit, module.id] }));
  };
  const handleClickDelete = () => {
    if (hasDeletePermission)
      setPermissions((prev) => ({ ...prev, delete: prev.delete.filter((id) => id !== module.id) }));
    else setPermissions((prev) => ({ ...prev, delete: [...prev.delete, module.id] }));
  };

  // ------------------------------------------
  // Icons
  // ------------------------------------------
  const ViewIcon = <SVG.view size={24} />;
  const EditIcon = <SVG.edit size={24} />;
  const DeleteIcon = <SVG.trash size={24} />;

  // ------------------------------------------
  // Render Component
  // ------------------------------------------
  return (
    <Stack gap={2}>
      <Typography textAlign={"center"} variant="h4">
        {module.name}
      </Typography>

      <Divider />
      <FormGroup>
        <Stack gap={1}>
          <GroupMenuItem
            icon={ViewIcon}
            label="View"
            selected={hasViewPermission}
            onCLick={handleClickView}
          />
          <GroupMenuItem
            icon={EditIcon}
            label="Edit"
            selected={hasEditPermission}
            onCLick={handleClickEdit}
          />
          <GroupMenuItem
            icon={DeleteIcon}
            label="Delete"
            selected={hasDeletePermission}
            onCLick={handleClickDelete}
          />
        </Stack>
      </FormGroup>
      <Divider />
    </Stack>
  );
};

// ------------------------------------------
// Interface for GroupMenuItem
// ------------------------------------------
interface GroupMenuItemProps {
  onCLick: any;
  label: string;
  icon: ReactNode;
  selected?: boolean;
}

export const GroupMenuItem = ({ label, icon, onCLick, selected }: GroupMenuItemProps) => {
  // ------------------------------------------
  // Render Component
  // ------------------------------------------

  if (selected) {
    // ------------------------------------------
    // if Item is selected
    // ------------------------------------------
    return (
      <MenuItem selected sx={{ px: 3, py: 2 }} onClick={onCLick}>
        <Stack gap={1} flexDirection={"row"} alignItems={"center"}>
          {icon}
          <Typography sx={{ flex: 1 }}>{label}</Typography>
        </Stack>
        <ListItemIcon sx={{ m: 0, justifyContent: "end" }}>
          <SVG.check size={24} />
        </ListItemIcon>
      </MenuItem>
    );
  } else {
    return (
      // ------------------------------------------
      // if Item is not selected
      // ------------------------------------------
      <MenuItem sx={{ px: 3, py: 2 }} onClick={onCLick}>
        <Stack gap={1} flexDirection={"row"} alignItems={"center"}>
          {icon}
          <Typography sx={{ flex: 1 }}>{label}</Typography>
        </Stack>
      </MenuItem>
    );
  }
};

// ------------------------------------------
// Interface for GroupProfileCover
// ------------------------------------------
export interface GroupProfileCoverProps extends BackgroundCoverProps {
  onSave: (event?: any) => Promise<void>;
}

export const GroupProfileCover = ({ onSave, ...rest }: GroupProfileCoverProps) => {
  return (
    <Stack borderRadius={4} minHeight={250} overflow={"hidden"} position={"relative"} boxShadow={5}>
      <BackgroundCover {...rest} />
      <Stack
        px={4}
        position={"relative"}
        bgcolor={"#fff"}
        minHeight={50}
        alignItems={"end"}
        justifyContent={"center"}
      >
        <CustomButton icon={<FaSave size={18} />} onClick={onSave}>
          Save
        </CustomButton>
      </Stack>
    </Stack>
  );
};
