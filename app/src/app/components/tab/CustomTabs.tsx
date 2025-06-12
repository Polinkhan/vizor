import { alpha } from "@mui/system";
import { ReactNode, useEffect } from "react";
import { Stack, Tab, Tabs } from "@mui/material";
import { useSearchParams } from "react-router-dom";

export type tabListType = {
  label: string;
  icon?: ReactNode;
  component: ReactNode;
};

interface CustomTabsProps {
  gap?: number;
  tabList: tabListType[];
  orientation?: "horizontal" | "vertical";
}

const CustomTabs = ({ tabList, orientation = "horizontal", gap = 0 }: CustomTabsProps) => {
  // ------------------------------------------
  // Hooks
  // ------------------------------------------
  const [searchParam, setSearchParams] = useSearchParams({ tab: tabList[0].label });

  // ------------------------------------------
  // Variables
  // ------------------------------------------
  const tabValue = searchParam.get("tab");
  const isVertical = orientation === "vertical";

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
    <Stack flex={1} flexDirection={isVertical ? "row" : "column"} gap={gap}>
      <Tabs
        value={tabValue}
        variant="scrollable"
        onChange={handleChange}
        textColor="primary"
        orientation={orientation}
        TabIndicatorProps={{
          sx: {
            borderRadius: 1,
            [isVertical ? "width" : "height"]: 1,
            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
          },
        }}
        sx={{
          paddingTop: isVertical ? gap || 2 : 0,
          paddingLeft: isVertical ? gap || 2 : 0,
          paddingRight: isVertical ? gap || 2 : 0,
          borderRight: isVertical ? "1px solid #f0f0f0" : "none",
        }}
      >
        {tabList.map(({ label, icon }, i) => {
          const Label = (
            <Stack flexDirection={"row"} alignItems={"center"}>
              {label}
            </Stack>
          );
          return (
            <Tab
              key={i}
              // @ts-ignore
              icon={icon}
              value={label}
              label={Label}
              sx={
                isVertical
                  ? {
                      gap: 1,
                      width: 250,
                      minHeight: icon ? 60 : 40,
                      display: "flex",
                      justifyContent: "start",
                      transition: "color 0.3s ease",
                      "&:hover": { color: "primary.main" },
                    }
                  : undefined
              }
            />
          );
        })}
      </Tabs>

      {tabList.map(({ label, component }) => {
        if (tabValue === label) {
          return (
            <Stack pt={gap} pr={gap} flex={1} key={label}>
              {component}
            </Stack>
          );
        }
      })}
    </Stack>
  );
};

export default CustomTabs;
