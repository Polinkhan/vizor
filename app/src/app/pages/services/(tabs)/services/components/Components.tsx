import { Stack, Typography } from "@mui/material";
import { capitalizeFirstLetter } from "../../../../../common/common";
import { ServicesType } from "../../../../../common/types/types.services";
import { TableComponentProps } from "../../../../../common/types/types.table";
import ActionButton from "../../../../../components/Buttons/ActionButton";
import RunningProgress from "../../../../../components/Loading/RunningProgress";
import useToggle from "../../../../../hooks/custom/use-toggle";
import { useSnackbar } from "notistack";
import { convertBytes, getErrorMessage } from "../../../../../common/helpers";
import CustomDialog, { DialogActionsType } from "../../../../../components/dialog/CustomDialog";
import { useDataContext } from "../../../../../context/data-context";

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
  return data.memory_usage ? convertBytes(data.memory_usage) : "--";
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
  const { fetchSocketClient } = useDataContext();

  // ------------------------------------------
  // Functions
  // ------------------------------------------
  const handleClick = async () => {
    const payload = { action: resource, service_name: data.service_name };

    try {
      await fetchSocketClient("update_service", payload);
      reRender();
      toggle.onClose();
      enqueueSnackbar(`${data.service_name} ${resource} successfully`, { variant: "success" });
    } catch (error) {
      enqueueSnackbar(getErrorMessage(error), { variant: "error" });
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
