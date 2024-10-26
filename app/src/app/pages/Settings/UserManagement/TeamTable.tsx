import { useSnackbar } from "notistack";
import { TableComponentProps, TablefilterListType } from "../../../common/types/types.table";
import CustomDialog, { DialogActionsType } from "../../../components/dialog/CustomDialog";
import { CustomTable } from "../../../components/table/custom-table";
import useToggle from "../../../hooks/custom/use-toggle";
import { TeamColumns, TeamTableHeader } from "./utils";
import useFormScheme from "../../../hooks/custom/use-form-scheme";
import FormProvider from "../../../components/hook-form/form-provider";
import Cover from "../../../components/cover/Cover";
import { useEffect } from "react";
import { getClient } from "../../../common/config/client";
import { getErrorMessage } from "../../../common/helpers";
import { TeamSchema } from "../../../common/schema/team-schema";
import { Button, Stack } from "@mui/material";
import { FaUser } from "react-icons/fa";
import { TeamType } from "../../../common/types/types.team";
import HFTextField from "../../../components/hook-form/hf-text-field";

const TeamTable = ({ data, reRender }: TableComponentProps<TeamType>) => {
  // ------------------------------------------
  // Hooks
  // ------------------------------------------
  const toggle = useToggle();
  const { enqueueSnackbar } = useSnackbar();
  const method = useFormScheme({ scheme: TeamSchema, defaultValues: { name: "", description: "" } });
  const { handleSubmit, setError, reset } = method;

  // ------------------------------------------
  // Reseting form when modal is closed
  // ------------------------------------------
  useEffect(() => {
    if (toggle.open == false) {
      reset();
    }
  }, [toggle.open]);

  // ------------------------------------------
  // Functions
  // ------------------------------------------
  const onSubmit = handleSubmit(async (form_data) => {
    const client = getClient("team");
    try {
      const { data } = await client.post("create_team", form_data);
      reRender();
      toggle.onClose();
      enqueueSnackbar(data.message, { variant: "success" });
    } catch (err: any) {
      const errorData = err?.response?.data;
      if (errorData?.status === 400) {
        const errors = JSON.parse(errorData?.message || "{}");
        Object.keys(errors).map((name) => {
          setError(name, { message: errors[name] });
        });
      } else {
        enqueueSnackbar(getErrorMessage(err), { variant: "error" });
      }
    }
  });

  // ------------------------------------------
  // variables
  // ------------------------------------------
  const iconButtons = [
    <Button size="large" variant="soft" startIcon={<FaUser size={18} />} onClick={toggle.onOpen}>
      Create Team
    </Button>,
  ];

  // ------------------------------------------
  // Dialogs props
  // ------------------------------------------
  const actions: DialogActionsType = [
    { name: "Create", onClick: onSubmit, color: "primary" },
    { name: "Close", onClick: toggle.onClose },
  ];

  const DialogBody = (
    <FormProvider methods={method}>
      <Cover primaryText="New Team" />
      <CreateTeamDialogBody />
    </FormProvider>
  );

  // ------------------------------------------
  // Table props
  // ------------------------------------------
  const filterList: Omit<TablefilterListType, "data">[] = [
    // No filter
  ];

  return (
    <>
      <CustomTable
        data={data}
        filterList={filterList}
        header={TeamTableHeader}
        iconButtons={iconButtons}
        resource={{ columns: TeamColumns, reRender }}
      />
      <CustomDialog
        toggle={toggle}
        actions={actions}
        DialogBody={DialogBody}
        header="Create New Team"
        sx={{ minWidth: { md: 550 }, minHeight: 500 }}
      />
    </>
  );
};

const CreateTeamDialogBody = () => {
  return (
    <Stack gap={2}>
      <HFTextField name="name" label="Team name" />
      <HFTextField multiline minRows={3} name="description" label="Team description" />
    </Stack>
  );
};

export default TeamTable;
