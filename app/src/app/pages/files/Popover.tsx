import { Divider, MenuItem, Stack, Typography } from "@mui/material";
import { FileContextTypes } from ".";
import CustomPopover from "../../components/popover/CustomPopover";
import { useLocalContext } from "../../context/local-context";
import SvgIcon from "../../components/icon/SvgIcon";
import { getSvgPath } from "../../common/helpers";
import { useEffect, useMemo } from "react";
import { useDataContext } from "../../context/data-context";
import { useSnackbar } from "notistack";

const Popover = () => {
  const { socket } = useDataContext();
  const { enqueueSnackbar } = useSnackbar();
  const { value, setValue } = useLocalContext();
  const { contextMenu, selected, fileTransfer, path } = value as FileContextTypes;

  useEffect(() => {
    if (!socket) return;

    socket.on("file_actions_response", (data: any) => {
      if (data.success) {
        enqueueSnackbar(data.message, { variant: "success" });
      } else {
        enqueueSnackbar(data.error, { variant: "error" });
      }

      console.log(data);
      setValue((prev: FileContextTypes) => ({
        ...prev,
        reRender: new String(""),
      }));
    });

    return () => {
      socket.off("file_actions_response");
    };
  }, [socket]);

  const handleClick = (action: string) => {
    switch (action) {
      case "copy":
        setValue((prev: FileContextTypes) => ({
          ...prev,
          fileTransfer: { action: "copy", path: [...path, selected.name], type: selected.type },
        }));
        break;
      case "move":
        setValue((prev: FileContextTypes) => ({
          ...prev,
          fileTransfer: { action: "move", path: [...path, selected.name], type: selected.type },
        }));
        break;
      case "delete":
        handleDelete();
        break;
    }

    setValue((prev: FileContextTypes) => ({ ...prev, contextMenu: { open: false } }));
  };

  const handlePaste = () => {
    const dst = path.join("/").replace("//", "/");
    const src = fileTransfer.path.join("/").replace("//", "/");

    socket.emit("file_actions", { action: fileTransfer.action, src, dst });

    setValue((prev: FileContextTypes) => ({
      ...prev,
      contextMenu: { open: false },
    }));

    setTimeout(() => {
      setValue((prev: FileContextTypes) => ({
        ...prev,
        fileTransfer: { action: "", path: "", type: "" },
      }));
    }, 300);
  };

  const handleDelete = () => {
    socket.emit("file_actions", { action: "delete", src: [...path, selected.name].join("/").replace("//", "/") });
  };

  const items = useMemo(() => getPopoverItems(selected, handleClick), [selected]);

  return (
    <CustomPopover
      arrow={"top-left"}
      open={contextMenu.open}
      disableEnforceFocus
      disableAutoFocus
      disableRestoreFocus
      anchorEl={contextMenu.anchorEl}
      anchorPosition={contextMenu.position}
      anchorReference={contextMenu.anchorReference as any}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      onClose={() =>
        setValue((prev: FileContextTypes) => ({
          ...prev,
          contextMenu: { open: false },
        }))
      }
      sx={{
        p: 1,
        width: 200,
        boxShadow: 3,
        bgcolor: "background.paper",
      }}
      onContextMenu={() =>
        setValue((prev: FileContextTypes) => ({
          ...prev,
          contextMenu: { open: false },
        }))
      }
      onClick={(e) => e.stopPropagation()}
    >
      {fileTransfer.action && selected.type === "" && (
        <MenuItem onClick={handlePaste}>
          <Stack direction={"row"} alignItems={"center"} gap={1}>
            <SvgIcon src={getSvgPath("paste")} sx={{ height: 18 }} />
            <Typography variant="body2" mt={0.5}>
              Paste
            </Typography>
          </Stack>
        </MenuItem>
      )}
      {items.map((item, index) => {
        if (item.divider) return <Divider />;

        return (
          <MenuItem key={index} onClick={item.onClick}>
            <Stack direction={"row"} alignItems={"center"} gap={1}>
              <SvgIcon src={item.icon ?? ""} sx={{ height: 18 }} />
              <Typography variant="body2" mt={0.5}>
                {item.label}
              </Typography>
            </Stack>
          </MenuItem>
        );
      })}
    </CustomPopover>
  );
};

const getPopoverItems = (selected: any, handleClick: any) => {
  switch (selected.type) {
    case "file":
      return [
        {
          label: "Copy",
          icon: getSvgPath("copy"),
          onClick: () => handleClick("copy"),
        },
        {
          label: "Move",
          icon: getSvgPath("move"),
          onClick: () => handleClick("move"),
        },
        {
          label: "Rename",
          icon: getSvgPath("rename"),
          onClick: () => handleClick("rename"),
        },
        {
          divider: true,
        },
        {
          label: "Change Permission",
          icon: getSvgPath("permission"),
          onClick: () => handleClick("permission"),
        },
        {
          label: "Delete",
          icon: getSvgPath("delete"),
          onClick: () => handleClick("delete"),
        },
      ];
    case "dir":
      return [
        {
          label: "Copy",
          icon: getSvgPath("copy"),
          onClick: () => handleClick("copy"),
        },
        {
          label: "Move",
          icon: getSvgPath("move"),
          onClick: () => handleClick("move"),
        },
        {
          label: "Rename",
          icon: getSvgPath("rename"),
          onClick: () => handleClick("rename"),
        },
        {
          label: "Change Permission",
          icon: getSvgPath("permission"),
          onClick: () => handleClick("permission"),
        },
        {
          label: "Delete",
          icon: getSvgPath("delete"),
          onClick: () => handleClick("delete"),
        },
      ];
    default:
      return [
        {
          label: "New Folder",
          icon: getSvgPath("folder-add"),
          onClick: () => handleClick("newFolder"),
        },
        {
          label: "New File",
          icon: getSvgPath("file-add"),
          onClick: () => handleClick("newFile"),
        },
      ];
  }
};

export default Popover;
