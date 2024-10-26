import { Avatar, AvatarGroup, Chip, Icon, Stack, Tooltip, Typography } from "@mui/material";
import ActionButton from "../../../components/Buttons/ActionButton";
import { useSearchParams } from "react-router-dom";
import { TableComponentProps } from "../../../common/types/types.table";
import useToggle from "../../../hooks/custom/use-toggle";
import CustomDialog, { DialogActionsType } from "../../../components/dialog/CustomDialog";
import { DefaultTableBody } from "../../../components/dialog/DefaultDialogBody";
import { useEffect, useState } from "react";
import { getClient } from "../../../common/config/client";
import { useSnackbar } from "notistack";
import { getErrorMessage } from "../../../common/helpers";
import { getIcon } from "../../../components/icon/Icons";
import { UserType } from "../../../common/types/types.user";
import { GroupType } from "../../../common/types/types.group";
import { TeamType } from "../../../common/types/types.team";

// --------------------------------------------
// Common
// --------------------------------------------
export const Profile = ({ data }: TableComponentProps<UserType | GroupType | TeamType>) => {
  const size = 40;

  const isUserType = (data: UserType | GroupType | TeamType): data is UserType => {
    return "email" in data;
  };

  return (
    <Stack gap={2} flexDirection={"row"} alignItems={"center"}>
      <Avatar alt={""} src={data.photoUrl} sx={{ width: size, height: size }} />
      <Stack>
        <Typography fontSize={15}>{data.name}</Typography>
        {isUserType(data) && (
          <Typography fontSize={13} color={"grey.500"}>
            {data.email}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};

// ------------------------------------------
// Table Components
// ------------------------------------------

export const UserAccountStatus = ({ data }: TableComponentProps<UserType>) => {
  const accountStatus = (
    <Typography px={0.5} fontSize={11} fontWeight={"bold"}>
      {data.accountStatus.toUpperCase()}
    </Typography>
  );
  return (
    <>
      {data.accountStatus === "Active" && <Chip label={accountStatus} color="success" size="small" />}
      {data.accountStatus === "Archived" && <Chip label={accountStatus} color="warning" size="small" />}
    </>
  );
};

export const UserGroupField = ({ data }: TableComponentProps<UserType>) => {
  const group: any = data.group;
  if (group === "$ No Group") {
    return (
      <Tooltip arrow placement="top" title="No Group is selected">
        <Icon color="error">{getIcon("warning", 24)}</Icon>
      </Tooltip>
    );
  }
  return <Typography fontSize={14}>{group}</Typography>;
};

export const ActionField = (props: TableComponentProps<any>) => {
  // ------------------------------------------
  // Variables
  // ------------------------------------------
  const { data } = props;

  // ------------------------------------------
  // Hooks
  // ------------------------------------------
  const [searchParam] = useSearchParams();
  const currentTab = searchParam.get("tab");

  if (data.name === "Admin") {
    const tooltip = "Admin has all permission by default";
    return <ActionButton title={tooltip} icon="warning" color="primary" />;
  }

  if (data.name === "$ No Group") {
    const tooltip = "Can't change this group";
    return <ActionButton title={tooltip} icon="warning" color="primary" />;
  }

  // --------------------------------------------
  // Variables
  // --------------------------------------------
  let link = data.id;
  if (currentTab === "Team") link = `team/${data.id}`;
  if (currentTab === "Group") link = `group/${data.id}`;

  // ------------------------------------------
  // Render Component
  // ------------------------------------------
  return (
    <>
      <ActionButton link={link} color="primary" icon={"edit"} title={`Edit ${currentTab}`} />
      {currentTab === "User" && <ActionUserDeleteButton {...props} />}
      {currentTab === "Group" && <ActionGroupDeleteButton {...props} />}
    </>
  );
};

const ActionUserDeleteButton = ({ data: user, reRender }: TableComponentProps<UserType>) => {
  // ------------------------------------------
  // Hooks
  // ------------------------------------------
  const toggle = useToggle();
  const { resource } = toggle;
  const { enqueueSnackbar } = useSnackbar();

  // ------------------------------------------
  // Functions
  // ------------------------------------------
  const handleClick = async () => {
    const client = getClient("user");
    try {
      let data: any;
      if (resource === "Delete") data = (await client.delete(`delete_user/${user.id}`)).data;
      if (resource === "Archive") data = (await client.patch(`archive_user/${user.id}`)).data;
      if (resource === "Restore") data = (await client.patch(`restore_user/${user.id}`)).data;
      enqueueSnackbar(data.message, { variant: "success" });
      toggle.onClose();
      reRender();
    } catch (err) {
      enqueueSnackbar(getErrorMessage(err), { variant: "error" });
    }
  };

  // ------------------------------------------
  // Dialog Data
  // ------------------------------------------
  let confirmButton: any = {};
  if (resource === "Delete") confirmButton = { name: "Delete", color: "error" };
  if (resource === "Restore") confirmButton = { name: "Restore", color: "primary" };
  if (resource === "Archive") confirmButton = { name: "Archive", color: "secondary" };

  const actions: DialogActionsType = [
    { onClick: handleClick, ...confirmButton },
    { name: "Close", onClick: toggle.onClose },
  ];

  // ------------------------------------------
  // Render Component
  // ------------------------------------------
  return (
    <>
      {/* Active user buttons */}
      {user.accountStatus === "Active" && (
        <>
          <ActionButton
            color="secondary"
            icon={"archive"}
            title="Archive User"
            onClick={() => toggle.onOpen("Archive")}
          />
        </>
      )}

      {/* Archived user buttons */}
      {user.accountStatus === "Archived" && (
        <>
          <ActionButton
            color="inherit"
            icon={"restore"}
            onClick={() => toggle.onOpen("Restore")}
            title="Restore User"
          />
          <ActionButton color="error" icon={"delete"} title="Delete User" onClick={() => toggle.onOpen("Delete")} />
        </>
      )}

      <CustomDialog
        toggle={toggle}
        actions={actions}
        header={"Confirm " + resource}
        DialogBody={resource && DefaultTableBody.Dynamic(resource, user?.name)}
      />
    </>
  );
};

const ActionGroupDeleteButton = ({ data, reRender }: TableComponentProps<GroupType>) => {
  // ------------------------------------------
  // States
  // ------------------------------------------
  const [input, setInput] = useState("");

  // ------------------------------------------
  // Hooks
  // ------------------------------------------
  const toggle = useToggle();
  const { enqueueSnackbar } = useSnackbar();

  // ------------------------------------------
  // Functions
  // ------------------------------------------
  const handleClick = async () => {
    const client = getClient("group");
    try {
      const { data: res } = await client.delete(`${data?.id}`);
      enqueueSnackbar(res.message, { variant: "success" });
      toggle.onClose();
      reRender();
    } catch (err) {
      enqueueSnackbar(getErrorMessage(err), { variant: "error" });
    }
  };

  useEffect(() => {
    setInput("");
  }, [toggle.open]);

  // ------------------------------------------
  // Varibles
  // ------------------------------------------
  const actions: DialogActionsType = [
    { name: "Delete", onClick: handleClick, color: "error", disabled: input !== data.name },
    { name: "Close", onClick: toggle.onClose },
  ];

  // ------------------------------------------
  // Render Component
  // ------------------------------------------
  return (
    <>
      <ActionButton color="error" icon={"delete"} onClick={toggle.onOpen} title="Delete Group" />
      <CustomDialog
        toggle={toggle}
        actions={actions}
        header="Confirm Delete"
        DialogBody={DefaultTableBody.DeleteGroup(data?.name, input, setInput)}
      />
    </>
  );
};

export const TeamUserlist = ({ data }: TableComponentProps<TeamType>) => {
  return (
    <AvatarGroup max={10}>
      {data.users.map(() => (
        <Avatar />
      ))}
    </AvatarGroup>
  );
};
