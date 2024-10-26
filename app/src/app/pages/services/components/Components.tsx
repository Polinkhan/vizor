import { Stack, Typography } from "@mui/material";
import { capitalizeFirstLetter } from "../../../common/common";
import { ServicesType } from "../../../common/types/types.services";
import { TableComponentProps } from "../../../common/types/types.table";
import ActionButton from "../../../components/Buttons/ActionButton";
import RunningProgress from "../../../components/Loading/RunningProgress";
import useToggle from "../../../hooks/custom/use-toggle";
import { useSnackbar } from "notistack";
import { getClient } from "../../../common/config/client";
import { getErrorMessage } from "../../../common/helpers";
import CustomDialog, { DialogActionsType } from "../../../components/dialog/CustomDialog";

export const Status = ({ data }: TableComponentProps<ServicesType>) => {
  return (
    <Stack flexDirection={data.sub === "running" ? "column" : "row"} height={1} justifyContent={"center"} gap={0.5}>
      <Typography variant="caption" color={"grey.500"} fontWeight={500}>
        {capitalizeFirstLetter(data.sub)}
      </Typography>
      {data.sub === "running" && <RunningProgress />}
    </Stack>
  );
};

export const CpuInfo = ({ data }: TableComponentProps<ServicesType>) => {
  return <Stack>{typeof data.cpu_usage === "number" ? data.cpu_usage.toFixed(0) + " %" : data.cpu_usage}</Stack>;
};

export const MemInfo = ({ data }: TableComponentProps<ServicesType>) => {
  return (
    <Stack gap={1} direction={"row"} alignItems={"center"}>
      <Stack flex={1.5} justifyContent={"center"} alignItems={"end"}>
        <Typography fontSize={13}>Allocated :</Typography>
        <Typography fontSize={13}>Used :</Typography>
      </Stack>
      <Stack flex={1} justifyContent={"center"} alignItems={"start"}>
        <Typography fontWeight={600} fontSize={12} color={"primary.main"}>
          {typeof data.vms === "number" ? data.vms.toFixed(0) + " MB" : data.vms}
        </Typography>
        <Typography fontWeight={600} fontSize={12} color={"info.dark"}>
          {typeof data.rss === "number" ? data.rss.toFixed(0) + " MB" : data.rss}
        </Typography>
      </Stack>
    </Stack>
  );
};

export const ActiveState = ({ data }: TableComponentProps<ServicesType>) => {
  return <Stack>{capitalizeFirstLetter(data.active)}</Stack>;
};

export const LoadState = ({ data }: TableComponentProps<ServicesType>) => {
  return <Stack>{capitalizeFirstLetter(data.load)}</Stack>;
};

export const ActionField = ({ data, reRender }: TableComponentProps<ServicesType>) => {
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
    const client = getClient();
    try {
      const body = { name: data.service_name, action: resource };
      await client.post("api/update_service", body);
      enqueueSnackbar(`${data.service_name} ${resource} successfully`, { variant: "success" });
      toggle.onClose();
      reRender();
    } catch (err) {
      toggle.onClose();
      enqueueSnackbar(getErrorMessage(err), { variant: "error" });
    }
  };

  // ------------------------------------------
  // Dialog Data
  // ------------------------------------------
  let confirmButton: any = {};
  if (resource === "stop") confirmButton = { name: "Stop", color: "error" };
  if (resource === "start") confirmButton = { name: "Start", color: "primary" };
  if (resource === "restart") confirmButton = { name: "Restart", color: "primary" };

  const actions: DialogActionsType = [
    { onClick: handleClick, ...confirmButton },
    { name: "Close", onClick: toggle.onClose },
  ];

  // ------------------------------------------
  // Render Component
  // ------------------------------------------
  return (
    <>
      {data.sub === "dead" && (
        <>
          <ActionButton color="primary" icon={"play"} title="start" onClick={() => toggle.onOpen("start")} />
          <ActionButton
            color="primary"
            icon={"restart"}
            title="Restart"
            onClick={() => toggle.onOpen("restart")}
            iconSize={20}
          />
        </>
      )}

      {data.sub == "running" && (
        <>
          <ActionButton color="error" icon={"stop"} title="stop" onClick={() => toggle.onOpen("stop")} />
          <ActionButton
            color="primary"
            icon={"restart"}
            title="Restart"
            onClick={() => toggle.onOpen("restart")}
            iconSize={20}
          />
        </>
      )}

      <CustomDialog
        toggle={toggle}
        actions={actions}
        DialogBody={<></>}
        header={"Confirm " + capitalizeFirstLetter(resource)}
      />
    </>
  );
};
