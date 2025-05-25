import { useCallback, useState } from "react";
import debounce from "lodash.debounce";
import { TextField, Typography } from "@mui/material";
import ComponentLoader from "../../components/lodaer/ComponentLoader";
import RefreshSelect from "../../components/refresh/RefreshSelect";
import { CustomTable } from "../../components/table/custom-table";
import useRefresh from "../../hooks/custom/use-refresh";
import useRerender from "../../hooks/custom/use-rerender";
import CustomSelect from "../../components/select/custom-select";

const LoggerView = () => {
  // ------------------------------------------
  // States
  // ------------------------------------------

  const log_lines = localStorage.getItem("log_lines") || 10;
  const log_format = localStorage.getItem("log_format") || "none";
  const log_file_path = localStorage.getItem("log_file_path") || "";
  const log_filter_keyword = localStorage.getItem("log_filter_keyword") || "";
  const [body, setBody] = useState({
    log_file_path,
    log_filter_keyword,
    log_format,
    log_lines,
  });

  // ------------------------------------------
  // Hooks
  // ------------------------------------------
  const { reRender } = useRerender();
  const { RefreshProps } = useRefresh();

  // ------------------------------------------
  // Variables
  // ------------------------------------------
  const line_lists = [
    { label: "5 Line", value: 5 },
    { label: "10 Line", value: 10 },
    { label: "25 Line", value: 25 },
    { label: "50 Line", value: 50 },
    { label: "100 Line", value: 100 },
  ];

  const format_lists = [
    { label: "None", value: "none" },
    { label: "Syslog", value: "syslog" },
    { label: "Custom", value: "custom" },
  ];

  // ------------------------------------------
  // Functions
  // ------------------------------------------
  const debouncedReRender = useCallback(debounce(reRender, 500), []);

  const handleChange = (key: keyof typeof body, value: any) => {
    // Set Value
    localStorage.setItem(key, value);
    setBody((prev) => ({ ...prev, [key]: value }));

    // Re-render
    if (key === "log_lines" || key === "log_format") {
      reRender();
    } else {
      debouncedReRender();
    }
  };

  const iconButtons = [
    <TextField
      value={body.log_file_path}
      sx={{ flex: 1.5 }}
      label="Log File Path"
      onChange={(e) => handleChange("log_file_path", e.target.value)}
    />,
    <TextField
      value={body.log_filter_keyword}
      sx={{ flex: 1 }}
      label="Keywords"
      onChange={(e) => handleChange("log_filter_keyword", e.target.value)}
    />,
    <CustomSelect
      value={body.log_format}
      lists={format_lists}
      label={"Log format"}
      fullWidth={false}
      sx={{ minWidth: 200 }}
      onChange={(e) => handleChange("log_format", e.target.value)}
    />,
    <CustomSelect
      value={body.log_lines}
      lists={line_lists}
      label={"Last line"}
      fullWidth={false}
      sx={{ minWidth: 200 }}
      onChange={(e) => handleChange("log_lines", e.target.value)}
    />,
    <RefreshSelect {...RefreshProps} sx={{ minWidth: 200 }} />,
  ];

  const data: any[] = [];

  return (
    <ComponentLoader data={data}>
      <CustomTable
        disableFilter
        paginated={false}
        data={data}
        header={[{ label: "Log" }]}
        iconButtons={iconButtons}
        resource={{
          columns: [
            {
              key: "log",
              Component: ({ data: log }) => <Typography fontSize={13} dangerouslySetInnerHTML={{ __html: log }} />,
            },
          ],
          reRender,
        }}
      />
    </ComponentLoader>
  );
};

export default LoggerView;
