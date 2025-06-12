export const getLastFilePath = () => {
  const lastFilePath = localStorage.getItem("last_file_path");
  return lastFilePath ? JSON.parse(lastFilePath) : ["/"];
};

export const setLastFilePath = (path: string) => {
  localStorage.setItem("last_file_path", JSON.stringify(path));
};

export const saveSeriesData = (data: number) => {
  const seriesData = localStorage.getItem("series_data");
  if (!seriesData) {
    localStorage.setItem("series_data", JSON.stringify([data]));
  } else {
    const parsedData = JSON.parse(seriesData);
    if (parsedData.length > 59) {
      parsedData.shift();
    }
    localStorage.setItem("series_data", JSON.stringify([...parsedData, data]));
  }
};

export const getSeriesData = () => {
  const seriesData = localStorage.getItem("series_data");
  if (!seriesData) {
    return Array(60).fill(0);
  }

  const parsedData = JSON.parse(seriesData) as number[];

  if (parsedData.length < 60) {
    return [...Array(60 - parsedData.length).fill(0), ...parsedData];
  }

  return parsedData;
};

export const clearSeriesData = () => {
  localStorage.removeItem("series_data");
};
