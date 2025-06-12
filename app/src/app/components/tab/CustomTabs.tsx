import { ReactNode, useEffect } from "react";
import { Stack, Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import { useSearchParams } from "react-router-dom";

export type tabListType = {
  label: string;
  component: ReactNode;
};

interface CustomTabsProps {
  tabList: tabListType[];
}

const CustomTabs = ({ tabList }: CustomTabsProps) => {
  // ------------------------------------------
  // Hooks
  // ------------------------------------------
  const [searchParam, setSearchParams] = useSearchParams({ tab: tabList[0].label });

  // ------------------------------------------
  // Variables
  // ------------------------------------------
  const tabValue = searchParam.get("tab");

  // ------------------------------------------
  // Functions
  // ------------------------------------------
  const handleChange = (_: any, value: string) => {
    setSearchParams({ tab: value });
  };

  // ------------------------------------------
  // lifeCycleHooks
  // ------------------------------------------
  useEffect(() => {
    if (tabValue === tabList[0].label) {
      setSearchParams({ tab: tabList[0].label });
    }
  }, []);

  return (
    <>
      <Box sx={{ px: 2, borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabValue} variant="scrollable" onChange={handleChange} textColor="primary">
          {tabList.map(({ label }, i) => {
            const Label = (
              <Stack flexDirection={"row"} alignItems={"center"}>
                {label}
              </Stack>
            );
            return <Tab key={i} value={label} label={Label} />;
          })}
        </Tabs>
      </Box>

      {tabList.map(({ label, component }) => {
        if (tabValue === label) {
          return (
            <Stack flex={1} key={label}>
              {component}
            </Stack>
          );
        }
      })}
    </>
  );
};

export default CustomTabs;
