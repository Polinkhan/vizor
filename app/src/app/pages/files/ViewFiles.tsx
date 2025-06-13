import { Container, Divider, Drawer, Grid, Stack, Typography } from "@mui/material";
import useSocket from "../../hooks/socket/use-socket";
import { useEffect } from "react";
import Fade from "../../components/animate/Fade";
import FileItem from "./FileItem";
import FileInfo from "./FileInfo";
import { BackForward, Breadcrumb } from "./NavItems";
import DrawerContent from "./DrawerContent";
import { setLastFilePath } from "../../common/storage-helper";
import { useLocalContext } from "../../context/local-context";
import { defaultValue, FileContextTypes } from ".";
import Popover from "./Popover";

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

// const getLastFilePath = localStorage.getItem("last_file_path") ?? "/";

const ViewFiles = () => {
  // -----------------------
  // Hooks
  // -----------------------
  const { value, setValue } = useLocalContext();
  const { drawer, path, selected, reRender } = value as FileContextTypes;

  const { data }: { data: fileDataType } = useSocket({
    type: "files",
    dependencies: [path, reRender],
    payload: { path: path.join("/") },
  });

  useEffect(() => {
    setLastFilePath(path);
  }, [path]);

  if (!data) return;

  const handleRightClick = (e: any, type: "dir" | "file" | "root") => {
    e.preventDefault();
    e.stopPropagation();

    const anchorEl = type === "root" ? undefined : e.currentTarget;
    const anchorReference = type === "root" ? "anchorPosition" : "anchorEl";
    const selected = type === "root" ? defaultValue.selected : value.selected;
    const position = type === "root" ? { top: e.clientY, left: e.clientX } : undefined;

    setValue((prev: FileContextTypes) => ({
      ...prev,
      selected,
      contextMenu: { open: true, anchorReference, anchorEl, position },
    }));
  };

  const getSelected = (props: dirFileType, type: "dir" | "file") => {
    return {
      type,
      name: props.name,
      size: props.size,
      permissions: props.permissions,
      id: path + props.name,
      mimeType: props.mimeType ?? "",
    };
  };

  return (
    <Stack
      height={1}
      overflow={"auto"}
      onContextMenu={(e) => e.preventDefault()}
      onClick={() => {
        setValue((prev: FileContextTypes) => ({ ...prev, selected: defaultValue.selected }));
        console.log("Clicked anywhere");
      }}
    >
      <Stack px={2} py={1.5} gap={4} direction={"row"} alignItems={"center"}>
        <BackForward />
        <Breadcrumb />
      </Stack>
      <Divider />

      <Stack flex={1} direction={"row"} overflow={"auto"}>
        <Stack p={2} flex={1} overflow={"auto"} onContextMenu={(e) => handleRightClick(e, "root")}>
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
                {data.dirs.map((props, index: number) => {
                  const isSelected = selected.id === path + props.name;
                  return (
                    <FileItem
                      key={index}
                      label={props.name}
                      componentFor="folder"
                      isSelected={isSelected}
                      onClick={(e) => {
                        e.stopPropagation();
                        setValue((prev: FileContextTypes) => ({ ...prev, selected: getSelected(props, "dir") }));
                      }}
                      onContextMenu={(e) => {
                        handleRightClick(e, "dir");
                        setValue((prev: FileContextTypes) => ({ ...prev, selected: getSelected(props, "dir") }));
                      }}
                      onDoubleClick={() => {
                        setValue((prev: FileContextTypes) => ({
                          ...prev,
                          forwardHistory: [...prev.forwardHistory, prev.path],
                          path: [...prev.path, props.name],
                        }));
                      }}
                    />
                  );
                })}
                {data.files.map((props, index: number) => {
                  const isSelected = selected.id === path + props.name;

                  return (
                    <FileItem
                      key={index}
                      label={props.name}
                      mimeType={props.mimeType}
                      componentFor="file"
                      isSelected={isSelected}
                      onClick={(e) => {
                        e.stopPropagation();
                        setValue((prev: FileContextTypes) => ({ ...prev, selected: getSelected(props, "file") }));
                      }}
                      onContextMenu={(e) => {
                        handleRightClick(e, "file");
                        setValue((prev: FileContextTypes) => ({ ...prev, selected: getSelected(props, "file") }));
                      }}
                      onDoubleClick={() => setValue((prev: FileContextTypes) => ({ ...prev, drawer: { open: true } }))}
                    />
                  );
                })}
              </Grid>
            </Container>
          </Fade>
        </Stack>

        <FileInfo data={selected} path={path} />
      </Stack>

      <Popover />

      <Drawer
        anchor="right"
        open={drawer.open}
        onClose={() => setValue((prev: FileContextTypes) => ({ ...prev, drawer: { open: false } }))}
      >
        <Stack height={1} width={"50vw"} onClick={(e) => e.stopPropagation()}>
          <DrawerContent data={selected} path={path} />
        </Stack>
      </Drawer>
    </Stack>
  );
};

export default ViewFiles;
