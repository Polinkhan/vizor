import { useSnackbar } from "notistack";
import { HFFieldType, UserType } from "../../../../common/types/types.user";
import { Container, Grid, GridProps, Stack } from "@mui/material";
import FormProvider from "../../../../components/hook-form/form-provider";
import useFormScheme from "../../../../hooks/custom/use-form-scheme";
import HFTextField from "../../../../components/hook-form/hf-text-field";
import { FetchApiType } from "../../../../common/types/types.api";
import useMultiFetch from "../../../../hooks/fetch/ use-multi-fetch";
import { getClient } from "../../../../common/config/client";
import { useNavigate } from "react-router-dom";
import ComponentLoader from "../../../../components/lodaer/ComponentLoader";
import { TeamType } from "../../../../common/types/types.team";
import { TeamSchema } from "../../../../common/schema/team-schema";
import { TeamProfileCover, TeamProfileCoverProps } from "./Components";
import CustomMultiSelect from "../../../../components/select/custom-multi-select";
import useFetch from "../../../../hooks/fetch/use-fetch";
import { useState } from "react";

const ManageTeamView = ({ team }: { team: TeamType }) => {
  return (
    <Stack sx={{ height: 1 }}>
      <Container sx={{ height: 1, overflow: "auto" }}>
        <Stack pb={2} gap={2} height={1}>
          <TeamFormProvider team={team} />
        </Stack>
      </Container>
    </Stack>
  );
};

interface TeamFormProviderProps {
  team: TeamType;
}

const TeamFormProvider = ({ team }: TeamFormProviderProps) => {
  // ------------------------------------------
  // Hooks
  // ------------------------------------------
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // --------------------------------------------
  // States
  // --------------------------------------------
  const [users, setUsers] = useState(team.users);

  // ------------------------------------------
  // Variables
  // ------------------------------------------
  const { id, ...rest } = team;
  const method = useFormScheme({ scheme: TeamSchema, defaultValues: { ...rest } });
  const { handleSubmit } = method;

  // ------------------------------------------
  // Functions
  // ------------------------------------------
  const onSubmit = handleSubmit(async (form_data) => {
    const client = getClient("team");
    try {
      const { data } = await client.put(`update_team/${id}`, { ...form_data, users });
      enqueueSnackbar(data?.message, { variant: "success" });
      navigate("/app/settings/user_management?tab=Team");
    } catch (err: any) {
      enqueueSnackbar(err?.message, { variant: "error" });
    }
  });

  // ------------------------------------------
  // Props
  // ------------------------------------------
  const TeamProfileCoverProps: TeamProfileCoverProps = {
    onSave: onSubmit,
    primaryText: team.name,
    avatarUrl: team.photoUrl,
  };

  return (
    <>
      <TeamProfileCover {...TeamProfileCoverProps} />
      <Stack gap={3} p={3} flex={1} boxShadow={5} borderRadius={3}>
        <FormProvider methods={method}>
          <TeamForm />
        </FormProvider>
        <MultiUserSelect users={users} setUsers={setUsers} />
      </Stack>
    </>
  );
};

interface TeamFormProps {
  GridItem?: GridProps;
  GridContainer?: GridProps;
}

export const TeamForm = ({ GridItem, GridContainer }: TeamFormProps) => {
  // ------------------------------------------
  // Variables
  // ------------------------------------------
  // const userOptions = data.map(({id})=>())
  const teamFields: HFFieldType[] = [
    { name: "name", label: "Name", type: "input" },
    { name: "description", label: "Description", type: "input" },
  ];

  return (
    <Grid container spacing={4} {...GridContainer}>
      {teamFields.map((field, index) => (
        <Grid item xs={12} sm={field.type === "multiSelect" ? 12 : 6} key={index} {...GridItem}>
          {field.type === "input" && <HFTextField {...field} />}
        </Grid>
      ))}
    </Grid>
  );
};

const MultiUserSelect = ({ users, setUsers }: any) => {
  // ------------------------------------------
  // Fetch Data
  // ------------------------------------------
  const api: FetchApiType = { method: "GET", type: "user", url: "get_all_user" };
  const { data }: { data: UserType[] } = useFetch({ api });

  const field = { name: "UserIds", label: "Users", type: "multiSelect", options: data };

  const handleChange = (e: any) => {
    setUsers(e.target.value);
  };

  return (
    <ComponentLoader data={data}>
      <CustomMultiSelect value={users} onChange={handleChange} {...field} />
    </ComponentLoader>
  );
};

export const TeamKanban = () => {
  // ------------------------------------------
  // Fetch Data
  // ------------------------------------------
  const apis: FetchApiType[] = [{ method: "GET", type: "user", url: "get_all_user" }];
  const { data } = useMultiFetch({ apis });

  return (
    <ComponentLoader data={data}>
      <Stack gap={3} height={1} direction={"row"}>
        <Stack boxShadow={3} flex={1} borderRadius={2}></Stack>
        <Stack boxShadow={3} flex={1} borderRadius={2}></Stack>
      </Stack>
    </ComponentLoader>
  );
};

export default ManageTeamView;
