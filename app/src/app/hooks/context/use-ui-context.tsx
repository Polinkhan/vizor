import { useContext } from "react";
import { UIContext } from "../../context/ui-context";

export const useUIContext = () => useContext(UIContext);
