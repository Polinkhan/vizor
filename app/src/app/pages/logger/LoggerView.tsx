import { useState } from "react";
import { TextField, Typography } from "@mui/material";
import { FetchApiType } from "../../common/types/types.api";
import ComponentLoader from "../../components/lodaer/ComponentLoader";
import RefreshSelect from "../../components/refresh/RefreshSelect";
import { CustomTable } from "../../components/table/custom-table";
import useRefresh from "../../hooks/custom/use-refresh";
import useRerender from "../../hooks/custom/use-rerender";
import useIntervalFetch from "../../hooks/fetch/use-interval-fetch";
import CustomSelect from "../../components/select/custom-select";

const LoggerView = () => {
  // ------------------------------------------
  // States
  // ------------------------------------------

  const lines = localStorage.getItem("log_lines") || 5;
  const file_path = localStorage.getItem("log_file_path") || "";
  const filter_keyword = localStorage.getItem("log_filter_keyword") || "";
  const [body, setBody] = useState({ file_path, filter_keyword, lines });

  console.log(body);

  // ------------------------------------------
  // Hooks
  // ------------------------------------------
  const { render, reRender } = useRerender();
  const { refreshAt, RefreshProps } = useRefresh();

  // ------------------------------------------
  // Fetching data
  // ------------------------------------------
  const api: FetchApiType = { method: "POST", url: "api/get_log", body };
  const { data } = useIntervalFetch({ api, dependency: [render], intervalTime: refreshAt });

  // ------------------------------------------
  // variables
  // ------------------------------------------
  const lists = [
    { label: "5 Line", value: 5 },
    { label: "10 Line", value: 10 },
    { label: "25 Line", value: 25 },
    { label: "50 Line", value: 50 },
    { label: "100 Line", value: 100 },
  ];

  const handleChange = (key: keyof typeof body, e: any) => {
    if (key === "lines") {
      localStorage.setItem("log_lines", e.target.value);
      setBody((prev) => ({ ...prev, lines: e.target.value }));
    }
    if (key === "filter_keyword") {
      localStorage.setItem("log_filter_keyword", e.target.value);
      setBody((prev) => ({ ...prev, filter_keyword: e.target.value }));
    }
    if (key === "file_path") {
      localStorage.setItem("log_file_path", e.target.value);
      setBody((prev) => ({ ...prev, file_path: e.target.value }));
    }
    reRender();
  };

  const iconButtons = [
    <TextField
      value={body.file_path}
      sx={{ flex: 2 }}
      label="Log File Path"
      onChange={(e) => handleChange("file_path", e)}
    />,
    <TextField
      value={body.filter_keyword}
      sx={{ flex: 1 }}
      label="Keywords"
      onChange={(e) => handleChange("filter_keyword", e)}
    />,
    <CustomSelect
      value={body.lines}
      lists={lists}
      label={"Last line"}
      fullWidth={false}
      sx={{ minWidth: 250 }}
      onChange={(e) => handleChange("lines", e)}
    />,
    <RefreshSelect {...RefreshProps} sx={{ minWidth: 250 }} />,
  ];

  return (
    <ComponentLoader data={data}>
      <CustomTable
        disableFilter
        data={data}
        header={[{ label: "Log" }]}
        iconButtons={iconButtons}
        config={{ defaultRowsPerPage: 10 }}
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
