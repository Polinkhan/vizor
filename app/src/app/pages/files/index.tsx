import { getLastFilePath } from "../../common/storage-helper";
import LocalContextProvider from "../../context/local-context";
import BodyLayout from "../../layouts/BodyLayout";
import ViewFiles from "./ViewFiles";

export const defaultValue = {
  contextMenu: {
    open: false,
    anchorEl: null,
    anchorReference: null,
    position: {
      top: 0,
      left: 0,
    },
  },
  drawer: { open: false },
  path: getLastFilePath(),
  forwardHistory: [],
  fileTransfer: {
    action: "",
    path: [],
    type: "",
  },
  selected: { id: "", name: "", size: 0, permissions: "", type: "", mimeType: "" },
  reRender: new String(""),
};

export type FileContextTypes = typeof defaultValue;

const Files = (props: any) => {
  return (
    <BodyLayout {...props}>
      <LocalContextProvider defaultValue={defaultValue}>
        <ViewFiles />
      </LocalContextProvider>
    </BodyLayout>
  );
};

export default Files;
