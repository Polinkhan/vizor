import { useCallback, useState } from "react";
import { getComparator } from "../../components/table/utils_table";
import { TablefilterListType } from "../../common/types/types.table";

interface UseTableFilterProps {
  table: any;
  filterList: TablefilterListType[];
}

// Function to get default filters from the provided filter list
const getDefaultFilters = (filterList: TablefilterListType[]) => {
  return filterList.reduce((acc, { key, defaultFilters }) => {
    acc[key] = defaultFilters; // Assign default filters to their respective keys
    return acc;
  }, {} as Record<string, any>);
};

// Custom hook for managing table filters
const useTableFilter = ({ table, filterList }: UseTableFilterProps) => {
  const [filters, setFilters] = useState(getDefaultFilters(filterList));
  const [searchTerm, setSearchTerm] = useState(""); // New state for search input

  // Function to apply filters to the input data
  const applyFilter = ({
    inputData,
    comparator,
    filters,
  }: {
    inputData: any[];
    comparator: (a: any, b: any) => number;
    filters: any;
  }) => {
    // Stabilize the input data for sorting
    const stabilizedData = inputData.map((el, index) => [el, index] as const);

    // Sort the stabilized data
    stabilizedData.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      return order !== 0 ? order : a[1] - b[1]; // Maintain original order for equal items
    });

    // Extract sorted data
    inputData = stabilizedData.map((el) => el[0]);

    // Filter the input data based on active filters
    Object.keys(filters).forEach((key) => {
      if (filters[key].length) {
        inputData = inputData.filter((item) => filters[key].includes(item[key]));
      }
    });

    return inputData;
  };

  // Function to filter table data
  const filterData = ({ tableData }: any) => {
    let filteredData = applyFilter({
      inputData: tableData,
      comparator: getComparator(table.order, table.orderBy),
      filters,
    });

    // Further filter based on the search term
    if (searchTerm) {
      filteredData = filteredData.filter((item) =>
        Object.values(item).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    return filteredData;
  };

  // Function to handle filter changes
  const handleFilters = useCallback(
    (name: string, value: any) => {
      table.onResetPage(); // Reset the table page
      setFilters((prevState) => ({
        ...prevState,
        [name]: value, // Update the specified filter
      }));
    },
    [table]
  );

  // Function to handle search input changes
  const handleSearchFilters = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value); // Update the search term state
  }, []);

  // Function to handle filter status change
  const handleFilterStatus = useCallback(
    (_: React.SyntheticEvent, newValue: string) => {
      handleFilters("status", newValue); // Update the status filter
    },
    [handleFilters]
  );

  // Function to reset all filters to their default values
  const handleResetFilters = useCallback(() => {
    setFilters(getDefaultFilters(filterList)); // Reset to default filters
    setSearchTerm(""); // Clear the search term
  }, [filterList]);

  // Return the state and handlers for use in the component
  return { filters, filterData, handleFilters, handleSearchFilters, handleFilterStatus, handleResetFilters };
};

export default useTableFilter;
