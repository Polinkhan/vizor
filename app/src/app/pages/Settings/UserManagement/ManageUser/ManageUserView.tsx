import { useSnackbar } from "notistack";
import { HFFieldType, UserType } from "../../../../common/types/types.user";
import { Container, Grid, GridProps, Stack } from "@mui/material";
import { UserProfileCover, UserProfileCoverProps } from "./Components";
import FormProvider from "../../../../components/hook-form/form-provider";
import useFormScheme from "../../../../hooks/custom/use-form-scheme";
import HFTextField from "../../../../components/hook-form/hf-text-field";
import { UserSchema } from "../../../../common/schema/user-schema";
import HFSelectField, { HFListType } from "../../../../components/hook-form/hf-select-field";
import { FetchApiType } from "../../../../common/types/types.api";
import useMultiFetch from "../../../../hooks/fetch/ use-multi-fetch";
import { GroupType } from "../../../../common/types/types.group";
import { getClient } from "../../../../common/config/client";
import { useNavigate } from "react-router-dom";
import ComponentLoader from "../../../../components/lodaer/ComponentLoader";

const ManageUserView = ({ user }: { user: UserType }) => {
  return (
    <Stack sx={{ height: 1 }}>
      <Container sx={{ height: 1, overflow: "auto" }}>
        <Stack pb={2} gap={2} height={1}>
          <UserFormProvider user={user} />
        </Stack>
      </Container>
    </Stack>
  );
};

interface UserFormProviderProps {
  user: UserType;
}

const UserFormProvider = ({ user }: UserFormProviderProps) => {
  // ------------------------------------------
  // Hooks
  // ------------------------------------------
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // ------------------------------------------
  // Variables
  // ------------------------------------------
  const { id, team, group, management, ...rest } = user;
  const method = useFormScheme({ scheme: UserSchema, defaultValues: { ...rest, password: "" } });
  const { handleSubmit } = method;

  // ------------------------------------------
  // Functions
  // ------------------------------------------
  const onSubmit = handleSubmit(async (form_data) => {
    const client = getClient("user");
    try {
      const { data } = await client.put(`update_user/${user.id}`, form_data);
      enqueueSnackbar(data?.message, { variant: "success" });
      navigate("/app/settings/user_management?tab=User");
    } catch (err: any) {
      enqueueSnackbar(err?.message, { variant: "error" });
    }
  });

  // ------------------------------------------
  // Props
  // ------------------------------------------
  const UserProfileCoverProps: UserProfileCoverProps = {
    onSave: onSubmit,
    avatarUrl: user.name,
    primaryText: user.name,
    secondaryText: user.group.name,
  };

  return (
    <>
      <UserProfileCover {...UserProfileCoverProps} />
      <Stack p={4} flex={1} boxShadow={5} borderRadius={3}>
        <FormProvider methods={method}>
          <UserForm />
        </FormProvider>
      </Stack>
    </>
  );
};

interface UserFormProps {
  GridItem?: GridProps;
  GridContainer?: GridProps;
}

export const UserForm = ({ GridItem, GridContainer }: UserFormProps) => {
  // ------------------------------------------
  // Fetch Data
  // ------------------------------------------
  const apis: FetchApiType[] = [
    { method: "GET", type: "group", url: "get_all_group" },
    { method: "GET", type: "user", url: "get_all_roles" },
    { method: "GET", type: "team", url: "get_all_team" },
  ];
  const { data } = useMultiFetch({ apis });

  // if (!data) return <CircleLoading />;

  const teams: GroupType[] = data?.[2];
  const groups: GroupType[] = data?.[0];
  const roleList: HFListType = data?.[1];
  const teamlist: HFListType = teams?.map(({ id, name }) => ({ label: name, value: id }));
  const groupList: HFListType = groups?.map(({ id, name }) => ({ label: name, value: id }));

  // ------------------------------------------
  // Variables
  // ------------------------------------------
  const userFields: HFFieldType[] = [
    { name: "name", label: "Name", type: "input" },
    { name: "username", label: "Username", type: "input" },
    { name: "email", label: "Email", type: "input" },
    { name: "password", label: "New Password", type: "input" },
    { name: "phone", label: "Phone", type: "input" },
    { name: "role", label: "Role", type: "select", list: roleList },
    { name: "groupId", label: "Group", type: "select", list: groupList },
    { name: "teamId", label: "Team", type: "select", list: teamlist },
  ];

  return (
    <ComponentLoader data={data}>
      <Grid container spacing={4} {...GridContainer}>
        {userFields.map((field, index) => (
          <Grid item xs={12} sm={6} lg={4} key={index} {...GridItem}>
            {field.type === "input" && <HFTextField {...field} />}
            {field.type === "select" && <HFSelectField lists={field.list} {...field} />}
          </Grid>
        ))}
      </Grid>
    </ComponentLoader>
  );
};

export default ManageUserView;
