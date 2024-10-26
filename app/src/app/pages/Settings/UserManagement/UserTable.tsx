import { Button } from "@mui/material";
import { CustomTable } from "../../../components/table/custom-table";
import { UserColumns, UserTableHeader } from "./utils";
import { FaUser } from "react-icons/fa";
import useToggle from "../../../hooks/custom/use-toggle";
import { useSnackbar } from "notistack";
import useFormScheme from "../../../hooks/custom/use-form-scheme";
import { UserCreateSchema } from "../../../common/schema/user-schema";
import { getClient } from "../../../common/config/client";
import { TableComponentProps, TablefilterListType } from "../../../common/types/types.table";
import { getErrorMessage } from "../../../common/helpers";
import CustomDialog, { DialogActionsType } from "../../../components/dialog/CustomDialog";
import { useEffect } from "react";
import FormProvider from "../../../components/hook-form/form-provider";
import Cover from "../../../components/cover/Cover";
import { UserType } from "../../../common/types/types.user";
import { UserForm } from "./ManageUser/ManageUserView";

const UserTable = ({ data, reRender }: TableComponentProps<UserType>) => {
  // ------------------------------------------
  // Hooks
  // ------------------------------------------
  const toggle = useToggle();
  const { enqueueSnackbar } = useSnackbar();
  const method = useFormScheme({ scheme: UserCreateSchema, defaultValues: {} });
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
    const client = getClient("user");
    try {
      const { data } = await client.post("create_user", form_data);
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
      Create User
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
      <Cover primaryText="New User" secondaryText="Group" />
      <UserForm GridItem={{ lg: 6 }} />
    </FormProvider>
  );

  // ------------------------------------------
  // Table props
  // ------------------------------------------
  const filterList: Omit<TablefilterListType, "data">[] = [
    { label: "Account Status", key: "accountStatus", defaultFilters: ["Active"] },
    { label: "Group", key: "group", defaultFilters: [] },
  ];

  return (
    <>
      <CustomTable
        data={data}
        filterList={filterList}
        header={UserTableHeader}
        iconButtons={iconButtons}
        resource={{ columns: UserColumns, reRender }}
      />
      <CustomDialog
        toggle={toggle}
        actions={actions}
        DialogBody={DialogBody}
        header="Create New User"
        sx={{ minWidth: { md: 850 }, minHeight: 500 }}
      />
    </>
  );
};

export default UserTable;
