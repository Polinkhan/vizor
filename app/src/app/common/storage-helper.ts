export const getLastFilePath = () => {
  const lastFilePath = localStorage.getItem("last_file_path");
  return lastFilePath ? JSON.parse(lastFilePath) : ["/"];
};

export const setLastFilePath = (path: string) => {
  localStorage.setItem("last_file_path", JSON.stringify(path));
};

export const saveMatrixData = (name: "cpu" | "memory" | "network" | "disk", data: any) => {
  localStorage.setItem(name + "_matrix_data", JSON.stringify(data));
};

export const getMatrixData = (name: "cpu" | "memory" | "network" | "disk") => {
  const matrixData = localStorage.getItem(name + "_matrix_data");
  return matrixData ? JSON.parse(matrixData) : [{ data: [] }];
};

export const clearMatrixData = (name: "cpu" | "memory" | "network" | "disk") => {
  localStorage.removeItem(name + "_matrix_data");
};
