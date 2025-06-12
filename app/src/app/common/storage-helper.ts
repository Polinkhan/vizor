export const getLastFilePath = () => {
  const lastFilePath = localStorage.getItem("last_file_path");
  return lastFilePath ? JSON.parse(lastFilePath) : ["/"];
};

export const setLastFilePath = (path: string) => {
  localStorage.setItem("last_file_path", JSON.stringify(path));
};

export const saveCpuSeriesData = (data: number) => {
  const seriesData = localStorage.getItem("cpu_series_data");
  if (!seriesData) {
    localStorage.setItem("cpu_series_data", JSON.stringify([data]));
  } else {
    const parsedData = JSON.parse(seriesData);
    if (parsedData.length > 59) {
      parsedData.shift();
    }
    localStorage.setItem("cpu_series_data", JSON.stringify([...parsedData, data]));
  }
};

export const getCpuSeriesData = () => {
  const seriesData = localStorage.getItem("cpu_series_data");
  if (!seriesData) {
    return Array(60).fill(0);
  }

  const parsedData = JSON.parse(seriesData) as number[];

  if (parsedData.length < 60) {
    return [...Array(60 - parsedData.length).fill(0), ...parsedData];
  }

  return parsedData;
};

export const clearCpuSeriesData = () => {
  localStorage.removeItem("cpu_series_data");
};

export const saveMemorySeriesData = (data: number) => {
  const seriesData = localStorage.getItem("memory_series_data");
  if (!seriesData) {
    localStorage.setItem("memory_series_data", JSON.stringify([data]));
  }
};

export const getMemorySeriesData = () => {
  const seriesData = localStorage.getItem("memory_series_data");
  if (!seriesData) {
    return Array(60).fill(0);
  }

  const parsedData = JSON.parse(seriesData) as number[];

  if (parsedData.length < 60) {
    return [...Array(60 - parsedData.length).fill(0), ...parsedData];
  }

  return parsedData;
};

export const clearMemorySeriesData = () => {
  localStorage.removeItem("memory_series_data");
};
