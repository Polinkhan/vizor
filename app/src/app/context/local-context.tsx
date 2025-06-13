import { type ReactNode, createContext, useContext, useMemo, useState } from "react";

export interface LocalContextTypes {
  value: any;
  setValue: (value: any) => void;
}

// ----------------------
// Creating Local Context
// ----------------------
export const LocalContext = createContext({} as LocalContextTypes);
export const useLocalContext = () => useContext(LocalContext);

interface LocalContextProviderProps {
  children: ReactNode;
  defaultValue: any;
}

const LocalContextProvider = ({ children, defaultValue }: LocalContextProviderProps) => {
  // -----------------------------------------
  // Local State
  // -----------------------------------------
  const [value, setValue] = useState<any>(defaultValue);

  const contextValue = useMemo(() => ({ value, setValue }), [value]);

  return <LocalContext.Provider value={contextValue}>{children}</LocalContext.Provider>;
};

export default LocalContextProvider;
