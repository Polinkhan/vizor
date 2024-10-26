import { Button } from "@mui/material";
import { AvailableJobType } from "../../../../common/types/types.services";
import { TablefilterListType } from "../../../../common/types/types.table";
import { CustomTable } from "../../../../components/table/custom-table";
import { AvailableJobsColumns, AvailableJobsTableHeader } from "./utils";
import { SVG } from "../../../../components/images/Image";
import useToggle from "../../../../hooks/custom/use-toggle";

interface JobListViewProps {
  data: AvailableJobType[];
  reRender: any;
}

const JobListView = ({ data, reRender }: JobListViewProps) => {
  // --------------------------------------------
  // Hooks
  // --------------------------------------------
  const toggle = useToggle();

  // ------------------------------------------
  // Table props
  // ------------------------------------------

  const iconButtons = [
    <Button size="large" variant="soft" endIcon={<SVG.job />} onClick={toggle.onOpen}>
      Create a Job
    </Button>,
  ];

  const filterList: Omit<TablefilterListType, "data">[] = [
    // No filter
  ];
  return (
    <>
      <CustomTable
        data={data}
        filterList={filterList}
        header={AvailableJobsTableHeader}
        iconButtons={iconButtons}
        resource={{ columns: AvailableJobsColumns, reRender }}
      />
    </>
  );
};

export default JobListView;
