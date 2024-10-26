import { Button, Stack } from "@mui/material";
import { CustomTable } from "../../../components/table/custom-table";
import { GroupTableHeader, GroupColumns } from "./utils";
import { FaUsers } from "react-icons/fa";
import CustomDialog, { DialogActionsType } from "../../../components/dialog/CustomDialog";
import useToggle from "../../../hooks/custom/use-toggle";
import FormProvider from "../../../components/hook-form/form-provider";
import useFormScheme from "../../../hooks/custom/use-form-scheme";
import { GroupSchema } from "../../../common/schema/group-schema";
import HFTextField from "../../../components/hook-form/hf-text-field";
import { useSnackbar } from "notistack";
import { getClient } from "../../../common/config/client";
import { getErrorMessage } from "../../../common/helpers";
import { useEffect } from "react";
import { TableComponentProps, TablefilterListType } from "../../../common/types/types.table";
import Cover from "../../../components/cover/Cover";
import { GroupType } from "../../../common/types/types.group";

const GroupTable = ({ data, reRender }: TableComponentProps<GroupType>) => {
  // ------------------------------------------
  // Hooks
  // ------------------------------------------
  const toggle = useToggle();
  const { enqueueSnackbar } = useSnackbar();
  const method = useFormScheme({ scheme: GroupSchema, defaultValues: { name: "", description: "" } });
  const { handleSubmit, setError, reset } = method;

  // ------------------------------------------
  // Reseting form when modal is closed
  // ------------------------------------------
  useEffect(() => {
    reset();
  }, [toggle.open]);

  // ------------------------------------------
  // Functions
  // ------------------------------------------
  const onSubmit = handleSubmit(async (form_data) => {
    const client = getClient("group");
    try {
      const { data } = await client.post("create_group", form_data);
      reRender();
      toggle.onClose();
      enqueueSnackbar(data.message, { variant: "success" });
    } catch (err: any) {
      setError("name", { message: getErrorMessage(err) });
    }
  });

  // ------------------------------------------
  // variables
  // ------------------------------------------
  const iconButtons = [
    <Button size="large" variant="soft" startIcon={<FaUsers />} onClick={toggle.onOpen}>
      Create Group
    </Button>,
  ];

  const actions: DialogActionsType = [
    { name: "Create", onClick: onSubmit, color: "primary" },
    { name: "Close", onClick: toggle.onClose },
  ];

  const DialogBody = (
    <FormProvider methods={method}>
      <Cover size="sm" primaryText="New Group" secondaryText="Description" />
      <CreateGroupDialogBody />
    </FormProvider>
  );

  // ------------------------------------------
  // Table props
  // ------------------------------------------
  const filterList: Omit<TablefilterListType, "data">[] = [
    // No Filter
  ];

  return (
    <>
      <CustomTable
        data={data}
        filterList={filterList}
        header={GroupTableHeader}
        iconButtons={iconButtons}
        resource={{ columns: GroupColumns, reRender }}
      />
      <CustomDialog
        header="Create New Group"
        DialogBody={DialogBody}
        toggle={toggle}
        actions={actions}
        sx={{ minWidth: { md: 550 }, minHeight: 500 }}
      />
    </>
  );
};

const CreateGroupDialogBody = () => {
  return (
    <Stack gap={2}>
      <HFTextField name="name" label="Group name" />
      <HFTextField multiline minRows={3} name="description" label="Group description" />
    </Stack>
  );
};

export default GroupTable;
