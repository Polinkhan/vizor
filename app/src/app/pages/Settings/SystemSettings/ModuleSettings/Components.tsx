import { Button, Divider, Grid, ListItemButton, Stack, Typography } from "@mui/material";
import { ModuleType } from "../../../../common/types/types.ui";
import { TiInfo } from "react-icons/ti";
import FormProvider from "../../../../components/hook-form/form-provider";
import useFormScheme from "../../../../hooks/custom/use-form-scheme";
import HFTextField from "../../../../components/hook-form/hf-text-field";
import { ModuleSchema } from "../../../../common/schema/module-schema";
import { useUIContext } from "../../../../hooks/context/use-ui-context";
import HFSelectField, { HFListType } from "../../../../components/hook-form/hf-select-field";
import { HFFieldType } from "../../../../common/types/types.user";
import { Module } from "../../../../components/images/Image";
import CustomDialog from "../../../../components/dialog/CustomDialog";
import useToggle from "../../../../hooks/custom/use-toggle";
import { useState } from "react";
import { getClient } from "../../../../common/config/client";
import { useSnackbar } from "notistack";
import { getErrorMessage } from "../../../../common/helpers";
import CustomButton from "../../../../components/Buttons/LoadingButton";
import { FaSave } from "react-icons/fa";

interface ModuleSettingsComponentProps {
  reRender: any;
  setSelected: any;
  module: ModuleType | undefined;
}

interface Props {
  reRender: any;
  setSelected: any;
  selectedmodule: ModuleType;
}

export const ModuleSettingsComponent = ({
  module,
  reRender,
  setSelected,
}: ModuleSettingsComponentProps) => {
  // ------------------------------------------
  // Hooks
  // ------------------------------------------
  const { init } = useUIContext();
  const { enqueueSnackbar } = useSnackbar();
  const method = useFormScheme({ scheme: ModuleSchema, defaultValues: module });

  // ------------------------------------------------------
  // A warning message that no module is selected to modify
  // ------------------------------------------------------
  if (module === undefined) {
    return (
      <Stack height={0.8} justifyContent={"center"} alignItems={"center"}>
        <TiInfo size={200} color="#eee" />
        <Typography color={"grey"}>Please select a module to change settings</Typography>
      </Stack>
    );
  }

  // ------------------------------------------
  // Functions
  // ------------------------------------------
  const onSave = method.handleSubmit(async (form_data) => {
    const { icon, children, active_url, position, ...rest } = form_data;
    const client = getClient("ui");
    try {
      const { data } = await client.patch("update_module", rest);
      init();
      reRender();
      setSelected(data?.data);
      enqueueSnackbar(data?.message, { variant: "success" });
    } catch (err) {
      enqueueSnackbar(getErrorMessage(err), { variant: "error" });
    }
  });

  return (
    <Stack height={1} gap={3}>
      <Typography textAlign={"center"} variant="h4">
        {module.name}
      </Typography>

      <Divider />

      <Stack flex={1} gap={3}>
        <FormProvider methods={method}>
          <ModuleSettingForm
            reRender={reRender}
            selectedmodule={module}
            setSelected={setSelected}
          />
        </FormProvider>
        <CustomButton
          color="primary"
          onClick={onSave}
          icon={<FaSave size={18} />}
          sx={{ alignSelf: "end" }}
        >
          Save Settings
        </CustomButton>

        <Divider />

        <ModuleIcon reRender={reRender} selectedmodule={module} setSelected={setSelected} />
      </Stack>
    </Stack>
  );
};

const ModuleSettingForm = ({ selectedmodule }: Props) => {
  const { modules } = useUIContext();
  const { allModules } = modules;

  const moduleList = allModules
    .filter(({ id }) => id !== selectedmodule.id)
    .map(({ id, name }) => ({ label: name, value: id }));

  const rootModuleList: HFListType = [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ];

  // @ts-ignore
  moduleList.unshift({ label: "No Parent Module", value: null });

  // ------------------------------------------
  // Variables
  // ------------------------------------------
  const moduleFields: HFFieldType[] = [
    { name: "name", label: "Name", type: "input" },
    { name: "section", label: "Section Name", type: "input" },
    { name: "rootModule", label: "Set as Sidebar Module", type: "select", list: rootModuleList },
    { name: "parentId", label: "Parent Module", type: "select", list: moduleList },
    { name: "url", label: "Module URL", type: "input" },
  ];

  return (
    <Stack gap={2}>
      <Typography variant="caption" fontWeight={"bold"} color={"grey.500"}>
        Module Details
      </Typography>
      <Grid container spacing={3}>
        {moduleFields.map((field, index) => (
          <Grid item xs={12} md={6} lg={4} key={index} {...field.GridProps}>
            {field.type === "input" && <HFTextField {...field} />}
            {field.type === "select" && <HFSelectField lists={field.list} {...field} />}
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

const ModuleIcon = ({ selectedmodule, setSelected, reRender }: Props) => {
  return (
    <Stack gap={4} height={1} flexDirection={"row"} alignItems={"center"}>
      <Stack gap={4} flex={1} alignItems={"center"}>
        <Typography variant="caption" fontWeight={"bold"} color={"grey.500"}>
          {selectedmodule.parentId !== null && "Module Icon"}
          {selectedmodule.parentId === null && "Can't Change Sidebar Module Icon"}
        </Typography>
        {selectedmodule.parentId !== null && (
          // @ts-ignore
          <>
            {Module?.[selectedmodule.icon]}
            <ChangeModuleIcon
              reRender={reRender}
              selectedmodule={selectedmodule}
              setSelected={setSelected}
            />
          </>
        )}
      </Stack>

      <Divider orientation="vertical" />

      <Stack gap={4} flex={1} alignItems={"center"}>
        <Typography variant="caption" fontWeight={"bold"} color={"grey.500"}>
          Action
        </Typography>
        <Button variant="soft" color="error">
          Delete Module
        </Button>
        <Button variant="soft" color="secondary">
          Archive Module
        </Button>
      </Stack>
    </Stack>
  );
};

const ChangeModuleIcon = ({ selectedmodule, reRender, setSelected }: Props) => {
  // ------------------------------------------
  // Hooks
  // ------------------------------------------
  const toggle = useToggle();
  const { enqueueSnackbar } = useSnackbar();

  // ------------------------------------------
  // State
  // ------------------------------------------
  const [selectedIcon] = useState<any>(selectedmodule.icon);

  // ------------------------------------------
  // Funstions
  // ------------------------------------------
  const onUpdate = async (icon: string) => {
    const client = getClient("ui");
    try {
      const { data } = await client.patch("update_module", {
        icon, id: selectedmodule.id,
      });
      reRender();
      setSelected(data?.data);
      toggle.onClose();
      enqueueSnackbar(data?.message, { variant: "success" });
    } catch (err) {
      enqueueSnackbar(getErrorMessage(err), { variant: "error" });
    }
  };

  return (
    <>
      <Button variant="soft" onClick={toggle.onOpen}>
        Change icon
      </Button>
      <CustomDialog
        disableAction
        toggle={toggle}
        header="Change Module Icon"
        sx={{ minWidth: { xs: 0.95, md: 850 } }}
        DialogBody={<DialogBody selectedIcon={selectedIcon} onUpdate={onUpdate} />}
      />
    </>
  );
};

type iconType = keyof typeof Module;

const DialogBody = ({ selectedIcon, onUpdate }: any) => {
  // ------------------------------------------
  // Variables
  // ------------------------------------------
  const iconList = Object.keys(Module) as iconType[];

  return (
    <Stack maxHeight={600}>
      <Grid container spacing={1}>
        {iconList.map((icon, i) => {
          const selected = selectedIcon === icon;
          return (
            <Grid key={i} item xs={6} sm={3} lg={2}>
              <ListItemButton
                onClick={() => onUpdate(icon)}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  cursor: "pointer",
                  bgcolor: selected ? "grey.200" : "transparent",
                  "&:hover": { bgcolor: selected ? "grey.200" : "grey.50" },
                }}
              >
                {Module[icon]}
              </ListItemButton>
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
};
