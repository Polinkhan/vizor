import { Container, Divider, Drawer, Grid, MenuItem, Stack, Typography } from "@mui/material";
import useSocket from "../../hooks/socket/use-socket";

import { MouseEvent, useState } from "react";
import usePopover from "../../hooks/custom/use-popover";
import CustomPopover from "../../components/popover/CustomPopover";
import Fade from "../../components/animate/Fade";
import FileItem from "./FileItem";
import FileInfo from "./FileInfo";
import { BackForward, Breadcrumb } from "./NavItems";
import DrawerContent from "./DrawerContent";
import SvgIcon from "../../components/icon/SvgIcon";

import move_icon from "../../../assets/svg/icons/cut.svg";
import copy_icon from "../../../assets/svg/icons/copy.svg";
import paste_icon from "../../../assets/svg/icons/paste.svg";
import rename_icon from "../../../assets/svg/icons/rename.svg";
import permission_icon from "../../../assets/svg/icons/lock.svg";

type dirFileType = {
  name: string;
  size: number;
  permissions: string;
  mimeType?: string;
};

type fileDataType = {
  error?: string;
  success: Boolean;
  dirs: dirFileType[];
  files: dirFileType[];
};

const ViewFiles = () => {
  const { open, onOpen, onClose } = usePopover();
  const [openDrawer, setopenDrawer] = useState(false);

  const [path, setPath] = useState(["/"]);
  const [forwardHistory, setForwardHistory] = useState<string[][]>([]);
  const [selected, setSelected] = useState({ id: "", name: "", size: 0, permissions: "", type: "", mimeType: "" });

  const { data }: { data: fileDataType } = useSocket({
    type: "files",
    dependencies: [path],
    payload: { path: path.join("/") },
  });

  if (!data) return;

  const handleRightClick = (e: any) => {
    onOpen(e);
    e.preventDefault(); // Prevent default browser context menu
    console.log("Right-clicked!", e.clientX, e.clientY);
  };

  const handleContextMenu = (e: MouseEvent<HTMLLIElement, globalThis.MouseEvent>) => {
    console.log(e);
    onClose();
  };

  return (
    <Stack
      height={1}
      overflow={"auto"}
      onContextMenu={(e) => e.preventDefault()}
      onClick={() => {
        setSelected({ id: "", name: "", size: 0, permissions: "", type: "", mimeType: "" });
        console.log("Clicked anywhere");
      }}
    >
      <Stack px={2} py={1.5} gap={4} direction={"row"} alignItems={"center"}>
        <BackForward
          path={path}
          setPath={setPath}
          forwardHistory={forwardHistory}
          setForwardHistory={setForwardHistory}
        />
        <Breadcrumb path={path} setPath={setPath} />
      </Stack>
      <Divider />

      <Stack flex={1} direction={"row"} overflow={"auto"}>
        <Stack p={2} flex={1} overflow={"auto"}>
          <Fade key={path.join("/")} duration={0.25}>
            <Container maxWidth={"xl"}>
              {!data.success && (
                <Stack alignItems={"center"} py={6} gap={2}>
                  {data.error?.includes("permission denied") && (
                    <Typography fontWeight={300} fontSize={20} color={"grey.700"}>
                      Please Enable sudo to access these files
                    </Typography>
                  )}

                  <Typography variant="body2" color={"grey.600"}>
                    Error : {data.error}
                  </Typography>
                </Stack>
              )}

              <Grid container rowSpacing={1}>
                {data.dirs.map(({ name, permissions, size }, index: number) => {
                  const isSelected = selected.id === path + name;
                  return (
                    <FileItem
                      key={index}
                      label={name}
                      componentFor="folder"
                      isSelected={isSelected}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelected({
                          name,
                          size,
                          permissions,
                          id: path + name,
                          type: "dir",
                          mimeType: "",
                        });
                      }}
                      onDoubleClick={() => {
                        setForwardHistory([]);
                        setPath((prev) => [...prev, name]);
                      }}
                      onContextMenu={(e) => {
                        handleRightClick(e);
                        setSelected({
                          name,
                          size,
                          permissions,
                          id: path + name,
                          type: "dir",
                          mimeType: "",
                        });
                      }}
                    />
                  );
                })}
                {data.files.map(({ name, size, permissions, mimeType }, index: number) => {
                  const isSelected = selected.id === path + name;

                  return (
                    <FileItem
                      key={index}
                      label={name}
                      mimeType={mimeType}
                      componentFor="file"
                      isSelected={isSelected}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelected({
                          name,
                          size,
                          permissions,
                          id: path + name,
                          type: "file",
                          mimeType: mimeType ?? "",
                        });
                      }}
                      onDoubleClick={() => setopenDrawer(true)}
                      onContextMenu={(e) => {
                        handleRightClick(e);
                        setSelected({
                          name,
                          size,
                          permissions,
                          id: path + name,
                          type: "dir",
                          mimeType: "",
                        });
                      }}
                    />
                  );
                })}
              </Grid>
            </Container>
          </Fade>
        </Stack>

        <FileInfo data={selected} path={path} />
      </Stack>

      <CustomPopover
        arrow={"top-left"}
        open={open}
        onClose={onClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{
          width: 200,
          p: 1,
          bgcolor: "background.paper",
          boxShadow: 3,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <MenuItem onClick={handleContextMenu}>
          <Stack direction={"row"} alignItems={"center"} gap={1}>
            <SvgIcon src={copy_icon} sx={{ height: 18 }} />
            <Typography variant="body2" mt={0.5}>
              Copy
            </Typography>
          </Stack>
        </MenuItem>
        <MenuItem onClick={handleContextMenu}>
          <Stack direction={"row"} alignItems={"center"} gap={1}>
            <SvgIcon src={move_icon} sx={{ height: 18 }} />
            <Typography variant="body2" mt={0.5}>
              Move
            </Typography>
          </Stack>
        </MenuItem>
        <MenuItem disabled>
          <Stack direction={"row"} alignItems={"center"} gap={1}>
            <SvgIcon src={paste_icon} sx={{ height: 18 }} />
            <Typography variant="body2" mt={0.5}>
              Paste
            </Typography>
          </Stack>
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleContextMenu}>
          <Stack direction={"row"} alignItems={"center"} gap={1}>
            <SvgIcon src={rename_icon} sx={{ height: 18 }} />
            <Typography variant="body2" mt={0.5}>
              Rename
            </Typography>
          </Stack>
        </MenuItem>
        <MenuItem onClick={handleContextMenu}>
          <Stack direction={"row"} alignItems={"center"} gap={1}>
            <SvgIcon src={permission_icon} sx={{ height: 18 }} />
            <Typography variant="body2" mt={0.5}>
              Change Permission
            </Typography>
          </Stack>
        </MenuItem>
      </CustomPopover>

      <Drawer open={openDrawer} anchor="right" onClose={() => setopenDrawer(false)}>
        <Stack height={1} width={"50vw"} onClick={(e) => e.stopPropagation()}>
          <DrawerContent data={selected} path={path} />
        </Stack>
      </Drawer>
    </Stack>
  );
};

export default ViewFiles;
